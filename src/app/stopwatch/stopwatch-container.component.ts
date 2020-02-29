import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StopwatchService } from './stopwatch.service';
import { StopwatchComponent } from './stopwatch/stopwatch.component';

@Component({
  selector: 'app-stopwatch-container',
  templateUrl: './stopwatch-container.component.html',
  styleUrls: ['./stopwatch-container.component.scss']
})
export class StopwatchContainerComponent implements OnInit {

  @ViewChild('counterComponent')
  private counterComponent: StopwatchComponent;

  private counterStopSource: Subject<void> = new Subject<void>();
  private timerStopSource: Subject<void> = new Subject<void>();
  private counterStop$: Observable<void> = this.counterStopSource.asObservable();
  private timerStop$: Observable<void> = this.timerStopSource.asObservable();

  public minutes$: Observable<string> = of('0');
  public seconds$: Observable<string> = of('0.0');
  public counterSeconds$: Observable<string> = of('0.0');

  public timerRunning = false;
  public CounterStates = CounterState;
  public counterState: CounterState = CounterState.STOPPED;


  constructor(
    private stopwatchService: StopwatchService
  ) { }

  ngOnInit(): void {
  }

  public startCountDown(seconds: string, minutes: string) {
    this.timerRunning = true;
    const { minutes$, seconds$ } = this.stopwatchService.getObservables(
      parseInt(seconds, 10) || 0,
      parseInt(minutes, 10) || 0
    );
    this.minutes$ = minutes$.pipe(
      takeUntil(this.timerStop$)
    );
    this.seconds$ = seconds$.pipe(
      takeUntil(this.timerStop$)
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
    this.counterState = CounterState.RUNNING;
    this.counterSeconds$ = this.stopwatchService.startTimer().pipe(
      takeUntil(this.counterStop$)
    );
  }

  public pauseCounter(): void {
    this.counterState = CounterState.PAUSED;
    this.counterStopSource.next();
  }

  public resumeCounter(): void {
    this.counterState = CounterState.RUNNING;
    const currentCount = parseInt(this.counterComponent.minutes, 10) * 60
      + parseFloat(this.counterComponent.seconds);
    this.counterSeconds$ = this.stopwatchService.startTimer(currentCount).pipe(
      takeUntil(this.counterStop$)
    );
  }

  public stopCounter(): void {
    this.counterState = CounterState.STOPPED;
    this.counterStopSource.next();
    // Reset values
    this.counterSeconds$ = of('0.0');
  }

}

enum CounterState {
  STOPPED,
  PAUSED,
  RUNNING
}
