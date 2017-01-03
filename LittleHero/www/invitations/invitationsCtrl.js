angular.module('littleHero').controller('InvitationsController', function($scope, $state, $stateParams, $ionicModal){
  $scope.filters = { };

  $scope.invites = [
    {
      id: "1",
      type: "SENT",
      status: "ACCEPTED"
    },
    {
      id: "2",
      type: "RECEIVED",
      status: "PENDING"
    },
    {
      id: "3",
      type: "SENT",
      status: "REJECTED"
    },
    {
      id: "4",
      type: "SENT",
      status: "PENDING"
    }
  ];

  $scope.settings = function () {
    $state.go("settings");
  }
});
