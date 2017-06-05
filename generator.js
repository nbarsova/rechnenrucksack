function EquationsGeneratorService(ArithmeticService) {

  var service = this;

  var fieldSize = 10;

  var equationsAmount = 10;

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

service.initTargets = function ()
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

service.getTargetObjects = function ()
{
  return targetObjects;
};

service.getCurrentTarget = function()
{
  return currentTarget;
};

service.createBetterEquations = function
          (selectedOps, complexity, equationsAmount, fieldSize)
{

  console.log("Creating operations for complexity "+complexity);
  var pathObject = new TargetObject(0,0);

  steps = [];

  for (var i=0; i<equationsAmount-4; i++)
  {
    var step=0;
    var direction="";
    if (i%2==0)
      {
        step=service.createStep(pathObject.x, fieldSize);
        if (Math.sign(step) === 1) {
            direction = "направо";
        } else {
            direction = "налево";
        }
        pathObject.x +=step;
      } else {
        step=service.createStep(pathObject.y, fieldSize);
        if (Math.sign(step) === 1) {
               direction = "вверх";
           } else {
               direction = "вниз";
           }
           pathObject.y +=step;
      }

      var equation =
      ArithmeticService.
        buildEquationForNumber(Math.abs(step), selectedOps[i%selectedOps.length], complexity);
      equation = equation + " шагов " + direction;

      steps.push({strValue: equation});
      console.log(equation);
      console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  }

  // need something for last four steps!

  let deltaX = currentTarget.x - pathObject.x;
  console.log("Delta x "+deltaX);
  let deltaY = currentTarget.y - pathObject.y;
  console.log("Delta y "+deltaY);

  let preLastHorStep = Math.floor(Math.random() * (deltaX -1) - 1);
  if (Math.sign(preLastHorStep) === 1) {
      direction = "направо";
  } else {
      direction = "налево";
  }
  let preLastHorEquation = ArithmeticService.
    buildEquationForNumber(Math.abs(preLastHorStep), selectedOps[(equationsAmount-3)%selectedOps.length], complexity);
  preLastHorEquation = preLastHorEquation + " шагов " + direction;
  steps.push({strValue: preLastHorEquation});
  console.log(preLastHorEquation);
  pathObject.x+=preLastHorStep;
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  let preLastVertStep = Math.floor(Math.random() * (deltaY -1) - 1);
  if (Math.sign(preLastVertStep) === 1) {
         direction = "вверх";
     } else {
         direction = "вниз";
     }
    let preLastVertEquation = ArithmeticService.
    buildEquationForNumber(Math.abs(preLastVertStep), selectedOps[(equationsAmount-2)%selectedOps.length], complexity);
  preLastVertEquation = preLastVertEquation + " шагов " + direction;
  steps.push({strValue: preLastVertEquation});
  console.log(preLastVertEquation);
  pathObject.y+=preLastVertStep;
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  let lastHorStep = currentTarget.x - pathObject.x;
  if (Math.sign(lastHorStep) === 1) {
      direction = "направо";
  } else {
      direction = "налево";
  }
  let lastHorEquation = ArithmeticService.
    buildEquationForNumber(Math.abs(lastHorStep), selectedOps[(equationsAmount-1)%selectedOps.length], complexity);
   lastHorEquation = lastHorEquation + " шагов " + direction;
  steps.push({strValue: lastHorEquation});
  console.log(lastHorEquation);
  pathObject.x+=lastHorStep;
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  let lastVertStep = currentTarget.y - pathObject.y;
  if (Math.sign(preLastVertStep) === 1) {
         direction = "вверх";
     } else {
         direction = "вниз";
     }

  let lastVertEquation = ArithmeticService.
    buildEquationForNumber(Math.abs(lastVertStep), selectedOps[(equationsAmount)%selectedOps.length], complexity);
  lastVertEquation = lastVertEquation + " шагов " + direction;
  steps.push({strValue: lastVertEquation});
  console.log(lastVertEquation);
  pathObject.y+=lastVertStep;
  console.log("Position is: "+pathObject.x+ ", "+pathObject.y);

  return steps;
}

service.createStep = function (number, limit)
{
  console.log("Creating step for number: "+number+ " limit: "+ limit);
  var step=0;
  do {
    step = Math.floor(Math.random() * (2*limit)) - limit;
    console.log("Step is "+step);
    console.log("New position would be "+(step+number));
  } while ((-(limit)>(step+number))&&((step+number)>limit));
  return step;
};




}
