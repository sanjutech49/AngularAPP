(function () {
    "use strict";
    function SystemSettingsService($resource, configUrlModel) {

        function GetSettingsByInstance() {
            return $resource(configUrlModel.idpUrl + "/api/idp/v1/Instance/", {}, {
                getInstanceSettings: {
                    method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/Instance/:instanceID"
                },
                getUserInstances: {
                    method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/User/:emailId", headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            });
        }
        function GetLogsByInstance() {
            return $resource(configUrlModel.idpUrl + "/api/idp/v1/Instance/", {}, {
                getLogs: {
                    method: "GET", url: configUrlModel.idpUrl + "/api/idp/v1/Instance/log/:instanceID", isArray: true
                },
            });
        }
        function UpdateInstanceSettings() {
            return $resource(configUrlModel.idpUrl + "/api/idp/v1/Instance/", {}, {
                UpdateSettings: {
                    method: "PUT", url: configUrlModel.idpUrl + "/api/idp/v1/Instance/apsInstance/"
                },
            });
        }

        function getsystemlogsbyfilter() {
            var url = configUrlModel.idpUrl + "/api/idp/v1/Instance/systemlogsfilter?instanceId=:instanceId&type=:type&fromDate=:fromDate&toDate=:toDate&createdBy=:createdBy";
            var defaults = {};
            var actions = {
                systemlogsfilter: {
                    method: 'GET'
                    , isArray: true
                }
            };
            return $resource(url, defaults, actions).systemlogsfilter;
        }

        return {
            GetSettingsByInstance: GetSettingsByInstance(),
            GetLogsByInstance: GetLogsByInstance(),
            UpdateInstanceSettings: UpdateInstanceSettings()
            , getsystemlogsbyfilter: getsystemlogsbyfilter()
        };
    }
    systemsettingsModule.factory('SystemSettingsService', ['$resource', 'configUrlModel', SystemSettingsService]);
}());