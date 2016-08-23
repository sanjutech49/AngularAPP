// Service layer method
manageitModule.factory("classificationexpressionbuilderService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/attributeset/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/attributeset/details/:id', isArray: true },
               create: { method: "POST" },
               get: { method: "GET", url: "/api/manageit/v1/attributeset/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/attributeset/details/:contentTypeId/:id" },
               update: { method: "PUT", url: "/api/manageit/v1/attributeset/details" }
           });
       }
]);
