PrintService.$inject = ['LanguageService','PrintServiceConstants'];

// Print service print function takes HTML canvas as an input and converts it to pdf page

function PrintService(LanguageService, PrintServiceConstants) {

  var printService = this;

  printService.print = function(studentContent,
                                teacherContent,
                                language,
                                orientation,
                                nameDate) {

      var studentDataURL = studentContent.toDataURL();

      var doc = new jsPDF({orientation: orientation});

      doc.addImage(createTitle(language), 'PNG',  PrintServiceConstants.titleX, PrintServiceConstants.titleY);
      if (nameDate)
      {
        doc.addImage(createNameDate(language), 'PNG', PrintServiceConstants.nameDateX, PrintServiceConstants.nameDateY)
      }
      doc.addImage(studentDataURL, 'PNG', PrintServiceConstants.studentContentX, PrintServiceConstants.studentContentY);
      doc.addImage(createCopyright(), 'PNG', PrintServiceConstants.copyrightX, PrintServiceConstants.copyrightY);

      if (teacherContent)
      {
        console.log(teacherContent);
        doc.addPage();
        doc.addImage(createTitle(language), 'PNG',  PrintServiceConstants.titleX, PrintServiceConstants.titleY);
        var teacherDataURL = teacherContent.toDataURL();
        doc.addImage(teacherDataURL, 'PNG', PrintServiceConstants.studentContentX, PrintServiceConstants.studentContentY);
        doc.addImage(createCopyright(), 'PNG', PrintServiceConstants.copyrightX, PrintServiceConstants.copyrightY);
      }

      doc.save("treasure.pdf");
    }

     function createTitle(language)
     {
       var canv = document.createElement('canvas');
       canv.id     = "title";
       canv.width  = 1000;
       canv.height  = 80;
       var context = canv.getContext("2d");
       context.font = 'normal 55px Neucha';
       context.textBaseline="top";
       context.fillText(LanguageService.getString(language, "worksheetTitle"),0,0);
       return canv.toDataURL();
     }

     function createNameDate(language)
     {
       var canv = document.createElement('canvas');
       canv.id     = "nameDate";
       canv.width  = 500;
       canv.height  = 100;
       var context = canv.getContext("2d");
       context.font = 'normal 20px Neucha';
       context.textBaseline="top";
       context.textAlight="right";
       context.fillText(LanguageService.getString(language, "studentName")+": _____________",0,0);
       context.fillText(LanguageService.getString(language, "workDate")+": ____________",0,40);
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
          context.fillText("(c) RECHNENRUCKSACK.COM ",200,90);
          return canv.toDataURL();
        }
}
