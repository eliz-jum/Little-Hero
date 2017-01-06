angular.module('littleHero').controller('InvitationsController', function ($scope, $state, $ionicModal, childService, dataService) {
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

    $scope.rejectInvite = function (invite) {
        var index = $scope.invites.indexOf(invite);
        $scope.invites.splice(index, 1);
        dataService.deleteInvite('children', $scope.user.id, invite.id).then( function(res) {
            console.log(res);
            $scope.showToast("Zaproszenie odrzucone");
        });
    };

    $scope.createNewAvatar = function (invite) {
        childService.addNewAvatar($scope.newAvatar.name, $scope.newAvatar.class, $scope.tutorId);

        if (invite.kind=="child" || invite.kind=="child-avatar") {
            dataService.deleteInvite('children', $scope.user.id, invite.id).then( function() {
                var index = $scope.invites.indexOf(invite);
                $scope.invites.splice(index, 1);
                $scope.closeModal("newAvatar");
                $scope.showToast("Utworzono awatar " + $scope.newAvatar.name);
            });
        }
        else {
            dataService.patchInvite('children', $scope.user.id, invite.id, {status: "accepted"}).then( function() {
                invite.status = "accepted";
                $scope.closeModal("newAvatar");
                $scope.showToast("Utworzono awatar " + $scope.newAvatar.name);
            });
        }

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

    $scope.search = function () {
        tutors.forEach( function(item) {
            if (item.login === $scope.newTutor.login) {
                $scope.newTutor = item;
                $scope.matchingTutors.push(item);
            }
            console.log(item);
        });
        // jeśli nie ma wyników
        /// może chcesz zaprosić - podaj maila tej osoby
        //po potwierdzeniu zaproszenia modal się chowa i pojawia tost z odpowiednią wiadomością
    };

    $scope.sendInvite = function (tutor) {
        dataService.postInvites('children', childService.childObj.id, {tutor_id: tutor.id, kind: "child"});
        $scope.closeModal("invite");
        $scope.showToast("Zaproszenie wysłane");
    };

    $scope.showToast = function(message){
        ionicToast.show(message, 'bottom', false, 2500);
    };
});
