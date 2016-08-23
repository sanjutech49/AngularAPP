(function () {
    "use strict";
    function rolesService($resource, configUrlModel) {

        function getRoles() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/Role?showDeleted=:isDeleted";
            var defaults = { };
            var actions = {
                query: {
                    method: 'GET',
                    isArray:true
                }
            };
            return $resource(url, defaults, actions).query;
        }

       
        function getRole() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/Role/roles/:roleId";
            var defaults = { roleId: '@roleId' };
            var actions = {
                role: {
                    method: 'GET'
                   
                }
            };
            return $resource(url, defaults, actions).role;
        }

        function getUsers() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/User/allusers/:showDeleted";
            var defaults = { };
            var actions = {
                users: {
                    method: 'GET',
                    isArray: true
                }
            };
            return $resource(url, defaults, actions).users;
        }

        function addRoles() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/Role/";
            var defaults = {  };
            var actions = {
                addRole: {
                    method: 'POST'
                   
                }
            };
            return $resource(url, defaults, actions).addRole;
        }

        function addUserRoles() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/User/adduserroles";
            var defaults = {};
            var actions = {
                addUserRole: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions).addUserRole;
        }

        function updateRoles() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/Role/";
            var defaults = {};
            var actions = {
                updateRole: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions).updateRole;
        }

        function deleteRoles() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/Role/:id";
            var defaults = {};
            var actions = {
                deleteRole: {
                    method: 'DELETE'

                }
            };
            return $resource(url, defaults, actions).deleteRole;
        }

        function getRoleLogs() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/Role/log/:roleId";
            var defaults = {};
            var actions = {
                roleLogs: {
                    method: 'GET',
                    isArray:true

                }
            };
            return $resource(url, defaults, actions).roleLogs;
        }
        function getUsersById() {

            var url = configUrlModel.idpUrl + "/api/idp/v1/User/role/:roleId";
            var defaults = { roleId: '@roleId' };
            var actions = {
                allUsers: {
                    method: 'GET',
                    isArray: true

                }
            };
            return $resource(url, defaults, actions).allUsers;
        }

        function removeRoles() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/User/deleteuserroles/";
            var defaults = {};
            var actions = {
                removeRole: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions).removeRole;
        }

        function getrolelogsbyfilter() { 
            var url= configUrlModel.idpUrl + "/api/idp/v1/Role/rolelogsfilter?emailId=:emailId&type=:type&fromDate=:fromDate&toDate=:toDate&createdBy=:createdBy";
            var defaults = {};
            var actions = {
                rolelogsfilter: {
                    method: 'GET'
                    , isArray: true
                }
            };
            return $resource(url, defaults, actions).rolelogsfilter;
             }

        return {
            getRoles: getRoles(),
            getRole: getRole(),
            getUsers: getUsers(),
            addRoles: addRoles(),
            updateRoles: updateRoles(),
            deleteRoles:deleteRoles(),
            getRoleLogs: getRoleLogs(),
            getUsersById: getUsersById(),
            removeRoles: removeRoles(),
            addUserRoles: addUserRoles(),
            getrolelogsbyfilter: getrolelogsbyfilter()
        };
    }
    rolesModule.factory('rolesService', ['$resource','configUrlModel', rolesService]);
}());