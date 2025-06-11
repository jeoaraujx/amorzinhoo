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

  photos = Array.from({ length: 26 }, (_, i) => {
    const num = i + 1;
    return {
      src: `/img_${num}.jpg`,
      alt: 'Só nós dois',
    };
  });

  currentYear = new Date().getFullYear();

  track = {
    audioSrc: 'xxx',
    trackName: 'Nossa música especial',
  };
}
