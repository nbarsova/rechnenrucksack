import React, {useState} from 'react';
import {FormattedMessage} from "react-intl";
import "./Complexity.css";
import {Operation} from "../../util/Operation";

export function OperationsSelector(props: {
    allOps: Array<Operation>,
    onOpsChanged: (selectedOps: Array<Operation>) => void
}) {

    let [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);

    let renderOperation = (operation: Operation) => {
        return (<div onClick={() => {
            let cont: boolean = false;
            let newOps: Array<Operation> = [];

            for (let op of selectedOps) {
                if (op !== operation) {
                    newOps.push(op);
                } else {
                    cont = true;
                }
            }

            if (!cont) {
                newOps.push(operation);
            }

            setSelectedOps(newOps);

            props.onOpsChanged(newOps);
        }} className="clickable">
        <input type="checkbox"
        checked={selectedOps.indexOf(operation) >= 0}
        onChange={() => {
        }}/>{operation}
        </div>);

    };

    return (<div className='numberComplexity'>
        <b><FormattedMessage id="operations"/></b>
    {props.allOps.map(renderOperation)}
    </div>)
}
