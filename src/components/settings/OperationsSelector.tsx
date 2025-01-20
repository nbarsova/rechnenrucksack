import {useState} from 'react';
import {FormattedMessage} from "react-intl";
import "./Complexity.css";

import {Operation} from "../../types";

export function OperationsSelector(props: {
    allOps: Array<Operation>,
    onOpsChanged: (selectedOps: Array<Operation>) => void
}) {

    const [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);

    const renderOperation = (operation: Operation) => {
        return (<div onClick={() => {
            let cont: boolean = false;
            const newOps: Array<Operation> = [];

            for (const op of selectedOps) {
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
        }} className="clickable operationItem" key={operation}>
            <input type="checkbox"
                   checked={selectedOps.indexOf(operation) >= 0}
                   onChange={() => {
                   }}/>
            <p className='operationText'>{operation}</p>
        </div>);

    };

    return (<div className='numberComplexity'>
        <b><FormattedMessage id="operations"/></b>
        <div className='operationsContainer'>{props.allOps.map(renderOperation)}</div>
    </div>)
}
