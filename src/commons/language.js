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
        cells: "клеток",
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
        save: "сохранить",
        worksheetTitle: "Под каким камнем клад?",
        worksheetDesc1: "Пираты закопали клад под камнем, но под каким?",
        worksheetDesc2: "Для того, чтобы найти нужный камень, решай",
        worksheetDesc3: "примеры и двигайся в указанном направлении. ",
        worksheetDesc4: "Крестик указывает начало пути.  "
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
        cells: "Zellen",
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
        save: "speichern",
        worksheetTitle: "Unter welchem Stein ist der Schatz versteckt?",
        worksheetDesc1: "Die Piraten haben einen Schatz vergraben.",
        worksheetDesc2: "Aber unter welchem Stein? Löse die Aufgaben, ",
        worksheetDesc3: "laufe in die Richtung und finde heraus! ",
        worksheetDesc4: "Das Kreuz zeigt wo fangst du an.  "
      }
    },
    {
      language: "en",
      phrases:
        {rechnenrucksack: "BAG OF TASKS",
        generatorDescription: "Dear parents and teachers! With the help of \"Bag of tasks\" you can generate treasure map puzzles with arithmetic tasks of different complexity and save them as pdf for printing.",
        numberComplexity: "Numbers in tasks",
        fieldSize: "Field size",
        cells: "squares",
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
        save: "save",
        worksheetTitle: "Under which stone is the treasure?",
        worksheetDesc1: "The pirates have buried their treasure!",
        worksheetDesc2: "But under which stone? Solve the tasks",
        worksheetDesc3: "to find out! ",
        worksheetDesc4: "The cross shows where to start.  "
      }
    }
  ]




}
