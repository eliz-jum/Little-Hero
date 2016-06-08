angular.module('littleHero').controller('TasksCreatorController', function($scope, $state, $stateParams, $http, dataService){

  $scope.newTask = {};
  $scope.difficulty = {id: 0, name: "Wybór poziomu trudności"} 

  $scope.diffi = [
    { id: 1, name: "łatwe" },
    { id: 2, name: "średnie" },
    { id: 3, name: "trudne" }
  ]
      
  $scope.$on('$ionicView.beforeEnter', function(){       
        $scope.user = $stateParams.user;
        $scope.currentAvatar = $stateParams.currentAvatar;
  });

  $scope.validate=function() {
    if ($scope.description && $scope.amountCash && $scope.amountExperience) {
        
        $scope.newTask["content"] = $scope.description;
        $scope.newTask["avatarId"] = $scope.currentAvatar["id"];
        $scope.newTask["experiencePoints"] = Number($scope.amountExperience);
        $scope.newTask["money"] = Number($scope.amountCash);
        $scope.newTask["difficulty"] = $scope.difficulty["id"];
        
        $scope.createNewTask();

        $state.go("mainTutor", { "user" : $scope.user, "currentAvatar" : $scope.currentAvatar }); 
        
    }
      else { $scope.invalid=true }
  }

    $scope.createNewTask = function() {
        dataService.postTask($scope.user["id"],$scope.newTask).then(function(res) {
            console.log(res);
      });

  }
});
