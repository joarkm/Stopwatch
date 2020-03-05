import { Component, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { TimingAction, TimingEvent } from '~shared/components/events/timing.event';
import { TimingState } from '~shared/components/states';
import { TimerService } from './timer.service';
import { TimerComponent } from './timer/timer.component';
import { Timer } from './timer';

@Component({
  selector: 'app-timer-container',
  templateUrl: './timer-container.component.html',
  styleUrls: ['./timer-container.component.scss'],
  providers: [Timer]
})
export class TimerContainerComponent {

  @ViewChild(TimerComponent, { static: false })
  timerComponent: TimerComponent;

  private timerStopSource: Subject<void> = new Subject<void>();
  private timerStop$: Observable<void> = this.timerStopSource.asObservable();

  public minutes$: Observable<string> = of('0');
  public seconds$: Observable<string> = of('0.0');

  constructor(
    private timerService: TimerService,
    private timer: Timer
  ) { }

  public startTimer(seconds: string, minutes: string) {
    const { seconds$, minutes$ } = this.timer.createNewTimer(
      parseInt(seconds, 10) || 0,
      parseInt(minutes, 10) || 0
    );

    this.seconds$ = seconds$.pipe(finalize(() => { this.onTimerEnded(); }));
    this.minutes$ = minutes$;
    this.seconds$
      .subscribe(val => console.log(val));
      // .subscribe(val => console.log(`${val} secs`));
    this.minutes$
      // .subscribe(val => console.log(val));
      .subscribe(val => console.log(`${val} minutes`));
    this.timer.startTimer();
  }

  public resumeTimer(): void {
    this.timer.resumeTimer();
  }

  public resetTimer(): void {
    this.timer.stopTimer();
    // Reset values
    this.seconds$ = of('0.0');
    this.minutes$ = of('0');
  }

  public pauseTimer(): void {
    this.timer.pauseTimer();
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
        return this.resumeTimer();
      default:
        break;
    }
  }

  private onTimerEnded(): void {
    this.resetTimer();
    this.timerComponent.parentNotifyTimerEnded();
  }

}
