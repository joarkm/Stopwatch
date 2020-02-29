import { Injectable } from '@angular/core';
import { StopwatchModule } from './stopwatch.module';
import { Observable, interval, of } from 'rxjs';
import { take, scan, startWith, map, filter } from 'rxjs/operators';

interface TimeObservables {
  hours?: Observable<string>;
  minutes: Observable<string>;
  seconds: Observable<string>;
}

@Injectable({
  // providedIn: StopwatchModule
  providedIn: 'root'
})
export class StopwatchService {

  currentTime$: Observable<string>;

  constructor() { }

  public startTimer(resolution = 0.1): Observable<string> {
    const frequency = 1000 * resolution;
    const emitsPerSecond = 1 / resolution;
    return interval(frequency).pipe(
      map(val => `${Math.floor((val + 1) / emitsPerSecond)}.${(val + 1) % emitsPerSecond}`)
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
        const sec = total - min;
        console.debug({total, min, sec});
        return `0:${min.toPrecision(1)}:${sec < 1 ? (sec < 0.1 ? '0.0' : sec.toPrecision(1)) : sec.toPrecision(2)}`;
      })
    );
  }

  public getObservables(seconds: number, minutes = 0): TimeObservables {
    const source$ = this.getCountdown(seconds, minutes);
    const seconds$ = source$.pipe(
      map(val => val.split(':')[2])
    );
    const minutes$ = source$.pipe(
      map(val => val.split(':')[1]),
      filter(min => parseInt(min, 10) % 600 === 0)
    );
    return {
      minutes: minutes$,
      seconds: seconds$
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
