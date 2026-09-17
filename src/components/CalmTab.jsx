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
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-5 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#2A3830] text-[#B89B72] dark:text-[#C4A97D] flex items-center justify-center font-bold">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-[#1E3A2B] dark:text-[#EAE6DF] text-lg sm:text-xl">
                La Formule Secrète d'Abdullah ibn 'Awn
              </h2>
              <p className="text-xs text-[#827869] dark:text-[#8E9B93]">Quand la contrariété atteint son intensité maximale</p>
            </div>
          </div>

          <button
            onClick={onOpenBarakallahu}
            className="inline-flex items-center space-x-1.5 bg-[#F5F2EB] dark:bg-[#151B18] hover:bg-[#E2DACB] dark:hover:bg-[#1E2723] text-[#1E3A2B] dark:text-[#EAE6DF] px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#DFD8CB] dark:border-[#2A3830] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
            <span>Mode Urgence</span>
          </button>
        </div>

        <div className="p-5 sm:p-6 bg-[#F5F2EB] dark:bg-[#151B18] rounded-[26px] border border-[#DFD8CB]/80 dark:border-[#25302A] text-xs sm:text-sm space-y-3.5">
          <p className="text-[#827869] dark:text-[#8E9B93] leading-relaxed">
            Le Pr. Abd ar-Razzaq al-Badr rapporte l'attitude remarquable de ce grand savant des Salaf :
          </p>
          <div className="bg-[#EDE8DE] dark:bg-[#19201D] p-5 rounded-2xl border border-[#DFD8CB]/70 dark:border-[#25302A] text-center shadow-sm">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3A2B] dark:text-[#A7D1BA] block dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
              « كَانَ إِذَا اشْتَدَّ غَضَبُهُ مِنْ شَخْصٍ، قَالَ : بَارَكَ اللَّهُ فِيكَ ! »
            </span>
            <p className="text-xs sm:text-sm text-[#3F4843] dark:text-[#C5D8CD] font-sans mt-2.5">
              « Lorsque sa colère contre un individu devenait extrême, il se contentait de lui dire : <strong className="text-[#1E3A2B] dark:text-[#B89B72]">"Qu'Allah te bénisse !" (Bārak Allāhu fīk)</strong>, sans ajouter un seul mot de reproche. »
            </p>
          </div>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93]">
            Transformer une impulsion destructrice en une bénédiction sincère étouffe net l'ardeur du diable et préserve votre immunité contre le Feu.
          </p>
        </div>
      </div>

      {/* EXERCICE DE COHÉRENCE RESPIRATOIRE */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] text-[#1E3A2B] dark:text-[#EAE6DF] rounded-[36px] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)] text-center space-y-7 border border-[#DFD8CB] dark:border-[#25302A] transition-colors">
        <div className="space-y-1.5">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#B89B72] dark:text-[#C4A97D] tracking-widest bg-[#F5F2EB] dark:bg-[#151B18] px-3.5 py-1 rounded-full border border-[#DFD8CB] dark:border-[#2A3830] inline-block">
            Désescalade Émotionnelle Immédiate
          </span>
          <h3 className="text-xl sm:text-2xl font-serif pt-1">Respiration & Silence Prophétique</h3>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93] max-w-md mx-auto">
            En cas d'énervement ou d'affront, abstenez-vous de parler. Suivez le cercle ci-dessous pour ralentir votre pouls.
          </p>
        </div>

        {/* Cercle animé dynamique */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto flex items-center justify-center">
          <div 
            className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
              isBreathingActive 
                ? breathingPhase === 'Inspirez doucement' 
                  ? 'scale-110 border-[#1E3A2B] dark:border-[#A7D1BA] shadow-2xl shadow-[#1E3A2B]/10 bg-[#DFD8CB]/40 dark:bg-[#1E2723]' 
                  : breathingPhase === 'Retenez la paix' 
                  ? 'scale-110 border-[#B89B72] dark:border-[#C4A97D] bg-[#DFD8CB]/40 dark:bg-[#1E2723] shadow-2xl shadow-[#B89B72]/10' 
                  : 'scale-90 border-[#DFD8CB] dark:border-[#2A3830] bg-[#F5F2EB]/50 dark:bg-[#151B18]' 
                : 'scale-100 border-[#DFD8CB] dark:border-[#25302A] bg-[#F5F2EB] dark:bg-[#151B18]'
            }`}
          />
          
          <div className="relative z-10 flex flex-col items-center justify-center p-4">
            <Wind className={`w-8 h-8 mb-2 transition-transform ${isBreathingActive ? 'text-[#1E3A2B] dark:text-[#A7D1BA] animate-pulse' : 'text-[#827869]'}`} />
            <span className="text-sm sm:text-base font-serif font-bold text-[#1E3A2B] dark:text-[#EAE6DF]">{breathingPhase}</span>
            
            {isBreathingActive ? (
              <span className="text-4xl font-extrabold text-[#1E3A2B] dark:text-[#A7D1BA] mt-1 font-mono">{breathCount}</span>
            ) : (
              <span className="text-xs text-[#827869] dark:text-[#8E9B93] mt-1">Prêt pour 1 minute de calme</span>
            )}
            
            {isBreathingActive && (
              <span className="text-xs text-[#B89B72] dark:text-[#C4A97D] mt-2 font-serif italic">
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
              className="w-full sm:w-auto bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Démarrer la séance de calme</span>
            </button>
          ) : (
            <button
              onClick={stopBreathing}
              className="w-full sm:w-auto bg-[#F5F2EB] dark:bg-[#151B18] hover:bg-[#E2DACB] dark:hover:bg-[#1E2723] text-[#1E3A2B] dark:text-[#EAE6DF] border border-[#DFD8CB] dark:border-[#2A3830] font-semibold px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Pause className="w-4 h-4" />
              <span>Mettre fin au cycle</span>
            </button>
          )}
        </div>
      </div>

      {/* LE TASBIH DU RIFQ AVEC 4 FORMULES PROPHÉTIQUES */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DFD8CB]/80 dark:border-[#25302A] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-[#B89B72] dark:text-[#C4A97D] tracking-widest bg-[#F5F2EB] dark:bg-[#151B18] px-3 py-1 rounded-full border border-[#DFD8CB] dark:border-[#2A3830]">
                Évocations Sacrées • تَسْبِيحُ الرِّفْقِ
              </span>
              <span className="text-xs text-[#827869] dark:text-[#8E9B93] font-mono">
                {tasbihCount} répétition{tasbihCount > 1 ? 's' : ''}
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-[#1E3A2B] dark:text-[#EAE6DF] mt-1">
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
              className="px-3.5 py-1.5 text-xs text-[#827869] dark:text-[#8E9B93] hover:text-[#1E3A2B] dark:hover:text-white flex items-center space-x-1.5 border border-[#DFD8CB] dark:border-[#25302A] rounded-full bg-[#F5F2EB] dark:bg-[#151B18]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Remettre à zéro</span>
            </button>
          )}
        </div>

        {/* Sélecteur de formules de Dhikr */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DHIKR_PRESETS.map((d) => {
            const isSelected = selectedDhikrId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => {
                  triggerHaptic(20);
                  setSelectedDhikrId(d.id);
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-[#F5F2EB] dark:text-[#111614] border-transparent shadow-sm'
                    : 'bg-[#F5F2EB] dark:bg-[#151B18] border-[#DFD8CB]/80 dark:border-[#25302A] text-[#1E3A2B] dark:text-[#EAE6DF]'
                }`}
              >
                <p className="font-serif text-xs sm:text-sm font-bold truncate dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                  {d.arabic}
                </p>
                <p className="text-[10px] opacity-75 truncate mt-1">{d.phonetic}</p>
              </button>
            );
          })}
        </div>

        {/* Zone de frappe et d'évocation */}
        <div className="p-6 bg-[#F5F2EB] dark:bg-[#151B18] rounded-[28px] border border-[#DFD8CB]/80 dark:border-[#25302A] space-y-4 text-center">
          <div className="space-y-1.5">
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#1E3A2B] dark:text-[#A7D1BA] dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
              {activeDhikr.arabic}
            </p>
            <p className="text-xs text-[#55635C] dark:text-[#A7B5AD] italic">
              {activeDhikr.translation}
            </p>
            <p className="text-[11px] text-[#B89B72] dark:text-[#C4A97D] font-medium pt-0.5">
              💡 {activeDhikr.virtue}
            </p>
          </div>

          <div className="flex items-center justify-center pt-2">
            <button
              onClick={handleIncrementTasbih}
              className="w-28 h-28 rounded-full bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] font-black text-3xl shadow-xl active:scale-90 transition-transform flex flex-col items-center justify-center border-4 border-[#EDE8DE] dark:border-[#19201D] cursor-pointer"
            >
              <span>{tasbihCount}</span>
              <span className="text-[9px] uppercase tracking-widest font-bold -mt-1 opacity-80">Touchez</span>
            </button>
          </div>

          <p className="text-[10px] text-[#827869] dark:text-[#8E9B93]">
            {tasbihCount % 33 === 0 && tasbihCount > 0 
              ? `✨ Qu'Allah accepte ! ${Math.floor(tasbihCount / 33)} cycle(s) de 33 complété(s).` 
              : `Objectif : 33 répétitions pour dissiper l'amertume (${33 - (tasbihCount % 33)} restantes)`}
          </p>
        </div>
      </div>

      {/* LES 3 RÈGLES PROPHÉTIQUES POUR DISSOUDRE LA COLÈRE */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-5 transition-colors">
        <div className="border-b border-[#DFD8CB]/80 dark:border-[#25302A] pb-3">
          <h3 className="font-serif text-[#1E3A2B] dark:text-[#EAE6DF] text-base sm:text-lg">
            Le Protocole Prophétique Corporel Anti-Colère
          </h3>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93] mt-0.5">
            3 actions physiques immédiates enseignées par le Messager d'Allah ﷺ (Hadiths d'Abu Dharr et Sulayman ibn Surad)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#F5F2EB] dark:bg-[#151B18] p-5 rounded-[24px] border border-[#DFD8CB]/80 dark:border-[#25302A] space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#EDE8DE] dark:bg-[#1E2723] text-[#B89B72] dark:text-[#C4A97D] flex items-center justify-center font-bold">
              <ArrowDownCircle className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-[#1E3A2B] dark:text-[#EAE6DF]">1. Changer de posture</h4>
            <p className="text-[#55635C] dark:text-[#A7B5AD] leading-relaxed text-[11px]">
              « Si l'un de vous se met en colère alors qu'il est debout, qu'il s'assoie. Si la colère ne part pas, qu'il s'allonge. » (Abu Dawud)
            </p>
          </div>

          <div className="bg-[#F5F2EB] dark:bg-[#151B18] p-5 rounded-[24px] border border-[#DFD8CB]/80 dark:border-[#25302A] space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#EDE8DE] dark:bg-[#1E2723] text-[#B89B72] dark:text-[#C4A97D] flex items-center justify-center font-bold">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-[#1E3A2B] dark:text-[#EAE6DF]">2. Réciter le Refuge</h4>
            <p className="text-[#55635C] dark:text-[#A7B5AD] leading-relaxed text-[11px]">
              Prononcer : <em>« A'oudhou billahi mina ash-Shaytan ar-Rajim »</em> pour dissiper instantanément la braise que Satan a allumée dans votre poitrine.
            </p>
          </div>

          <div className="bg-[#F5F2EB] dark:bg-[#151B18] p-5 rounded-[24px] border border-[#DFD8CB]/80 dark:border-[#25302A] space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#EDE8DE] dark:bg-[#1E2723] text-[#B89B72] dark:text-[#C4A97D] flex items-center justify-center font-bold">
              <Droplets className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-[#1E3A2B] dark:text-[#EAE6DF]">3. Les Ablutions d'eau fraîche</h4>
            <p className="text-[#55635C] dark:text-[#A7B5AD] leading-relaxed text-[11px]">
              « La colère vient de Satan, Satan a été créé de feu, et le feu ne s'éteint que par l'eau. Que celui d'entre vous qui se met en colère fasse ses ablutions. » (Ahmad)
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
