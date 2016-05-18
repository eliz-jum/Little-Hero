angular.module('littleHero').controller('RegistrationController', function($scope, $state, $http){

  $scope.validate=function() {
    if($scope.login && $scope.email && $scope.password){
      $state.go("main")
    }
    else{$scope.invalid=true}
  };


});
