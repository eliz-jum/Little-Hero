angular.module('littleHero').controller('InvitationsController', function ($scope, $state, $stateParams, $ionicModal, childService, dataService) {
    $scope.classes = [
        "human",
        "cowboy",
        "king",
        "mage"
    ];
    $scope.filters = {};
    $scope.newAvatar = {};
    $scope.newTutor = {};
    $scope.user = childService.childObj;
    $scope.matchingTutors = [];
    var tutors;

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getInvitesByUser("children", childService.childObj.id).then(function (res) {
            $scope.invites = res;
        });
    });

    $scope.invite = function() {
        dataService.getTutors().then(function(res) {
            tutors = res.data;
        });
        $scope.openModal("invite");
    };

    $scope.settings = function () {
        $state.go("settings");
    };

    $scope.acceptInvite = function (invite) {
        $scope.tutorId = invite.tutor_id;
        $scope.inviteId = invite.id;
        $scope.openModal("newAvatar");
    };

    $scope.createNewAvatar = function () {
        childService.addNewAvatar($scope.newAvatar.name, $scope.newAvatar.class, $scope.tutorId);
        dataService.patchInvite('children', $scope.user.id, $scope.inviteId, {status: "accepted"});
        $scope.closeModal();
        $state.go('main');
    };


    $ionicModal.fromTemplateUrl('invitations/newAvatarModal.html', {
        id: 'newAvatar',
        scope: $scope
    }).then(function (modal) {
        $scope.newAvatarModal = modal;
    });

    $ionicModal.fromTemplateUrl('invitations/inviteModal.html', {
        id: 'invite',
        scope: $scope
    }).then(function (modal) {
        $scope.inviteModal = modal;
    });

    $scope.openModal = function (id) {
        if (id === "newAvatar") {
            $scope.newAvatarModal.show();
        } else {
            $scope.inviteModal.show();
        }
    };

    $scope.closeModal = function (id) {
        if (id === "newAvatar") {
            $scope.newAvatarModal.hide();
        } else {
            $scope.inviteModal.hide();
        }
    };

    $scope.search = function() {
        tutors.forEach( function(item) {
            if (item.login === $scope.newTutor.login) {
                $scope.newTutor = item;
                $scope.matchingTutors.push(item);
            }
            console.log(item);
        });
        // jeśli jest taki login
        /// wyświetl z jakims buttonem zapro
        // jeśli nie ma
        /// może chcesz zaprosić - podaj maila tej osoby
        //po potwierdzeniu zaproszenia modal się chowa i pojawia tost z odpowiednią wiadomością
    };
});
