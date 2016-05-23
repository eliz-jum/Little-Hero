angular.module('littleHero').controller('NotificationsController', function($scope, $state){
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("main");
  };

  $scope.notifications=[
    "zaprosznono Cię",
    "masz nowe zadanie!",
    "dostałeś nowy poziom!"
  ];
});
