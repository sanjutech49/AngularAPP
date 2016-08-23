app.controller("commonController", ['$http', '$scope', '$timeout', 'defaultSettingsService', 'store', 'jwtHelper', 'SSOService', 'sharedScope', 'configUrlModel', '$location', '$filter', '$timeout', 'environmentModel', 'instanceInfo', '$rootScope', '$uibModal', function ($http, $scope, $timeout, defaultSettingsService, store, jwtHelper, SSOService, sharedScope, configUrlModel, $location, $filter, $timeout, environmentModel, instanceInfoSvc, $rootScope, $uibModal) {
    $scope.userEmail = "";
    var authenticated = false;
    var storageKey = "authorizationData";
    var apiServiceBaseUri = window.location.toString().substring(0, window.location.toString().indexOf(window.location.pathname));
    $scope._IPAddress = [];
    $scope.instances = [];
    $scope.instancesTemp = [];
    $scope.instanceId = "";
    $scope.isauthenticated = false;
    $scope.isDev = false;
    $scope.moduleName = '';
  
    $scope.IsAuthenticatedUser = function () {
        //To Get the Token details from History
       
        if (environmentModel.environment === "development") {
            $scope.isDev = true;
            $scope.isauthenticated = true;
            $rootScope.isAdmin = true;
            $rootScope.envMode = environmentModel.environment;
            defaultSettingsService.get().$promise.then(function (details) {

                $scope.companyName = details.companyName;
                $scope.companyLogo = details.companyLogo;
                $scope.clientLogo = details.companyLogo;
                $scope.userEmail = details.userEmail;
                $scope.instances = details.instances;

                angular.forEach(details.configurationMenu, function (value, key) {
                    

                    if (value.permissions.isvisible == "true")
                        $scope.configList.push(value);
                });

                angular.forEach(details.mainNavigationModules, function (value, key) {
                    if (value.isvisible == "true")
                        $scope.mainNavModules.push(value);
                });
                instanceInfoSvc.set(details.mainNavigationModules);
            });
        }
        else {
            var Response = SSOService.IsUserLoggedIn.getuserlogin().$promise.then(function (respData, headers) {

                if (respData) {
                    var userInstances = store.get("UserInstances");

                    if (getUrl()) {
                        $scope.instanceId = getUrl();
                    }
                    else {
                        $scope.instanceId = respData.InstanceId;
                    }

                    if (userInstances) {
                        var localInstance = $filter('filter')(userInstances, { key: $scope.instanceId })[0];
                        if (localInstance) {
                            $scope.instanceId = localInstance.key;
                            store.set("instanceId", $scope.instanceId)
                        }
                        else {
                            $scope.instanceId = store.get("instanceId")
                        }
                    }
                    $scope.userEmail = respData.Email,

                    authenticated = true;
                    //Verify Token is valid and not expired
                    if (new Date(respData.TokenExpiryTime).valueOf() > new Date().valueOf()) {
                        store.set("instanceId", $scope.instanceId);
                        //get new refresh token for all the usage in this mangeit to webapi calls
                        var data = "grant_type=refresh_token&refresh_token=" + respData.RToken + "&instanceId=" + $scope.instanceId;
                        var Response = SSOService.LoginIDP.getToken(data).$promise.then(function (respData, headers) {
                            store.set(storageKey, respData);
                            var emailid = { "emailId": $scope.userEmail };
                            store.set("email", $scope.userEmail);
                            $rootScope.loggedInUserEmail = $scope.userEmail;
                            //To Get the Token details from History
                            var instanceReq = SSOService.IsUserLoggedIn.getInstances(emailid).$promise.then(function (respData, headers) {
                                
                                $scope.isauthenticated = true;
                                var isAdmin = false;
                                //console.log('respData');
                                //console.log(respData);
                                for (var j = 0; j < respData.InstanceRoles.length; j++) {
                                    if (respData.InstanceRoles[j].InstanceId == $scope.instanceId && (respData.InstanceRoles[j].Role.Name == "Administrator" || respData.InstanceRoles[j].Role.IsContentAdmin == true)) {
                                        isAdmin = true;
                                        break;
                                    }
                                }
                               $rootScope.isAdmin = isAdmin;

                               //$rootScope.isAdmin = false;
                               $rootScope.userRoleTypes = [];
                               if (!$rootScope.isAdmin) {
                                   angular.forEach(respData.InstanceRoles, function (value, key) {
                                            if (value.InstanceId == 'localhost') {
                                                $rootScope.userRoleTypes.push(value['Role']['Name']);
                                            }
                                        });
                                }                             

                                $scope.instances = respData.ApsInstances;
                                instanceInfoSvc.set($scope.instances);
                                var URL = window.location.toString();
                                $scope.instancesTemp = [];
                                var instancdIdTemp = [];
                                for (var k = 0; k < $scope.instances.length ; k++) {
                                    var instObj = {};
                                    instObj.FromEmail = $scope.instances[k].FromEmail;
                                    instObj.FromName = $scope.instances[k].FromName;
                                    instObj.HostName = $scope.instances[k].HostName;
                                    instObj.Id = $scope.instances[k].Id;
                                    instancdIdTemp.push({ key: instObj.Id, value: $scope.instances[k].Name });
                                    instObj.InstanceType = $scope.instances[k].InstanceType;
                                    instObj.Logo = URL + "/images/" + $scope.instances[k].Logo;
                                    instObj.Name = $scope.instances[k].Name;
                                    instObj.SessionDurationTimeout = $scope.instances[k].SessionDurationTimeout;
                                    instObj.TempPasswordExpiryTime = $scope.instances[k].TempPasswordExpiryTime;
                                    $scope.instancesTemp.push(instObj);

                                }
                                store.set("UserInstances", instancdIdTemp);
                                SSOService.getAllInstancesbyId({ 'id': $scope.instanceId }).$promise.then(function (respData, headers) {
                                    $scope.companyName = respData.Name;
                                    $scope.companyLogo = respData.Logo;
                                    $scope.clientLogo = respData.Logo;
                                    SSOService.getInstancesbyId({ 'instanceId': $scope.instanceId }).$promise.then(function (respData, headers) {
                                        instanceInfoSvc.set(respData);
                                        angular.forEach(respData, function (value, key) {
                                            $scope.configList.push(value);
                                            $scope.mainNavModules.push(value);

                                        });
                                    }, function (err) {
                                        $scope.showMessage("Error: " + err.data.Message);
                                    });
                                }, function (err) {
                                    $scope.showMessage("Error: " + err.data.Message);
                                });
                            }, function (err) {
                                $scope.showMessage("Error: " + err.data.Message);
                            });
                        }, function (err) {
                            $scope.showMessage("Error: " + err.data.Message);
                        });
                    }
                    else {
                        $scope.showMessage("Token is expired or user is not logged in. please log in again.");
                    }
                }
                else {
                    authenticated = false;
                    $scope.showMessage("Token is expired or user is not logged in. please log in again.");

                }



            }, function (err) {
                $scope.showMessage("Error: " + err.data.Message);
            });
        }
        setCurrentModule();
    };

    $scope.showUser = function () {
        $('#userModal').modal({
            backdrop: 'static',
            keyboard: true,
            show: true
        });
    };

    $scope.showRole = function () {
        $('#rolesModal').modal({
            backdrop: 'static',
            keyboard: true,
            show: true
        });
        $timeout(function () {
            $('#roleName').focus();
        }, 500);
    };
    $scope.showSettings = function () {
        $('#settingsModal').modal({
            backdrop: 'static',
            keyboard: true,
            show: true
        });
    };
    $scope.showConfig = function (id) {
        if (id === "manageit") {
            var modalInstance = $uibModal.open({
                templateUrl: '/manageIT/common/partials/manageit-settings.html',
                controller: 'manageITController'
                
            });
        }
        else if (id === "jobit") {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/jobit-configuration/partials/jobit-configuration.html',
                controller: 'jobitConfigurationController as jbcc',
                windowClass: 'jobit-modal-width1000 attribute-container add-sub-object-main'
            });
        }
        else if (id === "WorkflowiT") {
            var modalInstance = $uibModal.open({
                templateUrl: 'workflowIT/workflowit-configuration/partials/workflowit-configuration.html',
                controller: 'workflowitConfigurationController as wfcc'
            });
        }
    };

    $scope.SetFocus = function () {
        $timeout(function () {
            $('#email').focus();
            $('#usererrormessage').click();
        }, 500);
    };
    
    $scope.configList = [];
    $scope.mainNavModules = [];
    $scope.isManageIT = false;
    $scope.isJobIT = false;
    $scope.isWokflowIT = false;
    $scope.selectedClientDetails = "";
    $scope.showManageIT = function () {
        $scope.isManageIT = true;
        $scope.isJobIT = true;
        $scope.isWokflowIT = true;
        //Clearing the domains and sequences (ManageiT-27)
        var domainController = sharedScope.get('domainController');
        var sequenceController = sharedScope.get('sequenceController');
        if (domainController) {
            domainController.clearDomainFields();
        }
        if (sequenceController) {
            sequenceController.clearSequenceFields();
        }
    }  

    $scope.refreshClient = function (client) {
        // $scope.clientLogo = client.clientLogo;
        //$location.path("/" + client.Id);
        window.location.href = window.location.protocol + "//" + client.Id + ":5050/";
      // store.set("Client", client);
    }

    var getUrl = function () {
        var Url = null;
        var subdomain = $location.$$url

        if (subdomain.length>1) {
            Url = subdomain.slice(1);
        }
        else {
            Url = $location.$$host;
           // Url = "IDP";

        }
        //if (Url === 'localhost') {
        //    Url = "IDP";
        //}

        return Url;

    };

    var setCurrentModule = function () {
       
        var subdomain = $location.$$url
        if (subdomain.indexOf("ManageIT") !== -1) {
            $scope.moduleName = 'manageit';
        }
        else if (subdomain.indexOf("editprofile") !== -1 || subdomain.indexOf("changepassword") !== -1) {
            $scope.moduleName = "admin";
        }
        
    };
    
    $scope.Logout = function () {
        var loginHistory = {};
        loginHistory.Email = $scope.userEmail;
        loginHistory.IPAddress = $scope._IPAddress;
        //isLoginSuccessful: authService.isisLoggedIn(),
        loginHistory.IsLoginSuccess = false;
        loginHistory.RToken = '';
        loginHistory.AToken = '';
        
        SSOService.Logout.addLogout().$promise.then(function (resp, headers) {
            store.remove("authorizationData");
             store.remove("user");
            window.location.href = configUrlModel.idpUrl + "?redirectUrl=" + window.location.toString();
        });
    };

    $scope.editProfile = function () {
        $scope.isManageIT = false;
        $scope.moduleName = "admin";
        store.set("baseURL", $location.$$absUrl);
        $timeout(function () {
            $location.path("/editprofile");
        }, 500);
    };

    $scope.changePassword = function () {
        $scope.isManageIT = false;
        $scope.moduleName = "admin";
        store.set("baseURL", $location.$$absUrl);
        $timeout(function () {
            $location.path("/changepassword");
        }, 500);
    };
          
    
    $scope.loadPage = function (page) {
        $scope.isManageIT = true;
        $scope.moduleName = page;
        var rightController = sharedScope.get('rightMenuController');
        if (rightController != null)
            rightController.loadDomains('domain');
    };

    $scope.showMessage = function (message) {
        BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-warning-sign"></span>   Alert',
            message: message,
            buttons: [{
                icon: 'glyphicon glyphicon-ok',
                label: 'OK',
                cssClass: 'btn-primary',
                autospin: true,
                action: function (dialogRef) {
                    dialogRef.close();
                    store.remove("authorizationData");
                    window.location.href = configUrlModel.idpUrl + "?redirectUrl=" + window.location.toString();
                }
            }]
        });
    }

}]);

