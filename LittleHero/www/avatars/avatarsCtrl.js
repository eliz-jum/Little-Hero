angular.module('littleHero').controller('AvatarsController', function($scope, $state, dataService, childService, ionicToast){
    $scope.user = childService.childObj;
    $scope.avatars = childService.avatarList;
    console.log(childService.avatarList);

    $scope.edit = function (avatar) {};

    $scope.addAvatar = function () {};
});