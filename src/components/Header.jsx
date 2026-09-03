import React from 'react';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Wind, 
  BookOpen, 
  Sparkles, 
  Heart, 
  Compass, 
  Feather 
} from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

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
    <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 dark:from-stone-950 dark:via-emerald-950 dark:to-stone-950 text-white shadow-md sticky top-0 z-40 border-b border-emerald-800/70 dark:border-emerald-900/50 transition-colors pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        
        {/* Logo & Titre */}
        <div className="flex items-center space-x-2.5">
          <img 
            src="/hayyin/logo.svg" 
            alt="Logo HAYYIN" 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-md border border-amber-400/30 shrink-0" 
          />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight">HAYYIN</span>
              <span className="font-serif text-amber-300 text-sm font-bold dir-rtl">هَيِّن</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-emerald-300/90 truncate max-w-[160px] sm:max-w-none leading-none">
              Préservé du Feu
            </p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Bouton d'urgence Anti-Colère Barakallahu Feek */}
          <button
            onClick={() => {
              triggerHaptic(40);
              onOpenBarakallahu();
            }}
            title="Urgence Colère : Invocation d'Ibn 'Awn"
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-200 border border-amber-400/40 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <Wind className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="text-xs">Anti-Colère</span>
          </button>

          {/* Toggle Son */}
          <button
            onClick={() => {
              triggerHaptic(20);
              setSoundEnabled(!soundEnabled);
            }}
            title={soundEnabled ? "Couper le son" : "Activer le son"}
            className="p-1.5 sm:p-2 rounded-xl bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition-colors active:scale-95"
            aria-label="Basculer le son"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Toggle Dark Mode */}
          <button
            onClick={() => {
              triggerHaptic(20);
              setDarkMode(!darkMode);
            }}
            title={darkMode ? "Passer en mode jour" : "Passer en mode nuit"}
            className="p-1.5 sm:p-2 rounded-xl bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition-colors active:scale-95"
            aria-label="Basculer le mode sombre"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
          </button>
        </div>
      </div>

      {/* Onglets visibles UNIQUEMENT sur tablette et ordinateur (cachés sur mobile car BottomNav prend le relais) */}
      <nav className="hidden md:flex max-w-5xl mx-auto px-2 space-x-2 overflow-x-auto text-sm border-t border-emerald-900/60 dark:border-emerald-950 scrollbar-none">
        <button 
          onClick={() => setActiveTab('sanctuary')}
          className={`py-2.5 px-3.5 border-b-2 font-medium flex items-center space-x-2 transition-colors ${
            activeTab === 'sanctuary' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <Feather className="w-4 h-4 text-amber-300" />
          <span>Sanctuaire de Paix</span>
        </button>

        <button 
          onClick={() => setActiveTab('study')}
          className={`py-2.5 px-3.5 border-b-2 font-medium flex items-center space-x-2 transition-colors ${
            activeTab === 'study' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Tafsir & Enseignements</span>
        </button>

        <button 
          onClick={() => setActiveTab('tracker')}
          className={`py-2.5 px-3.5 border-b-2 font-medium flex items-center space-x-2 transition-colors ${
            activeTab === 'tracker' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Bilan des 4 Vertus</span>
        </button>

        <button 
          onClick={() => setActiveTab('calm')}
          className={`py-2.5 px-3.5 border-b-2 font-medium flex items-center space-x-2 transition-colors ${
            activeTab === 'calm' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Pause Sérénité</span>
        </button>

        <button 
          onClick={() => setActiveTab('scenarios')}
          className={`py-2.5 px-3.5 border-b-2 font-medium flex items-center space-x-2 transition-colors ${
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
