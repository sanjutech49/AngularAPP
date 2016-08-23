(function () {
    "use strict";
    function SystemSettingsController($scope, $location, $filter, store, $rootScope, SystemSettingsService, model, SSOService) {
        var vm = $scope;
        vm.instances = [];
        vm.SettingsInfo = 0;
        vm.LogsInfo = 0;
        vm.systemSettings = {};
        vm.model = model;
        vm.fromdateOptions = { maxDate: new Date() }
        vm.todateOptions = { maxDate: new Date() }
        vm.todayDate = (new Date()).toISOString();

        vm.refreshClient = function (client) {
            $scope.clientLogo = client.clientLogo;
            store.set("Client", client);
        }

        vm.CloseSettings = function () {
            vm.systemSettings.activeTab = 'settings';
            vm.SettingsInfo = 1;
            vm.LogsInfo = 0;
            vm.SystemSettings();
        }

        vm.convertUTCDateToLocalDate = function (date) {
            var newDate = new Date(date);
            return newDate;
        }

        vm.SystemSettings = function () {
            vm.systemSettings.activeTab = 'settings';
            vm.SettingsInfo = 1;
            vm.LogsInfo = 0;
            vm.UserEmail = store.get("email");
            var emailid = { "emailId": vm.UserEmail };
            var instanceReq = SystemSettingsService.GetSettingsByInstance.getUserInstances(emailid).$promise.then(function (respData, headers) {
                $scope.instances = respData.ApsInstances;
                var URL = getUrl();
                $scope.instancesTemp = [];
                var instObj = {};
                for (var k = 0; k < $scope.instances.length ; k++) {
                    if (URL == $scope.instances[k].Id) {

                        instObj.FromEmail = $scope.instances[k].FromEmail;
                        instObj.FromName = $scope.instances[k].FromName;
                        instObj.HostName = $scope.instances[k].HostName;
                        instObj.Id = $scope.instances[k].Id;
                        instObj.InstanceType = $scope.instances[k].InstanceType;
                        instObj.Logo = URL + "/images/" + $scope.instances[k].Logo;
                        instObj.Name = $scope.instances[k].Name;
                        instObj.SessionDurationTimeout = $scope.instances[k].SessionDurationTimeout;
                        instObj.TempPasswordExpiryTime = $scope.instances[k].TempPasswordExpiryTime;
                    }

                    vm.clientDetails = store.get("Client");
                    if (vm.clientDetails != null && vm.clientDetails != "undefined") {
                        vm.sessionTimeout = vm.clientDetails.SessionDurationTimeout;
                        vm.TempPassword = vm.clientDetails.TempPasswordExpiryTime;
                        vm.FromName = vm.clientDetails.FromName;
                        vm.FromEmail = vm.clientDetails.FromEmail;
                        vm.HostName = vm.clientDetails.HostName;
                        vm.InstanceId = vm.clientDetails.Id;
                        vm.Name = vm.clientDetails.Name;
                    }
                    else {
                        vm.sessionTimeout = instObj.SessionDurationTimeout;
                        vm.TempPassword = instObj.TempPasswordExpiryTime;
                        vm.FromName = instObj.FromName;
                        vm.FromEmail = instObj.FromEmail;
                        vm.HostName = instObj.HostName;
                        vm.InstanceId = instObj.Id;
                        vm.Name = instObj.Name;
                    }
                }
                vm.ChangeLogUsers = [];
                getLogsData();
            });
        };
        vm.showcalendarFrom = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.showfromdp = true;
        };

        vm.showcalendarTo = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.showtodp = true;
        };
        vm.settings = function () {
            vm.systemSettings.activeTab = 'settings';
            vm.SettingsInfo = 1;
            vm.LogsInfo = 0;
            vm.SystemSettings();
        };
        vm.logs = function () {
            vm.systemSettings.activeTab = 'logs';
            vm.SettingsInfo = 0;
            vm.LogsInfo = 1;
            vm.ChangeLogUsers = [];
            getLogsData();
            model.type = "";
            $("#expdate5").val('');
            $("#expdate6").val('');
            vm.PreviousType = "";
            vm.PreviousCreatedBy = "";
            vm.PreviousFromDate = "";
            vm.PreviousToDate = "";
        };

        function getLogsData()
        {
            var instanceID = { "instanceID": vm.InstanceId };
            var instanceLogs = SystemSettingsService.GetLogsByInstance.getLogs(instanceID).$promise.then(function (respData, headers) {
                vm.SystemLogs = respData;
                var previousDate = new Date().setMinutes((new Date()).getMinutes() + 15);
                for (var k = 0; k < vm.SystemLogs.length; k++) {
                    vm.SystemLogs[k].ActionDate = vm.convertUTCDateToLocalDate(vm.SystemLogs[k].ActionDate);
                    if (vm.SystemLogs[k].ActionDate.toString() == previousDate.toString()) {
                        vm.SystemLogs[k].previousDateSame = true;
                    }
                    else {
                        vm.SystemLogs[k].previousDateSame = false;
                        previousDate = vm.SystemLogs[k].ActionDate;
                    }
                    var changeLogUser = {};
                    changeLogUser.Name = vm.SystemLogs[k].ActionBy;
                    var records = $filter('filter')(vm.ChangeLogUsers, { Name: changeLogUser.Name });
                    if (!records || records.length == 0) vm.ChangeLogUsers.push(changeLogUser);
                }
            });
        }

        vm.SaveSettings = function () {
            var instnObj = {};
            instnObj.SessionDurationTimeout = vm.sessionTimeout;
            instnObj.TempPasswordExpiryTime = vm.TempPassword;
            instnObj.FromName = vm.FromName;
            instnObj.FromEmail = vm.FromEmail;
            instnObj.HostName = vm.HostName;
            instnObj.Id = vm.InstanceId;
            SystemSettingsService.UpdateInstanceSettings.UpdateSettings(instnObj).$promise.then(function (respData, headers) {
                vm.model.showSuccessMessage = true;
                vm.model.successMessage = "Instance Details Updated successfully";
                var tokenData = store.get("authorizationData");
                if (tokenData) {
                    var data = "grant_type=refresh_token&refresh_token=" + tokenData.refresh_token + "&instanceId=" + vm.InstanceId;
                    var Response = SSOService.LoginIDP.getToken(data).$promise.then(function (respData, headers) {
                        store.set("authorizationData", respData);
                    });
                }
            }, function (err) {
                model.showErrorMessage = true;
                model.error = err.data.Message;
            });
        };
        vm.clearMessage = function () {
            vm.model.showErrorMessage = false;
            vm.model.showSuccessMessage = false;
            vm.model.successMessage = "";
            vm.model.error = "";
        };
        vm.activate = function () {
            if (!(vm.sessionTimeout && vm.sessionTimeout !== "" && vm.sessionTimeout >= 15 && vm.TempPassword && vm.TempPassword !== "" &&
                vm.FromName && vm.FromName !== "" && vm.FromEmail && vm.FromEmail !== "" && vm.emailvalidation.test(vm.FromEmail))) {
                if (!vm.sessionTimeout || vm.sessionTimeout == "") {
                    model.showErrorMessage = true;
                    model.error = "Session Timeout(Minutes) field is mandatory";
                }
                else if (vm.sessionTimeout < 15) {
                    model.showErrorMessage = true;
                    model.error = "Session Timeout(Minutes) field value must be greater than 15";
                }
                else if (!vm.TempPassword || vm.TempPassword == "") {
                    model.showErrorMessage = true;
                    model.error = "Temporary Password Expiry(Hours) field is mandatory";
                }
                else if (!vm.FromName || vm.FromName == "") {
                    model.showErrorMessage = true;
                    model.error = "From Name field is mandatory";
                }
                else if (!vm.FromEmail || vm.FromEmail == "") {
                    model.showErrorMessage = true;
                    model.error = "From Email field is mandatory";
                }
                else if (vm.FromEmail != "") {
                    model.showErrorMessage = true;
                    model.error = "From Email field is invalid";
                }
                return true;
            }
            else {
                model.showErrorMessage = false;
                model.error = "";
                return false;
            }
        };
        var getUrl = function () {
            var Url = null;
            var subdomain = $location.$$url

            if (subdomain.length > 1) {
                Url = subdomain.slice(1);
            }
            else {
                Url = $location.$$host

            }

            return Url;

        };
        vm.emailvalidation = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,6}$/;
        vm.showFilter = false;
        vm.PreviousType = "";
        vm.PreviousCreatedBy = "";
        vm.PreviousFromDate = "";
        vm.PreviousToDate = "";
        vm.ShowFilter = function () {
            vm.showFilter = !vm.showFilter;
        };
        vm.applyFilter = function () {
            var reqObject = {};
            var instanceID = { "instanceID": vm.InstanceId };
            reqObject.instanceId = instanceID.instanceID;
            reqObject.type = vm.type;
            reqObject.createdBy = vm.User;
            reqObject.fromDate = $("#expdate5").val();
            reqObject.toDate = $("#expdate6").val() + " 23:59:59";
            var SystemLogs = SystemSettingsService.getsystemlogsbyfilter(reqObject).$promise.then(
            function (respData, headers) {
                if (respData !== null) {
                    vm.SystemLogs = respData;
                    var previousDate = new Date().setMinutes((new Date()).getMinutes() + 15);
                    for (var k = 0; k < vm.SystemLogs.length; k++) {
                        vm.SystemLogs[k].ActionDate = vm.convertUTCDateToLocalDate(vm.SystemLogs[k].ActionDate);
                        if (vm.SystemLogs[k].ActionDate.toString() == previousDate.toString()) {
                            vm.SystemLogs[k].previousDateSame = true;
                        }
                        else {
                            vm.SystemLogs[k].previousDateSame = false;
                            previousDate = vm.SystemLogs[k].ActionDate;
                        }
                        var changeLogUser = {};
                        changeLogUser.Name = vm.SystemLogs[k].ActionBy;
                        if (($filter('filter')(vm.ChangeLogUsers, { Name: changeLogUser.Name })).length == 0) vm.ChangeLogUsers.push(changeLogUser);
                    }
                }
            }, function (err) {
                model.showErrorMessage = true;
                model.error = err.data.Message;
            });
            vm.PreviousType = reqObject.type;
            vm.PreviousCreatedBy = reqObject.createdBy;
            vm.PreviousFromDate = reqObject.fromDate;
            vm.PreviousToDate = reqObject.toDate;
            vm.showFilter = !vm.showFilter;
        };

        vm.removeFilter = function () {
            vm.type = vm.PreviousType;
            $("#expdate5").val(vm.PreviousFromDate);
            $("#expdate6").val(vm.PreviousToDate);
        };
    }
    systemsettingsModule.controller('SystemSettingsController', ['$scope', '$location', '$filter', 'store', '$rootScope', 'SystemSettingsService', 'SystemSettingsModel', 'SSOService', SystemSettingsController]);
}());

systemsettingsModule.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9-]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
