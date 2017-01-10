angular.module('littleHero').factory('childService',function($state, dataService){
  var childService = {};


  childService.tutorObj = {};

  childService.childObj = {};

  childService.tutorChildren = [];

  childService.avatarList = [];

  childService.currentAvatar = {};
  childService.currentAvatarId;

  childService.wornItems = [];
  childService.canBePutOnItems = [];
  childService.canBePurchasedItems = [];
  childService.unavailableItems = [];

  childService.tasks = [];
  childService.currentTask = {};
  childService.notifications = [];

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
      id: 1,
      money: 10,
      level: 1,
      clazz: "human",
      experience: 0,
      name: "ala",
      health: 100,
      child_id: 1,
      tutor_id: 1
    });
    childService.avatarList.push({
      id: 2,
      money: 20,
      level: 2,
      clazz: "human",
      experience: 110,
      name: "super duper human",
      health: 0,
      child_id: 1,
      tutor_id: 2
    });
    childService.avatarList.push({
      id: 3,
      money: 110,
      level: 3,
      clazz: "mage",
      experience: 110,
      name: "dark mage",
      health: 0,
      child_id: 1,
      tutor_id: 3
    });

  }
  childService.hardcodeAvatarWornItemsArray = function () {
    childService.wornItems = [
      {
        id: 1,
        type: "eyes",
        clazz: "wornByDefault",
        iconSrc: "img/eyes1_icon.svg",
        imgSrc: "img/eyes1.svg",
        level: 1,
        price: 0
      },
      {
        id: 4,
        type: "nose",
        clazz: "wornByDefault",
        iconSrc: "img/nose1_icon.svg",
        imgSrc: "img/nose1.svg",
        level: 1,
        price: 0
      },
      {
        id: 7,
        type: "mouth",
        clazz: "wornByDefault",
        iconSrc: "img/mouth1_icon.svg",
        imgSrc: "img/mouth1.svg",
        level: 1,
        price: 0
      },
      {
        id: 10,
        type: "hair_front",
        clazz: "wornByDefault",
        iconSrc: "img/hair_front1_icon.svg",
        imgSrc: "img/hair_front1.svg",
        level: 1,
        price: 0
      },
      {
        id: 17,
        type: "hair_back",
        clazz: "wornByDefault",
        iconSrc: "img/hair_back1_icon.svg",
        imgSrc: "img/hair_back1.svg",
        level: 1,
        price: 0
      },
      {
        id: 26,
        type: "animal",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 29,
        type: "top",
        clazz: "wornByDefault",
        iconSrc: "img/tee1_icon.svg",
        imgSrc: "img/tee1.svg",
        level: 1,
        price: 0
      },
      {
        id: 34,
        type: "bottom",
        clazz: "wornByDefault",
        iconSrc: "img/pants1_icon.svg",
        imgSrc: "img/pants1.svg",
        level: 1,
        price: 0
      },
      {
        id: 39,
        type: "top_bottom",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 45,
        type: "misc_head",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 49,
        type: "misc_ear",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 52,
        type: "misc_neck",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 56,
        type: "prop_left",
        clazz: "wornByDefault",
        iconSrc: "img/prop1_left_icon.svg",
        imgSrc: "img/prop1_left.svg",
        level: 1,
        price: 0
      },
      {
        id: 58,
        type: "prop_right",
        clazz: "wornByDefault",
        iconSrc: "img/prop1_right_icon.svg",
        imgSrc: "img/prop1_right.svg",
        level: 1,
        price: 0
      },
      {
        id: 62,
        type: "sock",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 67,
        type: "shoes",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      }



    ];
  }
  childService.hardcodeAvatarItemArrays = function () {
    var allItems = [
    {
      id: 2,
      type: "eyes",
      clazz: "allClasses",
      iconSrc: "img/eyes2_icon.svg",
      imgSrc: "img/eyes2.svg",
      level: 1,
      price: 3
    },
    {
      id: 3,
      type: "eyes",
      clazz: "allClasses",
      iconSrc: "img/eyes3_icon.svg",
      imgSrc: "img/eyes3.svg",
      level: 2,
      price: 5
    },
      {
        id: 11,
        type: "hair_front",
        clazz: "allClasses",
        iconSrc: "img/hair_front2_icon.svg",
        imgSrc: "img/hair_front2.svg",
        level: 1,
        price: 0
      },
      {
        id: 12,
        type: "hair_front",
        clazz: "allClasses",
        iconSrc: "img/hair_front3_icon.svg",
        imgSrc: "img/hair_front3.svg",
        level: 1,
        price: 5
      },
      {
        id: 19,
        type: "hair_back",
        clazz: "allClasses",
        iconSrc: "img/hair_back2_icon.svg",
        imgSrc: "img/hair_back2.svg",
        level: 1,
        price: 5
      },
      {
        id: 20,
        type: "hair_back",
        clazz: "allClasses",
        iconSrc: "img/hair_back3_icon.svg",
        imgSrc: "img/hair_back3.svg",
        level: 1,
        price: 8
      },

      {
        id: 28,
        type: "top",
        clazz: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 30,
        type: "top",
        clazz: "human",
        iconSrc: "img/tee2_icon.svg",
        imgSrc: "img/tee2.svg",
        level: 1,
        price: 5
      },

      {
        id: 46,
        type: "misc_head",
        clazz: "human",
        iconSrc: "img/hat1_icon.svg",
        imgSrc: "img/hat1.svg",
        level: 1,
        price: 10
      },
      {
        id: 47,
        type: "misc_head",
        clazz: "human",
        iconSrc: "img/hat2_icon.svg",
        imgSrc: "img/hat2.svg",
        level: 1,
        price: 18
      },
      {
        id: 48,
        type: "misc_head",
        clazz: "human",
        iconSrc: "img/hat3_icon.svg",
        imgSrc: "img/hat3.svg",
        level: 2,
        price: 33
      },

    ];

    allItems.forEach(function (item) {
      if (item.price == 0)
        childService.canBePutOnItems.push(item);
      else if (item.clazz == childService.currentAvatar.clazz || item.clazz == "allClasses"){
        if (item.level == 1)
          childService.canBePurchasedItems.push(item);
        else
          childService.unavailableItems.push(item);
      }
    })
  }
  childService.hardcodeAvatarTasks = function () {
    childService.tasks = [
      {
        content: "zmyj naczynia",
        is_archived: false,
        tutor_id: 1,
        avatar_id: 1,
        reward: 20,
        experience: 50,
        is_completed: false
      },
      {
        content: "wynies smieci",
        is_archived: false,
        tutor_id: 1,
        avatar_id: 1,
        reward: 20,
        experience: 50,
        is_completed: false
      },
      {
        content: "zmyj naczynia",
        is_archived: false,
        tutor_id: 1,
        avatar_id: 1,
        reward: 50,
        experience: 110,
        is_completed: false
      }
    ];
  }


