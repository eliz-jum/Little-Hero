angular.module('littleHero').controller('InvitationsController', function ($scope, $state, $stateParams, $ionicModal, childService, dataService) {
    $scope.filters = {};
    $scope.classes = [
        "CZŁOWIEK",
        "KOWBOJ",
        "KRÓL",
        "MAG"
    ];

    $scope.newAvatar = {};

    $scope.$on('$ionicView.beforeEnter', function () {
        dataService.getInvitesByUser("children", 1).then(function (res) {
            $scope.invites = res;
            console.log(res);
        });
    });

    $scope.settings = function () {
        $state.go("settings");
    };

    $scope.acceptInvite = function () {
        // jeśli dziecko - modal z nowym awatarem
        $scope.openModal();
        //jeśli tutor - toast z info, że dziecko musi stworzyć awatar
    };

    $scope.createNewAvatar = function () {
        // update tego zapro na serwerze
        // update zapro drugiej osoby na serwerze
        // stworzenie nowego awatara(?)
        // zamknęcie modalu
        $scope.closeModal();
        // przejście do ekranu głównego z otwartym nowym awatarem
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
