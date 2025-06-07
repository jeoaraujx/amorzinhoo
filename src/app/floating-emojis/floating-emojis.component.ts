import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  symbol: string;
  size: number;
  speed: number;
  delay: number;
  rotate: number;
}

@Component({
  selector: 'app-floating-emojis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-emojis.component.html',
  styleUrl: './floating-emojis.component.css',
})
export class FloatingEmojisComponent {
  items = signal<FloatingItem[]>([]);
  private symbols = ['🌸', '🌹', '🌼', '❤️', '💕', '💖', '💘', '🌷'];
  private intervalId: any;

  constructor() {
    this.initializeItems();

    effect((onCleanup) => {
      this.intervalId = setInterval(() => {
        this.updatePositions();
      }, 15000);

      onCleanup(() => {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      });
    });
  }

  floatingStyles(item: FloatingItem) {
    return {
      left: `${item.x}%`,
      top: `${item.y}%`,
      fontSize: `${item.size}rem`,
      transform: `rotate(${item.rotate}deg)`,
      animationDelay: `${item.delay}s`,
      opacity: 0.8,
      zIndex: 10,
      position: 'absolute',
      animation: 'float-random 8s infinite ease-in-out',
      pointerEvents: 'none',
    };
  }

  private initializeItems(): void {
    const newItems: FloatingItem[] = [];

    for (let i = 0; i < 20; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        size: Math.random() * 1.5 + 0.8,
        speed: Math.random() * 10 + 10,
        delay: Math.random() * -20,
        rotate: Math.random() * 360,
      });
    }

    this.items.set(newItems);
  }

  private updatePositions(): void {
    this.items.update((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }))
    );
  }
}
