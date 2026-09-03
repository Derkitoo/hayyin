import React from 'react';
import { Award, CheckCircle2, Circle, Flame, Sparkles } from 'lucide-react';
import { getTodayChallenge } from '../data/challengesData';
import { triggerHaptic, playHarmonicTone } from '../utils/audio';

export default function DailyChallengeCard({
  isCompleted,
  onToggleComplete,
  streak,
  soundEnabled
}) {
  const challenge = getTodayChallenge();

  const handleToggle = () => {
    triggerHaptic([40, 60, 40]);
    if (!isCompleted && soundEnabled) {
      playHarmonicTone(659.25, 'sine', 0.4, 0.15); // Mi aigu de célébration
    }
    onToggleComplete();
  };

  return (
    <div className={`rounded-3xl border p-5 sm:p-6 transition-all shadow-sm ${
      isCompleted 
        ? 'bg-gradient-to-r from-emerald-900/90 to-teal-900/90 text-white border-emerald-500/50 shadow-emerald-900/20' 
        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
              isCompleted 
                ? 'bg-emerald-800 text-amber-300 border-emerald-600' 
                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
            }`}>
              Défi Douceur du Jour • {challenge.pillarName}
            </span>
            {streak > 0 && (
              <span className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/40">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{streak} j</span>
              </span>
            )}
          </div>

          <h3 className="font-bold text-base sm:text-lg">
            {challenge.title}
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed ${isCompleted ? 'text-emerald-100' : 'text-stone-600 dark:text-stone-300'}`}>
            {challenge.action}
          </p>

          <p className={`text-[11px] italic font-serif pt-1 ${isCompleted ? 'text-amber-200' : 'text-emerald-800 dark:text-emerald-400'}`}>
            {challenge.hadithBonus}
          </p>
        </div>

        {/* Bouton de validation */}
        <div className="shrink-0 flex items-center justify-end">
          <button
            onClick={handleToggle}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-sm active:scale-95 ${
              isCompleted 
                ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950' 
                : 'bg-emerald-800 hover:bg-emerald-900 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-stone-950" />
                <span>Défi accompli !</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Valider l'action</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
