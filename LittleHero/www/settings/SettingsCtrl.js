angular.module('littleHero').controller('SettingsController', function($scope, $ionicHistory, $state){

  $scope.buttons = [
    {
      title: "Dane konta",
      state: "account"
    },
    {
      title: "Awatary",
      state: "avatars"
    },
    {
      title: "Opiekunowe",
      state: "parents"
    },
    {
      title: "Powiadomienia",
      state: "notifications"
    },
    {
      title: "Zaproszenia",
      state: "invitations"
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
      $state.go("main");
    };
  };
  $scope.go = function ( path ) {
    $location.path( path );
  };
});
