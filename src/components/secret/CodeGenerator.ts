import {createEquationSet, normalRandom} from "../../util/arithmetic";
import {Equation, Operation} from "../../types";


export const countMessageSymbols = (secretMessage: string) => {
    const symbols = [];
    for (let i = 0; i < secretMessage.length; i++) {
        const symbol = secretMessage.charAt(i);

        if (isLetter(symbol) && symbols.indexOf(symbol.toUpperCase()) === -1)
            symbols.push(symbol.toUpperCase());
    }
    return symbols;
};

export const isUniqueCode = (code: number, letterCodes: Array<any>) => {
    for (let i = 0; i < letterCodes.length; i++) {
        if (letterCodes[i].code === code) {
            return false;
        }
    }
    return true;
};

export const createLetterCodes = (symbols: Array<string>, numberRange: number) => {

    if (symbols.length > numberRange) throw new Error('Number range smaller than symbols length');

    const newCodes = [];
    const treshold = (symbols.length === numberRange) ? symbols.length - 1 : symbols.length;
    for (let i = 0; i < treshold; i++) {
        let code;
        do {
            code = normalRandom(1, numberRange);
        } while (!isUniqueCode(code, newCodes));

        newCodes.push({letter: symbols[i], code: code});
    }

    if (symbols.length === numberRange) {
        newCodes.push({letter: symbols[symbols.length - 1], code: 0});
    }
    return newCodes;
};

export const isLetter = (symbol: string) => {
    return (symbol.toUpperCase() != symbol.toLowerCase());
};

const findCodeForLetter = (letter: string, codes: Array<any>) => {
    return codes.find(code => code.letter === letter);
};


export const createEquations = (sMessage: string,
                                codes: Array<any>, selectedOps: Operation [], numberRange: number) => {
    const steps: Array<number> = [];

    for (let i = 0; i < sMessage.length; i++) {
        const symbol = sMessage.charAt(i).toUpperCase();
        if (isLetter(symbol)) {
            const step = findCodeForLetter(symbol, codes);
            if (step) {
                steps.push(step.code);
            }
        }
    }

    const equations: Array<Equation> | undefined = createEquationSet(steps, selectedOps, numberRange) || [];
    return equations;
};

export const createSecretCodeForMessage = (message: string, numberRange: number, selectedOps: Operation[]) => {
    const symbols = countMessageSymbols(message);
    console.log('symbols', symbols);
    const codes = createLetterCodes(symbols, numberRange);
    console.log('codes', codes);
    const equations = createEquations(message, codes, selectedOps, numberRange);
    return {symbols, codes, equations};
}


export const NO_MESSAGE_ERROR = 'noMessageError';
export const TOO_LONG_ERROR = 'secretMessageTooLong';

export const checkSecretMessage = (inputString: string): Array<string> => {
    const subStrings: string [] = [];
    const words = inputString.split(' ');
    let currentSubstring: Array<string> = [];

    for (let wordIndex = 0; wordIndex < words.length;) {

        if (subStrings.length >= 4) {
            return subStrings;
        }

        let currentWord = words[wordIndex];

        if (currentWord.length <= 15 && currentSubstring.join(' ').length + currentWord.length <= 15) {
            currentSubstring.push(currentWord);
            wordIndex++;
        } else if (currentWord.length > 15) {
            if (currentSubstring.length > 0) {
                subStrings.push(currentSubstring.join(' '));
            }
            while (currentWord.length > 15 && subStrings.length < 4) {
                currentSubstring = [currentWord.slice(0, 15)];
                subStrings.push(currentSubstring.join(' '));
                currentWord = currentWord.substring(15, currentWord.length);
            }
            currentSubstring = [currentWord];
            wordIndex++;
        } else {
            subStrings.push(currentSubstring.join(' '));
            currentSubstring = [currentWord];
            wordIndex++;
        }
    }

    if (currentSubstring.length > 0 && subStrings.length < 4) subStrings.push(currentSubstring.join(' '));
    return subStrings;
}

export const SECRET_CODE_MAX_LENGTH = 60;