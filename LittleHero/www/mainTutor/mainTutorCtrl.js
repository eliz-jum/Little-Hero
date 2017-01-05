angular.module('littleHero').controller('MTController', function($scope, $state, $ionicModal, $http, dataService, childService){

  $scope.children = [];
  $scope.avatars = [];

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.tutor = childService.tutorObj;
    // if (typeof childService.tutorChildren !== "undefined") {
    $scope.children = childService.tutorChildren;

    childService.setTutorAvatarListByChildId();

    $scope.currentAvatar = childService.currentAvatar;
    $scope.allAvatars = childService.avatarList;

    // }
  });

  $scope.showChildAvatars = function (child) {
    childService.childObj = child;
    childService.setTutorAvatarListByChildId();
    
    setTimeout(function () {
      console.log("tutor ide do avatars",childService);
      $state.go("tutorAvatars");
    }, 1000);



  }




  $scope.settings = function() {
      $state.go("settingsTutor");
  };

});
