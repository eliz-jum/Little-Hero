angular.module('littleHero').controller('InvitationsController', function($scope, $state, $stateParams, $ionicModal){
  $scope.filters = { };

  $scope.invites = [
    {
      id: "1",
      kind: "SENT",
      status: "ACCEPTED"
    },
    {
      id: "2",
      kind: "RECEIVED",
      status: "PENDING"
    },
    {
      id: "3",
      kind: "SENT",
      status: "REJECTED"
    },
    {
      id: "4",
      kind: "SENT",
      status: "PENDING"
    }
  ];

  $scope.settings = function () {
    $state.go("settings");
  }
});
