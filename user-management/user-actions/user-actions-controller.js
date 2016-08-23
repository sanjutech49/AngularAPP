(function () {
    "use strict";
    function UserActionsController($scope, $location, $filter, $rootScope, userActionService, model) {

        var vm = $scope;
        vm.init = function () {
            vm.model = model;
            model.loadUsers();
            model.homeClick();
            model.addUser();
            return model;
        }; 
        
        vm.UserID = "";
        vm.PreviousType = "";
        vm.PreviousFromDate = "";
        vm.PreviousToDate = "";
        vm.PreviousCreatedBy = "";
        vm.SelectedUser = "";
        vm.RolesAssigned = [];
        vm.UserDetailsFetched = [];
       vm.loadUsers=function(){
             model.loadUsers();
       };
        vm.showDetails = function (useremail) {
            model.showDetails(useremail, true);
        };
        vm.CreateUser = function () {
            vm.clearMessage();
            model.createUser();

        };
        vm.today = function () {
            vm.todayDate = (new Date()).toISOString();
            vm.yesterdayDate = (new Date()).setDate((new Date()).getDate() -1);
        };
        vm.today();
        vm.dateOptions = { minDate: new Date() }
        vm.fromdateOptions = { maxDate: new Date() }
        vm.todateOptions = { maxDate: new Date() }
        vm.showFilter = false;
        vm.ShowFilter = function () {
            vm.showFilter = !vm.showFilter;
        };
        vm.ClearSearchKey = function () {
            model.SearchKey = "";
        };
        vm.ApplyFilter = function () {
            var reqObject = {};
            reqObject.emailId = model.SelectedUser;
            reqObject.type = vm.Type;
            reqObject.createdBy = vm.User;
            reqObject.fromDate = $("#expdate1").val();
            reqObject.toDate = $("#expdate2").val() + " 23:59:59";
            if (model.SelectedUser != '')
            {
                var UsersLogs = userActionService.GetUserDetails.getuserlogsbyfilter(reqObject).$promise.then(
                function (respData, headers) {
                    if (respData != null) {
                        model.UserLogs = respData;
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
                }, function (err) {
                    model.showErrorMessage = true;
                    model.error = err.data.Message;
                });
            }
            vm.PreviousType = reqObject.type;
            vm.PreviousCreatedBy = reqObject.createdBy;
            vm.PreviousFromDate = reqObject.fromDate;
            vm.PreviousToDate = reqObject.toDate;
            vm.showFilter = !vm.showFilter;
        };

        var alreadyHideCalled = false;
        var clickedAdd = false;
        $(document).ready(function () {
            $('#userModal').on('hide.bs.modal', function (e) {
              if (alreadyHideCalled)
                {
                    alreadyHideCalled = false;
                    return true;
                   
                }
                console.log($(e.currentTarget));
                var status = false;
                var eventType = e;
              
                BootstrapDialog.show({
                    title: '<span class="glyphicon glyphicon-warning-sign"></span>   Confirm',
                    message: "You haven't saved your changes in User Creation.  Do you want to close the dialogue?",
                    buttons: [{
                        icon: 'glyphicon glyphicon-ok',
                        label: 'Yes',
                        cssClass: 'btn-primary',
                        autospin: true,
                        action: function (dialogRef) {
                            alreadyHideCalled = true;
                            model.clearMessage();
                            $('#userModal').modal('hide');
                            $('#userModal').removeData();
                            vm.loadUsers();
                            model.homeClick();
                            model.addUser();
                            dialogRef.close();
                        }
                    }, {
                        label: 'No',
                        icon: 'glyphicon glyphicon-remove',
                        action: function (dialogRef) {
                             if($('#email').val() == "")
                            {
                                clearModalMessages();
                            }
                            else if(clickedAdd)
                                {

                                clickedAdd = false;

                                clearModalMessages();

                            }
                            $('#userModal').modal('show');
                           dialogRef.close();
                        }
                    }]
                });
             
                return false;
           });
                     
          
            });

        function clearModalMessages()
        {
            vm.clearMessage();
            $(document).ready(function () {
                $('#email').focus();
            });
        }
        vm.RemoveFilter = function () {
            vm.Type = vm.PreviousType;
            vm.Type = vm.PreviousCreatedBy;
            $("#expdate1").val(vm.PreviousFromDate);
            $("#expdate2").val(vm.PreviousToDate);
        };


        $(document).ready(function () {
            $('#settingsModal').on('hide.bs.modal', function () {
                 vm.clearMessage();

            })
        });

        vm.showcalendar = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
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
       
        vm.searchUserDetails = function () {
            var SearchKey = vm.SearchKey;
            if (SearchKey != null && SearchKey != "") {
                for (var i = 0; i < vm.UserDetails.length; i++) {
                    if (vm.UserDetails[i].Email.match(SearchKey)) {
                        vm.UserDetailsFetched.push(vm.UserDetails[i]);
                    }
                    if (vm.UserDetails[i].FirstName != null && vm.UserDetails[i].FirstName.match(SearchKey)) {
                        vm.UserDetailsFetched.push(vm.UserDetails[i]);
                    }
                    if (vm.UserDetails[i].LastName != null && vm.UserDetails[i].LastName.match(SearchKey)) {
                        vm.UserDetailsFetched.push(vm.UserDetails[i]);
                    }
                }
                vm.UserDetails = vm.UserDetailsFetched;
                if (vm.UserDetailsFetched != null) {
                }
            }
            else {
                var Users = userActionService.GetUserDetails.query({ showDeleted: false }).$promise.then(function (respData, headers) {
                    vm.UserDetails = respData;
                    vm.$digest();
                });
            }
        };
        
        vm.AddUser = function () {
           vm.clearMessage();
           model.addUser();
            $('#sel2').val(-1);
            $("#email").removeAttr("disabled");
            $("#firstname").removeAttr("disabled");
            $("#lastname").removeAttr("disabled");
            $("#email").focus();
        };

        vm.UpdateUser = function () {
            vm.clearMessage();
            model.updateUser();
        };
        vm.homeclick = function () {
            model.homeClick();
        };
        vm.employeeclick = function () {
            model.employeeClick();
        };
        vm.rolesclick = function () {
            vm.clearMessage();
            model.rolesClick();
        };
        vm.modulesclick = function () {
            vm.clearMessage();
            model.modulesClick();
        };
        vm.statusclick = function () {
            vm.clearMessage();
            model.statusClick();
        };
        vm.logsclick = function () {
            vm.Type = "";
            $("#expdate1").val('');
            $("#expdate2").val('');
            vm.PreviousType = "";
            vm.PreviousFromDate = "";
            vm.PreviousToDate = "";
            if (vm.showFilter) vm.showFilter = false;
            vm.clearMessage();
            model.logsClick();

        };
        
        vm.GetUserLogs = function () {
            
        };
        
        vm.AssignRole = function () {
            model.assignRole();
        };
        vm.ValidateEmail = function () {
          model.validateEmail(); 
        };
        vm.RemoveRole = function () {
            model.removeRole();
        };
        vm.DeleteUser = function () {
            model.deleteUser();
        };
        vm.searchRoles = function () {
            vm.SearchResults = [];
            var key = vm.SearchAllRoleKey;
            if (key != null && key != "") {
                for (var i = 0; i < vm.Roles.length; i++) {
                    if (vm.Roles[i].Name.toLowerCase().match(key.toLowerCase())) {
                        vm.SearchResults.push(vm.Roles[i]);
                    }

                }
                vm.Roles = vm.SearchResults;
            }
            else {
                vm.GetUserRoles();
                vm.$digest();
            }
        };
        vm.searchAssignedRoles = function () {
            vm.SearchAssignedResults = [];
            var key = vm.SearchAssignedRoleKey;
            if (key != null && key != "") {
                for (var i = 0; i < vm.AssignedRoles.length; i++) {
                    if (vm.AssignedRoles[i].Name.toLowerCase().match(key.toLowerCase())) {
                        vm.SearchAssignedResults.push(vm.AssignedRoles[i]);
                    }

                }
                vm.AssignedRoles = vm.SearchAssignedResults;
            }
            else {
                vm.GetUserRoles();
                vm.$digest();
            }
        };
        vm.StopAssignedRolesSearch = function () {
            model.SearchAssignedRoleKey = "";
        };
        vm.StopRolesSearch = function () {
            model.SearchAllRoleKey = "";
        };
        vm.StopAssignedModulesSearch = function () {
            model.SearchAssignedModuleKey = "";
        };
        vm.StopModuleSearch = function () {
            model.SearchAllModuleKey = "";
        };

        vm.AssignModule = function () {
            model.assignModule();
        };
        vm.RemoveModule = function () {
            model.removeModule();
        };
        vm.AssignRole = function () {
            model.assignRole();
        };
        vm.RemoveRole = function () {
            model.removeRole();
        };
        vm.clearMessage=function(){
           model.clearMessage();
        }
        return vm.init();
    }
    userActionsModule.controller('UserActionsController', ['$scope', '$location', '$filter', '$rootScope', 'userActionService', 'userActionsModel', UserActionsController]);
}());