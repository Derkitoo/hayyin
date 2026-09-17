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
    <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6 transition-colors">
      
      {/* En-tête de la section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFD8CB]/80 dark:border-[#25302A] pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold text-[#B89B72] dark:text-[#C4A97D] tracking-widest bg-[#F5F2EB] dark:bg-[#151B18] px-3 py-1 rounded-full border border-[#DFD8CB] dark:border-[#2A3830]">
              Anthologie Prophétique • كُنُوزُ الرِّفْقِ
            </span>
            <span className="text-xs text-[#827869] dark:text-[#8E9B93] font-mono">
              {filteredHadiths.length} hadith{filteredHadiths.length > 1 ? 's' : ''}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#1E3A2B] dark:text-[#EAE6DF] mt-2">
            Le Trésor du Rifq : Les 10 Hadiths de la Douceur
          </h2>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93] mt-0.5">
            Le corpus prophétique complet pour polir votre caractère et repousser le Feu
          </p>
        </div>

        {/* Barre de recherche instantanée */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#827869] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher (colère, foyer, paix...)"
            className="w-full pl-9 pr-8 py-2.5 bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#2A3830] rounded-full text-xs text-[#1E3A2B] dark:text-[#EAE6DF] placeholder-[#A39989] focus:outline-none focus:ring-2 focus:ring-[#B89B72]/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#827869] hover:text-[#1E3A2B] dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Barre de filtres par catégories */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {RIFQ_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                triggerHaptic(20);
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-[#F5F2EB] dark:text-[#111614] shadow-sm'
                  : 'bg-[#F5F2EB] dark:bg-[#151B18] text-[#827869] dark:text-[#8E9B93] border border-[#DFD8CB]/80 dark:border-[#25302A] hover:border-[#B89B72]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Liste des Hadiths */}
      {filteredHadiths.length === 0 ? (
        <div className="text-center py-10 text-xs text-[#827869] dark:text-[#8E9B93] italic">
          Aucun hadith ne correspond à votre recherche. Essayez un autre mot-clé.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHadiths.map((h) => {
            const isCopied = copiedId === h.id;
            return (
              <div 
                key={h.id}
                className="bg-[#F5F2EB] dark:bg-[#151B18] rounded-[28px] border border-[#DFD8CB]/80 dark:border-[#25302A] p-5 sm:p-6 space-y-4 transition-all hover:border-[#B89B72]/60"
              >
                {/* En-tête de carte */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFD8CB]/60 dark:border-[#25302A] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold text-[#1E3A2B] dark:text-[#A7D1BA] bg-[#EDE8DE] dark:bg-[#1E2723] px-2.5 py-0.5 rounded-full border border-[#DFD8CB] dark:border-[#2A3830]">
                      {h.categoryLabel}
                    </span>
                    <span className="text-xs text-[#827869] dark:text-[#8E9B93] font-medium">
                      {h.narrator}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-[#A39989] dark:text-[#6E7B74] font-mono">
                      {h.source}
                    </span>
                    <button
                      onClick={() => handleShareHadith(h)}
                      className="p-1.5 rounded-full bg-[#EDE8DE] dark:bg-[#1E2723] text-[#827869] dark:text-[#8E9B93] hover:text-[#1E3A2B] dark:hover:text-[#EAE6DF] border border-[#DFD8CB] dark:border-[#2A3830] transition-colors active:scale-90"
                      title="Partager ce hadith"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#1E3A2B] dark:text-[#B89B72]" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Calligraphie arabe */}
                <div className="bg-[#EDE8DE]/70 dark:bg-[#19201D] p-5 rounded-2xl border border-[#DFD8CB]/70 dark:border-[#25302A] text-center">
                  <p className="font-serif text-xl sm:text-2xl text-[#1E3A2B] dark:text-[#A7D1BA] leading-relaxed dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                    {h.quoteAr}
                  </p>
                </div>

                {/* Traduction française */}
                <p className="text-[#3F4843] dark:text-[#C5D8CD] text-xs sm:text-sm leading-relaxed font-normal italic px-1">
                  « {h.quoteFr} »
                </p>

                {/* Clé de mise en pratique */}
                <div className="p-3.5 bg-[#EDE8DE]/60 dark:bg-[#19201D] rounded-2xl border border-[#DFD8CB]/60 dark:border-[#25302A] text-xs text-[#1E3A2B] dark:text-[#EAE6DF] flex items-start space-x-2.5">
                  <Feather className="w-4 h-4 text-[#B89B72] dark:text-[#C4A97D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E3A2B] dark:text-[#B89B72] font-semibold">Clé pour ta journée : </strong>
                    <span className="text-[#55635C] dark:text-[#A7B5AD]">{h.keyTakeaway}</span>
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
