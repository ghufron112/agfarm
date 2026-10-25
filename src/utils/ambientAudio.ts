// Procedural Ambient Backsound Engine for AG Farm & Melo AI
// High-fidelity, zero-dependency, lightweight Web Audio API synthesis
// Features: Morning Garden & Birds, Soothing Irrigation Streams, Lo-Fi Agro Chill

export type AmbientTrackId = 'morning_garden' | 'water_stream' | 'lofi_chill';

export interface AmbientTrackInfo {
  id: AmbientTrackId;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
}

export const AMBIENT_TRACKS: AmbientTrackInfo[] = [
  {
    id: 'morning_garden',
    title: 'Kebun Semangka Pagi',
    subtitle: 'Kicauan Burung & Denting Melodi Akustik',
    icon: '🌱',
    description: 'Suasana fajar kebun semangka Batuampar dengan kicau burung alami dan lonceng melodi santai.'
  },
  {
    id: 'lofi_chill',
    title: 'AG Farm Lo-Fi Chill',
    subtitle: 'Warm Rhodes & Mellow Agro Beats',
    icon: '🍉',
    description: 'Petikan chord piano Lo-Fi yang hangat dan menenangkan saat memantau data IoT kebun.'
  },
  {
    id: 'water_stream',
    title: 'Relaksasi Irigasi Tetes',
    subtitle: 'Aliran Air Gemericik & Ambient Meditatif',
    icon: '💧',
    description: 'Gemericik air irigasi tetes alami yang menyejukkan pikiran untuk fokus riset.'
  }
];

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying = false;
  private currentTrackId: AmbientTrackId = 'morning_garden';
  private volume = 0.45; // Default comfortable volume
  private isMuted = false;

  // Active timers & audio nodes for procedural generation
  private loopIntervals: number[] = [];
  private noiseNodes: AudioNode[] = [];
  private listeners: Set<(state: AmbientState) => void> = new Set();
  private hasUserInteracted = false;

  constructor() {
    // Read persisted preferences
    if (typeof window !== 'undefined') {
      const savedTrack = localStorage.getItem('agfarm_ambient_track') as AmbientTrackId;
      if (savedTrack && AMBIENT_TRACKS.some(t => t.id === savedTrack)) {
        this.currentTrackId = savedTrack;
      }
      const savedVol = localStorage.getItem('agfarm_ambient_vol');
      if (savedVol !== null) {
        this.volume = Math.max(0, Math.min(1, parseFloat(savedVol)));
      }
      const savedMute = localStorage.getItem('agfarm_ambient_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }

      // Setup one-time gesture interaction listener to unlock audio policy
      const unlockAudio = () => {
        this.hasUserInteracted = true;
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
    }
  }

  private initContext(): boolean {
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return false;
        this.ctx = new AudioContextClass();
      }

      if (!this.masterGain && this.ctx) {
        this.masterGain = this.ctx.createGain();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 32;
        this.analyser.smoothingTimeConstant = 0.7;

        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
        this.updateMasterVolume(0); // start at 0, fade in
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return true;
    } catch {
      return false;
    }
  }

  public subscribe(callback: (state: AmbientState) => void): () => void {
    this.listeners.add(callback);
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach(cb => cb(state));
  }

  public getState(): AmbientState {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      volume: this.volume,
      isMuted: this.isMuted,
      trackInfo: AMBIENT_TRACKS.find(t => t.id === this.currentTrackId) || AMBIENT_TRACKS[0]
    };
  }

  public getVisualizerData(): Uint8Array {
    if (!this.analyser || !this.isPlaying || this.isMuted) {
      return new Uint8Array([0, 0, 0, 0, 0, 0]);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public async play(): Promise<boolean> {
    if (!this.initContext() || !this.ctx || !this.masterGain) {
      return false;
    }

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Will resume on next user gesture
      }
    }

    this.stopInternal();
    this.isPlaying = true;

    // Smooth fade in master gain
    const targetVol = this.isMuted ? 0 : this.volume;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, targetVol), now + 1.2);

    // Launch procedural synthesis according to track
    if (this.currentTrackId === 'morning_garden') {
      this.startMorningGardenTrack();
    } else if (this.currentTrackId === 'lofi_chill') {
      this.startLofiChillTrack();
    } else if (this.currentTrackId === 'water_stream') {
      this.startWaterStreamTrack();
    }

    this.notify();
    return true;
  }

  public pause() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    // Smooth fade out
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    setTimeout(() => {
      this.stopInternal();
      this.isPlaying = false;
      this.notify();
    }, 600);
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setTrack(trackId: AmbientTrackId) {
    if (this.currentTrackId === trackId) return;
    this.currentTrackId = trackId;
    if (typeof window !== 'undefined') {
      localStorage.setItem('agfarm_ambient_track', trackId);
    }

    if (this.isPlaying) {
      // Crossfade smoothly
      this.play();
    } else {
      this.notify();
    }
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (this.isMuted && clamped > 0) {
      this.isMuted = false;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('agfarm_ambient_vol', clamped.toString());
      localStorage.setItem('agfarm_ambient_muted', this.isMuted.toString());
    }
    this.updateMasterVolume();
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('agfarm_ambient_muted', this.isMuted.toString());
    }
    this.updateMasterVolume();
    this.notify();
  }

  private updateMasterVolume(target?: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const finalVol = target !== undefined ? target : (this.isMuted ? 0.0001 : this.volume);
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(Math.max(0.0001, finalVol), now + 0.2);
  }

  private stopInternal() {
    this.loopIntervals.forEach(id => window.clearInterval(id));
    this.loopIntervals = [];

    this.noiseNodes.forEach(node => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.noiseNodes = [];
  }

  // ==========================================
  // PROCEDURAL TRACK 1: KEBUN SEMANGKA PAGI
  // ==========================================
  private startMorningGardenTrack() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Soft wind & morning rustle (pink noise bandpass)
    const windNode = this.createNoiseBufferNode('pink', 0.025, 380, 0.8);
    if (windNode) this.noiseNodes.push(windNode);

    // 2. Chime Pentatonic Arpeggios (E major pentatonic: E4, F#4, G#4, B4, C#5, E5, F#5, G#5)
    const gardenScale = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25, 739.99, 830.61];
    let noteIdx = 0;

    const playGardenChime = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const freq = gardenScale[(noteIdx + Math.floor(Math.random() * 3)) % gardenScale.length];
      noteIdx = (noteIdx + 1) % gardenScale.length;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);

      // Bell-like chime envelope: snappy attack, long warm decay
      const duration = 2.2;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.12, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + duration);
      oscHarmonic.stop(now + duration);
    };

    // Play first chime immediately
    playGardenChime();
    const chimeTimer = window.setInterval(playGardenChime, 1800);
    this.loopIntervals.push(chimeTimer);

    // 3. Procedural Morning Bird Chirps (Every 3 - 6 seconds)
    const playBirdChirp = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const baseFreq = 2400 + Math.random() * 800;
      const chirpsCount = 2 + Math.floor(Math.random() * 3);

      for (let i = 0; i < chirpsCount; i++) {
        const chirpStart = now + i * 0.09;
        const birdOsc = this.ctx.createOscillator();
        const birdGain = this.ctx.createGain();

        birdOsc.type = 'sine';
        birdOsc.frequency.setValueAtTime(baseFreq, chirpStart);
        birdOsc.frequency.exponentialRampToValueAtTime(baseFreq + 600, chirpStart + 0.035);
        birdOsc.frequency.exponentialRampToValueAtTime(baseFreq - 300, chirpStart + 0.07);

        birdGain.gain.setValueAtTime(0.0001, chirpStart);
        birdGain.gain.linearRampToValueAtTime(0.045, chirpStart + 0.02);
        birdGain.gain.exponentialRampToValueAtTime(0.0001, chirpStart + 0.075);

        birdOsc.connect(birdGain);
        birdGain.connect(this.masterGain);

        birdOsc.start(chirpStart);
        birdOsc.stop(chirpStart + 0.08);
      }
    };

    const birdTimer = window.setInterval(() => {
      if (Math.random() > 0.3) {
        playBirdChirp();
      }
    }, 4000);
    this.loopIntervals.push(birdTimer);
  }

  // ==========================================
  // PROCEDURAL TRACK 2: AG FARM LO-FI CHILL
  // ==========================================
  private startLofiChillTrack() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Warm Vinyl Crackle & Ambient Texture
    const vinylNode = this.createNoiseBufferNode('brown', 0.018, 550, 0.6);
    if (vinylNode) this.noiseNodes.push(vinylNode);

    // 2. Lo-Fi Chord Progressions (Cmaj7 -> Am7 -> Dm7 -> G7 -> Em7)
    const lofiChords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7: C4, E4, G4, B4
      [220.00, 261.63, 329.63, 392.00], // Am7: A3, C4, E4, G4
      [146.83, 220.00, 261.63, 349.23], // Dm7: D3, A3, C4, F4
      [196.00, 246.94, 293.66, 349.23], // G7: G3, B3, D4, F4
      [164.81, 196.00, 246.94, 293.66]  // Em7: E3, G3, B3, D4
    ];
    let chordIdx = 0;

    const playLofiChord = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const chord = lofiChords[chordIdx % lofiChords.length];
      chordIdx++;

      const now = this.ctx.currentTime;
      const duration = 3.6;

      // Play each note with warm rhodes-like timbre and slight arpeggiation delay
      chord.forEach((freq, noteInChordIdx) => {
        if (!this.ctx || !this.masterGain) return;
        const noteStart = now + noteInChordIdx * 0.035;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, noteStart);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 1.002, noteStart); // Warm chorus detune

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, noteStart);
        filter.Q.setValueAtTime(1.2, noteStart);

        // Soft Rhodes envelope
        noteGain.gain.setValueAtTime(0.0001, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.08, noteStart + 0.06);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc1.start(noteStart);
        osc2.start(noteStart);
        osc1.stop(noteStart + duration);
        osc2.stop(noteStart + duration);
      });

      // Subtle Sub Bass Note on 1st beat
      const bassFreq = chord[0] / 2;
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);
      bassOsc.start(now);
      bassOsc.stop(now + 2.9);
    };

    playLofiChord();
    const lofiTimer = window.setInterval(playLofiChord, 3800);
    this.loopIntervals.push(lofiTimer);
  }

  // ==========================================
  // PROCEDURAL TRACK 3: RELAKSASI IRIGASI AIR
  // ==========================================
  private startWaterStreamTrack() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Natural flowing water stream bed (brown/pink noise filtered)
    const waterBed = this.createNoiseBufferNode('pink', 0.045, 700, 1.4);
    if (waterBed) this.noiseNodes.push(waterBed);

    // 2. Resonant Meditative Pad in background (Frequencies of peaceful F major 9)
    const padFreqs = [174.61, 220.00, 261.63, 329.63, 392.00];
    const now = this.ctx.currentTime;
    padFreqs.forEach(freq => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const padGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      padGain.gain.setValueAtTime(0.0001, now);
      padGain.gain.linearRampToValueAtTime(0.02, now + 3.0);

      osc.connect(filter);
      filter.connect(padGain);
      padGain.connect(this.masterGain);

      osc.start(now);
      this.noiseNodes.push(osc);
    });

    // 3. Gentle Periodic Water Droplets (Drip sound at randomized intervals)
    const playWaterDroplet = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const dripNow = this.ctx.currentTime;
      const dropFreq = 500 + Math.random() * 400;

      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(dropFreq, dripNow);
      osc.frequency.exponentialRampToValueAtTime(dropFreq * 1.8, dripNow + 0.04);

      dropGain.gain.setValueAtTime(0.0001, dripNow);
      dropGain.gain.linearRampToValueAtTime(0.08, dripNow + 0.015);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, dripNow + 0.12);

      osc.connect(dropGain);
      dropGain.connect(this.masterGain);

      osc.start(dripNow);
      osc.stop(dripNow + 0.13);
    };

    const dropTimer = window.setInterval(() => {
      playWaterDroplet();
      if (Math.random() > 0.5) {
        setTimeout(playWaterDroplet, 180);
      }
    }, 1400);
    this.loopIntervals.push(dropTimer);
  }

  /**
   * Helper to create filtered looping procedural noise buffer (pink, brown, white)
   */
  private createNoiseBufferNode(
    color: 'pink' | 'brown', 
    gainLevel: number, 
    filterCutoff: number, 
    filterQ = 1.0
  ): AudioNode | null {
    if (!this.ctx || !this.masterGain) return null;

    const bufferSize = this.ctx.sampleRate * 4; // 4 seconds loop
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    let lastOut = 0.0;
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (color === 'pink') {
        // Paul Kellet's pink noise filter
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      } else {
        // Brown noise
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    }

    const whiteNoiseSource = this.ctx.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    whiteNoiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterCutoff, this.ctx.currentTime);
    filter.Q.setValueAtTime(filterQ, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);

    whiteNoiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    whiteNoiseSource.start(this.ctx.currentTime);
    return whiteNoiseSource;
  }
}

export interface AmbientState {
  isPlaying: boolean;
  currentTrackId: AmbientTrackId;
  volume: number;
  isMuted: boolean;
  trackInfo: AmbientTrackInfo;
}

// Singleton global ambient engine instance
export const ambientAudio = new AmbientAudioEngine();
