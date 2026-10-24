import type { CeremonyEvent } from '../types';

// Asia/Manila is UTC+8 with no DST
export const MANILA_OFFSET_MINUTES = 8 * 60;

export function parseCsv(csv: string): string[][] {
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

export function normalizeHeader(value: string): string {
  return value.replace(/^\uFEFF/, '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function numberOrZero(value: string | undefined): number {
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
export function parseManilaDatetime(dateStr: string, timeStr: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;

  // Strip any embedded time from the date string (e.g. ISO with T)
  const cleanDate = dateStr.split('T')[0].trim();

  let year: number;
  let month: number;
  let day: number;

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

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  const t = (timeStr ?? '').trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (t) {
    hours   = Number(t[1]);
    minutes = Number(t[2]);
    seconds = Number(t[3] ?? 0);
    const mer = (t[4] ?? '').toUpperCase();
    if (mer === 'PM' && hours < 12) hours += 12;
    if (mer === 'AM' && hours === 12) hours = 0;
  }

  // Manila local → UTC: subtract Manila offset (UTC+8)
  const utcMs = Date.UTC(year, month - 1, day, hours, minutes, seconds)
    - MANILA_OFFSET_MINUTES * 60_000;
  const date = new Date(utcMs);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Convert a UTC Date to an ISO-8601 string with +08:00 suffix. */
export function toManilaISO(date: Date): string {
  const ms = date.getTime() + MANILA_OFFSET_MINUTES * 60_000;
  const d  = new Date(ms);
  const p  = (n: number, w = 2) => String(n).padStart(w, '0');
  return (
    `${p(d.getUTCFullYear(), 4)}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}` +
    `T${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}+08:00`
  );
}

/** Generate a stable slug-like ID from title and date string. */
export function generateEventId(title: string, dateStr: string): string {
  const datePart  = dateStr.replace(/[^0-9]/g, '').slice(0, 8);
  const titlePart = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 32);
  return `${titlePart || 'event'}-${datePart}`;
}

export function parseEventsFromCsvText(csvText: string, nowUtc = Date.now()): CeremonyEvent[] {
  const records = parseCsv(csvText);
  if (records.length === 0) throw new Error('Events CSV returned no rows.');

  const headers = records[0].map(normalizeHeader);
  const columnIndex = new Map<string, number>(
    headers.map((h, i): [string, number] => [h, i])
  );

  return records.slice(1).flatMap<CeremonyEvent>((row): CeremonyEvent[] => {
    const value = (aliases: string[]): string => {
      for (const alias of aliases) {
        const idx = columnIndex.get(normalizeHeader(alias));
        const v   = idx === undefined ? '' : (row[idx]?.trim() ?? '');
        if (v) return v;
      }
      return '';
    };

    // Strict filter: only rows where Published column is strictly TRUE (case-insensitive) are accepted
    const pub = value(['Published', 'published']).trim().toUpperCase();
    if (pub !== 'TRUE') return [];

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
  }).sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at));
}

async function fetchFromCsv(url: string): Promise<CeremonyEvent[]> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Events CSV request failed (HTTP ${response.status}).`);
  }
  return parseEventsFromCsvText(await response.text());
}

async function fetchFromAppsScript(url: string): Promise<CeremonyEvent[]> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Apps Script request failed (HTTP ${response.status}).`);
  }
  const payload = (await response.json()) as { status: string; data?: CeremonyEvent[]; message?: string };
  if (payload.status !== 'success' || !Array.isArray(payload.data)) {
    throw new Error(payload.message || 'Apps Script returned an unexpected payload.');
  }

  const nowUtc = Date.now();
  return payload.data
    .filter((event) => {
      if (!event.starts_at || !event.title) return false;
      const date = new Date(event.starts_at);
      return !Number.isNaN(date.getTime()) && date.getTime() > nowUtc;
    })
    .map((e) => ({
      ...e,
      occupied_count: 0,
      remaining_capacity: e.capacity || 0,
      status: 'PUBLISHED' as const,
      timezone: e.timezone || 'Asia/Manila',
    }))
    .sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at));
}

export async function fetchPublishedEvents(): Promise<CeremonyEvent[]> {
  const csvUrl = (import.meta.env.VITE_EVENTS_CSV_URL || '').trim();
  const appsScriptUrl = (import.meta.env.VITE_APPS_SCRIPT_URL || '').trim();

  // Strict check: VITE_EVENTS_CSV_URL is required; no hardcoded Google Sheets URL fallback!
  if (!csvUrl) {
    if (appsScriptUrl) {
      return fetchFromAppsScript(appsScriptUrl);
    }
    throw new Error('VITE_EVENTS_CSV_URL environment variable is required but missing or empty.');
  }

  try {
    return await fetchFromCsv(csvUrl);
  } catch (csvError) {
    if (appsScriptUrl) {
      try {
        return await fetchFromAppsScript(appsScriptUrl);
      } catch (scriptError) {
        throw new Error(
          `Failed to fetch events from CSV (${(csvError as Error).message}) and Apps Script (${(scriptError as Error).message}).`
        );
      }
    }
    throw csvError;
  }
}
