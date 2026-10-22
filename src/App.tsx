import React, { useState, useEffect } from 'react';
import { CeremonyEvent } from './types';
import { fetchPublishedEvents } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CeremonySection } from './components/CeremonySection';
import { UpcomingSection } from './components/UpcomingSection';
import { BookingSection } from './components/BookingSection';
import { PreparationSection } from './components/PreparationSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';
import { StatusCheckModal } from './components/StatusCheckModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [events, setEvents] = useState<CeremonyEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Modal states
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [statusCheckOpen, setStatusCheckOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const loadEvents = async () => {
    try {
      setIsLoadingEvents(true);
      const data = await fetchPublishedEvents();
      setEvents(data);
      if (data.length > 0 && !selectedEventId) {
        // default select first available event
        const firstAvailable = data.find((e) => e.status !== 'CLOSED' && e.status !== 'CANCELLED');
        if (firstAvailable) {
          setSelectedEventId(firstAvailable.event_id);
        }
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E6] text-[#142A21] selection:bg-[#C4A46A]/30">
      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenStatusCheck={() => setStatusCheckOpen(true)}
        onSelectApply={() => scrollToSection('apply')}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onExploreUpcoming={() => scrollToSection('upcoming')}
          onLearnVelada={() => scrollToSection('ceremony')}
        />

        <CeremonySection
          onApplyClick={() => scrollToSection('apply')}
          onPreparationClick={() => scrollToSection('preparation')}
        />

        <UpcomingSection
          events={events}
          selectedEventId={selectedEventId}
          onSelectEvent={(id) => setSelectedEventId(id)}
          isLoading={isLoadingEvents}
        />

        <BookingSection
          events={events}
          selectedEventId={selectedEventId}
          onSelectEvent={(id) => setSelectedEventId(id)}
          onOpenPrivacy={() => setPrivacyOpen(true)}
          onApplicationSubmitted={loadEvents}
        />

        <PreparationSection />

        <FaqSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Modals & Dialogs */}
      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <TermsModal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />

      <StatusCheckModal
        isOpen={statusCheckOpen}
        onClose={() => setStatusCheckOpen(false)}
      />

      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onDataChanged={loadEvents}
      />
    </div>
  );
}
