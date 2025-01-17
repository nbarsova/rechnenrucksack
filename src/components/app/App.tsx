import {useState} from 'react';
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {IntlProvider} from "react-intl";
import {deMessagesJSON, enMessagesJson, ruMessagesJSON} from "../../messages/messages";
import {getFromStorage, LOCALE_PARAMETER_NAME, setInStorage} from "../../util/localStorage";
import './App.css';
import {Header} from "./header/Header";
import Footer from "./footer/Footer";
import SecretCode from "../secret/SecretCode";
import {LockMonster} from "../monster/LockMonster";
import {puzzleKeys, puzzles} from "./puzzles";
import {useLocation} from "react-router";
import TreasureHunt from "../treasure/TreasureHunt";
import Puzzles from "./Puzzles/Puzzles";
import PrintContainer from "../print/PrintContainer";

export const ROOT_PATH = "/rechnenrucksack/";

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

    const location = useLocation();

    const isRoot = location.pathname === ROOT_PATH;

    const currentPuzzle = location.pathname.slice(ROOT_PATH.length + 1, location.pathname.length);

    const renderPuzzleInBar = (puzzle: any) => <Link key={puzzle.key} to={puzzle.key}
                                                     className={currentPuzzle === puzzle.key ? 'selectedPuzzleNameBar' : "puzzleNameBar"}>
        {puzzle.name}</Link>;

    return (
        <IntlProvider locale={locale}
                      messages={messages[locale]}>
            <Routes>
                <Route path={ROOT_PATH} element={
                    <div className='app'>
                        <Header headerCallback={setLocale} locale={locale}/>
                        {isRoot ? <Puzzles/> :
                            <div className='puzzleBar'>{puzzles.map(renderPuzzleInBar)}</div>}
                        {!isRoot && <Outlet/>}
                        <Footer/>
                    </div>
                }>
                    <Route path={ROOT_PATH + '/' + puzzleKeys.TREASURE_PUZZLE_KEY} element={<TreasureHunt/>}/>
                    <Route path={ROOT_PATH + '/' + puzzleKeys.SECRET_CODE_PUZZLE_KEY} element={<SecretCode/>}/>
                    <Route path={ROOT_PATH + '/' + puzzleKeys.MONSTER_PUZZLE_KEY} element={<LockMonster/>}/>
                </Route>
                <Route path={ROOT_PATH + '/print'} element={<PrintContainer/>}/>
            </Routes>
        </IntlProvider>
    );
};

export default App;
