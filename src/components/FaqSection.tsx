import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/initialData';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndices, setOpenIndices] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const categories = ['All', 'Ceremony & Origins', 'Experience & Flow', 'Preparation & Safety', 'Booking & Logistics'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
<<<<<<< HEAD
    <section id="faq" className="py-20 bg-[#FAF8F2] text-[#142A21] relative border-t border-[#B8C7AE]/30 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-3">
=======
    <section id="faq" className="py-20 bg-[#FAF8F2] text-[#142A21] relative border-t border-[#B8C7AE]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Clarity &amp; Common Questions
          </h2>
<<<<<<< HEAD
          <p className="text-base sm:text-lg text-[#142A21]/80 font-light leading-relaxed">
=======
          <p className="text-sm text-[#142A21]/80 font-light leading-relaxed">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            Everything you need to know about the Velada vigil, safety rules, container etiquette, and booking procedures.
          </p>
        </div>

        {/* Search bar & Category filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
<<<<<<< HEAD
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
=======
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. Velada, safety, diet, booking)..."
<<<<<<< HEAD
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-[#B8C7AE]/40 text-base focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
            />
          </div>

          <div className="flex flex-wrap gap-2.5">
=======
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#B8C7AE]/40 text-sm focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
<<<<<<< HEAD
                className={`px-4 py-2.5 rounded-full text-sm sm:text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#142A21] text-[#F4F0E6] shadow-sm'
                    : 'bg-white text-[#7a8c6f] border border-[#B8C7AE]/40 hover:border-[#142A21]'
=======
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#142A21] text-[#F4F0E6] border-[#142A21]'
                    : 'bg-white text-[#142A21]/80 border-[#B8C7AE]/40 hover:border-[#7a8c6f]'
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
<<<<<<< HEAD
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-base text-[#7a8c6f] bg-white rounded-xl border border-[#B8C7AE]/30 p-8">
              <HelpCircle className="w-10 h-10 mx-auto text-[#C4A46A] mb-3" />
              <p className="font-semibold text-lg">No questions match your search.</p>
              <p className="text-sm mt-1">Try other keywords or reset the category filter.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = !!openIndices[index];
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-xl border border-[#B8C7AE]/35 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-[#FAF8F2]/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl font-medium text-[#142A21] leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#b08f53] transition-transform flex-shrink-0 mt-0.5 ${
=======
        <div className="space-y-3 mb-12">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-sm text-[#7a8c6f]">
              No questions found matching your query.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = !!openIndices[idx];
              return (
                <div
                  key={faq.question}
                  className="rounded-xl bg-white border border-[#B8C7AE]/40 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FBF9F4] transition-colors"
                  >
                    <span className="font-serif text-lg text-[#142A21] font-medium leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#7a8c6f] transition-transform duration-200 flex-shrink-0 ${
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
<<<<<<< HEAD
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-[#142A21]/85 border-t border-[#B8C7AE]/15">
                      <p className="text-base sm:text-sm leading-relaxed mb-3">{faq.answer}</p>
                      <span className="inline-block text-xs uppercase tracking-wider text-[#b08f53] font-semibold">
=======

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#142A21]/85 leading-relaxed border-t border-[#B8C7AE]/20">
                      <p>{faq.answer}</p>
                      <span className="inline-block mt-3 text-[10px] text-[#7a8c6f] uppercase tracking-wider font-mono">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

<<<<<<< HEAD
        {/* Still have questions prompt */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#1b382c] text-[#F4F0E6] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-[#C4A46A]/20">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#F4F0E6]">Still have unaddressed questions?</h4>
            <p className="text-base sm:text-sm text-[#B8C7AE]">
=======
        {/* Bottom CTA */}
        <div className="p-6 rounded-2xl bg-[#F4F0E6] border border-[#B8C7AE]/50 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg text-[#142A21] font-semibold mb-1">
              Still have unaddressed questions?
            </h4>
            <p className="text-xs text-[#142A21]/75">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
              We welcome thoughtful enquiries about physical eligibility, container guidelines, or transport.
            </p>
          </div>
          <a
            href="#contact"
<<<<<<< HEAD
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] font-semibold text-base sm:text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask the Organizer</span>
=======
            className="flex-shrink-0 px-5 py-2.5 rounded bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C4A46A]" />
            Ask the Organizer
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
          </a>
        </div>
      </div>
    </section>
  );
};
