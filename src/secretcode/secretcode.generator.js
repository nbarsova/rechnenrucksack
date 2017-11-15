(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('SecretCodeGeneratorService', SecretCodeGeneratorService);


SecretCodeGeneratorService.$inject = ['$q', 'ArithmeticService', '$translate'];

function SecretCodeGeneratorService($q, ArithmeticService, $translate) {

  var secretCodeGenerator = this;
  secretCodeGenerator.messageSymbols = [];
  secretCodeGenerator.letterCodes = [];
  secretCodeGenerator.equations = [];

  secretCodeGenerator.countSymbols = function (messageStr)
  {
//    console.log(messageStr);
    secretCodeGenerator.messageSymbols=[];
    for (var i=0; i<messageStr.length; i++)
    {
      var symbol = messageStr.charAt(i);

      if (secretCodeGenerator.isLetter(symbol)&&(secretCodeGenerator.messageSymbols.indexOf(symbol.toUpperCase())===-1)&&(secretCodeGenerator.messageSymbols.indexOf(symbol.toLowerCase())===-1)) {
        secretCodeGenerator.messageSymbols.push(symbol);
      }
    }
    return secretCodeGenerator.messageSymbols.length;
  }

  secretCodeGenerator.assignCodes = function(messageStr, complexity)
  {
    secretCodeGenerator.letterCodes = [];
    var treshold = (secretCodeGenerator.messageSymbols.length === complexity) ? secretCodeGenerator.messageSymbols.length-1 : secretCodeGenerator.messageSymbols.length;
    for (var i=0; i<treshold; i++)
    {
      var code;
      do {
        code = ArithmeticService.normalRandom(1, complexity);
      } while (!secretCodeGenerator.isUniqueCode(code));

      secretCodeGenerator.letterCodes.push({letter: secretCodeGenerator.messageSymbols[i], code: code});
    }

    if (secretCodeGenerator.messageSymbols.length === complexity)
    {
      secretCodeGenerator.letterCodes.push({letter: secretCodeGenerator.messageSymbols[secretCodeGenerator.messageSymbols.length-1], code:0});
    }

    return secretCodeGenerator.letterCodes;
  }

  secretCodeGenerator.assignEquationsToString = function (messageStr, complexity, selectedOps)
  {
    var deferred = $q.defer();
    var steps=[];
    for (var i=0; i<messageStr.length; i++)
    {
      var symbol = messageStr.charAt(i);
      if (secretCodeGenerator.isLetter(symbol)) {
        steps.push(secretCodeGenerator.findCodeForLetter(symbol));
      }
    }
    console.log(steps);

    ArithmeticService.initEquations();
    var promise = ArithmeticService.createEquationSet(steps, selectedOps, complexity);
    promise.then(function (result) {
      secretCodeGenerator.equations=[];
      var j=0;
      var k=0;
      while (j<messageStr.length)
      {
        var symbol = messageStr.charAt(j);
        if (secretCodeGenerator.isLetter(symbol)) {
          secretCodeGenerator.equations.push(result[k]);
          j++;
          k++;
        } else {
          secretCodeGenerator.equations.push(symbol);
          j++;
        }
      }
//      console.log(secretCodeGenerator.equations);
      deferred.resolve(secretCodeGenerator.equations);
    }, function (error) {
      console.log(error);
    });
    return deferred.promise;
  }

  secretCodeGenerator.isUniqueCode = function (code)
  {
    for (var i=0; i<secretCodeGenerator.letterCodes.length; i++)
    {
      if (secretCodeGenerator.letterCodes[i].code === code)
      {
        return false;
      }
    }
    return true;
  }

  secretCodeGenerator.findCodeForLetter = function (letter)
  {
    for (var i=0; i<secretCodeGenerator.letterCodes.length; i++)
    {
      if (secretCodeGenerator.letterCodes[i].letter === letter)
      {
        return secretCodeGenerator.letterCodes[i].code;
      }
    }
    console.log("Letter code for "+ letter + " not found. Very wrong!");
  }

  secretCodeGenerator.isLetter= function (symbol)
  {
    return (symbol.toUpperCase() != symbol.toLowerCase());
  }

}


})();
