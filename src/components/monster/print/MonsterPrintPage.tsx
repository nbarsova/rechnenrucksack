import MonsterCellComponent from "./MonsterCellComponent";
import '../LockMonster.css';
import '../../app/App.css';
import {PrintPageProps} from "../../../types/components";
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
import {createMonsterEquationsArray} from "../MonsterEquationsGenerator";
import {Equation} from "../../../types";


interface MonsterPrintPageProps extends PrintPageProps {
    monstersAmount: number;
}

const MonsterPrintPage = (props: MonsterPrintPageProps) => {
    const {
        equations, monstersAmount, showAnswers, parentHeight
    } = props;

    const monsterCellHeight = monstersAmount === 2 ? parentHeight - 20 : parentHeight / 2 - 10;
    const monsterGridStyle = monstersAmount <= 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
    const monsterPics = [monster1, monster2, monster3, monster4, monster5, monster6];
    const monsterEquations = createMonsterEquationsArray(equations, monstersAmount);

    return (
        <div style={{
            display: 'grid',
            gap: '0',
            margin: '0 auto',
            height: parentHeight + 'px',
            gridTemplateColumns: monsterGridStyle,
        }}>
            {monsterEquations && monsterEquations.map((equationSet: Equation [], index: number) => {
                const monsterIndex = normalRandom(0, monsterPics.length - 1);
                const monsterPic = monsterPics[monsterIndex];
                monsterPics.splice(monsterIndex, 1);
                return (<MonsterCellComponent key={index} equations={equationSet} monsterCell={monsterCellHeight}
                                              showAnswers={showAnswers} monsterPic={monsterPic}/>)
            })}
        </div>
    );
};

export default MonsterPrintPage;
