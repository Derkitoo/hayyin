import React, { useState } from 'react';
import { ChevronRight, CheckCircle, HelpCircle, RotateCcw, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { SCENARIOS } from '../data/scenariosData';
import { playHarmonicTone, triggerHaptic } from '../utils/audio';

export default function ScenariosTab({ soundEnabled }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const scenario = SCENARIOS[currentIndex];

  const handleSelectAnswer = (idx) => {
    if (showExplanation) return;
    triggerHaptic(20);
    setSelectedAnswer(idx);
  };

  const handleValidateAnswer = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    const isCorrect = scenario.options[selectedAnswer].isCorrect;

    if (isCorrect) {
      setScore(s => s + 1);
      triggerHaptic([40, 50, 40]);
      if (soundEnabled) playHarmonicTone(523.25, 'sine', 0.4, 0.15); // Do
    } else {
      triggerHaptic([80]);
      if (soundEnabled) playHarmonicTone(261.63, 'triangle', 0.4, 0.12); // Grave
    }
  };

  const handleNext = () => {
    triggerHaptic(20);
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentIndex + 1 < SCENARIOS.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    triggerHaptic(30);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  // Écran récapitulatif final
  if (isFinished) {
    const ratio = Math.round((score / SCENARIOS.length) * 100);
    let title = "Ambassadeur du Rifq & de la Mansuétude";
    let badgeDesc = "Votre discernement relationnel incarne admirablement les 4 piliers prophétiques. Vous êtes une bénédiction pour votre entourage.";
    
    if (ratio < 50) {
      title = "En Cheminement vers la Douceur";
      badgeDesc = "Vous avez parfois tendance à réagir impulsivement. Relisez le tafsir du Sheikh Al-Badr pour ancrer le réflexe de douceur face aux contrariétés.";
    } else if (ratio < 80) {
      title = "Cœur Posé & Conciliant";
      badgeDesc = "Une belle maturité relationnelle ! Encore quelques situations délicates où l'ego tente de prendre le dessus, mais la maîtrise est là.";
    }

    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm space-y-6 text-center transition-colors animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mx-auto flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300/60 dark:border-emerald-700/60">
            Bilan de Discernement Prophétique
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
            {title}
          </h2>
          <div className="text-4xl font-extrabold text-emerald-800 dark:text-amber-300 font-mono pt-2">
            {score} / {SCENARIOS.length}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Taux de discernement : {ratio}%
          </p>
        </div>

        <div className="p-5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300 max-w-lg mx-auto leading-relaxed">
          {badgeDesc}
        </div>

        <div className="pt-2">
          <button
            onClick={handleRestart}
            className="bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 inline-flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recommencer l'évaluation</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-5 transition-colors">
        
        {/* En-tête du cas */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Cas n° {currentIndex + 1} sur {SCENARIOS.length}
            </span>
            <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-md font-semibold border border-amber-300/40">
              Pilier : {scenario.pillarTested}
            </span>
          </div>

          <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">
            Score : {score} pt{score > 1 ? 's' : ''}
          </span>
        </div>

        {/* Titre & Contexte */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
            {scenario.title}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {scenario.context}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Quelle est la réaction conforme aux 4 vertus (Qarîb, Hayyin, Layyin, Sahl) ?
          </p>
        </div>

        {/* Choix possibles */}
        <div className="space-y-3 pt-2">
          {scenario.options.map((option, idx) => {
            let btnStyle = "bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100/80 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200/90 dark:border-stone-800";
            if (showExplanation) {
              if (option.isCorrect) {
                btnStyle = "bg-emerald-100/90 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-200 border-emerald-500 font-semibold shadow-sm";
              } else if (selectedAnswer === idx) {
                btnStyle = "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700 line-through opacity-80";
              } else {
                btnStyle = "bg-stone-50 dark:bg-stone-800/30 text-stone-400 dark:text-stone-600 border-stone-200 dark:border-stone-800 opacity-60";
              }
            } else if (selectedAnswer === idx) {
              btnStyle = "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-900 dark:border-emerald-700 shadow-md";
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start space-x-3.5 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Action : Valider ou Passer au suivant */}
        <div className="pt-2 flex justify-end">
          {!showExplanation ? (
            <button
              disabled={selectedAnswer === null}
              onClick={handleValidateAnswer}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                selectedAnswer !== null 
                  ? 'bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white cursor-pointer active:scale-95' 
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
              }`}
            >
              Valider ma réponse
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 active:scale-95"
            >
              <span>{currentIndex + 1 === SCENARIOS.length ? 'Voir mon bilan final' : 'Situation suivante'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Explication & Retour pédagogique */}
        {showExplanation && (
          <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 border animate-fadeIn ${
            scenario.options[selectedAnswer].isCorrect 
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700' 
              : 'bg-amber-50 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-700'
          }`}>
            <div className="flex items-center space-x-1.5 font-bold">
              {scenario.options[selectedAnswer].isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Comportement prophétique validé !</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Analyse de la réaction :</span>
                </>
              )}
            </div>
            <p className="text-stone-700 dark:text-stone-300">{scenario.options[selectedAnswer].feedback}</p>
          </div>
        )}

      </div>
    </div>
  );
}
