import React, {useEffect, useState} from 'react';
import {NumberComplexity} from "../complexity/NumberComplexity";
import {OperationsSelector} from "../complexity/OperationsSelector";
import {Operation} from "../../util/enums/Operation";
import {Link} from "react-router-dom";
import "./SecretMessage.css";
import {printIcon, refreshIcon, solutionIcon} from "../treasure/pictureSources";
import {FormattedMessage, useIntl} from "react-intl";

const SecretMessage = () => {
    const intl = useIntl();

    const numberRanges = [10, 25];
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    let [numberRange, setNumberRange] = useState(numberRanges[0]);
    let [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);

    let initialMessage = intl.formatMessage({id: 'initialSecretMessage'});
    let [secretMessage, setSecretMessage] = useState(initialMessage);
    let [error, setError] = useState(false);
    let [messageSymbols, setMessageSymbols] = useState([]);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const canvasDivWidth = viewportWidth - 300; // magic nums from css
    const canvasDivHeight = viewportHeight - 220;

    const canvasHeight = Math.min(canvasDivHeight, canvasDivWidth / 2);

    useEffect(() => {
        countSymbols();
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
            countSymbols();
        }
    };

    const countSymbols = () => {
        let symbols = [];
        for (let i = 0; i < secretMessage.length; i++) {
            let symbol = secretMessage.charAt(i);

            if (isLetter(symbol) && symbols.indexOf(symbol.toUpperCase()) === -1)
                symbols.push(symbol.toUpperCase());
        }
        return setMessageSymbols(symbols);
    };

    const isLetter = (symbol: string) => {
        return (symbol.toUpperCase() != symbol.toLowerCase());
    };

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
    </div>)
}

export default SecretMessage;
