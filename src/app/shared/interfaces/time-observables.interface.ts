import { Observable } from 'rxjs';

export interface TimeObservables {
    hours?: Observable<string>;
    minutes$: Observable<string>;
    seconds$: Observable<string>;
}
