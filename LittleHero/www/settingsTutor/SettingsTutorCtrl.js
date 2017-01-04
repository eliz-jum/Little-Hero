angular.module('littleHero').controller('SettingsTutorController', function($scope, $ionicHistory, $state){

  $scope.buttons = [
    {
      title: "Dane konta",
      state: "account"
    },
    {
      title: "Dzieci",
      state: "children"
    },
    {
      title: "Powiadomienia",
      state: "notifications"
    },
    {
      title: "Zaproszenia",
      state: "invitationsTutor"
    },
    {
      title: "Wyloguj",
      state: "login"
    }
  ];

    $scope.changeState = function(state) {
        $state.go(state);
    }

  $scope.myGoBack = function() {
    $backView = $ionicHistory.backView();
    if ($backView) {
      $backView.go();
    }
    else {
      $state.go("mainTutor");
    };
  };
  $scope.go = function ( path ) {
    $location.path( path );
  };
});