var secretKey = '4090dfd0c642abf357d0aec823b900de'

angular.module('littleHero').factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      if (config.url.includes("http")) {
        var url = config.url;
        var method = config.method;
        var timestamp = Date.now().toString();
        var nonce = Math.random().toString();
        var message = method + '+' + url + '+' + timestamp + '+' + nonce
        var signature = CryptoJS.HmacSHA1(message, '70cd581b735c4a4599d1a7fd6a8e3c22').toString(CryptoJS.enc.Base64);
        config.headers['Authorization'] = 'hmac ' + timestamp + ':' + nonce + ':' + signature;
        console.log(method + '\n' + url + '\n' + config.headers['Authorization'] + '\n' +
        CryptoJS.MD5(secretKey).toString())
      }
      return config;
    }
  };
});

angular.module('littleHero').config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
