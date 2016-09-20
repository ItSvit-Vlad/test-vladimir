var testApp=angular.module("testApp",["ngRoute","ngCookies"]);testApp.config(["$routeProvider","$httpProvider",function(o,e){o.when("/",{templateUrl:"app/template/welcome.html",controller:"WelcomeController",data:{private:!1}}).when("/register",{templateUrl:"app/template/register.html",controller:"RegisterController",data:{private:!1}}).when("/login",{templateUrl:"app/template/login.html",controller:"LoginController",data:{private:!1}}).when("/dashboard",{templateUrl:"app/template/dashboard.html",controller:"DashboardController"}).otherwise("/"),e.interceptors.push(["$q","$location","$cookies",function(o,e,t){return{request:function(o){return o.headers=o.headers||{},token=t.get("token"),token&&(o.headers.Authorization="Test "+token),o},responseError:function(r){return 401!==r.status&&403!==r.status||(t.remove("token"),e.path("/login")),o.reject(r)}}}])}]),testApp.run(["$rootScope","$location","$cookies",function(o,e,t){o.$on("$locationChangeStart",function(o,r,l){token=t.get("token"),0===r.search("/dashboard")&&(token||e.path("/login")),token&&e.path("/dashboard")})}]),angular.module("testApp").controller("CommonController",["$scope","$location",function(o,e){console.log("CommonController")}]),angular.module("testApp").controller("DashboardController",["$scope","$location",function(o,e){console.log("DashboardController")}]),angular.module("testApp").controller("LoginController",["$scope","$location",function(o,e){console.log("LoginController")}]),angular.module("testApp").controller("RegisterController",["$scope","$location",function(o,e){console.log("RegisterController")}]),angular.module("testApp").controller("WelcomeController",["$scope","$location",function(o,e){console.log("WelcomeController")}]);