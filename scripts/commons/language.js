LanguageService.$inject = [];

function LanguageService ()
{
  var languageService=this;

  var dictionaries = [
    {
      language: "ru",
      phrases:
        {rechnenrucksack: "РЮКЗАК ЗАДАНИЙ",
        generatorDescription: "Уважаемые родители и педагоги! С помощью \"Рюкзака заданий\" вы можете генерировать задания по арифметике различной сложности в виде карты поиска клада и сохранять их в формате pdf для распечатки.",
        numberComplexity: "Числа в примерах",
        fieldSize: "Размер поля",
        equationsAmount: "Количество примеров",
        operations: "Арифметические операции",
        getMap: "Получить карту",
        noOperationsMessage: "Выберите хотя бы одну арифметическую операцию"
      }
    },
    {
      language: "de",
      phrases:
        {rechnenrucksack: "RECHNENRUCKSACK",
        generatorDescription: "Liebe Eltern und Lehrer! Mit \"Rechnenrucksack\" ihr könnt Rechnenaufgaben unterschiedlicher Komplexität als Schatzsuchenkarten generieren und speichern in pdf Format für Ausdrück.",
        numberComplexity: "Zahlen in Aufgaben",
        fieldSize: "Kartenmaße",
        equationsAmount: "Aufgabenzahl",
        operations: "Rechenoperationen",
        getMap: "Karte generieren",
        noOperationsMessage: "Wahlen Sie bitte am wenigsten eine Rechenoperation"
      }
    },
    {
      language: "en",
      phrases:
        {rechnenrucksack: "BAG OF TASKS",
        generatorDescription: "Dear parents and teachers! With the help of \"Bag of tasks\" you can generate treasure map puzzles with arithmetic tasks of different complexity and save them as pdf for printing.",
        numberComplexity: "Numbers in tasks",
        fieldSize: "Field size",
        equationsAmount: "How many tasks? ",
        operations: "Arithmetic operations",
        getMap: "Get the map",
        noOperationsMessage: "At least one arithmetic operation should be chosen"
      }
    }
  ]

  languageService.findDictionary = function (language)
  {
    for (var i=0; i<dictionaries.length; i++)
    {
      if (language === dictionaries[i].language)
      {
        return dictionaries[i].phrases;
      }
    }
  }


}
