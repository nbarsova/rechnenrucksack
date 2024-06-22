import {Equation} from "../types/Equation";
import {Operation} from "../types/enums/Operation";

export const createEquationSet = (steps: Array<number>, operations: Array<string>, complexity: number):Array<Equation> | undefined => {
    const generatedEquations: Array<Equation> = [];

    const equationsSet = [];

    const opTreshold = Math.floor(steps.length / operations.length) + 1;
    let adN = 0;
    let subN = 0;
    let multN = 0;
    let divN = 0;
    const tresholds = [];

    for (let ii = 0; ii < operations.length; ii++) {

        switch (operations[ii]) {
            // @ts-ignore
            case (Operation.ADD):
                adN = opTreshold;
            // @ts-ignore
            case (Operation.SUB):
                subN = opTreshold;
            // @ts-ignore
            case (Operation.MULT):
                multN = opTreshold;
            case (Operation.DIV):
                divN = opTreshold;
        }
    }

    tresholds.push({op: Operation.ADD, treshold: adN});
    tresholds.push({op: Operation.SUB, treshold: subN});
    tresholds.push({op: Operation.MULT, treshold: multN});
    tresholds.push({op: Operation.DIV, treshold: divN});

    for (let i = 0; i < steps.length; i++) {
        if (steps[i] > Number(complexity)) {
            return;
        } else {

            const exclusions = [];

            // если число простое - выкидываем умножение
            if (isPrime(steps[i])) {
                exclusions.push(Operation.MULT);
            }

            // если число = границе сложности - выкидываем вычитание
            if (steps[i] === complexity) {
                exclusions.push(Operation.SUB);
            }

            // если число < 4 - выкидываем сложение

            if (steps[i] < 4) {
                exclusions.push(Operation.ADD);
            }

            // если число >10, выкидываем деление

            if (steps[i] > 10) {
                exclusions.push(Operation.DIV);
            }

            const currentOp = selectOperation(operations, exclusions, tresholds);

            equationsSet.push(buildUniqueEquation(steps[i], currentOp, complexity, generatedEquations));

            //update tresholds
            for (let j = 0; j < tresholds.length; j++) {
                if ((tresholds[j].op === currentOp) && (tresholds[j].treshold > 0)) {
                    tresholds[j].treshold--;
                }
            }
        }
    }
    return equationsSet;
}


const selectOperation = function (operations: Array<string>, exclusions: Array<string>, tresholds: Array<any>) {
    if (operations.length === 1) return operations[0]
    else {
        let selectedOp;
        let maxTreshold = 0;

        for (let i = 0; i < operations.length; i++) {
            const op = operations[i];
            let excluded = false;

            for (let ii = 0; ii < exclusions.length; ii++) {
                if (exclusions[ii] === op) excluded = true;
            }

            if (!excluded) {
                for (let iii = 0; iii < tresholds.length; iii++) {
                    if ((tresholds[iii].op === op) && (tresholds[iii].treshold !== 0) && (maxTreshold < tresholds[iii].treshold)) {
                        maxTreshold = tresholds[iii].treshold;
                        selectedOp = tresholds[iii].op;
                    }
                }
            }
        }
        if (typeof (selectedOp) === 'undefined') {
            const randomNum = normalRandom(0, operations.length - 1);
            selectedOp = operations[randomNum];
        }
        return selectedOp;
    }
}


const createEquationsForNumber = function (number: number, operation: string, complexity: number) {
    switch (operation) {
        case (Operation.ADD):
            return createAdditionEquations(number);
        case (Operation.SUB):
            return createSubstractionEquations(number, complexity);
        case (Operation.MULT):
            return createMultiplicationEquations(number);
        case (Operation.DIV):
            return createDivisionEquations(number, complexity);
    }
}

