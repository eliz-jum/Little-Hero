angular.module('littleHero').controller('TutorEditTaskController', function($scope, $state, $stateParams, $http, dataService, childService){

  $scope.newTask = {};


  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.tutor = childService.tutorObj;
    $scope.description = childService.currentTask.content;
    $scope.money = childService.currentTask.reward;
    $scope.experience = childService.currentTask.experience;

  });

  $scope.back = function () {
    $state.go("tutorTasks");
  }

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
      console.log("changes",changes);
      dataService.patchTask(childService.currentTask.id, changes);
      $state.go("tutorTasks");
    }
    else {
      $scope.invalid=true;
    }
  }

});
