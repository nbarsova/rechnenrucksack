import { puzzles } from './puzzles';
import { Link, Outlet, useLocation } from 'react-router-dom';

const PuzzleNavBarItem = ({ puzzle }: { puzzle: any }) => {
    const location = useLocation();
    const currentPuzzle = location.pathname.split('/')[1];

    return (
        <Link
            to={puzzle.key}
            className={
                currentPuzzle === puzzle.key
                    ? 'selectedPuzzleNameBar'
                    : 'puzzleNameBar'
            }
        >
            {puzzle.name}
        </Link>
    );
};

const PuzzleLayout = () => {
    return (
        <div className="flexColumn">
            <div className="puzzleBar">
                {puzzles.map((puzzle: any, index: number) => (
                    <PuzzleNavBarItem key={index} puzzle={puzzle} />
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default PuzzleLayout;
