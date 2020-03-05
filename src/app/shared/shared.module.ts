import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePresentationComponent } from './components/time-presentation/time-presentation.component';
import { TimingControlsComponent } from './components/timing-controls/timing-controls.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimePresentationComponent, TimingControlsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TimepickerModule.forRoot(),
  ],
  exports: [TimePresentationComponent, TimingControlsComponent]
})
export class SharedModule { }
