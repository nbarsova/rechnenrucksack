import {FormattedMessage} from "react-intl";
import {LockMonster} from "../monster/LockMonster";
import TreasureHunt from "../treasure/TreasureHunt";
import SecretMessage from "../secret/SecretMessage";

// @ts-ignore
import compass from '../../img/compass.png';
// @ts-ignore
import secret from '../../img/secretP.png';
// @ts-ignore
import monster from '../../img/monsterP.png';

export const puzzles = {
    treasure:
    {
        key: 'treasure',
        name: <FormattedMessage
            id="treasureMap"
        defaultMessage="Treasure map"/>,
        printTitle: <FormattedMessage id='worksheetTitle' />,
        component: <TreasureHunt/>,
        thumbnail: compass
    },
    secret: {
        key: 'secret',
        name: <FormattedMessage
            id="secretCode" defaultMessage="Secret map"/>,
        printTitle: <FormattedMessage id='secretCodeTitle' />,
        component: <SecretMessage/>,
        thumbnail: secret
    }, /*
    monster: {
        key: 'monster',
        name: <FormattedMessage
            id="lockTheMonster" defaultMessage="Lock the Monster"/>,
        printTitle: <FormattedMessage id='worksheetTitle' />,
        component: <LockMonster/>,
        thumbnail: monster
    } */
}
