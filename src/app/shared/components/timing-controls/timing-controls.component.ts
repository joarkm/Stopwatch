import { Component, EventEmitter, OnInit, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { TimingAction } from '../events/timing.event';
import { TimingState } from '../states';

@Component({
  selector: 'app-timing-controls',
  templateUrl: './timing-controls.component.html',
  styleUrls: ['./timing-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimingControlsComponent implements OnInit {

  @Input() startDisabled = false;

  @Input() currentTimingState: TimingState = TimingState.STOPPED;

  @Output() timingActionDispatched = new EventEmitter<TimingAction>();

  public TimingStates = TimingState;

  constructor() { }

  ngOnInit(): void {
  }

  start(): void {
    this.timingActionDispatched.emit(TimingAction.START);
  }

  stop(): void {
    this.timingActionDispatched.emit(TimingAction.STOP);
  }

  pause(): void {
    this.timingActionDispatched.emit(TimingAction.PAUSE);
  }

  resume(): void {
    this.timingActionDispatched.emit(TimingAction.RESUME);
  }

}
