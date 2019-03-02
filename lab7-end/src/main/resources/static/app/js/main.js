var wafepaApp = angular.module("wafepaApp", ["ngRoute"]);

wafepaApp.controller("homeCtrl", function($scope){
	$scope.message = "Hello JWD34!";
});

wafepaApp.controller("activitiesCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.activities = [];
	
	var getActivities = function(){
		var promise = $http.get(url);
		promise.then(
			function success(res){
				$scope.activities = res.data;
				console.log(res);
			},
			function error(res){
				alert("Couldn't fetch activities");
			}
		);
		
		console.log("Test");
	}
	
	getActivities();
	
	$scope.goToEdit = function(id){
		//console.log(id);
		$location.path("/activities/edit/" + id);
	}
	
	$scope.goToAdd = function(){
		$location.path("/activities/add");
	}
	
});

wafepaApp.controller("editActivityCtrl", function($scope, $routeParams, $http, $location){
	
	//console.log($routeParams);
	var id = $routeParams.aid;
	var url = "/api/activities/" + id;
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	var getActivity = function(){
		$http.get(url).then(
			function success(res){
				$scope.activity = res.data;
			},
			function error(){
				alert("Couldn't fetch activity.")
			}
		);
	}
	
	getActivity();
	
	$scope.edit = function(){
		$http.put(url, $scope.activity).then(
			function success(){
				$location.path("/activities");
			},
			function error(){
				alert("Couldn't finish editing.")
			}
		);
	}
	
});


wafepaApp.controller("addActivityCtrl", function($scope, $http, $location){
	
	var url = "/api/activities";
	
	$scope.activity = {};
	$scope.activity.name = "";
	
	
	$scope.add = function(){
		var promise = $http.post(url, $scope.activity);
		promise.then(
			function uspeh(){
				$location.path("/activities");
			},
			function neuspeh(){
				alert("Couldn't create activity");
			}
		);
	}
});


wafepaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : '/app/html/home.html',
			controller: 'homeCtrl'
		})
		.when('/activities', {
			templateUrl : '/app/html/activities.html'
		})
		.when('/activities/add', {
			templateUrl : '/app/html/activity-add.html'
		})
		.when('/activities/edit/:aid', {
			templateUrl : '/app/html/activity-edit.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);