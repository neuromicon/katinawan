import {
  CeremonyEvent,
  Application,
  ApplicationFormInput,
  ApplicationStatus,
  SystemSettings,
  AuditLogEntry,
  PaymentRecord
} from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_APPLICATIONS,
  INITIAL_SETTINGS
} from '../data/initialData';

const STORAGE_KEYS = {
  EVENTS: 'ktw_events_v1',
  APPLICATIONS: 'ktw_applications_v1',
  PAYMENTS: 'ktw_payments_v1',
  SETTINGS: 'ktw_settings_v1',
  AUDIT: 'ktw_audit_v1'
};

function getStorage<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    return JSON.parse(raw);
  } catch (e) {
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

function logAudit(action: string, entityType: string, entityId: string, result: string) {
  const logs = getStorage<AuditLogEntry[]>(STORAGE_KEYS.AUDIT, []);
  logs.unshift({
    log_id: 'LOG-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    timestamp: new Date().toISOString(),
    admin_email: 'organizer@katinawan.ph',
    action,
    entity_type: entityType,
    entity_id: entityId,
    result
  });
  setStorage(STORAGE_KEYS.AUDIT, logs.slice(0, 100));
}

// Initialize default data if empty
export function initLocalStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    setStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    setStorage(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    setStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }
}

// Public API
export async function fetchPublishedEvents(): Promise<CeremonyEvent[]> {
  initLocalStorage();
  const settings = getStorage<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  
  if (settings.APPS_SCRIPT_URL) {
    try {
      const res = await fetch(`${settings.APPS_SCRIPT_URL}?action=getPublishedEvents`);
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        return json.data;
      }
    } catch (e) {
      console.warn('Google Apps Script request failed, falling back to local store:', e);
    }
  }

  // Fallback to local store
  const events = getStorage<CeremonyEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  const applications = getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);

  return events
    .filter(e => e.status !== 'CANCELLED')
    .map(event => {
      // Recalculate occupied count
      const occupied = applications
        .filter(app => app.event_id === event.event_id &&
          ['CONFIRMED', 'DEPOSIT_VERIFIED', 'AWAITING_DEPOSIT', 'DEPOSIT_REPORTED'].includes(app.status))
        .reduce((sum, app) => sum + (app.attendee_count || 1), 0);

      const remaining = Math.max(0, event.capacity - occupied);
      let status = event.status;
      if (remaining === 0 && status !== 'CLOSED') {
        status = 'WAITLIST';
      } else if (remaining <= 3 && remaining > 0 && status === 'AVAILABLE') {
        status = 'ALMOST_FULL';
      }

      return {
        ...event,
        occupied_count: occupied,
        remaining_capacity: remaining,
        status
      };
    });
}

export async function submitApplication(input: ApplicationFormInput): Promise<{
  application_id: string;
  status: ApplicationStatus;
  message: string;
}> {
  initLocalStorage();
  const settings = getStorage<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);

  if (settings.APPS_SCRIPT_URL) {
    try {
      const res = await fetch(settings.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submitApplication', ...input })
      });
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
    } catch (e) {
      console.warn('Remote submission failed, storing locally:', e);
    }
  }

  // Local storage submission
  const events = getStorage<CeremonyEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  const applications = getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);

  const event = events.find(e => e.event_id === input.event_id);
  if (!event) {
    throw new Error('The selected event was not found.');
  }

  const occupied = applications
    .filter(app => app.event_id === input.event_id &&
      ['CONFIRMED', 'DEPOSIT_VERIFIED', 'AWAITING_DEPOSIT', 'DEPOSIT_REPORTED'].includes(app.status))
    .reduce((sum, app) => sum + (app.attendee_count || 1), 0);

  const remaining = Math.max(0, event.capacity - occupied);
  const isWaitlist = remaining < input.attendee_count;
  const initialStatus: ApplicationStatus = isWaitlist ? 'WAITLISTED' : 'PENDING_REVIEW';

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  const applicationId = `KTW-${dateStr}-${rand}`;

  const newApp: Application = {
    application_id: applicationId,
    event_id: input.event_id,
    event_title: event.title,
    full_name: input.full_name.trim(),
    email: input.email.trim().toLowerCase(),
    attendee_count: Number(input.attendee_count) || 1,
    message: input.message?.trim() || '',
    preferred_contact: input.preferred_contact,
    status: initialStatus,
    privacy_consent_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status_updated_by: 'public-form',
    status_updated_at: new Date().toISOString()
  };

  applications.unshift(newApp);
  setStorage(STORAGE_KEYS.APPLICATIONS, applications);
  logAudit('CREATE_APPLICATION', 'APPLICATION', applicationId, initialStatus);

  return {
    application_id: applicationId,
    status: initialStatus,
    message: isWaitlist
      ? 'The gathering is currently at capacity. Your application has been logged on the priority waitlist.'
      : 'Your application has been received and logged for manual review.'
  };
}

