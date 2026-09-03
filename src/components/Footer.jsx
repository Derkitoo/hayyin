import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-stone-900 border-t border-stone-200/90 dark:border-stone-800 py-6 text-center text-xs text-stone-500 dark:text-stone-400 transition-colors">
      <div className="max-w-5xl mx-auto px-4 space-y-1.5">
        <p className="font-medium text-stone-700 dark:text-stone-300">
          HAYYIN • Application basée sur le Hadith authentique et le cours du Pr. Dr. Abd al-Razzaq al-Badr (حفظه الله)
        </p>
        <p className="text-[11px] text-stone-400 dark:text-stone-500">
          « تَحْرُمُ عَلَى كُلِّ قَرِيبٍ هَيِّنٍ لَيِّنٍ سَهْلٍ » — Qu'Allah nous compte parmi les serviteurs préservés du Feu.
        </p>
      </div>
    </footer>
  );
}
