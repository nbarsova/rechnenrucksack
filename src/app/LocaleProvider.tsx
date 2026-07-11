import React, { createContext, useContext, useState } from 'react';

import { IntlProvider } from 'react-intl';
import {
    deMessagesJSON,
    enMessagesJson,
    ruMessagesJSON,
} from '../messages/messages.ts';
import {
    getFromStorage,
    LOCALE_PARAMETER_NAME,
    setInStorage,
} from '../util/localStorage.ts';

interface LocaleContextValue {
    locale: string;
    setLocale: (locale: string) => void;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export const useLocale = (): LocaleContextValue => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
    const messages: Record<string, Record<string, string>> = {
        en: enMessagesJson,
        de: deMessagesJSON,
        ru: ruMessagesJSON,
    };

    let defaultLocale = getFromStorage(LOCALE_PARAMETER_NAME);

    if (!defaultLocale)
        switch (navigator.language) {
            case 'de-DE':
                defaultLocale = 'de';
                break;
            case 'ru-RU':
                defaultLocale = 'ru';
                break;
            default:
                break;
        }

    const [locale, setCurrentLocale] = useState(defaultLocale || 'en');

    const setLocale = (locale: string) => {
        setCurrentLocale(locale);
        setInStorage(LOCALE_PARAMETER_NAME, locale);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <IntlProvider locale={locale} messages={messages[locale]}>
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    );
};

export default LocaleProvider;
