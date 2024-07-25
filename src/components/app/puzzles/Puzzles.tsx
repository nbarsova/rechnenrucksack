import {Link} from "react-router-dom";

import {FormattedMessage} from "react-intl";

// import monster from '../../img/monsterP.png';
// @ts-expect-error png import need to look into
import map from '../../img/mapP.png';
// @ts-expect-error png import need to look into
import secret from '../../img/secretP.png';
import TreasureHunt from "../../treasure/TreasureHunt";
import SecretMessage from "../../secret/SecretMessage";

export enum puzzleKeys {
    TREASURE_PUZZLE_KEY = 'treasure',
    SECRET_CODE_PUZZLE_KEY = 'secretCode',
    MONSTER_PUZZLE_KEY = 'monster'
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
        component: <SecretMessage/>,
        thumbnail: secret
    } /*,
     {
        key: puzzleKeys.MONSTER_PUZZLE_KEY,
        name: <FormattedMessage
            id="lockTheMonster" defaultMessage="Lock the Monster"/>,
        component: <LockMonster/>,
        thumbnail: monster,
        printTitle: <FormattedMessage id='lockMonsterTitle' />,
    } */
];

const Puzzles = () => {
    const renderPuzzle = (puzzle: any) => {
        return (<Link key={puzzle.key} to={puzzle.key} className="puzzleName">
            <div className='puzzle'><img
                className="thumbnail"
                src={puzzle.thumbnail}/>
                <p className='puzzleNameText'>{puzzle.name}</p>
            </div>
        </Link>)
    };

    return (<div className="puzzles">{puzzles.map(renderPuzzle)}</div>)
};

export default Puzzles;