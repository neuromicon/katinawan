import React, { useState } from 'react';
import { PACKING_ITEMS, SCHEDULE_FLOW } from '../data/initialData';
import { CalendarDays, CheckSquare, Square, Clock, Sparkles } from 'lucide-react';

export const PreparationSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="preparation" className="py-20 bg-[#F4F0E6] text-[#142A21] relative w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-3">
            Preparation Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Prepare with Reverence &amp; Care
          </h2>
          <p className="text-base sm:text-lg text-[#142A21]/80 font-light leading-relaxed">
            Following <em>&ldquo;la dieta&rdquo;</em> (the sacred diet) opens energetic channels, purifies the vessel, and allows the plant spirits to guide you deeper with clarity and grace.
          </p>
        </div>

        {/* 2-Column: La Dieta Timeline & Packing Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          {/* Column 1: La Dieta (The Diet) */}
          <div className="bg-[#FAF8F2] p-6 sm:p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#B8C7AE]/30">
              <CalendarDays className="w-6 h-6 text-[#7a8c6f]" />
              <div>
                <h3 className="font-serif text-2xl text-[#142A21]">The Dieta Timeline</h3>
                <span className="text-sm text-[#7a8c6f]">Cleansing your mind, body and vessel</span>
              </div>
            </div>

            {/* Starting Monday */}
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#B8C7AE]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#b08f53]">
                  Phase 1 • Starting Monday
                </span>
                <span className="text-xs text-[#7a8c6f]">5 days prior</span>
              </div>
              <ul className="space-y-3 text-sm sm:text-xs text-[#142A21]/85">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Avoid Alcohol:</strong> Alters liver metabolism and creates vibrational friction, making it difficult for sacred medicines to penetrate.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Eliminate Red Meat &amp; Pork:</strong> Takes days to digest and carries dense energetic signatures. Transition to light plant-based meals.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Minimize Refined Sugars &amp; Processed Foods:</strong> Keeps your gut microbiome calm and prevents sudden blood glucose spikes.
                  </div>
                </li>
              </ul>
            </div>

            {/* Starting Wednesday */}
            <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#B8C7AE]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#b08f53]">
                  Phase 2 • Starting Wednesday
                </span>
                <span className="text-xs text-[#7a8c6f]">3 days prior</span>
              </div>
              <ul className="space-y-3 text-sm sm:text-xs text-[#142A21]/85">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Sexual Energy Retention:</strong> Abstain from sexual activity and self-pleasure to preserve your vital life force (<em>ojas/prana</em>).
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Cut Spicy Foods, Excessive Salt &amp; Oils:</strong> Protects digestive linings against purging irritation during nighttime vigil.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Reduce Screen Time &amp; Violent Media:</strong> Cultivate quiet stillness. Begin journaling your questions and intentions.
                  </div>
                </li>
              </ul>
            </div>

            {/* Ceremony Day */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#142A21] text-[#F4F0E6] space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#C4A46A]">
                  Phase 3 • Gathering Day
                </span>
                <span className="text-xs text-[#B8C7AE]">Day of vigil</span>
              </div>
              <ul className="space-y-3 text-sm sm:text-xs text-[#B8C7AE]">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>Fasting Window:</strong> Light fruit or porridge breakfast. Fast completely from 1:00 PM onwards. Water and herbal tea are permitted until 2 hours prior.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#C4A46A] mt-1.5 flex-shrink-0" />
                  <div>
                    <strong>No Recreational Substances:</strong> Absolutely zero cannabis, recreational drugs, or stimulant supplements.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Packing Checklist */}
          <div className="bg-[#FAF8F2] p-6 sm:p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8C7AE]/30">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#7a8c6f]" />
                <div>
                  <h3 className="font-serif text-2xl text-[#142A21]">Packing Checklist</h3>
                  <span className="text-sm text-[#7a8c6f]">What to bring to the sanctuary</span>
                </div>
              </div>
              <span className="text-sm font-mono text-[#7a8c6f]">
                {Object.values(checkedItems).filter(Boolean).length} / {PACKING_ITEMS.length} Packed
              </span>
            </div>

            <div className="space-y-2.5">
              {PACKING_ITEMS.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-white border-[#B8C7AE]/30 hover:border-[#7a8c6f] text-[#142A21]'
                    }`}
                  >
                    <div className="mt-0.5 text-[#7a8c6f] flex-shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-700" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1 text-base sm:text-sm">
                      <span className={isChecked ? 'line-through text-stone-500' : 'font-medium'}>
                        {item.label}
                      </span>
                      {item.required && (
                        <span className="ml-2 text-xs text-amber-700 font-semibold uppercase tracking-wider">
                          Essential
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clothing Advice Note */}
            <div className="p-5 rounded-xl bg-white border border-[#B8C7AE]/30 text-base sm:text-sm text-[#142A21]/80">
              <span className="font-semibold block mb-1.5 text-[#142A21]">Sanctuary Comfort:</span>
              We have no strict uniform rules—wear whatever allows you to sit, lie down, and breathe without restriction. Earth tones, soft linens, and loose whites are favored.
            </div>
          </div>
        </div>

        {/* Schedule Flow Table */}
        <div className="bg-[#FAF8F2] p-6 sm:p-10 rounded-2xl border border-[#B8C7AE]/40 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B8C7AE]/30">
            <Clock className="w-6 h-6 text-[#7a8c6f]" />
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#142A21]">Example Weekend Schedule</h3>
              <p className="text-sm text-[#7a8c6f]">
                Subject to natural unfolding and container rhythm. Confirmed details sent per gathering.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCHEDULE_FLOW.map((slot) => (
              <div key={slot.time + slot.title} className="p-5 rounded-xl bg-white border border-[#B8C7AE]/30">
                <span className="text-sm font-mono text-[#b08f53] font-semibold block mb-1.5">{slot.time}</span>
                <h4 className="font-serif text-lg font-semibold text-[#142A21] mb-2">{slot.title}</h4>
                <p className="text-base sm:text-sm text-[#142A21]/75 leading-relaxed">{slot.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
