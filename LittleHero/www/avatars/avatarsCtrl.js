angular.module('littleHero').controller('AvatarsController', function($scope, $state, dataService, childService, ionicToast, $ionicModal){

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getTutorsByChildId(childService.childObj.id).then(function (res) {
            $scope.tutors = res.data;
        })
    });

    $scope.classes = [
        "human",
        "cowboy",
        "king",
        "mage"
    ];
    $scope.user = childService.childObj;
    $scope.avatars = childService.avatarList;

    $scope.edit = function (avatar) {
    };

    $scope.requestAvatar = function(tutorId) {
        dataService.postInvites("children", $scope.user.id, {tutor_id: tutorId, kind: "child-avatar"})
        $scope.closeModal();
    };

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