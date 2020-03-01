import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '~shared/shared.module';
import { StopwatchContainerComponent } from './stopwatch-container.component';
import { StopwatchService } from './stopwatch.service';
import { StopwatchComponent } from './stopwatch/stopwatch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    SharedModule
  ],
  declarations: [StopwatchContainerComponent, StopwatchComponent],
  exports: [StopwatchContainerComponent],
  providers: [StopwatchService]
})
export class StopwatchModule { }
