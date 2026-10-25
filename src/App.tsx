import React, { useEffect, useState } from 'react';
import type { CeremonyEvent } from './types';
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
import { GallerySection } from './components/GallerySection';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [events, setEvents] = useState<CeremonyEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [eventLoadState, setEventLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const loadEvents = async () => {
    setEventLoadState('loading');
    try {
      const publishedEvents = await fetchPublishedEvents();
      setEvents(publishedEvents);
      setSelectedEventId((current) =>
        publishedEvents.some((event) => event.event_id === current)
          ? current
          : publishedEvents[0]?.event_id ?? ''
      );
      setEventLoadState('ready');
    } catch (error) {
      console.error('Unable to load published event dates.', error);
      setEvents([]);
      setSelectedEventId('');
      setEventLoadState('error');
    }
  };

  useEffect(() => {
    void loadEvents();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E6] text-[#142A21] selection:bg-[#C4A46A]/30 overflow-x-hidden">
      <Navbar onSelectApply={() => scrollToSection('apply')} />

      <main className="flex-1 w-full overflow-x-hidden">
        <Hero
          onExploreUpcoming={() => scrollToSection('upcoming')}
          onLearnCeremonies={() => scrollToSection('ceremony')}
        />

        <CeremonySection
          onApplyClick={() => scrollToSection('apply')}
          onPreparationClick={() => scrollToSection('preparation')}
        />

        <UpcomingSection
          events={events}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
          isLoading={eventLoadState === 'loading'}
          loadError={eventLoadState === 'error'}
          onRetry={() => void loadEvents()}
          onApplyClick={() => scrollToSection('apply')}
        />

        <GallerySection />

        <BookingSection
          events={events}
          selectedEventId={selectedEventId}
          onOpenPrivacy={() => setPrivacyOpen(true)}
        />

        <PreparationSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <AudioPlayer />
    </div>
  );
}
