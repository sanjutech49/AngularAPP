(function () {
    "use strict";
    function RolesController($scope, model, $filter, $timeout) {
        var vm = $scope;
        vm.model = model;
        vm.init = function () {
            vm.model = model;
            model.loadUsers();
            model.initRolesModel();
            return vm;
        };
        vm.selectedRole = false;
        vm.showUsersTab = false;
        vm.todayDate = (new Date()).toISOString();

        var alreadyHideCalled = false;
        var clickedAdd = false;
        $(document).ready(function () {
            $('#rolesModal').on('hide.bs.modal', function (e) {
                if (alreadyHideCalled) {
                    alreadyHideCalled = false;
                    return true;

                }
                console.log($(e.currentTarget));
                var status = false;
                var eventType = e;

                BootstrapDialog.show({
                    title: '<span class="glyphicon glyphicon-warning-sign"></span>   Confirm',
                    message: "You haven't saved your changes in Role Creation.  Do you want to close the dialogue?",
                    buttons: [{
                        icon: 'glyphicon glyphicon-ok',
                        label: 'Yes',
                        cssClass: 'btn-primary',
                        autospin: true,
                        action: function (dialogRef) {
                            alreadyHideCalled = true;
                            model.clearMessage();
                            $('#rolesModal').modal('hide');
                            $('#rolesModal').removeData();
                            model.loadUsers();
                            model.initRolesModel();
                            vm.showNewRole();
                            dialogRef.close();
                        }
                    }, {
                        label: 'No',
                        icon: 'glyphicon glyphicon-remove',
                        action: function (dialogRef) {
                            if ($('#roleName').val() == "") {
                                clearModalMessages();
                            }
                            else if (clickedAdd) {

                                clickedAdd = false;

                                clearModalMessages();

                            }
                            $('#rolesModal').modal('show');
                            dialogRef.close();
                        }
                    }]
                });

                return false;
            });


        });

        function clearModalMessages() {
            vm.ClearMessage();
            $(document).ready(function () {
                $('#roleName').focus();
            });
        }

        vm.loadRoles = function () {
            model.loadModel();
            vm.loadAllRolesWithDeleteStatus();
        };

        vm.roleHomeClick = function () {
            model.home = 1;
            model.roleHomeClick();
        };

        vm.loadAllRolesWithDeleteStatus = function () {

            vm.ClearMessage();
            model.loadAllRolesWithDeleteStatus();
        }

        $(document).ready(function () {
            $('#rolesModal').on('hide.bs.modal', function () {
                model.clearMessage();
            })
        });

        vm.showNewRole = function () {
            vm.ClearMessage();
            model.showNewRole();
            vm.selectedRole = false;
            vm.showUsersTab = false;
            model.home = 1;
            $timeout(function () {
                $('#roleName').focus();
            }, 100);
        };

        vm.clearSearchKey = function () {
            $scope.roleSearchKey = "";
        };

        vm.roleUsersClick = function () {
            model.role.activeTab = 'users';
            model.home = 1;
        };

        vm.RevertChanges = function () {
            vm.ClearMessage();
            if (model.role.createMode) {
                model.showNewRole();
            }
            else {
                model.showRoleDetails(model.role.selectedRole);
            }
        }

        vm.roleLogsClick = function () {
            model.type = "";
            $("#expdate3").val('');
            $("#expdate4").val('');
            vm.PreviousType = "";
            vm.PreviousFromDate = "";
            vm.PreviousToDate = "";
            if (vm.showFilter) vm.showFilter = false;
            model.home = 0;
            model.roleLogsClick();
        };

        vm.stopRolesSearch = function () {
            vm.searchAllRoleKey = "";
            if (model.copyCurrentUnassignedUsers.length > 0) {
                model.role.currentUnassignedUsers = model.copyCurrentUnassignedUsers;
            }
        };

        vm.showRoleDetails = function (selectedRole, clearMessages) {
            if (clearMessages) vm.ClearMessage();
            var roleDetails = model.showRoleDetails(selectedRole);
            if (!selectedRole.IsDeleted) vm.selectedRole = true;
            if (selectedRole.IsDeleted) vm.selectedRole = false;
            model.home = 1;
            if (model.role.selectedRole.IsEnabled) {
                vm.showUsersTab = true;
            }
            else {
                vm.showUsersTab = false;
            }
        };

        vm.assignRoleUsers = function () {
            model.assignRoleUsers();
        };

        vm.removeRoleUsers = function () {
            vm.ClearMessage();
            model.removeRoleUsers();
        };
        vm.newRoleHomeClick = function () {
            model.home = 1;
            model.newRoleHomeClick();
        };

        vm.searchAssignedRoles = function () {
            model.searchAssignedRoles();
        };

        vm.stopAssignedRolesSearch = function () {
            vm.searchAssignedUserKey = "";
            if (model.copyCurrentAssignedUsers.lenth > 0) {
                model.role.currentAssignedUsers = model.copyCurrentAssignedUsers;
            }
        };
        vm.searchUsers = function () {
            model.searchUsers();
        };

        vm.ClearMessage = function () {
            model.error = '';
            model.showSuccessMessage = false;
            model.showErrorMessage = false;
            model.successMessage = '';
        };

        vm.showcalendar = function ($event) {
            model.showdp = true;
        };

        vm.showcalendarFrom = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            model.showfromdp = true;
        };

        vm.showcalendarTo = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            model.showtodp = true;
        };

        vm.showFilter = false;
        vm.PreviousType = "";
        vm.PreviousCreatedBy = "";
        vm.PreviousFromDate = "";
        vm.PreviousToDate = "";
        vm.ShowFilter = function () {
            vm.showFilter = !vm.showFilter;
        };
        vm.fromdateOptions = { maxDate: new Date() }
        vm.todateOptions = { maxDate: new Date() }
        vm.applyFilter = function () {
            var reqObject = {};
            reqObject.roleId = model.role.selectedRole.Name;
            reqObject.type = model.type;
            reqObject.createdBy = model.User;
            reqObject.fromDate = $("#expdate3").val();
            reqObject.toDate = $("#expdate4").val() + " 23:59:59";
            if (reqObject.roleId != '') {
                model.applyFilter(reqObject);
            }
            vm.PreviousType = reqObject.type;
            vm.PreviousCreatedBy = reqObject.createdBy;
            vm.PreviousFromDate = reqObject.fromDate;
            vm.PreviousToDate = reqObject.toDate;
            vm.showFilter = !vm.showFilter;
        };

        vm.removeFilter = function () {
            model.type = vm.PreviousType;
            model.User = vm.PreviousCreatedBy;
            $("#expdate3").val(vm.PreviousFromDate);
            $("#expdate4").val(vm.PreviousToDate);
        };



        vm.createRole = function () {
            vm.ClearMessage();
            if (!model.role.currentRole.Name || model.role.currentRole.Name == "") {
                $('#roleName').focus();
            }
            else {
                model.createRole();
                $timeout(function () {
                    if (model.createSuccess)
                    {
                        vm.showRoleDetails(model.role.selectedRole, false);
                        $("#selectrole").find('option[value="' + model.role.selectedRole.Id + '"]').attr("selected", "selected");
                        model.home = 1;
                    }
                }, 1000);
            }
        };
        vm.updateRole = function () {
            vm.ClearMessage();
            model.updateRole();
            if (model.role.currentRole.IsEnabled) {
                vm.showUsersTab = true;
                $timeout(function () {
                    model.updateRoleUsers(false);
                }, 1000);
            }
            else {
                vm.showUsersTab = false;
            }
        };

        vm.deleteRole = function () {
            vm.ClearMessage();
            vm.selectedRole = false;
            var deleteStatus = model.deleteRole();

        };

        return vm.init();
    }
    rolesModule.controller('RolesController', ['$scope', 'rolesModel', '$filter', '$timeout', RolesController]);
}());