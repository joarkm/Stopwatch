import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopwatchComponent implements OnInit {

  @Input() minutes = '0';
  @Input() seconds = '0.0';

  constructor() { }

  ngOnInit(): void {
  }

}
