angular.module('littleHero').controller('RecoverPassController', function($scope, $state, $http){

  $scope.validate=function() {
    if($scope.loginemail){
      $state.go("login")
    }
    else{$scope.invalid=true}
  };

});
