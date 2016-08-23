(function () {
    "use strict";
    function jobitConfigurationService($resource, configUrlModel) {
        var interceptor = {
            response: function (response) {
                return response.data;
            }
        };

        function getPagePresets() {
            var url = "/api/jobit/v1/PagePreset/getPagePreset";
            var defaults = {};
            var actions = {
                query: {
                    method: "GET",
                    isArray: true,
                    interceptor: interceptor
                }
            };
            return $resource(url, defaults, actions).query;
        }

        function getPagePreset() {
            var url = "/api/jobit/v1/PagePreset/getPagePreset/:id";
            var defaults = {};
            var actions = {
                query: {
                    method: "GET",
                    interceptor: interceptor
                }
            };
            return $resource(url, defaults, actions).query;
        }

        function removePagePreset() {
            var url = "/api/jobit/v1/PagePreset/removePagePreset/:id";
            var defaults = {};
            var actions = {
                query: {
                    method: "DELETE",
                    interceptor: interceptor
                }
            };
            return $resource(url, defaults, actions).query;
        }

        function updatePagePreset() {
            var url = "/api/jobit/v1/PagePreset/updatePagePreset";
            var defaults = {};
            var actions = {
                query: {
                    method: "PUT",
                    interceptor: interceptor
                }
            };
            return $resource(url, defaults, actions).query;
        }

        function addPagePreset() {
            var url = "/api/jobit/v1/PagePreset/addPagePreset";
            var defaults = {};
            var actions = {
                query: {
                    method: "POST",
                    interceptor: interceptor
                }
            };
            return $resource(url, defaults, actions).query;
        }

        function addHierarchy() {
            var url = "/api/jobit/v1/Hierarchy/AddHierarchy";
            var defaults = {};
            var actions = {
                query: {
                    method: "POST",
                    interceptor: interceptor
                }
            };
            return $resource(url, defaults, actions).query;
        }

        function userRolesService() {
            var apiBasePath = configUrlModel.idpUrl + '/api/idp/v1/Role/';
            return $resource(apiBasePath, {}, {
                query: { method: "GET", url: apiBasePath, isArray: true },
                updateProductionAdminRoles: { method: "PUT", url: configUrlModel.idpUrl + "/api/idp/v1/Role/UpdateProductionAdminRoles" },
                getProductionAdminRoles: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/Role/GetProductionAdminRoles", isArray: true },
                addRoles: { method: 'PUT', url: configUrlModel.idpUrl + "/api/idp/v1/User/adduserroles/" },
                removeRoles: { method: 'PUT', url: configUrlModel.idpUrl + "/api/idp/v1/User/deleteuserroles" },
                getRoleUsers: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/User/role/:roleId", isArray: true },
                getRoleLogs: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/Role/log/:roleId", isArray: true },
                deleteRole: { method: 'DELETE', url: configUrlModel.idpUrl + "/api/idp/v1/Role/:id" },
            });
        }
       
        return {
            getPagePresets: getPagePresets(),
            getPagePreset: getPagePreset(),
            removePagePreset: removePagePreset(),
            updatePagePreset: updatePagePreset(),
            addPagePreset: addPagePreset(),
            addHierarchy: addHierarchy(),
            userRolesService: userRolesService()
            
        };
    }
    angular.module('jobit.configuration').factory('jobitConfigurationService', ['$resource', 'configUrlModel', jobitConfigurationService]);
}());