import React, { useEffect, useState } from 'react';
import { Leaf, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSelectApply: () => void;
}

const navLinks = [
  { name: 'Ceremonies', href: '#ceremony' },
  { name: 'Upcoming', href: '#upcoming' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Preparation', href: '#preparation' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ onSelectApply }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectApply = () => {
    setMobileMenuOpen(false);
    onSelectApply();
  };

  return (
<<<<<<< HEAD
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#142A21]/95 backdrop-blur-md py-2.5 shadow-lg border-b border-[#C4A46A]/20 text-[#F4F0E6]' : 'bg-[#142A21] py-3 text-[#F4F0E6]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0" aria-label="Katin-awan home">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1b382c] border border-[#C4A46A]/40 flex items-center justify-center text-[#C4A46A] group-hover:border-[#C4A46A] transition-colors shadow-inner flex-shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-nowrap" style={{ whiteSpace: 'nowrap' }}>
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide leading-tight" style={{ whiteSpace: 'nowrap' }}>
                  Katin&#8209;awan
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#C4A46A] font-sans font-normal px-1.5 py-0.5 rounded bg-[#C4A46A]/10 border border-[#C4A46A]/30 flex-shrink-0">
                  Visayas
                </span>
              </div>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#B8C7AE] block truncate">
                Sacred Plant Spirit Healing
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-5 flex-shrink-0">
=======
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-[#142A21]/95 backdrop-blur-md py-3 shadow-lg border-b border-[#C4A46A]/20 text-[#F4F0E6]' : 'bg-[#142A21] py-4 text-[#F4F0E6]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" aria-label="Katin-awan home">
            <div className="w-10 h-10 rounded-full bg-[#1b382c] border border-[#C4A46A]/40 flex items-center justify-center text-[#C4A46A] group-hover:border-[#C4A46A] transition-colors shadow-inner">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-wide font-semibold flex items-center gap-1.5">
                Katin-awan
                <span className="text-xs uppercase tracking-widest text-[#C4A46A] font-sans font-normal px-2 py-0.5 rounded bg-[#C4A46A]/10 border border-[#C4A46A]/30">Visayas</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#B8C7AE] block">Sacred Plant Spirit Healing</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-5">
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-[#F4F0E6]/80 hover:text-[#C4A46A] transition-colors tracking-wide">{link.name}</a>
            ))}
            <a href="https://github.com/neuromicon/katinawan" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#B8C7AE] hover:text-[#F4F0E6] py-1 px-2 rounded border border-[#B8C7AE]/30 hover:border-[#C4A46A] transition-all">GitHub</a>
            <button onClick={selectApply} className="bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded shadow-md transition-all flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Apply
            </button>
          </nav>

<<<<<<< HEAD
          <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
            <button onClick={selectApply} className="bg-[#C4A46A] text-[#142A21] text-xs font-semibold px-3.5 py-1.5 rounded shadow-sm uppercase tracking-wider">Apply</button>
            <button onClick={() => setMobileMenuOpen((open) => !open)} className="text-[#F4F0E6] p-1.5 hover:text-[#C4A46A] transition-colors" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
=======
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={selectApply} className="bg-[#C4A46A] text-[#142A21] text-xs font-semibold px-3 py-1.5 rounded">Apply</button>
            <button onClick={() => setMobileMenuOpen((open) => !open)} className="text-[#F4F0E6] p-2 hover:text-[#C4A46A] transition-colors" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#C4A46A]/20 pb-4 space-y-2">
            {navLinks.map((link) => (
<<<<<<< HEAD
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-[#F4F0E6]/95 hover:text-[#C4A46A] py-2">{link.name}</a>
            ))}
            <a href="https://github.com/neuromicon/katinawan" target="_blank" rel="noopener noreferrer" className="block text-base text-[#B8C7AE] py-2">GitHub repository</a>
=======
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-[#F4F0E6]/90 hover:text-[#C4A46A] py-1.5">{link.name}</a>
            ))}
            <a href="https://github.com/neuromicon/katinawan" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#B8C7AE] py-1.5">GitHub repository</a>
>>>>>>> f1dd62eb3d4bd271f118a3d97350fa7ef4c207e8
          </div>
        )}
      </div>
    </header>
  );
};
