LanguageService.$inject = [];

function LanguageService ()
{
  var languageService=this;

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

  languageService.getString = function (language, key)
  {
    var dict = languageService.findDictionary(language);
    return dict[key];
  }

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
        noOperationsMessage: "Выберите хотя бы одну арифметическую операцию",
        copyrightAuthor: "Наталья Барсова, концепция, разработка",
        copyrightGraphic: "Сузе Шеттль, графика",
        steps: "шагов",
        dirUp: "вверх",
        dirDown: "вниз",
        dirRight: "направо",
        dirLeft: "налево",
        reset: "назад",
        save: "сохранить"
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
        noOperationsMessage: "Wahlen Sie bitte am wenigsten eine Rechenoperation",
        copyrightAuthor: "Natalia Barsova, Konzept, Entwicklung",
        copyrightGraphic: "Suse Schöttle, Graphik",
        steps: "Schritte",
        dirUp: "oben",
        dirDown: "unten",
        dirRight: "rechts",
        dirLeft: "links",
        reset: "zurück",
        save: "speichern"
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
        noOperationsMessage: "At least one arithmetic operation should be chosen",
        copyrightAuthor: "Natalia Barsova, concept, development",
        copyrightGraphic: "Suse Schöttle, graphics",
        steps: "steps",
        dirUp: "up",
        dirDown: "down",
        dirRight: "right",
        dirLeft: "left",
        reset: "back",
        save: "save"
      }
    }
  ]




}
