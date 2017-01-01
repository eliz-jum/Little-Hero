angular.module('littleHero').controller('MainController', function($scope, $state, $stateParams, $ionicModal, $http, dataService, childService, ionicToast){

    //$scope.user = null;
    $scope.allAvatars = null;
    $scope.currentAvatar = null;
    $scope.showAvatar = false;

    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.checkForAvatar();
      console.log(childService.canBePurchasedItems);

    });

    $scope.checkForAvatar = function() {
        if (childService.currentAvatar != undefined) {
          $scope.currentAvatar = childService.currentAvatar;
          $scope.allAvatars = childService.avatarList;
          $scope.showAvatar = true;
        }
    };
//todo swipy
    $scope.swipeLeft = function() {
        console.log("swipe left");
        $state.go("tasks", { "allAvatars" : $scope.allAvatars, "currentAvatar" : $scope.currentAvatar, "user" : $scope.user });
    };

    $scope.swipeRight = function() {
        console.log("swipe right");
        $state.go("notifications", { "allAvatars" : $scope.allAvatars, "currentAvatar" : $scope.currentAvatar,
            "user" : $scope.user });
    };

    $scope.settings = function() {
        $state.go("settings");
    };
//todo co to jest????
  $scope.nextType = function() {
    var currentIndex = $scope.buttons.indexOf($scope.currentButton);

    if (currentIndex > -1) {

      var next = currentIndex < $scope.buttons.length - 1
        ? $scope.buttons[currentIndex + 1]
        : $scope.buttons[0];

      $scope.filterDisplay(next);
    }
  };

  $scope.previousType = function() {
    var currentIndex = $scope.buttons.indexOf($scope.currentButton);

    if (currentIndex > -1) {

      var previous = currentIndex > 0
        ? $scope.buttons[currentIndex - 1]
        : $scope.buttons[$scope.buttons.length - 1];

      $scope.filterDisplay(previous);
    }
  };
//todo co to jest???? - koniec

  $scope.buttons = [
    {
      type: 'all',
      iconSrc: 'img/all_icon.svg'
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
      type: 'misc_head',
      iconSrc: 'img/hat1_icon.svg'
    },
    {
      type: 'misc_ear',
      iconSrc: 'img/ears1_icon.svg'
    },
    {
      type: 'misc_neck',
      iconSrc: 'img/neck3_icon.svg'
    },
    {
      type: 'animal',
      iconSrc: 'img/animal1_icon.svg'
    }
  ]


  var filterBy = function(item, array, filteredArray) {
    if (item.type == 'all') {
      array.forEach(function(listItem){
        if (listItem.imgSrc!='img/empty.svg') {
          filteredArray.push(listItem);
        }
      });
    }
    else if (item.type == 'face') {
      array.forEach(function(listItem){
        if (listItem.type=='eyes' || listItem.type=='nose' || listItem.type=='mouth') {
          filteredArray.push(listItem);
        }
      });
    }
    else if (item.type == 'hair') {
      array.forEach(function(listItem){
        if (listItem.type=='hair_back' || listItem.type=='hair_front') {
          filteredArray.push(listItem);
        }
      });
    }
    else if (item.type == 'prop') {
      array.forEach(function(listItem){
        if (listItem.type=='prop_left' || listItem.type=='prop_right') {
          filteredArray.push(listItem);
        }
      });
    }
    else {
      array.forEach(function(listItem){
        if (listItem.type==item.type) {
          filteredArray.push(listItem);
        }
      });
    }
  };

  $scope.putOn = function(item) {
    var element = document.getElementsByClassName(item.type)[0];
    element.setAttribute("src", item.imgSrc);
    //zmiana w tablicach lokalnych w serwisie
    childService.putItemOn(item);
    $scope.closeModal();
  }

  $scope.buy = function(item) {
    if ($scope.currentAvatar.money >= item.price) {
      childService.currentAvatar.money -= item.price;
      item.price = 0;
      childService.purchaseItem(item);
      $scope.putOn(item);
    }
    else {
      //todo tost!
      console.log("nie masz piniądza!");
    }


  }



  $ionicModal.fromTemplateUrl('main/equipmentModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function(item) {
    $scope.filterDisplay(item);
    $scope.modal.show();
  };


  $scope.closeModal = function () {
    $scope.modal.hide();

  }


  $scope.filterDisplay = function(item) {
    $scope.filteredCanBePutOnEquipment=[];
    $scope.filteredCanBePurchasedEquipment=[];
    $scope.filteredUnavailableEquipment=[];

    $scope.currentButton = item;
    filterBy(item, childService.canBePutOnItems, $scope.filteredCanBePutOnEquipment);
    filterBy(item, childService.canBePurchasedItems, $scope.filteredCanBePurchasedEquipment);
    filterBy(item, childService.unavailableItems, $scope.filteredUnavailableEquipment);

  }

  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 2500);
  }
});
