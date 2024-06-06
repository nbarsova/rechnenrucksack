import {useState} from "react";

import {FormattedMessage, useIntl} from "react-intl";
import {NumberComplexity} from "../complexity/NumberComplexity";
import {Operation} from "../../util/enums/Operation";
import RefreshIcon from "../../svg/RefreshIcon";
import {Link} from "react-router-dom";
import MonsterPrintPage from "./MonsterPrintPage";
import PrintIcon from "../../svg/PrintIcon";
import SolutionIcon from "../../svg/SolutionIcon";
import "../complexity/Complexity.css";

const addOps = [Operation.ADD, Operation.SUB];
const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

const numberRanges = [10, 25, 100];

export function LockMonster() {
    const intl = useIntl();

    let [selectedOps, setSelectedOps] = useState(addOps);
    let [numberRange, setNumberRange] = useState(numberRanges[0]);

    const prepareParameters = () => {
    };

    console.log('rendering ', selectedOps);

    return (<div className="main">
        <div className="settings">
            <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                              onRangeChange={(range: number) => setNumberRange(range)}/>

            <div className='numberComplexity'>
                <b><FormattedMessage id="operations"/></b>
                <div
                    style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}>
                <input type="radio"
                       checked={selectedOps === addOps}
                       onChange={() => {
                           setSelectedOps(addOps)
                       }}/> + and -
            </div>
            <div
                style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}><input type="radio"
                                             checked={selectedOps === allOps}
                                             onChange={() => {
                                                 setSelectedOps(allOps)
                                             }}/>all arithmetic operations
            </div>

            <div className='buttons'>
                <div className='printButton'
                     title={intl.formatMessage({id: 'refresh'})}
                     onClick={() => {

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
        </div>
        <MonsterPrintPage/>
    </div>)
}
