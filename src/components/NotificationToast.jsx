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
        className="bg-[#EDE8DE] dark:bg-[#19201D] text-[#1E3A2B] dark:text-[#EAE6DF] border border-[#DFD8CB] dark:border-[#25302A] rounded-[24px] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex items-start justify-between gap-3 cursor-pointer active:scale-95 transition-all"
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#F5F2EB] dark:bg-[#151B18] text-[#B89B72] dark:text-[#C4A97D] flex items-center justify-center shrink-0 mt-0.5 border border-[#DFD8CB] dark:border-[#2A3830]">
            <Bell className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-xs text-[#1E3A2B] dark:text-[#EAE6DF] tracking-wide">{toast.title}</span>
              <Sparkles className="w-3 h-3 text-[#B89B72]" />
            </div>
            <p className="text-xs text-[#55635C] dark:text-[#A7B5AD] leading-snug">{toast.body}</p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-[#827869] hover:text-[#1E3A2B] dark:hover:text-white p-1 rounded-full"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
