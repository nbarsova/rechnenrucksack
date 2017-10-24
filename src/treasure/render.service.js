(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('HTMLService', HTMLService);

HTMLService.$inject = [];

function HTMLService ()
{
  var htmlService=this;

  htmlService.renderCanvas = function (canvas)
  {
    var div = document.getElementById("treasureMapC");
    if (div.hasChildNodes()) {
      div.removeChild(div.childNodes[0]);
    }
    div.appendChild(canvas);
  }
};
})();
