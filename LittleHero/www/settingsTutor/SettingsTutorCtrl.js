angular.module('littleHero').controller('SettingsTutorController', function($scope, $ionicHistory, $state, childService){

  $scope.buttons = [
    {
      title: "Dane konta",
      onClick: function() {
        $state.go("accountSettings");
      }
    },
    {
      title: "Zaproszenia",
      onClick: function() {
        $state.go("invitationsTutor");
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
