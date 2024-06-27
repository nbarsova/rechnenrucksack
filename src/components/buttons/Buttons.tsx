import {Link} from "react-router-dom";
import {ROOT_PATH} from "../app/App";
import PrintIcon from "../../svg/PrintIcon";
import SolutionIcon from "../../svg/SolutionIcon";
import RefreshIcon from "../../svg/RefreshIcon";
import {useIntl} from "react-intl";
import './Buttons.css';

const Buttons = (props: {
    puzzleKey: string,
    preparePrintParameters: ()=>void,
    prepareSolutionParameters: ()=>void,
    refresh: ()=>void
}) => {
    const {puzzleKey, preparePrintParameters, prepareSolutionParameters,refresh } = props;
    const intl = useIntl();
    return (
        <div className='buttons'>
            <Link target='_blank' to={ROOT_PATH + '/print?puzzle='+puzzleKey}
                  className='button'
                  title={intl.formatMessage({id: 'printStudent'})}
                  onClick={preparePrintParameters}><PrintIcon/></Link>
            <Link target='_blank'
                  to={ROOT_PATH}
                  className='button'
                  title={intl.formatMessage({id: 'printTeacher'})}
                  onClick={prepareSolutionParameters}><SolutionIcon/></Link>
            <div className='button' title={intl.formatMessage({id: 'refresh'})}
                 onClick={refresh}><RefreshIcon/></div>
        </div>
    );
};

export default Buttons;