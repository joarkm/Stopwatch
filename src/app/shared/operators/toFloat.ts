import { map } from 'rxjs/operators';

/**
 * Custom operator that maps the emitted value (string) {number} to a string representing its float value with 10e-1 precision.
 * E.g. 2 => 0.2, 11 => '1.1'
 */
export const toFloat = () => map((val: number): string =>
  `${Math.floor(val / 10)}.${val % 10}`
);
