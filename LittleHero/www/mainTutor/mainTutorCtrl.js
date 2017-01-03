angular.module('littleHero').controller('MTController', function($scope, $state, $ionicModal, $http, dataService, childService){

  $scope.allAvatars = null;
  $scope.currentAvatar = null;
  $scope.showAvatar = false;

  $scope.$on('$ionicView.beforeEnter', function () {
    
    // if (typeof childService.currentAvatar.id !== "undefined") {
    $scope.currentAvatar = childService.currentAvatar;
    $scope.allAvatars = childService.avatarList;
    childService.setTasks();
    
    // }
  });








  $scope.settings = function() {
      $state.go("settings");
  };

});
