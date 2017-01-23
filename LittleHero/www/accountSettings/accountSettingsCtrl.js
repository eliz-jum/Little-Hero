angular.module('littleHero').controller('accountSettingsController', function($scope, $state, $http, dataService, childService, ionicToast){

  $scope.errorMessage = "";

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.errorMessage = "";
    if (childService.isChild) {
      $scope.email = childService.childObj.mail;
    }
    else {
      $scope.email = childService.tutorObj.mail;
    }

  });

  $scope.back = function () {
    if (childService.isChild) {
      $state.go("settings");
    }
    else {
      $state.go("settingsTutor");
    }
  };

  $scope.validate = function() {
    var email = document.getElementById("account-settings-email").value;
    var oldPassword = parseInt(document.getElementById("account-settings-old-password").value);
    var newPassword = parseInt(document.getElementById("account-settings-new-password").value);
    var newPassword2 = parseInt(document.getElementById("account-settings-new-password2").value);

    if ($scope.email && $scope.password) {
      if (validateEmail($scope.email)){
        if ((childService.isChild && oldPassword == childService.childObj.password) ||
          (!childService.isChild && oldPassword == childService.tutorObj.password)) {
          if (newPassword.length > 11) {
            if (newPassword == newPassword2) {
              changeAccountData(email, newPassword);
              setTimeout(function () {
                if (childService.isChild) {
                  $state.go("main");
                }
                else {
                  $state.go("mainTutor");
                }
                showToast("Dane zostały zmienione");
              }, 500);
            }
            else {
              $scope.invalid = true;
              $scope.errorMessage = "Nowe hasła nie są zgodne.";
            }
          }
          else {
            $scope.invalid = true;
            $scope.errorMessage = "Hasło musi mieć minimum 12 znaków.";
          }
        }
        else {
          $scope.invalid = true;
          $scope.errorMessage = "Niepoprawne stare hasło.";
        }
      }
      else {
        $scope.invalid = true;
        $scope.errorMessage = "Niepoprawny mail.";
      }
    }
    else {
      $scope.invalid = true;
      $scope.errorMessage = "Niepoprawne dane.";
    }
  };

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  var changeAccountData = function (email, password) {
    console.log(email);
    console.log(password);

    var changes = {
      mail: email,
      password: password
    };
    if (childService.isChild) {
      dataService.patchChild(childService.childObj.id, changes);
    }
    else {
      dataService.patchTutor(childService.tutorObj.id, changes);
    }
  }

  var showToast = function (message) {
    ionicToast.show(message, 'bottom', false, 2500);
  }

});
