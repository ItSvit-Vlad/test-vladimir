angular.module('testApp').controller('DashboardController', [
    '$scope',
    '$location',
    '$http',
    '$uibModal',

    function($scope, $location, $http, $uibModal ){
        console.log('DashboardController');

        $scope.users={};

            $http({
                method : "GET",
                url : "api/contacts",
            })
            .then(function (response) {
                console.log(response.data.data);
                $scope.users = response.data.data;
                console.log($scope.users);
            });


        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'ModalContent.html',
                controller: 'DashboardController',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

    }
]);
