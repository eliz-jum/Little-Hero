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

      getAvatarsByChildAndTutor: function (childId, tutorId) {
        return $http.get(BASE_PATH + "avatars/?child_id=" + childId + "&tutor_id=" + tutorId).then(function(res) {
          console.log(res.data);
          return res;
        });
      },

      postAvatar: function(newAvatar) {
        return $http.post(BASE_PATH + "avatars/", newAvatar).then(function(res) {
          return res;
        });
      },


      getAvatarWornItemsIds: function(avatarId) {
        return $http.get(BASE_PATH + "avatar-item-links/?avatar_id=" + avatarId + "&state=worn").then(function(res) {
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
        return $http.get(BASE_PATH + "avatar-item-links/?avatar_id=" + avatarId + "&state=canBePutOn").then(function(res) {
          return res;
        });
      },

      getAvatarCanBePurchasedItemsIds: function(avatarId) {
        return $http.get(BASE_PATH + "avatar-item-links/?avatar_id=" + avatarId + "&state=canBePurchased").then(function(res) {
          return res;
        });
      },

      getAvatarUnavailableItemsIds: function(avatarId) {
        return $http.get(BASE_PATH + "avatar-item-links/?avatar_id=" + avatarId + "&state=unavailable").then(function(res) {
          return res;
        });
      },

      // {"state": "newState"}
      changeEquipmentItemState: function (avatarItemLinksId, newState) {
        return $http.patch(BASE_PATH + "avatar-item-links/" + avatarItemLinksId, newState)
      },

      postAvatarItemLink: function (newLink, item, callback, type) {
          return $http.post(BASE_PATH + "avatar-item-links/", newLink).then(function(res) {
            callback(item, type, res.data);
            return res;
          });
        },
      //   return $http({
      //     method: 'POST',
      //     url: BASE_PATH + "avatar-item-links/",
      //     data: newLink,
      //     headers: {
      //       'Content-Type':  'application/json'
      //     }
      //   }).success(function (data) {
      //     return data;
      //   }).error(function(response) { console.log(response); });
      // },


      patchAvatar: function (avatarId, changes) {
        return $http.patch(BASE_PATH + "avatars/" + avatarId, changes).then(function(res) {
          console.log("patch", res.data);
        });
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

      patchTask: function (taskId, changes) {
        return $http.patch(BASE_PATH + "tasks/" + taskId, changes);
      },


      deleteTask: function(taskId) {
        return $http.delete(BASE_PATH + "tasks/" + taskId).then(function(res) {
          return res;
        });
      },


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

        getChildrenByTutorId: function (tutorId) {
          return $http.get(BASE_PATH + "tutors/" + tutorId + "/children").then(function(res) {
            return res;
          });
        },

        postChild: function(newChild) {
            return $http.post(BASE_PATH + "children/", newChild).then(function(res) {
                return res;
            });
        },





      //------------------------------------------TUTOR--------------------------------------
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

        getTutorsByChildId: function(childId) {
            return $http.get(BASE_PATH + "children/" + childId + "/tutors").then(function(res) {
                return res;
            });
        },

        postTutor: function(newTutor) {
            return $http.post(BASE_PATH + "tutors/", newTutor).then(function(res) {
                return res;
            });
        },

      //------------------------------------------------ITEM---------------------------------------
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

        //-----------------------------------------INVITES---------------------------------
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
            return $http.post(BASE_PATH + userType + "/" + userId + "/invitations", newInvite).then(function(res) {
                return res.data;
            });
        },

        patchInvite: function(userType, userId, inviteId, newStatus) {
            return $http.patch(BASE_PATH + userType + "/" + userId + "/invitations/" + inviteId, newStatus).then(function(res) {
                return res.data;
            });
        },

        deleteInvite: function(userType, userId, inviteId) {
            return $http.delete(BASE_PATH + userType + "/" + userId + "/invitations/" + inviteId).then(function(res) {
                return res.data;
            });
        },

      //----------------------------------------------NOTIFICATIONS--------------------------------------------

      getNotificationsByAvatar: function (avatarId) {
        return $http.get(BASE_PATH + "avatars/" + avatarId + "/notifications").then(function(res) {
          return res;
        });
      },

      postNotification: function (avatarId, notification) {
        return $http.post(BASE_PATH + "avatars/" + avatarId + "/notifications", notification).then(function(res) {
          return res;
        });
      },

      deleteNotification: function (avatarId, notificationId) {
        return $http.delete(BASE_PATH + "avatars/" + avatarId + "/notifications/" + notificationId).then(function(res) {
          return res;
        });

      }

    }
});
