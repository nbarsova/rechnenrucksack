import {PuzzleDescriptor, puzzles} from "../puzzles";
import {Link} from "react-router-dom";
import './Puzzles.css';

const Puzzles = () => {
    const renderPuzzle = (puzzle: PuzzleDescriptor) => {
        return (<Link key={puzzle.key} to={puzzle.key} className="puzzleName">
            <div className="card">
                <img src={puzzle.thumbnail} alt=""/>
                <h3>{puzzle.name}</h3>
            </div>
        </Link>)
    };

    return (<div className="card-grid">
        {puzzles.map(renderPuzzle)}
    </div>)
};

export default Puzzles;