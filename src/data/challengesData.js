export const DAILY_CHALLENGES = [
  {
    id: 1,
    title: "Le Sourire Spontané",
    pillar: "qarib",
    pillarName: "Qarîb (Accessible)",
    action: "Saluer la première personne croisée aujourd'hui avec un visage radieux et un regard bienveillant sincère.",
    hadithBonus: "« Ton sourire à l'égard de ton frère est une aumône. »"
  },
  {
    id: 2,
    title: "L'Apostolat du Pardon Silencieux",
    pillar: "hayyin",
    pillarName: "Hayyin (Posé)",
    action: "Face à une contrariété ou une remarque maladroite, garder le silence pendant 5 secondes et dire dans son cœur 'Bārak Allāhu fīk'.",
    hadithBonus: "« Celui qui retient sa colère alors qu'il est en mesure de l'assouvir, Allah remplira son cœur de sérénité. »"
  },
  {
    id: 3,
    title: "Le Conseil en Privé",
    pillar: "layyin",
    pillarName: "Layyin (Doux)",
    action: "Si tu dois faire un reproche aujourd'hui, fais-le strictement en tête-à-tête en commençant par mentionner une qualité de la personne.",
    hadithBonus: "« La douceur ne se trouve dans une chose sans qu'elle ne l'embellisse. »"
  },
  {
    id: 4,
    title: "La Cession du Dernier Mot",
    pillar: "sahl",
    pillarName: "Sahl (Conciliant)",
    action: "Renoncer volontairement à avoir le dernier mot dans un débat futile ou une discussion anodine.",
    hadithBonus: "« Je garantis une demeure aux abords du Paradis à quiconque renonce à la querelle même s'il a raison. »"
  },
  {
    id: 5,
    title: "L'Écoute Complète sans Couper",
    pillar: "qarib",
    pillarName: "Qarîb (Proche)",
    action: "Écouter un proche jusqu'au bout de son récit sans regarder ton téléphone et sans l'interrompre une seule fois.",
    hadithBonus: "« Sois proche des croyants avec sollicitude. »"
  },
  {
    id: 6,
    title: "Faciliter une Transaction",
    pillar: "sahl",
    pillarName: "Sahl (Facile)",
    action: "Faciliter la tâche à un commerçant, livreur ou serveur en étant courtois, patient et arrangeant.",
    hadithBonus: "« Qu'Allah fasse miséricorde à un homme facile lorsqu'il vend, achète ou réclame son dû. »"
  },
  {
    id: 7,
    title: "Invocation Cachée pour un Opposant",
    pillar: "hayyin",
    pillarName: "Hayyin (Digne)",
    action: "Invoquer secrètement le pardon et le bien pour une personne avec laquelle vous ressentez une animosité ou une rancune.",
    hadithBonus: "« L'invocation du musulman pour son frère en son absence est exaucée. »"
  }
];

export function getTodayChallenge() {
  // Rotate smoothly based on day of the year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}
