import React, { useMemo, useState } from 'react';
import type { CeremonyEvent } from '../types';
import { Calendar, MapPin, Search, Users, ArrowRight, RefreshCw, ExternalLink, Sparkles } from 'lucide-react';

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
  return date.toLocaleDateString('en-US', { ...options, timeZone: 'Asia/Manila' });
}

function eventTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  });
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

  const years = useMemo(() =>
    Array.from(new Set(events.flatMap((event) => {
      const date = new Date(event.starts_at);
      return Number.isNaN(date.getTime()) ? [] : [String(date.getFullYear())];
    }))).sort(),
  [events]);

  const filteredEvents = useMemo(() =>
    events
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
    <section id="upcoming" className="py-16 sm:py-20 bg-[#FAF8F2] text-[#142A21] relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-3">Calendar</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4 leading-tight">Upcoming Ceremonies</h2>
          <p className="text-base sm:text-lg text-[#142A21]/80 font-light leading-relaxed">
            All dates are confirmed by the organizer. Sorted chronologically, soonest first. Past events are removed automatically.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 p-4 sm:p-5 bg-white rounded-xl border border-[#B8C7AE]/30 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <label className="relative w-full sm:w-64">
              <span className="sr-only">Search ceremonies</span>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8c6f]" />
              <input
                type="text"
                placeholder="Search ceremonies or dates"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#B8C7AE]/50 text-base focus:border-[#C4A46A] focus:outline-none"
              />
            </label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full sm:w-auto px-4 py-3 rounded-lg border border-[#B8C7AE]/50 text-base focus:outline-none bg-white">
              <option value="all">All years</option>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full sm:w-auto px-4 py-3 rounded-lg border border-[#B8C7AE]/50 text-base focus:outline-none bg-white">
              <option value="all">All months</option>
              {Array.from({ length: 12 }, (_, i) =>
                <option key={i + 1} value={String(i + 1)}>
                  {new Date(2020, i, 1).toLocaleDateString('en-US', { month: 'long' })}
                </option>
              )}
            </select>
          </div>
          <span className="text-base sm:text-sm text-[#7a8c6f] whitespace-nowrap">
            {isLoading ? 'Loading…' : `${filteredEvents.length} upcoming ${filteredEvents.length === 1 ? 'ceremony' : 'ceremonies'}`}
          </span>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-lg text-[#7a8c6f]" role="status">Loading upcoming ceremonies…</div>
        ) : loadError ? (
          <div className="py-14 px-6 text-center bg-white rounded-2xl border border-rose-200" role="alert">
            <p className="font-serif text-2xl sm:text-3xl text-[#142A21] mb-2">Could not load confirmed dates</p>
            <p className="text-base text-[#7a8c6f] mb-6">Please check your connection and try again.</p>
            <button onClick={onRetry} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#B8C7AE] text-base hover:bg-[#FAF8F2] transition-colors">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="py-14 px-6 text-center bg-white rounded-2xl border border-[#B8C7AE]/30" role="status">
            <Calendar className="w-12 h-12 mx-auto text-[#C4A46A] mb-4" />
            <p className="font-serif text-2xl sm:text-3xl text-[#142A21] mb-2">No upcoming ceremonies yet</p>
            <p className="text-base text-[#7a8c6f] max-w-md mx-auto leading-relaxed">
              New dates are added regularly. Check back soon, or express your interest below.
            </p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-base text-[#7a8c6f]">No ceremonies match these filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const selected = event.event_id === selectedEventId;
              const timeStr = eventTime(event.starts_at);
              return (
                <article key={event.event_id} className={`bg-white rounded-2xl overflow-hidden border shadow-sm transition-all flex flex-col ${selected ? 'border-[#C4A46A] ring-2 ring-[#C4A46A]/20' : 'border-[#B8C7AE]/30 hover:shadow-md'}`}>
                  <div className="p-6 sm:p-7 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-xs font-semibold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Confirmed
                      </span>
                      {event.capacity > 0 && <span className="text-sm text-[#7a8c6f]">Capacity: {event.capacity}</span>}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold leading-snug mb-3">{event.title}</h3>
                    {event.description && <p className="text-base sm:text-sm text-[#142A21]/80 leading-relaxed mb-5">{event.description}</p>}

                    <div className="space-y-3.5 text-base sm:text-sm">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 mt-0.5 text-[#b08f53] flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{eventDate(event.starts_at, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          {timeStr && <p className="text-sm text-[#7a8c6f] mt-0.5">{timeStr} (Philippine Time)</p>}
                          {event.ends_at && !Number.isNaN(Date.parse(event.ends_at)) && (
                            <p className="text-sm text-[#7a8c6f]">Ends {eventDate(event.ends_at, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          )}
                        </div>
                      </div>
                      {event.location_label && (
                        <div className="flex items-start gap-3 text-[#7a8c6f]">
                          <MapPin className="w-5 h-5 mt-0.5 text-[#b08f53] flex-shrink-0" />
                          <span className="text-sm break-words">{event.location_visibility === 'PRIVATE' ? 'Private location — shared with confirmed participants' : event.location_label}</span>
                        </div>
                      )}
                      {event.capacity > 0 && (
                        <div className="flex items-center gap-3 text-[#7a8c6f]">
                          <Users className="w-5 h-5 text-[#b08f53] flex-shrink-0" />
                          <span className="text-sm">Capacity: {event.capacity} seekers</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => { onSelectEvent(event.event_id); onApplyClick(); }}
                      className="w-full py-4 px-5 rounded-lg text-base sm:text-sm font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6]"
                    >
                      Select &amp; Apply <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Join the Interest List Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1b382c] to-[#142A21] text-[#F4F0E6] border border-[#C4A46A]/30 shadow-lg text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#142A21] border border-[#C4A46A]/40 text-[#C4A46A] flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F0E6] mb-2">
            Interested in Future Gatherings?
          </h3>
          <p className="text-base sm:text-lg text-[#B8C7AE] font-light max-w-xl mx-auto mb-6 leading-relaxed">
            If current dates do not fit your schedule or you would like to be notified as soon as new ceremonies are published, join our interest list.
          </p>
          <a
            href="https://forms.gle/cELnQqT2RctV6XPg9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] font-semibold text-base uppercase tracking-wider shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <span>Join the Interest List</span>
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          </a>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-white border border-[#B8C7AE]/30 text-center text-sm sm:text-sm text-[#142A21]/80">
          Only ceremonies explicitly confirmed by the organizer appear here. Submitting an application does not confirm a booking.
        </div>
      </div>
    </section>
  );
};
