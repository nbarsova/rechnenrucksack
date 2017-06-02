function ArithmeticService() {

  var service = this;

  service.buildEquationForNumber = function (number, operation, complexity)
      {
//          console.log("Building equation for step "+number + ", operation "+operation);
          switch(operation)
              {
                  case 'a':
                      return service.buildAddition (number, complexity);
                  case 's':
                      return service.buildSubstraction (number, complexity);
                  case 'm':
                      return service.buildMultiplication (number, complexity);
                  case 'd':
                      return service.buildDivision (number, complexity);
                  default:
                      console.log("Very wrong!");
                      break;
              }

          return "";
      };

      service.buildAddition = function (number, complexity)
      {
         do {
           var x = Math.floor(Math.random() * (1, number) + 1);
           var y = number - x;
         } while (y===0);
         var resultString = x + " + " + y + " = __";
         console.log(resultString);
         return resultString;
      }

      service.buildSubstraction = function (number, complexity)
      {
        var x=0;

        switch (complexity)
        {
          case "10":
            do {
                x = Math.floor(Math.random() * (9-number+1) + number+1);
             } while (x===number);
             break;
          case "20":
            do {
                x = Math.floor(Math.random() * (19-number+1) + number+1);
              } while (x===number);
            break;
          case "99":
            do{
              x = Math.floor(Math.random() * (99-number+1) + number+1);
            }   while (x===number);
            break;
        }

        var y = x - number;
        var resultString = x + " - " + y + " = __";
        return resultString;
      }

      service.buildMultiplication = function(number, complexity)
      {

        var x=0;
        var resultString = "";
        switch (complexity)
        {
          case "20":
            switch (number)
            {
              case 12:
              case 11:
              case 10:
              case 9:
              case 8:
              case 7:
                x=2;
                y=x*number;
                resultString = x +" * __ = " + y;
                break;
                case 6:
                  resultString = "3 * 2 = __ ";
                  break;
               case 5:
                  x = Math.floor(Math.random() * 4 + 1);
                  y = number*x;
                  resultString = x +" * __ = " + y;
                  break;
               case 4:
                 resultString = "2 * 2 = __ ";
                 break;
               case 3:
                  x = Math.floor(Math.random() * 2 + 4);
                  y = number*x;
                  resultString = x +" * __ = " + y;
                  break;
                case 2:
                case 1:
                  x = Math.floor(Math.random() * 2 + 7);
                  y = number*x;
                  resultString = x +" * __ = " + y;
                  break;
              }
            return resultString;

          case "99":
            x = Math.floor(Math.random() * (9-number+1) + number+1);
            var y = x * number;
            var resultString = x + " * __ = " + y;
            return resultString;
        }
      }

      service.buildDivision = function (number, complexity)
      {
        var x=1;
        do {
        var x = Math.floor(Math.random() * (2, 10));
        var y = x * number;
      } while (x<2);
        var resultString = y + " : " + x + " = __";
        return resultString;
      }

}
