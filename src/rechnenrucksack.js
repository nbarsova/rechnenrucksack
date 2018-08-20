
(function () {
'use strict';
angular.module('RechnenRucksack', ['ui.router', 'pascalprecht.translate']);

angular.module('RechnenRucksack')
  .controller('MainController', function ($translate)
{
  var ctrl = this;

  ctrl.language = 'en';
  ctrl.languages = ['ru', 'de', 'en'];

  ctrl.updateLanguage = function() {
    console.log('translation started');
    $translate.use(ctrl.language);
  };

  ctrl.findLanguage = function() {
    var language = navigator.language;
    console.log("Browser language "+language);
    if (language === 'ru-RU') {
      ctrl.language = 'ru';
    } else if (language==='de') {
      ctrl.language='de';
    }

    $translate.use(ctrl.language);

  }
})

angular.module('RechnenRucksack')
  .config(function($translateProvider) {
    $translateProvider.translations('en', {
      rechnenrucksack: "BAG OF TASKS",
      rechnenrucksackDescription: "Generate arithmetics teaching aids and save them as pdfs for printing",
      treasureMap: "Treasure Map",
      secretCode: "Secret Code",
      generatorDescription: "To generate a treasure map with arithmetic tasks, choose the complexity of arithmetic equations and press \"GET THE MAP\". Then on the left you shall see preview, which you can save for printing.",
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
      reset: "refresh",
      save: "save pdf",
      worksheetTitle: "Under which stone is the treasure?",
      worksheetDesc: "The pirates have buried their treasure!\nBut under which stone?\nSolve the tasks to find out!\nThe cross shows where to start.  ",
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
      advancedComplexity: "Advanced settings",
      studentName: "Name",
      workDate: "Date",
      treasureLocation: "The treasure is hidden under",
      upperRight: "upper right stone",
      upperLeft: "upper left stone",
      lowerRight: "lower right stone",
      lowerLeft: "lower left stone",
      answer: "Answer",
      en: "English",
      de: "German",
      ru: "Russian",
      secretCodeDesc: "Enter any message, and press the button to generate equations for each letter in it and a key sheet to complete the message. Digits and punctuation marks stay intact! Rechnenrucksack doesn't check your secret message spelling and grammar!",
      enterMessage: "Enter the message to be encoded",
      symbolsInStringMessage: "Different symbols",
      availableComplexity: "Possible complexity of equations",
      messageLength: "Message length",
      secretMessageTooLong: "Secret message must not be longer than 50 symbols",
      equationsToSolve: "Solve the equations and find the results in the key \nto read each letter of the secret message!",
      codeKey: "Letter code key",
      secretCodeTitle: "Solve the secret code!",
      initialSecretMessage: "SHE SELLS SEASHELLS BY THE SEASHORE"
  })
  .translations('de', {
    rechnenrucksack: "RECHNENRUCKSACK",
    rechnenrucksackDescription: "Mit \"Rechnenrucksack\" könnt ihr Rechenaufgaben Arbeitsblätter generieren und in pdf Format zum Ausdrucken speichern.",
    treasureMap: "Schatzsuche",
    secretCode: "Geheim Code",
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
    reset: "aktualisieren",
    save: "pdf speichern",
    worksheetTitle: "Unter welchem Stein liegt der Schatz?",
    worksheetDesc: "Die Piraten haben einen Schatz vergraben.\nAber unter welchem Stein?Löse die Aufgaben,\nlaufe in die Richtung und finde die Lösung heraus.\nDas Kreuz zeigt wo du anfangen musst.  ",
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
    treasureLocation: "Der Schatz liegt",
    upperRight: "oben rechts",
    upperLeft: "oben links",
    lowerRight: "unten rechts",
    lowerLeft: "unten links",
    answer: "Antwort",
    en: "Englisch",
    de: "Deutsch",
    ru: "Russisch",
    secretCodeDesc: "Tragen Sie eine Nachricht ein, und Rechnenrucksack generiert Aufgaben für jeden Buchstaben und ein Schlüssel, um die Geheimcode zu lösen. Ziffern und Satzzeichen bleiben erhalten! Rechnersrucksack überprüft nicht die Rechtschreibung und Grammatik!",
    enterMessage: "Tragen Sie eine Nachricht ein, um Geheimcode zu generieren",
    symbolsInStringMessage: "Buchstabenanzahl",
    availableComplexity: "Komplexitätwahl",
    messageLength: "Nachricht Länge",
    secretMessageTooLong: "Geheime Nachricht darf nicht länger als 50 Symbole sein",
    equationsToSolve: "Löse die Aufgaben und finde die Ergebnisse im Schlüssel, \num die Nachricht zu raten!",
    codeKey: "Schlüssel",
      secretCodeTitle: "Löse den geheimen Code!",
      initialSecretMessage: "Fischers Fritz fischt frische Fische"
}
)
.translations('ru', {
rechnenrucksack: "РЮКЗАК ЗАДАНИЙ",
rechnenrucksackDescription: "С помощью \"Рюкзака заданий\" вы можете генерировать задания по арифметике различной сложности и сохранять их в формате pdf для распечатки.",
treasureMap: "Поиск сокровищ",
secretCode: "Секретный шифр",
generatorDescription: "",
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
reset: "обновить",
save: "сохранить pdf",
worksheetTitle: "Под каким камнем клад?",
worksheetDesc: "Пираты закопали клад под камнем, но под каким?\nДля того, чтобы найти нужный камень, решай\nпримеры и двигайся в указанном направлении.\nКрестик указывает начало пути.  ",
settings: "Настройки печати",
pageOrientationDesc: "Ориентация страницы",
pageOrientationLandscape: "Горизонтальная",
pageOrientationPortrait: "Вертикальная",
answerGeneration: "Генерировать ответ",
nameDate: "Место для имени и даты",
easyComplexity: "Сложность заданий",
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
answer: "Ответ",
en: "Английский",
de: "Немецкий",
ru: "Русский",
secretCodeDesc: "Введите любую строчку, генератор создаст примеры для каждой буквы в нем, и ключ, в котором буквы можно будет восстановить по результату. Знаки препинания и цифры остаются без изменения. Генератор не умеет проверять исходный текст на ошибки!",
enterMessage: "Введите секретное сообщение",
symbolsInStringMessage: "Разных букв",
availableComplexity: "Возможная сложность примеров",
messageLength: "Длина сообщения",
secretMessageTooLong: "Секретное сообщение не должно быть длиннее 50 символов",
equationsToSolve: "Чтобы прочитать секретное сообщение, реши примеры и подставь нужную букву по ключу",
codeKey: "Ключ",
secretCodeTitle: "Разгадай секретный шифр!",
initialSecretMessage: "шла саша по шоссе и сосала сушку"
});

  $translateProvider.preferredLanguage('en');
});

})();
