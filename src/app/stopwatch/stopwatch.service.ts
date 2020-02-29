import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';

interface TimeObservables {
  hours?: Observable<string>;
  minutes$: Observable<string>;
  seconds$: Observable<string>;
}

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

  // TODO: Provide option for resolution (e.g. 0.1, 0.01, 1 (default)) and speed (e.g. 2x, 0.5x, 1x (default))
  public getCountdown(seconds: number, minutes = 0): Observable<string> {
    const limit = 10 * (seconds + (minutes * 60));
    return interval(100).pipe(
      take(limit + 1),
      map(val => limit - val),
      toFloat(),
      map((val: string): string => {
        const total = parseFloat(val);
        const min = (total < 1) ? 0 : Math.floor(total / 60);
        const sec = total % 60;
        // console.debug({total, min, sec});
        return `0:${min}:${sec.toFixed(1)}`;
      })
    );
  }

  public getObservables(seconds: number, minutes = 0): TimeObservables {
    const source$ = this.getCountdown(seconds, minutes);
    const seconds$ = source$.pipe(
      map(val => val.split(':')[2])
    );
    const minutes$ = source$.pipe(
      map(val => val.split(':')[1], 10),
      distinctUntilChanged((x, y) => parseInt(x, 10) === parseInt(y, 10))
    );
    return {
      minutes$,
      seconds$
    };
  }

}

/**
 * Custom operator that maps the emitted value {number} to its absolute value
 */
const abs = () => map((x: number): number =>
  Math.abs(x)
);

/**
 * Custom operator that maps the emitted value (string) {number} to a string representing its float value with 10e-1 precision.
 * E.g. 2 => 0.2, 11 => '1.1'
 */
const toFloat = () => map((val: number): string =>
  `${Math.floor(val / 10)}.${val % 10}`
);
