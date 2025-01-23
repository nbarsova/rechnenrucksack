import {createUniqueStep, initTargets} from "./MapGenerator";
import {describe, expect, it, vi} from 'vitest';

describe('initTargets function', () => {

    vi.stubGlobal('Math.random', vi.fn(() => 0.5)); // Mock random to always return 0.5

    const testFieldSize = (fieldSize: number) => {
        it(`should generate target objects correctly for fieldSize ${fieldSize}`, () => {
            const targets = initTargets(fieldSize);

            expect(targets[0].x).toBeGreaterThanOrEqual(Math.floor(fieldSize / 3));
            expect(targets[0].y).toBeGreaterThanOrEqual(Math.floor(fieldSize / 3));

            expect(targets[1].x).toBeGreaterThanOrEqual(Math.floor(fieldSize / 3));
            expect(targets[1].y).toBeLessThanOrEqual(-Math.floor(fieldSize / 3));

            expect(targets[2].x).toBeLessThanOrEqual(-Math.floor(fieldSize / 3));
            expect(targets[2].y).toBeGreaterThanOrEqual(Math.floor(fieldSize / 3));

            expect(targets[3].x).toBeLessThanOrEqual(-Math.floor(fieldSize / 3));
            expect(targets[3].y).toBeLessThanOrEqual(-Math.floor(fieldSize / 3));
        });

        it(`should generate randomized positions within expected bounds for fieldSize ${fieldSize}`, () => {
            const targets = initTargets(fieldSize);

            targets.forEach((target) => {
                expect(target.x).toBeGreaterThanOrEqual(-fieldSize);
                expect(target.x).toBeLessThanOrEqual(fieldSize);
                expect(target.y).toBeGreaterThanOrEqual(-fieldSize);
                expect(target.y).toBeLessThanOrEqual(fieldSize);
            });
        });
    };

    describe('Testing for fieldSize 5', () => {
        testFieldSize(5);
    });

    describe('Testing for fieldSize 10', () => {
        testFieldSize(10);
    });

    it('should generate different results on subsequent calls for the same fieldSize', () => {
        const fieldSize = 5;
        const firstCall = initTargets(fieldSize);
        const secondCall = initTargets(fieldSize);

        expect(firstCall).not.toEqual(secondCall);
    });
});

describe('createUniqueStep function', () => {
    it('should generate a unique step not contained in the steps array (considering absolute value)', () => {
        const steps = [1, 2, -3]; // Steps are numbers, not objects
        const step = createUniqueStep(-5, 5, 0, 10, steps);

        // Ensure the step generated is not already in the steps array, considering absolute value
        expect(steps.some(s => Math.abs(s) === Math.abs(step))).toBe(false);
    });
});
