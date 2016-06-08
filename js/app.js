angular.module('littleHero', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '../login/index.html',
            controller: 'LoginController'
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
        });
    $urlRouterProvider.otherwise('/registration');
});
