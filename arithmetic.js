/*
  Arithmetic service can generate a set of unique equations for given numbers and
  operations, based on complexity. It can work with zeroes and ones, but equations
  will be dreary.

  The operations are encoded as '+'' - addition, '-' - substraction,
  '*' - multiplication,  ':' - division.
  Complexity may be 10 for equations in range [0..10], 25 - range [0..25],
  100 - range [0..100].
  Numbers are natural numbers.
*/

function ArithmeticService() {

  var service = this;

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

    var generatedEquations = [];

    service.initEquations = function ()
    {
      generatedEquations = [];
    }

    service.createEquationsForNumber = function (number, operation, complexity)
    {
      var newEquations=[];
      var start = 0;
      if (number>2) start=1;
      switch (operation)
      {
        case ('+'):
          for (var kk=start; kk<=number; kk++)
            {
              var newEquation = new Equation(kk,number-kk,'+',number);
              // console.log("Adding equation "+newEquation.print());
              newEquations.push(newEquation);
            }
            return newEquations;
          case ('-'):
            for (var ss=start; ss<complexity-number+1; ss++)
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
                // console.log("Adding equation "+newEquation.print());
                newEquations.push(newEquation);
              }
            }
            return newEquations;
          case (':'):
          for (var dd=1; dd*number<complexity; dd++)
          {
            var newEquation = new Equation (dd*number, dd, ':', number);
            // console.log("Adding equation "+newEquation.print());
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
          console.log("Found number "+number);
          for (var kk=0; kk<generatedEquations[k].values.length; kk++)
          {
            if (generatedEquations[k].values[kk].operation === operation)
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
            console.log("Operation "+ operation+ " for number "+number+ " was not found, creating");
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
          //console.log("Looking up number "+ generatedEquations[n].number);
          //console.log(generatedEquations[n].values);
          for (var nn=0; nn<generatedEquations[n].values.length; nn++)
          {
            //console.log("Looking up operation "+generatedEquations[n].values[nn].operation);
            if (generatedEquations[n].values[nn].operation === operation)
            {
              //console.log("There are "+generatedEquations[n].values[nn].equations.length + " equations for number "+number+ " operation "+operation);
              //console.log(generatedEquations[n].values[nn]);
              var randomNumber = service.normalRandom(0, generatedEquations[n].values[nn].equations.length-1);
              //console.log("Random number is "+randomNumber);
              equation = generatedEquations[n].values[nn].equations[randomNumber];
              generatedEquations[n].values[nn].equations.splice(randomNumber, 1);
            }
         }
      }
    }
    return equation.print();
  }

    service.normalRandom = function (min, max)
    {
      return Math.floor((Math.random() * max) + min);
    }

}