export async function lookupApplicationStatus(reference: string, email: string): Promise<Application | null> {
  initLocalStorage();
  const apps = getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  const found = apps.find(
    a => a.application_id.toUpperCase().trim() === reference.toUpperCase().trim() &&
         a.email.toLowerCase().trim() === email.toLowerCase().trim()
  );
  return found || null;
}

export async function reportDeposit(data: {
  application_id: string;
  payment_reference: string;
  notes?: string;
}): Promise<{ success: boolean; message: string }> {
  initLocalStorage();
  const apps = getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  const index = apps.findIndex(a => a.application_id === data.application_id);
  if (index === -1) {
    throw new Error('Application not found.');
  }

  apps[index].status = 'DEPOSIT_REPORTED';
  apps[index].deposit_reported_reference = data.payment_reference;
  apps[index].deposit_reported_at = new Date().toISOString();
  apps[index].deposit_notes = data.notes;
  apps[index].updated_at = new Date().toISOString();

  setStorage(STORAGE_KEYS.APPLICATIONS, apps);
  logAudit('REPORT_DEPOSIT', 'PAYMENT', data.application_id, data.payment_reference);

  return {
    success: true,
    message: 'Deposit reference recorded. The organizer will manually verify payment.'
  };
}

// Admin API
export async function adminGetDashboardData(): Promise<{
  events: CeremonyEvent[];
  applications: Application[];
  settings: SystemSettings;
  auditLogs: AuditLogEntry[];
  summary: {
    totalEvents: number;
    pendingReview: number;
    awaitingDeposit: number;
    depositReported: number;
    depositVerified: number;
    confirmed: number;
    waitlisted: number;
  };
}> {
  initLocalStorage();
  const events = await fetchPublishedEvents();
  const applications = getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  const settings = getStorage<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  const auditLogs = getStorage<AuditLogEntry[]>(STORAGE_KEYS.AUDIT, []);

  const summary = {
    totalEvents: events.length,
    pendingReview: applications.filter(a => a.status === 'PENDING_REVIEW').length,
    awaitingDeposit: applications.filter(a => a.status === 'AWAITING_DEPOSIT').length,
    depositReported: applications.filter(a => a.status === 'DEPOSIT_REPORTED').length,
    depositVerified: applications.filter(a => a.status === 'DEPOSIT_VERIFIED').length,
    confirmed: applications.filter(a => a.status === 'CONFIRMED').length,
    waitlisted: applications.filter(a => a.status === 'WAITLISTED').length
  };

  return {
    events,
    applications,
    settings,
    auditLogs,
    summary
  };
}

