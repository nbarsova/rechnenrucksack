export const createCanvas = (context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, numberRange: number) =>
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

    const startX=10;
    const startY=10;
    const fieldSize = (numberRange === 10) ? 5: 10;

    const mapStep = canvasHeight/(2*fieldSize);
    console.log(numberRange, fieldSize, mapStep);

    for (let ik=startX; ik<=canvasHeight+startX; ik+=mapStep)
    {
        context.beginPath();
        context.moveTo(ik,startY-5);
        context.lineTo(ik,canvasHeight+startX+5);
        context.stroke();
    }

    for (var j=startY; j<=canvasHeight+startY; j+=mapStep)
    {
        context.beginPath();
        context.moveTo(startX-5, j);
        context.lineTo(canvasHeight+startY+5, j);
        context.stroke();
    }

    // a cross in the center

    context.strokeStyle = '#000000';
    context.lineWidth = 3;

    context.beginPath();
    context.moveTo(canvasHeight/2+startX-6, canvasHeight/2+startY-6);
    context.lineTo(canvasHeight/2+startX+6, canvasHeight/2+startY+6);
    context.stroke();

    context.moveTo(canvasHeight/2+startX-6, canvasHeight/2+startY+6);
    context.lineTo(canvasHeight/2+startX+6, canvasHeight/2+startY-6);
    context.stroke();
};
