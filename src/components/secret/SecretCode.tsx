import { useEffect, useRef, useState } from 'react';
import { NumberComplexity } from '../settings/NumberComplexity';
import { OperationsSelector } from '../settings/OperationsSelector';
import { useElementHeight } from '../../util/useElementHeight';

import { FormattedMessage, useIntl } from 'react-intl';
import {
    splitSecrectMessageToSubstrings,
    countMessageSymbols,
    createSecretCodeForMessage,
    SECRET_CODE_MAX_LENGTH,
} from './CodeGenerator';

import SecretCodePrintPage from './print/SecretCodePrintPage';
import {
    EQUATIONS_PARAMETER_NAME,
    LETTER_CODES_PARAMETER_NAME,
    SECRET_MESSAGE_PARAMETER_NAME,
    setInStorage,
} from '../../util/localStorage';
import Buttons from '../buttons/Buttons';
import { Equation, LetterCode, Operation } from '../../types';

import {
    findPuzzleByKey,
    puzzleAlternatePaths,
    puzzleKeys,
    puzzlePath,
} from '../../app/puzzles';
import PageMeta from '../../app/PageMeta';

const SecretCode = () => {
    const { locale, formatMessage } = useIntl();
    const puzzle = findPuzzleByKey(puzzleKeys.SECRET_CODE_PUZZLE_KEY);

    const [numberRanges, setNumberRanges] = useState([10, 25, 100]);

    const allOps = [
        Operation.ADD,
        Operation.SUB,
        Operation.MULT,
        Operation.DIV,
    ];

    const [selectedOps, setSelectedOps] = useState([
        Operation.ADD,
        Operation.SUB,
    ]);

    const [numberRange, setNumberRange] = useState(100);

    const initialMessageStringArray = splitSecrectMessageToSubstrings(
        formatMessage({ id: 'initialSecretMessage' }),
    );

    const [secretMessage, setSecretMessage] = useState<Array<string>>(
        initialMessageStringArray,
    );

    const [error, setError] = useState<boolean>(false);

    const [letterCodes, setLetterCodes] = useState<LetterCode[]>([]);

    const [equations, setEquations] = useState<Array<Equation>>([]);

    useEffect(() => {
        const newMessage = splitSecrectMessageToSubstrings(
            formatMessage({ id: 'initialSecretMessage' }),
        );
        setSecretMessage(newMessage);
    }, [locale]);

    const recreateEquations = () => {
        const { codes, equations: updatedEquations } =
            createSecretCodeForMessage(
                secretMessage.join(' '),
                numberRange,
                selectedOps,
            );
        setLetterCodes(codes);
        setEquations(updatedEquations);
    };

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
    };

    const prepareParameters = () => {
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equations));
        setInStorage(LETTER_CODES_PARAMETER_NAME, JSON.stringify(letterCodes));
        setInStorage(
            SECRET_MESSAGE_PARAMETER_NAME,
            JSON.stringify(secretMessage),
        );
    };

    useEffect(() => {
        updateNumberRange(secretMessage.join(' '));
    }, [secretMessage]);

    useEffect(() => {
        recreateEquations();
    }, [secretMessage, numberRange, selectedOps]);

    const refresh = () => {
        const { codes, equations: updatedEquations } =
            createSecretCodeForMessage(
                secretMessage.join(' ').toLowerCase(),
                numberRange,
                selectedOps,
            );
        setLetterCodes(codes);
        setEquations(updatedEquations);
    };

    const previewRef = useRef<HTMLDivElement>(null);
    const parentHeight = useElementHeight(previewRef);

    return (
        <div className="xl:flex xl:h-[calc(var(--mainAreaHeight)-var(--subHeaderHeight))] xl:flex-row">
            <PageMeta
                title={formatMessage({ id: 'secretCode' })}
                description={formatMessage({
                    id: 'secretCodeDescription',
                })}
                locale={locale}
                path={puzzlePath(puzzle, locale)}
                alternatePaths={puzzleAlternatePaths(puzzle)}
            />
            <div className="h-(--settingsHeight) w-screen bg-white xl:flex xl:h-[calc(var(--mainAreaHeight)-var(--subHeaderHeight))] xl:w-(--settingsWidth) xl:flex-col">
                <div className="mt-[10px] flex flex-col text-(length:--subHeaderFontSize)">
                    <div className="mx-[1vh]">
                        <b>
                            <FormattedMessage
                                id="enterMessage"
                                values={{ limit: SECRET_CODE_MAX_LENGTH }}
                            />
                        </b>
                    </div>
                    <textarea
                        value={secretMessage.join(' ').toLowerCase()}
                        onChange={(value) => {
                            const newMessage = value.target.value;
                            const splitMessage =
                                splitSecrectMessageToSubstrings(newMessage);
                            setError(
                                newMessage.length > SECRET_CODE_MAX_LENGTH - 1,
                            );
                            setSecretMessage(splitMessage);
                        }}
                        className={
                            (error ? 'border-[red]' : 'border-[#888]') +
                            ' mx-[1vh] w-[90%] resize-none overflow-y-auto border font-sans text-[2.5vh] break-words hyphens-none uppercase outline-none'
                        }
                        rows={3}
                        maxLength={60}
                    />
                </div>
                <div className="flex flex-row text-(length:--subHeaderFontSize)">
                    <NumberComplexity
                        numberRanges={numberRanges}
                        selectedRange={numberRange}
                        onRangeChange={(range: number) => setNumberRange(range)}
                    />

                    <OperationsSelector
                        allOps={allOps}
                        onOpsChanged={(selectedOps: Array<Operation>) => {
                            setSelectedOps(selectedOps);
                        }}
                    />
                </div>

                <Buttons
                    prepareSolutionParameters={prepareParameters}
                    preparePrintParameters={prepareParameters}
                    refresh={refresh}
                    puzzleKey="secretCode"
                />
            </div>
            <div
                className="relative ml-[1vh] h-[calc(100vh-var(--headerHeight)-var(--subHeaderHeight)-var(--footerHeight)-var(--settingsHeight))] w-[90vw] max-w-[200vh] overflow-x-scroll overflow-y-hidden whitespace-nowrap xl:flex xl:h-[calc(100vh-var(--headerHeight)-var(--subHeaderHeight)-var(--footerHeight))] xl:w-[calc(100vw-var(--settingsWidth))] xl:flex-row xl:overflow-x-visible"
                ref={previewRef}
            >
                <SecretCodePrintPage
                    parentHeight={parentHeight}
                    equations={equations}
                    letterCodes={letterCodes}
                    message={secretMessage}
                    showAnswers={false}
                />
            </div>
        </div>
    );
};

export default SecretCode;
