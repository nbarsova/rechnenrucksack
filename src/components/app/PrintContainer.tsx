import {useEffect, useRef, useState} from 'react';
import PrintTreasurePage from "../treasure/print/PrintTreasurePage";
import {
    CURRENT_TARGET_PARAMETER_NAME,
    EQUATIONS_PARAMETER_NAME,
    getFromStorage, LETTER_CODES_PARAMETER_NAME, MONSTERS_AMOUNT_PARAMETER_NAME,
    NUMBER_RANGE_PARAMETER_NAME, removeFromStorage,
    TARGETS_PARAMETER_NAME
} from "../../util/localStorage";
import {puzzles} from "./puzzles";
import {FormattedMessage} from "react-intl";
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import SecretCodePrintPage from "../secret/SecretCodePrintPage";
import PrintTreasureSolutionPage from "../treasure/print/PrintTreasureSolutionPage";
import MonsterPrintPage from "../monster/print/MonsterPrintPage";

const PrintContainer = (props: { puzzle: string, solution?: boolean }) => {

    const [currentPuzzle, setCurrentPuzzle] = useState<string | null>(null);
    // @ts-ignore
    let puzzleTitle = currentPuzzle ? puzzles[currentPuzzle].printTitle: '';
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const canvasDivWidth = viewportWidth - 300; // magic nums from css
    const canvasDivHeight = viewportHeight - 200;
    let canvasHeight = Math.min(canvasDivHeight, canvasDivWidth / 2);

    const printElementDiv = useRef<HTMLDivElement>(null); // this is for the whole print page for pdf generation
    const innerPrintElementDiv = useRef<HTMLDivElement>(null); // this is container for the puzzle, we need it for right dimensions

    async function createPDF() {

        const element = printElementDiv.current;
        // @ts-ignore
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF('landscape');
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');

    }

    const clearStorage = ()=> {
        removeFromStorage(EQUATIONS_PARAMETER_NAME);
        removeFromStorage(CURRENT_TARGET_PARAMETER_NAME);
        removeFromStorage(NUMBER_RANGE_PARAMETER_NAME);
        removeFromStorage(TARGETS_PARAMETER_NAME);
        removeFromStorage(LETTER_CODES_PARAMETER_NAME);
        removeFromStorage(MONSTERS_AMOUNT_PARAMETER_NAME);
    };

    let puzzleComponent=null;

    switch (currentPuzzle) {
        case(puzzles.treasure.key):
            puzzleComponent = props.solution ?
                <PrintTreasureSolutionPage
                    equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                    currentTarget={JSON.parse(getFromStorage(CURRENT_TARGET_PARAMETER_NAME))}/> :
                <PrintTreasurePage
                    numberRange={Number(getFromStorage(NUMBER_RANGE_PARAMETER_NAME))}
                    canvasHeight={canvasHeight}
                    equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                    stones={JSON.parse(getFromStorage(TARGETS_PARAMETER_NAME))}/>;
            break;
        case (puzzles.secret.key):
            puzzleComponent = <SecretCodePrintPage
                equations={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                letterCodes={JSON.parse(getFromStorage(LETTER_CODES_PARAMETER_NAME))}
                canvasHeight={canvasHeight}
                showLetters={Boolean(props.solution)}/>;
            break;
        case (puzzles.monster.key):
            const monsterAmount = JSON.parse(getFromStorage(MONSTERS_AMOUNT_PARAMETER_NAME));
            const monsterEquations = JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME));
            puzzleComponent = <MonsterPrintPage
                monsterEquations={monsterEquations}
                monstersAmount={monsterAmount}
                showAnswers={Boolean(props.solution)} parentHeight={innerPrintElementDiv.current?.clientHeight}
                parentWidth={innerPrintElementDiv.current?.clientWidth}/>;
            break;
        default:
            puzzleComponent=null;
    }

    useEffect(() => {
        if (innerPrintElementDiv.current) {
            setCurrentPuzzle(props.puzzle);
        }
    }, [innerPrintElementDiv.current]);

    useEffect(()=> {
        if (currentPuzzle) {
            createPDF();
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

            <div className='printPuzzle'
                 ref={innerPrintElementDiv}>{puzzleComponent}</div>

            <div className='copyright'>&#169; https://nbarsova.github.io/rechnenrucksack</div>
        </div>
    )
};

export default PrintContainer;
