import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Smartphone, 
  Send 
} from 'lucide-react';
import { NOTIFICATION_SLOTS } from '../data/notificationsData';
import { 
  getNotificationPermission, 
  requestNotificationPermission, 
  sendSystemNotification, 
  saveStoredNotifConfig 
} from '../utils/notifications';
import { triggerHaptic, playHarmonicTone } from '../utils/audio';

export default function NotificationSettingsModal({ 
  isOpen, 
  onClose, 
  notifConfig, 
  setNotifConfig, 
  onTestToast,
  soundEnabled 
}) {
  const [permission, setPermission] = useState(getNotificationPermission());
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleToggleMain = async () => {
    triggerHaptic(30);
    if (!notifConfig.enabled) {
      // Activer : demander la permission si pas encore accordée
      let currentPerm = permission;
      if (currentPerm !== 'granted') {
        currentPerm = await requestNotificationPermission();
        setPermission(currentPerm);
      }
      const newConfig = { ...notifConfig, enabled: true };
      setNotifConfig(newConfig);
      saveStoredNotifConfig(newConfig);
    } else {
      const newConfig = { ...notifConfig, enabled: false };
      setNotifConfig(newConfig);
      saveStoredNotifConfig(newConfig);
    }
  };

  const handleToggleSlot = (slotId) => {
    triggerHaptic(20);
    const newConfig = {
      ...notifConfig,
      slots: {
        ...notifConfig.slots,
        [slotId]: !notifConfig.slots[slotId]
      }
    };
    setNotifConfig(newConfig);
    saveStoredNotifConfig(newConfig);
  };

  const handleSendTestNotification = async () => {
    triggerHaptic([40, 60, 40]);
    if (soundEnabled) {
      playHarmonicTone(659.25, 'sine', 0.4, 0.15);
    }

    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);

    const testPayload = {
      title: "🕊️ HAYYIN : Rappel de Paix",
      body: "« Le Feu est interdit à quiconque est proche (قريب), posé (هين), doux (لين) et facile (سهل). »",
      tag: "hayyin-test",
      tab: "sanctuary"
    };

    // Envoyer la notification système
    await sendSystemNotification(testPayload);

    // Et afficher aussi le toast in-app si besoin
    if (onTestToast) {
      onTestToast(testPayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-5 sm:p-7 text-stone-800 dark:text-stone-100 relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header du modal */}
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                Rappels de Paix & Douceur
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Encouragements prophétiques tout au long de la journée
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* État de la permission système */}
        <div className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-2 ${
          permission === 'granted'
            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
            : permission === 'denied'
            ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
            : 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
        }`}>
          <div className="flex items-center space-x-2">
            {permission === 'granted' ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span className="font-semibold text-[11px]">
              {permission === 'granted'
                ? 'Notifications autorisées par votre appareil ✅'
                : permission === 'denied'
                ? 'Notifications bloquées dans les paramètres du navigateur'
                : 'Autorisation requise pour recevoir les alertes'}
            </span>
          </div>

          {permission !== 'granted' && (
            <button
              onClick={async () => {
                const res = await requestNotificationPermission();
                setPermission(res);
              }}
              className="text-[11px] font-bold text-amber-900 dark:text-amber-300 underline shrink-0"
            >
              Autoriser
            </button>
          )}
        </div>

        {/* Interrupteur Général */}
        <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div>
            <p className="font-bold text-sm text-stone-900 dark:text-stone-100">
              Activer les encouragements quotidiens
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Recevoir un rappel bienveillant aux moments clés
            </p>
          </div>

          <button
            onClick={handleToggleMain}
            className={`w-12 h-7 rounded-full transition-colors relative p-0.5 shrink-0 ${
              notifConfig.enabled 
                ? 'bg-emerald-700 dark:bg-emerald-600' 
                : 'bg-stone-300 dark:bg-stone-700'
            }`}
          >
            <span className={`block w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
              notifConfig.enabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Liste des 4 créneaux personnalisables */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 font-bold uppercase tracking-wider px-1">
            <span>Les 4 Moments de la Journée</span>
            <span>Heure prévue</span>
          </div>

          {NOTIFICATION_SLOTS.map((slot) => {
            const isSlotActive = notifConfig.slots[slot.id];
            return (
              <div 
                key={slot.id}
                onClick={() => notifConfig.enabled && handleToggleSlot(slot.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  !notifConfig.enabled 
                    ? 'opacity-50 cursor-not-allowed border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30'
                    : isSlotActive 
                    ? 'border-emerald-500/60 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-950/30' 
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                      {slot.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                    {slot.body}
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0 pl-2">
                  <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-lg border border-amber-300/50">
                    {slot.time}
                  </span>
                  <input
                    type="checkbox"
                    checked={isSlotActive}
                    disabled={!notifConfig.enabled}
                    onChange={() => handleToggleSlot(slot.id)}
                    className="accent-emerald-700 w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton de Test Immédiat */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800">
          <p className="text-[11px] text-stone-400 text-center sm:text-left">
            Vérifiez l'affichage de l'alerte sur votre écran
          </p>

          <button
            onClick={handleSendTestNotification}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testSent ? 'Notification envoyée !' : 'Tester maintenant'}</span>
          </button>
        </div>

        {/* Conseil iOS PWA */}
        <div className="p-3 bg-stone-100 dark:bg-stone-800/70 rounded-xl text-[10px] text-stone-500 dark:text-stone-400 flex items-start space-x-2">
          <Smartphone className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
          <span>
            <strong>Astuce iPhone :</strong> Pour recevoir les notifications lorsque l'écran est éteint, assurez-vous d'avoir ajouté l'application sur l'écran d'accueil (iOS 16.4+).
          </span>
        </div>

      </div>
    </div>
  );
}
