TreasureMapDrawingService.$inject = ['LanguageService'];

function TreasureMapDrawingService(LanguageService) {

  var drawingService = this;

  drawingService.createCanvas = function (targetCoordinates, fieldSize, equations, language)
  {
    var mapStep=20;

    if (Number(fieldSize)===5)
    {
      mapStep = 40;
    } else if (Number(fieldSize)===10)
    {
      mapStep = 20;
    }

  var canvas = document.getElementById("treasureMapC");

  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

    //drawing a map grid
    context.strokeStyle = '#888888';
    context.lineWidth = 1;

    var border=new Image();
    border.src='img/map-border-horizontal-bg.png';
    border.onload=function() {
      context.drawImage(this, 0, 0, 1010, 550);
    }

    var compass=new Image();
    compass.src='img/compass.png';
    compass.onload=function() {
      console.log("loaded compass");
      context.drawImage(this, 850, 380, 100, 120);
    }

    for (var ik=20; ik<=500; ik+=mapStep)
      {
        context.beginPath();
        context.moveTo(ik,15);
        context.lineTo(ik,505);
        context.stroke();
      }

      for (var j=20; j<=500; j+=mapStep)
      {
        context.beginPath();
        context.moveTo(15, j);
        context.lineTo(505, j);
        context.stroke();
      }

      // a cross in the center

      context.strokeStyle = '#000000';
      context.lineWidth = 3;

      context.beginPath();
      context.moveTo(252, 252);
      context.lineTo(268, 268);
      context.stroke();

      context.moveTo(252, 268);
      context.lineTo(268, 252);
      context.stroke();

  var targetPics=[];
  targetPics[0] = new Image();
  targetPics[0].src='img/stones.png';
  var i=0;
  targetPics[0].onload=function() {
  context.drawImage(this,targetCoordinates[i].x*mapStep+250,-targetCoordinates[i].y*mapStep+250);
  if (i<targetCoordinates.length)
    i++;
    targetPics[i]=new Image();
    targetPics[i].src='img/stones.png';
    targetPics[i].onload=this.onload;
  };

  context.font = "20px PT Sans";
  context.fillText(LanguageService.getString(language, "worksheetDesc1"),520,80);
  context.fillText(LanguageService.getString(language, "worksheetDesc2"),520,110);
  context.fillText(LanguageService.getString(language, "worksheetDesc3"), 520,140);
  context.fillText(LanguageService.getString(language, "worksheetDesc4"),520,170);

  for (var ii=0; ii<equations.length; ii++)
  {
    context.font = "20px PT Sans";
    var axis="";
    if (ii%2==0)
    {
      axis="horizontal";
    } else {
      axis="vertical";
    }

    context.fillText((ii+1)+"). "+equations[ii].equation+" "+LanguageService.getString(language, "steps")+" "+drawingService.setDirection(equations[ii].step, axis, language)+"\n",520,200+ii*30);
  }
};

drawingService.setDirection = function (number, axis, language)
{
  let direction = "";
  switch (axis)
  {
  case "vertical":
      if (Math.sign(number) === 1) {
          direction = LanguageService.getString(language, "dirUp");
      } else {
          direction = LanguageService.getString(language, "dirDown");
      }
    break;
  case 'horizontal':
    if (Math.sign(number) === 1) {
          direction = LanguageService.getString(language, "dirRight");
      } else {
          direction = LanguageService.getString(language, "dirLeft");
      }
  break;
  }
  return direction;

};
}
