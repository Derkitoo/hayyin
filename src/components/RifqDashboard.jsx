import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Check, 
  Share2, 
  BookOpen, 
  Feather, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { DAILY_HADITHS_POOL, RIFQ_LADDER_STAGES, getDailyHadith } from '../data/dailyHadithsPool';
import { shareContent, triggerHaptic, playHarmonicTone } from '../utils/audio';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export default function RifqDashboard({ soundEnabled }) {
  const todayKey = new Date().toISOString().slice(0, 10);
  
  // Hadith du jour par défaut
  const defaultDaily = getDailyHadith();
  const [currentIndex, setCurrentIndex] = useState(defaultDaily.index);
  const currentHadith = DAILY_HADITHS_POOL[currentIndex];

  // État de validation quotidienne
  const [completedToday, setCompletedToday] = useState(() => {
    return loadFromStorage(`rifq_meditated_${todayKey}`, false);
  });
  const [streakCount, setStreakCount] = useState(() => {
    return loadFromStorage('rifq_streak_days', 3);
  });

  // Niveau sélectionné dans l'échelle du Rifq (1 à 4)
  const [activeStage, setActiveStage] = useState(1);
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
    const text = `Sagesse du Jour • HAYYIN :\n\n${currentHadith.arabic}\n\n« ${currentHadith.french} »\n\n— ${currentHadith.narrator} (${currentHadith.source})\n\nAction : ${currentHadith.dailyAction}\n\nL'art prophétique d'être préservé du Feu : ${window.location.href}`;
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
    <div className="space-y-6">

      {/* ========================================================= */}
      {/* 1. CARTE MAÎTRESSE : LE HADITH DU JOUR MIS EN ÉVIDENCE   */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-amber-400/30 relative overflow-hidden transition-all">
        
        {/* En-tête avec Date, Thème et Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/60 pb-3.5">
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-400/40">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-300 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
              {currentHadith.theme}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Jauge de fidélité / Streak */}
            <div className="flex items-center space-x-1 px-2.5 py-1 bg-stone-800/80 rounded-full border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{streakCount} j</span>
            </div>

            {/* Navigation dans les hadiths */}
            <div className="flex items-center space-x-1 bg-stone-800/60 rounded-xl p-0.5 border border-stone-700">
              <button
                onClick={handlePrevHadith}
                className="p-1 text-stone-300 hover:text-white rounded-lg hover:bg-stone-700"
                title="Hadith précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-stone-400 font-mono px-1">
                {currentIndex + 1}/{DAILY_HADITHS_POOL.length}
              </span>
              <button
                onClick={handleNextHadith}
                className="p-1 text-stone-300 hover:text-white rounded-lg hover:bg-stone-700"
                title="Hadith suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Corps du Hadith mis en évidence */}
        <div className="space-y-4 pt-4">
          
          {/* Calligraphie arabe */}
          <div className="bg-stone-950/70 p-4 sm:p-6 rounded-2xl border border-amber-400/20 text-center shadow-inner">
            <p className="font-serif text-lg sm:text-2xl text-amber-200 leading-loose dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
              {currentHadith.arabic}
            </p>
          </div>

          {/* Traduction française */}
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed italic">
            {currentHadith.french}
          </p>

          <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
            <span>{currentHadith.narrator}</span>
            <span className="font-mono text-[11px] bg-stone-800/80 px-2 py-0.5 rounded text-amber-300/90 border border-stone-700">
              {currentHadith.source}
            </span>
          </div>

          {/* Explication Spirituelle & Pédagogique */}
          <div className="bg-emerald-950/70 rounded-2xl p-4 border border-emerald-700/50 space-y-1.5 text-xs sm:text-sm">
            <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
              <BookOpen className="w-4 h-4" />
              <span>L'Explication Spirituelle :</span>
            </div>
            <p className="text-emerald-100/90 leading-relaxed">
              {currentHadith.explanation}
            </p>
          </div>

          {/* Action Concrète du Jour */}
          <div className="bg-amber-950/40 rounded-2xl p-4 border border-amber-500/40 space-y-1.5 text-xs sm:text-sm">
            <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
              <Feather className="w-4 h-4" />
              <span>Comment appliquer ce hadith aujourd'hui :</span>
            </div>
            <p className="text-amber-100/90 leading-relaxed font-medium">
              {currentHadith.dailyAction}
            </p>
          </div>

          {/* Boutons d'émargement et de partage */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              onClick={handleToggleCompleted}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md active:scale-95 border ${
                completedToday
                  ? 'bg-emerald-500 text-stone-950 border-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 border-amber-400/50'
              }`}
            >
              {completedToday ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hadith médité & engagé aujourd'hui</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>J'incarne ce hadith aujourd'hui</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 transition-all active:scale-95 flex items-center justify-center space-x-1.5"
            >
              {shareSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{shareSuccess ? 'Sagesse partagée !' : 'Partager la sagesse du jour'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. L'ÉCHELLE DES 4 PALIERS : COMMENT ATTEINDRE LE RIFQ    */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-5 transition-colors">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3.5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-300 tracking-wider bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                Cheminement Spirituel • مَرَاتِبُ الرِّفْقِ
              </span>
              <span className="text-xs text-stone-400 font-mono">4 Paliers</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
              Comment Atteindre le Degré du Rifq
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              L'ascension méthodique pour désarmer son ego et acquérir l'immunité contre le Feu
            </p>
          </div>
        </div>

        {/* Sélecteur des 4 Paliers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {RIFQ_LADDER_STAGES.map((stg) => {
            const isSelected = activeStage === stg.level;
            return (
              <button
                key={stg.level}
                onClick={() => {
                  triggerHaptic(20);
                  setActiveStage(stg.level);
                }}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-700 shadow-md scale-[1.02]'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-emerald-700 text-amber-300' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}>
                    Palier {stg.level}
                  </span>
                  <span className="text-xs font-serif font-bold dir-rtl opacity-80">
                    {stg.arabic}
                  </span>
                </div>
                <p className="font-bold text-xs truncate">{stg.badge}</p>
              </button>
            );
          })}
        </div>

        {/* Carte détaillée du Palier sélectionné */}
        {(() => {
          const stage = RIFQ_LADDER_STAGES.find((s) => s.level === activeStage) || RIFQ_LADDER_STAGES[0];
          return (
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-3.5 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 dark:border-stone-700/60 pb-2.5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-amber-300 font-medium">
                    {stage.subtitle}
                  </p>
                </div>
                <span className="text-lg sm:text-xl font-serif font-bold text-emerald-950 dark:text-amber-300 px-3 py-1 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 dir-rtl">
                  {stage.arabic}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {stage.desc}
              </p>

              <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-200 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-900 dark:text-emerald-300 font-semibold block mb-0.5">
                    L'Épreuve d'Ancrage à valider :
                  </strong>
                  <span>{stage.target}</span>
                </div>
              </div>
            </div>
          );
        })()}

      </div>

    </div>
  );
}
