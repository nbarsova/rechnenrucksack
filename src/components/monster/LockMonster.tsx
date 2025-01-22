import {useEffect, useState} from "react";

import {FormattedMessage} from "react-intl";
import {NumberComplexity} from "../settings/NumberComplexity";
import "../settings/Complexity.css";
import "./LockMonster.css";

import {createMonsterEquations,} from "./MonsterEquationsGenerator";
import {EQUATIONS_PARAMETER_NAME, MONSTERS_AMOUNT_PARAMETER_NAME, setInStorage} from "../../util/localStorage";
import MonsterPrintPage from "./print/MonsterPrintPage";
import Buttons from "../buttons/Buttons";
import {puzzleKeys} from "../app/puzzles";
import {Equation, Operation} from "../../types";

const addOps = [Operation.ADD, Operation.SUB];
const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

const numberRanges = [10, 25, 100];

const monstersAmounts = [6, 4, 2];

export function LockMonster() {

    const [selectedOps, setSelectedOps] = useState(addOps);
    const [numberRange, setNumberRange] = useState(numberRanges[0]);
    const [monstersAmount, setMonstersAmount] = useState<number>(monstersAmounts[0]);

    const [monsterEquations, setMonsterEquations] = useState<Array<Equation>>(createMonsterEquations(monstersAmount, selectedOps, numberRange));

    useEffect(() => {
        const newEquations = createMonsterEquations(monstersAmount, selectedOps, numberRange);
        setMonsterEquations(newEquations);
    }, [selectedOps, numberRange, monstersAmount]);

    const prepareParameters = () => {
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(monsterEquations));
        setInStorage(MONSTERS_AMOUNT_PARAMETER_NAME, JSON.stringify(monstersAmount));
    };

    const refresh = () => {
        const newEquations = createMonsterEquations(monstersAmount, selectedOps, numberRange);
        setMonsterEquations(newEquations);
    }

    const viewportHeight = Math.min(window.screen.height, window.innerHeight);
    const viewportWidth = Math.min(window.innerWidth, window.innerWidth);

    let mainAreaHeight;

    // now we are actually imitating css media queries to get correct canvas height, please keep this in sync
    if (viewportWidth < 1200) {
        //                                   headerHeight             subHeaderHeight        footerHeight           settingsHeight
        mainAreaHeight = (viewportHeight - 0.08 * viewportHeight - 0.06 * viewportHeight - 0.06 * viewportHeight - 0.3 * viewportHeight);
    } else {
        // same as printPreview height in css plus a padding, if you're changing this here, change CSS too!!!
        mainAreaHeight = viewportHeight - 0.08 * viewportHeight - 0.04 * viewportHeight - 0.06 * viewportHeight - 0.02 * viewportHeight;
    }

    return (<div className="main">
            <div className="settings">
                <div className='treasureSettings'>
                    <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                                      onRangeChange={(range: number) => setNumberRange(range)}/>

                    <div className='numberComplexity'>
                        <b><FormattedMessage id="operations"/></b>
                        <div
                            className='clickableRadio'>
                            <input type="radio"
                                   checked={selectedOps === addOps}
                                   onChange={() => {
                                       setSelectedOps(addOps)
                                   }}/><FormattedMessage id='addAndSubscribe'/>
                        </div>
                        <div
                            className='clickableRadio'>
                            <input type="radio"
                                   checked={selectedOps === allOps}
                                   onChange={() => {
                                       setSelectedOps(allOps)
                                   }}/><FormattedMessage id='allOperations'/>
                        </div>
                    </div>

                    <div className='numberComplexity'>
                        <b><FormattedMessage id='howManyMonsters'/></b>
                        {monstersAmounts.map((amount: number) => <div
                            style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}} key={amount}>
                            <input type="radio"
                                   checked={monstersAmount === amount}
                                   onChange={() => {
                                       setMonstersAmount(amount);
                                   }}/>{amount}
                        </div>)}
                    </div>
                    <Buttons prepareSolutionParameters={prepareParameters} preparePrintParameters={prepareParameters}
                             refresh={refresh} puzzleKey={puzzleKeys.MONSTER_PUZZLE_KEY}/>
                </div>


            </div>
            <div className='printPreview'>
                <MonsterPrintPage equations={monsterEquations}
                                  monstersAmount={monstersAmount} showAnswers={false}
                                  parentHeight={mainAreaHeight}/>
            </div>
        </div>
    )
}
