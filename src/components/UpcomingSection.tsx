import React, { useMemo, useState } from 'react';
import type { CeremonyEvent } from '../types';
import { Calendar, MapPin, Search, Users, ArrowRight, RefreshCw } from 'lucide-react';

interface UpcomingSectionProps {
  events: CeremonyEvent[];
  selectedEventId: string;
  onSelectEvent: (eventId: string) => void;
  isLoading: boolean;
  loadError: boolean;
  onRetry: () => void;
  onApplyClick: () => void;
}

function eventDate(value: string, options: Intl.DateTimeFormatOptions): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', options);
}

export const UpcomingSection: React.FC<UpcomingSectionProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  isLoading,
  loadError,
  onRetry,
  onApplyClick
}) => {
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  const years = useMemo(() => Array.from(new Set(events.flatMap((event) => {
    const date = new Date(event.starts_at);
    return Number.isNaN(date.getTime()) ? [] : [String(date.getFullYear())];
  }))).sort(), [events]);

  const filteredEvents = useMemo(() => events
    .filter((event) => {
      const date = new Date(event.starts_at);
      if (selectedYear !== 'all' && String(date.getFullYear()) !== selectedYear) return false;
      if (selectedMonth !== 'all' && String(date.getMonth() + 1) !== selectedMonth) return false;
      const haystack = `${event.title} ${event.description} ${event.starts_at}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    })
    .sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at)),
  [events, query, selectedYear, selectedMonth]);

  return (
    <section id="upcoming" className="py-16 sm:py-20 bg-[#FAF8F2] text-[#142A21] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">Calendar</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4 leading-tight">Confirmed Dates</h2>
          <p className="text-sm sm:text-base text-[#142A21]/75 font-light leading-relaxed">
            This calendar contains only events marked Published=TRUE in the public Events sheet. No dates are generated locally.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl border border-[#B8C7AE]/30 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <label className="relative w-full sm:w-64">
              <span className="sr-only">Search confirmed events</span>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8c6f]" />
              <input
                type="text"
                placeholder="Search dates or events"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#B8C7AE]/50 text-sm focus:border-[#C4A46A] focus:outline-none"
              />
            </label>
            <select value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)} className="w-full sm:w-auto px-3 py-2 rounded-lg border border-[#B8C7AE]/50 text-sm focus:outline-none">
              <option value="all">All years</option>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
            <select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} className="w-full sm:w-auto px-3 py-2 rounded-lg border border-[#B8C7AE]/50 text-sm focus:outline-none">
              <option value="all">All months</option>
              {Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={String(index + 1)}>{new Date(2020, index, 1).toLocaleDateString('en-US', { month: 'long' })}</option>)}
            </select>
          </div>
          <span className="text-xs text-[#7a8c6f] whitespace-nowrap">
            {isLoading ? 'Loading dates…' : `${filteredEvents.length} confirmed ${filteredEvents.length === 1 ? 'date' : 'dates'}`}
          </span>
        </div>

        {isLoading ? (
          <div className="py-14 text-center text-sm text-[#7a8c6f]" role="status">Loading dates…</div>
        ) : loadError ? (
          <div className="py-12 px-6 text-center bg-white rounded-2xl border border-rose-200" role="alert">
            <p className="font-serif text-2xl text-[#142A21]">Could not load confirmed dates</p>
            <button onClick={onRetry} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#B8C7AE] text-sm hover:bg-[#FAF8F2]">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="py-12 px-6 text-center bg-white rounded-2xl border border-[#B8C7AE]/30" role="status">
            <Calendar className="w-8 h-8 mx-auto text-[#7a8c6f] mb-3" />
            <p className="font-serif text-2xl text-[#142A21]">No confirmed dates yet</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#7a8c6f]">No confirmed dates match these filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredEvents.map((event) => {
              const selected = event.event_id === selectedEventId;
              return (
                <article key={event.event_id} className={`bg-white rounded-2xl overflow-hidden border shadow-sm transition-all flex flex-col ${selected ? 'border-[#C4A46A] ring-2 ring-[#C4A46A]/20' : 'border-[#B8C7AE]/30 hover:shadow-md'}`}>
                  <div className="p-5 sm:p-6 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Confirmed
                      </span>
                      {event.capacity > 0 && <span className="text-[10px] text-[#7a8c6f]">Capacity: {event.capacity}</span>}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug mb-2">{event.title}</h3>
                    {event.description && <p className="text-xs text-[#142A21]/75 leading-relaxed mb-4">{event.description}</p>}

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 mt-0.5 text-[#b08f53] flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{eventDate(event.starts_at, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          {event.ends_at && !Number.isNaN(Date.parse(event.ends_at)) && <p className="text-xs text-[#7a8c6f]">Ends {eventDate(event.ends_at, { month: 'short', day: 'numeric', year: 'numeric' })}</p>}
                        </div>
                      </div>
                      {event.location_label && <div className="flex items-start gap-2.5 text-[#7a8c6f]">
                        <MapPin className="w-4 h-4 mt-0.5 text-[#b08f53] flex-shrink-0" />
                        <span className="text-xs">{event.location_visibility === 'PRIVATE' ? 'Private location shared with confirmed participants' : event.location_label}</span>
                      </div>}
                      {event.capacity > 0 && <div className="flex items-center gap-2.5 text-[#7a8c6f]">
                        <Users className="w-4 h-4 text-[#b08f53]" />
                        <span className="text-xs">Capacity: {event.capacity}</span>
                      </div>}
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => { onSelectEvent(event.event_id); onApplyClick(); }}
                      className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6]"
                    >
                      Select date and open form <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-8 p-4 rounded-xl bg-white border border-[#B8C7AE]/30 text-center text-xs text-[#142A21]/80">
          Only events explicitly published by the organizer appear in this calendar. An application is not a confirmed booking.
        </div>
      </div>
    </section>
  );
};
