(function () {
'use strict';

angular.module ('EquationsGenerator', [])
.controller ('EquationsGeneratorController', EquationsGeneratorController)
.service('LanguageService', LanguageService)
.service('EquationsGeneratorService', EquationsGeneratorService)
.service('ArithmeticService', ArithmeticService)
.service('HTMLService', HTMLService)
.service('TreasureMapDrawingService', TreasureMapDrawingService)
.service('PrintService', PrintService)
.constant('PrintServiceConstants', PrintServiceConstants);

})();
