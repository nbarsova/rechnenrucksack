import {Equation} from "../../types/Equation";
import '../app/App.css';

const SecretCodePrintPage = (props:
                                 {
                                     equations: Array<Equation> | undefined,
                                     letterCodes: Array<any>,
                                     canvasHeight: number,
                                     showLetters: boolean,
                                     mode?: 'print' | 'web'
                                 }) => {

    const cellWidth = props.canvasHeight / 8;
    const cellHeight = props.canvasHeight / 5;
    const placeholderHeight = cellHeight / 3 * 2;
    const placeholderWidth = cellWidth / 4 * 3;
    const fontSize=cellWidth/7;

    const getLetterForCode = (code: number) =>
        props.letterCodes.find(letterCode => letterCode.code == code).letter;
    const renderKey = (letterCode: any) => {
        return <div key={letterCode.letter} style={{marginLeft: '1vh', marginTop: '1vh'}}>
            {letterCode.code + ' = ' + letterCode.letter}
        </div>
    }

    const renderEquationsInRow = (rowIndex: number) => {
        const row = props.equations?.map((eq, columnIndex) => {
            const res = props.showLetters ? eq.result: '';
            if (columnIndex >= rowIndex * 12 && columnIndex < rowIndex * 12 + 12) {
                return (<div key={columnIndex} style={{
                    border: '0',
                    height: cellHeight + 'px',
                    width: cellWidth + 'px',
                    fontSize: fontSize+ 'px'
                }}>
                    <div style={{
                        height: placeholderHeight + 'px',
                        width: placeholderWidth + 'px',
                        border: '1px solid gray'
                    }}>
                        {props.showLetters ? <div style={{fontSize: 0.8*placeholderWidth+'px'}}>{getLetterForCode(eq.result)}</div>  : ''}
                    </div>
                    {eq.number1 + ' ' + eq.operation + ' ' + eq.number2 + " = " + res}
                </div>)
            } else return null;
        });
        return (<div className='flexRow'>{row}</div>);
    }
    console.log('canvasHeight', props.canvasHeight);

    return (<div className={props.mode === 'print' ? 'printPreviewPrint' : "printPreview"}>
            <div className='flexColumn'>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 1.5*props.canvasHeight + 'px', fontSize: fontSize+'px', marginLeft: '3vh'}}>
                    {props.letterCodes.map((code)=>renderKey(code))}
                </div>
                <div style={{height: 0.8*props.canvasHeight + 'px', width: 2 * props.canvasHeight + 'px', margin: '3vh'}}>
                    {renderEquationsInRow(0)}
                    {renderEquationsInRow(1)}
                    {renderEquationsInRow(2)}
                    {renderEquationsInRow(3)}
            </div>
        </div>
    </div>);
};

export default SecretCodePrintPage;
