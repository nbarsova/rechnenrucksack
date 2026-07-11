import {FormattedMessage, useIntl} from "react-intl";
import './Header.css';
import {Link} from "react-router-dom";
import {useLocale} from "../LocaleProvider.tsx";

export function Header() {
    const languages = ["en", "ru", "de"];
    const {locale, setLocale} = useLocale();
    const intl = useIntl();
    document.title = intl.formatMessage({id: "rechnenrucksack"});

    const renderLanguage = (language: string) => {
        return (<div key={language} className={language === locale ? "selectedLanguage" : "language"}
                     onClick={() => {
                         setLocale(language);
                     }}>{language}
        </div>)
    }

    return (
        <header>
            <Link className="headerWrapper" to={'/'}>
                <FormattedMessage id="rechnenrucksack"/>
            </Link>
            <div className="languages"> {languages.map(renderLanguage)}</div>
        </header>
    )
}