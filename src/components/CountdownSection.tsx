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
  const [timeLeft, setTimeLeft] = useState({
    days: 107,
    hours: 2,
    minutes: 25,
    seconds: 17,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDateIso) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 107, hours: 2, minutes: 25, seconds: 17 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  const handleOpenMaps = () => {
    const query = encodeURIComponent(`${venueName}, ${venueAddress}, ${venueCity}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Mis 15 - ${venueName}`);
    const details = encodeURIComponent(`Fiesta de 15 en ${venueName}`);
    const location = encodeURIComponent(`${venueAddress}, ${venueCity}`);
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank');
  };

  return (
    <section id="countdown-and-venue-section" className="relative w-full text-neutral-900 py-16 px-6 overflow-hidden">
      {/* Silver Glitter & Sparkles Background */}
      <SilverGlitterLayer />

      <div className="relative max-w-md mx-auto text-center z-10">
        {/* Countdown Grid matching Page 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-4 gap-2 sm:gap-4 mb-14"
        >
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-cinzel drop-shadow-xs">
              {String(timeLeft.days).padStart(3, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-neutral-700 uppercase mt-1">
              DÍAS
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-cinzel drop-shadow-xs">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-neutral-700 uppercase mt-1">
              HS
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-cinzel drop-shadow-xs">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-neutral-700 uppercase mt-1">
              MIN
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-cinzel drop-shadow-xs">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-neutral-700 uppercase mt-1">
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
          <p className="text-xs sm:text-sm tracking-[0.3em] font-medium text-neutral-800 uppercase mb-1 font-montserrat">
            {dayName}
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl tracking-[0.1em] font-light text-neutral-950 font-cinzel drop-shadow-xs">
            {dateDisplay}
          </p>

          <button
            onClick={handleAddToCalendar}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-700 hover:text-black tracking-wider uppercase font-medium underline underline-offset-4 cursor-pointer transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
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
          <div className="w-12 h-12 mx-auto rounded-full bg-white/80 backdrop-blur-md border border-white/90 flex items-center justify-center text-neutral-900 shadow-sm mb-4">
            <MapPin className="w-5 h-5 stroke-[1.5]" />
          </div>

          <h3
            id="venue-title"
            className="text-lg sm:text-xl font-medium tracking-[0.25em] text-neutral-950 uppercase font-cinzel"
          >
            {venueName}
          </h3>

          <p id="venue-address-line" className="text-sm tracking-[0.15em] font-medium text-neutral-800 uppercase">
            {venueAddress}
          </p>

          <p id="venue-city-line" className="text-sm tracking-[0.2em] font-medium text-neutral-800 uppercase">
            {venueCity}
          </p>

          {/* Cómo Llegar Button matching Page 2 */}
          <div className="pt-6">
            <button
              id="how-to-get-there-button"
              onClick={handleOpenMaps}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black text-white text-xs sm:text-sm tracking-[0.25em] font-medium uppercase rounded-sm shadow-lg hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-white fill-white" />
              <span>CÓMO LLEGAR</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
