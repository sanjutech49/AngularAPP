
manageitModule.factory("contentTypeService2", ['$resource', function ($resource) {

    return {
        save: function (domain) {
            return $resource('/api/manageit/v1/contenttype/details').save(domain);
        },

        get: function (paramId) {
            return $resource('/api/manageit/v1/contenttype/details/:id', { id: '@id' }).get({ id: paramId });
        },

        getAll: function (paramId) {
            return $resource('/api/manageit/v1/contenttype/domainDetails/:id', { id: '@id' }).query({ id: paramId });
        }
    }
}]);

manageitModule.factory("contentTypeService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/contenttype/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/contenttype/domainDetails/:id', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/contenttype/addContentType" },
               get: { method: "GET", url: "/api/manageit/v1/contenttype/details/:id" },
               remove: { method: "DELETE", url: "/api/manageit/v1/contenttype/removeContentType/:id" },
               update: { method: "PUT", url: "/api/manageit/v1/contenttype/updateContentType" }
           });
       }
]);