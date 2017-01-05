angular.module('littleHero').controller('TaskCreatorController', function($scope, $state, $stateParams, $http, dataService, childService){

  $scope.newTask = {};


  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.tutor = childService.tutorObj;
  });

  $scope.back = function () {
    $state.go("tutorTasks");
  }




  $scope.validate=function() {
    var description = document.getElementById("new-task-description").value;
    var money = document.getElementById("new-task-money").value;
    var exp = document.getElementById("new-task-experience").value;

    console.log(description);
    console.log(money);
    console.log(exp);

    if (description && money && exp) {
      //todo lepsza walidacja powinna byc
      var newTask = {
        is_archived: false,
        tutor_id: childService.tutorObj.id,
        avatar_id: childService.currentAvatarId,
        is_completed: false,
        reward: money,
        experience: exp,
        content: description
      };
      console.log("newTask",newTask);
      createNewTask(newTask);
    }
    else {
      $scope.invalid=true;
    }
  }

  var createNewTask = function(newTask) {
    childService.tasks.push(newTask);
    dataService.postTask(newTask);
    $state.go("tutorTasks");

  }
});
