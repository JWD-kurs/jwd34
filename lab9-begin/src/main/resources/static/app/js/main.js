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
	
	$scope.delete = function(id){
		var promise = $http.delete(url + "/" + id);
		promise.then(
			function success(){
				getActivities();
			},
			function error(){
				alert("Couldn't delete activity.");
			}
		)
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


wafepaApp.controller("recordsCtrl", function($scope, $http, $location){
	
	var recordsUrl = "/api/records";
	var usersUrl = "/api/users";
	var activitiesUrl = "/api/activities";
	
	$scope.records = [];
	$scope.users = [];
	$scope.activities = [];
	
	$scope.newRecord = {};
	$scope.newRecord.time = "";
	$scope.newRecord.duration = "";
	$scope.newRecord.intensity = "";
	$scope.newRecord.userId = "";
	$scope.newRecord.activityId = "";
	
	var getRecords = function(){
		$http.get(recordsUrl).then(
			function success(res){
				$scope.records = res.data;
			},
			function error(){
				alert("Couldn't fetch records.");
			}
		);
	}
	getRecords();
	
	var getUsers = function(){
		$http.get(usersUrl).then(
			function success(res){
				$scope.users = res.data;
			},
			function error(){
				alert("Couldn't fetch users");
			}
		);
	}
	getUsers();
	
	var getActivities = function(){
		$http.get(activitiesUrl).then(
			function success(res){
				$scope.activities = res.data;
			},
			function error(){
				alert("Couldn't fetch activities.");
			}
		);
	}
	getActivities();
	
	
	$scope.addRecord = function(){
		$http.post(recordsUrl,$scope.newRecord).then(
			function success(){
				getRecords();
			},
			function error(){
				alert("Couldn't add record!");
			}
		);
	}

	$scope.goToEdit = function(id){
		$location.path("/records/edit/" + id);
	}
});


wafepaApp.controller("editRecordCtrl", function($scope, $http, $routeParams, $location){
	
	var recordUrl = "/api/records/" + $routeParams.id;
	var activitiesUrl = "/api/activities";
	var usersUrl = "/api/users";
	
	$scope.record = {};
	$scope.record.time = "";
	$scope.record.duration = "";
	$scope.record.intensity = "";
	$scope.record.userId = "";
	$scope.record.activityId = "";	
	
	
	$scope.activities = [];
	$scope.users = [];
	
	
	
	var getActivities = function(){
		$http.get(activitiesUrl).then(
			function success(res){
				$scope.activities = res.data;
				getUsers();
			},
			function error(){
				alert("Couldn't fetch activities");
			}
		);
	}
	
	var getUsers = function(){
		return $http.get(usersUrl).then(
			function success(res){
				$scope.users = res.data;
				getRecord();
			},
			function error(){
				alert("Couldn't fetch users.");
			}
		);
	}
	
	var getRecord = function(){
		$http.get(recordUrl).then(
			function success(res){
				$scope.record = res.data;
			},
			function error(){
				alert("Couldn't fetch record.");
			}
		);
	}
	
	getActivities();
	
	// Pogledati promise chaining kako bi se ovo odradilo na kraci nacin
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#Chaining
	// https://javascript.info/promise-chaining
	
	$scope.doEdit = function(){
		$http.put(recordUrl, $scope.record).then(
			function success(){
				$location.path("/records");
			},
			function error(){
				alert("Something went wrong.");
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
		.when('/records', {
			templateUrl : '/app/html/records.html'
		})
		.when('/records/edit/:id', {
			templateUrl : '/app/html/record-edit.html'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
