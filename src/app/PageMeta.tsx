import { useEffect } from 'react';
import { SITE_ORIGIN } from './locales.ts';

interface PageMetaProps {
    title: string;
    description: string;
    locale: string;
    path: string; // e.g. "/en/treasure-map" or "/en"
    alternatePaths?: Record<string, string>; // locale → path, for hreflang alternates
}

const upsertMeta = (attribute: string, key: string, content: string) => {
    let tag = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
    );
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string, hreflang?: string) => {
    const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
    let tag = document.head.querySelector<HTMLLinkElement>(selector);
    if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        if (hreflang) tag.setAttribute('hreflang', hreflang);
        document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
};

const PageMeta = ({
    title,
    description,
    locale,
    path,
    alternatePaths,
}: PageMetaProps) => {
    const alternates = JSON.stringify(alternatePaths ?? {});

    useEffect(() => {
        document.title = title;
        document.documentElement.lang = locale;

        upsertMeta('name', 'description', description);
        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);
        upsertMeta('property', 'og:url', SITE_ORIGIN + path);
        upsertMeta('name', 'twitter:title', title);
        upsertMeta('name', 'twitter:description', description);

        upsertLink('canonical', SITE_ORIGIN + path);

        document.head
            .querySelectorAll('link[rel="alternate"][hreflang]')
            .forEach((tag) => tag.remove());

        const alternatePathsByLocale: Record<string, string> =
            JSON.parse(alternates);
        Object.entries(alternatePathsByLocale).forEach(
            ([altLocale, altPath]) =>
                upsertLink('alternate', SITE_ORIGIN + altPath, altLocale),
        );
        if (alternatePathsByLocale.en) {
            upsertLink(
                'alternate',
                SITE_ORIGIN + alternatePathsByLocale.en,
                'x-default',
            );
        }
    }, [title, description, locale, path, alternates]);

    return null;
};

export default PageMeta;