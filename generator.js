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

service.createBetterEquations = function (selectedOps, complexity)
{
  
  console.log("Creating operations for complexity "+complexity);
  var pathObject = new TargetObject(0,0);

  steps = [];

  for (var i=0; i<equationsAmount; i++)
  {
  }

    return steps;
}


service.createEquations = function (selectedOps, complexity)
    {
    console.log("Creating operations for complexity "+complexity);
    var pathObject = new TargetObject(0,0);

    steps = [];

    for (var i=0; i<equationsAmount; i++)
      {
          var direction="";
          var step=0;

          var directions = ['направо', 'налево', 'вверх', 'вниз'];

          if (i>(equationsAmount-2))
          {
            if (i%2==0)
              {
               step = buildCurrentStep(pathObject.x, currentTarget.x, (i===(equationsAmount-2)));

                 if (Math.sign(step) === 1) {
                     direction = "направо";
                 } else {
                     direction = "налево";
                 }
                pathObject.x +=step;

              }
              else {

                  step = buildCurrentStep(pathObject.y,currentTarget.y, (i===(fieldSize-1)));
                  if (Math.sign(step) === 1) {
                         direction = "вверх";
                     } else {
                         direction = "вниз";
                     }
                  pathObject.y += step;
              }
          } else {
            direction = directions[Math.floor(Math.random() * 4 )];
            step = ((Math.floor((Math.random() * 10))+2));
            switch (direction)
            {
              case 'направо': pathObject.x +=step;
              case 'налево': pathObject.x -=step;
              case "вверх": pathObject.y +=step;
              case 'вниз': pathObject.y -=step;
            }

          }
  /*        if (i%2==0)
              {
                do
                {
                   step = buildCurrentStep(pathObject.x, currentTarget.x, (i===(equationsAmount-2)));

                   if (Math.sign(step) === 1) {
                       direction = "направо";
                   } else {
                       direction = "налево";
                   }
                   console.log("New x is " +(Math.abs(pathObject.x)+Math.abs(step)));
               } while ((Math.abs(pathObject.x)+Math.abs(step))>fieldSize);
                 pathObject.x +=step;

              }
          else {
            do
            {
              step = buildCurrentStep(pathObject.y,currentTarget.y, (i===(fieldSize-1)));
              if (Math.sign(step) === 1) {
                     direction = "вверх";
                 } else {
                     direction = "вниз";
                 }
                 console.log("New y is "+(Math.abs(pathObject.y)+Math.abs(step)));
               } while ((Math.abs(pathObject.y)+Math.abs(step))>fieldSize);

              pathObject.y += step;
          }
*/
          var equation =
          ArithmeticService.
            buildEquationForNumber(Math.abs(step), selectedOps[i%selectedOps.length], complexity);
          equation = equation + " шагов " + direction;

          steps.push({strValue: equation});
          console.log(equation);
          console.log("Position is: "+pathObject.x+ ", "+pathObject.y);
      }

  console.log("Reached end position: "+pathObject.x+ ", "+pathObject.y);
  return steps;
}

var buildLastSteps = function (number1, number2, lastIteration)
    {
        console.log("Building step for: "+number1 +", " +number2+", "+lastIteration);
        var step=0;
        if (lastIteration)
            {
                step = number2 - number1;
            }
        else
            {
                if (number1>=number2-2)
                {
                  step= (-(Math.floor((Math.random() * 10))+2));

                }
                else
                {
                step= Math.floor((Math.random() * 10))+2;
                }
            }
        console.log("step: "+ step);
        return step;
    };

var buildCurrentStep = function (number1, number2, lastIteration)
    {
        console.log("Building step for: "+number1 +", " +number2+", "+lastIteration);
        var step=0;
        if (lastIteration)
            {
                step = number2 - number1;
            }
        else
            {
                if (number1>=number2-2)
                {
                  step= (-(Math.floor((Math.random() * 10))+2));

                }
                else
                {
                step= Math.floor((Math.random() * 10))+2;
                }
            }
        console.log("step: "+ step);
        return step;
    };
}
