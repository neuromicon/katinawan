import React from 'react';
import { X, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#FAF8F2] text-[#142A21] rounded-2xl shadow-2xl border border-[#B8C7AE]/50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#B8C7AE]/30 flex items-center justify-between bg-[#F4F0E6]">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#7a8c6f]" />
            <h3 className="font-serif text-2xl text-[#142A21]">Booking Terms &amp; Policies</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-[#142A21] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body per Spec Section 5.9 */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#142A21]/85 leading-relaxed">
          <p className="text-[11px] text-[#7a8c6f] uppercase tracking-wider font-mono">
            Sacred Plant Spirit Healing (Katin-awan) • Ceremony Protocol
          </p>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">1. Application &amp; Review</h4>
            <p>
              Submitting an application does not guarantee participation or reserve a spot. Every application is reviewed individually by the facilitators to ensure container harmony and suitability.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">2. Deposit &amp; Confirmation</h4>
            <p>
              If an application is approved, the organizer issues deposit instructions specifying the amount, currency, and payment deadline. A booking is confirmed only after the organizer manually verifies receipt of the deposit.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">3. Capacity &amp; Waiting List</h4>
            <p>
              Containers are strictly capped at 10 to 12 participants. If an event reaches full capacity, additional applicants are placed on a waitlist. Waitlisted spots do not constitute confirmed reservations.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">4. Cancellations &amp; Rescheduling</h4>
            <p>
              If an applicant needs to cancel, notify the organizer immediately via the{' '}
              <a
                href="mailto:katinawanph@gmail.com"
                className="inline-flex items-center gap-1 font-semibold text-[#142A21] underline hover:text-[#C4A46A]"
              >
                Organizer Email (mailto)
              </a>. Due to limited container sizing, deposit refunds or date rescheduling are handled on a case-by-case basis per notice timeline. If an event is cancelled by the organizers due to unforeseen weather or circumstances, applicants will receive a full refund or transfer.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">5. Participant Responsibility</h4>
            <p>
              Participants commit to reviewing all preparation instructions (La Dieta), answering pre-screening queries honestly, adhering to sanctuary etiquette, and seeking independent medical advice if managing health conditions.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#B8C7AE]/30 bg-[#F4F0E6] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-[#142A21] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1b382c] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
