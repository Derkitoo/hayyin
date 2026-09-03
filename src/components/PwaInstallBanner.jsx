import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

export default function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Vérifier si déjà installée en mode standalone
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Vérifier si déjà fermée dans cette session
    const dismissed = sessionStorage.getItem('hayyin_pwa_dismissed');
    if (dismissed) setIsDismissed(true);

    // Détection iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Détection Android / Chrome beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    triggerHaptic(30);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleDismiss = () => {
    triggerHaptic(20);
    setIsDismissed(true);
    sessionStorage.setItem('hayyin_pwa_dismissed', 'true');
  };

  if (isStandalone || isDismissed) return null;
  if (!deferredPrompt && !isIos) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white px-4 py-3 border-b border-emerald-700/50 shadow-md relative animate-fadeIn text-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <img src="/hayyin/logo.svg" alt="HAYYIN" className="w-9 h-9 rounded-xl shadow-sm shrink-0" />
          <div className="leading-tight">
            <p className="font-bold text-amber-200">Installer HAYYIN sur votre téléphone</p>
            <p className="text-[11px] text-emerald-200/90">
              {isIos ? "Touchez Partager ⎋ puis 'Sur l'écran d'accueil' ＋" : "Accès instantané 100% hors-ligne en 1 clic"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {!isIos && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold px-3 py-1.5 rounded-xl text-[11px] uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Installer</span>
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-emerald-300 hover:text-white"
            aria-label="Fermer la bannière"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
