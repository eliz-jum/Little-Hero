angular.module('littleHero').controller('MainController', function($scope, $state){
	$scope.onSwipeRight = function() {
		$state.go('tasks');
	}
    
});
