import {describe, it, expect} from 'vitest';
import {normalRandom} from './arithmetic';  // Adjust the path accordingly

describe('normalRandom function', () => {

    it('should return a number within the given range', () => {
        const min = 1;
        const max = 5;
        const result = normalRandom(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });

    it('should throw an error if min is greater than max', () => {
        const min = 10;
        const max = 5;
        expect(() => normalRandom(min, max)).toThrowError(
            "Incorrect input, first argument 10 should be greater than the second 5"
        );
    });

    it('should handle min and max being equal', () => {
        const min = 5;
        const max = 5;
        const result = normalRandom(min, max);
        expect(result).toBe(min); // Should always return the same value as min (which is equal to max)
    });

    it('should return a number within the given range for large ranges', () => {
        const min = 1;
        const max = 1000000;
        const result = normalRandom(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });
});
