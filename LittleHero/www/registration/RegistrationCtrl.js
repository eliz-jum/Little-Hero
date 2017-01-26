angular.module('littleHero').controller('RegistrationController', function($scope, $state, $http, dataService, ionicToast){

  $scope.children = [];
  $scope.tutors = [];
  $scope.opiekun = true;
  $scope.errorMessage = "";


  $scope.$on('$ionicView.beforeEnter', function () {
    dataService.getTutors().then(function (res) {
      $scope.tutors = res.data;
    });

    dataService.getChildren().then(function (res) {
      $scope.children = res;
    });
    });

     $scope.validate = function() {
       $scope.errorMessage = "";

        if ($scope.login && $scope.password && $scope.email) {
            if ($scope.checkIfAccountExists() == false) {
              if (validateEmail($scope.email)){
                if ($scope.password.length > 11){
                  createAnAccount();
                  setTimeout(function () {
                    $state.go("login");
                    $scope.showToast("Teraz możesz się zalogować");
                  }, 500);
                }
                else {
                  $scope.invalid = true;
                  $scope.errorMessage = "Hasło musi mieć minimum 12 znaków.";
                }
              }
              else {
                $scope.invalid = true;
                $scope.errorMessage = "Niepoprawny mail.";
              }
            }
            else {
              $scope.invalid = true;
              $scope.errorMessage = "Ten login jest już zajęty.";
            }
        }
        else {
          $scope.invalid = true;
          $scope.errorMessage = "Niepoprawne dane.";
        }
    };

    $scope.checkIfAccountExists = function() {
        for (index in $scope.children) {
            if ($scope.children[index].login == $scope.login ) {
              return true;
            }
        }

        for (index in $scope.tutors) {
            if ($scope.tutors[index].login == $scope.login) {
              return true;
            }
        }
      return false;
    }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  var createAnAccount = function () {
    var account = {};
    account.login = $scope.login;
    account.password = CryptoJS.SHA1($scope.password).toString();
    account.mail = $scope.email;

    if ($scope.opiekun) {
      dataService.postTutor(account).then(function(res) {
        console.log(res);
      });

    }
    else {
      dataService.postChild(account).then(function(res) {
        console.log(res);
      });

    }
  }




    $scope.showToast = function (message) {
        ionicToast.show(message, 'bottom', false, 2500);
    }
});
