import React from 'react';
import { motion } from 'motion/react';
import { Mis15Badge } from './Mis15Badge';

interface HeroCoverProps {
  name: string;
  subtitle: string;
  badgeText: string;
  imageUrl?: string;
}

export const HeroCover: React.FC<HeroCoverProps> = ({
  name = 'XXXX',
  subtitle = 'Mis Quince Años',
  badgeText = 'MIS 15',
}) => {
  return (
    <section
      id="hero-cover-section"
      className="relative w-full bg-[#0d070a] text-white py-16 sm:py-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Animated Circular Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-5"
      >
        <Mis15Badge text={badgeText} theme="dark" size={108} />
      </motion.div>

      {/* Celebrant Name in Luxury Typography */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        id="celebrant-name"
        className="text-4xl sm:text-5xl md:text-6xl tracking-[0.25em] font-light uppercase font-cinzel text-[#fff9ee] drop-shadow-md"
      >
        {name}
      </motion.h1>

      {/* Subtitle in Cursive Calligraphy in Champagne Gold */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        id="celebrant-subtitle"
        className="text-3xl sm:text-4xl md:text-5xl text-[#dfc2a5] font-script font-normal mt-2 mb-2 drop-shadow"
      >
        {subtitle}
      </motion.p>
    </section>
  );
};
