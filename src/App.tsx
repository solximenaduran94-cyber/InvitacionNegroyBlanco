/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { defaultInvitationData } from './data/defaultData';
import { InvitationData, RsvpEntry } from './types';
import { HeroCover } from './components/HeroCover';
import { MusicPlayer } from './components/MusicPlayer';
import { MessageSection } from './components/MessageSection';
import { CountdownSection } from './components/CountdownSection';
import { ChildhoodPhotoSection } from './components/ChildhoodPhotoSection';
import { DressCodeSection } from './components/DressCodeSection';
import { RsvpSection } from './components/RsvpSection';
import { GiftSection } from './components/GiftSection';
import { PhotoUploadSection } from './components/PhotoUploadSection';
import { SilverSparkleCursor } from './components/SilverSparkleCursor';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [data] = useState<InvitationData>(defaultInvitationData);
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([]);

  const handleSaveRsvp = (entry: RsvpEntry) => {
    setRsvps((prev) => [entry, ...prev]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080406] text-neutral-100 flex justify-center selection:bg-[#dfc2a5] selection:text-[#180e14] font-montserrat">
      {/* Interactive Champagne Gold & Dusty Rose Sparkle Particle Trail & Burst on Click/Touch */}
      <SilverSparkleCursor />

      {/* Mobile-first centered invitation container (max-w-md / max-w-lg) matching real mobile web invitation design */}
      <main className="w-full max-w-lg bg-[#0d070a] min-h-screen shadow-2xl relative flex flex-col pb-8">
        {/* 1. Hero Cover (Page 1 in PDF) */}
        <HeroCover
          name={data.celebrantName}
          subtitle={data.celebrantSubtitle}
          badgeText={data.badgeText}
          imageUrl={data.coverImage}
        />

        {/* 2. Top Interactive Music Player (Page 2 in PDF) */}
        <MusicPlayer
          trackName={data.audioTrackName}
          audioUrl={data.audioTrackUrl}
        />

        {/* 3. Emotional Message Block (Page 2 in PDF) */}
        <MessageSection message={data.messageText} />

        {/* 4. Countdown, Date & Venue with "Cómo Llegar" (Page 2 in PDF) */}
        <CountdownSection
          targetDateIso={data.eventDateIso}
          dayName={data.eventDayName}
          dateDisplay={data.eventDateDisplay}
          venueName={data.venueName}
          venueAddress={data.venueAddress}
          venueCity={data.venueCity}
          googleMapsQuery={data.googleMapsQuery}
        />

        {/* 5. Childhood Memory Photo & Schedule / Horario (Page 3 in PDF) */}
        <ChildhoodPhotoSection
          photoUrl={data.childhoodImage}
          scheduleTime={data.scheduleTime}
        />

        {/* 6. Dress Code & Revolving Badge (Page 4 in PDF) */}
        <DressCodeSection
          dressCode={data.dressCode}
          badgeText={data.badgeText}
          subtext={data.dressCodeSubtext}
        />

        {/* 7. RSVP / Confirmar Asistencia Section (Page 4 in PDF) */}
        <RsvpSection
          celebrantName={data.celebrantName}
          whatsappNumber={data.whatsappNumber}
          onSaveRsvp={handleSaveRsvp}
        />

        {/* 8. Gift / Regalos & Alias Section (Page 4 in PDF) */}
        <GiftSection
          alias={data.bankAlias}
          cbu={data.bankCbu}
          holder={data.bankHolder}
          entity={data.bankEntity}
        />

        {/* 9. Post-Party Photo Sharing / Subilas Acá (Page 5 in PDF) */}
        <PhotoUploadSection
          celebrantName={data.celebrantName}
          driveFolderUrl={data.driveFolderUrl}
        />

        {/* Floating Back to Top Button */}
        <button
          id="scroll-to-top-button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="fixed bottom-5 right-5 z-40 p-3 bg-[#1a0c13]/90 hover:bg-[#2a141f] text-[#dfc2a5] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-sm border border-[#dfc2a5]/50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </main>
    </div>
  );
}
