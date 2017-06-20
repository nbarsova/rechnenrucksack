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

    // Maps for equations already used, to keep them as diverse as possible

    var additionEquations = [];
    var substractionEquations = [];
    var multiplicationEquations = [];
    var divisionEquations = [];

    var generatedEquations = [];

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
    {number: 4, values: [new Equation (2, 2, '*', 4)]},
    {number: 5, values: [new Equation (1, 5, '*', 5),
                         new Equation (5, 1, '*', 5)]},
    {number: 6, values: [new Equation (3, 2, '*', 6),
                         new Equation (2, 3, '*', 6)]},
    {number: 7, values: [new Equation (1, 7, '*', 7),
                          new Equation (7, 1, '*', 7)]},
    {number: 8, values: [new Equation (4, 2, '*', 8),
                         new Equation (2, 4, '*', 8)]},
    {number: 9, values: [new Equation (3, 3, '*', 9)]},
    {number: 10, values: [new Equation (5, 2, '*', 10),
                         new Equation (2, 5, '*', 10)]},
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

      var equation;
      var numberExists = false;

      for (var k=0; k<additionEquations.length; k++)
      {
        if (additionEquations[k].number === number) {
          numberExists = true;
          if (additionEquations[k].values.length === 0)
          {
            console.log("Empty array for existing number, initializing");
            additionEquations[k].values = createEquationsForNumber(number, '+', complexity);
          }
        }
      }

      if (numberExists === false)
      {
        additionEquations.push ({number: number, values: createEquationsForNumber(number, '+', complexity)});
      }

      for (var n=0; n<additionEquations.length; n++)
      {
        if (additionEquations[n].number === number) {
          var randomNumber = service.normalRandom(0, additionEquations[n].values.length-1);
          equation = additionEquations[n].values[randomNumber];
          additionEquations[n].values.splice(randomNumber, 1);
        }
      }

       return equation.print();
  }

    service.createEquationsForNumber = function (number, operation, complexity)
    {
      var newEquations=[];
      switch (operation)
      {
        case ('+'):
          for (var kk=0; kk<number; kk++)
            {
              var newEquation = new Equation(kk,number-kk,'+',number);
              console.log("Adding equation "+newEquation.print());
              newEquations.push(newEquation);
            }
            return newEquations;
          case ('-'):
            for (var ss=0; ss<complexity-number; ss++)
            {
              var newEquation = new Equation (number+ss, ss, '-', number);
              console.log("Adding equation "+newEquation.print());
              newEquations.push(newEquation);
            }
            return newEquations;
          case ('*'):
            for (mm=1; mm<number; mm++)
            {
              if ((number)%mm === 0)
              {
                var newEquation = new Equation (mm, number/mm, '*', number);
                console.log("Adding equation "+newEquation.print());
                newEquations.push(newEquation);
              }
            }
            return newEquations;
          case (':'):
          for (var dd=1; dd*number<complexity; dd++)
          {
            var newEquation = new Equation (dd*number, dd, ':', number);
            console.log("Adding equation "+newEquation.print());
            newEquations.push(newEquation);
          }
          return newEquations;
      }
    }

    service.buildUniqueEquation = function (number, operation, complexity)
    {
      console.log("Building equation for step "+number + ", operation "+operation);

      var equation;
      var numberExists = false;
      var operationFound = false;
      var equationsForOperation;

      for (var k=0; k<generatedEquations.length; k++)
      {
        if (generatedEquations[k].number === number) {
          numberExists = true;
          for (var kk=0; kk<generatedEquations[k].values.length; kk++)
          {
            if (kk<generatedEquations[k].values[kk].operation === operation)
            {
              console.log("Found operation "+operation + " for number "+number);
              operationFound = true;
              if (generatedEquations[k].values[kk].equations.length === 0)
              {
                console.log("Equations list empty, reinitializing");
                generatedEquations[k].values[kk].equations = service.createEquationsForNumber (generatedEquations[k].number, operation, complexity);
              }
            }
          }

          if (operationFound === false)
          {
            generatedEquations[k].values.push({operation: operation, equations: service.createEquationsForNumber (generatedEquations[k].number, operation, complexity)});
          }
        }
      }

      if (numberExists === false)
      {
         generatedEquations.push ({number: number, values: [{operation: operation, equations: service.createEquationsForNumber(number, operation, complexity)}]});
      }

      console.log(generatedEquations);

      for (var n=0; n<generatedEquations.length; n++)
      {
        if (generatedEquations[n].number === number) {
          console.log("Looking up number "+ generatedEquations[n].number);
          console.log(generatedEquations[n].values);
          for (var nn=0; nn<generatedEquations[n].values.length; nn++)
          {
            console.log("Looking up operation "+generatedEquations[n].values[nn].operation);
            if (generatedEquations[n].values[nn].operation === operation)
            {
              //console.log("There are "+generatedEquations[n].values[nn].equations.length + " equations for number "+number+ " operation "+operation);
              console.log(generatedEquations[n].values[nn]);
              var randomNumber = service.normalRandom(0, generatedEquations[n].values[nn].equations.length-1);
              console.log("Random number is "+randomNumber);
              equation = generatedEquations[n].values[nn].equations[randomNumber];
              generatedEquations[n].values[nn].equations.splice(randomNumber, 1);
            }
         }
      }
    }
    return equation.print();
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
      var newEquation = new Equation (x, y, '-', number);
      return newEquation.print();
    }

    service.buildMultiplication = function(number, complexity)
    {
      console.log("Inside build multiplication");
      var x=0;
      var resultString = "";

      if (number<11)
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
            console.log("Empty array, reinitializing");
            for (mm=0; mm<trivialMutilplicationEquations[m].number; mm++)
            {
              if ((trivialMutilplicationEquations[m].number)%mm === 0)
              {
                trivialMutilplicationEquations[m].values.push(new Equation(mm, trivialMutilplicationEquations[m].number/mm, '*', number));
              }
            }

            if (trivialMutilplicationEquations[m].values.length === 0)
            {
              trivialMutilplicationEquations[m].values.push(new Equation(1, number, '*', number));
              trivialMutilplicationEquations[m].values.push(new Equation(number, 1, '*', number));
            }
          }

          console.log(trivialMutilplicationEquations[m].values.length + " equations remains for number "+number);
          var randomIndex = service.normalRandom(0, trivialMutilplicationEquations[m].values.length-1);
          console.log("Random index is "+randomIndex);
          trivialEquation = trivialMutilplicationEquations[m].values[randomIndex];
          trivialMutilplicationEquations[m].values.splice(randomIndex, 1);
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
