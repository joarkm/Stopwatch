import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TimingAction, TimingEvent } from '~shared/components/events/timing.event';
import { TimePresentationComponent } from '~shared/components/time-presentation/time-presentation.component';
import { TimingState } from '~shared/components/states';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopwatchComponent implements OnInit {

  @ViewChild(TimePresentationComponent)
  timePresentationComponent: TimePresentationComponent;

  @Input() minutes = '0';
  @Input() seconds = '0.0';

  @Output() timingEventEmitted = new EventEmitter<TimingEvent>();

  public currentTimingState: TimingState = TimingState.STOPPED;

  constructor() { }

  ngOnInit(): void {
  }

  onTimingActionDispatched(timingAction: TimingAction): void {
    if (timingAction === TimingAction.RESUME) {
      const { minutes, seconds } = this.timePresentationComponent;
      this.timingEventEmitted.emit({
        action: timingAction,
        state: { hours: '0', minutes, seconds }
      });
    } else {
      this.timingEventEmitted.emit({ action: timingAction});
    }
    this.currentTimingState = timingAction === TimingAction.STOP ? TimingState.STOPPED
                            : (timingAction === TimingAction.PAUSE ? TimingState.PAUSED : TimingState.RUNNING);
  }

}
