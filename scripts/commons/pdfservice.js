PrintService.$inject = [];

// Print service print function takes HTML canvas as an input and converts it to pdf page

function PrintService() {

  var printService = this;

  printService.print = function(canvas) {

      var dataURL = canvas.toDataURL();
      var docDefinition = {
      pageSize: 'A4',
        
      // TBD: orientation settings here
        
      pageOrientation: 'landscape',
      content:
        [
          { image: dataURL,
            width: 800,
          },
          /* TBD: make nice copyright
          {
            image: printService.createCopyright()
          }*/
      ]
    };
      pdfMake.createPdf(docDefinition).download('treasureMap.pdf');
    }

    printService.createCopyright= function()
    {
      var canv = document.createElement('canvas');
      canv.id     = "cop";
      canv.width  = 500;
      var context = canv.getContext("2d");
      context.fillText("(c) RECHNENRUCKSACK.COM ",180,80);
      return canv.toDataURL();
    }
}
