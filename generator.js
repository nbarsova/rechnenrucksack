function EquationsGeneratorService(ArithmeticService) {

  var service = this;

  var fieldSize = 10; // possibilities 10, 15, 20

/*
    10 - equations in [1..10]
    20 - equations in [1..20]
    99 - all two-digit numbers
*/

  var equationsAmount = 10; // possibilities 5, 10, 12, 15

  var steps = [];

  var targetObjects = [];
  var currentTarget;

// later: to be chosen by user, now - all of them

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
//            console.log("Created object with coordinates: "+x +" ,"+y);
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

service.createEquations = function (selectedOps, complexity)
    {
    console.log("Creating operations for complexity "+complexity);
    var pathObject = new TargetObject(0,0);

    steps = [];

    for (var i=0; i<fieldSize; i++)
      {
          var direction="";
          var step=0;
          if (i%2==0)
              {
                 step = buildCurrentStep(pathObject.x, currentTarget.x, (i===(fieldSize-2)));

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

          var equation =
          ArithmeticService.
            buildEquationForNumber(Math.abs(step), selectedOps[i%selectedOps.length], complexity);
          equation = equation + " шагов " + direction;

          steps.push({strValue: equation});
          console.log("Position is: "+pathObject.x+ ", "+pathObject.y);
      }

  console.log("Reached end position: "+pathObject.x+ ", "+pathObject.y);
  return steps;
}

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
