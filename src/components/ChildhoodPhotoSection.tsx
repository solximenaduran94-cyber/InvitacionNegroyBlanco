import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface ChildhoodPhotoSectionProps {
  photoUrl: string;
  scheduleTime: string;
}

export const ChildhoodPhotoSection: React.FC<ChildhoodPhotoSectionProps> = ({
  photoUrl,
  scheduleTime = 'XX:XX A XX:XX HS',
}) => {
  return (
    <section id="childhood-photo-section" className="w-full bg-black text-white">
      {/* Childhood / Memory Photo in Vintage Black & White */}
      <div className="w-full aspect-[4/5] sm:aspect-[3/4] max-h-[70vh] overflow-hidden bg-neutral-900 relative">
        <img
          src={photoUrl}
          alt="Foto de la infancia"
          className="w-full h-full object-cover object-center grayscale contrast-115 brightness-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      {/* Horario Block matching Page 3 */}
      <div className="py-12 px-6 text-center bg-black border-t border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xs mx-auto space-y-3"
        >
          {/* Circular Clock Icon */}
          <div className="w-10 h-10 mx-auto rounded-full border border-neutral-700 flex items-center justify-center text-white mb-2">
            <Clock className="w-5 h-5 stroke-[1.5]" />
          </div>

          <h3 className="text-xs sm:text-sm tracking-[0.3em] font-medium text-neutral-300 uppercase font-montserrat">
            HORARIO
          </h3>

          <p
            id="schedule-time-display"
            className="text-base sm:text-lg tracking-[0.2em] font-light text-white uppercase font-cinzel"
          >
            {scheduleTime}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
