import {useState} from 'react';
import "./Complexity.css";
import {FormattedMessage} from "react-intl";

export function EquationsAmount(props:
                                {
                                    equationsAmounts: Array<number>,
                                    onChange: (amount: number) => void
                                }) {

    const [selectedAmount, setSelectedAmount] = useState(props.equationsAmounts[0]);

    const renderAmount = (amount: number) => {
        return (<div key={amount}
                     className="clickable"
                     onClick={() => {
                         if (amount !== selectedAmount) {
                             setSelectedAmount(amount);
                             props.onChange(amount);
                         }
                     }}><input type="radio"
                               checked={amount === selectedAmount}
                               onChange={() => {
                               }}/>{amount}</div>)
    }
    return (
        <div className="numberComplexity">
            <b><FormattedMessage id="equationsAmount"/></b>
            {props.equationsAmounts.map(renderAmount)}

        </div>
    )
}
