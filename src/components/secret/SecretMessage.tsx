import {useEffect, useState} from 'react';
import {NumberComplexity} from "../settings/NumberComplexity";
import {OperationsSelector} from "../settings/OperationsSelector";
import {Operation} from "../../types/enums/Operation";
import "./SecretMessage.css";

import {FormattedMessage, useIntl} from "react-intl";
import {countMessageSymbols, createSecretCodeForMessage} from "./CodeGenerator";

import SecretCodePrintPage from "./SecretCodePrintPage";
import {EQUATIONS_PARAMETER_NAME, LETTER_CODES_PARAMETER_NAME, setInStorage} from "../../util/localStorage";
import {Equation} from "../../types/Equation";
import Buttons from "../buttons/Buttons";

const SecretMessage = () => {
    const intl = useIntl();

    const [numberRanges, setNumberRanges] = useState([10, 25, 100]);
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    const [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);
    const [numberRange, setNumberRange] = useState(numberRanges[0]);

    const [secretMessage, setSecretMessage] = useState(intl.formatMessage({id: 'initialSecretMessage'}));
    const [error, setError] = useState(false);

    const [letterCodes, setLetterCodes] = useState<{ letter: string; code: number; }[]>([]);

    const [symbols, setSymbols] = useState<string[]>([]);
    const [equations, setEquations] = useState<Array<Equation> | undefined>([]);


    const recreateMessage = () => {
        const {
            symbols: messageSymbolss,
            codes: codess,
            equations: updatedEquationss
        } = createSecretCodeForMessage(secretMessage, numberRange, selectedOps);
        setSymbols(messageSymbolss);
        setLetterCodes(codess);
        setEquations(updatedEquationss);
    }

    useEffect(() => {
        recreateMessage();
    }, [secretMessage, numberRange, selectedOps]);

    useEffect(() => {
        const newMessage = intl.formatMessage({id: 'initialSecretMessage'});
        setSecretMessage(newMessage);
    }, [intl.locale])

    const updateSecretMessage = (ev: any) => {
        const newMessage = ev.target.value;

        if (newMessage.length > 48) {
            setError(true);
            setSecretMessage(newMessage.substring(0, 50));
        } else {
            setSecretMessage(newMessage);
            setError(false);
            setLetterCodes([]);
            setEquations([]);

            const newSymbols = countMessageSymbols(newMessage);
            const nRanges = [];

            if (newSymbols.length <= 10) {
                nRanges.push(10);
            }
            if (newSymbols.length <= 25) {
                nRanges.push(25);
            }
            nRanges.push(100);

            setSymbols(newSymbols);
            setNumberRanges(nRanges);
            setNumberRange(nRanges[0]);
        }
    };

    const prepareParameters = () => {
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equations));
        setInStorage(LETTER_CODES_PARAMETER_NAME, JSON.stringify(letterCodes));
    };

    const refresh = () => {
        const {
            codes,
            equations: updatedEquations
        } = createSecretCodeForMessage(secretMessage, numberRange, selectedOps);
        setLetterCodes(codes);
        setEquations(updatedEquations);
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let mainAreaHeight;

    // now we are actually imitating css media queries to get correct canvas height, please keep this in sync

    if (viewportWidth < 1200) {
        console.log('small screen');
        mainAreaHeight = (viewportHeight - 0.08 * viewportHeight - 0.04 * viewportHeight - 0.06 * viewportHeight - 0.3 * viewportHeight);
    } else {
        console.log('big screen');
        // same as printPreview height in css plus a padding, if you're changing this here, change CSS too!!!
        mainAreaHeight = viewportHeight - 0.08 * viewportHeight - 0.04 * viewportHeight - 0.06 * viewportHeight - 0.02 * viewportHeight;
    }

    return (<div className="main">
        <div className="settings">
            <div className="choiceContainer">
                <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                                  onRangeChange={(range: number) => setNumberRange(range)}/>

                <OperationsSelector allOps={allOps}
                                    onOpsChanged={(selectedOps: Array<Operation>) => {
                                        setSelectedOps(selectedOps)
                                    }}/>
            </div>
            <div className="messageInputContainer">
                <div className='secretCodeDescriptionText'>
                    <b><FormattedMessage id="enterMessage"/></b>
                </div>
                <textarea value={secretMessage}
                          className={error ? 'borderedSecretMessageInput' : 'secretMessageInput'}
                          rows={3}
                          onChange={updateSecretMessage}
                />
                {error ? <div className='errorMessage'>
                        <FormattedMessage id='secretMessageTooLong'/>
                    </div> :
                    <div className='countMessage'>
                        <span className='equationText'><FormattedMessage id='messageLength'/></span>
                        {secretMessage.length}
                        <span className='equationText'><FormattedMessage id='symbolsInStringMessage'/> </span>
                        {symbols.length}
                    </div>}
            </div>

            <Buttons prepareSolutionParameters={prepareParameters} preparePrintParameters={prepareParameters}
                     refresh={refresh} puzzleKey='secretCode'/>
        </div>
        <SecretCodePrintPage
            canvasHeight={mainAreaHeight}
            equations={equations}
            letterCodes={letterCodes}
            showLetters={false}/>
    </div>)
}

export default SecretMessage;
/*
 <div className='buttons'>
                <Link target='_blank' to={ROOT_PATH+'/print?puzzle=secretCode'}
                      className='printButton'
                      title={intl.formatMessage({id: 'printStudent'})}
                      onClick={prepareParameters}><PrintIcon/></Link>
                <Link target='_blank'
                      to={ROOT_PATH}
                      className='printButton'
                      title={intl.formatMessage({id: 'printTeacher'})}
                      onClick={prepareParameters}><SolutionIcon/></Link>
                <div className='printButton' title={intl.formatMessage({id: 'refresh'})}
                     onClick={() => }><RefreshIcon/></div>
            </div>
 */