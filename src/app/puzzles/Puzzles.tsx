import { useIntl } from 'react-intl';
import { PuzzleDescriptor, puzzles, puzzlePath } from '../puzzles';
import { Link } from 'react-router-dom';
import './Puzzles.css';
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
                className="puzzleName"
            >
                <div className="card">
                    <img src={puzzle.thumbnail} alt="" />
                    <h3>{puzzle.name}</h3>
                </div>
            </Link>
        );
    };

    return (
        <div className="card-grid">
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
