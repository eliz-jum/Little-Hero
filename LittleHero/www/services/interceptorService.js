var secretKey = '6D11B357'

angular.module('littleHero').factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      if (config.url.includes("http")) {
        var url = config.url;
        var method = config.method;
        var timestamp = Date.now().toString();
        var nonce = Math.random().toString();
        var message = method + '+' + url + '+' + timestamp + '+' + nonce
        var signature = CryptoJS.HmacSHA1(message, CryptoJS.MD5(secretKey).toString().substring(24)).toString(CryptoJS.enc.Base64);
        config.headers['Authorization'] = 'hmac ' + timestamp + ':' + nonce + ':' + signature;
        console.log(method + '\n' + url + '\n' + config.headers['Authorization'])
      }
      return config;
    }
  };
});

angular.module('littleHero').config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
