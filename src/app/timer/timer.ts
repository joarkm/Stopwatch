import { Injectable } from '@angular/core';
import { EMPTY, interval, merge, Observable, Subject } from 'rxjs';
import { map, scan, switchMap, take, takeUntil, startWith, mapTo, skip } from 'rxjs/operators';
import { TimeObservables } from '~shared/interfaces';
import { takeEveryNth } from '~shared/operators/takeEveryNth';
import { floatStringModulo, padWholeWithZeroes } from '~shared/utils';

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

    private timer$: Observable<any>;

    private initialized = false;

    constructor() {}

    public createNewTimer(seconds: number, minutes: number, decimals = 1): TimeObservables {
        if (decimals > 3) {
            throw new Error('Max precision is milliseconds');
        }
        this.completeObservablesIfNeccessary();

        const timer$ = interval(100).pipe(map(x => x + 1));

        const seed = seconds + (minutes * 60);
        const takeAmount = Math.pow(10, decimals) * (seconds + (minutes * 60));
        const emissionsPerMinute = Math.pow(10, decimals) * 60;

        const source = merge(this.start$, this.pause$, this.resume$).pipe(
            startWith(true),
            switchMap(proceed => {
                return (proceed ? timer$ : EMPTY);
            }),
            scan((acc, curr) => {
                let next;
                if (decimals > 0) {
                    if (typeof acc === 'number' && curr === 1) {
                        return padWholeWithZeroes(seed, decimals);
                    }
                    const parts = acc.toString().split('.');
                    const whole = parseInt(parts[0], 10) % emissionsPerMinute;
                    const dec = parseInt(parts[1], 10);
                    const base = Math.pow(10, decimals);
                    let newDec: string | number = (dec + base - 1) % base;
                    let newWhole = whole;
                    if (newDec === parseInt('9'.repeat(decimals), 10)) {
                        newWhole = whole - 1;
                    }
                    newDec = newDec.toString().padStart(decimals, '0');
                    next = `${newWhole}.${newDec}`;
                } else {
                    next = acc - 1;
                }
                return next.toString();
            }, seed),
            take(takeAmount)
        );

        return {
            seconds$: source.pipe(
                map(val => floatStringModulo(val, 1, 60)),
                takeUntil(this.stop$),
            ),
            minutes$: source.pipe(
                skip(takeAmount % emissionsPerMinute),
                takeEveryNth(emissionsPerMinute),
                map((val, index) => (minutes - (index + 1)).toString()),
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
