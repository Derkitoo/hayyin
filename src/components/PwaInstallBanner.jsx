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
    <div className="bg-[#EDE8DE] dark:bg-[#19201D] text-[#1E3A2B] dark:text-[#EAE6DF] px-4 py-2.5 border-b border-[#DFD8CB]/80 dark:border-[#25302A] shadow-sm relative animate-fadeIn text-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <img src="/hayyin/logo.svg" alt="HAYYIN" className="w-8 h-8 rounded-full border border-[#DFD8CB] dark:border-[#2A3830] shrink-0" />
          <div className="leading-tight">
            <p className="font-serif font-bold text-[#1E3A2B] dark:text-[#EAE6DF]">Installer HAYYIN sur votre téléphone</p>
            <p className="text-[11px] text-[#827869] dark:text-[#8E9B93]">
              {isIos ? "Touchez Partager ⎋ puis 'Sur l'écran d'accueil' ＋" : "Accès instantané 100% hors-ligne en 1 clic"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {!isIos && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] font-bold px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Installer</span>
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-[#DFD8CB]/60 dark:hover:bg-[#25302A] text-[#827869] dark:text-[#8E9B93] transition-colors"
            aria-label="Fermer la bannière"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
