import React, { useState } from 'react';
import { PACKING_ITEMS, SCHEDULE_FLOW } from '../data/initialData';
import { ShieldCheck, CalendarDays, CheckSquare, Square, Clock, Sparkles, MapPin } from 'lucide-react';

export const PreparationSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="preparation" className="py-20 bg-[#F4F0E6] text-[#142A21] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
            Preparation Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Prepare with Reverence &amp; Care
          </h2>
          <p className="text-sm sm:text-base text-[#142A21]/80 font-light leading-relaxed">
            Following <em>&ldquo;la dieta&rdquo;</em> (the sacred diet) opens energetic channels, purifies the vessel, and allows the plant spirits to guide you deeper with clarity and grace.
          </p>
        </div>

        {/* 2-Column: La Dieta Timeline & Packing Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          {/* Column 1: La Dieta (The Diet) */}
          <div className="bg-[#FAF8F2] p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#B8C7AE]/30">
              <CalendarDays className="w-6 h-6 text-[#7a8c6f]" />
              <div>
                <h3 className="font-serif text-2xl text-[#142A21]">The Dieta Timeline</h3>
                <span className="text-xs text-[#7a8c6f]">Cleansing your mind, body and vessel</span>
              </div>
            </div>

            {/* Starting Monday */}
            <div className="p-5 rounded-xl bg-white border border-[#B8C7AE]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b08f53]">
                  Phase 1 • Starting Monday
                </span>
                <span className="text-[11px] text-[#7a8c6f]">5 days prior</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#142A21]/85">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Avoid Alcohol:</strong> Alters liver metabolism and creates vibrational friction, making it difficult for sacred medicines to penetrate.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Avoid Recreational Drugs:</strong> Blocks neurotransmitter receptors where plant teachers connect.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Fast from Toxic Media:</strong> Refrain from violent cinema, agitating social feeds, and hostile news to preserve psychic calm.
                  </div>
                </li>
              </ul>
            </div>

            {/* Starting Thursday */}
            <div className="p-5 rounded-xl bg-white border border-[#B8C7AE]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b08f53]">
                  Phase 2 • Starting Thursday
                </span>
                <span className="text-[11px] text-[#7a8c6f]">2 days prior</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#142A21]/85">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Avoid Meat &amp; Heavy Animal Fats:</strong> Meat requires 24–48 hours to digest, dulling intuition and delaying the medicine.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Refrain from Sexual Activity:</strong> Conserves subtle prana / vital life force for deep inner exploration.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Anchor Intentions &amp; Inquiries:</strong> Spend quiet moments writing down what you seek from the divine teachers.
                  </div>
                </li>
              </ul>
            </div>

            {/* Safety Review Note */}
            <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-300/60 text-xs text-[#142A21]/85">
              <span className="font-semibold block mb-1 text-[#b08f53]">Medical Guidance Rule:</span>
              Dietary preparation does not replace medical advice. Never discontinue or adjust prescription medications without consulting your physician.
            </div>
          </div>

          {/* Column 2: What to Bring (Interactive Packing List) */}
          <div className="bg-[#FAF8F2] p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8C7AE]/30">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#7a8c6f]" />
                <div>
                  <h3 className="font-serif text-2xl text-[#142A21]">What to Bring</h3>
                  <span className="text-xs text-[#7a8c6f]">Interactive packing checklist</span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#7a8c6f]">
                {Object.values(checkedItems).filter(Boolean).length} / {PACKING_ITEMS.length} Packed
              </span>
            </div>

            <div className="space-y-2">
              {PACKING_ITEMS.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-white border-[#B8C7AE]/30 hover:border-[#7a8c6f] text-[#142A21]'
                    }`}
                  >
                    <div className="mt-0.5 text-[#7a8c6f] flex-shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1 text-xs">
                      <span className={isChecked ? 'line-through text-stone-500' : 'font-medium'}>
                        {item.label}
                      </span>
                      {item.required && (
                        <span className="ml-2 text-[10px] text-amber-700 font-semibold uppercase tracking-wider">
                          Essential
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clothing Advice Note */}
            <div className="p-4 rounded-xl bg-white border border-[#B8C7AE]/30 text-xs text-[#142A21]/80">
              <span className="font-semibold block mb-1">Sanctuary Comfort:</span>
              We have no strict uniform rules—wear whatever allows you to sit, lie down, and breathe without restriction. Earth tones, soft linens, and loose whites are favored.
            </div>
          </div>
        </div>

        {/* Schedule Flow Table */}
        <div className="bg-[#FAF8F2] p-8 sm:p-10 rounded-2xl border border-[#B8C7AE]/40 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B8C7AE]/30">
            <Clock className="w-6 h-6 text-[#7a8c6f]" />
            <div>
              <h3 className="font-serif text-2xl text-[#142A21]">Example Weekend Schedule</h3>
              <p className="text-xs text-[#7a8c6f]">
                Subject to natural unfolding and container rhythm. Confirmed details sent per gathering.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCHEDULE_FLOW.map((slot) => (
              <div
                key={slot.time + slot.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#B8C7AE]/30 shadow-xs"
              >
                <div className="font-mono text-xs font-bold text-[#C4A46A] bg-[#142A21] px-2.5 py-1 rounded">
                  {slot.time}
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#142A21] mb-1">
                    {slot.title}
                  </h4>
                  <p className="text-xs text-[#142A21]/75 leading-relaxed">
                    {slot.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Arrival Policy */}
        <div className="bg-[#142A21] text-[#F4F0E6] p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-8 h-8 text-[#C4A46A] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-xl font-normal text-[#F4F0E6] mb-1">
                Sanctuary Location &amp; Travel Policy
              </h4>
              <p className="text-xs text-[#B8C7AE] leading-relaxed max-w-xl">
                To protect sacred container privacy and local community tranquility, exact coordinates, pin, and travel logistics in Visayas are disclosed only to seekers with confirmed and verified bookings.
              </p>
            </div>
          </div>

          <a
            href="#apply"
            className="flex-shrink-0 px-6 py-2.5 rounded bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
          >
            Apply for Gathering
          </a>
        </div>
      </div>
    </section>
  );
};
