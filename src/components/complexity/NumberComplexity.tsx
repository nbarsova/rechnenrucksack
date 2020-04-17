import React, {useState} from 'react';
import "./Complexity.css";
import {FormattedMessage} from "react-intl";

export function NumberComplexity(props: {
    numberRanges: Array<number>,
    onRangeChange: (range: number) => void
}) {

    let renderRange = (range: number) => {
        return (<div key={range}
        className="clickable"
        onClick={() => {
            if (range !== selectedRange) {
                setSelectedRange(range);
                props.onRangeChange(range);
            }
        }}>
        <input type="radio"
        checked={range === selectedRange}
        onChange={()=>{}}/>0-{range}</div>)
    };

    let [selectedRange, setSelectedRange] = useState(props.numberRanges[0]);
    return (
        <div className="numberComplexity">
        <b><FormattedMessage id="numberRanges"/></b>
    {props.numberRanges.map(renderRange)}

    </div>
)
}
