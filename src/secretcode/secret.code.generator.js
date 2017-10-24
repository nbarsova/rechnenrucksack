SecretCodeGeneratorService.$inject = ['$q', 'ArithmeticService', 'LanguageService'];

function SecretCodeGeneratorService($q, ArithmeticService, LanguageService) {

  var secretCodeGenerator = this;
}

/*
компонента для ввода слов: анализирует на лету вводимую строку, считает, сколько
в ней различных символов, выдает снизу диапазон сложности заданий
каждому символу присваивается случайное число в диапазоне
для этих чисел генерируются примеры
*/
