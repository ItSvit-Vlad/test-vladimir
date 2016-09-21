angular.module('testApp').controller('DashboardController', [
    '$scope',
    '$location',
    '$http',
    function($scope, $location, $http){
        console.log('DashboardController');

        $http({
            method : "GET",
            url : "api/user",
        })
        .then(function pageSucces(response) {
            console.log(response);
        }, function(response) {
            console.log(response);
        });

        $http({
            method : "GET",
            url : "api/contacts",
        })
        .then(function pageSucces(response) {
            console.log(response);
        }, function(response) {
            console.log(response);
        });
    }
]);