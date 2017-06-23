function EquationsGeneratorService(ArithmeticService) {

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

  targetObjects = [new TargetObject(fieldSize - Math.floor((Math.random() * 10)/3),
                                    fieldSize-Math.floor((Math.random() * 10)/3)),
                       new TargetObject(fieldSize - Math.floor((Math.random() * 10)/3),
                                   -fieldSize+Math.floor((Math.random() * 10)/3)),
                       new TargetObject(-fieldSize+Math.floor((Math.random() * 10)/3),
                                   fieldSize - Math.floor((Math.random() * 10)/3)),
                       new TargetObject(-fieldSize+Math.floor((Math.random() * 10)/3),
                                    -fieldSize+Math.floor((Math.random() * 10)/3))];


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

service.createEquations = function
          (selectedOps, complexity, equationsAmount, fieldSize)
{

  var pathObject = new TargetObject(0,0);

  steps = [];
  var limit = fieldSize;

  for (var i=0; i<equationsAmount-4; i++)
  {
    var step=0;
    let direction="";
    var equation="";


    if (i%2==0)
      {
        if (complexity>fieldSize)
        {
          limit=Math.max(Math.abs(fieldSize-pathObject.x), Math.abs(-fieldSize-pathObject.x));
        }
        step=service.createStep(selectedOps[i%selectedOps.length], limit);
        if (Math.abs(pathObject.x+step)>fieldSize)
        {
          step = -step;
        }
        direction = service.setDirection(step, "horizontal");
        pathObject.x +=step;
      } else {
        if (complexity>fieldSize)
        {
          limit=Math.max(Math.abs(fieldSize-pathObject.y), Math.abs(-fieldSize-pathObject.y));
        }
        step=service.createStep(selectedOps[i%selectedOps.length], limit);
        if (Math.abs(pathObject.y+step)>fieldSize)
        {
          step = -step;
        }
        direction = service.setDirection(step, "vertical");
        pathObject.y +=step;
      }
      equation =   ArithmeticService.buildUniqueEquation (Math.abs(step), selectedOps[i%selectedOps.length], complexity);
      equation = equation + " шагов " + direction;
      steps.push({step: step, operation: selectedOps[i%selectedOps.length], strValue: equation});
      console.log(i+"). "+equation);
      console.log("Position is: "+pathObject.x+ ", "+pathObject.y);
  }

  // Предпосление два шага: подходим достаточно близко к цели

  // Предпоследний горизонтальный
  let deltaX = currentTarget.x - pathObject.x;
  console.log("Delta x "+deltaX);

  if (Math.abs(deltaX)>1)
  {
     step = Math.floor(deltaX/2);
     direction = service.setDirection(step, "horizontal");
  }
  else {
    step = Math.floor(fieldSize/4) * Math.sign(currentTarget.x)*(-1);
    direction = service.setDirection(step, "horizontal");
  }

  equation =
  ArithmeticService.
    buildUniqueEquation(Math.abs(step),
    selectedOps[(equationsAmount-4)%selectedOps.length], complexity);
  equation = equation + " шагов " + direction;
  pathObject.x+=step;
  steps.push({step: step, operation: selectedOps[(equationsAmount-4)%selectedOps.length], strValue: equation});
  console.log(equation);
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  // Предпоследний вертикальный
  let deltaY = currentTarget.y - pathObject.y;
  console.log("Delta y "+deltaY);

  if (Math.abs(deltaY)>1)
  {
     step = Math.floor(deltaY/2);
     direction = service.setDirection(step, "vertical");
  }
  else {
    step = Math.floor(fieldSize/4) * Math.sign(currentTarget.y)*(-1);
    direction = service.setDirection(step, "vertical");
  }

  equation =
  ArithmeticService.
    buildUniqueEquation(Math.abs(step),
    selectedOps[(equationsAmount-3)%selectedOps.length], complexity);
  equation = equation + " шагов " + direction;
  pathObject.y+=step;
  steps.push({step: step, operation: selectedOps[(equationsAmount-4)%selectedOps.length], strValue: equation});
  console.log(equation);
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  // последний горизонтальный
  let lastHorStep = currentTarget.x - pathObject.x;
  direction=service.setDirection(lastHorStep, 'horizontal');
  let lastHorEquation = ArithmeticService.
    buildUniqueEquation(Math.abs(lastHorStep),
    selectedOps[(equationsAmount-2)%selectedOps.length], complexity);
   lastHorEquation = lastHorEquation + " шагов " + direction;
  steps.push({step: step, operation: selectedOps[(equationsAmount-4)%selectedOps.length], strValue: lastHorEquation});
  console.log(lastHorEquation);
  pathObject.x+=lastHorStep;
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  // последний вертикальный
  let lastVertStep = currentTarget.y - pathObject.y;
  direction=service.setDirection(lastVertStep, 'vertical');
  let lastVertEquation = ArithmeticService.
    buildUniqueEquation(Math.abs(lastVertStep),
    selectedOps[(equationsAmount-1)%selectedOps.length], complexity);
  lastVertEquation = lastVertEquation + " шагов " + direction;
  steps.push({step: step, operation: selectedOps[(equationsAmount-4)%selectedOps.length], strValue: lastVertEquation});
  console.log(lastVertEquation);
  pathObject.y+=lastVertStep;
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  return steps;
}

service.createStep = function (operation, limit)
{
  console.log("Creating step for operation "+operation + " limit is " +limit);
  var step=0;
  var condition=true;
  if (operation === '*')
  {
      do {
        step = ArithmeticService.normalRandom(3, limit);
      } while ( ArithmeticService.isPrime(step) || (!service.isUniqueStep(step,operation)));

  }
  else {
    do {
      step = ArithmeticService.normalRandom(3, limit);
      console.log("Temporary step "+step);
    } while (!service.isUniqueStep(step,operation));
  }
  var signChange = Math.random();
  if (signChange<0.5)
  {
    step = -step;
  }
  return step;
};

  service.isUniqueStep = function(step, operation)
  {
    var isUnique = true;
    for (var j=0; j<steps.length; j++)
    {
      if ((Math.abs(steps[j].step)===step) && (steps[j].operation === operation))
      {
        return false;
      }
    }
    return isUnique;
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
