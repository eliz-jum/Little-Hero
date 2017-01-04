angular.module('littleHero').controller('RegistrationController', function($scope, $state, $http, $stateParams, dataService, ionicToast){

    $scope.children = [];
    $scope.tutors = [];
    $scope.newAccount = {};

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getTutors().then(function (res) {
            tutors = res.data;
        });

        dataService.getChildren().then(function (res) {
            children = res;
        });
    });

     $scope.validate = function() {

        if ($scope.login && $scope.password && $scope.email) {
            if ($scope.checkIfAccountExists()) {       

                $scope.newAccount["login"] = $scope.login;
                $scope.newAccount["password"] = $scope.password;
                $scope.newAccount["mail"] = $scope.email;

                if ($scope.opiekun) {
                    $scope.createTutorAccount();                    
                    $state.go("login");
                    $scope.showToast("Teraz możesz się zalogować");
                }
                else {
                    $scope.newAccount["nickname"] = $scope.login;
                    $scope.createChildAccount(); 
                    $state.go("login");
                    $scope.showToast("Teraz możesz się zalogować");
                }
            }
            else $scope.invalidExists = true;
        }
        else $scope.invalidData = true;
    };

    $scope.createChildAccount = function() {

        dataService.postChild($scope.newAccount).then(function(res) {
            console.log(res);
      });
    };

    $scope.createTutorAccount = function() {

        dataService.postTutor($scope.newAccount).then(function(res) {
            console.log(res);
      });
    };

    $scope.checkIfAccountExists = function() {
        
        var flag = false;

        for (index in $scope.children) {
            if ($scope.children[index].login == $scope.login && 
                    $scope.children[index].password == $scope.password) {
                        flag = true;
            }
        }

        for (index in $scope.tutors) {
            if ($scope.tutors[index].login == $scope.login &&
                    $scope.tutors[index].password == $scope.password) {
                        flag = true;
            }
        }

        if (flag) {       
            return false;
        }
        else {
            return true;
        }
    }

    $scope.showToast = function (message) {
        ionicToast.show(message, 'bottom', false, 2500);
    }
});
