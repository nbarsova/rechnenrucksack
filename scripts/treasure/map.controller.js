EquationsGeneratorController.$inject = ['$q', 'EquationsGeneratorService', 'PrintService', 'TreasureMapDrawingService'];

function EquationsGeneratorController ($q, EquationsGeneratorService, PrintService, TreasureMapDrawingService)
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

  equationsGenerator.errorMessage="";

  equationsGenerator.complexity=25;

  equationsGenerator.equationsAmount=6;

  equationsGenerator.fieldSize=10;

  equationsGenerator.selectedLanguage="ru";

  equationsGenerator.translateOn = false;

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
        TreasureMapDrawingService.createCanvas(targetCoordinates, equationsGenerator.fieldSize, equationsGenerator.equations);
      },
      function (errorResponse) {
          console.log(errorResponse);
          console.log("Starting new generation");
          equationsGenerator.createEquations();
      });

      }
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

  equationsGenerator.print = function ()
  {
    var canvas = document.getElementById("treasureMapC");
    PrintService.print(canvas);
  }

}
