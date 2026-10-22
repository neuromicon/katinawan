/**
 * @license
 * Katin-awan — Sacred Plant Spirit Healing
 * Payments Data Service
 * Columns: payment_id, application_id, payment_type, expected_amount, currency, payment_method, payment_reference, reported_at, verified_at, verified_by, status, admin_notes
 */

function getPaymentsSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName('Payments');
  if (!sheet) {
    sheet = ss.insertSheet('Payments');
    sheet.appendRow([
      'payment_id', 'application_id', 'payment_type', 'expected_amount',
      'currency', 'payment_method', 'payment_reference', 'reported_at',
      'verified_at', 'verified_by', 'status', 'admin_notes'
    ]);
  }
  return sheet;
}

function reportDepositService(postData) {
  const applicationId = postData.application_id;
  const paymentRef = postData.payment_reference;
  const paymentMethod = postData.payment_method;

  if (!applicationId || !paymentRef) {
    throw new Error('application_id and payment_reference are required.');
  }

  const now = new Date().toISOString();
  const paymentId = 'PAY-' + Utilities.getUuid().substring(0, 8).toUpperCase();
  const sheet = getPaymentsSheet();

  sheet.appendRow([
    paymentId,
    applicationId,
    'DEPOSIT',
    postData.amount || '',
    postData.currency || 'PHP',
    paymentMethod || 'Manual Bank Transfer',
    paymentRef,
    now,
    '',
    '',
    'REPORTED',
    postData.notes || ''
  ]);

  // Update application status to DEPOSIT_REPORTED
  adminUpdateApplicationStatusService({
    application_id: applicationId,
    new_status: 'DEPOSIT_REPORTED'
  });

  return { payment_id: paymentId, success: true };
}

function adminVerifyDepositService(postData) {
  const paymentId = postData.payment_id;
  const applicationId = postData.application_id;
  const isVerified = postData.verified === true || postData.verified === 'true';

  const sheet = getPaymentsSheet();
  const rows = sheet.getDataRange().getValues();
  let targetRow = -1;

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(paymentId) || (applicationId && String(rows[i][1]) === String(applicationId))) {
      targetRow = i + 1;
      break;
    }
  }

  const now = new Date().toISOString();
  const adminEmail = Session.getActiveUser().getEmail() || 'admin';

  if (targetRow > 0) {
    sheet.getRange(targetRow, 9).setValue(now); // verified_at
    sheet.getRange(targetRow, 10).setValue(adminEmail); // verified_by
    sheet.getRange(targetRow, 11).setValue(isVerified ? 'VERIFIED' : 'REJECTED');
    if (postData.admin_notes) {
      sheet.getRange(targetRow, 12).setValue(postData.admin_notes);
    }
  }

  if (isVerified && applicationId) {
    // Transition application to DEPOSIT_VERIFIED and then optionally CONFIRMED
    adminUpdateApplicationStatusService({
      application_id: applicationId,
      new_status: 'CONFIRMED'
    });
  }

  logAuditAction('VERIFY_DEPOSIT', 'PAYMENT', paymentId || applicationId, isVerified ? 'VERIFIED' : 'REJECTED');

  return { success: true, verified: isVerified };
}
