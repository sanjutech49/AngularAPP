//List userinterface service
manageitModule.factory("searchinterfaceService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/:paramUri", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:controller/details/:contentTypeId/:subObjectId', isArray: true },
               getAllSI: { method: "GET", url: "/api/manageit/v1/:controller/details/:domainId/:contentTypeId/:subObjectId", isArray: true },
               create: { method: "POST", url: '/api/manageit/v1/:controller/addSearchInterface' },
               createLibrary: { method: "POST", url: '/api/manageit/v1/:controller/addSearchInterface/:domainId' },
               get: { method: "GET", url: "/api/manageit/v1/:controller/detailsById/:contentTypeId/:subObjectId/:id" },
               getLibrary: { method: "GET", url: "/api/manageit/v1/:controller/detailsById/:domainId/:contentTypeId/:subObjectId/:id" },
               remove: { method: "POST", url: '/api/manageit/v1/:controller/removeSearchInterface/' },
               update: { method: "PUT", url: "/api/manageit/v1/:controller/updateSearchInterface" },
               updateLibrary: { method: "PUT", url: "/api/manageit/v1/:controller/updateSearchInterface/:domainId" },
               updateOrderNo: { method: "POST", url: "/api/manageit/v1/:controller/updateOrderNo/" }
           });
       }
]);