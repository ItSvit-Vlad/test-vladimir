angular.module('testApp').controller('LoginController', [
    '$scope',
    '$location',
    function($scope, $location){
        console.log('LoginController');
        var loginBody = angular.element( document.body );
        loginBody.addClass('login');
    }
]);