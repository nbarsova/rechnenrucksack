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

export class StepEquation {
    step: number;
    equation: Equation;

    constructor(newStep: number, newEquation: Equation) {
        this.step = newStep;
        this.equation = newEquation;
    }
}

export enum Operation {
    ADD = '+',
    SUB = '-',
    MULT = '\u00D7',
    DIV = ':'
}

export type LetterCode = { letter: string; code: number; }
