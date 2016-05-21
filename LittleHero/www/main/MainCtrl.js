angular.module('littleHero').controller('MainController', function($scope, $state, $ionicModal){
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("tasks");
  };

  var allEquipment = [
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
      type: 'misc',
      iconSrc: 'img/hat1_icon.svg',
      imgSrc: 'img/hat1.svg'
    },
    {
      type: 'misc',
      iconSrc: 'img/hat2_icon.svg',
      imgSrc: 'img/hat2.svg'
    },
    {
      type: 'misc',
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
      type: 'top',
      iconSrc: 'img/tee1_icon.svg',
      imgSrc: 'img/tee1.svg',
    },
    {
      type: 'top',
      iconSrc: 'img/tee2_icon.svg',
      imgSrc: 'img/tee2.svg'
    },
    {
      type: 'top',
      iconSrc: 'img/tee3_icon.svg',
      imgSrc: 'img/tee3.svg'
    },
    {
      type: 'top',
      iconSrc: 'img/tee4_icon.svg',
      imgSrc: 'img/tee4.svg'
    },
    {
      type: 'bottom',
      iconSrc: 'img/pants1_icon.svg',
      imgSrc: 'img/pants1.svg'
    },
    {
      type: 'bottom',
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

  //$scope.currentEquipment=[];

  $scope.buttons = [
    {
      type: 'all',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'face',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'top',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'bottom',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'shoes',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'animal',
      iconSrc: 'img/pants2_icon.svg'
    },
  ]


  $scope.filterBy = function(item) {
    //znalezienie rzeczy w ng repeat
    //podmiana ng-if na item.type zgodny z parametrem type
    //podświetlenie karty
    $scope.currentEquipment=[];
    if (item.type == 'all') {
      $scope.currentEquipment=allEquipment;
    }
    else if (item.type == 'face') {
      allEquipment.forEach(function(listItem){
        if (listItem.type=='eyes' || listItem.type=='nose' || listItem.type=='mouth') {
          $scope.currentEquipment.push(listItem);
        }
      });
    }
    else if (item.type == 'hair') {
      allEquipment.forEach(function(listItem){
        if (listItem.type=='hair_back' || listItem.type=='hair_front') {
          $scope.currentEquipment.push(listItem);
        }
      });
    }
    else {

      allEquipment.forEach(function(listItem){
        if (listItem.type==item.type) {
          $scope.currentEquipment.push(listItem);
        }
      });
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

  $scope.openModal = function(item) {

    $scope.filterBy(item);
    $scope.modal.show();
  };

  });
