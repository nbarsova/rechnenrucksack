import React from "react";

import {FormattedMessage} from "react-intl";
import {SecretMessage} from "../secret/SecretMessage";
import {LockMonster} from "../monster/LockMonster";
import TreasureHunt from "../treasure/TreasureHunt";

export const puzzles = [
    {
        key: 'treasure',
        name: <FormattedMessage
            id="treasureMap"
        defaultMessage="Treasure map"/>,
        component: <TreasureHunt/>,
        thumbnail: require("../../img/compass.png")
    },
    {
        key: 'secret',
        name: <FormattedMessage
            id="secretCode" defaultMessage="Secret map"/>,
        component: <SecretMessage/>,
        thumbnail: require("../../img/secretP.png")
    },
    {
        key: 'monster',
        name: <FormattedMessage
            id="lockTheMonster" defaultMessage="Lock the Monster"/>,
        component: <LockMonster/>,
        thumbnail: require("../../img/monsterP.png")
    }
];
