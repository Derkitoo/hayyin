import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-[#DFD8CB]/80 dark:border-[#25302A] py-8 pb-24 md:pb-8 text-center text-xs text-[#827869] dark:text-[#8E9B93] transition-colors">
      <div className="max-w-5xl mx-auto px-4 space-y-2">
        <p className="font-medium text-[#1E3A2B] dark:text-[#C5D8CD] tracking-wide">
          HAYYIN • Conçu autour du Hadith authentique et du cours du Pr. Dr. Abd al-Razzaq al-Badr (حفظه الله)
        </p>
        <p className="text-[11px] font-serif text-[#B89B72] dark:text-[#C4A97D] tracking-wide dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
          « تَحْرُمُ عَلَى كُلِّ قَرِيبٍ هَيِّنٍ لَيِّنٍ سَهْلٍ »
        </p>
        <p className="text-[11px] text-[#A39989] dark:text-[#6E7B74]">
          « Le Feu est interdit à toute personne proche, posée, douce et facile. »
        </p>
      </div>
    </footer>
  );
}
