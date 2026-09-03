import React, { useState } from 'react';
import { THE_FOUR_PORTALS } from '../data/spiritualData';
import { Sparkles, ShieldCheck, Heart, AlertCircle, Feather, ChevronRight } from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

export default function PortalsSection() {
  const [activePortalIndex, setActivePortalIndex] = useState(0);
  const portal = THE_FOUR_PORTALS[activePortalIndex];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 tracking-wider bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            Tarbiyah & Remèdes du Cœur
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mt-1">
            Les 4 Portes de l'Élévation Spirituelle
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Comprendre la maladie de l'âme et appliquer le remède prophétique pour chaque vertu
          </p>
        </div>

        {/* Sélecteur des 4 Portes */}
        <div className="flex space-x-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl overflow-x-auto scrollbar-none">
          {THE_FOUR_PORTALS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                triggerHaptic(20);
                setActivePortalIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 whitespace-nowrap ${
                activePortalIndex === idx
                  ? 'bg-emerald-800 dark:bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <span className="font-serif dir-rtl">{p.nameAr}</span>
              <span className="hidden sm:inline text-[11px]">({p.id})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu détaillé de la porte active */}
      <div className="space-y-5 animate-fadeIn">
        
        {/* Titre & Calligraphie */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 dark:bg-stone-800/50 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              {portal.title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {portal.subtitle}
            </p>
          </div>
          <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-900 dark:text-amber-300 px-4 py-1.5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 self-start sm:self-auto dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
            {portal.nameAr}
          </span>
        </div>

        {/* Diagnostic : Maladie vs Remède */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Maladie spirituelle */}
          <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 rounded-2xl border border-rose-200/80 dark:border-rose-900/50 space-y-1.5">
            <span className="font-bold text-rose-900 dark:text-rose-300 flex items-center space-x-1.5 text-xs uppercase tracking-wide">
              <AlertCircle className="w-4 h-4" />
              <span>La Maladie de l'Âme à Exterminer :</span>
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs">
              {portal.spiritualDisease}
            </p>
          </div>

          {/* Remède prophétique */}
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5">
            <span className="font-bold text-emerald-950 dark:text-emerald-300 flex items-center space-x-1.5 text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Le Remède de la Sounnah :</span>
            </span>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs">
              {portal.propheticMedicine}
            </p>
          </div>
        </div>

        {/* Parole d'or des Salaf */}
        <div className="p-5 bg-gradient-to-r from-amber-50 to-stone-50 dark:from-stone-800/50 dark:to-amber-950/20 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 space-y-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-900 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/50 px-2.5 py-0.5 rounded-full inline-block">
            Sagesse d'un Héritier des Prophètes • {portal.wisdomSalaf.author}
          </span>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-serif leading-relaxed italic">
            {portal.wisdomSalaf.text}
          </p>
        </div>

        {/* Exercice pratique d'ancrage */}
        <div className="p-4 bg-emerald-900 dark:bg-emerald-950 text-emerald-100 rounded-2xl text-xs flex items-start space-x-3 border border-emerald-800">
          <Feather className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block font-semibold mb-0.5">Votre Défi d'Ancrage Intérieur :</strong>
            <span>{portal.dailyAction}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
