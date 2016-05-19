angular.module('littleHero').controller('MainController', function($scope, $state, $ionicModal){
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("tasks");
  };

  $scope.equipment = [
    {
      type: 'animal',
      iconSrc: 'img/animal1_icon.svg',
      imgSrc: 'img/animal1.svg'
    },
    {
      type: 'eyes',
      iconSrc: 'img/eyes1_icon.svg',
      imgSrc: 'img/eyes1.svg'
    },
    {
      type: 'eyes',
      iconSrc: 'img/eyes2_icon.svg',
      imgSrc: 'img/eyes2.svg'
    },
    {
      type: 'eyes',
      iconSrc: 'img/eyes3_icon.svg',
      imgSrc: 'img/eyes3.svg'
    },
    {
      type: 'hair',
      iconSrc: 'img/hair1_icon.svg',
      imgSrc: 'img/hair1.svg'
    },
    {
      type: 'hat',
      iconSrc: 'img/hat1_icon.svg',
      imgSrc: 'img/hat1.svg'
    },
    {
      type: 'hat',
      iconSrc: 'img/hat2_icon.svg',
      imgSrc: 'img/hat2.svg'
    },
    {
      type: 'hat',
      iconSrc: 'img/hat3_icon.svg',
      imgSrc: 'img/hat3.svg'
    },
    {
      type: 'mouth',
      iconSrc: 'img/mouth1_icon.svg',
      imgSrc: 'img/mouth1.svg'
    },
    {
      type: 'mouth',
      iconSrc: 'img/mouth2_icon.svg',
      imgSrc: 'img/mouth2.svg'
    },
    {
      type: 'mouth',
      iconSrc: 'img/mouth3_icon.svg',
      imgSrc: 'img/mouth3.svg'
    },
    {
      type: 'nose',
      iconSrc: 'img/nose1_icon.svg',
      imgSrc: 'img/nose1.svg'
    },
    {
      type: 'nose',
      iconSrc: 'img/nose2_icon.svg',
      imgSrc: 'img/nose2.svg'
    },
    {
      type: 'nose',
      iconSrc: 'img/nose3_icon.svg',
      imgSrc: 'img/nose3.svg'
    },
    {
      type: 'tee',
      iconSrc: 'img/tee1_icon.svg',
      imgSrc: 'img/tee1.svg',
    },
    {
      type: 'tee',
      iconSrc: 'img/tee2_icon.svg',
      imgSrc: 'img/tee2.svg'
    },
    {
      type: 'tee',
      iconSrc: 'img/tee3_icon.svg',
      imgSrc: 'img/tee3.svg'
    },
    {
      type: 'tee',
      iconSrc: 'img/tee4_icon.svg',
      imgSrc: 'img/tee4.svg'
    },
    {
      type: 'pants',
      iconSrc: 'img/pants1_icon.svg',
      imgSrc: 'img/pants1.svg'
    },
    {
      type: 'pants',
      iconSrc: 'img/pants2_icon.svg',
      imgSrc: 'img/pants2.svg'
    },
    {
      type: 'shoes',
      iconSrc: 'img/shoes1_icon.svg',
      imgSrc: 'img/shoes1.svg'
    },
    {
      type: 'shoes',
      iconSrc: 'img/shoes2_icon.svg',
      imgSrc: 'img/shoes2.svg'
    },
    {
      type: 'shoes',
      iconSrc: 'img/shoes3_icon.svg',
      imgSrc: 'img/shoes3.svg'
    }
  ];

  $scope.buttons = [
    {
      type: 'all',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'all',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'tees',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'pants',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'weapons',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'pets',
      iconSrc: 'img/pants2_icon.svg'
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

  $ionicModal.fromTemplateUrl('main/equipmentModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  });
