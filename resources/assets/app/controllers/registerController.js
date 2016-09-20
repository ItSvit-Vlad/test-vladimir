angular.module('testApp').controller('RegisterController', [
    '$scope',
    '$location',
    '$http',
    '$cookies',
    function($scope, $location, $http, $cookies){
        console.log('RegisterController');

        var loginBody = angular.element( document.body );
        loginBody.addClass('register');

        /**
         * Fields registration form
         * @type {{name: string, email: string, password: string, passwordConfirmation: string}}
         */
        $scope.user = {
            name : '',
            email : '',
            password : '',
            password_confirmation : '',
        };

        /**
         * error msg for invalid form data
         * @type {{name: string, email: string, password: string, passwordConfirmation: string}}
         */
        $scope.error = {
            name :  [],
            email : [],
            password : [],
            password_confirmation : [],
        };

        /**
         * Submit registration form
         */
        $scope.submit = function() {
            for(var id in $scope.error){
                $scope.error[id] = [];
            }
            $http({
                method : "POST",
                url : "api/register",
                data: $scope.user
            })
            .then(function pageSucces(response) {
                if(response.data.token){
                    $cookies.put('token', response.data.token);
                    $scope.error_data = '';
                    $location.path('/dashboard');
                }else{
                    alert(response.statusText);
                }
            }, function(response) {
                var errors = response.data.errors;
                for (var name in errors) {
                    for (var error in errors[name]) {
                        $scope.error[name][$scope.error[name].length] = {
                            msg : errors[name][error],
                        }
                    }
                }
            });
        }
    }
]);