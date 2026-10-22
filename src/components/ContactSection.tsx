import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#F4F0E6] text-[#142A21] relative border-t border-[#B8C7AE]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
            Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Contact the Organizer
          </h2>
          <p className="text-sm sm:text-base text-[#142A21]/80 font-light leading-relaxed">
            Have questions regarding upcoming dates, eligibility, ceremonial etiquette, or travel arrangements? Reach out to us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Column 1: Verified Channels & Location */}
          <div className="space-y-6">
            <div className="bg-[#FAF8F2] p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl text-[#142A21]">Direct Communication Channels</h3>
              
              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:katinawanph@gmail.com"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#B8C7AE]/30 hover:border-[#C4A46A] transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#7a8c6f] font-semibold block">
                      Primary Email
                    </span>
                    <span className="text-sm font-semibold text-[#142A21] group-hover:text-[#b08f53]">
                      katinawanph@gmail.com
                    </span>
                    <p className="text-xs text-[#142A21]/70 mt-0.5">
                      For detailed applications, health questionnaires &amp; logistics.
                    </p>
                  </div>
                </a>

                {/* Facebook Messenger */}
                <a
                  href="https://m.me/katinawanph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#B8C7AE]/30 hover:border-[#C4A46A] transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1b382c] text-[#C4A46A] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#7a8c6f] font-semibold block">
                      Facebook Messenger
                    </span>
                    <span className="text-sm font-semibold text-[#142A21] group-hover:text-[#b08f53]">
                      m.me/katinawanph
                    </span>
                    <p className="text-xs text-[#142A21]/70 mt-0.5">
                      For quick informal questions and verified messenger chats.
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#B8C7AE]/30">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F2] text-[#7a8c6f] border border-[#B8C7AE]/40 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#7a8c6f] font-semibold block">
                      Sanctuary Location
                    </span>
                    <span className="text-sm font-semibold text-[#142A21]">
                      Visayas Island Region, Philippines
                    </span>
                    <p className="text-xs text-[#142A21]/70 mt-0.5">
                      Secluded natural sanctuary. Directions and pin provided upon verified booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#B8C7AE]/30 text-xs text-[#142A21]/80 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#7a8c6f] flex-shrink-0" />
              <span>
                All inquiries are treated with strict confidentiality and respect.
              </span>
            </div>
          </div>

          {/* Column 2: Send Message Form */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#B8C7AE]/40 shadow-sm">
            <h3 className="font-serif text-2xl text-[#142A21] mb-2">Send an Enquiry</h3>
            <p className="text-xs text-[#7a8c6f] mb-6">
              Our organizers review incoming correspondence thoughtfully.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl text-[#142A21] font-semibold">Message Received</h4>
                <p className="text-xs text-[#142A21]/80 max-w-sm mx-auto">
                  Thank you for reaching out. The organizer will respond to your provided email address.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#C4A46A] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#7a8c6f] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#B8C7AE]/50 text-sm focus:border-[#C4A46A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#7a8c6f] mb-1.5">
                    Your Email Address *
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

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#7a8c6f] mb-1.5">
                    Your Question / Message *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you?"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#B8C7AE]/50 text-sm focus:border-[#C4A46A] focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#C4A46A]" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
