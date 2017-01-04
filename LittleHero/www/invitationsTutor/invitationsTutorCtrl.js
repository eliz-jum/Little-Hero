angular.module('littleHero').controller('InvitationsTutorController', function ($scope, $state, $stateParams, $ionicModal, childService, dataService, ionicToast) {
    $scope.filters = {};

    $scope.newAvatar = {};
    console.log(childService.tutorObj);
    $scope.user = childService.tutorObj;

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getInvitesByUser("tutors", childService.tutorObj.id).then(function (res) {
            $scope.invites = res;
        });
    });

    $scope.settings = function () {
        $state.go("settings");
    };

    $scope.acceptInvite = function (invite) {
        // jeśli dziecko - modal z nowym awatarem
        //jeśli tutor - toast z info, że dziecko musi stworzyć awatar
        $scope.childId = invite.child_id;
        $scope.inviteId = invite.id;
        $scope.showToast("Zaakceptowałeś zaproszenie od dziecka nr" + $scope.childId);
        dataService.patchInvite('tutors', $scope.user.id, $scope.inviteId, {status: "accepted"});
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

    $scope.showToast = function(message){
        ionicToast.show(message, 'bottom', false, 2500);
    };
});
