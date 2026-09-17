import React, { useState } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Plus, 
  Trash2, 
  Share2, 
  AlertTriangle,
  Award
} from 'lucide-react';
import { SILAT_ALLAH_HADITH, DAILY_BEHAVIOR_CONTRACTS, REDEMPTION_STEPS } from '../data/behaviorData';
import { triggerHaptic, playHarmonicTone, shareContent } from '../utils/audio';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export default function BehaviorTransformationSection({ soundEnabled }) {
  const todayKey = new Date().toISOString().slice(0, 10);

  const [selectedContractId, setSelectedContractId] = useState(() => {
    return loadFromStorage('active_contract_id', DAILY_BEHAVIOR_CONTRACTS[0].id);
  });

  const [contractHonoredToday, setContractHonoredToday] = useState(() => {
    return loadFromStorage(`contract_honored_${todayKey}`, false);
  });

  const initialVictories = [
    {
      id: 1,
      date: "Hier",
      situation: "Un collègue a remis en cause mon travail de façon agressive en réunion publique.",
      action: "Au lieu de piquer en retour, j'ai attendu 10 secondes, validé son point calmement et lui ai répondu en privé avec douceur. L'agressivité est retombée instantanément.",
      pillar: "Hayyin (Posé)"
    }
  ];

  const [victories, setVictories] = useState(() => {
    return loadFromStorage('ego_victories_list', initialVictories);
  });

  const [isAddingVictory, setIsAddingVictory] = useState(false);
  const [newSituation, setNewSituation] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newPillar, setNewPillar] = useState('Hayyin (Posé)');

  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);

  const activeContract = DAILY_BEHAVIOR_CONTRACTS.find(c => c.id === selectedContractId) || DAILY_BEHAVIOR_CONTRACTS[0];

  const handleSelectContract = (id) => {
    triggerHaptic(20);
    setSelectedContractId(id);
    saveToStorage('active_contract_id', id);
  };

  const handleToggleContractHonored = () => {
    triggerHaptic([40, 60, 40]);
    if (!contractHonoredToday) {
      if (soundEnabled) playHarmonicTone(659.25, 'sine', 0.5, 0.2);
      setContractHonoredToday(true);
      saveToStorage(`contract_honored_${todayKey}`, true);
    } else {
      setContractHonoredToday(false);
      saveToStorage(`contract_honored_${todayKey}`, false);
    }
  };

  const handleSaveVictory = (e) => {
    e.preventDefault();
    if (!newSituation.trim() || !newAction.trim()) return;

    triggerHaptic([50, 80, 50]);
    if (soundEnabled) playHarmonicTone(783.99, 'sine', 0.6, 0.2);

    const newEntry = {
      id: Date.now(),
      date: "Aujourd'hui, " + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      situation: newSituation.trim(),
      action: newAction.trim(),
      pillar: newPillar
    };

    const updated = [newEntry, ...victories];
    setVictories(updated);
    saveToStorage('ego_victories_list', updated);

    setNewSituation('');
    setNewAction('');
    setIsAddingVictory(false);
  };

  const handleDeleteVictory = (id) => {
    triggerHaptic(20);
    const updated = victories.filter(v => v.id !== id);
    setVictories(updated);
    saveToStorage('ego_victories_list', updated);
  };

  const handleShareVictory = async (v) => {
    triggerHaptic(30);
    const text = `Victoire sur l'Ego • HAYYIN :\n\nFace à l'épreuve : "${v.situation}"\nRéponse prophétique : "${v.action}" (${v.pillar})\n\n« La marchandise d'Allah est le Paradis. »\n${window.location.href}`;
    await shareContent({
      title: "Victoire sur l'Ego • HAYYIN",
      text,
      url: window.location.href
    });
  };

  return (
    <div className="space-y-4">

      {/* ========================================================= */}
      {/* 1. CARTE ÉPURÉE : LA MARCHANDISE D'ALLAH EST LE PARADIS   */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] p-5 sm:p-7 border border-[#DFD8CB]/80 dark:border-[#242E29] shadow-sm space-y-3 transition-all text-center">
        <span className="text-[10px] uppercase font-bold text-[#B89B72] tracking-wider">
          La Règle d'Or • سِلْعَةُ اللَّهِ غَالِيَةٌ
        </span>

        <p className="font-serif text-lg sm:text-2xl text-[#1E3A2B] dark:text-[#A7D1BA] leading-loose dir-rtl" dir="rtl" style={{ fontFamily: 'Amiri, serif' }}>
          {SILAT_ALLAH_HADITH.arabic}
        </p>

        <p className="text-xs sm:text-sm text-[#1E3A2B]/85 dark:text-[#EDE8DE]/85 font-light italic max-w-md mx-auto">
          « {SILAT_ALLAH_HADITH.french} »
        </p>

        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-sm mx-auto">
          Le Paradis s'achète par le domptage réel de son ego, pas par de vains souhaits.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setIsRedemptionOpen(true)}
            className="text-[11px] font-medium text-[#1E3A2B] dark:text-[#EDE8DE] bg-[#F5F2EB] dark:bg-[#111614] border border-[#DFD8CB]/80 dark:border-[#242E29] px-4 py-2 rounded-full hover:bg-[#E5DFD3] transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#B89B72]" strokeWidth={1.5} />
            <span>J'ai commis une rudesse (Protocole de Rachat)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. LE CONTRAT COMPORTEMENTAL DU JOUR                       */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] p-5 sm:p-7 border border-[#DFD8CB]/80 dark:border-[#242E29] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DFD8CB]/60 dark:border-[#242E29] pb-3">
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-[#1E3A2B] dark:text-[#EDE8DE]">
              Mon Contrat Comportemental
            </h3>
            <p className="text-[10px] text-stone-400 font-light">
              1 défi précis à valider aujourd'hui
            </p>
          </div>

          <button
            onClick={handleToggleContractHonored}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all flex items-center space-x-1.5 shadow-sm ${
              contractHonoredToday
                ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614]'
                : 'bg-[#F5F2EB] dark:bg-[#111614] border border-[#DFD8CB] dark:border-[#242E29] text-[#1E3A2B] dark:text-[#EDE8DE] hover:bg-[#E5DFD3]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{contractHonoredToday ? 'Contrat Honoré ✓' : 'Valider ce soir'}</span>
          </button>
        </div>

        {/* 6 Boutons de sélection épurés */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {DAILY_BEHAVIOR_CONTRACTS.map((contract) => {
            const isSelected = selectedContractId === contract.id;
            return (
              <button
                key={contract.id}
                onClick={() => handleSelectContract(contract.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] font-semibold shadow-sm'
                    : 'bg-[#F5F2EB] dark:bg-[#111614] border-[#DFD8CB]/60 dark:border-[#242E29] text-[#1E3A2B]/80 dark:text-[#EDE8DE]/80'
                }`}
              >
                <span className="text-[9px] block opacity-70 uppercase tracking-tight">{contract.pillar}</span>
                <p className="text-[11px] font-medium truncate mt-0.5">{contract.title}</p>
              </button>
            );
          })}
        </div>

        {/* Détail du contrat actif */}
        <div className="p-4 rounded-2xl bg-[#F5F2EB] dark:bg-[#111614] border border-[#DFD8CB]/60 dark:border-[#242E29] text-xs space-y-1">
          <span className="font-semibold text-[#1E3A2B] dark:text-[#EDE8DE] block text-[11px]">
            {activeContract.title}
          </span>
          <p className="text-stone-600 dark:text-stone-300 font-light leading-relaxed text-[11px]">
            {activeContract.description}
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. LE JOURNAL DES VICTOIRES SUR L'EGO                     */}
      {/* ========================================================= */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] p-5 sm:p-7 border border-[#DFD8CB]/80 dark:border-[#242E29] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DFD8CB]/60 dark:border-[#242E29] pb-3">
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-[#1E3A2B] dark:text-[#EDE8DE]">
              Mes Victoires sur l'Ego
            </h3>
            <p className="text-[10px] text-stone-400 font-light">
              {victories.length} énervement{victories.length > 1 ? 's' : ''} désamorcé{victories.length > 1 ? 's' : ''}
            </p>
          </div>

          <button
            onClick={() => setIsAddingVictory(true)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Noter</span>
          </button>
        </div>

        {/* Formulaire d'ajout épuré */}
        {isAddingVictory && (
          <form onSubmit={handleSaveVictory} className="p-4 rounded-2xl bg-[#F5F2EB] dark:bg-[#111614] border border-[#DFD8CB]/80 dark:border-[#242E29] space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-1 border-b border-[#DFD8CB]/50">
              <span className="text-xs font-semibold text-[#1E3A2B] dark:text-[#EDE8DE]">Consigner une victoire</span>
              <button type="button" onClick={() => setIsAddingVictory(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                L'épreuve ou l'attaque de l'ego :
              </label>
              <input
                type="text"
                value={newSituation}
                onChange={(e) => setNewSituation(e.target.value)}
                placeholder="Ex : Un collègue m'a coupé la parole..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#19201D] border border-[#DFD8CB] dark:border-[#242E29] text-[#1E3A2B] dark:text-[#EDE8DE] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                Comment as-tu appliqué la douceur ?
              </label>
              <textarea
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="Ex : J'ai gardé le silence, j'ai souri et répondu avec calme..."
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#19201D] border border-[#DFD8CB] dark:border-[#242E29] text-[#1E3A2B] dark:text-[#EDE8DE] outline-none resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <select
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value)}
                className="px-2 py-1 text-xs rounded-lg bg-white dark:bg-[#19201D] border border-[#DFD8CB] dark:border-[#242E29] text-[#1E3A2B] dark:text-[#EDE8DE] outline-none"
              >
                <option value="Hayyin (Posé)">Hayyin (Posé)</option>
                <option value="Layyin (Doux)">Layyin (Doux)</option>
                <option value="Qarîb (Proche)">Qarîb (Proche)</option>
                <option value="Sahl (Facile)">Sahl (Facile)</option>
              </select>

              <button
                type="submit"
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614]"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}

        {/* Liste des victoires */}
        <div className="space-y-2">
          {victories.map((v) => (
            <div 
              key={v.id}
              className="p-3.5 rounded-2xl bg-[#F5F2EB] dark:bg-[#111614] border border-[#DFD8CB]/60 dark:border-[#242E29] space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between text-[10px] text-stone-400">
                <span className="font-semibold text-[#B89B72]">{v.pillar} • {v.date}</span>
                <div className="flex items-center space-x-1">
                  <button onClick={() => handleShareVictory(v)} className="p-1 hover:text-[#1E3A2B]">
                    <Share2 className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDeleteVictory(v.id)} className="p-1 hover:text-rose-500">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <p className="text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                <strong className="font-medium text-[#1E3A2B] dark:text-[#EDE8DE]">Épreuve : </strong>{v.situation}
              </p>
              <p className="text-[#1E3A2B] dark:text-[#A7D1BA] font-medium leading-relaxed">
                <strong>Réponse : </strong>{v.action}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL PROTOCOLE DE RACHAT */}
      {isRedemptionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#F5F2EB] dark:bg-[#141A17] border border-[#DFD8CB] dark:border-[#242E29] rounded-[36px] max-w-md w-full p-6 sm:p-7 text-[#1E3329] dark:text-[#EDE8DE] relative shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#DFD8CB]/60 dark:border-[#242E29] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#1E3A2B] dark:text-[#EDE8DE]">
                  Protocole de Rachat Immédiat
                </h3>
                <p className="text-[10px] text-stone-400 font-light">
                  « Fais suivre la mauvaise action par une bonne qui l'efface »
                </p>
              </div>

              <button onClick={() => setIsRedemptionOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {REDEMPTION_STEPS.map((step) => (
                <div key={step.step} className="p-3.5 rounded-2xl bg-white dark:bg-[#19201D] border border-[#DFD8CB]/60 dark:border-[#242E29] space-y-1">
                  <span className="font-bold text-[11px] text-[#B89B72]">
                    {step.title}
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  triggerHaptic(20);
                  setIsRedemptionOpen(false);
                }}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-[#1E3A2B] dark:bg-[#B89B72] text-white dark:text-[#111614] shadow-sm"
              >
                J'applique ce remède maintenant
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
