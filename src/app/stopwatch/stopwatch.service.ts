import { Injectable } from '@angular/core';
import { interval, Observable, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  // providedIn: StopwatchModule
  providedIn: 'root'
})
export class StopwatchService {

  currentTime$: Observable<string>;

  constructor() { }

  public startTimer(beginWith = 0, resolution = 0.1): Observable<string> {
    const frequency = 1000 * resolution;
    const emitsPerSecond = 1 / resolution;
    const startValue = `${Math.floor((beginWith / emitsPerSecond))}.${Math.floor(beginWith) % emitsPerSecond}`;
    const timer$ = interval(frequency).pipe(
      map(val => val + 1),
      map(val => `${Math.floor(((val + beginWith) / emitsPerSecond))}.${Math.floor(val + beginWith) % emitsPerSecond}`)
    );

    return merge(
      of(startValue),
      timer$
    );
  }

}
