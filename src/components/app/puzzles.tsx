import React from "react";

import {FormattedMessage} from "react-intl";
import {SecretMessage} from "../secret/SecretMessage";
import {LockMonster} from "../monster/LockMonster";
import TreasureHunt from "../treasure/TreasureHunt";

export const puzzles = {
    treasure:
    {
        key: 'treasure',
        name: <FormattedMessage
            id="treasureMap"
        defaultMessage="Treasure map"/>,
        printTitle: <FormattedMessage id='worksheetTitle' />,
        component: <TreasureHunt/>,
        thumbnail: require("../../img/compass.png")
    },
    secret: {
        key: 'secret',
        name: <FormattedMessage
            id="secretCode" defaultMessage="Secret map"/>,
        printTitle: <FormattedMessage id='worksheetTitle' />,
        component: <SecretMessage/>,
        thumbnail: require("../../img/secretP.png")
    },
    monster: {
        key: 'monster',
        name: <FormattedMessage
            id="lockTheMonster" defaultMessage="Lock the Monster"/>,
        printTitle: <FormattedMessage id='worksheetTitle' />,
        component: <LockMonster/>,
        thumbnail: require("../../img/monsterP.png")
    }
}
