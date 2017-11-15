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
    canvas.width=1000;
    canvas.height=550;

    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "20px PT Sans";
    context.fillText("EQUATIONS",50,20);

    for (var i=0; i<equations.length; i++)
    {
      rendererService.createSecretCodeLetter(canvas, equations[i], 5+i*60, 50);
    }

    context.font = "20px PT Sans";
    context.fillText("CODES",5,150);

      for (var j=0; j<codes.length; j++)
      {
        context.font = "20px PT Sans";
        context.fillText(codes[j].letter+" = "+ codes[j].code,5+j*60,180);
      }

    deferred.resolve(canvas);

  return deferred.promise;
  }

  rendererService.createSecretCodeLetter = function (canvas, equation, x, y)
  {
    var context = canvas.getContext("2d");
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(x+30,y+30);
    context.lineTo(x+80,y+30);
    context.stroke();

    context.font = "18px PT Sans";
    context.fillText(equation, x+35, y+50);
  }

}
})();
