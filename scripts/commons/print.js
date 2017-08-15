PrintService.$inject = [];

// Print service print function takes HTML canvas as an input and converts it to pdf page

function PrintService() {

  var printService = this;

  printService.print = function(canvas) {

    console.log("Printing");

      var dataURL = canvas.toDataURL();

      var doc = new jsPDF({orientation: 'landscape'})

      doc.addImage(dataURL, 'PNG', 15, 15);

      window.open("data:application/pdf;base64, " + doc.output(), '_blank');
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
