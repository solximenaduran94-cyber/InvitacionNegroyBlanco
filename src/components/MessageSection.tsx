import React from 'react';
import { motion } from 'motion/react';

interface MessageSectionProps {
  message: string;
}

export const MessageSection: React.FC<MessageSectionProps> = ({ message }) => {
  return (
    <section
      id="message-section"
      className="w-full bg-black text-white py-14 sm:py-20 px-6 sm:px-10 border-t border-neutral-900"
    >
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="w-8 h-px bg-neutral-700 mx-auto mb-6" />
          <p
            id="invitation-intro-text"
            className="text-xs sm:text-sm md:text-base leading-relaxed tracking-[0.2em] font-light text-neutral-300 uppercase font-montserrat"
          >
            {message}
          </p>
          <div className="w-8 h-px bg-neutral-700 mx-auto mt-6" />
        </motion.div>
      </div>
    </section>
  );
};
