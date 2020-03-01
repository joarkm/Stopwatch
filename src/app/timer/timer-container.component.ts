import { Component, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { TimingAction, TimingEvent } from '~shared/components/events/timing.event';
import { TimerService } from '../stopwatch/timer.service';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-timer-container',
  templateUrl: './timer-container.component.html',
  styleUrls: ['./timer-container.component.scss']
})
export class TimerContainerComponent {

  @ViewChild(TimerComponent, { static: false })
  timerComponent: TimerComponent;

  private timerStopSource: Subject<void> = new Subject<void>();
  private timerStop$: Observable<void> = this.timerStopSource.asObservable();

  public minutes$: Observable<string> = of('0');
  public seconds$: Observable<string> = of('0.0');

  constructor(
    private timerService: TimerService
  ) { }

  public startTimer(seconds: string, minutes: string) {
    const { minutes$, seconds$ } = this.timerService.getObservables(
      parseInt(seconds, 10) || 0,
      parseInt(minutes, 10) || 0
    );
    this.minutes$  = minutes$.pipe(
      takeUntil(this.timerStop$)
    );
    this.seconds$ = seconds$.pipe(
      takeUntil(this.timerStop$),
      finalize(() => { this.onTimerEnded(); })
    );
  }

  public resumeTimer(data: { hours: string, minutes: string, seconds: string}): void {
    this.startTimer(data.seconds, data.minutes);
  }

  public resetTimer(): void {
    this.timerStopSource.next();
    // Reset values
    this.seconds$ = of('0.0');
    this.minutes$ = of('0');
  }

  public pauseTimer(): void {
    this.timerStopSource.next();
  }

  public onTimingEventEmitted(timingEvent: TimingEvent): void {
    switch (timingEvent.action) {
      case TimingAction.START: {
        const { minutes, seconds } = timingEvent.data;
        return this.startTimer(seconds, minutes);
      }
      case TimingAction.STOP:
        return this.resetTimer();
      case TimingAction.PAUSE:
        return this.pauseTimer();
      case TimingAction.RESUME:
        return this.resumeTimer(timingEvent.data);
      default:
        break;
    }
  }

  private onTimerEnded(): void {
    this.resetTimer();
    this.timerComponent.parentNotifyTimerEnded();
  }

}
