angular.module('littleHero').factory('childService',function($state, dataService){
  var childService = {};


  childService.tutorObj = {};

  childService.childObj = {};

  childService.avatarList = [];

  childService.currentAvatar;
  childService.currentAvatarId;

  childService.wornItems = [];
  childService.canBePutOnItems = [];
  childService.canBePurchasedItems = [];
  childService.unavailableItems = [];

  childService.tasks = [];

  childService.hardcodeChildObj = function () {
    childService.childObj = {
      login: "a",
      password: "a",
      nickname: "saatring",
      mail: "striaaang",
      id: 1,
      updateTask: false,
      updateNotifications: false,
      updateInvitation: false
    }
  }
  childService.hardcodeAvatarList = function () {
    childService.avatarList.push({
      money: 10,
      level: 1,
      class: "human",
      experience: 0,
      name: "ala",
      health: 100,
      child_id: 1,
      tutor_id: 1
    });
    childService.avatarList.push({
      money: 10,
      level: 2,
      class: "king",
      experience: 110,
      name: "super duper king",
      health: 0,
      child_id: 1,
      tutor_id: 2
    });
    childService.avatarList.push({
      money: 10,
      level: 3,
      class: "mage",
      experience: 110,
      name: "dark mage",
      health: 0,
      child_id: 1,
      tutor_id: 3
    });

  }

  childService.hardcodeAvatarItemArrays = function () {
    var allItems = [
    {
      id: 2,
      type: "eyes",
      class: "default",
      iconSrc: "img/eyes2_icon.svg",
      imgSrc: "img/eyes2.svg",
      lvl: 1,
      price: 3
    },
    {
      id: 3,
      type: "eyes",
      class: "default",
      iconSrc: "img/eyes3_icon.svg",
      imgSrc: "img/eyes3.svg",
      lvl: 2,
      price: 5
    },
      {
        id: 11,
        type: "hair_front",
        class: "default",
        iconSrc: "img/hair_front2_icon.svg",
        imgSrc: "img/hair_front2.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 12,
        type: "hair_front",
        class: "default",
        iconSrc: "img/hair_front3_icon.svg",
        imgSrc: "img/hair_front3.svg",
        lvl: 1,
        price: 5
      },
      {
        id: 19,
        type: "hair_back",
        class: "default",
        iconSrc: "img/hair_back2_icon.svg",
        imgSrc: "img/hair_back2.svg",
        lvl: 1,
        price: 5
      },
      {
        id: 20,
        type: "hair_back",
        class: "default",
        iconSrc: "img/hair_back3_icon.svg",
        imgSrc: "img/hair_back3.svg",
        lvl: 1,
        price: 8
      },

      {
        id: 28,
        type: "top",
        class: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 30,
        type: "top",
        class: "human",
        iconSrc: "img/tee2_icon.svg",
        imgSrc: "img/tee2.svg",
        lvl: 1,
        price: 5
      },

      {
        id: 46,
        type: "misc_head",
        class: "king",
        iconSrc: "img/hat1_icon.svg",
        imgSrc: "img/hat1.svg",
        lvl: 1,
        price: 10
      },
      {
        id: 47,
        type: "misc_head",
        class: "human",
        iconSrc: "img/hat2_icon.svg",
        imgSrc: "img/hat2.svg",
        lvl: 1,
        price: 18
      },
      {
        id: 48,
        type: "misc_head",
        class: "human",
        iconSrc: "img/hat3_icon.svg",
        imgSrc: "img/hat3.svg",
        lvl: 2,
        price: 33
      },

    ];

    childService.wornItems = [
      {
        id: 1,
        type: "eyes",
        class: "default",
        iconSrc: "img/eyes1_icon.svg",
        imgSrc: "img/eyes1.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 4,
        type: "nose",
        class: "default",
        iconSrc: "img/nose1_icon.svg",
        imgSrc: "img/nose1.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 7,
        type: "mouth",
        class: "default",
        iconSrc: "img/mouth1_icon.svg",
        imgSrc: "img/mouth1.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 10,
        type: "hair_front",
        class: "default",
        iconSrc: "img/hair_front1_icon.svg",
        imgSrc: "img/hair_front1.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 17,
        type: "hair_back",
        class: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 26,
        type: "animal",
        class: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 29,
        type: "top",
        class: "default",
        iconSrc: "img/tee1_icon.svg",
        imgSrc: "img/tee1.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 34,
        type: "bottom",
        class: "default",
        iconSrc: "img/pants1_icon.svg",
        imgSrc: "img/pants1.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 39,
        type: "top_bottom",
        class: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 45,
        type: "misc_head",
        class: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 49,
        type: "misc_ear",
        class: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 52,
        type: "misc_neck",
        class: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 56,
        type: "prop_left",
        class: "default",
        iconSrc: "img/prop1_left_icon.svg",
        imgSrc: "img/prop1_left.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 58,
        type: "prop_right",
        class: "default",
        iconSrc: "img/prop1_right_icon.svg",
        imgSrc: "img/prop1_right.svg",
        lvl: 1,
        price: 0
      },
      {
        id: 62,
        type: "sock",
        class: "human",
        iconSrc: "img/sock1_icon.svg",
        imgSrc: "img/sock1.svg",
        lvl: 1,
        price: 20
      },
      {
        id: 67,
        type: "shoes",
        class: "default",
        iconSrc: "img/shoes1_icon.svg",
        imgSrc: "img/shoes1.svg",
        lvl: 1,
        price: 10
      }



    ];


    allItems.forEach(function (item) {
      if (item.price == 0)
        childService.canBePutOnItems.push(item);
      else if (item.class == childService.currentAvatar.class || item.class == "default"){
        if (item.lvl == 1)
          childService.canBePurchasedItems.push(item);
        else
          childService.unavailableItems.push(item);
      }
    })
  }




//todo za kazdym raze trzeba ise logowac? zapamietujey gdzies child i urzadzenie??
//   childService.setChild = function(){
//     childService.childObj = dataService.getChildById(childService.childId);
//   }


  childService.setCurrentAvatarId = function () {
    childService.currentAvatarId = childService.currentAvatar.id;
  }

  childService.setChildAvatarList = function () {
    childService.avatarList = dataService.getAvatarsByChild(childService.childObj.id);
  }

  childService.setTutorAvatarList = function () {
    childService.avatarList = dataService.getAvatarsByTutor(childService.tutorObj.id);
  }

  childService.setTasks = function () {
    childService.tasks = dataService.getTasksByAvatar(childService.currentAvatarId);
  }



  childService.addNewAvatar = function (name, avatarClass, tutorId) {
    //w zaleznosci od klasy trzeba dodac ciuch do tablic ciuchowych
    //trzeba dodac do tablicy wornItems rzeczy z klasy default

    var newAvatar ={
      name : name,
      class : avatarClass,
      childId : childService.childId,
      tutor : tutorId,
      level : 1,
      money: 0,
      health : 100,
      experience : 0
    };
    childService.avatarList.push(newAvatar);
    //todo zakomentowane bo serwer nie dziala
    //dataService.postAvatar(newAvatar);
  }

  childService.fillNewAvatarItemArrays = function (avatarClass) {
    var allItems = dataService.getItems();
    allItems.forEach(function (item) {
      //todo !!! WAZNE !!! jak wypelnic tablice worn items? klasa nowa???


      if (item.price == 0)
        childService.canBePutOnItems.push(item);
      else if (item.class == avatarClass || item.class == "default"){
        if (item.level == 1)
          childService.canBePurchasedItems.push(item);
        else
          childService.unavailableItems.push(item);
      }
    })
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


  //purchaseItem =  changeEquipmentItemState ze statusem canBePutOn
  childService.purchaseItem = function (item) {
    var itemIndex = childService.canBePurchasedItems.indexOf(item);

    //zmienic tablice a w bazie danych status itemu
    childService.canBePurchasedItems.splice(itemIndex, 1);
    childService.canBePutOnItems.push(item);

    dataService.changeEquipmentItemState(item.avatarItemLinksId, {state: "canBePutOn"})
  }


  childService.putItemOn = function (newItem) {
    var oldItem;
    var oldItemIndex;
    var newItemIndex = childService.canBePutOnItems.indexOf(newItem);

    childService.wornItems.forEach(function (item, i) {
      //console.log("wornItems")ł
      if (item.type == newItem.type){
        oldItem = item;
        oldItemIndex = i;
      }
    })
    //zmienic tablice a w bazie danych status itemu
    childService.wornItems.splice(oldItemIndex, 1);
    childService.wornItems.push(newItem);
    childService.canBePutOnItems.splice(newItemIndex,1);
    childService.canBePutOnItems.push(oldItem);


    //drugi parametr to newState
    dataService.changeEquipmentItemState(oldItem.avatarItemLinksId, {state: "canBePutOn"})
    dataService.changeEquipmentItemState(newItem.avatarItemLinksId, {state: "worn"})
  },

  childService.gainLevel = function (exp) {
    childService.currentAvatar.level++;
    childService.health = 100;
    childService.experience = exp;
    childService.unavailableItems.forEach(function (item, index) {
      if (item.level == childService.currentAvatar.level) {
        childService.canBePurchasedItems.push(item);
        unavailableItems.splice(index, 1);//todo mozna tak? usowam to na czym jestem??
      }
    })
  }

  childService.loseHealth = function () {
    childService.currentAvatar.level--;
    childService.health = 100;
    childService.experience = 0;
    childService.canBePurchasedItems.forEach(function (item, index) {
      if (item.level > childService.currentAvatar.level) {
        childService.unavailableItems.push(item);
        canBePurchasedItems.splice(index, 1);
      }
    })
  }

  childService.writeAllDataToDatabase = function () {

  }



  return childService;

});
