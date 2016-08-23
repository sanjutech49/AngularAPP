//List userinterface service

manageitModule.factory("userinterfaceService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/:paramUri", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:controller/allListItems/:contentTypeId', isArray: true },
               queryLibrary: { method: "GET", url: '/api/manageit/v1/:controller/allListItems/:domainId/:contentTypeId', isArray: true },
               queryAll: { method: "GET", url: '/api/manageit/v1/:controller/allListItemsInContentAndSubObjects/:contentTypeId', isArray: true },
               queryAllLibrary: { method: "GET", url: '/api/manageit/v1/:controller/allListItemsInContentAndSubObjects/:domainId/:contentTypeId', isArray: true },
               soquery: { method: "GET", url: '/api/manageit/v1/:controller/allSOListItems/:contentTypeId/:subObjectId', isArray: true },
               soqueryLibrary: { method: "GET", url: '/api/manageit/v1/:controller/allSOListItems/:domainId/:contentTypeId/:subObjectId', isArray: true },
               create: { method: "POST", url: '/api/manageit/v1/:controller/addListInterface' },
               createLibrary: { method: "POST", url: '/api/manageit/v1/:controller/addListInterface/:domainId' },
               get: { method: "GET", url: "/api/manageit/v1/:controller/getListItemById/:contentTypeId/:id" },
               getLibrary: { method: "GET", url: "/api/manageit/v1/:controller/getListItemById/:domainId/:contentTypeId/:id" },
               getso: { method: "GET", url: "/api/manageit/v1/:controller/getSOListItemById/:contentTypeId/:id" },
               getsoLibrary: { method: "GET", url: "/api/manageit/v1/:controller/getSOListItemById/:domainId/:contentTypeId/:id" },
               remove: { method: "POST", url: '/api/manageit/v1/:controller/removeListItem/' },
               update: { method: "PUT", url: "/api/manageit/v1/:controller/updateListInterface" },
               updateLibrary: { method: "PUT", url: "/api/manageit/v1/:controller/updateListInterface/:domainId" }
           });
       }
]);
//view userinterface service

manageitModule.factory("viewuserinterfaceService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/:paramUri", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:controller/allViewItems/:contentTypeId', isArray: true },
               queryLibrary: { method: "GET", url: '/api/manageit/v1/:controller/allViewItems/:domainId/:contentTypeId', isArray: true },
               soquery: { method: "GET", url: '/api/manageit/v1/:controller/allSOViewItems/:contentTypeId/:subObjectId', isArray: true },
               soqueryLibrary: { method: "GET", url: '/api/manageit/v1/:controller/allSOViewItems/:domainId/:contentTypeId/:subObjectId', isArray: true },
               create: { method: "POST", url: '/api/manageit/v1/:controller/addViewInterface' },
               createLibrary: { method: "POST", url: '/api/manageit/v1/:controller/addViewInterface/:domainId' },
               get: { method: "GET", url: "/api/manageit/v1/:controller/getViewItemById/:contentTypeId/:id" },
               getLibrary: { method: "GET", url: "/api/manageit/v1/:controller/getViewItemById/:domainId/:contentTypeId/:id" },
               getso: { method: "GET", url: "/api/manageit/v1/:controller/getSOViewItemById/:contentTypeId/:id" },
               getsoLibrary: { method: "GET", url: "/api/manageit/v1/:controller/getSOViewItemById/:domainId/:contentTypeId/:id" },
               remove: { method: "POST", url: '/api/manageit/v1/:controller/removeViewItem' },
               update: { method: "PUT", url: "/api/manageit/v1/:controller/:id/updateViewInterface" },
               updateLibrary: { method: "PUT", url: "/api/manageit/v1/:controller/updateViewInterface/:domainId" },
               getInterface: { method: "GET", url: "/api/manageit/v1/:controller/viewInterfaceByName/:domainId/:contentTypeId/:name", isArray: true }
           });
       }
]);

//Edit userinterface service

manageitModule.factory("edituserinterfaceService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/:paramUri", {}, {
               query: { method: "GET", url: '/api/manageit/v1/:controller/allEditItems/:contentTypeId', isArray: true },
               queryLibrary: { method: "GET", url: '/api/manageit/v1/:controller/allEditItems/:domainId/:contentTypeId', isArray: true },
               soquery: { method: "GET", url: '/api/manageit/v1/:controller/allSOEditItems/:contentTypeId/:subObjectId', isArray: true },
               soqueryLibrary: { method: "GET", url: '/api/manageit/v1/:controller/allSOEditItems/:domainId/:contentTypeId/:subObjectId', isArray: true },
               create: { method: "POST", url: '/api/manageit/v1/:controller/addEditInterface' },
               createLibrary: { method: "POST", url: '/api/manageit/v1/:controller/addEditInterface/:domainId' },
               get: { method: "GET", url: "/api/manageit/v1/:controller/getEditItemById/:contentTypeId/:id" },
               getLibrary: { method: "GET", url: "/api/manageit/v1/:controller/getEditItemById/:domainId/:contentTypeId/:id" },
               getso: { method: "GET", url: "/api/manageit/v1/:controller/getSOEditItemById/:contentTypeId/:id" },
               getsoLibrary: { method: "GET", url: "/api/manageit/v1/:controller/getSOEditItemById/:domainId/:contentTypeId/:id" },
               remove: { method: "POST", url: '/api/manageit/v1/:controller/removeEditItem' },
               update: { method: "PUT", url: "/api/manageit/v1/:controller/:id/updateEditInterface" },
               updateLibrary: { method: "PUT", url: "/api/manageit/v1/:controller/updateEditInterface/:domainId" }
           });
       }
]);

