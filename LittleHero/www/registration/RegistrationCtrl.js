angular.module('littleHero').controller('RegistrationController', function($scope, $state, $http, $stateParams){

  $scope.validate=function() {
    if($scope.login && $scope.email && $scope.password){
        $state.go("main", { 'username' : $scope.login });
    }
    else{$scope.invalid=true}
  };


});
