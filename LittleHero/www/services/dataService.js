angular.module('littleHero').service("dataService", function($http) {
    return {
        getAvatars: function() {
            return $http.get("/mockedData/avatars.json").then(function(res) {              
                return res;
            });
        },

        getTasks: function() {
            return $http.get("/mockedData/tasks.json").then(function(res) {              
                return res;
            });
        },

        /* FUNKCJE W WERSJI GDY ZOSTANIE UDOSTEPNIONY REST - ODKOMENTOWAC*/
        /***

        getCurrentAvatarTasks: function(childId, avatarId) {
            return $http.get(BASE_PATH + "/v1/childs/" + childId + "/avatars/" + avatarId + "/tasks").then(function(res) {              
                return res;
            });
        },

        getCurrentChildAvatars: function(childId) {
            return $http.get(BASE_PATH + "/v1/childs/" + childId + "/avatars").then(function(res) {              
                return res;
            });
        },

        getCurrentChildCurrentAvatar: function(childId, avatarId) {
            return $http.get(BASE_PATH + "/v1/childs/" + childId + "/avatars/" + avatarId).then(function(res) {              
                return res;
            });
        },

        postCurrentChildNewAvatar: function(childId, newAvatar) {
            return $http.post(BASE PATH + "/v1/childs/" + childId + "/avatars", newAvatar).then(function(res) {                        
                return res;
            });
        },

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
