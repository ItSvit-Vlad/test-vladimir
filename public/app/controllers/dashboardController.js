angular.module('testApp').controller('DashboardController', [
    '$scope',
    '$location',
    '$http',
    '$timeout',
    '$cookies',
    'contacts',
    function($scope, $location, $http, $timeout, $cookies, contacts){

        contacts.getUser().error(function (err) {
                console.log(err);
            }).success(function(response) {
                $scope.user = response.user.name;
        });

        var getC = function(){
            contacts.getContacts().error(function (err) {
                console.log(err);
            }).success(function(response) {
                $scope.contacts = response.data
                var nothing = $scope.contacts.length;
                if(nothing === 0){
                    $scope.proposition = true;
                }
            });
        } 

        getC();

        $scope.curContact = {};
        $scope.newContact = {};
        $scope.newContact.emails = [];
        $scope.proposition = false;
        $scope.modalContactView = 'list';

        $scope.openCustomModal = function () {
            $scope.customModal = true;
        }

        $scope.closeCustomModal = function () {
            $scope.customModal = false;
            $timeout(function() {$scope.modalContactView = 'list'}, 500);
        }

        $scope.closeCustomModalArea = function () {
            $scope.customModal = false;
        }

        $scope.getContact = function(contact){
            contacts.getContactById(contact.contact_id).error(function (err) {
                console.log(err);
            }).success(function(response) {
                $scope.curContact.emails = response.data;
                $scope.curContact.first = contact.first_name;
                $scope.curContact.last = contact.last_name;
                $scope.curContact.id = contact.contact_id;
            });
        }

        $scope.editContact = function() {
            $scope.modalContactView = 'edit';
        }

        $scope.addMail = function() {
            var newItemNo = $scope.curContact.emails.length+1;
            $scope.curContact.emails.push({'info_id':'email'});
        };
            
        $scope.removeMail = function(index) {
            var lastItem = $scope.curContact.emails.length-1;
            $scope.curContact.emails.splice(index, 1);
        };

        $scope.addNewMail = function() {
            var newConNo = $scope.newContact.emails.length+1;
            $scope.newContact.emails.push({'info_id':'email'});
        };
            
        $scope.removeNewMail = function(index) {
            var lastConItem = $scope.newContact.emails.length-1;
            $scope.newContact.emails.splice(index, 1);
        };

        $scope.editContactSave = function() {
            contacts.editContact($scope.curContact).error(function (err) {
                console.log(err);
            }).success(function(response) {
                $scope.modalContactView = 'list';
                getC();
            });
        }

        $scope.contactAdd = function() {
            $scope.customModal = true;
            $scope.modalContactView = 'add';
        }

        $scope.contactAddSave = function(data) {
            contacts.addContact(data).error(function (err) {
                console.log(err);
            }).success(function(response) {
                getC();
                $scope.newContact = {};
                $scope.modalContactView = 'list';
                $scope.customModal = false;
                $scope.proposition = false;
            });
        }

        $scope.contactDelete = function(id) {
            contacts.deleteContact(id).error(function (err) {
                console.log(err);
            }).success(function(response) {
                getC();
                $scope.customModal = false;
            });
        }

        $scope.logout = function(){
            $cookies.remove('token');
            $location.path('/login');
        }

    }
]);