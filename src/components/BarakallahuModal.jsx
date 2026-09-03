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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden space-y-6 text-center">
        
        {/* Motif décoratif en fond */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-amber-900/20 pointer-events-none" />

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 pt-2">
          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
            Désamorçage Immédiat de la Colère
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            La Sounnah d'Abdullah ibn 'Awn
          </h2>
          <p className="text-xs text-stone-300 max-w-sm mx-auto">
            Face au courroux ou à l'injustice, ne proférez aucun reproche. Remplacez l'amertume par cette invocation :
          </p>
        </div>

        {/* Calligraphie principale avec pulsation */}
        <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-inner animate-pulseSlow">
          <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-300 dir-rtl leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
            « بَارَكَ اللَّهُ فِيكَ ! »
          </div>
          <p className="text-xs sm:text-sm text-emerald-200/90 font-medium mt-3">
            « Qu'Allah te bénisse ! » (Bārak Allāhu fīk)
          </p>
        </div>

        {/* Compteur de respiration 10 secondes */}
        <div className="space-y-3">
          {isCalming ? (
            <div className="space-y-2">
              <div className="text-3xl font-extrabold font-mono text-emerald-400">
                {countdown > 0 ? `${countdown}s de silence` : 'Apaisement retrouvé ✨'}
              </div>
              <p className="text-[11px] text-stone-400">
                {countdown > 0 
                  ? "Prenez une grande inspiration, relâchez vos épaules et souriez intérieurement."
                  : "Le diable est désarmé. Votre dignité et votre foi sont sauves."}
              </p>
            </div>
          ) : (
            <button
              onClick={handleStartCalm}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
            >
              <Wind className="w-4 h-4" />
              <span>Lancer 10 secondes de silence sacré</span>
            </button>
          )}
        </div>

        {/* Pied de modal */}
        <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400">
          « تحرم على كل قريب هين لين سهل » • Le fort n'est pas celui qui terrasse son adversaire, mais celui qui se maîtrise dans la colère.
        </div>
      </div>
    </div>
  );
}
