import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#FAF8F2] text-[#142A21] rounded-2xl shadow-2xl border border-[#B8C7AE]/50 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-[#B8C7AE]/30 flex items-center justify-between bg-[#F4F0E6]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#7a8c6f]" />
            <h3 className="font-serif text-2xl">Privacy Policy</h3>
          </div>
          <button onClick={onClose} aria-label="Close Privacy Policy" className="p-1.5 text-stone-500 hover:text-[#142A21] rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#142A21]/85 leading-relaxed">
          <p className="text-[11px] text-[#7a8c6f] uppercase tracking-wider font-mono">Last updated: October 2026 • Katin-awan</p>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold">1. Public event calendar</h4>
            <p>The site requests a publicly accessible CSV export of the Google Sheets tab named Events. The published tab is public: do not place applicant details, payment information, private notes, or other non-public data in it. The website displays rows marked Published=TRUE and does not create local application records.</p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold">2. Applications and contact</h4>
            <p>Applications are submitted directly to the embedded Google Form. The site does not control that form’s questions or response-sheet settings; review the form before entering information. Email and Messenger links open external services, which handle any information you provide there.</p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold">3. Storage and third parties</h4>
            <p>The static website does not save application, payment, or event records in the visitor’s browser. Google Forms, Google Sheets, GitHub Pages, email, and Messenger operate under their respective service settings and privacy notices. This code review cannot verify the account permissions, retention, or sharing configuration chosen by the organizer.</p>
          </section>

          <section className="space-y-2">
            <h4 className="font-serif text-base font-semibold">4. Questions about information</h4>
            <p>For questions about information submitted through the Google Form or shared with the organizer, contact <a href="mailto:katinawanph@gmail.com" className="font-semibold underline hover:text-[#C4A46A]">katinawanph@gmail.com</a>. The organizer must handle requests according to the actual storage, access, and retention settings of the relevant services.</p>
          </section>
        </div>

        <div className="p-4 border-t border-[#B8C7AE]/30 bg-[#F4F0E6] flex justify-end">
          <button onClick={onClose} className="px-6 py-2 rounded bg-[#142A21] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1b382c] transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};
