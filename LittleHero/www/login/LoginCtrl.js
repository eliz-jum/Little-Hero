angular.module('littleHero').controller('LoginController', function($scope, $state, $http, $stateParams){

  $scope.validate=function() {
    if($scope.login && $scope.password){
      console.log($scope.login);
      $state.go("main", { 'username' : $scope.login });
    }
    else{$scope.invalid=true}
  };

  $scope.registration = function() {
    $state.go("registration");
    }
});
