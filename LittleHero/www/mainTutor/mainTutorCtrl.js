angular.module('littleHero').controller('MTController', function($scope, $state, $stateParams, $ionicModal, $http, dataService){

  $scope.settings = function() {
      $state.go("settingsTutor");
  };

});
