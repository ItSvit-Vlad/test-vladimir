
var testApp = angular.module("testApp", ["ngRoute","ngCookies"]);
//
testApp.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "app/template/welcome.html",
            controller : "WelcomeController",
            data: {
                private: false
            },

        })
        .when("/register", {
            templateUrl : "app/template/register.html",
            controller : "RegisterController",
            data: {
                private: false
            },

        })
        .when("/login", {
            templateUrl : "app/template/login.html",
            controller : "LoginController",
            data: {
                private: false
            },

        })
        .when("/dashboard", {
            templateUrl : "app/template/dashboard.html",
            controller : "DashboardController",


        })
        .otherwise('/');

    $httpProvider.interceptors.push(['$q', '$location', '$cookies', function ($q, $location, $cookies) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                token= $cookies.get('token');
                if (token) {
                    config.headers.Authorization = 'Test ' + token;
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

        token= $cookies.get('token');
        if(next.search('/dashboard') === 0){
            if(!token){
                $location.path('/login');
            }
        }
        if(token){
            $location.path('/dashboard');
        }

    });

}]);










