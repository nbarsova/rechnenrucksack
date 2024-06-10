import {useEffect, useState} from "react";

import {FormattedMessage, useIntl} from "react-intl";
import {NumberComplexity} from "../complexity/NumberComplexity";
import {Operation} from "../../util/enums/Operation";
import RefreshIcon from "../../svg/RefreshIcon";
import {Link} from "react-router-dom";
import MonsterPrintPage from "./MonsterPrintPage";
import PrintIcon from "../../svg/PrintIcon";
import SolutionIcon from "../../svg/SolutionIcon";
import "../complexity/Complexity.css";

import {Equation} from "../../util/classes/Equation";

import { createMonsterEquations, } from "./MonsterEquationsGenerator";

const addOps = [Operation.ADD, Operation.SUB];
const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

const numberRanges = [10, 25, 100];

const monstersAmounts = [4, 6, 8];

export function LockMonster() {
    const intl = useIntl();

    const [selectedOps, setSelectedOps] = useState(addOps);
    const [numberRange, setNumberRange] = useState(numberRanges[0]);
    const [monstersAmount, setMonstersAmount] = useState<number>(monstersAmounts[0]);

    const [monsterEquations, setMonsterEquations] = useState<Array<Array<Equation>>>(createMonsterEquations(monstersAmount, selectedOps, numberRange));

    useEffect(() => {
        const newEquations = createMonsterEquations(monstersAmount, selectedOps, numberRange);
        setMonsterEquations(newEquations);
    }, [selectedOps, numberRange, monstersAmount]);

    const prepareParameters = () => {
    };

    const viewportHeight = window.innerHeight;

    const canvasDivHeight = viewportHeight - 220;

    const monsterHeight = (canvasDivHeight-100)/2;

    const monsterCellHeight = monsterHeight/7;

    console.log(canvasDivHeight, monsterHeight, monsterCellHeight, monstersAmount*monsterHeight/2);

    const monsterDivWidth = monstersAmount * monsterHeight / 2;

    return (<div className="main">
        <div className="settings">
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
                           }}/> + and -
                </div>
                <div
                    className='clickableRadio'>
                    <input type="radio"
                           checked={selectedOps === allOps}
                           onChange={() => {
                               setSelectedOps(allOps)
                           }}/>all arithmetic operations
                </div>
            </div>

            <div className='numberComplexity'>
                <b>How many monsters?</b>
                {monstersAmounts.map((amount: number) => <div
                    style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}} key={amount}>
                    <input type="radio"
                           checked={monstersAmount === amount}
                           onChange={() => {
                               setMonstersAmount(amount);
                           }}/>{amount}
                </div>)}
            </div>

            <div className='buttons'>
                <div className='printButton'
                     title={intl.formatMessage({id: 'refresh'})}
                     onClick={() => {
                         const newEquations = createMonsterEquations(monstersAmount, selectedOps, numberRange);
                         setMonsterEquations(newEquations);
                     }}
                ><RefreshIcon/></div>

                <Link target='_blank' to={"secret/print"}
                      className='printButton'
                      title={intl.formatMessage({id: 'printStudent'})}
                      onClick={prepareParameters}
                ><PrintIcon/></Link>

                <Link target='_blank' to={"secret/print/solution"}
                      className='printButton'
                      onClick={prepareParameters}
                      title={intl.formatMessage({id: 'printTeacher'})}
                ><SolutionIcon/></Link>
            </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: monsterDivWidth}}>
            {monsterEquations && monsterEquations.map((equationSet, index) =>
            <MonsterPrintPage equations={equationSet} key={index}
        monsterCellSize={monsterCellHeight}/>)}
        </div>
    </div>)
}
