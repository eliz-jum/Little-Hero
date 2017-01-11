angular.module('littleHero').controller('TutorEditTaskController', function($scope, $state, $http, dataService, childService, ionicToast){

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.tutor = childService.tutorObj;
    $scope.description = childService.currentTask.content;
    $scope.money = childService.currentTask.reward;
    $scope.experience = childService.currentTask.experience;

  });

  $scope.back = function () {
    $state.go("tutorTasks");
  };

  $scope.settings = function() {
    $state.go("settings");
  };

  $scope.validate=function() {
    var description = document.getElementById("edit-task-description").value;
    var money = parseInt(document.getElementById("edit-task-money").value);
    var experience = parseInt(document.getElementById("edit-task-experience").value);

    console.log(description);
    console.log(money);
    console.log(experience);

    if ($scope.description && $scope.money && $scope.experience) {
      //todo lepsza walidacja powinna byc
      var changes = {
        reward: money,
        experience: experience,
        content: description
      };
      dataService.patchTask(childService.currentTask.id, changes);
      childService.addNotification(childService.tutorObj.login + " dokonał zmian w wyzwaniu:  " + childService.currentTask.content);

      $state.go("tutorTasks");
    }
    else {
      $scope.invalid=true;
    }
  };

  $scope.deleteTask = function (){
    dataService.deleteTask(childService.currentTask.id).then(function() {
      var index = childService.tasks.indexOf(childService.currentTask);
      childService.tasks.splice(index, 1);
      $state.go("tutorTasks");
      ionicToast.show("Zadanie usunięte", 'bottom', false, 2500);
    });
  }

});
