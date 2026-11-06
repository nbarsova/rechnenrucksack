import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Operation } from '../../types';

export function OperationsSelector(props: {
    allOps: Array<Operation>;
    onOpsChanged: (selectedOps: Array<Operation>) => void;
}) {
    const [selectedOps, setSelectedOps] = useState([
        Operation.ADD,
        Operation.SUB,
    ]);

    const renderOperation = (operation: Operation) => {
        return (
            <div
                onClick={() => {
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
                }}
                className="flex flex-none cursor-pointer flex-row"
                key={operation}
            >
                <input
                    type="checkbox"
                    checked={selectedOps.indexOf(operation) >= 0}
                    onChange={() => {}}
                />
                <p className="m-0 w-[20px]">{operation}</p>
            </div>
        );
    };

    return (
        <div className="flex flex-col p-[1vh]">
            <b>
                <FormattedMessage id="operations" />
            </b>
            <div className="flex flex-wrap">
                {props.allOps.map(renderOperation)}
            </div>
        </div>
    );
}
