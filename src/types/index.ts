export interface CeremonyEvent {
  event_id: string;
  title: string;
  slug: string;
  description: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  capacity: number;
  occupied_count: number;
  remaining_capacity: number;
  status: 'PUBLISHED';
  location_label: string;
  location_visibility: 'PUBLIC' | 'PRIVATE';
}
