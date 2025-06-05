import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Photo {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-photo-carousel',
  imports: [CommonModule],
  templateUrl: './photo-carousel.component.html',
  styleUrl: './photo-carousel.component.css',
})
export class PhotoCarouselComponent {
  @Input({ required: true }) photos!: Photo[];

  private destroyRef = inject(DestroyRef);
  currentIndex = signal(0);
  now = signal(Date.now());

  constructor() {
    const interval = setInterval(() => {
      this.nextPhoto();
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  nextPhoto = () => {
    this.currentIndex.update((index) => (index % this.photos.length) + 1);
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
    const position = index - this.currentIndex() + this.photos.length;
    const isActive = position === 0;
    const isPrev = position === this.photos.length - 1;
    const isNext = position === 1;

    const zIndex = 10 - Math.abs(position);
    const opacity = isActive ? 1 : isPrev || isNext ? 0.8 : 0.5;
    const scale = isActive ? 1 : isPrev || isNext ? 0.9 : 0.8;
    const translateX = isPrev ? -60 : isNext ? 60 : 0;
    const rotate = this.getRandomRotation(index);

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      zIndex,
    };
  }
}
