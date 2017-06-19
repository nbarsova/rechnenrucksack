/*
  Arithmetic service can generate a set of unique equations for given numbers and
  operations, based on complexity. It can work with zeroes and ones, but equations
  will be dreary.

  The operations are encoded as '+'' - addition, '-' - substraction,
  '*' - multiplication,  ':' - division.
  Complexity may be 10 for equations in range [0..10], 20 - range [0..20],
  100 - range [0..100].
  Numbers are natural numbers.
*/

function ArithmeticService() {

  var service = this;

  var equationsSet = [];

  /*
  Separate class for an equation. Equation consists of two numbers connected with
  an operation ('+'' - addition, '-' - substraction, '*' - multiplication,
  ':' - division), and the result.

  */

  class Equation
  {
      constructor(number1, number2, operation, result)
      {
          this.number1 = number1;
          this.number2 = number2;
          this.operation = operation;
          this.result = result;
      }

      print ()
      {
        return (this.number1+" "+ this.operation+" "+this.number2+" = __")
      }

      equals (newEquation)
      {
        return ((newEquation.number1 === this.number1)
          && (newEquation.number2 === this.number2)
          && (newEquation.operation === this.operation)
          && (newEquation.result === this.result));
      }

    }

  var trivialAdditionEquations =
  [
    {number: 0, values: [new Equation (0, 0, '+', 0)]},
    {number: 1, values: [new Equation (0, 1, '+', 1),
                         new Equation (1, 0, '+', 1)]},
    {number: 2, values: [new Equation (0, 2, '+', 2),
                         new Equation (2, 0, '+', 2),
                         new Equation (1, 1, '+', 2)]},
    {number: 3, values: [new Equation (0, 3, '+', 3),
                         new Equation (3, 0, '+', 3),
                         new Equation (1, 2, '+', 3),
                        new Equation (2, 1, '+', 3)]},
    {number: 4, values: [new Equation (0, 4, '+', 4),
                        new Equation (4, 0, '+', 4),
                        new Equation (1, 3, '+', 4),
                        new Equation (3, 1, '+', 4),
                        new Equation (2, 2, '+', 4)]}
  ];

  var trivialMutilplicationEquations =
  [
    {number: 0, values: [new Equation (0, 0, '*', 0)]},
    {number: 1, values: [new Equation (1, 1, '*', 1)]},
    {number: 2, values: [new Equation (1, 2, '*', 2),
                         new Equation (2, 1, '*', 2)]},
    {number: 3, values: [new Equation (1, 3, '*', 3),
                         new Equation (3, 1, '*', 3)]},
    {number: 4, values: [new Equation (1, 4, '*', 4),
                        new Equation (4, 1, '*', 4),
                        new Equation (2, 2, '*', 4)]},
    {number: 5, values: [new Equation (1, 5, '*', 5),
                         new Equation (5, 1, '*', 5)]},
    {number: 6, values: [new Equation (1, 6, '*', 6),
                         new Equation (6, 1, '*', 6),
                         new Equation (3, 2, '*', 6),
                         new Equation (2, 3, '*', 6)]},
    {number: 7, values: [new Equation (1, 7, '*', 7),
                          new Equation (7, 1, '*', 7)]}
  ];

  service.getEquationsSet = function ()
  {
    return this.equationsSet;
  }

  service.checkUnique = function (newEquation)
  {
    for (let i=0; i< this.equationsSet.length; i++)
    {
      if (this.equationsSet[i].equals(newEquation))
        return false;
    }
    return true;
  }

  service.buildEquationForNumber = function (number, operation, complexity)
      {
          console.log("Building equation for step "+number + ", operation "+operation);
          switch(operation)
              {
                  case 'a':
                      return service.buildAddition (number, complexity);
                  case 's':
                      return service.buildSubstraction (number, complexity);
                  case 'm':
                      return service.buildMultiplication (number, complexity);
                  case 'd':
                      return service.buildDivision (number, complexity);
                  default:
                      console.log("Very wrong!");
                      break;
              }

          return "";
      };

    service.buildAddition = function (number, complexity)
    {
      console.log("Inside build addition");
      var x;
      var y;

      if (number<5)
      {
        return service.buildTrivialAddition(number);
      } else {
        do {
         x = Math.floor(Math.random() * (number - 1) + 1);
         y = number - x;
       } while (y<=0);
     }

     var newEquation = new Equation (x, y, '+', number);
     return newEquation.print();

    }

    /* This method builds trivial addition equations (result <5) and makes sure
    that they will be as diverse as possible
    */

  service.buildTrivialAddition = function (number)
  {
    var trivialEquation;
    for (var k=0; k<trivialAdditionEquations.length; k++)
    {
      if (trivialAdditionEquations[k].number === number) {
        if (trivialAdditionEquations[k].values.length === 0)
        {
          console.log("Empty array, reinitializing");
          for (var kk=0; kk<trivialAdditionEquations[k].number; kk++)
          {
            var newEquation = new Equation(kk,trivialAdditionEquations[k].number-kk,'+',trivialAdditionEquations[k].number);
            console.log("Adding trivial equation "+newEquation.print());
            trivialAdditionEquations[k].values.push(newEquation);
          }
        }
      console.log(trivialAdditionEquations[k].values.length + " equations remains for number "+number);
      var randomIndex = service.normalRandom(0, trivialAdditionEquations[k].values.length-1);
      console.log("Random index is "+randomIndex);
      trivialEquation = trivialAdditionEquations[k].values[randomIndex];
      trivialAdditionEquations[k].values.splice(randomIndex, 1);

      }
    }
     return trivialEquation.print();
   }

  service.buildSubstraction = function (number, complexity)
  {
    console.log("Inside build substraction");

    var x=0;

    switch (complexity)
    {
      case "10":
        do {
            x = Math.floor(Math.random() * (9-number+1) + number+1);
         } while (x===number);
         break;
      case "20":
        do {
            x = Math.floor(Math.random() * (19-number+1) + number+1);
          } while (x===number);
        break;
      case "99":
        do{
          x = Math.floor(Math.random() * (99-number+1) + number+1);
        }   while (x===number);
        break;
    }

      var y = x - number;
      var resultString = x + " - " + y + " = __";
      return resultString;
    }

    service.buildMultiplication = function(number, complexity)
    {
      console.log("Inside build multiplication");
      var x=0;
      var resultString = "";

      if (number<7)
      {
        return service.buildTrivialMultiplication(number);
      } else {
          x = Math.floor(Math.random() * (9-number+1) + number+1);
          var y = x * number;
          var resultString = x + " * __ = " + y;
          return resultString;
      }

    }

    service.buildTrivialMultiplication = function (number)
    {
      var trivialEquation;
      for (var m=0; m<trivialMutilplicationEquations.length; m++)
      {
        if (trivialMutilplicationEquations[m].number === number) {
          if (trivialMutilplicationEquations[m].values.length === 0)
          {
            console.log("Empty array, reinitializing")
            trivialEquation = new Equation (1, 1, '*', 1);
          } else {
            console.log(trivialMutilplicationEquations[m].values.length + " equations remains for number "+number);
            var randomIndex = service.normalRandom(0, trivialMutilplicationEquations[m].values.length-1);
            console.log("Random index is "+randomIndex);
            trivialEquation =trivialMutilplicationEquations[m].values[randomIndex];
            trivialMutilplicationEquations[m].values.splice(randomIndex, 1);
            }
          }
      }
       return trivialEquation.print();
     }

    service.buildDivision = function (number, complexity)
    {
      console.log("Inside build division");
      var x=1;
      do {
      var x = Math.floor(Math.random() * (2, 10));
      var y = x * number;
    } while (x<2);
      var resultString = y + " : " + x + " = __";
      return resultString;
    }

    service.normalRandom = function (min, max)
    {
      return Math.floor((Math.random() * max) + min);
    }

}
