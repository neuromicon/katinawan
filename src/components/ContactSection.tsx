import React from 'react';
import { Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => (
  <section id="contact" className="py-16 sm:py-20 bg-[#F4F0E6] text-[#142A21] relative border-t border-[#B8C7AE]/30">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">Connect</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4 leading-tight">
          Contact the Organizer
        </h2>
        <p className="text-sm sm:text-base text-[#142A21]/80 font-light leading-relaxed">
          For questions about confirmed dates, preparation, or travel arrangements, contact the organizer directly.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-5">
        <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#B8C7AE]/40 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#7a8c6f] font-semibold block">Email</span>
              <span className="text-sm text-[#142A21]/75">For detailed questions and logistics.</span>
            </div>
          </div>
          <a
            href="mailto:katinawanph@gmail.com"
            className="w-full py-3 px-4 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#C4A46A]" />
            Email Organizer
          </a>
        </div>

        <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#B8C7AE]/40 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1b382c] text-[#C4A46A] flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#7a8c6f] font-semibold block">Messenger</span>
              <span className="text-sm text-[#142A21]/75">For quick questions to the organizers.</span>
            </div>
          </div>
          <a
            href="https://www.messenger.com/t/109269153922979"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-lg bg-[#1b382c] hover:bg-[#234537] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-all border border-[#C4A46A]/30 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#C4A46A]" />
            Open Messenger
          </a>
          <a
            href="https://web.facebook.com/sacredplantspirithealing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-3 px-4 rounded-lg bg-white hover:bg-[#FAF8F2] text-[#142A21] text-xs font-semibold uppercase tracking-wider transition-all border border-[#B8C7AE]/50 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-[#7a8c6f]" />
            Visit Facebook Page
          </a>
        </div>

        <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#FAF8F2] border border-[#B8C7AE]/30">
          <div className="w-10 h-10 rounded-full bg-white text-[#7a8c6f] border border-[#B8C7AE]/40 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#7a8c6f] font-semibold block">Sanctuary Location</span>
            <span className="text-sm font-semibold block">Visayas Island Region, Philippines</span>
            <p className="text-xs text-[#142A21]/70 mt-1 leading-relaxed">
              Exact directions are shared privately by the organizer with confirmed participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
