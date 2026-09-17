import React, { useState } from 'react';
import { 
  Quote, 
  Check, 
  Sparkles, 
  BookMarked, 
  ChevronRight, 
  BookOpen, 
  Share2, 
  Layers, 
  Scroll,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { HADITH_DATA, PILLARS, TAFSIR_SECTIONS, QUOTES } from '../data/tafsirData';
import { shareContent, triggerHaptic } from '../utils/audio';
import RifqAnthologySection from './RifqAnthologySection';

export default function TafsirTab() {
  const [studyMode, setStudyMode] = useState('pillars'); // 'pillars' | 'albadr' | 'rifq'
  const [selectedTafsirIndex, setSelectedTafsirIndex] = useState(0);
  const [shareSuccess, setShareSuccess] = useState(false);

  const currentTafsir = TAFSIR_SECTIONS[selectedTafsirIndex];

  const handleShareHadith = async () => {
    triggerHaptic(40);
    const text = `Le Messager d'Allah ﷺ a dit : « Ne vous informerai-je point de celui qui est interdit au Feu ? Il est interdit à quiconque est proche (قريب), posé (هين), doux (لين) et facile (سهل). » (Rapporté par At-Tirmidhî)\nDécouvrez l'application HAYYIN : ${window.location.href}`;
    const res = await shareContent({
      title: "Hadith des 4 Vertus - HAYYIN",
      text,
      url: window.location.href
    });
    if (res.success) {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-5">

      {/* ========================================================= */}
      {/* 1. LE HADITH FONDATEUR & L'IMMUNITÉ AU FEU                */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] sm:rounded-[40px] p-6 sm:p-9 border border-[#DFD8CB]/80 dark:border-[#242E29] shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-4 transition-all text-center">
        <div className="flex items-center justify-between text-[11px] text-[#1E3A2B]/60 dark:text-[#EDE8DE]/60 px-1">
          <span className="font-medium uppercase tracking-wider text-[#B89B72]">At-Tirmidhî (n° 2488)</span>
          <button
            onClick={handleShareHadith}
            className="flex items-center space-x-1 hover:text-[#1E3A2B] dark:hover:text-[#B89B72]"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.4} />
            <span>{shareSuccess ? 'Partagé !' : 'Partager'}</span>
          </button>
        </div>

        {/* Calligraphie et vocalisation arabe */}
        <div className="py-2 sm:py-4">
          <p className="text-xl sm:text-2xl font-serif text-[#1E3A2B] dark:text-[#A7D1BA] leading-loose dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
            « أَلَا أُخْبِرُكُمْ بِمَنْ يَحْرُمُ عَلَى النَّارِ، أَوْ بِمَنْ تَحْرُمُ عَلَيْهِ النَّارُ؟
            <br />
            تَحْرُمُ عَلَى كُلِّ <span className="text-[#B89B72] font-bold">قَرِيبٍ</span>، <span className="text-[#B89B72] font-bold">هَيِّنٍ</span>، <span className="text-[#B89B72] font-bold">لَيِّنٍ</span>، <span className="text-[#B89B72] font-bold">سَهْلٍ</span> »
          </p>
        </div>

        {/* Traduction & Explication */}
        <p className="text-xs sm:text-sm text-[#1E3A2B]/85 dark:text-[#EDE8DE]/85 leading-relaxed font-light italic max-w-md mx-auto">
          « {HADITH_DATA.quoteFr} »
        </p>

        <div className="p-3.5 bg-[#F5F2EB] dark:bg-[#111614] rounded-2xl border border-[#DFD8CB]/60 dark:border-[#242E29] text-xs text-left space-y-1">
          <span className="font-semibold text-[#1E3A2B] dark:text-[#EDE8DE] text-[11px] block">
            Le Mérite Suprême de ce Hadith :
          </span>
          <p className="text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            {HADITH_DATA.mainTakeaway}
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SÉLECTEUR DES 3 VOLETS D'ÉTUDE DU TAFSIR               */}
      {/* ========================================================= */}
      <div className="flex p-1 bg-[#EDE8DE] dark:bg-[#19201D] rounded-full border border-[#DFD8CB]/80 dark:border-[#242E29] gap-1">
        <button
          onClick={() => {
            triggerHaptic(20);
            setStudyMode('pillars');
          }}
          className={`flex-1 py-2 px-2 rounded-full text-xs font-medium transition-all ${
            studyMode === 'pillars'
              ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm'
              : 'text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B]'
          }`}
        >
          1. Les 4 Piliers
        </button>

        <button
          onClick={() => {
            triggerHaptic(20);
            setStudyMode('albadr');
          }}
          className={`flex-1 py-2 px-2 rounded-full text-xs font-medium transition-all ${
            studyMode === 'albadr'
              ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm'
              : 'text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B]'
          }`}
        >
          2. Cours d'Al-Badr
        </button>

        <button
          onClick={() => {
            triggerHaptic(20);
            setStudyMode('rifq');
          }}
          className={`flex-1 py-2 px-2 rounded-full text-xs font-medium transition-all ${
            studyMode === 'rifq'
              ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm'
              : 'text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B]'
          }`}
        >
          3. Trésor du Rifq
        </button>
      </div>

      {/* ========================================================= */}
      {/* VOLET 1 : SHARH DES 4 PILIERS                             */}
      {/* ========================================================= */}
      {studyMode === 'pillars' && (
        <div className="space-y-3.5 animate-fadeIn">
          {PILLARS.map((p) => (
            <div 
              key={p.id}
              className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[32px] border border-[#DFD8CB]/80 dark:border-[#242E29] p-5 sm:p-6 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#DFD8CB]/60 dark:border-[#242E29] pb-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B89B72]">
                    {p.badge}
                  </span>
                  <h3 className="font-semibold text-sm sm:text-base text-[#1E3A2B] dark:text-[#EDE8DE]">{p.nameFr}</h3>
                </div>
                <span className="text-2xl font-serif text-[#1E3A2B] dark:text-[#A7D1BA] dir-rtl">
                  {p.nameAr}
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                {p.linguistic}
              </p>

              <div className="p-3 bg-[#F5F2EB] dark:bg-[#111614] rounded-2xl border border-[#DFD8CB]/60 dark:border-[#242E29] text-[11px] space-y-1">
                <span className="font-semibold text-[#1E3A2B] dark:text-[#EDE8DE] block">
                  🌿 Attitude prophétique :
                </span>
                <p className="text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                  {p.manifestation}
                </p>
              </div>

              <div className="text-[10px] text-stone-400 font-light pt-0.5">
                💡 <strong>Application :</strong> {p.action}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* VOLET 2 : LE COURS DU PR. ABD AR-RAZZAQ AL-BADR           */}
      {/* ========================================================= */}
      {studyMode === 'albadr' && (
        <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB]/80 dark:border-[#242E29] p-5 sm:p-7 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#DFD8CB]/60 dark:border-[#242E29] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89B72]">
              {currentTafsir.tag}
            </span>
            <span className="text-xs text-stone-400 font-mono">Chapitre {selectedTafsirIndex + 1} / {TAFSIR_SECTIONS.length}</span>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-semibold text-[#1E3A2B] dark:text-[#EDE8DE] mb-2">
              {currentTafsir.title}
            </h3>
            <div className="p-3 bg-[#F5F2EB] dark:bg-[#111614] rounded-2xl text-center font-serif text-base text-[#1E3A2B] dark:text-[#A7D1BA] dir-rtl">
              {currentTafsir.quoteAr}
            </div>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 font-light leading-relaxed">
            {currentTafsir.explanation}
          </p>

          <div className="p-3 bg-[#F5F2EB] dark:bg-[#111614] rounded-2xl text-[11px] text-[#1E3A2B] dark:text-[#A7D1BA] font-medium">
            💡 <strong>À retenir :</strong> {currentTafsir.takeaway}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#DFD8CB]/60 dark:border-[#242E29]">
            <button
              disabled={selectedTafsirIndex === 0}
              onClick={() => {
                triggerHaptic(20);
                setSelectedTafsirIndex(i => i - 1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1 ${
                selectedTafsirIndex === 0 ? 'text-stone-300 opacity-40' : 'text-[#1E3A2B] dark:text-[#EDE8DE] hover:underline'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Précédent</span>
            </button>
            <button
              disabled={selectedTafsirIndex === TAFSIR_SECTIONS.length - 1}
              onClick={() => {
                triggerHaptic(20);
                setSelectedTafsirIndex(i => i + 1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1 ${
                selectedTafsirIndex === TAFSIR_SECTIONS.length - 1 ? 'text-stone-300 opacity-40' : 'text-[#1E3A2B] dark:text-[#EDE8DE] hover:underline'
              }`}
            >
              <span>Suivant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VOLET 3 : LE TRÉSOR DU RIFQ                               */}
      {/* ========================================================= */}
      {studyMode === 'rifq' && (
        <div className="animate-fadeIn">
          <RifqAnthologySection />
        </div>
      )}

    </div>
  );
}
