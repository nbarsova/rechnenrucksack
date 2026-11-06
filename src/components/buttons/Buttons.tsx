import { Link } from 'react-router-dom';
import PrintIcon from '../../svg/PrintIcon';
import SolutionIcon from '../../svg/SolutionIcon';
import RefreshIcon from '../../svg/RefreshIcon';
import { useIntl } from 'react-intl';

const Buttons = (props: {
    puzzleKey: string;
    preparePrintParameters: () => void;
    prepareSolutionParameters: () => void;
    refresh: () => void;
}) => {
    const {
        puzzleKey,
        preparePrintParameters,
        prepareSolutionParameters,
        refresh,
    } = props;
    const intl = useIntl();
    return (
        <div className="bg-primary-light absolute top-[calc(var(--headerHeight)+var(--subHeaderHeight)+var(--settingsHeight))] left-[1vh] z-2 flex opacity-80 xl:top-[calc(var(--headerHeight)+var(--subHeaderHeight))] xl:left-[calc(var(--settingsWidth)+1vh)]">
            <Link
                target="_blank"
                to={'/print?puzzle=' + puzzleKey}
                className="m-[1vh] h-[4vh] w-[4vh] cursor-pointer"
                title={intl.formatMessage({ id: 'printStudent' })}
                onClick={preparePrintParameters}
            >
                <PrintIcon />
            </Link>
            <Link
                target="_blank"
                to={'/print?puzzle=' + puzzleKey + '&solution=true'}
                className="m-[1vh] h-[4vh] w-[4vh] cursor-pointer"
                title={intl.formatMessage({ id: 'printTeacher' })}
                onClick={prepareSolutionParameters}
            >
                <SolutionIcon />
            </Link>
            <div
                className="m-[1vh] h-[4vh] w-[4vh] cursor-pointer"
                title={intl.formatMessage({ id: 'refresh' })}
                onClick={refresh}
            >
                <RefreshIcon />
            </div>
        </div>
    );
};

export default Buttons;
