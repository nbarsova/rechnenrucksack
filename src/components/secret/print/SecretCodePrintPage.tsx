import '../../app/App.css';
import {PrintPageProps} from "../../../types/components";
import {LetterCode} from "../../../types";
import {isLetter, SECRET_CODE_MAX_LENGTH} from "../CodeGenerator";
import LetterCodes from "./LetterCodes";

interface SecretCodePrintPageProps extends PrintPageProps {
    letterCodes: Array<LetterCode>,
    message: string [],
}

const MAX_LINES = 4;

const MAX_LINE_LENGTH = SECRET_CODE_MAX_LENGTH / MAX_LINES;

const SecretCodePrintPage = (props: SecretCodePrintPageProps) => {

    const {
        equations, letterCodes, showAnswers, parentHeight, message
    } = props;

    console.log('props:', props);

    const letterCodeHeight = 0.2 * parentHeight;
    const messageAreaHeight = 0.8 * parentHeight;

    const cellWidth = messageAreaHeight * 2 / MAX_LINE_LENGTH;
    const cellHeight = messageAreaHeight / 4;

    const placeholderHeight = cellHeight / 3 * 2;
    const placeholderWidth = cellWidth / 4 * 3;
    const fontSize = cellWidth / 7;

    function printEquationRows() {
        const equationRows = [];
        let equationIndex = 0;

        for (let i = 0; i < message.length; i++) {
            const currentLine = message[i];
            const currentRow = [];

            const currentLineArray = currentLine.split('');

            for (let j = 0; j < currentLineArray.length; j++) {
                const currentSymbol = currentLineArray[j];

                if (isLetter(currentSymbol)) {
                    const currentEquation = equations[equationIndex];
                    currentRow.push(
                        <div key={currentSymbol + j} style={{
                            height: cellHeight + 'px',
                            width: cellWidth + 'px',
                            fontSize: fontSize + 'px'
                        }}>
                            <div style={{
                                height: placeholderHeight + 'px',
                                width: placeholderWidth + 'px',
                                border: '1px solid gray',
                                fontSize: '2vh'
                            }}>{showAnswers ? currentSymbol : ''} </div>
                            {currentEquation.number1 + ' ' + currentEquation.operation + ' ' + currentEquation.number2 + " = " + (showAnswers ? currentEquation.result : '')}
                        </div>);
                    equationIndex++;
                } else {
                    currentRow.push(<div key={currentSymbol + j} style={{
                        height: placeholderHeight + 'px',
                        width: placeholderWidth + 'px',
                    }}><p key={currentSymbol + j}>{currentSymbol}</p></div>)
                }

            }
            const rowElement = <div className={'flexRow'}>{currentRow.map(elem => elem)}</div>
            equationRows.push(rowElement);
        }


        return <div className='flexColumn'>
            {equationRows}
        </div>;


    }

    return (
        <div style={{
            display: "flex",
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: parentHeight + 'px',
        }}>
            <LetterCodes letterCodeHeight={letterCodeHeight} letterCodes={letterCodes}
                         letterCodeWidth={2 * parentHeight}/>
            <div style={{height: messageAreaHeight + 'px', width: parentHeight * 2 + 'px'}}>
                {equations.length > 0 && printEquationRows()}
            </div>
        </div>
    );
};

export default SecretCodePrintPage;