import { useEffect, useRef, useState } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';
import { NumberComplexity } from '../settings/NumberComplexity';
import { useElementHeight } from '../../util/useElementHeight';

import { createMonsterEquations } from './MonsterEquationsGenerator';
import {
    EQUATIONS_PARAMETER_NAME,
    MONSTERS_AMOUNT_PARAMETER_NAME,
    setInStorage,
} from '../../util/localStorage';
import MonsterPrintPage from './print/MonsterPrintPage';
import Buttons from '../buttons/Buttons';
import { Equation, Operation } from '../../types';
import {
    findPuzzleByKey,
    puzzleAlternatePaths,
    puzzleKeys,
    puzzlePath,
} from '../../app/puzzles.tsx';
import PageMeta from '../../app/PageMeta.tsx';

const addOps = [Operation.ADD, Operation.SUB];
const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

const numberRanges = [10, 25, 100];

const monstersAmounts = [6, 4, 2];

export function LockMonster() {
    const { locale, formatMessage } = useIntl();
    const puzzle = findPuzzleByKey(puzzleKeys.MONSTER_PUZZLE_KEY);
    const [selectedOps, setSelectedOps] = useState(addOps);
    const [numberRange, setNumberRange] = useState(numberRanges[0]);
    const [monstersAmount, setMonstersAmount] = useState<number>(
        monstersAmounts[0],
    );

    const [monsterEquations, setMonsterEquations] = useState<Array<Equation>>(
        createMonsterEquations(monstersAmount, selectedOps, numberRange),
    );

    useEffect(() => {
        const newEquations = createMonsterEquations(
            monstersAmount,
            selectedOps,
            numberRange,
        );
        setMonsterEquations(newEquations);
    }, [selectedOps, numberRange, monstersAmount]);

    const prepareParameters = () => {
        setInStorage(
            EQUATIONS_PARAMETER_NAME,
            JSON.stringify(monsterEquations),
        );
        setInStorage(
            MONSTERS_AMOUNT_PARAMETER_NAME,
            JSON.stringify(monstersAmount),
        );
    };

    const refresh = () => {
        const newEquations = createMonsterEquations(
            monstersAmount,
            selectedOps,
            numberRange,
        );
        setMonsterEquations(newEquations);
    };

    const previewRef = useRef<HTMLDivElement>(null);
    const parentHeight = useElementHeight(previewRef);

    return (
        <div className="xl:flex xl:h-[calc(var(--mainAreaHeight)-var(--subHeaderHeight))] xl:flex-row">
            <PageMeta
                title={formatMessage({ id: 'lockTheMonster' })}
                description={formatMessage({
                    id: 'lockMonsterDescription',
                })}
                locale={locale}
                path={puzzlePath(puzzle, locale)}
                alternatePaths={puzzleAlternatePaths(puzzle)}
            />
            <div className="h-(--settingsHeight) w-screen bg-white xl:flex xl:h-[calc(var(--mainAreaHeight)-var(--subHeaderHeight))] xl:w-(--settingsWidth) xl:flex-col">
                <div className="flex h-full flex-col flex-wrap text-(length:--subHeaderFontSize)">
                    <NumberComplexity
                        numberRanges={numberRanges}
                        selectedRange={numberRange}
                        onRangeChange={(range: number) => setNumberRange(range)}
                    />

                    <div className="flex flex-col p-[1vh]">
                        <b>
                            <FormattedMessage id="operations" />
                        </b>
                        <div className="flex cursor-pointer flex-row">
                            <input
                                type="radio"
                                checked={selectedOps === addOps}
                                onChange={() => {
                                    setSelectedOps(addOps);
                                }}
                            />
                            <FormattedMessage id="addAndSubscribe" />
                        </div>
                        <div className="flex cursor-pointer flex-row">
                            <input
                                type="radio"
                                checked={selectedOps === allOps}
                                onChange={() => {
                                    setSelectedOps(allOps);
                                }}
                            />
                            <FormattedMessage id="allOperations" />
                        </div>
                    </div>

                    <div className="flex flex-col p-[1vh]">
                        <b>
                            <FormattedMessage id="howManyMonsters" />
                        </b>
                        {monstersAmounts.map((amount: number) => (
                            <div
                                className="flex cursor-pointer flex-row"
                                key={amount}
                            >
                                <input
                                    type="radio"
                                    checked={monstersAmount === amount}
                                    onChange={() => {
                                        setMonstersAmount(amount);
                                    }}
                                />
                                {amount}
                            </div>
                        ))}
                    </div>
                    <Buttons
                        prepareSolutionParameters={prepareParameters}
                        preparePrintParameters={prepareParameters}
                        refresh={refresh}
                        puzzleKey={puzzleKeys.MONSTER_PUZZLE_KEY}
                    />
                </div>
            </div>
            <div
                className="relative ml-[1vh] h-[calc(100vh-var(--headerHeight)-var(--subHeaderHeight)-var(--footerHeight)-var(--settingsHeight))] w-[90vw] max-w-[200vh] overflow-x-scroll overflow-y-hidden whitespace-nowrap xl:flex xl:h-[calc(100vh-var(--headerHeight)-var(--subHeaderHeight)-var(--footerHeight))] xl:w-[calc(100vw-var(--settingsWidth))] xl:flex-row xl:overflow-x-visible"
                ref={previewRef}
            >
                <MonsterPrintPage
                    equations={monsterEquations}
                    monstersAmount={monstersAmount}
                    showAnswers={false}
                    parentHeight={parentHeight}
                />
            </div>
        </div>
    );
}
