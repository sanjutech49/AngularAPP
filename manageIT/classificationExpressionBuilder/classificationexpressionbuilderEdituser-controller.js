manageitModule.controller("classificationExpressionBuilderEdituserController", ['$scope', '$rootScope', 'newSharedScope', 'sharedScope', 'classificationService', 'classificationexpressionbuilderService',
    function ($scope, $rootScope, newSharedScope, sharedScope, classificationService, classificationexpressionbuilderService) {
        newSharedScope.store('classificationExpressionBuilderEdituserController', $scope);

        $scope.classifications = [];
        $scope.conditionsDisplay = [];
        $scope.conditionAndOr = [
         { key: "AND", value: "AND" },
         { key: "OR", value: "OR" }
        ];

        $scope.classExpBuilder = {
            conditionType: null, classification: null
        };
        $scope.storeExpressions = {};
        $scope.isFirst = true;
        $scope.isAttributeMatch = false;
        $scope.isExpressionBuilt = false;
        $scope.isSubcondition = false;
        $scope.isEditExpression = false;
        $scope.parentIndex = null;
        $scope.subIndex = null;
        $scope.showCondition = false;

        $scope.showAttributeMatch = function (subcond, classificationId) {
            $scope.isAttributeMatch = true;
            $scope.isEditExpression = false;
            $scope.isSubcondition = subcond;
            $scope.classificationId = classificationId;
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

        $scope.clearExpression = function () {
            $scope.classExpBuilder = {
                conditionType: null, classification: null
            };
            $scope.isAttributeMatch = false;
            $scope.conditionType = '';
        }

        $scope.clearForm = function () {
            $scope.conditionsDisplay = [];
        }

        $scope.getClassifications = function () {

            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            $scope.classifications = [];
            classificationService.query({ id: contentType.contentTypeId }).$promise.then(function (details) {
                if (details) {

                    $scope.classifications = details;
                }

            }, function (error) {
                if (error.errorMessage) {
                    angular.forEach(error.errorMessage, function (value, key) {
                        $scope.errors.push(value);
                    });
                }
                else {
                    $scope.errors.push("Error occured while fetching classifications. Please try after sometime.");
                }

            });
        }

        $scope.saveExpression = function (classExpBuilder) {

            if (classExpBuilder.classification) {
                var conditionType = '';

                if (classExpBuilder.conditionType) conditionType = classExpBuilder.conditionType

                var exp = {
                    conditionType: conditionType, expressionNegationOperator: classExpBuilder.expressionNegationOperator,
                    classificationId: classExpBuilder.classification.classificationId, classificationName: classExpBuilder.classification.classificationName,
                    negationOperator: classExpBuilder.negationOperator, subClassifications: []
                };

                $scope.isExpressionBuilt = true;

                if ($scope.parentIndex != null) {
                    if ($scope.isSubcondition && $scope.subIndex != null) {
                        $scope.conditionsDisplay[$scope.parentIndex].subClassifications[$scope.subIndex] = exp;
                    }
                    else {
                        angular.forEach($scope.conditionsDisplay[$scope.parentIndex].subClassifications, function (value, key) {
                            exp.subClassifications.push(value);
                        });
                        $scope.conditionsDisplay[$scope.parentIndex] = exp;
                    }
                }
                else {
                    if ($scope.isSubcondition) {

                        for (var i = 0; i < $scope.conditionsDisplay.length; i++) {
                            var item = $scope.conditionsDisplay[i];
                            if (item.classificationId == $scope.classificationId) {
                                item.subClassifications.push(exp);
                            }
                        }
                    }
                    else {
                        $scope.conditionsDisplay.push(exp);
                    }
                }

                if ($scope.conditionsDisplay && $scope.conditionsDisplay.length > 0) {
                    $scope.isFirst = false;
                }

                $scope.clearExpression();
                newSharedScope.store('classificationExpressionBuilderEdituserController', $scope);
            }

        }
        $scope.editExpression = function (condition, isSubCondition, parentIndex, subIndex) {

            $scope.isAttributeMatch = true;
            $scope.isEditExpression = true;
            $scope.isSubcondition = isSubCondition;
            $scope.parentIndex = parentIndex;
            $scope.subIndex = subIndex;
            if (parentIndex == 0 && subIndex == null) {
                $scope.showCondition = false;
            }
            else {
                $scope.showCondition = true;
            }
            $scope.classExpBuilder.conditionType = condition.conditionType;
            $scope.classExpBuilder.negationOperator = condition.negationOperator;
            $scope.classExpBuilder.classification = {
                classificationId: condition.classificationId, classificationName: condition.classificationName
            };
            if ($scope.classExpBuilder.conditionType == '') {
                $scope.isFirst = true;
            }
        }

        $scope.deleteExpression = function (condition, isSubCondition, parentIndex, subIndex) {
            if (isSubCondition && subIndex != null) {
                $scope.conditionsDisplay[parentIndex].subClassifications.splice(subIndex, 1);
            }
            else if (subIndex == null) {
                $scope.conditionsDisplay.splice(parentIndex, 1);
            }
        }

        $scope.saveCondition = function (modelPopup, parentData) {

            $scope.errors = [];
            //create an instance of the factory            
            var newClassification = new classificationexpressionbuilderService();
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            newClassification.contentTypeId = contentType.contentTypeId;
            newClassification.attributeSetName = parentData.attributeSetName;
            newClassification.displayHeading = parentData.displayHeading;
            newClassification.isAnyViewClassification = parentData.isAnyViewClassification;
            newClassification.isAnyEditClassification = parentData.isAnyEditClassification;
            newClassification.viewClassification = $scope.conditionsDisplay;
            newClassification.editClassification = $scope.conditionsDisplay;

            newClassification.createdBy = $rootScope.manageITUserName;
            if (parentData.attributeSetId == '') {
                classificationexpressionbuilderService.create(newClassification).$promise.then(function (response) {
                    if (response.$resolved == true && response.attributeId != "") {
                        $scope.errors.push("Conditional Expression saved successfully");
                        sharedScope.get('attributeSetController').getAttributeSets();
                        $(modelPopup).hide();
                        $('.modal-backdrop').hide();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errors.push(value.message);
                        });
                    }
                    else {
                        $scope.errors.push("Error occured while saving the Conditional Expression. Please try after sometime.");
                    }
                });
            }
            else {
                classificationexpressionbuilderService.update(newClassification).$promise.then(function (response) {
                    if (response.$resolved == true && response.attributeId != "") {
                        $scope.errors.push("Conditional Expression updated successfully");
                        sharedScope.get('attributeSetController').getAttributeSets();
                        $(modelPopup).hide();
                        $('.modal-backdrop').hide();
                    }
                }, function (error) {
                    if (error.errorMessage) {
                        angular.forEach(error.errorMessage, function (value, key) {
                            $scope.errors.push(value);
                        });
                    }
                    else {
                        $scope.errors.push("Error occured while updating the Conditional Expression. Please try after sometime.");
                    }
                });
            }
        }

    }]);