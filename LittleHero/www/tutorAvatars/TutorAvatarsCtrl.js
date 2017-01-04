angular.module('littleHero').controller('TutorAvatarsController', function($scope, $state, $ionicModal, $http, dataService, childService){

  $scope.allAvatars = [];

  $scope.$on('$ionicView.beforeEnter', function () {
    console.log("jestem w avatars a lista:", childService.avatarList);
    //if (typeof childService.avatarList[0] !== "undefined") {

      $scope.child = childService.childObj;
      $scope.allAvatars = childService.avatarList;


    //}
  });

  $scope.showAvatarTasks = function (avatar) {
    childService.currentAvatar = avatar;
    childService.currentAvatarId = avatar.id;
    dataService.setTasks();
    console.log("showAvatarTaska!",dataService.tasks);



  }






  $scope.settings = function() {
    $state.go("settings");
  };

});
