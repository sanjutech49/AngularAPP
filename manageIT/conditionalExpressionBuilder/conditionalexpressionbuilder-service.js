// Service layer method
manageitModule.factory("conditionalExpressionBuilderService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/classification/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/classification/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/classification/addClassification" },
               get: { method: "GET", url: "/api/manageit/v1/classification/details/:contentTypeId/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/classification/removeClassification/:contentTypeId/:id" },
               update: { method: "PUT", url: "/api/manageit/v1/classification/updateClassification" }
           });
       }
]);
