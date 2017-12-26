(function () {
"use strict";


angular.module('RechnenRucksack')
  .service('PrintService', PrintService);

// Print service print function takes HTML canvas as an input and converts it to pdf page

PrintService.$inject = ['StringUtilService'];

function PrintService(StringUtilService) {

  var printService = this;

  printService.print = function(taskTitle,
                                studentContent,
                                teacherContent,
                                orientation,
                                nameDate,
                                fileName) {


      var translationPromises = [];
      translationPromises.push(StringUtilService.requestTranslation(taskTitle));
      if (nameDate)
      {
        translationPromises.push(StringUtilService.requestTranslation("studentName"));
        translationPromises.push(StringUtilService.requestTranslation("workDate"));
        translationPromises.push(StringUtilService.requestTranslation(taskTitle));
      }

      Promise.all(translationPromises).then(function (result) {
        var studentDataURL = studentContent.toDataURL();

        var doc = new jsPDF({orientation: orientation});
        console.log(taskTitle);
        console.log(StringUtilService.translationsObject);
        doc.addImage(createTitle(StringUtilService.translationsObject[taskTitle]), 'PNG',  10, 5);
        if (nameDate)
        {
          doc.addImage(createNameDate(), 'PNG', 240, 5)
        }
        doc.addImage(studentDataURL, 'PNG', 10, 30);

        // copyright coordinates based on orientation of the page

        let copyrightX=0;
        let copyrightY=0;
        switch (orientation)
        {
          case ('landscape'):
           copyrightX=0;
           copyrightY=10;
          case ('portrait'):
           copyrightX=5;
           copyrightY=270;
        }
        doc.addImage(createCopyright(orientation), 'PNG', copyrightX,copyrightY);

        if (teacherContent)
        {
          doc.addPage();
          doc.addImage(createTitle(StringUtilService.translationsObject[taskTitle]), 'PNG',  10, 5);
          var teacherDataURL = teacherContent.toDataURL();
          doc.addImage(teacherDataURL, 'PNG', 10, 30);
          doc.addImage(createCopyright(), 'PNG', copyrightX,copyrightY);
        }
        doc.save(fileName+".pdf");
      });
    }

     function createTitle(taskTitle)
     {
       var canv = document.createElement('canvas');
       canv.id     = "title";
       canv.width  = 1000;
       canv.height  = 80;
       var context = canv.getContext("2d");
       context.font = 'normal 55px Neucha';
       context.textBaseline="top";
       context.fillText(taskTitle,0,0);
       return canv.toDataURL();
     }

     function createNameDate()
     {
       var canv = document.createElement('canvas');
       canv.id     = "nameDate";
       canv.width  = 500;
       canv.height  = 100;
       var context = canv.getContext("2d");
       context.font = 'normal 20px Neucha';
       context.textBaseline="top";
       context.textAlight="right";
       context.fillText(StringUtilService.translationsObject.studentName+": _____________",0,0);
       context.fillText(StringUtilService.translationsObject.workDate+": ____________",0,40);
       return canv.toDataURL();
     }

     function createCopyright ()
        {
          var canv = document.createElement('canvas');
          canv.id     = "cop";
          canv.width  = 600;
          var context = canv.getContext("2d");
          context.font = 'normal 36px Neucha';
          context.fillStyle = '#888888';
          context.textBaseline="middle";

          context.fillText("(c) RECHNENRUCKSACK.COM ",0,40);
          return canv.toDataURL();
        }
}
})();
