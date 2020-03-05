import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TimingAction, TimingEvent } from '~shared/components/events/timing.event';
import { TimingState } from '~shared/components/states';
import { TimePresentationComponent } from '~shared/components/time-presentation/time-presentation.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {

  @ViewChild(TimePresentationComponent)
  timePresentationComponent: TimePresentationComponent;

  @Input() minutes = '0';
  @Input() seconds = '0.0';

  @Output() timingEventEmitted = new EventEmitter<TimingEvent>();

  public minutesChosen: string;
  public secondsChosen: string;
  public selectedPrecision = '1';
  public TimingStates = TimingState;
  public currentTimingState: TimingState = TimingState.STOPPED;

  constructor() { }

  onTimingActionDispatched(timingAction: TimingAction): void {
    this.currentTimingState = timingAction === TimingAction.STOP ? TimingState.STOPPED
      : (timingAction === TimingAction.PAUSE ? TimingState.PAUSED : TimingState.RUNNING);
    if (timingAction === TimingAction.RESUME) {
      const { minutes, seconds } = this.timePresentationComponent;
      const selectedPrecision = Math.log10(parseInt(this.selectedPrecision, 10));
      this.timingEventEmitted.emit({
        action: timingAction,
        data: { hours: '0', minutes, seconds, precision: selectedPrecision }
      });
    } else if (timingAction === TimingAction.START) {
      const selectedPrecision = Math.log10(parseInt(this.selectedPrecision, 10));
      this.timingEventEmitted.emit({
        action: timingAction,
        data: { hours: '0', minutes: this.minutesChosen, seconds: this.secondsChosen, precision: selectedPrecision }
      });
    } else {
      this.timingEventEmitted.emit({ action: timingAction });
    }
  }

  isStartDisabled(): boolean {
    return (!this.minutesChosen || parseInt(this.minutesChosen, 10) === 0)
    && (!this.secondsChosen || parseInt(this.secondsChosen, 10) === 0);
  }

  public parentNotifyTimerEnded(): void {
    this.currentTimingState = TimingState.STOPPED;
    this.minutesChosen = '';
    this.secondsChosen = '';
  }

}
