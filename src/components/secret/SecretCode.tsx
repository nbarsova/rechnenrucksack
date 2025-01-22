import {useEffect, useState} from 'react';
import {NumberComplexity} from "../settings/NumberComplexity";
import {OperationsSelector} from "../settings/OperationsSelector";
import "./SecretMessage.css";

import {FormattedMessage, useIntl} from "react-intl";
import {
    checkSecretMessage,
    countMessageSymbols,
    createSecretCodeForMessage,
    SECRET_CODE_MAX_LENGTH
} from "./CodeGenerator";

import SecretCodePrintPage from "./print/SecretCodePrintPage";
import {
    EQUATIONS_PARAMETER_NAME,
    LETTER_CODES_PARAMETER_NAME,
    SECRET_MESSAGE_PARAMETER_NAME,
    setInStorage
} from "../../util/localStorage";
import Buttons from "../buttons/Buttons";
import {Equation, LetterCode, Operation} from "../../types";
import SecretMessageInputArea from "./SecretMessageInputArea";

const SecretCode = () => {
    const intl = useIntl();

    const [numberRanges, setNumberRanges] = useState([10, 25, 100]);
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    const [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);
    const [numberRange, setNumberRange] = useState(100);
    const initialMessageString = checkSecretMessage(intl.formatMessage({id: 'initialSecretMessage'}));

    const [secretMessage, setSecretMessage] = useState<Array<string>>(initialMessageString);

    const [letterCodes, setLetterCodes] = useState<LetterCode[]>([]);

    const [equations, setEquations] = useState<Array<Equation>>([]);

    const recreateMessage = () => {
        console.log("recreateMessage");
        const {
            codes,
            equations: updatedEquations
        } = createSecretCodeForMessage(secretMessage.join(' '), numberRange, selectedOps);
        setLetterCodes(codes);
        setEquations(updatedEquations);
    }

    const updateNumberRange = (newMessage: string) => {
        const newSymbols = countMessageSymbols(newMessage);
        const nRanges = [];

        if (newSymbols.length <= 10) {
            nRanges.push(10);
        }
        if (newSymbols.length <= 25) {
            nRanges.push(25);
        }
        nRanges.push(100);
        setNumberRanges(nRanges);
    }

    useEffect(() => {
        updateNumberRange(secretMessage.join(' '))
    }, [secretMessage]);

    useEffect(() => {
        console.log('recreateMessage effect');
        recreateMessage();
    }, [secretMessage, numberRange, selectedOps]);

    useEffect(() => {
        const newMessage = checkSecretMessage(intl.formatMessage({id: 'initialSecretMessage'}));
        console.log('newMessage', newMessage);
        setSecretMessage(newMessage);
    }, [intl.locale])

    const updateSecretMessage = (newMessage: string []) => {

        setSecretMessage(newMessage);
        setLetterCodes([]);
        setEquations([]);

        const newSymbols = countMessageSymbols(newMessage.join(' '));
        const nRanges = [];

        if (newSymbols.length <= 10) {
            nRanges.push(10);
        }
        if (newSymbols.length <= 25) {
            nRanges.push(25);
        }
        nRanges.push(100);

        setNumberRanges(nRanges);
        setNumberRange(nRanges[0]);
    };

    const prepareParameters = () => {
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equations));
        setInStorage(LETTER_CODES_PARAMETER_NAME, JSON.stringify(letterCodes));
        setInStorage(SECRET_MESSAGE_PARAMETER_NAME, JSON.stringify(secretMessage));
    };

    const refresh = () => {
        const {
            codes,
            equations: updatedEquations
        } = createSecretCodeForMessage(secretMessage.join(' '), numberRange, selectedOps);
        setLetterCodes(codes);
        setEquations(updatedEquations);
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let mainAreaHeight;

    // now we are actually imitating css media queries to get correct canvas height, please keep this in sync
    if (viewportWidth < 1200) {
        //                                   headerHeight             subHeaderHeight        footerHeight           settingsHeight
        mainAreaHeight = (viewportHeight - 0.08 * viewportHeight - 0.06 * viewportHeight - 0.06 * viewportHeight - 0.3 * viewportHeight);
    } else {
        // same as printPreview height in css plus a padding, if you're changing this here, change CSS too!!!
        mainAreaHeight = viewportHeight - 0.08 * viewportHeight - 0.04 * viewportHeight - 0.06 * viewportHeight - 0.02 * viewportHeight;
    }

    return (<div className="main">
            <div className="settings">
                <div className="messageInputContainer">
                    <div className='secretCodeDescriptionText'>
                        <b><FormattedMessage id="enterMessage" values={{limit: SECRET_CODE_MAX_LENGTH}}/></b>
                    </div>
                    <SecretMessageInputArea setValue={updateSecretMessage}/>
                </div>
                <div className="choiceContainer">
                    <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                                      onRangeChange={(range: number) => setNumberRange(range)}/>

                    <OperationsSelector allOps={allOps}
                                        onOpsChanged={(selectedOps: Array<Operation>) => {
                                            setSelectedOps(selectedOps)
                                        }}/>
                </div>

                <Buttons prepareSolutionParameters={prepareParameters} preparePrintParameters={prepareParameters}
                         refresh={refresh} puzzleKey='secretCode'/>
            </div>
            <div className='printPreview'>
                <SecretCodePrintPage
                    parentHeight={mainAreaHeight}
                    equations={equations}
                    letterCodes={letterCodes}
                    message={secretMessage}
                    showAnswers={false}/>
            </div>
        </div>
    )
}

export default SecretCode;
