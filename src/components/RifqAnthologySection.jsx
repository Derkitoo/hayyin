import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Share2, 
  Check, 
  Sparkles, 
  Feather, 
  Quote, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { RIFQ_HADITHS, RIFQ_CATEGORIES } from '../data/rifqHadithsData';
import { shareContent, triggerHaptic } from '../utils/audio';

export default function RifqAnthologySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredHadiths = RIFQ_HADITHS.filter((hadith) => {
    const matchesCategory = selectedCategory === 'all' || hadith.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = !query || 
      hadith.quoteFr.toLowerCase().includes(query) ||
      hadith.quoteAr.includes(query) ||
      hadith.keyTakeaway.toLowerCase().includes(query) ||
      hadith.source.toLowerCase().includes(query) ||
      hadith.narrator.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const handleShareHadith = async (hadith) => {
    triggerHaptic(30);
    const text = `Hadith sur le Rifq (La Douceur) :\n\n${hadith.quoteAr}\n\n« ${hadith.quoteFr} »\n\n— ${hadith.narrator} (${hadith.source})\nClé : ${hadith.keyTakeaway}\n\nDécouvrir HAYYIN : ${window.location.href}`;
    const res = await shareContent({
      title: hadith.titleAr,
      text,
      url: window.location.href
    });
    if (res.success) {
      setCopiedId(hadith.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-5 transition-colors">
      
      {/* En-tête de la section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
              Anthologie Prophétique • كُنُوزُ الرِّفْقِ
            </span>
            <span className="text-xs text-stone-400 font-mono">
              {filteredHadiths.length} hadith{filteredHadiths.length > 1 ? 's' : ''}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Le Trésor du Rifq : Les 10 Hadiths de la Douceur
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Le corpus prophétique complet pour blinder votre caractère et repousser le Feu
          </p>
        </div>

        {/* Barre de recherche instantanée */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher (colère, foyer, paix...)"
            className="w-full pl-9 pr-8 py-2 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:focus:ring-amber-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Barre de filtres par catégories */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
        {RIFQ_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                triggerHaptic(20);
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-emerald-800 dark:bg-amber-400 text-white dark:text-stone-950 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Liste des Hadiths */}
      {filteredHadiths.length === 0 ? (
        <div className="text-center py-8 text-xs text-stone-400 dark:text-stone-500 italic">
          Aucun hadith ne correspond à votre recherche. Essayez un autre mot-clé.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHadiths.map((h) => {
            const isCopied = copiedId === h.id;
            return (
              <div 
                key={h.id}
                className="bg-stone-50/70 dark:bg-stone-800/40 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-5 space-y-3.5 transition-all hover:border-amber-400/50"
              >
                {/* En-tête de carte */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-700/60 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-800">
                      {h.categoryLabel}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {h.narrator}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-stone-400 font-mono">
                      {h.source}
                    </span>
                    <button
                      onClick={() => handleShareHadith(h)}
                      className="p-1.5 rounded-lg bg-white dark:bg-stone-800 text-stone-500 hover:text-emerald-800 dark:hover:text-amber-300 border border-stone-200 dark:border-stone-700 transition-colors active:scale-90"
                      title="Partager ce hadith"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-amber-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Calligraphie arabe */}
                <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 text-center">
                  <p className="font-serif text-lg sm:text-xl text-emerald-950 dark:text-amber-300 leading-relaxed dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                    {h.quoteAr}
                  </p>
                </div>

                {/* Traduction française */}
                <p className="text-stone-700 dark:text-stone-200 text-xs sm:text-sm leading-relaxed font-normal italic">
                  {h.quoteFr}
                </p>

                {/* Clé de mise en pratique */}
                <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/80 dark:border-emerald-900/50 text-xs text-emerald-950 dark:text-emerald-200 flex items-start space-x-2">
                  <Feather className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-900 dark:text-emerald-300 font-semibold">Clé pour ta journée : </strong>
                    <span>{h.keyTakeaway}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
