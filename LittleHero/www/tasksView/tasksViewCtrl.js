angular.module('littleHero').controller('tasksViewController', function($scope, $state, $stateParams, dataService) {

    $scope.$on('$ionicView.beforeEnter', function(){

        $scope.user = $stateParams.user;
        $scope.currentAvatar = $stateParams.currentAvatar;

        if ($scope.allAvatarTasks.length == 0 && $scope.currentAvatar != null) {
            $scope.getTasks();
        }
    });

    $scope.swipeLeft = function() {
        $state.go("mainTutor", { "allAvatars" : $scope.allAvatars, "currentAvatar" : $scope.currentAvatar, "user" : $scope.user });
    };

    $scope.allAvatarTasks = []

    $scope.getTasks = function() {
        $scope.allAvatarTasks.length = 0;

        dataService.getAvatarTutorTasks($scope.user["id"],$scope.currentAvatar["id"]).then(function(res) {
            $scope.allAvatarTasks = res.data;
        });

    };

    $scope.acceptTask = function(task) {
        var patchMoney = {};
        var patchExperience = {};
        var patchContent = [];

        patchMoney["op"] = "replace";
        patchMoney["path"] = "/money";
        patchMoney["value"] = $scope.currentAvatar["money"] + task.money;
        patchContent.push(patchMoney);

        patchExperience["op"] = "replace";
        patchExperience["path"] = "/experience";
        patchExperience["value"] = $scope.currentAvatar["experience"] + task.experiencePoints;
        patchContent.push(patchExperience);

        dataService.patchTaskFullyCompleted($scope.currentAvatar["id"], patchContent).then(function(res) {
            console.log(res.data);
        });

        $scope.deleteTask(task);

    };

    $scope.deleteTask = function(task) {
        var index = $scope.allAvatarTasks.indexOf(task);

        if (index > -1) {
            $scope.allAvatarTasks.splice(index, 1);
        }

        $scope.deleteTaskRemotely(task);
   };

   $scope.deleteTaskRemotely  = function(task) {
        dataService.deleteTask($scope.user["id"],task["id"]).then(function(res) {
            console.log(res.data);
        });


   };

});
