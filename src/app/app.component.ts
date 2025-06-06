import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RelationshipCounterComponent } from './relationship-counter/relationship-counter.component';
import { PhotoCarouselComponent } from './photo-carousel/photo-carousel.component';
import { MusicPlayerComponent } from './music-player/music-player.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    RelationshipCounterComponent,
    PhotoCarouselComponent,
    MusicPlayerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'amorzinhoo';

  startDate = new Date('2024-04-28T01:00:00');

  photos = [
    {
      src: '/img_1.jpg',
      alt: 'Nossa primeira foto juntos',
    },
    {
      src: '/img_2.jpg',
      alt: 'Aniversário especial',
    },
    {
      src: '/img_3.jpg',
      alt: 'Viagem inesquecível',
    },
  ];

  currentYear = new Date().getFullYear();

  track = {
    audioSrc: 'xxx',
    trackName: 'Nossa música especial',
  };
}
