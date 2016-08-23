manageitModule.factory("subObjectService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/subObject/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/subObject/listDetails/:domainId/:id',isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/subObject/addSubObject" },
               get: { method: "GET", url: "/api/manageit/v1/subObject/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/subObject/removeSubObject" },
               update: { method: "PUT", url: "/api/manageit/v1/subObject/updateSubObject" }
           });
       }
]);
