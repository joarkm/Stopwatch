import { TestBed } from '@angular/core/testing';

import { StopwatchService } from './stopwatch.service';
import { scan, tap, takeUntil, timeout, take } from 'rxjs/operators';
import { timer } from 'rxjs';

fdescribe('StopwatchService', () => {
  let service: StopwatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [StopwatchService]
    });
    service = TestBed.inject(StopwatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should count down from 2.0 to 0.0 by decrements of 0.1', async () => {
    // tslint:disable-next-line: max-line-length
    const expectedSeconds = ['2.0', '1.9', '1.8', '1.7', '1.6', '1.5', '1.4', '1.3', '1.2', '1.1', '1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'];
    const returnedSeconds: string[] = [];
    const { seconds$: seconds } = service.getObservables(2);
    await seconds
      .pipe(
        tap(val => { returnedSeconds.push(val); })
      )
      .toPromise();
    console.debug('returnedSeconds');
    console.debug(JSON.stringify(returnedSeconds, null, 1));
    expect(returnedSeconds.length).toEqual(expectedSeconds.length);
    expect(returnedSeconds.every((val, idx) => val === expectedSeconds[idx])).toBeTruthy();
  });


  xit('should emit values from 0.1 to 2.0 by increments of 0.1', async () => {
    //  tslint:disable-next-line: max-line-length
    const expectedSeconds = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0'];
    const returnedSeconds: string[] = [];
    const inaccuracyThreshold = expectedSeconds.length - 10;
    let allValuesMatching: Boolean = null;

    // const stop$ = timer(2000).pipe(take(1)); // Stop timer after 2 seconds
    // await service.startTimer()
    //   .pipe(
    //     tap(val => { returnedSeconds.push(val); }),
    //     takeUntil(stop$)
    //   )
    //   .toPromise();

    try {
      const end = new Date();
      end.setUTCMilliseconds(2200);
      await service.startTimer().pipe(
        timeout(end),
        // timeout(2000),
        tap(val => console.debug(val)),
        tap(val => { returnedSeconds.push(val); }),
      ).toPromise();
    } catch (err) {
      // Since the observable never completes, the timeout operator will throw an error
      // 2 seconds after it has started emitting values.
      returnedSeconds.some((val, idx) => {
        if (val !== expectedSeconds[idx]) {
          allValuesMatching = new Boolean(false);
          return false;
        } else {
          allValuesMatching = new Boolean(true);
          return true;
        }
      });

      expect(returnedSeconds.length).toBeGreaterThanOrEqual(inaccuracyThreshold);

      // FIXME
      // let pass = false;
      // if (allValuesMatching === null) {
      // } else if (returnedSeconds.length < expectedSeconds.length) {
      //   pass = true;
      // } else if (allValuesMatching.valueOf()) {
      //   pass = true;
      // }
      // expect(allValuesMatching !== null && allValuesMatching.valueOf()).toBeTruthy();
    }

  });


  it('should emit values from given offset when offset provided', async () => {
    const expectedSeconds = ['1.2', '1.3', '1.4', '1.5', '1.6'];
    const returnedSeconds: string[] = [];
    const stop$ = timer(2000).pipe(take(1)); // Stop timer after 2 seconds
    await service.startTimer(1.2)
      .pipe(
        tap(val => { returnedSeconds.push(val); }),
        takeUntil(stop$)
      )
      .toPromise();

    expect(returnedSeconds
      .slice(0, expectedSeconds.length)
      .every((val, idx) => val === expectedSeconds[idx])
    ).toBeTruthy(
      `
      Expected ${JSON.stringify(returnedSeconds.slice(0, expectedSeconds.length))}
      to equal ${JSON.stringify(expectedSeconds)}`
    );
  });


});
