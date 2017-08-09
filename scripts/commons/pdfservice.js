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
            width: 800
          }
        ]
    };
      pdfMake.createPdf(docDefinition).download('treasureMap.pdf');
    }
}
