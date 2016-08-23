
manageitModule.factory("compositionService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/:paramUri", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:domainId/:contentTypeId', isArray: true },
               getSourceObjectComposition: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:domainId/:contentTypeId/:subObjectId', isArray: true },
               getAllSourceAttributes: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:contentTypeId/:attributeType', isArray: true },
               create: { method: "POST" },
               get: { method: "GET", url: "/api/manageit/v1/:controller/:paramUri/:domainId/:contentTypeId/:id" },
               getSourceObjectCompositionById: { method: "GET", url: "/api/manageit/v1/:controller/:paramUri/:domainId/:contentTypeId/:subObjectId/:id" },
               remove: { method: "POST", url: '/api/manageit/v1/:controller/removeComposition' },
               update: { method: "PUT", url: "/api/manageit/v1/:controller/:paramUri/:id" }
           });
       }
]);


manageitModule.factory("attributeMapService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/:paramUri", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:contentTypeId', isArray: true },
               getAllAttributeMapByContentById: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:contentTypeId/:compositionId', isArray: true },
               getAllAttributeMapByContentByIdLibrary: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:domainId/:contentTypeId/:compositionId', isArray: true },
               getAllSourceAttributes: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:contentTypeId/:attributeType', isArray: true },
               create: { method: "POST" },
               getAllSubObjectAttributeMapByContentById: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:contentTypeId/:subObjectId/:compositionId', isArray: true },
               getAllSubObjectAttributeMapByContentByIdLibrary: { method: "GET", url: '/api/manageit/v1/:controller/:paramUri/:contentTypeId/:domainId/:subObjectId/:compositionId', isArray: true },
               get: { method: "GET", url: "/api/manageit/v1/:controller/:paramUri/:contentTypeId/:id" },
               getLibrary: { method: "GET", url: "/api/manageit/v1/:controller/:paramUri/:domainId/:contentTypeId/:id" },
               remove: { method: "POST", URL: '/api/manageit/v1/:controller/removeAttributeMap' },
               update: { method: "PUT", url: "/api/manageit/v1/:controller/:paramUri/:id" }
           });
       }
]);