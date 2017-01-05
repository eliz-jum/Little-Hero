angular.module('littleHero').controller('NotificationsController', function($scope, $state, childService){

  $scope.notifications = [];

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.currentAvatar = childService.currentAvatar;
    $scope.allAvatars = childService.avatarList;

  });

  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("main");
  };



  $scope.settings = function() {
        $state.go("settings");
  };

  $scope.notifications=[
    "zaproszono Cię",
    "masz nowe zadanie!",
    "dostałeś nowy poziom!"
  ];
});
