function SampleTreasureMap() {
  var ddo = {
    templateUrl: 'scripts/treasure/templates/sample.map.template.html',
    link: SampleTreasureMapBuilder
  };
  return ddo;
}

function SampleTreasureMapBuilder (scope, element, attrs, controller)
{

  var canvas = document.getElementById("treasureMapExample");

  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = '#888888';
  context.lineWidth = 1;

  for (var ik=80; ik<=150; ik+=20)
      {
        context.beginPath();
        context.moveTo(ik,60);
        context.lineTo(ik,150);
        context.stroke();
      }

    for (var j=80; j<=150; j+=20)
      {
        context.beginPath();
        context.moveTo(60, j);
        context.lineTo(150, j);
        context.stroke();
      }

      var image = new Image();
      image.src='img/stones.png';
      image.onload=function() {
      context.drawImage(this,65,68);
      }

  context.strokeStyle = 'blue';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(140, 120);
  context.lineTo(80, 120);
  context.stroke();
  context.moveTo(86, 126);
  context.lineTo(80, 120);
  context.stroke();
  context.moveTo(86, 114);
  context.lineTo(80, 120);
  context.stroke();
  context.moveTo(78, 120);
  context.lineTo(78, 82);
  context.stroke();
  context.moveTo(72, 90);
  context.lineTo(78, 82);
  context.stroke();
  context.moveTo(84, 90);
  context.lineTo(78, 82);
  context.stroke();

  context.font = "18px PT Sans";
  context.fillText(LanguageService.getString(scope.equationsGenerator.language, "worksheetTitle"),180,80);
  context.font = "14px PT Sans";
  context.fillText("1 + 2 = _  шага налево ",180,110);
  context.fillText("6 - 4 = _  шага вверх", 180,140);
  context.font = "20px  Indie Flower";
  context.fillStyle = "blue";
  context.fillText("3", 225, 110);
  context.fillText("2", 225, 140);

  var border=new Image();
  border.src='img/map-border-horizontal-bg.png';
  border.onload=function() {
    context.drawImage(this, 0, 0, 800, 450);
  }
}
