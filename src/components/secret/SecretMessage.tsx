import React, {useEffect, useState} from 'react';
import {NumberComplexity} from "../complexity/NumberComplexity";
import {OperationsSelector} from "../complexity/OperationsSelector";
import {Operation} from "../../util/enums/Operation";
import {Link} from "react-router-dom";
import "./SecretMessage.css";
import {printIcon, refreshIcon, solutionIcon} from "../treasure/pictureSources";
import {FormattedMessage, useIntl} from "react-intl";
import {countMessageSymbols, isLetter} from "./CodeGenerator";
import {createEquationSet, normalRandom} from "../../util/arithmetic";
import PrintEquation from "../treasure/print/PrintEquation";
import {StepEquation} from "../../util/classes/StepEquation";
import {Equation} from "../../util/classes/Equation";

const SecretMessage = () => {
    const intl = useIntl();

    const numberRanges = [10, 25];
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    let [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);
    let [numberRange, setNumberRange] = useState(numberRanges[0]);

    let initialMessage = intl.formatMessage({id: 'initialSecretMessage'});
    let [secretMessage, setSecretMessage] = useState(initialMessage);
    let [error, setError] = useState(false);
    let [messageSymbols, setMessageSymbols] = useState([]);
    let [letterCodes, setLetterCodes] = useState([]);
    const [equations, setEquations] = useState([]);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const canvasDivWidth = viewportWidth - 300; // magic nums from css
    const canvasDivHeight = viewportHeight - 220;

    const canvasHeight = Math.min(canvasDivHeight, canvasDivWidth / 2);

    useEffect(() => {
        setMessageSymbols(countMessageSymbols(secretMessage));
    }, [secretMessage]);

    useEffect(()=> {
        setSecretMessage(initialMessage);

    }, [intl.locale])

    const updateSecretMessage = (ev: any) => {
        const newMessage = ev.target.value;

        if (newMessage.length > 50) {
            setError(true);
        } else {
            setError(false);
            setSecretMessage(newMessage);
            const symbols = countMessageSymbols(newMessage);
            setMessageSymbols(symbols);
            const codes = createCodes(symbols);
            assignEquationsToString(newMessage, symbols, codes);
        }
    };

    const createCodes = (symbols: Array<string>) => {

        let complexity = 10;

        if (symbols.length>10)
        {
            complexity=25;
        }

        if (symbols.length>25)
        {
            complexity=100;
        }

        const coes = [];
        let treshold = (symbols.length === complexity) ? symbols.length-1 : symbols.length;
        for (let i=0; i<treshold; i++)
        {
            let code;
            do {
                code = normalRandom(1, complexity);
            } while (!isUniqueCode(code, coes));

            coes.push({letter: symbols[i], code: code});
        }

        if (symbols.length === complexity)
        {
            coes.push({letter: symbols[symbols.length-1], code:0});
        }

        setLetterCodes(coes);
        return coes;
    };

    const findCodeForLetter = (letter: string, codes: Array<any>): number =>
    {
        return codes.find(code=> code.letter === letter).code;
    };


    const assignEquationsToString = (sMessage: string,
                                     ssymbols: Array<any>,
                                     codes: Array<any>) =>
    {
        let steps: Array<number>=[];

        for (let i=0; i<sMessage.length; i++)
        {
            let symbol = sMessage.charAt(i).toUpperCase();
            if (isLetter(symbol)) {
                const step=findCodeForLetter(symbol, codes);
                steps.push(step);
            }
        }

        let complexity = 10;

        if (ssymbols.length>10)
        {
            complexity=25;
        }

        if (ssymbols.length>25)
        {
            complexity=100;
        }

       const equations = createEquationSet(steps, selectedOps, complexity);
        setEquations(equations);
    };

    const isUniqueCode = (code: number, letterCodes: Array<any>) =>
    {
        for (var i=0; i<letterCodes.length; i++)
        {
            if (letterCodes[i].code === code)
            {
                return false;
            }
        }
        return true;
    };

    const renderEquation = (equation: Equation, index: number) => {
       return (<div key={index} className='codeLetter'>
           <div className='letterPlaceHolder'
                style={{height: canvasHeight/10, width: canvasHeight/10}}/>
           {equation.number1 + ' '+ equation.operation+ ' '+equation.number2+ " = __"}
       </div>)
    };

    const renderKey = (letterCode: any) => {
        return <div key={letterCode.letter} className='codeLetter'>
            {letterCode.code + ' = '+ letterCode.letter}
        </div>
    }

    return (<div className="main">
        <div className="settings">
            <div className='numberComplexity'><b><FormattedMessage id="enterMessage"/></b>
            </div>
            <textarea value={secretMessage}
                      className={error ? 'borderedSecretMessageInput' : 'secretMessageInput'}
                      rows={3}
                      onChange={updateSecretMessage}/>
            {error ? <div className='errorMessage'>
                    <FormattedMessage id='secretMessageTooLong'/>
                </div> :
                <div className='countMessage'>
                    <span className='equationText'><FormattedMessage id='messageLength'/></span>
                    {secretMessage.length}
                    <span className='equationText'><FormattedMessage id='symbolsInStringMessage'/> </span>
                    {messageSymbols.length}
                </div>}
            <NumberComplexity numberRanges={numberRanges}
                              onRangeChange={(range: number) => setNumberRange(range)}/>

            <OperationsSelector allOps={allOps}
                                onOpsChanged={(selectedOps: Array<Operation>) => {
                                    setSelectedOps(selectedOps)
                                }}/>
        </div>
        <div className='buttons'>
            <Link target='_blank' to={"/treasure/print"}
                  className='printButton'
                  title={intl.formatMessage({id: 'printStudent'})}
            ><img src={printIcon}/></Link>

            <Link target='_blank' to={"/treasure/print/solution"}
                  className='printButton'
                  title={intl.formatMessage({id: 'printTeacher'})}
            ><img src={solutionIcon}/></Link>
            <div className='printButton' title={intl.formatMessage({id: 'refresh'})}
            ><img src={refreshIcon}/></div>
        </div>
        <div className='printSecretCode'>
            <FormattedMessage id='equationsToSolve'/>
            <div className='codeWrapper'>{equations && equations.map(renderEquation)}</div>
            {letterCodes && (<div className='codeWrapper'>
                <b><FormattedMessage id='codeKey'/></b>
            {letterCodes && letterCodes.map(renderKey)}</div>)}
        </div>
    </div>)
}

export default SecretMessage;
