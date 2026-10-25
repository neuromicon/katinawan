import React from 'react';
import { Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => (
  <section id="contact" className="py-16 sm:py-20 bg-[#F4F0E6] text-[#142A21] relative border-t border-[#B8C7AE]/30 w-full">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">Connect</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4 leading-tight">
          Contact the Organizer
        </h2>
        <p className="text-base sm:text-lg text-[#142A21]/80 font-light leading-relaxed">
          For questions about confirmed dates, preparation, or travel arrangements, contact the organizer directly.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#B8C7AE]/40 shadow-xs">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm uppercase tracking-wider text-[#7a8c6f] font-semibold block">Email</span>
              <span className="text-base sm:text-sm text-[#142A21]/80">For detailed questions and logistics.</span>
            </div>
          </div>
          <a
            href="mailto:katinawanph@gmail.com"
            className="w-full py-3.5 px-4 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-base sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#C4A46A]" />
            Email Organizer
          </a>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#B8C7AE]/40 shadow-xs">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#1b382c] text-[#C4A46A] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm uppercase tracking-wider text-[#7a8c6f] font-semibold block">Messenger</span>
              <span className="text-base sm:text-sm text-[#142A21]/80">For quick questions to the organizers.</span>
            </div>
          </div>
          <a
            href="https://www.messenger.com/t/109269153922979"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-lg bg-[#1b382c] hover:bg-[#234537] text-[#F4F0E6] text-base sm:text-xs font-semibold uppercase tracking-wider transition-all border border-[#C4A46A]/30 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#C4A46A]" />
            Open Messenger
          </a>
          <a
            href="https://web.facebook.com/sacredplantspirithealing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 w-full py-3.5 px-4 rounded-lg bg-white hover:bg-[#FAF8F2] text-[#142A21] text-base sm:text-xs font-semibold uppercase tracking-wider transition-all border border-[#B8C7AE]/50 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-[#7a8c6f]" />
            Visit Facebook Page
          </a>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl bg-[#1b382c] text-[#F4F0E6] border border-[#C4A46A]/30 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm uppercase tracking-wider text-[#C4A46A] font-semibold block mb-1">
                Sanctuary Location
              </span>
              <p className="font-serif text-xl sm:text-2xl mb-2">Visayas Island Region, Philippines</p>
              <p className="text-base sm:text-sm text-[#B8C7AE] leading-relaxed">
                Exact directions are shared privately by the organizer with confirmed participants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
