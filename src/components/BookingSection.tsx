import React, { useState } from 'react';
import { CeremonyEvent, ApplicationFormInput } from '../types';
import { submitApplication } from '../services/api';
import { CheckCircle2, AlertCircle, Sparkles, Send, Shield, Info, Copy, Check } from 'lucide-react';

interface BookingSectionProps {
  events: CeremonyEvent[];
  selectedEventId: string;
  onSelectEvent: (eventId: string) => void;
  onOpenPrivacy: () => void;
  onApplicationSubmitted?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
  onOpenPrivacy,
  onApplicationSubmitted
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [attendeeCount, setAttendeeCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'messenger'>('email');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Success state
  const [successReceipt, setSuccessReceipt] = useState<{
    application_id: string;
    event_title: string;
    status: string;
    message: string;
    created_at: string;
  } | null>(null);

  const activeEvents = events.filter((e) => e.status !== 'CLOSED' && e.status !== 'CANCELLED');
  const currentEvent = events.find((e) => e.event_id === selectedEventId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!fullName.trim()) {
      setError('Please complete your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!selectedEventId) {
      setError('Please select a gathering date.');
      return;
    }
    if (!privacyConsent) {
      setError('Please confirm that you have read and agreed to the Privacy Policy.');
      return;
    }

    try {
      setIsSubmitting(true);
      const input: ApplicationFormInput = {
        full_name: fullName,
        email,
        event_id: selectedEventId,
        attendee_count: attendeeCount,
        message,
        preferred_contact: preferredContact,
        privacy_consent: privacyConsent
      };

      const result = await submitApplication(input);
      setSuccessReceipt({
        application_id: result.application_id,
        event_title: currentEvent ? currentEvent.title : 'Sacred Gathering',
        status: result.status,
        message: result.message,
        created_at: new Date().toISOString()
      });

      if (onApplicationSubmitted) {
        onApplicationSubmitted();
      }
    } catch (err: any) {
      setError(err?.message || 'We could not submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (successReceipt) {
      navigator.clipboard.writeText(successReceipt.application_id);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const handleResetForm = () => {
    setSuccessReceipt(null);
    setFullName('');
    setEmail('');
    setMessage('');
    setPrivacyConsent(false);
    setError(null);
  };

  return (
    <section id="apply" className="py-20 bg-[#142A21] text-[#F4F0E6] relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1b382c]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C4A46A] font-semibold block mb-2">
            Application &amp; Intentions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4F0E6] font-normal tracking-tight mb-4">
            Ceremony Application
          </h2>
          <p className="text-sm sm:text-base text-[#F4F0E6]/80 font-light leading-relaxed">
            Complete the form below to enquire about participation. The organizer will review your intentions and contact you with next steps. No payment is required at this stage.
          </p>
        </div>

        {/* Success Modal / State */}
        {successReceipt ? (
          <div className="bg-[#FAF8F2] text-[#142A21] rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#C4A46A]/40 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B8C7AE]/30">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#142A21] font-semibold">
                  Your Application Has Been Received
                </h3>
                <p className="text-xs text-[#7a8c6f]">
                  Application record logged into manual review container.
                </p>
              </div>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#F4F0E6] p-6 rounded-xl border border-[#B8C7AE]/40 mb-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#B8C7AE]/20">
                <span className="text-xs uppercase tracking-wider text-[#7a8c6f]">
                  Application Reference
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#142A21]">
                    {successReceipt.application_id}
                  </span>
                  <button
                    onClick={handleCopyReference}
                    className="p-1 text-stone-500 hover:text-[#142A21] rounded transition-colors"
                    title="Copy reference code"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#B8C7AE]/20 text-xs">
                <span className="uppercase tracking-wider text-[#7a8c6f]">Selected Gathering</span>
                <span className="font-semibold text-[#142A21] text-right">
                  {successReceipt.event_title}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <span className="uppercase tracking-wider text-[#7a8c6f]">Initial Status</span>
                <span className="inline-block px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-amber-100 text-amber-800">
                  {successReceipt.status}
                </span>
              </div>
            </div>

            {/* Deposit Notice per Spec */}
            <div className="p-4 rounded-lg bg-amber-50/80 border border-[#C4A46A]/50 text-xs text-[#142A21]/90 mb-6 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#b08f53]">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>Deposit Policy Notice</span>
              </div>
              <p className="leading-relaxed">
                If approved, you will receive the deposit amount, currency, verified payment channel, and deadline by email from <strong>katinawanph@gmail.com</strong>.
                <strong> Do not send any funds until you have received official email instructions from the organizer.</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#7a8c6f]">
                Please retain your reference number for status checks.
              </span>
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#142A21] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1b382c] transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#1b382c]/80 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-[#C4A46A]/30 shadow-2xl space-y-6"
          >
            {error && (
              <div className="p-4 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Event Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#C4A46A] mb-2">
                Selected Ceremony Date *
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => onSelectEvent(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] text-sm focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
                required
              >
                <option value="">-- Choose an upcoming ceremony --</option>
                {activeEvents.map((evt) => (
                  <option key={evt.event_id} value={evt.event_id}>
                    {evt.title} ({new Date(evt.starts_at).toLocaleDateString()}) - [{evt.status}]
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maria Clara"
                  className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] placeholder-stone-500 text-sm focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] placeholder-stone-500 text-sm focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
                  required
                />
              </div>
            </div>

            {/* Attendees & Preferred Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-2">
                  Number of Applicants *
                </label>
                <select
                  value={attendeeCount}
                  onChange={(e) => setAttendeeCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] text-sm focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
                >
                  <option value={1}>1 Person (Solo Seeker)</option>
                  <option value={2}>2 Persons (Couples / Companions)</option>
                </select>
                <span className="text-[11px] text-[#B8C7AE]/70 mt-1 block">
                  For groups larger than 2, please contact the organizer directly.
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-2">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredContact('email')}
                    className={`py-2.5 px-3 rounded text-xs font-medium border text-center transition-colors ${
                      preferredContact === 'email'
                        ? 'bg-[#C4A46A] text-[#142A21] border-[#C4A46A]'
                        : 'bg-[#142A21] text-[#F4F0E6] border-[#B8C7AE]/30 hover:border-[#B8C7AE]'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContact('messenger')}
                    className={`py-2.5 px-3 rounded text-xs font-medium border text-center transition-colors ${
                      preferredContact === 'messenger'
                        ? 'bg-[#C4A46A] text-[#142A21] border-[#C4A46A]'
                        : 'bg-[#142A21] text-[#F4F0E6] border-[#B8C7AE]/30 hover:border-[#B8C7AE]'
                    }`}
                  >
                    FB Messenger
                  </button>
                </div>
              </div>
            </div>

            {/* Message / Intentions */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-2">
                Your Intentions &amp; Questions for the Organizer (Optional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any reflections, spiritual intentions, previous meditation background, or dietary queries..."
                className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] placeholder-stone-500 text-sm focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
              />
              <span className="text-[11px] text-[#B8C7AE]/70 mt-1 block">
                Do not include sensitive medical records here. Any health evaluation is conducted separately.
              </span>
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#C4A46A] bg-[#142A21] border-[#B8C7AE]/50 focus:ring-[#C4A46A]"
                  required
                />
                <span className="text-xs text-[#F4F0E6]/85 leading-relaxed">
                  I have read the{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-[#C4A46A] underline hover:text-[#b08f53]"
                  >
                    Privacy Policy
                  </button>{' '}
                  and agree that my information may be used solely to process this application and contact me about upcoming gatherings.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] font-semibold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#142A21] border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application for Review</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-[#B8C7AE]/70 mt-3">
                Participation is subject to manual review. An application is not a confirmed booking.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
