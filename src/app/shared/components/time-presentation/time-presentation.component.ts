import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-time-presentation',
  templateUrl: './time-presentation.component.html',
  styleUrls: ['./time-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePresentationComponent implements OnInit {

  @Input() minutes = '0';
  @Input() seconds = '0.0';

  constructor() { }

  ngOnInit(): void {
  }

}
