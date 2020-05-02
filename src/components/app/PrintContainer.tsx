import React, {useEffect, useState} from 'react';
import PrintTreasurePage from "../treasure/PrintTreasurePage";
import {
    EQUATIONS_PARAMETER_NAME,
    getFromStorage,
    NUMBER_RANGE_PARAMETER_NAME,
    TARGETS_PARAMETER_NAME
} from "../../util/localStorage";
import {Puzzle} from "./Puzzle";
import {puzzles} from "./puzzles";

const PrintContainer = (props: {puzzle: string}) => {
    let currentPuzzleComponent;
    let puzzleTitle;
    const canvasHeight = window.innerHeight - 100;

    useEffect(()=> {
        setTimeout(()=> window.print(), 1000);
    });

    const numberRange = Number(getFromStorage(NUMBER_RANGE_PARAMETER_NAME));
    console.log(props.puzzle);

    switch(props.puzzle) {
        case(puzzles.treasure.key):
            currentPuzzleComponent = <PrintTreasurePage
                numberRange={Number(getFromStorage(NUMBER_RANGE_PARAMETER_NAME))}
                canvasHeight={canvasHeight}
                equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                targets={JSON.parse(getFromStorage(TARGETS_PARAMETER_NAME))}/>;
            puzzleTitle = puzzles.treasure.printTitle;
            break;
        default:
            currentPuzzleComponent = <div/>;
    }

    return (<div className='printContainer'>
        <div className='printTitle'>{puzzleTitle}</div>
        {currentPuzzleComponent}
        <div className='copyright'>(c) RECHNENRUCKSACK.COM</div>
    </div>)
};

export default PrintContainer;
