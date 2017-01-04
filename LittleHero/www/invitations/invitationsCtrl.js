angular.module('littleHero').controller('InvitationsController', function ($scope, $state, $stateParams, $ionicModal, childService, dataService) {
    $scope.filters = {};
    $scope.classes = [
        "human",
        "cowboy",
        "king",
        "mage"
    ];

    $scope.newAvatar = {};
    console.log(childService.childObj);
    $scope.user = childService.childObj;

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getInvitesByUser("children", childService.childObj.id).then(function (res) {
            $scope.invites = res;
        });
    });

    $scope.settings = function () {
        $state.go("settings");
    };

    $scope.acceptInvite = function (invite) {
        $scope.tutorId = invite.tutor_id;
        $scope.inviteId = invite.id;
        $scope.openModal();
    };

    $scope.createNewAvatar = function () {
        childService.addNewAvatar($scope.newAvatar.name, $scope.newAvatar.class, $scope.tutorId);
        dataService.patchInvite('children', $scope.user.id, $scope.inviteId, {status: "accepted"});
        $scope.closeModal();
        $state.go('main');
    };

    $ionicModal.fromTemplateUrl('invitations/newAvatarModal.html', {
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
