import {useEffect, useRef} from 'react';
import PrintTreasurePage from "../treasure/print/PrintTreasurePage";
import {
    CURRENT_TARGET_PARAMETER_NAME,
    EQUATIONS_PARAMETER_NAME,
    getFromStorage, LETTER_CODES_PARAMETER_NAME,
    NUMBER_RANGE_PARAMETER_NAME, removeFromStorage,
    TARGETS_PARAMETER_NAME
} from "../../util/localStorage";
import {puzzles} from "./puzzles";
import {FormattedMessage} from "react-intl";
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import SecretCodePrintPage from "../secret/SecretCodePrintPage";
import PrintTreasureSolutionPage from "../treasure/print/PrintTreasureSolutionPage";

const PrintContainer = (props: { puzzle: string, solution?: boolean }) => {
    let currentPuzzleComponent;
    let puzzleTitle;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const canvasDivWidth = viewportWidth - 300; // magic nums from css
    const canvasDivHeight = viewportHeight - 200;
    let canvasHeight = Math.min(canvasDivHeight, canvasDivWidth / 2);
    const printElementDiv = useRef();

    useEffect(() => {
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

            removeFromStorage(EQUATIONS_PARAMETER_NAME);
            removeFromStorage(CURRENT_TARGET_PARAMETER_NAME);
            removeFromStorage(NUMBER_RANGE_PARAMETER_NAME);
            removeFromStorage(TARGETS_PARAMETER_NAME);
            removeFromStorage(LETTER_CODES_PARAMETER_NAME);
        };

        createPDF();

    }, []);

    switch (props.puzzle) {
        case(puzzles.treasure.key):
            currentPuzzleComponent = currentPuzzleComponent = props.solution ?
                <PrintTreasureSolutionPage
                    equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                    currentTarget={JSON.parse(getFromStorage(CURRENT_TARGET_PARAMETER_NAME))}/> :
                <PrintTreasurePage
                    numberRange={Number(getFromStorage(NUMBER_RANGE_PARAMETER_NAME))}
                    canvasHeight={canvasHeight} canvasDimension='px'
                    equationSteps={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                    stones={JSON.parse(getFromStorage(TARGETS_PARAMETER_NAME))}/>;
            puzzleTitle = puzzles.secret.printTitle;
            break;
        case (puzzles.secret.key):
            currentPuzzleComponent = <SecretCodePrintPage
                equations={JSON.parse(getFromStorage(EQUATIONS_PARAMETER_NAME))}
                letterCodes={JSON.parse(getFromStorage(LETTER_CODES_PARAMETER_NAME))}
                canvasHeight={canvasHeight}
                showLetters={props.solution}/>;
            puzzleTitle = puzzles.secret.printTitle;
            break;
        default:
            currentPuzzleComponent = <div/>;
    }

    return (<div className='printPreviewContainer' ref={printElementDiv}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '90%'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>

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
                    {currentPuzzleComponent}

            </div>
            <div className='copyright'>&#169; https://nbarsova.github.io/rechnenrucksack</div>
        </div>
    )
};

export default PrintContainer;
