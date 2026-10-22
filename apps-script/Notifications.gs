/**
 * @license
 * Katin-awan — Sacred Plant Spirit Healing
 * Email Notification Templates (per Section 9 of specification)
 */

function sendApplicationReceivedEmail(data) {
  const subject = "We've received your ceremony application";
  const bodyText = 
    `Hello ${data.full_name},\n\n` +
    `Thank you for your interest in Sacred Plant Spirit Healing (Katin-awan). We have received your application and it is awaiting review.\n\n` +
    `Application reference: ${data.application_id}\n` +
    `Event: ${data.event_title}\n` +
    `Requested date: ${data.event_date}\n\n` +
    `Submitting an application does not confirm a place. We will contact you with the next steps after the organizer reviews your application.\n\n` +
    `If you have questions, contact us at katinawanph@gmail.com.\n\n` +
    `Warm regards,\nSacred Plant Spirit Healing`;

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: bodyText
  });
}

function sendApplicationApprovedDepositRequiredEmail(applicant, event, options) {
  const subject = "Next steps for your ceremony application";
  const amount = (options && options.deposit_amount) || (event && event.deposit_amount) || 'Configured upon review';
  const currency = (event && event.deposit_currency) || 'PHP';
  const instructions = (options && options.payment_instructions) || 'Please await separate official payment details from the organizer.';

  const bodyText =
    `Hello ${applicant.full_name},\n\n` +
    `Your application ${applicant.application_id} has been approved to proceed to the deposit stage.\n\n` +
    `Event: ${event ? event.title : 'Sacred Plant Spirit Gathering'}\n` +
    `Date and time: ${event ? event.starts_at : 'Scheduled gathering'}\n` +
    `Deposit amount: ${amount} ${currency}\n` +
    `Payment method and instructions: ${instructions}\n\n` +
    `Please follow only the payment instructions included in this message. Your booking is not confirmed until the organizer verifies the required payment and sends a separate confirmation.\n\n` +
    `If you have questions, contact katinawanph@gmail.com.\n\n` +
    `Warm regards,\nSacred Plant Spirit Healing`;

  MailApp.sendEmail({
    to: applicant.email,
    subject: subject,
    body: bodyText
  });
}

function sendBookingConfirmedEmail(applicant, event) {
  const subject = "Your ceremony booking is confirmed";
  const bodyText =
    `Hello ${applicant.full_name},\n\n` +
    `Your booking for ${event ? event.title : 'Sacred Plant Spirit Gathering'} has been confirmed.\n\n` +
    `Date and time: ${event ? event.starts_at : 'Scheduled date'}\n` +
    `Time zone: ${event ? event.timezone : 'Asia/Manila (GMT+8)'}\n` +
    `Location & arrival instructions: Detailed sanctuary coordinates and arrival protocol have been prepared for you. Please check in with the organizer.\n\n` +
    `Please review the preparation guide carefully before travelling. If anything changes, the organizer will contact you using the details provided.\n\n` +
    `If you need to contact the organizer, email katinawanph@gmail.com.\n\n` +
    `Warm regards,\nSacred Plant Spirit Healing`;

  MailApp.sendEmail({
    to: applicant.email,
    subject: subject,
    body: bodyText
  });
}

function sendWaitlistNotificationEmail(applicant, event) {
  const subject = "Your application is on the waiting list";
  const bodyText =
    `Hello ${applicant.full_name},\n\n` +
    `Thank you for applying to ${event ? event.title : 'the ceremony'}. The event has reached its current capacity and your application has been placed on the waiting list.\n\n` +
    `A waiting-list position is not a confirmed booking. We will contact you if a place becomes available.\n\n` +
    `Sacred Plant Spirit Healing`;

  MailApp.sendEmail({
    to: applicant.email,
    subject: subject,
    body: bodyText
  });
}

function sendDeclinedNotificationEmail(applicant, event) {
  const subject = "Update on your ceremony application";
  const bodyText =
    `Hello ${applicant.full_name},\n\n` +
    `Thank you for your interest in Sacred Plant Spirit Healing. After review, we are unable to confirm your application for ${event ? event.title : 'the upcoming gathering'}.\n\n` +
    `If you have questions, please reach out to katinawanph@gmail.com.\n\n` +
    `Sacred Plant Spirit Healing`;

  MailApp.sendEmail({
    to: applicant.email,
    subject: subject,
    body: bodyText
  });
}
