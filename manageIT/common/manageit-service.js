manageitModule.factory("defaultSettingsService", ['$resource', 'configUrlModel', function ($resource, configUrlModel) {
    return {
        get: function () {
            return $resource("/framework/frameworkconfig.json").get();
        },
        getEnvironment: function () {
            return $resource("/framework/environment.json").get();
        }
    }
}]);


manageitModule.service('sharedScope', function () {
    var mem = {};

    return {
        store: function (key, value) {
            if (!(key in mem)) {
                mem[key] = value;
            }
        },
        get: function (key) {
            return mem[key];
        }
    }
});

manageitModule.service('newSharedScope', function () {
    var mem2 = {};

    return {
        store: function (key, value) {
            mem2[key] = value;
        },
        get: function (key) {
            return mem2[key];
        }
    }
});

manageitModule.factory('$remember', function () {
    function fetchValue(name) {
        var gCookieVal = document.cookie.split("; ");
        for (var i = 0; i < gCookieVal.length; i++) {
            // a name/value i.e., the keys is variable name and value is what we want to store are stored as an pair (a crumb) is separated by an equal sign
            var gCrumb = gCookieVal[i].split("=");
            if (name === gCrumb[0]) {
                var value = '';
                try {
                    value = angular.fromJson(gCrumb[1]);
                } catch (e) {
                    value = unescape(gCrumb[1]);
                }
                return value;
            }
        }
        // a cookie with the requested name does not exist
        return null;
    }
    return function (name, values) {
        if (arguments.length === 1) return fetchValue(name);
        var cookie = name + '=';
        if (typeof values === 'object') {
            var expires = '';
            cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
            if (values.expires) {
                var date = new Date();
                date.setTime(date.getTime() + (values.expires * 24 * 60 * 60 * 1000));
                expires = date.toGMTString();
            }
            cookie += (!values.session) ? 'expires=' + expires + ';' : '';
            cookie += (values.path) ? 'path=' + values.path + ';' : '';
            cookie += (values.secure) ? 'secure;' : '';
        } else {
            cookie += values + ';';
        }
        document.cookie = cookie;
    }
});

manageitModule.factory("getUserDetails", function ($resource) {
    return $resource(configUrlModel.idpUrl + "/api/idp/v1/User/iploginhistory/", {}, {
        getuserloginhistory: { method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/iploginhistory/" },
    });
});
manageitModule.factory('LoginService', function ($resource) {
    return $resource(configUrlModel.idpUrl + '/connect/token', {}, {
        getToken: {
            method: 'POST',
            skipAuthorization: true,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            transformResponse: function (data, headers) {
                var response = {};
                response.data = data;
                response.headers = headers();
                return response;
            }
        }
    });
});

