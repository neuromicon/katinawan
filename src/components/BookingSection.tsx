import React, { useState } from 'react';
import { CeremonyEvent, ApplicationFormInput } from '../types';
import { submitApplication } from '../services/api';
import {
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  Send,
  Shield,
  Info,
  Copy,
  Check,
  FileText
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'google_form' | 'direct_web'>('google_form');

  // Direct web form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [attendeeCount, setAttendeeCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'messenger'>('email');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Success state for direct web form
  const [successReceipt, setSuccessReceipt] = useState<{
    application_id: string;
    event_title: string;
    status: string;
    message: string;
    created_at: string;
  } | null>(null);

  const currentEvent = events.find((e) => e.event_id === selectedEventId);

  const GOOGLE_FORM_VIEW_URL = 'https://docs.google.com/forms/d/1JbFiJJcT9n3e9k31qQzZq4SAbPzsE79jeRepDu70Ras/viewform';
  const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/1JbFiJJcT9n3e9k31qQzZq4SAbPzsE79jeRepDu70Ras/viewform?embedded=true';

  const formatSelectedDate = () => {
    if (!currentEvent) return null;
    try {
      const d = new Date(currentEvent.starts_at);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return currentEvent.starts_at;
    }
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!selectedEventId) {
      setError('Please select your preferred Saturday date or flexible queue.');
      return;
    }
    if (!privacyConsent) {
      setError('Please agree to the Privacy Policy to proceed.');
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
      setError(err?.message || 'We could not submit your application. Please use the Google Form above.');
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

  return (
    <section id="apply" className="py-16 sm:py-20 bg-[#142A21] text-[#F4F0E6] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1b382c]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C4A46A] font-semibold block mb-2">
            Application &amp; Registration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F4F0E6] font-normal tracking-tight mb-4 leading-tight">
            Ceremony Application Form
          </h2>
          <p className="text-sm sm:text-base text-[#F4F0E6]/80 font-light leading-relaxed">
            Please fill out the official application questionnaire below. Our facilitators review all submissions manually to ensure container safety, mutual readiness, and energetic alignment.
          </p>
        </div>

        {/* Selected Date Notice Banner */}
        {currentEvent && (
          <div className="mb-6 p-4 rounded-xl bg-[#1b382c] border border-[#C4A46A]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C4A46A] text-[#142A21] flex items-center justify-center flex-shrink-0 font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C4A46A] font-semibold block">
                  Chosen Gathering
                </span>
                <span className="font-serif text-lg text-[#F4F0E6] font-medium block leading-snug">
                  {formatSelectedDate()}
                </span>
                <span className="text-xs text-[#B8C7AE]/80">
                  Saturday 3:00 PM – Sunday 12:00 PM • Private Visayas Sanctuary
                </span>
              </div>
            </div>
            <a
              href="#upcoming"
              className="text-xs text-[#C4A46A] hover:underline self-start sm:self-center font-medium"
            >
              Change Date
            </a>
          </div>
        )}

        {/* Application Method Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-[#1b382c]/90 p-2 rounded-xl border border-[#C4A46A]/30">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('google_form')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'google_form'
                  ? 'bg-[#C4A46A] text-[#142A21] shadow-sm'
                  : 'text-[#F4F0E6]/75 hover:text-[#F4F0E6]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Official Google Form</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('direct_web')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'direct_web'
                  ? 'bg-[#C4A46A] text-[#142A21] shadow-sm'
                  : 'text-[#F4F0E6]/75 hover:text-[#F4F0E6]'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Direct Portal Form</span>
            </button>
          </div>

          <a
            href={GOOGLE_FORM_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#C4A46A] hover:text-[#e4ebd6] hover:bg-[#142A21] transition-colors"
          >
            <span>Open in Full Screen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* TAB 1: EMBEDDED GOOGLE FORM (PRIMARY) */}
        {activeTab === 'google_form' && (
          <div className="bg-white rounded-2xl p-2 sm:p-4 shadow-2xl border border-[#C4A46A]/50 overflow-hidden">
            <div className="p-3 bg-[#FAF8F2] rounded-xl mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#142A21]">
              <div className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-[#C4A46A] flex-shrink-0" />
                <span>Google Forms Secure Application Portal</span>
              </div>
              <a
                href={GOOGLE_FORM_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#b08f53] hover:underline font-semibold"
              >
                <span>If form does not load on your device, click here</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Iframe */}
            <div className="w-full relative rounded-lg overflow-hidden bg-stone-50 min-h-[750px] sm:min-h-[880px]">
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                width="100%"
                height="880"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full h-[750px] sm:h-[880px] rounded-lg border-0"
                title="Sacred Plant Spirit Healing Application Form"
              >
                Loading Google Form...
              </iframe>
            </div>

            <div className="mt-3 p-3 text-center text-xs text-stone-600 bg-stone-100 rounded-lg">
              Applications are reviewed confidentially. You will receive an email response regarding status and available slots.
            </div>
          </div>
        )}

        {/* TAB 2: DIRECT WEB FORM (BACKED BY APPS SCRIPT) */}
        {activeTab === 'direct_web' && (
          <div>
            {successReceipt ? (
              <div className="bg-[#FAF8F2] text-[#142A21] rounded-2xl p-6 sm:p-10 shadow-2xl border border-[#C4A46A]/40 animate-in fade-in">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B8C7AE]/30">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#142A21] font-semibold leading-snug">
                      Application Submitted Successfully
                    </h3>
                    <p className="text-xs text-[#7a8c6f]">
                      Your application has been received for manual review.
                    </p>
                  </div>
                </div>

                <div className="bg-[#F4F0E6] p-5 sm:p-6 rounded-xl border border-[#B8C7AE]/40 mb-6 space-y-3 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#B8C7AE]/20">
                    <span className="text-xs uppercase tracking-wider text-[#7a8c6f]">
                      Reference Code
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

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#B8C7AE]/20">
                    <span className="text-xs uppercase tracking-wider text-[#7a8c6f]">Gathering Date</span>
                    <span className="font-semibold text-[#142A21] text-left sm:text-right">
                      {successReceipt.event_title}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs uppercase tracking-wider text-[#7a8c6f]">Review Status</span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full font-semibold text-xs bg-amber-100 text-amber-800">
                      {successReceipt.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-50/80 border border-[#C4A46A]/50 text-xs text-[#142A21]/90 mb-6 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#b08f53]">
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <span>Deposit Safety Notice</span>
                  </div>
                  <p className="leading-relaxed">
                    If approved, deposit details and instructions will be sent exclusively from our official verified facilitator email. Never send funds to unverified channels.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setSuccessReceipt(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#142A21] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1b382c] transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleDirectSubmit}
                className="bg-[#1b382c]/80 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-[#C4A46A]/30 shadow-2xl space-y-5"
              >
                {error && (
                  <div className="p-4 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#C4A46A] mb-1.5">
                    Preferred Saturday Vigil Date *
                  </label>
                  <select
                    value={selectedEventId || 'flexible'}
                    onChange={(e) => onSelectEvent(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] text-xs sm:text-sm focus:border-[#C4A46A] focus:outline-none"
                    required
                  >
                    <option value="flexible">
                      🌿 I am flexible — contact me for upcoming available Saturdays
                    </option>
                    {events.map((evt) => (
                      <option key={evt.event_id} value={evt.event_id}>
                        {evt.title} ({new Date(evt.starts_at).toLocaleDateString()}) - 3:00 PM
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] placeholder-stone-500 text-sm focus:border-[#C4A46A] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] placeholder-stone-500 text-sm focus:border-[#C4A46A] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Attendees & Preferred Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-1.5">
                      Number of Applicants *
                    </label>
                    <select
                      value={attendeeCount}
                      onChange={(e) => setAttendeeCount(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] text-sm focus:border-[#C4A46A] focus:outline-none"
                    >
                      <option value={1}>1 Person (Solo Seeker)</option>
                      <option value={2}>2 Persons (Couples / Companions)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-1.5">
                      Preferred Contact Channel
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPreferredContact('email')}
                        className={`py-2.5 px-3 rounded text-xs font-medium border text-center transition-colors ${
                          preferredContact === 'email'
                            ? 'bg-[#C4A46A] text-[#142A21] border-[#C4A46A]'
                            : 'bg-[#142A21] text-[#F4F0E6] border-[#B8C7AE]/30'
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
                            : 'bg-[#142A21] text-[#F4F0E6] border-[#B8C7AE]/30'
                        }`}
                      >
                        FB Messenger
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#B8C7AE] mb-1.5">
                    Intentions or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share any reflections, spiritual background, or questions..."
                    className="w-full px-4 py-3 rounded-lg bg-[#142A21] border border-[#B8C7AE]/30 text-[#F4F0E6] placeholder-stone-500 text-sm focus:border-[#C4A46A] focus:outline-none"
                  />
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#C4A46A] bg-[#142A21] border-[#B8C7AE]/50"
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
                      and understand all applications are subject to manual screening.
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit via Direct Portal'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
