angular.module('littleHero').controller('LoginController', function($scope, $state, $http){

  $scope.validate=function() {
    if($scope.login && $scope.password){
      $state.go("main")
    }
    else{$scope.invalid=true}
  };
});
