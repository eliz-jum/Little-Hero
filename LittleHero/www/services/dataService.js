angular.module('littleHero').service("dataService", function($http) {

    var BASE_PATH = "http://little-hero.herokuapp.com/api/v1/";


    return {
        getAvatars: function() {
            return $http.get(BASE_PATH + "avatars/").then(function(res) {
                return res;
            });
        },

        getTasks: function() {
            return $http.get(BASE_PATH + "tasks/").then(function(res) {
                return res;
            });
        },

        getChildren: function() {
            return $http.get(BASE_PATH + "children/").then(function(res) {
                return res;
            });
        },

        getChild: function(childId) {
            return $http.get(BASE_PATH + "children/" + childId).then(function(res) {
                return res;
            });
        },

        postChild: function(newChild) {
            return $http.post(BASE_PATH + "children/", newChild).then(function(res) {
                return res;
            });
        },

        getTutors: function() {
            return $http.get(BASE_PATH + "tutors/").then(function(res) {
                return res;
            });
        },

        getTutor: function(tutorId) {
            return $http.get(BASE_PATH + "tutors/" + tutorId).then(function(res) {
                return res;
            });
        },

        postTutor: function(newTutor) {
            return $http.post(BASE_PATH + "tutors/", newTutor).then(function(res) {
                return res;
            });
        },

        getChildAvatars: function(childId) {
            return $http.get(BASE_PATH + "avatars/?child_id=" + childId).then(function(res) {
                return res;
            });
        },

        postChildAvatar: function(newAvatar) {
            return $http.post(BASE_PATH + "avatars/", newAvatar).then(function(res) {
              return res;
            });
        },

        getAvatarTasks: function(avatarId) {
            return $http.get(BASE_PATH + "tasks/?avatar_id=" + avatarId).then(function(res) {
                return res;
            });
        },
//TODO: ------------_-_-_-_--_--__-_
        getAvatarWornItemsIds: function(avatarId) {
          return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=wornItems").then(function(res) {
            return res;
          });
        },

      //TODO: zamienic nazwy stringow na zmienną np "avatar-item-links" itd

      //to nam daje idki nie cale obiekty
      //potem tzreba petlą zrobić get item
  // {
  //   avatar_id
  //   sate
  //   item_id
  //   id
  // }
  //zapisując ciuch trzeba mu dodać pole avatarItemLinksId bo to potrzebne do pacha
      //pach zmienia stan itemu w item-links


      // {"state": "newState"}
      changeEquipmentItemState: function (avatarItemLinksId, newState) {
        return $http.patch(BASE_PATH + "avatar-item-links/" + avatarItemLinksId, newState)
      },





        getAvatarCanBePutOnItems: function(avatarId) {
          return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=canBePutOnItems").then(function(res) {
            return res;
          });
        },

        getAvatarCanBePurchasedItems: function(avatarId) {
          return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=canBePurchasedItems").then(function(res) {
            return res;
          });
        },

        getAvatarUnavailableItems: function(avatarId) {
          return $http.get(BASE_PATH + "avatar-item-links?avatar_id=" + avatarId + "&state=unavailableItems").then(function(res) {
            return res;
          });
        },

        getAvatarTutorTasks: function(tutorId, avatarId) {
            return $http.get(BASE_PATH + "tasks/?avatar_id=" + avatarId + "&tutor_id=" + tutorId).then(function(res) {
                return res;
            });
        },














        getTutorAvatars: function(tutorId) {
            return $http.get(BASE_PATH + "tutors/" + tutorId + "/avatars").then(function(res) {
                return res;
            });
        },

        postTask: function(tutorId, newTask) {
            return $http.post(BASE_PATH + "tutors/" + tutorId + "/tasks", newTask).then(function(res) {
                return res;
            });
        },

        deleteTask: function(tutorId, taskId) {
            return $http.delete(BASE_PATH + "tutors/" + tutorId + "/tasks/" + taskId).then(function(res) {
                return res;
            });
        },

        patchTaskCompleted: function(taskId, valueArray) {
            return $http.patch(BASE_PATH + "tutors/11/tasks/" + taskId, valueArray).then(function(res) {
                return res;
            });
        },

        patchTaskFullyCompleted: function(avatarId, valueArray) {
        return $http.patch(BASE_PATH + "children/13/avatars/" + avatarId, valueArray).then(function(res) {
                return res;
            });
        }





        /***
        getItems: function() {
            return $http.get(BASE_PATH + "/v1/items").then(function(res) {
                return res;
            });
        },

        postItem: function(newItem) {
            return $http.get(BASE_PATH + "/v1/items", newItem).then(function(res) {
                return res;
            });
        },

        deleteItem function(deletedItem) {
            return $http.delete(BASE_PATH + "/v1/items", deletedItem).then(function(res) {
                return res;
            });
        }

        ***/
    }
});
