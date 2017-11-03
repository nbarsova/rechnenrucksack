(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('StringUtilService', StringUtilService);

  StringUtilService.$inject = ['$q','$translate'];
  function StringUtilService($q, $translate) {

  var stringsUtilService = this;
  stringsUtilService.translationsObject={};

  stringsUtilService.requestTranslation = function (translationKey)
    {
      var trPromise = $translate(translationKey).then(function (result) {
      stringsUtilService.translationsObject[translationKey] = result;
      });
      return trPromise;
    }

    stringsUtilService.breakAnyString = function (myStr, treshold)
    {
      var strings = [];

        while (myStr.length>0)
        {
          var spaceValue = treshold;
          var pushed = false;

          while (!pushed)
          {
            if ((spaceValue>0)&&(spaceValue<myStr.length))
            {
              var char = myStr.charAt(spaceValue);
              if (char === ' ')
              {
                var substr = myStr.substr(0,spaceValue);
                strings.push(substr);
                myStr = myStr.slice(spaceValue+1, myStr.length);
                pushed = true;
              } else {
                spaceValue--;
              }
           }
            else {
              var substr = myStr.substr(0,treshold);
              strings.push(substr);
              myStr = myStr.slice(treshold, myStr.length);
              pushed = true;
          }
          }
        }
      console.log(strings);
      return strings;
    }

    stringsUtilService.breakString = function (myStr)
    {
      var strings = myStr.split("\n");
      return strings;
    }

  }
  })();
