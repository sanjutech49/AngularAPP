manageitModule.factory("layoutsService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/details", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:controller/detailsSOById/:contentTypeId/:subObjectId/:isAllLayouts', isArray: true },
               queryLib: { method: "GET", url: '/api/manageit/v1/:controller/details/:domainId/:contentTypeId/:isAllLayouts', isArray: true },
               querySubobejctLib: { method: "GET", url: '/api/manageit/v1/:controller/detailsSOById/:domainId/:contentTypeId/:subObjectId/:isAllLayouts', isArray: true },
               queryAll: { method: "GET", url: '/api/manageit/v1/:controller/details/:domainId/:contentTypeId/:isAllLayouts', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/:controller/details/addLayout" },
               createLib: { method: "POST", url: "/api/manageit/v1/:controller/details/addLayout/:domainId" },
               
               get: { method: "GET", url: "/api/manageit/v1/:controller/details/:contentTypeId/:id" },
               getLibrary: { method: "GET", url: "/api/manageit/v1/:controller/details/:domainId/:contentTypeId/:id" },
               remove: { method: "POST", url: "/api/manageit/v1/:controller/details/removeLayout" },
               removeLib: { method: "POST", url: "/api/manageit/v1/:controller/details/removeLayout/:domainId" },
               update: {
                   method: "PUT", url: "/api/manageit/v1/:controller/details/updateLayout"
               },
               updateLib: {
                   method: "PUT", url: "/api/manageit/v1/:controller/details/updateLayout/:domainId"
               },
               getAllAttributesInContentType: {
               method: "GET", url: '/api/manageit/v1/:controller/allDetails/:id', isArray: true
               },
               getAllSubObjectAttrInContentType: { method: "GET", url: '/api/manageit/v1/subObject/details/:id', isArray: true },
               
               createStyle: { method: "POST", url: "/api/manageit/v1/:controller/addStyles" },
               getAllAttributeSetsInContentType: { method: "GET", url: '/api/manageit/v1/attributeset/details/:id', isArray: true }
               
           });
       }
]);