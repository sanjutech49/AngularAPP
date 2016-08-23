
manageitModule.controller("domainController", ['$scope', '$rootScope', 'domainService', 'sharedScope', '$filter', 'contentTypeService',
    function ($scope, $rootScope, domainService, sharedScope, $filter, contentTypeService) {

        $scope.domain = {
            domainId: '', domainName: '', domainIdentifier: '', version: '',
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        sharedScope.store('domainController', $scope);
        $scope.isSaveClicked = false;
        $scope.isDeleteClicked = true;

        $scope.resetErrorDirective = function (attModel) {
            attModel.isError = false;
            attModel.isSuccess = false;
            attModel.isWarning = false;
            attModel.isInfo = false;
            attModel.messages = [];
            attModel.moreDetails = null;
        }

        $scope.clearDomainFields = function () {
            $scope.isDeleteClicked = true;
            $scope.domain.domainId = '';
            $scope.domain.domainName = '';
            $scope.domain.domainIdentifier = '';
            $scope.errors = [];
            $scope.selectedDomains = [];
            $scope.form.domainForm.$setPristine();
            $scope.changeFocus = true;

            $scope.resetErrorDirective($scope.domain);
            var manageITController = sharedScope.get('manageITController');
            manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
            manageITController.getDetails.errordetails.isError = $scope.domain.isError;
            manageITController.getDetails.errordetails.messages = $scope.domain.messages;
    }

    $scope.selectedDomain = function (selectedDmn) {
            $scope.isDeleteClicked = false;
            $scope.domain.domainId = selectedDmn.domainId;
            $scope.domain.domainName = selectedDmn.domainName;
            $scope.domain.domainIdentifier = selectedDmn.domainIdentifier;
            $scope.domain.version = selectedDmn.version;
            $scope.errors =[];
            $scope.resetErrorDirective($scope.domain);
            var manageITController = sharedScope.get('manageITController');
            manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
            manageITController.getDetails.errordetails.isError = $scope.domain.isError;
            manageITController.getDetails.errordetails.messages = $scope.domain.messages;

    }

    $scope.deriveDomainIdentifier = function () {
            if ($scope.domain.domainId == '') {
                $scope.domain.domainIdentifier = $filter('camelize') ($scope.domain.domainName);
    }
    }

    $scope.deriveDomainIdentifierFromId = function () {
            var char1 = $scope.domain.domainIdentifier.substr(0, 1).toLowerCase();;
            var restvalue = $scope.domain.domainIdentifier.substr(1, $scope.domain.domainIdentifier.length);
            $scope.domain.domainIdentifier = char1 +restvalue;

            }
        $scope.IsHidden = true;
        $scope.ShowHide = function () {
            //If DIV is hidden it will be visible and vice versa.

            $scope.IsHidden = !$scope.IsHidden;
            }

        $scope.validateDomain = function (attributeModel, errorCntrl) {
            var errorObj = errorCntrl.messages;
            var identifierPattern=new RegExp('^[A-Za-z0-9]{1,32}$');
            if (attributeModel.domainName == null || attributeModel.domainName == '' || attributeModel.domainName == undefined) {
                errorObj.push("Domain Name is required");
            }
            if (attributeModel.domainIdentifier == null || attributeModel.domainIdentifier == undefined || attributeModel.domainIdentifier == '') {
                errorObj.push("Domain Identifier is required");
            }
            if (attributeModel.domainName != null) {
                if (JSON.stringify(attributeModel.domainName).indexOf('://') > 0)
                {
                    errorObj.push("Invalid Domain URL");
            }
                if (attributeModel.domainName.length > 64) {
                    errorObj.push("Domain Name must be between 1 and 64 characters");
                }

            }
            if(!identifierPattern.test(attributeModel.domainIdentifier))
                {
                errorObj.push("Invalid Domain Indentifier");
                }                
                if (attributeModel.domainIdentifier != null && attributeModel.domainIdentifier.length > 64) {
                errorObj.push("Domain Identifier must be between 1 and 64 characters");
            }
            if (errorObj.length > 0) {
                errorCntrl.isError = true;
                errorCntrl.isHide = true;

                return false;
            }
            return true;
        }

        $scope.save = function (domain) {
            $scope.IsHidden = false;
            $scope.errors =[];
            $scope.resetErrorDirective($scope.domain);
            $scope.isSaveClicked = true;
            var manageITController = sharedScope.get('manageITController');

            // Get compaign base type controller.
            var campaignBaseTypeController = sharedScope.get('CampaignBaseTypeController');

            if ($scope.validateDomain($scope.domain, $scope.domain)) {
                if (domain.domainId == '') {
                    domain.createdBy = $rootScope.manageITUserName;
                    domain.createdDate = new Date();
                    domainService.create(domain).$promise.then(function (response) {
                        if(response.$resolved == true && response.domainId != "") {
                            //$scope.errors.push("Domain saved successfully");
                            $scope.domain.messages.push("Domain saved successfully");
                            $scope.domain.isSuccess = true;
                            // Call handleClick function
                            //     $scope.handleClick();
                            $scope.isSaveClicked = false;
                            $scope.domain.domainId = response.domainId;
                            $scope.domain.domainName = response.domainName;
                            $scope.domain.domainIdentifier = response.domainIdentifier;
                            $scope.domain.version = response.version;
                            $scope.form.domainForm.$setPristine();
                            //update the domain list after succecssful save.

                            if (manageITController != null) {
                                manageITController.getTypes('domain', 'false');
                                }
                            $scope.domain.isError = false;
                            manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                            manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                            manageITController.getDetails.errordetails.messages = $scope.domain.messages;



                            $scope.selectedDomains = [response.domainId];

                            // Load domains for campaigns.
                            if (campaignBaseTypeController != undefined)
                                campaignBaseTypeController.loadDomains();
                        }
                        }, function (error) {
                        $scope.isSaveClicked = false;
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function(value, key) {
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
                            $scope.domain.messages.push("Error occured while saving the Domain. Please try after sometime.");
                            $scope.domain.isError = true;
                            manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                            manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                            }

                            });
                            }
                        else {
                    domain.updatedBy = $rootScope.manageITUserName;
                    domain.updatedDate = new Date();
                    domainService.update(domain).$promise.then(function (response) {
                        if(response.$resolved == true && response.domainId != "") {
                                //$scope.errors.push("Domain updated successfully");
                                $scope.domain.messages.push("Domain updated successfully");
                                $scope.domain.isSuccess = true;
                                $scope.isSaveClicked = false;
                                $scope.domain.domainId = response.domainId;
                                $scope.domain.domainName = response.domainName;
                                $scope.domain.domainIdentifier = response.domainIdentifier;
                            $scope.domain.version = response.version;
                                $scope.form.domainForm.$setPristine();
                                    //update the domain list after succecssful save.  
                                var manageITController = sharedScope.get('manageITController');
                                if (manageITController != null) {
                                    manageITController.getTypes('domain', 'false');
                                    }
                            $scope.domain.isError = false;
                                manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                                manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                                manageITController.getDetails.errordetails.messages = $scope.domain.messages;

                                }
                    }, function (error) {
                        $scope.isSaveClicked = false;
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                    //$scope.errors.push(value.message);
                                    $scope.domain.messages.push(value.message);
                                    $scope.domain.moreDetails = value.moreDetails;
                                $scope.domain.isError = true;
                                $scope.domain.isSuccess = false;
                                    manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                                    manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                                    manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                                    manageITController.getDetails.errordetails.moreDetails = $scope.domain.moreDetails;
                                    });
                                    }
                        else {
                            $scope.domain.messages.push("Error occured while saving the Domain. Please try after sometime.");
                                $scope.domain.isError = true;
                                $scope.domain.isSuccess = false;
                                manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                                manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                            manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                        }

                        });
                        }
                        }
                                    else
                                    {
                $scope.domain.isSuccess = false;
                $scope.domain.isError = true;
                manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                manageITController.getDetails.errordetails.moreDetails = $scope.domain.moreDetails;
                
            }
            sharedScope.store('domainController', $scope);
            $scope.isDeleteClicked = false;
            }

        $scope.delete = function (ev) {
            $scope.errors =[];
            $scope.resetErrorDirective($scope.domain);
            if ($scope.domain.domainId != '') {
                $scope.IsHidden = false;
            //if (confirm("Are you sure you want to delete the domain?")) {
                $scope.isDeleteClicked = true;
                var manageITController = sharedScope.get('manageITController');
                    contentTypeService.query({
                    id: $scope.domain.domainId }).$promise.then(function (details) {
                        if (details && details.length == 0) {
                            domainService.remove($scope.domain).$promise.then(function (response) {
                                if (response.$resolved == true) {
                        //$scope.errors.push("Domain deleted successfully");
                        $scope.domain.messages.push("Domain deleted successfully");
                        $scope.domain.isSuccess = true;
                        $scope.form.domainForm.$setPristine();
                                    $scope.domain.domainId = "";
                                    $scope.domain.domainName = "";
                                    $scope.domain.domainIdentifier = "";
                                        //update the domain list after succecssful delete. 
                                    var manageITController = sharedScope.get('manageITController');
                                    if (manageITController != null) {
                                        manageITController.getTypes('domain', 'false');
                                    }
                                    manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                                    manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                                }
                                }, function (error) {
                                $scope.isDeleteClicked = false;
                                if (error.data.errorMessage) {
                                    angular.forEach(error.data.errorMessage, function (value, key) {
                                        //$scope.errors.push(value.message);
                                        $scope.domain.messages.push(value.message);
                            $scope.domain.moreDetails = value.moreDetails;
                            $scope.domain.isError = true;
                            $scope.domain.isSuccess = false;
                            manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                            manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                                        manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                            manageITController.getDetails.errordetails.moreDetails = $scope.domain.moreDetails;
                                    });
                                    }
                            else {
                                $scope.domain.messages.push("Error occured while deleting the Domain. Please try after sometime.");
                                    $scope.domain.isError = true;
                        $scope.domain.isSuccess = false;
                                    manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                        manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                        manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                            }
                            });
                            }
                            else {
                            $scope.domain.messages.push("Cannot delete the Domain, one or more content types have been defined for this domain.");
                $scope.domain.isError = true;
                $scope.domain.isSuccess = false;
                manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
                manageITController.getDetails.errordetails.isError = $scope.domain.isError;
                manageITController.getDetails.errordetails.messages = $scope.domain.messages;
                }

                }, function (error) {
                            //$scope.errors.push("error in getting contentTypes");
                        });
                            //}
            }
            else {
    $scope.domain.messages.push("Please select a Domain.");
    $scope.domain.isError = true;
            $scope.domain.isSuccess = false;
            manageITController.getDetails.errordetails.isSuccess = $scope.domain.isSuccess;
    manageITController.getDetails.errordetails.isError = $scope.domain.isError;
    manageITController.getDetails.errordetails.messages = $scope.domain.messages;
    }
    }
    }]);