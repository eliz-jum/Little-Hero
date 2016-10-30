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
    childService.childId = dataService.getChild(childService.childId);
  };

  childService.setChild = function(){
    childService.childObj = dataService.getChild(childService.childId);
  };

  childService.setCurrentAvatarId = function (id) {
    childService.currentAvatarId = id;
  }

  childService.setAvatarList = function () {
    childService.avatarList = dataService.getChildAvatars(childService.childId);
  }



  childService.addNewAvatar = function (name, calss, tutorId) {
    //w zaleznosci od klasy trzeba dodac ciuch do tablic ciuchowych
    //trzeba dodac do tablicy wornItems rzeczy z klasy default
    //TODO: zrobic klase default w ekwipunku
    var newAvatar = {}
    childService.avatarList.add();
    dataService.postChildAvatar(newAvatar);
  }


  childService.setWornItems = function () {
    childService.wornItems = dataService.getAvatarWornItems(currentAvatarId);
  }

  childService.changeWornItems = function (type) {
    childService.wornItems
  }

  //add
  //delete

  childService.setCanBePutOnItems = function () {
    childService.canBePutOnItems = dataService.getAvatarCanBePutOnItems(currentAvatarId);
  }

  //add

  childService.setCanBePurchasedItems = function () {
    childService.canBePurchasedItems = dataService.getAvatarCanBePurchasedItems(currentAvatarId);
  }

  //delete
  //add

  childService.setUnavailableItems = function () {
    childService.unavailableItems = dataService.getAvatarUnavailableItems(currentAvatarId);
  }

  //delete
  //add

  return childService;

});
