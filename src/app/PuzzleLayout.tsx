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
            className={
                isSelected
                    ? 'bg-primary-light flex items-center justify-center p-[5px] text-[calc(var(--subHeaderFontSize)+0.5vh)] font-bold text-black no-underline'
                    : 'bg-primary-light flex items-center justify-center p-[5px] text-(length:--subHeaderFontSize) font-bold text-black no-underline'
            }
        >
            {puzzle.name}
        </Link>
    );
};

const PuzzleLayout = () => {
    return (
        <div className="flex flex-col">
            <div className="bg-primary-light flex h-(--subHeaderHeight) flex-row justify-start">
                {puzzles.map((puzzle) => (
                    <PuzzleNavBarItem key={puzzle.key} puzzle={puzzle} />
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default PuzzleLayout;
