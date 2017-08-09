(function () {
'use strict';

angular.module ('EquationsGenerator', [])
.controller ('EquationsGeneratorController', EquationsGeneratorController)
.service('EquationsGeneratorService', EquationsGeneratorService)
.service('ArithmeticService', ArithmeticService)
.service('PrintService', PrintService)
.service('TreasureMapDrawingService', TreasureMapDrawingService)
.directive('sampleTreasureMap', SampleTreasureMap);

})();
