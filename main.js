(function () {
'use strict';

angular.module ('EquationsGenerator', [])
.controller ('EquationsGeneratorController', EquationsGeneratorController)
.service('EquationsGeneratorService', EquationsGeneratorService)
.service('ArithmeticService', ArithmeticService);

EquationsGeneratorController.$inject = ['$q', 'EquationsGeneratorService'];

function EquationsGeneratorController ($q, EquationsGeneratorService)
{
  var equationsGenerator = this;
  equationsGenerator.equations = [];
  equationsGenerator.generationAllowed = true;
  equationsGenerator.operations = [
    {code: "+", value: "+", selected: true},
    {code: "-", value: "-", selected: true},
    {code: "*", value: "*", selected: true},
    {code: ":", value: ":", selected: true}
  ];

  // equationsGenerator.targetpics = ['blue.png', 'green.png', 'red.png', 'yellow.png'];
  equationsGenerator.targetpics = ['stones.png', 'stones.png', 'stones.png', 'stones.png'];

  equationsGenerator.errorMessage="";

  equationsGenerator.complexity=25;

  equationsGenerator.equationsAmount=6;

  equationsGenerator.fieldSize=10;
  equationsGenerator.mapStep = 20;

  equationsGenerator.createEquations = function ()
  {
    var selectedOps=[];
    for (var i = 0; i < equationsGenerator.operations.length; i++)
    {
    if (equationsGenerator.operations[i].selected)
      {
        selectedOps.push(equationsGenerator.operations[i].code);
      }
    }

    if (selectedOps.length === 0)
    {
      equationsGenerator.errorMessage="Выберите арифметическую операцию";
      console.log(equationsGenerator.errorMessage);
    } else {
    equationsGenerator.errorMessage="";
    console.log("Field size "+equationsGenerator.fieldSize);
    console.log(targetCoordinates);
    var targetCoordinates = EquationsGeneratorService.initTargets(equationsGenerator.fieldSize);

    if (equationsGenerator.fieldSize==="5")
    {
      equationsGenerator.mapStep = 40;
    }

    var justSteps = EquationsGeneratorService.createPathToCurrentTarget (equationsGenerator.complexity, equationsGenerator.equationsAmount, equationsGenerator.fieldSize);

    equationsGenerator.equations = [];

    var pr = EquationsGeneratorService.createEquationsFromPath(justSteps, equationsGenerator.complexity, selectedOps);

    pr.then(function (result)
    {
      console.log("Inside then");
      equationsGenerator.equations = result;
      equationsGenerator.createCanvas(targetCoordinates);
    },
    function (errorResponse) {
        console.log("Inside error response");
        console.log(errorResponse);
        console.log("Starting new generation");
        equationsGenerator.createEquations();
    });

    }
    };


    equationsGenerator.createCanvas = function (targetCoordinates)
    {
    var canvas = document.getElementById("treasureMapC");

    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

      //drawing a map grid
      context.strokeStyle = '#888888';
      context.lineWidth = 1;

      for (var ik=20; ik<=500; ik+=equationsGenerator.mapStep)
        {
          context.beginPath();
          context.moveTo(ik,15);
          context.lineTo(ik,505);
          context.stroke();
        }

        for (var j=20; j<=500; j+=equationsGenerator.mapStep)
        {
          context.beginPath();
          context.moveTo(15, j);
          context.lineTo(505, j);
          context.stroke();
        }

        // a dot in the center

        context.strokeStyle = '#000000';
        context.lineWidth = 10;

        context.beginPath();
        context.moveTo(258, 258);
        context.lineTo(262, 262);
        context.stroke();

    var targetPics=[];
    targetPics[0] = new Image();
    targetPics[0].src='img/'+equationsGenerator.targetpics[0];
    var i=0;
    targetPics[0].onload=function() {
    context.drawImage(this,targetCoordinates[i].x*equationsGenerator.mapStep+250,-targetCoordinates[i].y*equationsGenerator.mapStep+250);
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
  }

  equationsGenerator.alterComplexity = function()
  {
    EquationsGeneratorService.changeComplexity();

    if (equationsGenerator.complexity<25)
    {
      for (var i = 0; i < equationsGenerator.operations.length; i++)
      {
      if ((equationsGenerator.operations[i].code === '*')||(equationsGenerator.operations[i].code === ':'))
        {
          equationsGenerator.operations[i].selected = false;
        }
      }
      if (equationsGenerator.equationsAmount>8) equationsGenerator.equationsAmount=6;
    }
  }

  equationsGenerator.alterOperations = function()
  {
  var operationSelected = false;
    for (var i = 0; i < equationsGenerator.operations.length; i++)
    {
      if (equationsGenerator.operations[i].selected)
      {
        operationSelected = true;
      }
    }

    if (operationSelected === false)
    {
      equationsGenerator.generationAllowed=false;
      equationsGenerator.errorMessage="Выберите арифметическую операцию";
    } else
    {
      equationsGenerator.generationAllowed=true;
      equationsGenerator.errorMessage="";
    }
  }

  equationsGenerator.print = function() {
    var contentStr = "\n";
    ;

    for (var j=0; j<equationsGenerator.equations.length; j++)
    {
      contentStr += (j+1)+"). "+ equationsGenerator.equations[j].strValue+"\n\n";
    }

    var canvas = document.getElementById("treasureMapC");
    var dataURL = canvas.toDataURL();
    var docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content:
      [
        { text: 'Под каким камнем клад?\n\n',
        style: 'header'
        },
        { text: 'Пираты закопали клад под камнем, но под каким? Для того, чтобы найти нужный камень, реши примеры и двигайся в указанном направлении, начиная из центра. \n'},

        {
			alignment: 'justify',
			columns: [
        { image: dataURL,
          width: 400,
  			  },
				{ text: contentStr }
			]
		}
  ],
  styles: {
		header: {
			fontSize: 20,
			bold: true
		}
	},
  defaultStyle: {
    fontSize: 16,
		columnGap: 20,
	}

    };
    pdfMake.createPdf(docDefinition).download('treasureMap.pdf');
  }

}
})();
