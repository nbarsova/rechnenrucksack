import React from 'react';
import {FormattedMessage} from "react-intl";
import {Equation} from "../../util/classes/Equation";

const SecretCodePrintPage = (props:
                                 {
                                     equations: Array<Equation>,
                                     letterCodes: Array<any>,
                                     canvasHeight: number,
                                     showLetters: boolean
                                 }) => {

    const renderEquation = (equation: Equation, index: number) => {
        const res = props.showLetters ? equation.result : '__'
        return <div key={index} className='codeLetter'>
            <div className='letterPlaceHolder'
            >
                {props.showLetters && getLetterForCode(equation.result)}
            </div>
            {equation.number1 + ' ' + equation.operation + ' ' + equation.number2 + " = "+res }
        </div>
    };

    const getLetterForCode = (code: number) =>
        props.letterCodes.find(letterCode=>letterCode.code==code).letter;

    const renderKey = (letterCode: any) => {
        return <div key={letterCode.letter} className='codeLetter'>
            {letterCode.code + ' = ' + letterCode.letter}
        </div>
    }

    return (
        <div className='printSecretCode'>
            <div className='secretCodeDescription'>
                <FormattedMessage id='equationsToSolve'/>
            </div>
            <div className='codeWrapper'>{props.equations.length > 0 && props.equations.map(renderEquation)}</div>
            {props.letterCodes.length > 0 && <div className='codeWrapper'>
                <div className='codeKey'><FormattedMessage id='codeKey'/></div>
                {props.letterCodes && props.letterCodes.map(renderKey)}
            </div>}
        </div>
    );
};

export default SecretCodePrintPage;
