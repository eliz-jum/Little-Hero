angular.module('littleHero').controller('SettingsController', function($rootScope, $scope, $ionicHistory, $state){

  $scope.buttons = [
    {
      title: "Dane konta",
      state: "editAccount",
      click: function(state) {
        $state.go(state);
      }
    },
    {
      title: "Awatary",
      state: "avatars",
      click: function(state) {
        $state.go(state);
      }
    },
    {
      title: "Zaproszenia",
      state: "invitations",
      click: function(state) {
        $state.go(state);
      }
    },
    {
      title: "Wyloguj",
      state: "login",
      click: function(state) {
        $rootScope.$emit('logout');
        $state.go(state);
      }
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
