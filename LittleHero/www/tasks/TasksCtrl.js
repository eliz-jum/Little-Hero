angular.module('littleHero').controller('TasksController', function($scope, $state, $window, dataService, childService, ionicToast) {


    $scope.tasks = [];
    $scope.tasksStyles = [];

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.currentAvatar = childService.currentAvatar;
      $scope.allAvatars = childService.avatarList;
      $scope.tasks = childService.tasks;
      console.log("tasks", childService.tasks)
    });

    $scope.$on('$ionicView.afterEnter', function(){
        $scope.showTasks();
    });

    $scope.swipeRight = function() {
        $scope.tasks.length = 0; //todo po co to???
        $state.go("main");
    };

    $scope.settings = function() {
        $state.go("settings");
    };



    $scope.showTasks = function() {
         if (childService.tasks.length != 0) {
            $scope.tasks.forEach(function(task) {
                $scope.setTaskStyle(task);
            });
        }
    }

  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 2500);
  };

});
