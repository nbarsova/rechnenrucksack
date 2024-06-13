import MonsterCellComponent from "./MonsterCellComponent";
import {Equation} from "../../../util/classes/Equation";
import '../LockMonster.css';
import '../../app/App.css';

const MonsterPrintPage = (props: {
    monsterEquations: Array<Array<Equation>>;
    monstersAmount: number;
    showAnswers: boolean;
    parentWidth: number|undefined;
    parentHeight: number|undefined
}) => {
    const {
        monsterEquations, monstersAmount, showAnswers, parentWidth, parentHeight
    } = props;

    // const containerHeight = parentRef.current ? parentRef.current.clientHeight: 800;
    // const containerWidth = parentRef.current ? parentRef.current.clientWidth: 800;
    console.log('container', parentWidth, parentHeight);
    const monsterCellHeight = Math.min(parentHeight / 2 - 10, parentWidth / monstersAmount * 2)

    const rowWidth = (monsterCellHeight+20)*monstersAmount/2;
    console.log('widths', monsterCellHeight, rowWidth);
    return (
        <div style={{
            display: "flex", flexDirection: 'row', flexWrap: 'wrap', width: rowWidth+'px', border: '1px solid green'
        }}>
            {monsterEquations && monsterEquations.map((equationSet: Equation [], index: number) =>
                <MonsterCellComponent key={index} equations={equationSet} monsterCell={monsterCellHeight}
                                      showAnswers={showAnswers}/>)}
        </div>
    );
};

export default MonsterPrintPage;
