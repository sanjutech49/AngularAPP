angular.module('jobit.flatplan').factory("addFlatPlanService", [
    "$resource",
       function ($resource) {
           return $resource("/api/jobit/v1/domain/details", {}, {
               create: {
                   method: "POST",
                   headers: { 'content-type': 'application/json' },
                   url: "/api/jobit/v1/Setting/addSetting",
               },
               createDetails: { method: "POST", url: "#" },
               editDetails: { method: "POST", url: "#" },
               getAdvertisements: { method: "GET", url: "#" },
               loadPreset: { method: "GET", url: "#" },
               savePreset: { method: "GET", url: "#" },
               getFlatPlanById: { method: "GET", url: "/api/jobit/v1/flatplan/detail/:flatPlanId" }
           });
       }
]);