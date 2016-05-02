angular.module('littleHero').controller('MainController', function($scope, $state){
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("tasks");
  };
});
