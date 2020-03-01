import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePresentationComponent } from './components/time-presentation/time-presentation.component';
import { TimingControlsComponent } from './components/timing-controls/timing-controls.component';

@NgModule({
  declarations: [TimePresentationComponent, TimingControlsComponent],
  imports: [
    CommonModule
  ],
  exports: [TimePresentationComponent, TimingControlsComponent]
})
export class SharedModule { }
