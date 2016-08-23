manageitModule.factory("classificationService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/classification/details", {}, {
               queryAll: { method: "GET", url: '/api/manageit/v1/classification/details/:domainId/:id', isArray: true },
               query: { method: "GET", url: '/api/manageit/v1/classification/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/classification/addClassification/:domainId" },
               get: { method: "GET", url: "/api/manageit/v1/classification/detailsById/:domainId/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/classification/removeClassification/:contentTypeId/:id" },
               removeLibrary: { method: "POST", url: "/api/manageit/v1/classification/removeClassification" },
               update: { method: "PUT", url: "/api/manageit/v1/classification/updateClassification/:domainId" }
           });
       }
]);

manageitModule.factory("classificationSubObjectService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/classification/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/classification/detailsBySO/:id/:subObjectId', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/classification/addClassification" },
               get: { method: "GET", url: "/api/manageit/v1/classification/details/:contentTypeId/:subObjectId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/classification/removeClassificationBySO/:contentTypeId/:subObjectId/:id" },
               update: { method: "PUT", url: "/api/manageit/v1/classification/updateClassification/:id" }
           });
       }
]);