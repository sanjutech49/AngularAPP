(function () {
    "use strict";
    function userProfileServices($resource, configUrlModel) {
        function userService() {
            var apiBasePath = configUrlModel.idpUrl + '/api/idp/v1/User';
            return $resource(apiBasePath, {}, {
                login:{method: 'POST', url: configUrlModel.idpUrl + '/connect/token',headers: { 'Content-Type': 'application/x-www-form-urlencoded' }},
                query: { method: 'GET', url: apiBasePath, isArray: true },
                create: { method: 'POST' },
                get: { method: 'GET', url: apiBasePath + '/:id' },
                update: { method: 'PUT', url: apiBasePath },
                updatePassword: { method: 'POST', url: apiBasePath + '/changepassword' }
            });
        }


        function instanceService() {
            var apiBasePath = configUrlModel.idpUrl + '/api/idp/v1/instance';
            return $resource(apiBasePath, {}, {
                query: { method: 'GET', url: apiBasePath, isArray: true },
                get: { method: 'GET', url: apiBasePath + '/userInstances/:userId', isArray: true }
            });
        }

        
            return {
                userService: userService(),
                instanceService: instanceService()
              
            };
        
    }
        userProfileModule.factory('userProfileServices', ['$resource', 'configUrlModel',userProfileServices]);
    }());