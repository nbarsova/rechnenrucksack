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

  equationsGenerator.advancedComplexity= {value: 2,
                                          complexity: 25,
                                          equationsAmount: 8,
                                          generateEquations: true,
                                          fieldSize: 10 };
  equationsGenerator.advancedComplexityChange = function ()
  {
    console.log("Changing complexity " +equationsGenerator.advancedComplexity.value);

    switch (equationsGenerator.advancedComplexity.value)
    {
      case ('0'):
        equationsGenerator.advancedComplexity.complexity = 10;
        equationsGenerator.complexity=10;
        equationsGenerator.equationsAmount = 6;
        equationsGenerator.advancedComplexity.equationsAmount = 6;
        equationsGenerator.fieldSize=5;
        equationsGenerator.advancedComplexity.fieldSize = 5;
        equationsGenerator.advancedComplexity.generateEquations = false;
        for (var i = 0; i < equationsGenerator.operations.length; i++)
        {
        if ((equationsGenerator.operations[i].code === '*')||(equationsGenerator.operations[i].code === ':'))
          {
            equationsGenerator.operations[i].selected = false;
          }
        }
        break;
    case ('1'):
        equationsGenerator.advancedComplexity.complexity = 10;
        equationsGenerator.complexity=10;
        equationsGenerator.equationsAmount = 6;
        equationsGenerator.advancedComplexity.equationsAmount = 6;
        equationsGenerator.fieldSize=5;
        equationsGenerator.advancedComplexity.fieldSize = 5;
        equationsGenerator.advancedComplexity.generateEquations = true;
        for (var i = 0; i < equationsGenerator.operations.length; i++)
        {
        if ((equationsGenerator.operations[i].code === '*')||(equationsGenerator.operations[i].code === ':'))
          {
            equationsGenerator.operations[i].selected = false;
          }
        }
        break;
    case ('2'):
        equationsGenerator.advancedComplexity.complexity = 25;
        equationsGenerator.complexity=25;
        equationsGenerator.equationsAmount = 8;
        equationsGenerator.advancedComplexity.equationsAmount = 8;
        equationsGenerator.fieldSize=10;
        equationsGenerator.advancedComplexity.fieldSize = 10;
        equationsGenerator.advancedComplexity.generateEquations = true;

    case ('3'):
        equationsGenerator.advancedComplexity.complexity = 99;
        equationsGenerator.complexity=99;
        equationsGenerator.equationsAmount = 10;
        equationsGenerator.advancedComplexity.equationsAmount = 10;
        equationsGenerator.fieldSize=10;
        equationsGenerator.advancedComplexity.fieldSize = 10;
        equationsGenerator.advancedComplexity.generateEquations = true;
      }
  }

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
      console.log("complexity "+equationsGenerator.complexity);

      var targetCoordinates = EquationsGeneratorService.initTargets(equationsGenerator.fieldSize);
      var options = {};

      if ((selectedOps.length === 1)&&(selectedOps[0]==="*"))
      {
        options = {noPrimes: true}
      }
      var justSteps = EquationsGeneratorService.createPathToCurrentTarget (equationsGenerator.complexity, equationsGenerator.equationsAmount, equationsGenerator.fieldSize, options);

      equationsGenerator.equations = [];

      var pr = EquationsGeneratorService.createEquationsFromPath(justSteps, equationsGenerator.complexity, selectedOps);

      pr.then(function (result)
      {
        equationsGenerator.equations = result;
        equationsGenerator.createCanvas(targetCoordinates);
      },
      function (errorResponse) {
          console.log(errorResponse);
          console.log("Starting new generation");
          equationsGenerator.createEquations();
      });

      }
      };


    equationsGenerator.initializeExample = function ()
    {
      console.log("Initializing sample map");
      var canvas = document.getElementById("treasureMapExample");

      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = '#888888';
      context.lineWidth = 1;

      for (var ik=40; ik<=220; ik+=40)
          {
            context.beginPath();
            context.moveTo(ik,15);
            context.lineTo(ik,205);
            context.stroke();
          }

        for (var j=40; j<=220; j+=40)
          {
            context.beginPath();
            context.moveTo(15, j);
            context.lineTo(205, j);
            context.stroke();
          }

          var image = new Image();
          image.src='img/stones.png';
          image.onload=function() {
          context.drawImage(this,65,65);
    }

      context.strokeStyle = 'blue';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(200, 162);
      context.lineTo(80, 162);
      context.stroke();
      context.moveTo(86, 156);
      context.lineTo(80, 162);
      context.stroke();
      context.moveTo(86, 168);
      context.lineTo(80, 162);
      context.stroke();
      context.moveTo(78, 162);
      context.lineTo(78, 82);
      context.stroke();
      context.moveTo(72, 90);
      context.lineTo(78, 82);
      context.stroke();
      context.moveTo(84, 90);
      context.lineTo(78, 82);
      context.stroke();

      context.font = "20px PT Sans";
      context.fillText("Под каким камнем клад? ",220,20);
      context.font = "18px PT Sans";
      context.fillText("1 + 2 = _  шага налево ",220,60);
      context.fillText("6 - 4 = _  шага вверх", 220,90);
      context.font = "30px  Indie Flower";
      context.fillStyle = "blue";
      context.fillText("3", 275, 60);
      context.fillText("2", 275, 90);
  }

    equationsGenerator.createCanvas = function (targetCoordinates)
    {
      var mapStep=20;

      if (Number(equationsGenerator.fieldSize)===5)
      {
        mapStep = 40;
      } else if (Number(equationsGenerator.fieldSize)===10)
      {
        mapStep = 20;
      }

    var canvas = document.getElementById("treasureMapC");

    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

      //drawing a map grid
      context.strokeStyle = '#888888';
      context.lineWidth = 1;

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
    context.drawImage(this,targetCoordinates[i].x*mapStep+250,-targetCoordinates[i].y*mapStep+250);
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

    if ((equationsGenerator.complexity<25)||(equationsGenerator.fieldSize<10))
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
