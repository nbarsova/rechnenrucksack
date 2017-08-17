PrintService.$inject = ['LanguageService'];

// Print service print function takes HTML canvas as an input and converts it to pdf page

function PrintService(LanguageService) {

  var printService = this;

  printService.print = function(canvas, language, options) {

    console.log("Printing");

      var dataURL = canvas.toDataURL();

      var doc = new jsPDF({orientation: 'landscape'});

      doc.addImage(dataURL, 'PNG', 25, 30);
      doc.addImage(createTitle(language), 'PNG', 30, 10);
      doc.addImage(createCopyright(), 'PNG', 130, 160);

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

     function createCopyright ()
        {
          var canv = document.createElement('canvas');
          canv.id     = "cop";
          canv.width  = 600;
          var context = canv.getContext("2d");
          context.font = 'normal 36px Neucha';
          context.fillStyle = '#888888';
          context.textBaseline="middle";
          context.fillText("(c) RECHNENRUCKSACK.COM ",180,80);
          return canv.toDataURL();
        }
}
