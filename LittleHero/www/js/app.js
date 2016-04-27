angular.module('littleHero', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '../login/index.html',
            controller: 'LoginController'
        })
        .state('main', {
            url: '/main',
            templateUrl: '../main/index.html',
            controller: 'MainController'
        })
        .state('recoverPass', {
            url: '/recoverPassword',
            templateUrl: '../recoverPass/index.html',
            controller: 'RecoverPassController'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: '../registration/index.html',
            controller: 'RegistrationController'
        })
        .state('tasks', {
            url: '/tasks',
            templateUrl: '../tasks/tasks.html',
            controller: 'TasksController'
        });
    $urlRouterProvider.otherwise('/main');
});
