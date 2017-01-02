angular.module('littleHero').controller('TasksController', function($scope, $state, $stateParams, $window, dataService, childService, ionicToast) {


    $scope.tasks = [];
    $scope.tasksStyles = [];
    $scope.dynamicStyle = [];

    $scope.$on('$ionicView.beforeEnter', function(){

      $scope.currentAvatar = childService.currentAvatar;
      $scope.allAvatars = childService.avatarList;

      //childService.setTasks();
      childService.hardcodeAvatarTasks();

      $scope.tasks = childService.tasks;
      //console.log(childService.tasks);

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


    $scope.setTaskStyle = function(task) {
        switch(task["difficulty"]) {
            case (1):
                $scope.dynamicStyle.push('easy-task');
                break;
            case (2):
                $scope.dynamicStyle.push('medium-task');
                break;
            case (3):
                $scope.dynamicStyle.push('hard-task');
                break;
            }
    }

  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 2500);
  };

});
