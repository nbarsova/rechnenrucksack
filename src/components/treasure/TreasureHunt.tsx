import { useEffect, useRef, useState } from 'react';

import { NumberComplexity } from '../settings/NumberComplexity';
import { EquationsAmount } from '../settings/EquationsAmount';
import { OperationsSelector } from '../settings/OperationsSelector';
import { useElementHeight } from '../../util/useElementHeight';
import {
    createDirections,
    createPathToGoalTarget,
    initTargets,
} from './MapGenerator';
import { createEquationSet } from '../../util/arithmetic';
import PrintTreasurePage from './print/PrintTreasurePage';
import {
    CURRENT_TARGET_PARAMETER_NAME,
    DIRECTIONS_PARAMETER_NAME,
    EQUATIONS_PARAMETER_NAME,
    NUMBER_RANGE_PARAMETER_NAME,
    setInStorage,
    TARGETS_PARAMETER_NAME,
} from '../../util/localStorage';
import {
    findPuzzleByKey,
    puzzleAlternatePaths,
    puzzleKeys,
    puzzlePath,
} from '../../app/puzzles';
import Buttons from '../buttons/Buttons';
import { Equation, Operation } from '../../types';
import { Direction, MapCoordinate } from './types';
import { useIntl } from 'react-intl';
import PageMeta from '../../app/PageMeta';

const TreasureHunt = () => {
    const { locale, formatMessage } = useIntl();
    const puzzle = findPuzzleByKey(puzzleKeys.TREASURE_PUZZLE_KEY);
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = [
        Operation.ADD,
        Operation.SUB,
        Operation.MULT,
        Operation.DIV,
    ];

    const [numberRange, setNumberRange] = useState(numberRanges[0]);
    const [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    const [selectedOps, setSelectedOps] = useState([
        Operation.ADD,
        Operation.SUB,
    ]);

    const [equations, setEquations] = useState<Equation[]>([]);
    const [targets, setTargets] = useState<MapCoordinate[]>([]);
    const [goalTarget, setGoalTarget] = useState<MapCoordinate | null>(null);
    const [directions, setDirections] = useState<Direction[]>([]);

    const createNewEquationSet = () => {
        const fieldSize = numberRange === 10 ? 5 : 10;

        const targets = initTargets(fieldSize); // initialize four targets near the ends of the field

        const goalTarget = targets[Math.floor((Math.random() * 10) / 3)]; // choose a random one

        let options = { noPrimes: false };

        if (selectedOps.length === 1 && selectedOps[0] === Operation.MULT) {
            options = { noPrimes: true };
        }

        const steps = createPathToGoalTarget(
            numberRange,
            equationsAmount,
            fieldSize,
            goalTarget,
            options,
        ); // create step sequence

        const directions = createDirections(steps);

        const absSteps = steps.map((step) => Math.abs(step));

        const equations = createEquationSet(absSteps, selectedOps, numberRange);

        setTargets(targets);
        setGoalTarget(goalTarget);
        setDirections(directions);
        setEquations(equations);
    };

    useEffect(() => {
        createNewEquationSet();
    }, [numberRange, equationsAmount, selectedOps]);

    const prepareTeacherPage = () => {
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equations));
        setInStorage(CURRENT_TARGET_PARAMETER_NAME, JSON.stringify(goalTarget));
        setInStorage(DIRECTIONS_PARAMETER_NAME, JSON.stringify(directions));
    };

    const prepareStudentPage = () => {
        setInStorage(NUMBER_RANGE_PARAMETER_NAME, numberRange + '');
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equations));
        setInStorage(TARGETS_PARAMETER_NAME, JSON.stringify(targets));
        setInStorage(DIRECTIONS_PARAMETER_NAME, JSON.stringify(directions));
    };

    const previewRef = useRef<HTMLDivElement>(null);
    const parentHeight = useElementHeight(previewRef);

    return (
        <div className="xl:flex xl:h-[calc(var(--mainAreaHeight)-var(--subHeaderHeight))] xl:flex-row">
            <PageMeta
                title={formatMessage({ id: 'treasureMap' })}
                description={formatMessage({
                    id: 'treasureMapDescription',
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

                    <OperationsSelector
                        allOps={allOps}
                        onOpsChanged={(selectedOps: Array<Operation>) => {
                            setSelectedOps(selectedOps);
                        }}
                    />
                    <EquationsAmount
                        equationsAmounts={equationsAmounts}
                        onChange={(amount: number) =>
                            setEquationsAmount(amount)
                        }
                    />

                    <Buttons
                        prepareSolutionParameters={prepareTeacherPage}
                        preparePrintParameters={prepareStudentPage}
                        refresh={createNewEquationSet}
                        puzzleKey={puzzleKeys.TREASURE_PUZZLE_KEY}
                    />
                </div>
            </div>
            <div
                className="relative ml-[1vh] h-[calc(100vh-var(--headerHeight)-var(--subHeaderHeight)-var(--footerHeight)-var(--settingsHeight))] w-[90vw] max-w-[200vh] overflow-x-scroll overflow-y-hidden whitespace-nowrap xl:flex xl:h-[calc(100vh-var(--headerHeight)-var(--subHeaderHeight)-var(--footerHeight))] xl:w-[calc(100vw-var(--settingsWidth))] xl:flex-row xl:overflow-x-visible"
                ref={previewRef}
            >
                <PrintTreasurePage
                    equations={equations}
                    showAnswers={false}
                    stones={targets}
                    parentHeight={parentHeight}
                    numberRange={numberRange}
                    directions={directions}
                    printView={false}
                />
            </div>
        </div>
    );
};

export default TreasureHunt;
