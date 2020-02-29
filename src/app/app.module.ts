import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StopwatchModule } from './stopwatch/stopwatch.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StopwatchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
