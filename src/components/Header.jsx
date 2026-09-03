import React from 'react';
import { ShieldCheck, Volume2, VolumeX, Sun, Moon, Wind, BookOpen, Sparkles, Heart, Compass } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  darkMode,
  setDarkMode,
  onOpenBarakallahu
}) {
  return (
    <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 dark:from-stone-950 dark:via-emerald-950 dark:to-stone-950 text-white shadow-lg sticky top-0 z-50 border-b border-emerald-800/70 dark:border-emerald-900/50 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-800/80 dark:bg-emerald-900/80 border border-emerald-500/30 flex items-center justify-center text-emerald-200 shadow-sm shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base md:text-lg tracking-tight">HAYYIN</span>
              <span className="font-serif text-amber-300 text-sm font-bold dir-rtl">هَيِّن</span>
              <span className="hidden sm:inline-block text-[10px] bg-emerald-800/80 dark:bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-600/40 uppercase tracking-widest font-semibold">
                Tafsir Al-Badr
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/90 truncate max-w-[200px] sm:max-w-none">
              L'art prophétique d'être préservé du Feu
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Bouton d'urgence Anti-Colère Barakallahu Feek */}
          <button
            onClick={onOpenBarakallahu}
            title="Urgence Colère : Invocation d'Ibn 'Awn"
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-200 border border-amber-400/40 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <Wind className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="hidden xs:inline">Anti-Colère</span>
          </button>

          {/* Toggle Son */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Couper le son" : "Activer le son"}
            className="p-2 rounded-xl bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition-colors"
            aria-label="Basculer le son"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Toggle Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Passer en mode jour" : "Passer en mode nuit feutré"}
            className="p-2 rounded-xl bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition-colors"
            aria-label="Basculer le mode sombre"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
          </button>
        </div>
      </div>

      {/* Onglets de navigation */}
      <nav className="max-w-5xl mx-auto px-2 flex space-x-1 sm:space-x-2 overflow-x-auto text-xs sm:text-sm border-t border-emerald-900/60 dark:border-emerald-950 scrollbar-none">
        <button 
          onClick={() => setActiveTab('study')}
          className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
            activeTab === 'study' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Tafsir & Enseignements</span>
        </button>

        <button 
          onClick={() => setActiveTab('tracker')}
          className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
            activeTab === 'tracker' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Bilan des 4 Vertus</span>
        </button>

        <button 
          onClick={() => setActiveTab('calm')}
          className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
            activeTab === 'calm' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Pause Sérénité</span>
        </button>

        <button 
          onClick={() => setActiveTab('scenarios')}
          className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
            activeTab === 'scenarios' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Cas Pratiques</span>
        </button>
      </nav>
    </header>
  );
}
