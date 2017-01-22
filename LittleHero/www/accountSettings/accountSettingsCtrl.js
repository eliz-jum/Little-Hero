angular.module('littleHero').controller('accountSettingsController', function($scope, $state, $http, dataService, childService, ionicToast){

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.tutor = childService.tutorObj;
    $scope.description = childService.currentTask.content;
    $scope.money = childService.currentTask.reward;


  });

  $scope.back = function () {
    $state.go("settings");
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


});
