(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('EquationsGeneratorService', EquationsGeneratorService);

EquationsGeneratorService.$inject = ['$q', 'ArithmeticService', 'LanguageService'];

function EquationsGeneratorService($q, ArithmeticService, LanguageService) {

  var service = this;

  var steps = [];

  var targetObjects = [];

class PlayField
{
        constructor(radius) {
        this.radius = radius;
            }
}

class TargetObject
{
        constructor(x, y)
        {
            this.x = x;
            this.y = y;
        }
}

service.initTargets = function (fieldSize)
{
  var myField = new PlayField (fieldSize);

  targetObjects = [new TargetObject(fieldSize - Math.floor((Math.random() * fieldSize)/3),
                                    fieldSize-Math.floor((Math.random() * fieldSize)/3)),
                       new TargetObject(fieldSize - Math.floor((Math.random() * fieldSize)/3),
                                   -fieldSize+Math.floor((Math.random() * fieldSize)/3)),
                       new TargetObject(-fieldSize+Math.floor((Math.random() * fieldSize)/3),
                                   fieldSize - Math.floor((Math.random() * fieldSize)/3)),
                       new TargetObject(-fieldSize+Math.floor((Math.random() * fieldSize)/3),
                                    -fieldSize+Math.floor((Math.random() * fieldSize)/3))];
   return targetObjects;
};

service.changeComplexity = function ()
{
  ArithmeticService.initEquations();
}

service.getTargetObjects = function ()
{
  return targetObjects;
};

service.createPathToCurrentTarget
  = function (complexity, equationsAmount, fieldSize, currentTarget, options, language)
{
  var pathObject = new TargetObject(0,0);
  var step=0;
  var direction="";

  steps = [];

  for (var i=0; i<equationsAmount-4; i++)
  {
    var upperLimit = fieldSize;
    var lowerLimit = 3;

    if (i%2==0) // odd steps are horizontal
      {
        if (Number(complexity)>Number(fieldSize))
        {
            upperLimit=Math.max(Math.abs(fieldSize-pathObject.x)-1, Math.abs(-fieldSize-pathObject.x)-1);
            if (upperLimit>fieldSize) lowerLimit = fieldSize;
//            console.log("Limit is "+upperLimit);
        }

        if (options.noPrimes === true)
        {
          step = service.createNonPrimeStep (lowerLimit, upperLimit, pathObject.x, fieldSize);
        } else
        {
          step=service.createUniqueStep(lowerLimit, upperLimit, pathObject.x, fieldSize);
        }
          steps.push(step);
          pathObject.x+=step;
      }
      else // even steps are vertical
      {
        if (complexity>fieldSize)
        {
            upperLimit=Math.max(Math.abs(fieldSize-pathObject.y)-1, Math.abs(-fieldSize-pathObject.y)-1);
            if (upperLimit>fieldSize) lowerLimit = fieldSize;
//            console.log("Limit is "+upperLimit);
        }
        if (options.noPrimes === true)
        {
          step = service.createNonPrimeStep (lowerLimit, upperLimit, pathObject.y, fieldSize);
        } else
        {
          step=service.createUniqueStep(lowerLimit, upperLimit, pathObject.y, fieldSize);
        }

        steps.push(step);
        pathObject.y+=step;
     }
//      console.log("Position is "+ pathObject.x + ", "+pathObject.y);
  }

  // two steps before last, we need to get close to target, but not too close

    let deltaX = currentTarget.x - pathObject.x;
//    console.log("Delta x "+deltaX);

    if (Math.abs(deltaX)>3)
    {
       step = Math.floor(deltaX/2);
    }
    else {
      step = ArithmeticService.normalRandom(fieldSize, Number(fieldSize)*2-3) * Math.sign(currentTarget.x)*(-1);
    }

    pathObject.x+=step;
    steps.push(step);
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

    // Предпоследний вертикальный
    let deltaY = currentTarget.y - pathObject.y;
//    console.log("Delta y "+deltaY);

    if (Math.abs(deltaY)>3)
    {
       step = Math.floor(deltaY/2);
    }
    else {
      step = ArithmeticService.normalRandom(fieldSize, Number(fieldSize)*2-3) * Math.sign(currentTarget.y)*(-1);
    }

    pathObject.y+=step;
    steps.push(step);
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

    // последний горизонтальный
    let lastHorStep = currentTarget.x - pathObject.x;
    steps.push(lastHorStep);
    pathObject.x+=lastHorStep;
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

    // последний вертикальный
    let lastVertStep = currentTarget.y - pathObject.y;
    steps.push(lastVertStep);

    pathObject.y+=lastVertStep;
//    console.log("Position is: "+pathObject.x+ ", "+pathObject.y);
//    console.log(steps);
  return steps;
}

service.createEquationsFromPath = function (steps, complexity, language, operations)
{
  var deferred = $q.defer();

  var numberSteps=[];
  for (var i=0; i<steps.length; i++)
  {
    numberSteps.push(Math.abs(steps[i]));
  }
  let equations=[];
  var promise = ArithmeticService.createEquationSet(numberSteps, operations, complexity);

  promise.then(function (result)
  {
    var stepArr=[];
//    console.log(result);
    for (var j=0; j<result.length; j++)
    {
      var step = steps[j]
      var equation =result[j];
      stepArr.push({equation: equation, step: step});
    }
      deferred.resolve(stepArr)

  },
  function (errorResponse) {
      console.log(errorResponse);
      deferred.reject(errorResponse);
  });
    return deferred.promise;
}

service.isTarget = function (x, y)
{
  var isTarget = false;
  for (var i=0; i<targetObjects.length; i++)
  {
    if ((targetObjects[i].x===x)&&(targetObjects[i].y===y))
    {
      return true;
    }
  }
  return isTarget;
}

service.isUniqueNumberStep = function (number)
{
  var isUnique=true;
  for (var i=0; i<steps.length; i++)
  {
    if (Math.abs(steps[i].step)===Math.abs(number))
    {
      return false;
    }
  }
  return isUnique;
}

service.createUniqueStep = function (lowerLimit, upperLimit, coordinate, fieldSize)
{
//  console.log("Creating step for limit [" +lowerLimit+" ,"+ upperLimit+ "], coordinate "+coordinate);
  var step=0;
  var condition=true;
  do {
      step = ArithmeticService.normalRandom(lowerLimit, upperLimit);
      var signChange = Math.random();
      if (signChange<0.5)
      {
        step = -step;
      }
      if (Math.abs(coordinate+step)>fieldSize)
      {
          step=-step;
      }

    } while (!service.isUniqueNumberStep(step));
    return step;
}

service.createNonPrimeStep = function (lowerLimit, upperLimit, coordinate, fieldSize)
{
//  console.log("Creating step for limit [" +lowerLimit+" ,"+ upperLimit+ "], coordinate "+coordinate);
  var step=0;
  var condition=true;
  do {
      step = ArithmeticService.normalRandom(lowerLimit, upperLimit);
      var signChange = Math.random();
      if (signChange<0.5)
      {
        step = -step;
      }
      if (Math.abs(coordinate+step)>fieldSize)
      {
          step=-step;
      }
    } while (ArithmeticService.isPrime(step));
    return step;
}

}
})();
