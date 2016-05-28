// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('littleHero', ['ionic', 'ui.router'])

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
          controller: 'NotificationsController'
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
        }

        /*getCurrentTask: function(id) {
            return $http.get("/mockedData/tasks.json").then(function(res) {              
                res.data.forEach(function(task) {
                    if (task["id"] == id) {                         
                        return task;
                    }
                });
            });

        },*/
    }
})
