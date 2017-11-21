(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('SecretCodeRendererService',SecretCodeRendererService);

SecretCodeRendererService.$inject = ['$q', '$translate','StringUtilService'];

function SecretCodeRendererService($q, $translate, StringUtilService) {

  var rendererService = this;

   rendererService.createCanvas = function (messageStr, equations, codes)
  {

    var deferred = $q.defer();

    var translationPromises = [];
    translationPromises.push(StringUtilService.requestTranslation("equationsToSolve"));
    translationPromises.push(StringUtilService.requestTranslation("codeKey"));

    Promise.all(translationPromises).then(function (result) {
      var canvas = document.createElement('canvas');
      canvas.id  = "secretCodeCanvas";
      canvas.width=600;
      var splitMessage = StringUtilService.breakAnyString(messageStr, 10);
      canvas.height=150+(splitMessage.length+Math.ceil(codes.length/7))*50;
      console.log("height = "+canvas.height);
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.font = "bold 25px PT Sans";
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
              rendererService.createSecretCodeLetter(canvas, messageStr[pos], equations[pos], 5+j*60, 40+70*i);
              j++;
            } else {
              if ((j!==0)&&(j!==curStrLength-1))
              {
                rendererService.createSecretCodeLetter(canvas, messageStr[pos], equations[pos], 5+j*60, 40+70*i);
                j++;
              }
            }
          pos++;
        }

      }

      context.font = "bold 25px PT Sans";
      context.fillText(StringUtilService.translationsObject.codeKey,5,90+65*i);

        for (var k=0; k<codes.length; k++)
        {
          context.font = "20px PT Sans";
          context.fillText(codes[k].letter+" = "+ codes[k].code,
                                          5+(k%7)*80,
                                          90+30*(Math.ceil((k+1)/7))+65*i);
        }

      deferred.resolve(canvas);
  }, function (error)
  {
    console.log(error);
  });

  return deferred.promise;
  }

  rendererService.createSecretCodeLetter = function (canvas, symbol, equation, x, y)
  {
    var context = canvas.getContext("2d");
//    console.log("Rendering "+symbol);
    if (StringUtilService.isLetter(symbol))
    {
      context.lineWidth = 1;

      context.beginPath();
      context.moveTo(x,y+30);
      context.lineTo(x+50,y+30);
      context.stroke();

      context.font = "14px PT Sans";
      context.fillText(equation, x+5, y+50);
    } else {
      context.font = "32px PT Sans";
      context.fillText(symbol, x+20, y+20);
    }
  }

}
})();
