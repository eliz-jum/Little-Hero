angular.module('littleHero').controller('LoginController', function($scope, $state, $http, $stateParams, dataService){

    /***
        DONE:
        - integracja logowania z RESTEM
        - naiwna walidacja konta - porownywanie stringow z loginem i haslem
        - rozroznienie kont dziecka/opiekuna i przekierowanie do odpowiedniego miejsca w aplikacji
    ***/

    $scope.children = [];
    $scope.tutors = [];
    $scope.type = -1; //0 - child, 1 - tutor, -1 - account does not exist
    $scope.number = -1;

    $scope.validate = function() {

        if ($scope.login && $scope.password) {
            $scope.checkIfAccountExists();
            if ($scope.type == 0)   {                   
                $state.go("main", { 'user' : $scope.children[$scope.number] });    
            }
            else if ($scope.type == 1)                      
                $state.go("mainTutor", { 'user' : $scope.tutors[$scope.number] });
            else $scope.invalid = true;
        }
        else $scope.invalid = true;
    };

    $scope.registration = function() {

        $state.go("registration");
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

    $scope.checkIfAccountExists = function() {
        
        var flag = false;

        for (index in $scope.children) {
            if ($scope.children[index].login == $scope.login && 
                    $scope.children[index].password == $scope.password) {
                        $scope.number = index;
                        $scope.type = 0;
                        flag = true;
            }
        }

        for (index in $scope.tutors) {
            if ($scope.tutors[index].login == $scope.login &&
                    $scope.tutors[index].password == $scope.password) {
                        $scope.number = index;
                        $scope.type = 1;
                        flag = true;
            }
        }

        if (!flag) 
            $scope.type = -1;
    }

    $scope.getChildren();
    $scope.getTutors();
    
});
