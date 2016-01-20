var app = angular.module('tweetApp', ['ngRoute']).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
});

app.config(function($routeProvider) {
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.controller('mainController', function($scope) {
	$scope.posts = [];
	$scope.newPost = {created_by: '', text: '', created_at: ''};
	
	$scope.post = function() {
		$scope.newPost.created_at = Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost = {created_by: '', text: '', created_at: ''};
	};
});

app.controller('authController', function($scope, $http, $rootScope, $location) {
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function() {
    // $scope.error_message = 'login request for ' + $scope.user.username;1
    $http.post('/auth/login', $scope.user).success(function(data) {
      if(data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
   };

	$scope.register = function() {
	//	$scope.error_message = 'registeration request for ' + $scope.user.username;
    $http.post('/auth/signup', $scope.user).success(function(data) {
      if(data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
	};
});