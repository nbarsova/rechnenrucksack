import {Puzzle} from "../app/Puzzle";
import {puzzleKeys} from "../app/puzzles";
import {NumberComplexity} from "../complexity/NumberComplexity";
import {EquationsAmount} from "../complexity/EquationsAmount";
import {OperationsSelector} from "../complexity/OperationsSelector";
import {Operation} from "../../util/enums/Operation";

const Settings = (props: {
    currentPuzzle?: Puzzle
}): JSX.Element => {

    switch (props.currentPuzzle?.key) {
        case (puzzleKeys.TREASURE_PUZZLE_KEY):
            return <div className='settingsMainContainer'>
                <NumberComplexity numberRanges={[10, 25]} selectedRange={10} onRangeChange={()=>{}} />
                <OperationsSelector allOps={[Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV]} onOpsChanged={()=>{}} />
                <EquationsAmount equationsAmounts={[6, 8, 10]} onChange={()=>{}}/>
            </div>;
        case (puzzleKeys.SECRET_CODE_PUZZLE_KEY):
            return <div className='settingsMainContainer'>
                <NumberComplexity numberRanges={[10, 25]} selectedRange={10} onRangeChange={()=>{}} />
                <OperationsSelector allOps={[Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV]} onOpsChanged={()=>{}} />
            </div>;
        case (puzzleKeys.MONSTER_PUZZLE_KEY):
            return <div className='settingsMainContainer'>
                <NumberComplexity numberRanges={[10, 25]} selectedRange={10} onRangeChange={()=>{}} />
                <OperationsSelector allOps={[Operation.ADD, Operation.SUB, Operation.MULT, Operation.DIV]} onOpsChanged={()=>{}} />
                <EquationsAmount equationsAmounts={[8, 12, 16]} onChange={()=>{}}/>
            </div>
        default:
            return <div></div>

    }
};

export default Settings;