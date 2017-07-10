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

ArithmeticService.$inject = ['$q'];
function ArithmeticService($q) {

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

    // Map for equations already used, to keep them as diverse as possible

    var generatedEquations = [];
    var equationsSet = [];

    service.initEquations = function ()
    {
      generatedEquations = [];
    }

    service.createEquationSet = function(steps, operations, complexity)
    {

      var deferred = $q.defer();
      equationsSet = [];
      try {
        for (var i=0; i<steps.length; i++)
        {
          if (steps[i]>Number(complexity))
          {
            deferred.reject("Step is more than complexity, need to regenerate steps");
          } else {
          equationsSet.push({step: steps[i], equation: service.buildUniqueEquation(steps[i], operations[i%operations.length], complexity)});
          }
        }

        deferred.resolve(equationsSet);
      }
      catch (error)
      {
        deferred.reject(error);
      }
    return deferred.promise;

    }

    service.createEquationsForNumber = function (number, operation, complexity)
    {

      var newEquations=[];

      var adstart = 0;
      if (number>2) adstart=1;

      var subDim=0;
      if (number===Number(complexity))
      {
        subDim=1;
      }

      var multstart=1;
      if ((!(service.isPrime(number)))&&(number>2))
      {
        multstart = 2;
      }

      var divstart=2;
      if ((complexity<99)&&(number>12))
      {
        divstart=1;
      }

      switch (operation)
      {
        case ('+'):
          for (var kk=adstart; kk<=number-adstart; kk++)
            {
              var newEquation = new Equation(kk,number-kk,'+',number);
              newEquations.push(newEquation);
            }
            return newEquations;
          case ('-'):
            for (var ss=1; ss<=complexity-number+subDim; ss++)
            {
              var newEquation = new Equation (number+ss-subDim, ss-subDim, '-', number);
              newEquations.push(newEquation);
            }
            return newEquations;
          case ('*'):
            for (mm=multstart; mm<=number/multstart; mm++)
            {
              if ((number)%mm === 0)
              {
                var newEquation = new Equation (mm, number/mm, '*', number);
                newEquations.push(newEquation);
              }
            }
            return newEquations;
          case (':'):
          for (var dd=divstart; dd*number<complexity; dd++)
          {
            var newEquation = new Equation (dd*number, dd, ':', number);
            newEquations.push(newEquation);
          }
          return newEquations;
      }
    }

    service.buildUniqueEquation = function (number, operation, complexity)
    {
      console.log("Building equation for step "+number + ", operation "+operation+ " ,complexity "+complexity);

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
              if (generatedEquations[k].values[kk].operation === operation)
              {
                operationFound = true;
                if (generatedEquations[k].values[kk].equations.length === 0)
                {
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
      // console.log(generatedEquations);
        return equation.print();

  }

    /*
    A function to generate random natural number in a range
    */
    service.normalRandom = function (min, max)
    {
      return Math.floor((Math.random() * (max-min+1)) + min);
    }

    service.isPrime = function (number)
    {
      var isPrime = true;
      if (number<=3)
      {
         isPrime = true;
      } else if ((number%2 === 0)||(number%3 === 0))
      {
         isPrime = false;
      } else {
        for (var jj=5; jj*jj<number; jj=jj+6)
        {
          if ((number%jj===0)||(number%(jj+2)===0))
          {
             isPrime = false;
          }
        }
      }
      return isPrime;
    }


}
