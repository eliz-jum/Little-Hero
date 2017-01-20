angular.module('littleHero').controller('EditAccountController', function($scope, $state, $http, dataService, childService, ionicToast){

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.tutor = childService.tutorObj;
    $scope.description = childService.currentTask.content;
    $scope.money = childService.currentTask.reward;


  });

  $scope.back = function () {
    $state.go("main");
  };

  $scope.validate=function() {
    var login = document.getElementById("edit-account-login").value;
    var password = parseInt(document.getElementById("edit-sccount-password").value);


    console.log(login);
    console.log(password);


    if ($scope.login && $scope.password) {
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
