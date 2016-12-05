/**
 * Created by Sekuranka on 2016-10-18.
 */
angular.module('littleHero').controller('ParentMainController', function($scope, $state, $http){

  $scope.destroy = function(item) {
    alert('Destroy Item: ' + item.id);
  };
  
  $scope.settings = function() {
    $state.go("settings");
  };

  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 }
  ];
});
