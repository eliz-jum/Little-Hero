angular.module('littleHero').controller('MainController', function($scope, $state, $stateProvider, $http){
	$scope.onSwipeRight = function() {
		$state.go('tasks');
	}
    
});