angular.module('jobit.flatplan').factory("flatPlanBaseTypeService", [
    "$resource",
       function ($resource) {
           return $resource("/api/jobit/v1/domain/details", {}, {
               create: { method: "POST", url: "/api/jobit/v1/FlatPlan/addFlatPlan" },
               getFlatPlanByDomain: { method: "GET", url: '#' },
           });
       }
]);