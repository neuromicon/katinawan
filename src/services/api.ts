import type { CeremonyEvent } from '../types';

const DEFAULT_EVENTS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1GJDa8kA5_JeCUkV9Dq9V1dcmqtR67lHgUAEWxgtZD7A/gviz/tq?tqx=out:csv&gid=1454969340';

const EVENTS_CSV_URL = import.meta.env.VITE_EVENTS_CSV_URL || DEFAULT_EVENTS_CSV_URL;

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const character = csv[i];

    if (quoted) {
      if (character === '"' && csv[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"' && field.length === 0) {
      quoted = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some((cell) => cell.trim() !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  if (quoted) throw new Error('The published Events CSV contains an unterminated quoted field.');
  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ''));
    if (row.some((cell) => cell.trim() !== '')) rows.push(row);
  }

  return rows;
}

function normalizeHeader(value: string): string {
  return value.replace(/^\uFEFF/, '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function numberOrZero(value: string | undefined): number {
  if (!value) return 0;
  const normalized = value.replace(/,/g, '').trim();
  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) return 0;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function fetchPublishedEvents(): Promise<CeremonyEvent[]> {
  const response = await fetch(EVENTS_CSV_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Published Events CSV request failed (${response.status}).`);
  }

  const records = parseCsv(await response.text());
  if (records.length === 0) throw new Error('The published Events CSV has no header row.');

  const headers = records[0].map(normalizeHeader);
  const columnIndex = new Map<string, number>(
    headers.map((header, index): [string, number] => [header, index])
  );
  if (!columnIndex.has('published')) {
    throw new Error('The published Events CSV must contain a Published column.');
  }

  return records.slice(1).flatMap<CeremonyEvent>((row, rowOffset): CeremonyEvent[] => {
    const value = (aliases: string[]): string => {
      for (const alias of aliases) {
        const index = columnIndex.get(normalizeHeader(alias));
        const candidate = index === undefined ? '' : row[index]?.trim() ?? '';
        if (candidate) return candidate;
      }
      return '';
    };

    if (value(['Published']).toUpperCase() !== 'TRUE') return [];

    const eventId = value(['event_id', 'Event ID', 'id', 'slug']);
    const title = value(['title', 'event_title', 'event name', 'name']);
    const startsAt = value(['starts_at', 'start date', 'starts at', 'date']);
    if (!eventId || !title || !startsAt) {
      throw new Error(`Published Events CSV row ${rowOffset + 2} is missing an event ID, title, or start date.`);
    }

    if (Number.isNaN(Date.parse(startsAt))) {
      throw new Error(`Published Events CSV row ${rowOffset + 2} has an unreadable start date.`);
    }

    const capacity = numberOrZero(value(['capacity', 'max attendees', 'max participants']));
    const locationVisibility = value(['location_visibility', 'location visibility']).toUpperCase();

    return [{
      event_id: eventId,
      title,
      slug: value(['slug']) || eventId,
      description: value(['description', 'details']),
      starts_at: startsAt,
      ends_at: value(['ends_at', 'end date', 'ends at']),
      timezone: value(['timezone', 'time zone']) || 'Asia/Manila',
      capacity,
      occupied_count: 0,
      remaining_capacity: capacity,
      status: 'PUBLISHED',
      location_label: value(['location_label', 'location', 'venue']),
      location_visibility: locationVisibility === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE'
    }];
  });
}
