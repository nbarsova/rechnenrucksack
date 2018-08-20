(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('SecretCodeRendererService',SecretCodeRendererService);

SecretCodeRendererService.$inject = ['$q',
'$translate',
'StringUtilService',
'ArithmeticService'];

function SecretCodeRendererService($q, $translate, StringUtilService, ArithmeticService) {

  var rendererService = this;

   rendererService.createCanvas = function (messageStr, equations, codes, answers)
  {

    var deferred = $q.defer();

    var translationPromises = [];
    translationPromises.push(StringUtilService.requestTranslation("equationsToSolve"));
    translationPromises.push(StringUtilService.requestTranslation("codeKey"));

    Promise.all(translationPromises).then(function (result) {
      var canvas = document.createElement('canvas');
      canvas.id  = "secretCodeCanvas";
      canvas.width=750;
      var splitMessage = StringUtilService.breakAnyString(messageStr, 10);
      canvas.height=150+(splitMessage.length+Math.ceil(codes.length/7))*62;
      console.log("height = "+canvas.height);
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.font = "18px PT Sans";
      context.fillText(StringUtilService.translationsObject.equationsToSolve,5,20);

      var pos=0; // сквозной счетчик по строке

      for (var i=0; i<splitMessage.length; i++) // a number of strings after split
      {
        var curStrLength = splitMessage[i].length;
        var j=0;

        while(j<curStrLength) // inside the current string
        {
            if ((messageStr[pos]!==' '))
            {
              rendererService.createSecretCodeLetter(canvas, messageStr[pos], equations[pos], 5+j*60, 40+80*i, answers);
              j++;
            } else {
              if ((j!==0)&&(j!==curStrLength-1))
              {
                rendererService.createSecretCodeLetter(canvas, messageStr[pos], equations[pos], 5+j*60, 40+80*i, answers);
                j++;
              }
            }
          pos++;
        }

      }

      context.font = "bold 25px PT Sans";
      context.fillText(StringUtilService.translationsObject.codeKey,5,90+80*i);

        let counter = 0;

        let displayCodes = codes.slice();

        while (displayCodes.length>0)
        {
          console.log(displayCodes.length + " letters to displayed");
          let randomNum = ArithmeticService.normalRandom(0, displayCodes.length-1);
          console.log("Taking "+randomNum + "th letter to display");
          let code = displayCodes[randomNum];
          context.font = "20px PT Sans";
          context.fillText(code.code+" = "+ code.letter,
                                          5+(counter%7)*80,
                                          90+30*(Math.ceil((counter+1)/7))+80*i);
          displayCodes.splice(randomNum, 1);
          counter++;
        }

      deferred.resolve(canvas);
  }, function (error)
  {
    console.log(error);
  });

  return deferred.promise;
  }

  rendererService.createSecretCodeLetter = function (canvas, symbol, equation, x, y, answers)
  {
    var context = canvas.getContext("2d");
//    console.log("Rendering "+symbol);
    if (StringUtilService.isLetter(symbol))
    {
      context.lineWidth = 1;

      context.beginPath();
      context.moveTo(x,y);
      context.lineTo(x,y+50);
      context.lineTo(x+50,y+50);
      context.lineTo(x+50,y);
      context.lineTo(x, y);
      context.stroke();

      context.font = "16px PT Sans";
      context.fillText(equation, x+7, y+70);
      if (answers) {
        context.font = "italic 36px Courgette";
        context.fillText(symbol, x+10, y+40);
      }
    } else {
      context.font = "36px PT Sans";
      context.fillText(symbol, x+10, y+40);
    }


  }

}
})();
