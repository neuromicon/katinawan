import React from 'react';
import { Moon, HeartHandshake, ShieldAlert, Sparkles, Clock, Compass, Leaf, Star } from 'lucide-react';

interface CeremonySectionProps {
  onApplyClick: () => void;
  onPreparationClick: () => void;
}

const CEREMONY_TYPES = [
  {
    icon: Moon,
    title: 'Velada — Sacred Mushroom Vigil',
    description:
      'A guided nocturnal ceremony rooted in traditional Mazatecan practice. Consecrated sacred mushroom, blended with ceremonial cacao, is consumed within a protected space accompanied by sacred songs, grounding smudges, and compassionate facilitation throughout the night.',
  },
  {
    icon: Leaf,
    title: 'Ayahuasca Ceremony',
    description:
      'A deep ceremonial journey with the sacred vine of the Amazon. Facilitated with reverence for indigenous tradition, each session is held in a small, intentional container with experienced guides providing unwavering support throughout the night.',
  },
  {
    icon: Star,
    title: 'Night Gatherings',
    description:
      'Community-oriented ceremonial evenings blending breathwork, sacred plant teas, sound immersion, and guided meditation. Ideal for seekers exploring plant spirit healing for the first time in a gentle, supported setting.',
  },
  {
    icon: HeartHandshake,
    title: 'Private Ceremonies',
    description:
      'Personalized one-on-one or small-group sessions designed around your specific healing intentions. Conducted with full facilitator presence, these private containers offer depth, intimacy, and focused ceremonial support.',
  },
];

export const CeremonySection: React.FC<CeremonySectionProps> = ({
  onApplyClick,
  onPreparationClick
}) => {
  return (
    <section id="ceremony" className="py-20 bg-[#F4F0E6] text-[#142A21] relative w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-3">
            Our Ceremonies
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-5">
            Sacred Healing Experiences
          </h2>
          <p className="text-base sm:text-lg text-[#142A21]/80 font-light leading-relaxed">
            Each ceremony is a distinct path — held within a consecrated, protected space where trained facilitators accompany you with music, grounding presence, and compassionate support.
          </p>
        </div>

        {/* Ceremony Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CEREMONY_TYPES.map((ceremony) => {
            const Icon = ceremony.icon;
            return (
              <div key={ceremony.title} className="bg-[#FAF8F2] p-8 rounded-xl border border-[#B8C7AE]/30 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#142A21] mb-3">{ceremony.title}</h3>
                <p className="text-base sm:text-base text-[#142A21]/80 leading-relaxed">{ceremony.description}</p>
              </div>
            );
          })}
        </div>

        {/* Philippine Roots Card */}
        <div className="bg-[#FAF8F2] p-8 sm:p-10 rounded-xl border border-[#B8C7AE]/30 shadow-sm mb-16">
          <div className="w-12 h-12 rounded-full bg-[#142A21] text-[#C4A46A] flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#142A21] mb-4">
            The Shamanic Thread of Katin-awan
          </h3>
          <p className="text-base sm:text-base text-[#142A21]/80 leading-relaxed mb-4">
            In pre-colonial Philippines, spiritual harmony and healing were guided by <em>Babaylan</em> and <em>Katalonan</em> — guardians of herbal wisdom who communicated with nature spirits (<em>diwata</em>) and ancestor spirits (<em>anito</em>).
          </p>
          <p className="text-base sm:text-base text-[#142A21]/80 leading-relaxed">
            In Visayas, when seekers seek profound answers, they ask for <strong>katin-awan</strong> — the lifting of cloudiness from the soul. We honor this sacred lineage by cultivating humility, deep respect for plant spirits, and communion with nature.
          </p>
        </div>

        {/* 6-Step Journey */}
        <div className="bg-[#142A21] text-[#F4F0E6] p-8 sm:p-12 rounded-2xl mb-16 shadow-xl">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-sm uppercase tracking-widest text-[#C4A46A] font-semibold block mb-3">
              The Journey
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4F0E6] font-normal">
              From Enquiry to Confirmation
            </h3>
            <p className="text-base sm:text-sm text-[#B8C7AE] mt-3">
              We maintain a small, intentional container. Every seeker undergoes manual review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Explore the Ceremonies', desc: 'Read about each offering, the preparation guidelines, and FAQ to make an informed choice.' },
              { step: '02', title: 'Choose an Available Date', desc: 'Review published gatherings and choose a date with open capacity.' },
              { step: '03', title: 'Submit Application', desc: 'Fill out your contact details and personal intentions. No immediate payment.' },
              { step: '04', title: 'Manual Organizer Review', desc: 'Applications are reviewed individually. Submitting does not guarantee a place.' },
              { step: '05', title: 'Deposit Instructions', desc: 'If approved, you receive official deposit instructions and deadlines via email.' },
              { step: '06', title: 'Confirmed Reservation', desc: 'Your place is locked once payment is manually verified. Directions are sent.' }
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-lg bg-[#1b382c]/80 border border-[#C4A46A]/20">
                <span className="text-sm font-mono font-bold text-[#C4A46A] tracking-wider block mb-2">
                  {item.step}
                </span>
                <h4 className="font-serif text-xl sm:text-lg text-[#F4F0E6] mb-2">{item.title}</h4>
                <p className="text-base sm:text-sm text-[#B8C7AE] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Legal Notice */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#B8C7AE]/40 shadow-sm mb-16 border-l-4 border-l-[#C4A46A]">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-[#C4A46A] flex-shrink-0" />
            <h3 className="font-serif text-2xl sm:text-2xl text-[#142A21]">Important Health, Safety &amp; Legal Notice</h3>
          </div>
          <p className="text-base sm:text-base text-[#142A21]/80 leading-relaxed mb-4">
            Sacred Plant Spirit Healing does not make medical treatment claims or promise guaranteed health outcomes. Ceremonial experiences incorporate traditional practices and should never be viewed as a substitute for professional medical, psychiatric, or psychological diagnosis and care.
          </p>
          <p className="text-base sm:text-base text-[#142A21]/80 leading-relaxed">
            Participants must honestly disclose pre-existing health conditions, psychiatric histories, and active prescription medications during screening to ensure the physical and psychological safety of the container.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onApplyClick}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] font-semibold text-base sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Apply for a Ceremony</span>
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={onPreparationClick}
            className="w-full sm:w-auto px-8 py-4 rounded-lg border border-[#B8C7AE] hover:border-[#142A21] text-[#142A21] font-semibold text-base sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <span>Read Preparation Guide</span>
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
