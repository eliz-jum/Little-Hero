// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('littleHero', ['ionic', 'ui.router', 'ionic-toast'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
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
                controller: 'MainController'
            })
            .state('mainTutor', {
                url: '/mainTutor',
                templateUrl: 'mainTutor/mainTutor.html',
                controller: 'MTController'
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
                controller: 'TasksController'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'settings/settings.html',
                controller: 'SettingsController'
            })
            .state('settingsTutor', {
                url: '/settingsTutor',
                templateUrl: 'settingsTutor/settingsTutor.html',
                controller: 'SettingsTutorController'
            })
            .state('tutorAvatars', {
                url: '/tutorAvatars',
                templateUrl: 'tutorAvatars/tutorAvatars.html',
                controller: 'TutorAvatarsController'
            })
            .state('tutorTasks', {
                url: '/tutorTasks',
                templateUrl: 'tutorTasks/tutorTasks.html',
                controller: 'tutorTasksController'
            })
            .state('taskCreator', {
                url: '/taskCreator',
                templateUrl: 'taskCreator/taskCreator.html',
                controller: 'TaskCreatorController'
            })
            .state('tutorEditTask', {
                url: '/editTask',
                templateUrl: 'tutorEditTask/tutorEditTask.html',
                controller: 'TutorEditTaskController'
            })
            .state('notifications',{
                url: '/notifications',
                templateUrl: 'notifications/notifications.html',
                controller: 'NotificationsController'
            })
            .state('invitations', {
                url: '/invitations',
                templateUrl: 'invitations/invitations.html',
                controller: 'InvitationsController'
            })
            .state('invitationsTutor', {
                url: '/invitationsTutor',
                templateUrl: 'invitationsTutor/invitationsTutor.html',
                controller: 'InvitationsTutorController'
            })
            .state('avatars', {
                url: '/avatars',
                templateUrl: 'avatars/avatars.html',
                controller: 'AvatarsController'
            })
            .state('editAccount', {
            url: '/editAccount',
            templateUrl: 'editAccount/editAccount.html',
            controller: 'editAccountController'
            }),
            $urlRouterProvider.otherwise('/login');
    });
