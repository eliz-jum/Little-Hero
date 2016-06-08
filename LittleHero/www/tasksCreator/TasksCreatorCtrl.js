angular.module('littleHero').controller('TasksCreatorController', function($scope, $state){

  $scope.validate=function() {
    if($scope.description && $scope.amountCash && $scope.amountExperience){
    }
      else{$scope.invalid=true}
  };
});
