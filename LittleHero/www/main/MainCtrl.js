angular.module('littleHero').controller('MainController', function($scope, $state, $stateParams, $ionicModal, $http, dataService, ionicToast){
  var canBePutOnEquipment = [];
  var canBePurchasedEquipment = [];
  var unavailableEquipment = [];

    $scope.user = null;
    $scope.allAvatars = null;
    $scope.currentAvatar = null;
    $scope.showAvatar = false;

    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.user = $stateParams.user;
        $scope.checkForAvatar();

        if ($stateParams.allAvatars != null) {
            $scope.allAvatars = $stateParams.allAvatars;
            $scope.currentAvatar = $stateParams.currentAvatar2;
        }
        else $scope.getAvatars();

      getAssets();
    });

    $scope.checkForAvatar = function() {
        if ($scope.currentAvatar != null) {
            $scope.showAvatar = true;
            getAssets();
        }
        else
            $scope.showAvatar = false;
    };

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
    $scope.closeModal();

  }

  $scope.buy = function(item) {
    console.log($scope.currentAvatar);
    console.log("masz pieniedzy:  "+$scope.currentAvatar.money);
    console.log("rzecz kosztuje:  "+item.price);
    if ($scope.currentAvatar.money >= item.price) {
      //usunac item z tablicy canBePurchasedItems
      //wlozyc item do canBePutOnItems

      //zmienic pieniadze w jsonie
      $scope.currentAvatar.money -= item.price;
      var element = document.getElementsByClassName(item.type)[0];
      element.setAttribute("src", item.imgSrc);
      $scope.closeModal();
    }
    else {
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
    getAssets();
  }


  $scope.getAvatars = function() {
      dataService.getChildAvatars($scope.user["id"]).then(function(res) {
          $scope.allAvatars = res.data;
      });
  }

  var getAssets = function() {
    canBePutOnEquipment = [];
    canBePurchasedEquipment = [];
    unavailableEquipment = [];

    dataService.getAvatars().then(function(res) {
      var avatars = res.data;

      canBePutOnEquipment = avatars[0]["canBePutOnItems"];
      canBePurchasedEquipment = avatars[0]["canBePurchasedItems"];
      unavailableEquipment = avatars[0]["unavailableItems"];

    });

  }

  $scope.filterDisplay = function(item) {
    $scope.filteredCanBePutOnEquipment=[];
    $scope.filteredCanBePurchasedEquipment=[];
    $scope.filteredUnavailableEquipment=[];

    $scope.currentButton = item;
    filterBy(item, canBePutOnEquipment, $scope.filteredCanBePutOnEquipment);
    filterBy(item, canBePurchasedEquipment, $scope.filteredCanBePurchasedEquipment);
    filterBy(item, unavailableEquipment, $scope.filteredUnavailableEquipment);

  }

  $scope.showToast = function(message){
    ionicToast.show(message, 'bottom', false, 2500);
  };
});
