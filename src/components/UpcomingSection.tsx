import React, { useState, useMemo } from 'react';
import { CeremonyEvent } from '../types';
import { Calendar, Users, MapPin, Clock, ArrowRight, ShieldCheck, Search, Filter, Sparkles } from 'lucide-react';

interface UpcomingSectionProps {
  events: CeremonyEvent[];
  selectedEventId: string;
  onSelectEvent: (eventId: string) => void;
  isLoading?: boolean;
}

export const UpcomingSection: React.FC<UpcomingSectionProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  isLoading = false
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayCount, setDisplayCount] = useState<number>(12);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return isoString;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } catch {
      return '3:00 PM';
    }
  };

  // Filter events by year, month, search query
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const date = new Date(evt.starts_at);
      const year = date.getUTCFullYear().toString();
      const month = (date.getUTCMonth() + 1).toString();

      if (selectedYear !== 'ALL' && year !== selectedYear) return false;
      if (selectedMonth !== 'ALL' && month !== selectedMonth) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = evt.title.toLowerCase().includes(query);
        const dateMatch = formatDate(evt.starts_at).toLowerCase().includes(query);
        if (!titleMatch && !dateMatch) return false;
      }

      return true;
    });
  }, [events, selectedYear, selectedMonth, searchQuery]);

  const visibleEvents = useMemo(() => {
    return filteredEvents.slice(0, displayCount);
  }, [filteredEvents, displayCount]);

  const handleSelectAndScroll = (eventId: string) => {
    onSelectEvent(eventId);
    const target = document.getElementById('apply');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStatusBadge = (status: string, remaining: number) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Open ({remaining} spots left)
          </span>
        );
      case 'ALMOST_FULL':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Almost Full ({remaining} spots left)
          </span>
        );
      case 'WAITLIST':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-300">
            Waitlist Available
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
            {status}
          </span>
        );
    }
  };

  return (
    <section id="upcoming" className="py-16 sm:py-20 bg-[#FAF8F2] text-[#142A21] relative border-t border-[#B8C7AE]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
            Ceremonial Calendar
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4 leading-tight">
            Upcoming Velada Gatherings
          </h2>
          <p className="text-sm sm:text-base text-[#142A21]/80 font-light leading-relaxed">
            Ceremonies take place every Saturday at <strong>3:00 PM</strong> through Sunday <strong>12:00 PM noon</strong>. To preserve depth, safety, and individual care, each container is strictly capped at 10 to 12 participants.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#B8C7AE]/40 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Year Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs uppercase tracking-wider text-[#7a8c6f] font-semibold mr-1 hidden sm:inline">
                Year:
              </span>
              {[
                { label: 'All Dates', value: 'ALL' },
                { label: '2026', value: '2026' },
                { label: '2027', value: '2027' },
                { label: '2028', value: '2028' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setSelectedYear(tab.value);
                    setDisplayCount(12);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedYear === tab.value
                      ? 'bg-[#142A21] text-[#F4F0E6] shadow-xs'
                      : 'bg-[#FAF8F2] text-[#142A21]/80 hover:bg-[#F4F0E6] border border-[#B8C7AE]/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick stats badge */}
            <div className="text-xs text-[#7a8c6f] font-mono self-end sm:self-center">
              Showing {visibleEvents.length} of {filteredEvents.length} gatherings
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#B8C7AE]/20">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDisplayCount(12);
                }}
                placeholder="Search by month (e.g. November, March)..."
                className="w-full pl-10 pr-3.5 py-2 rounded-lg bg-[#FAF8F2] border border-[#B8C7AE]/40 text-xs text-[#142A21] focus:outline-none focus:border-[#C4A46A]"
              />
            </div>

            {/* Month Dropdown */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setDisplayCount(12);
                }}
                className="w-full px-3.5 py-2 rounded-lg bg-[#FAF8F2] border border-[#B8C7AE]/40 text-xs text-[#142A21] focus:outline-none focus:border-[#C4A46A]"
              >
                <option value="ALL">All Months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center text-[#7a8c6f] text-sm animate-pulse">
            Loading upcoming gatherings...
          </div>
        )}

        {/* No Matches Found */}
        {!isLoading && filteredEvents.length === 0 && (
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#B8C7AE]/40 text-center max-w-lg mx-auto my-8">
            <Calendar className="w-8 h-8 text-[#7a8c6f] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#142A21] mb-2 font-normal">
              No Gatherings Match Your Filter
            </h3>
            <p className="text-xs text-[#142A21]/75 mb-4">
              Clear filters or choose another year to explore all scheduled Saturday dates.
            </p>
            <button
              onClick={() => {
                setSelectedYear('ALL');
                setSelectedMonth('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded bg-[#142A21] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Event Cards Grid */}
        {!isLoading && visibleEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {visibleEvents.map((event) => {
              const isSelected = selectedEventId === event.event_id;

              return (
                <div
                  key={event.event_id}
                  className={`flex flex-col justify-between rounded-xl bg-white border transition-all duration-300 p-5 sm:p-6 shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'border-[#C4A46A] ring-2 ring-[#C4A46A]/20 bg-[#FBF9F4]'
                      : 'border-[#B8C7AE]/40 hover:border-[#7a8c6f]'
                  }`}
                >
                  <div>
                    {/* Status Badge & Capacity */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {getStatusBadge(event.status, event.remaining_capacity)}
                      <span className="text-xs text-[#7a8c6f] flex items-center gap-1 font-mono">
                        <Users className="w-3.5 h-3.5" />
                        Max {event.capacity}
                      </span>
                    </div>

                    {/* Date Heading */}
                    <div className="flex items-start gap-2.5 mb-2">
                      <Calendar className="w-4 h-4 text-[#C4A46A] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#142A21] leading-tight font-medium">
                          {formatDate(event.starts_at)}
                        </h3>
                        <span className="text-xs text-[#7a8c6f] font-light">
                          Vigil concludes {formatDate(event.ends_at)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#142A21]/75 leading-relaxed mb-4 mt-2">
                      {event.description}
                    </p>

                    {/* Time & Venue Information */}
                    <div className="space-y-2 text-xs text-[#142A21]/80 mb-5 pb-4 border-b border-[#B8C7AE]/20">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#7a8c6f] flex-shrink-0" />
                        <span className="font-semibold text-[#142A21]">
                          Saturday {formatTime(event.starts_at)} – Sunday 12:00 PM
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#7a8c6f] flex-shrink-0" />
                        <span className="text-[#142A21]/90">
                          {event.location_label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleSelectAndScroll(event.event_id)}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-[#142A21] text-[#F4F0E6]'
                          : 'bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] shadow-xs'
                      }`}
                    >
                      <span>{isSelected ? 'Selected Date' : 'Apply for this Saturday'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && visibleEvents.length < filteredEvents.length && (
          <div className="text-center mb-12">
            <button
              type="button"
              onClick={() => setDisplayCount((prev) => prev + 12)}
              className="px-8 py-3 rounded-xl bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              Show Next 12 Saturdays ({filteredEvents.length - visibleEvents.length} more)
            </button>
          </div>
        )}

        {/* Bottom Safety & Availability Callout */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-[#F4F0E6] border border-[#B8C7AE]/30 text-xs text-[#142A21]/80 max-w-3xl mx-auto">
          <ShieldCheck className="w-5 h-5 text-[#7a8c6f] flex-shrink-0" />
          <p className="leading-relaxed">
            <strong>Intimate Container Notice:</strong> Every Saturday gathering is limited to 10–12 seekers. Submitting an application on Google Forms reserves your place in the manual review queue.
          </p>
        </div>
      </div>
    </section>
  );
};
