/**
 * @license
 * Katin-awan — Sacred Plant Spirit Healing
 * Applications Data Service & Concurrency Locking
 * Columns: application_id, event_id, full_name, email, attendee_count, message, preferred_contact, status, privacy_consent_at, created_at, updated_at, status_updated_by, status_updated_at
 */

function getApplicationsSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('Applications');
  if (!sheet) {
    sheet = ss.insertSheet('Applications');
    sheet.appendRow([
      'application_id', 'event_id', 'full_name', 'email', 'attendee_count',
      'message', 'preferred_contact', 'status', 'privacy_consent_at',
      'created_at', 'updated_at', 'status_updated_by', 'status_updated_at'
    ]);
  }
  return sheet;
}

function calculateOccupiedCount(eventId) {
  const sheet = getApplicationsSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return 0;

  let occupied = 0;
  for (let i = 1; i < rows.length; i++) {
    const rowEventId = rows[i][1];
    const status = String(rows[i][7] || '').toUpperCase();
    const count = Number(rows[i][4]) || 1;

    if (String(rowEventId) === String(eventId)) {
      // Confirmed, Awaiting Deposit, and Deposit Reported hold capacity
      if (status === 'CONFIRMED' || status === 'DEPOSIT_VERIFIED' || status === 'AWAITING_DEPOSIT' || status === 'DEPOSIT_REPORTED') {
        occupied += count;
      }
    }
  }
  return occupied;
}

function submitApplicationService(data) {
  // Input validations
  if (!data.full_name || !data.email || !data.event_id) {
    throw new Error('Missing required fields: full_name, email, and event_id are required.');
  }
  if (!data.email.includes('@') || !data.email.includes('.')) {
    throw new Error('Invalid email address format.');
  }
  if (!data.privacy_consent) {
    throw new Error('Consent to Privacy Policy is required.');
  }

  const requestedAttendees = Math.max(1, parseInt(data.attendee_count, 10) || 1);

  // Use LockService for atomic capacity verification and insert
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Wait up to 10 seconds

    const event = getEventDetailsService(data.event_id);
    if (!event) {
      throw new Error('The selected event was not found.');
    }

    const currentOccupied = calculateOccupiedCount(data.event_id);
    const maxCapacity = Number(event.capacity || 0);
    const availableSpots = Math.max(0, maxCapacity - currentOccupied);

    let initialStatus = 'PENDING_REVIEW';
    if (availableSpots <= 0) {
      initialStatus = 'WAITLISTED';
    }

    const now = new Date();
    const datePrefix = Utilities.formatDate(now, 'GMT+8', 'yyyyMMdd');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationId = 'KTW-' + datePrefix + '-' + randomSuffix;

    const sheet = getApplicationsSheet();
    const newRow = [
      applicationId,
      data.event_id,
      data.full_name.trim(),
      data.email.trim().toLowerCase(),
      requestedAttendees,
      data.message ? data.message.trim() : '',
      data.preferred_contact || 'email',
      initialStatus,
      now.toISOString(),
      now.toISOString(),
      now.toISOString(),
      'system',
      now.toISOString()
    ];

    sheet.appendRow(newRow);

    // Send confirmation of receipt email
    try {
      sendApplicationReceivedEmail({
        email: data.email.trim(),
        full_name: data.full_name.trim(),
        application_id: applicationId,
        event_title: event.title,
        event_date: event.starts_at,
        is_waitlisted: initialStatus === 'WAITLISTED'
      });
    } catch (emailErr) {
      Logger.log('Notification email failed, but application recorded: ' + emailErr);
    }

    return {
      application_id: applicationId,
      status: initialStatus,
      event_title: event.title,
      created_at: now.toISOString(),
      message: initialStatus === 'WAITLISTED'
        ? 'The event has reached current capacity; your application is placed on the waiting list.'
        : 'Application received and recorded for manual review.'
    };
  } finally {
    lock.releaseLock();
  }
}

function getApplicationStatusService(reference, email) {
  const sheet = getApplicationsSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return null;

  for (let i = 1; i < rows.length; i++) {
    const rowRef = String(rows[i][0]).trim().toUpperCase();
    const rowEmail = String(rows[i][3]).trim().toLowerCase();

    if (rowRef === reference.trim().toUpperCase() && rowEmail === email.trim().toLowerCase()) {
      return {
        application_id: rows[i][0],
        event_id: rows[i][1],
        full_name: rows[i][2],
        status: rows[i][7],
        created_at: rows[i][9],
        updated_at: rows[i][10]
      };
    }
  }
  return null;
}

function adminListApplications(params) {
  const sheet = getApplicationsSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const list = [];
  const filterStatus = params.status ? params.status.toUpperCase() : null;
  const filterEvent = params.eventId ? String(params.eventId) : null;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const app = {};
    headers.forEach((h, idx) => {
      app[h] = row[idx];
    });

    if (filterStatus && String(app.status).toUpperCase() !== filterStatus) continue;
    if (filterEvent && String(app.event_id) !== filterEvent) continue;

    list.push(app);
  }
  return list;
}

function adminUpdateApplicationStatusService(postData) {
  const applicationId = postData.application_id;
  const newStatus = postData.new_status;
  if (!applicationId || !newStatus) {
    throw new Error('application_id and new_status are required.');
  }

  const allowedStatuses = [
    'PENDING_REVIEW', 'AWAITING_DEPOSIT', 'DEPOSIT_REPORTED',
    'DEPOSIT_VERIFIED', 'CONFIRMED', 'WAITLISTED',
    'DECLINED', 'CANCELLED', 'EXPIRED'
  ];
  if (!allowedStatuses.includes(newStatus)) {
    throw new Error('Invalid status transition: ' + newStatus);
  }

  const sheet = getApplicationsSheet();
  const rows = sheet.getDataRange().getValues();
  let targetRow = -1;
  let applicantData = null;

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(applicationId)) {
      targetRow = i + 1;
      applicantData = {
        application_id: rows[i][0],
        event_id: rows[i][1],
        full_name: rows[i][2],
        email: rows[i][3],
        attendee_count: rows[i][4],
        current_status: rows[i][7]
      };
      break;
    }
  }

  if (targetRow === -1 || !applicantData) {
    throw new Error('Application not found: ' + applicationId);
  }

  const now = new Date().toISOString();
  const adminUser = Session.getActiveUser().getEmail() || 'admin';

  sheet.getRange(targetRow, 8).setValue(newStatus); // status col
  sheet.getRange(targetRow, 11).setValue(now); // updated_at
  sheet.getRange(targetRow, 12).setValue(adminUser); // status_updated_by
  sheet.getRange(targetRow, 13).setValue(now); // status_updated_at

  logAuditAction('UPDATE_STATUS', 'APPLICATION', applicationId, newStatus);

  // Send status change notifications
  try {
    const event = getEventDetailsService(applicantData.event_id);
    if (newStatus === 'AWAITING_DEPOSIT') {
      sendApplicationApprovedDepositRequiredEmail(applicantData, event, postData);
    } else if (newStatus === 'CONFIRMED') {
      sendBookingConfirmedEmail(applicantData, event);
    } else if (newStatus === 'WAITLISTED') {
      sendWaitlistNotificationEmail(applicantData, event);
    } else if (newStatus === 'DECLINED') {
      sendDeclinedNotificationEmail(applicantData, event);
    }
  } catch (notifErr) {
    Logger.log('Notification delivery failed: ' + notifErr);
  }

  return { success: true, application_id: applicationId, status: newStatus };
}
