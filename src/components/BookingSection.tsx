import React from 'react';
import type { CeremonyEvent } from '../types';
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react';

interface BookingSectionProps {
  events: CeremonyEvent[];
  selectedEventId: string;
  onOpenPrivacy: () => void;
}

const GOOGLE_FORM_VIEW_URL =
  'https://docs.google.com/forms/d/1JbFiJJcT9n3e9k31qQzZq4SAbPzsE79jeRepDu70Ras/viewform';
const GOOGLE_FORM_EMBED_URL = `${GOOGLE_FORM_VIEW_URL}?embedded=true`;

export const BookingSection: React.FC<BookingSectionProps> = ({
  events,
  selectedEventId,
  onOpenPrivacy
}) => {
  const selectedEvent = events.find((event) => event.event_id === selectedEventId);
  const selectedDate = selectedEvent
    ? new Date(selectedEvent.starts_at).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <section id="apply" className="py-16 sm:py-20 bg-[#142A21] text-[#F4F0E6] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1b382c]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C4A46A] font-semibold block mb-2">
            Application
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4 leading-tight">
            Ceremony Application Form
          </h2>
          <p className="text-sm sm:text-base text-[#F4F0E6]/80 font-light leading-relaxed">
            Submit an application through the official Google Form. Submitting the form does not confirm a booking; the organizer reviews each application separately.
          </p>
        </div>

        {selectedEvent && (
          <div className="mb-6 p-4 rounded-xl bg-[#1b382c] border border-[#C4A46A]/50 text-sm">
            <span className="text-xs uppercase tracking-wider text-[#C4A46A] font-semibold block mb-1">
              Selected published date
            </span>
            <span className="font-serif text-lg">{selectedDate}</span>
            <p className="text-xs text-[#B8C7AE] mt-1">
              The embedded form does not receive this selection automatically. Choose the same date in the form if it asks for a preferred date.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-2 sm:p-4 shadow-2xl border border-[#C4A46A]/50 overflow-hidden">
          <div className="p-3 bg-[#FAF8F2] rounded-xl mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#142A21]">
            <div className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-[#C4A46A] flex-shrink-0" />
              <span>Official Google Form</span>
            </div>
            <a
              href={GOOGLE_FORM_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#8a6d3b] hover:underline font-semibold"
            >
              <span>Open form in a new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full relative rounded-lg overflow-hidden bg-stone-50 min-h-[750px] sm:min-h-[880px]">
            <iframe
              src={GOOGLE_FORM_EMBED_URL}
              width="100%"
              height="880"
              loading="lazy"
              title="Katin-awan ceremony application Google Form"
              className="w-full h-[750px] sm:h-[880px] rounded-lg border-0"
            >
              Loading Google Form…
            </iframe>
          </div>

          <div className="mt-3 p-3 text-center text-xs text-stone-600 bg-stone-100 rounded-lg">
            <ShieldCheck className="inline w-4 h-4 mr-1 align-text-bottom" />
            Read the <button type="button" onClick={onOpenPrivacy} className="underline hover:text-[#142A21]">Privacy Policy</button> before submitting personal information.
          </div>
        </div>
      </div>
    </section>
  );
};
