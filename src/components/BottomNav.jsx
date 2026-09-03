import React from 'react';
import { Feather, BookOpen, Sparkles, Heart, Compass } from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'sanctuary', label: 'Sanctuaire', icon: Feather },
    { id: 'study', label: 'Tafsir', icon: BookOpen },
    { id: 'tracker', label: 'Baromètre', icon: Sparkles },
    { id: 'calm', label: 'Sérénité', icon: Heart },
    { id: 'scenarios', label: 'Cas', icon: Compass },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-stone-200/90 dark:border-stone-800/90 pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 px-2 transition-colors shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerHaptic(20);
                setActiveTab(tab.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all relative ${
                isActive 
                  ? 'text-emerald-800 dark:text-amber-300 font-bold' 
                  : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 font-medium'
              }`}
            >
              {/* Indicateur d'onglet actif discret */}
              {isActive && (
                <span className="absolute -top-1.5 w-6 h-1 bg-amber-400 rounded-full shadow-sm shadow-amber-400/50 animate-fadeIn" />
              )}
              
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-50 dark:bg-emerald-950/60' : ''}`}>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              </div>

              <span className="text-[10px] tracking-tight leading-none mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
