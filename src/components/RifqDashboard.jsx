import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Wind, 
  Check, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { DAILY_HADITHS_POOL, RIFQ_LADDER_STAGES, getDailyHadith } from '../data/dailyHadithsPool';
import { shareContent, triggerHaptic, playHarmonicTone } from '../utils/audio';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export default function RifqDashboard({ soundEnabled }) {
  const todayKey = new Date().toISOString().slice(0, 10);
  
  const defaultDaily = getDailyHadith();
  const [currentIndex, setCurrentIndex] = useState(defaultDaily.index);
  const currentHadith = DAILY_HADITHS_POOL[currentIndex];

  const [completedToday, setCompletedToday] = useState(() => {
    return loadFromStorage(`rifq_meditated_${todayKey}`, false);
  });
  const [streakCount, setStreakCount] = useState(() => {
    return loadFromStorage('rifq_streak_days', 3);
  });

  const [activeStage, setActiveStage] = useState(1);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const formattedDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const handleToggleCompleted = () => {
    triggerHaptic([40, 60, 40]);
    if (!completedToday) {
      if (soundEnabled) playHarmonicTone(587.33, 'sine', 0.5, 0.15);
      setCompletedToday(true);
      saveToStorage(`rifq_meditated_${todayKey}`, true);
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      saveToStorage('rifq_streak_days', newStreak);
    } else {
      setCompletedToday(false);
      saveToStorage(`rifq_meditated_${todayKey}`, false);
      const newStreak = Math.max(0, streakCount - 1);
      setStreakCount(newStreak);
      saveToStorage('rifq_streak_days', newStreak);
    }
  };

  const handleShare = async () => {
    triggerHaptic(30);
    const text = `HAYYIN • Sagesse du Jour :\n\n${currentHadith.arabic}\n\n« ${currentHadith.french} »\n\n— ${currentHadith.narrator} (${currentHadith.source})\n\n${window.location.href}`;
    const res = await shareContent({
      title: `Hadith du Jour : ${currentHadith.theme}`,
      text,
      url: window.location.href
    });
    if (res.success) {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  const handlePrevHadith = () => {
    triggerHaptic(20);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : DAILY_HADITHS_POOL.length - 1));
  };

  const handleNextHadith = () => {
    triggerHaptic(20);
    setCurrentIndex((prev) => (prev < DAILY_HADITHS_POOL.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* ========================================================= */}
      {/* 1. LA GRANDE CARTE FLOTTANTE (AU PIXEL PRÈS DE LA MAQUETTE) */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] sm:rounded-[40px] p-6 sm:p-9 border border-[#DFD8CB]/80 dark:border-[#242E29] shadow-[0_12px_40px_rgba(0,0,0,0.03)] text-center space-y-4 transition-all">
        
        {/* Ligne discrète : Source & Date */}
        <div className="flex items-center justify-between text-[11px] text-[#1E3A2B]/60 dark:text-[#EDE8DE]/60 px-1">
          <span className="capitalize font-medium">{formattedDate}</span>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrevHadith} className="hover:text-[#1E3A2B] dark:hover:text-white" title="Précédent">
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <span className="font-mono text-[10px]">{currentHadith.source}</span>
            <button onClick={handleNextHadith} className="hover:text-[#1E3A2B] dark:hover:text-white" title="Suivant">
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Calligraphie Arabe Majestueuse */}
        <div className="py-3 sm:py-5 px-2">
          <p className="font-serif text-2xl sm:text-3xl text-[#1E3A2B] dark:text-[#A7D1BA] leading-loose dir-rtl select-none" dir="rtl" style={{ fontFamily: 'Amiri, serif' }}>
            {currentHadith.arabic}
          </p>
        </div>

        {/* Traduction Française Épurée */}
        <p className="text-xs sm:text-sm text-[#1E3A2B]/85 dark:text-[#EDE8DE]/85 leading-relaxed font-light italic max-w-md mx-auto">
          '{currentHadith.french}'
        </p>

        {/* Tiroir d'explication spirituelle pliable pour garder l'écrin minimaliste */}
        {showExplanation && (
          <div className="pt-3 border-t border-[#DFD8CB]/80 dark:border-[#242E29] text-left text-xs space-y-2 animate-fadeIn">
            <p className="text-[#1E3A2B]/80 dark:text-[#EDE8DE]/80 leading-relaxed font-light">
              {currentHadith.explanation}
            </p>
            <div className="p-3 bg-[#F5F2EB] dark:bg-[#111614] rounded-2xl text-[11px] text-[#1E3A2B] dark:text-[#A7D1BA] font-medium">
              💡 <strong>Action concrète :</strong> {currentHadith.dailyAction}
            </div>
          </div>
        )}

        {/* Bouton pour afficher/masquer l'explication */}
        <div className="pt-1 flex items-center justify-between text-[11px]">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B] dark:hover:text-[#B89B72] transition-colors"
          >
            {showExplanation ? "Fermer l'explication ↑" : "Lire l'explication du Sheikh →"}
          </button>

          <button 
            onClick={handleShare}
            className="text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B] dark:hover:text-[#B89B72] transition-colors flex items-center space-x-1"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>{shareSuccess ? "Partagé !" : "Partager"}</span>
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. LA PILULE FLOTTANTE DU RYTHME (COMME DANS LA MAQUETTE)  */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-full p-2.5 px-4 sm:px-5 border border-[#DFD8CB]/80 dark:border-[#242E29] shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#F5F2EB] dark:bg-[#111614] border border-[#DFD8CB]/60 dark:border-[#242E29] flex items-center justify-center text-[#1E3A2B] dark:text-[#B89B72]">
            <Sun className="w-4 h-4" strokeWidth={1.4} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1E3A2B] dark:text-[#EDE8DE]">
              Le Rythme Quotidien • 3 Respirations
            </p>
            <p className="text-[10px] text-stone-400 font-light">
              Aube (Intention) • Jour (Bouclier) • Soir (Pardon)
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-[#B89B72] bg-[#F5F2EB] dark:bg-[#111614] px-2.5 py-1 rounded-full border border-[#DFD8CB]/60 dark:border-[#242E29]">
          {streakCount} j consécutifs
        </span>
      </div>

      {/* ========================================================= */}
      {/* 3. LE BOUTON D'ACTION OVALE (JOURNAL / ENGAGEMENT DU JOUR) */}
      {/* ========================================================= */}
      <button
        onClick={handleToggleCompleted}
        className={`w-full py-3.5 px-6 rounded-full border text-xs sm:text-sm font-medium tracking-wide transition-all shadow-sm active:scale-98 flex items-center justify-center space-x-2 ${
          completedToday
            ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-[#F5F2EB] dark:text-[#111614] border-transparent'
            : 'bg-[#EDE8DE] dark:bg-[#19201D] border-[#C5B8A5] dark:border-[#38463F] text-[#1E3A2B] dark:text-[#EDE8DE] hover:bg-[#E5DFD3] dark:hover:bg-[#202925]'
        }`}
      >
        {completedToday ? (
          <>
            <Check className="w-4 h-4" strokeWidth={1.6} />
            <span>Hadith médité & engagé aujourd'hui ✓</span>
          </>
        ) : (
          <span>J'incarne ce hadith aujourd'hui</span>
        )}
      </button>

      {/* ========================================================= */}
      {/* 4. L'ÉCHELLE DES 4 PALIERS DU RIFQ (ÉPURÉE)               */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[32px] p-5 sm:p-6 border border-[#DFD8CB]/80 dark:border-[#242E29] space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#DFD8CB]/60 dark:border-[#242E29] pb-2.5">
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-[#1E3A2B] dark:text-[#EDE8DE]">
              Le Degré du Rifq (مراتب الرفق)
            </h3>
            <p className="text-[10px] text-stone-400 font-light">
              L'ascension progressive vers l'immunité au Feu
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#B89B72]">
            Palier {activeStage} / 4
          </span>
        </div>

        {/* 4 Boutons Paliers */}
        <div className="grid grid-cols-4 gap-1.5">
          {RIFQ_LADDER_STAGES.map((stg) => {
            const isSelected = activeStage === stg.level;
            return (
              <button
                key={stg.level}
                onClick={() => {
                  triggerHaptic(20);
                  setActiveStage(stg.level);
                }}
                className={`py-2 px-1 rounded-2xl text-center transition-all ${
                  isSelected
                    ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-[#F5F2EB] dark:text-[#111614] font-bold shadow-sm'
                    : 'bg-[#F5F2EB] dark:bg-[#111614] text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 border border-[#DFD8CB]/60 dark:border-[#242E29]'
                }`}
              >
                <span className="text-[10px] block font-mono">P.{stg.level}</span>
                <span className="text-[9px] truncate block opacity-90">{stg.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Détail du palier sélectionné */}
        {(() => {
          const stg = RIFQ_LADDER_STAGES.find(s => s.level === activeStage) || RIFQ_LADDER_STAGES[0];
          return (
            <div className="p-3.5 bg-[#F5F2EB] dark:bg-[#111614] rounded-2xl border border-[#DFD8CB]/60 dark:border-[#242E29] text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1E3A2B] dark:text-[#EDE8DE]">
                  {stg.title}
                </span>
                <span className="font-serif text-sm text-[#B89B72] dir-rtl">
                  {stg.arabic}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                {stg.desc}
              </p>
              <div className="text-[10px] text-[#B89B72] font-medium pt-0.5">
                🎯 Objectif : {stg.target}
              </div>
            </div>
          );
        })()}
      </div>

    </div>
  );
}
