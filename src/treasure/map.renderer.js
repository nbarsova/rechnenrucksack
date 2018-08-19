/**
 * Drawing service creates canvases with treasure maps and teacher answers
 * @param $q promises service
 */


(function () {
"use strict";

angular.module('RechnenRucksack')
  .service('TreasureMapDrawingService', TreasureMapDrawingService);

TreasureMapDrawingService.$inject = ['$q', '$translate','StringUtilService'];

function TreasureMapDrawingService($q, $translate, StringUtilService) {

  var drawingService = this;

  /**
   * Create student page canvas
   * @param targetCoordinates array of targets
   * @param fieldSize treasure map size (in cells)
   * @param equations set of equations leading to one of the targets, generated by arithmetic service
   * @param pageOrientation may be Landscape and portrait
   * @return promise of treasure map
   */



   drawingService.createStudentPage = function (targetCoordinates,
                                              fieldSize,
                                              equations,
                                              pageOrientation)
  {
    var deferred = $q.defer();
    var canvas = document.createElement('canvas');
    canvas.id  = "treasureMapCanvas";
    var translationPromises = [];
    translationPromises.push(StringUtilService.requestTranslation("dirRight"));
    translationPromises.push(StringUtilService.requestTranslation("dirLeft"));
    translationPromises.push(StringUtilService.requestTranslation("dirUp"));
    translationPromises.push(StringUtilService.requestTranslation("dirDown"));
    translationPromises.push(StringUtilService.requestTranslation("steps"));
    translationPromises.push(StringUtilService.requestTranslation("worksheetDesc"));

    Promise.all(translationPromises).then(function (result) {
      var prrr;
      switch (pageOrientation)
    {
      case ('landscape'):
        prrr = drawingService.createLandscapeLayout(canvas, targetCoordinates, fieldSize, equations);
        break;
      case ('portrait'):
        prrr = drawingService.createPortraitLayout(canvas, targetCoordinates, fieldSize, equations);
        break;
    }
    prrr.then(function (result) {
      deferred.resolve(canvas);
    });
  });
  return deferred.promise;
  }

  /**
   * Creates landscape layout student page
   * @param canvas canvas on which the map will be drawn
   * @param targetCoordinates array of targets
   * @param fieldSize treasure map size (in cells)
   * @param equations set of equations leading to one of the targets, generated by arithmetic service
   * @return promise of treasure map
   */

  drawingService.createLandscapeLayout = function (canvas, targetCoordinates, fieldSize, equations)
  {
    var deferred = $q.defer();

    canvas.width=1000;
    canvas.height=550;

    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawingService.drawGrid (canvas, targetCoordinates,
                                                fieldSize, 20, 20);

    var descriptionArr = StringUtilService.breakString(StringUtilService.translationsObject.worksheetDesc);
    for (var j=0;j<descriptionArr.length;j++)
      {
        context.font = "20px PT Sans";
        context.fillText(descriptionArr[j],520,80+j*30);
      }

    var border=new Image();

    border.src='img/map-border-horizontal.png';

    border.onload=function() {

    context.drawImage(this, 0, 0, canvas.width, canvas.height);

    for (var ii=0; ii<equations.length; ii++)
    {
        context.font = "20px PT Sans";
        var axis="";
        if (ii%2==0)
        {
          axis="horizontal";
        } else {
          axis="vertical";
        }

        context.fillText((ii+1)+"). "+equations[ii].equation+" = __ "+StringUtilService.translationsObject.steps+" "+drawingService.setDirection(equations[ii].step, axis)+"\n",520,200+ii*30);
    }
    var compass=new Image();
    compass.src='img/compass.png';
    compass.onload=function() {
      context.drawImage(this, 850, 380, 100, 120);
    }
      deferred.resolve(canvas);
    }
      return deferred.promise;
};

/**
 * Creates portrait layout student page
 * Right now the design of the portrait page is awkward, so this option is disabled,
 * beautiful design TBD
 * @param canvas canvas on which the map will be drawn
 * @param targetCoordinates array of targets
 * @param fieldSize treasure map size (in cells)
 * @param equations set of equations leading to one of the targets, generated by arithmetic service
 * @param language "ru" (Russian), "de" (German), "en" (English
 * @return promise of treasure map
 */
drawingService.createPortraitLayout = function (canvas, targetCoordinates, fieldSize, equations)
{
  // TBD
  var deferred = $q.defer();
  deferred.resolve(canvas);
  return deferred.promise;
};

/**
 * Create teacher page canvas (answer key)
 * @param targetCoordinates array of targets
 * @param equations set of equations leading to one of the targets, generated by arithmetic service
 * @param steps answers to the equations (signed numbers!!!)
 * @param currentTarget the coordinates of target stone
 * @param pageOrientation may be Landscape and portrait
 * @return promise of teacher answer key
 */
drawingService.createTeacherPage = function (targetCoordinates,
                                             equations,
                                             steps,
                                             currentTarget,
                                             pageOrientation)
  {
    var deferred = $q.defer();

    var translationPromises = [];
    var translationPromises = [];

    translationPromises.push(StringUtilService.requestTranslation("answer"));
    translationPromises.push(StringUtilService.requestTranslation("treasureLocation"));
    translationPromises.push(StringUtilService.requestTranslation("upperRight"));
    translationPromises.push(StringUtilService.requestTranslation("lowerRight"));
    translationPromises.push(StringUtilService.requestTranslation("upperLeft"));
    translationPromises.push(StringUtilService.requestTranslation("lowerLeft"));

    Promise.all(translationPromises).then(function (result) {

    var canv = document.createElement('canvas');
    canv.id     = "teacherPage";
    canv.width  = 1000;
    canv.height  = 550;
    var context = canv.getContext("2d");

     for (var ii=0; ii<equations.length; ii++)
    {
      context.font = 'normal 20px PT Sans';
      context.fillStyle = "#FFFFFFF";
      var axis="";
      if (ii%2==0)
      {
        axis="horizontal";
      } else {
        axis="vertical";
      }
      context.fillText((ii+1)+"). "+equations[ii].equation+" = __ "+StringUtilService.translationsObject.steps+ " "+drawingService.setDirection(equations[ii].step, axis)+"\n",10,20+ii*30);

      context.font = 'normal 20px Courgette';
      context.fillStyle = "#FFFFFFF";
      context.fillText(Math.abs(steps[ii]),
                    45+Math.trunc((ii+1)/10)*10+equations[ii].equation.length*10,
                    20+ii*30);
    }

    context.font = 'bold 20px PT Sans';
    context.fillText(StringUtilService.translationsObject.answer+": ", 10, 75+steps.length*25);
    context.font = 'normal 20px PT Sans';
    if ((currentTarget.x>0)&&(currentTarget.y>0))
    {
      context.fillText(StringUtilService.translationsObject.treasureLocation+" "+StringUtilService.translationsObject.upperRight+".", StringUtilService.translationsObject.answer.length*12+10, 75+steps.length*25);
    }

    if ((currentTarget.x>0)&&(currentTarget.y<0))
    {
      context.fillText(StringUtilService.translationsObject.treasureLocation+" "+StringUtilService.translationsObject.lowerRight+".", StringUtilService.translationsObject.answer.length*12+10, 75+steps.length*25);
    }

    if ((currentTarget.x<0)&&(currentTarget.y>0))
    {
      context.fillText(StringUtilService.translationsObject.treasureLocation+" "+StringUtilService.translationsObject.upperLeft+".", StringUtilService.translationsObject.answer.length*12+10, 75+steps.length*25);
    }

    if ((currentTarget.x<0)&&(currentTarget.y<0))
    {
      context.fillText(StringUtilService.translationsObject.treasureLocation+" "+StringUtilService.translationsObject.lowerLeft+".", StringUtilService.translationsObject.answer.length*12+10, 75+steps.length*25);
    }
    deferred.resolve(canv);
  });
    return deferred.promise;
  }

  /**
   * Auxillary method creating a treasure map grid of given dimensions on a given place of a canvas
   * @param canvas canvas on which the map will be drawn
   * @param targetCoordinates array of targets, will be drawn as stones
   * @param fieldSize treasure map size (in cells)
   * @param startX x coordinate of upper left corner of the grid
   * @param startY y coordinate of upper left corner of the grid
   */

  drawingService.drawGrid = function (canvas, targetCoordinates,
                                              fieldSize, startX, startY)
  {
      var context = canvas.getContext("2d");
      var mapStep=20;

      if (Number(fieldSize)===5)
      {
        mapStep = 40;
      } else if (Number(fieldSize)===10)
      {
        mapStep = 20;
      }

      context.strokeStyle = '#888888';
      context.lineWidth = 1;

      for (var ik=startX; ik<=480+startX; ik+=mapStep)
        {
          context.beginPath();
          context.moveTo(ik,startY-5);
          context.lineTo(ik,485+startY);
          context.stroke();
        }

        for (var j=startY; j<=480+startY; j+=mapStep)
        {
          context.beginPath();
          context.moveTo(startX-5, j);
          context.lineTo(485+startX, j);
          context.stroke();
        }

        // a cross in the center

        context.strokeStyle = '#000000';
        context.lineWidth = 3;

        context.beginPath();
        context.moveTo(232+startX, 232+startY);
        context.lineTo(248+startX, 248+startY);
        context.stroke();

        context.moveTo(232+startX, 248+startY);
        context.lineTo(248+startX, 232+startY);
        context.stroke();

        /* this is an elaborate way to draw all the target pics one by one
         * but may come in useful if target pics will be all different
    var targetPics=[];

    targetPics[0] = new Image();
    targetPics[0].src='img/stones.png';
    var i=0;
    targetPics[0].onload=function() {
      context.drawImage(this,targetCoordinates[i].x*mapStep+startX+230,-targetCoordinates[i].y*mapStep+startY+230);
      if (i<targetCoordinates.length)
        i++;
        targetPics[i]=new Image();
        targetPics[i].src='img/stones.png';
        targetPics[i].onload=this.onload;
      }; */

      var stonePic = new Image();
      stonePic.src = 'img/stones.png';
      stonePic.onload=function ()
      {
        for (var i=0; i<targetCoordinates.length; i++)
        {
          context.drawImage(this,targetCoordinates[i].x*mapStep+startX+230,-targetCoordinates[i].y*mapStep+startY+230);
        }
      }
  }

  /**
   * Set the direction of next step on the map
   * @param number value of the step
   * @param axis do we walk right/left or up/down
 */

  drawingService.setDirection = function (number, axis)
  {
    let direction = "";
    switch (axis)
    {
    case "vertical":
        if (Math.sign(number) === 1) {
              return StringUtilService.translationsObject.dirUp;
        } else {
            return StringUtilService.translationsObject.dirDown;
        }
      break;
    case 'horizontal':
      if (Math.sign(number) === 1) {
          return StringUtilService.translationsObject.dirRight;
        } else {
          return StringUtilService.translationsObject.dirLeft;
        }
    break;
  }
};


}
})();
