
(function () {
    "use strict";
    function rolesModel(rolesService, $filter, $timeout, store) {
        var model = {},
            text = { pageTitle: "Roles", roleAdd: "Add Role" },
            role = { currentRole: {} },
            showErrorMessage = false,
            showSuccessMessage = false,
            UserDetails = {},
            SelectedUser = "",
            RolesAssigned = "",
            UserDetailsFetched = [],
                AssignedUsers = [],
                DeletedUsers = [];


        model.init = function () {
            model.text = text;
            model.role = role;
            model.UserDetails = UserDetails;
            model.RolesAssigned = RolesAssigned;
            model.UserDetailsFetched = UserDetailsFetched;
            model.SelectedUser = SelectedUser;
            model.copyCurrentAssignedUsers = {};
            model.copyCurrentUnassignedUsers = {};
            model.DeletedRoles = {};
            model.searchAssignedUserKey = "";
            model.searchAllRoleKey = "";
            model.showErrorMessage = showErrorMessage;
            model.showSuccessMessage = showSuccessMessage;
            model.AssignedUsers = [];
            model.DeletedUsers = [];
            model.Name = "";
            model.IsEnabled = false;
            model.IsManager = false;
            model.ShowDeleted = false;
            return model;
        };

        model.loadModel = function () {
            rolesService.getRoles({ isDeleted: true }).$promise.then(model.getAllRoles, model.getErrorLog);
        };

        model.loadAllRolesWithDeleteStatus = function () {
            if ($('#showDeletedRoles').prop('checked')) {
                if (model.DeletedRoles.length == 0) {
                    model.DeletedRoles = $filter('filter')(model.role.allRoles, { IsDeleted: "true" });
                }
                if (model.DeletedRoles && model.DeletedRoles.length > 0) {
                    var index = 0;
                    angular.forEach(model.DeletedRoles, function (role) {
                        model.role.allRoles.push(role);
                        index++;
                    });
                }
            }
            else {
                model.DeletedRoles = $filter('filter')(model.role.allRoles, { IsDeleted: "true" });
                model.role.allRoles = $filter('filter')(model.role.allRoles, { IsDeleted: "false" });
            }
        }

        model.initRolesModel = function () {
            model.newRoleHomeClick();
            model.role.createMode = true;
            model.DeletedRoles = [];
            rolesService.getRoles({ isDeleted: true }).$promise.then(model.getAllRoles, model.getErrorLog);
        };

        model.getAllRoles = function (response) {
            model.role.allRoles = JSON.parse(JSON.stringify(response));
            model.loadAllRolesWithDeleteStatus();
        };

        model.getErrorLog = function (err) {

        };

        model.searchUsers = function () {
            model.searchResults = [];
            angular.extend(model.copyCurrentUnassignedUsers, model.role.currentUnassignedUsers);
            var key = model.searchAllRoleKey;
            if (key != null && key != "") {
                for (var i = 0; i < model.role.currentUnassignedUsers.length; i++) {
                    if (model.role.currentUnassignedUsers[i].FirstName.toLowerCase().match(key.toLowerCase())) {
                        model.searchResults.push(model.role.currentUnassignedUsers[i]);
                    }

                }
                model.role.currentUnassignedUsers = model.searchResults;
            }

        };

        model.newRoleHomeClick = function () {
            model.roleHomeClick();
            model.role.createMode = true;
        };

        model.roleHomeClick = function () {
            model.role.activeTab = 'home';
            model.role.create = true;
        };

        function getRoleLogsData()
        {
            if (model.role.selectedRole) {
                if (!model.role.selectedRole.logs) {
                    model.role.logs = rolesService.getRoleLogs({ roleId: model.role.selectedRole.Name }).$promise.then(model.getRoleLogs);
                }
                else {
                    model.role.currentRoleLogs = model.role.selectedRole.logs;
                    model.ChangeLogUsers = model.role.selectedRole.ChangeLogUsers;
                }
            }
        }

        model.roleLogsClick = function () {
            model.role.activeTab = 'logs';
            model.role.showRoleLogFilter = false;
            getRoleLogsData();
        };
        model.getRoleLogs = function (data) {
            model.role.currentRoleLogs = data;
            model.role.selectedRole.logs = data;
            model.ChangeLogUsers = [];
            model.role.selectedRole.ChangeLogUsers = [];
            var previousDate = new Date().setMinutes((new Date()).getMinutes() + 15);
            for (var k = 0; k < model.role.currentRoleLogs.length; k++) {
                model.role.currentRoleLogs[k].ActionDate = model.convertUTCDateToLocalDate(model.role.currentRoleLogs[k].ActionDate);
                if (model.role.currentRoleLogs[k].ActionDate.toString() == previousDate.toString()) {
                    model.role.currentRoleLogs[k].previousDateSame = true;
                }
                else {
                    model.role.currentRoleLogs[k].previousDateSame = false;
                    previousDate = model.role.currentRoleLogs[k].ActionDate;
                }
                var changeLogUser = {};
                changeLogUser.Name = model.role.currentRoleLogs[k].ActionBy;
                if (($filter('filter')(model.ChangeLogUsers, { Name: changeLogUser.Name })).length == 0) model.ChangeLogUsers.push(changeLogUser);
            }
            previousDate = new Date().setMinutes((new Date()).getMinutes() + 15);
            for (var k = 0; k < model.role.selectedRole.logs.length; k++) {
                model.role.selectedRole.logs[k].ActionDate = model.convertUTCDateToLocalDate(model.role.selectedRole.logs[k].ActionDate);
                if (model.role.selectedRole.logs[k].ActionDate.toString() == previousDate.toString()) {
                    model.role.selectedRole.logs[k].previousDateSame = true;
                }
                else {
                    model.role.selectedRole.logs[k].previousDateSame = false;
                    previousDate = model.role.selectedRole.logs[k].ActionDate;
                }
                var changeLogUser = {};
                changeLogUser.Name = model.role.selectedRole.logs[k].ActionBy;
                if (($filter('filter')(model.role.selectedRole.ChangeLogUsers, { Name: changeLogUser.Name })).length == 0) model.role.selectedRole.ChangeLogUsers.push(changeLogUser);
            }
        };

        model.clearMessage = function () {
            model.showErrorMessage = false;
            model.showSuccessMessage = false;
            model.successMessage = "";
            model.error = "";
        };

        model.loadUsers = function () {
            var users = rolesService.getUsers({ showDeleted: false }).$promise.then(function (respData, headers) {
                model.userDetails = JSON.parse(JSON.stringify(respData));
                if (store.get("instanceId")) {
                    model.instanceId = store.get("instanceId");
                }
                for (var i = 0; i < model.userDetails.length; i++) {
                    model.userDetails[i].fullNameAndEmail = model.userDetails[i].FirstName + " " + model.userDetails[i].LastName + " " + model.userDetails[i].Email;
                    var isEnabled = false;
                    if (model.userDetails[i].ApsInstances && model.userDetails[i].ApsInstances.length > 0) {
                        for (var j = 0; j < model.userDetails[i].ApsInstances.length; j++) {
                            if (model.userDetails[i].ApsInstances[j].Id == model.instanceId) {
                                isEnabled = true;
                                break;
                            }
                        }
                    }
                    model.userDetails[i].IsEnabled = isEnabled;
                }
                model.create = 1;
                model.home = 1;
                model.edit = 2;
            });

        };


        model.showRoleDetails = function (selectedRole) {
            model.role.currentRoleLogs = [];
            model.role.createMode = false;
            var role = model.role;
            role.Name = selectedRole.Name;
            role.IsManager = selectedRole.IsManager;
            role.IsEnabled = selectedRole.IsEnabled;
            if (!selectedRole.IsEnabled && model.role.activeTab == 'users') model.role.activeTab = 'home'
            role.selectedRole = selectedRole;
            model.updateRoleUsers(true);
            getRoleLogsData();
            $timeout(function () {
                var rolesForCount = $filter('filter')(model.role.currentAssignedUsers, { IsEnabled: "true", IsDeleted: "false" });
                model.role.currentAssignedUsersCount = rolesForCount ? rolesForCount.length : 0;
            }, 1000);
        };

        model.updateRoleUsers = function (updateCurrentRole) {
            model.AssignedUsers = [];
            model.DeletedUsers = [];
            rolesService.getRole({ roleId: model.role.selectedRole.Name }).$promise.then(function (data) {
                if (updateCurrentRole) model.role.currentRole = JSON.parse(JSON.stringify(data));
                rolesService.getUsersById({ roleId: model.role.selectedRole.Name }).$promise.then(function (data) {
                    model.role.currentUnassignedUsers = [];
                    model.role.currentAssignedUsers = JSON.parse(JSON.stringify(data));
                    for (var i = 0; i < model.role.currentAssignedUsers.length; i++) {
                        model.role.currentAssignedUsers[i].fullNameAndEmail = model.role.currentAssignedUsers[i].FirstName + " " + model.role.currentAssignedUsers[i].LastName + " " + model.role.currentAssignedUsers[i].Email;
                        for (var k = 0; k < model.userDetails.length; k++) {
                            if(model.userDetails[k].Id == model.role.currentAssignedUsers[i].Id)
                            {
                                var isEnabled = false;
                                if (model.userDetails[k].ApsInstances && model.userDetails[k].ApsInstances.length > 0) {
                                    for (var j = 0; j < model.userDetails[k].ApsInstances.length; j++) {
                                        if (model.userDetails[k].ApsInstances[j].Id == model.instanceId) {
                                            isEnabled = true;
                                            break;
                                        }
                                    }
                                }
                                break;
                            }
                        }
                        model.role.currentAssignedUsers[i].IsEnabled = isEnabled;
                    }
                    angular.forEach(model.userDetails, function (user) {
                        if (!model.role.currentAssignedUsers || model.role.currentAssignedUsers.length == 0) {
                            angular.extend(model.role.currentUnassignedUsers, model.userDetails);
                        }
                        else {
                            if (!model.role.currentAssignedUsers.some(function (u) {
                                return u.Id == user.Id;
                            })) {
                                model.role.currentUnassignedUsers.push(user);
                            }
                        }
                    });
                });
            });
            model.role.selectedAllUsers = [];
            model.role.selectedAssignedUsers = [];
        }

        model.applyFilter = function (reqObject) {
            var RolesLogs = rolesService.getrolelogsbyfilter(reqObject).$promise.then(
                function (respData, headers) {
                    if (respData != null) {
                        model.role.currentRoleLogs = respData;
                        var previousDate = new Date().setMinutes((new Date()).getMinutes() + 15);
                        for (var k = 0; k < model.role.currentRoleLogs.length; k++) {
                            model.role.currentRoleLogs[k].ActionDate = model.convertUTCDateToLocalDate(model.role.currentRoleLogs[k].ActionDate);
                            if (model.role.currentRoleLogs[k].ActionDate.toString() == previousDate.toString()) {
                                model.role.currentRoleLogs[k].previousDateSame = true;
                            }
                            else {
                                model.role.currentRoleLogs[k].previousDateSame = false;
                                previousDate = model.role.currentRoleLogs[k].ActionDate;
                            }
                            var changeLogUser = {};
                            changeLogUser.Name = model.role.currentRoleLogs[k].ActionBy;
                            if (($filter('filter')(model.ChangeLogUsers, { Name: changeLogUser.Name })).length == 0) model.ChangeLogUsers.push(changeLogUser);
                        }
                    }
                }, function (err) {
                    model.showErrorMessage = true;
                    model.error = err.data.Message;
                });
        };
        model.showError = false;
        model.createSuccess = false;
        model.createRole = function () {
            var flag = true;
            var selectrole = null;
            var newRole = {
                name: model.role.currentRole.Name,
                isManager: model.role.currentRole.IsManager,
                isEnabled: model.role.currentRole.IsEnabled,
                createdBy: 'Idp',
                createdDate: new Date()
            };
            if (newRole.name && newRole.name.length > 0) {
                rolesService.addRoles(newRole).$promise.then(function (response) {
                    var isSet = false;
                    angular.forEach(model.role.allRoles, function (role) {
                        if (role.Name == model.role.currentRole.Name) {
                            role.IsDeleted = false;
                            selectrole = role;
                            isSet = true;
                        }
                    });
                    if (!isSet)
                    {
                        var deletedIndex = 0;
                        angular.forEach(model.DeletedRoles, function (role) {
                            if (role.Name == model.role.currentRole.Name && !model.ShowDeleted) {
                                role.IsDeleted = false;
                                selectrole = role;
                                model.role.allRoles.push(role);
                                model.DeletedRoles.splice(deletedIndex, 1);
                                isSet = true;
                            }
                            deletedIndex++;
                        });
                    }
                    if(!isSet) model.role.allRoles.push(response);
                    model.role.createRoleResult = true;
                    model.displaySuccessMessage("Role is created.");
                    model.role.selectedRole = isSet ? selectrole : response;
                    model.createSuccess = true;
                }, function (err) {
                    model.displayErrorMessage(err.data.Message);
                    model.role.currentRole.Name = "";
                    model.createSuccess = false;
                });
            }
        };

        model.showNewRole = function () {
            model.roleHomeClick();
            model.role.createMode = true;
            model.role.currentRole.Name = "";
            model.role.currentRole.IsManager = false;
            model.role.currentRole.IsEnabled = false;
            model.role.SelectedRole = null;
        };

        model.updateRole = function () {
            var role = model.role.currentRole;
            rolesService.updateRoles(role).$promise.then(function (response) {
                angular.forEach(model.AssignedUsers, function (userId) {
                    var user = $filter('filter')(model.userDetails, { Id: userId })[0];
                    user.roles = [];
                    user.roles.push(model.role.selectedRole);
                    rolesService.addUserRoles(user).$promise.then(function (response) {
                        user = response;
                    }, function (err) {
                        model.displayErrorMessage(err.data.Message);
                    });
                });
                angular.forEach(model.DeletedUsers, function (userId) {
                    var user = $filter('filter')(model.userDetails, { Id: userId })[0];
                    user.roles = [];
                    user.roles.push(model.role.selectedRole);
                    rolesService.removeRoles(user).$promise.then(function (response) {
                        user = response;
                    }, function (err) {
                        model.displayErrorMessage(err.data.Message);
                    });
                });

                model.displaySuccessMessage("Role updated Successfullly.");
                rolesService.getRoles({ isDeleted: true }).$promise.then(model.getAllRoles, model.getErrorLog);
                model.updateRoleUsers(true);
                getRoleLogsData();
                model.role.selectedRole = response;
            }, function (err) {
                model.displayErrorMessage(err.data.Message);
            });
        };

        model.deleteRole = function () {
            var rolesToDelete = model.role.selectedRole.Name;

            BootstrapDialog.show({
                title: '<span class="glyphicon glyphicon-warning-sign"></span>   Alert',
                message: 'Are you sure to delete the role !',
                buttons: [{
                    icon: 'glyphicon glyphicon-ok',
                    label: 'Yes',
                    cssClass: 'btn-primary',
                    autospin: true,
                    action: function (dialogRef) {
                        var deletedIndex = 0;
                        rolesService.deleteRoles({ id: rolesToDelete }).$promise.then(function (response) {
                            model.displaySuccessMessage("Role removed successfully.");
                            model.role.selectedRole = null;

                            angular.forEach(model.role.allRoles, function (role) {
                                if (role.Name == rolesToDelete && model.ShowDeleted) {
                                    role.IsDeleted = 'true';
                                    model.DeletedRoles.push(role);
                                    model.role.allRoles[deletedIndex].IsDeleted = 'true';
                                }
                                else if (role.Name == rolesToDelete && !model.ShowDeleted) {
                                    role.IsDeleted = 'true';
                                    model.DeletedRoles.push(role);
                                    model.role.allRoles.splice(deletedIndex, 1);
                                }

                                deletedIndex++;
                            });

                            model.roleHomeClick();
                            model.role.createMode = true;
                            model.role.currentRole.Name = "";
                            model.role.currentRole.IsManager = false;
                            model.role.currentRole.IsEnabled = false;
                            model.role.SelectedRole = null;

                        }, function (err) {
                            model.displayErrorMessage("Error: " + err && err.data.Message);
                        });
                        dialogRef.close();
                    }
                }, {
                    label: 'No',
                    icon: 'glyphicon glyphicon-remove',
                    action: function (dialogRef) {
                        dialogRef.close();
                    }
                }]
            });
        };

        model.assignRoleUsers = function () {
            var addedUsers = model.role.selectedAllUsers;
            angular.forEach(addedUsers, function (userId) {
                var index = model.DeletedUsers.indexOf(userId);
                if (index >= 0) {
                    model.DeletedUsers.splice(index, 1);
                }
                else {
                    model.AssignedUsers.push(userId);
                }
                var user = $filter('filter')(model.userDetails, { Id: userId })[0];
                model.role.currentAssignedUsers.push(user);
                var index = model.role.currentUnassignedUsers.indexOf(user);
                model.role.currentUnassignedUsers.splice(index, 1);
            });
            model.role.selectedAllUsers = [];
            model.displaySuccessMessage("assigned role to user.");
        };

        model.searchAssignedRoles = function () {
            angular.extend(model.copyCurrentAssignedUsers, model.role.currentAssignedUsers);
            model.searchAssignedResults = [];
            var key = model.searchAssignedUserKey;
            if (key != null && key != "") {
                for (var i = 0; i < model.role.currentAssignedUsers.length; i++) {
                    if (model.role.currentAssignedUsers[i].FirstName.toLowerCase().match(key.toLowerCase())) {
                        model.searchAssignedResults.push(model.role.currentAssignedUsers[i]);
                    }

                }
                model.role.currentAssignedUsers = model.role.searchAssignedResults;
            }
        };

        model.removeRoleUsers = function () {
            var removedUsers = model.role.selectedAssignedUsers;
            angular.forEach(removedUsers, function (userId) {
                var index = model.AssignedUsers.indexOf(userId);
                if (index >= 0) {
                    model.AssignedUsers.splice(index, 1);
                }
                else {
                    model.DeletedUsers.push(userId);
                }
                var user = $filter('filter')(model.userDetails, { Id: userId })[0];
                model.role.currentUnassignedUsers.push(user);
                var index = model.role.currentAssignedUsers.indexOf(user);
                model.role.currentAssignedUsers.splice(index, 1);
            });
            model.role.selectedAssignedUsers = [];
            model.displaySuccessMessage("removed user from role.");
        };

        model.displaySuccessMessage = function (message) {
            $timeout(function () {
                model.showSuccessMessage = true;
                model.successMessage = message;
            }, 100);
        };

        model.displayErrorMessage = function (message) {
            $timeout(function () {
                model.showErrorMessage = true;
                model.error = message;
            }, 100);
        };
        model.convertUTCDateToLocalDate = function (date) {
            var newDate = new Date(date);
            return newDate;
        }
        model.getUserRoles = function () {
            var GetAllRoles = rolesService.getRoles({ isDeleted: true }).$promise.then(
                function (respData, headers) {
                    if (respData != null) {
                        model.roles = respData;
                    }
                });
            var users = rolesService.getUserDetails.query().$promise.then(function (respData, headers) {
                model.userDetails = respData;

                for (var i = 0; i < cm.UserDetails.length; i++) {
                    if (model.userDetails[i].email == model.selectedUser) {

                        model.rolesCount = model.rolesAssigned.length;
                    }
                }
            });
            model.assignedRoles = [];
            for (var k = 0; k < model.rolesAssigned.length; k++) {
                var role = { "id": model.rolesAssigned[k].Name };
                var getAllRoles = rolesService.userRolesService.get(role).$promise.then(
                function (respData, headers) {
                    if (respData != null) {
                        model.assignedRoles = respData;
                    }
                });
            }
        };
        return model.init();
    }
    rolesModule.factory('rolesModel', ['rolesService', '$filter', '$timeout', 'store', rolesModel]);
}());