import { FormattedMessage } from 'react-intl';

import monster from '../img/monster/1.png';
import compass from '../img/compass.png';
import secret from '../img/secretCode2.png';
import { JSX } from 'react';
import TreasureHunt from '../components/treasure/TreasureHunt.tsx';
import SecretCode from '../components/secret/SecretCode.tsx';
import { LockMonster } from '../components/monster/LockMonster.tsx';
import { LOCALES } from './locales.ts';

export enum puzzleKeys {
    TREASURE_PUZZLE_KEY = 'treasure',
    SECRET_CODE_PUZZLE_KEY = 'secretCode',
    MONSTER_PUZZLE_KEY = 'lockMonster',
}

export type PuzzleDescriptor = {
    key: puzzleKeys;
    slugs: Record<string, string>;
    name: JSX.Element;
    printTitle: JSX.Element;
    component: JSX.Element;
    thumbnail: string;
};

export const puzzles: PuzzleDescriptor[] = [
    {
        key: puzzleKeys.TREASURE_PUZZLE_KEY,
        slugs: {
            en: 'treasure-map',
            de: 'schatzsuche',
            ru: 'karta-sokrovishch',
        },
        name: (
            <FormattedMessage id="treasureMap" defaultMessage="Treasure map" />
        ),
        printTitle: <FormattedMessage id="worksheetTitle" />,
        component: <TreasureHunt />,
        thumbnail: compass,
    },
    {
        key: puzzleKeys.SECRET_CODE_PUZZLE_KEY,
        slugs: {
            en: 'secret-code',
            de: 'geheimcode',
            ru: 'sekretnyj-kod',
        },
        name: <FormattedMessage id="secretCode" defaultMessage="Secret map" />,
        printTitle: <FormattedMessage id="secretCodeTitle" />,
        component: <SecretCode />,
        thumbnail: secret,
    },
    {
        key: puzzleKeys.MONSTER_PUZZLE_KEY,
        slugs: {
            en: 'lock-the-monster',
            de: 'fang-das-monster',
            ru: 'zapri-monstra',
        },
        name: (
            <FormattedMessage
                id="lockTheMonster"
                defaultMessage="Lock the Monster"
            />
        ),
        component: <LockMonster />,
        thumbnail: monster,
        printTitle: <FormattedMessage id="lockMonsterTitle" />,
    },
];

export const findPuzzleByKey = (key: puzzleKeys): PuzzleDescriptor =>
    puzzles.find((puzzle) => puzzle.key === key)!;

export const findPuzzleBySlug = (
    slug: string | undefined,
): PuzzleDescriptor | undefined =>
    slug
        ? puzzles.find((puzzle) => Object.values(puzzle.slugs).includes(slug))
        : undefined;

export const puzzlePath = (puzzle: PuzzleDescriptor, locale: string): string =>
    `/${locale}/${puzzle.slugs[locale]}`;

export const puzzleAlternatePaths = (
    puzzle: PuzzleDescriptor,
): Record<string, string> =>
    Object.fromEntries(
        LOCALES.map((locale) => [locale, puzzlePath(puzzle, locale)]),
    );
