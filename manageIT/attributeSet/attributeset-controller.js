
manageitModule.controller("attributeSetController", ['$scope','$rootScope' , 'newSharedScope', 'sharedScope', 'attributeSetService',
    function ($scope,$rootScope, newSharedScope, sharedScope, attributeSetService) {

        sharedScope.store('attributeSetController', $scope);
        $scope.classificationCondition = [
         { key: "0", value: "Any Classification" },
         { key: "1", value: "Specific Classification" }
        ];

        $scope.setFormScope = function (scope, formName) {
            $scope[formName] = scope;
            //$scope.formScope = scope;
        }

        $scope.editOrAdd = "Add";
        $scope.isAttributeSet = false;
        $scope.attributeSet = { attributeSetId: null, attributeSetName: null, displayHeading: null, isAnyViewClassification: null, isAnyEditClassification: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false };

        $scope.clearAttributeSetFields = function () {
            $scope.isAttributeSet = true;
            $scope.editOrAdd = "Add";
            $scope.errorsAttSet = [];
            var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
            var classificationExpressionBuilderController2 = newSharedScope.get('classificationExpressionBuilderController2');
            $scope.isClassification = true;

            $scope.attributeSet = { attributeSetId: null, attributeSetName: null, displayHeading: null, isAnyViewClassification: null, isAnyEditClassification: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false };

            classificationExpressionBuilderController.clearForm();
            classificationExpressionBuilderController2.clearForm();
            classificationExpressionBuilderController.isFirst = true;
            classificationExpressionBuilderController2.isFirst = true;

        }

        $scope.attributeSets = [];
        $scope.attributeTypeIsString = true;

        $scope.getAttributeSets = function () {
           
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            $scope.attributeSets = [];

            var librariesId;
            if (contentType.imageLibraryId) {
                librariesId = contentType.imageLibraryId;
            }
            else if (contentType.contentTypeId) {
                librariesId = contentType.contentTypeId;
            }
            else {
                librariesId = contentType.documentLibraryId;
            }
            
            attributeSetService.allAttributeSetQuery({ domainId: contentType.domainId, id: librariesId }).$promise.then(function (details) {
                if (details) {
                    $scope.attributeSets = details;
                    console.log($scope.attributeSets);
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value);
                    });
                }
                else {
                    $scope.errors.push("Error occured while fetching an AttributeSets. Please try after sometime.");
                }

            });
        }

        $scope.saveAttributeSet = function (attributeSet) {
            $scope.attributeSet.messages = [];
            $scope.attributeSet.moreDetails = null;
            $scope.errors = [];
            var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
            var classificationExpressionBuilderController2 = newSharedScope.get('classificationExpressionBuilderController2');
            //create an instance of the factory
            var newClassification = new attributeSetService();
            //add attributeset based on library and contentType
           

            newClassification.attributeSetName = attributeSet.attributeSetName;
            newClassification.displayHeading = attributeSet.displayHeading;
            newClassification.attributeSetViewNegationOperator = attributeSet.attributeSetViewNegationOperator;
            newClassification.attributeSetEditNegationOperator = attributeSet.attributeSetEditNegationOperator;
            newClassification.isAnyViewClassification = attributeSet.isAnyViewClassification == "1" ? true : false;
            newClassification.isAnyEditClassification = attributeSet.isAnyEditClassification == "1" ? true : false;

            if (newClassification.isAnyViewClassification) {
                newClassification.viewClassification = classificationExpressionBuilderController.conditionsDisplay;

                //update the parent negation operator.
                angular.forEach(newClassification.viewClassification, function (v, k) {
                    v.expressionNegationOperator = classificationExpressionBuilderController.storeExpressions[k];
                });
            }
            else newClassification.viewClassification = [];

            if (newClassification.isAnyEditClassification) {
                newClassification.editClassification = classificationExpressionBuilderController2.conditionsDisplay;

                //update the parent negation operator.
                angular.forEach(newClassification.editClassification, function (v, k) {
                    v.expressionNegationOperator = classificationExpressionBuilderController2.storeExpressions[k];
                });
            }
            else newClassification.editClassification = [];

            if (attributeSet.attributeSetId == '' || attributeSet.attributeSetId == null) {
                newClassification.createdBy = $rootScope.manageITUserName;
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newClassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newClassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newClassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                attributeSetService.create({ domainId: contentType.domainId }, newClassification).$promise.then(function (response) {
                    if (response.$resolved == true && response.attributeId != "") {
                        //$scope.errors.push("AttributeSet saved successfully");
                        $scope.attributeSet.isHide = false;
                        $scope.attributeSet.isSuccess = true;
                        $scope.attributeSet.messages.push("AttributeSet saved successfully");                        
                        $('#AttributeSet').hide();
                        $('.modal-backdrop').hide();
                        $scope.getAttributeSets();
                        //call the dynamic left menu function.
                        sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {                          
                            $scope.attributeSet.messages.push(value.message);
                            $scope.attributeSet.moreDetails = value.moreDetails;
                            $scope.attributeSet.isError = true;
                            $scope.attributeSet.isHide = true;
                        });
                    }
                    else {              
                        $scope.attributeSet.messages.push("Error occured while saving the AttributeSet. Please try after sometime.");                      
                        $scope.attributeSet.isError = true;
                        $scope.attributeSet.isHide = true;

                    }
                });
            }
            else {
                //update attributeset based on library and contentType
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newClassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newClassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newClassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                newClassification.updatedBy = $rootScope.manageITUserName;
                newClassification.attributeSetName = attributeSet.attributeSetName;
                newClassification.attributeSetId = attributeSet.attributeSetId;
                attributeSetService.update({ domainId: contentType.domainId }, newClassification).$promise.then(function (response) {

                    if (response.$resolved == true && response.attributeId != "") {
                        $scope.attributeSet.isHide = false;
                        $scope.attributeSet.isSuccess = true;
                        $scope.attributeSet.messages.push("AttributeSet updated successfully");
                        $('#AttributeSet').hide();
                        $('.modal-backdrop').hide();
                        $scope.getAttributeSets();
                        //call the dynamic left menu function.
                        sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.attributeSet.messages.push(value.message);
                            $scope.attributeSet.moreDetails = value.moreDetails;
                            $scope.attributeSet.isError = true;
                            $scope.attributeSet.isHide = true;
                        });
                    }
                    else {
                        $scope.attributeSet.messages.push("Error occured while updating the AttributeSet. Please try after sometime.");
                        $scope.attributeSet.isError = true;
                        $scope.attributeSet.isHide = true;
                    }
                });
            }
        }

        $scope.editAttributeSet = function (attributeSet) {
            $scope.clearAttributeSetFields();
            $scope.errors = [];
            $scope.isAttributeSet = true;
            $scope.editOrAdd = "Edit";

            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            attributeSet.domainId = contentType.domainId;
            if (contentType.imageLibraryId) {
                attributeSet.imageLibraryId = contentType.imageLibraryId;
                attributeSet.contentTypeId = ''
                attributeSet.documentLibraryId = '';
                var serviceval = attributeSetService.getById({ domainId: contentType.domainId, contentTypeId: contentType.imageLibraryId, id: attributeSet.attributeSetId });
            }
            else if (contentType.contentTypeId) {
                attributeSet.contentTypeId = contentType.contentTypeId;
                attributeSet.imageLibraryId = '';
                attributeSet.documentLibraryId = '';
                var serviceval = attributeSetService.getById({ domainId: contentType.domainId ,contentTypeId: contentType.contentTypeId, id: attributeSet.attributeSetId });
            }
            else {
                attributeSet.contentTypeId = '';
                attributeSet.documentLibraryId = contentType.documentLibraryId;
                attributeSet.imageLibraryId = '';
                var serviceval = attributeSetService.getById({ domainId: contentType.domainId, contentTypeId: contentType.documentLibraryId, id: attributeSet.attributeSetId });
            }


            if (attributeSet.attributeSetId != '') {
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;              
                // attributeSetService.getById({ domainId: contentType.domainId, contentTypeId: contentType.contentTypeId, id: attributeSet.attributeSetId }).$promise.then(function (response) {
                serviceval.$promise.then(function (response) {
                    if (response.$resolved == true) {
                        var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
                        var classificationExpressionBuilderController2 = newSharedScope.get('classificationExpressionBuilderController2');
                        $scope.attributeSet.attributeSetId = response.attributeSetId;
                        $scope.attributeSet.attributeSetName = response.attributeSetName;
                        $scope.attributeSet.displayHeading = response.displayHeading;
                        classificationExpressionBuilderController.attributeSet.isAnyViewClassification = response.isAnyViewClassification ? "1" : "0";
                        classificationExpressionBuilderController2.attributeSet.isAnyEditClassification = response.isAnyEditClassification ? "1" : "0";
                        $scope.attributeSet.attributeSetViewNegationOperator = attributeSet.attributeSetViewNegationOperator;
                        $scope.attributeSet.attributeSetEditNegationOperator = attributeSet.attributeSetEditNegationOperator;
                        classificationExpressionBuilderController.conditionsDisplay = response.viewClassification;
                        classificationExpressionBuilderController2.conditionsDisplay = response.editClassification;
                        classificationExpressionBuilderController.isFirst = false;
                        classificationExpressionBuilderController2.isFirst = false;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.attributeSet.messages.push(value.message);
                            $scope.attributeSet.moreDetails = value.moreDetails;
                            $scope.attributeSet.isError = true;
                            $scope.attributeSet.isHide = true;
                        });
                    }
                    else {                       
                        $scope.attributeSet.messages.push("Error occured while fetching an AttributeSet. Please try after sometime.");
                        $scope.attributeSet.isError = true;
                        $scope.attributeSet.isHide = true;
                    }
                });
            }
        }

        $scope.deleteAttributeSet = function (attributeSet) {

            $scope.errors = [];
            if (attributeSet.attributeSetId != '') {
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                attributeSet.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                attributeSet.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                attributeSet.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                attributeSetService.removeLibrary(attributeSet).$promise.then(function (response) {

              //  attributeSetService.remove({ contentTypeId: contentType.contentTypeId, id: attributeSet.attributeSetId }).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.attributeSet.isHide = false;
                        $scope.attributeSet.isSuccess = true;
                        $scope.attributeSet.messages.push("AttributeSet deleted successfully");
                        $scope.getAttributeSets();
                        //call the dynamic left menu function.
                        sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.attributeSet.messages.push(value.message);
                            $scope.attributeSet.moreDetails = value.moreDetails;
                            $scope.attributeSet.isError = true;
                            $scope.attributeSet.isHide = true;
                        });
                    }
                    else {                 
                        $scope.attributeSet.messages.push("Error occured while deleting an AttributeSet. Please try after sometime.");
                        $scope.attributeSet.isError = true;
                        $scope.attributeSet.isHide = true;
                    }
                });
            }
        }
        //functions for handle cancel popup Start
        $scope.openErrorScreen = function (formStatus, formName) {
            $scope.attributeFormDirty = formStatus;
            $scope.attributeForm = formName;
            $scope.isErrorScreen = true;
        }
        $scope.confirmErrorScreenClose = function (attributeForm) {

            angular.element('#' + attributeForm).modal('hide');
            $scope.attributeFormDirty = false;
            $scope.attributeForm = "";
            $scope.isErrorScreen = false;
            $scope.attributeSetForm.attributeSetForm.$setPristine();
            //if (attributeForm == 'DateTime') {
            //    $scope.clearDateTimeAttributeFields();
            //}
            //else if (attributeForm == 'Date') {
            //    $scope.clearDateAttributeFields();
            //}
            //else if (attributeForm == 'Time') {
            //    $scope.clearTimeAttributeFields();
            //}
            //else if (attributeForm == 'YesNo') {
            //    $scope.clearYesNoAttributeFields();
            //}
            //else if (attributeForm == 'Decimal') {
            //    $scope.clearDecimalAttributeFields(formName)();
            //}
            //else if (attributeForm == 'Sequence') {
            //    $scope.clearSequenceAttributeFields();
            //}


        }
        $scope.errorAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };

    }]);