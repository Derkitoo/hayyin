export function loadFromStorage(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(`hayyin_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Erreur lecture storage ${key}:`, e);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`hayyin_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn(`Erreur écriture storage ${key}:`, e);
  }
}

/**
 * Télécharge le journal des réflexions au format texte
 */
export function exportJournalAsTxt(entries) {
  if (!entries || entries.length === 0) return;
  const header = `=== CARNET D'INTROSPECTION & DE DOUCEUR (HAYYIN) ===\n` +
    `Application basée sur le Hadith des 4 Vertus & Tafsir Al-Badr\n` +
    `Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}\n\n` +
    `« تحرم على كل قريب هين لين سهل »\n\n` +
    `------------------------------------------------------------\n\n`;

  const body = entries.map((e, idx) => {
    return `[#${idx + 1}] Date: ${e.date} | Contexte: ${e.tag} | Sérénité: ${e.score}%\n` +
      `Note: ${e.note}\n\n`;
  }).join('');

  downloadFile('hayyin-carnet-douceur.txt', 'text/plain;charset=utf-8', header + body);
}

/**
 * Exporte l'ensemble des données en JSON
 */
export function exportAllDataAsJson(data) {
  const jsonStr = JSON.stringify(data, null, 2);
  downloadFile('hayyin-sauvegarde.json', 'application/json;charset=utf-8', jsonStr);
}

function downloadFile(filename, mimeType, content) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
