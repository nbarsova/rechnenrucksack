import {useEffect, useState} from 'react';

import {NumberComplexity} from "../settings/NumberComplexity";
import {EquationsAmount} from "../settings/EquationsAmount";
import {OperationsSelector} from "../settings/OperationsSelector";
import {createDirections, createPathToGoalTarget, initTargets} from "./MapGenerator";
import {createEquationSet} from "../../util/arithmetic";
import PrintTreasurePage from "./print/PrintTreasurePage";
import {
    CURRENT_TARGET_PARAMETER_NAME,
    DIRECTIONS_PARAMETER_NAME,
    EQUATIONS_PARAMETER_NAME,
    NUMBER_RANGE_PARAMETER_NAME,
    setInStorage,
    TARGETS_PARAMETER_NAME
} from "../../util/localStorage";
import {puzzleKeys} from "../app/puzzles";
import "./TreasureHunt.css";
import "../app/App.css";
import Buttons from "../buttons/Buttons";
import {Equation, Operation} from "../../types";
import {Direction, MapCoordinate} from "./types";

const TreasureHunt = () => {
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    const [numberRange, setNumberRange] = useState(numberRanges[0]);
    const [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    const [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);

    const [equations, setEquations] = useState<Equation[]>([]);
    const [targets, setTargets] = useState<MapCoordinate[]>([]);
    const [goalTarget, setGoalTarget] = useState<MapCoordinate | null>(null);
    const [directions, setDirections] = useState<Direction[]>([]);

    const createNewEquationSet = () => {
        const fieldSize = (numberRange === 10) ? 5 : 10;

        const targets = initTargets(fieldSize); // initialize four targets near the ends of the field

        console.log('targets', targets);

        const goalTarget = targets[Math.floor((Math.random() * 10) / 3)]; // choose a random one

        let options = {noPrimes: false};

        if ((selectedOps.length === 1) && (selectedOps[0] === Operation.MULT)) {
            options = {noPrimes: true}
        }

        const steps = createPathToGoalTarget(numberRange,
            equationsAmount, fieldSize, goalTarget, options); // create step sequence

        const directions = createDirections(steps);

        const absSteps = steps.map((step => Math.abs(step)));

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

    const viewportHeight = Math.min(window.screen.height, window.innerHeight);
    const viewportWidth = Math.min(window.innerWidth, window.innerWidth);

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
                <div className='treasureSettings'>
                    <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                                      onRangeChange={(range: number) => setNumberRange(range)}/>

                    <OperationsSelector allOps={allOps}
                                        onOpsChanged={(selectedOps: Array<Operation>) => {
                                            setSelectedOps(selectedOps)
                                        }}/>
                    <EquationsAmount equationsAmounts={equationsAmounts}
                                     onChange={(amount: number) => setEquationsAmount(amount)}/>

                    <Buttons prepareSolutionParameters={prepareTeacherPage} preparePrintParameters={prepareStudentPage}
                             refresh={createNewEquationSet} puzzleKey={puzzleKeys.TREASURE_PUZZLE_KEY}/>
                </div>
            </div>
            <div className='printPreview'>
                <PrintTreasurePage equations={equations}
                                   showAnswers={false}
                                   stones={targets}
                                   parentHeight={mainAreaHeight}
                                   numberRange={numberRange}
                                   directions={directions}
                                   printView={false}/>
            </div>
        </div>
    );
}

export default TreasureHunt;
