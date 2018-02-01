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

.controller('MyPing', function($scope) {
  $scope.data = {
    model: null,
    availableOptions: [
      {id: '1', name: 'Option A'},
      {id: '2', name: 'Option B'},
      {id: '3', name: 'Option C'}
    ]
   };
  document.addEventListener('deviceready', onDeviceReady, false);
  function onDeviceReady() {
    var p, success, err, ipList;
    ipList = [{
                query: 'www.tiste.org',
                timeout: 1,
                retry: 3,
                version:'v4'},
              {
                query: 'www.somesite.com',
                timeout: 2,
                retry: 3,
                version:'v6'
                }];
    success = function (results) {
      console.log(results);
      var str = JSON.stringify(results);
      var res = JSON.parse(str);
      $scope.pingStatus = res[0].response.status;
      $scope.pingTarget = res[0].response.result.target;
      $scope.pingpctTransmitted = res[0].response.result.pctTransmitted;
      $scope.pingpctReceived = res[0].response.result.pctReceived;
      $scope.pingpctLoss = res[0].response.result.pctLoss;
      $scope.$apply();
      //alert(res[0].response.status);
      //alert(res[0].response.result.target);
    };
    err = function (e) {
      console.log('Error: ' + e);
    };
    p = new Ping();
    p.ping(ipList, success, err);
  }
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
