manageitModule.factory("presentationService", [
    "$resource",
       function ($resource) {
           return $resource("/api/manageit/v1/:controller/:paramUri", {}, {              
               create: { method: "POST", url: '/api/manageit/v1/:controller/addListInterface' },            
           });
       }
]);