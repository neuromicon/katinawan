import React from 'react';
import { Leaf, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-[#142A21] text-[#F4F0E6] pt-16 pb-12 border-t border-[#C4A46A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1b382c] border border-[#C4A46A]/40 flex items-center justify-center text-[#C4A46A]">
                <Leaf className="w-4 h-4 text-[#C4A46A]" />
              </div>
              <span className="font-serif text-2xl tracking-wide font-semibold text-[#F4F0E6]">
                Katin-awan
              </span>
            </div>
            <p className="text-xs text-[#B8C7AE] leading-relaxed max-w-md">
              Sacred Plant Spirit Healing • A dedicated container for spiritual communion, inner clarity, and reverence for traditional Mazatecan Velada vigils and ancestral Philippine earth healing.
            </p>
            <p className="text-[11px] text-[#B8C7AE]/70">
              Sanctuary: Private Location, Visayas Region, Philippines.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-lg text-[#F4F0E6] mb-4">Explore</h4>
            <ul className="space-y-2 text-xs text-[#B8C7AE]">
              <li>
                <a href="#ceremony" className="hover:text-[#C4A46A] transition-colors">
                  The Ceremony &amp; Velada
                </a>
              </li>
              <li>
                <a href="#upcoming" className="hover:text-[#C4A46A] transition-colors">
                  Upcoming Gatherings
                </a>
              </li>
              <li>
                <a href="#preparation" className="hover:text-[#C4A46A] transition-colors">
                  Preparation Guide (La Dieta)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C4A46A] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C4A46A] transition-colors">
                  Contact the Organizer
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Admin */}
          <div>
            <h4 className="font-serif text-lg text-[#F4F0E6] mb-4">Governance</h4>
            <ul className="space-y-2 text-xs text-[#B8C7AE]">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#C4A46A] transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#C4A46A] transition-colors text-left"
                >
                  Booking Terms &amp; Conditions
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="https://github.com/neuromicon/katinawan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C4A46A] transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-[#C4A46A] hover:text-[#b08f53] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Organizer Console &amp; Drive</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Disclaimer per Specification */}
        <div className="pt-8 border-t border-[#C4A46A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B8C7AE]/80">
          <p className="text-center sm:text-left">
            Participation is subject to manual application review and container requirements. An application is not a confirmed booking.
          </p>
          <p className="text-center sm:text-right">
            &copy; 2026 Katin-awan — Sacred Plant Spirit Healing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
