(function () {
'use strict';

angular.module ('EquationsGenerator', [])
.controller ('EquationsGeneratorController', EquationsGeneratorController)
.service('EquationsGeneratorService', EquationsGeneratorService)
.service('ArithmeticService', ArithmeticService);

EquationsGeneratorController.$inject = ['EquationsGeneratorService'];
EquationsGeneratorService.$inject = ['ArithmeticService'];

function EquationsGeneratorController (EquationsGeneratorService)
{
  var equationsGenerator = this;
  equationsGenerator.equations = [];
  equationsGenerator.operations = [
    {code: "a", value: "+", selected: true},
    {code: "s", value: "-", selected: true},
    {code: "m", value: "*", selected: true},
    {code: "d", value: ":", selected: true}
  ];

  equationsGenerator.targets = [];

  // equationsGenerator.targetpics = ['blue.png', 'green.png', 'red.png', 'yellow.png'];
  equationsGenerator.targetpics = ['stones.png', 'stones.png', 'stones.png', 'stones.png'];

  equationsGenerator.errorMessage="";

  equationsGenerator.complexity="20";

  equationsGenerator.createEquations = function ()
  {
    var selectedOps=[];
    for (var i = 0; i < equationsGenerator.operations.length; i++)
    {
    if (equationsGenerator.operations[i].selected)
      {
        selectedOps.push(equationsGenerator.operations[i].code);
        console.log(equationsGenerator.operations[i].value);
      }
    }

    if (selectedOps.length === 0)
    {
      equationsGenerator.errorMessage="Выберите арифметическую операцию";
      console.log(equationsGenerator.errorMessage);
    } else {
    equationsGenerator.errorMessage="";
    var targetCoordinates = EquationsGeneratorService.initTargets();

    for (var i=0; i<targetCoordinates.length; i++)
    {
       var targetCoordinate = targetCoordinates[i];
       console.log("Creating target: "+targetCoordinate.x+","+targetCoordinate.y+ ", pic: "+ equationsGenerator.targetpics[i]);

       var leftOffset = targetCoordinate.x*20+250;
       var topOffset=-targetCoordinate.y*20+250;

       var tstyle = {position: 'absolute', top: topOffset, left: leftOffset};
       equationsGenerator.targets.push({style: tstyle, pic: equationsGenerator.targetpics[i]} );
    }

    console.log("Lets create some equations for complexity "+equationsGenerator.complexity);
    equationsGenerator.equations = [];
    equationsGenerator.equations = EquationsGeneratorService.createEquations(selectedOps, equationsGenerator.complexity);
    }

    //working with a canvas

    var canvas = document.getElementById("treasureMapC");

    var context = canvas.getContext("2d");
    var gridPic       = new Image();
    gridPic.src    = 'img/grid10.png';
    gridPic.onload = function() {
        context.drawImage(gridPic, 0, 0);
      }

    var targetPics=[];
    targetPics[0] = new Image();
    targetPics[0].src='img/'+equationsGenerator.targetpics[0];
    var i=0;
    targetPics[0].onload=function() {
    context.drawImage(this,targetCoordinates[i].x*20+250,-targetCoordinates[i].y*20+250);
    if (i<targetCoordinates.length)
      i++;
      targetPics[i]=new Image();
      targetPics[i].src='img/'+equationsGenerator.targetpics[i];
      targetPics[i].onload=this.onload;
    };

  };


  equationsGenerator.reset = function() {
    console.log("Erasing!");
    equationsGenerator.equations = [];
    equationsGenerator.targets = [];
  }

  equationsGenerator.alterOps = function()
  {
    if (equationsGenerator.complexity<20)
    {
      for (var i = 0; i < equationsGenerator.operations.length; i++)
      {
      if ((equationsGenerator.operations[i].code === 'm')||(equationsGenerator.operations[i].code === 'd'))
        {
          equationsGenerator.operations[i].selected = false;
        }
      }
    }
  }

  equationsGenerator.print = function() {
    var contentStr = "\n\n";
    ;

    for (var j=0; j<equationsGenerator.equations.length; j++)
    {
      contentStr += (j+1)+". "+ equationsGenerator.equations[j].strValue+"\n";
    }

    var canvas = document.getElementById("treasureMapC");
    var dataURL = canvas.toDataURL();
    var docDefinition = {
      content:
      [
        { text: 'Под каким камнем клад?\n\n', fontSize: 20},
        { text: 'Для того, чтобы найти спрятанный пиратами клад, решай примеры и двигайся в нужном направлении по карте, начиная из центра. \n', fontSize: 15},
        {image: dataURL},
        { text: contentStr }
    ]
    };
    pdfMake.createPdf(docDefinition).download('treasureMap.pdf');
  }

}
})();
