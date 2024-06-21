
import {Equation} from "../../../types/Equation";
import Monster from "../../../svg/Monster";
import '../LockMonster.css';
import '../../app/App.css';

const EquationCell = (props: { monsterCellSize: any; value: number | string }) => {
    const {monsterCellSize, value} = props;
    return <div style={{
        height: monsterCellSize + 'px',
        width: monsterCellSize + 'px',
        border: '1px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>{value}</div>
}

const CornerCell = (props: { monsterCellSize: any; })=> {
    const {monsterCellSize} = props;
    return <div style={{
        height: monsterCellSize + 'px',
        width: monsterCellSize + 'px',
        border: '1px solid gray',
        backgroundColor: 'gray'
    }}></div>
}

const MonsterCellComponent = (props:
                                  {
                                      equations: Array<Equation> | undefined, monsterCell: number, showAnswers: boolean
                                  }) => {
    const {monsterCell, equations, showAnswers} = props;
    const monsterCellSize= monsterCell/7-2;
    const renderEquation = (eq: Equation) => {
        return (<>
            <EquationCell monsterCellSize={monsterCellSize} value={eq.number1} />
            <EquationCell monsterCellSize={monsterCellSize} value={eq.operation}/>
            <EquationCell monsterCellSize={monsterCellSize} value={eq.number2}/>
            <EquationCell monsterCellSize={monsterCellSize} value='='/>
            <EquationCell monsterCellSize={monsterCellSize} value={showAnswers ? eq.result : ''}/></>)
    };

    return equations ? (
        <div className='monsterCell' id='mainCell'>
            <div className='flexColumn' id='leftEquation'>
                <CornerCell monsterCellSize={monsterCellSize}/>
                {renderEquation(equations[0])}
                <CornerCell monsterCellSize={monsterCellSize}/>
            </div>
            <div className='flexColumn' id='middle'>
                <div className='flexRow' id='middleEquationTop'>
                    {renderEquation(equations[1])}
                </div>
                <div style={{ height: 5*monsterCellSize+10+'px', width: 5*monsterCellSize+'px'}} id='monsterPic'>
                    <Monster width={5*monsterCellSize+10} height={5*monsterCellSize+10}/>
                </div>
                <div className='flexRow' id='middleEquationBottom'>
                    {renderEquation(equations[2])}
                </div>
            </div>
            <div className='flexColumn' id='rightEquation'>
                <CornerCell monsterCellSize={monsterCellSize}/>
                {renderEquation(equations[3])}
                <CornerCell monsterCellSize={monsterCellSize}/>
            </div>
        </div>
    ) : null;
};

export default MonsterCellComponent;