import { FormattedMessage } from 'react-intl';

import monster from '../img/monster/1.png';
import compass from '../img/compass.png';
import secret from '../img/secretCode2.png';
import { JSX } from 'react';
import TreasureHunt from '../components/treasure/TreasureHunt.tsx';
import SecretCode from '../components/secret/SecretCode.tsx';
import { LockMonster } from '../components/monster/LockMonster.tsx';

export enum puzzleKeys {
    TREASURE_PUZZLE_KEY = 'treasure',
    SECRET_CODE_PUZZLE_KEY = 'secretCode',
    MONSTER_PUZZLE_KEY = 'lockMonster',
}

export type PuzzleDescriptor = {
    key: puzzleKeys;
    name: JSX.Element;
    printTitle: JSX.Element;
    component: JSX.Element;
    thumbnail: HTMLImageElement;
};

export const puzzles = [
    {
        key: puzzleKeys.TREASURE_PUZZLE_KEY,
        name: (
            <FormattedMessage id="treasureMap" defaultMessage="Treasure map" />
        ),
        printTitle: <FormattedMessage id="worksheetTitle" />,
        component: <TreasureHunt />,
        thumbnail: compass,
    },
    {
        key: puzzleKeys.SECRET_CODE_PUZZLE_KEY,
        name: <FormattedMessage id="secretCode" defaultMessage="Secret map" />,
        printTitle: <FormattedMessage id="secretCodeTitle" />,
        component: <SecretCode />,
        thumbnail: secret,
    },
    {
        key: puzzleKeys.MONSTER_PUZZLE_KEY,
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
