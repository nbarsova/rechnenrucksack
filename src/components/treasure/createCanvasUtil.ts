import {MapTargetObject} from "./MapTargetObject";

import {Direction} from "./Direction";
import {StepEquation} from "./StepEquation";

export const createCanvas = (context: CanvasRenderingContext2D,
                             canvasWidth: number,
                             canvasHeight: number,
                             numberRange: number,
                             targets: Array<MapTargetObject>,
                             equations: Array<StepEquation>,
                                translations: any) =>
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    let border=new Image();

    border.src=require('../../img/map-border-horizontal.svg');

    border.onload=function() {
        context.drawImage(border, 0, 0, canvasWidth, canvasHeight);
    };

    context.strokeStyle = '#888888';
    context.lineWidth = 1;

    const start=0.06*canvasHeight;
    const end = canvasHeight - 0.06*canvasHeight;
    const fieldSize = (numberRange === 10) ? 6: 11;

    const mapStep = (end - start)/(2*fieldSize);

    for (let ik=start; ik<=end; ik+=mapStep)
    {
        context.beginPath();
        context.moveTo(ik,start-5);
        context.lineTo(ik,end+5);
        context.stroke();
    }

    for (let j=start; j<=end; j+=mapStep)
    {
        context.beginPath();
        context.moveTo(start-5, j);
        context.lineTo(end+5, j);
        context.stroke();
    }

    // a cross in the center

    context.strokeStyle = '#000000';
    context.lineWidth = 3;

    context.beginPath();
    context.moveTo((end-start)/2+start-mapStep/4, (end-start)/2+start-mapStep/4);
    context.lineTo((end-start)/2+start+mapStep/4, (end-start)/2+start+mapStep/4);
    context.stroke();

    context.moveTo((end-start)/2+start-mapStep/4, (end-start)/2+start+mapStep/4);
    context.lineTo((end-start)/2+start+mapStep/4, (end-start)/2+start-mapStep/4);
    context.stroke();

    // target pics
    let stonePic = new Image();
    stonePic.src = require('../../img/stones.svg');
    stonePic.onload=function ()
    {
        for (let i=0; i<targets.length; i++)
        {
            context.drawImage(stonePic,targets[i].x*mapStep+canvasHeight/2-mapStep/2,-targets[i].y*mapStep+canvasHeight/2-mapStep/2, mapStep, mapStep*2/3);
        }
    };
    const fontSize = 14;
    context.font = fontSize+"px PT Sans";
    const descrArr = translations.description.match(/[^\r\n]+/g);
    console.log(translations.description.length, descrArr.length);
    // context.fillText(translations.description,canvasHeight,start*3);
    for (var j=0;j<descrArr.length;j++)
    {
        console.log(descrArr[j].length);
        context.fillText(descrArr[j], canvasHeight,start*3+j*fontSize*1.5);
    }

    for (let ii=0; ii<equations.length; ii++)
    {
        let axis="";
        if (ii%2==0)
        {
            axis=Direction.HORIZONTAL;
        } else {
            axis=Direction.VERTICAL;
        }

        context.fillText((ii+1)+"). "+equations[ii].equation+" = __ "+translations.steps+" "+setDirection(equations[ii].step, axis, translations)+"\n",canvasHeight,start*3 + descrArr.length*fontSize*1.5+ii*fontSize*1.5);
    }

    let compass=new Image();
    compass.src=require('../../img/compass.png');
    compass.onload=function() {
        context.drawImage(compass, canvasWidth-100, end - mapStep*3, mapStep*2, mapStep*2.5);
    }
};

const setDirection = (number: number, direction: string, translations: any) =>
{

    switch (direction)
    {
        case Direction.VERTICAL:
            if (Math.sign(number) === 1) {
                return translations.dirUp;
            } else {
                return translations.dirDown;
            }
            break;
        case Direction.HORIZONTAL:
            if (Math.sign(number) === 1) {
                return translations.dirRight;
            } else {
                return translations.dirLeft;
            }
            break;
    }
};
