import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { TimerContainerComponent } from './timer-container.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '~shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [TimerComponent, TimerContainerComponent],
  exports: [TimerContainerComponent]
})
export class TimerModule { }
