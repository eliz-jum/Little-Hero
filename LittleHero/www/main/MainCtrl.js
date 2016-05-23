angular.module('littleHero').controller('MainController', function($scope, $state, $ionicModal){
  $scope.swipeLeft = function() {
    console.log("swipe left");
    $state.go("tasks");
  };
  $scope.swipeRight = function() {
    console.log("swipe right");
    $state.go("notifications");
  };

  var allEquipment = [
    {
      type: 'animal',
      iconSrc: 'img/animal1_icon.svg',
      imgSrc: 'img/animal1.svg'
    },
    {
      type: 'animal',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
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
      type: 'hair_back',
      iconSrc: 'img/hair_back1_icon.svg',
      imgSrc: 'img/hair_back1.svg'
    },
    {
      type: 'hair_back',
      iconSrc: 'img/hair_back2_icon.svg',
      imgSrc: 'img/hair_back2.svg'
    },
    {
      type: 'hair_back',
      iconSrc: 'img/hair_back3_icon.svg',
      imgSrc: 'img/hair_back3.svg'
    },
    {
      type: 'hair_back',
      iconSrc: 'img/hair_back4_icon.svg',
      imgSrc: 'img/hair_back4.svg'
    },
    {
      type: 'hair_back',
      iconSrc: 'img/hair_back5_icon.svg',
      imgSrc: 'img/hair_back5.svg'
    },
    {
      type: 'hair_back',
      iconSrc: 'img/hair_back6_icon.svg',
      imgSrc: 'img/hair_back6.svg'
    },
    {
      type: 'hair_back',
      iconSrc: 'img/hair_back7_icon.svg',
      imgSrc: 'img/hair_back7.svg'
    },
    {
      type: 'hair_front',
      iconSrc: 'img/hair_front1_icon.svg',
      imgSrc: 'img/hair_front1.svg'
    },
    {
      type: 'hair_front',
      iconSrc: 'img/hair_front2_icon.svg',
      imgSrc: 'img/hair_front2.svg'
    },
    {
      type: 'misc_head',
      iconSrc: 'img/hat1_icon.svg',
      imgSrc: 'img/hat1.svg'
    },
    {
      type: 'misc_head',
      iconSrc: 'img/hat2_icon.svg',
      imgSrc: 'img/hat2.svg'
    },
    {
      type: 'misc_head',
      iconSrc: 'img/hat3_icon.svg',
      imgSrc: 'img/hat3.svg'
    },
    {
      type: 'misc_head',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
    },
    {
      type: 'misc_ear',
      iconSrc: 'img/ears1_icon.svg',
      imgSrc: 'img/ears1.svg'
    },
    {
      type: 'misc_ear',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
    },
    {
      type: 'misc_neck',
      iconSrc: 'img/neck1_icon.svg',
      imgSrc: 'img/neck1.svg'
    },
    {
      type: 'misc_neck',
      iconSrc: 'img/neck2_icon.svg',
      imgSrc: 'img/neck2.svg'
    },
    {
      type: 'misc_neck',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
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
      imgSrc: 'img/tee1.svg'
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
      type: 'top',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
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
      type: 'bottom',
      iconSrc: 'img/pants3_icon.svg',
      imgSrc: 'img/pants3.svg'
    },
    {
      type: 'bottom',
      iconSrc: 'img/skirt1_icon.svg',
      imgSrc: 'img/skirt1.svg'
    },
    {
      type: 'bottom',
      iconSrc: 'img/skirt2_icon.svg',
      imgSrc: 'img/skirt2.svg'
    },
    {
      type: 'bottom',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
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
    },
    {
      type: 'shoes',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
    },
    {
      type: 'prop_left',
      iconSrc: 'img/prop1_left_icon.svg',
      imgSrc: 'img/prop1_left.svg'
    },
    {
      type: 'prop_left',
      iconSrc: 'img/prop2_left_icon.svg',
      imgSrc: 'img/prop2_left.svg'
    },
    {
      type: 'prop_right',
      iconSrc: 'img/prop1_right_icon.svg',
      imgSrc: 'img/prop1_right.svg'
    },
    {
      type: 'prop_right',
      iconSrc: 'img/prop2_right_icon.svg',
      imgSrc: 'img/prop2_right.svg'
    },
    {
      type: 'prop_right',
      iconSrc: 'img/prop3_right_icon.svg',
      imgSrc: 'img/prop3_right.svg'
    },
    {
      type: 'sock',
      iconSrc: 'img/sock1_icon.svg',
      imgSrc: 'img/sock1.svg'
    },
    {
      type: 'sock',
      iconSrc: 'img/sock2_icon.svg',
      imgSrc: 'img/sock2.svg'
    },
    {
      type: 'sock',
      iconSrc: 'img/sock3_icon.svg',
      imgSrc: 'img/sock3.svg'
    },
    {
      type: 'sock',
      iconSrc: 'img/tights1_icon.svg',
      imgSrc: 'img/tights1.svg'
    },
    {
      type: 'sock',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
    },
    {
      type: 'top_bottom',
      iconSrc: 'img/top_bottom1_icon.svg',
      imgSrc: 'img/top_bottom1.svg'
    },
    {
      type: 'top_bottom',
      iconSrc: 'img/top_bottom2_icon.svg',
      imgSrc: 'img/top_bottom2.svg'
    },
    {
      type: 'top_bottom',
      iconSrc: 'img/top_bottom3_icon.svg',
      imgSrc: 'img/top_bottom3.svg'
    },
    {
      type: 'top_bottom',
      iconSrc: 'img/empty_icon.svg',
      imgSrc: 'img/empty.svg'
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
      iconSrc: 'img/mouth3_icon.svg'
    },
    {
      type: 'hair',
      iconSrc: 'img/hair_back1_icon.svg'
    },
    {
      type: 'top',
      iconSrc: 'img/tee2_icon.svg'
    },
    {
      type: 'bottom',
      iconSrc: 'img/pants2_icon.svg'
    },
    {
      type: 'top_bottom',
      iconSrc: 'img/top_bottom3_icon.svg'
    },
    {
      type: 'sock',
      iconSrc: 'img/sock2_icon.svg'
    },
    {
      type: 'shoes',
      iconSrc: 'img/shoes2_icon.svg'
    },
    {
      type: 'prop',
      iconSrc: 'img/prop1_right_icon.svg'
    },
    {
      type: 'misc',
      iconSrc: 'img/hat1_icon.svg'
    },
    {
      type: 'animal',
      iconSrc: 'img/animal1_icon.svg'
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
    else if (item.type == 'prop') {
      allEquipment.forEach(function(listItem){
        if (listItem.type=='prop_left' || listItem.type=='prop_right') {
          $scope.currentEquipment.push(listItem);
        }
      });
    }
    else if (item.type == 'misc') {
      allEquipment.forEach(function(listItem){
        if (listItem.type=='misc_head' || listItem.type=='misc_ear' || listItem.type=='misc_neck') {
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
