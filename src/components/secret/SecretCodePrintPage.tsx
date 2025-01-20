import {Equation} from "../../types/Equation";
import '../app/App.css';
import {PrintPageProps} from "../../types/components";

interface SecretCodePrintPageProps extends PrintPageProps {
    equations: Array<Equation> | undefined,
    letterCodes: Array<any>,
}

const SecretCodePrintPage = (props: SecretCodePrintPageProps) => {

    const {
        equations, letterCodes, showAnswers, parentHeight
    } = props;

    const cellWidth = props.parentHeight / 8;
    const cellHeight = props.parentHeight / 5;
    const placeholderHeight = cellHeight / 3 * 2;
    const placeholderWidth = cellWidth / 4 * 3;
    const fontSize = cellWidth / 7;

    const getLetterForCode = (code: number) =>
        letterCodes.find(letterCode => letterCode.code == code).letter;
    const renderKey = (letterCode: any) => {
        return <div key={letterCode.letter} style={{marginLeft: '1vh', marginTop: '1vh'}}>
            {letterCode.code + ' = ' + letterCode.letter}
        </div>
    }

    const renderEquationsInRow = (rowIndex: number) => {
        const row = equations?.map((eq, columnIndex) => {
            const res = showAnswers ? eq.result : '';
            if (columnIndex >= rowIndex * 12 && columnIndex < rowIndex * 12 + 12) {
                return (<div key={columnIndex} style={{
                    border: '0',
                    height: cellHeight + 'px',
                    width: cellWidth + 'px',
                    fontSize: fontSize + 'px', marginRight: '10px'
                }}>
                    <div style={{
                        height: placeholderHeight + 'px',
                        width: placeholderWidth + 'px',
                        border: '1px solid gray'
                    }}>
                        {showAnswers ? <div
                            style={{fontSize: 0.8 * placeholderWidth + 'px'}}>{getLetterForCode(eq.result)}</div> : ''}
                    </div>
                    {eq.number1 + ' ' + eq.operation + ' ' + eq.number2 + " = " + res}
                </div>)
            } else return null;
        });
        return (<div className='flexRow'>{row}</div>);
    }

    function renderLetterCodes() {
        return <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: 1.5 * parentHeight + 'px',
            fontSize: fontSize + 'px',
            marginLeft: '3vh'
        }}>
            {letterCodes.map((code) => renderKey(code))}
        </div>;
    }

    return (<div className="printPreview">
        <div style={{
            display: "flex",
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: 3 * parentHeight / 2 + 'px',
            height: parentHeight + 'px',
            backgroundColor: 'lightsalmon'
        }}>
            {renderLetterCodes()}
            <div
                style={{height: 0.8 * parentHeight + 'px', margin: '20px'}}>
                {renderEquationsInRow(0)}
                {renderEquationsInRow(1)}
                {renderEquationsInRow(2)}
                {renderEquationsInRow(3)}
            </div>
        </div>
    </div>);
};

export default SecretCodePrintPage;
