angular.module('littleHero').controller('TasksController', function($scope, $state, $stateParams, $window, dataService, ionicToast) {

    $scope.user = null;
    $scope.tasks = [];
    $scope.tasksStyles = [];
    $scope.dynamicStyle = [];

    $scope.$on('$ionicView.beforeEnter', function(){

        $scope.user = $stateParams.user;
        $scope.allAvatars = $stateParams.allAvatars;
        $scope.currentAvatar = $stateParams.currentAvatar;

        if ($scope.tasks.length == 0 && $scope.currentAvatar != null) {
            $scope.getTasks();
        }
    });

    $scope.$on('$ionicView.afterEnter', function(){

        $scope.updateTasks();
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
        });
    }

    $scope.updateTasks = function() {
         if ($scope.tasks.length != 0) {
            $scope.tasks.forEach(function(task) {
                $scope.setTaskStyle(task);
            });
        }
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

    $scope.markTaskCompleted = function(task) {

        var patchTask = {};
        var patchContent = [];

        patchTask["op"] = "replace";
        patchTask["path"] = "/isCompleted";
        patchTask["value"] = true;
        patchContent.push(patchTask);

        $scope.showToast("Opiekun został poinformowany");

        dataService.patchTaskCompleted(task["id"], patchContent).then(function(res) {
            console.log(res.data);
        });
    };

  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 2500);
  };

});
