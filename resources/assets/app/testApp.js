
var testApp = angular.module("testApp", ["ngRoute","ngCookies"]);
//
testApp.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
    $routeProvider
        .when("/login", {
            templateUrl : "app/template/login.html",
            controller : "LoginController",
        })
        .when("/register", {
            templateUrl : "app/template/register.html",
            controller : "RegisterController",
        })
        .when("/dashboard", {
            templateUrl : "app/template/dashboard.html",
            controller : "DashboardController",
        })
        .otherwise('/login');

    $httpProvider.interceptors.push(['$q', '$location', '$cookies', function ($q, $location, $cookies) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                var token = $cookies.get('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $cookies.remove('token');
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);

}]);

// //Check user authentication, if true login page is not available
testApp.run(['$rootScope', '$location', '$cookies', function($rootScope, $location, $cookies) {
    $rootScope.$on('$locationChangeStart', function(ev, next, current) {
        var token = $cookies.get('token');
        if(next.search('/dashboard') !== -1){
            if(typeof token == 'undefined' ){
                $location.path('/login');
            }
        }
        if(token){
            $location.path('/dashboard');
        }
    });

}]);










