import React, { useState, useEffect } from 'react';
import { Sun, Wind, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { playHarmonicTone, triggerHaptic } from '../utils/audio';

export default function CalmTab({
  soundEnabled,
  tasbihCount,
  setTasbihCount,
  onOpenBarakallahu
}) {
  const [breathingPhase, setBreathingPhase] = useState('Prêt');
  const [breathCount, setBreathCount] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Cycle de cohérence respiratoire prophétique (4s inspire, 4s retiens, 4s expire)
  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            setBreathingPhase((curr) => {
              if (curr === 'Inspirez doucement') {
                triggerHaptic([60]);
                if (soundEnabled) playHarmonicTone(523.25, 'sine', 0.6, 0.12); // Do (C5)
                return 'Retenez la paix';
              }
              if (curr === 'Retenez la paix') {
                triggerHaptic([40, 40]);
                if (soundEnabled) playHarmonicTone(392.00, 'sine', 0.6, 0.12); // Sol (G4)
                return 'Expirez toute amertume';
              }
              triggerHaptic([80]);
              if (soundEnabled) playHarmonicTone(329.63, 'sine', 0.6, 0.12); // Mi (E4)
              return 'Inspirez doucement';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingPhase('Prêt');
      setBreathCount(4);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, soundEnabled]);

  const startBreathing = () => {
    triggerHaptic(50);
    setIsBreathingActive(true);
    setBreathingPhase('Inspirez doucement');
    setBreathCount(4);
    if (soundEnabled) playHarmonicTone(329.63, 'sine', 0.8, 0.15);
  };

  const stopBreathing = () => {
    triggerHaptic(30);
    setIsBreathingActive(false);
  };

  const handleIncrementTasbih = () => {
    const next = tasbihCount + 1;
    setTasbihCount(next);
    triggerHaptic(next % 10 === 0 ? [50, 50] : 30);
    if (soundEnabled) {
      if (next % 33 === 0) {
        playHarmonicTone(783.99, 'sine', 0.4, 0.2); // Sol aigu
      } else {
        playHarmonicTone(659.25, 'sine', 0.2, 0.1); // Mi
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* L'anecdote de l'Imam Ibn 'Awn */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                La Formule Secrète d'Abdullah ibn 'Awn
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">Quand la contrariété atteint son intensité maximale</p>
            </div>
          </div>

          <button
            onClick={onOpenBarakallahu}
            className="hidden sm:inline-flex items-center space-x-1.5 bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-300/60 dark:border-amber-700/60 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mode Urgence</span>
          </button>
        </div>

        <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-stone-800/40 dark:to-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm space-y-3">
          <p className="leading-relaxed">
            Le Pr. Abd ar-Razzaq al-Badr rapporte l'attitude remarquable de ce grand savant des premières générations :
          </p>
          <div className="bg-white dark:bg-stone-900/90 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center shadow-inner">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-amber-300 block dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
              « كَانَ إِذَا اشْتَدَّ غَضَبُهُ مِنْ شَخْصٍ، قَالَ : بَارَكَ اللَّهُ فِيكَ ! »
            </span>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans mt-2">
              « Lorsque sa colère contre un individu devenait extrême, il se contentait de lui dire : <strong className="text-emerald-900 dark:text-emerald-400">"Qu'Allah te bénisse !" (Bārak Allāhu fīk)</strong>, sans ajouter un seul mot de reproche. »
            </p>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Transformer une impulsion destructive en une invocation de bienveillance étouffe instantanément l'ardeur du diable et protège les liens humains.
          </p>
        </div>
      </div>

      {/* Exercice de cohérence respiratoire & sonnette de paix */}
      <div className="bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-8 border border-emerald-900/50">
        <div className="space-y-1">
          <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-widest bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
            Désescalade Émotionnelle Immédiate
          </span>
          <h3 className="text-xl sm:text-2xl font-bold pt-1">Respiration & Silence Prophétique</h3>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            En cas d'énervement ou d'affront, abstenez-vous de parler. Suivez le cercle ci-dessous pour ralentir votre pouls.
          </p>
        </div>

        {/* Cercle animé dynamique */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
          <div 
            className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
              isBreathingActive 
                ? breathingPhase === 'Inspirez doucement' 
                  ? 'scale-110 border-emerald-400 shadow-2xl shadow-emerald-500/40 bg-emerald-800/20' 
                  : breathingPhase === 'Retenez la paix' 
                  ? 'scale-110 border-amber-400 bg-amber-900/30 shadow-2xl shadow-amber-500/30' 
                  : 'scale-90 border-teal-400 bg-teal-950/40 shadow-inner' 
                : 'scale-100 border-stone-700 bg-stone-900/40'
            }`}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center p-4">
            <Wind className={`w-8 h-8 mb-2 transition-transform ${isBreathingActive ? 'text-emerald-300 animate-pulse' : 'text-stone-500'}`} />
            <span className="text-sm sm:text-base font-bold text-emerald-100">{breathingPhase}</span>
            
            {isBreathingActive ? (
              <span className="text-4xl font-extrabold text-white mt-1 font-mono">{breathCount}</span>
            ) : (
              <span className="text-xs text-stone-400 mt-1">Prêt pour 1 minute de calme</span>
            )}
            
            {isBreathingActive && (
              <span className="text-xs text-amber-300 mt-2 font-serif italic">
                « بَارَكَ اللَّهُ فِيكَ »
              </span>
            )}
          </div>
        </div>

        {/* Contrôle de la séance */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {!isBreathingActive ? (
            <button
              onClick={startBreathing}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Démarrer la séance de calme</span>
            </button>
          ) : (
            <button
              onClick={stopBreathing}
              className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-white font-semibold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
            >
              <Pause className="w-4 h-4" />
              <span>Mettre fin au cycle</span>
            </button>
          )}
        </div>

        {/* Mini Compteur de Dhikr Anti-Stress */}
        <div className="pt-6 border-t border-emerald-900/70 max-w-lg mx-auto">
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 flex items-center justify-between">
            <div className="text-left space-y-0.5">
              <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider">Tasbih d'apaisement</span>
              <p className="text-xs text-emerald-100 font-serif">« أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ »</p>
              <span className="text-[10px] text-stone-400">« Je demande pardon à Allah et je reviens à Lui »</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleIncrementTasbih}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow active:scale-90 transition-transform"
              >
                +1 ({tasbihCount})
              </button>
              {tasbihCount > 0 && (
                <button
                  onClick={() => {
                    triggerHaptic(20);
                    setTasbihCount(0);
                  }}
                  className="p-2 text-stone-400 hover:text-white"
                  title="Réinitialiser"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Les 3 Règles prophétiques face au courroux */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2 text-xs">
          <div className="bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800 space-y-1">
            <span className="font-bold text-amber-300 flex items-center space-x-1">
              <span>1. Changer de posture</span>
            </span>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              Si vous êtes debout, asseyez-vous. Si la colère persiste, allongez-vous afin de faire redescendre la pression sanguine.
            </p>
          </div>

          <div className="bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800 space-y-1">
            <span className="font-bold text-amber-300 flex items-center space-x-1">
              <span>2. La formule d'Isti'adha</span>
            </span>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              Prononcer : <em>« A'oudhou billahi mina ash-Shaytan ar-Rajim »</em> pour dissiper la braise allumée par le diable.
            </p>
          </div>

          <div className="bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800 space-y-1">
            <span className="font-bold text-amber-300 flex items-center space-x-1">
              <span>3. L'Eau et les ablutions</span>
            </span>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              La colère provient du feu, et le feu ne s'éteint que par l'eau. Se laver le visage dissipe instantanément l'agitation.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
