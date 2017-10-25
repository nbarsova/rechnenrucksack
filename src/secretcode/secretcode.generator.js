(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('SecretCodeGeneratorService', SecretCodeGeneratorService);


SecretCodeGeneratorService.$inject = ['$q', 'ArithmeticService', '$translate'];

function SecretCodeGeneratorService($q, ArithmeticService, $translate) {

  var secretCodeGenerator = this;

  secretCodeGenerator.countSymbols = function (messageStr)
  {
    var symbols=[];
    for (var i=0; i<messageStr.length; i++)
    {
      var symbol = messageStr.charAt(i);
      var isLetter=(symbol.toUpperCase() != symbol.toLowerCase())
      if (isLetter&&(symbols.indexOf(symbol.toUpperCase())===-1)&&(symbols.indexOf(symbol.toLowerCase())===-1)) {
        symbols.push(symbol);
      }
    }
    return symbols.length;
  }
}

/*
компонента для ввода слов: анализирует на лету вводимую строку, считает, сколько
в ней различных символов, выдает снизу диапазон сложности заданий
каждому символу присваивается случайное число в диапазоне
для этих чисел генерируются примеры
*/

})();
