import React from 'react';
import { motion } from 'motion/react';
import { Mis15Badge } from './Mis15Badge';

interface HeroCoverProps {
  name: string;
  subtitle: string;
  badgeText: string;
  imageUrl: string;
}

export const HeroCover: React.FC<HeroCoverProps> = ({
  name = 'XXXX',
  subtitle = 'mis quince años',
  badgeText = 'MIS 15',
  imageUrl,
}) => {
  return (
    <section id="hero-cover-section" className="relative w-full overflow-hidden bg-black text-white">
      {/* Background Image with Black & White Tone */}
      <div className="relative w-full aspect-[9/14] sm:aspect-[9/13] max-h-[85vh] min-h-[580px] overflow-hidden">
        <img
          src={imageUrl}
          alt={`Invitación de ${name}`}
          className="w-full h-full object-cover object-center grayscale contrast-110 brightness-95"
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlays for readability and dramatic atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

        {/* Bottom Title & Badge Overlay */}
        <div className="absolute inset-x-0 bottom-6 sm:bottom-10 flex flex-col items-center justify-end px-4 text-center z-10">
          {/* Animated Circular Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <Mis15Badge text={badgeText} theme="dark" size={96} />
          </motion.div>

          {/* Celebrant Name in Luxury Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            id="celebrant-name"
            className="text-4xl sm:text-5xl md:text-6xl tracking-[0.25em] font-light uppercase font-cinzel text-white drop-shadow-md"
          >
            {name}
          </motion.h1>

          {/* Subtitle in Cursive Calligraphy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            id="celebrant-subtitle"
            className="text-3xl sm:text-4xl md:text-5xl text-neutral-200 font-script font-normal mt-1 mb-2 drop-shadow"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
