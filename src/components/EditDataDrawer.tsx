import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { InvitationData } from '../types';
import { defaultInvitationData } from '../data/defaultData';

interface EditDataDrawerProps {
  data: InvitationData;
  onChange: (newData: InvitationData) => void;
}

export const EditDataDrawer: React.FC<EditDataDrawerProps> = ({ data, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InvitationData>(data);

  const handleChange = (field: keyof InvitationData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange(updated);
  };

  const handleResetToXxxx = () => {
    setFormData(defaultInvitationData);
    onChange(defaultInvitationData);
  };

  const handleLoadSampleData = () => {
    const sample: InvitationData = {
      ...defaultInvitationData,
      celebrantName: 'VALENTINA',
      celebrantSubtitle: 'mis quince años',
      eventDayName: 'SÁBADO',
      eventDateDisplay: '24.10.26',
      eventDateIso: '2026-10-24T21:30:00',
      venueName: 'PALACIO D´ORANGE',
      venueAddress: 'AV. DEL LIBERTADOR 4500',
      venueCity: 'BUENOS AIRES',
      scheduleTime: '21:30 A 05:30 HS',
      dressCode: 'ELEGANTE',
      bankAlias: 'VALEN.MIS15.MP',
      bankCbu: '0000003100098765432100',
      bankHolder: 'VALENTINA GARCIA',
    };
    setFormData(sample);
    onChange(sample);
  };

  return (
    <>
      {/* Discreet floating customize button */}
      <button
        id="toggle-customizer-button"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 px-3.5 py-2 bg-neutral-900/90 hover:bg-black text-white text-xs tracking-wider uppercase font-medium rounded-full shadow-lg border border-neutral-700/80 backdrop-blur-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Personalizar datos de la invitación"
      >
        <Settings className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Personalizar Datos</span>
      </button>

      {/* Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-neutral-900 text-white h-full overflow-y-auto shadow-2xl border-l border-neutral-800 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-sm font-cinzel tracking-wider uppercase font-medium">
                    Editor de Datos
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-5 space-y-4 flex-1">
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={handleResetToXxxx}
                    className="flex-1 py-2 px-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] tracking-wider uppercase font-medium rounded border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset a XXXX
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSampleData}
                    className="flex-1 py-2 px-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] tracking-wider uppercase font-medium rounded border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    Datos de Ejemplo
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Nombre de la Quinceañera
                  </label>
                  <input
                    type="text"
                    value={formData.celebrantName}
                    onChange={(e) => handleChange('celebrantName', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Día de la Semana
                  </label>
                  <input
                    type="text"
                    value={formData.eventDayName}
                    onChange={(e) => handleChange('eventDayName', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Fecha (formato display)
                  </label>
                  <input
                    type="text"
                    value={formData.eventDateDisplay}
                    onChange={(e) => handleChange('eventDateDisplay', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Nombre del Salón / Lugar
                  </label>
                  <input
                    type="text"
                    value={formData.venueName}
                    onChange={(e) => handleChange('venueName', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={formData.venueAddress}
                    onChange={(e) => handleChange('venueAddress', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Ciudad / Localidad
                  </label>
                  <input
                    type="text"
                    value={formData.venueCity}
                    onChange={(e) => handleChange('venueCity', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Horario
                  </label>
                  <input
                    type="text"
                    value={formData.scheduleTime}
                    onChange={(e) => handleChange('scheduleTime', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Dress Code
                  </label>
                  <input
                    type="text"
                    value={formData.dressCode}
                    onChange={(e) => handleChange('dressCode', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Alias de Transferencia
                  </label>
                  <input
                    type="text"
                    value={formData.bankAlias}
                    onChange={(e) => handleChange('bankAlias', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-neutral-400 font-medium mb-1">
                    Número de WhatsApp para Confirmaciones
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Listo, Ver Invitación
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
