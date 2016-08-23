angular.module('jobit.flatplan').factory("flatPlanBehaviourSettingsService", [
    "$resource",
       function ($resource) {
           return $resource("/api/jobit/v1/domain/details", {}, {
               create: { method: "POST", url: "#" },
           });
       }
]);