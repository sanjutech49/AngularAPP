(function () {
    "use strict";
    function UserProfileController($scope, $location, userProfileServices, store, SSOService, configUrlModel) {
        var userScope = this;
        var Reply = "";
        userScope.errors = {
            profileChange: [],
            passwordChange: [],
            instanceDetails: []
        };

        userScope.load = function () {

            var email = store.get('email');
            userScope.userApsInstances = [];
            userScope.user = {};
            userScope.originalUser = {};
            userProfileServices.userService.get({ id: email }).$promise.then(function (response) {
                if (response.$resolved) {
                    userScope.user.email = response.Email;
                    userScope.user.firstName = response.FirstName;
                    userScope.user.lastName = response.LastName;
                    userScope.companyName = response.companyName;
                    userScope.companyLogo = response.companyLogo;
                    userScope.originalUser = angular.copy(response);

                    userProfileServices.instanceService.get({ userId: userScope.user.email }).$promise.then(function (response) {
                        if (response.$resolved) {
                            response.forEach(function (instance) {
                                instance.isPrimary = userScope.originalUser.PrimaryInstance && (userScope.originalUser.PrimaryInstance === instance.Id || userScope.originalUser.PrimaryInstance === instance.Name);
                                if (instance.isPrimary) {
                                    userScope.instanceId = instance.Id;
                                }
                                userScope.userApsInstances.push(instance);
                            });
                        }
                    }, function (err) {
                        alert(err.data.Message);
                    });
                }
            }, function (err) {
                alert(err.data.Message);
            });

        };

        userScope.cancelProfile = function () {
            BootstrapDialog.show({
                title: '<span class="glyphicon glyphicon-warning-sign"></span>   Confirm',
                message: "You haven't saved your changes for User Profile page.  Do you want to cancel Profile page?",
                buttons: [{
                    icon: 'glyphicon glyphicon-ok',
                    label: 'Yes',
                    cssClass: 'btn-primary',
                    autospin: true,
                    action: function (dialogRef) {
                        window.location.href = store.get("baseURL");
                        dialogRef.close();
                    }
                },
                {
                    label: 'No',
                    icon: 'glyphicon glyphicon-remove',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        }

        userScope.updateProfile = function (isValid) {
            if (isValid) {
                //clear previous errors.
                userScope.clearErrors();

                var user = angular.copy(userScope.originalUser);
                user.firstName = userScope.user.firstName;
                user.lastName = userScope.user.lastName;
                user.updatedDate = new Date();
                user.updatedBy = store.get("instanceId");
                user.PrimaryInstance = userScope.instanceId;
                var isAdmin = false;
                for (var j = 0; j < userScope.originalUser.InstanceRoles.length; j++) {
                    if (userScope.originalUser.InstanceRoles[j].Role.Name == "Administrator") {
                        isAdmin = true;
                        break;
                    }
                }
                user.IsAdmin = isAdmin;
                var isEnabled = false;
                if (store.get("instanceId")) {
                    userScope.instanceId = store.get("instanceId");
                }
                if (userScope.originalUser.ApsInstances && userScope.originalUser.ApsInstances.length > 0) {
                    for (var j = 0; j < userScope.originalUser.ApsInstances.length; j++) {
                        if (userScope.originalUser.ApsInstances[j].Id == userScope.instanceId) {
                            isEnabled = true;
                            break;
                        }
                    }
                }
                user.IsEnabled = isEnabled;

                ///Check if FirstName or LastName are updated, and call the API to update.
                if ((userScope.originalUser.FirstName !== user.firstName || userScope.originalUser.LastName !== user.lastName || userScope.originalUser.PrimaryInstance !== user.PrimaryInstance) || ((!userScope.user.currentPassword && !userScope.user.newPassword && !userScope.user.confirmPassword) || (validatePassword(userScope.user.currentPassword, "Current") && validatePassword(userScope.user.newPassword, "New") && validatePassword(userScope.user.confirmPassword, "Confirm") && (userScope.user.newPassword === userScope.user.confirmPassword) && (userScope.user.currentPassword !== userScope.user.newPassword)))) {
                    if ((userScope.user.currentPassword || userScope.user.newPassword || userScope.user.confirmPassword) && (userScope.errors.passwordChange.length == 0)) {
                        if (userScope.user.newPassword === userScope.user.confirmPassword) {
                            if (userScope.user.currentPassword !== userScope.user.newPassword) {
                                user.Password = userScope.user.confirmPassword;

                                var defaults = $.param({
                                    'username': userScope.user.email,
                                    'password': userScope.user.currentPassword,
                                    'grant_type': 'password',
                                    'scope': 'offline_access profile email roles',
                                    'resource': configUrlModel.idpUrl + " " + store.get("baseURL"),
                                    'instanceId': store.get("instanceId")
                                });
                                userProfileServices.userService.login(defaults).$promise.then(function () {
                                    //Log the successful login attempt.
                                    userProfileServices.userService.updatePassword(user).$promise.then(function (response) {
                                        if (response.$resolved)
                                            userProfileServices.userService.update(user).$promise.then(function (response) {
                                                if (response.$resolved && !response.ErrorMessage) {
                                                    BootstrapDialog.show({
                                                        title: '<span class="glyphicon glyphicon-success-sign"></span>   Success',
                                                        message: 'Your profile has been updated. Click OK to return to the SBM Advertising Production System.',
                                                        buttons: [{
                                                            icon: 'glyphicon glyphicon-ok',
                                                            label: 'OK',
                                                            cssClass: 'btn-primary',
                                                            autospin: true,
                                                            action: function (dialogRef) {
                                                                dialogRef.close();
                                                                window.location.href = store.get("baseURL");
                                                            }
                                                        }]
                                                    });
                                                }
                                                else {
                                                    userScope.errors.profileChange.push("Unable to save details. Please try after some time.");
                                                    angular.forEach(response.ErrorMessage, function (err) {
                                                        userScope.errors.profileChange.push(err.Message);
                                                    });
                                                }
                                            }, function (err) {
                                                userScope.errors.profileChange.push(err.data.Message);
                                            });
                                    }, function (err) {
                                        userScope.errors.passwordChange.push(err.data.Message == 'Invalid credentials' ? "Invalid current password" : err.data.Message);
                                    });

                                }, function (err) {
                                    userScope.errors.passwordChange.push(err.data.Message == 'Invalid credentials' ? "Invalid current password" : err.data.Message);
                                });
                            }
                            else {
                                userScope.errors.passwordChange.push("Current password is matching with the new password");
                            }
                        }
                        else {
                            userScope.errors.passwordChange.push("New Password and confirm password do not match.");
                        }
                    }
                    else
                        if (userScope.originalUser.FirstName !== user.firstName || userScope.originalUser.LastName !== user.lastName || userScope.originalUser.PrimaryInstance !== user.PrimaryInstance) {
                            userProfileServices.userService.update(user).$promise.then(function (response) {
                                if (response.$resolved && !response.ErrorMessage) {
                                    BootstrapDialog.show({
                                        title: '<span class="glyphicon glyphicon-success-sign"></span>   Success',
                                        message: 'Your profile has been updated. Click OK to return to the SBM Advertising Production System.',
                                        buttons: [{
                                            icon: 'glyphicon glyphicon-ok',
                                            label: 'OK',
                                            cssClass: 'btn-primary',
                                            autospin: true,
                                            action: function (dialogRef) {
                                                dialogRef.close();
                                                window.location.href = store.get("baseURL");
                                            }
                                        }]
                                    });
                                }
                                else {
                                    userScope.errors.profileChange.push("Unable to save details. Please try after some time.");
                                    angular.forEach(response.ErrorMessage, function (err) {
                                        userScope.errors.profileChange.push(err.Message);
                                    });
                                }
                            }, function (err) {
                                userScope.errors.profileChange.push(err.data.Message);
                            });
                        }
                }
                else {
                    //$scope.errors.profileChange.push("Please make changes and try again.");
                }
            }
            else {
                userScope.errors.passwordChange.push("Please correct errors.");
            }
        };

        userScope.selectPrimaryInstance = function (instance) {
            userScope.userApsInstances.forEach(function (instance) {
                instance.isPrimary = false;
            });
            userScope.instanceId = instance.Id;
            instance.isPrimary = true;
        };

        userScope.clearFields = function (result) {
            userScope.clearErrors();
            userScope.user.firstName = userScope.originalUser.firstName;
            userScope.user.lastName = userScope.originalUser.lastName;
            userScope.user.email = userScope.originalUser.email;
            userScope.user.currentPassword = '';
            userScope.user.newPassword = '';
            userScope.user.confirmPassword = '';
            userScope.userDetailsEditSuccess = undefined;
            userScope.userChangePasswordSuccess = undefined;
        };

        function validatePassword(pass, type) {
            var str = pass;
            if (!str) {
                userScope.errors.passwordChange.push(type + " Password field is mandatory!");
                return false;
            }
            else if (str.length < 8) {
                userScope.errors.passwordChange.push(type + " Password is too short!");
                return false;
            } else if (str.length > 50) {
                userScope.errors.passwordChange.push(type + " Password is too long");
                return false;
            } else if (str.search(/\d/) === -1) {
                userScope.errors.passwordChange.push(type + " Password should contain atleast a number");
                return false;
            } else if (str.search(/[a-z]/) === -1) {
                userScope.errors.passwordChange.push(type + " Password should contain atleast an lower alphabet");
                return false;
            }
            else if (str.search(/[A-Z]/) === -1) {
                userScope.errors.passwordChange.push(type + " Password should contain atleast an upper alphabet");
                return false;
            } else if (str.search(/[*@!#%&()^~{}]+/) === -1) {
                userScope.errors.passwordChange.push(type + " Password should contain atleast one special characters");
                return false;
            }

            return true;
        }

        userScope.clearErrors = function () {
            userScope.errors.profileChange = [];
            userScope.errors.passwordChange = [];
            userScope.errors.instanceDetails = [];
        }
    }
    userProfileModule.controller('UserProfileController', ['$scope', '$location', 'userProfileServices', 'store', 'SSOService', 'configUrlModel', UserProfileController]);
}());