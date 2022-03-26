import { filter } from 'rxjs/operators';

export const takeEveryNth = <T>(n: number) => filter<T>((_value, index) => index % n === 0);
