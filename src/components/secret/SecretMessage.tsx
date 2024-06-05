import {useEffect, useState} from 'react';
import {NumberComplexity} from "../complexity/NumberComplexity";
import {OperationsSelector} from "../complexity/OperationsSelector";
import {Operation} from "../../util/enums/Operation";
import {Link} from "react-router-dom";
import "./SecretMessage.css";
import PrintIcon from "../../svg/PrintIcon";
import SolutionIcon from "../../svg/SolutionIcon";
import RefreshIcon from "../../svg/RefreshIcon";

import {FormattedMessage, useIntl} from "react-intl";
import {countMessageSymbols, createSecretCodeForMessage} from "./CodeGenerator";

import SecretCodePrintPage from "./SecretCodePrintPage";
import {EQUATIONS_PARAMETER_NAME, LETTER_CODES_PARAMETER_NAME, setInStorage} from "../../util/localStorage";
import {Equation} from "../../util/classes/Equation";

const SecretMessage = () => {
    const intl = useIntl();

    const [numberRanges, setNumberRanges] = useState([10, 25, 100]);
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    let [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);
    let [numberRange, setNumberRange] = useState(numberRanges[0]);

    let [secretMessage, setSecretMessage] = useState(intl.formatMessage({id: 'initialSecretMessage'}));
    let [error, setError] = useState(false);

    const {
        symbols: messageSymbols,
        codes,
        equations: updatedEquations
    } = createSecretCodeForMessage(secretMessage, numberRange, selectedOps);

    const [letterCodes, setLetterCodes] = useState(codes);
    const [symbols, setSymbols] = useState(messageSymbols);
    const [equations, setEquations] = useState<Array<Equation> | undefined>(updatedEquations);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const canvasDivWidth = viewportWidth - 300; // magic nums from css
    const canvasDivHeight = viewportHeight - 220;

    const canvasHeight = Math.min(canvasDivHeight, canvasDivWidth / 2);

    useEffect(() => {
        setSecretMessage(intl.formatMessage({id: 'initialSecretMessage'}));
    }, [intl.locale])

    const updateSecretMessage = (ev: any) => {
        const newMessage = ev.target.value;
        setSecretMessage(newMessage);

        if (newMessage.length > 50) {
            setError(true);
        } else {
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

    return (<div className="main">
        <div className="settings">
            <div className='numberComplexity'><b><FormattedMessage id="enterMessage"/></b>
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

            <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                              onRangeChange={(range: number) => setNumberRange(range)}/>

            <OperationsSelector allOps={allOps}
                                onOpsChanged={(selectedOps: Array<Operation>) => {
                                    setSelectedOps(selectedOps)
                                }}/>

            <div className='buttons'>
                <div className='printButton'
                     title={intl.formatMessage({id: 'refresh'})}
                     onClick={() => {
                         const {
                             codes,
                             equations: updatedEquations
                         } = createSecretCodeForMessage(secretMessage, numberRange, selectedOps);
                         setLetterCodes(codes);
                         setEquations(updatedEquations);
                     }}
                ><RefreshIcon/></div>

                <Link target='_blank' to={"/secret/print"}
                      className='printButton'
                      title={intl.formatMessage({id: 'printStudent'})}
                      onClick={prepareParameters}
                ><PrintIcon/></Link>

                <Link target='_blank' to={"/secret/print/solution"}
                      className='printButton'
                      onClick={prepareParameters}
                      title={intl.formatMessage({id: 'printTeacher'})}
                ><SolutionIcon/></Link>
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
