var app = angular.module('tweetApp', ['ngRoute', 'ngResource']).run(function ($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function () {
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
});

app.config(function ($routeProvider) {
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

app.factory('postService', function ($resource) {
  return $resource('/api/posts/:id');
});

app.controller('mainController', function ($scope, postService, $rootScope) {
  $scope.posts = postService.query();
  $scope.newPost = { created_by: '', text: '', created_at: '' };
  //  postService.getAll().success(function(data) { $scope.posts = data; });
  $scope.wiad = function () {
    $scope.newPost.created_by = $rootScope.current_user;
    $scope.newPost.created_at = Date.now();
    // $scope.posts.push($scope.newPost);
    postService.save($scope.newPost, function () {
      $scope.posts = postService.query();
      $scope.newPost = { created_by: '', text: '', created_at: '' };
    });
  };
  $scope.delPost = {}
});

/*
app.factory('postService', function($http) {
  var baseUrl = "/api/posts";
  var factory = {};
  factory.getAll = function() {
    return $http.get(baseUrl);
  };
  return factory;
});
*/

app.controller('authController', function ($scope, $http, $rootScope, $location) {
  $scope.user = { username: '', password: '' };
  $scope.error_message = '';

  $scope.login = function () {
    // $scope.error_message = 'login request for ' + $scope.user.username;
    $http.post('/auth/login', $scope.user).success(function (data) {
      if (data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function () {
    //	$scope.error_message = 'registeration request for ' + $scope.user.username;
    $http.post('/auth/signup', $scope.user).success(function (data) {
      if (data.state == 'success') {
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      } else {
        $scope.error_message = data.message;
      }
    });
  };
});