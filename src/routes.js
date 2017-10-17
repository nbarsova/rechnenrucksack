(function () {
'use strict';

angular.module('RechnenRucksack')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/treasure/templates/home.html'
  })

  // Premade list page
  .state('treasureMap', {
    url: '/treasuremap',
    templateUrl: 'src/treasure/templates/treasuremap.html',
    controller: 'EquationsGeneratorController as equationsGenerator'
  })

  .state('secretCode', {
    url: '/secretcode',
    templateUrl: 'src/treasure/templates/secretcode.html'
    //controller: 'SecretCodeController as secretCode'
  });
}

})();
