
import {MapTargetObject} from "../classes/MapTargetObject";
import PrintEquation from "./PrintEquation";
import {FormattedMessage, useIntl} from "react-intl";

const PrintTreasureSolutionPage = (props: {
        equationSteps: any,
        currentTarget: MapTargetObject
    }) => {
        console.log(props.currentTarget);
        const intl = useIntl();

        const renderEquation = (equationStep: any, index: number) => {
            return <PrintEquation equationStep={equationStep} index={index} showAnswer/>;
        };

        let location;

        if ((props.currentTarget.x > 0) && (props.currentTarget.y > 0)) {
            location = intl.formatMessage({id: 'upperRight'});
        }

        if ((props.currentTarget.x > 0) && (props.currentTarget.y < 0)) {
            location = intl.formatMessage({id: 'lowerRight'});
        }

        if ((props.currentTarget.x < 0) && (props.currentTarget.y > 0)) {
            location = intl.formatMessage({id: 'upperLeft'});
        }

        if ((props.currentTarget.x < 0) && (props.currentTarget.y < 0)) {
            location = intl.formatMessage({id: 'lowerLeft'});
        }

        return (
            <div className='printPageTextWeb'>
                {props.equationSteps.map(renderEquation)}
                <div className='printPageAnswer'>
                    <span className='equationText'><FormattedMessage id='answer'/></span>
                    <span className='equationText'>{intl.formatMessage({id: 'treasureLocation'})}</span>
                    <span className='equationText'>{location}</span>
                </div>
            </div>
        );
    };

export default PrintTreasureSolutionPage;
