import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  MessageSquare, 
  Download, 
  Trash2, 
  FileText, 
  Share2, 
  ShieldCheck, 
  HelpCircle,
  Award,
  ChevronRight
} from 'lucide-react';
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

  // Score global (0 à 100%)
  const totalScore = Math.round(
    ((ratings.qarib + ratings.hayyin + ratings.layyin + ratings.sahl) / 20) * 100
  );

  // Trouver la vertu la plus faible pour offrir un conseil prophétique sur-mesure
  const getLowestPillar = () => {
    const list = [
      { id: 'qarib', val: ratings.qarib, name: 'Qarîb (Proximité)', tip: "Travaille le sourire spontané et prends l'initiative de saluer en premier sans attendre qu'on vienne à toi." },
      { id: 'hayyin', val: ratings.hayyin, name: 'Hayyin (Sérénité)', tip: "Face à la contrariété, impose-toi la règle d'or des 10 secondes de silence avant toute réaction." },
      { id: 'layyin', val: ratings.layyin, name: 'Layyin (Délicatesse)', tip: "Bannis le sarcasme et les reproches vifs. Si tu dois corriger quelqu'un, fais-le en tête-à-tête avec tendresse." },
      { id: 'sahl', val: ratings.sahl, name: 'Sahl (Facilité)', tip: "Apprends à faire des concessions volontaires sur les détails matériels pour acquérir le palais au Paradis." }
    ];
    list.sort((a, b) => a.val - b.val);
    return list[0];
  };

  const lowestPillar = getLowestPillar();

  // Questions comportementales d'auto-examen
  const BEHAVIORAL_QUESTIONS = {
    qarib: {
      question: "As-tu brisé la morgue et accueilli les gens avec chaleur et écoute sans te montrer distant ?",
      options: [
        { label: "Glissade : Visage fermé ou hautain", val: 1 },
        { label: "Moyen : Poli mais réservé", val: 3 },
        { label: "Incarné : Souriant, accessible et chaleureux", val: 5 }
      ]
    },
    hayyin: {
      question: "Face aux contrariétés ou au stress du jour, as-tu su garder ton calme sans hausser la voix ?",
      options: [
        { label: "Glissade : Voix haussée ou emportement", val: 1 },
        { label: "Moyen : Irritation contenue mais visible", val: 3 },
        { label: "Incarné : Sérénité, dignité et maîtrise de soi", val: 5 }
      ]
    },
    layyin: {
      question: "As-tu purifié ta langue de tout sarcasme, pique blessante ou coupure de parole aujourd'hui ?",
      options: [
        { label: "Glissade : Pique, reproche dur ou sarcasme", val: 1 },
        { label: "Moyen : Parole parfois un peu sèche", val: 3 },
        { label: "Incarné : Mots choisis avec douceur et respect", val: 5 }
      ]
    },
    sahl: {
      question: "As-tu fait une concession volontaire, renoncé à une querelle ou pardonné une maladresse ?",
      options: [
        { label: "Glissade : Obstination ou rancune tenace", val: 1 },
        { label: "Moyen : Concession avec réticence", val: 3 },
        { label: "Incarné : Facile à vivre, clément et arrangeant", val: 5 }
      ]
    }
  };

  const handleSaveAssessment = () => {
    if (!journalNote.trim()) return;
    triggerHaptic([30, 50, 30]);
    if (soundEnabled) {
      playHarmonicTone(523.25, 'sine', 0.4, 0.12);
    }

    const newEntry = {
      id: Date.now(),
      date: "Aujourd'hui, " + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
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
    const text = `[HAYYIN - Carnet de Douceur]\nIndice d'Immunité : ${entry.score}% (${entry.tag})\n« ${entry.note} »\nhttps://derkitoo.github.io/hayyin/`;
    await shareContent({
      title: "Réflexion HAYYIN",
      text,
      url: window.location.href
    });
  };

  return (
    <div className="space-y-6">
      
      {/* RÉSUMÉ DE L'ALIGNEMENT & SCORE D'IMMUNITÉ */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 dark:from-stone-950 dark:via-emerald-950 dark:to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/40">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-amber-300 tracking-wider bg-emerald-800/60 dark:bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-600/40 inline-block">
            Examen Quotidien du Comportement • مُحَاسَبَةُ النَّفْسِ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Le Baromètre de Douceur</h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 dark:text-stone-300 max-w-lg leading-relaxed">
            « Jugez vos âmes avant d'être jugés. » Mesurez avec sincérité la qualité de vos rapports humains au cours des dernières 24 heures pour acheter la marchandise d'Allah.
          </p>
        </div>

        <div className="flex items-center space-x-5 bg-emerald-900/60 dark:bg-stone-900/80 border border-emerald-500/30 p-5 rounded-2xl backdrop-blur shrink-0">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-300 tracking-tight font-mono">{totalScore}%</div>
            <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Indice d'Immunité</span>
          </div>
          <div className="h-14 w-px bg-emerald-700/60" />
          <div className="text-xs text-emerald-100 dark:text-stone-200 max-w-[140px] leading-snug">
            {totalScore >= 80 
              ? "Excellente douceur. Tu incarnes le vêtement des préservés du Feu." 
              : totalScore >= 60 
              ? "Disposition honorable. Quelques crispations à désamorcer." 
              : "Journée d'épreuve. Prends le temps du pardon et de l'apaisement."}
          </div>
        </div>
      </div>

      {/* CONSEIL SPIRITUEL SUR-MESURE */}
      {totalScore < 100 && (
        <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 p-4 rounded-2xl flex items-start space-x-3 text-xs">
          <Sparkles className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-950 dark:text-amber-200">
              Conseil du Sheikh pour ton point d'effort actuel : {lowestPillar.name}
            </span>
            <p className="text-amber-900/90 dark:text-stone-300 leading-relaxed">
              {lowestPillar.tip}
            </p>
          </div>
        </div>
      )}

      {/* AUTO-EXAMEN DES 4 PILIERS COMPORTEMENTAUX */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-5 transition-colors">
        <div>
          <h2 className="font-bold text-stone-900 dark:text-stone-100 text-base">
            Les 4 Questions de Vérification Comportementale
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Positionnez votre curseur en toute lucidité face à Allah :
          </p>
        </div>

        <div className="space-y-4">
          {PILLARS.map((pillar) => {
            const currentRating = ratings[pillar.id] || 3;
            const inquiry = BEHAVIORAL_QUESTIONS[pillar.id];

            return (
              <div 
                key={pillar.id} 
                className="bg-stone-50/80 dark:bg-stone-800/50 p-4 sm:p-5 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-3"
              >
                {/* En-tête */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                        {pillar.nameFr}
                      </span>
                      <span className="font-serif text-emerald-800 dark:text-amber-300 text-base font-bold dir-rtl">
                        {pillar.nameAr}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-medium mt-0.5">
                      {inquiry.question}
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300/50 dark:border-emerald-700/50 shrink-0">
                    {currentRating} / 5
                  </span>
                </div>

                {/* Boutons d'état rapide */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {inquiry.options.map((opt) => {
                    const isSelected = currentRating === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => {
                          triggerHaptic(20);
                          setRatings({ ...ratings, [pillar.id]: opt.val });
                        }}
                        className={`p-2 rounded-xl text-[10px] sm:text-[11px] font-semibold transition-all text-center leading-tight ${
                          isSelected
                            ? 'bg-emerald-800 text-white shadow-sm font-bold'
                            : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {/* Curseur précis */}
                <div className="space-y-1 pt-1">
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1"
                    value={currentRating}
                    onChange={(e) => {
                      triggerHaptic(15);
                      setRatings({ ...ratings, [pillar.id]: parseInt(e.target.value) });
                    }}
                    className="w-full accent-emerald-700 dark:accent-amber-400 cursor-pointer h-2 bg-stone-200 dark:bg-stone-700 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 font-medium px-0.5">
                    <span>1 • Glissade</span>
                    <span>3 • Équilibré</span>
                    <span>5 • Pleine Mansuétude</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note d'introspection & Journal personnel */}
        <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wide">
              Note d'Introspection du Jour :
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
                      ? 'bg-emerald-800 dark:bg-amber-400 text-white dark:text-stone-950' 
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
            placeholder="Ex : 'Face à une remarque blessante au travail aujourd'hui, j'ai différé ma réponse de 10 secondes et appliqué la douceur au lieu de piquer en retour...'"
            rows={3}
            className="w-full p-3.5 rounded-2xl border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:focus:ring-amber-400 text-xs sm:text-sm text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-800/70"
          />

          <div className="flex justify-between items-center pt-1">
            <span className="text-[11px] text-stone-400 dark:text-stone-500">
              💾 Sauvegarde automatique dans votre appareil
            </span>
            <button
              onClick={handleSaveAssessment}
              disabled={!journalNote.trim()}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 ${
                journalNote.trim() 
                  ? 'bg-emerald-800 hover:bg-emerald-900 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-stone-950 cursor-pointer active:scale-95' 
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Enregistrer dans mon carnet</span>
            </button>
          </div>
        </div>
      </div>

      {/* HISTORIQUE DES RÉFLEXIONS & OUTILS D'EXPORTATION */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-7 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-emerald-700 dark:text-amber-400" />
            <span>Historique de Vos Notes de Conscience</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                triggerHaptic(25);
                exportJournalAsTxt(savedEntries);
              }}
              disabled={savedEntries.length === 0}
              className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-amber-300 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-40"
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
              className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-amber-300 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl transition-colors"
              title="Exporter les données complètes (JSON)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sauvegarde JSON</span>
            </button>
          </div>
        </div>

        {savedEntries.length === 0 ? (
          <p className="text-xs text-stone-400 dark:text-stone-500 italic text-center py-6">
            Aucune note pour l'instant. Consignez votre première auto-évaluation ci-dessus !
          </p>
        ) : (
          <div className="space-y-3">
            {savedEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-stone-50 dark:bg-stone-800/50 border-l-4 border-emerald-700 dark:border-amber-400 rounded-r-2xl space-y-2 text-xs transition-all hover:bg-stone-100/80 dark:hover:bg-stone-800">
                <div className="flex justify-between items-center text-stone-500 dark:text-stone-400 font-medium">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-stone-700 dark:text-stone-300">{entry.date}</span>
                    <span className="bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {entry.tag}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded-full font-extrabold text-[11px]">
                      {entry.score}% d'immunité
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
