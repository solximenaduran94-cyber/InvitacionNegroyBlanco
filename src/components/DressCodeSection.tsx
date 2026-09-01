import React from 'react';
import { motion } from 'motion/react';
import { Gem } from 'lucide-react';
import { Mis15Badge } from './Mis15Badge';
import { SilverGlitterLayer } from './SilverGlitterLayer';

interface DressCodeSectionProps {
  dressCode: string;
  badgeText: string;
  subtext?: string;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({
  dressCode = 'ELEGANTE SPORT',
  badgeText = 'MIS 15',
  subtext,
}) => {
  return (
    <section id="dress-code-section" className="w-full">
      {/* Black Block with Diamond Icon */}
      <div className="w-full bg-black text-white py-14 px-6 text-center border-t border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xs mx-auto space-y-3"
        >
          {/* Diamond Icon */}
          <div className="w-12 h-12 mx-auto flex items-center justify-center text-white mb-2">
            <Gem className="w-8 h-8 stroke-[1.3] text-neutral-200" />
          </div>

          <h3 className="text-xs sm:text-sm tracking-[0.3em] font-medium text-neutral-300 uppercase font-montserrat">
            DRESS CODE
          </h3>

          <p
            id="dress-code-title"
            className="text-sm sm:text-base tracking-[0.25em] font-light text-white uppercase font-cinzel"
          >
            {dressCode}
          </p>

          {subtext && (
            <p className="text-xs tracking-wider text-neutral-400 font-light italic mt-1">
              {subtext}
            </p>
          )}
        </motion.div>
      </div>

      {/* Light Block with Rotating Mis 15 Badge and Silver Glitter */}
      <div className="relative w-full py-10 px-6 flex justify-center items-center overflow-hidden border-t border-slate-300">
        <SilverGlitterLayer />
        <div className="relative z-10">
          <Mis15Badge text={badgeText} theme="light" size={100} />
        </div>
      </div>
    </section>
  );
};
