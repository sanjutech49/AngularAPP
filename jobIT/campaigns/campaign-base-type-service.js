angular.module('jobit.campaign').factory("campaignBaseTypeService", [
    "$resource",
       function ($resource) {
           return $resource("/api/jobit/v1/Campaign/details", {}, {
               create: {
                   method: "POST",
                   headers: { 'Content-Type': 'application/json;charset=utf-8' },
                   url: "/api/jobit/v1/Campaign/addContentType"
               },
               getCampaigns: {
                   method: "GET",
                   url: '/api/jobit/v1/Campaign/domainDetails/:domainId',
                   isArray: true
               },
           });
       }
       
]);


