angular.module('littleHero').controller('tutorTasksController', function($scope, $state, $ionicModal, $http, dataService, childService){

  $scope.allAvatars = [];

  $scope.$on('$ionicView.beforeEnter', function () {
    console.log("jestem w tasks");
    $scope.tutor = childService.tutorObj;
    $scope.avatar = childService.currentAvatar;

    //if (typeof childService.tasks[0] !== "undefined") {

    $scope.avatarTasks = childService.tasks;


    //}
  });







  $scope.settings = function() {
    $state.go("settings");
  };

});
