angular.module('littleHero').factory('httpRequestInterceptor', function () {
    return {
      request: function (config) {
        config.headers['Authorization'] = 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==';
        return config;
      }
    };
});

angular.module('littleHero').config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});
