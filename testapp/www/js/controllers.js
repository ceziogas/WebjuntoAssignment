angular.module('starter.controllers', ['ionic' , 'ngCordova'])

.controller('ViewerCtrl', function($scope) {})

.controller('GoogleCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 100000, enableHighAccuracy: false};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
	google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
	var marker = new google.maps.Marker({
		map: $scope.map,
		animation: google.maps.Animation.DROP,
		position: latLng
	});      
 
	var infoWindow = new google.maps.InfoWindow({
		content: "This is where you are located!"
	});
 
	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.open($scope.map, marker);
	});
 
});    
 
});
 
  }, function(error){
    console.log("Could not get location");
  })




.controller('TrackerCtrl', function($scope) {})


.controller('RedditCtrl', function($scope, $http) {
	$scope.result = "";
  $http.get('https://www.reddit.com/.json')
    .success(function(data, status, headers,config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.result = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });
});
