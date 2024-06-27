import {FormattedMessage} from "react-intl";
import {Equation} from "../../types/Equation";
import '../app/App.css';

const SecretCodePrintPage = (props:
                                 {
                                     equations: Array<Equation> | undefined,
                                     letterCodes: Array<any>,
                                     canvasHeight: number,
                                     showLetters: boolean
                                 }) => {

    const getLetterForCode = (code: number) =>
        props.letterCodes.find(letterCode => letterCode.code == code).letter;

    const renderKey = (letterCode: any) => {
        return <div key={letterCode.letter} className='codeLetter'>
            {letterCode.code + ' = ' + letterCode.letter}
        </div>
    }

    const renderEquationsInRow = (rowIndex: number) => {

        const row = props.equations?.map((eq, columnIndex) => {
            console.log('eq', eq, getLetterForCode(eq.result));
            const res = eq.result;
            if (columnIndex >= rowIndex * 10 && columnIndex < rowIndex * 10 + 10) {
                return (<td key={columnIndex}>
                    <div className='codeLetter'>
                        <div className='letterPlaceHolder'
                        >
                            {props.showLetters ? getLetterForCode(eq.result) : ''}
                        </div>
                        {eq.number1 + ' ' + eq.operation + ' ' + eq.number2 + " = " + res}
                    </div>
                </td>);
            } else return null;
        });
        return (<tr>{row}</tr>);
    }

    console.log(props.equations.length);

    return (
        <div className='printPreview'>
            <div className='secrectCodePrint'>
                <div className='secretCodeDescription'>
                    <FormattedMessage id='equationsToSolve'/>
                </div>
                <table>
                    {renderEquationsInRow(0)}
                    {renderEquationsInRow(1)}
                    {renderEquationsInRow(2)}
                    {renderEquationsInRow(3)}
                    {renderEquationsInRow(4)}
                </table>
                {props.letterCodes && props.letterCodes.length > 0 &&
                    <div className='codeKey'>
                        <div className='secretCodeDescription'>
                            <FormattedMessage id='codeKey'/>
                        </div>
                        {props.letterCodes && props.letterCodes.map(renderKey)}
                    </div>}
            </div>
        </div>
    );
};

export default SecretCodePrintPage;
