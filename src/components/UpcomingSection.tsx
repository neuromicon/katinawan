import React from 'react';
import { CeremonyEvent } from '../types';
import { Calendar, Users, MapPin, Clock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

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
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
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
      case 'CLOSED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-200 text-stone-700">
            Applications Closed
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
    <section id="upcoming" className="py-20 bg-[#FAF8F2] text-[#142A21] relative border-t border-[#B8C7AE]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
            Gathering Calendar
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Upcoming Ceremonies
          </h2>
          <p className="text-sm sm:text-base text-[#142A21]/80 font-light leading-relaxed">
            Review currently published dates and container availability. To preserve depth and psychological safety, every gathering is restricted to an intimate circle of 10 to 12 participants.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center text-[#7a8c6f] text-sm animate-pulse">
            Loading upcoming gatherings...
          </div>
        )}

        {/* Empty State per Specification */}
        {!isLoading && events.length === 0 && (
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#B8C7AE]/40 text-center max-w-2xl mx-auto my-8 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#142A21] mb-2 font-normal">
              No Upcoming Ceremonies Currently Published
            </h3>
            <p className="text-xs sm:text-sm text-[#142A21]/75 leading-relaxed max-w-lg mx-auto mb-6">
              In accordance with our ceremonial practice, confirmed dates, venue locations, and container capacities are announced in alignment with facilitator readiness and natural cycles.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  onSelectEvent('flexible');
                  const el = document.getElementById('apply');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Apply with Flexible Dates</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C4A46A]" />
              </button>
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-[#7a8c6f] hover:border-[#142A21] text-[#142A21] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Contact Organizer
              </a>
            </div>
          </div>
        )}

        {/* Event Cards Grid */}
        {!isLoading && events.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {events.map((event) => {
              const isSelected = selectedEventId === event.event_id;
              const isClosed = event.status === 'CLOSED';

              return (
                <div
                  key={event.event_id}
                  className={`flex flex-col justify-between rounded-xl bg-white border transition-all duration-300 p-6 sm:p-7 shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-[#C4A46A] ring-2 ring-[#C4A46A]/20 bg-[#FBF9F4]'
                      : 'border-[#B8C7AE]/40 hover:border-[#7a8c6f]'
                  }`}
                >
                  <div>
                    {/* Status Badge & Capacity */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {getStatusBadge(event.status, event.remaining_capacity)}
                      <span className="text-xs text-[#7a8c6f] flex items-center gap-1 font-mono">
                        <Users className="w-3.5 h-3.5" />
                        Max {event.capacity}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-[#142A21] leading-snug mb-3 font-normal">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#142A21]/75 leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Date & Location Details */}
                    <div className="space-y-2.5 text-xs text-[#142A21]/80 mb-6 pb-6 border-b border-[#B8C7AE]/20">
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-[#7a8c6f] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-[#142A21]">
                            {formatDate(event.starts_at)} – {formatDate(event.ends_at)}
                          </span>
                          <span className="text-[11px] text-[#7a8c6f]">
                            Starts {formatTime(event.starts_at)} • {event.timezone}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#7a8c6f] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[11px] text-[#142A21]/90">
                            {event.location_label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-[11px] text-[#7a8c6f]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Weekend Vigil (Saturday 15:00 to Sunday 12:00)</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div>
                    {isClosed ? (
                      <button
                        disabled
                        className="w-full py-2.5 px-4 rounded text-xs font-semibold text-stone-400 bg-stone-100 cursor-not-allowed"
                      >
                        Applications Closed
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectEvent(event.event_id);
                          const el = document.getElementById('apply');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full py-2.5 px-4 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-[#142A21] text-[#F4F0E6]'
                            : 'bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] shadow-sm'
                        }`}
                      >
                        <span>{event.status === 'WAITLIST' ? 'Join Waiting List' : 'Apply for this Date'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer Note */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-[#F4F0E6] border border-[#B8C7AE]/30 text-xs text-[#142A21]/80 max-w-2xl mx-auto">
          <ShieldCheck className="w-5 h-5 text-[#7a8c6f] flex-shrink-0" />
          <p>
            <strong>Availability Notice:</strong> Container availability is subject to manual application review and changes dynamically. Submitting an application does not lock a spot until approved and confirmed.
          </p>
        </div>
      </div>
    </section>
  );
};
