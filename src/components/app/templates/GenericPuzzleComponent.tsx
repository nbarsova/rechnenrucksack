
import {Link} from "react-router-dom";
import PrintIcon from "../../../svg/PrintIcon";
import SolutionIcon from "../../../svg/SolutionIcon";
import RefreshIcon from "../../../svg/RefreshIcon";
import {useIntl} from "react-intl";
import PrintPuzzlePage from "./PrintPuzzlePage";
import '../App.css';
import Settings from "../../settings/Settings";

const GenericPuzzleComponent = (props: {currentPuzzle: any}) => {
    const intl = useIntl();
    const settings = {};

    return (
        <div className="main">
            <div className="settings">
                <Settings currentPuzzle={props.currentPuzzle}/>
            </div>
                <div className='buttons'>
                    <Link target='_blank' to={"/treasure/print"}
                          className='printButton'
                          title={intl.formatMessage({id: 'printStudent'})}
                         ><PrintIcon /></Link>
                    <Link target='_blank' to={"/treasure/print/solution"}
                          className='printButton'
                          title={intl.formatMessage({id: 'printTeacher'})}
                          ><SolutionIcon /></Link>
                    <div className='printButton' title={intl.formatMessage({id: 'refresh'})}
                         ><RefreshIcon /></div>

            </div>
            <div className="printPreview"><PrintPuzzlePage puzzleSettings={settings}/></div>
</div>
            );
};

export default GenericPuzzleComponent;