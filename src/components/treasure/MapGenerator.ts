import {MapTargetObject} from "./classes/MapTargetObject";
import {isPrime, normalRandom} from "../../util/arithmetic";

export const initTargets = (fieldSize: number): Array<MapTargetObject> => {
    const targetObjects = [new MapTargetObject(fieldSize - Math.floor((Math.random() * fieldSize) / 3),
        fieldSize - Math.floor((Math.random() * fieldSize) / 3)),
        new MapTargetObject(fieldSize - Math.floor((Math.random() * fieldSize) / 3),
            -fieldSize + Math.floor((Math.random() * fieldSize) / 3)),
        new MapTargetObject(-fieldSize + Math.floor((Math.random() * fieldSize) / 3),
            fieldSize - Math.floor((Math.random() * fieldSize) / 3)),
        new MapTargetObject(-fieldSize + Math.floor((Math.random() * fieldSize) / 3),
            -fieldSize + Math.floor((Math.random() * fieldSize) / 3))];
    return targetObjects;
};


export const createPathToCurrentTarget
    = (complexity: number,
       equationsAmount: number,
       fieldSize: number,
       currentTarget: MapTargetObject,
       options: any) => {
    const pathObject = new MapTargetObject(0, 0);
    let step = 0;

    const steps = [];

    for (let i = 0; i < equationsAmount - 4; i++) {
        let upperLimit = fieldSize;
        let lowerLimit = 3;

        if (i % 2 == 0) // odd steps are horizontal
        {
            if (Number(complexity) > Number(fieldSize)) {
                upperLimit = Math.max(Math.abs(fieldSize - pathObject.x) - 1, Math.abs(-fieldSize - pathObject.x) - 1);
                if (upperLimit > fieldSize) lowerLimit = fieldSize;
//            console.log("Limit is "+upperLimit);
            }

            if (options.noPrimes) {
                step = createNonPrimeStep(lowerLimit, upperLimit, pathObject.x, fieldSize);
            } else {
                step = createUniqueStep(lowerLimit, upperLimit, pathObject.x, fieldSize, steps);
            }
            steps.push(step);
            pathObject.x += step;
        } else // even steps are vertical
        {
            if (complexity > fieldSize) {
                upperLimit = Math.max(Math.abs(fieldSize - pathObject.y) - 1, Math.abs(-fieldSize - pathObject.y) - 1);
                if (upperLimit > fieldSize) lowerLimit = fieldSize;
//            console.log("Limit is "+upperLimit);
            }
            if (options.noPrimes) {
                step = createNonPrimeStep(lowerLimit, upperLimit, pathObject.y, fieldSize);
            } else {
                step = createUniqueStep(lowerLimit, upperLimit, pathObject.y, fieldSize, steps);
            }

            steps.push(step);
            pathObject.y += step;
        }
//      console.log("Position is "+ pathObject.x + ", "+pathObject.y);
    }

    // two steps before last, we need to get close to target, but not too close

    const deltaX = currentTarget.x - pathObject.x;
//    console.log("Delta x "+deltaX);

    if (Math.abs(deltaX) > 3) {
        step = Math.floor(deltaX / 2);
    } else {
        step = normalRandom(fieldSize, Number(fieldSize) * 2 - 3) * Math.sign(currentTarget.x) * (-1);
    }

    pathObject.x += step;
    steps.push(step);
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

    // Предпоследний вертикальный
    const deltaY = currentTarget.y - pathObject.y;
//    console.log("Delta y "+deltaY);

    if (Math.abs(deltaY) > 3) {
        step = Math.floor(deltaY / 2);
    } else {
        step = normalRandom(fieldSize, Number(fieldSize) * 2 - 3) * Math.sign(currentTarget.y) * (-1);
    }

    pathObject.y += step;
    steps.push(step);
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

    // последний горизонтальный
    const lastHorStep = currentTarget.x - pathObject.x;
    steps.push(lastHorStep);
    pathObject.x += lastHorStep;
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

    // последний вертикальный
    const lastVertStep = currentTarget.y - pathObject.y;
    steps.push(lastVertStep);

    pathObject.y += lastVertStep;
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);
//    console.log(steps);
    return steps;
}

/*
const createEquationsFromPath = (steps: Array<number>, settings: number, language: string, operations: Array<string>) => {

    var numberSteps = [];
    for (var i = 0; i < steps.length; i++) {
        numberSteps.push(Math.abs(steps[i]));
    }
    let stepArr = createEquationSet(numberSteps, operations, settings);
    let res = [];

    for (let j = 0; j < stepArr.length; j++) {
        var step = steps[j]
        var equation = stepArr[j];
        res.push({equation: equation, step: step});
    }
    return res;

}


const isTarget = (x: number, y: number, targetObjects: Array<MapTargetObject>) => {
    var isTarget = false;
    for (var i = 0; i < targetObjects.length; i++) {
        if ((targetObjects[i].x === x) && (targetObjects[i].y === y)) {
            return true;
        }
    }
    return isTarget;
}
*/
const isUniqueNumberStep = (number: number, steps: Array<any>) => {
    const isUnique = true;
    for (let i = 0; i < steps.length; i++) {
        if (Math.abs(steps[i].step) === Math.abs(number)) {
            return false;
        }
    }
    return isUnique;
}

const createUniqueStep = function (lowerLimit: number,
                                   upperLimit: number,
                                   coordinate: any, fieldSize: number,
                                   steps: Array<any>) {
    let step = 0;

    do {
        step = normalRandom(lowerLimit, upperLimit);
        const signChange = Math.random();
        if (signChange < 0.5) {
            step = -step;
        }
        if (Math.abs(coordinate + step) > fieldSize) {
            step = -step;
        }

    } while (!isUniqueNumberStep(step, steps));
    return step;
}

const createNonPrimeStep = function (lowerLimit: number,
                                     upperLimit: number,
                                     coordinate: any,
                                     fieldSize: number) {
//  console.log("Creating step for limit [" +lowerLimit+" ,"+ upperLimit+ "], coordinate "+coordinate);
    let step = 0;
    do {
        step = normalRandom(lowerLimit, upperLimit);
        const signChange = Math.random();
        if (signChange < 0.5) {
            step = -step;
        }
        if (Math.abs(coordinate + step) > fieldSize) {
            step = -step;
        }
    } while (isPrime(step));
    return step;
}

