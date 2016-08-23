//This should resides under user

(function () {
    "use strict";
    function changePasswordService($resource) {
      
        function PasswordChangeService() {
            return $resource('/api/idp/v1/User/changepassword', {}, {
                update: {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    transformResponse: function (data, headers) {
                        var response = {};
                        response.data = data;
                        response.headers = headers();
                        return response;
                    }
                }
            });
        }
        function PasswordResetService() {
            return $resource('/api/idp/v1/User/restpass', {}, {
                update: {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    transformResponse: function (data, headers) {
                        var response = {};
                        response.data = data;
                        response.headers = headers();
                        return response;
                    }
                }
            });
        }
       
        return {
           
            PasswordResetService: PasswordResetService(),
            PasswordChangeService: PasswordChangeService(),
            
        };
    }
    changePasswordModule.factory('changePasswordService', ['$resource', changePasswordService]);
}());
