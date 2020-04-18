import {MapTargetObject} from "./MapTargetObject";

export const createCanvas = (context: CanvasRenderingContext2D,
                             canvasWidth: number,
                             canvasHeight: number,
                             numberRange: number,
                             targets: Array<MapTargetObject>) =>
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    let border=new Image();

    border.src=require('../../img/map-border-horizontal.png');

    border.onload=function() {
        context.drawImage(border, 0, 0, canvasWidth, canvasHeight);
    }

    let compass=new Image();
    compass.src=require('../../img/compass.png');
    compass.onload=function() {
        context.drawImage(compass, canvasWidth-100, canvasHeight-120, 60, 80);
    }

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
    stonePic.src = require('../../img/stones.png');
    stonePic.onload=function ()
    {
        for (let i=0; i<targets.length; i++)
        {
            console.log("drawing", targets[i].x, targets[i].y);
            context.drawImage(stonePic,targets[i].x*mapStep+canvasHeight/2-mapStep/2,-targets[i].y*mapStep+canvasHeight/2-mapStep/2, mapStep, mapStep*2/3);
        }
    }
};
