import React, {useState} from 'react';
import "./Complexity.css";
import {FormattedMessage} from "react-intl";

export function NumberComplexity(props: {
    numberRanges: Array<number>,
    selectedRange: number,
    onRangeChange: (range: number) => void
}) {

    let renderRange = (range: number) => {
        return (<div key={range}
        className="clickable"
        onClick={() => {
            if (range !== props.selectedRange) {
                props.onRangeChange(range);
            }
        }}>
        <input type="radio"
        checked={range === props.selectedRange}
        onChange={()=>{}}/>0-{range}</div>)
    };

    return (
        <div className="numberComplexity">
        <b><FormattedMessage id="numberRanges"/></b>
    {props.numberRanges.map(renderRange)}

    </div>
)
}
