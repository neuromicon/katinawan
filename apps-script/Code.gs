/**
 * @license
 * Katin-awan — Sacred Plant Spirit Healing
 * Google Apps Script Web App Entry Point
 * Specification v1.2 / 2026
 */

const SPREADSHEET_ID_PROPERTY = 'SPREADSHEET_ID';
const ADMIN_EMAILS_PROPERTY = 'ADMIN_EMAILS';
const ADMIN_API_KEY_PROPERTY = 'ADMIN_API_KEY';

function getSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty(SPREADSHEET_ID_PROPERTY);
  if (!id) {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
  return SpreadsheetApp.openById(id);
}

function createJsonResponse(data, status = 200) {
  const output = ContentService.createTextOutput(JSON.stringify({
    status: status === 200 ? 'success' : 'error',
    code: status,
    data: status === 200 ? data : null,
    error: status !== 200 ? data : null,
    timestamp: new Date().toISOString()
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doGet(e) {
  try {
    const params = e.parameter || {};
    const action = params.action || 'getPublishedEvents';

    switch (action) {
      case 'getPublishedEvents':
        return createJsonResponse(getPublishedEventsService());

      case 'getEventDetails':
        if (!params.eventId) {
          return createJsonResponse('Missing eventId parameter', 400);
        }
        return createJsonResponse(getEventDetailsService(params.eventId));

      case 'getApplicationStatus':
        if (!params.reference || !params.email) {
          return createJsonResponse('Missing reference or email verification', 400);
        }
        return createJsonResponse(getApplicationStatusService(params.reference, params.email));

      case 'adminDashboard':
        if (!authorizeAdmin(e)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(getAdminDashboardSummary());

      case 'adminListEvents':
        if (!authorizeAdmin(e)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(adminListAllEvents());

      case 'adminListApplications':
        if (!authorizeAdmin(e)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(adminListApplications(params));

      case 'adminGetSettings':
        if (!authorizeAdmin(e)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(getSettingsMap());

      default:
        return createJsonResponse('Unknown action: ' + action, 404);
    }
  } catch (err) {
    Logger.log('doGet Error: ' + err.toString());
    return createJsonResponse(err.toString(), 500);
  }
}

function doPost(e) {
  try {
    let postData = {};
    if (e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (pErr) {
        postData = e.parameter || {};
      }
    } else {
      postData = e.parameter || {};
    }

    const action = postData.action || (e.parameter ? e.parameter.action : '');

    switch (action) {
      case 'submitApplication':
        return createJsonResponse(submitApplicationService(postData));

      case 'reportDeposit':
        return createJsonResponse(reportDepositService(postData));

      case 'adminUpdateApplicationStatus':
        if (!authorizeAdmin(e, postData)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(adminUpdateApplicationStatusService(postData));

      case 'adminVerifyDeposit':
        if (!authorizeAdmin(e, postData)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(adminVerifyDepositService(postData));

      case 'adminSaveEvent':
        if (!authorizeAdmin(e, postData)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(adminSaveEventService(postData));

      case 'adminUpdateSettings':
        if (!authorizeAdmin(e, postData)) {
          return createJsonResponse('Unauthorized', 401);
        }
        return createJsonResponse(adminUpdateSettingsService(postData));

      default:
        return createJsonResponse('Unknown POST action: ' + action, 404);
    }
  } catch (err) {
    Logger.log('doPost Error: ' + err.toString());
    return createJsonResponse(err.toString(), 500);
  }
}
