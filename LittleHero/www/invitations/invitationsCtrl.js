angular.module('littleHero').controller('InvitationsController', function($scope, $state, $stateParams, $ionicModal, childService, dataService){
  $scope.filters = { };

  $scope.$on('$ionicView.beforeEnter', function () {
    dataService.getInvitesByUser("children", 1).then(function (res) {
      $scope.invites = res;
      console.log(res);
    });
  });

  $scope.settings = function () {
    $state.go("settings");
  }

  $scope.acceptInvite = function(invite) {
      // update tego zapro na serwerze
      // update zapro drugiej osoby na serwerze
      // modal z nowym awatarem jeśli dziecko
      // stworzenie nowego awatara(?)
  }
});
