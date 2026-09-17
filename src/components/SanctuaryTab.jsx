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
  Flame, 
  Check, 
  Bell 
} from 'lucide-react';
import { MORNING_RITUAL, EVENING_RITUAL, MITHAQ_AR_RIFQ } from '../data/spiritualData';
import { triggerHaptic, playHarmonicTone } from '../utils/audio';
import { startAmbience, stopAmbience, getIsAmbiencePlaying } from '../utils/soundAmbience';
import RifqDashboard from './RifqDashboard';
import BehaviorTransformationSection from './BehaviorTransformationSection';

export default function SanctuaryTab({
  morningDone,
  onCompleteMorning,
  eveningDone,
  onCompleteEvening,
  hasSignedPact,
  pactDate,
  onSignPact,
  onOpenBarakallahu,
  onOpenNotifications,
  notifEnabled,
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
    <div className="space-y-5">

      {/* ========================================================= */}
      {/* 1. LE DASHBOARD CENTRAL (CARTE MAÎTRESSE & PILULE MOCKUP) */}
      {/* ========================================================= */}
      <RifqDashboard soundEnabled={soundEnabled} />

      {/* ========================================================= */}
      {/* 2. LE RYTHME QUOTIDIEN EN 3 TEMPS                         */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB]/80 dark:border-[#242E29] p-5 sm:p-7 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DFD8CB]/60 dark:border-[#242E29] pb-3">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-[#1E3A2B] dark:text-[#EDE8DE]">
              Les 3 Temps de la Journée
            </h2>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light">
              Le médicament spirituel prophétique à chaque étape
            </p>
          </div>

          <div className="flex space-x-1 p-1 bg-[#F5F2EB] dark:bg-[#111614] rounded-full border border-[#DFD8CB]/60 dark:border-[#242E29]">
            <button
              onClick={() => {
                triggerHaptic(20);
                setSelectedDayTime('morning');
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedDayTime === 'morning'
                  ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              1. L'Aube
            </button>

            <button
              onClick={() => {
                triggerHaptic(20);
                setSelectedDayTime('day');
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedDayTime === 'day'
                  ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              2. Le Jour
            </button>

            <button
              onClick={() => {
                triggerHaptic(20);
                setSelectedDayTime('evening');
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedDayTime === 'evening'
                  ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              3. Crépuscule
            </button>
          </div>
        </div>

        {/* CONTENU DU TEMPS 1 : L'AUBE */}
        {selectedDayTime === 'morning' && (
          <div className="space-y-3.5 animate-fadeIn">
            <div className="bg-[#F5F2EB] dark:bg-[#111614] p-4 rounded-2xl border border-[#DFD8CB]/60 dark:border-[#242E29] space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                Invocation du matin
              </span>
              <p className="font-serif text-lg text-[#1E3A2B] dark:text-[#A7D1BA] leading-loose dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                {MORNING_RITUAL.duaShield.arabic}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 italic font-light">
                {MORNING_RITUAL.duaShield.translation}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleMorningValidation}
                className={`px-5 py-2 rounded-full font-medium text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
                  morningDone
                    ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614]'
                    : 'bg-[#EDE8DE] dark:bg-[#19201D] border border-[#C5B8A5] text-[#1E3A2B] dark:text-[#EDE8DE] hover:bg-[#E5DFD3]'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{morningDone ? 'Intention posée pour aujourd\'hui ✓' : 'Poser mon intention du matin'}</span>
              </button>
            </div>
          </div>
        )}

        {/* CONTENU DU TEMPS 2 : LE JOUR */}
        {selectedDayTime === 'day' && (
          <div className="space-y-3.5 animate-fadeIn">
            <div className="bg-[#F5F2EB] dark:bg-[#111614] p-4 rounded-2xl border border-[#DFD8CB]/60 dark:border-[#242E29] space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                La question qui désarme l'ego
              </span>
              <p className="text-sm sm:text-base font-semibold text-[#1E3A2B] dark:text-[#EDE8DE]">
                « Est-ce que cette contrariété mérite que je compromette mon immunité contre le Feu ? »
              </p>
              <p className="text-xs text-stone-500 font-light">
                Réflexe d'Abdullah ibn 'Awn : se taire 10 secondes et prononcer <em>« Bārak Allāhu fīk »</em>.
              </p>
            </div>

            <div className="flex justify-center pt-1">
              <button
                onClick={onOpenBarakallahu}
                className="px-5 py-2 rounded-full font-medium text-xs bg-[#EDE8DE] dark:bg-[#19201D] border border-[#C5B8A5] text-[#1E3A2B] dark:text-[#EDE8DE] hover:bg-[#E5DFD3] transition-all shadow-sm flex items-center space-x-1.5"
              >
                <Wind className="w-3.5 h-3.5" strokeWidth={1.4} />
                <span>Activer les 10s de Silence</span>
              </button>
            </div>
          </div>
        )}

        {/* CONTENU DU TEMPS 3 : LE CRÉPUSCULE */}
        {selectedDayTime === 'evening' && (
          <div className="space-y-3.5 animate-fadeIn">
            <div className="bg-[#F5F2EB] dark:bg-[#111614] p-4 rounded-2xl border border-[#DFD8CB]/60 dark:border-[#242E29] space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
                L'Offrande du Pardon Universel
              </span>
              <p className="font-serif text-lg text-[#1E3A2B] dark:text-[#A7D1BA] leading-loose dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                {EVENING_RITUAL.forgivenessDua.arabic}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 italic font-light">
                {EVENING_RITUAL.forgivenessDua.translation}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleEveningValidation}
                className={`px-5 py-2 rounded-full font-medium text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
                  eveningDone
                    ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614]'
                    : 'bg-[#EDE8DE] dark:bg-[#19201D] border border-[#C5B8A5] text-[#1E3A2B] dark:text-[#EDE8DE] hover:bg-[#E5DFD3]'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{eveningDone ? 'Pardon scellé pour la nuit ✓' : 'Offrir mon pardon avant de dormir'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 3. MOTEUR DE CHANGEMENT COMPORTEMENTAL (SIL'AT ALLAH)      */}
      {/* ========================================================= */}
      <BehaviorTransformationSection soundEnabled={soundEnabled} />

      {/* ========================================================= */}
      {/* 4. LE PACTE SACRÉ DE DOUCEUR                             */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB]/80 dark:border-[#242E29] p-5 sm:p-6 shadow-sm flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h3 className="font-semibold text-xs sm:text-sm text-[#1E3A2B] dark:text-[#EDE8DE]">
            {MITHAQ_AR_RIFQ.title}
          </h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light">
            {hasSignedPact ? `Pacte scellé le ${pactDate}` : "Engagement moral à faire de la douceur son armure"}
          </p>
        </div>

        <button
          onClick={() => setShowPactModal(true)}
          className="px-4 py-2 rounded-full text-xs font-medium bg-[#F5F2EB] dark:bg-[#111614] border border-[#DFD8CB]/80 dark:border-[#242E29] text-[#1E3A2B] dark:text-[#EDE8DE] hover:bg-[#E5DFD3] transition-colors shrink-0"
        >
          {hasSignedPact ? 'Relire' : 'Sceller'}
        </button>
      </div>

      {/* MODAL DU PACTE SOLENNEL */}
      {showPactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#F5F2EB] dark:bg-[#141A17] border border-[#DFD8CB] dark:border-[#242E29] rounded-[36px] max-w-lg w-full p-6 sm:p-8 text-[#1E3329] dark:text-[#EDE8DE] relative shadow-2xl space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#B89B72]">
                Engagement Moral
              </span>
              <h2 className="text-xl font-bold font-serif text-[#1E3A2B] dark:text-[#A7D1BA]">
                مِيثَاقُ الرِّفْقِ وَالأَمَانِ مِنَ النَّارِ
              </h2>
            </div>

            <div className="p-4 bg-white dark:bg-[#19201D] rounded-2xl border border-[#DFD8CB]/80 dark:border-[#242E29] text-xs leading-relaxed whitespace-pre-line max-h-[260px] overflow-y-auto font-light">
              {MITHAQ_AR_RIFQ.text}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={() => setShowPactModal(false)}
                className="px-4 py-2 rounded-full text-xs text-stone-500 hover:text-stone-800 dark:hover:text-white"
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  triggerHaptic([50, 50]);
                  if (soundEnabled) playHarmonicTone(659.25, 'sine', 0.6, 0.2);
                  onSignPact();
                  setShowPactModal(false);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-medium bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm active:scale-95 transition-all"
              >
                {hasSignedPact ? 'Renouveler mon serment' : 'Je prends cet engagement'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
