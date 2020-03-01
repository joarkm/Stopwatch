import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopwatchContainerComponent } from './stopwatch/stopwatch-container.component';
import { TimerContainerComponent } from './timer/timer-container.component';

const routes: Routes = [
  {
    path: 'stopwatch',
    component: StopwatchContainerComponent,
    data: { title: 'Stopwatch' }
  },
  {
    path: 'timer',
    component: TimerContainerComponent,
    data: { title: 'Timer' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
