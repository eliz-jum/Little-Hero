angular.module('littleHero').factory('childService',function($scope, $state, dataService){
  var childService = {};


  childService.childId;
  childService.childObj = {};
  childService.avatarList = [];

  childService.currentAvatarId;
  childService.wornItems = [];
  childService.canBePutOnItems = [];
  childService.canBePurchasedItems = [];
  childService.unavailableItems = [];


  childService.setChildId = function(){
    childService.childId = dataService.getChildById(childService.childId);
  };

  childService.setChild = function(){
    childService.childObj = dataService.getChildById(childService.childId);
  };

  childService.setCurrentAvatarId = function (id) {
    childService.currentAvatarId = id;
  }

  childService.setAvatarList = function () {
    childService.avatarList = dataService.getAvatarsByChild(childService.childId);
  }



  childService.addNewAvatar = function (name, calss, tutorId) {
    //w zaleznosci od klasy trzeba dodac ciuch do tablic ciuchowych
    //trzeba dodac do tablicy wornItems rzeczy z klasy default

    var newAvatar = {};
    childService.avatarList.add();
    dataService.postAvatar(newAvatar);
  }


  childService.setWornItems = function () {
    childService.wornItems = dataService.getAvatarWornItemsIds(currentAvatarId);
  }

  childService.changeWornItems = function (type) {
    childService.wornItems
  }

  //add
  //delete

  childService.setCanBePutOnItems = function () {
    childService.canBePutOnItems = dataService.getAvatarCanBePutOnItemsIds(currentAvatarId);
  }

  //add

  childService.setCanBePurchasedItems = function () {
    childService.canBePurchasedItems = dataService.getAvatarCanBePurchasedItemsIds(currentAvatarId);
  }

  //delete
  //add

  childService.setUnavailableItems = function () {
    childService.unavailableItems = dataService.getAvatarUnavailableItemsIds(currentAvatarId);
  }

  //delete
  //add

  return childService;

});
