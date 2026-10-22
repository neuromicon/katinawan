import React from 'react';
import { Moon, HeartHandshake, ShieldAlert, Sparkles, Clock, Compass } from 'lucide-react';

interface CeremonySectionProps {
  onApplyClick: () => void;
  onPreparationClick: () => void;
}

export const CeremonySection: React.FC<CeremonySectionProps> = ({
  onApplyClick,
  onPreparationClick
}) => {
  return (
    <section id="ceremony" className="py-20 bg-[#F4F0E6] text-[#142A21] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
            The Ceremony
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Understanding the Velada Experience
          </h2>
          <p className="text-base sm:text-lg text-[#142A21]/80 font-light leading-relaxed">
            A sacred nocturnal vigil blending traditional Mazatecan mushroom and cacao communion with the ancient healing spirit of the Philippine islands.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-start">
          {/* Card 1: What is Velada */}
          <div className="bg-[#FAF8F2] p-8 rounded-xl border border-[#B8C7AE]/30 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center mb-6">
              <Moon className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#142A21] mb-3">
              What Is Velada?
            </h3>
            <p className="text-sm text-[#142A21]/80 leading-relaxed mb-4">
              <em>Velada</em> is a Spanish word historically meaning a night gathering or quiet vigil. In our practice, it describes a guided nocturnal ceremony informed by traditional Mazatecan practice. Consecrated sacred mushroom, transformed into powder and blended with ceremonial cacao, is consumed with prayer, silence, and sacred songs.
            </p>
            <p className="text-sm text-[#142A21]/80 leading-relaxed">
              Unlike recreational use, the ceremony is held within a protected, consecrated space where trained and grounded facilitators accompany you throughout the night with gentle music, grounding smudges, and compassionate support.
            </p>
          </div>

          {/* Card 2: Philippine Shamanic Roots & Katin-awan */}
          <div className="bg-[#FAF8F2] p-8 rounded-xl border border-[#B8C7AE]/30 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center mb-6">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#142A21] mb-3">
              The Shamanic Thread of Katin-awan
            </h3>
            <p className="text-sm text-[#142A21]/80 leading-relaxed mb-4">
              In pre-colonial Philippines, spiritual harmony and healing were guided by <em>Babaylan</em> and <em>Katalonan</em>—guardians of herbal wisdom who communicated with nature spirits (<em>diwata</em>) and ancestor spirits (<em>anito</em>).
            </p>
            <p className="text-sm text-[#142A21]/80 leading-relaxed">
              In Visayas, when seekers seek profound answers, they ask for <strong>katin-awan</strong>—the lifting of cloudiness from the soul. We honor this sacred lineage by cultivating humility, deep respect for plant spirits, and communion with nature.
            </p>
          </div>
        </div>

        {/* 6-Step Journey from Enquiry to Confirmation */}
        <div className="bg-[#142A21] text-[#F4F0E6] p-8 sm:p-12 rounded-2xl mb-16 shadow-xl">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-[#C4A46A] font-semibold block mb-2">
              The Journey
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F0E6] font-normal">
              From Enquiry to Confirmation
            </h3>
            <p className="text-xs text-[#B8C7AE] mt-2">
              We maintain a small, intentional container. Every seeker undergoes manual review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Explore the Ceremony', desc: 'Read the approach, preparation guidelines, and FAQ to make an informed choice.' },
              { step: '02', title: 'Choose an Available Date', desc: 'Review published gatherings and choose a date with open capacity.' },
              { step: '03', title: 'Submit Application', desc: 'Fill out your contact details and personal intentions. No immediate payment.' },
              { step: '04', title: 'Manual Organizer Review', desc: 'Applications are reviewed individually. Submitting does not guarantee a place.' },
              { step: '05', title: 'Deposit Instructions', desc: 'If approved, you receive official deposit instructions and deadlines via email.' },
              { step: '06', title: 'Confirmed Reservation', desc: 'Your place is locked once payment is manually verified. Directions are sent.' }
            ].map((item) => (
              <div key={item.step} className="p-5 rounded-lg bg-[#1b382c]/80 border border-[#C4A46A]/20">
                <span className="text-xs font-mono font-bold text-[#C4A46A] tracking-wider block mb-1">
                  {item.step}
                </span>
                <h4 className="font-serif text-lg text-[#F4F0E6] mb-2">{item.title}</h4>
                <p className="text-xs text-[#B8C7AE] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Safety Notice / Non-Medical Disclaimer */}
        <div className="bg-amber-50/80 border-l-4 border-[#C4A46A] p-6 sm:p-8 rounded-r-xl mb-12">
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-[#b08f53] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-xl text-[#142A21] font-semibold mb-2">
                Important Health, Safety &amp; Legal Notice
              </h4>
              <p className="text-xs sm:text-sm text-[#142A21]/80 leading-relaxed mb-3">
                Sacred Plant Spirit Healing does not make medical treatment claims or promise guaranteed health outcomes. The ceremonial vigil is a reflective spiritual practice and should never be viewed as a substitute for qualified psychiatric, psychological, or medical treatment.
              </p>
              <p className="text-xs sm:text-sm text-[#142A21]/80 leading-relaxed">
                <strong>Do not stop or adjust prescribed medications</strong> (especially SSRIs, MAOIs, or psychiatric medication) based on website instructions. If you have any underlying physical or psychological conditions, seek advice from your licensed physician prior to applying.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onApplyClick}
            className="w-full sm:w-auto px-8 py-3 rounded-md bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#C4A46A]" />
            Apply for Upcoming Gathering
          </button>
          <button
            onClick={onPreparationClick}
            className="w-full sm:w-auto px-8 py-3 rounded-md border border-[#7a8c6f] hover:border-[#142A21] text-[#142A21] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4 text-[#7a8c6f]" />
            Read Preparation Guide (La Dieta)
          </button>
        </div>
      </div>
    </section>
  );
};
