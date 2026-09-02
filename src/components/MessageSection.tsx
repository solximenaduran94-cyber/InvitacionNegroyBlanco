import React from 'react';
import { motion } from 'motion/react';

interface MessageSectionProps {
  message: string;
}

export const MessageSection: React.FC<MessageSectionProps> = ({ message }) => {
  return (
    <section
      id="message-section"
      className="w-full bg-[#0d070a] text-white py-14 sm:py-20 px-6 sm:px-10 border-t border-[#26151c]"
    >
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#dfba73] to-transparent mx-auto mb-6" />
          <p
            id="invitation-intro-text"
            className="text-xs sm:text-sm md:text-base leading-relaxed tracking-[0.2em] font-light text-[#f9f3ea] uppercase font-montserrat"
          >
            {message}
          </p>
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#dfba73] to-transparent mx-auto mt-6" />
        </motion.div>
      </div>
    </section>
  );
};
