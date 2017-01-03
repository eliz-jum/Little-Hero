angular.module('littleHero').controller('TutorAvatarsController', function($scope, $state, $ionicModal, $http, dataService, childService){

  $scope.children = [];
  $scope.avatars = [];

  $scope.$on('$ionicView.beforeEnter', function () {

    // if (typeof childService.tutorChildren !== "undefined") {
    $scope.children = childService.tutorChildren;

    childService.setTutorAvatarListByChildId();


    $scope.currentAvatar = childService.currentAvatar;
    $scope.allAvatars = childService.avatarList;
    childService.setTasks();

    // }
  });

  $scope.showChildAvatars = function (child) {
    childService.childObj = child;
    dataService.setTutorAvatarListByChildId();



  }






  $scope.settings = function() {
    $state.go("settings");
  };

});
