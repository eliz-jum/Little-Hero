angular.module('littleHero').controller('TasksController', function($scope, $state, $stateParams, $window, dataService, ionicToast) {

    $scope.user = null;
    $scope.tasks = [];
    $scope.tasksStyles = [];

    $scope.$on('$ionicView.beforeEnter', function(){  

        $scope.user = $stateParams.user;
        $scope.allAvatars = $stateParams.allAvatars;
        $scope.currentAvatar = $stateParams.currentAvatar;
   
        if ($scope.tasks.length == 0 && $scope.currentAvatar != null) {           
            $scope.getTasks();

            $scope.tasks.forEach(function(task) {
                $scope.setTaskStyle(task);
            });

            console.log($scope.tasksStyles);
        }
    });


    $scope.swipeRight = function() {
        console.log("swipe right");
        $scope.tasks.length = 0;
        $state.go("main", { "allAvatars" : $scope.allAvatars, "currentAvatar" : $scope.currentAvatar, "user" : $scope.user });
    };

    $scope.settings = function() {
        $state.go("settings");
    };

    $scope.getTasks = function() {

        $scope.tasks.length = 0;
        $scope.tasksStyles.length = 0;

        dataService.getAvatarTasks($scope.user["id"],$scope.currentAvatar["id"]).then(function(res) {
            $scope.tasks = res.data;        
            /*$scope.getTasksForAvatar();*/
        });
    }

    /*$scope.getTasksForAvatar = function() {

        $scope.tasks.length = 0;
        $scope.tasksStyles.length = 0;        

        $scope.currentAvatar["tasks"].forEach(function(element) {
            $scope.allTasks.forEach(function(obj) {
                if (obj["id"] == element["id"]) {
                    $scope.tasks.push(obj);
                    $scope.tasksStyles.push($scope.setTaskStyle(obj));
                }
            });
        });
    }*/

    $scope.setTaskStyle = function(task) {
        console.log(task["difficulty"]);
        switch(task["difficulty"]) {
            case (1):
                $scope.tasksStyles.push('easy-task');
                break;
            case (2):
                $scope.tasksStyles.push('medium-task');
                break;
            case (3):
                $scope.tasksStyles.push('hard-task');
                break;
            }
    }

    $scope.markTaskCompleted = function(task) {
        console.log(task["difficulty"]);

    }
  
  $scope.dragRight = function() {
    $scope.showToast();
  };

  $scope.showToast = function(){
    <!-- ionicToast.show(message, position, stick, time); -->
    ionicToast.show('Pozdro', 'bottom', true, 2500);
  };
});
