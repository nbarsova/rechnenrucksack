import {useState} from 'react';
import {Outlet, Route, Routes} from "react-router-dom";
import {IntlProvider} from "react-intl";
import {deMessagesJSON, enMessagesJson, ruMessagesJSON} from "../../messages/messages";
import {getFromStorage, LOCALE_PARAMETER_NAME, setInStorage} from "../../util/localStorage";
import './App.css';
import {Header} from "./Header";
import Footer from "./Footer";
import TreasureHunt from "../treasure/TreasureHunt";
import SecretMessage from "../secret/SecretMessage";
import {LockMonster} from "../monster/LockMonster";

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

  return (
      <IntlProvider locale={locale}
                    messages={messages[locale]}>
        <Routes>
          <Route path='/rechnenrucksack' element={
            <div><Header headerCallback={setLocale} locale={locale} />
              <Outlet/>
              <Footer/>
            </div>
          }>
            <Route path="/rechnenrucksack/treasure" element={<TreasureHunt/>} />
            <Route path="/rechnenrucksack/secretCode" element={<SecretMessage/>} />
            <Route path="/rechnenrucksack/monster" element={<LockMonster/>} />
          </Route>


        </Routes>
      </IntlProvider>
    );
  };

export default App;
