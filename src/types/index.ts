export class Equation {
    number1: number;
    number2: number;
    operation: string;
    result: number;

    constructor(number1: number, number2: number, operation: string, result: number) {
        this.number1 = number1;
        this.number2 = number2;
        this.operation = operation;
        this.result = result;
    }
}

export enum Operation {
    ADD = '+',
    SUB = '-',
    MULT = '\u00D7',
    DIV = ':'
}

export type LetterCode = { letter: string; code: number; }
