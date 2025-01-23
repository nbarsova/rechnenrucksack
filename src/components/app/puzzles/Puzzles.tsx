import {puzzles} from "../puzzles";
import {Link} from "react-router-dom";

const Puzzles = () => {
    const renderPuzzle = (puzzle: any) => {
        return (<Link key={puzzle.key} to={puzzle.key} className="puzzleName">
            <div className='puzzle'><img
                className="thumbnail"
                src={puzzle.thumbnail}/>
                <p className='puzzleNameText'>{puzzle.name}</p>
            </div>
        </Link>)
    };

    return (<div className="puzzles">{puzzles.map(renderPuzzle)}</div>)
};

export default Puzzles;