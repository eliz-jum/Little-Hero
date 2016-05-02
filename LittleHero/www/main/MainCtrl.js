angular.module('littleHero').controller('MainController', function($scope, $state, $ionicModal){
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("tasks");
  };

  $scope.equipment = [
    {
      iconSrc: '',
      imgSrc: 'img/eyes1.svg'
    },
    {
      iconSrc: '',
      imgSrc: 'img/hair1.svg'
    },
    {
      iconSrc: '',
      imgSrc: 'img/mouth1.svg'
    },
    {
      iconSrc: '',
      imgSrc: 'img/nose1.svg'
    },
    {
      iconSrc: '',
      imgSrc: 'img/pants1.svg'
    }
  ];

  $ionicModal.fromTemplateUrl('equipmentModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  });
