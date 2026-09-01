// Web Audio API ambient waltz / acoustic instrumental generator
class AmbientMusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private noteIndex: number = 0;
  private gainNode: GainNode | null = null;

  // Romantic / elegant waltz melody chords
  private melodyNotes: number[] = [
    523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
    587.33, 698.46, 880.00, 1174.66, // D5, F5, A5, D6
    659.25, 783.99, 987.77, 1318.51, // E5, G5, B5, E6
    523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
    440.00, 554.37, 659.25, 880.00,  // A4, C#5, E5, A5
    392.00, 493.88, 587.33, 783.99,  // G4, B4, D5, G5
    349.23, 440.00, 523.25, 698.46,  // F4, A4, C5, F5
    392.00, 493.88, 587.33, 783.99,  // G4, B4, D5, G5
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 0.15;
        this.gainNode.connect(this.ctx.destination);
      }
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.scheduleNotes();
  }

  private playTone(freq: number, duration: number = 0.6) {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft music box / bell timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);

      // Add soft harmonic overtone
      const overtone = this.ctx.createOscillator();
      const overGain = this.ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      overGain.gain.setValueAtTime(0, this.ctx.currentTime);
      overGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.04);
      overGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration * 0.8);

      overtone.connect(overGain);
      overGain.connect(this.gainNode);

      overtone.start(this.ctx.currentTime);
      overtone.stop(this.ctx.currentTime + duration * 0.8);
    } catch {
      // Audio context might be restricted
    }
  }

  private scheduleNotes() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      const note = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.playTone(note, 0.7);
      this.noteIndex++;
    }, 480);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol * 0.2)), this.ctx.currentTime);
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicPlayer = new AmbientMusicPlayer();
