import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, Check, CreditCard, X, Sparkles } from 'lucide-react';
import { SilverGlitterLayer } from './SilverGlitterLayer';

interface GiftSectionProps {
  alias: string;
  cbu?: string;
  holder?: string;
  entity?: string;
}

export const GiftSection: React.FC<GiftSectionProps> = ({
  alias = 'XXXX.XXXX',
  cbu = '0000003100000000000000',
  holder = 'XXXX XXXX',
  entity = 'BANCO XXXX',
}) => {
  const [copied, setCopied] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(alias);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyCbu = () => {
    if (cbu) {
      navigator.clipboard.writeText(cbu);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <section
        id="gift-section"
        className="relative w-full text-neutral-900 py-16 px-6 text-center overflow-hidden border-t border-[#ecdacb]"
      >
        {/* Champagne Gold & Dusty Rose Glitter Background */}
        <SilverGlitterLayer />

        <div className="relative max-w-md mx-auto space-y-6 z-10">
          {/* Gift Box Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 mx-auto flex items-center justify-center text-[#8c4f5a]"
          >
            <Gift className="w-10 h-10 stroke-[1.4] text-[#8c4f5a] filter drop-shadow-[0_0_8px_rgba(223,186,115,0.35)]" />
          </motion.div>

          {/* Gift Message */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-xs sm:text-sm tracking-[0.2em] font-medium text-[#42222d] uppercase font-montserrat max-w-xs mx-auto leading-relaxed">
              TU PRESENCIA ES MI MEJOR REGALO. SI QUERÉS SUMAR ALGO MÁS…
            </p>

            {/* Alias block with interactive copy */}
            <div className="pt-2">
              <button
                id="copy-alias-button"
                onClick={handleCopyAlias}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white backdrop-blur-sm border border-[#dfc2a5] rounded-sm shadow-sm transition-all cursor-pointer hover:shadow-md hover:border-[#c7a485]"
                title="Hacé clic para copiar el Alias"
              >
                <span className="text-xs sm:text-sm tracking-[0.25em] font-semibold text-[#1e0e15] uppercase">
                  ALIAS: {alias}
                </span>
                {copied ? (
                  <Check className="w-4 h-4 text-[#8c4f5a] animate-bounce" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#a8747f] group-hover:text-[#8c4f5a] transition-colors" />
                )}
              </button>

              {copied && (
                <p className="text-[11px] text-[#8c4f5a] font-medium tracking-wider mt-1.5 animate-fade-in">
                  ¡Alias copiado al portapapeles!
                </p>
              )}
            </div>

            <div>
              <button
                onClick={() => setShowDetailsModal(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#8c4f5a] hover:text-[#52252f] tracking-widest uppercase underline underline-offset-4 cursor-pointer transition-colors font-medium"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#dfc2a5]" />
                Ver datos bancarios completos
              </button>
            </div>

            {/* Physical Box in Room Note */}
            <p className="text-xs tracking-[0.25em] font-medium text-[#73434f] uppercase pt-2 font-montserrat">
              O HABRÁ UN COFRE EN EL SALÓN
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bank Account Details Modal */}
      <AnimatePresence>
        {showDetailsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#180e14] border border-[#3b202c] text-white rounded-xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between border-b border-[#2d1822] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#dfc2a5]" />
                  <h4 className="text-sm font-cinzel tracking-[0.2em] uppercase font-medium text-[#dfc2a5]">
                    Datos de Transferencia
                  </h4>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="bg-[#0f080d] p-3 rounded border border-[#2d1822]">
                  <span className="text-[#dfc2a5] tracking-wider uppercase block text-[10px] font-medium">
                    Alias
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-mono font-semibold text-[#fff9f0] text-sm">
                      {alias}
                    </span>
                    <button
                      onClick={handleCopyAlias}
                      className="p-1 hover:text-[#dfc2a5] text-[#dfc2a5]/80 transition-colors"
                      title="Copiar alias"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {cbu && (
                  <div className="bg-[#0f080d] p-3 rounded border border-[#2d1822]">
                    <span className="text-[#dfc2a5] tracking-wider uppercase block text-[10px] font-medium">
                      CBU / CVU
                    </span>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="font-mono text-[#fff9f0] text-xs break-all">
                        {cbu}
                      </span>
                      <button
                        onClick={handleCopyCbu}
                        className="p-1 hover:text-[#dfc2a5] text-[#dfc2a5]/80 transition-colors ml-2"
                        title="Copiar CBU"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {holder && (
                  <div className="bg-[#0f080d] p-3 rounded border border-[#2d1822]">
                    <span className="text-[#dfc2a5] tracking-wider uppercase block text-[10px] font-medium">
                      Titular
                    </span>
                    <span className="text-[#fff9f0] font-medium block mt-0.5">
                      {holder}
                    </span>
                  </div>
                )}

                {entity && (
                  <div className="bg-[#0f080d] p-3 rounded border border-[#2d1822]">
                    <span className="text-[#dfc2a5] tracking-wider uppercase block text-[10px] font-medium">
                      Entidad / Banco
                    </span>
                    <span className="text-[#fff9f0] font-medium block mt-0.5">
                      {entity}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-[#2d1822] text-center">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#8c4f5a] via-[#a36770] to-[#8c4f5a] text-[#fff8ee] text-xs uppercase tracking-widest font-medium rounded hover:brightness-110 transition-all border border-[#dfc2a5]/50 cursor-pointer"
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
