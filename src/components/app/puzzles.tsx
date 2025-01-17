import {FormattedMessage} from "react-intl";
import TreasureHunt from "../treasure/TreasureHunt";
import SecretCode from "../secret/SecretCode";

// @ts-ignore
import monster from '../../img/monster/1.png';
// @ts-ignore
import map from '../../img/mapP.png';
// @ts-ignore
import secret from '../../img/secretP.png';
import {LockMonster} from "../monster/LockMonster";

export enum puzzleKeys {
    TREASURE_PUZZLE_KEY = 'treasure',
    SECRET_CODE_PUZZLE_KEY = 'secretCode',
    MONSTER_PUZZLE_KEY = 'lockMonster'
}

export const puzzles = [{
    key: puzzleKeys.TREASURE_PUZZLE_KEY,
    name: <FormattedMessage
        id="treasureMap"
        defaultMessage="Treasure map"/>,
    printTitle: <FormattedMessage id='worksheetTitle'/>,
    component: <TreasureHunt/>,
    thumbnail: map
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