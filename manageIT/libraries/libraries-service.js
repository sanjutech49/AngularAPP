manageitModule.factory("imageLibraryService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/imageLibrary/details", {}, {
               create: { method: "POST", url: '/api/manageit/v1/imageLibrary/addImageLibrary' },
               getAllImageLibraries: { method: "GET", url: '/api/manageit/v1/imageLibrary/details', isArray: true },
               update: { method: "PUT", url: "/api/manageit/v1/:controller/updateImageLibrary" },
               getImageLibrary: { method: "GET", url: '/api/manageit/v1/:controller/details/:id' },
               createDimension: { method: "POST", url: '/api/manageit/v1/imageLibrary/addDimensions' },
               getAllDimensions: { method: "GET", url: '/api/manageit/v1/imageLibrary/dimensions', isArray: true },
               createPaperType: { method: "POST", url: '/api/manageit/v1/imageLibrary/addPaperTypes' },
               getAllPaperTypes: { method: "GET", url: '/api/manageit/v1/imageLibrary/paperTypes', isArray: true },
               createFinishes: { method: "POST", url: '/api/manageit/v1/imageLibrary/addFinishes' },
               getAllFinishes: { method: "GET", url: '/api/manageit/v1/imageLibrary/finishes', isArray: true },
           });
       }
]); 

manageitModule.factory("documentLibraryService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/documentLibrary/details", {}, {
               create: { method: "POST", url: '/api/manageit/v1/documentlibrary/addDocumentLibrary' },
               getAllDocumentLibraries: { method: "GET", url: '/api/manageit/v1/documentlibrary/details', isArray: true },
               query: { method: "GET", url: '/api/manageit/v1/documentlibrary/details/:id', isArray: true },
               update: { method: "PUT", url: "/api/manageit/v1/documentlibrary/updateDocumentLibrary" }
           });
       }
]);