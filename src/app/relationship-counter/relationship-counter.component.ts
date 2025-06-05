import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-relationship-counter',
  imports: [],
  templateUrl: './relationship-counter.component.html',
  styleUrl: './relationship-counter.component.css',
})
export class RelationshipCounterComponent {
  @Input({ required: true }) startDate!: Date;

  private now = signal(new Date());
  private destroyRef = inject(DestroyRef);

  constructor() {
    const interval = setInterval(() => {
      this.now.set(new Date());
    }, 1000);

    effect(() => {
      this.destroyRef.onDestroy(() => clearInterval(interval));
    });
  }

  timeElapsed = computed(() => {
    const now = this.now();
    const startDate = this.startDate;

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    let days = now.getDate() - startDate.getDate();
    if (days < 0) {
      months--;
      if (months < 0) {
        months += 12;
        years--;
      }
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
    }

    const diff = now.getTime() - startDate.getTime();

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  });
}
