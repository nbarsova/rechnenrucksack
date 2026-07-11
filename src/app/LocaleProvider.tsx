import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
import { isLocale, Locale } from './locales.ts';

// localStorage → navigator.language → 'en'; used when the URL carries no locale
export const detectLocale = (): Locale => {
    const stored = getFromStorage(LOCALE_PARAMETER_NAME);
    if (isLocale(stored)) return stored;

    if (navigator.language.startsWith('de')) return 'de';
    if (navigator.language.startsWith('ru')) return 'ru';
    return 'en';
};

const messages: Record<Locale, Record<string, string>> = {
    en: enMessagesJson,
    de: deMessagesJSON,
    ru: ruMessagesJSON,
};

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation();
    const urlLocale = pathname.split('/')[1];

    const locale: Locale = isLocale(urlLocale) ? urlLocale : detectLocale();

    useEffect(() => {
        if (isLocale(urlLocale)) {
            setInStorage(LOCALE_PARAMETER_NAME, urlLocale);
        }
    }, [urlLocale]);

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            {children}
        </IntlProvider>
    );
};

export default LocaleProvider;
