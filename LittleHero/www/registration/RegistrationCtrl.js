angular.module('littleHero').controller('RegistrationController', function($scope, $state, $http, $stateParams, dataService){

    $scope.children = [];
    $scope.tutors = [];
    $scope.newAccount = {};

     $scope.validate = function() {

        if ($scope.login && $scope.password && $scope.email) {
            if ($scope.checkIfAccountExists()) {       

                $scope.newAccount["login"] = $scope.login;
                $scope.newAccount["password"] = $scope.password;
                $scope.newAccount["mail"] = $scope.email;

                if ($scope.opiekun) {
                    $scope.newAccount["name"] = $scope.login;
                    $scope.createTutorAccount();                    
                    $state.go("login"); 
                }
                else {
                    $scope.newAccount["nickname"] = $scope.login;
                    $scope.createChildAccount(); 
                    $state.go("login"); 
                }
            }
            else $scope.invalid = true;
        }
        else $scope.invalid = true;
    };

    $scope.getChildren = function() {

        dataService.getChildren().then(function(res) {
          $scope.children = res.data;
      });
    };

    $scope.getTutors = function() {

        dataService.getTutors().then(function(res) {
          $scope.tutors = res.data;
      });
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

    $scope.getChildren();
    $scope.getTutors();
});
