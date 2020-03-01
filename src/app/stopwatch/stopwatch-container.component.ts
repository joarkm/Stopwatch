import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { StopwatchService } from './stopwatch.service';
import { TimerService } from './timer.service';
import { TimingEvent, TimingAction } from '~shared/components/events/timing.event';

@Component({
  selector: 'app-stopwatch-container',
  templateUrl: './stopwatch-container.component.html',
  styleUrls: ['./stopwatch-container.component.scss']
})
export class StopwatchContainerComponent implements OnInit {

  private counterStopSource: Subject<void> = new Subject<void>();
  private timerStopSource: Subject<void> = new Subject<void>();
  private counterStop$: Observable<void> = this.counterStopSource.asObservable();
  private timerStop$: Observable<void> = this.timerStopSource.asObservable();

  public minutes$: Observable<string> = of('0');
  public seconds$: Observable<string> = of('0.0');
  public counterSeconds$: Observable<string> = of('0.0');

  public timerRunning = false;

  constructor(
    private stopwatchService: StopwatchService,
    private timerService: TimerService
  ) { }

  ngOnInit(): void {
  }

  public startCountDown(seconds: string, minutes: string) {
    this.timerRunning = true;
    const { minutes$, seconds$ } = this.timerService.getObservables(
      parseInt(seconds, 10) || 0,
      parseInt(minutes, 10) || 0
    );
    this.minutes$  = minutes$.pipe(
      takeUntil(this.timerStop$),
      finalize(() => { this.timerRunning = false; })
    );
    this.seconds$ = seconds$.pipe(
      takeUntil(this.timerStop$),
      finalize(() => { this.timerRunning = false; })
    );
  }

  public resetTimer(): void {
    this.timerRunning = false;
    this.timerStopSource.next();
    // Reset values
    this.seconds$ = of('0.0');
    this.minutes$ = of('0');
  }

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
        return this.resumeCounter(timingEvent.state);
      default:
        break;
    }
  }

}
