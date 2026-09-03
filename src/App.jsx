import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TafsirTab from './components/TafsirTab';
import TrackerTab from './components/TrackerTab';
import CalmTab from './components/CalmTab';
import ScenariosTab from './components/ScenariosTab';
import BarakallahuModal from './components/BarakallahuModal';
import { loadFromStorage, saveToStorage } from './utils/storage';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState('study');

  // Paramètres audio et thème
  const [soundEnabled, setSoundEnabled] = useState(() => loadFromStorage('soundEnabled', true));
  const [darkMode, setDarkMode] = useState(() => loadFromStorage('darkMode', false));

  // Modal d'urgence Anti-Colère
  const [isBarakallahuOpen, setIsBarakallahuOpen] = useState(false);

  // Données du Baromètre / Auto-évaluation
  const [ratings, setRatings] = useState(() => loadFromStorage('ratings', {
    qarib: 4,
    hayyin: 3,
    layyin: 4,
    sahl: 4,
  }));

  const initialEntries = [
    {
      id: 1,
      date: "Aujourd'hui, 08:30",
      tag: "Travail",
      score: 85,
      note: "Face à une remarque acerbe en réunion, j'ai différé ma réaction et appliqué la douceur au lieu de piquer en retour. L'échange s'est fluidifié de lui-même."
    },
    {
      id: 2,
      date: "Hier, 19:45",
      tag: "Famille",
      score: 75,
      note: "Pris par la fatigue, j'ai veillé à ne pas élever la voix avec les enfants, en me rappelant le verset : 'Si tu avais été rude, ils se seraient enfuis de ton entourage'."
    }
  ];

  const [savedEntries, setSavedEntries] = useState(() => loadFromStorage('savedEntries', initialEntries));

  // Compteur de tasbih
  const [tasbihCount, setTasbihCount] = useState(() => loadFromStorage('tasbihCount', 0));

  // Défi Douceur du Jour & Série (Streak)
  const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const [dailyCompleted, setDailyCompleted] = useState(() => {
    const lastDoneDate = loadFromStorage('dailyDoneDate', null);
    return lastDoneDate === todayKey;
  });
  const [streak, setStreak] = useState(() => loadFromStorage('streak', 1));

  // Application de la classe Dark Mode sur le document HTML
  useEffect(() => {
    saveToStorage('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sauvegarde des préférences et états
  useEffect(() => {
    saveToStorage('soundEnabled', soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    saveToStorage('ratings', ratings);
  }, [ratings]);

  useEffect(() => {
    saveToStorage('savedEntries', savedEntries);
  }, [savedEntries]);

  useEffect(() => {
    saveToStorage('tasbihCount', tasbihCount);
  }, [tasbihCount]);

  const handleToggleDailyChallenge = () => {
    if (!dailyCompleted) {
      setDailyCompleted(true);
      saveToStorage('dailyDoneDate', todayKey);
      const newStreak = streak + 1;
      setStreak(newStreak);
      saveToStorage('streak', newStreak);
    } else {
      setDailyCompleted(false);
      saveToStorage('dailyDoneDate', null);
      const newStreak = Math.max(0, streak - 1);
      setStreak(newStreak);
      saveToStorage('streak', newStreak);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 transition-colors antialiased">
      
      {/* BARRE DE NAVIGATION SUPÉRIEURE */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenBarakallahu={() => setIsBarakallahuOpen(true)}
      />

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {activeTab === 'study' && (
          <TafsirTab 
            dailyCompleted={dailyCompleted}
            onToggleDaily={handleToggleDailyChallenge}
            streak={streak}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'tracker' && (
          <TrackerTab 
            ratings={ratings}
            setRatings={setRatings}
            savedEntries={savedEntries}
            setSavedEntries={setSavedEntries}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'calm' && (
          <CalmTab 
            soundEnabled={soundEnabled}
            tasbihCount={tasbihCount}
            setTasbihCount={setTasbihCount}
            onOpenBarakallahu={() => setIsBarakallahuOpen(true)}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenariosTab 
            soundEnabled={soundEnabled}
          />
        )}

      </main>

      {/* PIED DE PAGE */}
      <Footer />

      {/* MODAL D'URGENCE SÉVÉRITÉ / ANTI-COLÈRE */}
      <BarakallahuModal 
        isOpen={isBarakallahuOpen}
        onClose={() => setIsBarakallahuOpen(false)}
        soundEnabled={soundEnabled}
      />

    </div>
  );
}
