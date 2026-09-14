import React, { useState, useEffect } from 'react';
import { Sun, Wind, Play, Pause, RotateCcw, Sparkles, ShieldAlert, Droplets, ArrowDownCircle, Heart } from 'lucide-react';
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

  // Formules de Dhikr sélectionnables
  const DHIKR_PRESETS = [
    {
      id: "istighfar",
      arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      phonetic: "Astaghfirullāh wa atūbu ilayh",
      translation: "« Je demande pardon à Allah et je reviens à Lui »",
      virtue: "Purifie le cœur de la dureté et efface les maladresses"
    },
    {
      id: "hawqala",
      arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
      phonetic: "Lā hawla wa lā quwwata illā billāh",
      translation: "« Il n'y a de force ni de puissance que par Allah »",
      virtue: "Trésor du Paradis pour briser l'ego et acquérir la patience"
    },
    {
      id: "barakallahu",
      arabic: "بَارَكَ اللَّهُ فِيكَ",
      phonetic: "Bārak Allāhu fīk",
      translation: "« Qu'Allah te bénisse ! »",
      virtue: "La formule d'Ibn 'Awn pour remplacer l'insulte par une bénédiction"
    },
    {
      id: "mutmainnah",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ نَفْسًا بِكَ مُطْمَئِنَّةً",
      phonetic: "Allāhumma innī as'aluka nafsan bika mutma'innah",
      translation: "« Ô Allah, je Te demande une âme sereine et confiante en Toi »",
      virtue: "L'invocation prophétique suprême pour apaiser l'agitation intérieure"
    }
  ];

  const [selectedDhikrId, setSelectedDhikrId] = useState('istighfar');
  const activeDhikr = DHIKR_PRESETS.find(d => d.id === selectedDhikrId) || DHIKR_PRESETS[0];

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
                if (soundEnabled) playHarmonicTone(523.25, 'sine', 0.6, 0.12); // Do
                return 'Retenez la paix';
              }
              if (curr === 'Retenez la paix') {
                triggerHaptic([40, 40]);
                if (soundEnabled) playHarmonicTone(392.00, 'sine', 0.6, 0.12); // Sol
                return 'Expirez toute amertume';
              }
              triggerHaptic([80]);
              if (soundEnabled) playHarmonicTone(329.63, 'sine', 0.6, 0.12); // Mi
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
      
      {/* L'ANECDOTE D'IBN 'AWN : LE DÉSARMEMENT SUPRÊME */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-4 transition-colors">
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
            className="inline-flex items-center space-x-1.5 bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-300/60 dark:border-amber-700/60 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mode Urgence</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-stone-800/40 dark:to-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm space-y-3">
          <p className="leading-relaxed">
            Le Pr. Abd ar-Razzaq al-Badr rapporte l'attitude remarquable de ce grand savant des Salaf :
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
            Transformer une impulsion destructrice en une bénédiction sincère étouffe net l'ardeur du diable et préserve votre immunité contre le Feu.
          </p>
        </div>
      </div>

      {/* EXERCICE DE COHÉRENCE RESPIRATOIRE */}
      <div className="bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-7 border border-emerald-900/50">
        <div className="space-y-1">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-emerald-400 tracking-widest bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
            Désescalade Émotionnelle Immédiate
          </span>
          <h3 className="text-xl sm:text-2xl font-bold pt-1">Respiration & Silence Prophétique</h3>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            En cas d'énervement ou d'affront, abstenez-vous de parler. Suivez le cercle ci-dessous pour ralentir votre pouls.
          </p>
        </div>

        {/* Cercle animé dynamique */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto flex items-center justify-center">
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
      </div>

      {/* LE TASBIH DU RIFQ AVEC 4 FORMULES PROPHÉTIQUES */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-emerald-900 dark:text-amber-300 tracking-wider bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                Évocations Sacrées • تَسْبِيحُ الرِّفْقِ
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {tasbihCount} répétition{tasbihCount > 1 ? 's' : ''}
              </span>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 mt-1">
              Le Chapelet Spirituel d'Apaisement
            </h3>
          </div>

          {/* Bouton réinitialiser */}
          {tasbihCount > 0 && (
            <button
              onClick={() => {
                triggerHaptic(20);
                setTasbihCount(0);
              }}
              className="px-3 py-1 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center space-x-1 border border-stone-200 dark:border-stone-700 rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Remettre à zéro</span>
            </button>
          )}
        </div>

        {/* Sélecteur de formules de Dhikr */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DHIKR_PRESETS.map((d) => {
            const isSelected = selectedDhikrId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => {
                  triggerHaptic(20);
                  setSelectedDhikrId(d.id);
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-700 shadow-sm'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <p className="font-serif text-xs sm:text-sm font-bold truncate dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                  {d.arabic}
                </p>
                <p className="text-[10px] opacity-80 truncate mt-0.5">{d.phonetic}</p>
              </button>
            );
          })}
        </div>

        {/* Zone de frappe et d'évocation */}
        <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-stone-800/40 dark:to-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 space-y-4 text-center">
          <div className="space-y-1">
            <p className="font-serif text-xl sm:text-2xl font-bold text-emerald-950 dark:text-amber-300 dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
              {activeDhikr.arabic}
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-300 italic">
              {activeDhikr.translation}
            </p>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold pt-0.5">
              💡 {activeDhikr.virtue}
            </p>
          </div>

          <div className="flex items-center justify-center pt-2">
            <button
              onClick={handleIncrementTasbih}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-3xl shadow-xl active:scale-90 transition-transform flex flex-col items-center justify-center border-4 border-amber-300/80"
            >
              <span>{tasbihCount}</span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold -mt-1">Touchez</span>
            </button>
          </div>

          <p className="text-[10px] text-stone-400">
            {tasbihCount % 33 === 0 && tasbihCount > 0 
              ? `✨ Qu'Allah accepte ! ${Math.floor(tasbihCount / 33)} cycle(s) de 33 complété(s).` 
              : `Objectif : 33 répétitions pour dissiper l'amertume (${33 - (tasbihCount % 33)} restantes)`}
          </p>
        </div>
      </div>

      {/* LES 3 RÈGLES PROPHÉTIQUES POUR DISSOUDRE LA COLÈRE */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-4 transition-colors">
        <div className="border-b border-stone-100 dark:border-stone-800 pb-2.5">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
            Le Protocole Prophétique Corporel Anti-Colère
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            3 actions physiques immédiates enseignées par le Messager d'Allah ﷺ (Hadiths d'Abu Dharr et Sulayman ibn Surad)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <ArrowDownCircle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100">1. Changer de posture</h4>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
              « Si l'un de vous se met en colère alors qu'il est debout, qu'il s'assoie. Si la colère ne part pas, qu'il s'allonge. » (Abu Dawud)
            </p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100">2. Réciter le Refuge</h4>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
              Prononcer : <em>« A'oudhou billahi mina ash-Shaytan ar-Rajim »</em> pour dissiper instantanément la braise que Satan a allumée dans votre poitrine.
            </p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Droplets className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-stone-900 dark:text-stone-100">3. Les Ablutions d'eau fraîche</h4>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
              « La colère vient de Satan, Satan a été créé de feu, et le feu ne s'éteint que par l'eau. Que celui d'entre vous qui se met en colère fasse ses ablutions. » (Ahmad)
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
