
manageitModule.factory("domainService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/domain/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/domain/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/domain/addDomain" },
               get: { method: "GET", url: "/api/manageit/v1/domain/details/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/domain/deleteDomain" },
               update: { method: "PUT", url: "/api/manageit/v1/domain/updateDomain" },
               getAllDomains: { method: "GET", url: "/api/manageit/v1/domain/allContentTypes", isArray: true }
           });
       }
]);