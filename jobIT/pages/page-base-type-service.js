
(function () {
    "use strict";
    function pageBaseTypeService($resource) {

        function add() {
            var url = "/api/jobit/v1/Page/addPage";
            var defaults = {};
            var actions = {
                query: {
                    method: 'POST'
                }
            };
            return $resource(url, defaults, actions).query;
        }
        return {
            addPage: add()
        };

    }
    angular.module('jobit.pages').factory('pageBaseTypeService', ['$resource', pageBaseTypeService]);
}());