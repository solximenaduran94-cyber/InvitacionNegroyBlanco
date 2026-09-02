import React from 'react';
import { motion } from 'motion/react';

interface PhotoUploadSectionProps {
  celebrantName?: string;
  driveFolderUrl?: string;
}

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  celebrantName = 'Xiomara',
  driveFolderUrl = 'https://drive.google.com/drive/folders/1_eEUUOeU4-OnqvL5XNVu0Gmi2Giwdxd4?usp=sharing',
}) => {
  return (
    <section
      id="photo-upload-section"
      className="w-full bg-[#0d070a] text-white py-16 sm:py-20 px-6 text-center border-t border-[#26151c]"
    >
      <div className="max-w-md mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] font-light text-[#f6edf0] uppercase leading-relaxed font-montserrat">
            TERMINADA LA FIESTA, SI QUERÉS AYUDARME A RECORDAR ESTA NOCHE PARA SIEMPRE… COMPARTÍ CONMIGO, LAS FOTOS QUE HAYAS TOMADO!
          </p>

          {/* Subilas Acá Button */}
          <div className="pt-4">
            <a
              id="upload-photos-button"
              href={driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-[#caa684] via-[#f7eee2] to-[#caa684] text-[#24131b] text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase rounded-sm shadow-md hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-[#caa684]/50 text-center"
            >
              SUBILAS ACÁ!
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
