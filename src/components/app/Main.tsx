import {Header} from "./Header";
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
        return (<Link key={'/rechnenrucksack/'+puzzle.key} to={"/" + puzzle.key} className="puzzleName">
            <div className='puzzle'><img
                className="thumbnail"
                src={puzzle.thumbnail}/>
                <p className='puzzleNameText'>{puzzle.name}</p>
            </div>
        </Link>)
    };

    const puzzlesArray = Object.values(puzzles);

    const renderPuzzleInBar = (puzzle: any) => <Link key={puzzle.key} to={"/" + puzzle.key} className="puzzleNameBar">
        {puzzle.name}</Link>;


    return (<div>
        <Header headerCallback={props.setLocale}
                locale={props.defaultLocale}/>
        <div>
            {props.currentPuzzle ? <div>
                    <div className='puzzleBar'>{puzzlesArray.map(renderPuzzleInBar)}</div>
                    {props.currentPuzzle.component}
                </div> :
                <div className="puzzles">{puzzlesArray.map(renderPuzzle)}</div>}

        </div>
        <Footer/>

    </div>)
}
