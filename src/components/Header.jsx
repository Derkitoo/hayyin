import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Bell, 
  Wind,
  Feather,
  BookOpen,
  Sparkles,
  Heart,
  Compass
} from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

export default function Header({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  darkMode,
  setDarkMode,
  onOpenBarakallahu,
  onOpenNotifications,
  notifEnabled
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F2EB]/90 dark:bg-[#111614]/90 backdrop-blur-md border-b border-[#DFD8CB]/50 dark:border-[#242E29]/60 transition-colors pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Côté Gauche : Contrôle Audio Minimaliste Wireframe */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              triggerHaptic(20);
              setSoundEnabled(!soundEnabled);
            }}
            title={soundEnabled ? "Couper l'ambiance sonore" : "Activer l'ambiance sonore"}
            className="p-2 rounded-full text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B] dark:hover:text-white transition-colors"
            aria-label="Basculer le son"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" strokeWidth={1.4} />
            ) : (
              <VolumeX className="w-5 h-5 opacity-40" strokeWidth={1.4} />
            )}
          </button>

          <button
            onClick={() => {
              triggerHaptic(20);
              onOpenNotifications();
            }}
            title="Rappels de douceur"
            className="p-2 rounded-full text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B] dark:hover:text-white transition-colors relative"
            aria-label="Rappels quotidiens"
          >
            <Bell className="w-4 h-4" strokeWidth={1.4} />
            {notifEnabled && (
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#B89B72] rounded-full" />
            )}
          </button>
        </div>

        {/* Centre : Logo HAYYIN Épuré au Pixel Près */}
        <div className="flex flex-col items-center justify-center cursor-pointer select-none" onClick={() => setActiveTab('sanctuary')}>
          <span className="font-serif text-[13px] leading-tight text-[#1E3A2B]/80 dark:text-[#B89B72] dir-rtl font-normal">
            یا رَحِيمُ
          </span>
          <span className="font-sans text-xs font-semibold tracking-[0.28em] text-[#1E3A2B] dark:text-[#EDE8DE] uppercase -mt-0.5">
            HAYYIN
          </span>
        </div>

        {/* Côté Droit : Anti-Colère & Mode Sombre Filaire */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              triggerHaptic(30);
              onOpenBarakallahu();
            }}
            title="Désarmer la colère"
            className="text-[10px] uppercase font-bold tracking-wider text-[#1E3A2B] dark:text-[#B89B72] bg-[#EDE8DE] dark:bg-[#19201D] border border-[#DFD8CB]/80 dark:border-[#242E29] px-2.5 py-1 rounded-full hover:bg-[#E5DFD3] dark:hover:bg-[#202925] transition-all"
          >
            Anti-Colère
          </button>

          <button
            onClick={() => {
              triggerHaptic(20);
              setDarkMode(!darkMode);
            }}
            title={darkMode ? "Mode Jour" : "Mode Nuit"}
            className="p-2 rounded-full text-[#1E3A2B]/70 dark:text-[#EDE8DE]/70 hover:text-[#1E3A2B] dark:hover:text-white transition-colors"
            aria-label="Basculer le mode sombre"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-[#B89B72]" strokeWidth={1.4} />
            ) : (
              <Moon className="w-5 h-5" strokeWidth={1.4} />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
