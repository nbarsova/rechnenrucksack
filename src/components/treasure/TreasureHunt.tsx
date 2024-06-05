import {useEffect, useState} from 'react';
import {NumberComplexity} from "../complexity/NumberComplexity";
import {EquationsAmount} from "../complexity/EquationsAmount";
import {OperationsSelector} from "../complexity/OperationsSelector";
import "./TreasureHunt.css";
import {Operation} from "../../util/enums/Operation";
import {createPathToCurrentTarget, initTargets} from "./MapGenerator";
import {createEquationSet} from "../../util/arithmetic";
import {useIntl} from 'react-intl';
import {StepEquation} from "../../util/classes/StepEquation";
import {Link} from "react-router-dom";
import PrintTreasurePage from "./print/PrintTreasurePage";
import {
    CURRENT_TARGET_PARAMETER_NAME,
    EQUATIONS_PARAMETER_NAME,
    NUMBER_RANGE_PARAMETER_NAME,
    setInStorage,
    TARGETS_PARAMETER_NAME
} from "../../util/localStorage";
import PrintIcon from "../../svg/PrintIcon";
import SolutionIcon from "../../svg/SolutionIcon";
import RefreshIcon from "../../svg/RefreshIcon";
import {MapTargetObject} from "./classes/MapTargetObject";


const TreasureHunt = () => {
    const numberRanges = [10, 25];
    const equationsAmounts = [6, 8, 10];
    const allOps = [Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV];

    let [numberRange, setNumberRange] = useState(numberRanges[0]);
    let [equationsAmount, setEquationsAmount] = useState(equationsAmounts[0]);
    let [selectedOps, setSelectedOps] = useState([Operation.ADD, Operation.SUB]);
    const intl = useIntl();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const canvasDivWidth = viewportWidth - 300; // magic nums from css
    const canvasDivHeight = viewportHeight - 220;

    const canvasHeight = Math.min(canvasDivHeight, canvasDivWidth / 2);

    const [equationSteps, setEquationSteps] = useState<StepEquation[]>([]);
    const [targets, setTargets] = useState<MapTargetObject[]>([]);
    const [currentTarget, setCurrentTarget] = useState<MapTargetObject|null>(null);

    useEffect(() => {
        createNewEquationSet();
    }, [numberRange, equationsAmount, selectedOps]);

    const createNewEquationSet = () => {
        const fieldSize = (numberRange === 10) ? 5 : 10;

        const targets = initTargets(fieldSize);

        const cTarget = targets[Math.floor((Math.random() * 10) / 3)];

        let options = {};
        if ((selectedOps.length === 1) && (selectedOps[0] === Operation.MULT)) {
            options = {noPrimes: true}
        }

        const steps = createPathToCurrentTarget(numberRange,
            equationsAmount, fieldSize, cTarget, options);
        const absSteps = [];
        for (let i = 0; i < steps.length; i++) {
            absSteps.push(Math.abs(steps[i]));
        }
        const equations = createEquationSet(absSteps, selectedOps, numberRange);

        let equationSteps: Array<StepEquation> = [];

        for (let ii = 0; ii < steps.length; ii++) {
            equationSteps.push({
                equation: equations[ii],
                step: steps[ii]
            });
        }
        setTargets(targets);
        setCurrentTarget(cTarget);
        setEquationSteps(equationSteps);
    };

    const prepareTeacherPage = () => {
            setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equationSteps));
            setInStorage(CURRENT_TARGET_PARAMETER_NAME, JSON.stringify(currentTarget));
    };

    const prepareStudentPage = () => {
        setInStorage(NUMBER_RANGE_PARAMETER_NAME, numberRange + '');
        setInStorage(EQUATIONS_PARAMETER_NAME, JSON.stringify(equationSteps));
        setInStorage(TARGETS_PARAMETER_NAME, JSON.stringify(targets));
    };

    return (<div className="main">
        <div className="settings">
            <NumberComplexity numberRanges={numberRanges} selectedRange={numberRange}
                              onRangeChange={(range: number) => setNumberRange(range)}/>

            <EquationsAmount equationsAmounts={equationsAmounts}
                             onChange={(amount: number) => setEquationsAmount(amount)}/>
            <OperationsSelector allOps={allOps}
                                onOpsChanged={(selectedOps: Array<Operation>) => {
                                    setSelectedOps(selectedOps)
                                }}/>

            <div className='buttons'>
                <Link target='_blank' to={"/treasure/print"}
                      className='printButton'
                      title={intl.formatMessage({id: 'printStudent'})}
                      onClick={prepareStudentPage}><PrintIcon /></Link>
                <Link target='_blank' to={"/treasure/print/solution"}
                      className='printButton'
                      title={intl.formatMessage({id: 'printTeacher'})}
                      onClick={prepareTeacherPage}><SolutionIcon /></Link>
                <div className='printButton' title={intl.formatMessage({id: 'refresh'})}
                     onClick={createNewEquationSet}><RefreshIcon /></div>
            </div>
        </div>
        <PrintTreasurePage equationSteps={equationSteps}
                               stones={targets} canvasHeight={canvasHeight} numberRange={numberRange}/>


    </div>);
}

export default TreasureHunt;
