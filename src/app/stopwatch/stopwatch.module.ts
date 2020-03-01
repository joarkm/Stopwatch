import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchContainerComponent } from './stopwatch-container.component';
import { StopwatchService } from './stopwatch.service';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '~shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [StopwatchContainerComponent, StopwatchComponent],
  exports: [StopwatchContainerComponent],
  providers: [StopwatchService]
})
export class StopwatchModule { }
