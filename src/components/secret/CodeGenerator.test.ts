import {describe, expect, it} from 'vitest'

import {checkSecretMessage, createLetterCodes, isUniqueCode} from './CodeGenerator';
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

describe('checkSecretMessage', () => {

    it('string of 15 symbols or less without spaces is not split', () => {
        const input = 'ABCDEFGHJKLMNOP';
        const inputShort = 'ABCD';
        expect(checkSecretMessage(inputShort)).toEqual(['ABCD']);
        expect(checkSecretMessage(input)).toEqual(['ABCDEFGHJKLMNOP']);
    })

    it('string of more than 15 symbols without spaces is split into , each no more than 15 symbols ', () => {
        const input = 'ABCDEFGHJKLMNOPRQ';
        expect(checkSecretMessage(input)).toEqual(['ABCDEFGHJKLMNOP', 'RQ']);
    })

    it('string of more than 15 symbols with a space on position less than 15 is split into two , one up to the space and another after it', () => {
        const inputShort = 'ABCDEFGHJKLMNO PRQ';
        expect(checkSecretMessage(inputShort)).toEqual(['ABCDEFGHJKLMNO', 'PRQ']);
    })

    it('string of more than 15 symbols with a space on position less than 15 and after it more than 15 symbols', () => {
        const input = 'ABCD EFGHJKLMNOPRQRSTU';
        expect(checkSecretMessage(input)).toEqual(['ABCD', 'EFGHJKLMNOPRQRS', 'TU']);
    })

    it('string of less than 15 symbols with a space on position less than 15 is not split', () => {
        const inputShort = 'ABCDE FGHJKLMNO';
        expect(checkSecretMessage(inputShort)).toEqual(['ABCDE FGHJKLMNO']);
    })

    it('string of more than 15 symbols several spaces', () => {
        const input = 'ABCD EFGH JKLMNOPRQRSTU';
        expect(checkSecretMessage(input)).toEqual(['ABCD EFGH', 'JKLMNOPRQRSTU']);
    })

    it('string of more than 15 symbols several spaces', () => {
        const input = 'ABCD EFGH JKLMNOPRQ RSTU';
        expect(checkSecretMessage(input)).toEqual(['ABCD EFGH', 'JKLMNOPRQ RSTU']);
    })

    it('the string can be split only to 4  maximum, if the string exceeds 4 substring, the rest is cut', () => {
        const input = 'ABCDEFGHJKLMNOPABCDEFGHJKLMNOPABCDEFGHJKLMNOPABCDEFGHJKLMNOP';
        const excessiveInput = 'ABCDEFGHJKLMNOPABCDEFGHJKLMNOPABCDEFGHJKLMNOPABCDEFGHJKLMNOPAA';
        const excessiveInputWithSpaces = 'ABCDEFGHJKLMNOP ABCDEFGHJKLMNOP ABCDEFGHJKLMNOP ABCDEFGHJKLMNOP';
        const excessiveInputWithSpacesAndMore = 'ABCDEFGHJKLMNOP ABCDEFGHJKLMNOP ABCDEFGHJKLMNOP ABCDEFGHJKLMNOPAA';
        expect(checkSecretMessage(input)).toEqual(['ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP']);
        expect(checkSecretMessage(excessiveInput)).toEqual(['ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP']);
        expect(checkSecretMessage(excessiveInputWithSpaces)).toEqual(['ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP']);
        expect(checkSecretMessage(excessiveInputWithSpacesAndMore)).toEqual(['ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP', 'ABCDEFGHJKLMNOP']);
    })
})


