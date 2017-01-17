angular.module('littleHero').controller('LoginController', function($scope, $state, $http, dataService, childService){

    /***
        DONE:
        - integracja logowania z RESTEM
        - naiwna walidacja konta - porownywanie stringow z loginem i haslem
        - rozroznienie kont dziecka/opiekuna i przekierowanie do odpowiedniego miejsca w aplikacji
    ***/

    var children = [];
    var tutors = [];
    var type = -1; //0 - child, 1 - tutor, -1 - account does not exist
    $scope.number = -1;

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getTutors().then(function(res) {
            tutors = res.data;
        });

        dataService.getChildren().then(function(res) {
            children = res;
        });

    });

    $scope.validate = function() {
        setTimeout(function () {
            if (type == 0) {
                $scope.password = null;
                $scope.login =  null;
                $state.go("main");
            }
            else if (type == 1) {
                $scope.password = null;
                $scope.login =  null;
                $state.go("mainTutor");
            }
            else {
                $scope.invalid = true;
            }
        }, 500);

        if ($scope.login && $scope.password) {
            $scope.checkIfAccountExists();
        }
        else $scope.invalid = true;
    };

    $scope.registration = function() {
        $state.go("registration");
    };

    $scope.checkIfAccountExists = function() {
        for (index in tutors) {
          //todo zakomentowana wersja to LOGOWANIE PO LOGINIE
            //if (tutors[index].login == $scope.login && tutors[index].password == $scope.password) {
            if (tutors[index].mail == $scope.login && tutors[index].password == $scope.password) {
                childService.tutorObj = tutors[index];
                childService.setTutorChildren();
                type = 1;
            }
        }

        for (index in children) {
            if (children[index].login == $scope.login && children[index].password == $scope.password) {
                childService.childObj = children[index];
                childService.setChildAvatarList();
                type = 0;
            }
        }
    };
});
