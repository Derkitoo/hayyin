import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Pause,
  Play,
  BookOpen, 
  Compass, 
  Wind, 
  CheckCircle, 
  RotateCcw, 
  ChevronRight, 
  Quote, 
  Copy, 
  Clock, 
  Award,
  Sun,
  Volume2,
  VolumeX,
  Share2,
  MessageSquare,
  HelpCircle,
  Check,
  Flame,
  Bookmark,
  BookMarked,
  Scroll
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('study');
  const [selectedTafsirIndex, setSelectedTafsirIndex] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // --- Audio synthétique pour la respiration guidée (Web Audio API) ---
  const playTone = (freq = 440, type = 'sine', duration = 0.5) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context silencieux si bloqué
    }
  };

  // --- États du Tracker / Auto-évaluation ---
  const [ratings, setRatings] = useState({
    qarib: 4,
    hayyin: 3,
    layyin: 4,
    sahl: 4,
  });
  const [journalNote, setJournalNote] = useState('');
  const [journalTag, setJournalTag] = useState('Famille');
  const [savedEntries, setSavedEntries] = useState([
    {
      id: 1,
      date: "Aujourd'hui, 08:30",
      tag: "Travail",
      score: 85,
      note: "Face à une remarque acerbe en réunion, j'ai différé ma réaction et appliqué la douceur au lieu de piquer en retour. L'échange s'est fluidifié de lui-même."
    },
    {
      id: 2,
      date: "Hier, 19:45",
      tag: "Famille",
      score: 75,
      note: "Pris par la fatigue, j'ai veillé à ne pas élever la voix avec les enfants, en me rappelant le verset : 'Si tu avais été rude, ils se seraient enfuis de ton entourage'."
    }
  ]);

  // --- États pour le module de respiration (Anti-Colère) ---
  const [breathingPhase, setBreathingPhase] = useState('Prêt');
  const [breathCount, setBreathCount] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [tasbihCount, setTasbihCount] = useState(0);

  // --- Piliers du Hadith ---
  const pillars = [
    {
      id: 'qarib',
      nameAr: 'قَرِيب',
      nameFr: 'Qarîb (Accessible & Proche)',
      subtitle: 'La chaleur humaine et la promptitude au bien',
      badge: 'Le Rapprochement',
      desc: "Être proche d'Allah par Son obéissance, et proche des créatures par un abord chaleureux, souriant et accessible. Le croyant attire les cœurs par sa bonté, tandis que la froideur et la morgue font fuir jusqu'aux êtres les plus chers, y compris ses propres enfants.",
      action: "Prendre des nouvelles sincères, écouter sans interrompre, accueillir autrui avec un visage radieux."
    },
    {
      id: 'hayyin',
      nameAr: 'هَيِّن',
      nameFr: 'Hayyin (Posé & Paisible)',
      subtitle: 'La dignité tranquille, exempte de vanité',
      badge: 'La Sérénité',
      desc: "Une âme tempérée, modeste et calme face aux aléas de la vie. Elle n'est ni vaniteuse, ni querelleuse, et refuse d'écraser autrui par son orgueil ou ses réactions impulsives.",
      action: "Garder son calme dans la foule ou les contrariétés, refuser les joutes oratoires stériles."
    },
    {
      id: 'layyin',
      nameAr: 'لَيِّن',
      nameFr: 'Layyin (Doux & Tactful)',
      subtitle: 'La délicatesse du verbe et du conseil',
      badge: 'La Bienveillance',
      desc: "Des propos doux, courtois, dépourvus de sarcasme ou de violence verbale. Lorsqu'il conseille une personne dans l'erreur, il le fait avec compassion et discrétion pour lui faire aimer le bien.",
      action: "Bannir les mots blessants lors d'un reproche ; conseiller en tête-à-tête avec tendresse."
    },
    {
      id: 'sahl',
      nameAr: 'سَهْل',
      nameFr: 'Sahl (Facile & Conciliant)',
      subtitle: 'La souplesse et la clémence relationnelle',
      badge: 'La Flexibilité',
      desc: "Facile à vivre, indulgent dans les transactions (achats, ventes, règlements), accommodant face aux imprévus. C'est une personne qui fluidifie le quotidien au lieu de le complexifier.",
      action: "Renoncer à avoir le dernier mot sur une broutille ; accorder un délai ou pardonner une maladresse."
    }
  ];

  // --- Les 8 Enseignements & Tafsir du Pr. Abd ar-Razzaq al-Badr ---
  const tafsirSections = [
    {
      id: 1,
      tag: "Introduction & Hadith",
      title: "L'Appel Prophétique et l'Éveil de l'Âme",
      quoteAr: "« أَلَا أُخْبِرُكُمْ بِمَنْ يَحْرُمُ عَلَى النَّارِ... »",
      summary: "La pédagogie prophétique commence par une interpellation solennelle pour susciter un désir ardent d'écouter et de mettre en pratique.",
      explanation: "Le Messager d'Allah ﷺ utilise la formule d'éveil 'Alâ oukhbaroukoum' (Ne vous informerai-je point ?). Comme l'explique le Sheikh Al-Badr, cette tournure prépare l'esprit de l'auditeur à accorder toute son attention et à concevoir une immense volonté de s'orner de ces vertus de caractère pour se préserver.",
      takeaway: "Le bon comportement n'est pas un accessoire mondain, c'est un bouclier contre le châtiment divin."
    },
    {
      id: 2,
      tag: "Statut & Mérite",
      title: "L'Interdiction Absolue au Feu (تحرم عليه النار)",
      quoteAr: "« قَدْرٌ زَائِدٌ عَلَى مُجَرَّدِ دُخُولِ الْجَنَّةِ »",
      summary: "Une distinction spirituelle majeure entre entrer au Paradis après une purification, et être totalement préservé de l'Enfer.",
      explanation: "Le Pr. Al-Badr insiste sur un point fondamental : certains croyants pécheurs finissent par entrer au Paradis mais après avoir été touchés et purifiés par le Feu. En revanche, pour la personne 'proche, posée, douce et facile', le Feu lui est formellement interdit (La tamassouhu an-Nâr). C'est un degré d'honneur suprême.",
      takeaway: "Le noble caractère procure une immunité complète contre les tourments du Feu."
    },
    {
      id: 3,
      tag: "Vertu 1 : Qarîb",
      title: "Qarîb (قريب) : L'Aimant qui Attire les Cœurs",
      quoteAr: "« بِحُسْنِ الْخُلُقِ يَقْرُبُ الإِنْسَانُ، وَبِسُوءِ الْخُلُقِ يَبْعُدُ »",
      summary: "La proximité englobe le rapprochement vers le bien et la chaleur bienveillante avec les gens.",
      explanation: "Le Sheikh souligne que le Prophète ﷺ n'a pas précisé proche de quoi, ce qui englobe tout ce qui est bien : proche de l'obéissance à Allah, et proche des gens par la bonté. 'L'homme au noble caractère est naturellement aimé et proche des âmes, tandis que le mauvais caractère crée un fossé infranchissable.'",
      takeaway: "Si vous voulez que les gens vous aiment et écoutent votre rappel, devenez accessible et humble."
    },
    {
      id: 4,
      tag: "Fondement Coranique",
      title: "L'Exemple du Prophète ﷺ dans le Coran (3:159)",
      quoteAr: "« فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ »",
      summary: "Même la meilleure des créatures aurait fait fuir son entourage s'il avait été dur de cœur.",
      explanation: "Allah dit au Prophète ﷺ que c'est par Sa miséricorde qu'il a été doux. Le Sheikh Al-Badr nous met en garde : si vous êtes dur, austère et sévère, même vos propres enfants — la chair de votre chair — fuiront loin de vous. La proximité ne se forge jamais par la contrainte ou la froideur.",
      takeaway: "La tendresse n'est pas une faiblesse, c'est la miséricorde même d'Allah déposée dans un cœur."
    },
    {
      id: 5,
      tag: "Vertus 2, 3 & 4",
      title: "L'Alliance de Hayyin, Layyin et Sahl",
      quoteAr: "« هَيِّنٌ لَيِّنٌ سَهْلٌ : تَعَامُلَاتٌ سَمْحَةٌ رَفِيقَةٌ »",
      summary: "Ces trois qualificatifs viennent définir précisément ce qu'est la véritable proximité.",
      explanation: "Une personne ne peut être 'Qarîb' que si elle réunit la dignité tranquille (Hayyin), la douceur du verbe et du geste (Layyin) et la facilité d'esprit dans le commerce et le pardon (Sahl). Ses échanges sont empreints de mansuétude, sans rigidité, sans orgueil et sans esprit de vengeance.",
      takeaway: "Fluidifiez la vie des gens autour de vous au lieu de la compliquer."
    },
    {
      id: 6,
      tag: "Pédagogie & Dawa",
      title: "La Bienveillance face aux Fautes d'Autrui",
      quoteAr: "« لَوْ خَاطَبْتَهُ يَا فَاسِقُ بِقَسْوَةٍ، مَا صَنَعْتَ شَيْئًا إِلَّا أَنَّكَ أَبْعَدْتَهُ »",
      summary: "La rudesse dans la correction ne fait qu'éloigner le pécheur d'Allah et de Ses serviteurs.",
      explanation: "Le Pr. Al-Badr explique : 'Si tu vois quelqu'un commettre un péché et que tu le traites durement avec des paroles blessantes ('Ô pervers !'), tu ne construis rien : tu crées une barrière entre lui et les gens de bien. En revanche, si tu fais preuve de miséricorde, de tact et de patience, tu seras la cause de sa rédemption.'",
      takeaway: "Le but de la réprobation est de ramener le cœur vers la vérité, non de satisfaire sa propre colère."
    },
    {
      id: 7,
      tag: "Parole d'Érudit",
      title: "La Règle d'Or de Sheikh Ibn Bâz : Le Temps du Rifq",
      quoteAr: "« هَذَا زَمَانُ رِفْقٍ، لِأَنَّ النَّاسَ ابْتُلُوا بِأَشْيَاءَ كَثِيرَةٍ أَبْعَدَتْهُمْ »",
      summary: "Pourquoi notre époque moderne exige-t-elle une douceur décuplée dans nos relations ?",
      explanation: "Sheikh Abd al-Aziz ibn Baz disait : 'Cette époque est l'époque de la douceur (Rifq). Les gens sont assaillis de doutes, de distractions et d'épreuves qui les ont éloignés. Sois doux avec les pécheurs, doux avec ceux qui trébuchent, afin qu'ils aiment le bien et ses adeptes.'",
      takeaway: "Face à un monde dur et agressif, le croyant répond par l'apaisement et la miséricorde."
    },
    {
      id: 8,
      tag: "Héritage des Salaf",
      title: "L'Exemple Vivant d'Abdullah ibn 'Awn",
      quoteAr: "« كَانَ إِذَا اشْتَدَّ غَضَبُهُ مِنْ شَخْصٍ، قَالَ : بَارَكَ اللَّهُ فِيكَ ! »",
      summary: "Une leçon d'auto-maîtrise qui continue d'éclairer l'humanité des siècles après sa mort.",
      explanation: "Le Sheikh Al-Badr rappelle avec émotion : 'Les gens vertueux éduquent parfois sans dire un mot, simplement par leur attitude. Lorsqu'Abdullah ibn 'Awn ressentait la plus vive des colères contre quelqu'un, il ne proférait aucune insulte : il le regardait et disait : Qu'Allah te bénisse ! (Bārak Allāhu fīk).' Cette réaction désarmait toute hostilité.",
      takeaway: "Remplacer l'injure par une bénédiction est le sommet de la maîtrise de soi."
    }
  ];

  // --- Scénarios interactifs ---
  const scenarios = [
    {
      id: 1,
      title: "Gestion d'une contrariété au travail ou en équipe",
      context: "Un collègue a oublié de valider un document crucial, retardant votre tâche commune. Il arrive tendu et tente maladroitement de rejeter la faute sur vous.",
      options: [
        {
          text: "Répliquer immédiatement et prouver sa faute par écrit devant l'ensemble des collaborateurs.",
          isCorrect: false,
          feedback: "L'humiliation publique et la réaction vive blessent la dignité et transgressent les vertus de 'Hayyin' (calme) et 'Layyin' (douceur)."
        },
        {
          text: "Respirer calmement, différer le point litigieux à un tête-à-tête et concentrer l'énergie sur la résolution du problème actuel.",
          isCorrect: true,
          feedback: "Excellente réaction ! Vous incarnez 'Hayyin' (maîtrise de l'ego) et 'Sahl' (facilité et orientation vers la solution plutôt que le blâme)."
        },
        {
          text: "Garder le silence de manière hostile, lui faire la tête et refuser de coopérer pour la suite.",
          isCorrect: false,
          feedback: "La rancœur passive et la fermeture rompent le lien de proximité ('Qarîb') et enveniment le climat."
        }
      ]
    },
    {
      id: 2,
      title: "Conseiller un proche commettant un impair",
      context: "Vous constatez qu'un jeune membre de votre famille ou un ami néglige ses devoirs et adopte des habitudes nuisibles.",
      options: [
        {
          text: "L'interpeller avec véhémence en le qualifiant d'égaré pour susciter chez lui un sentiment de honte.",
          isCorrect: false,
          feedback: "Comme l'a souligné Cheikh Al-Badr : traiter quelqu'un avec mépris ou brutalité ne fait que creuser un fossé entre lui et le bien."
        },
        {
          text: "L'inviter chaleureusement, valoriser ses qualités existantes et lui glisser avec tendresse et pudeur un conseil adapté.",
          isCorrect: true,
          feedback: "Parfait. C'est l'essence du principe d'Ibn Baz : 'Notre époque demande de la douceur pour que les personnes aiment la vérité'."
        },
        {
          text: "Estimer que cela ne vous regarde pas et l'abandonner totalement à ses travers.",
          isCorrect: false,
          feedback: "Le musulman reste bienveillant et proche ('Qarîb') du bien pour son prochain."
        }
      ]
    },
    {
      id: 3,
      title: "Un différend d'achat ou de prestation de service",
      context: "Un commerçant ou livreur commet une erreur bénigne de montant ou d'article et s'excuse avec sincérité.",
      options: [
        {
          text: "Faire preuve de souplesse, sourire, corriger le paiement sans exiger de dédommagement disproportionné.",
          isCorrect: true,
          feedback: "C'est l'incarnation pure de 'Sahl' : être coulant à la vente, à l'achat et dans les compromis de tous les jours."
        },
        {
          text: "L'accuser d'escroquerie délibérée et menacer de lui détruire sa réputation en ligne.",
          isCorrect: false,
          feedback: "Une telle sévérité contredit l'esprit d'indulgence promis à la miséricorde divine."
        }
      ]
    }
  ];

  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [scenarioScore, setScenarioScore] = useState(0);

  // --- Calcul du Score Global du Tracker ---
  const totalScore = Math.round(
    ((ratings.qarib + ratings.hayyin + ratings.layyin + ratings.sahl) / 20) * 100
  );

  // --- Sauvegarde d'une note de réflexion ---
  const handleSaveAssessment = () => {
    if (!journalNote.trim()) return;
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

  const copyHadith = () => {
    const text = `Le Messager d'Allah ﷺ a dit : « Ne vous informerai-je point de celui qui est interdit au Feu ? Il est interdit à quiconque est proche (قريب), posé (هين), doux (لين) et facile (سهل). » (Rapporté par At-Tirmidhî)`;
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  // --- Gestion de la Respiration Guidée ---
  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            setBreathingPhase((curr) => {
              if (curr === 'Inspirez doucement') {
                playTone(523.25, 'sine', 0.6); // Do (C5)
                return 'Retenez la paix';
              }
              if (curr === 'Retenez la paix') {
                playTone(392.00, 'sine', 0.6); // Sol (G4)
                return 'Expirez toute amertume';
              }
              playTone(329.63, 'sine', 0.6); // Mi (E4)
              return 'Inspirez doucement';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingPhase('Prêt');
      setBreathCount(4);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, soundEnabled]);

  const startBreathing = () => {
    setIsBreathingActive(true);
    setBreathingPhase('Inspirez doucement');
    setBreathCount(4);
    playTone(329.63, 'sine', 0.8);
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
  };

  const currentTafsir = tafsirSections[selectedTafsirIndex];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 antialiased">
      
      {/* BARRE DE NAVIGATION SUPÉRIEURE */}
      <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white shadow-lg sticky top-0 z-50 border-b border-emerald-800/70">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-800/80 border border-emerald-500/30 flex items-center justify-center text-emerald-200 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base md:text-lg tracking-tight">HAYYIN</span>
                <span className="font-serif text-amber-300 text-sm font-bold dir-rtl">هَيِّن</span>
                <span className="hidden sm:inline-block text-[10px] bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-600/40 uppercase tracking-widest font-semibold">
                  Tafsir Al-Badr
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/90 truncate max-w-[210px] sm:max-w-none">
                L'art prophétique d'être préservé du Feu
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Couper le son des exercices" : "Activer le son"}
              className="p-2 rounded-xl bg-emerald-800/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition-colors"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>

            <button 
              onClick={() => setActiveTab('calm')}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-200 border border-amber-400/40 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-sm"
            >
              <Wind className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden xs:inline">Anti-Colère</span>
            </button>
          </div>
        </div>

        {/* Onglets de navigation */}
        <nav className="max-w-5xl mx-auto px-2 flex space-x-1 sm:space-x-2 overflow-x-auto text-xs sm:text-sm border-t border-emerald-900/60 scrollbar-none">
          <button 
            onClick={() => setActiveTab('study')}
            className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'study' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tafsir & Enseignements</span>
          </button>

          <button 
            onClick={() => setActiveTab('tracker')}
            className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'tracker' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Bilan des 4 Vertus</span>
          </button>

          <button 
            onClick={() => setActiveTab('calm')}
            className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'calm' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Pause Sérénité</span>
          </button>

          <button 
            onClick={() => setActiveTab('scenarios')}
            className={`py-3 px-3.5 border-b-2 font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'scenarios' ? 'border-amber-400 text-amber-200 font-semibold bg-emerald-900/40' : 'border-transparent text-emerald-300/80 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Cas Pratiques</span>
          </button>
        </nav>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* ============================================================ */}
        {/* ONGLET 1 : TAFSIR, PAROLES DU SHEIKH & CITATIONS */}
        {/* ============================================================ */}
        {activeTab === 'study' && (
          <div className="space-y-6">
            {/* Bannière du Hadith */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200/90 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-5 pointer-events-none">
                <Quote className="w-64 h-64 text-emerald-900" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300/60">
                    Hadith Prophétique Authentique • Sunan At-Tirmidhî (Hassan)
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={copyHadith}
                      className="flex items-center space-x-1 text-xs text-stone-500 hover:text-emerald-800 bg-stone-100 hover:bg-stone-200/80 px-2.5 py-1 rounded-lg transition-colors"
                      title="Copier la citation"
                    >
                      {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copySuccess ? 'Copié !' : 'Partager'}</span>
                    </button>
                    <span className="text-xs text-stone-400 font-medium">Ibn Mas'ûd (رضي الله عنه)</span>
                  </div>
                </div>

                {/* Calligraphie et vocalisation arabe */}
                <div className="bg-gradient-to-b from-stone-50 to-emerald-50/20 border border-stone-200 rounded-2xl p-5 sm:p-7 text-center">
                  <p className="text-2xl sm:text-3xl font-serif text-emerald-950 leading-loose tracking-wide dir-rtl" style={{ fontFamily: 'Amiri, Traditional Arabic, serif' }}>
                    « أَلَا أُخْبِرُكُمْ بِمَنْ يَحْرُمُ عَلَى النَّارِ، أَوْ بِمَنْ تَحْرُمُ عَلَيْهِ النَّارُ؟
                    <br />
                    تَحْرُمُ عَلَى كُلِّ <span className="text-amber-800 font-bold underline decoration-amber-300 underline-offset-8">قَرِيبٍ</span>، <span className="text-amber-800 font-bold underline decoration-amber-300 underline-offset-8">هَيِّنٍ</span>، <span className="text-amber-800 font-bold underline decoration-amber-300 underline-offset-8">لَيِّنٍ</span>، <span className="text-amber-800 font-bold underline decoration-amber-300 underline-offset-8">سَهْلٍ</span> »
                  </p>
                </div>

                {/* Traduction & Explication */}
                <div className="space-y-3 pt-1">
                  <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
                    « Ne vous informerai-je point de celui qui est interdit au Feu, ou de celui envers qui le Feu est interdit ?
                    Il est interdit à quiconque est <strong className="text-emerald-900 font-semibold">proche (accessible)</strong>, <strong className="text-emerald-900 font-semibold">posé (digne)</strong>, <strong className="text-emerald-900 font-semibold">doux (bienveillant)</strong> et <strong className="text-emerald-900 font-semibold">facile (conciliant)</strong>. »
                  </p>

                  <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-950 block">L'Enseignement Central (Pr. Abd ar-Razzaq al-Badr) :</span>
                      « Être préservé du Feu est un rang supérieur à la simple admission au Paradis. Certains musulmans entrent au Paradis après une expiation préliminaire au Feu, mais celui qui concrétise ces quatre qualités relationnelles en est <em>totalement exempté</em> : le Feu lui est formellement interdit. »
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LE TAFSIR DÉTAILLÉ DU SHEIKH : INTERFACE DE MÉDITATION INTERACTIVE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Sommaire interactif des 8 enseignements */}
              <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-stone-200 p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <h2 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
                    <BookMarked className="w-4 h-4 text-emerald-700" />
                    <span>Les 8 Points du Tafsir d'Al-Badr</span>
                  </h2>
                  <span className="text-[11px] text-stone-400 font-mono">8 sections</span>
                </div>

                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                  {tafsirSections.map((sec, idx) => {
                    const isSelected = selectedTafsirIndex === idx;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => setSelectedTafsirIndex(idx)}
                        className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-start justify-between group ${
                          isSelected 
                            ? 'bg-emerald-800 text-white shadow-md' 
                            : 'bg-stone-50 hover:bg-emerald-50/70 text-stone-700 hover:text-emerald-950 border border-stone-200/60'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold text-[10px] uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-200 text-stone-600'}`}>
                              {sec.tag}
                            </span>
                          </div>
                          <p className="font-semibold text-xs leading-snug">
                            {sec.title}
                          </p>
                          <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>
                            {sec.summary}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform mt-2 ${isSelected ? 'text-white translate-x-0.5' : 'text-stone-400 group-hover:text-emerald-700'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contenu détaillé du point sélectionné */}
              <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-stone-200 p-6 sm:p-7 flex flex-col justify-between min-h-[460px] space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {currentTafsir.tag}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">Partie {selectedTafsirIndex + 1} / {tafsirSections.length}</span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-2">
                      {currentTafsir.title}
                    </h3>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center font-serif text-lg text-emerald-900 dir-rtl">
                      {currentTafsir.quoteAr}
                    </div>
                  </div>

                  <div className="space-y-3 text-stone-700 text-xs sm:text-sm leading-relaxed">
                    <p className="font-medium text-stone-900 bg-amber-50/60 p-3 rounded-xl border border-amber-200/50">
                      💡 {currentTafsir.summary}
                    </p>
                    <p className="text-stone-600">
                      {currentTafsir.explanation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-100">
                  <div className="bg-emerald-900 text-emerald-100 p-3.5 rounded-2xl text-xs flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block font-semibold mb-0.5">La leçon à retenir :</strong>
                      {currentTafsir.takeaway}
                    </div>
                  </div>

                  {/* Navigation séquentielle */}
                  <div className="flex justify-between items-center pt-1">
                    <button
                      disabled={selectedTafsirIndex === 0}
                      onClick={() => setSelectedTafsirIndex(i => i - 1)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${selectedTafsirIndex === 0 ? 'text-stone-300 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                    >
                      ← Point précédent
                    </button>
                    <button
                      disabled={selectedTafsirIndex === tafsirSections.length - 1}
                      onClick={() => setSelectedTafsirIndex(i => i + 1)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${selectedTafsirIndex === tafsirSections.length - 1 ? 'text-stone-300 cursor-not-allowed' : 'text-emerald-800 hover:bg-emerald-50'}`}
                    >
                      Point suivant →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cartes détaillées des 4 Qualités */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-stone-900">Les 4 Piliers Décryptés</h2>
                  <p className="text-xs text-stone-500">Mettre en application concrète chaque mot du Hadith</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pillars.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {p.badge}
                          </span>
                          <h3 className="font-bold text-stone-900 text-base mt-1">{p.nameFr}</h3>
                        </div>
                        <span className="text-2xl font-serif font-bold text-emerald-900 px-3 py-1 bg-stone-50 rounded-xl border border-stone-200/60 dir-rtl">
                          {p.nameAr}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>

                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 text-xs text-stone-700">
                      <strong className="text-emerald-900 block font-semibold mb-0.5">Application au quotidien :</strong>
                      {p.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Citations de référence (Coran & Sagesse) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>L'Ancrage Coranique [Sourate 3:159]</span>
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-emerald-100 leading-relaxed dir-rtl">
                    « فَبِمَا رَحْمَةٍ مِّنَ اللَّهِ لِنتَ لَهُمْ ۖ وَلَوْ كُنتَ فَظًّا غَلِيظَ الْقَلْبِ لَانفَضُّوا مِنْ حَوْلِكَ »
                  </p>
                  <p className="text-xs text-stone-300 italic">
                    « C'est par quelque miséricorde d'Allah que tu as été doux envers eux ! Mais si tu avais été rude, au cœur dur, ils se seraient enfuis de ton entourage... »
                  </p>
                </div>
                <div className="text-[11px] text-emerald-300 font-semibold border-t border-emerald-800/80 pt-2">
                  Commenté par le Sheikh : La rudesse dissout même les liens du sang.
                </div>
              </div>

              <div className="bg-amber-900/90 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                    <Quote className="w-4 h-4" />
                    <span>La Règle d'Or de Sheikh Ibn Bâz</span>
                  </div>
                  <p className="text-sm sm:text-base text-amber-100 font-serif leading-relaxed italic">
                    « Ce temps est celui de la douceur (Zaman ar-rifq). Les gens ont été éprouvés par de nombreuses distractions. Il convient d'user de douceur avec eux, même les pécheurs, afin de leur faire aimer le bien et ses partisans. »
                  </p>
                </div>
                <div className="text-[11px] text-amber-200 font-semibold border-t border-amber-800/80 pt-2">
                  Principe pédagogique fondamental rappelé par Al-Badr
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ONGLET 2 : BILAN DES 4 VERTUS (TRACKER) */}
        {/* ============================================================ */}
        {activeTab === 'tracker' && (
          <div className="space-y-6">
            {/* Résumé de l'alignement */}
            <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-[11px] uppercase font-bold text-amber-300 tracking-wider bg-emerald-800/60 px-3 py-1 rounded-full border border-emerald-600/40 inline-block">
                  Auto-examen quotidien • Muhasaba
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Votre Baromètre de Douceur</h2>
                <p className="text-xs sm:text-sm text-emerald-200/90 max-w-lg leading-relaxed">
                  « Le croyant s'examine constamment. » Évaluez votre disposition d'esprit aujourd'hui pour ancrer l'interdiction au Feu dans votre comportement.
                </p>
              </div>

              <div className="flex items-center space-x-5 bg-emerald-900/60 border border-emerald-500/30 p-5 rounded-2xl backdrop-blur shrink-0">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold text-amber-300 tracking-tight">{totalScore}%</div>
                  <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Douceur Globale</span>
                </div>
                <div className="h-14 w-px bg-emerald-700/60" />
                <div className="text-xs text-emerald-100 max-w-[140px] leading-snug">
                  {totalScore >= 80 
                    ? "Excellente sérénité. Une présence chaleureuse pour vos proches." 
                    : totalScore >= 60 
                    ? "Bonne disposition. Quelques moments de crispation à tempérer." 
                    : "Journée éprouvante. Prenez un temps de respiration et de pardon."}
                </div>
              </div>
            </div>

            {/* Curseurs interactifs */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="font-bold text-stone-900 text-base">Évaluation des 4 Piliers Prophétiques</h2>
                <p className="text-xs text-stone-500">Déplacez chaque curseur selon votre attitude au cours des dernières 24 heures :</p>
              </div>

              <div className="space-y-5">
                {pillars.map((pillar) => (
                  <div key={pillar.id} className="bg-stone-50/80 p-4 sm:p-5 rounded-2xl border border-stone-200/70 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-stone-900 text-sm sm:text-base">{pillar.nameFr}</span>
                          <span className="font-serif text-emerald-800 text-sm font-bold">{pillar.nameAr}</span>
                        </div>
                        <span className="text-xs text-stone-500">{pillar.subtitle}</span>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-900 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300/50">
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
                        onChange={(e) => setRatings({ ...ratings, [pillar.id]: parseInt(e.target.value) })}
                        className="w-full accent-emerald-700 cursor-pointer h-2 bg-stone-200 rounded-lg"
                      />
                      <div className="flex justify-between text-[11px] text-stone-400 font-medium px-0.5">
                        <span>1 • Rude ou distant</span>
                        <span>3 • Équilibré</span>
                        <span>5 • Pleine mansuétude</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Journal personnel */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                    Note d'Introspection & Situation Vécue :
                  </label>
                  <div className="flex space-x-1.5 text-xs">
                    {['Famille', 'Travail', 'Commerce', 'Réseaux'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setJournalTag(tag)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          journalTag === tag ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
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
                  className="w-full p-3.5 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-xs sm:text-sm text-stone-800 bg-white"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAssessment}
                    disabled={!journalNote.trim()}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 ${
                      journalNote.trim() 
                        ? 'bg-emerald-800 hover:bg-emerald-900 text-white cursor-pointer active:scale-95' 
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Enregistrer dans mon carnet</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Historique des réflexions */}
            {savedEntries.length > 0 && (
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-emerald-700" />
                    <span>Vos Précédentes Victoires sur Vous-Même</span>
                  </h3>
                  <span className="text-xs text-stone-400 font-mono">{savedEntries.length} entrées</span>
                </div>

                <div className="space-y-3">
                  {savedEntries.map((entry) => (
                    <div key={entry.id} className="p-4 bg-stone-50 border-l-4 border-emerald-700 rounded-r-2xl space-y-2 text-xs transition-all hover:bg-stone-100/80">
                      <div className="flex justify-between items-center text-stone-500 font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-stone-700">{entry.date}</span>
                          <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                            {entry.tag}
                          </span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold text-[11px]">
                          {entry.score}% de sérénité
                        </span>
                      </div>
                      <p className="text-stone-800 text-xs sm:text-sm leading-relaxed italic">
                        « {entry.note} »
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* ONGLET 3 : PAUSE SÉRÉNITÉ & DÉFI ANTI-COLÈRE */}
        {/* ============================================================ */}
        {activeTab === 'calm' && (
          <div className="space-y-6">
            {/* L'anecdote de l'Imam Ibn 'Awn */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-base sm:text-lg text-stone-900">
                    La Formule Secrète d'Abdullah ibn 'Awn
                  </h2>
                  <p className="text-xs text-stone-500">Quand la contrariété atteint son intensité maximale</p>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/80 text-emerald-950 text-xs sm:text-sm space-y-3">
                <p className="leading-relaxed">
                  Le Pr. Abd ar-Razzaq al-Badr rapporte l'attitude remarquable de ce grand savant des premières générations :
                </p>
                <div className="bg-white p-4 rounded-xl border border-emerald-200 text-center shadow-inner">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 block dir-rtl" style={{ fontFamily: 'Amiri, serif' }}>
                    « كَانَ إِذَا اشْتَدَّ غَضَبُهُ مِنْ شَخْصٍ، قَالَ : بَارَكَ اللَّهُ فِيكَ ! »
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 font-sans mt-2">
                    « Lorsque sa colère contre un individu devenait extrême, il se contentait de lui dire : <strong className="text-emerald-900">"Qu'Allah te bénisse !" (Bārak Allāhu fīk)</strong>, sans ajouter un seul mot de reproche. »
                  </p>
                </div>
                <p className="text-xs text-stone-600">
                  Transformer une impulsion destructive en une invocation de bienveillance étouffe instantanément l'ardeur du diable et protège les liens humains.
                </p>
              </div>
            </div>

            {/* Exercice de cohérence respiratoire & sonnette de paix */}
            <div className="bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-8">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-widest bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
                  Désescalade Émotionnelle Immédiate
                </span>
                <h3 className="text-xl sm:text-2xl font-bold pt-1">Respiration & Silence Prophétique</h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto">
                  En cas d'énervement ou d'affront, abstenez-vous de parler. Suivez le cercle ci-dessous pour ralentir votre pouls.
                </p>
              </div>

              {/* Cercle animé dynamique */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
                <div 
                  className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                    isBreathingActive 
                      ? breathingPhase === 'Inspirez doucement' 
                        ? 'scale-110 border-emerald-400 shadow-2xl shadow-emerald-500/40 bg-emerald-800/20' 
                        : breathingPhase === 'Retenez la paix' 
                        ? 'scale-110 border-amber-400 bg-amber-900/30 shadow-2xl shadow-amber-500/30' 
                        : 'scale-90 border-teal-400 bg-teal-950/40 shadow-inner' 
                      : 'scale-100 border-stone-700 bg-stone-900/40'
                  }`}
                />
                
                <div className="relative z-10 flex flex-col items-center justify-center p-4">
                  <Wind className={`w-8 h-8 mb-2 transition-transform ${isBreathingActive ? 'text-emerald-300 animate-pulse' : 'text-stone-500'}`} />
                  <span className="text-sm sm:text-base font-bold text-emerald-100">{breathingPhase}</span>
                  
                  {isBreathingActive ? (
                    <span className="text-4xl font-extrabold text-white mt-1 font-mono">{breathCount}</span>
                  ) : (
                    <span className="text-xs text-stone-400 mt-1">Prêt pour 1 minute de calme</span>
                  )}
                  
                  {isBreathingActive && (
                    <span className="text-xs text-amber-300 mt-2 font-serif italic">
                      « بَارَكَ اللَّهُ فِيكَ »
                    </span>
                  )}
                </div>
              </div>

              {/* Contrôle de la séance */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!isBreathingActive ? (
                  <button
                    onClick={startBreathing}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Démarrer la séance de calme</span>
                  </button>
                ) : (
                  <button
                    onClick={stopBreathing}
                    className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-white font-semibold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Mettre fin au cycle</span>
                  </button>
                )}
              </div>

              {/* Mini Compteur de Dhikr Anti-Stress */}
              <div className="pt-6 border-t border-emerald-900/70 max-w-lg mx-auto">
                <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-700/50 flex items-center justify-between">
                  <div className="text-left space-y-0.5">
                    <span className="text-[10px] text-amber-300 uppercase font-bold tracking-wider">Tasbih d'apaisement</span>
                    <p className="text-xs text-emerald-100 font-serif">« أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ »</p>
                    <span className="text-[10px] text-stone-400">« Je demande pardon à Allah et je reviens à Lui »</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setTasbihCount(c => c + 1);
                        playTone(659.25, 'sine', 0.2); // E5
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow active:scale-90 transition-transform"
                    >
                      +1 ({tasbihCount})
                    </button>
                    {tasbihCount > 0 && (
                      <button
                        onClick={() => setTasbihCount(0)}
                        className="p-2 text-stone-400 hover:text-white"
                        title="Réinitialiser"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Les 3 Règles prophétiques face au courroux */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2 text-xs">
                <div className="bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-300 flex items-center space-x-1">
                    <span>1. Changer de posture</span>
                  </span>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Si vous êtes debout, asseyez-vous. Si la colère persiste, allongez-vous afin de faire redescendre la pression sanguine.
                  </p>
                </div>

                <div className="bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-300 flex items-center space-x-1">
                    <span>2. La formule d'Isti'adha</span>
                  </span>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Prononcer : <em>« A'oudhou billahi mina ash-Shaytan ar-Rajim »</em> pour dissiper la braise allumée par le diable.
                  </p>
                </div>

                <div className="bg-stone-900/80 p-3.5 rounded-2xl border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-300 flex items-center space-x-1">
                    <span>3. L'Eau et les ablutions</span>
                  </span>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    La colère provient du feu, et le feu ne s'éteint que par l'eau. Se laver le visage dissipe instantanément l'agitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ONGLET 4 : MISES EN SITUATION & CAS PRATIQUES */}
        {/* ============================================================ */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Cas n° {currentScenario + 1} sur {scenarios.length}
                </span>
                <span className="text-xs text-stone-500 font-semibold">
                  Score de discernement : {scenarioScore} pt{scenarioScore > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  {scenarios[currentScenario].title}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {scenarios[currentScenario].context}
                </h2>
                <p className="text-xs text-stone-500">
                  Comment réagir pour respecter l'alliance des 4 vertus (Qarîb, Hayyin, Layyin, Sahl) ?
                </p>
              </div>

              {/* Choix */}
              <div className="space-y-3 pt-2">
                {scenarios[currentScenario].options.map((option, idx) => {
                  let btnStyle = "bg-stone-50 hover:bg-stone-100/80 text-stone-800 border-stone-200/90";
                  if (showExplanation) {
                    if (option.isCorrect) {
                      btnStyle = "bg-emerald-100/90 text-emerald-950 border-emerald-500 font-semibold shadow-sm";
                    } else if (selectedAnswer === idx) {
                      btnStyle = "bg-rose-50 text-rose-800 border-rose-300 line-through opacity-80";
                    } else {
                      btnStyle = "bg-stone-50 text-stone-400 border-stone-200 opacity-60";
                    }
                  } else if (selectedAnswer === idx) {
                    btnStyle = "bg-emerald-900 text-white border-emerald-900 shadow-md";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showExplanation}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start space-x-3.5 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action : Vérification ou Passage au suivant */}
              <div className="pt-2 flex justify-end">
                {!showExplanation ? (
                  <button
                    disabled={selectedAnswer === null}
                    onClick={() => {
                      setShowExplanation(true);
                      if (scenarios[currentScenario].options[selectedAnswer].isCorrect) {
                        setScenarioScore(s => s + 1);
                        playTone(523.25, 'sine', 0.4);
                      } else {
                        playTone(220.00, 'triangle', 0.4);
                      }
                    }}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                      selectedAnswer !== null 
                        ? 'bg-emerald-800 text-white hover:bg-emerald-900 cursor-pointer active:scale-95' 
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    Valider ma réponse
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setShowExplanation(false);
                      setCurrentScenario((prev) => (prev + 1) % scenarios.length);
                    }}
                    className="bg-emerald-800 text-white hover:bg-emerald-900 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 active:scale-95"
                  >
                    <span>Situation suivante</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Explication & Retour pédagogique */}
              {showExplanation && (
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 border animate-fadeIn ${
                  scenarios[currentScenario].options[selectedAnswer].isCorrect 
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300' 
                    : 'bg-amber-50 text-amber-950 border-amber-300'
                }`}>
                  <div className="flex items-center space-x-1.5 font-bold">
                    {scenarios[currentScenario].options[selectedAnswer].isCorrect ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-700" />
                        <span>Comportement prophétique validé !</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 text-amber-700" />
                        <span>Analyse de la réaction :</span>
                      </>
                    )}
                  </div>
                  <p className="text-stone-700">{scenarios[currentScenario].options[selectedAnswer].feedback}</p>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* PIED DE PAGE */}
      <footer className="bg-white border-t border-stone-200/90 py-5 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4 space-y-1">
          <p className="font-medium text-stone-700">
            HAYYIN • Application basée sur le tafsir et le cours du Pr. Dr. Abd al-Razzaq al-Badr (حفظه الله)
          </p>
          <p className="text-[11px] text-stone-400">
            « تحرم على كل قريب هين لين سهل » — Qu'Allah nous compte parmi les serviteurs préservés du Feu.
          </p>
        </div>
      </footer>

    </div>
  );
}
