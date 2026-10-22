import React, { useState } from 'react';
import { Application } from '../types';
import { lookupApplicationStatus, reportDeposit } from '../services/api';
import { X, Search, CheckCircle2, Clock, AlertCircle, CreditCard, Send, ShieldCheck } from 'lucide-react';

interface StatusCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatusCheckModal: React.FC<StatusCheckModalProps> = ({ isOpen, onClose }) => {
  const [reference, setReference] = useState('');
  const [email, setEmail] = useState('');
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Deposit reporting state
  const [paymentRefInput, setPaymentRefInput] = useState('');
  const [isReportingDeposit, setIsReportingDeposit] = useState(false);
  const [depositReportSuccess, setDepositReportSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDepositReportSuccess(null);

    if (!reference.trim() || !email.trim()) {
      setError('Please provide both your application reference and email address.');
      return;
    }

    try {
      setIsLoading(true);
      const app = await lookupApplicationStatus(reference.trim(), email.trim());
      if (!app) {
        setError('No application found with matching reference and email address. Please double-check your credentials.');
        setApplication(null);
      } else {
        setApplication(app);
      }
    } catch (err: any) {
      setError(err?.message || 'Error looking up application status.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application || !paymentRefInput.trim()) return;

    try {
      setIsReportingDeposit(true);
      const res = await reportDeposit({
        application_id: application.application_id,
        payment_reference: paymentRefInput.trim(),
        notes: 'Submitted via applicant portal'
      });
      setDepositReportSuccess(res.message);
      // Refresh local application state
      setApplication({
        ...application,
        status: 'DEPOSIT_REPORTED',
        deposit_reported_reference: paymentRefInput.trim()
      });
      setPaymentRefInput('');
    } catch (err: any) {
      setError(err?.message || 'Failed to report deposit.');
    } finally {
      setIsReportingDeposit(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_REVIEW':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'AWAITING_DEPOSIT':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'DEPOSIT_REPORTED':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'DEPOSIT_VERIFIED':
      case 'CONFIRMED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'WAITLISTED':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'DECLINED':
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  const getStatusExplanation = (status: string) => {
    switch (status) {
      case 'PENDING_REVIEW':
        return 'Your application is in queue for manual review by our ceremonial facilitators. We will email you with our decision.';
      case 'AWAITING_DEPOSIT':
        return 'Your application has been approved! Please check your email for the deposit amount and instructions. Once sent, enter your payment reference below.';
      case 'DEPOSIT_REPORTED':
        return 'Your payment report has been received! The organizer will manually verify the funds through the bank or wallet and issue your confirmed booking.';
      case 'DEPOSIT_VERIFIED':
      case 'CONFIRMED':
        return 'Your place in the circle is confirmed! Detailed sanctuary coordinates and travel arrangements have been delivered to your email.';
      case 'WAITLISTED':
        return 'The selected gathering is currently full. You are on the priority waiting list. If a space becomes open, we will contact you immediately.';
      case 'DECLINED':
        return 'We are unable to confirm your attendance for this gathering date.';
      case 'CANCELLED':
        return 'This application or event has been cancelled.';
      default:
        return 'Application status recorded.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#FAF8F2] text-[#142A21] rounded-2xl shadow-2xl border border-[#B8C7AE]/50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#B8C7AE]/30 flex items-center justify-between bg-[#F4F0E6]">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-[#7a8c6f]" />
            <h3 className="font-serif text-2xl text-[#142A21]">Check Application Status</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-[#142A21] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Lookup Form */}
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#7a8c6f] mb-1.5">
                Application Reference *
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. KTW-20261021-3481"
                className="w-full px-4 py-2.5 rounded-lg border border-[#B8C7AE]/50 text-sm font-mono focus:border-[#C4A46A] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#7a8c6f] mb-1.5">
                Email Address used *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-2.5 rounded-lg border border-[#B8C7AE]/50 text-sm focus:border-[#C4A46A] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {isLoading ? 'Searching...' : 'Lookup Status'}
            </button>
          </form>

          {error && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Results Box */}
          {application && (
            <div className="p-5 rounded-xl bg-white border border-[#B8C7AE]/40 shadow-xs space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#B8C7AE]/20">
                <span className="font-mono text-xs font-bold text-[#142A21]">
                  {application.application_id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#142A21]/80">
                <p>
                  <strong>Applicant:</strong> {application.full_name} ({application.attendee_count} seeker{application.attendee_count > 1 ? 's' : ''})
                </p>
                <p>
                  <strong>Gathering:</strong> {application.event_title || application.event_id}
                </p>
                <p>
                  <strong>Submitted:</strong> {new Date(application.created_at).toLocaleString()}
                </p>
              </div>

              {/* Status Explanation */}
              <div className="p-3.5 rounded-lg bg-[#FAF8F2] border border-[#B8C7AE]/30 text-xs text-[#142A21]/90 leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-[#7a8c6f] mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Current State</span>
                </div>
                {getStatusExplanation(application.status)}
              </div>

              {/* Action if AWAITING_DEPOSIT: report deposit reference */}
              {application.status === 'AWAITING_DEPOSIT' && (
                <div className="pt-3 border-t border-[#B8C7AE]/20">
                  <h4 className="font-serif text-sm font-semibold text-[#142A21] mb-2 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#7a8c6f]" />
                    <span>Report Deposit Payment</span>
                  </h4>
                  <form onSubmit={handleReportDeposit} className="space-y-2">
                    <input
                      type="text"
                      value={paymentRefInput}
                      onChange={(e) => setPaymentRefInput(e.target.value)}
                      placeholder="Bank reference number or transaction ID"
                      className="w-full px-3 py-2 rounded border border-[#B8C7AE]/50 text-xs font-mono"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isReportingDeposit}
                      className="w-full py-2 rounded bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      {isReportingDeposit ? 'Submitting...' : 'Submit Payment Report'}
                    </button>
                  </form>
                </div>
              )}

              {depositReportSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{depositReportSuccess}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
