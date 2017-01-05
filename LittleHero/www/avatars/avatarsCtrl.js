angular.module('littleHero').controller('AvatarsController', function($scope, $state, dataService, childService, ionicToast, $ionicModal){
    $scope.user = childService.childObj;
    $scope.avatars = childService.avatarList;

    $scope.avatars.forEach(function(item) {

    });
    console.log(childService.avatarList);

    $scope.edit = function (avatar) {};

    $ionicModal.fromTemplateUrl('avatars/requestAvatar.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    }
});