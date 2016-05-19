angular.module('littleHero').factory('user', function(){
  return {
    get: function() {
      if (!promise) {
        var promise = $http.get('path/to/json.js')
          .success(function(response) {
            return response.data;
          });
      }
    }
  };
});
