import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  // providedIn: StopwatchModule
  providedIn: 'root'
})
export class StopwatchService {

  currentTime$: Observable<string>;

  constructor() { }

  public startTimer(startWith = 0, resolution = 0.1): Observable<string> {
    const frequency = 1000 * resolution;
    const emitsPerSecond = 1 / resolution;
    return interval(frequency).pipe(
      map(val => val + 1),
      map(val => `${Math.floor((val / emitsPerSecond) + startWith)}.${Math.floor(val + startWith) % emitsPerSecond}`)
    );
  }

}
