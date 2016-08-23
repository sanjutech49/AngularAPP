manageitModule.factory("permissionsService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/permission/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/permission/details/:id', isArray: true },
               queryLibrary: { method: "GET", url: '/api/manageit/v1/permission/details/:domainId/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/permission/addPermission/" },
               getLibrary: { method: "GET", url: "/api/manageit/v1/permission/details/:domainId/:contentTypeId/", isArray: true },
               get: { method: "GET", url: "/api/manageit/v1/permission/details/:contentTypeId/", isArray: true },
               getSub: { method: "GET", url: "/api/manageit/v1/permission/detailsBySO/:contentTypeId/:subObjectId/", isArray: true },
               getSubLibrary: { method: "GET", url: "/api/manageit/v1/permission/detailsBySO/:contentTypeId/:subObjectId/", isArray: true },
               remove: { method: "DELETE", url: "/api/manageit/v1/permission/removePermission/" },
               update: { method: "PUT", url: "/api/manageit/v1/permission/updatePermission/"},
               getRoles: { method: "GET", url: "/api/manageit/v1/permission/detailsRoles/", isArray: true }
           });
       }
]);