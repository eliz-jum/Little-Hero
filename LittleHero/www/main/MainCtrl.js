angular.module('littleHero').controller('MainController', function ($scope, $state, $interval, $ionicModal, $http, dataService, childService, ionicToast) {

  $scope.allAvatars = null;
  $scope.currentAvatar = null;
  $scope.showAvatar = false;

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.showAvatar = false;
    cleanAvatarArrays();

    if (childService.avatarList.length > 0) {
      $scope.currentAvatar = childService.currentAvatar;
      $scope.allAvatars = childService.avatarList;
      $scope.setAvatarData(childService.currentAvatar);
      $scope.showAvatar = true;
    }
  });


  $scope.swipeLeft = function () {
    console.log("swipe left");
    $state.go("tasks");
  };

  $scope.swipeRight = function () {
    console.log("swipe right");
    $state.go("notifications");
  };

  $scope.settings = function () {
    $state.go("settings");
  };

  var cleanAvatarArrays = function () {
    childService.wornItems = [];
    childService.canBePutOnItems = [];
    childService.canBePurchasedItems = [];
    childService.unavailableItems = [];
    childService.notifications = [];
    childService.tasks = [];
  }

  $scope.nextType = function () {
    var currentIndex = $scope.buttons.indexOf($scope.currentButton);

    if (currentIndex > -1) {

      var next = currentIndex < $scope.buttons.length - 1
        ? $scope.buttons[currentIndex + 1]
        : $scope.buttons[0];

      $scope.filterDisplay(next);
    }
  };

  $scope.previousType = function () {
    var currentIndex = $scope.buttons.indexOf($scope.currentButton);

    if (currentIndex > -1) {

      var previous = currentIndex > 0
        ? $scope.buttons[currentIndex - 1]
        : $scope.buttons[$scope.buttons.length - 1];

      $scope.filterDisplay(previous);
    }
  };

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

  var dressAvatar = function (spinner) {
    var element;
    childService.wornItems.forEach(function (item) {
      element = document.getElementsByClassName(item.type)[0];
      element.setAttribute("src", item.imgSrc);
    });
    if (spinner == true) $scope.showSpinner = false;
  }

  $scope.setAvatarData = function (avatar, spinner) {
    if (spinner == true) $scope.showSpinner = true;
    console.log("avatar", avatar);
    cleanAvatarArrays();
    childService.currentAvatar = avatar;
    childService.currentAvatarId = childService.currentAvatar.id;
    $scope.currentAvatar = childService.currentAvatar;
    childService.setWornItems(dressAvatar, true);
    childService.setCanBePutOnItems();
    childService.setCanBePurchasedItems();
    childService.setUnavailableItems();
    childService.setAvatarTasks();
    childService.setNotificationsArray();
  }


  var filterBy = function (item, array, filteredArray) {
    if (item.type == 'all') {
      array.forEach(function (listItem) {
        if (listItem.imgSrc != 'img/empty.svg') {
          filteredArray.push(listItem);
        }
      });
    }
    else if (item.type == 'face') {
      array.forEach(function (listItem) {
        if (listItem.type == 'eyes' || listItem.type == 'nose' || listItem.type == 'mouth') {
          filteredArray.push(listItem);
        }
      });
    }
    else if (item.type == 'hair') {
      array.forEach(function (listItem) {
        if (listItem.type == 'hair_back' || listItem.type == 'hair_front') {
          filteredArray.push(listItem);
        }
      });
    }
    else if (item.type == 'prop') {
      array.forEach(function (listItem) {
        if (listItem.type == 'prop_left' || listItem.type == 'prop_right') {
          filteredArray.push(listItem);
        }
      });
    }
    else {
      array.forEach(function (listItem) {
        if (listItem.type == item.type) {
          filteredArray.push(listItem);
        }
      });
    }
  };

  $scope.putOn = function (item) {
    var element = document.getElementsByClassName(item.type)[0];
    element.setAttribute("src", item.imgSrc);
    childService.putItemOn(item);
    $scope.closeModal();
  }

  $scope.buy = function (item) {
    if ($scope.currentAvatar.money >= item.price) {
      var index;
      childService.avatarList.forEach(function (item2, i) {
        console.log("id ", item2.id, childService.currentAvatarId);
        if (item2.id == childService.currentAvatarId){
          index = i;
        }
      });
      childService.currentAvatar.money -= item.price;
      childService.avatarList[index] = childService.currentAvatar;
      $scope.currentAvatar = childService.currentAvatar;
      item.price = 0;
      childService.purchaseItem(item);
      $scope.putOn(item);
    }
    else {
      $scope.showToast("Masz za mało pieniędzy!");
    }
  }


  $ionicModal.fromTemplateUrl('main/equipmentModal.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function (item) {
    $scope.filterDisplay(item);
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.filterDisplay = function (item) {
    $scope.filteredCanBePutOnEquipment = [];
    $scope.filteredCanBePurchasedEquipment = [];
    $scope.filteredUnavailableEquipment = [];

    $scope.currentButton = item;
    filterBy(item, childService.canBePutOnItems, $scope.filteredCanBePutOnEquipment);
    filterBy(item, childService.canBePurchasedItems, $scope.filteredCanBePurchasedEquipment);
    filterBy(item, childService.unavailableItems, $scope.filteredUnavailableEquipment);
  }

  $scope.showToast = function (message) {
    ionicToast.show(message, 'bottom', false, 2500);
  }

  $interval(function () {
    dataService.getAvatarById(childService.currentAvatarId).then(function (res) {
      childService.currentAvatar = res.data;
      if (childService.currentAvatar.update_task == true) {
        childService.currentAvatar.update_task ==false;
        $scope.currentAvatar = childService.currentAvatar;
      }
    });
  },60000);

});
