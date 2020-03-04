import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { toFloat } from '~shared/operators';
import { TimeObservables } from '~shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  // TODO: Provide option for resolution (e.g. 0.1, 0.01, 1 (default)) and speed (e.g. 2x, 0.5x, 1x (default))
  private getCountdown(seconds: number, minutes = 0): Observable<string> {
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
