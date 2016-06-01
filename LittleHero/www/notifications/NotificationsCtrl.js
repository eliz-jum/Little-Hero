angular.module('littleHero').controller('NotificationsController', function($scope, $state, $stateParams){
  
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("main", { "allAvatars" : $scope.allAvatars, "currentAvatar" : $scope.currentAvatar, "username" : $scope.username });
  };

  $scope.$on('$ionicView.beforeEnter', function(){  
        $scope.allAvatars = $stateParams.allAvatars;
        $scope.currentAvatar = $stateParams.currentAvatar;
        $scope.username = $stateParams.username;
  });

  $scope.settings = function() {
        $state.go("settings");
  };

  $scope.notifications=[
    "zaproszono Cię",
    "masz nowe zadanie!",
    "dostałeś nowy poziom!"
  ];
});
