import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, MessageSquare, Music, Utensils, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RsvpEntry } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  celebrantName: string;
  whatsappNumber: string;
  onSaveRsvp?: (entry: RsvpEntry) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  celebrantName,
  whatsappNumber,
  onSaveRsvp,
}) => {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(true);
  const [companionsCount, setCompanionsCount] = useState('1');
  const [dietary, setDietary] = useState('Ninguna');
  const [customDietary, setCustomDietary] = useState('');
  const [songSuggestion, setSongSuggestion] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (attending) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#737373', '#d4d4d4', '#ffffff', '#38bdf8'],
      });
    }

    const entry: RsvpEntry = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      attending: attending ?? true,
      companionsCount: parseInt(companionsCount) || 1,
      dietaryRestriction: dietary === 'Otra' ? customDietary : dietary,
      customDietary,
      songSuggestion: songSuggestion.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    if (onSaveRsvp) {
      onSaveRsvp(entry);
    }

    // Build WhatsApp message
    const statusText = attending ? '✅ Confirmo mi asistencia' : '❌ Lamentablemente no podré asistir';
    const dietText = dietary !== 'Ninguna' ? `\n🥗 Menú especial: ${dietary === 'Otra' ? customDietary : dietary}` : '';
    const compText = attending ? `\n👥 Cantidad de personas: ${companionsCount}` : '';
    const songText = songSuggestion ? `\n🎵 Canción que no puede faltar: ${songSuggestion}` : '';
    const noteText = message ? `\n💬 Mensaje: "${message}"` : '';

    const textToSend = `*Confirmación de Asistencia - Mis 15 de ${celebrantName}*\n\n` +
      `👤 *Nombre:* ${fullName.trim()}\n` +
      `📌 *Estado:* ${statusText}` +
      compText +
      dietText +
      songText +
      noteText;

    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToSend)}`;

    setIsSubmitted(true);

    // Give a moment before option to open WhatsApp
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 text-white rounded-xl shadow-2xl overflow-hidden my-8"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
              <div>
                <h3 className="text-lg font-cinzel tracking-[0.2em] font-medium text-white uppercase">
                  Confirmar Asistencia
                </h3>
                <p className="text-xs text-neutral-400 font-light tracking-wider mt-0.5">
                  Mis 15 de {celebrantName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-neutral-800 border border-neutral-700 text-white rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-cinzel tracking-wider text-white">
                    ¡Muchas Gracias!
                  </h4>
                  <p className="text-sm text-neutral-300 font-light max-w-xs mx-auto leading-relaxed">
                    Tu confirmación ha sido registrada. Se abrirá WhatsApp para enviar tu mensaje a la agasajada.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-white text-black text-xs tracking-widest uppercase font-medium rounded hover:bg-neutral-200 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Martín Pérez"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                    />
                  </div>

                  {/* Attendance Choice */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-2">
                      ¿Asistirás a la fiesta? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-3 px-4 rounded border text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          attending === true
                            ? 'bg-white text-black border-white shadow-sm'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        Sí, asistiré
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-3 px-4 rounded border text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          attending === false
                            ? 'bg-neutral-800 text-white border-neutral-600 shadow-sm'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <X className="w-4 h-4" />
                        No podré ir
                      </button>
                    </div>
                  </div>

                  {attending && (
                    <>
                      {/* Companions */}
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1.5 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-neutral-400" />
                          Cantidad de personas
                        </label>
                        <select
                          value={companionsCount}
                          onChange={(e) => setCompanionsCount(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                        >
                          <option value="1">1 Persona (Solo yo)</option>
                          <option value="2">2 Personas</option>
                          <option value="3">3 Personas</option>
                          <option value="4">4 Personas</option>
                          <option value="5">5+ Familia</option>
                        </select>
                      </div>

                      {/* Dietary requirements */}
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1.5 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-neutral-400" />
                          Preferencia de Menú / Restricción
                        </label>
                        <select
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded text-sm text-white focus:outline-none focus:border-neutral-400 transition-colors"
                        >
                          <option value="Ninguna">Menú estándar / Ninguna</option>
                          <option value="Celíaco (Sin TACC)">Celíaco / Sin TACC</option>
                          <option value="Vegetariano">Vegetariano</option>
                          <option value="Vegano">Vegano</option>
                          <option value="Diabético">Diabético</option>
                          <option value="Hipertenso (Sin Sal)">Sin Sal / Hipertenso</option>
                          <option value="Otra">Otra restricción o alergia</option>
                        </select>
                        {dietary === 'Otra' && (
                          <input
                            type="text"
                            placeholder="Especificar alergia o restricción..."
                            value={customDietary}
                            onChange={(e) => setCustomDietary(e.target.value)}
                            className="mt-2 w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded text-sm text-white focus:outline-none focus:border-neutral-400"
                          />
                        )}
                      </div>

                      {/* Song Request */}
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1.5 flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5 text-neutral-400" />
                          ¿Qué tema querés que suene en la fiesta?
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Tití me preguntó - Bad Bunny"
                          value={songSuggestion}
                          onChange={(e) => setSongSuggestion(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                        />
                      </div>
                    </>
                  )}

                  {/* Message for celebrant */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                      Dedicatoria o mensaje (opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Dejale unas palabras a la quinceañera..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-700 rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-white text-black text-xs sm:text-sm font-medium tracking-[0.2em] uppercase rounded hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      Enviar Confirmación
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
