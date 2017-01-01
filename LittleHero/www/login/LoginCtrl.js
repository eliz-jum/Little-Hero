angular.module('littleHero').controller('LoginController', function($scope, $state, $http, $stateParams, dataService, childService){

    /***
        DONE:
        - integracja logowania z RESTEM
        - naiwna walidacja konta - porownywanie stringow z loginem i haslem
        - rozroznienie kont dziecka/opiekuna i przekierowanie do odpowiedniego miejsca w aplikacji
    ***/

    var children = [];
    var tutors = [];
    var type = -1; //0 - child, 1 - tutor, -1 - account does not exist
    $scope.number = -1;

    $scope.validate = function() {
        if ($scope.login && $scope.password) {
            $scope.checkIfAccountExists();
            if (type == 0)   {
                //$state.go("main", { 'user' : children[$scope.number] });
              $state.go("main");
            }
            else if (type == 1)
                //$state.go("mainTutor", { 'user' : tutors[$scope.number] });
              $state.go("mainTutor");
            else $scope.invalid = true;
        }
        else $scope.invalid = true;
    };

    $scope.registration = function() {
        $state.go("registration");
    };

    $scope.getChildren = function() {
      dataService.getChildren().then(function(res) {
          children = res.data;
        console.log("getchildren  " + children);
      });
    };

    $scope.getTutors = function() {
      dataService.getTutors().then(function(res) {
          tutors = res.data;
      });
    };

    $scope.checkIfAccountExists = function() {

      // $scope.getChildren();
      // console.log("chiii  " + children);
      //
      // console.log("servis get children  " + dataService.getChildren());
      // console.log("avatars  " + dataService.getAvatars());

      //---------zahardkodowana wersja
      childService.hardcodeChildObj();
      children.push(childService.childObj);


      for (index in children) {
        if (children[index].login == $scope.login && children[index].password == $scope.password) {
          childService.childObj = children[index];
          childService.hardcodeAvatarList();
          //childService.setChildAvatarList();
          //jesli nie ma avatarow to undefined
          childService.currentAvatar = childService.avatarList[0];
          childService.setCurrentAvatarId();

          //taski dopiero w widoku taskow
          
          // childService.setWornItems();
          // childService.setCanBePutOnItems();
          // childService.setCanBePurchasedItems();
          // childService.setUnavailableItems();
          childService.hardcodeAvatarItemArrays();
          type = 0;
        }
      }
      $scope.getTutors();
      for (index in tutors) {
        if (tutors[index].mail == $scope.login && tutors[index].password == $scope.password) {
          childService.tutorObj = tutors[index];
          childService.setTutorAvatarList();
          childService.currentAvatar = childService.avatarList[0];
          childService.setCurrentAvatarId();
          childService.setTasks();
          type = 1;
        }
      }
    }

    // $scope.getChildren();
    // $scope.getTutors();

});
