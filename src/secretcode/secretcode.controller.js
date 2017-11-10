(function () {
"use strict";

angular.module('RechnenRucksack')
  .controller('SecretCodeGeneratorController', SecretCodeGeneratorController);

SecretCodeGeneratorController.$inject =
  ['$q', '$translate',
  'ArithmeticService',
  'SecretCodeGeneratorService'];

function SecretCodeGeneratorController($q, $translate,
                                        ArithmeticService,
                                        SecretCodeGeneratorService)
{

  var secretCodeController = this;

  secretCodeController.messageStr="";

  secretCodeController.symbolsCount=0;
  secretCodeController.symbolsCountMessage="";

  secretCodeController.complexity=10;

  secretCodeController.letterCodes=[];

  secretCodeController.equations=[];

  secretCodeController.operations = [
  {code: "+", value: "+", selected: true, available:true},
  {code: "-", value: "-", selected: true, available:true},
  {code: "*", value: "*", selected: false, available:true},
  {code: ":", value: ":", selected: false, available:true}
]

  secretCodeController.countSymbols = function ()
  {
    secretCodeController.symbolsCount = SecretCodeGeneratorService.countSymbols(secretCodeController.messageStr);
    if (secretCodeController.symbolsCount>10)
    {
      secretCodeController.complexity=25;
    }

    if (secretCodeController.symbolsCount>25)
    {
      secretCodeController.complexity=100;
    }
  }

  secretCodeController.createLetterCodes=function()
  {
    var selectedOps=[];
    for (var i = 0; i < secretCodeController.operations.length; i++)
    {
    if (secretCodeController.operations[i].selected)
      {
        selectedOps.push(secretCodeController.operations[i].code);
      }
    }

    secretCodeController.equations=[];
    secretCodeController.letterCodes = SecretCodeGeneratorService.assignCodes(secretCodeController.messageStr, secretCodeController.complexity);
    var codePromise = SecretCodeGeneratorService.assignEquationsToString(secretCodeController.messageStr, secretCodeController.complexity, selectedOps);
    codePromise.then (function (result){
      secretCodeController.equations = result;
    }, function (error) {
      console.log(error);
    });
  }


}

})();
