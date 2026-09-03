import React, { useState } from 'react';
import { Quote, Copy, Check, Sparkles, BookMarked, ChevronRight, CheckCircle, BookOpen, Share2 } from 'lucide-react';
import { HADITH_DATA, PILLARS, TAFSIR_SECTIONS, QUOTES } from '../data/tafsirData';
import { shareContent, triggerHaptic } from '../utils/audio';
import DailyChallengeCard from './DailyChallengeCard';

export default function TafsirTab({
  dailyCompleted,
  onToggleDaily,
  streak,
  soundEnabled
}) {
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
      
      {/* Défi Douceur du Jour */}
      <DailyChallengeCard 
        isCompleted={dailyCompleted}
        onToggleComplete={onToggleDaily}
        streak={streak}
        soundEnabled={soundEnabled}
      />

      {/* Bannière du Hadith */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 relative overflow-hidden transition-colors">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-5 dark:opacity-10 pointer-events-none">
          <Quote className="w-64 h-64 text-emerald-900 dark:text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
            <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300/60 dark:border-emerald-700/60">
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
          <div className="bg-gradient-to-b from-stone-50 to-emerald-50/20 dark:from-stone-800/40 dark:to-emerald-950/20 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-7 text-center">
            <p className="text-2xl sm:text-3xl font-serif text-emerald-950 dark:text-emerald-200 leading-loose tracking-wide dir-rtl" style={{ fontFamily: 'Amiri, Traditional Arabic, serif' }}>
              « أَلَا أُخْبِرُكُمْ بِمَنْ يَحْرُمُ عَلَى النَّارِ، أَوْ بِمَنْ تَحْرُمُ عَلَيْهِ النَّارُ؟
              <br />
              تَحْرُمُ عَلَى كُلِّ <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">قَرِيبٍ</span>، <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">هَيِّنٍ</span>، <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">لَيِّنٍ</span>، <span className="text-amber-800 dark:text-amber-400 font-bold underline decoration-amber-300 underline-offset-8">سَهْلٍ</span> »
            </p>
          </div>

          {/* Traduction & Explication */}
          <div className="space-y-3 pt-1">
            <p className="text-stone-700 dark:text-stone-200 text-base sm:text-lg leading-relaxed font-normal">
              {HADITH_DATA.quoteFr}
            </p>

            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950 dark:text-emerald-300 block mb-0.5">L'Enseignement Central (Pr. Abd ar-Razzaq al-Badr) :</span>
                {HADITH_DATA.mainTakeaway}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LE TAFSIR DÉTAILLÉ DU SHEIKH : INTERFACE DE MÉDITATION INTERACTIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sommaire interactif des 8 enseignements */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800 p-5 space-y-3 transition-colors">
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2.5">
            <h2 className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center space-x-2">
              <BookMarked className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Les 8 Points du Tafsir d'Al-Badr</span>
            </h2>
            <span className="text-[11px] text-stone-400 font-mono">8 sections</span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
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
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-[10px] uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'}`}>
                        {sec.tag}
                      </span>
                    </div>
                    <p className="font-semibold text-xs leading-snug">
                      {sec.title}
                    </p>
                    <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-emerald-200' : 'text-stone-500 dark:text-stone-400'}`}>
                      {sec.summary}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform mt-2 ${isSelected ? 'text-white translate-x-0.5' : 'text-stone-400 group-hover:text-emerald-700'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu détaillé du point sélectionné */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl shadow-sm border border-stone-200 dark:border-stone-800 p-6 sm:p-7 flex flex-col justify-between min-h-[460px] space-y-5 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                {currentTafsir.tag}
              </span>
              <span className="text-xs text-stone-400 font-mono">Partie {selectedTafsirIndex + 1} / {TAFSIR_SECTIONS.length}</span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug mb-2">
                {currentTafsir.title}
              </h3>
              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-800 text-center font-serif text-lg text-emerald-900 dark:text-emerald-300 dir-rtl">
                {currentTafsir.quoteAr}
              </div>
            </div>

            <div className="space-y-3 text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
              <p className="font-medium text-stone-900 dark:text-stone-100 bg-amber-50/60 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200/50 dark:border-amber-800/40">
                💡 {currentTafsir.summary}
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
                <strong className="text-amber-300 block font-semibold mb-0.5">La leçon à retenir :</strong>
                {currentTafsir.takeaway}
              </div>
            </div>

            {/* Navigation séquentielle */}
            <div className="flex justify-between items-center pt-1">
              <button
                disabled={selectedTafsirIndex === 0}
                onClick={() => {
                  triggerHaptic(20);
                  setSelectedTafsirIndex(i => i - 1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${selectedTafsirIndex === 0 ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed' : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
              >
                ← Point précédent
              </button>
              <button
                disabled={selectedTafsirIndex === TAFSIR_SECTIONS.length - 1}
                onClick={() => {
                  triggerHaptic(20);
                  setSelectedTafsirIndex(i => i + 1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${selectedTafsirIndex === TAFSIR_SECTIONS.length - 1 ? 'text-stone-300 dark:text-stone-600 cursor-not-allowed' : 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'}`}
              >
                Point suivant →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cartes détaillées des 4 Qualités */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Les 4 Piliers Décryptés</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Mettre en application concrète chaque mot du Hadith</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <div key={p.id} className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {p.badge}
                    </span>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mt-1">{p.nameFr}</h3>
                  </div>
                  <span className="text-2xl font-serif font-bold text-emerald-900 dark:text-emerald-300 px-3 py-1 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200/60 dark:border-stone-800 dir-rtl">
                    {p.nameAr}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-800/50 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
                <strong className="text-emerald-900 dark:text-emerald-400 block font-semibold mb-0.5">Application au quotidien :</strong>
                {p.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Citations de référence (Coran & Sagesse) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-3 border border-emerald-900">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>{QUOTES.quran.reference}</span>
            </div>
            <p className="font-serif text-lg sm:text-xl text-emerald-100 leading-relaxed dir-rtl">
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

        <div className="bg-amber-900/90 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-3 border border-amber-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Quote className="w-4 h-4" />
              <span>{QUOTES.ibnBaz.title}</span>
            </div>
            <p className="text-sm sm:text-base text-amber-100 font-serif leading-relaxed italic">
              {QUOTES.ibnBaz.translation}
            </p>
          </div>
          <div className="text-[11px] text-amber-200 font-semibold border-t border-amber-800/80 pt-2">
            {QUOTES.ibnBaz.commentary}
          </div>
        </div>
      </div>

    </div>
  );
}
