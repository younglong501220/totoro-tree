/**
 * Web Audio API 8-bit Synthesizer for "となりのトトロ" (My Neighbor Totoro Theme)
 * Composed by Joe Hisaishi
 * Dual-channel chip sound: Lead Square wave + Bass Triangle wave
 */

export interface NoteEvent {
  m: number; // Melody frequency in Hz (0 = rest)
  b: number; // Bass frequency in Hz (0 = rest)
  d: number; // Duration in ms
  lyric?: string; // Subtitle lyric text
}

// Frequency constants (Hz)
const C3 = 130.81, D3 = 146.83, E3 = 164.81, F3 = 174.61, G3 = 196.00, A3 = 220.00, B3 = 246.94;
const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00, B5 = 987.77;

export const TOTORO_SCORE: NoteEvent[] = [
  // Intro Call: トットロ トット～ロ (0:04)
  { m: C5, b: C3, d: 240, lyric: "トットロ" },
  { m: C5, b: G3, d: 240, lyric: "トットロ" },
  { m: E5, b: C3, d: 240, lyric: "トット～" },
  { m: G5, b: G3, d: 420, lyric: "～ロ♪" },
  { m: 0,  b: 0,  d: 80,  lyric: "..." },
  { m: E5, b: C3, d: 240, lyric: "トットロ" },
  { m: D5, b: G3, d: 240, lyric: "トット～" },
  { m: C5, b: C3, d: 520, lyric: "～ロ♪" },
  { m: 0,  b: 0,  d: 120, lyric: "..." },

  // Intro Call 2: トットロ トット～ロ
  { m: C5, b: C3, d: 240, lyric: "トットロ" },
  { m: C5, b: G3, d: 240, lyric: "トットロ" },
  { m: E5, b: C3, d: 240, lyric: "トット～" },
  { m: G5, b: G3, d: 420, lyric: "～ロ♪" },
  { m: 0,  b: 0,  d: 80,  lyric: "..." },
  { m: A4, b: F3, d: 240, lyric: "森の" },
  { m: C5, b: G3, d: 240, lyric: "精霊" },
  { m: D5, b: C3, d: 550, lyric: "トトロ～♪" },
  { m: 0,  b: 0,  d: 160, lyric: "..." },

  // Chorus: となりのトトロ～ トトロ～
  { m: G4, b: C3, d: 220, lyric: "とな" },
  { m: C5, b: G3, d: 220, lyric: "りの" },
  { m: D5, b: C3, d: 220, lyric: "トト" },
  { m: E5, b: G3, d: 400, lyric: "ロ～" },
  { m: F5, b: F3, d: 200, lyric: "トト" },
  { m: E5, b: G3, d: 200, lyric: "ロ～" },
  { m: D5, b: C3, d: 200, lyric: "トト" },
  { m: C5, b: G3, d: 380, lyric: "ロ～♪" },
  { m: E5, b: C3, d: 220, lyric: "とな" },
  { m: G5, b: G3, d: 220, lyric: "りの" },
  { m: E5, b: C3, d: 440, lyric: "トトロ" },
  { m: D5, b: G3, d: 220, lyric: "トト" },
  { m: E5, b: C3, d: 220, lyric: "～" },
  { m: C5, b: G3, d: 500, lyric: "ロ～♪" },
  { m: 0,  b: 0,  d: 120, lyric: "..." },

  // Verse: 森の中に 昔から住んでる～
  { m: E5, b: C3, d: 200, lyric: "森の" },
  { m: E5, b: G3, d: 200, lyric: "中に" },
  { m: E5, b: C3, d: 200, lyric: "むか" },
  { m: D5, b: G3, d: 200, lyric: "しから" },
  { m: C5, b: A3, d: 220, lyric: "すん" },
  { m: A4, b: F3, d: 220, lyric: "でる～" },
  { m: C5, b: G3, d: 220, lyric: "とな" },
  { m: D5, b: C3, d: 440, lyric: "りの～" },
  { m: 0,  b: 0,  d: 100, lyric: "..." },

  // Climax: 子供のときにだけ あなたに訪れる～
  { m: G4, b: C3, d: 220, lyric: "子供の" },
  { m: C5, b: G3, d: 220, lyric: "ときに" },
  { m: D5, b: C3, d: 220, lyric: "だけ" },
  { m: E5, b: G3, d: 380, lyric: "あなたに" },
  { m: F5, b: F3, d: 200, lyric: "おとず" },
  { m: E5, b: G3, d: 200, lyric: "れる～" },
  { m: D5, b: C3, d: 200, lyric: "不思議な" },
  { m: C5, b: G3, d: 400, lyric: "であい～" },
  { m: E5, b: C3, d: 220, lyric: "雨の" },
  { m: E5, b: G3, d: 220, lyric: "バス停" },
  { m: E5, b: C3, d: 220, lyric: "夜の" },
  { m: D5, b: G3, d: 220, lyric: "大樟樹" },
  { m: C5, b: A3, d: 220, lyric: "どんどこ" },
  { m: D5, b: F3, d: 220, lyric: "おどろ" },
  { m: E5, b: G3, d: 220, lyric: "う～" },
  { m: C5, b: C3, d: 400, lyric: "ニャー！" },

  // Outro: 不思議な出会い～
  { m: D5, b: G3, d: 240, lyric: "となりの" },
  { m: E5, b: C3, d: 240, lyric: "トトロ" },
  { m: D5, b: G3, d: 240, lyric: "トトロ" },
  { m: C5, b: C3, d: 680, lyric: "ト～ト～ロ～♪" },
  { m: 0,  b: 0,  d: 350, lyric: "（間奏休憩）" },
];

