manageitModule.factory("sequenceService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/sequence/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/sequence/details/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/sequence/addSequence" },
               get: { method: "GET", url: "/api/manageit/v1/sequence/details/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/sequence/deleteSequence" }
           });
       }
]);