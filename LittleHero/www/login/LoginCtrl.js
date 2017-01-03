angular.module('littleHero').controller('LoginController', function($scope, $state, $http, $stateParams, dataService, childService){

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

    $scope.validate = function() {
        if ($scope.login && $scope.password) {
          $scope.checkIfAccountExists();
          setTimeout(function () {
            if (type == 0) {
              $state.go("main");
            }
            else if (type == 1)
              $state.go("mainTutor");
            else $scope.invalid = true;
          }, 500);
        }
        else $scope.invalid = true;
    };

    $scope.registration = function() {
        $state.go("registration");
    };

    $scope.getChildren = function() {
      dataService.getChildren().then(function(res) {
        children = res;

        for (index in children) {
          if (children[index].login == $scope.login && children[index].password == $scope.password) {
            childService.childObj = children[index];
            childService.setChildAvatarList();
            childService.setCurrentAvatarId();
            type = 0;
          }
        }
      });
    };

    $scope.getTutors = function() {
      dataService.getTutors().then(function(res) {
          tutors = res.data;

        for (index in tutors) {
          if (tutors[index].mail == $scope.login && tutors[index].password == $scope.password) {
            childService.tutorObj = tutors[index];
            childService.setTutorAvatarList();
            childService.setCurrentAvatarId();
            childService.setTasks();
            type = 1;
          }
        }
      });
    };

    $scope.checkIfAccountExists = function() {
      $scope.getChildren();
      $scope.getTutors();

      //---------zahardkodowana wersja
      //childService.hardcodeChildObj();
      //children.push(childService.childObj);
    }
});
