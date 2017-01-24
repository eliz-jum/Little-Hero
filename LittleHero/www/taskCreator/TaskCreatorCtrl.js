angular.module('littleHero').controller('TaskCreatorController', function($scope, $state, $http, dataService, childService){

  $scope.newTask = {};
  $scope.errorMessage = "";

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.tutor = childService.tutorObj;
  });

  $scope.back = function () {
    $state.go("tutorTasks");
  }

  $scope.settings = function() {
    $state.go("settings");
  };

  $scope.validate=function() {
    $scope.errorMessage = "";
    var description = document.getElementById("new-task-description").value;
    var money = parseInt(document.getElementById("new-task-money").value);
    var experience = parseInt(document.getElementById("new-task-experience").value);

    if (description && money!==NaN && experience!==NaN) {
      if (description.length < 100) {
        if (money>0 && money<100){
          if (experience>0 && experience<100){
            var newTask = {
              is_archived: false,
              tutor_id: childService.tutorObj.id,
              avatar_id: childService.currentAvatarId,
              is_completed: false,
              reward: money,
              experience: experience,
              content: description
            };
            createNewTask(newTask);
          }
          else{
            $scope.invalid = true;
            $scope.errorMessage = "Możesz przydzielić 1-99 doświadczenia.";
          }
        }
        else{
          $scope.invalid = true;
          $scope.errorMessage = "Możesz przydzielić 1-99 pieniędzy.";
        }
      }
      else{
        $scope.invalid = true;
        $scope.errorMessage = "Za długi opis. Maksymalnie 2000 znaków.";
      }
    }
    else {
      $scope.invalid = true;
      $scope.errorMessage = "Niepoprawne dane.";
    }
  }

  var createNewTask = function(newTask) {

    var task;
    dataService.postTask(newTask).then(function (res) {
      task = res.data;
      childService.tasks.push(task);
    });
    childService.addNotification(childService.tutorObj.login + " dał ci nowe wyzwanie!   " + newTask.content);
    dataService.patchAvatar(childService.currentAvatarId, {"update_notification": true});
    //todo update_task: true ale tylko jeśli dodamy flagę update_stats
    
    $state.go("tutorTasks");

  }
});
