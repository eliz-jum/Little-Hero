angular.module('littleHero').controller('tutorTasksController', function($scope, $state, $ionicModal, $http, dataService, childService, ionicToast){

  $scope.allAvatars = [];

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.tutor = childService.tutorObj;
    $scope.avatar = childService.currentAvatar;

    $scope.avatarTasks = childService.tasks;

  });

  $scope.back = function () {
    $state.go("tutorAvatars");
  }

  $scope.settings = function() {
    $state.go("settings");
  };

  var showToast = function(message){
    ionicToast.show(message, 'bottom', false, 2500);
  };

  $scope.taskCompleted = function (task) {
    childService.currentAvatar.update_task = true;
    childService.completeTask(task);
    childService.addNotification("Udało się! Wykonałeś wyzwanie:  " + task.content +
      "  Dostajesz " + task.reward + " pieniędzy i " + task.experience + " doświadczenia!");
    showToast("Wyzwanie zaliczone");
  }

  $scope.taskFailed = function (task) {
    childService.currentAvatar.update_task = true;
    childService.failTask(task);
    childService.addNotification("Nie podołałeś wyzwaniu:  " + task.content +
      "  Tracisz " + task.reward + " pieniędzy i " + task.experience + " życia.");
    showToast("Wyzwanie niewykonane");
  }

  $scope.editTask = function (task) {
    childService.currentTask = task;
    $state.go("tutorEditTask");
  }

  $scope.newTask = function () {
    $state.go("taskCreator");
  }

});
