import {describe, it, expect} from 'vitest'

import {createLetterCodes, isUniqueCode} from './CodeGenerator';
import {LetterCode} from "../../types";

describe('isUniqueCode function', () => {

    it('should return true if the code is unique in the array', () => {
        const code = 1;
        const letterCodes = [{letter: 'A', code: 2}, {letter: 'B', code: 3}];

        const result = isUniqueCode(code, letterCodes);

        expect(result).toBe(true);
    });

    it('should return false if the code is already in the array', () => {
        const code = 2;
        const letterCodes = [{letter: 'A', code: 2}, {letter: 'B', code: 3}];

        const result = isUniqueCode(code, letterCodes);

        expect(result).toBe(false);
    });

    it('should return true for an empty array', () => {
        const code = 5;
        const letterCodes: LetterCode [] = [];

        const result = isUniqueCode(code, letterCodes);

        expect(result).toBe(true);
    });

    it('should return true if the array has one item and code is different', () => {
        const code = 3;
        const letterCodes = [{letter: 'A', code: 2}];

        const result = isUniqueCode(code, letterCodes);

        expect(result).toBe(true);
    });

});

describe('createLetterCodes', () => {

    it('should generate correct number of letter-code pairs', () => {
        const symbols = ['A', 'B', 'C'];
        const numberRange = 10;

        const result = createLetterCodes(symbols, numberRange);

        expect(result.length).toBe(symbols.length);
    });

    it('should throw an error if symbols.length > numberRange', () => {
        const symbols = ['A', 'B', 'C', 'D'];
        const numberRange = 3;

        expect(() => createLetterCodes(symbols, numberRange))
            .toThrowError('Number range smaller than symbols length');
    });

    it('should assign code 0 for the last letter when symbols.length === numberRange', () => {
        const symbols = ['A', 'B', 'C', 'D'];
        const numberRange = 4;

        const result = createLetterCodes(symbols, numberRange);

        // Last letter should have code 0
        expect(result[result.length - 1]).toEqual({letter: 'D', code: 0});
    });

    it('should ensure codes are unique', () => {
        const symbols = ['A', 'B', 'C'];
        const numberRange = 5;

        const result = createLetterCodes(symbols, numberRange);

        const codes = result.map(item => item.code);

        const uniqueCodes = [...new Set(codes)];
        console.log(codes, uniqueCodes);
        expect(uniqueCodes.length).toBe(codes.length);  // The number of unique codes should be equal to the length of the codes array
    });

});

