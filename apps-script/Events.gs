/**
 * @license
 * Katin-awan — Sacred Plant Spirit Healing
 * Events Data Service
 * Columns: event_id, title, slug, description, starts_at, ends_at, timezone, capacity, registration_deadline, status, location_label, location_visibility, deposit_amount, deposit_currency, deposit_deadline_hours, created_at, updated_at
 */

function getEventsSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('Events');
  if (!sheet) {
    sheet = ss.insertSheet('Events');
    sheet.appendRow([
      'event_id', 'title', 'slug', 'description', 'starts_at', 'ends_at',
      'timezone', 'capacity', 'registration_deadline', 'status',
      'location_label', 'location_visibility', 'deposit_amount',
      'deposit_currency', 'deposit_deadline_hours', 'created_at', 'updated_at'
    ]);
  }
  return sheet;
}

function getPublishedEventsService() {
  const sheet = getEventsSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const now = new Date();
  const events = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const eventObj = {};
    headers.forEach((h, idx) => {
      eventObj[h] = row[idx];
    });

    // Only return published events
    const status = String(eventObj.status || '').toUpperCase();
    if (status !== 'PUBLISHED' && status !== 'AVAILABLE' && status !== 'ALMOST_FULL' && status !== 'WAITLIST') {
      continue;
    }

    // Check future date
    const startDate = new Date(eventObj.starts_at);
    if (!isNaN(startDate.getTime()) && startDate < now) {
      continue;
    }

    // Mask private location unless public
    if (eventObj.location_visibility !== 'PUBLIC') {
      eventObj.location_label = 'Private Sanctuary, Visayas (Disclosed upon confirmation)';
    }

    // Calculate confirmed occupied count
    eventObj.occupied_count = calculateOccupiedCount(eventObj.event_id);
    eventObj.remaining_capacity = Math.max(0, Number(eventObj.capacity || 0) - eventObj.occupied_count);

    events.push(eventObj);
  }

  return events;
}

function getEventDetailsService(eventId) {
  const sheet = getEventsSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return null;

  const headers = rows[0];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (String(row[0]) === String(eventId)) {
      const eventObj = {};
      headers.forEach((h, idx) => {
        eventObj[h] = row[idx];
      });

      if (eventObj.location_visibility !== 'PUBLIC') {
        eventObj.location_label = 'Private Sanctuary, Visayas (Disclosed upon confirmation)';
      }
      eventObj.occupied_count = calculateOccupiedCount(eventObj.event_id);
      eventObj.remaining_capacity = Math.max(0, Number(eventObj.capacity || 0) - eventObj.occupied_count);
      return eventObj;
    }
  }
  return null;
}

function adminListAllEvents() {
  const sheet = getEventsSheet();
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0];
  const events = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    headers.forEach((h, idx) => {
      item[h] = row[idx];
    });
    item.occupied_count = calculateOccupiedCount(item.event_id);
    item.remaining_capacity = Math.max(0, Number(item.capacity || 0) - item.occupied_count);
    events.push(item);
  }
  return events;
}

function adminSaveEventService(postData) {
  const sheet = getEventsSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const now = new Date().toISOString();

  let eventId = postData.event_id;
  let rowIndex = -1;

  if (eventId) {
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(eventId)) {
        rowIndex = i + 1; // 1-based index in sheet
        break;
      }
    }
  } else {
    eventId = 'EVT-' + Utilities.getUuid().substring(0, 8).toUpperCase();
  }

  const rowValues = [
    eventId,
    postData.title || 'Sacred Plant Spirit Gathering',
    postData.slug || ('ceremony-' + eventId.toLowerCase()),
    postData.description || '',
    postData.starts_at || now,
    postData.ends_at || now,
    postData.timezone || 'Asia/Manila (GMT+8)',
    Number(postData.capacity || 10),
    postData.registration_deadline || '',
    postData.status || 'PUBLISHED',
    postData.location_label || 'Sanctuary in Visayas',
    postData.location_visibility || 'PRIVATE',
    postData.deposit_amount || '',
    postData.deposit_currency || 'PHP',
    Number(postData.deposit_deadline_hours || 48),
    postData.created_at || now,
    now
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
    logAuditAction('UPDATE', 'EVENT', eventId, 'SUCCESS');
  } else {
    sheet.appendRow(rowValues);
    logAuditAction('CREATE', 'EVENT', eventId, 'SUCCESS');
  }

  return { event_id: eventId, success: true };
}
