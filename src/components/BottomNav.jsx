import React from 'react';
import { Feather, BookOpen, Compass, Heart, MessageSquare } from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'sanctuary', label: 'Sanctuary', icon: Feather },
    { id: 'study', label: 'Tafsir', icon: BookOpen },
    { id: 'tracker', label: 'Barometer', icon: Compass },
    { id: 'calm', label: 'Calm', icon: Heart },
    { id: 'scenarios', label: 'Scenarios', icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F5F2EB]/95 dark:bg-[#111614]/95 backdrop-blur-lg border-t border-[#DFD8CB]/60 dark:border-[#242E29]/80 pb-[max(env(safe-area-inset-bottom),10px)] pt-1 px-4 transition-colors">
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
              className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 relative transition-all group"
            >
              {/* Ligne d'indication dorée au sommet (comme dans la maquette) */}
              {isActive && (
                <span className="absolute -top-1 w-7 h-[2px] bg-[#B89B72] rounded-full shadow-sm animate-fadeIn" />
              )}
              
              <div className="p-1 transition-transform">
                <Icon 
                  className={`w-[22px] h-[22px] transition-colors ${
                    isActive 
                      ? 'text-[#B89B72]' 
                      : 'text-[#8A928C] group-hover:text-[#1E3A2B] dark:group-hover:text-[#EDE8DE]'
                  }`} 
                  strokeWidth={1.3} 
                />
              </div>

              <span className={`text-[10px] tracking-tight leading-none mt-0.5 font-medium transition-colors ${
                isActive 
                  ? 'text-[#B89B72] font-semibold' 
                  : 'text-[#8A928C] group-hover:text-[#1E3A2B] dark:group-hover:text-[#EDE8DE]'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
