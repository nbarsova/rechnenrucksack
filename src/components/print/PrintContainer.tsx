import {useEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import PrintTreasurePage from "../treasure/print/PrintTreasurePage";
import {
    CURRENT_TARGET_PARAMETER_NAME,
    EQUATIONS_PARAMETER_NAME,
    getFromStorage,
    LETTER_CODES_PARAMETER_NAME,
    MONSTERS_AMOUNT_PARAMETER_NAME,
    NUMBER_RANGE_PARAMETER_NAME,
    removeFromStorage,
    TARGETS_PARAMETER_NAME
} from "../../util/localStorage";
import {puzzleKeys, puzzles} from "../app/puzzles";
import {FormattedMessage} from "react-intl";
import SecretCodePrintPage from "../secret/SecretCodePrintPage";
import PrintTreasureSolutionPage from "../treasure/print/PrintTreasureSolutionPage";
import MonsterPrintPage from "../monster/print/MonsterPrintPage";
import './Print.css'

const PrintContainer = () => {

    const [search] = useSearchParams();
    const puzzle = search.get('puzzle');
    const solution = search.get('solution');

    const [currentPuzzle, setCurrentPuzzle] = useState<string | null>(null);
    const fullPuzzleInfo = puzzles.find((p) => p.key === currentPuzzle);

    const puzzleTitle = fullPuzzleInfo ? fullPuzzleInfo.printTitle : '';

    const printElementDiv = useRef<HTMLDivElement>(null); // this is for the whole print page for pdf generation

    const canvasHeight = printElementDiv.current?.clientHeight && 0.8 * printElementDiv.current.clientHeight;
    console.log(printElementDiv.current?.clientHeight, canvasHeight)

    const innerPrintElementDiv = useRef<HTMLDivElement>(null); // this is container for the puzzle, we need it for right dimensions

    const clearStorage = () => {
        removeFromStorage(EQUATIONS_PARAMETER_NAME);
        removeFromStorage(CURRENT_TARGET_PARAMETER_NAME);
        removeFromStorage(NUMBER_RANGE_PARAMETER_NAME);
        removeFromStorage(TARGETS_PARAMETER_NAME);
        removeFromStorage(LETTER_CODES_PARAMETER_NAME);
        removeFromStorage(MONSTERS_AMOUNT_PARAMETER_NAME);
    };

    let puzzleComponent = null;

    switch (currentPuzzle) {
        case(puzzleKeys.TREASURE_PUZZLE_KEY):
            puzzleComponent = solution ?
                <PrintTreasureSolutionPage
                    equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                    currentTarget={JSON.parse(getFromStorage(CURRENT_TARGET_PARAMETER_NAME))}/> :
                <PrintTreasurePage
                    numberRange={Number(getFromStorage(NUMBER_RANGE_PARAMETER_NAME))}
                    canvasHeight={canvasHeight}
                    equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                    stones={JSON.parse(getFromStorage(TARGETS_PARAMETER_NAME))}
                    mode='print'/>;
            break;
        case (puzzleKeys.SECRET_CODE_PUZZLE_KEY):
            puzzleComponent = <SecretCodePrintPage
                equations={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                letterCodes={JSON.parse(getFromStorage(LETTER_CODES_PARAMETER_NAME))}
                canvasHeight={canvasHeight}
                showLetters={Boolean(solution)}
                mode='print'/>;
            break;
        case (puzzleKeys.MONSTER_PUZZLE_KEY):
            const monsterAmount = JSON.parse(getFromStorage(MONSTERS_AMOUNT_PARAMETER_NAME));
            const monsterEquations = JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME));
            puzzleComponent = <MonsterPrintPage
                monsterEquations={monsterEquations}
                monstersAmount={monsterAmount}
                showAnswers={Boolean(solution)} parentHeight={innerPrintElementDiv.current?.clientHeight}
                parentWidth={innerPrintElementDiv.current?.clientWidth}/>;
            break;
        default:
            puzzleComponent = null;
    }

    useEffect(() => {
        if (printElementDiv.current) {
            setCurrentPuzzle(puzzle);
        }
    }, [printElementDiv.current]);

    useEffect(() => {
        if (currentPuzzle) {
            window.print();
            clearStorage();
        }
    }, [currentPuzzle]);

    return (<div className='printPreviewContainer' ref={printElementDiv}>
            <div className='printHeader'>

                <div className='printTitle'>{puzzleTitle}</div>
                <div className='nameDate'>
                    <div className='nameDateLine'>
                        <span className='equationText'><FormattedMessage id='studentName'/></span>______________
                    </div>
                    <div className='nameDateLine'>
                        <span className='equationText'><FormattedMessage id='workDate'/></span>______________
                    </div>
                </div>
            </div>

            {puzzleComponent}

            <div className='copyright'>&#169; https://nbarsova.github.io/rechnenrucksack</div>
        </div>
    )
};

export default PrintContainer;
