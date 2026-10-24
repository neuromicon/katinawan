import React, { useState } from 'react';
import { PACKING_ITEMS, SCHEDULE_FLOW } from '../data/initialData';
<<<<<<< HEAD
import { CalendarDays, CheckSquare, Square, Clock, Sparkles } from 'lucide-react';
=======
import { ShieldCheck, CalendarDays, CheckSquare, Square, Clock, Sparkles, MapPin } from 'lucide-react';
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8

export const PreparationSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
<<<<<<< HEAD
    <section id="preparation" className="py-20 bg-[#F4F0E6] text-[#142A21] relative w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-3">
=======
    <section id="preparation" className="py-20 bg-[#F4F0E6] text-[#142A21] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            Preparation Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Prepare with Reverence &amp; Care
          </h2>
<<<<<<< HEAD
          <p className="text-base sm:text-lg text-[#142A21]/80 font-light leading-relaxed">
=======
          <p className="text-sm sm:text-base text-[#142A21]/80 font-light leading-relaxed">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            Following <em>&ldquo;la dieta&rdquo;</em> (the sacred diet) opens energetic channels, purifies the vessel, and allows the plant spirits to guide you deeper with clarity and grace.
          </p>
        </div>

        {/* 2-Column: La Dieta Timeline & Packing Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
          {/* Column 1: La Dieta (The Diet) */}
<<<<<<< HEAD
          <div className="bg-[#FAF8F2] p-6 sm:p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
=======
          <div className="bg-[#FAF8F2] p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            <div className="flex items-center gap-3 pb-4 border-b border-[#B8C7AE]/30">
              <CalendarDays className="w-6 h-6 text-[#7a8c6f]" />
              <div>
                <h3 className="font-serif text-2xl text-[#142A21]">The Dieta Timeline</h3>
<<<<<<< HEAD
                <span className="text-sm text-[#7a8c6f]">Cleansing your mind, body and vessel</span>
=======
                <span className="text-xs text-[#7a8c6f]">Cleansing your mind, body and vessel</span>
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
              </div>
            </div>

            {/* Starting Monday */}
<<<<<<< HEAD
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
=======
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
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                  <div>
                    <strong>Avoid Alcohol:</strong> Alters liver metabolism and creates vibrational friction, making it difficult for sacred medicines to penetrate.
                  </div>
                </li>
<<<<<<< HEAD
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
=======
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
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                  </div>
                </li>
              </ul>
            </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                  </div>
                </li>
              </ul>
            </div>

<<<<<<< HEAD
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
=======
            {/* Safety Review Note */}
            <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-300/60 text-xs text-[#142A21]/85">
              <span className="font-semibold block mb-1 text-[#b08f53]">Medical Guidance Rule:</span>
              Dietary preparation does not replace medical advice. Never discontinue or adjust prescription medications without consulting your physician.
            </div>
          </div>

          {/* Column 2: What to Bring (Interactive Packing List) */}
          <div className="bg-[#FAF8F2] p-8 rounded-2xl border border-[#B8C7AE]/40 shadow-sm space-y-6">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            <div className="flex items-center justify-between pb-4 border-b border-[#B8C7AE]/30">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#7a8c6f]" />
                <div>
<<<<<<< HEAD
                  <h3 className="font-serif text-2xl text-[#142A21]">Packing Checklist</h3>
                  <span className="text-sm text-[#7a8c6f]">What to bring to the sanctuary</span>
                </div>
              </div>
              <span className="text-sm font-mono text-[#7a8c6f]">
=======
                  <h3 className="font-serif text-2xl text-[#142A21]">What to Bring</h3>
                  <span className="text-xs text-[#7a8c6f]">Interactive packing checklist</span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#7a8c6f]">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                {Object.values(checkedItems).filter(Boolean).length} / {PACKING_ITEMS.length} Packed
              </span>
            </div>

<<<<<<< HEAD
            <div className="space-y-2.5">
=======
            <div className="space-y-2">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
              {PACKING_ITEMS.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
<<<<<<< HEAD
                    className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
=======
                    className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                      isChecked
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-white border-[#B8C7AE]/30 hover:border-[#7a8c6f] text-[#142A21]'
                    }`}
                  >
                    <div className="mt-0.5 text-[#7a8c6f] flex-shrink-0">
                      {isChecked ? (
<<<<<<< HEAD
                        <CheckSquare className="w-5 h-5 text-emerald-700" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1 text-base sm:text-sm">
=======
                        <CheckSquare className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                    <div className="flex-1 text-xs">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                      <span className={isChecked ? 'line-through text-stone-500' : 'font-medium'}>
                        {item.label}
                      </span>
                      {item.required && (
<<<<<<< HEAD
                        <span className="ml-2 text-xs text-amber-700 font-semibold uppercase tracking-wider">
=======
                        <span className="ml-2 text-[10px] text-amber-700 font-semibold uppercase tracking-wider">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                          Essential
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clothing Advice Note */}
<<<<<<< HEAD
            <div className="p-5 rounded-xl bg-white border border-[#B8C7AE]/30 text-base sm:text-sm text-[#142A21]/80">
              <span className="font-semibold block mb-1.5 text-[#142A21]">Sanctuary Comfort:</span>
=======
            <div className="p-4 rounded-xl bg-white border border-[#B8C7AE]/30 text-xs text-[#142A21]/80">
              <span className="font-semibold block mb-1">Sanctuary Comfort:</span>
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
              We have no strict uniform rules—wear whatever allows you to sit, lie down, and breathe without restriction. Earth tones, soft linens, and loose whites are favored.
            </div>
          </div>
        </div>

        {/* Schedule Flow Table */}
<<<<<<< HEAD
        <div className="bg-[#FAF8F2] p-6 sm:p-10 rounded-2xl border border-[#B8C7AE]/40 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B8C7AE]/30">
            <Clock className="w-6 h-6 text-[#7a8c6f]" />
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#142A21]">Example Weekend Schedule</h3>
              <p className="text-sm text-[#7a8c6f]">
=======
        <div className="bg-[#FAF8F2] p-8 sm:p-10 rounded-2xl border border-[#B8C7AE]/40 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#B8C7AE]/30">
            <Clock className="w-6 h-6 text-[#7a8c6f]" />
            <div>
              <h3 className="font-serif text-2xl text-[#142A21]">Example Weekend Schedule</h3>
              <p className="text-xs text-[#7a8c6f]">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                Subject to natural unfolding and container rhythm. Confirmed details sent per gathering.
              </p>
            </div>
          </div>

<<<<<<< HEAD
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCHEDULE_FLOW.map((slot) => (
              <div key={slot.time + slot.title} className="p-5 rounded-xl bg-white border border-[#B8C7AE]/30">
                <span className="text-sm font-mono text-[#b08f53] font-semibold block mb-1.5">{slot.time}</span>
                <h4 className="font-serif text-lg font-semibold text-[#142A21] mb-2">{slot.title}</h4>
                <p className="text-base sm:text-sm text-[#142A21]/75 leading-relaxed">{slot.desc}</p>
=======
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
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
              </div>
            ))}
          </div>
        </div>
<<<<<<< HEAD
=======

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
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
      </div>
    </section>
  );
};
