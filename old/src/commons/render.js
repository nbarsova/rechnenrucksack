(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('HTMLService', HTMLService);

HTMLService.$inject = [];

function HTMLService ()
{
  var htmlService=this;

  htmlService.renderCanvas = function (canvas, divId)
  {
    var div = document.getElementById(divId);
    if (div.hasChildNodes()) {
      div.removeChild(div.childNodes[0]);
    }
    div.appendChild(canvas);
  }
};
})();
