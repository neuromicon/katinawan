/**
 * @license
 * Katin-awan — Sacred Plant Spirit Healing
 * Authentication & Security Rules
 */

function getAdminAllowlist() {
  const props = PropertiesService.getScriptProperties();
  const raw = props.getProperty('ADMIN_EMAILS') || '';
  const list = raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  
  // Also check AdminUsers sheet if initialized
  try {
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName('AdminUsers');
    if (sheet) {
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        const email = String(data[i][0] || '').trim().toLowerCase();
        const active = data[i][2];
        if (email && (active === true || active === 'TRUE' || active === 'true')) {
          if (!list.includes(email)) list.push(email);
        }
      }
    }
  } catch (e) {
    Logger.log('AdminUsers sheet check failed: ' + e);
  }
  
  return list;
}

function authorizeAdmin(e, postData) {
  const props = PropertiesService.getScriptProperties();
  const requiredApiKey = props.getProperty('ADMIN_API_KEY');
  
  // Check API key header or parameter
  const requestKey = (e.parameter && e.parameter.apiKey) || (postData && postData.apiKey);
  if (requiredApiKey && requestKey === requiredApiKey) {
    return true;
  }
  
  // Check Google Active User
  const user = Session.getActiveUser();
  const userEmail = (user ? user.getEmail() : '').toLowerCase();
  
  if (userEmail) {
    const allowlist = getAdminAllowlist();
    if (allowlist.includes(userEmail)) {
      return true;
    }
  }
  
  // Check effective user
  const effectiveUser = Session.getEffectiveUser();
  const effectiveEmail = (effectiveUser ? effectiveUser.getEmail() : '').toLowerCase();
  if (effectiveEmail) {
    const allowlist = getAdminAllowlist();
    if (allowlist.includes(effectiveEmail)) {
      return true;
    }
  }

  return false;
}
