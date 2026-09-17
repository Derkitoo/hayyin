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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] border border-[#DFD8CB] dark:border-[#25302A] rounded-[36px] max-w-lg w-full p-6 sm:p-8 text-[#1E3A2B] dark:text-[#EAE6DF] relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header du modal */}
        <div className="flex items-center justify-between border-b border-[#DFD8CB]/80 dark:border-[#25302A] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#2A3830] text-[#B89B72] dark:text-[#C4A97D] flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-[#1E3A2B] dark:text-[#EAE6DF] text-lg sm:text-xl">
                Rappels de Paix & Douceur
              </h2>
              <p className="text-xs text-[#827869] dark:text-[#8E9B93]">
                Encouragements prophétiques tout au long de la journée
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#F5F2EB] dark:bg-[#151B18] hover:bg-[#E2DACB] dark:hover:bg-[#1E2723] text-[#827869] dark:text-[#8E9B93] hover:text-[#1E3A2B] dark:hover:text-white transition-colors border border-[#DFD8CB] dark:border-[#25302A]"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* État de la permission système */}
        <div className={`p-4 rounded-[22px] border text-xs flex items-center justify-between gap-2 ${
          permission === 'granted'
            ? 'bg-[#F5F2EB] dark:bg-[#151B18] border-[#1E3A2B]/30 dark:border-[#A7D1BA]/30 text-[#1E3A2B] dark:text-[#A7D1BA]'
            : permission === 'denied'
            ? 'bg-[#F5F2EB] dark:bg-[#151B18] border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-300'
            : 'bg-[#F5F2EB] dark:bg-[#151B18] border-[#DFD8CB] dark:border-[#2A3830] text-[#827869] dark:text-[#8E9B93]'
        }`}>
          <div className="flex items-center space-x-2">
            {permission === 'granted' ? (
              <Check className="w-4 h-4 text-[#1E3A2B] dark:text-[#A7D1BA] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#B89B72] shrink-0" />
            )}
            <span className="font-medium text-[11px]">
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
              className="text-[11px] font-bold text-[#1E3A2B] dark:text-[#B89B72] underline shrink-0 cursor-pointer"
            >
              Autoriser
            </button>
          )}
        </div>

        {/* Interrupteur Général */}
        <div className="bg-[#F5F2EB] dark:bg-[#151B18] p-4 sm:p-5 rounded-[24px] border border-[#DFD8CB]/80 dark:border-[#25302A] flex items-center justify-between">
          <div>
            <p className="font-serif font-bold text-sm text-[#1E3A2B] dark:text-[#EAE6DF]">
              Activer les encouragements quotidiens
            </p>
            <p className="text-xs text-[#827869] dark:text-[#8E9B93]">
              Recevoir un rappel bienveillant aux moments clés
            </p>
          </div>

          <button
            onClick={handleToggleMain}
            className={`w-12 h-7 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
              notifConfig.enabled 
                ? 'bg-[#1E3A2B] dark:bg-[#B89B72]' 
                : 'bg-[#DFD8CB] dark:bg-[#25302A]'
            }`}
          >
            <span className={`block w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
              notifConfig.enabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Liste des 4 créneaux personnalisables */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs text-[#827869] dark:text-[#8E9B93] font-bold uppercase tracking-wider px-1">
            <span>Les 4 Moments de la Journée</span>
            <span>Heure prévue</span>
          </div>

          {NOTIFICATION_SLOTS.map((slot) => {
            const isSlotActive = notifConfig.slots[slot.id];
            return (
              <div 
                key={slot.id}
                onClick={() => notifConfig.enabled && handleToggleSlot(slot.id)}
                className={`p-4 rounded-[22px] border transition-all flex items-center justify-between cursor-pointer ${
                  !notifConfig.enabled 
                    ? 'opacity-40 cursor-not-allowed border-[#DFD8CB] dark:border-[#25302A] bg-[#F5F2EB]/50 dark:bg-[#151B18]/30'
                    : isSlotActive 
                    ? 'border-[#1E3A2B]/50 dark:border-[#B89B72]/50 bg-[#F5F2EB] dark:bg-[#151B18]' 
                    : 'border-[#DFD8CB]/80 dark:border-[#25302A] bg-[#F5F2EB]/70 dark:bg-[#151B18]/60'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-xs text-[#1E3A2B] dark:text-[#EAE6DF]">
                      {slot.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#827869] dark:text-[#8E9B93] line-clamp-1">
                    {slot.body}
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0 pl-2">
                  <span className="font-mono text-xs font-bold text-[#1E3A2B] dark:text-[#A7D1BA] bg-[#EDE8DE] dark:bg-[#1E2723] px-2.5 py-0.5 rounded-full border border-[#DFD8CB] dark:border-[#2A3830]">
                    {slot.time}
                  </span>
                  <input
                    type="checkbox"
                    checked={isSlotActive}
                    disabled={!notifConfig.enabled}
                    onChange={() => handleToggleSlot(slot.id)}
                    className="accent-[#1E3A2B] dark:accent-[#B89B72] w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton de Test Immédiat */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DFD8CB]/80 dark:border-[#25302A]">
          <p className="text-[11px] text-[#827869] dark:text-[#8E9B93] text-center sm:text-left">
            Vérifiez l'affichage de l'alerte sur votre écran
          </p>

          <button
            onClick={handleSendTestNotification}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testSent ? 'Notification envoyée !' : 'Tester maintenant'}</span>
          </button>
        </div>

        {/* Conseil iOS PWA */}
        <div className="p-3.5 bg-[#F5F2EB] dark:bg-[#151B18] rounded-[20px] text-[10px] text-[#827869] dark:text-[#8E9B93] flex items-start space-x-2.5 border border-[#DFD8CB]/80 dark:border-[#25302A]">
          <Smartphone className="w-4 h-4 text-[#B89B72] shrink-0 mt-0.5" />
          <span>
            <strong>Astuce iPhone :</strong> Pour recevoir les notifications lorsque l'écran est éteint, assurez-vous d'avoir ajouté l'application sur l'écran d'accueil (iOS 16.4+).
          </span>
        </div>

      </div>
    </div>
  );
}
