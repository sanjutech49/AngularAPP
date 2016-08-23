(function () {
    "use strict";
    //var userModule = angular.module('app');

    app.factory('authInterceptorService', ['$q', '$injector', '$location', 'store', 'jwtHelper', 'configUrlModel', 'environmentModel', function ($q, $injector, $location, store, jwtHelper, configUrlModel, environmentModel) {

        var authInterceptorServiceFactory = {};
        var apiUrl = configUrlModel.manageITUrl;
        
        var _request = function (config) {
            if (config.url.indexOf('jobit') != -1) {
                apiUrl = configUrlModel.jobITUrl;
            } else {
                apiUrl = configUrlModel.manageITUrl;
            }
            config.headers = config.headers || {};
            config.headers["Access-Control-Allow-Origin"] = "*";
            config.headers["InstanceID"] = store.get("instanceId");
            if (environmentModel.environment !== "development") {
             
                var authData = store.get('authorizationData');

                if (authData !== null && config.url !== configUrlModel.idpUrl + "/api/idp/v1/Login/getHistory" && config.url !== configUrlModel.idpUrl + "/connect/token") {
                    var Data = authData;
                    if (new Date(Data.token_expiry_time).valueOf() > new Date().valueOf()) {
                        var token = Data ? Data.access_token : null;

                        if (token) {
                            config.headers.Authorization = 'Bearer ' + token;
                        }
                    }
                    else {
                        store.remove("authorizationData");
                        window.location.href = configUrlModel.idpUrl + "/?redirectUrl=" + window.location.toString();
                    }
                }
            }
            if (config.url.indexOf(configUrlModel.idpUrl) == -1 && !/[\s\S]*.html/.test(config.url)&& !/[\s\S]*.json/.test(config.url)) {
                config.url = apiUrl + config.url;
            }
            return config;
        }

        var _responseError = function (rejection) {
            if (environmentModel.environment !== "development") {
                if (rejection.status === 401) {
                    var authData = store.get('authorizationData');

                    if (authData) {
                        if (authData.useRefreshTokens) {
                            $location.path('/refresh');
                            return $q.reject(rejection);
                        }
                    }

                    window.location.href = configUrlModel.idpUrl + "/?redirectUrl=" + window.location.toString();
                }
            }
            return $q.reject(rejection);
        };

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);


    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }]);
}());
