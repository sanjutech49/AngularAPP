
manageitModule.controller("administratorController", ['$scope', 'administratorService', 'sharedScope', '$filter', 'contentTypeService',
    function ($scope, administratorService, sharedScope, $filter, contentTypeService) {
        $scope.administrator = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        $scope.setAlert = false;

        $scope.resetErrorDirective = function (attModel) {
            attModel.isError = false;
            attModel.isSuccess = false;
            attModel.isWarning = false;
            attModel.isInfo = false;
            attModel.messages = [];
            attModel.moreDetails = null;
            attModel.isHide = false;
        }

        $scope.selectedRoles = [];
        var manageITController = sharedScope.get('manageITController');
       
        $scope.selectedRole = function (role) {
            $scope.selRole = role;            
        }

        $scope.unselectedRole = function (role) {
            $scope.unselRole = role;
        }

        $scope.moveRight = function () {
            if ($scope.selRole != "") {
            var index = manageITController.getDetails.admin.indexOf($scope.selRole);
            manageITController.getDetails.admin.splice(index, 1);
            manageITController.getDetails.contentAdmin.push($scope.selRole);
            $scope.selRole = "";
        }
        }

        $scope.moveLeft = function () {
            if ($scope.unselRole != "") {
                $scope.unselRole.IsContentAdmin = false;
                var index = manageITController.getDetails.contentAdmin.indexOf($scope.unselRole);
                manageITController.getDetails.contentAdmin.splice(index, 1);
                manageITController.getDetails.admin.push($scope.unselRole);
                $scope.unselRole = "";
                $scope.setAlert = true;
            }
        }

       $scope.UpdateContentAdminRoles = function () {
            $scope.resetErrorDirective($scope.administrator);
            $scope.errContentType = [];
            var roles = [];
            angular.forEach(manageITController.getDetails.contentAdmin, function (value) {
                value.IsContentAdmin = true;
                roles.push(value);
            });
            angular.forEach(manageITController.getDetails.admin, function (value) {
                roles.push(value);
            });
            if (manageITController.getDetails.contentAdmin.length > 0 || $scope.setAlert) {
                administratorService.updateContentAdminRoles(roles).$promise.then(function (response) {
                if (response.$resolved == true) {
                    $scope.administrator.messages.push("Content Administrator updated successfully");
                    $scope.administrator.isSuccess = true;
                    $scope.administrator.isError = false;
                    manageITController.getDetails.errordetails.isError = $scope.administrator.isError;
                    manageITController.getDetails.errordetails.isSuccess = $scope.administrator.isSuccess;
                    manageITController.getDetails.errordetails.messages = $scope.administrator.messages;
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        //$scope.errors.push(value.message);
                        $scope.domain.messages.push(value.message);
                        $scope.domain.moreDetails = value.moreDetails;
                        $scope.domain.isError = true;
                        manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                        manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                        manageITController.getDetails.errordetails.moreDetails = $scope.domain.moreDetails;

                    });
                }
                else {
                    $scope.domain.messages.push("Error occured while saving the Content Administrator. Please try after sometime.");
                    $scope.domain.isError = true;
                    manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                    manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                }

            });
            } else if (manageITController.getDetails.contentAdmin.length == 0 && !$scope.setAlert) {
            $scope.administrator.isSuccess = false;
            $scope.administrator.isError = true;
            $scope.administrator.messages.push("Please select atleast one role");
            manageITController.getDetails.errordetails.isError = $scope.administrator.isError;
            manageITController.getDetails.errordetails.isSuccess = $scope.administrator.isSuccess;
            manageITController.getDetails.errordetails.messages = $scope.administrator.messages;
            manageITController.getDetails.errordetails.moreDetails = $scope.administrator.moreDetails;
        }
        };
       
       
    }]);