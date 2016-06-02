angular.module('littleHero').controller('TasksController', function($scope, $state, $stateParams, $window, dataService, ionicToast) {

    $scope.username = "";
    $scope.tasks = [];
    $scope.tasksStyles = [];
    $scope.allTasks = []; //TODO: delete, when connected to rest

    $scope.$on('$ionicView.beforeEnter', function(){  

        $scope.username = $stateParams.username;
        $scope.allAvatars = $stateParams.allAvatars;
        $scope.currentAvatar = $stateParams.currentAvatar1;
   
        if ($scope.tasks.length == 0 && $scope.currentAvatar != null) {           
            $scope.getTasks();
        }
    });


    $scope.swipeRight = function() {
        console.log("swipe right");
        $scope.tasks.length = 0;
        $state.go("main", { "allAvatars" : $scope.allAvatars, "currentAvatar2" : $scope.currentAvatar, "username" : $scope.username });
    };

    $scope.settings = function() {
        $state.go("settings");
    };

    $scope.getTasks = function() {

        dataService.getTasks().then(function(res) {
            $scope.allTasks = res.data;
          
            $scope.getTasksForAvatar();
        });
    }

    $scope.getTasksForAvatar = function() {

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
    }

    $scope.setTaskStyle = function(task) {
        switch(task["difficulty"]) {
            case (1):
                return 'easy-task';
                break;
            case (2):
                return 'medium-task';
                break;
            case (3):
                return 'hard-task';
                break;
            }
    }
  
  $scope.dragRight = function() {
    $scope.showToast();
  };

  $scope.showToast = function(){
    <!-- ionicToast.show(message, position, stick, time); -->
    ionicToast.show('Pozdro', 'bottom', true, 2500);
  };
});
