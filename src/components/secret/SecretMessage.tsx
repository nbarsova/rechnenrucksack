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
import {Equation} from "../../util/classes/Equation";
import SecretCodePrintPage from "./SecretCodePrintPage";
import {EQUATIONS_PARAMETER_NAME, LETTER_CODES_PARAMETER_NAME, setInStorage} from "../../util/localStorage";

const SecretMessage = () => {
    const intl = useIntl();

    const [numberRanges, setNumberRanges] = useState([10, 25, 100]);
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

        const symbols = countMessageSymbols(secretMessage);
        const nRanges=[];

        if (symbols.length <= 10) {
            nRanges.push(10);
        }
        if (symbols.length <= 25) {
            nRanges.push(25);
        }
        nRanges.push(100);

        setMessageSymbols(symbols);
        setNumberRanges(nRanges);
        setNumberRange(nRanges[0]);

    }, [secretMessage]);

    useEffect(() => {
        setSecretMessage(initialMessage);
    }, [intl.locale])

    const updateSecretMessage = (ev: any) => {
        const newMessage = ev.target.value;

        if (newMessage.length > 50) {
            setError(true);
        } else {
            setError(false);
            setSecretMessage(newMessage);
        }
    };

    const createCodes = (symbols: Array<string>) => {

            const coes = [];
        let treshold = (symbols.length === numberRange) ? symbols.length - 1 : symbols.length;
        for (let i = 0; i < treshold; i++) {
            let code;
            do {
                code = normalRandom(1, numberRange);
            } while (!isUniqueCode(code, coes));

            coes.push({letter: symbols[i], code: code});
        }

        if (symbols.length === numberRange) {
            coes.push({letter: symbols[symbols.length - 1], code: 0});
        }

        setLetterCodes(coes);
        return coes;
    };

    const findCodeForLetter = (letter: string, codes: Array<any>): number => {
        return codes.find(code => code.letter === letter).code;
    };


    const assignEquationsToString = (sMessage: string,
                                     ssymbols: Array<any>,
                                     codes: Array<any>) => {
        let steps: Array<number> = [];

        for (let i = 0; i < sMessage.length; i++) {
            let symbol = sMessage.charAt(i).toUpperCase();
            if (isLetter(symbol)) {
                const step = findCodeForLetter(symbol, codes);
                steps.push(step);
            }
        }

        const equations = createEquationSet(steps, selectedOps, numberRange);
        setEquations(equations);
    };

    const isUniqueCode = (code: number, letterCodes: Array<any>) => {
        for (var i = 0; i < letterCodes.length; i++) {
            if (letterCodes[i].code === code) {
                return false;
            }
        }
        return true;
    };

    const prepareParameters = () => {
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equations));
        setInStorage(LETTER_CODES_PARAMETER_NAME, JSON.stringify(letterCodes));
    };

    console.log(numberRanges, numberRange, messageSymbols.length);

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
            <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                              onRangeChange={(range: number) => setNumberRange(range)}/>

            <OperationsSelector allOps={allOps}
                                onOpsChanged={(selectedOps: Array<Operation>) => {
                                    setSelectedOps(selectedOps)
                                }}/>

            <div className='buttons'>
                <Link target='_blank' to={"/secret/print"}
                      className='printButton'
                      title={intl.formatMessage({id: 'printStudent'})}
                      onClick={prepareParameters}
                ><img src={printIcon}/></Link>

                <Link target='_blank' to={"/secret/print/solution"}
                      className='printButton'
                      onClick={prepareParameters}
                      title={intl.formatMessage({id: 'printTeacher'})}
                ><img src={solutionIcon}/></Link>
                <div className='printButton'
                     title={intl.formatMessage({id: 'refresh'})}
                     onClick={()=> {
                         const codes = createCodes(messageSymbols);
                         assignEquationsToString(secretMessage, messageSymbols, codes);
                     }}
                ><img src={refreshIcon}/></div>
            </div>
        </div>
        <SecretCodePrintPage
            canvasHeight={canvasHeight}
            equations={equations}
            letterCodes={letterCodes}
        showLetters={false}/>
    </div>)
}

export default SecretMessage;
