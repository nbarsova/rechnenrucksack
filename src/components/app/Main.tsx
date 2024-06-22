import {puzzles} from "./puzzles";
import Footer from "./footer/Footer";
import {Link, useRoutes} from "react-router-dom";
import {useLocation} from "react-router";
import TreasureHunt from "../treasure/TreasureHunt";
import SecretMessage from "../secret/SecretMessage";
import {LockMonster} from "../monster/LockMonster";

export function Main() {

    const renderPuzzle = (puzzle: any) => {
        return (<Link key={puzzle.key} to={puzzle.key} className="puzzleName">
            <div className='puzzle'><img
                className="thumbnail"
                src={puzzle.thumbnail}/>
                <p className='puzzleNameText'>{puzzle.name}</p>
            </div>
        </Link>)
    };

    const puzzlesArray = Object.values(puzzles);

    const renderPuzzleInBar = (puzzle: any) => <Link key={puzzle.key} to={puzzle.key}
                                                     className="puzzleNameBar">
        {puzzle.name}</Link>;

    const location = useLocation();
    console.log('location', location);
    const mainPuzzlePage = useRoutes([
        {
            path: "/",
            element: <div className="puzzles">{puzzlesArray.map(renderPuzzle)}</div>,
            children: [
                {
                    path: "treasure",
                    element: <TreasureHunt/>,
                },
                {path: "monster", element: <LockMonster/>},
                {path: "secretCode", element: <SecretMessage/>},
            ],
        }
    ]);
    return (<div>
            <div className='puzzleBar'>{puzzlesArray.map(renderPuzzleInBar)}</div>
            {mainPuzzlePage}
            <Footer/>
        </div>
    )
}

// <div>
//    <Switch>
//             <Route path="/treasure/print/solution">
//                 <PrintContainer puzzle={puzzles.treasure.key} solution/>
//             </Route>
//             <Route path="/treasure/print">
//                 <PrintContainer puzzle={puzzles.treasure.key}/>
//             </Route>
//             <Route path="/treasure">
//                 <Main currentPuzzle={puzzles.treasure} />
//             </Route>
//             <Route path="/secret/print/solution">
//                 <PrintContainer puzzle={puzzles.secret.key} solution/>
//             </Route>
//             <Route path="/secret/print">
//                 <PrintContainer puzzle={puzzles.secret.key}/>
//             </Route>
//             <Route path="/secret">
//                 <Main currentPuzzle={puzzles.secret} defaultLocale={defaultLocale}
//                       setLocale={setLocale}/>
//             </Route>
//             <Route path="/monster/print/solution">
//                 <PrintContainer puzzle={puzzles.monster.key} solution/>
//             </Route>
//             <Route path="/monster/print">
//                 <PrintContainer puzzle={puzzles.monster.key}/>
//             </Route>
//             <Route path="/monster">
//                 <Main currentPuzzle={puzzles.monster} defaultLocale={defaultLocale}
//                       setLocale={setLocale}/>
//             </Route>
//             <Route path="/">
//                 <Main defaultLocale={defaultLocale}
//                       setLocale={setLocale}/>
//             </Route>
//         </Switch>
//     <div>
//         {props.currentPuzzle ? <div>
//                 <div className='puzzleBar'>{puzzlesArray.map(renderPuzzleInBar)}</div>
//                 <GenericPuzzleComponent currentPuzzle={props.currentPuzzle}/>
//             </div> :
//             <div className="puzzles">{puzzlesArray.map(renderPuzzle)}</div>}
//
//     </div>
//     <Footer/>
//
// </div>