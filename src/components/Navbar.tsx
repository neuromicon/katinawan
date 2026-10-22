import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, Shield, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenStatusCheck: () => void;
  onSelectApply: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenStatusCheck,
  onSelectApply
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Ceremony', href: '#ceremony' },
    { name: 'Upcoming', href: '#upcoming' },
    { name: 'Preparation', href: '#preparation' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#142A21]/95 backdrop-blur-md py-3 shadow-lg border-b border-[#C4A46A]/20 text-[#F4F0E6]'
          : 'bg-[#142A21] py-4 text-[#F4F0E6]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#1b382c] border border-[#C4A46A]/40 flex items-center justify-center text-[#C4A46A] group-hover:border-[#C4A46A] transition-colors shadow-inner">
              <Leaf className="w-5 h-5 text-[#C4A46A]" />
            </div>
            <div>
              <span className="font-serif text-2xl tracking-wide font-semibold text-[#F4F0E6] flex items-center gap-1.5">
                Katin-awan
                <span className="text-xs uppercase tracking-widest text-[#C4A46A] font-sans font-normal px-2 py-0.5 rounded bg-[#C4A46A]/10 border border-[#C4A46A]/30">
                  Visayas
                </span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#B8C7AE] block">
                Sacred Plant Spirit Healing
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#F4F0E6]/80 hover:text-[#C4A46A] transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={onOpenStatusCheck}
              className="text-xs uppercase tracking-wider text-[#B8C7AE] hover:text-[#F4F0E6] flex items-center gap-1.5 py-1 px-2.5 rounded border border-[#B8C7AE]/30 hover:border-[#B8C7AE] transition-all"
              title="Lookup your application status"
            >
              <Calendar className="w-3.5 h-3.5" />
              Check Status
            </button>

            <a
              href="https://github.com/neuromicon/katinawan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-[#B8C7AE] hover:text-[#F4F0E6] flex items-center gap-1.5 py-1 px-2.5 rounded border border-[#B8C7AE]/30 hover:border-[#C4A46A] transition-all"
              title="GitHub Repository neuromicon/katinawan"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>

            <button
              onClick={onSelectApply}
              className="bg-[#C4A46A] hover:bg-[#b08f53] text-[#142A21] text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Apply for Ceremony
            </button>

            <button
              onClick={onOpenAdmin}
              className="text-xs text-[#B8C7AE]/70 hover:text-[#C4A46A] p-1.5 rounded transition-colors flex items-center gap-1"
              title="Organizer Portal & Drive"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px] font-mono">Console</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://github.com/neuromicon/katinawan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4F0E6] p-1.5"
              aria-label="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <button
              onClick={onSelectApply}
              className="bg-[#C4A46A] text-[#142A21] text-xs font-semibold px-3 py-1.5 rounded"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F4F0E6] p-2 hover:text-[#C4A46A] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#C4A46A]/20 pb-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-[#F4F0E6]/90 hover:text-[#C4A46A] py-1.5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://github.com/neuromicon/katinawan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-sm text-[#B8C7AE] py-1.5 flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub (neuromicon/katinawan)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatusCheck();
                }}
                className="text-left text-sm text-[#B8C7AE] py-1.5 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Check Application Status
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left text-sm text-[#C4A46A]/80 py-1.5 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Organizer Portal &amp; Drive
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
