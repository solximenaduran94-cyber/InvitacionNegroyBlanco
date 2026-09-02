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
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (attending) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#caa684', '#dfc2a5', '#fbf4ec', '#d8a5ad', '#c28b93', '#ffffff'],
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

    // Build clean WhatsApp message without icons or emojis, highly legible
    const lines: string[] = [];

    lines.push(`Confirmación de Asistencia - Mis 15 de ${celebrantName}\n`);
    lines.push(`Nombre y Apellido: ${fullName.trim()}`);

    if (attending) {
      lines.push(`Asistencia: Sí, confirmo mi asistencia`);
      lines.push(`Cantidad de personas: ${companionsCount}`);

      if (dietary && dietary !== 'Ninguna') {
        const dietValue = dietary === 'Otra' ? (customDietary.trim() || 'Restricción especificada') : dietary;
        lines.push(`Preferencia de menú: ${dietValue}`);
      }

      if (songSuggestion.trim()) {
        lines.push(`Canción sugerida: ${songSuggestion.trim()}`);
      }
    } else {
      lines.push(`Asistencia: No podré asistir`);
    }

    if (message.trim()) {
      lines.push(`Mensaje: ${message.trim()}`);
    }

    const textToSend = lines.join('\n');

    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToSend)}`;
    setGeneratedWaUrl(waUrl);
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
            className="relative w-full max-w-lg bg-[#180e14] border border-[#3b202c] text-white rounded-xl shadow-2xl overflow-hidden my-8"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#2d1822] flex items-center justify-between bg-[#12090e]">
              <div>
                <h3 className="text-lg font-cinzel tracking-[0.2em] font-medium text-[#dfc2a5] uppercase">
                  Confirmar Asistencia
                </h3>
                <p className="text-xs text-[#d8a5ad] font-light tracking-wider mt-0.5">
                  Mis 15 de {celebrantName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#2d1822] rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#2a1722] border border-[#dfc2a5]/50 text-[#dfc2a5] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-cinzel tracking-wider text-[#dfc2a5]">
                    ¡Muchas Gracias!
                  </h4>
                  <p className="text-sm text-[#f6edf0] font-light max-w-xs mx-auto leading-relaxed">
                    Tu confirmación ha sido guardada. Si WhatsApp no se abrió automáticamente, podés hacer clic abajo para enviar tu mensaje a <span className="font-medium text-[#dfc2a5]">{whatsappNumber}</span>:
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {generatedWaUrl && (
                      <a
                        href={generatedWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs tracking-widest uppercase font-semibold rounded flex items-center justify-center gap-2 shadow-md transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Abrir WhatsApp
                      </a>
                    )}
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#caa684] via-[#dfc2a5] to-[#caa684] text-[#1a0c13] text-xs tracking-widest uppercase font-semibold rounded hover:brightness-105 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#dfc2a5] font-medium mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Martín Pérez"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0f080d] border border-[#3b202c] rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#dfc2a5] transition-colors"
                    />
                  </div>

                  {/* Attendance Choice */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#dfc2a5] font-medium mb-2">
                      ¿Asistirás a la fiesta? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-3 px-4 rounded border text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          attending === true
                            ? 'bg-gradient-to-r from-[#caa684] via-[#f7eee2] to-[#caa684] text-[#24131b] border-[#caa684] shadow-md font-semibold'
                            : 'bg-[#0f080d] text-neutral-400 border-[#3b202c] hover:border-[#dfc2a5]/50'
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
                            ? 'bg-[#2a1722] text-[#f6edf0] border-[#c28b93] shadow-sm'
                            : 'bg-[#0f080d] text-neutral-400 border-[#3b202c] hover:border-neutral-700'
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
                          <Users className="w-3.5 h-3.5 text-[#dfc2a5]" />
                          Cantidad de personas
                        </label>
                        <select
                          value={companionsCount}
                          onChange={(e) => setCompanionsCount(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0f080d] border border-[#3b202c] rounded text-sm text-white focus:outline-none focus:border-[#dfc2a5] transition-colors"
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
                          <Utensils className="w-3.5 h-3.5 text-[#dfc2a5]" />
                          Preferencia de Menú / Restricción
                        </label>
                        <select
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0f080d] border border-[#3b202c] rounded text-sm text-white focus:outline-none focus:border-[#dfc2a5] transition-colors"
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
                            className="mt-2 w-full px-3.5 py-2 bg-[#0f080d] border border-[#3b202c] rounded text-sm text-white focus:outline-none focus:border-[#dfc2a5]"
                          />
                        )}
                      </div>

                      {/* Song Request */}
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1.5 flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5 text-[#dfc2a5]" />
                          ¿Qué tema querés que suene en la fiesta?
                        </label>
                        <input
                          type="text"
                          placeholder="Ej: Tití me preguntó - Bad Bunny"
                          value={songSuggestion}
                          onChange={(e) => setSongSuggestion(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-[#0f080d] border border-[#3b202c] rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#dfc2a5] transition-colors"
                        />
                      </div>
                    </>
                  )}

                  {/* Message for celebrant */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#dfc2a5]" />
                      Dedicatoria o mensaje (opcional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Dejale unas palabras a la quinceañera..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#0f080d] border border-[#3b202c] rounded text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#dfc2a5] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-[#caa684] via-[#f7eee2] to-[#caa684] text-[#24131b] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase rounded hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg border border-[#caa684]/50"
                    >
                      <Sparkles className="w-4 h-4 text-[#8c4f5a]" />
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
