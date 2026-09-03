// Générateur d'ambiance sonore méditative 100% Web Audio API offline

let ambienceCtx = null;
let noiseNode = null;
let filterNode = null;
let gainNode = null;
let droneOsc1 = null;
let droneOsc2 = null;
let droneGain = null;
let isAmbiencePlaying = false;

function getAmbienceContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ambienceCtx) {
    ambienceCtx = new AudioCtx();
  }
  if (ambienceCtx.state === 'suspended') {
    ambienceCtx.resume().catch(() => {});
  }
  return ambienceCtx;
}

/**
 * Démarre une ambiance apaisante de brise nocturne et résonance feutrée
 */
export function startAmbience(type = 'breeze', volume = 0.08) {
  try {
    const ctx = getAmbienceContext();
    if (!ctx) return;
    if (isAmbiencePlaying) stopAmbience();

    // 1. Buffer de bruit rose / brise douce
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filtre passe-bas doux pour effet de vent lointain
    filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(320, ctx.currentTime);
    filterNode.Q.setValueAtTime(1.2, ctx.currentTime);

    gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 2.5);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseNode.start();

    // 2. Drone harmonique subtil (fréquences sacrées apaisantes ~ 108Hz et 216Hz)
    droneOsc1 = ctx.createOscillator();
    droneOsc2 = ctx.createOscillator();
    droneGain = ctx.createGain();

    droneOsc1.type = 'sine';
    droneOsc1.frequency.setValueAtTime(108, ctx.currentTime); // La grave

    droneOsc2.type = 'sine';
    droneOsc2.frequency.setValueAtTime(162, ctx.currentTime); // Quinte douce

    droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    droneGain.gain.exponentialRampToValueAtTime(volume * 0.35, ctx.currentTime + 3.0);

    droneOsc1.connect(droneGain);
    droneOsc2.connect(droneGain);
    droneGain.connect(ctx.destination);

    droneOsc1.start();
    droneOsc2.start();

    isAmbiencePlaying = true;
    return true;
  } catch (e) {
    console.warn('Erreur démarrage ambiance:', e);
    return false;
  }
}

/**
 * Arrête l'ambiance sonore en fondu doux
 */
export function stopAmbience() {
  try {
    if (!isAmbiencePlaying || !ambienceCtx) return;
    const ctx = ambienceCtx;

    if (gainNode && ctx.currentTime) {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    }
    if (droneGain && ctx.currentTime) {
      droneGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    }

    setTimeout(() => {
      try {
        if (noiseNode) {
          noiseNode.stop();
          noiseNode.disconnect();
          noiseNode = null;
        }
        if (droneOsc1) {
          droneOsc1.stop();
          droneOsc1.disconnect();
          droneOsc1 = null;
        }
        if (droneOsc2) {
          droneOsc2.stop();
          droneOsc2.disconnect();
          droneOsc2 = null;
        }
      } catch (e) {}
      isAmbiencePlaying = false;
    }, 1300);
  } catch (e) {
    isAmbiencePlaying = false;
  }
}

export function getIsAmbiencePlaying() {
  return isAmbiencePlaying;
}
