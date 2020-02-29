import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchContainerComponent } from './stopwatch-container.component';
import { StopwatchService } from './stopwatch.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [StopwatchContainerComponent],
  exports: [StopwatchContainerComponent],
  providers: [StopwatchService]
})
export class StopwatchModule { }
