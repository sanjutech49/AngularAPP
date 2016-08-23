//This should resides under user

(function () {
    "use strict";
    function userActionService($resource, configUrlModel) {
        function GetUserDetails() {
            return $resource(configUrlModel.idpUrl+"/api/idp/v1/User/", {}, {
                query: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/allusers/:showDeleted", isArray: true },
                create: { method: "POST" },
                get: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/:emailId" },
                remove: { method: "DELETE", url: configUrlModel.idpUrl + "/api/idp/v1/User/:emailId" },
                update: { method: "PUT", url: configUrlModel.idpUrl+'/api/idp/v1/User/' },
                getdetails: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/getdetails/:key" },
                resetpassword: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/resetpass/:key" },
                sendemail: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/sendemail/:emailId" },
                getuserloginhistory: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/loginhistory/:emailId", isArray: true },
                getuserlogs: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/userlogs/:emailId", isArray: true },
                getuserlogsbyfilter: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/userlogsfilter?roleId=:roleId&type=:type&fromDate=:fromDate&toDate=:toDate&createdBy=:createdBy", isArray: true },
            });
        }
        function UserUpdationService() {
            return $resource(configUrlModel.idpUrl+'/api/idp/v1/User/updateuserdetails', {}, {
                update: {
                    method: 'POST',
                    transformResponse: function (data, headers) {
                        var response = {};
                        response.data = data;
                        response.headers = headers();
                        return response;
                    }
                }
            });
        }
        function UserCreationService() {
            return $resource(configUrlModel.idpUrl+'/api/idp/v1/User/', {}, {
                create: {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    transformResponse: function (data, headers) {
                        var response = {};
                        response.data = data;
                        response.headers = headers();
                        return response;
                    }
                }
            });
        }
        function UserRolesService() {
            var apiBasePath = configUrlModel.idpUrl+'/api/idp/v1/Role/';
            return $resource(apiBasePath, {}, {
                query: { method: "GET", url: apiBasePath, isArray: true },
                create: { method: "POST" },
                update: { method: "PUT" },
                get: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/Role/:filter", isArray: true },
                addRoles: { method: 'PUT', url: configUrlModel.idpUrl + "/api/idp/v1/User/adduserroles/" },
                removeRoles: { method: 'PUT', url: configUrlModel.idpUrl + "/api/idp/v1/User/deleteuserroles" },
                getRoleUsers: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/User/role/:roleId", isArray: true },
                getRoleLogs: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/Role/log/:roleId", isArray: true },
                deleteRole: { method: 'DELETE', url: configUrlModel.idpUrl + "/api/idp/v1/Role/:id" },
            });
        }
        function UserModuleService() {
            var apiBasePath = configUrlModel.idpUrl+'/api/idp/v1/Instance/apsInstanceModules/:instanceId';
            return $resource(apiBasePath, {}, {
                query: { method: "GET", url: apiBasePath, isArray: true },
                create: { method: "POST" },
                update: { method: "PUT" },
                get: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1//User/getUserInstanceModules/:email", isArray: true },
                addModules: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/User/addUserInstanceModules?emailId=:emailId&moduleName=:moduleName" },
                removeModules: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/User/removeUserInstanceModules?emailId=:emailId&moduleName=:moduleName" },
                getRoleUsers: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/User/role/:roleId", isArray: true },
                getRoleLogs: { method: 'GET', url: configUrlModel.idpUrl + "/api/idp/v1/Role/log/:roleId", isArray: true },
                deleteRole: { method: 'DELETE', url: configUrlModel.idpUrl + "/api/idp/v1/Role/:id" },
            });
        }
        return {
            UserRolesService: UserRolesService(),
            UserCreationService: UserCreationService(),
            UserUpdationService: UserUpdationService(),
            UserModuleService:UserModuleService(),
            GetUserDetails: GetUserDetails()
        };
    }
    userActionsModule.factory('userActionService', ['$resource','configUrlModel', userActionService]);
}());
