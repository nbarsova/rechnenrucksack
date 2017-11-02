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

  secretCodeController.countSymbols = function ()
  {
    secretCodeController.symbolsCount = SecretCodeGeneratorService.countSymbols(secretCodeController.messageStr);
  }
}

})();
