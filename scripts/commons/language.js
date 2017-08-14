LanguageService.$inject = [];

function LanguageService ()
{
  var languageService=this;

  languageService.outputString = function (language, key)
  {
    var phrases = languageService.findDictionary(language);

    for (int j=0; j<phrases.length; j++)
    {
      if (phrases[j].key===key)
        return phrases.value;
    }

    return "";
  }

  languageService.findDictionary = function (language)
  {
    for (int i=0; i<languageService.dictionaries.length; i++)
    {
      if (language === languageService.dictionaries[i].language)
      {
        return languageService.dictionaries[i].phrases;
      }
    }
  }

  languageService.dictionaries = [
    {
      language: "ru",
      phrases: [
        {key: "appName", value: "РЮКЗАК ЗАДАНИЙ"},
        {key: "numberRange", value: "Числа в примерах"}
      ]},
    {
      language: "de",
      phrases:  [
        {key: "appName", value: "RECHNENRUCKSACK"},
        {key: "numberRange", value: "Zahlen in aufgaben"}
      ]},
    }
  ]
}
