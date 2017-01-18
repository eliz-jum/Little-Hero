angular.module('littleHero').controller('AvatarsController', function($scope, $state, dataService, childService, ionicToast, $ionicModal){

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getTutorsByChildId(childService.childObj.id).then(function (res) {
            $scope.tutors = res.data;
        })
    });

    $scope.classes = [
        "human",
        "cowboy",
        "mage"
    ];
    $scope.user = childService.childObj;
    $scope.avatars = childService.avatarList;

    $scope.edit = function (avatar) {
        $scope.editedAvatar = avatar;
        $scope.openModal("edit");
    };

    $scope.patchAvatar = function (editedAvatar) {
      if($scope.editedAvatar.name){
        if($scope.editedAvatar.name < 21){
          dataService.patchAvatar(editedAvatar.id, editedAvatar);
          $scope.closeModal("edit");
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

    $scope.requestAvatar = function(tutorId) {
        console.log(tutorId);
        dataService.postInvites("children", $scope.user.id, {tutor_id: tutorId, kind: "child-avatar"}).then(function(res) {
            console.log(res);
        });
        $scope.closeModal("request");
    };

    $ionicModal.fromTemplateUrl('avatars/requestAvatarModal.html', {
        scope: $scope,
        id: "request"
    }).then(function (modal) {
        $scope.requestModal = modal;
    });

    $ionicModal.fromTemplateUrl('avatars/editAvatarModal.html', {
        scope: $scope,
        id: "edit"
    }).then(function (modal) {
        $scope.editModal = modal;
    });

    $scope.openModal = function (id) {
        if (id === "request") {
            $scope.requestModal.show();
        } else {
            $scope.editModal.show();
        }
    };

    $scope.closeModal = function (id) {
        if (id === "request") {
            $scope.requestModal.hide();
        } else {
            $scope.editModal.hide();
        }
    };
});
