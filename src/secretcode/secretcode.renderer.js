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
    var canvas = document.createElement('canvas');
    canvas.id  = "secretCodeCanvas";
    canvas.width=600;
    canvas.height=600;


    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "20px PT Sans";
    context.fillText("EQUATIONS",5,20);

    var splitMessage = StringUtilService.breakAnyString(messageStr, 10);

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

    context.font = "20px PT Sans";
    context.fillText("CODES",5,90+60*i);

      for (var k=0; k<codes.length; k++)
      {
        context.font = "20px PT Sans";
        context.fillText(codes[k].letter+" = "+ codes[k].code,
                                        5+(k%7)*80,
                                        90+30*(Math.ceil((k+1)/7))+60*i);
      }

    deferred.resolve(canvas);

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
