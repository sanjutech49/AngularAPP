//This should resides under user

(function () {
    "use strict";
    function SSOService($resource, configUrlModel) {

        function IsUserLoggedIn() {
            return $resource(configUrlModel.idpUrl + "/api/idp/v1/Login/", {}, {
                getuserlogin: {
                    method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/Login/getHistory/", withCredentials: true, headers: {
                        'Access-Control-Allow-Credentials': true
                    }
                },
                getInstances: {
                    method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/getUserInstances/:emailId"
                }
            });
        }

        function LoginIDP() {
            return $resource(configUrlModel.idpUrl + '/connect/token', {}, {
                getToken: {
                    method: 'POST',
                    skipAuthorization: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }
            });
        }
        function Logout() {
            return $resource(configUrlModel.idpUrl + '/api/idp/v1/Login/removeHistory', {}, {
                addLogout: {
                    method: 'GET', withCredentials: true, headers: {
                        'Access-Control-Allow-Credentials': true
                    }
                }
            });
        }
        function getInstancesbyId() {
            var url = configUrlModel.idpUrl + '/api/idp/v1/Instance/apsInstanceModules/:instanceId';
            var defaults = { instanceId: '@instanceId' };
            var actions = {
                instance: {
                    method: 'GET', isArray: true

                }
            };
            return $resource(url, defaults, actions).instance;
        }

        function getAllInstancesbyId() {
            var url = configUrlModel.idpUrl + '/api/idp/v1/Instance/apsInstance/:id';
            var defaults = { id: '@id' };
            var actions = {
                instance: {
                    method: 'GET'

                }
            };
            return $resource(url, defaults, actions).instance;
        }


        return {
            LoginIDP: LoginIDP(),
            IsUserLoggedIn: IsUserLoggedIn(),
            Logout: Logout(),
            getInstancesbyId: getInstancesbyId(),
            getAllInstancesbyId: getAllInstancesbyId()
        };
    }
    manageitModule.factory('SSOService', ['$resource', 'configUrlModel', SSOService]);
}());
