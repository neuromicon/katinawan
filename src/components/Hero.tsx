import React from 'react';
import { Sparkles, Compass, ShieldCheck, Moon, Leaf } from 'lucide-react';

interface HeroProps {
  onExploreUpcoming: () => void;
  onLearnCeremonies: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreUpcoming, onLearnCeremonies }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 sm:pt-36 pb-16 sm:pb-20 bg-[#142A21] text-[#F4F0E6] overflow-hidden">
      {/* Botanical ambient gradient circles */}
      <div className="absolute top-1/4 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-[#1b382c]/80 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-[#C4A46A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle organic pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C4A46A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b382c] border border-[#C4A46A]/30 text-xs sm:text-sm uppercase tracking-widest text-[#C4A46A] mb-7 sm:mb-9 shadow-xs max-w-full">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate sm:whitespace-normal">Katin-awan • Sacred Plant Spirit Healing</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#F4F0E6] leading-snug sm:leading-tight md:leading-[1.15] mb-6 sm:mb-7">
          Sacred Ceremonies &amp; <br className="hidden sm:inline" />
          <span className="italic font-light text-[#C4A46A]">Healing Experiences</span>
        </h1>

        {/* Intro Body */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#F4F0E6]/85 font-light leading-relaxed mb-7 sm:mb-9">
          A curated space for Velada vigils, Ayahuasca ceremonies, night gatherings, and private healing experiences — held in tranquil sanctuaries across the Philippines.
        </p>

        {/* Cultural Etymology Note */}
        <div className="max-w-xl mx-auto mb-9 sm:mb-11 p-4 sm:p-5 rounded-lg bg-[#1b382c]/60 border border-[#B8C7AE]/20 text-sm text-[#B8C7AE] text-left sm:text-center leading-relaxed">
          <span className="font-semibold text-[#F4F0E6]">The Meaning of Katin-awan: </span>
          In Cebuano, <em>katin-awan</em> translates to &ldquo;clarification,&rdquo; &ldquo;explanation,&rdquo; or &ldquo;enlightenment&rdquo; (from the root <em>tin-aw</em>, lucid and clear).
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-11 sm:mb-14">
          <button
            onClick={onExploreUpcoming}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 flex-shrink-0" />
            <span>Upcoming Ceremonies</span>
          </button>

          <button
            onClick={onLearnCeremonies}
            className="w-full sm:w-auto px-8 py-4 rounded-lg border border-[#B8C7AE]/40 hover:border-[#C4A46A] text-[#F4F0E6] hover:text-[#C4A46A] font-medium text-sm tracking-wide transition-all bg-[#1b382c]/30 hover:bg-[#1b382c]/60 flex items-center justify-center gap-2"
          >
            <Moon className="w-4 h-4 text-[#C4A46A] flex-shrink-0" />
            <span>Explore Our Ceremonies</span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-7 sm:pt-9 border-t border-[#C4A46A]/20 text-sm text-[#B8C7AE]">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C4A46A] flex-shrink-0" />
            <span>Individual Application Review</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C4A46A] flex-shrink-0" />
            <span>Limited Capacity (10–12 seekers)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4 text-[#C4A46A] flex-shrink-0" />
            <span>Visayas Sanctuary, Philippines</span>
          </div>
        </div>
      </div>
    </section>
  );
};
