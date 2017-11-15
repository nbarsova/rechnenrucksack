(function () {
"use strict";

angular.module('RechnenRucksack')
  .controller('SecretCodeGeneratorController', SecretCodeGeneratorController);

SecretCodeGeneratorController.$inject =
  ['$q', '$translate',
  'ArithmeticService',
  'SecretCodeGeneratorService',
  'SecretCodeRendererService',
  'HTMLService'];

function SecretCodeGeneratorController($q, $translate,
                                        ArithmeticService,
                                        SecretCodeGeneratorService,
                                        SecretCodeRendererService,
                                        HTMLService)
{

  var secretCodeController = this;

  secretCodeController.messageStr="";

  secretCodeController.errorMessage;

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
];

  secretCodeController.generationEnabled=false;

  secretCodeController.checkMessage = function ()
  {
    if (secretCodeController.messageStr.length>50)
    {
      var errorPr = $translate("secretMessageTooLong").then(function (result) {
        secretCodeController.errorMessage = result;
      });
      secretCodeController.generationEnabled=false;
    } else {
      secretCodeController.errorMessage="";
      secretCodeController.generationEnabled=true;
      //TODO: enable settings
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
  }

  secretCodeController.alterOperations=function()
  {
    var selectedOps=[];
    for (var i = 0; i < secretCodeController.operations.length; i++)
    {
    if (secretCodeController.operations[i].selected)
      {
        selectedOps.push(secretCodeController.operations[i].code);
      }
    }

    if (selectedOps.length===0)
    {
      var errorPr = $translate("noOperationsMessage").then(function (result) {
        secretCodeController.errorMessage = result;
      });
      secretCodeController.generationEnabled=false;
    } else {
      secretCodeController.errorMessage="";
      secretCodeController.generationEnabled=true;
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

    if (selectedOps.length===0)
    {
      var errorPr = $translate("noOperationsMessage").then(function (result) {
        secretCodeController.errorMessage = result;
      });
      //TODO: disable settings!
    }

    secretCodeController.equations=[];
    secretCodeController.letterCodes = SecretCodeGeneratorService.assignCodes(secretCodeController.messageStr, secretCodeController.complexity);
    var codePromise = SecretCodeGeneratorService.assignEquationsToString(secretCodeController.messageStr, secretCodeController.complexity, selectedOps);
    codePromise.then (function (result){
      secretCodeController.equations = result;
      var canvasPromise = SecretCodeRendererService.createCanvas(secretCodeController.messageStr, secretCodeController.equations, secretCodeController.letterCodes);
      canvasPromise.then(function (result) {
          HTMLService.renderCanvas(result, "secretCodeC");
      });
    }, function (error) {
      console.log(error);
      secretCodeController.createLetterCodes();
    });
  }


}

})();
