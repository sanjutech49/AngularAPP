
(function () {
    "use strict";
    function jobBaseTypeService($resource) {

        function addJob() {
            var url = "/api/jobit/v1/job/addContentType";
            var defaults = {};
            var actions = {
                query: {
                    method: 'POST'
                }
            };
            return $resource(url, defaults, actions).query;
        }
        return {
            addJob: addJob()
          
        };

    }
    angular.module('jobit.jobs').factory('jobBaseTypeService', ['$resource', jobBaseTypeService]);
}());