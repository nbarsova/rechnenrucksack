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
    const allEquations = createEquationSet(numbers,
        selectedOps,
        numberRange) || [];
    const monstersEquations =[];
    for (let i=0; i < monstersAmount; i++) {
        const innerArray: Equation[] = [];
        for (let ii=0; ii<4; ii++) {
            innerArray.push(allEquations[i*4+ii]);
            }
        monstersEquations.push(innerArray);
    }
    return monstersEquations;
}