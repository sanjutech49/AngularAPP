

manageitModule.factory("contentObjectService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/details", {}, {
               //query: { method: "GET", url: '/api/manageit/v1/:controller/details/:contentTypeId/:subObjectId/:isAllLayouts', isArray: true },
               create: { method: "POST", url: "/api/manageit/v1/:controller/saveContentObject" },
               //get: { method: "GET", url: "/api/manageit/v1/:controller/details/:contentTypeId/:id" },
               //remove: { method: "POST", url: "/api/manageit/v1/:controller/details/removeLayout" },
               //update: {
               //    method: "PUT", url: "/api/manageit/v1/:controller/details/updateLayout"
               //},
               getAllAttributesInContentType: {
                   method: "GET", url: '/api/manageit/v1/:controller/allDetails/:id', isArray: true
               },
               getTemplate: { method: "GET", url: "/api/manageit/v1/:controller/getEditItemByName/:contentTypeId/:name" },
               getContentObject: { method: "GET", url: "/api/manageit/v1/:controller/GetContentObject/:contentObjectId" },

               GetContentObjectReference: { method: "GET", url: "/api/manageit/v1/:controller/GetContentObjectReference/:contentTypeId", isArray: true },

               getSequenceById: { method: "GET", url: "/api/manageit/v1/sequence/details/:id" },
               GetCopyAttributePresentation: { method: "GET", url: "/api/manageit/v1/:controller/getAllContentObjectExpressions/:contentTypeId", isArray: true },

               getSearchResult: { method: "POST", url: "/api/manageit/v1/contentobject/getSearchContenObjects", isArray: true },
           });
       }
]);

manageitModule.factory("imageLibraryObjectService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/details", {}, {
               create: { method: "POST", url: "/api/manageit/v1/:controller/saveImageObject" },
               getImageLibraryObject: { method: "GET", url: "/api/manageit/v1/:controller/getImageLibraryObject/:imageObjectId" },
               getImageObjectReference: { method: "GET", url: "/api/manageit/v1/:controller/getImageObjectReference/:imageLibraryId", isArray: true }
           });
       }
]);

manageitModule.factory("documentLibraryObjectService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/details", {}, {
               create: { method: "POST", url: "/api/manageit/v1/:controller/saveDocumentObject" },
               getDocumentLibraryObject: { method: "GET", url: "/api/manageit/v1/:controller/getDocumentLibraryObject/:documentObjectId" },
               getDocumentObjectReference: { method: "GET", url: "/api/manageit/v1/:controller/getDocumentObjectReference/:documentLibraryId", isArray: true }

           });
       }
]);
