import React from "react";
import {compass, cross, easyGrid, hardGrid, stone} from "../pictureSources";
import {Direction} from "../classes/Direction";
import {FormattedMessage, useIntl} from 'react-intl';
import PrintEquation from "./PrintEquation";

const PrintTreasurePage = (props: {
    equationSteps: any,
    targets: any,
    canvasHeight: number,
    numberRange: number
     }) => {

    const intl = useIntl();

    const gridSrc = props.numberRange === 10 ? easyGrid : hardGrid;

    const renderTarget = ((target: any)=> {
        const mapStep = (props.numberRange === 10) ? props.canvasHeight / 14 : props.canvasHeight /28;
        const posX = props.canvasHeight/2 + target.x*mapStep - mapStep/2;
        const posY = props.canvasHeight/2 - target.y*mapStep - mapStep/2;

        return <img
                    width={mapStep}
                    height={mapStep}
                    src={stone}
                    style={{position: 'absolute',
                        top: posY,
                        left: posX}}/>
    });

    const renderEquation = (equationStep: any, index: number) => {
        return <PrintEquation equationStep={equationStep} index={index} showAnswer={false}/>;
    };

    return ( <div className="canvasWrapper">
        <img
            src={gridSrc} width={props.canvasHeight} height={props.canvasHeight}/>
        <img
            src={cross} style={{position: 'absolute', top: props.canvasHeight/2-10, left: props.canvasHeight/2-10}}
        height={20} width={20}/>
        {props.targets.map(renderTarget)}
        <div className='printPageText'>
            <span className='printEquation'><FormattedMessage id='worksheetDesc1' /></span>
            <span className='printEquation'><FormattedMessage id='worksheetDesc2' /></span>
            <span className='printEquation'><FormattedMessage id='worksheetDesc3' /></span>
            {props.equationSteps.map(renderEquation)}
        </div>
    </div>);
}

export default PrintTreasurePage;
