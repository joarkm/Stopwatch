import { toFractionSecond } from './utils';

describe('utils', () => {

    describe('toFractionSecond', () => {

        describe('3 decimals precision', () => {

            it('should return 5.001 when passed 5001', () => {
                const expected = 5.001;
                const actual = toFractionSecond(5001, 3);
                expect(actual).toEqual(expected);
            });

            it('should return 5.1 when passed 5100', () => {
                const expected = 5.1;
                const actual = toFractionSecond(5100, 3);
                expect(actual).toEqual(expected);
            });

            it('should return 0.1 when passed 100', () => {
                const expected = 0.1;
                const actual = toFractionSecond(100, 3);
                expect(actual).toEqual(expected);
            });

        });


    });

});
