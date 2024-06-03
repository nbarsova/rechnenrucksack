import {FormattedMessage} from 'react-intl';
import PrintEquation from "./PrintEquation";
// @ts-ignore
import Cross from "../../../img/cross.svg";
// @ts-ignore
import  EasyGrid from '../../../img/map2.svg';
// @ts-ignore
import  HardGrid from '../../../img/map3.svg';

import Stone from "../../../svg/Stone";
import {MapTargetObject} from "../classes/MapTargetObject";

const PrintTreasurePage = (props: {
    equationSteps: any,
    stones: MapTargetObject [],
    canvasHeight: number,
    numberRange: number
     }) => {
    const gridSrc = props.numberRange === 10 ? EasyGrid : HardGrid;

    const renderTarget = ((target: any)=> {
        const mapStep = (props.numberRange === 10) ? props.canvasHeight / 14 : props.canvasHeight /28;
        const posX = props.canvasHeight/2 + target.x*mapStep - mapStep/2;
        const posY = props.canvasHeight/2 - target.y*mapStep - mapStep/2;

        return <div
                    key={posX+''+posY}
                    style={{position: 'absolute',
                        top: posY,
                        left: posX}}><Stone/></div>
    });

    const renderEquation = (equationStep: any, index: number) => {
        return <PrintEquation equationStep={equationStep} index={index} key={index}/>;
    };

    return ( <div className="canvasWrapper">
        <img
            src={gridSrc} height={props.canvasHeight+'px'} width={props.canvasHeight+20+'px'}/>
        <img
            src={Cross} style={{position: 'absolute', top: props.canvasHeight/2-10, left: props.canvasHeight/2-10}}
        height={20} width={20}/>
        {props.stones.map(renderTarget)}
        <div className='printPageText'>
            <span className='printEquation'><FormattedMessage id='worksheetDesc1' /></span>
            <span className='printEquation'><FormattedMessage id='worksheetDesc2' /></span>
            <span className='printEquation'><FormattedMessage id='worksheetDesc3' /></span>
            {props.equationSteps.map(renderEquation)}
        </div>
    </div>);
}

export default PrintTreasurePage;
