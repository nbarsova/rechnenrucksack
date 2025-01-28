import {FormattedMessage} from "react-intl";
import TreasureHunt from "../treasure/TreasureHunt";
import SecretCode from "../secret/SecretCode";

import monster from '../../img/monster/1.png';
import compass from '../../img/compass.png';
import secret from '../../img/secretCode2.png';
import {LockMonster} from "../monster/LockMonster";

export enum puzzleKeys {
    TREASURE_PUZZLE_KEY = 'treasure',
    SECRET_CODE_PUZZLE_KEY = 'secretCode',
    MONSTER_PUZZLE_KEY = 'lockMonster'
}

export type PuzzleDescriptor = {
    key: puzzleKeys;
    name: JSX.Element;
    printTitle: JSX.Element;
    component: JSX.Element;
    thumbnail: HTMLImageElement;
}

export const puzzles = [{
    key: puzzleKeys.TREASURE_PUZZLE_KEY,
    name: <FormattedMessage
        id="treasureMap"
        defaultMessage="Treasure map"/>,
    printTitle: <FormattedMessage id='worksheetTitle'/>,
    component: <TreasureHunt/>,
    thumbnail: compass
},
    {
        key: puzzleKeys.SECRET_CODE_PUZZLE_KEY,
        name: <FormattedMessage
            id="secretCode" defaultMessage="Secret map"/>,
        printTitle: <FormattedMessage id='secretCodeTitle'/>,
        component: <SecretCode/>,
        thumbnail: secret
    },
    {
        key: puzzleKeys.MONSTER_PUZZLE_KEY,
        name: <FormattedMessage
            id="lockTheMonster" defaultMessage="Lock the Monster"/>,
        component: <LockMonster/>,
        thumbnail: monster,
        printTitle: <FormattedMessage id='lockMonsterTitle'/>,
    }
];