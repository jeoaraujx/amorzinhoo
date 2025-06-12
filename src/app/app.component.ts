import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RelationshipCounterComponent } from './relationship-counter/relationship-counter.component';
import { PhotoCarouselComponent } from './photo-carousel/photo-carousel.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { FloatingEmojisComponent } from './floating-emojis/floating-emojis.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    RelationshipCounterComponent,
    PhotoCarouselComponent,
    MusicPlayerComponent,
    FloatingEmojisComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'amorzinhoo';

  startDate = new Date('2024-04-28T01:00:00');

  photos = Array.from({ length: 26 }, (_, i) => ({
    src: `/assets/img_${i + 1}.webp`,
    alt: 'Só nós dois',
  }));

  currentYear = new Date().getFullYear();

  track = {
    audioSrc: '/Vanessa da Mata - Ainda Bem.mp3',
    trackName: 'Nossa música especial',
  };
}