const buildUniqueEquation = function (number: number, operation: string, complexity: number, generatedEquations: Array<any>) {
    let equation;
    let numberExists = false;
    let operationFound = false;

    for (let k = 0; k < generatedEquations.length; k++) {
        if (generatedEquations[k].number === number) {
            numberExists = true;
            for (let kk = 0; kk < generatedEquations[k].values.length; kk++) {
                if (generatedEquations[k].values[kk].operation === operation) {
                    operationFound = true;
                    if (generatedEquations[k].values[kk].equations.length === 0) {
                        generatedEquations[k].values[kk].equations = createEquationsForNumber(generatedEquations[k].number, operation, complexity);
                    }
                }
            }

            if (operationFound === false) {
                generatedEquations[k].values.push({
                    operation: operation,
                    equations: createEquationsForNumber(generatedEquations[k].number, operation, complexity)
                });
            }
        }
    }

    if (numberExists === false) {
        generatedEquations.push({
            number: number,
            values: [{
                operation: operation,
                equations: createEquationsForNumber(number, operation, complexity)
            }]
        });
    }

    for (let n = 0; n < generatedEquations.length; n++) {
        if (generatedEquations[n].number === number) {
            // console.log("Looking up number "+ generatedEquations[n].number);
            // console.log(generatedEquations[n].values);
            for (let nn = 0; nn < generatedEquations[n].values.length; nn++) {
                // console.log("The value is ");
                // console.log(generatedEquations[n].values[nn]);
                // console.log("Looking up operation "+generatedEquations[n].values[nn].operation);
                if (generatedEquations[n].values[nn].operation === operation) {
                    // console.log("There are "+generatedEquations[n].values[nn].equations.length + " equations for number "+number+ " operation "+operation);

                    if (generatedEquations[n].values[nn].equations.length === 0) {
                        // console.log("We need to generate some new equations");
                        generatedEquations[n].values[nn].equations = createEquationsForNumber(number, operation, complexity);
                    }

                    //console.log(generatedEquations[n].values[nn]);

                    const randomNumber = normalRandom(0, generatedEquations[n].values[nn].equations.length - 1);
                    //console.log("Random number is "+randomNumber);
                    equation = generatedEquations[n].values[nn].equations[randomNumber];
                    generatedEquations[n].values[nn].equations.splice(randomNumber, 1);

                }
            }
        }
    }
    //console.log(generatedEquations);
    return equation;
}

const createAdditionEquations = function (number: number) {
    const newEquations = [];

    let adstart = 0;
    if (number > 2) adstart = 1;

    for (let kk = adstart; kk <= number - adstart; kk++) {
        const newEquation = new Equation(kk, number - kk, Operation.ADD, number);
        newEquations.push(newEquation);
    }
    return newEquations;
}

const createSubstractionEquations = function (number: number, complexity: number) {
    const newEquations = [];

    let subDim = 0;
    if (number === Number(complexity)) {
        subDim = 1;
    }

    for (let ss = 1; ss <= complexity - number + subDim; ss++) {
        const newEquation = new Equation(number + ss - subDim, ss - subDim, Operation.SUB, number);
        newEquations.push(newEquation);
    }
    return newEquations;
}

const createMultiplicationEquations = function (number: number) {
    const newEquations = [];

    let multstart = 1;
    if ((!(isPrime(number))) && (number > 2)) {
        multstart = 2;
    }

    for (let mm = multstart; mm <= number / multstart; mm++) {
        if ((number) % mm === 0) {
            const newEquation = new Equation(mm, number / mm, Operation.MULT, number);
            newEquations.push(newEquation);
        }
    }
    return newEquations;
}

const createDivisionEquations = function (number: number, complexity: number) {
//    console.log("Creating division equations for number "+number +" settings "+settings);
    const newEquations = [];

    let divstart = 1;

    if (2 * number <= complexity) {
        divstart = 2;
    }

//    console.log("Division start ="+divstart);

    for (let dd = divstart; (dd < 10) && (dd * number <= complexity); dd++) {
        const newEquation = new Equation(dd * number, dd, Operation.DIV, number);
        newEquations.push(newEquation);
    }
    return newEquations;
}

/*
A function to generate random natural number in a range.
Negative input acceptable.
*/
export const normalRandom = (min: number, max: number) => {
    if (min > max) {
        throw new Error("Incorrect input, first argument " + min + " should be greater than the second " + max);
    }

    if (isNaN(min) || isNaN(max)) {
        throw new Error("Input must be numeric");
    }
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

/* Check if an absolute value of a number is prime */

export const isPrime = (number: number) => {
    let isPrime = true;

    if (Math.abs(number) <= 3) {
        isPrime = true;
    } else if ((number % 2 === 0) || (number % 3 === 0)) {
        isPrime = false;
    } else {
        for (let jj = 5; jj * jj < number; jj = jj + 6) {
            if ((number % jj === 0) || (number % (jj + 2) === 0)) {
                isPrime = false;
            }
        }
    }
    return isPrime;
}


