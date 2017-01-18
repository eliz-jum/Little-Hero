angular.module('littleHero').controller('InvitationsController', function ($scope, $state, $ionicModal, childService, dataService, ionicToast) {
    $scope.classes = [
        "human",
        "cowboy",
        "mage"
    ];
    $scope.newAvatar = {};
    $scope.newTutor = {};
    $scope.matchingTutors = [];
    $scope.searched = false;
    $scope.found = false;
    var allTutors;

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getInvitesByUser("children", childService.childObj.id).then(function (res) {
            $scope.invites = res;
        });
    });

    $scope.back = function () {
      $state.go("settings");
    };

    $scope.invite = function() {
        dataService.getTutors().then(function(res) {
            allTutors = res.data;
        });
        $scope.openModal("invite");
    };

    $scope.settings = function () {
        $state.go("settings");
    };

    $scope.acceptInvite = function (invite) {
        $scope.tutorId = invite.tutor_id;
        $scope.invite = invite;
        $scope.openModal("newAvatar");
    };

    $scope.rejectInvite = function (invite) {
        var index = $scope.invites.indexOf(invite);
        $scope.invites.splice(index, 1);
        dataService.deleteInvite('children', childService.childObj.id, invite.id).then( function(res) {
            console.log(res);
            $scope.showToast("Zaproszenie odrzucone");
        });
    };

    $scope.cancelInvite = function (invite) {
        var index = $scope.invites.indexOf(invite);
        $scope.invites.splice(index, 1);
        dataService.deleteInvite('children', childService.childObj.id, invite.id).then( function(res) {
            console.log(res);
            $scope.showToast("Zaproszenie anulowane");
        });
    };

  $scope.createNewAvatar = function () {
    if ($scope.newAvatar.name && $scope.newAvatar.class) {
      if($scope.newAvatar.name.length < 21) {
        childService.addNewAvatar($scope.newAvatar.name, $scope.newAvatar.class, $scope.tutorId);
        $scope.closeModal("newAvatar");
      $scope.showSpinner = true;
      console.log("invite", $scope.invite);
      childService.addNewAvatar($scope.newAvatar.name, $scope.newAvatar.class, $scope.tutorId);
    $scope.closeModal("newAvatar");

    // dataService.deleteInvite('children', childService.childObj.id, $scope.invite.id).then(function () {
    //       var index = $scope.invites.indexOf($scope.invite);
    //       $scope.invites.splice(index, 1);
            setTimeout(function() {
              $scope.showSpinner = false;
            },4000);
    //       $scope.closeModal("newAvatar");
    //       $scope.showToast("Utworzono nowego awatara!");
    //   });
      }
      else{
        $scope.invalid = true;
        $scope.errorMessage = "Za długe imię. Maksymalnie 20 znaków.";
      }
    }
    else {
      $scope.invalid = true;
      $scope.errorMessage = "Niepoprawne dane.";
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
            $scope.newAvatar = {};
        } else {
            $scope.inviteModal.hide();
            $scope.clearSearch();
        }
    };

    $scope.search = function () {
        allTutors.forEach( function(item) {
            if (item.login === $scope.newTutor.login) {
                $scope.newTutor = item;
                $scope.matchingTutors.push(item);
                $scope.found = true;
            }
        });
        $scope.searched = true;
    };

    $scope.clearSearch = function() {
        $scope.searched = false;
        $scope.found = false;
        $scope.matchingTutors = [];
        $scope.newTutor = {};
    };

    $scope.sendInvite = function (tutor) {
        dataService.postInvites('children', childService.childObj.id, {tutor_id: tutor.id, kind: "child"}).then(function(res) {
          $scope.invites.push(res);
          $scope.closeModal("invite");
          $scope.showToast("Zaproszenie wysłane");
        });
    };

    $scope.showToast = function(message){
        ionicToast.show(message, 'bottom', false, 2500);
    };
});
