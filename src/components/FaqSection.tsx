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
    <section id="faq" className="py-20 bg-[#FAF8F2] text-[#142A21] relative border-t border-[#B8C7AE]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#7a8c6f] font-semibold block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#142A21] font-normal tracking-tight mb-4">
            Clarity &amp; Common Questions
          </h2>
          <p className="text-sm text-[#142A21]/80 font-light leading-relaxed">
            Everything you need to know about the Velada vigil, safety rules, container etiquette, and booking procedures.
          </p>
        </div>

        {/* Search bar & Category filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. Velada, safety, diet, booking)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#B8C7AE]/40 text-sm focus:border-[#C4A46A] focus:outline-none focus:ring-1 focus:ring-[#C4A46A]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#142A21] text-[#F4F0E6] border-[#142A21]'
                    : 'bg-white text-[#142A21]/80 border-[#B8C7AE]/40 hover:border-[#7a8c6f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
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
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#142A21]/85 leading-relaxed border-t border-[#B8C7AE]/20">
                      <p>{faq.answer}</p>
                      <span className="inline-block mt-3 text-[10px] text-[#7a8c6f] uppercase tracking-wider font-mono">
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-2xl bg-[#F4F0E6] border border-[#B8C7AE]/50 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg text-[#142A21] font-semibold mb-1">
              Still have unaddressed questions?
            </h4>
            <p className="text-xs text-[#142A21]/75">
              We welcome thoughtful enquiries about physical eligibility, container guidelines, or transport.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-5 py-2.5 rounded bg-[#142A21] hover:bg-[#1b382c] text-[#F4F0E6] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C4A46A]" />
            Ask the Organizer
          </a>
        </div>
      </div>
    </section>
  );
};
