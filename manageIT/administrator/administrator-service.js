
manageitModule.factory("administratorService", [
    "$resource", 'configUrlModel',
       function ($resource, configUrlModel) {
           return $resource(configUrlModel.idpUrl + "/api/idp/v1/Role", {}, {
               getRoles: { method: "GET", url: configUrlModel.idpUrl + '/api/idp/v1/Role', isArray: true },
               get: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/:emailId" },
               updateContentAdminRoles: { method: "PUT", url: configUrlModel.idpUrl + "/api/idp/v1/Role/UpdateContentAdminRoles" },
               getContentAdminRoles: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/Role/GetContentAdminRoles", isArray: true }
           });
       }
]);