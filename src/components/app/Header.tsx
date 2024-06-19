import {useState} from "react";
import {useIntl, FormattedMessage} from "react-intl";
import './App.css';
import {Link} from "react-router-dom";
import {puzzles} from "./puzzles";

export function Header(props:
                           {
                               locale: string
                               headerCallback: (lang: string) => void
                           }) {
    const languages = ["en", "ru", "de"];
    const [currentLanguage, setCurrentLanguage] = useState(props.locale);
    const intl = useIntl();
    document.title = intl.formatMessage({id: "rechnenrucksack"});

    const renderLanguage = (language: string) => {
        return (<div key={language} className={language === currentLanguage ? "selectedLanguage" : "language"}
                     onClick={() => {
                         setCurrentLanguage(language);
                         props.headerCallback(language);
                         document.title = intl.formatMessage({id: "rechnenrucksack"});
                     }}>{language}
        </div>)
    }

    const renderPuzzleInBar = (puzzle: any) => <Link key={puzzle.key} to={puzzle.key}
                                                     className="puzzleNameBar">
        {puzzle.name}</Link>;

    return (<>
            <header>
                <Link className="headerWrapper" to={'/'}>
                    <FormattedMessage id="rechnenrucksack"/>
                </Link>
                <div className="languages"> {languages.map(renderLanguage)}</div>
            </header>
            <div className='puzzleBar'>{puzzles.map(renderPuzzleInBar)}</div>
        </>
    )
}
