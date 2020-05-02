import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {IntlProvider} from "react-intl";
import {deMessagesJSON, enMessagesJson, ruMessagesJSON} from "../../messages/messages";
import {Main} from "./Main";
import {puzzles} from "./puzzles";
import PrintContainer from "./PrintContainer";

const App = () => {

  const messages: any = {
    en: enMessagesJson,
    de: deMessagesJSON,
    ru: ruMessagesJSON
  };

  let defaultLocale = "en";
  switch (navigator.language) {
    case "de-DE":
      defaultLocale = "de";
    case "ru-RU":
      defaultLocale = "ru";
    default:
      break;
  }

  let [locale, setCurrentLocale] = useState(defaultLocale);

  return (
      <IntlProvider locale={locale}
                    messages={messages[locale]}>
        <Router>
          <div>

            <Switch>
              <Route path="/treasure/print">
                <PrintContainer puzzle={puzzles.treasure.key}/>
              </Route>
              <Route path="/treasure">
                <Main currentPuzzle={puzzles.treasure} defaultLocale={defaultLocale}
                setLocale={setCurrentLocale}/>
              </Route>
              <Route path="/secret">
                <Main currentPuzzle={puzzles.secret} defaultLocale={defaultLocale}
                      setLocale={setCurrentLocale}/>
              </Route>
              <Route path="/monster">
                <Main currentPuzzle={puzzles.monster} defaultLocale={defaultLocale}
                      setLocale={setCurrentLocale}/>
              </Route>
              <Route path="/">
                <Main defaultLocale={defaultLocale}
                      setLocale={setCurrentLocale}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </IntlProvider>
    );
  };

export default App;
