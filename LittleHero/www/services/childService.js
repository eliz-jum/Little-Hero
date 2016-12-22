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

    var newAvatar ={
      name : name,
      class : calss,
      childId : childService.childId,
      tutor : tutorId,
      level : 1,
      money: 0,
      health : 100,
      experience : 0
    };
    childService.avatarList.add();
    dataService.postAvatar(newAvatar);
  }


  childService.setWornItems = function () {
    childService.wornItems = dataService.getAvatarWornItemsIds(currentAvatarId);
    childService.wornItems.forEach(function (item, i) {
      var avatarItemLinksId = item.id;
      var itemId = item.item_id;
      childService.wornItems[i] = dataService.getItem(itemId);
      childService.wornItems[i].avatarItemLinksId = avatarItemLinksId;
    })
  }

  childService.setCanBePutOnItems = function () {
    childService.canBePutOnItems = dataService.getAvatarCanBePutOnItemsIds(currentAvatarId);
    childService.canBePutOnItems.forEach(function (item, i) {
      var avatarItemLinksId = item.id;
      var itemId = item.item_id;
      childService.canBePutOnItems[i] = dataService.getItem(itemId);
      childService.canBePutOnItems[i].avatarItemLinksId = avatarItemLinksId;
    })
  }

  childService.setCanBePurchasedItems = function () {
    childService.canBePurchasedItems = dataService.getAvatarCanBePurchasedItemsIds(currentAvatarId);
    childService.canBePurchasedItems.forEach(function (item, i) {
      var avatarItemLinksId = item.id;
      var itemId = item.item_id;
      childService.canBePurchasedItems[i] = dataService.getItem(itemId);
      childService.canBePurchasedItems[i].avatarItemLinksId = avatarItemLinksId;
    })
  }


  childService.setUnavailableItems = function () {
    childService.unavailableItems = dataService.getAvatarUnavailableItemsIds(currentAvatarId);
    childService.unavailableItems.forEach(function (item, i) {
      var avatarItemLinksId = item.id;
      var itemId = item.item_id;
      childService.unavailableItems[i] = dataService.getItem(itemId);
      childService.unavailableItems[i].avatarItemLinksId = avatarItemLinksId;
    })
  }


  //purchaseItem =  changeEquipmentItemState
  childService.purchaseItem = function (itemId) {
    //zmienic tablice a w bazie danych status itemu
    var index;
    var avatarItemLinksId;
    childService.canBePurchasedItems.forEach(function (item) {
      if (item.id == itemId){
        index = i;
        avatarItemLinksId = item.avatarItemLinksId;
      }
    })
    canBePutOnItems.add(canBePurchasedItems[index]);
    canBePurchasedItems.splice(index,1);

    //TODO: drugi parametr to newState
    dataService.changeEquipmentItemState(avatarItemLinksId, {state: "canBePutOn"})
  }


  //putOnItem - zmiana w tablicach
  childService.putOnItem = function (itemId) {
    //zmienic tablice a w bazie danych status itemu
    var index;
    var avatarItemLinksId;
    childService.canBePutOnItems.forEach(function (item) {
      if (item.id == itemId){
        index = i;
        avatarItemLinksId = item.avatarItemLinksId;
      }
    })
    wornItems.add(canBePutOnItems[index]);
    canBePutOnItems.splice(index,1);

    //TODO: drugi parametr to newState
    dataService.changeEquipmentItemState(avatarItemLinksId, {state: "worn"})
  }



  return childService;

});
