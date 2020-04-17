import React, {useState} from 'react';
import {FormattedMessage} from "react-intl";
import "./Complexity.css";

export function OperationsSelector(props: {
    allOps: Array<string>,
    initialOps: Array<string>,
    onOpsChanged: (selectedOps: Array<string>) => void
}) {

    let [selectedOps, setSelectedOps] = useState(props.initialOps);

    let renderOperation = (operation: string) => {
        return (<div onClick={() => {
            let cont: boolean = false;
            let newOps = [];

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

    return (<div>
        <b><FormattedMessage id="operations"/></b>
    {props.allOps.map(renderOperation)}
    </div>)
}
