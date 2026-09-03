import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Feather, 
  HeartHandshake, 
  Volume2, 
  VolumeX, 
  Scroll, 
  Quote, 
  Flame,
  Check
} from 'lucide-react';
import { MORNING_RITUAL, EVENING_RITUAL, MITHAQ_AR_RIFQ } from '../data/spiritualData';
import { triggerHaptic, playHarmonicTone } from '../utils/audio';
import { startAmbience, stopAmbience, getIsAmbiencePlaying } from '../utils/soundAmbience';

export default function SanctuaryTab({
  morningDone,
  onCompleteMorning,
  eveningDone,
  onCompleteEvening,
  hasSignedPact,
  pactDate,
  onSignPact,
  onOpenBarakallahu,
  soundEnabled
}) {
  const [selectedDayTime, setSelectedDayTime] = useState('morning'); // 'morning' | 'day' | 'evening'
  const [isAmbienceActive, setIsAmbienceActive] = useState(getIsAmbiencePlaying());
  const [showPactModal, setShowPactModal] = useState(false);

  const toggleAmbience = () => {
    triggerHaptic(30);
    if (isAmbienceActive) {
      stopAmbience();
      setIsAmbienceActive(false);
    } else {
      startAmbience('breeze', 0.08);
      setIsAmbienceActive(true);
    }
  };

  const handleMorningValidation = () => {
    triggerHaptic([40, 60, 40]);
    if (soundEnabled) playHarmonicTone(523.25, 'sine', 0.5, 0.15);
    onCompleteMorning();
  };

  const handleEveningValidation = () => {
    triggerHaptic([40, 60, 40]);
    if (soundEnabled) playHarmonicTone(440, 'sine', 0.6, 0.15);
    onCompleteEvening();
  };

  return (
    <div className="space-y-6">

      {/* BANNIÈRE SUPRÊME : L'APPEL À L'IMMUNITÉ */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 dark:from-stone-950 dark:via-emerald-950 dark:to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 relative overflow-hidden transition-colors">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
          <Quote className="w-80 h-80 text-emerald-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-widest bg-emerald-800/80 dark:bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-500/40">
                La Quête Suprême • تحرم عليه النار
              </span>
              {hasSignedPact && (
                <span className="flex items-center space-x-1 text-[10px] text-amber-300 font-bold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/50">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Pacte Actif ({pactDate})</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Le Sanctuaire de l'Âme Préservée
            </h1>

            <p className="text-xs sm:text-sm text-emerald-200/90 dark:text-stone-300 leading-relaxed">
              « Il est interdit à quiconque est <strong className="text-amber-300">proche</strong>, <strong className="text-amber-300">posé</strong>, <strong className="text-amber-300">doux</strong> et <strong className="text-amber-300">facile</strong>. » 
              Ce sanctuaire n'est pas une théorie : c'est un chemin de purification pour désarmer votre ego et faire de la bienveillance votre armure contre le Feu.
            </p>
          </div>

          {/* Bouton Bulle de Recueillement Sonore */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={toggleAmbience}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95 border ${
                isAmbienceActive 
                  ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-amber-400/20' 
                  : 'bg-emerald-800/80 hover:bg-emerald-700/80 text-emerald-100 border-emerald-600/40'
              }`}
            >
              {isAmbienceActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span>{isAmbienceActive ? 'Bulle Apaisante Active' : 'Activer Bulle de Paix'}</span>
            </button>

            {!hasSignedPact && (
              <button
                onClick={() => setShowPactModal(true)}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md active:scale-95"
              >
                <Scroll className="w-4 h-4" />
                <span>Sceller le Pacte</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LE RYTHME QUOTIDIEN EN 3 TEMPS : SÉLECTEUR INTERACTIF */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <span>Vivre le Hadith : Votre Rythme en 3 Temps</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Chaque moment de la journée a son médicament spirituel prophétique
            </p>
          </div>

          <div className="flex space-x-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-2xl">
            <button
              onClick={() => {
                triggerHaptic(20);
                setSelectedDayTime('morning');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedDayTime === 'morning'
                  ? 'bg-white dark:bg-stone-700 text-amber-800 dark:text-amber-300 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>1. L'Aube</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic(20);
                setSelectedDayTime('day');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedDayTime === 'day'
                  ? 'bg-white dark:bg-stone-700 text-rose-800 dark:text-rose-300 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>2. Le Jour</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic(20);
                setSelectedDayTime('evening');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedDayTime === 'evening'
                  ? 'bg-white dark:bg-stone-700 text-teal-800 dark:text-teal-300 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-teal-400" />
              <span>3. Le Crépuscule</span>
            </button>
          </div>
        </div>

        {/* CONTENU DU TEMPS 1 : L'AUBE */}
        {selectedDayTime === 'morning' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  {MORNING_RITUAL.title}
                </span>
                <span className="text-[11px] text-amber-800 dark:text-amber-400">À réciter au réveil</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {MORNING_RITUAL.subtitle}
              </p>

              {/* Dua du Bouclier */}
              <div className="bg-white dark:bg-stone-900/90 p-4 rounded-xl border border-amber-200 dark:border-amber-800/80 space-y-2 text-center">
                <p className="font-serif text-lg sm:text-xl text-emerald-950 dark:text-amber-300 leading-relaxed dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                  {MORNING_RITUAL.duaShield.arabic}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 italic pt-1">
                  {MORNING_RITUAL.duaShield.translation}
                </p>
              </div>
            </div>

            {/* Les 4 Engagements de la journée */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Mon armure pour aujourd'hui :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MORNING_RITUAL.affirmations.map((aff, i) => (
                  <div key={i} className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{aff}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation du Rituel du Matin */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleMorningValidation}
                className={`px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-sm ${
                  morningDone
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-400 cursor-default'
                    : 'bg-emerald-800 hover:bg-emerald-900 text-white active:scale-95'
                }`}
              >
                {morningDone ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Intention scellée pour aujourd'hui</span>
                  </>
                ) : (
                  <>
                    <Feather className="w-4 h-4" />
                    <span>Poser mon intention du matin</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* CONTENU DU TEMPS 2 : LE JOUR (L'ÉPREUVE & LE BOUCLIER) */}
        {selectedDayTime === 'day' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-stone-800/40 dark:to-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Le Bouclier Anti-Feu dans la tourmente</span>
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">En cas d'énervement immédiat</span>
              </div>

              {/* La Question qui désarme l'ego */}
              <div className="p-4 sm:p-5 bg-white dark:bg-stone-900 rounded-xl border border-rose-200 dark:border-rose-900/60 text-center space-y-2 shadow-sm">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-widest block">
                  La question à te poser à la seconde où l'amertume monte :
                </span>
                <p className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100">
                  « Est-ce que cette contrariété ou cet orgueil blessé mérite que je perde mon immunité contre le Feu ? »
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 bg-white/80 dark:bg-stone-900/80 rounded-xl border border-stone-200 dark:border-stone-800">
                  <strong className="text-emerald-900 dark:text-emerald-300 block font-semibold mb-1">
                    La Sounnah d'Abdullah ibn 'Awn :
                  </strong>
                  Quand sa colère devenait extrême, il se contentait de dire : <em className="text-amber-800 dark:text-amber-300 font-bold">« Bārak Allāhu fīk »</em>, sans aucun mot de reproche.
                </div>

                <div className="p-3.5 bg-white/80 dark:bg-stone-900/80 rounded-xl border border-stone-200 dark:border-stone-800">
                  <strong className="text-emerald-900 dark:text-emerald-300 block font-semibold mb-1">
                    Le Rappel de la Sourate 3:159 :
                  </strong>
                  Même le Messager d'Allah ﷺ aurait vu son entourage s'enfuir s'il avait été rude et au cœur dur. Ta tendresse est une miséricorde divine.
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={onOpenBarakallahu}
                  className="bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center space-x-2"
                >
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>Activer le Mode Urgence & 10s de Silence</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONTENU DU TEMPS 3 : LE CRÉPUSCULE (LA MUHĀSABA & LE PARDON) */}
        {selectedDayTime === 'evening' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/50 p-5 sm:p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-950 dark:text-teal-300 uppercase tracking-wider">
                  {EVENING_RITUAL.title}
                </span>
                <span className="text-[11px] text-teal-800 dark:text-teal-400">Avant de s'endormir</span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic bg-white/70 dark:bg-stone-900/60 p-3.5 rounded-xl border border-teal-200/60 dark:border-teal-900/40">
                {EVENING_RITUAL.hadithCompanion}
              </p>

              {/* Les 3 Questions d'examen de conscience */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  L'Examen du Cœur avant de clore la journée :
                </h3>
                {EVENING_RITUAL.questions.map((q) => (
                  <div key={q.id} className="p-3.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-0.5 text-xs">
                    <p className="font-bold text-stone-900 dark:text-stone-100">{q.label}</p>
                    <p className="text-stone-500 dark:text-stone-400">{q.desc}</p>
                  </div>
                ))}
              </div>

              {/* L'Offrande du Pardon universel */}
              <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-teal-200 dark:border-teal-800 text-center space-y-2 shadow-inner">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300">
                  L'Invocation du Cœur Purifié :
                </span>
                <p className="font-serif text-lg sm:text-xl text-emerald-950 dark:text-teal-200 leading-relaxed dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                  {EVENING_RITUAL.forgivenessDua.arabic}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 italic pt-1">
                  {EVENING_RITUAL.forgivenessDua.translation}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleEveningValidation}
                  className={`px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-sm ${
                    eveningDone
                      ? 'bg-teal-100 dark:bg-teal-950 text-teal-950 dark:text-teal-300 border border-teal-400 cursor-default'
                      : 'bg-teal-800 hover:bg-teal-900 text-white active:scale-95'
                  }`}
                >
                  {eveningDone ? (
                    <>
                      <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <span>Paix et pardon scellés pour la nuit</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4" />
                      <span>Offrir mon pardon et purifier mon cœur</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* LE PACTE SACRÉ DE DOUCEUR : SCEAU & ENGAGEMENT */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold shrink-0">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                {MITHAQ_AR_RIFQ.title}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {MITHAQ_AR_RIFQ.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPactModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
          >
            {hasSignedPact ? 'Relire mon engagement' : 'Découvrir le pacte'}
          </button>
        </div>

        {hasSignedPact ? (
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-stone-800/40 dark:to-emerald-950/30 rounded-2xl border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Pacte Moral Scellé • Témoin : Votre Seigneur</span>
              </span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">
                Engagement enregistré le {pactDate}. Qu'Allah raffermisse votre cœur dans la bienveillance.
              </p>
            </div>
            <span className="text-xs font-serif font-bold text-amber-800 dark:text-amber-300 px-3 py-1 bg-amber-100 dark:bg-amber-950 rounded-xl border border-amber-300/60">
              مِيثَاقُ الرِّفْقِ
            </span>
          </div>
        ) : (
          <p className="text-xs text-stone-500 dark:text-stone-400 italic">
            Vous n'avez pas encore scellé votre pacte personnel de douceur. Prenez un moment de recueillement et cliquez sur « Découvrir le pacte ».
          </p>
        )}
      </div>

      {/* MODAL DU PACTE SOLENNEL */}
      {showPactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
                Engagement Spirituel
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-200" style={{ fontFamily: 'Amiri, serif' }}>
                مِيثَاقُ الرِّفْقِ وَالأَمَانِ مِنَ النَّارِ
              </h2>
              <p className="text-xs text-stone-400">
                Le Pacte Sacré de Douceur envers les serviteurs d'Allah
              </p>
            </div>

            <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans whitespace-pre-line space-y-2 max-h-[300px] overflow-y-auto">
              {MITHAQ_AR_RIFQ.text}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setShowPactModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs text-stone-400 hover:text-white"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  triggerHaptic([60, 60, 60]);
                  if (soundEnabled) playHarmonicTone(659.25, 'sine', 0.6, 0.2);
                  onSignPact();
                  setShowPactModal(false);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md active:scale-95 flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>{hasSignedPact ? 'Renouveler mon serment' : 'Je prends cet engagement solennel'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
