/**
 * @license
 * Katin-awan — Sacred Plant Spirit Healing
 * Admin Operations, Settings & Audit Logs
 */

function getAuditSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('AuditLog');
  if (!sheet) {
    sheet = ss.insertSheet('AuditLog');
    sheet.appendRow(['log_id', 'timestamp', 'admin_email', 'action', 'entity_type', 'entity_id', 'result']);
  }
  return sheet;
}

function logAuditAction(action, entityType, entityId, result) {
  try {
    const sheet = getAuditSheet();
    const logId = 'LOG-' + Utilities.getUuid().substring(0, 8);
    const now = new Date().toISOString();
    let email = 'system';
    try {
      email = Session.getActiveUser().getEmail() || 'admin';
    } catch (e) {}

    sheet.appendRow([logId, now, email, action, entityType, entityId, result]);
  } catch (err) {
    Logger.log('Audit log failure: ' + err);
  }
}

function getSettingsSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('Settings');
  if (!sheet) {
    sheet = ss.insertSheet('Settings');
    sheet.appendRow(['key', 'value', 'updated_at']);
    // Seed defaults
    const defaults = [
      ['ORGANIZER_NAME', 'Katin-awan — Sacred Plant Spirit Healing', new Date().toISOString()],
      ['CONTACT_EMAIL', 'katinawanph@gmail.com', new Date().toISOString()],
      ['FACEBOOK_PAGE_URL', 'https://facebook.com/katinawanph', new Date().toISOString()],
      ['MESSENGER_URL', 'https://m.me/katinawanph', new Date().toISOString()],
      ['DEFAULT_TIMEZONE', 'Asia/Manila (GMT+8)', new Date().toISOString()],
      ['DEFAULT_CURRENCY', 'PHP', new Date().toISOString()],
      ['LOCATION_POLICY', 'Sanctuary in Visayas (coordinates provided upon booking confirmation)', new Date().toISOString()]
    ];
    defaults.forEach(row => sheet.appendRow(row));
  }
  return sheet;
}

function getSettingsMap() {
  const sheet = getSettingsSheet();
  const rows = sheet.getDataRange().getValues();
  const settings = {};
  for (let i = 1; i < rows.length; i++) {
    const key = String(rows[i][0]).trim();
    const val = rows[i][1];
    if (key) {
      settings[key] = val;
    }
  }
  return settings;
}

function adminUpdateSettingsService(postData) {
  const sheet = getSettingsSheet();
  const rows = sheet.getDataRange().getValues();
  const now = new Date().toISOString();

  if (postData.settings && typeof postData.settings === 'object') {
    Object.keys(postData.settings).forEach(key => {
      const val = postData.settings[key];
      let found = false;
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][0]).trim() === key) {
          sheet.getRange(i + 1, 2).setValue(val);
          sheet.getRange(i + 1, 3).setValue(now);
          found = true;
          break;
        }
      }
      if (!found) {
        sheet.appendRow([key, val, now]);
      }
    });
  }

  logAuditAction('UPDATE_SETTINGS', 'SYSTEM', 'GLOBAL', 'SUCCESS');
  return { success: true, settings: getSettingsMap() };
}

function getAdminDashboardSummary() {
  const events = adminListAllEvents();
  const appsSheet = getApplicationsSheet();
  const appRows = appsSheet.getDataRange().getValues();

  let pendingCount = 0;
  let awaitingDepositCount = 0;
  let depositReportedCount = 0;
  let depositVerifiedCount = 0;
  let confirmedCount = 0;
  let waitlistCount = 0;

  for (let i = 1; i < appRows.length; i++) {
    const status = String(appRows[i][7] || '').toUpperCase();
    if (status === 'PENDING_REVIEW') pendingCount++;
    else if (status === 'AWAITING_DEPOSIT') awaitingDepositCount++;
    else if (status === 'DEPOSIT_REPORTED') depositReportedCount++;
    else if (status === 'DEPOSIT_VERIFIED') depositVerifiedCount++;
    else if (status === 'CONFIRMED') confirmedCount++;
    else if (status === 'WAITLISTED') waitlistCount++;
  }

  return {
    totalEvents: events.length,
    activeEvents: events.filter(e => e.status === 'PUBLISHED' || e.status === 'AVAILABLE').length,
    pendingReview: pendingCount,
    awaitingDeposit: awaitingDepositCount,
    depositReported: depositReportedCount,
    depositVerified: depositVerifiedCount,
    confirmedBookings: confirmedCount,
    waitlistedCount: waitlistCount,
    eventsSummary: events.map(e => ({
      event_id: e.event_id,
      title: e.title,
      starts_at: e.starts_at,
      capacity: e.capacity,
      occupied_count: e.occupied_count,
      remaining_capacity: e.remaining_capacity,
      status: e.status
    }))
  };
}
