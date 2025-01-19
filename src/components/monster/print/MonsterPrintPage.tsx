import MonsterCellComponent from "./MonsterCellComponent";
import {Equation} from "../../../types/Equation";
import '../LockMonster.css';
import '../../app/App.css';

const MonsterPrintPage = (props: {
    monsterEquations: Array<Array<Equation>>;
    monstersAmount: number;
    showAnswers: boolean;
    parentHeight: number
}) => {
    const {
        monsterEquations, monstersAmount, showAnswers, parentHeight
    } = props;

    const monsterCellHeight = monstersAmount === 2 ? parentHeight - 20 : parentHeight / 2 - 10;

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            flexWrap: 'wrap',
            width: 3 * parentHeight / 2 + 'px',
            height: parentHeight + 'px',
        }}>
            {monsterEquations && monsterEquations.map((equationSet: Equation [], index: number) =>
                <MonsterCellComponent key={index} equations={equationSet} monsterCell={monsterCellHeight}
                                      showAnswers={showAnswers} monsterNumber={index}/>)}
        </div>
    );
};

export default MonsterPrintPage;
