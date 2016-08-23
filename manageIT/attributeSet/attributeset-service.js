manageitModule.factory("attributeSetService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/attributeset/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/attributeset/details/:id', isArray: true },
               allAttributeSetQuery: { method: "GET", url: '/api/manageit/v1/attributeset/allDetails/:domainId/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/attributeset/addAttributeSet/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/attributeset/details/:contentTypeId/:id" },
               getById: { method: "GET", url: "/api/manageit/v1/attributeset/attributeSetDetails/:domainId/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/attributeset/removeAttributeSet/:contentTypeId/:id" },
               removeLibrary: { method: "POST", url: "/api/manageit/v1/attributeset/removeAttributeSet" },
               update: { method: "PUT", url: "/api/manageit/v1/attributeset/updateAttributeSet/:domainId" }
           });
       }
]);