import {createEquationSet, normalRandom} from "../../util/arithmetic";
import {Operation} from "../../types/enums/Operation";
import {Equation} from "../../types/Equation";

export const createMonsterNumbers = (monstersAmount: number, numberRange: number) => {
    const monsterNumbers = new Array(4 * monstersAmount);
    for (let i = 0; i < monsterNumbers.length; i++) {
        monsterNumbers[i] = (normalRandom(1, numberRange));
    }
    return monsterNumbers;
}


export const createMonsterEquations = (monstersAmount: number, selectedOps: Operation[], numberRange: number) => {
    const numbers = createMonsterNumbers(monstersAmount, numberRange);
    return createEquationSet(numbers,
        selectedOps,
        numberRange) || [];
}

export const createMonsterEquationsArray = (equations: Array<Equation>, monstersAmount: number) => {
    const monsterEquations = [];
    for (let i = 0; i < monstersAmount; i++) {
        const innerArray: Equation[] = [];
        for (let ii = 0; ii < 4; ii++) {
            innerArray.push(equations[i * 4 + ii]);
        }
        monsterEquations.push(innerArray);
    }
    return monsterEquations;
}