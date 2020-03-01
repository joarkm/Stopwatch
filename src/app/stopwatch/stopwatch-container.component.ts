import { Component } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimingAction, TimingEvent } from '~shared/components/events/timing.event';
import { StopwatchService } from './stopwatch.service';

@Component({
  selector: 'app-stopwatch-container',
  templateUrl: './stopwatch-container.component.html',
  styleUrls: ['./stopwatch-container.component.scss']
})
export class StopwatchContainerComponent {

  private counterStopSource: Subject<void> = new Subject<void>();
  private counterStop$: Observable<void> = this.counterStopSource.asObservable();

  public counterSeconds$: Observable<string> = of('0.0');

  constructor(
    private stopwatchService: StopwatchService,
  ) { }

  public startCounter(): void {
    this.counterSeconds$ = this.stopwatchService.startTimer().pipe(
      takeUntil(this.counterStop$)
    );
  }

  public pauseCounter(): void {
    this.counterStopSource.next();
  }

  public resumeCounter(state: { hours: string, minutes: string, seconds: string}): void {
    const currentCount = parseInt(state.minutes, 10) * 60
      + parseFloat(state.seconds);
    this.counterSeconds$ = this.stopwatchService.startTimer(currentCount).pipe(
      takeUntil(this.counterStop$)
    );
  }

  public stopCounter(): void {
    this.counterStopSource.next();
    // Reset values
    this.counterSeconds$ = of('0.0');
  }

  public onTimingEventEmitted(timingEvent: TimingEvent): void {
    switch (timingEvent.action) {
      case TimingAction.START:
        return this.startCounter();
      case TimingAction.STOP:
        return this.stopCounter();
      case TimingAction.PAUSE:
        return this.pauseCounter();
      case TimingAction.RESUME:
        return this.resumeCounter(timingEvent.data);
      default:
        break;
    }
  }

}
