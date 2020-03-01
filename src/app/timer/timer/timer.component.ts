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
  public currentTimingState: TimingState = TimingState.STOPPED;

  constructor() { }

  onTimingActionDispatched(timingAction: TimingAction): void {
    this.currentTimingState = timingAction === TimingAction.STOP ? TimingState.STOPPED
      : (timingAction === TimingAction.PAUSE ? TimingState.PAUSED : TimingState.RUNNING);
    if (timingAction === TimingAction.RESUME) {
      const { minutes, seconds } = this.timePresentationComponent;
      this.timingEventEmitted.emit({
        action: timingAction,
        data: { hours: '0', minutes, seconds }
      });
    } else if (timingAction === TimingAction.START) {
      this.timingEventEmitted.emit({
        action: timingAction,
        data: { hours: '0', minutes: this.minutesChosen, seconds: this.secondsChosen }
      });
    } else {
      this.timingEventEmitted.emit({ action: timingAction });
    }
  }

}