export class TotoroSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  public isPlaying: boolean = false;
  private timer: number | null = null;
  public currentStep: number = 0;
  public tempoMultiplier: number = 1.0;
  public volume: number = 0.5;
  private onStepCallback: ((step: number, note: NoteEvent) => void) | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setStepCallback(cb: (step: number, note: NoteEvent) => void) {
    this.onStepCallback = cb;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setTempo(multiplier: number) {
    this.tempoMultiplier = multiplier;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
    this.init();
    if (!this.ctx || !this.masterGain || freq <= 0) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback failsafe
    }
  }

  public startTheme() {
    this.init();
    this.isPlaying = true;
    this.currentStep = 0;
    this.tick();
  }

  public stopTheme() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggleTheme(): boolean {
    if (this.isPlaying) {
      this.stopTheme();
      return false;
    } else {
      this.startTheme();
      return true;
    }
  }

  private tick() {
    if (!this.isPlaying) return;

    const item = TOTORO_SCORE[this.currentStep];
    const durationSec = (item.d / 1000) * 0.92;

    if (this.onStepCallback) {
      this.onStepCallback(this.currentStep, item);
    }

    // Lead melody: 8-bit square wave
    if (item.m > 0) {
      this.playTone(item.m, 'square', durationSec, 0.12);
    }
    // Bass accompaniment: triangle wave
    if (item.b > 0) {
      this.playTone(item.b, 'triangle', durationSec * 0.85, 0.16);
    }

    this.currentStep = (this.currentStep + 1) % TOTORO_SCORE.length;
    const nextInterval = (item.d / this.tempoMultiplier);
    this.timer = window.setTimeout(() => this.tick(), nextInterval);
  }

  // --- Sound Effects (SFX) ---

  // 1. Jump / Glide sound
  public playSfxJump() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.18);
  }

  // 2. Acorn Picked / Sparkle
  public playSfxAcorn() {
    this.init();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.12, 0.14);
      }, idx * 60);
    });
  }

  // 3. Totoro Roar
  public playSfxRoar() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 0.65);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.65);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.65);
  }

  // 4. Damage / Collision Thud
  public playSfxHurt() {
    this.init();
    this.playTone(180, 'sawtooth', 0.14, 0.25);
    setTimeout(() => {
      this.playTone(105, 'sawtooth', 0.22, 0.25);
    }, 70);
  }

  // 5. Catbus Meow Horn
  public playSfxCatbus() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(660, this.ctx.currentTime + 0.45);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }

  // 6. Victory Fanfare
  public playSfxVictory() {
    this.init();
    const fanfare = [
      { f: 523.25, d: 120 },
      { f: 523.25, d: 120 },
      { f: 523.25, d: 120 },
      { f: 659.25, d: 350 },
      { f: 783.99, d: 450 },
      { f: 1046.5, d: 600 }
    ];
    let offset = 0;
    fanfare.forEach(note => {
      setTimeout(() => {
        this.playTone(note.f, 'square', note.d / 1000, 0.2);
      }, offset);
      offset += note.d + 30;
    });
  }
}

export const totoroSynth = new TotoroSynthesizer();
