import { FormattedMessage, useIntl } from 'react-intl';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Locale } from '../locales.ts';
import { findPuzzleBySlug, puzzlePath } from '../puzzles.tsx';

const languages: Locale[] = ['en', 'ru', 'de'];

export function Header() {
    const { locale } = useIntl();
    const location = useLocation();
    const navigate = useNavigate();

    const switchLocale = (newLocale: Locale) => {
        const currentSlug = location.pathname.split('/')[2];
        const puzzle = findPuzzleBySlug(currentSlug);
        navigate(puzzle ? puzzlePath(puzzle, newLocale) : `/${newLocale}`);
    };

    const renderLanguage = (language: Locale) => {
        return (
            <div
                key={language}
                className={
                    language === locale ? 'selectedLanguage' : 'language'
                }
                onClick={() => switchLocale(language)}
            >
                {language}
            </div>
        );
    };

    return (
        <header>
            <Link className="headerWrapper" to={`/${locale}`}>
                <FormattedMessage id="rechnenrucksack" />
            </Link>
            <div className="languages"> {languages.map(renderLanguage)}</div>
        </header>
    );
}
