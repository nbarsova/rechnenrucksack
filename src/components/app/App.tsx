import {useState} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {IntlProvider} from "react-intl";
import {deMessagesJSON, enMessagesJson, ruMessagesJSON} from "../../messages/messages";
import {Main} from "./Main";
import {puzzles} from "./puzzles";
import PrintContainer from "./PrintContainer";
import {getFromStorage, LOCALE_PARAMETER_NAME, setInStorage} from "../../util/localStorage";

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
    case "ru-RU":
      defaultLocale = "ru";
    default:
      break;
  }

  let [locale, setCurrentLocale] = useState(defaultLocale || 'en');

  const setLocale = (locale: string) => {
    setCurrentLocale(locale);
    setInStorage(LOCALE_PARAMETER_NAME, locale);
  }

  return (
      <IntlProvider locale={locale}
                    messages={messages[locale]}>
        <Router>
          <div>

            <Switch>
              <Route path="/rechnenrucksack/treasure/print/solution">
                <PrintContainer puzzle={puzzles.treasure.key} solution/>
              </Route>
              <Route path="/rechnenrucksack/treasure/print">
                <PrintContainer puzzle={puzzles.treasure.key}/>
              </Route>
              <Route path="/rechnenrucksack/treasure">
                <Main currentPuzzle={puzzles.treasure} defaultLocale={defaultLocale}
                setLocale={setLocale}/>
              </Route>
              <Route path="/rechnenrucksack/secret/print/solution">
                <PrintContainer puzzle={puzzles.secret.key} solution/>
              </Route>
              <Route path="/rechnenrucksack/secret/print">
                <PrintContainer puzzle={puzzles.secret.key}/>
              </Route>
              <Route path="/rechnenrucksack/secret">
                <Main currentPuzzle={puzzles.secret} defaultLocale={defaultLocale}
                      setLocale={setLocale}/>
              </Route>
              <Route path="/rechnenrucksack/monster">
                <Main currentPuzzle={puzzles.monster} defaultLocale={defaultLocale}
                      setLocale={setLocale}/>
              </Route>
              <Route path="/">
                <Main defaultLocale={defaultLocale}
                      setLocale={setLocale}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </IntlProvider>
    );
  };

export default App;
