(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('ArithmeticService', ArithmeticService);
/**
  * Arithmetic service can generate a set of unique equations for given numbers and
  * operations, based on complexity. It can work with zeroes and ones, but equations
  * will be dreary.

  * The operations are encoded as '+'' - addition, '-' - substraction,
  * '*' - multiplication,  ':' - division.
  * Complexity may be 10 for equations in range [0..10], 25 - range [0..25],
  * 100 - range [0..100].
  * Numbers are expected to be natural numbers.
  *
  * @param $q promises service
**/

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
        return (this.number1+" "+ this.operation+" "+this.number2);
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

    service.initEquations = function ()
    {
      generatedEquations = [];
    }

    service.createEquationSet = function(steps, operations, complexity)
    {
      try {
      if (steps.length<=0)
      {
        throw new Error ("Incorrect input, number list empty");
      }

      if (operations.length<=0)
      {
        throw new Error ("Incorrect input, operation list empty");
      }

      if (isNaN(complexity))
      {
        throw new Error ("Incorrect input, complexity is not a number");
      }
  //    console.log(steps);
      var deferred = $q.defer();
      var equationsSet = [];

      var opTreshold = Math.floor(steps.length/operations.length)+1;
      var adN=0;
      var subN=0;
      var multN=0;
      var divN=0;
      var tresholds=[];

      for (var ii=0; ii<operations.length; ii++)
      {
        switch (operations[ii])
          {
            case (Operation.ADD):
              adN=opTreshold;
            case (Operation.SUB):
              subN=opTreshold;
            case (Operation.MULT):
              multN=opTreshold;
            case (Operation.DIV):
              divN=opTreshold;
          }
      }

      tresholds.push({op: Operation.ADD, treshold: adN});
      tresholds.push({op: Operation.SUB, treshold: subN});
      tresholds.push({op: Operation.MULT, treshold: multN});
      tresholds.push({op: Operation.DIV, treshold: divN});

      for (var i=0; i<steps.length; i++)
        {
          if (steps[i]>Number(complexity))
          {
            deferred.reject("Step is more than complexity, need to regenerate steps");
          } else {

            var exclusions = [];

          // если число простое - выкидываем умножение
            if (service.isPrime(steps[i]))
            {
              exclusions.push(Operation.MULT);
            }

          // если число = границе сложности - выкидываем вычитание
            if (steps[i]===complexity)
            {
              exclusions.push('-');
            }

          // если число < 4 - выкидываем сложение

            if (steps[i]<4)
            {
              exclusions.push('+');
            }

          // если число >10, выкидываем деление

            if (steps[i]>10)
            {
              exclusions.push(':');
            }

          var currentOp = service.selectOperation (operations, exclusions, tresholds);
          //console.log("The step is "+steps[i]+ " operation is "+ currentOp);

          equationsSet.push(service.buildUniqueEquation(steps[i], currentOp, complexity));

          //update tresholds
          for (var j=0; j<tresholds.length; j++)
          {
            if ((tresholds[j].op===currentOp)&&(tresholds[j].treshold>0))
            {
              tresholds[j].treshold--;
            }
          }
        }


        }
  //      console.log(equationsSet);
        deferred.resolve(equationsSet);
      }

      catch (error)
      {
        deferred.reject(error);
      }
    return deferred.promise;

    }

    service.selectOperation=function (operations, exclusions, tresholds)
    {
      if (operations.length === 1) return operations[0]
      else {
        var selectedOp;
        var maxTreshold=0;

        for (var i=0; i<operations.length; i++)
        {
          var op=operations[i];
          var excluded = false;

          for (var ii=0; ii<exclusions.length; ii++)
          {
            if (exclusions[ii]===op) excluded=true;
          }

          if (!excluded)
          {
            for (var iii=0; iii<tresholds.length; iii++)
            {
              if ((tresholds[iii].op===op)&&(tresholds[iii].treshold!==0)&&(maxTreshold<tresholds[iii].treshold))
                  {
                    maxTreshold = tresholds[iii].treshold;
                    selectedOp = tresholds[iii].op;
                  }
              }
            }
          }
          if (typeof (selectedOp) ==='undefined')
          {
            let randomNum = this.normalRandom(0, operations.length-1);
            //console.log("Random number "+ randomNum);
            selectedOp = operations[randomNum];
          }
          //console.log(selectedOp);
          return selectedOp;
      }
    }


    service.createEquationsForNumber = function (number, operation, complexity)
    {
      switch (operation)
        {
          case ('+'):
              return service.createAdditionEquations(number, complexity);
          case ('-'):
              return service.createSubstractionEquations(number, complexity);
            case ('*'):
              return service.createMultiplicationEquations(number, complexity);
            case (':'):
              return service.createDivisionEquations(number, complexity);
        }
    }

    service.buildUniqueEquation = function (number, operation, complexity)
    {
      // console.log("Building equation for step "+number + ", operation "+operation+ " ,complexity "+complexity);

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
            // console.log("Looking up number "+ generatedEquations[n].number);
            // console.log(generatedEquations[n].values);
            for (var nn=0; nn<generatedEquations[n].values.length; nn++)
            {
               // console.log("The value is ");
               // console.log(generatedEquations[n].values[nn]);
               // console.log("Looking up operation "+generatedEquations[n].values[nn].operation);
              if (generatedEquations[n].values[nn].operation === operation)
              {
                 // console.log("There are "+generatedEquations[n].values[nn].equations.length + " equations for number "+number+ " operation "+operation);

                if (generatedEquations[n].values[nn].equations.length===0)
                {
                   // console.log("We need to generate some new equations");
                  generatedEquations[n].values[nn].equations=service.createEquationsForNumber(number, operation, complexity);
                }

                 //console.log(generatedEquations[n].values[nn]);

                var randomNumber = service.normalRandom(0, generatedEquations[n].values[nn].equations.length-1);
                //console.log("Random number is "+randomNumber);
                equation = generatedEquations[n].values[nn].equations[randomNumber];
                generatedEquations[n].values[nn].equations.splice(randomNumber, 1);

              }
           }
        }
      }
       //console.log(generatedEquations);
        return equation.print();

  }

  service.createAdditionEquations = function (number, complexity)
  {
    var newEquations=[];

    var adstart = 0;
    if (number>2) adstart=1;

    for (var kk=adstart; kk<=number-adstart; kk++)
      {
        var newEquation = new Equation(kk,number-kk,'+',number);
        newEquations.push(newEquation);
      }
      return newEquations;
  }

  service.createSubstractionEquations = function (number, complexity)
  {
    var newEquations=[];

    var subDim=0;
    if (number===Number(complexity))
    {
      subDim=1;
    }

    for (var ss=1; ss<=complexity-number+subDim; ss++)
    {
      var newEquation = new Equation (number+ss-subDim, ss-subDim, '-', number);
      newEquations.push(newEquation);
    }
    return newEquations;
  }

  service.createMultiplicationEquations = function (number, complexity)
  {
    var newEquations=[];

    var multstart=1;
    if ((!(service.isPrime(number)))&&(number>2))
    {
      multstart = 2;
    }

    for (var mm=multstart; mm<=number/multstart; mm++)
    {
      if ((number)%mm === 0)
      {
        var newEquation = new Equation (mm, number/mm, '*', number);
        newEquations.push(newEquation);
      }
    }
    return newEquations;
  }

  service.createDivisionEquations = function (number, complexity)
  {
//    console.log("Creating division equations for number "+number +" complexity "+complexity);
    var newEquations=[];

    var divstart=1;

    if (2*number<=complexity)
    {
      divstart=2;
    }

//    console.log("Division start ="+divstart);

    for (var dd=divstart; (dd<10)&&(dd*number<=complexity); dd++)
    {
      var newEquation = new Equation (dd*number, dd, ':', number);
      newEquations.push(newEquation);
    }
    return newEquations;
  }

    /*
    A function to generate random natural number in a range.
    Negative input acceptable.
    */
    service.normalRandom = function (min, max)
    {
      if (min>max)
      {
        throw new Error ("Incorrect input, first argument "+min+" should be greater than the second " +max);
      }

      if (isNaN(min)||isNaN(max))
      {
        throw new Error ("Input must be numeric");
      }
      return Math.floor((Math.random() * (max-min+1)) + min);
    }

    /* Check if an absolute value of a number is prime */

    service.isPrime = function (number)
    {
      var isPrime = true;

      if (Math.abs(number)<=3)
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
})();
