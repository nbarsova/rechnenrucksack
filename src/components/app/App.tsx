import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {IntlProvider} from "react-intl";
import {deMessagesJSON, enMessagesJson, ruMessagesJSON} from "../../messages/messages";
import {Main} from "./Main";
import {puzzles} from "./puzzles";
import PrintContainer from "./PrintContainer";

const App = () => {

  let getCurrentComponent: () => any | RTCIceComponent | null;

  const [currentPuzzle, setCurrentPuzzle] = useState(null);


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

  const [printComponent, setPrintComponent] = useState(null);

  const printCallback = (el: any) => {
    setPrintComponent(el);
  }

  return (
      <IntlProvider locale={locale}
                    messages={messages[locale]}>
        <Router>
          <div>

            <Switch>
              <Route path="/treasure/print">
                <PrintContainer title='Where is the treasure?' component={printComponent}/>
              </Route>
              <Route path="/treasure">
                <Main currentPuzzle={puzzles[0]} defaultLocale={defaultLocale}
                setLocale={setCurrentLocale}/>
              </Route>
              <Route path="/secret">
                <Main currentPuzzle={puzzles[1]} defaultLocale={defaultLocale}
                      setLocale={setCurrentLocale}/>
              </Route>
              <Route path="/monster">
                <Main currentPuzzle={puzzles[2]} defaultLocale={defaultLocale}
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
