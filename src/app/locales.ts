export const LOCALES = ['en', 'de', 'ru'] as const;

export type Locale = (typeof LOCALES)[number];

export const isLocale = (value: unknown): value is Locale =>
    typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

export const SITE_ORIGIN = 'https://bagoftasks.app';