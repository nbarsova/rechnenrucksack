EquationsGeneratorService.$inject = ['$q', 'ArithmeticService'];

function EquationsGeneratorService($q, ArithmeticService) {

  var service = this;

  var steps = [];

  var targetObjects = [];

  var currentTarget;

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


   currentTarget = targetObjects[Math.floor((Math.random() * 10)/3)];
   console.log("Current target: "+currentTarget.x+" ,"+currentTarget.y);
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

service.getCurrentTarget = function()
{
  return currentTarget;
};

service.createPathToCurrentTarget = function (complexity, equationsAmount, fieldSize)
{
  var pathObject = new TargetObject(0,0);
  var step=0;
  var direction="";
  var limit = fieldSize;

  steps = [];

  for (var i=0; i<equationsAmount-4; i++)
  {
    if (i%2==0) // odd steps are horizontal
      {
        if (Number(complexity)>Number(fieldSize))
        {
            limit=Math.max(Math.abs(fieldSize-pathObject.x)-1, Math.abs(-fieldSize-pathObject.x)-1);
        }
          step=service.createUniqueStep(3, limit, pathObject.x, fieldSize);
          direction=service.setDirection(step, 'horizontal');
          steps.push({step: Math.abs(step), direction:direction});
          console.log("Step is "+ step +" direction " +direction);

          pathObject.x+=step;
      }
      else // even steps are vertical
      {
        if (complexity>fieldSize)
        {
            limit=Math.max(Math.abs(fieldSize-pathObject.y)-1, Math.abs(-fieldSize-pathObject.y)-1);
        }
          step=service.createUniqueStep(3, limit, pathObject.y, fieldSize);
          direction=service.setDirection(step, 'vertical');
          steps.push({step: Math.abs(step), direction:direction});
          console.log("Step is "+ step +" direction " +direction);

          pathObject.y+=step;
      }
      console.log("Position is "+ pathObject.x + ", "+pathObject.y);
  }

  // two steps before last, we need to get close to target, but not too close

  var deltaX = currentTarget.x-pathObject.x;
  console.log("Delta x "+deltaX);

  if (Math.abs(deltaX)<=4)
  {
    if (Number(complexity)<=Number(fieldSize))
    {
      step=Math.sign(deltaX)*(complexity-1-Math.abs(deltaX));
    } else {
      step=Math.abs(deltaX)+Number(fieldSize);
    }
  }
  else {
    if (Number(complexity)<=Number(fieldSize))
    {
      step=Math.sign(deltaX)*(Math.max(Math.floor((deltaX)/2), complexity));
    } else {
      step=Math.sign(deltaX)*(Math.abs(deltaX)-3);
    }
  }

  direction=service.setDirection(step, 'horizontal');
  console.log("Step is "+ step +" direction " +direction);

  steps.push({step: Math.abs(step), direction:direction});
  pathObject.x+=step;
  console.log("Position is "+ pathObject.x + ", "+pathObject.y);

  var deltaY=currentTarget.y-pathObject.y;
  console.log("Delta y "+deltaY);
  if (Math.abs(deltaY)<=4)
  {
    if (Number(complexity)<=Number(fieldSize))
    {
      step=Math.sign(deltaY)*(complexity-1-Math.abs(deltaY));
    } else {
      step=Math.abs(deltaY)+Number(fieldSize);
    }
  }
  else {
    if (Number(complexity)<=Number(fieldSize))
    {
      step=Math.sign(deltaY)*(Math.max(Math.floor((deltaY)/2), complexity));
    } else {
      step=Math.sign(deltaY)*(Math.abs(deltaY)-3);
    }
  }

  direction=service.setDirection(step, 'vertical');
  console.log("Step is "+ step +" direction " +direction);

  steps.push({step: Math.abs(step), direction:direction});
  pathObject.y+=step;
  console.log("Position is "+ pathObject.x + ", "+pathObject.y);

  // two last steps

  step=currentTarget.x - pathObject.x;
  direction=service.setDirection(step, 'horizontal');
  console.log("Step is "+ step +" direction " +direction);

  steps.push({step: Math.abs(step), direction:direction});
  pathObject.x+=step;
  console.log("Position is "+ pathObject.x + ", "+pathObject.y);

  step=currentTarget.y - pathObject.y;
  direction=service.setDirection(step, 'vertical');
  console.log("Step is "+ step +" direction " +direction);

  steps.push({step: Math.abs(step), direction:direction});
  pathObject.y+=step;
  console.log("Position is "+ pathObject.x + ", "+pathObject.y);

  console.log("Reached target "+ pathObject.x+", "+pathObject.y);
  console.log(steps);

  return steps;
}

service.createEquationsFromPath = function (steps, complexity, operations)
{
  var deferred = $q.defer();

  var numberSteps=[];
  for (var i=0; i<steps.length; i++)
  {
    numberSteps.push(steps[i].step)
  }
  let equations=[];

  var promise = ArithmeticService.createEquationSet(numberSteps, operations, complexity);

  promise.then(function (result)
  {
    equations = result;
    var strSteps=[];
    for (var j=0; j<equations.length; j++)
    {
      strSteps.push({strValue: equations[j].equation+" шагов "+steps[j].direction});
    }
  deferred.resolve(strSteps);
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
  console.log("Creating step for limit [" +lowerLimit+" ,"+ upperLimit+ "], coordinate "+coordinate);
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

service.setDirection = function (number, axis)
{
  let direction = "";
//  console.log("Setting direction for number "+number +" axis " + axis);
  switch (axis)
  {
  case "vertical":
      if (Math.sign(number) === 1) {
          direction = "вверх";
      } else {
          direction = "вниз";
      }
    break;
  case 'horizontal':
    if (Math.sign(number) === 1) {
          direction = "направо";
      } else {
          direction = "налево";
      }
  break;
  }
//  console.log("Direction is "+ direction);
  return direction;

};


}
