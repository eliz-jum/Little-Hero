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

  $scope.back = function () {
    $state.go("tutorAvatars");
  }


  $scope.settings = function() {
    $state.go("settings");
  };

  $scope.taskCompleted = function (task) {
    childService.completeTask(task);
  }

  $scope.taskFailed = function (task) {
    console.log("task NOT completed");
    childService.failTask(task)
  }

  $scope.editTask = function (task) {
    
  }
  
  $scope.newTask = function () {
    $state.go("taskCreator");
  }
  
});
