import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import PwaInstallBanner from './components/PwaInstallBanner';
import SanctuaryTab from './components/SanctuaryTab';
import TafsirTab from './components/TafsirTab';
import TrackerTab from './components/TrackerTab';
import CalmTab from './components/CalmTab';
import ScenariosTab from './components/ScenariosTab';
import BarakallahuModal from './components/BarakallahuModal';
import NotificationSettingsModal from './components/NotificationSettingsModal';
import NotificationToast from './components/NotificationToast';
import { loadFromStorage, saveToStorage } from './utils/storage';
import { NOTIFICATION_SLOTS } from './data/notificationsData';
import { 
  getStoredNotifConfig, 
  startNotificationScheduler 
} from './utils/notifications';

export default function App() {
  // Navigation (par défaut sur le Sanctuaire de Paix)
  const [activeTab, setActiveTab] = useState('sanctuary');

  // Paramètres audio et thème
  const [soundEnabled, setSoundEnabled] = useState(() => loadFromStorage('soundEnabled', true));
  const [darkMode, setDarkMode] = useState(() => loadFromStorage('darkMode', false));

  // Modals
  const [isBarakallahuOpen, setIsBarakallahuOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Notifications & Toast
  const [notifConfig, setNotifConfig] = useState(getStoredNotifConfig);
  const [currentToast, setCurrentToast] = useState(null);

  // Rituels du Matin & du Soir
  const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const [morningDone, setMorningDone] = useState(() => {
    return loadFromStorage('morningDoneDate', null) === todayKey;
  });
  const [eveningDone, setEveningDone] = useState(() => {
    return loadFromStorage('eveningDoneDate', null) === todayKey;
  });

  // Le Pacte Sacré (Mīthāq ar-Rifq)
  const [hasSignedPact, setHasSignedPact] = useState(() => loadFromStorage('hasSignedPact', false));
  const [pactDate, setPactDate] = useState(() => loadFromStorage('pactDate', ''));

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

  // Démarrage du planificateur de notifications
  useEffect(() => {
    const cancelScheduler = startNotificationScheduler(
      NOTIFICATION_SLOTS,
      notifConfig,
      (slot) => {
        setCurrentToast({
          title: slot.title,
          body: slot.body,
          tab: slot.tab,
        });
      }
    );
    return () => cancelScheduler();
  }, [notifConfig]);

  const handleCompleteMorning = () => {
    setMorningDone(true);
    saveToStorage('morningDoneDate', todayKey);
  };

  const handleCompleteEvening = () => {
    setEveningDone(true);
    saveToStorage('eveningDoneDate', todayKey);
  };

  const handleSignPact = () => {
    const dateFormatted = new Date().toLocaleDateString('fr-FR');
    setHasSignedPact(true);
    setPactDate(dateFormatted);
    saveToStorage('hasSignedPact', true);
    saveToStorage('pactDate', dateFormatted);
  };

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
      
      {/* TOAST FLOTTANT IN-APP LORS D'UN RAPPEL */}
      <NotificationToast 
        toast={currentToast}
        onDismiss={() => setCurrentToast(null)}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* BANNIÈRE D'INSTALLATION PWA MOBILE */}
      <PwaInstallBanner />

      {/* HEADER HAUTEUR MINIMALE */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenBarakallahu={() => setIsBarakallahuOpen(true)}
        onOpenNotifications={() => setIsNotifModalOpen(true)}
        notifEnabled={notifConfig.enabled}
      />

      {/* CONTENU PRINCIPAL AVEC PADDING BAS POUR LE BOTTOM-NAV */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3.5 sm:p-6 space-y-5 pb-24 md:pb-12">
        
        {activeTab === 'sanctuary' && (
          <SanctuaryTab 
            morningDone={morningDone}
            onCompleteMorning={handleCompleteMorning}
            eveningDone={eveningDone}
            onCompleteEvening={handleCompleteEvening}
            hasSignedPact={hasSignedPact}
            pactDate={pactDate}
            onSignPact={handleSignPact}
            onOpenBarakallahu={() => setIsBarakallahuOpen(true)}
            onOpenNotifications={() => setIsNotifModalOpen(true)}
            notifEnabled={notifConfig.enabled}
            soundEnabled={soundEnabled}
          />
        )}

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

      {/* BARRE DE NAVIGATION INFÉRIEURE NATIVE SUR MOBILE */}
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MODAL D'URGENCE SÉVÉRITÉ / ANTI-COLÈRE */}
      <BarakallahuModal 
        isOpen={isBarakallahuOpen}
        onClose={() => setIsBarakallahuOpen(false)}
        soundEnabled={soundEnabled}
      />

      {/* MODAL DE RÉGLAGES DES NOTIFICATIONS */}
      <NotificationSettingsModal 
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        notifConfig={notifConfig}
        setNotifConfig={setNotifConfig}
        onTestToast={(payload) => setCurrentToast(payload)}
        soundEnabled={soundEnabled}
      />

    </div>
  );
}
