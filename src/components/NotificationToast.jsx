import React, { useEffect } from 'react';
import { Bell, X, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../utils/audio';

export default function NotificationToast({ toast, onDismiss, onNavigate }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const handleClick = () => {
    triggerHaptic(20);
    if (toast.tab && onNavigate) {
      onNavigate(toast.tab);
    }
    onDismiss();
  };

  return (
    <div className="fixed top-14 left-4 right-4 z-50 max-w-md mx-auto animate-fadeIn">
      <div 
        onClick={handleClick}
        className="bg-stone-900/95 dark:bg-emerald-950/95 backdrop-blur-md text-white border border-amber-400/40 rounded-2xl p-3.5 shadow-2xl flex items-start justify-between gap-3 cursor-pointer active:scale-95 transition-all"
      >
        <div className="flex items-start space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/30">
            <Bell className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-xs text-amber-300 tracking-wide">{toast.title}</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <p className="text-xs text-stone-200 leading-snug">{toast.body}</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-stone-400 hover:text-white p-1"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
