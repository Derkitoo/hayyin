import React, { useState, useEffect } from 'react';
import { X, Sparkles, Wind, RotateCcw, Check } from 'lucide-react';
import { playHarmonicTone, triggerHaptic } from '../utils/audio';

export default function BarakallahuModal({ isOpen, onClose, soundEnabled }) {
  const [countdown, setCountdown] = useState(10);
  const [isCalming, setIsCalming] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isOpen && isCalming && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(c => c - 1);
        if (soundEnabled && (countdown === 1 || countdown === 5 || countdown === 10)) {
          playHarmonicTone(440, 'sine', 0.3, 0.08);
        }
      }, 1000);
    } else if (countdown === 0 && isCalming) {
      triggerHaptic([100, 50, 100]);
      if (soundEnabled) {
        playHarmonicTone(523.25, 'sine', 0.8, 0.15);
      }
    }
    return () => clearTimeout(timer);
  }, [isOpen, isCalming, countdown, soundEnabled]);

  const handleStartCalm = () => {
    setCountdown(10);
    setIsCalming(true);
    triggerHaptic(50);
    if (soundEnabled) {
      playHarmonicTone(392, 'sine', 0.5, 0.1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] border border-[#DFD8CB] dark:border-[#25302A] rounded-[36px] max-w-lg w-full p-6 sm:p-8 text-[#1E3A2B] dark:text-[#EAE6DF] relative shadow-2xl overflow-hidden space-y-6 text-center">
        
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F5F2EB] dark:bg-[#151B18] hover:bg-[#E2DACB] dark:hover:bg-[#1E2723] text-[#827869] dark:text-[#8E9B93] hover:text-[#1E3A2B] dark:hover:text-white transition-colors border border-[#DFD8CB] dark:border-[#25302A]"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-2 pt-2">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#B89B72] dark:text-[#C4A97D] bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#2A3830] px-3.5 py-1 rounded-full inline-block">
            Désamorçage Immédiat de la Colère
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#1E3A2B] dark:text-[#EAE6DF]">
            La Sounnah d'Abdullah ibn 'Awn
          </h2>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93] max-w-sm mx-auto">
            Face au courroux ou à l'injustice, ne proférez aucun reproche. Remplacez l'amertume par cette invocation :
          </p>
        </div>

        {/* Calligraphie principale avec pulsation */}
        <div className="bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#25302A] rounded-[28px] p-6 sm:p-8 shadow-sm animate-pulseSlow">
          <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E3A2B] dark:text-[#A7D1BA] dir-rtl leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
            « بَارَكَ اللَّهُ فِيكَ ! »
          </div>
          <p className="text-xs sm:text-sm text-[#B89B72] dark:text-[#C4A97D] font-medium mt-3">
            « Qu'Allah te bénisse ! » (Bārak Allāhu fīk)
          </p>
        </div>

        {/* Compteur de respiration 10 secondes */}
        <div className="space-y-3">
          {isCalming ? (
            <div className="space-y-2">
              <div className="text-3xl font-extrabold font-mono text-[#1E3A2B] dark:text-[#A7D1BA]">
                {countdown > 0 ? `${countdown}s de silence` : 'Apaisement retrouvé ✨'}
              </div>
              <p className="text-[11px] text-[#827869] dark:text-[#8E9B93]">
                {countdown > 0 
                  ? "Prenez une grande inspiration, relâchez vos épaules et souriez intérieurement."
                  : "Le diable est désarmé. Votre dignité et votre foi sont sauves."}
              </p>
            </div>
          ) : (
            <button
              onClick={handleStartCalm}
              className="w-full bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] font-bold py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Wind className="w-4 h-4" />
              <span>Lancer 10 secondes de silence sacré</span>
            </button>
          )}
        </div>

        {/* Pied de modal */}
        <div className="pt-3 border-t border-[#DFD8CB]/80 dark:border-[#25302A] text-[11px] text-[#827869] dark:text-[#8E9B93]">
          « تَحْرُمُ عَلَى كُلِّ قَرِيبٍ هَيِّنٍ لَيِّنٍ سَهْلٍ » • Le fort n'est pas celui qui terrasse son adversaire, mais celui qui se maîtrise dans la colère.
        </div>
      </div>
    </div>
  );
}
