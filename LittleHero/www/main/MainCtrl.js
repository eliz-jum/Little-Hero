angular.module('littleHero').controller('MainController', function($scope, $state, $ionicModal){
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("tasks");
  };

  $scope.equipment = [
    {
      type: 'eyes',
      iconSrc: 'img/eyes1-icon.svg',
      imgSrc: 'img/eyes1.svg'
    },
    {
      type: 'hair',
      iconSrc: 'img/hair1-icon.svg',
      imgSrc: 'img/hair1.svg'
    },
    {
      type: 'mouth',
      iconSrc: 'img/mouth1-icon.svg',
      imgSrc: 'img/mouth1.svg'
    },
    {
      type: 'nose',
      iconSrc: 'img/nose1-icon.svg',
      imgSrc: 'img/nose1.svg'
    },
    {
      type: 'tee',
      iconSrc: 'img/tee1-icon.svg',
      imgSrc: 'img/tee1.svg',
    },
    {
      type: 'tee',
      iconSrc: 'img/tee2-icon.svg',
      imgSrc: 'img/tee2.svg'
    },
    {
      type: 'tee',
      iconSrc: 'img/tee3-icon.svg',
      imgSrc: 'img/tee3.svg'
    },
    {
      type: 'tee',
      iconSrc: 'img/tee4-icon.svg',
      imgSrc: 'img/tee4.svg'
    },
    {
      type: 'pants',
      iconSrc: 'img/pants1-icon.svg',
      imgSrc: 'img/pants1.svg'
    },
    {
      type: 'pants',
      iconSrc: 'img/pants2-icon.svg',
      imgSrc: 'img/pants2.svg'
    }
  ];

  $scope.buttons = [
    {
      type: 'all',
      iconSrc: 'img/pants2-icon.svg'
    },
    {
      type: 'all',
      iconSrc: 'img/pants2-icon.svg'
    },
    {
      type: 'tees',
      iconSrc: 'img/pants2-icon.svg'
    },
    {
      type: 'pants',
      iconSrc: 'img/pants2-icon.svg'
    },
    {
      type: 'weapons',
      iconSrc: 'img/pants2-icon.svg'
    },
    {
      type: 'pets',
      iconSrc: 'img/pants2-icon.svg'
    },
  ]

  $scope.filter = "pants";

  //drukowanie wszystkiego jak leci a potem wstawianie co 3 row

  $scope.filterBy = function(type) {
    //znalezienie rzeczy w ng repeat
    //podmiana ng-if na item.type zgodny z parametrem type
    //podświetlenie karty
    var element = "";

    if (type == 'all') {
      //zamien ng-if na pusty

    }
    else {
      //zamien ng-if na type
    }

    //podświetl ikone
  };

  $scope.putOn = function(item) {

    console.log(item.type);
    var element = document.getElementsByClassName(item.type)[0];
    console.log(element);
    element.setAttribute("src", item.imgSrc);
    $scope.modal.hide();
  }

  $ionicModal.fromTemplateUrl('equipmentModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  });
