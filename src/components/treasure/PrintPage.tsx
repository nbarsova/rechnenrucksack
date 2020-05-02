import React from "react";
import {compass, cross, stone} from "./pictureSources";
import {Direction} from "./Direction";
import {FormattedMessage, useIntl} from 'react-intl';

const PrintPage = (props: {
    gridSrc: any,
    equationSteps: any,
    targets: any,
    canvasHeight: number,
    numberRange: number
     }) => {

    const intl = useIntl();

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
        let axis = "";
        if (index % 2 == 0) {
            axis = Direction.HORIZONTAL;
        } else {
            axis = Direction.VERTICAL;
        }
        return <span style={{margin: '5px 0'}} key={index}>{(index+1)+ '). '+ equationStep.equation + " = __ " + intl.formatMessage({id: 'steps'})
        + ' ' + getDirection(equationStep.step, axis)}</span>;
    };

    const getDirection = (number: number, direction: string) => {

        switch (direction) {
            case Direction.VERTICAL:
                if (Math.sign(number) === 1) {
                    return intl.formatMessage({id: 'dirUp'});
                } else {
                    return intl.formatMessage({id: 'dirDown'});
                }
                break;
            case Direction.HORIZONTAL:
                if (Math.sign(number) === 1) {
                    return intl.formatMessage({id: 'dirRight'})
                } else
                    return intl.formatMessage({id: 'dirLeft'});
        }
    }

    return ( <div className="canvasWrapper">
        <img
            src={props.gridSrc} width={props.canvasHeight} height={props.canvasHeight}/>
        <img
            src={cross} style={{color: 'green', position: 'absolute', top: props.canvasHeight/2-10, left: props.canvasHeight/2-10}}
        height={20} width={20}/>
            {props.targets.map(renderTarget)}
        <div style={{display: 'flex', flexDirection: 'column', margin: '5px 10px', width: '80%'}}>
            <FormattedMessage id='worksheetDesc' />
            {props.equationSteps.map(renderEquation)}
        </div>
    </div>);
}

export default PrintPage;
