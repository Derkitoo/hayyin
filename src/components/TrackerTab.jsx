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
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] text-[#1E3A2B] dark:text-[#EAE6DF] rounded-[36px] p-6 sm:p-8 border border-[#DFD8CB] dark:border-[#25302A] shadow-[0_12px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-[#B89B72] dark:text-[#C4A97D] tracking-widest bg-[#F5F2EB] dark:bg-[#151B18] px-3 py-1 rounded-full border border-[#DFD8CB] dark:border-[#2A3830] inline-block">
            Examen Quotidien du Comportement • مُحَاسَبَةُ النَّفْسِ
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif tracking-tight">Le Baromètre de Douceur</h2>
          <p className="text-xs sm:text-sm text-[#827869] dark:text-[#8E9B93] max-w-lg leading-relaxed">
            « Jugez vos âmes avant d'être jugés. » Mesurez avec sincérité la qualité de vos rapports humains au cours des dernières 24 heures pour acheter la marchandise d'Allah.
          </p>
        </div>

        <div className="flex items-center space-x-5 bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#25302A] p-5 sm:p-6 rounded-[24px] shrink-0">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-extrabold text-[#1E3A2B] dark:text-[#A7D1BA] tracking-tight font-mono">{totalScore}%</div>
            <span className="text-[10px] text-[#B89B72] dark:text-[#C4A97D] uppercase font-bold tracking-wider">Indice d'Immunité</span>
          </div>
          <div className="h-14 w-px bg-[#DFD8CB] dark:bg-[#25302A]" />
          <div className="text-xs text-[#55635C] dark:text-[#A7B5AD] max-w-[140px] leading-snug">
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
        <div className="bg-[#EDE8DE] dark:bg-[#19201D] border border-[#DFD8CB] dark:border-[#25302A] p-5 rounded-[24px] flex items-start space-x-3 text-xs shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <Sparkles className="w-5 h-5 text-[#B89B72] dark:text-[#C4A97D] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#1E3A2B] dark:text-[#EAE6DF]">
              Conseil du Sheikh pour ton point d'effort actuel : {lowestPillar.name}
            </span>
            <p className="text-[#685F51] dark:text-[#8E9B93] leading-relaxed">
              {lowestPillar.tip}
            </p>
          </div>
        </div>
      )}

      {/* AUTO-EXAMEN DES 4 PILIERS COMPORTEMENTAUX */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6 transition-colors">
        <div>
          <h2 className="font-serif text-[#1E3A2B] dark:text-[#EAE6DF] text-xl">
            Les 4 Questions de Vérification Comportementale
          </h2>
          <p className="text-xs text-[#827869] dark:text-[#8E9B93] mt-0.5">
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
                className="bg-[#F5F2EB] dark:bg-[#151B18] p-5 sm:p-6 rounded-[24px] border border-[#DFD8CB]/80 dark:border-[#25302A] space-y-3.5"
              >
                {/* En-tête */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-serif font-bold text-[#1E3A2B] dark:text-[#EAE6DF] text-sm sm:text-base">
                        {pillar.nameFr}
                      </span>
                      <span className="font-serif text-[#B89B72] dark:text-[#C4A97D] text-base font-bold dir-rtl">
                        {pillar.nameAr}
                      </span>
                    </div>
                    <p className="text-xs text-[#55635C] dark:text-[#A7B5AD] font-medium mt-0.5">
                      {inquiry.question}
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-[#1E3A2B] dark:text-[#A7D1BA] bg-[#EDE8DE] dark:bg-[#1E2723] px-3.5 py-1 rounded-full border border-[#DFD8CB] dark:border-[#2A3830] shrink-0 font-mono">
                    {currentRating} / 5
                  </span>
                </div>

                {/* Boutons d'état rapide */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {inquiry.options.map((opt) => {
                    const isSelected = currentRating === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => {
                          triggerHaptic(20);
                          setRatings({ ...ratings, [pillar.id]: opt.val });
                        }}
                        className={`p-2.5 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all text-center leading-tight ${
                          isSelected
                            ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-[#F5F2EB] dark:text-[#111614] shadow-sm'
                            : 'bg-[#EDE8DE]/70 dark:bg-[#19201D] text-[#685F51] dark:text-[#8E9B93] border border-[#DFD8CB] dark:border-[#25302A] hover:border-[#B89B72]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {/* Curseur précis */}
                <div className="space-y-1.5 pt-1">
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
                    className="w-full accent-[#1E3A2B] dark:accent-[#B89B72] cursor-pointer h-2 bg-[#DFD8CB] dark:bg-[#25302A] rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-[#A39989] dark:text-[#6E7B74] font-medium px-0.5">
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
        <div className="space-y-3 pt-3 border-t border-[#DFD8CB]/80 dark:border-[#25302A]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-[#1E3A2B] dark:text-[#EAE6DF] uppercase tracking-wider">
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
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    journalTag === tag 
                      ? 'bg-[#1E3A2B] dark:bg-[#B89B72] text-[#F5F2EB] dark:text-[#111614]' 
                      : 'bg-[#F5F2EB] dark:bg-[#151B18] text-[#827869] dark:text-[#8E9B93] border border-[#DFD8CB]/80 dark:border-[#25302A]'
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
            className="w-full p-4 rounded-[20px] border border-[#DFD8CB] dark:border-[#2A3830] focus:outline-none focus:ring-2 focus:ring-[#B89B72]/40 text-xs sm:text-sm text-[#1E3A2B] dark:text-[#EAE6DF] bg-[#F5F2EB] dark:bg-[#151B18] placeholder-[#A39989]"
          />

          <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
            <span className="text-[11px] text-[#A39989] dark:text-[#6E7B74]">
              💾 Sauvegarde automatique dans votre appareil
            </span>
            <button
              onClick={handleSaveAssessment}
              disabled={!journalNote.trim()}
              className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 ${
                journalNote.trim() 
                  ? 'bg-[#1E3A2B] hover:bg-[#2A4C3A] dark:bg-[#B89B72] dark:hover:bg-[#C4A97D] text-[#F5F2EB] dark:text-[#111614] cursor-pointer active:scale-95' 
                  : 'bg-[#DFD8CB]/60 dark:bg-[#151B18] text-[#A39989] dark:text-[#55635C] cursor-not-allowed border border-[#DFD8CB] dark:border-[#25302A]'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Enregistrer dans mon carnet</span>
            </button>
          </div>
        </div>
      </div>

      {/* HISTORIQUE DES RÉFLEXIONS & OUTILS D'EXPORTATION */}
      <div className="bg-[#EDE8DE] dark:bg-[#19201D] rounded-[36px] border border-[#DFD8CB] dark:border-[#25302A] p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-4 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFD8CB]/80 dark:border-[#25302A] pb-3">
          <h3 className="font-serif text-[#1E3A2B] dark:text-[#EAE6DF] text-base flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-[#B89B72] dark:text-[#C4A97D]" />
            <span>Historique de Vos Notes de Conscience</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                triggerHaptic(25);
                exportJournalAsTxt(savedEntries);
              }}
              disabled={savedEntries.length === 0}
              className="flex items-center space-x-1.5 text-xs text-[#827869] dark:text-[#8E9B93] hover:text-[#1E3A2B] dark:hover:text-[#EAE6DF] bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#25302A] px-3.5 py-1.5 rounded-full transition-colors disabled:opacity-40"
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
              className="flex items-center space-x-1.5 text-xs text-[#827869] dark:text-[#8E9B93] hover:text-[#1E3A2B] dark:hover:text-[#EAE6DF] bg-[#F5F2EB] dark:bg-[#151B18] border border-[#DFD8CB] dark:border-[#25302A] px-3.5 py-1.5 rounded-full transition-colors"
              title="Exporter les données complètes (JSON)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sauvegarde JSON</span>
            </button>
          </div>
        </div>

        {savedEntries.length === 0 ? (
          <p className="text-xs text-[#827869] dark:text-[#8E9B93] italic text-center py-6">
            Aucune note pour l'instant. Consignez votre première auto-évaluation ci-dessus !
          </p>
        ) : (
          <div className="space-y-3">
            {savedEntries.map((entry) => (
              <div key={entry.id} className="p-4 sm:p-5 bg-[#F5F2EB] dark:bg-[#151B18] border-l-4 border-[#1E3A2B] dark:border-[#B89B72] rounded-r-[24px] space-y-2 text-xs transition-all border-y border-r border-[#DFD8CB]/80 dark:border-[#25302A]">
                <div className="flex justify-between items-center text-[#827869] dark:text-[#8E9B93] font-medium">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#1E3A2B] dark:text-[#EAE6DF]">{entry.date}</span>
                    <span className="bg-[#EDE8DE] dark:bg-[#1E2723] text-[#1E3A2B] dark:text-[#A7D1BA] px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-[#DFD8CB] dark:border-[#2A3830]">
                      {entry.tag}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#EDE8DE] dark:bg-[#1E2723] text-[#1E3A2B] dark:text-[#A7D1BA] px-2.5 py-0.5 rounded-full font-extrabold text-[11px] font-mono border border-[#DFD8CB] dark:border-[#2A3830]">
                      {entry.score}% d'immunité
                    </span>
                    <button
                      onClick={() => handleShareEntry(entry)}
                      className="text-[#827869] hover:text-[#1E3A2B] dark:hover:text-[#EAE6DF] p-1"
                      title="Partager cette réflexion"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-[#827869] hover:text-rose-600 p-1"
                      title="Supprimer cette note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[#3F4843] dark:text-[#C5D8CD] text-xs sm:text-sm leading-relaxed italic">
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
