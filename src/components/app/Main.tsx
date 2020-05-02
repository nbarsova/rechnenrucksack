import {Header} from "./Header";
import React from "react";
import {Puzzle} from "./Puzzle";
import {puzzles} from "./puzzles";
import Footer from "./Footer";
import {Link} from "react-router-dom";

export function Main(props: {
    currentPuzzle?: Puzzle,
    defaultLocale: string,
    setLocale: (language: string) => void
}) {

    let renderPuzzle = (puzzle: any) => {
        return (<Link to={"/" + puzzle.key}>
            <img
                className="thumbnail"
                src={puzzle.thumbnail}/>
            <p
                className="puzzleName">{puzzle.name}</p>
        </Link>)
    };

    const renderPuzzles = puzzles.map(renderPuzzle);

    const renderPuzzleInBar = (puzzle: any) => <Link to={"/" + puzzle.key}>
        <p
        className="puzzleNameBar"
        key={puzzle.key}>{puzzle.name}</p></Link>;


    return (<div>
        <Header headerCallback={props.setLocale}
                locale={props.defaultLocale}/>
        <div>
            {props.currentPuzzle ? <div>
                    <div className='puzzleBar'>{puzzles.map(renderPuzzleInBar)}</div>
                    {props.currentPuzzle.component}
                </div> :
                <div className="puzzles">{puzzles.map(renderPuzzle)}</div>}

        </div>
        <Footer/>

    </div>)
}
