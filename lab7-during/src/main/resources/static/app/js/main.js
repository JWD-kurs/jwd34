var wafepaApp = angular.module("wafepaApp", ["ngRoute"]);

wafepaApp.controller("homeCtrl", function($scope){
	$scope.message = "Hello JWD34!";
});

wafepaApp.controller("activitiesCtrl", function($scope, $http){
	
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
		.otherwise({
			redirectTo: '/'
		});
}]);