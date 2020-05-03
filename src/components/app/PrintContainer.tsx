import React, {useEffect, useState} from 'react';
import PrintTreasurePage from "../treasure/print/PrintTreasurePage";
import {
    CURRENT_TARGET_PARAMETER_NAME,
    EQUATIONS_PARAMETER_NAME,
    getFromStorage, NAME_DATE_PARAMETER,
    NUMBER_RANGE_PARAMETER_NAME,
    TARGETS_PARAMETER_NAME
} from "../../util/localStorage";
import {Puzzle} from "./Puzzle";
import {puzzles} from "./puzzles";
import {FormattedMessage} from "react-intl";
import PrintTreasureSolutionPage from "../treasure/print/PrintTreasureSolutionPage";

const PrintContainer = (props: {puzzle: string, solution?: boolean}) => {
    let currentPuzzleComponent;
    let puzzleTitle;
    const canvasHeight = window.innerHeight - 100;

    useEffect(()=> {
        setTimeout(()=> window.print(), 1000);
    });


    switch(props.puzzle) {
        case(puzzles.treasure.key):
            currentPuzzleComponent = props.solution ?
                <PrintTreasureSolutionPage
                    equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                    currentTarget={JSON.parse(getFromStorage(CURRENT_TARGET_PARAMETER_NAME))}/>:
             <PrintTreasurePage
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
        {!props.solution && <div className='nameDate'>
            <div className='nameDateLine'>
                <span className='equationText'><FormattedMessage id='studentName' /></span>______________</div>
            <div className='nameDateLine'>
                <span className='equationText'><FormattedMessage id='workDate'/></span>______________</div>
        </div>}
        {currentPuzzleComponent}
        <div className='copyright'>&#169; RECHNENRUCKSACK.COM</div>
    </div>)
};

export default PrintContainer;
