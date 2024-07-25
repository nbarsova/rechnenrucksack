import {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import './Header.css';
import {Link} from "react-router-dom";

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

    return (
            <header>
                <Link className="headerWrapper" to={'/rechnenrucksack/'}>
                    <FormattedMessage id="rechnenrucksack"/>
                </Link>
                <div className="languages"> {languages.map(renderLanguage)}</div>
            </header>
    )
}
