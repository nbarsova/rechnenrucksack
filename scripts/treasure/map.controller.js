EquationsGeneratorController.$inject =
  ['$q', 'EquationsGeneratorService', 'PrintService', 'TreasureMapDrawingService', 'LanguageService'];

function EquationsGeneratorController
    ($q, EquationsGeneratorService, PrintService, TreasureMapDrawingService, LanguageService)
{
  var equationsGenerator = this;

  // Complexity setting objects

  equationsGenerator.operations = [
    {code: "+", value: "+", selected: true},
    {code: "-", value: "-", selected: true},
    {code: "*", value: "*", selected: true},
    {code: ":", value: ":", selected: true}
  ];
  equationsGenerator.complexity=25;
  equationsGenerator.equationsAmount=6;
  equationsGenerator.fieldSize=10;
  equationsGenerator.generationAllowed = true;

  // Language related objects

  equationsGenerator.language="ru";
  equationsGenerator.STRINGS = LanguageService.findDictionary(equationsGenerator.language);

  // Objects to be generated for the map (language independent)
  equationsGenerator.steps = []; // pure numbers - steps to the goal
  equationsGenerator.targetCoordinates = []; // four random targets
  equationsGenerator.equations = [];
  equationsGenerator.currentTarget;

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
      equationsGenerator.errorMessage=equationsGenerator.STRINGS.noOperationsMessage;
    } else {

      equationsGenerator.errorMessage="";

      equationsGenerator.targetCoordinates = EquationsGeneratorService.initTargets(equationsGenerator.fieldSize);
      equationsGenerator.currentTarget =   equationsGenerator.targetCoordinates[Math.floor((Math.random() * 10)/3)];

      var options = {};

      if ((selectedOps.length === 1)&&(selectedOps[0]==="*"))
      {
        options = {noPrimes: true}
      }
      equationsGenerator.steps = EquationsGeneratorService.createPathToCurrentTarget
      (equationsGenerator.complexity,
       equationsGenerator.equationsAmount,
       equationsGenerator.fieldSize,
       equationsGenerator.currentTarget,
       options,
       equationsGenerator.language);

      equationsGenerator.equations = [];

      var pr = EquationsGeneratorService.createEquationsFromPath(equationsGenerator.steps, equationsGenerator.complexity, equationsGenerator.language, selectedOps);

      pr.then(function (result)
      {
        equationsGenerator.equations = result;
        TreasureMapDrawingService.createCanvas(equationsGenerator.targetCoordinates, equationsGenerator.fieldSize, equationsGenerator.equations);
      },
      function (errorResponse) {
          console.log(errorResponse);
          console.log("Starting new generation");
          equationsGenerator.createEquations();
      });

      }
      };

  equationsGenerator.reset = function() {
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
      equationsGenerator.errorMessage=equationsGenerator.STRINGS.noOperationsMessage;
    } else
    {
      equationsGenerator.generationAllowed=true;
      equationsGenerator.errorMessage="";
    }
  }

  equationsGenerator.print = function ()
  {
    var canvas = document.getElementById("treasureMapC");
    PrintService.print(canvas);
  }

  equationsGenerator.translate = function ()
  {
    equationsGenerator.STRINGS = LanguageService.findDictionary(equationsGenerator.language);
    if (equationsGenerator.steps.length>0)
    {
      TreasureMapDrawingService.createCanvas(equationsGenerator.targetCoordinates, equationsGenerator.fieldSize, equationsGenerator.equations);
    }
  }

}
