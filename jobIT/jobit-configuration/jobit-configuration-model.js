(function () {
    "use strict";
    function jobitConfigurationModel(svc) {
        var model = {};
        model.addedRoles = [];
        model.removedRoles = [];
        model.messages = [];
        model.errors = [];
        model.init = function () {
            return model;
        };

        model.getUserRoles = function () {
            model.unAssignedRoles = [];
            svc.userRolesService.query().$promise.then(
               function (respData, headers) {
                   if (respData != null) {
                       model.roles = respData;
                       angular.extend(model.unAssignedRoles, model.roles);
                   }
               });
            model.assignedRoles = [];
            svc.userRolesService.getProductionAdminRoles().$promise.then(
                function (respData, headers) {
                    if (respData != null) {
                        model.selectedroles = respData;
                        angular.extend(model.assignedRoles, model.selectedroles);
                    }
                });
        };
        model.moveRight = function () {
            if (model.LeftRoles) {
                angular.forEach(model.LeftRoles, function (roleName) {
                    var index = 0;
                    var roleIndex = -1;
                    angular.forEach(model.unAssignedRoles, function (unassignedrole) {
                        if (unassignedrole.Name === roleName) {
                            model.role = unassignedrole;
                            roleIndex = index;
                        }
                        index++;
                    });
                    model.role.IsProductionAdmin = true;
                    model.unAssignedRoles.splice(roleIndex, 1);
                    model.assignedRoles.push(model.role);
                    var removeIndex = model.removedRoles.indexOf(model.role);
                    if (removeIndex === -1) {
                        model.addedRoles.push(model.role);
                    }
                    else {
                        model.removedRoles.splice(removeIndex, 1);
                    }
                });
                model.LeftRoles = [];
            }
        };

        model.moveLeft = function () {
            if (model.RightRoles) {
                angular.forEach(model.RightRoles, function (roleName) {
                    var index = 0;
                    var roleIndex = -1;
                    angular.forEach(model.assignedRoles, function (assignedrole) {
                        if (assignedrole.Name === roleName) {
                            model.role = assignedrole;
                            roleIndex = index;
                        }
                        index++;
                    });
                    model.role.IsProductionAdmin = false;
                    model.assignedRoles.splice(roleIndex, 1);
                    model.unAssignedRoles.push(model.role);
                    var addIndex = model.addedRoles.indexOf(model.role);
                    if (addIndex === -1) {
                        model.removedRoles.push(model.role);
                    }
                    else {
                        model.addedRoles.splice(addIndex, 1);
                    }
                });
                model.RightRoles = [];
            }
        };

        model.UpdateProductionAdminRoles = function () {
            var roles = [];
            angular.forEach(model.addedRoles, function (role) {
                roles.push(role);
            });
            angular.forEach(model.removedRoles, function (role) {
                roles.push(role);
            });
            if (roles.length > 0) {
                svc.userRolesService.updateProductionAdminRoles(roles).$promise.then(function (response) {
                    if (response.$resolved === true) {
                        model.messages.push("Production Administrator(s) updated successfully");
                        model.addedRoles = [];
                        model.removedRoles = [];
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            model.errors.push(value.message);
                        });
                    }
                    else {
                        model.errors.push("Error occured while saving the Content Administrator. Please try after sometime.");
                    }
                });
            }
        };
        model.clearMessages = function () {
            model.messages = [];
        };
        model.clearErrors = function () {
            model.errors = [];
        };
        return model.init();
    }
    angular.module('jobit.configuration').factory('jobitConfigurationModel', ['jobitConfigurationService', jobitConfigurationModel]);
}());