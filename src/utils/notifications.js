import { loadFromStorage, saveToStorage } from './storage';
import { triggerHaptic } from './audio';

const STORAGE_KEY = 'notifications_config';

export const DEFAULT_NOTIF_CONFIG = {
  enabled: false,
  slots: {
    morning: true,
    noon: true,
    afternoon: true,
    night: true,
  },
  inAppToasts: true,
};

export function getStoredNotifConfig() {
  return loadFromStorage(STORAGE_KEY, DEFAULT_NOTIF_CONFIG);
}

export function saveStoredNotifConfig(config) {
  saveToStorage(STORAGE_KEY, config);
}

export function getNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission; // 'default' | 'granted' | 'denied'
}

export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (e) {
    console.warn('Erreur demande permission notifications:', e);
    return 'denied';
  }
}

/**
 * Envoie une notification système immédiate (via Service Worker ou API native)
 */
export async function sendSystemNotification({ title, body, icon = '/hayyin/logo.svg', tag = 'hayyin-reminder', tab = 'sanctuary' }) {
  triggerHaptic([50, 50]);

  // 1. Essai via Service Worker (Recommandé pour PWA mobile)
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        await reg.showNotification(title, {
          body,
          icon,
          badge: icon,
          tag,
          vibrate: [100, 50, 100],
          data: { url: `/hayyin/?tab=${tab}` }
        });
        return { success: true, type: 'serviceWorker' };
      }
    } catch (err) {
      console.warn('Erreur notification serviceWorker:', err);
    }
  }

  // 2. Fallback via API Notification classique
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const notif = new Notification(title, {
        body,
        icon,
        tag,
      });
      notif.onclick = () => {
        window.focus();
        notif.close();
      };
      return { success: true, type: 'native' };
    } catch (err) {
      console.warn('Erreur notification native:', err);
    }
  }

  return { success: false, type: 'failed' };
}

/**
 * Planifie les rappels quotidiens
 */
export function startNotificationScheduler(slots, config, onNotificationFired) {
  if (!config.enabled) return () => {};

  // Vérifier chaque minute si l'heure actuelle correspond à un créneau activé
  let lastFiredDateSlot = {};

  const checkAndFire = () => {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMinutes}`;
    const todayStr = now.toISOString().slice(0, 10);

    slots.forEach((slot) => {
      if (config.slots[slot.id]) {
        const slotKey = `${todayStr}_${slot.id}`;
        // Si l'heure correspond et qu'on ne l'a pas encore déclenchée aujourd'hui
        if (slot.time === currentTimeStr && !lastFiredDateSlot[slotKey]) {
          lastFiredDateSlot[slotKey] = true;
          sendSystemNotification({
            title: slot.title,
            body: slot.body,
            tag: `hayyin-${slot.id}`,
            tab: slot.tab,
          });
          if (onNotificationFired) {
            onNotificationFired(slot);
          }
        }
      }
    });
  };

  checkAndFire();
  const intervalId = setInterval(checkAndFire, 30000); // vérifie toutes les 30s
  return () => clearInterval(intervalId);
}
