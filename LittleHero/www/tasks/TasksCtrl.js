angular.module('littleHero').controller('TasksController', function($scope, $state, $stateParams, $window, dataService, ionicToast) {

    $scope.tasks = [];
    $scope.tasksStyles = [];
    $scope.allTasks = []; //TODO: delete, when connected to rest

    $scope.currentAvatar = null;
    $scope.allAvatars = null;

    $scope.$on('$ionicView.beforeEnter', function(){  
        $scope.allAvatars = $stateParams.allAvatars;
        $scope.currentAvatar = $stateParams.currentAvatar;
        
        if ($scope.currentAvatar != null) {          
            if ($scope.tasks[0] == null) {           
                $scope.getTasks();
            }
        }
    });

    $scope.$on('$ionicView.beforeLeave', function(){  
        $scope.currentAvatar = null;
    });

    $scope.swipeRight = function() {
        console.log("swipe right");
        $state.go("main", { "allAvatars" : $scope.allAvatars, "currentAvatar" : $scope.currentAvatar });
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

        $scope.tasks = [];
        $scope.tasksStyles = [];        

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
