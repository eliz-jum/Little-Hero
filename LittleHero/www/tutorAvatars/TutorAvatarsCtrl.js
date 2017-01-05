angular.module('littleHero').controller('TutorAvatarsController', function($scope, $state, $ionicModal, $http, dataService, childService){

  $scope.allAvatars = [];

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.tutor = childService.tutorObj;
    $scope.child = childService.childObj;

    //if (typeof childService.avatarList[0] !== "undefined") {
      $scope.allAvatars = childService.avatarList;
    //}
  });

  $scope.showAvatarTasks = function (avatar) {
    childService.currentAvatar = avatar;
    childService.currentAvatarId = avatar.id;
    childService.setAvatarTasksByTutor();

    setTimeout(function () {
      console.log("tutor ide do tasks",childService.tasks);
      $state.go("tutorTasks");
    }, 1000);


  }


  $scope.back = function () {
    $state.go("mainTutor");
  }



  $scope.settings = function() {
    $state.go("settings");
  };

});
