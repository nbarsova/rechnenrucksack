EquationsGeneratorController.$inject =
  ['$q', 'EquationsGeneratorService', 'PrintService', 'TreasureMapDrawingService', 'LanguageService'];

function EquationsGeneratorController
    ($q, EquationsGeneratorService, PrintService, TreasureMapDrawingService, LanguageService)
{
  var equationsGenerator = this;

  // Complexity setting objects

  equationsGenerator.easyComplexity = 1;

  equationsGenerator.advancedComplexity={
    complexity:10,
    equationsAmount:6,
    fieldSize:5,
    operations: [
    {code: "+", value: "+", selected: true, available:true},
    {code: "-", value: "-", selected: true, available:true},
    {code: "*", value: "*", selected: false, available:true},
    {code: ":", value: ":", selected: false, available:true}
  ]};

  equationsGenerator.generationOptions =
  {
    pageOrientation: 'landscape',
    answerGeneration: true,
    nameDate: false
  };

  equationsGenerator.generationAllowed = true;

  // Language related objects
  equationsGenerator.language="ru";
  equationsGenerator.STRINGS = LanguageService.findDictionary(equationsGenerator.language);

  // Objects to be generated for the map (language independent)
  equationsGenerator.steps = []; // pure numbers - steps to the goal
  equationsGenerator.targetCoordinates = []; // four random targets
  equationsGenerator.equations = [];
  equationsGenerator.currentTarget;

  equationsGenerator.changeComplexity = function ()
  {
    EquationsGeneratorService.changeComplexity();

    switch (equationsGenerator.easyComplexity)
    {
      case ('1'): // easy, addition and substraction 0-10
        equationsGenerator.advancedComplexity.complexity=10;
        equationsGenerator.advancedComplexity.equationsAmount=6;
        equationsGenerator.advancedComplexity.fieldSize=5;
        for (var i=0; i<equationsGenerator.advancedComplexity.operations.length; i++)
        {
          if ((equationsGenerator.advancedComplexity.operations[i].value==="*") ||
            (equationsGenerator.advancedComplexity.operations[i].value===":"))
              {
                equationsGenerator.advancedComplexity.operations[i].selected = false;
              }

          if ((equationsGenerator.advancedComplexity.operations[i].value==="+") ||
            (equationsGenerator.advancedComplexity.operations[i].value==="-"))
              {
                equationsGenerator.advancedComplexity.operations[i].selected = true;
            }
        }
        break;

      case ('2'):
        equationsGenerator.advancedComplexity.complexity=25;
        equationsGenerator.advancedComplexity.equationsAmount=8;
        equationsGenerator.advancedComplexity.fieldSize=10;
        for (var i=0; i<equationsGenerator.advancedComplexity.operations.length; i++)
        {
          if ((equationsGenerator.advancedComplexity.operations[i].value==="*") ||
            (equationsGenerator.advancedComplexity.operations[i].value===":"))
              {
                equationsGenerator.advancedComplexity.operations[i].selected = false;
              }

          if ((equationsGenerator.advancedComplexity.operations[i].value==="+") ||
            (equationsGenerator.advancedComplexity.operations[i].value==="-"))
              {
                equationsGenerator.advancedComplexity.operations[i].selected = true;
              }
        }
        break;

      case ('3'):
        equationsGenerator.advancedComplexity.complexity=25;
        equationsGenerator.advancedComplexity.equationsAmount=10;
        equationsGenerator.advancedComplexity.fieldSize=10;
        for (var i=0; i<equationsGenerator.advancedComplexity.operations.length; i++)
        {
           equationsGenerator.advancedComplexity.operations[i].selected = true;
        }
        break;

      case ('100'):
        if (Number(equationsGenerator.advancedComplexity.complexity)===10)
        {
          equationsGenerator.advancedComplexity.fieldSize=5;
          for (var i=0; i<equationsGenerator.advancedComplexity.operations.length; i++)
          {
            if ((equationsGenerator.advancedComplexity.operations[i].value==="*") ||
              (equationsGenerator.advancedComplexity.operations[i].value===":"))
                {
                  equationsGenerator.advancedComplexity.operations[i].available = false;
                  equationsGenerator.advancedComplexity.operations[i].selected = false;
                }
          }

        }
        if (Number(equationsGenerator.advancedComplexity.complexity)===25)
        {
          equationsGenerator.advancedComplexity.fieldSize=10;
          for (var i=0; i<equationsGenerator.advancedComplexity.operations.length; i++)
          {
            if ((equationsGenerator.advancedComplexity.operations[i].value==="*") ||
              (equationsGenerator.advancedComplexity.operations[i].value===":"))
                {
                  equationsGenerator.advancedComplexity.operations[i].available = true;
                  }
          }
      }
      equationsGenerator.alterOperations();
        break;
    }

  }

    equationsGenerator.createEquations = function ()
  {
    console.log(equationsGenerator.advancedComplexity.operations);
    var selectedOps=[];
    for (var i = 0; i < equationsGenerator.advancedComplexity.operations.length; i++)
    {
    if (equationsGenerator.advancedComplexity.operations[i].selected)
      {
        selectedOps.push(equationsGenerator.advancedComplexity.operations[i].code);
      }
    }

    if (selectedOps.length === 0)
    {
      equationsGenerator.errorMessage=equationsGenerator.STRINGS.noOperationsMessage;
      equationsGenerator.generationAllowed = false;
    } else {

      equationsGenerator.errorMessage="";
      equationsGenerator.generationAllowed = true;
      equationsGenerator.targetCoordinates = EquationsGeneratorService.initTargets(equationsGenerator.advancedComplexity.fieldSize);
      equationsGenerator.currentTarget =   equationsGenerator.targetCoordinates[Math.floor((Math.random() * 10)/3)];

      var options = {};

      if ((selectedOps.length === 1)&&(selectedOps[0]==="*"))
      {
        options = {noPrimes: true}
      }
      equationsGenerator.steps = EquationsGeneratorService.createPathToCurrentTarget
      (equationsGenerator.advancedComplexity.complexity,
       equationsGenerator.advancedComplexity.equationsAmount,
       equationsGenerator.advancedComplexity.fieldSize,
       equationsGenerator.currentTarget,
       options,
       equationsGenerator.language);

       console.log(equationsGenerator.steps);
       equationsGenerator.equations = [];

      var pr = EquationsGeneratorService.createEquationsFromPath(equationsGenerator.steps, equationsGenerator.advancedComplexity.complexity, equationsGenerator.language, selectedOps);

      pr.then(function (result)
      {
        equationsGenerator.equations = result;
        TreasureMapDrawingService.createCanvas(equationsGenerator.targetCoordinates,
                                               equationsGenerator.advancedComplexity.fieldSize,
                                               equationsGenerator.equations,
                                                equationsGenerator.language);
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

  equationsGenerator.alterOperations = function()
  {
  var operationSelected = false;
    for (var i = 0; i < equationsGenerator.advancedComplexity.operations.length; i++)
    {
      if (equationsGenerator.advancedComplexity.operations[i].selected)
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
    PrintService.print(canvas, equationsGenerator.language);
  }

  equationsGenerator.translate = function ()
  {
    equationsGenerator.STRINGS = LanguageService.findDictionary(equationsGenerator.language);
    if (equationsGenerator.steps.length>0)
    {
      TreasureMapDrawingService.createCanvas(equationsGenerator.targetCoordinates,
                                             equationsGenerator.advancedComplexity.fieldSize,
                                             equationsGenerator.equations,
                                             equationsGenerator.language);
      }

     if (equationsGenerator.errorMessage!=="")
      {
        equationsGenerator.errorMessage = equationsGenerator.STRINGS.noOperationsMessage;
      }
   }

}
