angular.module('littleHero').controller('SettingsController', function($rootScope, $scope, $ionicHistory, $state, childService){

  $scope.buttons = [
    {
      title: "Dane konta",
      onClick: function() {
        $state.go("accountSettings");
      }
    },
    {
      title: "Awatary",
      onClick: function() {
        $state.go("avatars");
      }
    },
    {
      title: "Zaproszenia",
      onClick: function() {
        $state.go("invitations");
      }
    },
    {
      title: "Wyloguj",
      onClick: function() {
        childService.clearAllData();
        console.log(childService);
        $state.go("login");
      }
    }
  ];
});
