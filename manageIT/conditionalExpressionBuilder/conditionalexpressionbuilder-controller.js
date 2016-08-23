manageitModule.controller("expressionBuilderController", ['$scope', 'textAttributeService', 'sharedScope', 'conditionalExpressionBuilderService',
    function ($scope, textAttributeService, sharedScope, conditionalExpressionBuilderService) {

        sharedScope.store('expressionBuilderController', $scope);
        //default values for the drop downs in the condition expression builder
        $scope.operators = [
         { key: "0", value: "=" },
         { key: "1", value: "<" },
         { key: "2", value: "<=" },
         { key: "3", value: ">" },
         { key: "4", value: ">=" },
         { key: "5", value: "contains" }
        ];
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
            negationOperator: null, conditionValue: null, attributeValue: null, subConditions: null
        };

        $scope.clearExpression = function () {
            $scope.condExpBuilder = {
                conditionId: null, expressionNegationOperator: null, conditionType: null, attributeType: null, conditionOperator: null,
                negationOperator: null, conditionValue: null, attributeValue: null, subConditions: null
            };
            $scope.isAttributeMatch = false;
            $scope.conditionType = '';
        }

        $scope.clearForm = function () {
            $scope.conditions = [];
            $scope.conditionsDisplay = [];
            $scope.clearExpression();
        }

        $scope.showAttributeMatch = function (subcond, attributeId) {

            $scope.isAttributeMatch = true;
            $scope.isEditExpression = false;
            $scope.isSubcondition = subcond;
            $scope.attributeId = attributeId;
            $scope.parentIndex = null;
            $scope.subIndex = null;
        }

        $scope.filterOperator = function (attributeType) {
            var matchesOpe = { key: "6", value: "matches" };
            if (attributeType == 'TextAttribute') {
                $scope.operators.push(matchesOpe);
            }
            else if ($scope.operators[$scope.operators.length - 1].value == 'matches') {
                $scope.operators.splice($scope.operators.length - 1, 1);
            }
        }

        $scope.setConditionType = function (condType) {
            $scope.conditionType = condType;
        }

        $scope.contentObjectAttributes = function () {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;

            textAttributeService.query({ id: contentType.contentTypeId, attributeType: 'textattribute' }).$promise.then(function (details) {
                $scope.attributes = details;

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while fetching content object attributes in classifications. Please try after sometime.");
                }

            });
        }

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
                
                if (condExpBuilder.attributeType.attributeType == 'YesNoAttribute'
                    || condExpBuilder.attributeType.attributeType == 'ListAttribute') {
                    if (condExpBuilder.attributeValue) {
                        conditionValue = '';//condExpBuilder.conditionValue.value;
                        attributeValue = condExpBuilder.attributeValue.value;
                    }
                }
                if (condExpBuilder.attributeType.attributeType == 'TextAttribute'
                    || condExpBuilder.attributeType.attributeType == 'SequenceAttribute'
                    || condExpBuilder.attributeType.attributeType == 'DecimalAttribute'
                    || condExpBuilder.attributeType.attributeType == 'IntegerAttribute') {
                    conditionValue = '';//this will be empty for the above attributes
                    attributeValue = condExpBuilder.constantValue;
                }
                if (condExpBuilder.attributeType.attributeType == 'DateTimeAttribute'
                    || condExpBuilder.attributeType.attributeType == 'DateAttribute'
                    || condExpBuilder.attributeType.attributeType == 'TimeAttribute') {
                    conditionValue = condExpBuilder.datetimeOffsetValue;
                    attributeValue = condExpBuilder.datetimeOffsetType.value;
                }

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
                sharedScope.store('expressionBuilderController', $scope);
            }
        }

        $scope.editExpression = function (condition, isSubCondition, parentIndex, subIndex) {
            
            $scope.isAttributeMatch = true;
            $scope.isEditExpression = true;
            $scope.isSubcondition = isSubCondition;
            $scope.parentIndex = parentIndex;
            $scope.subIndex = subIndex;

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
                || condition.attributeType.attributeType == 'IntegerAttribute') {
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
        }

        $scope.deleteExpression = function (condition, isSubCondition, parentIndex, subIndex) {
            if (isSubCondition && subIndex != null) {
                $scope.conditions[parentIndex].subConditions.splice(subIndex, 1);
                $scope.conditionsDisplay[parentIndex].subConditions.splice(subIndex, 1);
            }
            else if (subIndex == null) {
                $scope.conditions.splice(parentIndex, 1);
                $scope.conditionsDisplay.splice(parentIndex, 1);
            }
        }
        
    }]);