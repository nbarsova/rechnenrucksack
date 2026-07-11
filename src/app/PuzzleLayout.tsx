import { PuzzleDescriptor, puzzles, puzzlePath } from './puzzles';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

const PuzzleNavBarItem = ({ puzzle }: { puzzle: PuzzleDescriptor }) => {
    const location = useLocation();
    const { locale } = useIntl();
    const currentSlug = location.pathname.split('/')[2];
    const isSelected = Object.values(puzzle.slugs).includes(currentSlug);

    return (
        <Link
            to={puzzlePath(puzzle, locale)}
            className={isSelected ? 'selectedPuzzleNameBar' : 'puzzleNameBar'}
        >
            {puzzle.name}
        </Link>
    );
};

const PuzzleLayout = () => {
    return (
        <div className="flexColumn">
            <div className="puzzleBar">
                {puzzles.map((puzzle) => (
                    <PuzzleNavBarItem key={puzzle.key} puzzle={puzzle} />
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default PuzzleLayout;
