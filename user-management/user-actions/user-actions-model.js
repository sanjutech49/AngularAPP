(function () {
    "use strict";
    function userActionsModel(userActionService, $filter, store, $timeout) {
        var model = {},
            user = {},
            Roles = {},
            UserDetails = [],
            AssignedRoles = [],
            AssignedModules = [],
            loading = false,
            SelectedUser = "",
             showErrorMessage = false,
            showSuccessMessage = false,
            instanceId = "",
            successMessage = "",
            error = "",
            showEmployeeDetails = false,
            clickedAdd = false,
            text = { pageTitle: "user", roleAdd: "Manage User" },
            UserAssignedRoles = [],
            UserAssignedModules = [],
                DeletedRoles = [],
                DeletedModules = [];
        model.init = function () {
            model.text = text;
            model.user = user;
            model.Roles = Roles;
            model.showErrorMessage = showErrorMessage;
            model.showSuccessMessage = showSuccessMessage;
            model.successMessage = successMessage;
            model.error = error;
            model.SelectedUser = SelectedUser;
            model.instanceId = instanceId;
            model.AssignedModules = AssignedModules;
            model.UserAssignedRoles = [];
            model.UserAssignedModules = [];
            model.DeletedRoles = [];
            model.DeletedModules = [];
            model.UserDetails = UserDetails;
            model.SearchAssignedModuleKey = "";
            model.SearchAllModuleKey = "";
            model.SearchAssignedRoleKey = "";
            model.SearchAllRoleKey = "";
            model.SearchKey = "";
            model.UserEmail = "";
            model.FirstName = "";
            model.LastName = "";
            model.IsAdmin = false;
            model.IsEnabled = false;
            model.showdp = false;
            model.isDeleted = false;
            model.dt = new Date();
            model.loading = loading;
            model.showEmployeeDetails = showEmployeeDetails;
            return model;
        };


        model.addUser = function () {

            model.SelectedUser = "";
            model.homeClick();
            model.user.Create = 1;
            model.user.Edit = 0;
            model.UserEmail = "";
            model.FirstName = "";
            model.LastName = "";
            model.UserAssignedRoles = [];
            model.UserAssignedModules = [];
            model.DeletedRoles = [];
            model.DeletedModules = [];

            model.IsAdmin = false;
            model.IsEnabled = false;
            $("#email").removeAttr("disabled", "");
            $("#firstname").removeAttr("disabled", "");
            $("#lastname").removeAttr("disabled", "");
            model.dt = new Date();
            model.SelectedUser = "";
            $timeout(function () {
                $("#email").focus();
                $("#selectemail").prop('selectedIndex', -1);
            }, 100);
        };

        model.loadUsers = function () {
            var Users = userActionService.GetUserDetails.query({ showDeleted: model.isDeleted }).$promise.then(function (respData, headers) {
                model.user.activeTab = 'home';
                model.user.Create = 1;
                model.user.Home = 1;
                model.user.Edit = 2;
                model.UserAssignedRoles = [];
                model.UserAssignedModules = [];
                model.DeletedRoles = [];
                model.DeletedModules = [];
                model.SelectedUser = null;
                $timeout(function () {
                    $("#email").focus();
                    $("#selectemail").prop('selectedIndex', -1);
                }, 100);
                model.UserDetails = respData;
                for (var i = 0; i < model.UserDetails.length; i++) {
                    model.UserDetails[i].fullName = model.UserDetails[i].FirstName + " " + model.UserDetails[i].LastName;
                    model.UserDetails[i].fullNameAndEmail = model.UserDetails[i].FirstName + " " + model.UserDetails[i].LastName + " " + model.UserDetails[i].Email;
                }
                if (model.UserDetails.length > 0) {
                    //order by fullname 
                    model.UserDetails.sort(function (a, b) {
                        var nameA = a.fullName.toUpperCase(); // ignore upper and lowercase
                        var nameB = b.fullName.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        // names must be equal
                        return 0;

                    });

                }
            }, function (err) {
                model.showErrorMessage = true;
                model.error = err.data.Message;
            });
        };
        model.createUser = function () {
            model.clearMessage();
            if (model.UserEmail && model.UserEmail != "" && model.FirstName != "" && model.LastName != "") {
                var _reqObject = {};
                _reqObject.User = {};
                _reqObject.User.Email = model.UserEmail;
                _reqObject.User.UserId = model.UserEmail;
                _reqObject.User.FirstName = model.FirstName;
                _reqObject.User.LastName = model.LastName;
                _reqObject.User.Type = model.Type;
                _reqObject.User.IsAdmin = model.IsAdmin;
                _reqObject.User.IsEnabled = model.IsEnabled;
                _reqObject.User.ExpiryDate = model.dt;
                _reqObject.RedirectURL = window.location.toString();

                var UserCreation = userActionService.GetUserDetails.create(_reqObject).$promise.then(function (respData, headers) {
                    model.showSuccessMessage = true;
                    model.successMessage = "User saved successfully and activation link has been sent to the respective email ID";
                    model.Response = respData;
                    model.UserEmail = "";
                    model.FirstName = "";
                    model.LastName = "";
                    model.IsAdmin = false;
                    model.IsEnabled = false;
                    model.dt = new Date();
                    model.UserAssignedRoles = [];
                    model.UserAssignedModules = [];
                    model.DeletedRoles = [];
                    model.DeletedModules = [];
                    $("#email").removeAttr("disabled", "");
                    $("#firstname").removeAttr("disabled", "");
                    $("#lastname").removeAttr("disabled", "");

                    model.loadUsers();
                    model.homeClick();
                }, function (err) {
                    model.showErrorMessage = true;
                    model.error = err.data.Message;
                });
            }
            else {
                model.showErrorMessage = true;
                var errorMessage = "";
                if (model.UserEmail == "") {
                    errorMessage = "Email field is mandatory";
                }
                if (model.FirstName == "") {
                    errorMessage = regcon.UserEmail == "" ? "Email and First Name fields are mandatory" : "First Name field is mandatory";
                }
                if (model.LastName == "") {
                    errorMessage = regcon.UserEmail == "" ? (model.FirstName == "" ? "Email, First Name and Last Name fields are mandatory" : "Email and Last Name fields are mandatory") : (model.FirstName == "" ? "First Name and Last Name fields are mandatory" : "Last Name field is mandatory");
                }
                model.error = errorMessage;
            }

        };

        model.validateEmail = function () {
            model.clearMessage();
            if (model.UserEmail && model.UserEmail != "") {
                model.loading = true;
                var data = { "emailId": model.UserEmail };

                var Users = userActionService.GetUserDetails.get(data).$promise.then(function (respData, headers) {
                    if (respData != null && respData.Email != null && respData.Email != "") {
                        model.loading = false;
                        model.UserEmail = respData.Email;
                        model.FirstName = respData.FirstName;
                        model.LastName = respData.LastName;

                        $("#firstname").attr("disabled", "disabled");
                        $("#lastname").attr("disabled", "disabled");

                        var isSet = false;
                        if (!respData.IsDeleted)
                        {
                            for (var i = 0; i < respData.ApsInstances.length; i++) {
                                if (store.get("instanceId") == respData.ApsInstances[i].Name) {
                                    model.user.Create = 0;
                                    model.user.Edit = 1;
                                    isSet = true;
                                    break;
                                }
                            }

                            if (!isSet) {
                                for (var i = 0; i < respData.InstanceRoles.length; i++) {
                                    if (store.get("instanceId") == respData.InstanceRoles[i].InstanceId) {
                                        model.user.Create = 0;
                                        model.user.Edit = 1;
                                        isSet = true;
                                        break;
                                    }
                                }
                                if (!isSet) {
                                    model.user.Create = 1;
                                    model.user.Edit = 0;
                                }
                            }
                        }
                        else
                        {
                            model.user.Create = 1;
                            model.user.Edit = 0;
                        }

                        // This need to check
                        // var SendEmail = userActionService.GetUserDetails.sendemail(data).$promise.then(function (respData, headers) {
                        //    $('#error_container').bs_alert("User already registered, login link has been sent to the respective email ID");
                        //bootbox.alert("User already registered, login link has been sent to the respective email ID", function () { });
                        // });
                    }
                },
                 function (err) {
                     if (err.data.Message == "User not found in system.") {
                         model.loading = false;
                         model.FirstName = "";
                         model.LastName = "";

                         $("#email").removeAttr("disabled", "");
                         $("#firstname").removeAttr("disabled", "");
                         $("#lastname").removeAttr("disabled", "");
                         model.user.Create = 1;
                         model.user.Edit = 0;

                     }
                     else {
                         model.loading = false;
                         model.showErrorMessage = true;
                         model.error = err.data.Message;
                         model.user.Create = 1;
                         model.user.Edit = 0;
                     }
                 });
            }
            else {

                model.loading = false;
                if(model.UserEmail != "")
                {
                    model.showErrorMessage = true;
                    model.error = "Email is not in correct format";
                }

                $timeout(function () {
                    if ($("#selectemail").prop('selectedIndex') >= 0) {
                        model.showDetails($('#selectemail').val(), true);
                    }
                }, 100);
            }
        }

        model.showDetails = function (useremail, flag) {
            if(flag) model.clearMessage();
            model.SelectedUser = useremail;
            for (var i = 0; i < model.UserDetails.length; i++) {
                if (model.UserDetails[i].Email == useremail) {

                    model.UserID = model.UserDetails[i].Id;
                    model.UserEmail = model.UserDetails[i].Email;
                    model.FirstName = model.UserDetails[i].FirstName;
                    model.LastName = model.UserDetails[i].LastName;
                    $("#email").attr("disabled", "disabled");
                    $("#firstname").attr("disabled", "disabled");
                    $("#lastname").attr("disabled", "disabled");
                    model.UserAssignedRoles = [];
                    model.UserAssignedModules = [];
                    model.DeletedRoles = [];
                    model.DeletedModules = [];
                    var isAdmin = false;
                    for (var j = 0; j < model.UserDetails[i].InstanceRoles.length; j++) {
                        if (model.UserDetails[i].InstanceRoles[j].Role.Name == "Administrator") {
                            isAdmin = true;
                            break;
                        }
                    }
                    model.IsAdmin = isAdmin;
                    var isEnabled = false;
                    if (store.get("instanceId")) {
                        model.instanceId = store.get("instanceId");
                    }
                    if (model.UserDetails[i].ApsInstances && model.UserDetails[i].ApsInstances.length > 0) {
                        for (var j = 0; j < model.UserDetails[i].ApsInstances.length; j++) {
                            if (model.UserDetails[i].ApsInstances[j].Id == model.instanceId) {
                                isEnabled = true;
                                break;
                            }
                        }
                    }
                    model.IsEnabled = isEnabled;
                    var expiryDate = new Date(model.UserDetails[i].ExpiryDate);
                    model.dt = (model.UserDetails[i].ExpiryDate == "0001-01-01T00:00:00" || model.UserDetails[i].ExpiryDate == "0001-01-01T23:59:59") ? "" : new Date(expiryDate.setHours(-expiryDate.getHours(), -expiryDate.getMinutes(), (-expiryDate.getSeconds() - 1)));

                    model.user.Create = 0;
                    model.user.Edit = 1;
                    if (model.UserDetails[i].SubTypes) {
                        model.showEmployeeDetails = true;
                    }
                    model.getUserRoles();
                    model.getUserModules();
                    model.getUserLogs();
                    $timeout(function () {
                        model.AssignedRolesCount = $filter('filter')(model.AssignedRoles, { IsEnabled: "true", IsImplicitRole: "false", IsDeleted: "false" }).length;
                    }, 1000);
                    
                }
            }
        };
        model.assignRole = function () {
            var exist = false;
            if (model.LeftRoles.length > 0) {
                for (var l = 0; l < model.LeftRoles.length; l++) {

                    for (var k = 0; k < model.AssignedRoles.length; k++) {
                        if (model.AssignedRoles[k].Name == model.LeftRoles[l]) {
                            exist = true;
                        }
                        else {

                        }
                    }
                }
                if (exist == false) {
                    model.Ids = [];

                    for (var n = 0; n < model.LeftRoles.length; n++) {
                        for (var m = 0; m < model.Roles.length; m++) {
                            if (model.Roles[m].Name == model.LeftRoles[n]) {
                                var Role = {};
                                Role.Id = model.Roles[m].Id;
                                Role.Name = model.Roles[m].Name;
                                model.Ids.push(Role);
                            }
                        }


                    }
                    if (model.Ids.length > 0) {

                        angular.forEach(model.Ids, function (role) {
                            var index = model.DeletedRoles.indexOf(role.Id);
                            if (index >= 0) {
                                model.DeletedRoles.splice(index, 1);
                            }
                            else {
                                model.UserAssignedRoles.push(role);
                            }
                            var index = -1, roleIndex = -1;
                            var exist = false;
                            angular.forEach(model.unAssinedRoles, function (unassignedrole) {
                                index++;
                                if (unassignedrole.Id == role.Id) {
                                    exist = true;
                                    roleIndex = index;
                                }
                            });
                            var newrole = model.unAssinedRoles[roleIndex];
                            model.AssignedRoles.push(newrole);
                            model.unAssinedRoles.splice(roleIndex, 1);
                        });
                        model.LeftRoles = [];
                        model.showSuccessMessage = true;
                        model.successMessage = "User Roles updated successfully";
                    }

                }
                else {
                    model.showErrorMessage = true;
                    model.error = "User saved successfully and activation link has been sent to the respective email ID";
                }
            }
        };

        model.removeRole = function () {
            model.UpdatedRoles = [];
            if (model.RightRoles.length > 0) {
                for (var m = 0; m < model.RightRoles.length; m++) {
                    for (var k = 0; k < model.AssignedRoles.length; k++) {
                        if (model.AssignedRoles[k].Name == model.RightRoles[m]) {
                            model.UpdatedRoles.push(model.AssignedRoles[k]);
                        }
                    }
                }
                model.RemIds = [];

                for (var j = 0; j < model.RightRoles.length; j++) {
                    for (var m = 0; m < model.Roles.length; m++) {
                        if (model.Roles[m].Name == model.RightRoles[j]) {
                            var Role = {};
                            Role.Id = model.Roles[m].Id;
                            Role.Name = model.Roles[m].Name;
                            model.RemIds.push(Role);
                        }
                    }
                }

                if (model.RemIds.length > 0) {
                    angular.forEach(model.RemIds, function (role) {
                        var index = model.UserAssignedRoles.indexOf(role.Id);
                        if (index >= 0) {
                            model.UserAssignedRoles.splice(index, 1);
                        }
                        else {
                            model.DeletedRoles.push(role);
                        }
                        var index = -1, roleIndex = -1;
                        var exist = false;
                        angular.forEach(model.AssignedRoles, function (assignedrole) {
                            index++;
                            if (assignedrole.Id == role.Id) {
                                exist = true;
                                roleIndex = index;
                            }
                        });
                        var newrole = model.AssignedRoles[roleIndex];
                        model.unAssinedRoles.push(newrole);
                        model.AssignedRoles.splice(roleIndex, 1);
                    });
                    model.RightRoles = [];
                    model.showSuccessMessage = true;
                    model.successMessage = "Selected User Roles Removed successfully";
                }
                else {
                    model.showErrorMessage = true;
                    model.error = "Select at least one role to remove.";
                }
            }

        };


        model.assignModule = function () {
            var exist = false;
            if (model.LeftModules.length > 0) {

                for (var k = 0; k < model.AssignedModules.length; k++) {
                    if (model.AssignedModules[k].Name == model.LeftModules[0]) {
                        exist = true;
                    }
                    else {

                    }
                }

                if (exist == false) {

                    angular.forEach(model.LeftModules, function (moduleName) {
                        var index = model.DeletedModules.indexOf(moduleName);
                        if (index >= 0) {
                            model.DeletedModules.splice(index, 1);
                        }
                        else {
                            model.UserAssignedModules.push(moduleName);
                        }
                        var index = -1, moduleIndex = -1;
                        var exist = false;
                        angular.forEach(model.unAssinedModules, function (unassignedmodule) {
                            index++;
                            if (unassignedmodule.Name == moduleName) {
                                exist = true;
                                moduleIndex = index;
                            }
                        });
                        var module = model.unAssinedModules[moduleIndex];
                        var newmodule = {};
                        newmodule.Module = {};
                        newmodule.Module.Name = moduleName;
                        model.AssignedModules.push(newmodule);
                        model.unAssinedModules.splice(moduleIndex, 1);
                    });
                    model.LeftModules = [];
                    model.showSuccessMessage = true;
                    model.successMessage = "User Modules updated successfully";
                }
                else {
                    model.showErrorMessage = true;
                    model.error = "Error";
                }
            }
        };

        model.removeModule = function () {

            angular.forEach(model.RightModules, function (moduleName) {
                var index = model.UserAssignedModules.indexOf(moduleName);
                if (index >= 0) {
                    model.UserAssignedModules.splice(index, 1);
                }
                else {
                    model.DeletedModules.push(moduleName);
                }
                var index = -1, moduleIndex = -1;
                var exist = false;
                angular.forEach(model.AssignedModules, function (assignedmodule) {
                    index++;
                    if (assignedmodule.Module.Name == moduleName) {
                        exist = true;
                        moduleIndex = index;
                    }
                });
                var newmodule = model.AssignedModules[moduleIndex];
                var newmoduletoadd = {};
                newmoduletoadd.Name = newmodule.Module.Name;
                model.unAssinedModules.push(newmoduletoadd);
                model.AssignedModules.splice(moduleIndex, 1);
            });
            model.RightModules = [];
            model.showSuccessMessage = true;
            model.successMessage = "Selected User Modules Removed successfully";

        };



        model.homeClick = function () {
            model.user.activeTab = 'home';
            model.user.Home = 1;
            model.user.Employee = 0;
            model.user.Role = 0;
            model.user.Module = 0;
            model.user.Status = 0;
            model.user.Logs = 0;
            if (model.SelectedUser) {
                model.user.Create = 0;
                model.user.Edit = 1;
            }
            else {
                model.user.Create = 1;
                model.user.Edit = 0;
            }

        };
        model.employeeClick = function () {
            model.user.activeTab = 'employee';
            model.user.Home = 0;
            model.user.Employee = 1;
            model.user.Role = 0;
            model.user.Module = 0;
            model.user.Status = 0;
            model.user.Logs = 0;

        };

        model.rolesClick = function () {
            model.user.activeTab = 'roles';
            model.user.Home = 1;
            model.user.Employee = 0;
            model.user.Role = 1;
            model.user.Module = 0;
            model.user.Status = 0;
            model.user.Logs = 0;
            model.getUserRoles();

        };
        model.updateUser = function () {
            var reqObject = {};
            reqObject.Email = model.UserEmail;
            reqObject.Type = $("#Type").val();
            reqObject.IsAdmin = model.IsAdmin;
            reqObject.ExpiryDate = model.dt;
            reqObject.IsEnabled = model.IsEnabled;
            reqObject.FirstName = model.FirstName;
            reqObject.LastName = model.LastName;
            var UserUpdation = userActionService.GetUserDetails.update(reqObject).$promise.then(function (respData, headers) {

                if (model.UserAssignedRoles.length > 0) {
                    var reqObject = {};
                    reqObject = respData;
                    reqObject.Roles = model.UserAssignedRoles;
                    var UserRoleUpdation = userActionService.UserRolesService.addRoles(reqObject).$promise.then(function (respDataAddRole, headers) {

                    }, function (err) {
                        model.showErrorMessage = true;
                        model.error = err.data;
                    });
                    if (model.DeletedRoles.length > 0) {
                        $timeout(function () {
                            var reqObject = {};
                            reqObject = respData;
                            reqObject.Roles = model.DeletedRoles;
                            var UserUpdation = userActionService.UserRolesService.removeRoles(reqObject).$promise.then(function (respDataDeleteRole, headers) {

                            }, function (err) {
                                model.showErrorMessage = true;
                                model.error = err.data;
                            });
                        }, 100);
                    }
                }
                else if (model.DeletedRoles.length > 0) {
                    var reqObject = {};
                    reqObject = respData;
                    reqObject.Roles = model.DeletedRoles;
                    var UserUpdation = userActionService.UserRolesService.removeRoles(reqObject).$promise.then(function (respDataDeleteRole, headers) {

                    }, function (err) {
                        model.showErrorMessage = true;
                        model.error = err.data;
                    });
                }

                angular.forEach(model.UserAssignedModules, function (moduleName) {
                    var reqObject = {};
                    reqObject.emailId = model.SelectedUser;
                    reqObject.moduleName = moduleName;
                    var UserModuleUpdation = userActionService.UserModuleService.addModules(reqObject).$promise.then(function (respDataAssignModule, headers) {

                    }, function (err) {
                        model.showErrorMessage = true;
                        model.error = err.data;
                    });
                });

                angular.forEach(model.DeletedModules, function (moduleName) {
                    var reqObject = {};
                    reqObject.emailId = model.SelectedUser;
                    reqObject.moduleName = moduleName;
                    var UserUpdation = userActionService.UserModuleService.removeModules(reqObject).$promise.then(function (respDataDeleteModule, headers) {

                    }, function (err) {
                        model.showErrorMessage = true;
                        model.error = err.data;
                    });
                });

                $timeout(function () {
                    model.showSuccessMessage = true;
                    model.successMessage = "User Updated successfully";
                    model.UserAssignedRoles = [];
                    model.UserAssignedModules = [];
                    model.DeletedRoles = [];
                    model.DeletedModules = [];
                }, 1000);

            }, function (err) {
                model.showErrorMessage = true;
                model.error = err.data.Message;
            });
        };

        model.deleteUser = function () {
            var update = { "emailId": model.SelectedUser };
            BootstrapDialog.show({
                title: '<span class="glyphicon glyphicon-warning-sign"></span>   Alert',
                message: 'Are you sure to delete the user !',
                buttons: [{
                    icon: 'glyphicon glyphicon-ok',
                    label: 'Yes',
                    cssClass: 'btn-primary',
                    autospin: true,
                    action: function (dialogRef) {
                        var UserUpdation = userActionService.GetUserDetails.remove(update).$promise.then(function (respData, headers) {
                            model.showSuccessMessage = true;
                            model.successMessage = "User Deleted successfully";
                            model.UserEmail = "";
                            model.FirstName = "";
                            model.LastName = "";
                            model.IsAdmin = false;
                            model.IsEnabled = false;
                            model.dt = new Date();
                            model.loadUsers(); model.user.Create = 1;
                            model.user.Edit = 0;
                        }, function (err) {
                            model.showErrorMessage = true;
                            model.error = err.data.Message;
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

        model.modulesClick = function () {
            model.user.activeTab = 'modules';
            model.user.Home = 1;
            model.user.Employee = 0;
            model.user.Role = 0;
            model.user.Module = 1;
            model.user.Status = 0;
            model.user.Logs = 0;
            if (model.SelectedUser) {
                model.getUserModules();
            }

        };
        model.getUserModules = function () {
            if (model.UserAssignedModules.length == 0 && model.DeletedModules.length == 0) {
                if (store.get("instanceId")) {
                    model.instanceId = store.get("instanceId");
                }

                model.unAssinedModules = [];
                userActionService.UserModuleService.query({ 'instanceId': model.instanceId }).$promise.then(
                   function (respData) {
                       if (respData != null) {
                           model.Modules = respData;
                           angular.extend(model.unAssinedModules, model.Modules);
                           model.AssignedModules = [];
                           userActionService.GetUserDetails.get({ 'emailId': model.SelectedUser }).$promise.then(
                            function (respData) {
                                model.userModules = respData.InstanceModules;
                                angular.extend(model.AssignedModules, model.userModules);
                                if (model.AssignedModules.length > 0) {
                                    for (var i = 0; i < model.AssignedModules.length; i++) {
                                        var val = $filter('filter')(model.unAssinedModules, { Name: model.AssignedModules[i].Module.Name })[0];
                                        var index = model.unAssinedModules.indexOf(val);
                                        model.unAssinedModules.splice(index, 1);
                                    }
                                }
                            }, function (err) {
                                model.showErrorMessage = true;
                                model.error = err.data.Message;
                            });
                       }
                   });
            }
        };

        model.statusClick = function () {
            model.user.activeTab = 'status';
            model.user.Home = 0;
            model.user.Employee = 0;
            model.user.Role = 0;
            model.user.Module = 0;
            model.user.Status = 1;
            model.user.Logs = 0;

            model.getUserStatus();
        };

        model.logsClick = function () {
            model.user.activeTab = 'logs';

            model.user.Home = 0;
            model.user.Employee = 0;
            model.user.Role = 0;
            model.user.Module = 0;
            model.user.Status = 0;
            model.user.Logs = 1;
            model.getUserLogs();
        };

        model.getUserRoles = function () {
            if (model.UserAssignedRoles.length == 0 && model.DeletedRoles.length == 0) {
                model.unAssinedRoles = [];
                var GetAllRoles = userActionService.UserRolesService.query().$promise.then(
                   function (respData, headers) {
                       if (respData != null) {
                           model.Roles = respData;
                           angular.extend(model.unAssinedRoles, model.Roles);
                           model.AssignedRoles = [];
                           for (var i = 0; i < model.UserDetails.length; i++) {
                               if (model.UserDetails[i].Email == model.SelectedUser) {
                                   if (model.UserDetails[i].InstanceRoles) {

                                       for (var j = 0; j < model.UserDetails[i].InstanceRoles.length; j++) {

                                           model.AssignedRoles.push(model.UserDetails[i].InstanceRoles[j].Role);
                                           var val = $filter('filter')(model.unAssinedRoles, { Name: model.UserDetails[i].InstanceRoles[j].Role.Name })[0];
                                           var index = model.unAssinedRoles.indexOf(val);
                                           model.unAssinedRoles.splice(index, 1);

                                       }
                                   }

                               }
                           }
                       }
                   });
            }
        };

        model.getUserStatus = function () {
            model.LoginHistory = "";
            model.LastLoggedInDate = "";
            var data = { "emailId": model.SelectedUser };
            var UsersLogs = userActionService.GetUserDetails.getuserloginhistory(data).$promise.then(
                function (respData, headers) {
                    if (respData != null) {
                        var previousDate = new Date("01/01/2000 00:00:00");
                        for (var i = 0; i < respData.length; i++) {
                            var date = new Date(respData[i].CreatedDate);
                            respData[i].CreatedDate = date.toString();
                            if(respData[i].IsLoginSuccess && date>(new Date().setMinutes((new Date()).getMinutes() - 15)))
                            {
                                model.JustNow = 1;
                            }
                            if (respData[i].IsLoginSuccess && previousDate < date)
                            {
                                previousDate = date;
                            }
                        }
                        if (model.JustNow != 1 && previousDate.toUTCString() != new Date("01/01/2000 00:00:00").toUTCString())
                        {
                            model.LastLoggedInDate = previousDate;
                        }
                        model.LoginHistory = respData;
                    }
                });
        };

        model.convertUTCDateToLocalDate = function (date) {
            var newDate = new Date(date);
            return newDate;
        }

        model.getUserLogs = function () {
            model.UserLogs = "";
            if (model.SelectedUser) {
                var data = { "emailId": model.SelectedUser };
                var UsersLogs = userActionService.GetUserDetails.getuserlogs(data).$promise.then(
                    function (respData, headers) {
                        if (respData != null) {
                            model.UserLogs = respData;
                            model.ChangeLogUsers = [];
                            var previousDate = new Date().setMinutes((new Date()).getMinutes() + 15);
                            for (var k = 0; k < model.UserLogs.length; k++) {
                                for (var l = 0; l < model.UserDetails.length; l++) {
                                    if ((model.UserLogs[k].ActionBy ? model.UserLogs[k].ActionBy : model.UserLogs[k].UserEmail) == model.UserDetails[l].Email) {
                                        model.UserLogs[k].ActionByName = model.UserDetails[l].FirstName + " " + model.UserDetails[l].LastName;
                                    }
                                }
                                model.UserLogs[k].ActionDate = model.convertUTCDateToLocalDate(model.UserLogs[k].ActionDate);
                                if (model.UserLogs[k].ActionDate.toString() == previousDate.toString()) {
                                    model.UserLogs[k].previousDateSame = true;
                                }
                                else {
                                    model.UserLogs[k].previousDateSame = false;
                                    previousDate = model.UserLogs[k].ActionDate;
                                }
                                var changeLogUser = {};
                                changeLogUser.Name = model.UserLogs[k].ActionBy ? model.UserLogs[k].ActionBy : model.UserLogs[k].UserEmail;
                                if (($filter('filter')(model.ChangeLogUsers, { Name: changeLogUser.Name })).length == 0) model.ChangeLogUsers.push(changeLogUser);
                            }
                        }
                    });
            }
        };

        model.clearMessage = function () {
            model.showErrorMessage = false;
            model.showSuccessMessage = false;
            model.successMessage = "";
            model.error = "";
        };

        return model.init();

    }
    userActionsModule.factory('userActionsModel', ['userActionService', '$filter', 'store', '$timeout', userActionsModel]);
}());