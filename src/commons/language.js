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
        worksheetDesc4: "Крестик указывает начало пути.  ",
        settings: "Настройки печати",
        pageOrientationDesc: "Ориентация страницы",
        pageOrientationLandscape: "Горизонтальная",
        pageOrientationPortrait: "Вертикальная",
        answerGeneration: "Генерировать ответ",
        nameDate: "Место для имени и даты",
        easyComplexity: "Выбор сложности заданий",
        easyComplexityTrivial: "Тривиальные",
        easyComplexityEasy: "Простые",
        easyComplexityEasyTooltip: "Сложение и вычитание в пределах 10",
        easyComplexityMedium: "Средние",
        easyComplexityMediumTooltip: "Сложение и вычитание с переходом через 10",
        easyComplexityHard: "Сложные",
        easyComplexityHardTooltip: "Сложение, вычитание, таблица умножения до 25",
        advancedComplexity: "Расширенные настройки сложности",
        studentName: "Имя",
        workDate: "Дата",
        treasureLocation: "Сокровище под камнем",
        upperRight: "справа сверху",
        upperLeft: "слева сверху",
        lowerRight: "справа снизу",
        lowerLeft: "слева снизу",
        answer: "Ответ"
      }
    },
    {
      language: "de",
      phrases:
        {rechnenrucksack: "RECHNENRUCKSACK",
        generatorDescription: "Liebe Eltern und Lehrer! Mit \"Rechnenrucksack\" könnt ihr Rechenaufgaben unterschiedlicher Komplexität als Schatzsuchekarten generieren und in pdf Format zum Ausdrucken speichern.",
        numberComplexity: "Zahlenbereich",
        fieldSize: "Kartenmaße",
        equationsAmount: "Aufgabenanzahl",
        cells: "Zellen",
        operations: "Rechenoperationen",
        getMap: "Karte generieren",
        noOperationsMessage: "Wahlen Sie bitte am wenigsten eine Rechenoperation",
        copyrightAuthor: "Natalia Barsova, Konzept, Entwicklung",
        copyrightGraphic: "Suse Schöttle, Graphik",
        steps: "Schritte",
        dirUp: "nach oben",
        dirDown: "nach unten",
        dirRight: "rechts",
        dirLeft: "links",
        reset: "zurück",
        save: "speichern",
        worksheetTitle: "Unter welchem Stein liegt der Schatz?",
        worksheetDesc1: "Die Piraten haben einen Schatz vergraben.",
        worksheetDesc2: "Aber unter welchem Stein? Löse die Aufgaben, ",
        worksheetDesc3: "laufe in die Richtung und finde die Lösung heraus. ",
        worksheetDesc4: "Das Kreuz zeigt wo du anfangen musst.  ",
        settings: "Ausdruckeinstellungen",
        pageOrientationDesc: "Seitenausrichtung",
        pageOrientationLandscape: "Horizontal",
        pageOrientationPortrait: "Vertikal",
        answerGeneration: "Antwortblatt",
        nameDate: "Name und Datum",
        easyComplexity: "Komplexitätwahl",
        easyComplexityTrivial: "Trivial",
        easyComplexityEasy: "Einfach",
        easyComplexityEasyTooltip: "Addition und Substraction bis 10",
        easyComplexityMedium: "Mittel",
        easyComplexityMediumTooltip: "Addition und Substraction bis 25",
        easyComplexityHard: "Schwer",
        easyComplexityHardTooltip: "Addition und Substraction, Multiplikation und Division bis 25",
        advancedComplexity: "Erweiterte Komplexitätseinstellungen",
        studentName: "Name",
        workDate: "Datum",
        treasureLocation: "Der Schats liegt",
        upperRight: "oben rechts",
        upperLeft: "oben links",
        lowerRight: "unten rechts",
        lowerLeft: "unten links",
        answer: "Antwort"
      }
    },
    {
      language: "en",
      phrases:
        {rechnenrucksack: "BAG OF TASKS",
        generatorDescription: "Dear parents and teachers! With the help of \"Bag of tasks\" you can generate treasure map puzzles with arithmetic tasks of various complexity and save them as pdf for printing.",
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
        worksheetDesc4: "The cross shows where to start.  ",
        settings: "Print settings",
        pageOrientationDesc: "Page orientation",
        pageOrientationLandscape: "Horizontal",
        pageOrientationPortrait: "Vertical",
        answerGeneration: "Answer page",
        nameDate: "Name and date",
        easyComplexity: "Complexity choice",
        easyComplexityTrivial: "Trivial",
        easyComplexityEasy: "Easy",
        easyComplexityEasyTooltip: "Addition and substraction up to 10",
        easyComplexityMedium: "Average",
        easyComplexityMediumTooltip: "Addition and substraction up to 25",
        easyComplexityHard: "Hard",
        easyComplexityHardTooltip: "Addition and substraction, multiplication table up to 25",
        advancedComplexity: "Advanced Complexity Settings",
        studentName: "Name",
        workDate: "Date",
        treasureLocation: "The treasure is hidden under",
        upperRight: "upper right stone",
        upperLeft: "upper left stone",
        lowerRight: "lower right stone",
        lowerLeft: "lower left stone",
        answer: "Answer"
      }
    }
  ]




}
