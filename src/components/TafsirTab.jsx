import React, { useState } from 'react';
import { 
  Quote, 
  Copy, 
  Check, 
  Sparkles, 
  BookMarked, 
  ChevronRight, 
  CheckCircle, 
  BookOpen, 
  Share2, 
  Layers, 
  ShieldCheck, 
  Feather, 
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
    <div className="space-y-6">

      {/* ========================================================= */}
      {/* 1. LE HADITH FONDATEUR & L'IMMUNITÉ AU FEU */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200/90 dark:border-stone-800 p-5 sm:p-8 relative overflow-hidden transition-colors">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-5 dark:opacity-10 pointer-events-none">
          <Quote className="w-64 h-64 text-emerald-900 dark:text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300/60 dark:border-emerald-700/60">
              {HADITH_DATA.source}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShareHadith}
                className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 px-3 py-1.5 rounded-xl transition-colors active:scale-95"
                title="Partager le hadith"
              >
                {shareSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{shareSuccess ? 'Partagé / Copié !' : 'Partager'}</span>
              </button>
              <span className="text-xs text-stone-400 font-medium">{HADITH_DATA.narrator}</span>
            </div>
          </div>

          {/* Calligraphie et vocalisation arabe */}
          <div className="bg-gradient-to-b from-stone-50 to-emerald-50/20 dark:from-stone-800/40 dark:to-emerald-950/20 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-7 text-center">
            <p className="text-xl sm:text-3xl font-serif text-emerald-950 dark:text-emerald-200 leading-loose tracking-wide dir-rtl" style={{ fontFamily: 'Amiri, Traditional Arabic, serif' }}>
              « أَلَا أُخْبِرُكُمْ بِمَنْ يَحْرُمُ عَلَى النَّارِ، أَوْ بِمَنْ تَحْرُمُ عَلَيْهِ النَّارُ؟
              <br />
              تَحْرُمُ عَلَى كُلِّ <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">قَرِيبٍ</span>، <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">هَيِّنٍ</span>، <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">لَيِّنٍ</span>، <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">سَهْلٍ</span> »
            </p>
          </div>

          {/* Traduction & Explication */}
          <div className="space-y-3 pt-1">
            <p className="text-stone-700 dark:text-stone-200 text-sm sm:text-base leading-relaxed font-normal">
              {HADITH_DATA.quoteFr}
            </p>

            <div className="p-3.5 sm:p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950 dark:text-emerald-300 block mb-0.5">Le Mérite Suprême de ce Hadith :</span>
                {HADITH_DATA.mainTakeaway}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SÉLECTEUR DES 3 VOLETS D'ÉTUDE DU TAFSIR */}
      {/* ========================================================= */}
      <div className="flex p-1 bg-stone-100 dark:bg-stone-800/80 rounded-2xl gap-1">
        <button
          onClick={() => {
            triggerHaptic(20);
            setStudyMode('pillars');
          }}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            studyMode === 'pillars'
              ? 'bg-white dark:bg-stone-900 text-emerald-900 dark:text-amber-300 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">1. Sharh des 4 Piliers</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic(20);
            setStudyMode('albadr');
          }}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            studyMode === 'albadr'
              ? 'bg-white dark:bg-stone-900 text-emerald-900 dark:text-amber-300 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">2. Cours d'Al-Badr</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic(20);
            setStudyMode('rifq');
          }}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            studyMode === 'rifq'
              ? 'bg-white dark:bg-stone-900 text-emerald-900 dark:text-amber-300 shadow-sm'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Scroll className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">3. Trésor du Rifq</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* VOLET 1 : SHARH DES 4 PILIERS (MOT À MOT APPROFONDI) */}
      {/* ========================================================= */}
      {studyMode === 'pillars' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              Décryptage Linguistique & Religieux des 4 Termes (شرح الألفاظ)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Comprendre la racine de chaque vertu pour l'ancrer dans son comportement quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div 
                key={p.id}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm space-y-4 transition-all hover:border-amber-400/40"
              >
                {/* En-tête du mot */}
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {p.badge}
                    </span>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mt-1">{p.nameFr}</h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">{p.subtitle}</p>
                  </div>
                  <span className="text-3xl font-serif font-bold text-emerald-900 dark:text-amber-300 px-3.5 py-1.5 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200/60 dark:border-stone-800 dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                    {p.nameAr}
                  </span>
                </div>

                {/* Sens linguistique & étymologique */}
                <div className="space-y-1 text-xs leading-relaxed">
                  <strong className="text-emerald-950 dark:text-emerald-300 font-semibold block text-[11px] uppercase tracking-wide">
                    📖 Sens linguistique & religieux :
                  </strong>
                  <p className="text-stone-600 dark:text-stone-300">
                    {p.linguistic}
                  </p>
                </div>

                {/* Manifestation prophétique */}
                <div className="space-y-1 text-xs leading-relaxed">
                  <strong className="text-amber-900 dark:text-amber-400 font-semibold block text-[11px] uppercase tracking-wide">
                    🌿 L'attitude prophétique concrète :
                  </strong>
                  <p className="text-stone-600 dark:text-stone-300">
                    {p.manifestation}
                  </p>
                </div>

                {/* Le piège / péché évité */}
                <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200/70 dark:border-rose-900/40 text-xs text-rose-950 dark:text-rose-200">
                  <strong className="block font-semibold mb-0.5 text-[11px] uppercase tracking-wide">
                    🛡️ Le piège de l'ego repoussé :
                  </strong>
                  <span>{p.sinAvoided}</span>
                </div>

                {/* Action quotidienne */}
                <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/80 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
                  <strong className="text-emerald-900 dark:text-emerald-300 block font-semibold mb-0.5 text-[11px] uppercase tracking-wide">
                    💡 Application aujourd'hui :
                  </strong>
                  <span>{p.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VOLET 2 : LE COURS DU PR. ABD AR-RAZZAQ AL-BADR (8 POINTS) */}
      {/* ========================================================= */}
      {studyMode === 'albadr' && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              Le Cours Magistral du Pr. Abd ar-Razzaq al-Badr (8 Enseignements)
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Tafsir intégral dispensé à la Mosquée du Prophète ﷺ à Médine
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Sommaire interactif des 8 points */}
            <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800 p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm flex items-center space-x-1.5">
                  <BookMarked className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Sommaire du Cours</span>
                </h3>
                <span className="text-[11px] text-stone-400 font-mono">8 chapitres</span>
              </div>

              <div className="space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
                {TAFSIR_SECTIONS.map((sec, idx) => {
                  const isSelected = selectedTafsirIndex === idx;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        triggerHaptic(25);
                        setSelectedTafsirIndex(idx);
                      }}
                      className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-start justify-between group ${
                        isSelected 
                          ? 'bg-emerald-800 text-white shadow-md' 
                          : 'bg-stone-50 dark:bg-stone-800/50 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/40 text-stone-700 dark:text-stone-200 border border-stone-200/60 dark:border-stone-800'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <span className={`font-bold text-[9px] uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'}`}>
                          {sec.tag}
                        </span>
                        <p className="font-semibold text-xs leading-snug">
                          {sec.title}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform mt-2 ${isSelected ? 'text-white translate-x-0.5' : 'text-stone-400 group-hover:text-emerald-700'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lecteur détaillé du point sélectionné */}
            <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800 p-5 sm:p-7 flex flex-col justify-between min-h-[440px] space-y-4">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {currentTafsir.tag}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Partie {selectedTafsirIndex + 1} / {TAFSIR_SECTIONS.length}</span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug mb-2">
                    {currentTafsir.title}
                  </h3>
                  <div className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-800 text-center font-serif text-base sm:text-lg text-emerald-900 dark:text-amber-300 dir-rtl">
                    {currentTafsir.quoteAr}
                  </div>
                </div>

                <div className="space-y-2.5 text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                  <p className="font-medium text-stone-900 dark:text-stone-100 bg-amber-50/60 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200/50 dark:border-amber-800/40">
                    💡 <strong>Idée Maîtresse : </strong> {currentTafsir.summary}
                  </p>
                  <p className="text-stone-600 dark:text-stone-300">
                    {currentTafsir.explanation}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <div className="bg-emerald-900 dark:bg-emerald-950 text-emerald-100 p-3.5 rounded-2xl text-xs flex items-start space-x-2.5 border border-emerald-800/50">
                  <CheckCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block font-semibold mb-0.5">La déduction théologique :</strong>
                    {currentTafsir.takeaway}
                  </div>
                </div>

                {/* Navigation précédente / suivante */}
                <div className="flex justify-between items-center pt-1">
                  <button
                    disabled={selectedTafsirIndex === 0}
                    onClick={() => {
                      triggerHaptic(20);
                      setSelectedTafsirIndex(i => i - 1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 ${selectedTafsirIndex === 0 ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed' : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Point précédent</span>
                  </button>
                  <button
                    disabled={selectedTafsirIndex === TAFSIR_SECTIONS.length - 1}
                    onClick={() => {
                      triggerHaptic(20);
                      setSelectedTafsirIndex(i => i + 1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 ${selectedTafsirIndex === TAFSIR_SECTIONS.length - 1 ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed' : 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'}`}
                  >
                    <span>Point suivant</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Citations de référence (Coran & Sagesse) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-3 border border-emerald-900">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>{QUOTES.quran.reference}</span>
                </div>
                <p className="font-serif text-base sm:text-lg text-emerald-100 leading-relaxed dir-rtl">
                  {QUOTES.quran.arabic}
                </p>
                <p className="text-xs text-stone-300 italic">
                  {QUOTES.quran.translation}
                </p>
              </div>
              <div className="text-[11px] text-emerald-300 font-semibold border-t border-emerald-800/80 pt-2">
                {QUOTES.quran.commentary}
              </div>
            </div>

            <div className="bg-amber-900/90 text-white rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-3 border border-amber-800">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  <Quote className="w-4 h-4" />
                  <span>{QUOTES.ibnBaz.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100 font-serif leading-relaxed italic">
                  {QUOTES.ibnBaz.translation}
                </p>
              </div>
              <div className="text-[11px] text-amber-200 font-semibold border-t border-amber-800/80 pt-2">
                {QUOTES.ibnBaz.commentary}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* VOLET 3 : LE TRÉSOR DU RIFQ (LES 10 HADITHS DE SOUTIEN) */}
      {/* ========================================================= */}
      {studyMode === 'rifq' && (
        <div className="animate-fadeIn">
          <RifqAnthologySection />
        </div>
      )}

    </div>
  );
}
