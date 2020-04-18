import {NumberComplexity} from "../complexity/NumberComplexity";
import {EquationsAmount} from "../complexity/EquationsAmount";
import {OperationsSelector} from "../complexity/OperationsSelector";
import {Operation} from "../../util/Operation";
import React, {useState} from "react";

const Settings = () => {
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    let [numberRange, setNumberRange] = useState(numberRanges[0]);
    let [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    let [selectedOps, setSelectedOps] = useState(["+", "-"]);

    return (<div className="settings">
        <NumberComplexity numberRanges={numberRanges}
                          onRangeChange={(range: number) => setNumberRange(range)}/>

        <EquationsAmount equationsAmounts={equationsAmounts}
                         onChange={(amount: number) => setEquationsAmount(amount)}/>
        <OperationsSelector allOps={allOps}
                            onOpsChanged={(selectedOps) => {
                                setSelectedOps(selectedOps)
                            }}/>
    </div>)
}
