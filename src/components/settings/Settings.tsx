import {NumberComplexity} from "../complexity/NumberComplexity";
import {EquationsAmount} from "../complexity/EquationsAmount";
import {OperationsSelector} from "../complexity/OperationsSelector";
import {Operations} from "../../util/Operations";
import React, {useState} from "react";

const Settings = () => {
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = [Operations.ADD, Operations.SUB, Operations.MULT, Operations.DIV];

    let [numberRange, setNumberRange] = useState(numberRanges[0]);
    let [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    let [selectedOps, setSelectedOps] = useState(["+", "-"]);

    return (<div className="settings">
        <NumberComplexity numberRanges={numberRanges}
                          onRangeChange={(range: number) => setNumberRange(range)}/>

        <EquationsAmount equationsAmounts={equationsAmounts}
                         onChange={(amount: number) => setEquationsAmount(amount)}/>
        <OperationsSelector allOps={allOps}
                            initialOps={[Operations.ADD, Operations.MULT]}
                            onOpsChanged={(selectedOps) => {
                                setSelectedOps(selectedOps)
                            }}/>
    </div>)
}
