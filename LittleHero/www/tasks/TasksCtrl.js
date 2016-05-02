angular.module('littleHero').controller('TasksController', function($scope, $state){
  $scope.swipeRight = function() {
    console.log("swipe right");
    $state.go("main");
  };
});
