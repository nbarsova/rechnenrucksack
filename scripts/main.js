(function () {
'use strict';

angular.module ('EquationsGenerator', [])
.controller ('EquationsGeneratorController', EquationsGeneratorController)
.service('EquationsGeneratorService', EquationsGeneratorService)
.service('ArithmeticService', ArithmeticService)
.service('TreasureMapDrawingService', TreasureMapDrawingService)
.service('PrintService', PrintService)
.directive('sampleTreasureMap', SampleTreasureMap);

})();
