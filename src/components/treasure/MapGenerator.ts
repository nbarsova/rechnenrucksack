import {isPrime, normalRandom} from "../../util/arithmetic";
import {Axis, Direction, MapCoordinate} from "./types";

export type GenerationOptions = {
    noPrimes: boolean;
}

export const initTargets = (fieldSize: number): Array<MapCoordinate> => {
    const targetObjects: MapCoordinate[] = [
        {
            x: fieldSize - Math.floor((Math.random() * fieldSize) / 3),
            y: fieldSize - Math.floor((Math.random() * fieldSize) / 3)
        },
        {
            x: fieldSize - Math.floor((Math.random() * fieldSize) / 3),
            y: -fieldSize + Math.floor((Math.random() * fieldSize) / 3)
        },
        {
            x: -fieldSize + Math.floor((Math.random() * fieldSize) / 3),
            y: fieldSize - Math.floor((Math.random() * fieldSize) / 3)
        },
        {
            x: -fieldSize + Math.floor((Math.random() * fieldSize) / 3),
            y: -fieldSize + Math.floor((Math.random() * fieldSize) / 3)
        }];
    return targetObjects;
};

/**
 * creates sequence of steps to reach the goal target from the center of the map.
 * steps have sign: positive steps are up or right, negative steps are down or left
 *
 */
export const createPathToGoalTarget
    = (complexity: number,
       equationsAmount: number,
       fieldSize: number,
       goalTarget: MapCoordinate,
       options: GenerationOptions) => {
    const pathObject: MapCoordinate = {x: 0, y: 0};
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
            }
            if (options.noPrimes) {
                step = createNonPrimeStep(lowerLimit, upperLimit, pathObject.y, fieldSize);
            } else {
                step = createUniqueStep(lowerLimit, upperLimit, pathObject.y, fieldSize, steps);
            }

            steps.push(step);
            pathObject.y += step;
        }
    }

    // two steps before last, we need to get close to target, but not too close

    const deltaX = goalTarget.x - pathObject.x;

    if (Math.abs(deltaX) > 3) {
        step = Math.floor(deltaX / 2);
    } else {
        step = normalRandom(fieldSize, Number(fieldSize) * 2 - 3) * Math.sign(goalTarget.x) * (-1);
    }

    pathObject.x += step;
    steps.push(step);

    // the last before one vertical
    const deltaY = goalTarget.y - pathObject.y;

    if (Math.abs(deltaY) > 3) {
        step = Math.floor(deltaY / 2);
    } else {
        step = normalRandom(fieldSize, Number(fieldSize) * 2 - 3) * Math.sign(goalTarget.y) * (-1);
    }

    pathObject.y += step;
    steps.push(step);

    // the last before one horizontal
    const lastHorStep = goalTarget.x - pathObject.x;
    steps.push(lastHorStep);
    pathObject.x += lastHorStep;

    // last vertical
    const lastVertStep = goalTarget.y - pathObject.y;
    steps.push(lastVertStep);

    pathObject.y += lastVertStep;
    return steps;
}

const isUniqueNumberStep = (number: number, steps: Array<any>) => {
    const isUnique = true;
    for (let i = 0; i < steps.length; i++) {
        if (Math.abs(steps[i].step) === Math.abs(number)) {
            return false;
        }
    }
    return isUnique;
}

export const createUniqueStep = function (lowerLimit: number,
                                          upperLimit: number,
                                          coordinate: number, fieldSize: number,
                                          steps: Array<number>) {
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

export const createDirections = (steps: number[]): Direction [] => {
    const directions: Direction[] = [];
    steps.forEach((step, index) => {
        const axis = index % 2 == 0 ? Axis.Horizontal : Axis.Vertical;
        let direction: Direction;
        switch (axis) {
            case Axis.Vertical:
                direction = Math.sign(step) === 1 ? 'dirUp' : 'dirDown';
                break;
            case Axis.Horizontal:
                direction = Math.sign(step) === 1 ? 'dirRight' : 'dirLeft';
                break;
        }
        directions.push(direction);
    })
    return directions;
}

