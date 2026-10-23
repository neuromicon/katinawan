import type { CeremonyEvent } from '../types';

// gid=1923675221 is the published Events tab
const DEFAULT_EVENTS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1GJDa8kA5_JeCUkV9Dq9V1dcmqtR67lHgUAEWxgtZD7A/gviz/tq?tqx=out:csv&gid=1923675221';

const EVENTS_CSV_URL = import.meta.env.VITE_EVENTS_CSV_URL || DEFAULT_EVENTS_CSV_URL;

// Asia/Manila is UTC+8 with no DST
const MANILA_OFFSET_MINUTES = 8 * 60;

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

  if (quoted) throw new Error('Events CSV contains an unterminated quoted field.');
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

/**
 * Parse a date string (MM/DD/YYYY or YYYY-MM-DD) and an optional time string
 * (H:MM:SS AM/PM or HH:MM) as Asia/Manila local time, returning a UTC Date.
 * Returns null if the input is missing or cannot be parsed.
 */
function parseManilaDatetime(dateStr: string, timeStr: string): Date | null {
  if (!dateStr.trim()) return null;

  // Strip any embedded time from the date string (e.g. ISO with T)
  const cleanDate = dateStr.split('T')[0].trim();

  let year: number, month: number, day: number;

  const mdy = cleanDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const ymd = cleanDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (mdy) {
    month = Number(mdy[1]);
    day   = Number(mdy[2]);
    year  = Number(mdy[3]);
  } else if (ymd) {
    year  = Number(ymd[1]);
    month = Number(ymd[2]);
    day   = Number(ymd[3]);
  } else {
    // Fallback: native parse (acceptable for ISO strings that include offset)
    const ts = Date.parse(dateStr);
    return Number.isNaN(ts) ? null : new Date(ts);
  }

  if (!year || !month || !day) return null;

  let hours = 0, minutes = 0, seconds = 0;
  const t = (timeStr ?? '').trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (t) {
    hours   = Number(t[1]);
    minutes = Number(t[2]);
    seconds = Number(t[3] ?? 0);
    const mer = (t[4] ?? '').toUpperCase();
    if (mer === 'PM' && hours < 12) hours += 12;
    if (mer === 'AM' && hours === 12) hours = 0;
  }

  // Manila local → UTC: subtract Manila offset
  const utcMs = Date.UTC(year, month - 1, day, hours, minutes, seconds)
    - MANILA_OFFSET_MINUTES * 60_000;
  const date = new Date(utcMs);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Convert a UTC Date to an ISO-8601 string with +08:00 suffix. */
function toManilaISO(date: Date): string {
  const ms = date.getTime() + MANILA_OFFSET_MINUTES * 60_000;
  const d  = new Date(ms);
  const p  = (n: number, w = 2) => String(n).padStart(w, '0');
  return (
    `${p(d.getUTCFullYear(), 4)}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}` +
    `T${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}+08:00`
  );
}

/** Generate a stable slug-like ID from title and date string. */
function generateEventId(title: string, dateStr: string): string {
  const datePart  = dateStr.replace(/[^0-9]/g, '').slice(0, 8);
  const titlePart = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 32);
  return `${titlePart || 'event'}-${datePart}`;
}

export async function fetchPublishedEvents(): Promise<CeremonyEvent[]> {
  const response = await fetch(EVENTS_CSV_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Events CSV request failed (HTTP ${response.status}).`);
  }

  const records = parseCsv(await response.text());
  if (records.length === 0) throw new Error('Events CSV returned no rows.');

  const headers     = records[0].map(normalizeHeader);
  const columnIndex = new Map<string, number>(
    headers.map((h, i): [string, number] => [h, i])
  );

  // Current time in UTC — used to filter out past events
  const nowUtc = Date.now();

  const events = records.slice(1).flatMap<CeremonyEvent>((row): CeremonyEvent[] => {
    const value = (aliases: string[]): string => {
      for (const alias of aliases) {
        const idx = columnIndex.get(normalizeHeader(alias));
        const v   = idx === undefined ? '' : (row[idx]?.trim() ?? '');
        if (v) return v;
      }
      return '';
    };

    // If a Published column exists and is explicitly FALSE, skip
    const pub = value(['Published']);
    if (pub && pub.toUpperCase() === 'FALSE') return [];

    const title   = value(['Event Title', 'title', 'event_title', 'event name', 'name']);
    const dateStr = value(['Starts_at', 'starts_at', 'Event Date', 'start date', 'starts at', 'date']);
    const timeStr = value(['Start Time', 'start time', 'time']);

    // Skip rows without at least a title and a date
    if (!title || !dateStr) return [];

    const eventDateUtc = parseManilaDatetime(dateStr, timeStr);

    // Skip rows with unparseable dates
    if (!eventDateUtc) return [];

    // Skip past events (compare UTC timestamps)
    if (eventDateUtc.getTime() <= nowUtc) return [];

    const rawId       = value(['event_id', 'Event ID', 'id', 'slug']);
    const startsAtISO = toManilaISO(eventDateUtc);
    const eventId     = rawId || generateEventId(title, dateStr);

    const endsAtStr = value(['Ends_at', 'ends_at', 'End Date', 'end date', 'ends at']);
    const endsAtUtc = endsAtStr ? parseManilaDatetime(endsAtStr, '') : null;

    const capacity = numberOrZero(
      value(['Available Seats', 'capacity', 'max attendees', 'max participants', 'seats'])
    );
    const locVis = value(['location_visibility', 'location visibility']).toUpperCase();

    return [{
      event_id:            eventId,
      title,
      slug:                value(['slug']) || eventId,
      description:         value(['Event Description', 'description', 'details']),
      starts_at:           startsAtISO,
      ends_at:             endsAtUtc ? toManilaISO(endsAtUtc) : '',
      timezone:            'Asia/Manila',
      capacity,
      occupied_count:      0,
      remaining_capacity:  capacity,
      status:              'PUBLISHED',
      location_label:      value(['Location / Venue', 'location_label', 'location', 'venue']),
      location_visibility: locVis === 'PUBLIC' ? 'PUBLIC' : 'PRIVATE',
    }];
  });

  // Chronological order, soonest first
  return events.sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at));
}
