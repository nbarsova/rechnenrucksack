import {Equation} from "./classes/Equation";
import {Operation} from "./enums/Operation";

export const createEquationSet = (steps: Array<number>, operations: Array<string>, complexity: number) => {
    let generatedEquations: Array<any> = [];

    let equationsSet = [];

    let opTreshold = Math.floor(steps.length / operations.length) + 1;
    let adN = 0;
    let subN = 0;
    let multN = 0;
    let divN = 0;
    let tresholds = [];

    for (let ii = 0; ii < operations.length; ii++) {
        switch (operations[ii]) {
            case (Operation.ADD):
                adN = opTreshold;
            case (Operation.SUB):
                subN = opTreshold;
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
            // deferred.reject("Step is more than complexity, need to regenerate steps");
        } else {

            let exclusions = [];

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

            var currentOp = selectOperation(operations, exclusions, tresholds);
            //console.log("The step is "+steps[i]+ " operation is "+ currentOp);

            equationsSet.push(buildUniqueEquation(steps[i], currentOp, complexity, generatedEquations));

            //update tresholds
            for (var j = 0; j < tresholds.length; j++) {
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
            var op = operations[i];
            var excluded = false;

            for (var ii = 0; ii < exclusions.length; ii++) {
                if (exclusions[ii] === op) excluded = true;
            }

            if (!excluded) {
                for (var iii = 0; iii < tresholds.length; iii++) {
                    if ((tresholds[iii].op === op) && (tresholds[iii].treshold !== 0) && (maxTreshold < tresholds[iii].treshold)) {
                        maxTreshold = tresholds[iii].treshold;
                        selectedOp = tresholds[iii].op;
                    }
                }
            }
        }
        if (typeof (selectedOp) === 'undefined') {
            let randomNum = normalRandom(0, operations.length - 1);
            //console.log("Random number "+ randomNum);
            selectedOp = operations[randomNum];
        }
        //console.log(selectedOp);
        return selectedOp;
    }
}


const createEquationsForNumber = function (number: number, operation: string, complexity: number) {
    switch (operation) {
        case (Operation.ADD):
            return createAdditionEquations(number, complexity);
        case (Operation.SUB):
            return createSubstractionEquations(number, complexity);
        case (Operation.MULT):
            return createMultiplicationEquations(number, complexity);
        case (Operation.DIV):
            return createDivisionEquations(number, complexity);
    }
}

const buildUniqueEquation = function (number: number, operation: string, complexity: number, generatedEquations: Array<any>) {
    // console.log("Building equation for step "+number + ", operation "+operation+ " ,complexity "+complexity);

    let equation;
    let numberExists = false;
    let operationFound = false;

    for (let k = 0; k < generatedEquations.length; k++) {
        if (generatedEquations[k].number === number) {
            numberExists = true;
            for (var kk = 0; kk < generatedEquations[k].values.length; kk++) {
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

                    var randomNumber = normalRandom(0, generatedEquations[n].values[nn].equations.length - 1);
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

const createAdditionEquations = function (number: number, complexity: number) {
    var newEquations = [];

    var adstart = 0;
    if (number > 2) adstart = 1;

    for (var kk = adstart; kk <= number - adstart; kk++) {
        var newEquation = new Equation(kk, number - kk, Operation.ADD, number);
        newEquations.push(newEquation);
    }
    return newEquations;
}

const createSubstractionEquations = function (number: number, complexity: number) {
    var newEquations = [];

    var subDim = 0;
    if (number === Number(complexity)) {
        subDim = 1;
    }

    for (var ss = 1; ss <= complexity - number + subDim; ss++) {
        var newEquation = new Equation(number + ss - subDim, ss - subDim, Operation.SUB, number);
        newEquations.push(newEquation);
    }
    return newEquations;
}

const createMultiplicationEquations = function (number: number, complexity: number) {
    var newEquations = [];

    var multstart = 1;
    if ((!(isPrime(number))) && (number > 2)) {
        multstart = 2;
    }

    for (var mm = multstart; mm <= number / multstart; mm++) {
        if ((number) % mm === 0) {
            var newEquation = new Equation(mm, number / mm, Operation.MULT, number);
            newEquations.push(newEquation);
        }
    }
    return newEquations;
}

const createDivisionEquations = function (number: number, complexity: number) {
//    console.log("Creating division equations for number "+number +" complexity "+complexity);
    var newEquations = [];

    var divstart = 1;

    if (2 * number <= complexity) {
        divstart = 2;
    }

//    console.log("Division start ="+divstart);

    for (var dd = divstart; (dd < 10) && (dd * number <= complexity); dd++) {
        var newEquation = new Equation(dd * number, dd, Operation.DIV, number);
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
    var isPrime = true;

    if (Math.abs(number) <= 3) {
        isPrime = true;
    } else if ((number % 2 === 0) || (number % 3 === 0)) {
        isPrime = false;
    } else {
        for (var jj = 5; jj * jj < number; jj = jj + 6) {
            if ((number % jj === 0) || (number % (jj + 2) === 0)) {
                isPrime = false;
            }
        }
    }
    return isPrime;
}


