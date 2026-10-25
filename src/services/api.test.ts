import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCsv,
  normalizeHeader,
  parseManilaDatetime,
  toManilaISO,
  parseEventsFromCsvText,
  normalizeSpreadsheetCsvUrl,
  MANILA_OFFSET_MINUTES
} from './api';

test('normalizeSpreadsheetCsvUrl converts pubhtml links to CSV export links', () => {
  const pubhtmlUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTM7KHgJciAxleS4BlRW3wNaqo-Nd_a6m2cTrf5CA5FO_NpDrRW1FFxXmWFsl9eUN8ird4MU5-0IpF/pubhtml';
  const expected = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTM7KHgJciAxleS4BlRW3wNaqo-Nd_a6m2cTrf5CA5FO_NpDrRW1FFxXmWFsl9eUN8ird4MU5-0IpF/pub?output=csv';
  assert.equal(normalizeSpreadsheetCsvUrl(pubhtmlUrl), expected);

  // With query parameter like ?gid=1923675221
  const pubhtmlWithGid = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTM7KHgJciAxleS4BlRW3wNaqo-Nd_a6m2cTrf5CA5FO_NpDrRW1FFxXmWFsl9eUN8ird4MU5-0IpF/pubhtml?gid=1923675221';
  const expectedWithGid = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTM7KHgJciAxleS4BlRW3wNaqo-Nd_a6m2cTrf5CA5FO_NpDrRW1FFxXmWFsl9eUN8ird4MU5-0IpF/pub?gid=1923675221&output=csv';
  assert.equal(normalizeSpreadsheetCsvUrl(pubhtmlWithGid), expectedWithGid);

  // Standard CSV URLs are unchanged
  const standardCsv = 'https://docs.google.com/spreadsheets/d/1GJDa8kA5_JeCUkV9Dq9V1dcmqtR67lHgUAEWxgtZD7A/gviz/tq?tqx=out:csv&gid=1454969340';
  assert.equal(normalizeSpreadsheetCsvUrl(standardCsv), standardCsv);
});

test('parseCsv handles simple and quoted fields', () => {
  const csv = 'Title,Date,"Description, with comma"\n"Healing, Ceremony",2026-11-20,"Deep ""inner"" journey"';
  const rows = parseCsv(csv);
  assert.equal(rows.length, 2);
  assert.deepEqual(rows[0], ['Title', 'Date', 'Description, with comma']);
  assert.deepEqual(rows[1], ['Healing, Ceremony', '2026-11-20', 'Deep "inner" journey']);
});

test('normalizeHeader removes BOM, spaces, and punctuation', () => {
  assert.equal(normalizeHeader('\uFEFFEvent Title'), 'eventtitle');
  assert.equal(normalizeHeader('  Starts_at  '), 'startsat');
  assert.equal(normalizeHeader('Available Seats!'), 'availableseats');
});

test('parseManilaDatetime converts Manila local time (UTC+8) to UTC Date', () => {
  // 2026-12-01 at 18:00 Manila time (UTC+8) should be 2026-12-01 10:00:00 UTC
  const date = parseManilaDatetime('2026-12-01', '6:00 PM');
  assert.ok(date !== null);
  assert.equal(date.getUTCFullYear(), 2026);
  assert.equal(date.getUTCMonth(), 11); // December is month index 11
  assert.equal(date.getUTCDate(), 1);
  assert.equal(date.getUTCHours(), 10);
  assert.equal(date.getUTCMinutes(), 0);

  // MM/DD/YYYY format
  const date2 = parseManilaDatetime('12/01/2026', '10:00 AM');
  assert.ok(date2 !== null);
  assert.equal(date2.getUTCHours(), 2); // 10:00 Manila = 02:00 UTC
});

test('toManilaISO outputs ISO-8601 string with +08:00', () => {
  // A UTC date corresponding to 2026-12-01 10:00 UTC
  const utcDate = new Date(Date.UTC(2026, 11, 1, 10, 0, 0));
  const isoStr = toManilaISO(utcDate);
  assert.equal(isoStr, '2026-12-01T18:00:00+08:00');
});

test('parseEventsFromCsvText enforces strict Published=TRUE check', () => {
  // Reference time: 2026-01-01 00:00:00 UTC
  const mockNowUtc = Date.UTC(2026, 0, 1, 0, 0, 0);

  const csv = [
    'Published,Event Title,Starts_at,Start Time,Available Seats',
    'TRUE,Gathering One,2026-11-01,10:00 AM,12',
    'true,Gathering Two,2026-11-02,10:00 AM,10',
    'True,Gathering Three,2026-11-03,10:00 AM,8',
    'FALSE,Unpublished One,2026-11-04,10:00 AM,10',
    ',Missing Published Status,2026-11-05,10:00 AM,10',
    'PENDING,Pending Event,2026-11-06,10:00 AM,10',
    'yes,Yes Event,2026-11-07,10:00 AM,10',
    '1,Numeric Event,2026-11-08,10:00 AM,10',
  ].join('\n');

  const events = parseEventsFromCsvText(csv, mockNowUtc);

  // Only rows with TRUE (case-insensitive) must be included!
  assert.equal(events.length, 3);
  assert.equal(events[0].title, 'Gathering One');
  assert.equal(events[1].title, 'Gathering Two');
  assert.equal(events[2].title, 'Gathering Three');
  assert.equal(events[0].remaining_capacity, 12);
});

test('parseEventsFromCsvText filters out past events', () => {
  // Reference time: 2026-06-01 00:00:00 UTC
  const mockNowUtc = Date.UTC(2026, 5, 1, 0, 0, 0);

  const csv = [
    'Published,Event Title,Starts_at,Start Time',
    'TRUE,Past Event,2026-05-01,10:00 AM',
    'TRUE,Future Event,2026-07-01,10:00 AM',
  ].join('\n');

  const events = parseEventsFromCsvText(csv, mockNowUtc);
  assert.equal(events.length, 1);
  assert.equal(events[0].title, 'Future Event');
});
