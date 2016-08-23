manageitModule.controller("searchInterfaceController", ['$scope', 'sharedScope', '$filter', '$routeParams', 'newSharedScope', 'classificationService', 'searchinterfaceService', 'userinterfaceService', 'textAttributeService', '$rootScope', 'attributeSetService', 'domainService',
    function ($scope, sharedScope, $filter, $routeParams, newSharedScope, classificationService, searchinterfaceService, userinterfaceService, textAttributeService, $rootScope, attributeSetService, domainService) {
        sharedScope.store('searchInterfaceController', $scope);
        $scope.resetErrorDirective = function (attModel) {
            attModel.isError = false;
            attModel.isSuccess = false;
            attModel.isWarning = false;
            attModel.isInfo = false;
            attModel.messages = [];
            attModel.moreDetails = null;
            attModel.isHide = false;
        }

        $scope.trackAttributesByIndex = -1;
        $scope.defaultactionselect = true;
        $scope.messageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.errormessageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.errorAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.classificationCondition = [
         { key: "0", value: "Show All Items" },
         { key: "1", value: "Filter Results" }
        ];
        $scope.SortingResults = [];
        $scope.searchinterface = { searchInterfaceId: '', columns: [], defaultAction: 0, isEnabled: null, isValid: null, name: null, listItemInterface: [], SearchConditions: [], ShowAllItems: 0 };
        $scope.enablecondition = 0;
        $scope.TimeAttribute = [];
        $scope.DecimalAttribute = [];
        $scope.IntegerAttribute = [];
        $scope.YesNoAttribute = [];
        $scope.changeclassification = function (value) {

            if (value == 1) {
                $scope.enablecondition = value;
            }
            else {
                $scope.enablecondition = 0;
            }
        }
        $scope.documentReferenceAttribute = {
            attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
            maxNumOfValues: null,
            canCreateDocFolders: false,
            docApplyType: '1',
            docRole: {
                roleName: '', index: -1
            },
            selectedDocTypes: [],
            selectedDocContentTypes: [],
            selectedDocLibraries: [],
            selectedDocSourceOptions: [],
            //A collection to hold all the inner values of an option. This dictionary key will be the optionId
            docTypeInnerNodeValues: {},
            documentRoles: [],
            isAcceptedDocTypeDefault: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };
        $scope.DefaultSearchInterface = function () {
            //$scope.searchinterfaces = '';

            // get search interfaces based on content type and library also based subobject

            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (contentType.imageLibraryId) {
                var  libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                var libraryid = contentType.contentTypeId
            }
            else {
                var libraryid = contentType.documentLibraryId
            } 
            searchinterfaceService.getAllSI({ controller: 'SearchInterface', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {

            //searchinterfaceService.query({ controller: 'SearchInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {

                var contentTypeUserinterfaces = [];
                contentTypeUserinterfaces.push({ key: '100', value: 'Auto Detect' });
                angular.forEach(details, function (value, key) {
                    var obj = { key: value.searchInterfaceId, value: value.name };
                    contentTypeUserinterfaces.push(obj);
                });
                $scope.allObjectInterfaces = contentTypeUserinterfaces;
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                    });
                }
            });
        }
        $scope.DefaultSearchInterface();
        $scope.DecimalAttribute = [];
        $scope.searchinterface.SearchInputs = [];
        $scope.isTextAttribute = false;
        $scope.isYesNoAttribute = false;
        $scope.isdecimalAttribute = false;
        $scope.isListAttribute = false;
        $scope.isDatetimeAttribute = false;
        $scope.isDateAttribute = false;
        $scope.isTimeAttribute = false;

        // search condition stat

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
                if ($scope.operators[$scope.operators.length - 1].value != 'contains')
                    $scope.operators.push(containsOpe);
            }
            else if ($scope.operators[$scope.operators.length - 1].value == 'contains') {
                $scope.operators.splice($scope.operators.length - 1, 1);
            }
        }
        $scope.defaultAttributes = function () {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
           
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

                var contentTypeDefaultAttributes = [];
                angular.forEach(result, function (value, key) {
                    contentTypeDefaultAttributes.push(value);
                });
                $rootScope.attributes = contentTypeDefaultAttributes;
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while fetching default attributes. Please try after sometime.");
                }
            });
        }
        $scope.listvalue = function () {
            $scope.details = $rootScope.attributes;
            var listarrtibutefinal = [];
            var defaultattributelist = [];
            var copyattrs = [];
            //default attr
            var listatt = { label: 'Default Attributes', value: null, Sortable: null, SortByDefault: null, SortOrder: null };
            defaultattributelist.push(listatt);
            angular.forEach($scope.details, function (value, key) {
                if (value.attributeSetId == 0 && value.subObjectId == 0) {
                    var listatt2 = { label: value.name, value: value.attributeId, Sortable: null, SortByDefault: null, SortOrder: null };
                    defaultattributelist.push(listatt2);
                }
            });
            listarrtibutefinal = defaultattributelist;
            // attrbute set
            var listindexedAttrs1 = [];
            var indexedAttrs = [];
            var listindexedAttrs = [];

            angular.forEach($scope.details, function (value, key) {
                if (value.attributeSetId != 0 && value.attributeSetName != null && value.subObjectId == 0) {
                    var detailIsNew = indexedAttrs.indexOf(value.attributeSetName) == -1;
                    if (detailIsNew) {
                        indexedAttrs.push(value.attributeSetName);
                    }
                }
            });
            for (x in indexedAttrs) {
                angular.forEach($scope.details, function (value, key) {
                    if (value.attributeSetId != 0 && value.attributeSetName != null && value.subObjectId == 0) {
                        var check = indexedAttrs[x].indexOf(value.attributeSetName) != -1;
                        if (check) {
                            var subcheck = listindexedAttrs.indexOf(value.attributeSetName) == -1;
                            if (subcheck) {
                                var title = { label: value.attributeSetName + ' (Attribute Set)', value: null, Sortable: null, SortByDefault: null, SortOrder: null };
                                listindexedAttrs.push(title);
                            }
                            var sample = { label: value.name, value: value.attributeId, Sortable: null, SortByDefault: null, SortOrder: null };
                            listindexedAttrs.push(sample);
                        }
                    }
                });
            }

            for (x in listindexedAttrs) {
                var listatt2 = { label: listindexedAttrs[x].label, value: listindexedAttrs[x].value, Sortable: null, SortByDefault: null, SortOrder: null };
                listindexedAttrs1.push(listatt2);
            }
            var arr = [];
            for (var i = 0, len = listindexedAttrs1.length; i < len; i++)
                arr[listindexedAttrs1[i]['label']] = listindexedAttrs1[i];
            var attributesetfinal = [];
            for (var key in arr)
                attributesetfinal.push(arr[key]);
            // SUbObject
            var subobjectattributes = [];
            var subindexedAttrs = [];
            var sublistindexedAttrs = [];

            angular.forEach($scope.details, function (value, key) {
                if (value.attributeSetId == 0 && value.attributeSetName != null && value.subObjectId != 0) {
                    var detailIsNew = subindexedAttrs.indexOf(value.attributeSetName) == -1;
                    if (detailIsNew) {
                        subindexedAttrs.push(value.attributeSetName);
                    }
                }
            });
            for (x in subindexedAttrs) {
                angular.forEach($scope.details, function (value, key) {
                    if (value.attributeSetId == 0 && value.attributeSetName != null && value.subObjectId != 0) {
                        var check = subindexedAttrs[x].indexOf(value.attributeSetName) != -1;
                        if (check) {
                            var subcheck = sublistindexedAttrs.indexOf(value.attributeSetName) == -1;
                            if (subcheck) {
                                var title = { label: value.attributeSetName, value: null, Sortable: null, SortByDefault: null, SortOrder: null };
                                sublistindexedAttrs.push(title);
                            }
                            var sample = { label: value.name, value: value.attributeId, Sortable: null, SortByDefault: null, SortOrder: null };
                            sublistindexedAttrs.push(sample);
                        }
                    }
                });
            }

            for (x in sublistindexedAttrs) {
                var listatt2 = { label: sublistindexedAttrs[x].label, value: sublistindexedAttrs[x].value, Sortable: null, SortByDefault: null, SortOrder: null };
                subobjectattributes.push(listatt2);
            }
            var subarr = [];
            for (var i = 0, len = subobjectattributes.length; i < len; i++)
                subarr[subobjectattributes[i]['label']] = subobjectattributes[i];
            var subobjecttfinal = [];
            for (var key in subarr)
                subobjecttfinal.push(subarr[key]);

            listarrtibutefinal = listarrtibutefinal.concat(attributesetfinal);
            listarrtibutefinal = listarrtibutefinal.concat(subobjecttfinal);

            $scope.listAttributes = listarrtibutefinal;


        }


        $scope.DefaultSearchInterface = function () {
            $scope.searchinterfaces = '';
            // get search interfaces based on content type and library also based subobject

            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (contentType.imageLibraryId) {
                var  libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                var libraryid = contentType.contentTypeId
            }
            else {
                var libraryid = contentType.documentLibraryId
            } 
            searchinterfaceService.getAllSI({ controller: 'SearchInterface', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {
         //   searchinterfaceService.query({ controller: 'SearchInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {
                
                var contentTypeUserinterfaces = [];
                var subObjectUserinterfaces = [];
                angular.forEach(details, function (value, key) {
                    if (value.columns) {
                        var columnlistname = '';
                        angular.forEach(value.columns, function (value, key) {
                            columnlistname = columnlistname + value.name + ",";
                        });
                      
                        if (columnlistname != '') {                           
                            var str = columnlistname.slice(0, -1);                          
                            value.columnListName = str;
                        }
                    }                   
                    contentTypeUserinterfaces.push(value);
                });
                $rootScope.searchinterfaces = contentTypeUserinterfaces;
                $scope.searchinterfaces = contentTypeUserinterfaces;
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                    });
                }
            });
        }
        $scope.DefaultSearchInterface();

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
        $scope.colfilters = [
        { 'id': 0, 'label': 'Search' },
        { 'id': 1, 'label': 'Numeric Range' },
        { 'id': 2, 'label': 'Date Range' },
        { 'id': 3, 'label': 'Time Range' },
        { 'id': 4, 'label': 'Date & Time Range' },
        { 'id': 5, 'label': 'List' },
        { 'id': 5, 'label': 'MultiListValue' }
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
            //alert($scope.isAttributeMatch);
            $scope.conditionType = '';

        }

        $scope.clearForm = function () {
            // $scope.conditions = [];
            $scope.conditionsDisplay = [];
            $scope.clearExpression();
        }
        $scope.addactiveclass = function () {
            $scope.action = "Add";
            if ($('.testclass li').hasClass('active')) {
                $('.testclass li').removeClass('active');
                $('.testclass li:first-child').addClass('active');
                $scope.tabvalue = "add_search";
                $scope.displayaddsort = "sorting";

            }
            if ($('#addsearchinterface .tab-content .tab-pane').hasClass('active')) {
                $('#addsearchinterface .tab-content .tab-pane').removeClass('active');
                $('#addsearchinterface .tab-content .tab-pane:first-child').addClass('active');

            }
            if ($('#addlistinterface .tab-content .tab-pane').hasClass('active')) {
                $('#addlistinterface .tab-content .tab-pane').removeClass('active');
                $('#addlistinterface .tab-content .tab-pane:first-child').addClass('active');

            }
            if ($('#addbrowseinterface .tab-content .tab-pane').hasClass('active')) {
                $('#addbrowseinterface .tab-content .tab-pane').removeClass('active');
                $('#addbrowseinterface .tab-content .tab-pane:first-child').addClass('active');

            }
        }

        $scope.showAttributeMatch = function (subcond, attributeId) {

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
                //if (conIndex == 0)
                //    $scope.showCondition = false;
                //else
                //    $scope.showCondition = true;
            }
        }

        $scope.setConditionType = function (condType) {
            $scope.conditionType = condType;
        }
        $scope.loadConditionDisplay = function (classification) {
            $scope.isExpressionBuilt = true;
            $scope.isFirst = false;
            $scope.conditions = classification.searchConditions;
            $scope.conditionsDisplay = classification.searchConditions;
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
           // if ($scope.showCondition && condExpBuilder.conditionType) {
            //    condExpBuilder.errorMessages.push("Please select Any Operator!");
           // }

            if (condExpBuilder.attributeType) {
                condExpBuilder.errorMessages = [];
                if (condExpBuilder.attributeType.attributeType == 'YesNoAttribute'
                    || condExpBuilder.attributeType.attributeType == 'ListAttribute') {
                    if (condExpBuilder.attributeValue) {
                        conditionValue = ''; //condExpBuilder.conditionValue.value;                    
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
                    condExpBuilder.errorMessages.push("Please Select Conditional Operator!");
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


                }
                $scope.clearExpression();
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

             if (parentIndex == 0 && subIndex == null) 
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
            }
        }

        // search condition end

        //list userinterface for search

        $scope.defaultUserinterfaces = function () {

            $scope.userinterface = '';

            // for content type
            if ($routeParams.subObjectId == 0) {

                userinterfaceService.query({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });
                    if ($routeParams.subObjectId == "0") {
                        $scope.userinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.userinterfaces = subObjectUserinterfaces;
                    }
                    console.log($scope.userinterfaces);
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });

            } else {
                userinterfaceService.soquery({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });
                    if ($routeParams.subObjectId == "0") {
                        $scope.userinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.userinterfaces = subObjectUserinterfaces;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });

            }
        }

        $scope.defaultUserinterfaces();
        // list userinterface end
        // list attributes
        $scope.searchinterface.listItemInterface = '0';
        //liste default attribute end
        //search interface start
        $scope.saveSearchInterface = function () {
            var browseinterface = $scope.searchinterface;
            var newsearchinterface = new searchinterfaceService();
            $scope.resetErrorDirective($scope.messageModel);
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.DefaultSearchInterface();
            newsearchinterface.ShowAllItems = false;
            //console.log($scope.conditions);
            newsearchinterface.SearchConditions = $scope.conditions;

            angular.forEach(newsearchinterface.SearchConditions, function (v, k) {
                v.expressionNegationOperator = $scope.storeExpressions[k];
            });
            //console.log("searchconds" + newsearchinterface);


            //search condition end

            newsearchinterface.searchInterfaceId = browseinterface.searchInterfaceId;
            newsearchinterface.contentTypeId = $routeParams.contentTypeId;
            newsearchinterface.subObjectId = $routeParams.subObjectId;
            newsearchinterface.name = browseinterface.name;
            newsearchinterface.isEnabled = browseinterface.isEnabled;
            newsearchinterface.defaultAction = browseinterface.defaultAction;
            newsearchinterface.ResultsPerPage = browseinterface.noperpage;
            newsearchinterface.createdby = $rootScope.manageITUserName;
            newsearchinterface.SearchInterfaceType = 'Browse';
            newsearchinterface.SortingResults = $scope.SortingResults;
            //search input 
            $scope.SearchAttributeInputs = $scope.searchInputs;
            newsearchinterface.SearchAttributeInputs = [];
            newsearchinterface.SearchAttributeInputs = $scope.SearchAttributeInputs;


            // insert search inputs
            $scope.DateAttribute = $scope.DateAttribute1;
            $scope.IntegerAttribute = $scope.IntegerAttribute1;
            $scope.YesNoAttribute = $scope.YesNoAttribute1;
            newsearchinterface.SearchInputTextAttribute = $scope.TextAttribute;
            newsearchinterface.SearchInputListAttribute = $scope.ListAttribute;
            newsearchinterface.SearchInputDateAttribute = $scope.DateAttribute;
            newsearchinterface.SearchInputDateTimeAttribute = $scope.DateTimeAttribute;
            newsearchinterface.SearchInputTimeAttribute = $scope.TimeAttribute;

            newsearchinterface.SearchInputIntegerAttribute = $scope.IntegerAttribute;
            newsearchinterface.SearchInputDecimalAttribute = $scope.DecimalAttribute;
            newsearchinterface.SearchInputYesNoAttribute = $scope.YesNoAttribute;

            // save userinterfaceid with name for search content object

            //get userinterfacename from id and save it

            
            userinterfaceService.get({
                controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, id: browseinterface.listItemInterfaceName
            }).$promise.then(function (response) {
                $scope.userinterfacedata = response;               
            }, function (error) {               
            });
            if ($scope.userinterfacedata) {
                 var listitemDetails = { Id: browseinterface.listItemInterfaceName, Name: $scope.userinterfacedata.name, IsAutoDetect: true };
            } else {
                var listitemDetails = {};
            }           

            $scope.SelectedListInterface = [];
            $scope.SelectedListInterface.push(listitemDetails);
            newsearchinterface.ListItemInterface = [];
            newsearchinterface.ListItemInterface = $scope.SelectedListInterface;

            if (newsearchinterface.searchInterfaceId == undefined) {

                if ($rootScope.searchinterfaces.length == 0 || $rootScope.searchinterfaces.length == null) {
                    browseinterface.OrderNo = 1;
                }
                else {
                    browseinterface.OrderNo = $rootScope.searchinterfaces.length + 1;
                }
                newsearchinterface.OrderNo = browseinterface.OrderNo;
                newsearchinterface.createdby = $rootScope.manageITUserName;
                newsearchinterface.SearchInterfaceType = 'Search';
                
                // create search interface based on libraries and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                newsearchinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newsearchinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newsearchinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                

                searchinterfaceService.createLibrary({ controller: 'SearchInterface', domainId: contentType.domainId }, newsearchinterface).$promise.then(function (response) {
                    
               // searchinterfaceService.create({ controller: 'SearchInterface' }, newsearchinterface).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "Search Interface Added successfully");
                        $('#addsearchinterface').modal('hide');
                        $('.modal-backdrop').remove();
                        $scope.DefaultSearchInterface();
                        $scope.conditionsDisplay = [];
                        $scope.SortingResults = '';
                        $scope.searchinterface = [];
                        $scope.showCondition = false;
                        $scope.conditions = [];
                        $scope.searchInputs = [];
                        $scope.SelectedListInterface = [];
                        newsearchinterface.SearchInputIntegerAttribute = [];
                        $scope.IntegerAttribute1 = [];
                        $scope.DecimalAttribute = [];
                        $scope.DateAttribute1 = [];
                        $scope.YesNoAttribute1 = [];
                        $scope.TextAttribute = [];
                        $scope.ListAttribute = [];
                        $scope.DateAttribute = [];
                        $scope.DateTimeAttribute = [];
                        $scope.TimeAttribute = [];
                        $scope.IntegerAttribute = [];
                        $scope.YesNoAttribute = [];

                    }
                }, function (error) {
                    $scope.searchinterface = browseinterface;
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            } else {
                newsearchinterface.updatedby = $rootScope.manageITUserName;
                newsearchinterface.OrderNo = browseinterface.OrderNo;
                newsearchinterface.SearchInterfaceType = 'Search';

                // update search interface based on libraries and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                newsearchinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newsearchinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newsearchinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                                
                searchinterfaceService.updateLibrary({ controller: 'SearchInterface', domainId: contentType.domainId }, newsearchinterface).$promise.then(function (response) {
               // searchinterfaceService.update({ controller: 'SearchInterface' }, newsearchinterface).$promise.then(function (response) {
                    if (response.$resolved == true && response.searchInterfaceId != "") {
                        $scope.showSuccessMessage($scope.messageModel, "Search Interface updated successfully");
                        $('#addsearchinterface').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $scope.DefaultSearchInterface();
                        $scope.conditionsDisplay = [];
                        $scope.SortingResults = '';
                        $scope.searchinterface = [];
                        // $scope.conditions = [];
                        $scope.searchInputs = [];
                    }
                }, function (error) {
                    $scope.searchinterface = browseinterface;
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
        }
        $scope.editSearchInterface = function (form, type, searchinterface) {
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            if (searchinterface.searchInterfaceId != '') {


                // get search interfaces based on content type and library also based subobject

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var  libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId
                }
                else {
                    var libraryid = contentType.documentLibraryId
                } 
                searchinterfaceService.getLibrary({ controller: 'SearchInterface', domainId: contentType.domainId, contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, id: searchinterface.searchInterfaceId }).$promise.then(function (response) {
               // searchinterfaceService.get({                    controller: 'SearchInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, id: searchinterface.searchInterfaceId
               // }).$promise.then(function (response) {
                    $scope.searchinterface = [];
                    $scope.action = "Edit";
                    angular.element('#' + form).modal('show');
                    if (response.$resolved == true) {
                        var userinterfacetype = searchinterface.searchInterfaceId;
                        $scope.searchinterface.name = response.name;
                        $scope.defaultactionselect = false;
                        $scope.searchinterface.orderNo = response.orderNo;
                        $scope.searchinterface.searchInterfaceId = response.searchInterfaceId;
                        $scope.searchinterface.isEnabled = response.isEnabled;
                        $scope.SortingResults = response.sortingResults;
                        // $scope.searchinterface.defaultAction = response.defaultAction;
                        $scope.searchinterface.defaultAction = 1;
                        $scope.searchinterface.noperpage = response.resultsPerPage;
                        $scope.searchinterface.listItemInterface = response.listItemInterface;

                        $scope.TextAttribute = response.searchInputTextAttribute;
                        $scope.ListAttribute = response.searchInputListAttribute;
                        $scope.DateAttribute = response.searchInputDateAttribute;
                        $scope.DateTimeAttribute = response.searchInputDateTimeAttribute;
                        $scope.TimeAttribute = response.searchInputTimeAttribute;
                        $scope.IntegerAttribute = response.searchInputIntegerAttribute;
                        $scope.DecimalAttribute = response.searchInputDecimalAttribute;
                        $scope.YesNoAttribute = response.searchInputYesNoAttribute;
                        $scope.searchinterface.ShowAllItems = response.showAllItems ? "0" : "1";
                        $scope.enablecondition = response.showAllItems ? "0" : "1";
                        $scope.searchinterface.classificationNegationOperator = response.classificationNegationOperator;
                        if (response.listItemInterface.length > 0) {
                            $scope.listItemInterfaceName = response.listItemInterface[0]['name'];
                        }
                        $scope.attributeTypeIsString = false;
                        $scope.fillAttributeValue(response.searchConditions);
                        $scope.loadConditionDisplay(response);
                        $scope.conditions = searchinterface.searchConditions;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                        angular.element('#' + form).modal('hide');
                        $('.modal-backdrop').modal('hide');;
                        $scope.DefaultSearchInterface();
                    }
                });
            }
        }

        $scope.loadattributes = function () {


            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
           
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
                
           // textAttributeService.query({ id: $routeParams.contentTypeId, attributeType: 'textattribute' }).$promise.then(function (result) {
                if ($rootScope.attributes.length == 0) {
                    angular.forEach(result, function (resAttr) {
                        if (resAttr.attributeType != "ObjectReferenceAttribute" && resAttr.attributeType != "DocumentReferenceAttribute" && resAttr.attributeType != "ImageReferenceAttribute" && resAttr.attributeType != "CopyAttribute")
                            $scope.attributes.push(resAttr);
                    });
                }
               
            });
        }
        $scope.loadattributes();
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
        // search interface end
        //list interface start          
        $scope.saveListInterface = function () {
            var listinterface = $scope.searchinterface;
            var newsearchinterface = new searchinterfaceService();
            $scope.resetErrorDirective($scope.messageModel);
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.DefaultSearchInterface();
            if ($scope.searchinterfaces.length == 0 || $scope.searchinterfaces.length == null) {
                listinterface.OrderNo = 1;
                angular.forEach(newsearchinterface.conditions, function (v, k) {
                    v.expressionNegationOperator = $scope.storeExpressions[k];
                });
            }
            else {
                listinterface.OrderNo = $scope.searchinterfaces.length + 1;
            }
            newsearchinterface.OrderNo = listinterface.OrderNo;
            //search condition begin            

            newsearchinterface.ShowAllItems = false;

            newsearchinterface.SearchConditions = $scope.conditions;
            angular.forEach(newsearchinterface.conditions, function (v, k) {
                v.expressionNegationOperator = $scope.storeExpressions[k];
            });

            //search condition end
            listinterface.docTypeInnerValues = $scope.docTypeInnerValues;

            $scope.Columns = [];

            angular.forEach(listinterface.columns, function (value, key) {

                if (listinterface.searchInterfaceId == undefined) {
                    if ($scope.docTypeInnerValues[value.value] == undefined) {
                        $scope.docTypeInnerValues[value.value] = {
                            selectedFilters: [],
                            value: value.value
                        };
                    }
                }
                var searchvalue = value.value;

                if (searchvalue != "null") {

                    var filtervale = $scope.docTypeInnerValues[value.value].value;
                    var filterarray = $scope.docTypeInnerValues[value.value].selectedFilters;



                    if ($scope.docTypeInnerValues[value.value].selectedFilters[0] == "1") {
                        var Sortable1 = true;
                    } else if ($scope.docTypeInnerValues[value.value].selectedFilters[0] == "2" || $scope.docTypeInnerValues[value.value].selectedFilters[1] == "2") {
                        var SortByDefault1 = true;
                    }
                    if ($scope.docTypeInnerValues[value.value].selectedFilters[0] == "1" && $scope.docTypeInnerValues[value.value].selectedFilters[1] == "2") {
                        var Sortable1 = true;
                        var SortByDefault1 = true;
                    }
                    var Sortable = Sortable1 ? true : false;
                    var SortByDefault = SortByDefault1 ? true : false;
                    var SortOrder = $scope.docTypeInnerValues[value.value].selectedFilters.sortOrder;
                    var ColumnFilter = $scope.docTypeInnerValues[value.value].selectedFilters.columnFilter;
                    // var SortOrder = SortOrder1 ? true : false;  
                    var acceptedDocumentType = {
                        id: value.value,
                        name: value.label,
                        Sortable: Sortable,
                        SortByDefault: SortByDefault,
                        SortOrder: SortOrder,
                        ColumnFilter: ColumnFilter
                    };
                    $scope.Columns.push(acceptedDocumentType);
                }



            });
            newsearchinterface.Columns = $scope.Columns;
            //update the parent negation operator.      
            newsearchinterface.contentTypeId = $routeParams.contentTypeId;
            newsearchinterface.subObjectId = $routeParams.subObjectId;
            newsearchinterface.name = listinterface.name;
            newsearchinterface.isEnabled = listinterface.isEnabled;
            newsearchinterface.defaultAction = listinterface.defaultAction;
            newsearchinterface.ResultsPerPage = listinterface.noperpage;
            newsearchinterface.searchInterfaceId = listinterface.searchInterfaceId;
            newsearchinterface.SearchInterfaceType = 'List';

            if (newsearchinterface.searchInterfaceId == undefined) {
                newsearchinterface.createdby = $rootScope.manageITUserName;

                // create search interface based on libraries and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                newsearchinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newsearchinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newsearchinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                

                searchinterfaceService.createLibrary({ controller: 'SearchInterface', domainId: contentType.domainId }, newsearchinterface).$promise.then(function (response) {
                    
               // searchinterfaceService.create({ controller: 'SearchInterface' }, newsearchinterface).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "List interface Added successfully");
                        $('#addlistinterface').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $scope.DefaultSearchInterface();
                        $scope.Columns = '';
                        $scope.conditionsDisplay = [];
                        $scope.searchinterface = [];
                        // $scope.conditions = '';
                    }
                }, function (error) {
                    $scope.searchinterface = listinterface;
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
            else {

                newsearchinterface.updatedby = $rootScope.manageITUserName;
                // update search interface based on libraries and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                newsearchinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newsearchinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newsearchinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                                
                searchinterfaceService.updateLibrary({ controller: 'SearchInterface', domainId: contentType.domainId }, newsearchinterface).$promise.then(function (response) {
               // searchinterfaceService.update({ controller: 'SearchInterface' }, newsearchinterface).$promise.then(function (response) {
                    if (response.$resolved == true && response.searchInterfaceId != "") {
                        $scope.showSuccessMessage($scope.messageModel, "List Interface updated successfully");
                        $('#addlistinterface').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.DefaultSearchInterface(); $scope.Columns = '';
                        $scope.conditionsDisplay = [];
                        $scope.searchinterface = [];
                        // $scope.conditions = '';
                    }
                }, function (error) {
                    $scope.searchinterface = listinterface;
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
        }
        $scope.editListInterface = function (form, type, searchinterface) {

            $scope.type = type;
            $scope.defaultAttributes();
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            if (searchinterface.searchInterfaceId != '') {
                
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId;
                }
                else {
                    var libraryid = contentType.documentLibraryId;
                }
                searchinterfaceService.getLibrary({
                    controller: 'SearchInterface', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, id: searchinterface.searchInterfaceId
                }).$promise.then(function (response) {


               // searchinterfaceService.get({ controller: 'SearchInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, id: searchinterface.searchInterfaceId }).$promise.then(function (response) {

                    $scope.searchinterface = [];
                    angular.element('#' + form).modal('show');
                    if (response.$resolved == true) {
                        var userinterfacetype = searchinterface.searchInterfaceId;
                        $scope.searchinterface.name = response.name;
                        $scope.defaultactionselect = false;
                        $scope.searchinterface.searchInterfaceId = response.searchInterfaceId;
                        $scope.searchinterface.isEnabled = response.isEnabled;
                        $scope.SortingResults = response.sortingResults;
                        $scope.searchinterface.defaultAction = response.defaultAction;
                        $scope.searchinterface.noperpage = response.resultsPerPage;
                        $scope.searchinterface.ShowAllItems = response.showAllItems ? "0" : "1";
                        $scope.enablecondition = response.showAllItems ? "0" : "1";
                        // $scope.searchinterface.columns = response.columns;
                        $scope.searchinterface.classificationNegationOperator = response.classificationNegationOperator;
                        $scope.attributeTypeIsString = false;
                        //this is to load the display.
                        $scope.fillAttributeValue(response.searchConditions);
                        $scope.loadConditionDisplay(response);
                        $scope.conditions = searchinterface.searchConditions;
                        $scope.columns = [];
                        angular.forEach(response.columns, function (value, key) {
                            $scope.initializeItemInnerContentValues(value.id);
                            var eachNode = $scope.docTypeInnerValues[value.id];
                            eachNode.label = value.name;
                            eachNode.value = value.id;
                            $scope.fillKeyValuePair(value, $scope.columns);
                            $scope.docTypeInnerValues[value.id].selectedFilters.sortOrder = value.sortOrder;
                            $scope.docTypeInnerValues[value.id].selectedFilters.columnFilter = value.columnFilter;

                            if (value.sortable == true) {
                                $scope.docTypeInnerValues[value.id].selectedFilters.push("1");
                            }
                            if (value.sortByDefault == true) {
                                $scope.docTypeInnerValues[value.id].selectedFilters.push("2");
                            }
                            angular.forEach(value.selectedFilters, function (v, k) {
                                eachNode.selectedFilters.push(v.id);
                            });
                        });
                        $scope.searchinterface.columns = $scope.columns;
                        $scope.showAcceptedDocTypes();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                        angular.element('#' + form).modal('hide');
                        $('.modal-backdrop').modal('hide');;
                        $scope.DefaultSearchInterface();
                    }
                });
            }
        }
        $scope.searchinterface = '';        // column development    
        $scope.docTypeInnerValues = {
        };
        $scope.initializeItemInnerContentValues = function (itemValue) {

            $scope.docTypeInnerValues[itemValue] = {
                selectedFilters: [],
                value: itemValue
            };
        };
        $scope.enablesearchinput = function () {
            $scope.showAcceptedDocTypes();
            $scope.enablecondition = 0;
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            $scope.defaultactionselect = true;
            $scope.conditionsDisplay = [];
        }
        $scope.defaultAttributes();

        $scope.docFilterOptions = [{
            key: '1', value: 'Sortable'
        }, {
            key: '2', value: 'Sort By default'
        }];
        $scope.selectedDocFilters = [];

        $scope.isDocOptionSelected = function (optionValue) {
            var selectedFilters = $scope.selectedDocFilters;
            if (selectedFilters && selectedFilters.indexOf(optionValue) >= 0) {
                return true;
            }
            else {
                return false;
            }
        };
        $scope.changeDocFilters = function (optionValue) {
            var selectedFilters = $scope.selectedDocFilters;
            var optionIndex = selectedFilters.indexOf(optionValue);

            //If the item is already present, and the option is again changed, it is deselected
            if (optionIndex >= 0) {
                $scope.selectedDocFilters.splice(optionIndex, 1);
            }
            else {
                $scope.selectedDocFilters.push(optionValue);
            }
        };

        $scope.showDocFilters = function (itemValue) {
            event.preventDefault();

            var buttonNode = event.target;

            var buttonParentNode = $(buttonNode).parent();

            var isDropdownExists = (buttonParentNode.find("#docFiltersDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#docFiltersDropdown"));
            }

            //Populate the values corresponding to the Item
            var itemInnerValues = $scope.docTypeInnerValues[itemValue];
            if (!itemInnerValues) {
                $scope.initializeItemInnerContentValues(itemValue);
                itemInnerValues = $scope.docTypeInnerValues[itemValue];
            }
            $scope.selectedDocFilters = itemInnerValues.selectedFilters;
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = $("#docFiltersDropdown").hasClass('open');
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleDocFilters");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
        };



        $scope.createDocTypeInnerContentNode = function (item) {

            var childNode = document.createDocumentFragment();
            //Create Button2 - Filter Doc
            var buttonParentNode2 = $("<div class='dropdown inline-display reference-dropdown'></div>");
            var buttonNode2 = $("<i class='fa fa-filter large-font gray-color inner-control'></i>");
            buttonParentNode2.append(buttonNode2);
            childNode.appendChild(buttonParentNode2[0]);
            buttonNode2.click(function () { $scope.showDocFilters($(item).attr('value')); });
            return childNode;
        };
        /* Doc Filter Section - End */

        $scope.showAcceptedDocTypes = function () {
            $scope.columns = angular.copy($scope.searchinterface.columns);
            $scope.$broadcast("loadDualMultiSelectControl#acceptedDocTypes", null, $scope.searchinterface.columns);
            //Handle the Modal Dialog close event - to preserve the inner dropdown content
            $("#acceptedDocumentTypesAttribute").unbind("hidden.bs.modal");
            $("#acceptedDocumentTypesAttribute").on("hidden.bs.modal", function () {
                $scope.clearAcceptedDocTypes();
            });
        };


        $scope.clearAcceptedDocTypes = function () {
            //Push the Dropdown content into the parent control - for persisting the inner control dropdown content
            $("#docMultiSelectInnerDroppdown_parent").append($("#docPropertiesDropdown"));
            $("#docMultiSelectInnerDroppdown_parent").append($("#docFiltersDropdown"));
            $scope.columns = {
            };
        };
        $scope.discardAcceptedDocTypes = function () {
            $scope.searchinterface.columns = angular.copy($scope.columns);
        }
        // end column development
        //list interface end
        //browse interface start
        $scope.saveBrowseInterface = function () {
            $scope.resetErrorDirective($scope.messageModel);
            var browseinterface = $scope.searchinterface;
            var newsearchinterface = new searchinterfaceService();
            $scope.resetErrorDirective($scope.messageModel);
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.DefaultSearchInterface();
            //search condition begin
            if ($scope.enablecondition == undefined || $scope.enablecondition == '') {
                browseinterface.ShowAllItems = 0;
            }
            else {
                browseinterface.ShowAllItems = $scope.enablecondition;
            }
            newsearchinterface.ShowAllItems = browseinterface.ShowAllItems == "0" ? true : false;
            if (newsearchinterface.ShowAllItems == '0') {
                newsearchinterface.SearchConditions = $scope.conditions;

                angular.forEach(newsearchinterface.Searchconditions, function (v, k) {
                    v.expressionNegationOperator = $scope.storeExpressions[k];
                });
            }
            else {
                newsearchinterface.SearchConditions = [];
            }
            //search condition end                
            newsearchinterface.searchInterfaceId = browseinterface.searchInterfaceId;
            newsearchinterface.contentTypeId = $routeParams.contentTypeId;
            newsearchinterface.subObjectId = $routeParams.subObjectId;
            newsearchinterface.name = browseinterface.name;
            newsearchinterface.isEnabled = browseinterface.isEnabled;
            newsearchinterface.defaultAction = browseinterface.defaultAction;
            newsearchinterface.ResultsPerPage = browseinterface.noperpage;
            newsearchinterface.createdby = $rootScope.manageITUserName;
            newsearchinterface.SearchInterfaceType = 'Browse';
            newsearchinterface.SortingResults = $scope.SortingResults;

            //get userinterfacename from id and save it
            userinterfaceService.get({
                controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, id: browseinterface.listItemInterfaceName
            }).$promise.then(function (response) {
                $scope.userinterfacedata = response;
            }, function (error) {
            });
            if ($scope.userinterfacedata) {
                var listitemDetails = { Id: browseinterface.listItemInterfaceName, Name: $scope.userinterfacedata.name, IsAutoDetect: true };
            } else {
                var listitemDetails = {};
            }
            $scope.SelectedListInterface = [];
            $scope.SelectedListInterface.push(listitemDetails);
            newsearchinterface.ListItemInterface = [];
            newsearchinterface.ListItemInterface = $scope.SelectedListInterface;
            if (newsearchinterface.searchInterfaceId == undefined) {
                if ($scope.searchinterfaces.length == 0 || $scope.searchinterfaces.length == null) {
                    browseinterface.OrderNo = 1;
                }
                else {
                    browseinterface.OrderNo = $scope.searchinterfaces.length + 1;
                }
                newsearchinterface.OrderNo = browseinterface.OrderNo;
                // create search interface based on libraries and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                newsearchinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newsearchinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newsearchinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : ''; 

                searchinterfaceService.createLibrary({ controller: 'SearchInterface', domainId: contentType.domainId }, newsearchinterface).$promise.then(function (response) {
              //  searchinterfaceService.create({ controller: 'SearchInterface' }, newsearchinterface).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "Browse interface Added successfully");
                        $('#addbrowseinterface').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $scope.DefaultSearchInterface();
                        $scope.searchinterface = { searchInterfaceId: '', columns: [], defaultAction: 0, isEnabled: null, isValid: null, name: null, listItemInterface: [], SearchConditions: [], ShowAllItems: null };
                        $scope.SortingResults = '';
                        //  $scope.conditions = '';
                        $scope.conditionsDisplay = [];
                    }
                }, function (error) {
                    $scope.searchinterface = browseinterface;
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
            else {
                newsearchinterface.OrderNo = browseinterface.OrderNo;
                newsearchinterface.updatedby = $rootScope.manageITUserName;
                // update search interface based on libraries and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                newsearchinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newsearchinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newsearchinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                                
                searchinterfaceService.updateLibrary({ controller: 'SearchInterface', domainId: contentType.domainId }, newsearchinterface).$promise.then(function (response) {
              //  searchinterfaceService.update({ controller: 'SearchInterface' }, newsearchinterface).$promise.then(function (response) {
                    if (response.$resolved == true && response.searchInterfaceId != "") {
                        $scope.showSuccessMessage($scope.messageModel, "Browse Search Interface updated successfully");
                        $('#addbrowseinterface').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.DefaultSearchInterface();
                        $scope.searchinterface = { searchInterfaceId: '', columns: [], defaultAction: 0, isEnabled: null, isValid: null, name: null, listItemInterface: [], SearchConditions: [], ShowAllItems: null };
                        $scope.SortingResults = '';
                        //  $scope.conditions = '';
                        $scope.conditionsDisplay = [];
                    }
                }, function (error) {
                    $scope.searchinterface = browseinterface;
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
        }
        $scope.listiteamupdate = function () {
            $scope.listItemInterfacetext = $scope.listItemInterfacetext;
        }
        $scope.editBrowseInterface = function (form, type, searchinterface) {
            $scope.type = type;
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            if (searchinterface.searchInterfaceId != '') {
                // get results based on contnet type and libraries

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId;
                }
                else {
                    var libraryid = contentType.documentLibraryId;
                }
                searchinterfaceService.get({controller: 'SearchInterface', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, id: searchinterface.searchInterfaceId
                }).$promise.then(function (response) {
                //searchinterfaceService.get({
                //    controller: 'SearchInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, id: searchinterface.searchInterfaceId
                //}).$promise.then(function (response) {
                    $scope.searchinterface = [];
                    angular.element('#' + form).modal('show');
                    if (response.$resolved == true) {
                        var userinterfacetype = searchinterface.searchInterfaceId;
                        $scope.searchinterface.name = response.name;
                        $scope.defaultactionselect = false;
                        $scope.searchinterface.searchInterfaceId = response.searchInterfaceId;
                        $scope.searchinterface.isEnabled = response.isEnabled;
                        $scope.SortingResults = response.sortingResults;
                        $scope.searchinterface.defaultAction = response.defaultAction;
                        $scope.searchinterface.noperpage = response.resultsPerPage;
                        $scope.searchinterface.listItemInterface = response.listItemInterface;
                        $scope.searchinterface.OrderNo = response.orderNo;
                        $scope.searchinterface.ShowAllItems = response.showAllItems ? "0" : "1";
                        $scope.enablecondition = response.showAllItems ? "0" : "1";
                        $scope.searchinterface.classificationNegationOperator = response.classificationNegationOperator;
                        $scope.fillAttributeValue(response.searchConditions);
                        $scope.loadConditionDisplay(response);
                        $scope.conditions = searchinterface.searchConditions;
                        if (response.listItemInterface.length > 0) {
                            $scope.listItemInterfaceName = response.listItemInterface[0]['name'];
                        }
                        $scope.attributeTypeIsString = false;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                        angular.element('#' + form).modal('hide');
                        $('.modal-backdrop').modal('hide');;
                        $scope.DefaultSearchInterface();
                    }
                });
            }

        }
        $scope.deleteInterface = function (browseinterface) {
            $scope.resetErrorDirective($scope.messageModel);
            if (browseinterface.searchInterfaceId != '') {

                //delete based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                browseinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                browseinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                browseinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                searchinterfaceService.remove({ controller: 'SearchInterface' }, browseinterface).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "SearchInterface deleted successfully");
                        $scope.DefaultSearchInterface();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
        }
        $scope.addsortingattr = function () {
            console.log($scope.attr);

            var str = $scope.attr;
            var temp = new Array();
            // this will return an array with strings "1", "2", etc.
            temp = str.split("/");
           
            if ($scope.SortingResults !== undefined) {
                var id = $scope.SortingResults.length + 1;
                var interfaceTempDetails = { Id: temp[1], name: temp[0], sortType: '0' };
                $scope.SortingResults.push(interfaceTempDetails);
            }
            else {
                var interfaceTempDetails = { Id: temp[1], name: temp[0], sortType: '0' };
                $scope.SortingResults = [];
                $scope.SortingResults.push(interfaceTempDetails);
            }
        }
        //search input modals
        //Interger/decimal
        $scope.searchInputs = [];
        $scope.decimalAttribute = {
            attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
            maxNumOfValues: null,
            minimumvalue: null, defaultvalue: null, maximumvalue: null, decimalplaces: null, currencytype: null, valuetype: null, inheritfromcontext: null,
            displayaspriceorpercentage: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };
        $scope.decimalDisplayAsPrice = [
           {
               key: 0, value: "Display as Number"
           },
       {
           key: 1, value: "Display as Price"
       },
       {
           key: 2, value: "Display as Percentage"
       }
        ];
        $scope.clearDecimalAttributeFields = function (formName) {
            $scope.action = "Add";
            $scope.error = [];
            $scope.errorsDecimal = [];
            $scope.readonly = false;
            $scope.isdecimalAttribute = true;
            $scope.formName = formName;
            $scope.decimalPropertyChanged = false;
            $scope.displayaspriceorpercentageDisabled = false;

        };
        $scope.IntegerAttribute1 = [];
        function updateAddDecimalAttribute(decimalAttribute) {

            var index = $scope.trackAttributesByIndex;
            if (index >= 0) {
                if (decimalAttribute.attributeType == 'Integer') {
                    $scope.IntegerAttribute.splice(index, 1); //remove the attribute item
                    $scope.IntegerAttribute.splice(index, 0, decimalAttribute); //add the attribute item
                }
                else {
                    $scope.DecimalAttribute.splice(index, 1); //remove the attribute item
                    $scope.DecimalAttribute.splice(index, 0, decimalAttribute); //add the attribute item
                }


            }

        }

        $scope.saveDecimalAttribute = function (decimalAttribute) {
            decimalAttribute.attributeType = $scope.formName;

            if ($scope.action == "Edit") {
               
                updateAddDecimalAttribute(decimalAttribute);
            }
            else if ($scope.action == "Add") {
                if (decimalAttribute.attributeType == 'Integer') {
                    $scope.IntegerAttribute1.push(decimalAttribute);
                }
                else {
                    $scope.DecimalAttribute.push(decimalAttribute);
                }

            }
            $scope.isdecimalAttribute = false;
            $scope.decimalAttribute = '';
            $scope.decimalattformAttributeForm.$setPristine();
            $('.modal-backdrop').modal('hide');
        }
        $scope.lineFormat = [
         {
             key: 0, value: "Single Line"
         },
     {
         key: 1, value: "Multi Lines"
     }
        ];
        // text
        $scope.clearTextAttributeFields = function () {
            $scope.errors = [];
            $scope.errorsText = [];
            $scope.isTextAttribute = true;
            $scope.action = "Add";
            $scope.readonly = false;
            $scope.textAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null, format: $scope.lineFormat[0].key, fieldWidth: null, minimumLength: null, maximumLength: null,
                minWordType: null, maxWordType: null, defaultValue: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };

        }

        function updateAddTextAttribute(textAttribute) {

            var index = $scope.trackAttributesByIndex;

            $scope.TextAttribute.splice(index, 1); //remove the attribute item
            $scope.TextAttribute.splice(index, 0, textAttribute); //add the attribute item


        }

        $scope.TextAttribute = [];
        $scope.saveTextAttribute = function (textAttribute) {
            $scope.errors = [];
            $scope.errorsText = [];
            textAttribute.attributeType = "Text";
            if ($scope.action == "Edit") {
               
                updateAddTextAttribute(textAttribute);
            }
            else if ($scope.action == "Add") {

                $scope.TextAttribute.push(textAttribute);
            }
            $scope.currentScope = '';
            $scope.textattformAttributeForm.$setPristine();
            $scope.textattformAttributeForm.$setUntouched();
            $scope.isTextAttribute = false;

        }
        $scope.validateTextAttribute = function (attributeModel, errorObj, attributeType) {
            var num = parseInt(attributeModel.fieldWidth);
            if (num < 10 || num > 2000) {
                errorObj.push("Field Width must be between 10 and 2000");
            }
            if (attributeModel.fieldWidth == '') {
                errorObj.push("Field Width is required");
            }
        }
        //date
        $scope.formats = ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd'];
        $scope.dateFormat = $scope.formats[0]; //default format for date&time/date Attribute.
        $scope.dateTimeFormat = $scope.formats[0];
        $scope.datePickerControl = {
            minOpened: false,
            maxOpened: false,
            defaultOpened: false
        };
        $scope.openDateCalendar = function (pickerId) {
            if (pickerId == 1) {
                $scope.datePickerControl.maxOpened = true;
            }
            else if (pickerId == 2) {
                $scope.datePickerControl.defaultOpened = true;
            }
            else {
                $scope.datePickerControl.minOpened = true;
            }
        }

        $scope.formatDateChange = function (formatId) {
            if (formatId == 1) {
                $scope.dateFormat = $scope.formats[1];
                $scope.datePattern = $scope.dateFormatDefaultValues[1].pattern;
            }
            else if (formatId == 2) {
                $scope.dateFormat = $scope.formats[2];
                $scope.datePattern = $scope.dateFormatDefaultValues[2].pattern;
            }
            else {
                $scope.dateFormat = $scope.formats[0];
                $scope.datePattern = $scope.dateFormatDefaultValues[0].pattern;
            }
        }
        $scope.formatDateTimeChange = function (formatId) {
            if (formatId == 1) {
                $scope.dateTimeFormat = $scope.formats[1];
            }
            else if (formatId == 2) {
                $scope.dateTimeFormat = $scope.formats[2];
            }
            else {
                $scope.dateTimeFormat = $scope.formats[0];
            }
        }
        $scope.timeFormatter = function (key, time) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var getTime = time.toString().split(':');
            var check_am = time.toString().toLowerCase().indexOf("am");
            var check_pm = time.toString().toLowerCase().indexOf("pm");
            var hours = parseInt(getTime[0]);
            var minutes = parseInt(getTime[1]) < 10 ? ('0' + parseInt(getTime[1])) : parseInt(getTime[1]);
            var seconds = getTime[2] != undefined ? (parseInt(getTime[2]).toString().length > 1 ? parseInt(getTime[2]) : ('0' + parseInt(getTime[2]))) : (new Date().getSeconds().toString().length > 1 ? new Date().getSeconds() : ('0' + new Date().getSeconds()));
            var ampm = hours >= 12 ? 'pm' : 'am';
            var ampmhours = hours % 12;
            var ampm_hours = ampmhours ? ampmhours : 12;
            var formatDate = new Date(year, month, day, hours, minutes, seconds);
            var actualHours = formatDate.getHours();
            var formattedDate = null;
            if (check_am > -1) {
                formattedDate = new Date().setHours(actualHours > 12 ? (actualHours - 12) : actualHours);
                ampm = 'am';
            }
            else if (check_pm > -1) {
                formattedDate = new Date().setHours(actualHours < 12 ? (actualHours + 12) : actualHours);
                ampm = 'pm';
            }
            var formattedHours = formattedDate != null ? new Date(formattedDate).getHours() : (new Date().getHours().toString().length > 1 ? new Date().getHours() : ('0' + new Date().getHours()));

            if (key == 0) {
                $scope.timeTormat = "HH:mm";
                if (check_am > -1) {
                    $scope.datTimeGlobalFormat = (formattedHours.toString().length > 1 ? formattedHours : ('0' + formattedHours)) + ':' + (formatDate.getMinutes().toString().length > 1 ? formatDate.getMinutes() : ('0' + formatDate.getMinutes()));
                }
                else if (check_pm > -1) {
                    $scope.datTimeGlobalFormat = (formattedHours.toString().length > 1 ? formattedHours : ('0' + formattedHours)) + ':' + (formatDate.getMinutes().toString().length > 1 ? formatDate.getMinutes() : ('0' + formatDate.getMinutes()));
                }
                else {
                    $scope.datTimeGlobalFormat = (hours.toString().length > 1 ? hours : ('0' + hours)) + ':' + minutes;
                }

            }
            else if (key == 1) {
                $scope.timeTormat = "HH:mm:ss";
                if (check_am > -1) {
                    $scope.datTimeGlobalFormat = (formattedHours.toString().length > 1 ? formattedHours : ('0' + formattedHours)) + ':' + (formatDate.getMinutes().toString().length > 1 ? formatDate.getMinutes() : ('0' + formatDate.getMinutes())) + ':' + new Date().getSeconds();
                }
                else if (check_pm > -1) {
                    $scope.datTimeGlobalFormat = (formattedHours.toString().length > 1 ? formattedHours : ('0' + formattedHours)) + ':' + (formatDate.getMinutes().toString().length > 1 ? formatDate.getMinutes() : ('0' + formatDate.getMinutes())) + ':' + new Date().getSeconds();
                }
                else {
                    $scope.datTimeGlobalFormat = (hours.toString().length > 1 ? hours : ('0' + hours)) + ':' + minutes + ':' + seconds;
                }

            }
            else if (key == 2) {
                $scope.timeTormat = "hh:mm am";
                $scope.datTimeGlobalFormat = (ampm_hours.toString().length > 1 ? ampm_hours : '0' + ampm_hours) + ':' + minutes + ' ' + ampm;

            }
            else if (key == 3) {
                $scope.timeTormat = "hh:mm:ss am";
                $scope.datTimeGlobalFormat = (ampm_hours.toString().length > 1 ? ampm_hours : '0' + ampm_hours) + ':' + minutes + ':' + (seconds != null ? seconds : new Date().getSeconds()) + ' ' + (check_am > -1 ? 'am' : (check_pm > -1 ? 'pm' : (ampm == 'am' ? 'am' : 'pm')));

            }
            return $scope.datTimeGlobalFormat;
        }
        $scope.timeFormatChange = function (key) {
            //DateTime Attribute Controls
            if ($scope.dateTimeAttribute.minDateTimeValues.time != "" && $scope.dateTimeAttribute.minDateTimeValues.time != undefined) {
                $scope.dateTimeAttribute.minDateTimeValues.time = $scope.timeFormatter(key, $scope.dateTimeAttribute.minDateTimeValues.time);
            }
            if ($scope.dateTimeAttribute.maxDateTimeValues.time != "" && $scope.dateTimeAttribute.maxDateTimeValues.time != undefined) {
                $scope.dateTimeAttribute.maxDateTimeValues.time = $scope.timeFormatter(key, $scope.dateTimeAttribute.maxDateTimeValues.time);
            }
            if ($scope.dateTimeAttribute.defaultDateTimeValues.time != "" && $scope.dateTimeAttribute.defaultDateTimeValues.time != undefined) {
                $scope.dateTimeAttribute.defaultDateTimeValues.time = $scope.timeFormatter(key, $scope.dateTimeAttribute.defaultDateTimeValues.time);
            }
            //Time Attribute Controls
            if ($scope.timeAttribute.minDateTimeValues.time != "" && $scope.timeAttribute.minDateTimeValues.time != undefined) {
                $scope.timeAttribute.minDateTimeValues.time = $scope.timeFormatter(key, $scope.timeAttribute.minDateTimeValues.time);
            }
            if ($scope.timeAttribute.maxDateTimeValues.time != "" && $scope.timeAttribute.maxDateTimeValues.time != undefined) {
                $scope.timeAttribute.maxDateTimeValues.time = $scope.timeFormatter(key, $scope.timeAttribute.maxDateTimeValues.time);
            }
            if ($scope.timeAttribute.defaultDateTimeValues.time != "" && $scope.timeAttribute.defaultDateTimeValues.time != undefined) {
                $scope.timeAttribute.defaultDateTimeValues.time = $scope.timeFormatter(key, $scope.timeAttribute.defaultDateTimeValues.time);
            }
            $scope.timePattern = $scope.timeFormatDefaultValues[key].pattern;

        }
        $scope.dateTimeOffSetOnChange = function (Key, formName) {
            var defaultMinutes = new Date().getMinutes().toString().length > 1 ? new Date().getMinutes() : ('0' + new Date().getMinutes());
            var hours = new Date().getHours();
            var ampm = hours >= 12 ? 'pm' : 'am';
            var ampmhours = hours % 12;
            var ampm_hours = ampmhours ? ampmhours : 12;
            var defaultHours = ampm_hours.toString().length > 1 ? ampm_hours : ('0' + ampm_hours);
            var defaultTime = defaultHours + ':' + defaultMinutes + ' ' + ampm;

        }
        $scope.dateFormatDefaultValues = [
            {
                key: 0, value: "25/12/2015", pattern: '^((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]{1}))\\/(0?[1-9]|1[0-2])\\/([0-9]{4})$' //dd/mm/yyyy /^([0-2]|0[0-9]|1[0-9]|2[0-3])/?[0-5][0-9]/?[0-5][0-9][0-5][0-9]$/
            },
            {
                key: 1, value: "12/25/2015", pattern: '^(0?[1-9]|1[0-2])\\/((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]{1}))\\/([0-9]{4})$' //mm/dd/yyyy
            },
            {
                key: 2, value: "2015-12-25", pattern: '^(\\d{4})(-)(0?[1-9]|1[0-2])(-)((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]))$' //yyyy-mm-dd (([1]{1}[9]{1}[9]{1}\\d{1})|([1-9]{1}\\d{3}))
            }
        ];

        $scope.timeFormatDefaultValues = [
            {
                key: 0, value: "14:00", pattern: '^(0?[0-9]|1[0-9]|2[0-3])\:([0-5][0-9])$'
            },
            {
                key: 1, value: "14:00:00", pattern: '^(0?[0-9]|1[0-9]|2[0-3])\:([0-5][0-9]):([0-5][0-9])$'
            },
            {
                key: 2, value: "2:00 pm", pattern: '^(0?[0-9]|1[0-2])\:([0-5][0-9]) [APap][mM]$'
            },
            {
                key: 3, value: "2:00:00 pm", pattern: '^(0?[0-9]|1[0-2])\:([0-5][0-9]):([0-5][0-9]) [APap][mM]$'
            }
        ];

        $scope.minMaxDateTimeDefaultValues = [
            {
                key: 0, value: "Specific Date"
            },
        {
            key: 1, value: "Not Specified"
        },
        {
            key: 2, value: "Current Time + Offset"
        }
        ];

        $scope.minMaxTimeDefaultValues = [
            {
                key: 0, value: "Specific Time"
            },
        {
            key: 1, value: "Not Specified"
        },
        {
            key: 2, value: "Current Time + Offset"
        }
        ];

        $scope.minMaxDateDefaultValues = [
            {
                key: 0, value: "Specific Date"
            },
        {
            key: 1, value: "Not Specified"
        },
        {
            key: 2, value: "Current Date + Offset"
        }
        ];

        $scope.timeOffSetDefaultValues = [
            {
                key: "0", value: "Days"
            },
        {
            key: "1", value: "Hours"
        },
        {
            key: "2", value: "Minutes"
        }
        ];
        $scope.timeOffSetDefaultDateValues = [
                    {
                        key: "0", value: "Days"
                    }
        ];

        $scope.dateTimeAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
            description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
            dateFormat: $scope.dateFormatDefaultValues[0].key, timeFormat: $scope.timeFormatDefaultValues[2].key, minimumDateTime: $scope.minMaxDateTimeDefaultValues[0].key,
            maximumDateTime: $scope.minMaxDateTimeDefaultValues[1].key, defaultDateTime: $scope.minMaxDateTimeDefaultValues[2].key,
            minDateTimeValues: {
                date: null, time: null, timeOffset: null, timeOffsetType: null
            },
            maxDateTimeValues: {
                date: null, time: null, timeOffset: null, timeOffsetType: null
            },
            defaultDateTimeValues: {
                date: null, time: null, timeOffset: null, timeOffsetType: null
            }
        };
        $scope.clearDateAttributeFields = function () {
            $scope.action = "Add";
            $scope.errors = [];
            $scope.errorsDate = [];
            $scope.readonly = false;
            $scope.isDateAttribute = true;
            $scope.isErrorScreen = true;
            $scope.dateAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                dateFormat: $scope.dateFormatDefaultValues[0].key, minimumDateTime: $scope.minMaxDateDefaultValues[0].key,
                maximumDateTime: $scope.minMaxDateDefaultValues[1].key, defaultDateTime: $scope.minMaxDateDefaultValues[2].key,
                minDateTimeValues: {
                    date: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
                },
                maxDateTimeValues: {
                    date: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
                },
                defaultDateTimeValues: {
                    date: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
                },
                defaultDateValues: {
                    date: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
                },
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };

        }

        $scope.DateAttribute1 = [];
        function updateAddDateAttribute(dateAttribute) {

            var index = $scope.trackAttributesByIndex;
            if (index >= 0) {
                $scope.DateAttribute.splice(index, 1); //remove the attribute item
                $scope.DateAttribute.splice(index, 0, dateAttribute); //add the attribute item

            }
        }
        $scope.saveDateAttribute = function (dateAttribute) {
            dateAttribute.attributeType = "Date";
            if ($scope.action == "Edit") {
                console.log($scope.trackAttributesByIndex);
                updateAddDateAttribute(dateAttribute);
            }
            else if ($scope.action == "Add") {
                $scope.DateAttribute.push(dateAttribute);
            }

            $scope.isDateAttribute = false;
            //$scope.dateAttribute = '';
            $('.modal-backdrop').modal('hide');
        }
        //time

        $scope.clearTimeAttributeFields = function () {
            $scope.action = "Add";
            $scope.errors = [];
            $scope.errorsTime = [];
            $scope.readonly = false;
            $scope.isTimeAttribute = true;
            $scope.timeAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                timeFormat: $scope.timeFormatDefaultValues[2].key, minimumDateTime: $scope.minMaxTimeDefaultValues[0].key,
                maximumDateTime: $scope.minMaxTimeDefaultValues[1].key, defaultDateTime: $scope.minMaxTimeDefaultValues[2].key,
                minDateTimeValues: {
                    time: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                maxDateTimeValues: {
                    time: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                defaultDateTimeValues: {
                    time: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
            $scope.timeTormat = "hh:mm am";

        }
        function updateAddTimeAttribute(timeAttribute) {

            var index = $scope.trackAttributesByIndex;
            if (index >= 0) {
                $scope.TimeAttribute.splice(index, 1); //remove the attribute item
                $scope.TimeAttribute.splice(index, 0, timeAttribute); //add the attribute item

            }
        }

        $scope.saveTimeAttribute = function (timeAttribute) {
            timeAttribute.attributeType = "Time";
            if ($scope.action == "Edit") {
                updateAddTimeAttribute(timeAttribute);
            }
            else if ($scope.action == "Add") {
                $scope.TimeAttribute.push(timeAttribute);
            }

            $scope.isTimeAttribute = false;
            //$scope.closeBackDrop('#TimeAttribute');
            // $('.modal-backdrop').modal('');
        }

        //time

        $scope.clearDateTimeAttributeFields = function () {
            $scope.action = "Add";
            $scope.errors = [];
            $scope.errorsDateTime = [];
            $scope.readonly = false;
            $scope.isDatetimeAttribute = true;
            $scope.dateTimeAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                dateFormat: $scope.dateFormatDefaultValues[0].key, timeFormat: $scope.timeFormatDefaultValues[2].key, minimumDateTime: $scope.minMaxDateTimeDefaultValues[0].key,
                maximumDateTime: $scope.minMaxDateTimeDefaultValues[1].key, defaultDateTime: $scope.minMaxDateTimeDefaultValues[2].key,
                minDateTimeValues: {
                    date: null, time: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                maxDateTimeValues: {
                    date: null, time: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                defaultDateTimeValues: {
                    date: null, time: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
            $scope.dateFormat = $scope.formats[0];
            $scope.dateTimeFormat = $scope.formats[0];
            $scope.timeTormat = "hh:mm am";

        }
        function updateAddDateTimeAttribute(dateTimeAttribute) {

            var index = $scope.trackAttributesByIndex;
            if (index >= 0) {
                $scope.DateTimeAttribute.splice(index, 1); //remove the attribute item
                $scope.DateTimeAttribute.splice(index, 0, dateTimeAttribute); //add the attribute item

            }
        }

        $scope.DateTimeAttribute = [];
        $scope.saveDateTimeAttribute = function (dateTimeAttribute) {
            dateTimeAttribute.attributeType = "DateTime";
            if ($scope.action == "Edit") {
                console.log($scope.trackAttributesByIndex);
                updateAddDateTimeAttribute(dateTimeAttribute);
            }
            else if ($scope.action == "Add") {
                $scope.DateTimeAttribute.push(dateTimeAttribute);
            }


            $scope.isDatetimeAttribute = false;
            //  $scope.dateTimeAttribute = '';
            $('.modal-backdrop').modal('hide');
        }
        $scope.clearYesNoAttributeFields = function () {
            $scope.action = "Add";
            $scope.errors = [];
            $scope.readonly = false;
            $scope.isYesNoAttribute = true;
            $scope.yesNoAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, yesValue: 'Yes',
                noValue: 'No', defaultValue: "0", displayType: null, description: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };

        }

        //save or update sequenceAttribute
        function updateYesNoAttribute(yesNoAttribute) {

            var index = $scope.trackAttributesByIndex;
            if (index >= 0) {
                $scope.YesNoAttribute.splice(index, 1); //remove the attribute item
                $scope.YesNoAttribute.splice(index, 0, yesNoAttribute); //add the attribute item

            }
        }
        $scope.YesNoAttribute1 = [];
        $scope.saveYesNoAttribute = function (yesNoAttribute) {
            yesNoAttribute.attributeType = "YesNo";

            if ($scope.trackAttributesByIndex != -1 && $scope.action == "Edit") {
                console.log($scope.trackAttributesByIndex);
                updateYesNoAttribute(yesNoAttribute);
            }
            else if ($scope.trackAttributesByIndex == -1 && $scope.action == "Add") {
                $scope.YesNoAttribute.push(yesNoAttribute);
            }
            $scope.isYesNoAttribute = false;
            //  $scope.yesNoAttribute = ''; 
            $('.modal-backdrop').remove()
        }

        //liset attr

        $scope.listAttribute = {
            attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, description: '',
            listOption: '0', listType: '0', defaultSelection: '', displayInputType: '', contentTypeId: '', listValues: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        $scope.clearListAttributFields = function () {
            $scope.action = "Add";
            $scope.error = [];
            $scope.errorsList = [];
            $scope.readonly = false;
            $scope.isListAttribute = true;
            $scope.listAttribute = {
                attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, description: '',
                listOption: '0', listType: '0', defaultSelection: '', displayInputType: '', contentTypeId: '', listValues: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };

        }
        $scope.ListAttribute = [];
        function updateAddListAttribute(listAttribute) {

            var index = $scope.trackAttributesByIndex;
            if (index >= 0) {
                $scope.ListAttribute.splice(index, 1); //remove the attribute item
                $scope.ListAttribute.splice(index, 0, listAttribute); //add the attribute item

            }
        }

        $scope.saveListAttribute = function (listAttribute) {

            listAttribute.listValues = $scope.listValues;
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            if ($scope.action == "Edit") {
                console.log($scope.trackAttributesByIndex);
                updateAddListAttribute(listAttribute);
            }
            else if ($scope.action == "Add") {
                $scope.ListAttribute.push(listAttribute);
            }



            listAttribute.attributeType = "List";
            $scope.isListAttribute = false;
            $('.modal-backdrop').modal('hide');
        }

        $scope.listType = [
           {
               key: "0", value: "Single Value Select"
           },
       {
           key: "1", value: "Multiple Value Select"
       }
        ];
        $scope.listOptionsInlist = [
            {
                key: "0", value: "Predefined Value"
            },
        {
            key: "1", value: "Content Objects"
        }
        ];

        $scope.customInterfaces = [
             {
                 key: "0", value: "Style List"
             },
         {
             key: "1", value: "Style List1"
         }
        ];
        $scope.InterfaceTypes = [
            {
                key: "0", value: "List Interface"
            },
        {
            key: "1", value: "Table Interface"
        },
        {
            key: "2", value: "Custom Interface"
        }
        ];
        $scope.displayMultiListInputAs = [
            {
                key: "0", value: "Checkboxes"
            },
        {
            key: "2", value: "Radio Buttons"
        },
        {
            key: "3", value: "Auto Complete"
        },
        {
            key: "4", value: "Pick List"
        }
        ];
        $scope.displayListInputAs = [
            {
                key: "1", value: "Drop Down"
            },
               {
                   key: "2", value: "Auto Complete"
               }
        ];
        //Data for the "Display Input As" section
        $scope.displayMultipleListInputAs = [{
            key: "1", value: "Checkboxes"
        }, {
            key: "2", value: "Pick List"
        }, {
            key: "3", value: "Auto Complete"
        }];
        $scope.isSingularlyUniques = [
            {
                key: "1", value: "Singularly Unique"
            },
        {
            key: "0", value: "Composite Unique"
        }
        ];

        // deafult values add edit delete

        //Map the domain data into the Tree format

        $scope.ListSourceOptions = [];

        //Data for the MultiSelect "Default Selection" section
        $scope.listValueOptions = [];
        $scope.availableListValueOptions = [];
        $scope.selectedListValueOptions = [];
        $scope.previousListValues = [];
        $scope.previousAvialableListValues = [];

        //Temporary holding list values
        $scope.tempEditListValues = [];
        $scope.tempAddListValues = [];

        $scope.MapDataForListSourceTree = function (domains) {
            if (domains && domains.length > 0) {
                var treeData = [];

                var domainsCount = domains.length;
                for (var i = 0; i < domainsCount; ++i) {
                    var domain = domains[i];
                    var contentTypes = domain.contentTypes;
                    if (contentTypes && contentTypes.length > 0) {
                        var contentTypesCount = contentTypes.length;
                        for (var j = 0; j < contentTypesCount ; ++j) {
                            var contentType = contentTypes[j];
                            var attributes = contentType.defaultAttributes;
                            if (attributes && attributes.length > 0) {
                                var attributesCount = attributes.length;
                                for (var k = 0; k < attributesCount; ++k) {
                                    var attribute = attributes[k];
                                    //Add an option corresponding to every attribute
                                    var treeOption = {
                                        key: attribute.attributeId,
                                        label: attribute.name,
                                        parent: domain.domainName + "/" + contentType.pluralName
                                    };

                                    treeData.push(treeOption);
                                }
                            }
                        }
                    }
                }

                $scope.ListSourceOptions = treeData;
            }
        };


        $scope.CreateMultiSelectTreeControl = function (data) {
            //Clear the Container node
            var containerNode = $("#multiSelectTree");
            containerNode.empty();

            //Dynamically Create the Select Node and populate the options from the data
            var selectDocumentFragement = $(document.createDocumentFragment());
            var selectNode = $("<select id='listSourceTree' multiple></select>");

            var dataCount = data.length;
            var selectedKeys = [];
            for (var i = 0; i < dataCount; ++i) {
                var optionData = data[i];
                var optionNode = $("<option value='" + optionData.key + "' " + (optionData.selected ? "selected" : "") +
                                    " data-section='" + optionData.parent + "'>" + optionData.label + "</option>");

                selectNode.append(optionNode);
            }

            selectDocumentFragement.append(selectNode);
            containerNode.append(selectDocumentFragement);

            //Finally, after the Select Node is added to the DOM, create the MultiSelect Tree
            $(selectNode).treeMultiselect();
        };



        $scope.showDefineDataSource = function () {

            $scope.isDefineListSource = true;

            //Fetch all the domains from the server
            domainService.getAllDomains().$promise.then(function (result) {
                //Map the domains into the Tree format
                $scope.MapDataForListSourceTree(result);

                //Fetch the selected items in the tree and then update the list

                var selectedOptions = $scope.previousAvialableListValues;
                var selectedKeys = [];
                var selectedOptionCount = selectedOptions.length;
                for (var i = 0; i < selectedOptionCount; ++i) {
                    selectedKeys.push(selectedOptions[i].key);
                }

                var allOptions = $scope.ListSourceOptions;
                var optionsCount = allOptions.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = allOptions[i];
                    if (selectedKeys.indexOf(option.key) >= 0) {
                        option.selected = true;
                    }
                    else {
                        option.selected = false;
                    }
                }

                //Create the Tree control with the updated date
                $scope.CreateMultiSelectTreeControl($scope.ListSourceOptions);
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
            });
        }

        $scope.showDefineListValue = function () {
            $scope.isDefineListValues = true;
            if (!$scope.listValues || $scope.listValues.length == 0) {
                $scope.listValues = [];
                $scope.selectedListValues = [];
            }

            $scope.filter = {
                value: null
            }
        }

        $scope.checkListValues = function (item, list) {
            for (var i = 0; i < list.length; i++) {
                if (item.key == list[i].key)
                    return item;
            }
            return null;
        }

        $scope.addDefineListValue = function (defineListValue) {
            if (defineListValue != null) {
                var item = {
                    key: defineListValue, value: defineListValue
                }
                if ($scope.checkListValues(item, $scope.listValues) == null) {
                    $scope.listValues.push(item);
                    $scope.tempAddListValues.push(item);
                }
            }
            $scope.filter.value = null;
        }

        //Cancel function call after discarding the Define List Values Modal.
        $scope.cancelDefineListValue = function () {
            var listValuesCount = $scope.listValues.length;
            for (var i = 0; i < listValuesCount; ++i) {
                for (var j = 0; j < $scope.tempAddListValues.length; j++) {
                    if ($scope.tempAddListValues[j].key == $scope.listValues[i].key) {
                        $scope.listValues.splice(i, 1);
                    }
                }
            }
            for (var j = 0; j < $scope.tempEditListValues.length; j++) {
                $scope.listValues.push($scope.tempEditListValues[j]);
            }
            $scope.tempEditListValues = [];
            $scope.tempAddListValues = [];
        }

        $scope.SaveDefineListValues = function () {
            //Populate the objects with the list values
            $scope.listValueOptions = $.extend(true, [], $scope.listValues);
            $scope.previousListValues = $.extend(true, [], $scope.listValues);
            $scope.availableListValueOptions = $.extend(true, [], $scope.listValues);
            //Clear the selected Items
            $scope.selectedListValueOptions = [];
            $scope.tempEditListValues = [];
            $scope.tempAddListValues = [];
        };
        $scope.RestoreDefineListValues = function () {
            //Restore the List values from the previous list values
            $scope.listValues = $.extend(true, [], $scope.previousListValues);
        };
        $scope.FetchSelectedItemsFromTreeControl = function () {
            return ($("#listSourceTree").val());
        };

        $scope.SaveDefineListSource = function () {
            //Fetch the selected values from the Tree and then populate the objects
            var selectedItems = $scope.FetchSelectedItemsFromTreeControl();
            var selectedObjects = [];
            if (selectedItems && selectedItems.length > 0) {
                var optionsCount = $scope.ListSourceOptions.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = $scope.ListSourceOptions[i];
                    if (selectedItems.indexOf(option.key) >= 0) {
                        selectedObjects.push({ key: option.key, value: option.label });
                    }
                }
            }
            //clone the objects and then save it
            $scope.availableListValueOptions = selectedObjects;
            $scope.listValueOptions = $.extend(true, [], selectedObjects);
            $scope.previousAvialableListValues = $.extend(true, [], selectedObjects);
            //Clear the selected Items
            $scope.selectedListValueOptions = [];
        };
        $scope.RestoreDefineListSource = function () {
            //Restore the selected Items in the Tree
            var previousListValues = $.extend(true, [], $scope.previousAvialableListValues);
            //Remove the previous selected ones from the available list
            var alreadySelectedItems = $scope.selectedListValueOptions;
            if (alreadySelectedItems && alreadySelectedItems.length > 0) {
                var selectedKeys = [];
                var selectedOptionCount = alreadySelectedItems.length;
                for (var i = 0; i < selectedOptionCount; ++i) {
                    selectedKeys.push(alreadySelectedItems[i].key);
                }

                var optionsCount = previousListValues.length;
                for (var i = optionsCount - 1; i >= 0; --i) {
                    var option = previousListValues[i];
                    if (selectedKeys.indexOf(option.key) >= 0) {
                        previousListValues.splice(i, 1);
                    }
                }
            }
            $scope.availableListValueOptions = previousListValues;
        };
        $scope.editDefineListValue = function (selectedrow) {
            $scope.errors = [];
            var item = {
                key: selectedrow.key, value: selectedrow.value
            }
            $scope.filter.value = selectedrow.value;
            var index = $scope.getResourceIndex($scope.listValues, selectedrow.key);
            $scope.listValues.splice(index, 1);
            $scope.tempEditListValues.push(item);
            // $scope.listValues.push(item);

        }
        $scope.deleteDefineListValue = function (selectedrow) {
            $scope.errors = [];
            //alert('deleteDefineListValue' + JSON.stringify(selectedrow));
            var index = $scope.getResourceIndex($scope.listValues, selectedrow.key);
            $scope.listValues.splice(index, 1);

        }
        $scope.moveSelectValue = function (selectedrow) {
            //var item = { key: selectedrow, value: selectedrow }
            angular.forEach(selectedrow, function (value, key) {
                var item = {
                    key: value.key, value: value.value
                }
                $scope.selectedListValues.push(item);
                var index = $scope.getResourceIndex($scope.listValues, value.key);
                $scope.listValues.splice(index, 1);
            });
        }
        $scope.moveAvilableValue = function (selectedrow) {
            angular.forEach(selectedrow, function (value, key) {
                var item = {
                    key: value.key, value: value.value
                }
                $scope.listValues.push(item);
                var index = $scope.getResourceIndex($scope.selectedListValues, value.key);
                $scope.selectedListValues.splice(index, 1);
            });

        }
        $scope.getResourceIndex = function (resources, resource) {
            var index = -1;
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].key == resource) {
                    index = i;
                }
            }
            return index;
        }
        $scope.clearDefineListValue = function (selectedrow) {
            $scope.errors = [];
            $scope.listValues = [];
            $scope.selectedListValues = [];
            $scope.filter.value = null;
        };


        // search input modal end

        $scope.chageorder = function (data, sortordervalue) {
            $scope.SortingResultsNew = [];

            if (sortordervalue == '1') {
                var sortorder = '1';
            }
            else {
                var sortorder = '0';
            }
            angular.forEach($scope.SortingResults, function (value, key) {
                if (value.name == data.name) {
                    var interfaceTempDetails = { Id: value.Id, name: value.name, sortType: sortorder };
                    $scope.SortingResultsNew.push(interfaceTempDetails);
                }
                else {
                    var interfaceTempDetails = { Id: value.Id, name: value.name, sortType: value.sortType };
                    $scope.SortingResultsNew.push(interfaceTempDetails);
                }
            });
            $scope.SortingResults = $scope.SortingResultsNew;
        }
        $scope.deletesorting = function (data) {
            var index = $scope.SortingResults.indexOf(data);
            $scope.SortingResults.splice(index, 1);
        }
        //browse interface end
        $scope.openErrorScreen = function (formStatus, formName) {
            $scope.attributeFormDirty = formStatus;
            $scope.attributeForm = formName;
            $scope.isErrorScreen = true;
        }
        $scope.closeAllBackdrop = function () {
            $('.modal-backdrop').remove();
        }
        $scope.confirmErrorScreenClose = function (attributeForm) {
            angular.element('#' + attributeForm).modal('hide');
            var res = attributeForm.toLowerCase();
            var form1 = res + "AttributeForm";
            var form = $scope[form1];
            form.$setPristine();
            $scope.IntegerAttribute1 = [];
            $scope.DecimalAttribute = [];
            $scope.DateAttribute1 = [];
            $scope.YesNoAttribute1 = [];
            $scope.TextAttribute = [];
            $scope.ListAttribute = [];
            $scope.DateAttribute = [];
            $scope.DateTimeAttribute = [];
            $scope.TimeAttribute = [];
            $scope.IntegerAttribute = [];
            $scope.YesNoAttribute = [];
            $scope.attributeFormDirty = false;
            $scope.attributeForm = "";
            $scope.searchinterface = '';
            $scope.SortingResults = '';
            // $scope.conditions = '';
            $scope.conditionsDisplay = [];
            $scope.listItemInterfaceName = '';
            $scope.enablecondition = "0";
            $scope.isErrorScreen = false;
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            $scope.type = "Add";

        }
        $scope.showExceptionMessage = function (attModel, message, moredetails) {
            attModel.messages.push(message);
            attModel.moreDetails = moredetails;
            attModel.isError = true;
        }

        $scope.showSuccessMessage = function (attModel, message) {
            attModel.messages.push(message);
            attModel.isSuccess = true;
        }
        $scope.fillKeyValuePair = function (source, dest) {
            var obj = {
                value: source.id, label: source.name
            };
            dest.push(obj);
        }
        //Grid DFrag and Drop
        $scope.action = "Add";
        $scope.opensearchinputadd = function (data, index) {
            $scope.trackAttributesByIndex = index;


            if (data.attributeType == "Text") {
                $scope.isTextAttribute = true;
                $scope.action = "Edit";

                angular.element('#textattform').modal('show');
                $scope.currentScope = data;
            }

            if (data.attributeType == "List") {
                $scope.isListAttribute = true;
                $scope.action = "Edit";
                angular.element('#ListAttributeForm').modal('show');
                $scope.listAttribute = data;
            }
            if (data.attributeType == "YesNo") {
                $scope.isYesNoAttribute = true;
                $scope.action = "Edit";
                angular.element('#yesnoattform').modal('show');
                $scope.YesNoAttribute1 = data;
            }
            if (data.attributeType == "Date") {
                $scope.isDateAttribute = true;
                $scope.action = "Edit";
                angular.element('#datearrform').modal('show');
                $scope.dateAttribute = data;
            }
            if (data.attributeType == "DateTime") {
                $scope.isDatetimeAttribute = true;
                $scope.action = "Edit";
                angular.element('#datetimeattform').modal('show');
                $scope.dateTimeAttribute = data;
            }
            if (data.attributeType == "Time") {
                $scope.isTimeAttribute = true;
                $scope.action = "Edit";
                angular.element('#timearrform').modal('show');
                $scope.timeAttribute = data;
            }
            if (data.attributeType == "Integer") {
                $scope.isdecimalAttribute = true;
                $scope.action = "Edit";
                angular.element('#decimalattform').modal('show');
                $scope.decimalAttribute = data;
            }
            if (data.attributeType == "Decimal") {
                $scope.isdecimalAttribute = true;
                $scope.action = "Edit";
                angular.element('#decimalattform').modal('show');
                $scope.decimalAttribute = data;
            }
        }
        $scope.deletesearchinput = function (data) {

            if (data.attributeType == "Text") {
                var index = $scope.TextAttribute.indexOf(data);
                $scope.TextAttribute.splice(index, 1);
            }
            if (data.attributeType == "List") {
                var index = $scope.ListAttribute.indexOf(data);
                $scope.ListAttribute.splice(index, 1);
            }
            if (data.attributeType == "Time") {
                var index = $scope.TimeAttribute.indexOf(data);
                $scope.TimeAttribute.splice(index, 1);
            }
            if (data.attributeType == "Date") {
                var index = $scope.DateAttribute1.indexOf(data);
                $scope.DateAttribute1.splice(index, 1);
            }
            if (data.attributeType == "Integer") {
                var index = $scope.IntegerAttribute1.indexOf(data);
                $scope.IntegerAttribute1.splice(index, 1);
            }
            if (data.attributeType == "Decimal") {
                var index = $scope.DecimalAttribute.indexOf(data);
                $scope.DecimalAttribute.splice(index, 1);
            }

            //  $scope.searchInputs = newArray;
        }
        $scope.sortableOptionsB = {
            stop: function (e, ui) {
                var item = ui.item.scope().data;
                var fromIndex = ui.item.sortable.index;
                var toIndex = ui.item.sortable.dropindex;
            }
        }
        $scope.sortableOptionsA = {
            stop: function (e, ui) {
                $scope.errors = [];
                $scope.resetErrorDirective($scope.errorAttribute);
                var item = ui.item.scope().data;
                var fromIndex = ui.item.sortable.index;
                var toIndex = ui.item.sortable.dropindex;
                console.log('moved', item, fromIndex, toIndex);
                var fromOrdNo = fromIndex + 1;
                var toOrdNo = toIndex + 1;
                var startIndex = -1;
                var endIndex = -1;
                if (fromOrdNo > toOrdNo) {
                    startIndex = toOrdNo;
                    endIndex = fromOrdNo;
                }
                else {
                    startIndex = fromOrdNo;
                    endIndex = toOrdNo;
                }
                var conTypeId = $routeParams.contentTypeId;
                var currentAttributeId = ui.item.scope().$parent.attributes[fromIndex].attributeId;
                var previousAttributeId = ui.item.scope().$parent.attributes[toIndex].attributeId;
                var SubObjectId = $routeParams.subObjectId;
                var startOrderNo = ui.item.scope().$parent.attributes[fromIndex].orderNo;
                var endOrderNo = ui.item.scope().$parent.attributes[toIndex].orderNo;
                var searchInterfaceId = item.searchInterfaceId;
                var isFirst = false;
                var incrementNO = startIndex;

                ui.item.scope().$parent.attributes.forEach(function (key, value) {
                    ordNO = key.orderNo;

                    if (key.orderNo >= startIndex && key.orderNo <= endIndex) {

                        if (isFirst == true)
                            incrementNO += 1;
                        key.orderNo = incrementNO;
                        isFirst = true;

                    }

                });

                var updateorderno = { ContentTypeId: conTypeId, startOrderNo: startOrderNo, endOrderNo: endOrderNo, searchInterfaceId: searchInterfaceId, SubObjectId: SubObjectId };

                searchinterfaceService.updateOrderNo({ controller: 'SearchInterface' }, updateorderno).$promise.then(function (response) {
                    if (response.$resolved == true) {

                        $scope.showSuccessMessage($scope.messageModel, "SearcherInterface Added successfully");
                        $scope.DefaultSearchInterface();
                    }
                }, function (error) {

                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                    }
                    else {
                        $scope.errorAttribute.isError = true;
                        $scope.errorAttribute.messages.push("Error occured while updating the OrderNo in Attributes. Please try after sometime.");
                    }
                }
                );

            }
        };


        // search input validation

        $scope.validateAttribute = function (attributeModel, errorCntrl, attributeType) {
            errorCntrl = $scope.errorAttribute;
            var errorObj = errorCntrl.messages;
            if (attributeModel.name == null || attributeModel.name == '' || attributeModel.name == undefined) {
                errorObj.push("Name is required");
            }

            if (attributeModel.name != null && attributeModel.name.length > 64) {
                errorObj.push("Name must be between 1 and 64 characters");
            }

            if (attributeType == 'text') {
                $scope.validateTextAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == 'datetime') {
                $scope.validateDateTimeAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == 'list') {
                if (attributeModel.isAllowMultiValue == 'true') {
                    $scope.validateListAttribute(attributeModel, errorObj, attributeType);
                }
            }
            if (attributeType == 'date') {
                $scope.validateDateTimeAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == 'time') {
                $scope.validateDateTimeAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == 'decimal') {
                $scope.validateDecimalAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == 'yesno') {
                $scope.validateYesNoAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == 'documentReference') {
                $scope.validatedocumentReferenceAttribute(attributeModel, errorObj, attributeType);
            }
            if (attributeType == 'copy') {
                $scope.validateCopyAttribute(attributeModel, errorObj, attributeType);
            }
            if (errorObj.length > 0) {
                errorCntrl.isError = true;
                errorCntrl.isHide = true;
                return false;
            }
            return true;
        }

        //test
        $scope.validateDecimalAttribute = function (attributeModel, errorObj, attributeType) {
            var num = parseInt(attributeModel.fieldWidth);
            var minNum = attributeModel.minimumvalue;
            var maxNum = attributeModel.maximumvalue;
            var decimalPlaces = attributeModel.decimalplaces;
            var defaultvalue = attributeModel.defaultvalue;
            if (num < 10 || num > 2000) {
                errorObj.push("Field Width must be between 10 and 2000");
            }

            if ((minNum != null || minNum != undefined) && (maxNum != null || maxNum != undefined) && minNum > maxNum) {
                errorObj.push("Minimum Value must be less than Maximum Value");
            }
            if (minNum < 0 || minNum > 99999) {
                errorObj.push("Minimum Value must be 0 to 99999");
            }
            if (maxNum < 0 || maxNum > 99999) {
                errorObj.push("Maximum Value must be 0 to 99999");
            }
            if (defaultvalue < 0 || defaultvalue > 99999) {
                errorObj.push("Default value must be 0 to 99999");
            }
            if (decimalPlaces < 0 || decimalPlaces > 99999) {
                errorObj.push("Decimal Places value must be 0 to 99999");
            }
            if ((attributeModel.currencyPrefix == null || attributeModel.currencyPrefix == undefined || attributeModel.currencyPrefix == "") && attributeModel.displayaspriceorpercentage == 1) {
                errorObj.push("Currency Prefix required");
            }

        }

        $scope.DateFormatter = function (date, format) {
            var days = date.getDate();
            var months = date.getMonth() + 1;
            var year = date.getFullYear();
            if (days.length < 2)
                days = '0' + days;
            if (months < 2)
                months = '0' + months;
            if (year.length < 4)
                year = '000' + year;
            if (format == 0) {
                return days + '/' + months + '/' + year;
            }
            else if (format == 1) {
                return months + '/' + days + '/' + year;
            }
            else {
                return year + '-' + months + '-' + days;
            }

        }

        $scope.validateListAttribute = function (attributeModel, errorObj, attributeType) {
            if (attributeModel.minNumOfValues > $scope.selectedListValueOptions.length) {
                errorObj.push("Default selected value must equal or gratter than minimum value ");
            }
            if (attributeModel.maxNumOfValues < $scope.selectedListValueOptions.length) {
                errorObj.push("Default selected value must equal or less than maximum value ");
            }
        }

        $scope.validateDateTimeAttribute = function (attributeModel, errorObj, attributeType) {
            var minTimeStatus = true;
            var maxTimeStatus = true;
            var minDateStatus = true;
            var maxDateStatus = true;
            var DatePatterns = [{ key: 0, value: 'dd/MM/yyyy' }, { key: 1, value: 'MM/dd/yyyy' }, { key: 2, value: 'yyyy-MM-dd' }];
            var TimePatterns = [{ key: 0, value: 'hh:mm' }, { key: 1, value: 'hh:mm:ss' }, { key: 2, value: 'hh:mm am' }, { key: 3, value: 'hh:mm:ss am' }];
            if (attributeType == 'datetime' || attributeType == 'date') {
                var datePlaceHolder = DatePatterns[attributeModel.dateFormat].value;
                var datePattern = new RegExp($scope.dateFormatDefaultValues[attributeModel.dateFormat].pattern);
                if (attributeModel.maximumDateTime == 0) {
                    if (attributeModel.maxDateTimeValues.date == null || attributeModel.maxDateTimeValues.date == undefined) {
                        errorObj.push("Maximum Date Required.Must be " + datePlaceHolder);
                    }
                    else {
                        var maxDate = $scope.DateFormatter(attributeModel.maxDateTimeValues.date, attributeModel.dateFormat)
                        if (!datePattern.test(maxDate)) {
                            errorObj.push("Invalid Maximum Date Pattern.Must be " + datePlaceHolder);
                            maxDateStatus = false;
                        }
                    }

                }
                if (attributeModel.minimumDateTime == 0) {
                    if (attributeModel.minDateTimeValues.date == null || attributeModel.minDateTimeValues.date == undefined) {
                        // errorObj.push("Minimum Date Required.Must be " + datePlaceHolder);
                    }
                    else {
                        var minDate = $scope.DateFormatter(attributeModel.minDateTimeValues.date, attributeModel.dateFormat);
                        if (!datePattern.test(minDate)) {
                            errorObj.push("Invalid Minimum Date Pattern.Must be " + datePlaceHolder);
                            minDateStatus = false;
                        }
                    }
                }
                if (attributeModel.defaultDateTime == 0) {
                    if (attributeModel.defaultDateTimeValues.date == null || attributeModel.defaultDateTimeValues.date == undefined) {
                        errorObj.push("Default Date Required.Must be " + datePlaceHolder);
                    }
                    else {
                        var defaultDate = $scope.DateFormatter(attributeModel.defaultDateTimeValues.date, attributeModel.dateFormat);
                        if (!datePattern.test(defaultDate)) {
                            errorObj.push("Invalid Default Date Pattern.Must be " + datePlaceHolder);
                        }
                    }
                }
                if (minDateStatus == true && maxDateStatus == true) {
                    if (attributeModel.minDateTimeValues.date != undefined && attributeModel.maxDateTimeValues.date != undefined) {
                        if (attributeModel.minimumDateTime == attributeModel.maximumDateTime) {
                            if (minDateStatus == true && maxDateStatus == true) {
                                var minDate = new Date(attributeModel.minDateTimeValues.date);
                                var maxDate = new Date(attributeModel.maxDateTimeValues.date);
                                if (minDate > maxDate) {
                                    errorObj.push("Min Date is Less than Max Date.");
                                }
                            }
                        }
                    }
                }
            }
            if (attributeType == 'datetime' || attributeType == 'time') {
                var timePlaceHolder = TimePatterns[attributeModel.timeFormat].value;
                var timePattern = new RegExp($scope.timeFormatDefaultValues[attributeModel.timeFormat].pattern);
                if (attributeModel.maxDateTimeValues.time == null || attributeModel.maxDateTimeValues.time == undefined) {
                    if (attributeModel.maximumDateTime == 0) {
                        errorObj.push("Maximum Time Required.Must be " + timePlaceHolder);
                        maxTimeStatus = false;
                    }
                }
                else {
                    if (attributeModel.maximumDateTime == 0) {

                        if (!timePattern.test(attributeModel.maxDateTimeValues.time)) {
                            errorObj.push("Invalid Maximum Time Pattern.Must be " + timePlaceHolder);
                            maxTimeStatus = false;
                        }

                    }
                }
                if (attributeModel.minDateTimeValues.time == null || attributeModel.minDateTimeValues.time == undefined) {
                    if (attributeModel.minimumDateTime == 0) {
                        //errorObj.push("Minimum Time Required.Must be " + timePlaceHolder);
                        minTimeStatus = false;
                    }
                }
                else {
                    if (attributeModel.minimumDateTime == 0) {

                        if (!timePattern.test(attributeModel.minDateTimeValues.time)) {
                            errorObj.push("Invalid Minimum Time Pattern.Must be " + timePlaceHolder);
                            minTimeStatus = false;
                        }

                    }
                }
                if (attributeModel.defaultDateTimeValues.time == null || attributeModel.defaultDateTimeValues.time == undefined) {
                    if (attributeModel.defaultDateTime == 0) {
                        errorObj.push("Default Time Required.Must be " + timePlaceHolder);
                    }
                }
                else {
                    if (attributeModel.defaultDateTime == 0) {

                        if (!timePattern.test(attributeModel.defaultDateTimeValues.time)) {
                            errorObj.push("Invalid Default Time Pattern.Must be " + timePlaceHolder);
                        }

                    }
                }
                if (attributeModel.maxDateTimeValues.time != undefined && attributeModel.minDateTimeValues.time != undefined) {
                    if (attributeModel.minimumDateTime == attributeModel.maximumDateTime) {
                        if (minTimeStatus == true && maxTimeStatus == true) {
                            var minCalcTime = new Date().toDateString() + ' ' + attributeModel.minDateTimeValues.time;
                            var maxCalcTime = new Date().toDateString() + ' ' + attributeModel.maxDateTimeValues.time;
                            if (new Date(minCalcTime) > new Date(maxCalcTime)) {
                                errorObj.push("Min Time is Less than Max Time.");
                            }
                        }
                    }
                }
            }
            if ((attributeModel.defaultDateTimeValues.timeOffset > 99999 || attributeModel.defaultDateTimeValues.timeOffset < 0 ||
                attributeModel.defaultDateTimeValues.timeOffset == null || attributeModel.defaultDateTimeValues.timeOffset == undefined || attributeModel.defaultDateTimeValues.timeOffset === "") && attributeModel.defaultDateTime == 2) {
                if (attributeType == 'date')
                    errorObj.push("Default Current Date Offset Must be 0 to 99999.");
                else
                    errorObj.push("Default Current Time Offset Must be 0 to 99999.");
            }
            if ((attributeModel.maxDateTimeValues.timeOffset > 99999 || attributeModel.maxDateTimeValues.timeOffset < 0 ||
                attributeModel.maxDateTimeValues.timeOffset == null || attributeModel.maxDateTimeValues.timeOffset == undefined || attributeModel.maxDateTimeValues.timeOffset === "") && attributeModel.maximumDateTime == 2) {
                if (attributeType == 'date')
                    errorObj.push("Maximum Current Date Offset Must be 0 to 99999.");
                else
                    errorObj.push("Maximum Current Time Offset Must be 0 to 99999.");
            }
            if ((attributeModel.minDateTimeValues.timeOffset > 99999 || attributeModel.minDateTimeValues.timeOffset < 0 ||
                attributeModel.minDateTimeValues.timeOffset == null || attributeModel.minDateTimeValues.timeOffset == undefined || attributeModel.minDateTimeValues.timeOffset === "") && attributeModel.minimumDateTime == 2) {
                if (attributeType == 'date')
                    errorObj.push("Minimum Current Date Offset Must be 0 to 99999.");
                else
                    errorObj.push("Minimum Current Time Offset Must be 0 to 99999.");
            }
        }
        $scope.validateYesNoAttribute = function (attributeModel, errorObj, attributeType) {
            if (attributeModel.displayType == null || attributeModel.displayType == undefined) {
                errorObj.push("Please Select Display Input As.");
            }
            if (attributeModel.defaultValue == null || attributeModel.defaultValue == undefined) {
                errorObj.push("Please Select Default Value.");
            }
            if (attributeModel.yesValue == null || attributeModel.yesValue == undefined) {
                errorObj.push("Please Enter Yes Value.");
            }
            if (attributeModel.noValue == null || attributeModel.noValue == undefined) {
                errorObj.push("Please Enter No Value.");
            }
        }

    }]);