import {useState} from 'react';
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {IntlProvider} from "react-intl";
import {deMessagesJSON, enMessagesJson, ruMessagesJSON} from "../../messages/messages";
import {getFromStorage, LOCALE_PARAMETER_NAME, setInStorage} from "../../util/localStorage";
import './App.css';
import {Header} from "./Header";
import Footer from "./Footer";
import SecretMessage from "../secret/SecretMessage";
import {LockMonster} from "../monster/LockMonster";
import {puzzles} from "./puzzles";
import {useLocation} from "react-router";
import PrintPuzzlePage from "./templates/PrintPuzzlePage";
import GenericPuzzleComponent from "./templates/GenericPuzzleComponent";

const App = () => {

    const messages: any = {
        en: enMessagesJson,
        de: deMessagesJSON,
        ru: ruMessagesJSON
    };

    let defaultLocale = getFromStorage(LOCALE_PARAMETER_NAME);

    if (!defaultLocale) switch (navigator.language) {
        case "de-DE":
            defaultLocale = "de";
            break;
        case "ru-RU":
            defaultLocale = "ru";
            break;
        default:
            break;
    }

    const [locale, setCurrentLocale] = useState(defaultLocale || 'en');

    const setLocale = (locale: string) => {
        setCurrentLocale(locale);
        setInStorage(LOCALE_PARAMETER_NAME, locale);
    }

    const renderPuzzle = (puzzle: any) => {
        return (<Link key={puzzle.key} to={puzzle.key} className="puzzleName">
            <div className='puzzle'><img
                className="thumbnail"
                src={puzzle.thumbnail}/>
                <p className='puzzleNameText'>{puzzle.name}</p>
            </div>
        </Link>)
    };

    const location = useLocation();

    const isRoot = location.pathname === "/rechnenrucksack";

    const renderPuzzleInBar = (puzzle: any) => <Link key={puzzle.key} to={puzzle.key}
                                                     className="puzzleNameBar">
        {puzzle.name}</Link>;

    return (
        <IntlProvider locale={locale}
                      messages={messages[locale]}>
            <Routes>
                <Route path='/rechnenrucksack' element={
                    <div className='app'>
                        <Header headerCallback={setLocale} locale={locale}/>
                        {isRoot ? <div className="puzzles">{puzzles.map(renderPuzzle)}</div> :
                            <div className='puzzleBar'>{puzzles.map(renderPuzzleInBar)}</div>}
                        {!isRoot && <Outlet/>}
                        <Footer/>
                    </div>
                }>
                    <Route path="/rechnenrucksack/treasure" element={<GenericPuzzleComponent/>}/>
                    <Route path="/rechnenrucksack/secretCode" element={<SecretMessage/>}/>
                    <Route path="/rechnenrucksack/monster" element={<LockMonster/>}/>
                </Route>
                <Route path='/rechnenrucksack/print' element={<PrintPuzzlePage/>}/>
            </Routes>
        </IntlProvider>
    );
};

export default App;
