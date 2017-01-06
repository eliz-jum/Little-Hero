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
    childService.addNotification("Udało się! Wykonałeś wyzwanie:  " + task.content +
      "  Dostajesz " + task.reward + " pieniędzy i " + task.experience + " doświadczenia!");
  }

  $scope.taskFailed = function (task) {
    childService.failTask(task);
    childService.addNotification("Nie podołałeś wyzwaniu:  " + task.content +
      "  Tracisz " + task.reward + " pieniędzy i " + task.experience + " doświadczenia.");
  }

  $scope.editTask = function (task) {
    childService.currentTask = task;
    $state.go("tutorEditTask");
  }

  $scope.newTask = function () {
    $state.go("taskCreator");
  }

});
