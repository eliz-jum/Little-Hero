angular.module('littleHero').service("dataService", function($http) {

    var BASE_PATH = "http://little-hero.herokuapp.com/api/v1/";


    return {
      //--------------------------------------------AVATARS--------------------------------------------------
      getAvatars: function() {
          return $http.get(BASE_PATH + "avatars/").then(function(res) {
              return res;
          });
      },

      getAvatarById: function(id) {
        return $http.get(BASE_PATH + "avatars/" + id).then(function(res) {
          return res;
        });
      },

      getAvatarsByChild: function(childId) {
        return $http.get(BASE_PATH + "avatars/?child_id=" + childId).then(function(res) {
          return res;
        });
      },

      getAvatarsByTutor: function(tutorId) {
        return $http.get(BASE_PATH + "avatars/?tutor_id=" + tutorId).then(function(res) {
          return res;
        });
      },

      postAvatar: function(newAvatar) {
        return $http.post(BASE_PATH + "avatars/", newAvatar).then(function(res) {
          return res;
        });
      },


      getAvatarWornItemsIds: function(avatarId) {
        return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=worn").then(function(res) {
          console.log("res", res);
          return res;
        });
      },
      //to nam daje obiekty item-links a nie obiekty item
      // {
      //   avatar_id
      //   sate = worn
      //   item_id
      //   id
      // }
      // id ciuchow sa w srodku
      //tzreba petlą pojsc po calej tablicy i wywolywac getItem(id=item_id)
      //zapisując ciuch trzeba mu dodać pole avatarItemLinksId bo to potrzebne do pacha
      //pach zmienia stan itemu w item-links
      getAvatarCanBePutOnItemsIds: function(avatarId) {
        return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=canBePutOn").then(function(res) {
          return res;
        });
      },

      getAvatarCanBePurchasedItemsIds: function(avatarId) {
        return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=canBePurchased").then(function(res) {
          return res;
        });
      },

      getAvatarUnavailableItemsIds: function(avatarId) {
        return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=unavailable").then(function(res) {
          return res;
        });
      },

      // {"state": "newState"}
      changeEquipmentItemState: function (avatarItemLinksId, newState) {
        return $http.patch(BASE_PATH + "avatar-item-links/" + avatarItemLinksId, newState)
      },

      postAvatarItemLink: function (newLink) {
        return $http.post(BASE_PATH + "avatar-item-links/", newLink)
      },

      //todo

      patchAvatar: function (avatarId, changes) {
        return $http.patch(BASE_PATH + "avatars/" + avatarId, changes);
      },


      //---------------------------------------------TASKS----------------------------------------------------
        getTasks: function() {
            return $http.get(BASE_PATH + "tasks/").then(function(res) {
                return res;
            });
        },

      getTasksByAvatar: function(avatarId) {
        return $http.get(BASE_PATH + "tasks/?avatar_id=" + avatarId).then(function(res) {
          return res;
        });
      },

      getTasksByTutorAndAvatar: function(tutorId, avatarId) {
        return $http.get(BASE_PATH + "tasks/?avatar_id=" + avatarId + "&tutor_id=" + tutorId).then(function(res) {
          return res;
        });
      },

      postTask: function(newTask) {
        return $http.post(BASE_PATH + "tasks/", newTask).then(function(res) {
          return res;
        });
      },

      deleteTask: function(taskId) {
        return $http.delete(BASE_PATH + "tasks/" + taskId).then(function(res) {
          return res;
        });
      },
    //TODO wyrabac z task pole bool completed - nie trzymamy zrobionych zadan!



      //----------------------------------------------CHILDREN--------------------------------------------
        getChildren: function() {
            return $http.get(BASE_PATH + "children/").then(function(res) {
                return res.data;
            });
        },

        getChildById: function(childId) {
            return $http.get(BASE_PATH + "children/" + childId).then(function(res) {
                return res;
            });
        },

        postChild: function(newChild) {
            return $http.post(BASE_PATH + "children/", newChild).then(function(res) {
                return res;
            });
        },





      //-----------------TUTOR---------------------------
        getTutors: function() {
            return $http.get(BASE_PATH + "tutors/").then(function(res) {
                return res;
            });
        },

        getTutorById: function(tutorId) {
            return $http.get(BASE_PATH + "tutors/" + tutorId).then(function(res) {
                return res;
            });
        },

        postTutor: function(newTutor) {
            return $http.post(BASE_PATH + "tutors/", newTutor).then(function(res) {
                return res;
            });
        },

      //-----------------T----ITEM---------------------------
      getItems: function () {
        return $http.get(BASE_PATH + "items/").then(function(res) {
          return res;
        });

      },


        getItem: function (itemId) {
          return $http.get(BASE_PATH + "items/" + itemId).then(function(res) {
            return res;
          });

        },
      patchItem: function (itemId, changes) {
        return $http.patch(BASE_PATH + "items/" + itemId, changes);
      },


      //TODO: zamienic nazwy stringow na zmienną np "avatar-item-links" itd

        //-----------------------INVITES---------------------------------
        getInvitesByUser: function(userType, userId) {
            return $http.get(BASE_PATH + userType + "/" + userId + "/invitations").then(function(res) {
                return res.data;
            });
        },

        getInviteByUserAndId: function(userType, userId, inviteId) {
            return $http.get(BASE_PATH + userType + "/" + userId + "/invitations/" + inviteId).then(function(res) {
                return res;
            });
        },

        postInvites: function(userType, userId, newInvite) {
            return $http.post(BASE_PATH + userId + "/invitations", newInvite).then(function(res) {
                return res.data;
            });
        }
    }
});
