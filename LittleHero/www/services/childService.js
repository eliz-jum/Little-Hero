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
        id: 1,
        type: "eyes",
        clazz: "wornByDefault",
        iconSrc: "img/eyes1_icon.svg",
        imgSrc: "img/eyes1.svg",
        level: 1,
        price: 0
      },
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
        id: 70,
        type: "eyes",
        clazz: "allClasses",
        iconSrc: "img/eyes4_icon.svg",
        imgSrc: "img/eyes4.svg",
        level: 2,
        price: 5
      },
      {
        id: 71,
        type: "eyes",
        clazz: "allClasses",
        iconSrc: "img/eyes5_icon.svg",
        imgSrc: "img/eyes5.svg",
        level: 3,
        price: 8
      },
      {
        id: 72,
        type: "eyes",
        clazz: "allClasses",
        iconSrc: "img/eyes6_icon.svg",
        imgSrc: "img/eyes6.svg",
        level: 3,
        price: 8
      },
      {
        id: 73,
        type: "eyes",
        clazz: "allClasses",
        iconSrc: "img/eyes7_icon.svg",
        imgSrc: "img/eyes7.svg",
        level: 4,
        price: 15
      },
      {
        id: 74,
        type: "eyes",
        clazz: "allClasses",
        iconSrc: "img/eyes8_icon.svg",
        imgSrc: "img/eyes8.svg",
        level: 4,
        price: 15
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
        id: 5,
        type: "nose",
        clazz: "allClasses",
        iconSrc: "img/nose2_icon.svg",
        imgSrc: "img/nose2.svg",
        level: 1,
        price: 5
      },
      {
        id: 6,
        type: "nose",
        clazz: "allClasses",
        iconSrc: "img/nose3_icon.svg",
        imgSrc: "img/nose3.svg",
        level: 1,
        price: 8
      },
      {
        id: 75,
        type: "nose",
        clazz: "allClasses",
        iconSrc: "img/nose4_icon.svg",
        imgSrc: "img/nose4.svg",
        level: 2,
        price: 10
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
        id: 8,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth2_icon.svg",
        imgSrc: "img/mouth2.svg",
        level: 1,
        price: 3
      },
      {
        id: 9,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth3_icon.svg",
        imgSrc: "img/mouth3.svg",
        level: 1,
        price: 5
      },
      {
        id: 76,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth4_icon.svg",
        imgSrc: "img/mouth4.svg",
        level: 2,
        price: 8
      },
      {
        id: 77,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth5_icon.svg",
        imgSrc: "img/mouth5.svg",
        level: 2,
        price: 8
      },
      {
        id: 78,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth6_icon.svg",
        imgSrc: "img/mouth6.svg",
        level: 2,
        price: 10
      },
      {
        id: 79,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth7_icon.svg",
        imgSrc: "img/mouth7.svg",
        level: 3,
        price: 10
      },
      {
        id: 80,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth8_icon.svg",
        imgSrc: "img/mouth8.svg",
        level: 3,
        price: 13
      },
      {
        id: 81,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth9_icon.svg",
        imgSrc: "img/mouth9.svg",
        level: 4,
        price: 15
      },
      {
        id: 82,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth10_icon.svg",
        imgSrc: "img/mouth10.svg",
        level: 4,
        price: 16
      },
      {
        id: 83,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth11_icon.svg",
        imgSrc: "img/mouth11.svg",
        level: 5,
        price: 20
      },
      {
        id: 84,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth12_icon.svg",
        imgSrc: "img/mouth12.svg",
        level: 5,
        price: 18
      },
      {
        id: 85,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth13_icon.svg",
        imgSrc: "img/mouth13.svg",
        level: 6,
        price: 22
      },
      {
        id: 86,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth14_icon.svg",
        imgSrc: "img/mouth14.svg",
        level: 6,
        price: 24
      },
      {
        id: 87,
        type: "mouth",
        clazz: "allClasses",
        iconSrc: "img/mouth15_icon.svg",
        imgSrc: "img/mouth15.svg",
        level: 6,
        price: 25
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
        id: 13,
        type: "hair_front",
        clazz: "allClasses",
        iconSrc: "img/hair_front4_icon.svg",
        imgSrc: "img/hair_front4.svg",
        level: 2,
        price: 5
      },
      {
        id: 14,
        type: "hair_front",
        clazz: "allClasses",
        iconSrc: "img/hair_front5_icon.svg",
        imgSrc: "img/hair_front5.svg",
        level: 2,
        price: 7
      },
      {
        id: 15,
        type: "hair_front",
        iconSrc: "img/hair_front6_icon.svg",
        imgSrc: "img/hair_front6.svg",
        level: 3,
        price: 10
      },
      {
        id: 16,
        type: "hair_front",
        clazz: "allClasses",
        iconSrc: "img/hair_front7_icon.svg",
        imgSrc: "img/hair_front7.svg",
        level: 3,
        price: 13
      },





      {
        id: 18,
        type: "hair_back",
        clazz: "wornByDefault",
        iconSrc: "img/hair_back1_icon.svg",
        imgSrc: "img/hair_back1.svg",
        level: 1,
        price: 0
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
        id: 21,
        type: "hair_back",
        clazz: "allClasses",
        iconSrc: "img/hair_back4_icon.svg",
        imgSrc: "img/hair_back4.svg",
        level: 1,
        price: 10
      },
      {
        id: 22,
        type: "hair_back",
        clazz: "allClasses",
        iconSrc: "img/hair_back5_icon.svg",
        imgSrc: "img/hair_back5.svg",
        level: 2,
        price: 13
      },
      {
        id: 23,
        type: "hair_back",
        clazz: "allClasses",
        iconSrc: "img/hair_back6_icon.svg",
        imgSrc: "img/hair_back6.svg",
        level: 2,
        price: 15
      },
      {
        id: 24,
        type: "hair_back",
        clazz: "allClasses",
        iconSrc: "img/hair_back7_icon.svg",
        imgSrc: "img/hair_back7.svg",
        level: 3,
        price: 17
      },
      {
        id: 25,
        type: "hair_back",
        clazz: "allClasses",
        iconSrc: "img/hair_back8_icon.svg",
        imgSrc: "img/hair_back8.svg",
        level: 3,
        price: 20
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
        id: 27,
        type: "animal",
        clazz: "human",
        iconSrc: "img/animal1_icon.svg",
        imgSrc: "img/animal1.svg",
        level: 1,
        price: 0
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
        id: 29,
        type: "top",
        clazz: "wornByDefault",
        iconSrc: "img/tee1_icon.svg",
        imgSrc: "img/tee1.svg",
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
        id: 31,
        type: "top",
        clazz: "human",
        iconSrc: "img/tee3_icon.svg",
        imgSrc: "img/tee3.svg",
        level: 2,
        price: 10
      },
      {
        id: 32,
        type: "top",
        clazz: "human",
        iconSrc: "img/tee4_icon.svg",
        imgSrc: "img/tee4.svg",
        level: 3,
        price: 15
      },





      {
        id: 88,
        type: "top",
        clazz: "mage",
        iconSrc: "img/mage/top1_icon.svg",
        imgSrc: "img/mage/top1.svg",
        level: 1,
        price: 5
      },
      {
        id: 89,
        type: "top",
        clazz: "mage",
        iconSrc: "img/mage/top2_icon.svg",
        imgSrc: "img/mage/top2.svg",
        level: 1,
        price: 5
      },
      {
        id: 90,
        type: "top",
        clazz: "mage",
        iconSrc: "img/mage/top3_icon.svg",
        imgSrc: "img/mage/top3.svg",
        level: 1,
        price: 10
      },
      {
        id: 91,
        type: "top",
        clazz: "mage",
        iconSrc: "img/mage/top4_icon.svg",
        imgSrc: "img/mage/top4.svg",
        level: 1,
        price: 10
      },
      {
        id: 92,
        type: "top",
        clazz: "mage",
        iconSrc: "img/mage/top6_icon.svg",
        imgSrc: "img/mage/top6.svg",
        level: 2,
        price: 15
      },




      {
        id: 33,
        type: "bottom",
        clazz: "empty",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
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
        id: 35,
        type: "bottom",
        clazz: "human",
        iconSrc: "img/pants2_icon.svg",
        imgSrc: "img/pants2.svg",
        level: 1,
        price: 8
      },
      {
        id: 36,
        type: "bottom",
        clazz: "human",
        iconSrc: "img/pants3_icon.svg",
        imgSrc: "img/pants3.svg",
        level: 2,
        price: 11
      },
      {
        id: 93,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/pants8_icon.svg",
        imgSrc: "img/mage/pants8.svg",
        level: 1,
        price: 5
      },
      {
        id: 94,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/pants9_icon.svg",
        imgSrc: "img/mage/pants9.svg",
        level: 1,
        price: 8
      },
      {
        id: 95,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/pants5_icon.svg",
        imgSrc: "img/mage/pants5.svg",
        level: 2,
        price: 10
      },
      {
        id: 96,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/pants6_icon.svg",
        imgSrc: "img/mage/pants6.svg",
        level: 2,
        price: 10
      },
      {
        id: 97,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/pants8_icon.svg",
        imgSrc: "img/mage/pants8.svg",
        level: 2,
        price: 10
      },
      {
        id: 98,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/pants10_icon.svg",
        imgSrc: "img/mage/pants10.svg",
        level: 3,
        price: 15
      },
      {
        id: 99,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/pants11_icon.svg",
        imgSrc: "img/mage/pants11.svg",
        level: 3,
        price: 15
      },


      {
        id: 37,
        type: "bottom",
        clazz: "human",
        iconSrc: "img/skirt1_icon.svg",
        imgSrc: "img/skirt1.svg",
        level: 2,
        price: 15
      },
      {
        id: 38,
        type: "bottom",
        clazz: "human",
        iconSrc: "img/skirt2_icon.svg",
        imgSrc: "img/skirt2.svg",
        level: 3,
        price: 20
      },
      {
        id: 100,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/skirt4_icon.svg",
        imgSrc: "img/mage/skirt4.svg",
        level: 1,
        price: 10
      },
      {
        id: 101,
        type: "bottom",
        clazz: "mage",
        iconSrc: "img/mage/skirt3_icon.svg",
        imgSrc: "img/mage/skirt3.svg",
        level: 2,
        price: 15
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
        id: 40,
        type: "top_bottom",
        clazz: "human",
        iconSrc: "img/top_bottom1_icon.svg",
        imgSrc: "img/top_bottom1.svg",
        level: 1,
        price: 10
      },
      {
        id: 41,
        type: "top_bottom",
        clazz: "human",
        iconSrc: "img/top_bottom2_icon.svg",
        imgSrc: "img/top_bottom2.svg",
        level: 1,
        price: 15
      },
      {
        id: 42,
        type: "top_bottom",
        clazz: "human",
        iconSrc: "img/top_bottom3_icon.svg",
        imgSrc: "img/top_bottom3.svg",
        level: 2,
        price: 20
      },
      {
        id: 43,
        type: "top_bottom",
        clazz: "human",
        iconSrc: "img/top_bottom4_icon.svg",
        imgSrc: "img/top_bottom4.svg",
        level: 2,
        price: 23
      },
      {
        id: 44,
        type: "top_bottom",
        clazz: "human",
        iconSrc: "img/top_bottom5_icon.svg",
        imgSrc: "img/top_bottom5.svg",
        level: 3,
        price: 28
      },
      {
        id: 102,
        type: "top_bottom",
        clazz: "mage",
        iconSrc: "img/mage/top_bottom6_icon.svg",
        imgSrc: "img/mage/top_bottom6.svg",
        level: 1,
        price: 15
      },
      {
        id: 103,
        type: "top_bottom",
        clazz: "mage",
        iconSrc: "img/mage/top_bottom8_icon.svg",
        imgSrc: "img/mage/top_bottom8.svg",
        level: 1,
        price: 20
      },
      {
        id: 104,
        type: "top_bottom",
        clazz: "mage",
        iconSrc: "img/mage/top_bottom7_icon.svg",
        imgSrc: "img/mage/top_bottom7.svg",
        level: 2,
        price: 25
      },
      {
        id: 105,
        type: "top_bottom",
        clazz: "mage",
        iconSrc: "img/mage/top_bottom9_icon.svg",
        imgSrc: "img/mage/top_bottom9.svg",
        level: 2,
        price: 28
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
      {
        id: 106,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head4_icon.svg",
        imgSrc: "img/mage/head4.svg",
        level: 1,
        price: 1
      },
      {
        id: 107,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head6_icon.svg",
        imgSrc: "img/mage/head6.svg",
        level: 1,
        price: 3
      },
      {
        id: 108,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head5_icon.svg",
        imgSrc: "img/mage/head5.svg",
        level: 1,
        price: 5
      },
      {
        id: 109,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head8_icon.svg",
        imgSrc: "img/mage/head8.svg",
        level: 2,
        price: 10
      },
      {
        id: 110,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head3_icon.svg",
        imgSrc: "img/mage/head3.svg",
        level: 2,
        price: 13
      },
      {
        id: 111,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head2_icon.svg",
        imgSrc: "img/mage/head2.svg",
        level: 2,
        price: 17
      },
      {
        id: 112,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head1_icon.svg",
        imgSrc: "img/mage/head1.svg",
        level: 3,
        price: 22
      },
      {
        id: 113,
        type: "misc_head",
        clazz: "mage",
        iconSrc: "img/mage/head10_icon.svg",
        imgSrc: "img/mage/head10.svg",
        level: 3,
        price: 26
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
        id: 50,
        type: "misc_ear",
        clazz: "human",
        iconSrc: "img/ears1_icon.svg",
        imgSrc: "img/ears1.svg",
        level: 2,
        price: 10
      },
      {
        id: 51,
        type: "misc_ear",
        clazz: "human",
        iconSrc: "img/ears2_icon.svg",
        imgSrc: "img/ears2.svg",
        level: 3,
        price: 15
      },





      {
        id: 113,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears3_icon.svg",
        imgSrc: "img/mage/earss3.svg",
        level: 1,
        price: 2
      },
      {
        id: 114,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears4_icon.svg",
        imgSrc: "img/mage/ears4.svg",
        level: 1,
        price: 3
      },
      {
        id: 115,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears5_icon.svg",
        imgSrc: "img/mage/ears5.svg",
        level: 1,
        price: 3
      },
      {
        id: 116,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears11_icon.svg",
        imgSrc: "img/mage/ears11.svg",
        level: 1,
        price: 4
      },
      {
        id: 117,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears12_icon.svg",
        imgSrc: "img/mage/ears12.svg",
        level: 1,
        price: 4
      },
      {
        id: 118,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears6_icon.svg",
        imgSrc: "img/mage/ears6.svg",
        level: 2,
        price: 8
      },
      {
        id: 119,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears7_icon.svg",
        imgSrc: "img/mage/ears7.svg",
        level: 2,
        price: 8
      },
      {
        id: 120,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears8_icon.svg",
        imgSrc: "img/mage/ears8.svg",
        level: 2,
        price: 8
      },
      {
        id: 121,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears9_icon.svg",
        imgSrc: "img/mage/ears9.svg",
        level: 2,
        price: 10
      },
      {
        id: 122,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears10_icon.svg",
        imgSrc: "img/mage/ears10.svg",
        level: 2,
        price: 10
      },
      {
        id: 123,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears1_icon.svg",
        imgSrc: "img/mage/ears1.svg",
        level: 3,
        price: 15
      },
      {
        id: 124,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears14_icon.svg",
        imgSrc: "img/mage/ears14.svg",
        level: 3,
        price: 18
      },
      {
        id: 125,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears13_icon.svg",
        imgSrc: "img/mage/ears13.svg",
        level: 3,
        price: 15
      },
      {
        id: 126,
        type: "misc_ear",
        clazz: "mage",
        iconSrc: "img/mage/ears2_icon.svg",
        imgSrc: "img/mage/ears2.svg",
        level: 3,
        price: 15
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
        id: 53,
        type: "misc_neck",
        clazz: "human",
        iconSrc: "img/neck1_icon.svg",
        imgSrc: "img/neck1.svg",
        level: 1,
        price: 20
      },
      {
        id: 54,
        type: "misc_neck",
        clazz: "human",
        iconSrc: "img/neck2_icon.svg",
        imgSrc: "img/neck2.svg",
        level: 2,
        price: 23
      },
      {
        id: 55,
        type: "misc_neck",
        clazz: "human",
        iconSrc: "img/neck3_icon.svg",
        imgSrc: "img/neck3.svg",
        level: 3,
        price: 28
      },
      {
        id: 127,
        type: "misc_neck",
        clazz: "mage",
        iconSrc: "img/mage/neck1_icon.svg",
        imgSrc: "img/mage/neck1.svg",
        level: 1,
        price: 5
      },
      {
        id: 128,
        type: "misc_neck",
        clazz: "mage",
        iconSrc: "img/mage/neck2_icon.svg",
        imgSrc: "img/mage/neck2.svg",
        level: 1,
        price: 5
      },
      {
        id: 129,
        type: "misc_neck",
        clazz: "mage",
        iconSrc: "img/mage/neck3_icon.svg",
        imgSrc: "img/mage/neck3.svg",
        level: 1,
        price: 10
      },
      {
        id: 130,
        type: "misc_neck",
        clazz: "mage",
        iconSrc: "img/mage/neck4_icon.svg",
        imgSrc: "img/mage/neck4.svg",
        level: 1,
        price: 12
      },
      {
        id: 131,
        type: "misc_neck",
        clazz: "mage",
        iconSrc: "img/mage/neck5_icon.svg",
        imgSrc: "img/mage/neck5.svg",
        level: 2,
        price: 15
      },
      {
        id: 132,
        type: "misc_neck",
        clazz: "mage",
        iconSrc: "img/mage/neck6_icon.svg",
        imgSrc: "img/mage/neck6.svg",
        level: 2,
        price: 20
      },
      {
        id: 133,
        type: "misc_neck",
        clazz: "mage",
        iconSrc: "img/mage/neck7_icon.svg",
        imgSrc: "img/mage/neck7.svg",
        level: 2,
        price: 22
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
        id: 57,
        type: "prop_left",
        clazz: "human",
        iconSrc: "img/prop2_left_icon.svg",
        imgSrc: "img/prop2_left.svg",
        level: 1,
        price: 10
      },
      {
        id: 134,
        type: "prop_left",
        clazz: "mage",
        iconSrc: "img/mage/prop_left3_icon.svg",
        imgSrc: "img/mage/prop_left3.svg",
        level: 1,
        price: 2
      },
      {
        id: 135,
        type: "prop_left",
        clazz: "mage",
        iconSrc: "img/mage/prop_left4_icon.svg",
        imgSrc: "img/mage/prop_left4.svg",
        level: 1,
        price: 5
      },
      {
        id: 136,
        type: "prop_left",
        clazz: "mage",
        iconSrc: "img/mage/prop_left5_icon.svg",
        imgSrc: "img/mage/prop_left5.svg",
        level: 1,
        price: 10
      },
      {
        id: 137,
        type: "prop_left",
        clazz: "mage",
        iconSrc: "img/mage/prop_left6_icon.svg",
        imgSrc: "img/mage/prop_left6.svg",
        level: 1,
        price: 15
      },
      {
        id: 138,
        type: "prop_left",
        clazz: "mage",
        iconSrc: "img/mage/prop_left7_icon.svg",
        imgSrc: "img/mage/prop_left7.svg",
        level: 2,
        price: 18
      },
      {
        id: 139,
        type: "prop_left",
        clazz: "mage",
        iconSrc: "img/mage/prop_left8_icon.svg",
        imgSrc: "img/mage/prop_left8.svg",
        level: 2,
        price: 20
      },
      {
        id: 140,
        type: "prop_left",
        clazz: "mage",
        iconSrc: "img/mage/prop_left1_icon.svg",
        imgSrc: "img/mage/prop_left1.svg",
        level: 2,
        price: 22
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
        id: 59,
        type: "prop_right",
        clazz: "mage",
        iconSrc: "img/mage/prop2_right_icon.svg",
        imgSrc: "img/mage/prop2_right.svg",
        level: 1,
        price: 4
      },
      {
        id: 60,
        type: "prop_right",
        clazz: "mage",
        iconSrc: "img/mage/prop7_right_icon.svg",
        imgSrc: "img/mage/prop7_right.svg",
        level: 1,
        price: 8
      },
      {
        id: 141,
        type: "prop_right",
        clazz: "mage",
        iconSrc: "img/mage/prop_right6_icon.svg",
        imgSrc: "img/mage/prop_right6.svg",
        level: 2,
        price: 15
      },
      {
        id: 142,
        type: "prop_right",
        clazz: "mage",
        iconSrc: "img/mage/prop_right5_icon.svg",
        imgSrc: "img/mage/prop_right5.svg",
        level: 2,
        price: 20
      },
      {
        id: 143,
        type: "prop_right",
        clazz: "mage",
        iconSrc: "img/mage/prop_right3_icon.svg",
        imgSrc: "img/mage/prop_right3.svg",
        level: 3,
        price: 22
      },
      {
        id: 144,
        type: "prop_right",
        clazz: "mage",
        iconSrc: "img/mage/prop_right6_icon.svg",
        imgSrc: "img/mage/prop_right6.svg",
        level: 3,
        price: 30
      },




      {
        id: 61,
        type: "sock",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 62,
        type: "sock",
        clazz: "human",
        iconSrc: "img/sock1_icon.svg",
        imgSrc: "img/sock1.svg",
        level: 1,
        price: 20
      },
      {
        id: 63,
        type: "sock",
        clazz: "human",
        iconSrc: "img/sock2_icon.svg",
        imgSrc: "img/sock2.svg",
        level: 2,
        price: 28
      },
      {
        id: 64,
        type: "sock",
        clazz: "human",
        iconSrc: "img/sock3_icon.svg",
        imgSrc: "img/sock3.svg",
        level: 2,
        price: 30
      },
      {
        id: 65,
        type: "sock",
        clazz: "human",
        iconSrc: "img/tights1_icon.svg",
        imgSrc: "img/tights1.svg",
        level: 3,
        price: 30
      },
      {
        id: 145,
        type: "sock",
        clazz: "mage",
        iconSrc: "img/mage/sock5_icon.svg",
        imgSrc: "img/mage/sock5.svg",
        level: 1,
        price: 5
      },
      {
        id: 146,
        type: "sock",
        clazz: "mage",
        iconSrc: "img/mage/sock4_icon.svg",
        imgSrc: "img/mage/sock4.svg",
        level: 1,
        price: 8
      },
      {
        id: 147,
        type: "sock",
        clazz: "mage",
        iconSrc: "img/mage/sock6_icon.svg",
        imgSrc: "img/mage/sock6.svg",
        level: 2,
        price: 10
      },
      {
        id: 148,
        type: "sock",
        clazz: "mage",
        iconSrc: "img/mage/sock9_icon.svg",
        imgSrc: "img/mage/sock9.svg",
        level: 2,
        price: 12
      },
      {
        id: 149,
        type: "sock",
        clazz: "mage",
        iconSrc: "img/mage/sock8_icon.svg",
        imgSrc: "img/mage/sock8.svg",
        level: 3,
        price: 15
      },
      {
        id: 150,
        type: "sock",
        clazz: "mage",
        iconSrc: "img/mage/sock7_icon.svg",
        imgSrc: "img/mage/sock7.svg",
        level: 3,
        price: 18
      },




      {
        id: 66,
        type: "shoes",
        clazz: "wornByDefault",
        iconSrc: "img/empty_icon.svg",
        imgSrc: "img/empty.svg",
        level: 1,
        price: 0
      },
      {
        id: 67,
        type: "shoes",
        clazz: "allClasses",
        iconSrc: "img/shoes1_icon.svg",
        imgSrc: "img/shoes1.svg",
        level: 1,
        price: 10
      },
      {
        id: 68,
        type: "shoes",
        clazz: "cowboy",
        iconSrc: "img/shoes2_icon.svg",
        imgSrc: "img/shoes2.svg",
        level: 1,
        price: 12
      },
      {
        id: 69,
        type: "shoes",
        clazz: "king ",
        iconSrc: "img/shoes3_icon.svg",
        imgSrc: "img/shoes3.svg",
        level: 2,
        price: 15
      },
      {
        id: 150,
        type: "shoes",
        clazz: "mage",
        iconSrc: "img/mage/shoes4_icon.svg",
        imgSrc: "img/mage/shoes4.svg",
        level: 1,
        price: 5
      },
      {
        id: 151,
        type: "shoes",
        clazz: "mage",
        iconSrc: "img/mage/shoes5_icon.svg",
        imgSrc: "img/mage/shoes5.svg",
        level: 1,
        price: 8
      },
      {
        id: 152,
        type: "shoes",
        clazz: "mage",
        iconSrc: "img/mage/shoes6_icon.svg",
        imgSrc: "img/mage/shoes6.svg",
        level: 2,
        price: 12
      },
      {
        id: 153,
        type: "shoes",
        clazz: "mage",
        iconSrc: "img/mage/shoes7_icon.svg",
        imgSrc: "img/mage/shoes7.svg",
        level: 2,
        price: 16
      },
      {
        id: 154,
        type: "shoes",
        clazz: "mage",
        iconSrc: "img/mage/shoes8_icon.svg",
        imgSrc: "img/mage/shoes8.svg",
        level: 3,
        price: 20
      },
      {
        id: 155,
        type: "shoes",
        clazz: "mage",
        iconSrc: "img/mage/shoes9_icon.svg",
        imgSrc: "img/mage/shoes9.svg",
        level: 3,
        price: 23
      }
    ];
    
    allItems.forEach(function (item) {
      if (item.price == 0)
        childService.canBePutOnItems.push(item);
      else if (item.clazz == childService.currentAvatar.clazz || item.clazz == "allClasses"){
        if (item.level <= childService.currentAvatar.level)
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
