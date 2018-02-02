// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])
.controller('MyCtrl', function($scope, $cordovaNetwork, $rootScope) {
    document.addEventListener("deviceready", function () {
      var type = $cordovaNetwork.getNetwork();
      var isOnline = $cordovaNetwork.isOnline();

        $scope.network = type;
        $scope.isOnline = isOnline;
        $scope.$apply();
        
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            $scope.isOnline = true;
            $scope.network = type;
            $scope.$apply();
        })
 
        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("got offline");
            $scope.isOnline = false;
            $scope.network = type;
            $scope.$apply();
        })
 
  }, false);
})

.controller('MyPing', function($scope, $ionicLoading) {
  $scope.showLoading = function() {
    $ionicLoading.show({
       template: 'Loading...'
    });
 };
  $scope.data = {
    model: null,
    availableOptions: [
      {id: '0', name: 'Europe'},
      {id: '1', name: 'Asia'},
      {id: '2', name: 'America'}
    ]
   };
   $scope.Preference = function(num) {        
    var p, success, err, ipList;
    ipList = [{
                query: '192.168.1.5',
                timeout: 1,
                retry: 3,
                version:'v4'},
              {
                query: '8.8.8.8',
                timeout: 1,
                retry: 3,
                version:'v4'
                },{
                  query: 'ptt.cc',
                  timeout: 1,
                  retry: 3,
                  version:'v4'}];

    success = function (results) {
      console.log(results);
     
      var str = JSON.stringify(results);
      var res = JSON.parse(str);
      $scope.pingStatus = res[num].response.status;
      $scope.pingTarget = res[num].response.result.target;
      $scope.pingpctTransmitted = res[num].response.result.pctTransmitted;
      $scope.pingpctReceived = res[num].response.result.pctReceived;
      $scope.pingpctLoss = res[num].response.result.pctLoss;
      $scope.$apply();
      alert("Network Test :"+ res[num].response.status);
      $ionicLoading.hide();
    };
    err = function (e) {
      console.log('Error: ' + e);
      $ionicLoading.hide();
    };
    p = new Ping();
    p.ping(ipList, success, err);
  };   
})


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
