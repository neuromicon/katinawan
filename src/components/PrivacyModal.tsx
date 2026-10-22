import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#FAF8F2] text-[#142A21] rounded-2xl shadow-2xl border border-[#B8C7AE]/50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#B8C7AE]/30 flex items-center justify-between bg-[#F4F0E6]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#7a8c6f]" />
            <h3 className="font-serif text-2xl text-[#142A21]">Privacy Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-[#142A21] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body per Spec Section 5.8 */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#142A21]/85 leading-relaxed">
          <p className="text-[11px] text-[#7a8c6f] uppercase tracking-wider font-mono">
            Last Updated: October 2026 • Sacred Plant Spirit Healing (Katin-awan)
          </p>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">1. Who We Are</h4>
            <p>
              Sacred Plant Spirit Healing operates this website and processes applications for its ceremonial vigils in the Philippines. Primary Contact: <strong>katinawanph@gmail.com</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">2. Information We Collect</h4>
            <p>
              When you submit an application, we collect your full name, email address, selected ceremony date, number of requested places, optional message or spiritual intentions, preferred contact channel, and timestamped consent.
            </p>
            <p>
              <strong>We do not collect sensitive medical histories through the public booking form.</strong> Any health suitability questionnaire is handled separately through private, direct communication.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">3. Why We Use It</h4>
            <p>
              We use this information exclusively to process gathering applications, assess container availability, communicate with applicants, manage deposit verification, and coordinate logistics. We do not sell or trade personal data.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">4. Access &amp; Storage Security</h4>
            <p>
              Access to applicant data is restricted to authorized organizers. Data is stored within secure, private Google Workspace / Google Sheets instances and encrypted in transit via HTTPS.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold text-[#142A21]">5. Retention &amp; Rights</h4>
            <p>
              Application and payment records are retained only for the duration required to conduct the gathering and complete operational audit records. Under Philippine data protection laws, you retain the right to request access, correction, or deletion of your records by emailing <strong>katinawanph@gmail.com</strong>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#B8C7AE]/30 bg-[#F4F0E6] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-[#142A21] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1b382c] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
