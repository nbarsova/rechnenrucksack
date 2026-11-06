import { useIntl } from 'react-intl';
import { PuzzleDescriptor, puzzles, puzzlePath } from '../puzzles';
import { Link } from 'react-router-dom';
import { LOCALES } from '../locales.ts';
import PageMeta from '../PageMeta.tsx';

const homeAlternatePaths = Object.fromEntries(
    LOCALES.map((locale) => [locale, `/${locale}`]),
);

const Puzzles = () => {
    const { locale, formatMessage } = useIntl();

    const renderPuzzle = (puzzle: PuzzleDescriptor) => {
        return (
            <Link
                key={puzzle.key}
                to={puzzlePath(puzzle, locale)}
                className="no-underline"
            >
                <div className="border-card-border mx-auto flex aspect-square w-full max-w-[max(25vw,25vh)] cursor-pointer flex-col rounded-[10px] border bg-white p-5 text-center transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
                    <img
                        src={puzzle.thumbnail}
                        alt=""
                        className="mb-3.75 min-h-0 w-full flex-1 rounded-[5px] object-contain"
                    />
                    <h3 className="text-primary my-2.5 text-[1.2rem]">
                        {puzzle.name}
                    </h3>
                    <p className="line-clamp-2 overflow-hidden text-[0.8rem] text-black">
                        {puzzle.description}
                    </p>
                </div>
            </Link>
        );
    };

    return (
        <div className="grid grid-cols-1 gap-5 p-[1vh] md:grid-cols-3">
            <PageMeta
                title={formatMessage({ id: 'homeTitle' })}
                description={formatMessage({ id: 'homeDescription' })}
                locale={locale}
                path={`/${locale}`}
                alternatePaths={homeAlternatePaths}
            />
            {puzzles.map(renderPuzzle)}
        </div>
    );
};

export default Puzzles;
