import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-time-presentation',
  templateUrl: './time-presentation.component.html',
  styleUrls: ['./time-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePresentationComponent implements OnInit, OnChanges {

  @Input() minutes = '0';
  @Input() seconds = '0.0';
  @Input() shouldBlink = false;
  @Input() disabled = false;

  public selectedDate: Date;

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  private getDefaultDate(): Date {
    const newDate = new Date();
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    return newDate;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.seconds && !changes.seconds.firstChange) {
      const newDate = this.selectedDate ? new Date(this.selectedDate) : this.getDefaultDate();
      newDate.setSeconds(changes.seconds.currentValue);
      this.selectedDate = newDate;
      this.cdRef.detectChanges();
    }
    if (changes.minutes && !changes.minutes.firstChange) {
      const newDate = this.selectedDate ? new Date(this.selectedDate) : this.getDefaultDate();
      newDate.setMinutes(changes.minutes.currentValue);
      this.selectedDate = newDate;
      this.cdRef.detectChanges();
    }
  }

}
