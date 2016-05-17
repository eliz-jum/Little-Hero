angular.module('littleHero').factory('user', function(){
  //autoryzacja
  //ściągnięcie z serwera(? za pierwszym razem)
  //aktualizacja (spr czy połączenie z netem)
  var data = {
    get: function() {
      if (!promise) {
        var promise = $http.get('path/to/json.js')
          .success(function(response) {
            return response.data;
          )};
      }
    }
  };
  
  return data;
});
