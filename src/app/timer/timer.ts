import { Injectable } from '@angular/core';
import { EMPTY, interval, merge, Observable, Subject } from 'rxjs';
import { map, scan, switchMap, take, takeUntil, startWith } from 'rxjs/operators';
import { TimeObservables } from '~shared/interfaces';
import { takeEveryNth } from '~shared/operators/takeEveryNth';

@Injectable()
export class Timer {

    private startSource: Subject<boolean> = new Subject();
    private pauseSource: Subject<boolean> = new Subject();
    private resumeSource: Subject<boolean> = new Subject();
    private stopSource: Subject<void> = new Subject();

    private start$ = this.startSource.asObservable();
    private pause$ = this.pauseSource.asObservable();
    private resume$ = this.resumeSource.asObservable();
    private stop$ = this.stopSource.asObservable();

    private timer$: Observable<any>;

    private initialized = false;

    constructor() {}

    public createNewTimer(seconds: number, minutes: number, decimals = 0): TimeObservables {
        if (decimals > 3) {
            throw new Error('Max precision is milliseconds');
        }
        // this.completeObservablesIfNeccessary();

        const timer$ = interval(10).pipe(map(x => x + 1));

        const seed = seconds + (minutes * 60);
        const takeAmount = Math.pow(10, decimals) * (seconds + (minutes * 60));
        const emissionsPerMinute = takeAmount % 60;

        console.log('EHI');
        const source = merge(this.start$, this.pause$, this.resume$).pipe(
            // startWith(true),
            switchMap(proceed => {
                return (proceed ? timer$ : EMPTY);
            }),
            scan((acc, curr) => {
                // console.error({acc, curr});
                let next;
                if (decimals > 0) {
                    if (typeof acc === 'number' && curr === 1) {
                        // console.error('returning default value');
                        return `${seed - 1}`.concat('.').concat('9'.repeat(decimals));
                    }
                    const parts = acc.toString().split('.');
                    const whole = parseInt(parts[0], 10);
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
                return next;
            }, seed),
            take(takeAmount)
        );

        return {
            seconds$: source.pipe(takeUntil(this.stop$)),
            minutes$: source.pipe(
                takeEveryNth(emissionsPerMinute - 1),
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
