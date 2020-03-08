import { TestBed } from '@angular/core/testing';

import { tap } from 'rxjs/operators';
import { Timer } from './timer';

describe('TimerService', () => {
  let service: Timer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Timer]
    });
    service = TestBed.inject(Timer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should count down from 2.0 to 0.0 by decrements of 0.1', async () => {
    // tslint:disable-next-line: max-line-length
    const expectedSeconds = ['2.0', '1.9', '1.8', '1.7', '1.6', '1.5', '1.4', '1.3', '1.2', '1.1', '1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'];
    const returnedSeconds: string[] = [];
    const { seconds$ } = service.createNewTimer(/*seconds*/ 2, /*minutes*/ 0, /*decimals*/ 1);

    await seconds$
      .pipe(
        tap(val => console.log(val)),
        tap(val => { returnedSeconds.push(val); })
      )
      .toPromise();
    console.debug('returnedSeconds');
    console.debug(JSON.stringify(returnedSeconds, null, 1));
    expect(returnedSeconds.length).toEqual(expectedSeconds.length);
    expect(returnedSeconds.every((val, idx) => val === expectedSeconds[idx])).toBeTruthy();
  });

});
