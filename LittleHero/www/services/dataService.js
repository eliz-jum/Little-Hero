angular.module('littleHero').service("dataService", function($http) {
    
    var BASE_PATH = "http://littlehero-littlehero.rhcloud.com/v1/";


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

        getChildren: function() {
            return $http.get(BASE_PATH + "childs").then(function(res) {              
                return res;
            });
        },

        getChild: function(childId) {
            return $http.get(BASE_PATH + "childs/" + childId).then(function(res) {              
                return res;
            });
        },

        postChild: function(newChild) {
            return $http.post(BASE_PATH + "childs", newChild).then(function(res) {              
                return res;
            });
        },

        getTutors: function() {
            return $http.get(BASE_PATH + "tutors").then(function(res) {              
                return res;
            });
        },

        getTutor: function(tutorId) {
            return $http.get(BASE_PATH + "tutors/" + tutorId).then(function(res) {              
                return res;
            });
        },

        postTutor: function(newTutor) {
            return $http.post(BASE_PATH + "tutors", newTutor).then(function(res) {              
                return res;
            });
        },

        getChildAvatars: function(childId) {
            return $http.get(BASE_PATH + "childs/" + childId + "/avatars").then(function(res) {              
                return res;
            });
        },   
    
        getAvatarTasks: function(childId, avatarId) {
            return $http.get(BASE_PATH + "childs/" + childId + "/avatars/" + avatarId + "/tasks").then(function(res) {              
                return res;
            });
        }

        
        /***
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
