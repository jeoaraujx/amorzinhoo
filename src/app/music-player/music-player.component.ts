import {
  Component,
  Input,
  DestroyRef,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Play,
  Pause,
  VolumeX,
  Volume2,
} from 'lucide-angular';

interface MusicPlayer {
  audioSrc: string;
  trackName: string;
}

@Component({
  selector: 'app-music-player',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent {
  @Input({ required: true }) audioSrc!: MusicPlayer;

  private readonly destroyRef = inject(DestroyRef);
  private readonly audio = new Audio();

  readonly isPlaying = signal(true);
  readonly isMuted = signal(false);
  readonly progress = signal(0);
  readonly Play = Play;
  readonly Pause = Pause;
  readonly VolumeX = VolumeX;
  readonly Volume2 = Volume2;

  readonly trackName = computed(() => this.audioSrc.trackName);

  readonly ariaLabelPlay = computed(() => {
    return this.isPlaying() ? 'Pausar' : 'Tocar';
  });

  readonly ariaLabelMute = computed(() => {
    return this.isMuted() ? 'Desmutar' : 'Mutar';
  });

  constructor() {
    effect(
      () => {
        this.audio.src = this.audioSrc.audioSrc;
        this.audio.loop = true;
        this.audio.muted = this.isMuted();

        this.tryAutoPlay();
        this.setupProgressTracker();
      },
      { allowSignalWrites: true }
    );
  }

  private tryAutoPlay() {
    this.audio
      .play()
      .then(() => {
        this.isPlaying.set(true);
      })
      .catch((error) => {
        console.error('Auto-play bloqueado:', error);
        this.isPlaying.set(false);
      });
  }

  togglePlay() {
    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play();
      this.isPlaying.set(true);
    }
  }

  toggleMute() {
    const muted = !this.isMuted();
    this.audio.muted = muted;
    this.isMuted.set(muted);
  }

  private setupProgressTracker() {
    const interval = setInterval(() => {
      if (this.audio.duration > 0) {
        const value = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.set(value);
      }
    }, 1000);

    this.destroyRef.onDestroy(() => {
      this.audio.pause();
      clearInterval(interval);
    });
  }
}
