// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('littleHero', ['ionic', 'ui.router', 'ionic-toast'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'LoginController'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'main/main.html',
            controller: 'MainController',
            params: {
                allAvatars: null,
                currentAvatar : null
            }
        })
        .state('recoverPassword', {
            url: '/recoverPassword',
            templateUrl: 'recoverPass/recoverPass.html',
            controller: 'RecoverPassController'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'registration/registration.html',
            controller: 'RegistrationController'
        })
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'tasks/tasks.html',
            controller: 'TasksController',
            params: {
                allAvatars: null,
                currentAvatar : null
            }
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'settings/settings.html',
            controller: 'SettingsController'
        })
        .state('notifications',{
          url: '/notifications',
          templateUrl: 'notifications/notifications.html',
          controller: 'NotificationsController',
          params: {
            allAvatars: null,
            currentAvatar : null
          }
       });

    $urlRouterProvider.otherwise('/main');
})

.service("dataService", function($http) {
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
})
