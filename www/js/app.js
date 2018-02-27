// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])
.controller('MyCtrl', function($scope, $cordovaNetwork, $rootScope) {
    document.addEventListener("deviceready", function () {
      var type = $cordovaNetwork.getNetwork();
      var isOnline = $cordovaNetwork.isOnline();
      var result;
        $scope.network = type;
        $scope.isOnline = isOnline;
        $scope.$apply();
        WifiWizard.getCurrentSSID(ssidHandler, fail);
        WifiWizard.startScan(function() {
          WifiWizard.getScanResults({}, function(s) {
             
              var str = JSON.stringify(s);
              var res = JSON.parse(str);
              $scope.LEVEL = res[0].level;
              $scope.BSSID = res[0].BSSID;
              $scope.$apply();

          }, function(e) {
            console.log("getScanResults error: "+e)
          });
      }, function(e) {
        console.log("startScan error: "+e)
      })

     function ssidHandler(s) {
          $scope.getCurrentSSID = s;
          $scope.$apply();
      }
  
      function fail(e) {
          alert("Failed" + e);
      }

        
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
  var ss;
  var p, success, err, ipList;
  ipList = [{
              query: 'europe.myluxhome.com',
              timeout: 1,
              retry: 3,
              version:'v4'},
            {
              query: 'asia.myluxhome.com',
              timeout: 1,
              retry: 3,
              version:'v4'
              },{
                query: 'www.google.com',
                timeout: 1,
                retry: 3,
                version:'v4'}];
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
      {id: '2', name: 'Google'}
    ]
   };
   $scope.Preference = function(num) {
      var hostList = ["europe","asia"];
     ss = downloadFile(hostList[num]);
      success = function (results) {
      console.log(results);
      
      var str = JSON.stringify(results);
      var res = JSON.parse(str);
      $scope.pingStatus = res[num].response.status;
      $scope.pingTarget = res[num].response.result.target;
      $scope.pingAvgRtt = res[num].response.result.avgRtt;
      $scope.pingpctReceived = res[num].response.result.pctReceived;
      $scope.pingpctLoss = res[num].response.result.pctLoss;
      $scope.$apply();
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

.controller('MyVideo', function($scope) {

  $scope.data = {
    model: null,
    availableOptions: [
      {id: '0', name: 'm3u8'},
      {id: '1', name: 'mp4'}
    ]
   };
  $scope.playVideo = function() {

    var myEl =angular.element(document.querySelector( '#streams' ));
    var hostList = ["http://es5.eversecured.net/xmpp-test/m3u8/vc703_2280.m3u8","http://es5.eversecured.net/mobile/video/output.mp4"];
    var videoUrl = hostList[myEl.val()];
    
    window.plugins.streamingMedia.playVideo(videoUrl);
    var options = {
      successCallback: function() {
        console.log("Video was closed without error.");
      },
      errorCallback: function(errMsg) {
        console.log("Error! " + errMsg);
      },
      //orientation: 'landscape'
    };
    //window.plugins.streamingMedia.playVideo(videoUrl, options);
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
