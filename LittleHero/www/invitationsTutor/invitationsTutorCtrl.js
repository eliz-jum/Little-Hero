angular.module('littleHero').controller('InvitationsTutorController', function ($scope, $state, $ionicModal, childService, dataService, ionicToast) {
    $scope.newChild = {};
    $scope.matchingChildren = [];
    $scope.searched = false;
    $scope.found = false;
    var allChildren;

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getInvitesByUser("tutors", childService.tutorObj.id).then(function (res) {
            $scope.invites = res;
        });
    });

    $scope.back = function () {
        $state.go("settingsTutor");
    };

    $scope.invite = function() {
        dataService.getChildren().then(function(res) {
            allChildren = res;
          console.log("allchildrean", res);
          $scope.openModal();
        });

    };

    $scope.settings = function () {
        $state.go("settingsTutor");
    };

    $scope.acceptInvite = function (invite) {
        dataService.patchInvite('tutors', childService.tutorObj.id, invite.id, {status: "accepted"}).then( function() {
          invite.status = "accepted";
          $scope.showToast("Zaakceptowałeś zaproszenie od dziecka nr " + invite.child_id);
        });
    };

    $scope.rejectInvite = function (invite) {
        dataService.deleteInvite('tutors', childService.tutorObj.id, invite.id).then( function() {
            var index = $scope.invites.indexOf(invite);
            $scope.invites.splice(index, 1);
            $scope.showToast("Zaproszenie odrzucone");
        });
    };

    $scope.cancelInvite = function (invite) {
        dataService.deleteInvite('tutors', childService.tutorObj.id, invite.id).then( function() {
            var index = $scope.invites.indexOf(invite);
            $scope.invites.splice(index, 1);
            $scope.showToast("Zaproszenie anulowane");
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
        $scope.clearSearch();
    };

    $scope.search = function () {
        allChildren.forEach( function(item) {
            if (item.login === $scope.newChild.login) {
                $scope.newChild = item;
                $scope.matchingChildren.push(item);
                $scope.found = true;
            }
        });
        $scope.searched = true;
    };

    $scope.clearSearch = function() {
        $scope.searched = false;
        $scope.found = false;
        $scope.matchingChildren = [];
        $scope.newChild = {};
    };

    $scope.sendInvite = function (child) {
        dataService.postInvites('tutors', childService.tutorObj.id, {child_id: child.id, kind: "tutor"}).then(function(res) {
          $scope.invites.push(res);
          $scope.closeModal();
          $scope.showToast("Zaproszenie wysłane");
        });
    };

    $scope.showToast = function(message){
        ionicToast.show(message, 'bottom', false, 2500);
    };
});