export async function adminUpdateApplicationStatus(
  applicationId: string,
  newStatus: ApplicationStatus,
  adminNotes?: string
): Promise<Application> {
  initLocalStorage();
  const apps = getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  const index = apps.findIndex(a => a.application_id === applicationId);
  if (index === -1) throw new Error('Application not found');

  apps[index].status = newStatus;
  apps[index].updated_at = new Date().toISOString();
  apps[index].status_updated_at = new Date().toISOString();
  apps[index].status_updated_by = 'admin@katinawan.ph';
  if (adminNotes) {
    apps[index].deposit_notes = (apps[index].deposit_notes ? apps[index].deposit_notes + ' | ' : '') + adminNotes;
  }

  setStorage(STORAGE_KEYS.APPLICATIONS, apps);
  logAudit('UPDATE_STATUS', 'APPLICATION', applicationId, newStatus);
  return apps[index];
}

export async function adminSaveEvent(eventData: Partial<CeremonyEvent>): Promise<CeremonyEvent> {
  initLocalStorage();
  const events = getStorage<CeremonyEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);

  if (eventData.event_id) {
    const idx = events.findIndex(e => e.event_id === eventData.event_id);
    if (idx !== -1) {
      events[idx] = {
        ...events[idx],
        ...eventData,
        updated_at: new Date().toISOString()
      };
      setStorage(STORAGE_KEYS.EVENTS, events);
      logAudit('UPDATE', 'EVENT', eventData.event_id, 'SUCCESS');
      return events[idx];
    }
  }

  // Create new
  const newId = 'KTW-EVT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  const newEvent: CeremonyEvent = {
    event_id: newId,
    title: eventData.title || 'Sacred Gathering',
    slug: eventData.slug || ('ceremony-' + newId.toLowerCase()),
    description: eventData.description || '',
    starts_at: eventData.starts_at || new Date().toISOString(),
    ends_at: eventData.ends_at || new Date().toISOString(),
    timezone: eventData.timezone || 'Asia/Manila (GMT+8)',
    capacity: Number(eventData.capacity) || 10,
    occupied_count: 0,
    remaining_capacity: Number(eventData.capacity) || 10,
    registration_deadline: eventData.registration_deadline,
    status: eventData.status || 'AVAILABLE',
    location_label: eventData.location_label || 'Sanctuary in Visayas (Disclosed upon confirmation)',
    location_visibility: eventData.location_visibility || 'PRIVATE',
    deposit_amount: eventData.deposit_amount || 'Configured on review',
    deposit_currency: eventData.deposit_currency || 'PHP',
    deposit_deadline_hours: eventData.deposit_deadline_hours || 48,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  events.unshift(newEvent);
  setStorage(STORAGE_KEYS.EVENTS, events);
  logAudit('CREATE', 'EVENT', newId, 'SUCCESS');
  return newEvent;
}

export async function adminUpdateSettings(newSettings: Partial<SystemSettings>): Promise<SystemSettings> {
  initLocalStorage();
  const current = getStorage<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  const updated = { ...current, ...newSettings };
  setStorage(STORAGE_KEYS.SETTINGS, updated);
  logAudit('UPDATE_SETTINGS', 'SYSTEM', 'GLOBAL', 'SUCCESS');
  return updated;
}

export function exportApplicationsCSV(applications: Application[]): string {
  const headers = [
    'Application ID',
    'Event ID',
    'Event Title',
    'Full Name',
    'Email',
    'Attendees',
    'Status',
    'Preferred Contact',
    'Message',
    'Created At',
    'Updated At'
  ];

  const rows = applications.map(a => [
    `"${a.application_id}"`,
    `"${a.event_id}"`,
    `"${(a.event_title || '').replace(/"/g, '""')}"`,
    `"${a.full_name.replace(/"/g, '""')}"`,
    `"${a.email}"`,
    a.attendee_count,
    `"${a.status}"`,
    `"${a.preferred_contact}"`,
    `"${(a.message || '').replace(/"/g, '""')}"`,
    `"${a.created_at}"`,
    `"${a.updated_at}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function resetDemoData(): void {
  setStorage(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  setStorage(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  setStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  setStorage(STORAGE_KEYS.AUDIT, []);
}
