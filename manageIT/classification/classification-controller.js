
manageitModule.controller("classificationController", ['$scope', '$rootScope', 'sharedScope', 'classificationService', 'textAttributeService', '$routeParams', '$filter', 'contentTypeService',
    function ($scope, $rootScope, sharedScope, classificationService, textAttributeService, $routeParams, $mdDialog, $mdMedia, $filter, contentTypeService) {
    sharedScope.store('classificationController', $scope);
    $scope.items = [1, 2, 3, 4, 5];
    $scope.isClassification = false;
    $scope.editOrAdd = "Add";
    $scope.firstRowEdit = false;
    $scope.isdirty = false;
    $scope.classification = {
        classificationId: '', classificationName: '', classificationType: '', classificationNegationOperator: '',
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
    };
    $scope.errorAttribute = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.resetErrorDirective = function (attModel) {
        attModel.isError = false;
        attModel.isSuccess = false;
        attModel.isWarning = false;
        attModel.isInfo = false;
        attModel.messages = [];
        attModel.moreDetails = null;
    }
    //$scope.confirmations = function (good, classification) {
        
    // if (good == true) {
    //        $scope.saveClassification(classification);
    //        //   $scope.onButton2Click = function () {
    //        // $('#btnsave').click();
    //        // }
    //        //angular.element('.btn-primary')[1].triggerhandler('click');
    //    } else {
    //        $scope.clearClassificationFields();
    //        $("#Classification").modal("hide");
    //    } 
       
    //}
    $scope.clearClassificationFields = function () {
        //$scope.errors = [];
        $scope.errorsClassification = [];
        $scope.editOrAdd = "Add";
        //var expressionBuilderController = sharedScope.get('expressionBuilderController');
        $scope.isClassification = true;
        $scope.classification.classificationId = "";
        $scope.classification.classificationName = "";
        $scope.classification.classificationType = "";
        $scope.classification.classificationNegationOperator = false;        
        $scope.clearForm();
        $scope.isFirst = true;
    }

    $scope.classification = [];
    $scope.attributes = [];
    $scope.classItem = {};

    $scope.classificationType = [
     { key: "0", value: "Query Classification" }
    ];

    $scope.attributeTypeIsString = true;

    $scope.getClassifications = function () {
        //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        $scope.classifications = [];
        var libraryid = "";
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        if (contentType.imageLibraryId) {
              libraryid = contentType.imageLibraryId;
        } else if (contentType.contentTypeId) {
            libraryid = contentType.contentTypeId
        }
        else {
             libraryid = contentType.documentLibraryId
        } 
        classificationService.queryAll({ domainId: contentType.domainId, id:libraryid }).$promise.then(function (details) {
            if (details) {
                //$scope.classifications = details; 
                var libraryid = "";
                if (contentType.imageLibraryId) {
                      libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                     libraryid = contentType.contentTypeId
                }
                else {
                     libraryid = contentType.documentLibraryId
                }        
                textAttributeService.getAllAttributesInLibrary({ domainId: contentType.domainId, contentTypeId: libraryid, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (result) { 
                //textAttributeService.query({ id: $routeParams.contentTypeId, attributeType: 'textattribute' }).$promise.then(function (result) {
                    if ($scope.attributes.length==0){
                    angular.forEach(result, function (resAttr) {
                        if (resAttr.attributeType != "ObjectReferenceAttribute" && resAttr.attributeType != "DocumentReferenceAttribute" && resAttr.attributeType != "ImageReferenceAttribute" && resAttr.attributeType != "CopyAttribute")
                            $scope.attributes.push(resAttr);
                    });
                    }
                    var contentTypeClassifications = [];
                    var subObjectClassifications = [];

                    angular.forEach(details, function (value, key) {

                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeClassifications.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectClassifications.push(value);
                        }

                    });

                    if ($routeParams.subObjectId == "0") {
                        $scope.classifications = contentTypeClassifications;
                    }
                    else {
                        $scope.classifications = subObjectClassifications;
                    }
                    
                    angular.forEach($scope.classifications, function (value, key) {
                        $scope.fillAttributeValue(value.conditions);
                    });
                });                
                
            }
        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.errors.push(value.message);
                });
            }
            else {
                $scope.errors.push("Error occured while fetching classifications. Please try after sometime.");
            }

        });
    }
    $scope.discardClassification = function () {
        $scope.getClassifications();
    }

    $scope.fillAttributeValue = function (conditionsArray) {
        angular.forEach(conditionsArray, function (value, key) {
            //var attType = { attributeId: value.attributeId, attributeType: value.attributeType, name: value.name, identifier: value.attributeType };
            angular.forEach($scope.attributes, function (v, k) {
                
                if (v.attributeId == value.attributeType) {                   
                    value.attributeType = v;
                }
            });
            
            $scope.fillAttributeValue(value.subConditions);
        });
    }
    
    //$scope.convertToString = function (conditionsArray) {
    //    angular.forEach(conditionsArray, function (value, key) {
    //        var attType = value.attributeType.identifier;
    //        value.attributeType = null;
    //        value.attributeType = attType;
    //        $scope.fillAttribute(value.subConditions);
    //    });
    //}

    $scope.saveClassification = function (classification) {
        $scope.errors = [];        
        $scope.errorsClassification = [];
        //var expressionBuilderController = sharedScope.get('expressionBuilderController');
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;

        var newClassification = {};

        newClassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
        newClassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
        newClassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

      //  newClassification.contentTypeId = $routeParams.contentTypeId;
        newClassification.subObjectId = $routeParams.subObjectId;
        newClassification.classificationName = classification.classificationName;
        newClassification.classificationType = classification.classificationType;
        newClassification.classificationNegationOperator = classification.classificationNegationOperator;
        newClassification.conditions = $scope.conditions;
        
        //update the parent negation operator.
        angular.forEach(newClassification.conditions, function (v, k) {            
            v.expressionNegationOperator = $scope.storeExpressions[k];
        });
        
        if (classification.classificationId == '') {            
            newClassification.createdBy = $rootScope.manageITUserName;
            
            classificationService.create({ domainId: contentType.domainId }, newClassification).$promise.then(function (response) {
                
                if (response.$resolved == true && response.attributeId != "") {
                    $scope.classification.messages.push("Classification saved successfully");
                    $scope.classification.isSuccess = true;
                    $scope.clearClassificationFields();
                    $scope.getClassifications();
                    $('#Classification').hide();
                    $('.modal-backdrop').hide();
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.classification.messages.push(value.message);
                        $scope.classification.moreDetails = value.moreDetails;
                        $scope.classification.isError = true;
                        $scope.classification.isHide = true;
                    });
                }
                else {
                    $scope.classification.messages.push("Error occured while saving the Classification. Please try after sometime.");
                    $scope.classification.isError = true;
                    $scope.classification.isHide = true;

                }               
            });
        }
        else {
            newClassification.classificationId = classification.classificationId;
            newClassification.updatedBy = $rootScope.manageITUserName;
            $scope.classification.isInfo = true;
            newClassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            newClassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            newClassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            classificationService.update({ domainId: contentType.domainId }, newClassification).$promise.then(function (response) {
                if (response.$resolved == true && response.attributeId != "") {
                    $scope.resetErrorDirective($scope.classification);
                    $scope.classification.isSuccess = true;
                    $scope.classification.messages.push("Classification updated successfully");
                    $scope.clearClassificationFields();
                    $scope.getClassifications();
                    $('#Classification').hide();
                    $('.modal-backdrop').hide();
                }
            }, function (error) {
                
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.classification.messages.push(value.message);
                        $scope.classification.moreDetails = value.moreDetails;
                        $scope.classification.isError = true;
                        $scope.classification.isHide = true;
                    });
                }
                else {
                    $scope.classification.messages.push("Error occured while saving the Classification. Please try after sometime.");
                    $scope.classification.isError = true;
                    $scope.classification.isHide = true;

                }
            });
        }
        $scope.resetErrorDirective($scope.classification);
    }

    $scope.editClassification = function (classification) {
        $scope.errors = [];        
        $scope.errorsClassification = [];
        $scope.isClassification = true;
        $scope.editOrAdd = "Edit";
        //var expressionBuilderController = sharedScope.get('expressionBuilderController');
        $scope.isAttributeMatch = false;
        if (classification.classificationId != '') {          
            $scope.classification.classificationId = classification.classificationId;
            $scope.classification.classificationName = classification.classificationName;
            $scope.classification.classificationType = classification.classificationType;
            $scope.classification.classificationNegationOperator = classification.classificationNegationOperator;
            $scope.loadConditionDisplay(classification);
            $scope.attributeTypeIsString = false;

            //this is to load the display.
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;

          
            classification.domainId = contentType.domainId;
            if (contentType.imageLibraryId) {
                classification.imageLibraryId = contentType.imageLibraryId;
                classification.contentTypeId = ''
                classification.documentLibraryId = '';
                var serviceval = classificationService.get({ domainId: contentType.domainId, contentTypeId: contentType.imageLibraryId, id: classification.classificationId });
            }
            else if (contentType.contentTypeId) {
                classification.contentTypeId = contentType.contentTypeId;
                classification.imageLibraryId = '';
                classification.documentLibraryId = '';
                var serviceval = classificationService.get({ domainId: contentType.domainId, contentTypeId: contentType.contentTypeId, id: classification.classificationId });
            }
            else {
                classification.contentTypeId = '';
                classification.documentLibraryId = contentType.documentLibraryId;
                classification.imageLibraryId = '';
                var serviceval = classificationService.get({ domainId: contentType.domainId, contentTypeId: contentType.documentLibraryId, id: classification.classificationId });
            }
           // classificationService.get({ contentTypeId: $routeParams.contentTypeId, id: classification.classificationId }).
            serviceval.$promise.then(function (response) {
                console.log(response);
                if (response.$resolved == true) {
                    //var expressionBuilderController = sharedScope.get('expressionBuilderController');
                    $scope.loadCondition(response);
                }
            });
        }
        $scope.resetErrorDirective($scope.classification);
    }

    $scope.deleteClassification = function (classification) {
        $scope.errors = [];
        $scope.resetErrorDirective($scope.classification);
        if (classification.classificationId != '') {
           // if (confirm("Are you sure you want to delete the classification?")) {
            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (classification.subObjectId == 0) {
                classification.subObjectId = '';        
            }
           //delete based on content type and libraries
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            classification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            classification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            classification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            classification.conditions = [];
            classificationService.removeLibrary(classification).$promise.then(function (response) {          
                if (response.$resolved == true) {
                    $scope.classification.messages.push("Classification deleted successfully");
                    $scope.classification.isSuccess = true;
                    $scope.getClassifications();
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.classification.messages.push(value.message);
                        $scope.classification.moreDetails = value.moreDetails;
                        $scope.classification.isError = true;
                    });
                }
                else {
                    $scope.classification.messages.push("Error occured while deleting the Classifications. Please try after sometime.");
                    $scope.classification.isError = true;
                }
            });
        //}
        }
    }
        //functions for handle cancel popup Start
    $scope.openErrorScreen = function (formStatus, formName) {
        $scope.attributeFormDirty = formStatus;
        $scope.attributeForm = formName;
        $scope.isErrorScreen = true;
    }
    $scope.confirmErrorScreenClose = function (attributeForm) {

        angular.element('#Classification').modal('hide');
        $scope.attributeFormDirty = false;
        $scope.attributeForm = "";
        $scope.isErrorScreen = false;
        $scope.clearClassificationFields();

    }

        ///////////////conditional expression builder functionality.//////////////////////////////

    $scope.operators = [
     { key: "0", value: "=" },
     { key: "1", value: "<" },
     { key: "2", value: "<=" },
     { key: "3", value: ">" },
     { key: "4", value: ">=" },
     { key: "5", value: "matches" }
    ];

    $scope.filterOperator = function (attributeType) {
        var containsOpe = { key: "6", value: "contains" };
        if (attributeType == 'TextAttribute') {
            if($scope.operators[$scope.operators.length - 1].value != 'contains')
                $scope.operators.push(containsOpe);
        }
        else if ($scope.operators[$scope.operators.length - 1].value == 'contains') {
            $scope.operators.splice($scope.operators.length - 1, 1);
        }

        if (attributeType == 'DateAttribute') {
            $scope.condExpBuilder.datetimeOffsetType = $scope.timeOffSetDefaultValues[0];
        }
    }

    $scope.conditionValues = [
     { key: "0", value: "Value" }
    ];
    $scope.operandNext = [
     { key: "0", value: "Yes" },
     { key: "1", value: "No" }
    ];
    $scope.conditionAndOr = [
     { key: "0", value: "AND" },
     { key: "1", value: "OR" }
    ];
    $scope.timeOffSetDefaultValues = [
     { key: "0", value: "Days" },
     { key: "1", value: "Hours" },
     { key: "2", value: "Minutes" },
     { key: "3", value: "Seconds" }
    ];
    $scope.attributeType = '';
    $scope.isAttributeMatch = false;
    $scope.isExpressionBuilt = false;
    $scope.isSubcondition = false;
    $scope.isEditExpression = false;
    $scope.parentIndex = null;
    $scope.subIndex = null;
    $scope.isFirst = true;
    $scope.showCondition = false;

    $scope.conditionType = '';
    $scope.isEntered = true;
    $scope.attributeId = '';
        //conditionid is a unique id
        //conditiontype = AND or OR
        //attributeType = 1st operand
        //conditionaOperator = (=,<,>,<=,>=)
        //conditionValue = ('value')
        //attributeValue = 2nd operand
        //
    $scope.conditions = [];
    $scope.conditionsDisplay = [];
    $scope.storeExpressions = {};

    $scope.condExpBuilder = {
        conditionId: null, expressionNegationOperator: null, conditionType: null, attributeType: null, conditionOperator: null,
        negationOperator: null, conditionValue: null, attributeValue: null, subConditions: null, errorMessages:[]
    };

    $scope.clearExpression = function () {
        $scope.condExpBuilder = {
            conditionId: null, expressionNegationOperator: null, conditionType: null, attributeType: null, conditionOperator: null,
            negationOperator: null, conditionValue: null, attributeValue: null, subConditions: null,errorMessages:[]
        };
        $scope.isAttributeMatch = false;
        $scope.conditionType = '';
    }

    $scope.clearForm = function () {
        $scope.conditions = [];
        $scope.conditionsDisplay = [];
        $scope.clearExpression();
    }

    $scope.showAttributeMatch = function (subcond, attributeId,conIndex) {

        $scope.isAttributeMatch = true;
        $scope.isEditExpression = false;
        $scope.isSubcondition = subcond;
        $scope.attributeId = attributeId;
        $scope.parentIndex = null;
        $scope.subIndex = null;

        if (subcond == true) {
            $scope.isSubcondition = true;
            $scope.showCondition = true;
        }
        else {
            $scope.isSubcondition = false;
            if (conIndex == 0)
                $scope.showCondition = false;
            else
                $scope.showCondition = true;
        }
    }

    $scope.setConditionType = function (condType) {
        $scope.conditionType = condType;
    }

    //$scope.contentObjectAttributes = function () {
    //    var contentType = sharedScope.get('rightMenuController').contentTypeModel;

    //    textAttributeService.query({ id: contentType.contentTypeId, attributeType: 'textattribute' }).$promise.then(function (details) {
    //        $scope.attributes = details;

    //    }, function (error) {
    //        if (error.data.errorMessage) {
    //            angular.forEach(error.data.errorMessage, function (value, key) {
    //                $scope.errors.push(value.message);
    //            });
    //        }
    //        else {
    //            $scope.errors.push("Error occured while fetching content object attributes in classifications. Please try after sometime.");
    //        }

    //    });
    //}

    $scope.loadConditionDisplay = function (classification) {

        $scope.isExpressionBuilt = true;
        $scope.isFirst = false;
        //$scope.conditions = classification.conditions;
        //$scope.fillAttribute($scope.conditions);
        $scope.conditionsDisplay = classification.conditions;
    }

    $scope.loadCondition = function (clsfication) {

        $scope.conditions = clsfication.conditions;
    }

    $scope.fillAttribute = function (conditionsArray) {
        angular.forEach(conditionsArray, function (value, key) {
            //here the value is a condition object
            angular.forEach($scope.attributes, function (v, k) {
                //here v is the attribute object
                if (value.attributeType.identifier == v.identifier) {
                    value.attributeType = null;
                    value.attributeType = v.identifier;
                }
                $scope.fillAttribute(value.subConditions);
            });
        });
    }

    $scope.saveExpression = function (condExpBuilder) {

        var conditionValue = '';
        var attributeValue = '';
        var conditionType = '';        

        if (condExpBuilder.attributeType) {
            condExpBuilder.errorMessages = [];
            if ($scope.showCondition && (condExpBuilder.conditionType == ""||condExpBuilder.conditionType==null)) {
                condExpBuilder.errorMessages.push("Please select either AND conditions / OR conditions");
            }

            if (condExpBuilder.attributeType.attributeType == 'YesNoAttribute'
                || condExpBuilder.attributeType.attributeType == 'ListAttribute') {
                if (condExpBuilder.attributeValue) {
                    conditionValue = '';//condExpBuilder.conditionValue.value;                    
                    attributeValue = condExpBuilder.attributeValue.value;
                }
                else
                    condExpBuilder.errorMessages.push("Please Select Attribute Value!");
            }
            if (condExpBuilder.attributeType.attributeType == 'TextAttribute'
                || condExpBuilder.attributeType.attributeType == 'SequenceAttribute'
                || condExpBuilder.attributeType.attributeType == 'DecimalAttribute'
                || condExpBuilder.attributeType.attributeType == 'IntegerAttribute'
                || condExpBuilder.attributeType.attributeType == 'SubObjectAttribute') {
                conditionValue = '';//this will be empty for the above attributes
                if (condExpBuilder.constantValue)
                    attributeValue = condExpBuilder.constantValue;
                else
                    condExpBuilder.errorMessages.push("Please Enter Value!");
            }
            if (condExpBuilder.attributeType.attributeType == 'DateTimeAttribute'
                || condExpBuilder.attributeType.attributeType == 'DateAttribute'
                || condExpBuilder.attributeType.attributeType == 'TimeAttribute') {
                if (condExpBuilder.datetimeOffsetValue && condExpBuilder.datetimeOffsetType.value) {
                    conditionValue = condExpBuilder.datetimeOffsetValue;
                    attributeValue = condExpBuilder.datetimeOffsetType.value;
                }
                else
                    condExpBuilder.errorMessages.push("Please Enter OffSet Value and Select Constant Type!");
            }
            if (!condExpBuilder.conditionOperator) {
                condExpBuilder.errorMessages.push("Please select any comparison operator");
            }

            if (condExpBuilder.errorMessages.length == 0) {
                if (condExpBuilder.conditionType) conditionType = condExpBuilder.conditionType.value;

                var expDisplay = {
                    conditionId: null, expressionNegationOperator: condExpBuilder.expressionNegationOperator, conditionType: conditionType,
                    attributeType: condExpBuilder.attributeType, conditionOperator: condExpBuilder.conditionOperator.value,
                    negationOperator: condExpBuilder.negationOperator, conditionValue: conditionValue, attributeValue: attributeValue,
                    subConditions: []
                };
                var exp = {
                    conditionId: null, expressionNegationOperator: condExpBuilder.expressionNegationOperator, conditionType: conditionType,
                    attributeType: condExpBuilder.attributeType.attributeId, conditionOperator: condExpBuilder.conditionOperator.value,
                    negationOperator: condExpBuilder.negationOperator, conditionValue: conditionValue, attributeValue: attributeValue,
                    subConditions: []
                };
                $scope.isExpressionBuilt = true;

                if ($scope.parentIndex != null) {
                    if ($scope.isSubcondition && $scope.subIndex != null) {
                        $scope.conditionsDisplay[$scope.parentIndex].subConditions[$scope.subIndex] = expDisplay;
                        $scope.conditions[$scope.parentIndex].subConditions[$scope.subIndex] = exp;
                    }
                    else {
                        angular.forEach($scope.conditionsDisplay[$scope.parentIndex].subConditions, function (value, key) {
                            expDisplay.subConditions.push(value);
                        });
                        angular.forEach($scope.conditions[$scope.parentIndex].subConditions, function (value, key) {
                            exp.subConditions.push(value);
                        });
                        $scope.conditionsDisplay[$scope.parentIndex] = expDisplay;
                        $scope.conditions[$scope.parentIndex] = exp;
                    }
                }
                else {
                    if ($scope.isSubcondition) {

                        for (var i = 0; i < $scope.conditionsDisplay.length; i++) {
                            var item = $scope.conditionsDisplay[i];
                            if (item.attributeType.attributeId == $scope.attributeId) {
                                item.subConditions.push(expDisplay);
                                $scope.conditions[i].subConditions.push(exp);
                            }
                        }
                    }
                    else {
                        $scope.conditionsDisplay.push(expDisplay);
                        $scope.conditions.push(exp);
                    }
                }

                if ($scope.conditionsDisplay && $scope.conditionsDisplay.length > 0) {
                    $scope.isFirst = false;
                }

                $scope.clearExpression();
            }
            //sharedScope.store('expressionBuilderController', $scope);
        }
        else {
            condExpBuilder.errorMessages.push("Please select Attribute Type!");
        }
    }

    $scope.editExpression = function (condition, isSubCondition, parentIndex, subIndex) {
        $scope.isAttributeMatch = true;
        $scope.isEditExpression = true;
        $scope.isSubcondition = isSubCondition;
        $scope.parentIndex = parentIndex;
        $scope.subIndex = subIndex;

        if (parentIndex == 0&&subIndex==null)
            $scope.showCondition = false;
        else
            $scope.showCondition = true;

        //this is for negation operator
        $scope.condExpBuilder.negationOperator = condition.negationOperator;
        //this is for conditionType
        if (condition.conditionType) {
            angular.forEach($scope.conditionAndOr, function (value, key) {
                if (value.value == condition.conditionType) {
                    $scope.condExpBuilder.conditionType = value;
                }
            });
        }
        else $scope.condExpBuilder.conditionType = '';
        //this is for attributeType
        if (condition.attributeType) {
            angular.forEach($scope.attributes, function (value, key) {
                if (value.attributeId == condition.attributeType.attributeId) {
                    $scope.condExpBuilder.attributeType = value;
                }
            });
        }
        //this is for conditionOperator
        if (condition.conditionOperator) {
            angular.forEach($scope.operators, function (value, key) {
                if (value.value == condition.conditionOperator) {
                    $scope.condExpBuilder.conditionOperator = value;
                }
            });
        }

        if (condition.attributeType.attributeType == 'YesNoAttribute'
                || condition.attributeType.attributeType == 'ListAttribute') {
            if (condition.conditionValue) {
                angular.forEach($scope.conditionValues, function (value, key) {
                    if (value.value == condition.conditionValue) {
                        $scope.condExpBuilder.conditionValue = value;
                    }
                });
            }

            if (condition.attributeValue) {
                angular.forEach($scope.operandNext, function (value, key) {
                    if (value.value == condition.attributeValue)
                        $scope.condExpBuilder.attributeValue = value;
                });
            }
        }
        if (condition.attributeType.attributeType == 'TextAttribute'
            || condition.attributeType.attributeType == 'SequenceAttribute'
            || condition.attributeType.attributeType == 'DecimalAttribute'
            || condition.attributeType.attributeType == 'IntegerAttribute'
                || condition.attributeType.attributeType == 'SubObjectAttribute') {
            if (condition.attributeValue) {
                $scope.condExpBuilder.constantValue = condition.attributeValue;
            }
        }
        if (condition.attributeType.attributeType == 'DateTimeAttribute'
            || condition.attributeType.attributeType == 'DateAttribute'
            || condition.attributeType.attributeType == 'TimeAttribute') {
            $scope.condExpBuilder.datetimeOffsetValue = condition.conditionValue;

            if (condition.attributeValue) {
                angular.forEach($scope.timeOffSetDefaultValues, function (value, key) {
                    if (value.value == condition.attributeValue)
                        $scope.condExpBuilder.datetimeOffsetType = value;
                });
            }
        }
        $scope.filterOperator(condition.attributeType.attributeType);
    }

    $scope.deleteExpression = function (condition, isSubCondition, parentIndex, subIndex) {
        if (isSubCondition && subIndex != null) {
            $scope.conditions[parentIndex].subConditions.splice(subIndex, 1);
            $scope.conditionsDisplay[parentIndex].subConditions.splice(subIndex, 1);
        }
        else if (subIndex == null) {
            $scope.conditions.splice(parentIndex, 1);
            $scope.conditionsDisplay.splice(parentIndex, 1);
            if ($scope.conditionsDisplay.length != 0) {
                $scope.conditionsDisplay[0].conditionType = null;
                $scope.conditions[0].conditionType = null;
            }
        }
        if ($scope.conditionsDisplay && $scope.conditionsDisplay.length > 0) {
            $scope.isFirst = false;
        }
    }

}]);