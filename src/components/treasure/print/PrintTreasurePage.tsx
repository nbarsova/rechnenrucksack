import {FormattedMessage} from 'react-intl';
import PrintEquation from "./PrintEquation";
// @ts-ignore
import Cross from "../../../img/cross.svg";
// @ts-ignore
import EasyGrid from '../../../img/map2.svg';
// @ts-ignore
import HardGrid from '../../../img/map3.svg';

import Stone from "../../../svg/Stone";
import {PrintPageProps} from "../../../types/components";
import {Equation} from "../../../types";
import {Direction, MapCoordinate} from "../types";

interface PrintTreasurePageProps extends PrintPageProps {
    stones: MapCoordinate [],
    numberRange: number,
    directions: Direction[],
    printView: boolean
}

const PrintTreasurePage = (props: PrintTreasurePageProps) => {

    const {numberRange, stones, equations, parentHeight, directions, printView} = props;

    console.log(numberRange, stones, equations, parentHeight, directions);

    const gridSrc = numberRange === 10 ? EasyGrid : HardGrid;

    // we set the stones and cross position absolutely, which works for
    const printHeightDiff = printView ? (parentHeight / 9 * 10 * 0.1) : 0;

    const renderTarget = ((target: MapCoordinate) => {
        const mapStep = (numberRange === 10) ? parentHeight / 14 : parentHeight / 28;
        const posX = parentHeight / 2 + target.x * mapStep - mapStep / 2;
        const posY = parentHeight / 2 - target.y * mapStep - mapStep / 2 + printHeightDiff;

        return <div
            key={posX + '' + posY}
            style={{
                position: 'absolute',
                top: posY,
                left: posX
            }}>
            <Stone
                height={mapStep}
                width={mapStep}/></div>
    });

    const renderEquation = (equation: Equation, index: number) => {
        return <PrintEquation equation={equation} direction={directions[index]} index={index} showAnswers={false}/>;
    };


    return (<div className='flexRow' style={{width: 3 * parentHeight / 2 + 'px'}}>
        <img
            src={gridSrc} height={parentHeight + 'px'} width={parentHeight + 'px'}/>
        <img
            src={Cross}
            style={{
                position: 'absolute',
                top: parentHeight / 2 + printHeightDiff - (printView ? 0 : 10),
                left: parentHeight / 2 - 10
            }}
            height={20} width={20}/>
        {stones.map(renderTarget)}
        <div className="printPageText">
            <span className='printEquation'><FormattedMessage id='worksheetDesc1'/></span>
            <span className='printEquation'><FormattedMessage id='worksheetDesc2'/></span>
            <span className='printEquation'><FormattedMessage id='worksheetDesc3'/></span>
            {equations.map(renderEquation)}
        </div>
    </div>);
}

export default PrintTreasurePage;
