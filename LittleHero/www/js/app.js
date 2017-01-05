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
            controller: 'LoginController',
             params: {
                user: null
            }
        })
        .state('main', {
            url: '/main',
            templateUrl: 'main/main.html',
            controller: 'MainController',
            params: {
                allAvatars: null,
                currentAvatar: null,
                user: null
            }
        })
        .state('mainTutor', {
            url: '/mainTutor',
            templateUrl: 'mainTutor/mainTutor.html',
            controller: 'MTController',
            params: {
                user : null,
                currentAvatar: null
            }
        })
      .state('tutorAvatars', {
        url: '/tutorAvatars',
        templateUrl: 'tutorAvatars/tutorAvatars.html',
        controller: 'TutorAvatarsController',
        params: {
          user : null,
          currentAvatar: null
        }
      })
      .state('tutorTasks', {
        url: '/tutorTasks',
        templateUrl: 'tutorTasks/tutorTasks.html',
        controller: 'tutorTasksController',
        params: {
          user : null,
          currentAvatar: null
        }
      })
      .state('taskCreator', {
        url: '/taskCreator',
        templateUrl: 'taskCreator/taskCreator.html',
        controller: 'TaskCreatorController',
        params: {
          user: null,
          currentAvatar: null
        }
      })
      .state('tutorEditTask', {
        url: '/editTask',
        templateUrl: 'tutorEditTask/tutorEditTask.html',
        controller: 'TutorEditTaskController',
        params: {
          user: null,
          currentAvatar: null
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
            controller: 'RegistrationController',
            params: {
                username: null
            }
        })
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'tasks/tasks.html',
            controller: 'TasksController',
            params: {
                allAvatars: null,
                currentAvatar : null,
                user: null
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
            currentAvatar : null,
            user: null
          }
       }),
    $urlRouterProvider.otherwise('/login');
});

angular.module('littleHero').controller('MTController', function($scope, $state, $stateParams, $ionicModal, $http, dataService){

    $scope.allAvatars = null;
    $scope.currentAvatar = null;

    $scope.data = {
        showDelete: false
    };

    $scope.onItemDelete = function(avatar) {
        console.log(avatar);
    };

      $scope.text=[
    "zaproszono Cię",
    "masz nowe zadanie!",
    "dostałeś nowy poziom!"
  ];

    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.user = $stateParams.user;
        $scope.getAvatars();
    });

    $scope.getAvatars = function() {
        dataService.getAvatarsByTutor($scope.user["id"]).then(function(res) {
          $scope.allAvatars = res.data;
      });

    };






    $scope.settings = function() {
        $state.go("settings");
    };
});
