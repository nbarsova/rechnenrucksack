import {useState} from "react";
import {useIntl, FormattedMessage} from "react-intl";
import './App.css';
import {Link} from "react-router-dom";

export function Header(props:
                           {
                               locale: string
                               headerCallback: (lang: string) => void
                           }) {
    let languages = ["en", "ru", "de"];
    let [currentLanguage, setCurrentLanguage] = useState(props.locale);
    let intl = useIntl();
    document.title = intl.formatMessage({id: "rechnenrucksack"});

    let renderLanguage = (language: string) => {
        return (<div key={language} className={language === currentLanguage ? "selectedLanguage" : "language"}
                     onClick={() => {
                         setCurrentLanguage(language);
                         props.headerCallback(language);
                         document.title = intl.formatMessage({id: "rechnenrucksack"});
                     }}>{language}
        </div>)
    }

    return (<header>
        <Link className="headerWrapper" to={'/'}>
            <FormattedMessage id="rechnenrucksack"/>
        </Link>
        <div className="languages"> {languages.map(renderLanguage)}</div>
    </header>)
}
