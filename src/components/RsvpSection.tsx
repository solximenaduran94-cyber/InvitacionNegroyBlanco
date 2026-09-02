import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { RsvpModal } from './RsvpModal';
import { RsvpEntry } from '../types';
import { SilverGlitterLayer } from './SilverGlitterLayer';

interface RsvpSectionProps {
  celebrantName: string;
  whatsappNumber: string;
  onSaveRsvp?: (entry: RsvpEntry) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  celebrantName,
  whatsappNumber,
  onSaveRsvp,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        id="rsvp-section"
        className="relative w-full text-neutral-900 py-16 px-6 text-center overflow-hidden border-t border-[#ecdacb]"
      >
        {/* Champagne Gold & Dusty Rose Glitter Background */}
        <SilverGlitterLayer />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-md mx-auto space-y-5 z-10"
        >
          {/* WhatsApp Icon */}
          <div className="w-14 h-14 mx-auto flex items-center justify-center text-[#8c4f5a]">
            <MessageCircle className="w-10 h-10 stroke-[1.4] text-[#8c4f5a] filter drop-shadow-[0_0_8px_rgba(223,194,165,0.4)]" />
          </div>

          <p className="text-xs sm:text-sm tracking-[0.25em] font-medium text-[#2d1720] uppercase font-montserrat max-w-xs mx-auto leading-relaxed">
            TU PRESENCIA ES MUY IMPORTANTE PARA MI…
          </p>

          <div className="pt-2">
            <button
              id="confirm-attendance-button"
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-gradient-to-r from-[#8c4f5a] via-[#a36770] to-[#8c4f5a] text-[#fff8ee] text-xs sm:text-sm tracking-[0.25em] font-medium uppercase rounded-sm shadow-lg border border-[#dfc2a5]/50 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              CONFIRMAR ASISTENCIA
            </button>
          </div>
        </motion.div>
      </section>

      <RsvpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        celebrantName={celebrantName}
        whatsappNumber={whatsappNumber}
        onSaveRsvp={onSaveRsvp}
      />
    </>
  );
};
