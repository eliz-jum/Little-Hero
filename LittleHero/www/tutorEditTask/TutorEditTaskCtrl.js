angular.module('littleHero').controller('TutorEditTaskController',
  function($scope, $state, $http, dataService, childService, ionicToast, $ionicModal){

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.tutor = childService.tutorObj;
    $scope.description = childService.currentTask.content;
    $scope.money = childService.currentTask.reward;
    $scope.experience = childService.currentTask.experience;
  });

    $scope.resizeTextarea = function (o) {
      o.style.height = "1px";
      o.style.height = (25+o.scrollHeight)+"px";
    }

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

    if (description && money!==NaN && experience!==NaN) {

      if (description !== childService.currentTask.content ||
        money !== childService.currentTask.reward ||
        experience !== childService.currentTask.experience) {
        if (description.length < 100) {
          if (money>0 && money<100){
            if (experience>0 && experience<100){
              var changes = {
                reward: money,
                experience: experience,
                content: description
              };
              dataService.patchTask(childService.currentTask.id, changes);
              childService.addNotification(childService.tutorObj.login + " dokonał zmian w wyzwaniu:  " + childService.currentTask.content);
              dataService.patchAvatar(childService.currentAvatarId, {"update_notification": true});
              //todo update_task: true ale tylko jeśli dodamy flagę update_stats

              var index = childService.tasks.indexOf(childService.currentTask);
              childService.tasks[index].reward = money;
              childService.tasks[index].experience = experience;
              childService.tasks[index].content = description;



              $state.go("tutorTasks");
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
        $scope.errorMessage = "Nie wprowadziłeś żadnych zmian!";
      }
    }
    else {
      $scope.invalid = true;
      $scope.errorMessage = "Niepoprawne dane.";
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

    $ionicModal.fromTemplateUrl('tutorEditTask/confirmationModal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

});

