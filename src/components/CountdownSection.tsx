import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Heart, CalendarPlus } from 'lucide-react';
import { SilverGlitterLayer } from './SilverGlitterLayer';

interface CountdownSectionProps {
  targetDateIso: string;
  dayName: string;
  dateDisplay: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsQuery: string;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  targetDateIso,
  dayName = 'VIERNES',
  dateDisplay = 'XX.XX.XX',
  venueName = 'XXXX MULTIEVENTOS',
  venueAddress = 'AV. XXXX 1234',
  venueCity = 'XXXX',
  googleMapsQuery = 'Salón de Eventos',
}) => {
  const calculateTimeLeft = (isoDate: string) => {
    const difference = +new Date(isoDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDateIso));

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(targetDateIso));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  const handleOpenMaps = () => {
    const query = encodeURIComponent(googleMapsQuery || `${venueName}, ${venueAddress}, ${venueCity}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Mis 15 - ${venueName}`);
    const details = encodeURIComponent(`Fiesta de 15 de Xiomara en ${venueName} (${venueAddress}, ${venueCity})`);
    const location = encodeURIComponent(`${venueAddress}, ${venueCity}`);
    // Start: 2026-12-05 21:00 / End: 2026-12-06 05:00
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261205T210000/20261206T050000`;
    window.open(gcalUrl, '_blank');
  };

  return (
    <section id="countdown-and-venue-section" className="relative w-full text-neutral-900 py-16 px-6 overflow-hidden">
      {/* Champagne Gold & Dusty Rose Glitter Background */}
      <SilverGlitterLayer />

      <div className="relative max-w-md mx-auto text-center z-10">
        {/* Countdown Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-4 gap-2 sm:gap-4 mb-14"
        >
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-[#2d1720] font-cinzel drop-shadow-xs">
              {String(timeLeft.days).padStart(3, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#8c4f5a] uppercase mt-1">
              DÍAS
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-[#2d1720] font-cinzel drop-shadow-xs">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#8c4f5a] uppercase mt-1">
              HS
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-[#2d1720] font-cinzel drop-shadow-xs">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#8c4f5a] uppercase mt-1">
              MIN
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-[#2d1720] font-cinzel drop-shadow-xs">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#8c4f5a] uppercase mt-1">
              SEG
            </span>
          </div>
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-14"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] font-medium text-[#8c4f5a] uppercase mb-1 font-montserrat">
            {dayName}
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl tracking-[0.1em] font-light text-[#1f0f15] font-cinzel drop-shadow-xs">
            {dateDisplay}
          </p>

          <button
            onClick={handleAddToCalendar}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#8c4f5a] hover:text-[#52252f] tracking-wider uppercase font-medium underline underline-offset-4 cursor-pointer transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#dfc2a5]" />
            Agendar Fecha
          </button>
        </motion.div>

        {/* Venue Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-3"
        >
          {/* Location Pin Icon */}
          <div className="w-12 h-12 mx-auto rounded-full bg-white/90 backdrop-blur-md border border-[#dfc2a5] flex items-center justify-center text-[#8c4f5a] shadow-sm mb-4">
            <MapPin className="w-5 h-5 stroke-[1.5] text-[#8c4f5a]" />
          </div>

          <h3
            id="venue-title"
            className="text-lg sm:text-xl font-medium tracking-[0.25em] text-[#1f0f15] uppercase font-cinzel"
          >
            {venueName}
          </h3>

          <p id="venue-address-line" className="text-sm tracking-[0.15em] font-medium text-[#4d2d38] uppercase">
            {venueAddress}
          </p>

          <p id="venue-city-line" className="text-sm tracking-[0.2em] font-medium text-[#4d2d38] uppercase">
            {venueCity}
          </p>

          {/* Cómo Llegar Button */}
          <div className="pt-6">
            <button
              id="how-to-get-there-button"
              onClick={handleOpenMaps}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#8c4f5a] via-[#a36770] to-[#8c4f5a] text-[#fff8ee] text-xs sm:text-sm tracking-[0.25em] font-medium uppercase rounded-sm shadow-lg border border-[#dfc2a5]/50 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#dfc2a5] fill-[#dfc2a5]" />
              <span>CÓMO LLEGAR</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