//todo za kazdym raze trzeba ise logowac? zapamietujey gdzies child i urzadzenie??
//   childService.setChild = function(){
//     childService.childObj = dataService.getChildById(childService.childId);
//   }


  childService.setTutorChildren = function () {
    dataService.getChildrenByTutorId(childService.tutorObj.id).then(function (res) {
      childService.tutorChildren = res.data;
    });

  }

  childService.setCurrentAvatarId = function () {
    childService.currentAvatarId = childService.currentAvatar.id;
  }

  childService.setChildAvatarList = function () {
    dataService.getAvatarsByChild(childService.childObj.id).then(function (res) {
        childService.avatarList = res.data;
        childService.currentAvatar = childService.avatarList[0];
        childService.currentAvatarId = childService.currentAvatar.id;
    });
  }

  childService.setTutorAvatarListByChildId = function () {
    dataService.getAvatarsByChildAndTutor(childService.childObj.id, childService.tutorObj.id).then(function (res) {
      childService.avatarList = res.data;
      console.log("servis");
    });
  }

  childService.setAvatarTasksByTutor = function () {
    dataService.getTasksByTutorAndAvatar(childService.tutorObj.id, childService.currentAvatarId).then(function (res) {
      childService.tasks = res.data;
    });
  }

  childService.setAvatarTasks = function () {
      dataService.getTasksByAvatar(childService.currentAvatarId).then(function (res) {
          childService.tasks = res.data;
      });
  }



  childService.addNewAvatar = function (name, avatarClass, tutorId) {
    var newAvatar ={
      name : name,
      clazz : avatarClass,
      child_id : childService.childObj.id,
      tutor_id : tutorId,
      level : 1,
      money: 0,
      health : 100,
      experience : 0
    };
    childService.avatarList.push(newAvatar);
    console.log(newAvatar);
    dataService.postAvatar(newAvatar).then( function(res) {
      console.log("postAvatar", res);
      var newAvatarId = res.data.id;
      // childService.fillNewAvatarItemArrays(avatarClass, newAvatarId);
      childService.hardcodeAvatarItemArrays();
    });
  }


  childService.fillNewAvatarItemArrays = function (avatarClass, newAvatarId) {
    var allItems = dataService.getItems();

    allItems.forEach(function (item) {
      if (item.clazz == "wornByDefault"){
        dataService.postAvatarItemLink({
          avatar_id: newAvatarId,
          state: "worn",
          item_id: item.id
        });
        //todo musze jakos dostac id tego co wlasnie wlozylam!!!
        var avatarItemLinksId;
        item.avatarItemLinksId = avatarItemLinksId;
        childService.wornItems.push(item);
      }
      else if (item.price == 0 && item.clazz == "allClasses") {
        dataService.postAvatarItemLink({
          avatar_id: newAvatarId,
          state: "canBePutOn",
          item_id: item.id
        });
        //todo musze jakos dostac id tego co wlasnie wlozylam!!!
        var avatarItemLinksId;
        item.avatarItemLinksId = avatarItemLinksId;
        childService.canBePutOnItems.push(item);
      }
      else if (item.clazz == avatarClass || item.clazz == "allClasses") {
        if (item.level == 1){
          dataService.postAvatarItemLink({
            avatar_id: newAvatarId,
            state: "canBePurchased",
            item_id: item.id
          });
          //todo musze jakos dostac id tego co wlasnie wlozylam!!!
          var avatarItemLinksId;
          item.avatarItemLinksId = avatarItemLinksId;
          childService.canBePurchasedItems.push(item);
        }
        else {
          dataService.postAvatarItemLink({
            avatar_id: newAvatarId,
            state: "unavailable",
            item_id: item.id
          });
          //todo musze jakos dostac id tego co wlasnie wlozylam!!!
          var avatarItemLinksId;
          item.avatarItemLinksId = avatarItemLinksId;
          childService.unavailableItems.push(item);
        }
      }
    })
  }



  childService.setWornItems = function () {
      dataService.getAvatarWornItemsIds(childService.currentAvatarId).then(function (res) {
        childService.wornItems = res.data;
        result.forEach(function (item, i) {
          var avatarItemLinksId = item.id;
          var itemId = item.item_id;
          dataService.getItem(itemId).then(function (res) {
            childService.wornItems[i] = res.data;
            childService.wornItems[i].avatarItemLinksId = avatarItemLinksId;
          })
        })
      }
    )
  }

  childService.setCanBePutOnItems = function () {
      dataService.getAvatarCanBePutOnItemsIds(childService.currentAvatarId).then(function(res) {
        childService.canBePutOnItems = res.data;
        childService.canBePutOnItems.forEach(function (item, i) {
          var avatarItemLinksId = item.id;
          var itemId = item.item_id;
          dataService.getItem(itemId).then(function (res) {
            childService.canBePutOnItems[i] = res.data;
            childService.canBePutOnItems[i].avatarItemLinksId = avatarItemLinksId;
          })
        })
    })
  }

  childService.setCanBePurchasedItems = function () {
     dataService.getAvatarCanBePurchasedItemsIds(childService.currentAvatarId).then(function(res) {
          childService.canBePurchasedItems = res.data;
          childService.canBePurchasedItems.forEach(function (item, i) {
            var avatarItemLinksId = item.id;
            var itemId = item.item_id;
            dataService.getItem(itemId).then(function (res) {
              childService.canBePurchasedItems[i] = res.data;
              childService.canBePurchasedItems[i].avatarItemLinksId = avatarItemLinksId;
            })
          })
      })
  }


  childService.setUnavailableItems = function () {
    dataService.getAvatarUnavailableItemsIds(childService.currentAvatarId).then(function(res) {
        childService.unavailableItems = res.data;
        childService.unavailableItems.forEach(function (item, i) {
          var avatarItemLinksId = item.id;
          var itemId = item.item_id;
          dataService.getItem(itemId).then(function (res) {
            childService.unavailableItems[i] = res.data;
            childService.unavailableItems[i].avatarItemLinksId = avatarItemLinksId;
          })
        })
    })
  }



  childService.purchaseItem = function (item) {
    var itemIndex = childService.canBePurchasedItems.indexOf(item);

    childService.canBePurchasedItems.splice(itemIndex, 1);
    childService.canBePutOnItems.push(item);

    //dataService.patchItem(item.id, {price: 0});
    //dataService.changeEquipmentItemState(item.avatarItemLinksId, {state: "canBePutOn"});
    //dataService.patchAvatar(childService.currentAvatarId, {money: currentAvatar.money});
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
    //dataService.changeEquipmentItemState(oldItem.avatarItemLinksId, {state: "canBePutOn"});
    //dataService.changeEquipmentItemState(newItem.avatarItemLinksId, {state: "worn"});
  },

  childService.setNotificationsArray = function () {
    dataService.getNotificationsByAvatar(childService.currentAvatarId).then(function (res) {
      childService.notifications = res.data;
    });
  }

  childService.addNotification = function (content) {
    var notification = {
      content: content
    }
    dataService.postNotification(childService.currentAvatarId, notification);
  }


  childService.gainLevel = function (exp) {
    childService.currentAvatar.level++;
    childService.currentAvatar.health = 100;
    childService.currentAvatar.experience = exp;

    childService.addNotification("Masz nowy poziom! Sprawdz ekwipunek, dostepne sa nowa rzeczy!");

    //todo JAK BEDA ITEMY to odkomentowac
    // childService.setUnavailableItems();
    // for (var i=childService.unavailableItems.length-1; i>=0; i--){
    //   var item = childService.unavailableItems[i];
    //   if (item.level == childService.currentAvatar.level) {
    //     dataService.changeEquipmentItemState(item.avatarItemLinksId, "canBePurchased");
    //   }
    // }
  }

  childService.loseLevel = function () {
    if (childService.currentAvatar.level!=1)
      childService.currentAvatar.level--;
    childService.currentAvatar.health = 100;
    childService.currentAvatar.experience = 0;
    childService.currentAvatar.money = 0;
    childService.addNotification("Straciłeś poziom i pieniądze. Ale nie martw się, masz znowu pełne zdrowie, zacznij od nowa. Powodzenia!");

    // childService.setCanBePurchasedItems();
    // childService.canBePurchasedItems.forEach(function (item) {
    //   if (item.level > childService.currentAvatar.level) {
    //     childService.unavailableItems.push(item);
    //     dataService.changeEquipmentItemState(item.avatarItemLinksId, "unavailable");
    //   }
    // })
  }

  childService.completeTask = function (task) {
    var index = childService.tasks.indexOf(task);
    childService.tasks.splice(index, 1);
    dataService.deleteTask(task.id);

    childService.currentAvatar.money += task.reward;
    if (childService.currentAvatar.experience + task.experience >= 100){
      var exp = childService.currentAvatar.experience + task.experience - 100;
      childService.gainLevel(exp);
    }
    else {
      childService.currentAvatar.experience += task.experience;
    }
    dataService.patchAvatar(childService.currentAvatarId, childService.currentAvatar);
  }



  childService.failTask = function (task) {
    var index = childService.tasks.indexOf(task);
    childService.tasks.splice(index, 1);
    dataService.deleteTask(task.id);

    if (childService.currentAvatar.health <= task.experience){
      childService.loseLevel();
    }
    else {
      childService.currentAvatar.money -= task.reward;
      if (childService.currentAvatar.money<0){
        childService.currentAvatar.money = 0;
      }
      childService.currentAvatar.health -= task.experience;
    }
    dataService.patchAvatar(childService.currentAvatarId, childService.currentAvatar);
  }





  return childService;

});
