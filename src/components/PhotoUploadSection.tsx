import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, X, Check, Image as ImageIcon, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SharedPhoto } from '../types';

interface PhotoUploadSectionProps {
  celebrantName: string;
}

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  celebrantName = 'XXXX',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<SharedPhoto[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      author: 'Amigos de la escuela',
      caption: '¡La mejor noche de todas! ✨',
      timestamp: 'Reciente',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
      author: 'Familia',
      caption: '¡Felicidades hermosa!',
      timestamp: 'Reciente',
    },
  ]);
  const [guestName, setGuestName] = useState('');
  const [guestCaption, setGuestCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) return;

    const newPhoto: SharedPhoto = {
      id: Date.now().toString(),
      url: previewUrl,
      author: guestName.trim() || 'Invitado/a',
      caption: guestCaption.trim() || '¡Mis mejores momentos de los 15!',
      timestamp: 'Hace un momento',
    };

    setUploadedPhotos([newPhoto, ...uploadedPhotos]);
    setIsSuccess(true);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setPreviewUrl(null);
      setGuestName('');
      setGuestCaption('');
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <>
      <section
        id="photo-upload-section"
        className="w-full bg-black text-white py-16 sm:py-20 px-6 text-center border-t border-neutral-900"
      >
        <div className="max-w-md mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xs sm:text-sm tracking-[0.2em] font-light text-neutral-300 uppercase leading-relaxed font-montserrat">
              TERMINADA LA FIESTA, SI QUERÉS AYUDARME A RECORDAR ESTA NOCHE PARA SIEMPRE… COMPARTÍ CONMIGO, LAS FOTOS QUE HAYAS TOMADO!
            </p>

            {/* Subilas Acá Button matching Page 5 */}
            <div className="pt-4">
              <button
                id="upload-photos-button"
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-neutral-300 hover:bg-white text-black text-xs sm:text-sm tracking-[0.25em] font-medium uppercase rounded-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                SUBILAS ACÁ!
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Photo Upload & Album Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 text-white rounded-xl shadow-2xl overflow-hidden my-6"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-neutral-300" />
                  <h3 className="text-sm font-cinzel tracking-[0.2em] font-medium uppercase">
                    Álbum de Recuerdos
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
                {isSuccess ? (
                  <div className="text-center py-8 space-y-3 bg-neutral-950 rounded-lg border border-neutral-800 p-4">
                    <div className="w-12 h-12 bg-neutral-800 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-white tracking-wider">
                      ¡Foto subida con éxito al álbum!
                    </p>
                    <p className="text-xs text-neutral-400">
                      Muchas gracias por compartir tus recuerdos con {celebrantName}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleUploadSubmit} className="space-y-4 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                    <h4 className="text-xs tracking-widest uppercase font-medium text-neutral-300 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      Subir una foto de la fiesta
                    </h4>

                    {/* File Dropzone */}
                    <label className="border-2 border-dashed border-neutral-700 hover:border-neutral-500 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {previewUrl ? (
                        <div className="relative w-full max-h-48 flex justify-center">
                          <img
                            src={previewUrl}
                            alt="Vista previa"
                            className="max-h-48 rounded object-contain border border-neutral-700"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 text-neutral-500 group-hover:text-white mx-auto mb-2 transition-colors" />
                          <p className="text-xs text-neutral-300 font-medium">
                            Tocá acá para elegir una foto o sacá una foto
                          </p>
                          <p className="text-[10px] text-neutral-500 mt-1">
                            Formatos PNG, JPG, HEIC
                          </p>
                        </div>
                      )}
                    </label>

                    {previewUrl && (
                      <div className="space-y-3 pt-2">
                        <input
                          type="text"
                          placeholder="Tu nombre (opcional)"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
                        />
                        <input
                          type="text"
                          placeholder="Mensaje o dedicatoria..."
                          value={guestCaption}
                          onChange={(e) => setGuestCaption(e.target.value)}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-widest rounded hover:bg-neutral-200 transition-colors"
                        >
                          Publicar en el Álbum
                        </button>
                      </div>
                    )}
                  </form>
                )}

                {/* Shared Gallery Feed */}
                <div className="space-y-3">
                  <h4 className="text-xs tracking-widest uppercase font-medium text-neutral-400">
                    Fotos compartidas ({uploadedPhotos.length})
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    {uploadedPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden flex flex-col"
                      >
                        <div className="aspect-square w-full overflow-hidden bg-neutral-900">
                          <img
                            src={photo.url}
                            alt={photo.caption || 'Foto de la fiesta'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2.5 text-left flex-1 flex flex-col justify-between">
                          <p className="text-[11px] font-medium text-white line-clamp-2">
                            {photo.caption}
                          </p>
                          <div className="flex items-center justify-between text-[9px] text-neutral-400 mt-1.5 pt-1 border-t border-neutral-800/80">
                            <span>{photo.author}</span>
                            <span>{photo.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 bg-neutral-800 text-neutral-200 text-xs uppercase tracking-wider rounded hover:bg-neutral-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
