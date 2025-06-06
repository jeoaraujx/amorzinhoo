import {
  Component,
  computed,
  DestroyRef,
  inject,
  Input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

interface Photo {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-photo-carousel',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './photo-carousel.component.html',
  styleUrl: './photo-carousel.component.css',
})
export class PhotoCarouselComponent {
  @Input({ required: true }) photos!: Photo[];

  private destroyRef = inject(DestroyRef);
  currentIndex = signal(0);
  now = signal(Date.now());

  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  constructor() {
    const interval = setInterval(() => {
      this.nextPhoto();
    }, 5000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  nextPhoto = () => {
    this.currentIndex.update((index) => (index + 1) % this.photos.length);
  };

  prevPhoto = () => {
    this.currentIndex.update(
      (index) => (index - 1 + this.photos.length) % this.photos.length
    );
  };

  getRandomRotation(index: number): number {
    const seed = (index * 7) % 11;
    return seed - 5;
  }

  getPhotoStyles(index: number) {
    const position =
      (index - this.currentIndex() + this.photos.length) % this.photos.length;
    const isActive = position === 0;
    const isPrev = position === this.photos.length - 1;
    const isNext = position === 1;

    let zIndex = 10 - Math.abs(position);
    let opacity = isActive ? 1 : isPrev || isNext ? 0.8 : 0.5;
    let scale = isActive ? 1 : isPrev || isNext ? 0.9 : 0.8;
    let translateX = 0;

    if (isPrev) translateX = -60;
    if (isNext) translateX = 60;

    const rotate = this.getRandomRotation(index);

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      zIndex,
    };
  }

  readonly photosWithStyles = computed(() =>
    this.photos.map((photo, index) => ({
      ...photo,
      index,
      style: this.getPhotoStyles(index),
    }))
  );
}
