import React, { useState } from 'react';
import { Sparkles, CheckCircle, MessageSquare, Download, Trash2, FileText, Share2 } from 'lucide-react';
import { PILLARS } from '../data/tafsirData';
import { exportJournalAsTxt, exportAllDataAsJson } from '../utils/storage';
import { triggerHaptic, playHarmonicTone, shareContent } from '../utils/audio';

export default function TrackerTab({
  ratings,
  setRatings,
  savedEntries,
  setSavedEntries,
  soundEnabled
}) {
  const [journalNote, setJournalNote] = useState('');
  const [journalTag, setJournalTag] = useState('Famille');

  // Score global (0 à 100)
  const totalScore = Math.round(
    ((ratings.qarib + ratings.hayyin + ratings.layyin + ratings.sahl) / 20) * 100
  );

  const handleSaveAssessment = () => {
    if (!journalNote.trim()) return;
    triggerHaptic([30, 50, 30]);
    if (soundEnabled) {
      playHarmonicTone(523.25, 'sine', 0.4, 0.12);
    }

    const newEntry = {
      id: Date.now(),
      date: "Aujourd'hui, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tag: journalTag,
      score: totalScore,
      note: journalNote.trim()
    };
    setSavedEntries([newEntry, ...savedEntries]);
    setJournalNote('');
  };

  const handleDeleteEntry = (id) => {
    triggerHaptic(30);
    setSavedEntries(savedEntries.filter(e => e.id !== id));
  };

  const handleShareEntry = async (entry) => {
    triggerHaptic(25);
    const text = `[HAYYIN - Carnet de Douceur]\nSérénité: ${entry.score}% (${entry.tag})\n« ${entry.note} »\nhttps://derkitoo.github.io/hayyin/`;
    await shareContent({
      title: "Réflexion HAYYIN",
      text,
      url: window.location.href
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Résumé de l'alignement */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 dark:from-stone-950 dark:via-emerald-950 dark:to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/40">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[11px] uppercase font-bold text-amber-300 tracking-wider bg-emerald-800/60 dark:bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-600/40 inline-block">
            Auto-examen quotidien • Muhasaba
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Votre Baromètre de Douceur</h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 dark:text-stone-300 max-w-lg leading-relaxed">
            « Le croyant s'examine constamment. » Évaluez votre disposition d'esprit aujourd'hui pour ancrer l'interdiction au Feu dans votre comportement.
          </p>
        </div>

        <div className="flex items-center space-x-5 bg-emerald-900/60 dark:bg-stone-900/80 border border-emerald-500/30 p-5 rounded-2xl backdrop-blur shrink-0">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-300 tracking-tight">{totalScore}%</div>
            <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Douceur Globale</span>
          </div>
          <div className="h-14 w-px bg-emerald-700/60" />
          <div className="text-xs text-emerald-100 dark:text-stone-200 max-w-[140px] leading-snug">
            {totalScore >= 80 
              ? "Excellente sérénité. Une présence chaleureuse pour vos proches." 
              : totalScore >= 60 
              ? "Bonne disposition. Quelques moments de crispation à tempérer." 
              : "Journée éprouvante. Prenez un temps de respiration et de pardon."}
          </div>
        </div>
      </div>

      {/* Curseurs interactifs */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="font-bold text-stone-900 dark:text-stone-100 text-base">Évaluation des 4 Piliers Prophétiques</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Déplacez chaque curseur selon votre attitude au cours des dernières 24 heures :</p>
        </div>

        <div className="space-y-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="bg-stone-50/80 dark:bg-stone-800/50 p-4 sm:p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">{pillar.nameFr}</span>
                    <span className="font-serif text-emerald-800 dark:text-emerald-400 text-sm font-bold">{pillar.nameAr}</span>
                  </div>
                  <span className="text-xs text-stone-500 dark:text-stone-400">{pillar.subtitle}</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300/50 dark:border-emerald-700/50">
                  {ratings[pillar.id]} / 5
                </span>
              </div>

              <div className="space-y-1">
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  step="1"
                  value={ratings[pillar.id]}
                  onChange={(e) => {
                    triggerHaptic(15);
                    setRatings({ ...ratings, [pillar.id]: parseInt(e.target.value) });
                  }}
                  className="w-full accent-emerald-700 dark:accent-emerald-500 cursor-pointer h-2 bg-stone-200 dark:bg-stone-700 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-stone-400 dark:text-stone-500 font-medium px-0.5">
                  <span>1 • Rude ou distant</span>
                  <span>3 • Équilibré</span>
                  <span>5 • Pleine mansuétude</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journal personnel */}
        <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              Note d'Introspection & Situation Vécue :
            </label>
            <div className="flex space-x-1.5 text-xs">
              {['Famille', 'Travail', 'Commerce', 'Réseaux', 'Route'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    triggerHaptic(15);
                    setJournalTag(tag);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    journalTag === tag 
                      ? 'bg-emerald-800 dark:bg-emerald-700 text-white' 
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <textarea 
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            placeholder="Ex : 'Aujourd'hui, j'ai été contrarié par un retard imprévu, mais au lieu de reprocher durement l'incident, j'ai choisi de faciliter la tâche avec douceur...'"
            rows={3}
            className="w-full p-3.5 rounded-2xl border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:focus:ring-emerald-500 text-xs sm:text-sm text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-800/70"
          />

          <div className="flex justify-between items-center pt-1">
            <span className="text-[11px] text-stone-400 dark:text-stone-500">
              💾 Sauvegarde automatique dans votre navigateur
            </span>
            <button
              onClick={handleSaveAssessment}
              disabled={!journalNote.trim()}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 ${
                journalNote.trim() 
                  ? 'bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white cursor-pointer active:scale-95' 
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Enregistrer dans mon carnet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Historique des réflexions & Outils d'exportation */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Vos Victoires Intérieures & Carnet de Notes</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                triggerHaptic(25);
                exportJournalAsTxt(savedEntries);
              }}
              disabled={savedEntries.length === 0}
              className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-40"
              title="Télécharger le carnet en fichier texte"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export .TXT</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic(25);
                exportAllDataAsJson({ ratings, savedEntries, totalScore, exportedAt: new Date().toISOString() });
              }}
              className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl transition-colors"
              title="Exporter les données complètes (JSON)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sauvegarde JSON</span>
            </button>
          </div>
        </div>

        {savedEntries.length === 0 ? (
          <p className="text-xs text-stone-400 dark:text-stone-500 italic text-center py-6">
            Aucune note pour l'instant. Consignez votre première victoire sur vous-même ci-dessus !
          </p>
        ) : (
          <div className="space-y-3">
            {savedEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-stone-50 dark:bg-stone-800/50 border-l-4 border-emerald-700 dark:border-emerald-500 rounded-r-2xl space-y-2 text-xs transition-all hover:bg-stone-100/80 dark:hover:bg-stone-800">
                <div className="flex justify-between items-center text-stone-500 dark:text-stone-400 font-medium">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-stone-700 dark:text-stone-300">{entry.date}</span>
                    <span className="bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {entry.tag}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded-full font-extrabold text-[11px]">
                      {entry.score}% de sérénité
                    </span>
                    <button
                      onClick={() => handleShareEntry(entry)}
                      className="text-stone-400 hover:text-emerald-700 p-1"
                      title="Partager cette réflexion"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="Supprimer cette note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm leading-relaxed italic">
                  « {entry.note} »
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
