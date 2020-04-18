import React, {useState} from "react";
import {useIntl, FormattedMessage} from "react-intl";
import './App.css';

export function Header(props:
                           {
                               locale: string
                               headerCallback: (lang: string) => void,
                               resetPuzzle: () => void
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
        <div className="headerWrapper" onClick={() => props.resetPuzzle()}>
            <FormattedMessage id="rechnenrucksack"/>
        </div>
        <div className="languages"> {languages.map(renderLanguage)}</div>
    </header>)
}
