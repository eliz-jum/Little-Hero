angular.module('littleHero').controller('LoginController', function($scope, $state, $http, dataService, childService){

    /***
        DONE:
        - integracja logowania z RESTEM
        - naiwna walidacja konta - porownywanie stringow z loginem i haslem
        - rozroznienie kont dziecka/opiekuna i przekierowanie do odpowiedniego miejsca w aplikacji
    ***/

    var children = [];
    var tutors = [];
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
            if (childService.isChild == 1) {
                $scope.password = null;
                $scope.login =  null;
                $state.go("main");
            }
            else if (childService.isChild == 0) {
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
            if (tutors[index].mail == $scope.login && tutors[index].password == $scope.password) {
                childService.tutorObj = tutors[index];
                childService.setTutorChildren();
                childService.isChild = 0;
            }
        }

        for (index in children) {
            if (children[index].login == $scope.login && children[index].password == $scope.password) {
                childService.childObj = children[index];
                childService.setChildAvatarList();
                childService.isChild = 1;
            }
        }
    };
});
