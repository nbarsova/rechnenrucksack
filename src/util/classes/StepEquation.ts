import {Equation} from "./Equation";

export class StepEquation {
    step: number;
    equation: Equation;

    constructor(newStep:number, newEquation:Equation)
    {
        this.step=newStep;
        this.equation=newEquation;
    }
}
