import { floatStringModulo } from './utils';

describe('utils', () => {
    fdescribe('floatStringModulo', () => {
        it('should return 59.9 when passed 60.0', () => {
            const expected = '59.9';
            const actual = floatStringModulo('60.0', 1, 60);
            expect(actual).toEqual(expected);
        });
        it('should return 59.9 when passed 120.0', () => {
            const expected = '59.9';
            const actual = floatStringModulo('120.0', 1, 60);
            expect(actual).toEqual(expected);
        });
    });

});
