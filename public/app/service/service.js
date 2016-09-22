
angular.module('testApp').service('contacts', ['$http', function($http) {
    var getUser = function () {
        return $http.get('api/user').success(function(data) {
            return data;
        });
    };
    var getContacts = function () {
        return $http.get('api/contacts').success(function(data) {
            return data;
        });
    };
    var getContactById = function(id) {
        return $http.get('api/contact/'+ id +'/info').success(function(data) {
            return data;
        });
    };
    var editContact = function(data) {
        return $http.put('api/contacts/' + data.id, data).success(function(data) {
            return data;
        });
    };
    var addContact = function(data) {
        return $http.put('api/contactsNew/', data).success(function(data) {
            return data;
        });
    };
    var deleteContact = function(id) {
        return $http.delete('api/contacts/' + id).success(function(data) {
            return data;
        });
    };
    return {
        getUser : getUser,
        getContacts : getContacts,
        getContactById : getContactById,
        editContact : editContact,
        addContact : addContact,
        deleteContact : deleteContact
    };
}]);