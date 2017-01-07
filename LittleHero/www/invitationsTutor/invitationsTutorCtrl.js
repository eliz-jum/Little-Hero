angular.module('littleHero').controller('InvitationsTutorController', function ($scope, $state, $ionicModal, childService, dataService, ionicToast) {
    $scope.filters = {};
    $scope.newChild = {};
    $scope.user = childService.tutorObj;
    $scope.matchingChildren = [];
    var children;

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getInvitesByUser("tutors", childService.tutorObj.id).then(function (res) {
            $scope.invites = res;
        });
    });

    $scope.invite = function() {
        dataService.getChildren().then(function(res) {
            children = res.data;
        });
        $scope.openModal("invite");
    };

    $scope.settings = function () {
        $state.go("settingsTutor");
    };

    $scope.acceptInvite = function (invite) {
        dataService.patchInvite('tutors', $scope.user.id, invite.id, {status: "accepted"}).then( function() {
            $scope.showToast("Zaakceptowałeś zaproszenie od dziecka nr" + invite.child_id);
        });
    };

    $scope.rejectInvite = function (invite) {
        dataService.deleteInvite('tutors', childService.tutorObj.id, invite.id).then( function() {
            var index = $scope.invites.indexOf(invite);
            $scope.invites.splice(index, 1);
            $scope.showToast("Zaproszenie odrzucone");
        });
    };

    $scope.hideInvite = function (invite) {
        dataService.deleteInvite('tutors', childService.tutorObj.id, invite.id).then( function() {
            var index = $scope.invites.indexOf(invite);
            $scope.invites.splice(index, 1);
        });
    };

    $ionicModal.fromTemplateUrl('invitationsTutor/inviteModal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.search = function () {
        children.forEach( function(item) {
            if (item.login === $scope.newChild.login) {
                $scope.newChild = item;
                $scope.matchingChildren.push(item);
            }
            console.log(item);
        });
        // jeśli nie ma wyników
        /// może chcesz zaprosić - podaj maila tej osoby
        //po potwierdzeniu zaproszenia modal się chowa i pojawia tost z odpowiednią wiadomością
    };

    $scope.sendInvite = function (child) {
        dataService.postInvites('tutors', childService.TutorObj.id, {child_id: child.id, kind: "tutor"});
        $scope.closeModal("invite");
        $scope.showToast("Zaproszenie wysłane");
    };

    $scope.showToast = function(message){
        ionicToast.show(message, 'bottom', false, 2500);
    };
});
