import React from 'react';
import { Leaf } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => (
  <footer className="bg-[#142A21] text-[#F4F0E6] pt-16 pb-12 border-t border-[#C4A46A]/20 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1b382c] border border-[#C4A46A]/40 flex items-center justify-center text-[#C4A46A]">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl tracking-wide font-semibold">Katin-awan</span>
          </div>
          <p className="text-base sm:text-xs text-[#B8C7AE] leading-relaxed max-w-md">
            A ceremonial space for reflection, connection, and reverence in the Visayas, Philippines.
          </p>
          <p className="text-sm sm:text-[11px] text-[#B8C7AE]/70">Sanctuary: private location in the Visayas Region, Philippines.</p>
        </div>

        <div>
          <h4 className="font-serif text-xl sm:text-lg mb-4 text-[#F4F0E6]">Explore</h4>
          <ul className="space-y-3 sm:space-y-2 text-base sm:text-xs text-[#B8C7AE]">
            <li><a href="#ceremony" className="hover:text-[#C4A46A] transition-colors py-1 block">The Ceremony</a></li>
            <li><a href="#upcoming" className="hover:text-[#C4A46A] transition-colors py-1 block">Confirmed Dates</a></li>
            <li><a href="#gallery" className="hover:text-[#C4A46A] transition-colors py-1 block">Photo Gallery</a></li>
            <li><a href="#preparation" className="hover:text-[#C4A46A] transition-colors py-1 block">Preparation Guide</a></li>
            <li><a href="#faq" className="hover:text-[#C4A46A] transition-colors py-1 block">Frequently Asked Questions</a></li>
            <li><a href="#contact" className="hover:text-[#C4A46A] transition-colors py-1 block">Contact the Organizer</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl sm:text-lg mb-4 text-[#F4F0E6]">Policies</h4>
          <ul className="space-y-3 sm:space-y-2.5 text-base sm:text-xs text-[#B8C7AE]">
            <li><button onClick={onOpenPrivacy} className="hover:text-[#C4A46A] transition-colors text-left py-1 block">Privacy Policy</button></li>
            <li><button onClick={onOpenTerms} className="hover:text-[#C4A46A] transition-colors text-left py-1 block">Terms &amp; Conditions</button></li>
            <li>
              <a href="https://github.com/neuromicon/katinawan" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4A46A] transition-colors py-1 block">GitHub Repository</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-[#C4A46A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-[11px] text-[#B8C7AE]/80">
        <p className="text-center sm:text-left">Only dates explicitly published by the organizer are listed. Submitting an application does not confirm a booking.</p>
        <p className="text-center sm:text-right">&copy; 2026 Katin-awan — Sacred Plant Spirit Healing. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
