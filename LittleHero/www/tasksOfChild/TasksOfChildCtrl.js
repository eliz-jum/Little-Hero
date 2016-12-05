/**
 * Created by Sekuranka on 2016-10-18.
 */
angular.module('littleHero').controller('TasksOfChildController', function($scope, $state, $http){
  $scope.data = {
    showCheck: false
  };
  $scope.uncheck = function(item) {
    alert('Zadanie niewykonane: ' + item.id);
  };

  $scope.check = function(item) {
    alert('Zadanie wykonane: ' + item.id);
  };

  $scope.settings = function() {
    $state.go("settings");
  };

  $scope.addNew = function() {
    $state.go("tasksCreator");
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
