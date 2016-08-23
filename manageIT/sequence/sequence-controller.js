
manageitModule.controller("sequenceController", ['$scope','$rootScope', 'sequenceService', 'sharedScope', '$filter', 'contentTypeService',
    function ($scope, $rootScope, sequenceService, sharedScope, $filter, contentTypeService) {

       // $scope.sequence = { sequenceId: '', sequenceName: '', sequencePrefix: '', firstNumber: '', paddedLength: '', createdBy: '', createdDate: '', version: '', readonly: false };
        $scope.sequence = {
            sequenceId: '', sequenceName: '', sequencePrefix: '', firstNumber: '', paddedLength: '', createdBy: '', createdDate: '', version: '', readonly: '',
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };
    sharedScope.store('sequenceController', $scope);

    $scope.isDeleteClicked = true;

    $scope.resetErrorDirective = function (attModel) {
        attModel.isError = false;
        attModel.isSuccess = false;
        attModel.isWarning = false;
        attModel.isInfo = false;
        attModel.messages = [];
        attModel.moreDetails = null;
    }
    $scope.clearSequenceFields = function () {
        $scope.isDeleteClicked = true;
        $scope.form.sequenceForm.$setPristine();
        $scope.sequence.sequenceId = '';
        $scope.sequence.sequenceName = '';
        $scope.sequence.sequencePrefix = '';
        $scope.sequence.firstNumber = '1';
        $scope.sequence.paddedLength = '';
        $scope.errors = [];
        $scope.sequence.readonly = false;
        $scope.selectedSequences = [];
        //$scope.sequenceForm.$setPristine();
        $scope.resetErrorDirective($scope.sequence);
        var manageITController = sharedScope.get('manageITController');
        manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
        manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
        manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
    }

    $scope.selectedSequence = function (selectedSeq) {
        $scope.isDeleteClicked = false;
        $scope.sequence.sequenceId = selectedSeq.sequenceId;
        $scope.sequence.sequenceName = selectedSeq.sequenceName;
        $scope.sequence.sequencePrefix = selectedSeq.sequencePrefix;
        $scope.sequence.firstNumber = selectedSeq.firstNumber;
        $scope.sequence.paddedLength = selectedSeq.paddedLength;
        $scope.errors = [];
        $scope.sequence.readonly = true;
        $scope.resetErrorDirective($scope.sequence);
        var manageITController = sharedScope.get('manageITController');
        manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
        manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
        manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
    }
    $scope.IsHidden = true;
    $scope.ShowHide = function () {
        //If DIV is hidden it will be visible and vice versa.

        $scope.IsHidden = !$scope.IsHidden;
    }

    $scope.validateSequence = function (attributeModel, errorCntrl) {

        var errorObj = errorCntrl.messages;
        if (attributeModel.sequenceName == null || attributeModel.sequenceName == '' || attributeModel.sequenceName == undefined) {
            errorObj.push("Sequence Name is required");
        }
        if (attributeModel.firstNumber == null || attributeModel.firstNumber == undefined || attributeModel.firstNumber == '') {
            errorObj.push("Sequence FirstNumber is required");
        }
        if (attributeModel.sequenceName != null && attributeModel.sequenceName.length > 64) {
            errorObj.push("Sequence Name must be between 1 and 64 characters");
        }
        //if (attributeModel.domainIdentifier != null && attributeModel.domainIdentifier.length > 64) {
        //    errorObj.push("Domain Identifier must be between 1 and 64 characters");
        //}
        if (errorObj.length > 0) {
            errorCntrl.isError = true;
            errorCntrl.isHide = true;

            return false;
        }
        return true;
    }

    $scope.save = function (sequence) {
        $scope.IsHidden = false;
        $scope.errors = [];
        $scope.resetErrorDirective($scope.sequence);
        $scope.sequence.readonly = true;
        var manageITController = sharedScope.get('manageITController');
        var attributController = sharedScope.get('attributeController');

        // Get compaign base type controller.
        var campaignBaseTypeController = sharedScope.get('CampaignBaseTypeController');

        if ($scope.validateSequence($scope.sequence, $scope.sequence)) {
            if (sequence.sequenceId == '') {
                sequence.createdBy = $rootScope.manageITUserName;
                sequence.createdDate = new Date();
                sequenceService.create(sequence).$promise.then(function (response) {
                    if (response.$resolved == true && response.sequenceId != null) {
                        $scope.sequence.messages.push("Sequence saved successfully");
                        $scope.sequence.isSuccess = true;
                        $scope.isSaveClicked = false;
                        $scope.sequence.sequenceName = response.sequenceName;
                        $scope.sequence.sequencePrefix = response.sequencePrefix;
                       // $scope.sequenceForm.$setPristine();
                        $scope.sequence.isError = false;                        
                        $scope.selectedSequences = [response.sequenceId];
                        //update the sequence list after succecssful save.
                        manageITController.getTypes('sequence', 'false');                        
                        if (attributController != undefined)
                            attributController.loadSequences();

                        // Load sequences for campaigns.
                        if (campaignBaseTypeController != undefined)
                            campaignBaseTypeController.loadSequences();

                        manageITController.getDetails.errordetails.isError = false;
                        manageITController.getDetails.errordetails.isSuccess = true;
                        manageITController.getDetails.errordetails.messages.push("Sequence saved successfully");
                    }
                }, function (error) {
                    $scope.sequence.readonly = false;
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            //$scope.errors.push(value.message);
                            $scope.sequence.messages.push(value.message);
                            $scope.sequence.moreDetails = value.moreDetails;
                            $scope.sequence.isError = true;
                            $scope.sequence.isSuccess = false;
                            manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
                            manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
                            manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
                            manageITController.getDetails.errordetails.moreDetails = $scope.sequence.moreDetails;
                        });
                    }

                    else {
                        $scope.sequence.messages.push("Error occured while saving the Sequence. Please try after sometime.");
                        $scope.sequence.isError = true;
                        $scope.sequence.isSuccess = false;
                        manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
                        manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
                        manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
                    }

                });
            }
            else {
                $scope.sequence.messages.push("Sequence cannot be modified.");
                $scope.sequence.isError = true;
                $scope.sequence.isSuccess = false;
                manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
                manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
                manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
            }
        }
        else {
            $scope.sequence.isSuccess = false;
            $scope.sequence.isError = true;
            $scope.sequence.readonly = false;
            manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
            manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
            manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
            manageITController.getDetails.errordetails.moreDetails = $scope.sequence.moreDetails;

        }
    };

    $scope.delete = function (ev) {
        $scope.errors = [];
        $scope.resetErrorDirective($scope.sequence);
        var manageITController = sharedScope.get('manageITController');
        var attributController = sharedScope.get('attributeController');
        if ($scope.sequence.sequenceId != '') {
            $scope.IsHidden = false;
            //if (confirm("Are you sure you want to delete the sequence?")) {
                $scope.isDeleteClicked = true;
            sequenceService.remove($scope.sequence).$promise.then(function (response) {
                if (response.$resolved == true) {

                    $scope.sequence.messages.push("Sequence deleted successfully");
                    $scope.sequence.isSuccess = true;
                    $scope.sequence.sequenceId = '';
                    $scope.sequence.sequenceName = '';
                    $scope.sequence.sequencePrefix = '';
                    $scope.sequence.firstNumber = '1';
                    $scope.sequence.paddedLength = '';
                    $scope.form.sequenceForm.$setPristine();
                    //update the sequence list after succecssful save.
                    manageITController.getTypes('sequence', 'false');
                    if (attributController != undefined)
                        attributController.loadSequences();
                }
                manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
                manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
            }, function (error) {
                $scope.isDeleteClicked = false;
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.sequence.messages.push(value.message);
                        $scope.sequence.moreDetails = value.moreDetails;
                        $scope.sequence.isError = true;
                        $scope.sequence.isSuccess = false;
                        manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
                        manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
                        manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
                        manageITController.getDetails.errordetails.moreDetails = $scope.sequence.moreDetails;
                    });
                }
                else {
                    $scope.sequence.messages.push("Error occured while deleting the Sequence. Please try after sometime.");
                    $scope.sequence.isError = true;
                    $scope.sequence.isSuccess = false;
                    manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
                    manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
                    manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
                }

            });
        //}
        }
        else {
            $scope.sequence.messages.push("Please select a Sequence.");
            $scope.sequence.isError = true;
            $scope.sequence.isSuccess = false;
            manageITController.getDetails.errordetails.isSuccess = $scope.sequence.isSuccess;
            manageITController.getDetails.errordetails.isError = $scope.sequence.isError;
            manageITController.getDetails.errordetails.messages = $scope.sequence.messages;
        }

    }

}]);
