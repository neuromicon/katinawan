/**
 * @license
 * Katin-awan — Google Drive Integration Service
 * Manages ceremony application trackers, registration forms, and sanctuary archives in Google Drive
 */

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
}

export async function listDriveFiles(
  accessToken: string,
  searchQuery?: string,
  folderId?: string
): Promise<DriveFile[]> {
  let q = "trashed = false";
  if (folderId) {
    q += ` and '${folderId}' in parents`;
  }
  if (searchQuery && searchQuery.trim()) {
    const escaped = searchQuery.replace(/'/g, "\\'");
    q += ` and name contains '${escaped}'`;
  }

  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.set('q', q);
  url.searchParams.set('fields', 'files(id,name,mimeType,modifiedTime,size,webViewLink,iconLink)');
  url.searchParams.set('orderBy', 'modifiedTime desc');
  url.searchParams.set('pageSize', '25');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Google Drive API error: ${res.statusText}`);
  }

  const data = await res.json();
  return data.files || [];
}

export async function createDriveFolder(
  accessToken: string,
  folderName: string,
  parentId?: string
): Promise<DriveFile> {
  const metadata: Record<string, any> = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder'
  };
  if (parentId) {
    metadata.parents = [parentId];
  }

  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metadata)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Drive folder');
  }

  return await res.json();
}

export async function uploadDriveFile(
  accessToken: string,
  fileName: string,
  content: string,
  mimeType: string = 'text/plain',
  folderId?: string
): Promise<DriveFile> {
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata: Record<string, any> = {
    name: fileName,
    mimeType: mimeType
  };
  if (folderId) {
    metadata.parents = [folderId];
  }

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n` +
    content +
    closeDelimiter;

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,modifiedTime,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`
      },
      body: multipartRequestBody
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to upload file to Google Drive');
  }

  return await res.json();
}

/**
 * Deletes a file from Google Drive.
 * Requires user confirmation per Google Workspace Integration guidelines.
 */
export async function deleteDriveFile(
  accessToken: string,
  fileId: string,
  fileName: string
): Promise<boolean> {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${fileName}" from your Google Drive? This action cannot be undone.`
  );
  if (!confirmed) return false;

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to delete file from Google Drive');
  }

  return true;
}

export async function exportTrackerToDrive(
  accessToken: string,
  csvData: string,
  folderId?: string
): Promise<DriveFile> {
  const nowStr = new Date().toISOString().slice(0, 10);
  const fileName = `Katinawan_Applications_Tracker_${nowStr}.csv`;
  return await uploadDriveFile(accessToken, fileName, csvData, 'text/csv', folderId);
}

export async function saveFormSpecificationToDrive(
  accessToken: string,
  folderId?: string
): Promise<DriveFile> {
  const content = `# Sacred Plant Spirit Healing — Ceremony Registration & Safety Questionnaire Specification
Version: 1.0 | Platform: Google Forms + Google Sheets

## Section 1: Contact Details
- Full Name (Required, Short Answer)
- Email Address (Required, Email Validation)
- WhatsApp / Phone Number (Optional, Short Answer)
- Preferred Contact Method (Required: Email, WhatsApp/Phone, Facebook Messenger)

## Section 2: Ceremony & Intentions
- Preferred Ceremony Date (Dropdown: Available Gatherings / Flexible)
- First Guided Ceremony? (Multiple Choice: Yes / No / Prefer not to say)
- Previous Velada Experience? (Multiple Choice: Yes / No / Prefer not to say)
- Previous Experience Details (Optional, Paragraph)
- Intentions & What You Wish Facilitator to Know (Required, Paragraph)

## Section 3: Health & Safety Screening
- Relevant Health History (Checkboxes: Cardiovascular, Blood Pressure, Seizures/Epilepsy, Bipolar/Psychosis history, Psychological crisis, Recent psychiatric emergency, Pregnancy, Significant condition/surgery, Known allergies, None of these apply, Prefer to discuss privately)
- Additional Health Notes (Optional, Paragraph)
- Prescription Medication / Supplements (Required: No, Yes - private disclosure, Unsure - discuss privately)
- Private Safety Follow-up Request (Required: Yes / No)
- Dietary Requirements / Allergies (Required: No, Yes, Prefer to discuss)

## Section 4: Emergency Contact
- Full Name (Required)
- Phone Number with Country Code (Required)
- Relationship (Required)

## Section 5: Acknowledgements & Privacy
- 18+ years old confirmation
- Understanding application does not confirm spot
- Accurate info commitment
- Agreement not to alter prescribed medications without medical doctor
- Understanding of no promised medical cures
- Consent for application review
- Privacy policy acknowledgement

Generated by Katin-awan Sanctuary System on ${new Date().toISOString()}`;

  const fileName = `Sacred_Plant_Spirit_Healing_Registration_Form_Spec.md`;
  return await uploadDriveFile(accessToken, fileName, content, 'text/markdown', folderId);
}
