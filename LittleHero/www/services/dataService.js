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
        },

        getAvatarTutorTasks: function(tutorId) {
            return $http.get(BASE_PATH + "tutors/" + tutorId + "/tasks").then(function(res) {              
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
        return $http.patch(BASE_PATH + "childs/13/avatars/" + avatarId, valueArray).then(function(res) {              
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
