import {createEquationSet, normalRandom} from "../../util/arithmetic";
import {Equation} from "../../util/classes/Equation";
import {Operation} from "../../util/enums/Operation";


export const countMessageSymbols = (secretMessage: string) => {
    let symbols = [];
    for (let i = 0; i < secretMessage.length; i++) {
        let symbol = secretMessage.charAt(i);

        if (isLetter(symbol) && symbols.indexOf(symbol.toUpperCase()) === -1)
            symbols.push(symbol.toUpperCase());
    }
    return symbols;
};

const isUniqueCode = (code: number, letterCodes: Array<any>) => {
    for (var i = 0; i < letterCodes.length; i++) {
        if (letterCodes[i].code === code) {
            return false;
        }
    }
    return true;
};

export const createLetterCodes = (symbols: Array<string>, numberRange: number) => {
    const newCodes = [];
    let treshold = (symbols.length === numberRange) ? symbols.length - 1 : symbols.length;
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
    let steps: Array<number> = [];

    for (let i = 0; i < sMessage.length; i++) {
        let symbol = sMessage.charAt(i).toUpperCase();
        if (isLetter(symbol)) {
            const step = findCodeForLetter(symbol, codes);
            if (step) {
                steps.push(step.code);
            }
        }
    }

    const equations: Array<Equation> | undefined = createEquationSet(steps, selectedOps, numberRange);
    return equations;
};

export const createSecretCodeForMessage = (message: string, numberRange: number, selectedOps: Operation[]) => {
    const symbols = countMessageSymbols(message);
    const codes = createLetterCodes(symbols, numberRange);
    const equations = createEquations(message, codes, selectedOps, numberRange);
    return {symbols, codes, equations};
}
