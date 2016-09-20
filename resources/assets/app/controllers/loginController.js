angular.module('testApp').controller('LoginController', [
    '$scope',
    '$location',
    '$http',
    function($scope, $location, $http){
        console.log('LoginController');
        var loginBody = angular.element( document.body );
        loginBody.addClass('login');

        /**
         * Fields login form
         * @type {{name: string, email: string, password: string, passwordConfirmation: string}}
         */
        $scope.user = {
            email : '',
            password : '',
            save : '',
        };

        /**
         * error msg for invalid form data
         * @type {{name: string, email: string, password: string, passwordConfirmation: string}}
         */
        $scope.error = {
            email : [],
            password : []
        };

        /**
         * Submit login form
         */
        $scope.submit = function() {
            for(var id in $scope.error){
                $scope.error[id] = [];
            }
            $http({
                method : "POST",
                url : "api/login",
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