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

    console.log(newAvatar);
    dataService.postAvatar(newAvatar).then( function(res) {
      console.log("postAvatar", res);
      newAvatar.id = res.data.id;
      childService.avatarList.push(newAvatar);
      childService.currentAvatar = newAvatar;
      childService.currentAvatarId = newAvatar.id;

      childService.fillNewAvatarItemArrays(avatarClass, newAvatar.id);
    });
  }

  childService.putItemIntoCorrectArray = function (item, type, data) {
    item.avatarItemLinksId = data.id;
    if (type == 0){
      childService.wornItems.push();
    }
    else if (type == 1){
      childService.canBePutOnItems.push(item);
    }
    else if (type == 2){
      childService.canBePurchasedItems.push(item);
    }
    else {
      childService.unavailableItems.push(item);
    }
  }

  childService.fillNewAvatarItemArrays = function (avatarClass, newAvatarId) {
    dataService.getItems().then(function(res){
      var allItems = res.data;
      // allItems[0] = {
      //   id: 295,
      //   type: "bottom",
      //   clazz: "allclazzes",
      //   iconSrc: "img/empty_icon.svg",
      //   imgSrc: "img/empty.svg",
      //   level: 1,
      //   price: 0
      // };
      // console.log("foreach!");
      //
      // allItems.forEach(function (item) {
      //   if (item.id == 295){
      //     console.log("295!!!!!",item);
      //   }
      // });


      //robi ze zmiennych tablice (bez tego są obiektami i nie da się zrobić push)
      childService.wornItems = [];
      childService.canBePutOnItems = [];
      childService.canBePurchasedItems = [];
      childService.unavailableItems = [];
      //
      allItems.forEach(function (item) {
        if (item.clazz == "wornByDefault"){
          var obj = {
            avatar_id: newAvatarId,
            state: "worn",
            item_id: item.id
          };
          dataService.postAvatarItemLink(obj, item, childService.putItemIntoCorrectArray, 0);
        }
        else if (item.price == 0 && item.clazz == "allclazzes") {
          var obj = {
            avatar_id: newAvatarId,
            state: "canBePutOn",
            item_id: item.id
          };
          dataService.postAvatarItemLink(obj, item, childService.putItemIntoCorrectArray, 1);
        }
        else if (item.clazz == avatarClass || item.clazz == "allclazzes") {
          if (item.level == 1){
            var obj = {
              avatar_id: newAvatarId,
              state: "canBePurchased",
              item_id: item.id
            };
            dataService.postAvatarItemLink(obj, item, childService.putItemIntoCorrectArray, 2);
          }
          else {
            var obj = {
              avatar_id: newAvatarId,
                state: "unavailable",
              item_id: item.id
            };
            dataService.postAvatarItemLink(obj, item, childService.putItemIntoCorrectArray, 3);
          }
        }
      })
    });
  }



  childService.setWornItems = function (callback) {
    dataService.getAvatarWornItemsIds(childService.currentAvatarId).then(function (res) {
      childService.wornItems = res.data;
        childService.wornItems.forEach(function (item, i) {
          var avatarItemLinksId = item.id;
          var itemId = item.item_id;
          dataService.getItem(itemId).then(function (res) {
            childService.wornItems[i] = res.data;
            childService.wornItems[i].avatarItemLinksId = avatarItemLinksId;
            if (i == childService.wornItems.length-1){
              callback();
            }
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

    //dataService.patchItem(item.id, {price: 0}); //todo tego chyba nie powinno sie robić nie?
    dataService.changeEquipmentItemState(item.avatarItemLinksId, {state: "canBePutOn"});
    dataService.patchAvatar(childService.currentAvatarId, {money: childService.currentAvatar.money});
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
    dataService.changeEquipmentItemState(oldItem.avatarItemLinksId, {state: "canBePutOn"});
    dataService.changeEquipmentItemState(newItem.avatarItemLinksId, {state: "worn"});
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

    childService.addNotification("Zdobyłeś nowy poziom! Sprawdz ekwipunek, dostepne sa nowa rzeczy!");

    childService.setUnavailableItems();
    setTimeout(function(){
      for (var i=childService.unavailableItems.length-1; i>=0; i--){
        var item = childService.unavailableItems[i];
        if (item.level == childService.currentAvatar.level) {
          dataService.changeEquipmentItemState(item.avatarItemLinksId, {state: "canBePurchased"});
        }
      }
    },3000);


  }

  childService.loseLevel = function () {
    if (childService.currentAvatar.level!=1)
      childService.currentAvatar.level--;
    childService.currentAvatar.health = 100;
    childService.currentAvatar.experience = 0;
    childService.currentAvatar.money = 0;
    childService.addNotification("Straciłeś poziom i pieniądze. Ale nie martw się, masz znowu pełne zdrowie, zacznij od nowa. Powodzenia!");

    childService.setCanBePurchasedItems();
    setTimeout(function(){
      childService.canBePurchasedItems.forEach(function (item) {
        if (item.level > childService.currentAvatar.level) {
          childService.unavailableItems.push(item);
          dataService.changeEquipmentItemState(item.avatarItemLinksId, {state: "unavailable"});
        }
      })
    },3000);
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
      childService.currentAvatar.health -= task.experience;
      childService.currentAvatar.money -= task.reward;
      if (childService.currentAvatar.money<0){
        childService.currentAvatar.money = 0;
      }
    }
    dataService.patchAvatar(childService.currentAvatarId, childService.currentAvatar);
  }





  return childService;

});
