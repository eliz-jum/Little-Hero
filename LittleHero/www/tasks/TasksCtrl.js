angular.module('littleHero').controller('TasksController', function($scope, $state, $stateParams, $window, dataService) {
    
    $scope.tasks = [];
    $scope.tasksStyles = [];
    $scope.allTasks = []; //TODO: delete, when connected to rest

    $scope.$on('$ionicView.beforeEnter', function(){  
        $scope.allAvatars = $stateParams.allAvatars;
        $scope.currentAvatar = $stateParams.currentAvatar;

        if ($scope.currentAvatar != null) {
            console.log($scope.currentAvatar["name"]);        
            $scope.getTasks();
        }
    });

    $scope.swipeRight = function() {
        console.log("swipe right");
        $state.go("main", { "allAvatars" : $scope.allAvatars, "currentAvatar" : $scope.currentAvatar }, {reload: true});
    };

    $scope.getTasks = function() {

        dataService.getTasks().then(function(res) {
            $scope.allTasks = res.data;
            
            $scope.currentAvatar["tasks"].forEach(function(element) {
                $scope.allTasks.forEach(function(obj) {
                    if (obj["id"] == element["id"]) {
                        $scope.tasks.push(obj);
                        $scope.tasksStyles.push($scope.setTaskStyle(obj));
                    }
                });
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
});
