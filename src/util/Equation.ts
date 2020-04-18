export class Equation
{
    number1: number;
    number2: number;
    operation: string;
    result: number;

    constructor(number1: number, number2: number, operation: string, result: number)
    {
        this.number1 = number1;
        this.number2 = number2;
        this.operation = operation;
        this.result = result;
    }

    print ()
    {
        return (this.number1+" "+ this.operation+" "+this.number2);
    }

    equals (newEquation: Equation)
    {
        return ((newEquation.number1 === this.number1)
            && (newEquation.number2 === this.number2)
            && (newEquation.operation === this.operation)
            && (newEquation.result === this.result));
    }
}
