import { FormattedMessage, useIntl } from 'react-intl';
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
                    language === locale
                        ? 'mr-[10px] text-[1.5vh] font-bold md:text-[2.5vh]'
                        : 'mr-[10px] font-normal'
                }
                onClick={() => switchLocale(language)}
            >
                {language}
            </div>
        );
    };

    return (
        <header className="font-heading bg-primary flex h-(--headerHeight) cursor-pointer flex-row items-center justify-between text-[2.5vh] font-bold tracking-[1vh] uppercase">
            <Link
                className="p-[1vh] no-underline md:text-[5vh] md:tracking-[1vh]"
                to={`/${locale}`}
            >
                <FormattedMessage id="rechnenrucksack" />
            </Link>
            <div className="flex flex-row items-center text-[1.2vh] tracking-[2px] md:text-[2vh]">
                {' '}
                {languages.map(renderLanguage)}
            </div>
        </header>
    );
}
