
import {Equation} from "../../util/classes/Equation";
import Monster from "../../svg/Monster";

const MonsterPrintPage =(props:
                             {
                                 equations: Array<Equation> | undefined, monsterCell: number, showAnswers: boolean
                             }) => {
    const {monsterCell, equations, showAnswers} = props;
    const monsterCellSize= monsterCell/7;

    console.log('rendering for equations', equations);

    const renderEquation = (eq: Equation) => {
        return (<><div style={{
            height: monsterCellSize + 'px',
            width: monsterCellSize + 'px',
            border: '1px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>{eq.number1}</div>
        <div style={{
            height: monsterCellSize + 'px',
            width: monsterCellSize + 'px',
            border: '1px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>{eq.operation}</div>
        <div style={{
            height: monsterCellSize + 'px',
            width: monsterCellSize + 'px',
            border: '1px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>{eq.number2}</div>
        <div style={{
            height: monsterCellSize + 'px',
            width: monsterCellSize + 'px',
            border: '1px solid gray', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>=</div>
        <div style={{
            height: monsterCellSize + 'px',
            width: monsterCellSize + 'px',
            border: '1px solid gray'
        }}>{showAnswers ? eq.result: null}</div></>)
    };

    return equations ? (
        <div style={{display: 'flex', flexDirection: 'row', margin: '5px'}} id='mainCell'>
            <div style={{display: 'flex', flexDirection: 'column'}} id='leftEquation'>
                <div style={{
                    height: monsterCellSize + 'px',
                    width: monsterCellSize + 'px',
                    border: '1px solid gray',
                    backgroundColor: 'gray'
                }}></div>
                {renderEquation(equations[0])}
                <div style={{
                    height: monsterCellSize + 'px',
                    width: monsterCellSize + 'px',
                    border: '1px solid gray',
                    backgroundColor: 'gray'
                }}></div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}} id='middle'>
                <div style={{display: 'flex', flexDirection: 'row'}} id='middleEquationTop'>
                    {renderEquation(equations[1])}
                </div>
                <div style={{ height: 5*monsterCellSize+10+'px', width: 5*monsterCellSize+'px'}} id='monsterPic'>
                    <Monster width={5*monsterCellSize+10} height={5*monsterCellSize+10}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row'}} id='middleEquationBottom'>
                    {renderEquation(equations[2])}
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}} id='rightEquation'>
                <div style={{
                    height: monsterCellSize + 'px',
                    width: monsterCellSize + 'px',
                    border: '1px solid gray',
                    backgroundColor: 'gray'
                }}></div>
                {renderEquation(equations[3])}
                <div style={{
                    height: monsterCellSize + 'px',
                    width: monsterCellSize + 'px',
                    border: '1px solid gray',
                    backgroundColor: 'gray'
                }}></div>
            </div>
        </div>
    ) : null;
};

export default MonsterPrintPage;