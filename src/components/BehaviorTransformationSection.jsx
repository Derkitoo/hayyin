import React, { useState } from 'react';
import { 
  Trophy, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  HeartHandshake, 
  X, 
  Plus, 
  Trash2, 
  Share2, 
  AlertTriangle,
  Award,
  BookOpen
} from 'lucide-react';
import { SILAT_ALLAH_HADITH, DAILY_BEHAVIOR_CONTRACTS, REDEMPTION_STEPS } from '../data/behaviorData';
import { triggerHaptic, playHarmonicTone, shareContent } from '../utils/audio';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export default function BehaviorTransformationSection({ soundEnabled }) {
  const todayKey = new Date().toISOString().slice(0, 10);

  // Contrat sélectionné aujourd'hui
  const [selectedContractId, setSelectedContractId] = useState(() => {
    return loadFromStorage('active_contract_id', DAILY_BEHAVIOR_CONTRACTS[0].id);
  });

  // État de validation du contrat du jour
  const [contractHonoredToday, setContractHonoredToday] = useState(() => {
    return loadFromStorage(`contract_honored_${todayKey}`, false);
  });

  // Liste des victoires sur l'ego
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

  // Modal d'ajout de victoire
  const [isAddingVictory, setIsAddingVictory] = useState(false);
  const [newSituation, setNewSituation] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newPillar, setNewPillar] = useState('Hayyin (Posé)');

  // Modal Protocole de Rachat (J'ai glissé)
  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);
  const [redemptionStepIndex, setRedemptionStepIndex] = useState(0);

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
    const text = `Victoire sur l'Ego • HAYYIN :\n\nFace à l'épreuve : "${v.situation}"\nRéponse prophétique : "${v.action}" (${v.pillar})\n\n« La marchandise d'Allah est précieuse, la marchandise d'Allah est le Paradis. »\n${window.location.href}`;
    await shareContent({
      title: "Victoire sur l'Ego • HAYYIN",
      text,
      url: window.location.href
    });
  };

  return (
    <div className="space-y-6">

      {/* ========================================================= */}
      {/* 1. BANNIÈRE SOLENNELLE : LA MARCHANDISE D'ALLAH EST LE PARADIS */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 border border-amber-400/40 shadow-xl space-y-3 relative overflow-hidden transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/30 pb-3">
          <span className="text-[10px] uppercase font-bold text-amber-300 tracking-widest bg-amber-900/60 px-3 py-1 rounded-full border border-amber-400/30">
            La Règle d'Or • سِلْعَةُ اللَّهِ غَالِيَةٌ
          </span>
          <span className="text-xs text-amber-300/80 font-mono">
            {SILAT_ALLAH_HADITH.source}
          </span>
        </div>

        <div className="bg-stone-950/70 p-4 rounded-2xl border border-amber-400/30 text-center">
          <p className="font-serif text-lg sm:text-2xl text-amber-200 leading-relaxed dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
            {SILAT_ALLAH_HADITH.arabic}
          </p>
        </div>

        <p className="text-sm sm:text-base text-stone-200 leading-relaxed italic text-center">
          {SILAT_ALLAH_HADITH.french}
        </p>

        <p className="text-xs text-stone-300/90 leading-relaxed text-center max-w-2xl mx-auto pt-1">
          {SILAT_ALLAH_HADITH.insight}
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setIsRedemptionOpen(true)}
            className="bg-gradient-to-r from-rose-800 to-rose-900 hover:from-rose-700 hover:to-rose-800 text-rose-100 border border-rose-600/50 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md active:scale-95 transition-all"
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>J'ai glissé aujourd'hui (Protocole de Rachat)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. LE CONTRAT COMPORTEMENTAL DU JOUR (ENGAGEMENT PRÉCIS) */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-5 transition-colors">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3.5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-300 tracking-wider bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                Action Tangible • عَقْدُ اليَوْمِ
              </span>
              <span className="text-xs text-stone-400 font-mono">1 Défi Ciblé</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-1">
              Mon Contrat Comportemental du Jour
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Le prix du Paradis se paie par un comportement précis dompté chaque jour
            </p>
          </div>

          <button
            onClick={handleToggleContractHonored}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm active:scale-95 border ${
              contractHonoredToday
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-700 hover:border-emerald-500'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{contractHonoredToday ? 'Contrat Honoré Aujourd\'hui ✅' : 'Valider mon contrat du jour'}</span>
          </button>
        </div>

        {/* Sélecteur de contrats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {DAILY_BEHAVIOR_CONTRACTS.map((contract) => {
            const isSelected = selectedContractId === contract.id;
            return (
              <button
                key={contract.id}
                onClick={() => handleSelectContract(contract.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-700 shadow-md scale-[1.02]'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400/40'
                }`}
              >
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md block mb-1.5 w-fit ${
                  isSelected ? 'bg-emerald-700 text-amber-300' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                }`}>
                  {contract.pillar}
                </span>
                <p className="font-bold text-xs line-clamp-1">{contract.title}</p>
              </button>
            );
          })}
        </div>

        {/* Détail du contrat actif */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wide">
              {activeContract.title}
            </span>
            <span className="text-[11px] text-amber-800 dark:text-amber-400 font-semibold">
              {activeContract.categoryLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
            {activeContract.description}
          </p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. LE JOURNAL DES VICTOIRES SUR L'EGO (MUJĀHADA)         */}
      {/* ========================================================= */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-5 transition-colors">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3.5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 tracking-wider bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">
                L'Armure Sacrée • مُجَاهَدَةُ النَّفْسِ
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {victories.length} Victoire{victories.length > 1 ? 's' : ''}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-1 flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Le Journal des Victoires sur l'Ego</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Note chaque moment où tu as étouffé ta colère pour acheter la marchandise d'Allah
            </p>
          </div>

          <button
            onClick={() => setIsAddingVictory(true)}
            className="px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-sm active:scale-95 flex items-center justify-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Enregistrer une Victoire</span>
          </button>
        </div>

        {/* Modal d'ajout de victoire */}
        {isAddingVictory && (
          <form onSubmit={handleSaveVictory} className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-amber-400/40 space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
              <h3 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Raconter ta victoire d'aujourd'hui</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingVictory(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
                1. Quelle était la contrariété ou l'attaque de l'ego ?
              </label>
              <input
                type="text"
                value={newSituation}
                onChange={(e) => setNewSituation(e.target.value)}
                placeholder="Ex : Un automobiliste m'a coupé la route en m'insultant..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
                2. Comment as-tu désarmé ton ego et appliqué la douceur ?
              </label>
              <textarea
                value={newAction}
                onChange={(e) => setNewAction(e.target.value)}
                placeholder="Ex : J'ai gardé le silence, récité l'istighfar et souri au lieu de klaxonner..."
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:ring-2 focus:ring-amber-400 outline-none resize-none"
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-stone-500">Vertu appliquée :</span>
                <select
                  value={newPillar}
                  onChange={(e) => setNewPillar(e.target.value)}
                  className="px-2 py-1 text-xs rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-100 outline-none"
                >
                  <option value="Hayyin (Posé)">Hayyin (Posé)</option>
                  <option value="Layyin (Doux)">Layyin (Doux)</option>
                  <option value="Qarîb (Proche)">Qarîb (Proche)</option>
                  <option value="Sahl (Facile)">Sahl (Facile)</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
              >
                Sauvegarder ma Victoire
              </button>
            </div>
          </form>
        )}

        {/* Liste des victoires enregistrées */}
        {victories.length === 0 ? (
          <div className="text-center py-8 text-xs text-stone-400 italic">
            Aucune victoire enregistrée pour le moment. Dès que tu étouffes un énervement, note-le ici !
          </div>
        ) : (
          <div className="space-y-3">
            {victories.map((v) => (
              <div 
                key={v.id}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-2.5 transition-all hover:border-amber-400/40"
              >
                <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-stone-700/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-800">
                      {v.pillar}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{v.date}</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleShareVictory(v)}
                      className="p-1 rounded-lg text-stone-400 hover:text-emerald-700 dark:hover:text-amber-300"
                      title="Partager cette victoire"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteVictory(v.id)}
                      className="p-1 rounded-lg text-stone-400 hover:text-rose-600"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-stone-500 dark:text-stone-400">
                    <strong className="text-stone-700 dark:text-stone-300">L'épreuve : </strong> {v.situation}
                  </p>
                  <p className="text-emerald-950 dark:text-emerald-300 font-medium">
                    <strong className="text-emerald-800 dark:text-emerald-400">La victoire du Rifq : </strong> {v.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 4. MODAL DU PROTOCOLE DE RACHAT IMMÉDIAT (J'AI GLISSÉ)     */}
      {/* ========================================================= */}
      {isRedemptionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-stone-900 border border-rose-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 text-white relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-rose-950 text-rose-300 flex items-center justify-center font-bold border border-rose-700">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-100">
                    Protocole de Rachat Immédiat
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    « Fais suivre la mauvaise action par une bonne qui l'efface »
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsRedemptionOpen(false)}
                className="p-1.5 rounded-xl bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed bg-rose-950/40 p-3.5 rounded-2xl border border-rose-900/60">
              Trébucher fait partie de la condition humaine. Ce qui différencie le croyant noble de l'orgueilleux, c'est la rapidité du repentir et de la réparation. Ne dors pas sur une parole dure.
            </p>

            {/* Étapes de rachat */}
            <div className="space-y-3">
              {REDEMPTION_STEPS.map((step) => (
                <div key={step.step} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                  <h4 className="font-bold text-xs text-amber-300">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  triggerHaptic(20);
                  setIsRedemptionOpen(false);
                }}
                className="px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 active:scale-95 shadow-md"
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
