
import {Equation} from "../../../types/Equation";
// @ts-ignore
import monster1 from '../../../img/monster/1.png'
// @ts-ignore
import monster2 from '../../../img/monster/2.png';
// @ts-ignore
import monster3 from '../../../img/monster/3.png';
// @ts-ignore
import monster4 from '../../../img/monster/4.png';
// @ts-ignore
import monster5 from '../../../img/monster/5.png';
// @ts-ignore
import monster6 from '../../../img/monster/6.png';
import '../LockMonster.css';
import '../../app/App.css';
import {normalRandom} from "../../../util/arithmetic";

const monsterPics= [monster1, monster2, monster3, monster4, monster5, monster6];

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
                                      equations: Array<Equation> | undefined, monsterCell: number, showAnswers: boolean, monsterNumber: number
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
                <div style={{height: 5 * monsterCellSize + 10 + 'px', width: 5 * monsterCellSize + 'px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                     id='monsterPic'>
                    <img
                        className="thumbnail"
                        src={monsterPics[normalRandom(0, 5)]}
                    height={4 * monsterCellSize} width={4 * monsterCellSize}/>
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