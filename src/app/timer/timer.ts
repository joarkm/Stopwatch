import { Injectable } from '@angular/core';
import { EMPTY, interval, merge, Observable, Subject } from 'rxjs';
import { map, scan, switchMap, take, takeUntil, startWith, mapTo, skip } from 'rxjs/operators';
import { TimeObservables } from '~shared/interfaces';
import { takeEveryNth } from '~shared/operators/takeEveryNth';
import { toFractionSecond } from '~shared/utils';

@Injectable()
export class Timer {

    private startSource: Subject<void> = new Subject();
    private pauseSource: Subject<void> = new Subject();
    private resumeSource: Subject<void> = new Subject();
    private stopSource: Subject<void> = new Subject();

    private start$: Observable<boolean> = this.startSource.asObservable().pipe(mapTo(true));
    private pause$: Observable<boolean> = this.pauseSource.asObservable().pipe(mapTo(false));
    private resume$: Observable<boolean> = this.resumeSource.asObservable().pipe(mapTo(true));
    private stop$: Observable<void> = this.stopSource.asObservable();


    private initialized = false;

    constructor() {}

    public createNewTimer(seconds: number, minutes: number, decimals = 0): TimeObservables {
        if (decimals > 3) {
            throw new Error('Max precision is milliseconds');
        }
        this.completeObservablesIfNeccessary();

        const msBetweenEmission = Math.pow(10, 3 - decimals);

        const timer$ = interval(msBetweenEmission).pipe(map(x => x + 1));

        const freq = Math.pow(10, decimals); // Hz
        const seed = freq * (seconds + (minutes * 60));
        const takeAmount = seed;
        const emissionsPerMinute = freq * 60;

        const source = merge(this.start$, this.pause$, this.resume$).pipe(
            startWith(true),
            switchMap(proceed => {
                return (proceed ? timer$ : EMPTY);
            }),
            scan((acc, curr) => seed - curr, seed),
            take(takeAmount)
        );

        return {
            seconds$: source.pipe(
                map(val => toFractionSecond(val, decimals)),
                map(val => val % 60),
                map(val => val.toFixed(decimals)),
                takeUntil(this.stop$)
            ),
            minutes$: source.pipe(
                skip(takeAmount % emissionsPerMinute),
                takeEveryNth(emissionsPerMinute),
                map((val, index) => minutes - (index + 1)),
                map(val => val.toString()),
                takeUntil(this.stop$)
            )
        };
    }

    private completeObservablesIfNeccessary(): void {
        if (!this.initialized) {
            this.initialized = true;
            return;
        }
        this.stopSource.next();
    }

    public startTimer(): void {
        this.startSource.next();
    }
    public pauseTimer(): void {
        this.pauseSource.next();
    }
    public resumeTimer(): void {
        this.resumeSource.next();
    }
    public stopTimer(): void {
        this.stopSource.next();
    }
}
