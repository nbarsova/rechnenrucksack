import '../../app/App.css';
import {PrintPageProps} from "../../../types/components";
import {LetterCode} from "../../../types";
import {SECRET_CODE_MAX_LENGTH} from "../CodeGenerator";
import LetterCodes from "./LetterCodes";

interface SecretCodePrintPageProps extends PrintPageProps {
    letterCodes: Array<LetterCode>,
    messageString: string,
}

const MAX_LINES = 4;

const MAX_LINE_LENGTH = SECRET_CODE_MAX_LENGTH / MAX_LINES;

const SecretCodePrintPage = (props: SecretCodePrintPageProps) => {

    const {
        equations, letterCodes, showAnswers, parentHeight, messageString
    } = props;

    const letterCodeHeight = 0.2 * parentHeight;
    const messageAreaHeight = 0.8 * parentHeight;

    const lines = Math.ceil(messageString.length / MAX_LINE_LENGTH);
    const cellWidth = messageAreaHeight * 2 / MAX_LINE_LENGTH;
    const cellHeight = messageAreaHeight / 4;

    console.log('parentHeight', parentHeight);
    console.log('messageAreaHeight', messageAreaHeight);
    console.log('cellHeight', cellHeight);

    const placeholderHeight = cellHeight / 3 * 2;
    const placeholderWidth = cellWidth / 4 * 3;
    const fontSize = cellWidth / 7;


    const renderEquationsInRow = (rowIndex: number) => {
        const row = equations?.map((eq, columnIndex) => {
            const res = showAnswers ? eq.result : '';
            if (columnIndex >= rowIndex * 12 && columnIndex < rowIndex * 12 + 12) {
                return (<div key={columnIndex} style={{
                    // border: '0',
                    height: cellHeight + 'px',
                    width: cellWidth + 'px',
                    fontSize: fontSize + 'px',
                    border: '1px solid green'
                }}>
                    <div style={{
                        height: placeholderHeight + 'px',
                        width: placeholderWidth + 'px',
                        border: '1px solid gray'
                    }}>
                    </div>
                    {eq.number1 + ' ' + eq.operation + ' ' + eq.number2 + " = " + res}
                </div>)
            } else return null;
        });
        return (<div className='flexRow'>{row}</div>);
    }


    function printEquationRows() {
        const equationRows = [];

        for (let currentRow = 0; currentRow < lines; currentRow++) {
            equationRows.push(renderEquationsInRow(currentRow))
        }
        return <div>
            {equationRows}
        </div>;
    }

    return (<div style={{
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: parentHeight + 'px',
    }}>
        <LetterCodes letterCodeHeight={letterCodeHeight} letterCodes={letterCodes}/>
        <div style={{height: messageAreaHeight + 'px', width: messageAreaHeight * 2 + 'px', backgroundColor: 'blue'}}>
            {printEquationRows()}
        </div>
    </div>);
};

export default SecretCodePrintPage;