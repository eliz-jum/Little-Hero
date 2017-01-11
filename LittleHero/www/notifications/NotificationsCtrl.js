angular.module('littleHero').controller('NotificationsController', function($scope, $state, dataService, childService){

  $scope.notifications = [];

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.currentAvatar = childService.currentAvatar;
    $scope.allAvatars = childService.avatarList;
    $scope.notifications = childService.notifications;
  });

  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("main");
  };

  $scope.settings = function() {
    $state.go("settings");
  };

  $scope.deleteNotification = function (notification) {
    var index = childService.notifications.indexOf(notification);
    childService.notifications.splice(index, 1);
    dataService.deleteNotification(childService.currentAvatarId, notification.id);
  }

});
