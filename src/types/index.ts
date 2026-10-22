export type ApplicationStatus =
  | 'PENDING_REVIEW'
  | 'AWAITING_DEPOSIT'
  | 'DEPOSIT_REPORTED'
  | 'DEPOSIT_VERIFIED'
  | 'CONFIRMED'
  | 'WAITLISTED'
  | 'DECLINED'
  | 'CANCELLED'
  | 'EXPIRED';

export type EventStatus =
  | 'PUBLISHED'
  | 'AVAILABLE'
  | 'ALMOST_FULL'
  | 'WAITLIST'
  | 'CLOSED'
  | 'CANCELLED';

export interface CeremonyEvent {
  event_id: string;
  title: string;
  slug: string;
  description: string;
  starts_at: string; // ISO date string
  ends_at: string;
  timezone: string;
  capacity: number;
  occupied_count: number;
  remaining_capacity: number;
  registration_deadline?: string;
  status: EventStatus;
  location_label: string;
  location_visibility: 'PUBLIC' | 'PRIVATE';
  deposit_amount?: string;
  deposit_currency?: string;
  deposit_deadline_hours?: number;
  created_at: string;
  updated_at: string;
}

export interface Application {
  application_id: string;
  event_id: string;
  event_title?: string;
  full_name: string;
  email: string;
  attendee_count: number;
  message?: string;
  preferred_contact: 'email' | 'messenger';
  status: ApplicationStatus;
  privacy_consent_at: string;
  created_at: string;
  updated_at: string;
  status_updated_by: string;
  status_updated_at: string;
  deposit_reported_reference?: string;
  deposit_reported_at?: string;
  deposit_verified_at?: string;
  deposit_notes?: string;
}

export interface PaymentRecord {
  payment_id: string;
  application_id: string;
  payment_type: 'DEPOSIT' | 'FULL';
  expected_amount: string;
  currency: string;
  payment_method: string;
  payment_reference: string;
  reported_at: string;
  verified_at?: string;
  verified_by?: string;
  status: 'REPORTED' | 'VERIFIED' | 'REJECTED';
  admin_notes?: string;
}

export interface ApplicationFormInput {
  full_name: string;
  email: string;
  event_id: string;
  attendee_count: number;
  message?: string;
  preferred_contact: 'email' | 'messenger';
  privacy_consent: boolean;
}

export interface SystemSettings {
  ORGANIZER_NAME: string;
  CONTACT_EMAIL: string;
  FACEBOOK_PAGE_URL: string;
  MESSENGER_URL: string;
  DEFAULT_TIMEZONE: string;
  DEFAULT_CURRENCY: string;
  LOCATION_POLICY: string;
  APPS_SCRIPT_URL?: string;
  GOOGLE_FORM_URL?: string;
  GOOGLE_SHEET_URL?: string;
}

export interface AuditLogEntry {
  log_id: string;
  timestamp: string;
  admin_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  result: string;
}
