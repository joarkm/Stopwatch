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
  ) {
    this.selectedDate = this.getDefaultDate();
  }

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
    if (changes.seconds) {
      const newDate = new Date(this.selectedDate);
      newDate.setSeconds(changes.seconds.currentValue);
      this.selectedDate = newDate;
      this.cdRef.detectChanges();
    }
    if (changes.minutes) {
      const newDate = new Date(this.selectedDate);
      newDate.setMinutes(changes.minutes.currentValue);
      this.selectedDate = newDate;
      this.cdRef.detectChanges();
    }
  }

}
