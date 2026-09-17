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
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6 text-center transition-colors animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#2A3830] text-[#B89B72] dark:text-[#C4A97D] mx-auto flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-widest font-bold text-[#B89B72] dark:text-[#C4A97D] bg-[#F5F2EB] dark:bg-[#151B18] px-3.5 py-1 rounded-full border border-[#DFD8CB] dark:border-[#2A3830]">
            Bilan de Discernement Prophétique
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1E3A2B] dark:text-[#EAE6DF]">
            {title}
          </h2>
          <div className="text-4xl font-extrabold text-[#1E3A2B] dark:text-[#A7D1BA] font-mono pt-2">
            {score} / {SCENARIOS.length}
          </div>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93]">
            Taux de discernement : {ratio}%
          </p>
        </div>

        <div className="p-5 bg-[#F5F2EB] dark:bg-[#151B18] rounded-[24px] border border-[#DFD8CB]/80 dark:border-[#25302A] text-xs sm:text-sm text-[#55635C] dark:text-[#A7B5AD] max-w-lg mx-auto leading-relaxed">
          {badgeDesc}
        </div>

        <div className="pt-2">
          <button
            onClick={handleRestart}
            className="bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] font-bold px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 inline-flex items-center space-x-2 cursor-pointer"
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
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6 transition-colors">
        
        {/* En-tête du cas */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFD8CB]/80 dark:border-[#25302A] pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#B89B72] dark:text-[#C4A97D] bg-[#F5F2EB] dark:bg-[#151B18] px-3.5 py-1 rounded-full border border-[#DFD8CB] dark:border-[#2A3830]">
              Cas n° {currentIndex + 1} sur {SCENARIOS.length}
            </span>
            <span className="text-[10px] bg-[#EDE8DE] dark:bg-[#1E2723] text-[#1E3A2B] dark:text-[#A7D1BA] px-2.5 py-1 rounded-full font-semibold border border-[#DFD8CB] dark:border-[#2A3830]">
              Pilier : {scenario.pillarTested}
            </span>
          </div>

          <span className="text-xs text-[#827869] dark:text-[#8E9B93] font-mono">
            Score : {score} pt{score > 1 ? 's' : ''}
          </span>
        </div>

        {/* Titre & Contexte */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#B89B72] dark:text-[#C4A97D] uppercase tracking-wider">
            {scenario.title}
          </span>
          <h2 className="text-base sm:text-lg font-serif text-[#1E3A2B] dark:text-[#EAE6DF] leading-snug">
            {scenario.context}
          </h2>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93]">
            Quelle est la réaction conforme aux 4 vertus (Qarîb, Hayyin, Layyin, Sahl) ?
          </p>
        </div>

        {/* Choix possibles */}
        <div className="space-y-3 pt-1">
          {scenario.options.map((option, idx) => {
            let btnStyle = "bg-[#F5F2EB] dark:bg-[#151B18] hover:bg-[#E2DACB] dark:hover:bg-[#1E2723] text-[#1E3A2B] dark:text-[#EAE6DF] border-[#DFD8CB]/80 dark:border-[#25302A]";
            if (showExplanation) {
              if (option.isCorrect) {
                btnStyle = "bg-[#1E3A2B] dark:bg-[#1E3A2B] text-white border-[#1E3A2B] font-semibold shadow-sm";
              } else if (selectedAnswer === idx) {
                btnStyle = "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700 line-through opacity-80";
              } else {
                btnStyle = "bg-[#F5F2EB]/50 dark:bg-[#151B18]/40 text-[#827869] dark:text-[#55635C] border-[#DFD8CB]/50 dark:border-[#25302A] opacity-60";
              }
            } else if (selectedAnswer === idx) {
              btnStyle = "bg-[#1E3A2B] dark:bg-[#B89B72] text-[#F5F2EB] dark:text-[#111614] border-transparent shadow-md";
            }

            return (
              <button
                key={idx}
                disabled={showExplanation}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-[22px] border text-xs sm:text-sm transition-all flex items-start space-x-3.5 cursor-pointer ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 font-mono">
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
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                selectedAnswer !== null 
                  ? 'bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] cursor-pointer active:scale-95' 
                  : 'bg-[#DFD8CB]/60 dark:bg-[#151B18] text-[#A39989] dark:text-[#55635C] cursor-not-allowed border border-[#DFD8CB] dark:border-[#25302A]'
              }`}
            >
              Valider ma réponse
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <span>{currentIndex + 1 === SCENARIOS.length ? 'Voir mon bilan final' : 'Situation suivante'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Explication & Retour pédagogique */}
        {showExplanation && (
          <div className={`p-4 sm:p-5 rounded-[22px] text-xs sm:text-sm leading-relaxed space-y-2 border animate-fadeIn ${
            scenario.options[selectedAnswer].isCorrect 
              ? 'bg-[#F5F2EB] dark:bg-[#151B18] text-[#1E3A2B] dark:text-[#A7D1BA] border-[#1E3A2B]/40 dark:border-[#A7D1BA]/40' 
              : 'bg-[#F5F2EB] dark:bg-[#151B18] text-[#827869] dark:text-[#EAE6DF] border-[#DFD8CB] dark:border-[#25302A]'
          }`}>
            <div className="flex items-center space-x-2 font-bold">
              {scenario.options[selectedAnswer].isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-[#1E3A2B] dark:text-[#A7D1BA]" />
                  <span className="font-serif">Comportement prophétique validé !</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-[#B89B72] dark:text-[#C4A97D]" />
                  <span className="font-serif">Analyse de la réaction :</span>
                </>
              )}
            </div>
            <p className="text-[#55635C] dark:text-[#A7B5AD]">{scenario.options[selectedAnswer].feedback}</p>
          </div>
        )}

      </div>
    </div>
  );
}
