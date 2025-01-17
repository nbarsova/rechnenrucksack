import MonsterCellComponent from "./MonsterCellComponent";
import {Equation} from "../../../types/Equation";
import '../LockMonster.css';
import '../../app/App.css';

const MonsterPrintPage = (props: {
    monsterEquations: Array<Array<Equation>>;
    monstersAmount: number;
    showAnswers: boolean;
    parentHeight: number | undefined
}) => {
    const {
        monsterEquations, monstersAmount, showAnswers, parentHeight
    } = props;

    const monsterCellHeight = parentHeight / 2 - 10;

    const rowWidth = (monsterCellHeight + 10) * monstersAmount / 2;

    return (
        <div style={{
            display: "flex",
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: rowWidth + 'px',
        }}>
            {monsterEquations && monsterEquations.map((equationSet: Equation [], index: number) =>
                <MonsterCellComponent key={index} equations={equationSet} monsterCell={monsterCellHeight}
                                      showAnswers={showAnswers} monsterNumber={index}/>)}
        </div>
    );
};

export default MonsterPrintPage;
