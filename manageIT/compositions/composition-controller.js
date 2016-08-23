manageitModule.controller("compositionController", ['$scope','$rootScope', 'sharedScope', '$filter', 'classificationService', '$routeParams',
    'textAttributeService', 'compositionService', 'newSharedScope', 'attributeMapService', 'domainService', 'documentLibraryService', 'imageLibraryService',
function ($scope,$rootScope, sharedScope, $filter, classificationService, $routeParams, textAttributeService, compositionService, newSharedScope, attributeMapService, domainService, documentLibraryService, imageLibraryService) {

        sharedScope.store('compositionController', $scope);

        //**************************************** Compositions Logical flow through - Start *********************************************
        $scope.classificationCondition = [
         { key: "0", value: "Any Classification" },
         { key: "1", value: "Conditional Classification" }
        ];

        $scope.messageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.messageAMapModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.compositionFormMessageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };

        $scope.resetErrorDirective = function (attModel) {
            attModel.isError = false;
            attModel.isSuccess = false;
            attModel.isWarning = false;
            attModel.isInfo = false;
            attModel.messages = [];
            attModel.moreDetails = null;
            attModel.isHide = false;
        }
        $scope.showExceptionMessage = function (attModel, message, moredetails) {
            attModel.messages.push(message);
            attModel.moreDetails = moredetails;
            attModel.isError = true;
            //attModel.isHide = true;
        }
        $scope.showSuccessMessage = function (attModel, message) {
            attModel.messages.push(message);
            attModel.isSuccess = true;
            //attModel.isHide = true;
        }
        $scope.isDuplicate=function(allCompositions,composition) {
            for (var i = 0; i < allCompositions.length; i++) {
                if (allCompositions[i].compositionId != composition.compositionId && allCompositions[i].compositionName == composition.compositionName)
                    return true;
            }
            return false;
        }
        $scope.validate = function (model) {
            var errorCntrl = $scope.compositionFormMessageModel;
            var compositions = $scope.compositions;
            if ($scope.isDuplicate(compositions, model)) {
                $scope.showExceptionMessage(errorCntrl, "Composition with same name already exists");
                return false;
            }
            return true;
        }

        $scope.editOrAdd = "Add";
        $scope.attributeMapScreenName = $routeParams.compositionName + " > Attribute Map";
        $scope.isComposition = false;
        $scope.composition = { compositionId: '', compositionName: null, isEnabled: null, isAnyViewClassification: null, compositionViewNegationOperator: null };

        $scope.clearCompositionFields = function () {
            if ($scope.compositionForm != undefined)
                $scope.compositionForm.compositionForm.$setPristine();
            if ($scope.attributeMapForm != undefined)
                $scope.attributeMapForm.attributeMapForm.$setPristine();
            $scope.isComposition = true;
            $scope.editOrAdd = "Add";
            var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
            $scope.isClassification = true;

            $scope.composition = { compositionId: '', compositionName: null, isEnabled: null, isAnyViewClassification: null, compositionViewNegationOperator: null };

            classificationExpressionBuilderController.clearForm();
            classificationExpressionBuilderController.isFirst = true;
        }

        $scope.compositions = [];
        $scope.attributeTypeIsString = true;

        $scope.defaultCompositions = function () {
            $scope.compositions = [];
            var resource = {};
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (contentType.imageLibraryId) {
                var libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                var libraryid = contentType.contentTypeId
            }
            else {
                var libraryid = contentType.documentLibraryId
            }
            if ($routeParams.subObjectId == "0") {               
                resource = compositionService.query({ controller: 'Composition', paramUri: 'allCompDetails', domainId: contentType.domainId, contentTypeId: libraryid });
            }
            else {
                resource = compositionService.getSourceObjectComposition({ controller: 'Composition', paramUri: 'allCompDetailsBySO', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId });
            }
            resource.$promise.then(function (details) {

                var contentTypeCompositions = [];
                var subObjectCompositions = [];

                angular.forEach(details, function (value, key) {
                    if (value.subObjectId == null || value.subObjectId == "0") {
                        contentTypeCompositions.push(value);
                    }
                    else {
                        if (value.subObjectId == $routeParams.subObjectId)
                            subObjectCompositions.push(value);
                    }

                });

                if ($routeParams.subObjectId == "0") {
                    $scope.compositions = contentTypeCompositions;
                }
                else {
                    $scope.compositions = subObjectCompositions;
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                    });
                }

            });
        }

        //$scope.getCompositions = function () {
        //    $scope.compositions = [];
        //    $scope.resetErrorDirective($scope.messageModel);
        //    compositionService.query({ controller: 'Composition', paramUri: 'allCompDetails', contentTypeId: $routeParams.contentTypeId }).$promise.then(function (details) {
        //        if (details) {
        //            $scope.compositions = details;
        //        }

        //    }, function (error) {
        //        if (error.data.errorMessage) {
        //            angular.forEach(error.data.errorMessage, function (value, key) {
        //                $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
        //            });
        //        }

        //    });
        //}

        $scope.saveComposition = function () {
            //debugger
            $scope.resetErrorDirective($scope.compositionFormMessageModel);
            var compo = $scope.composition;
            if ($scope.validate(compo)) {
                $scope.resetErrorDirective($scope.messageModel);
                var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
                //create an instance of the factory
                var newClassification = new compositionService();
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newClassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newClassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newClassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                newClassification.subObjectId = $routeParams.subObjectId;
                newClassification.compositionName = compo.compositionName;
                newClassification.isEnabled = compo.isEnabled;
                newClassification.compositionViewNegationOperator = compo.compositionViewNegationOperator;
                newClassification.isAnyClassification = compo.isAnyViewClassification == "1" ? true : false;
                newClassification.compositionId = compo.compositionId;
                if (newClassification.isAnyClassification) {
                    newClassification.viewClassifications = classificationExpressionBuilderController.conditionsDisplay;

                    //update the parent negation operator.
                    angular.forEach(newClassification.viewClassifications, function (v, k) {
                        v.expressionNegationOperator = classificationExpressionBuilderController.storeExpressions[k];
                    });
                }
                else newClassification.viewClassifications = [];
             
                if (compo.compositionId == '' || compo.compositionId == null) {
                    newClassification.createdBy = $rootScope.manageITUserName;
                    compositionService.create({ controller: 'composition', paramUri: 'addComposition' }, newClassification).$promise.then(function (response) {

                        if (response.$resolved == true && response.compositionId != "") {
                            $scope.showSuccessMessage($scope.messageModel, "Composition saved successfully");
                            $('#addComposition').hide();
                            $('.modal-backdrop').hide();
                            $scope.defaultCompositions();
                            //call the dynamic left menu function.
                            var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                            if (contentType.imageLibraryId) {
                                sharedScope.get('rightMenuController').buildDynamicLeftMenuImage(contentType);
                            } else if (contentType.documentLibraryId) {
                                sharedScope.get('rightMenuController').buildDynamicLeftMenuDocument(contentType);
                            }
                            else {
                                sharedScope.get('rightMenuController').buildDynamicLeftMenu(contentType);
                            }
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                            });
                        }
                    });
                }
                else {
                    newClassification.updatedBy = $rootScope.manageITUserName;
                    newClassification.compositionName = compo.compositionName;
                    newClassification.compositionId = compo.compositionId;
                    compositionService.update({ controller: 'composition', paramUri: 'updateComposition' }, newClassification).$promise.then(function (response) {

                        if (response.$resolved == true && response.compositionId != "") {
                            $scope.showSuccessMessage($scope.messageModel, "Composition updated successfully");
                            $('#addComposition').hide();
                            $('.modal-backdrop').hide();
                            $scope.defaultCompositions();
                            //call the dynamic left menu function.
                            sharedScope.get('rightMenuController').buildDynamicLeftMenu();
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
            
        }

        $scope.editComposition = function (composition) {
            $scope.resetErrorDirective($scope.compositionFormMessageModel);
            $scope.isComposition = true;
            $scope.editOrAdd = "Edit";
            var resource = {};
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (contentType.imageLibraryId) {
                var libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                var libraryid = contentType.contentTypeId
            }
            else {
                var libraryid = contentType.documentLibraryId
            }
            if (composition.compositionId != '') {
                if ($routeParams.subObjectId == "0") {
                    resource = compositionService.get({
                        controller: 'Composition', paramUri: 'compbyId',domainId: contentType.domainId,
                        contentTypeId: libraryid, id: composition.compositionId
                    });                  

                }
                else {
                    resource = compositionService.getSourceObjectCompositionById({
                        controller: 'Composition', paramUri: 'compSObyId', domainId: contentType.domainId,
                        contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, id: composition.compositionId
                    });
                }
                resource.$promise.then(function (response) {

                    if (response.$resolved == true) {
                        var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
                        $scope.composition.compositionId = response.compositionId;
                        $scope.composition.compositionName = response.compositionName;
                        $scope.composition.isEnabled = response.isEnabled;
                        classificationExpressionBuilderController.composition.isAnyViewClassification = response.isAnyClassification ? "1" : "0";
                        $scope.composition.compositionViewNegationOperator = composition.compositionViewNegationOperator;
                        classificationExpressionBuilderController.conditionsDisplay = response.viewClassifications;
                        classificationExpressionBuilderController.isFirst = false;
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

        $scope.deleteComposition = function (composition) {
            $scope.resetErrorDirective($scope.messageModel);
            if (composition.compositionId != '') {

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                composition.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                composition.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                composition.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                compositionService.remove({ controller: 'Composition', paramUri: 'removeComposition' }, composition).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "Composition deleted successfully");
                        $scope.defaultCompositions();
                        //call the dynamic left menu function.
                        //call the dynamic left menu function.
                        var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                        if (contentType.imageLibraryId) {
                            sharedScope.get('rightMenuController').buildDynamicLeftMenuImage(contentType);
                        } else if (contentType.documentLibraryId) {
                            sharedScope.get('rightMenuController').buildDynamicLeftMenuDocument(contentType);
                        }
                        else {
                            sharedScope.get('rightMenuController').buildDynamicLeftMenu(contentType);
                        }
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
        //functions for handle cancel popup Start
        $scope.openErrorScreen = function (formStatus, formName) {
            $scope.attributeFormDirty = formStatus;
            $scope.attributeForm = formName;
            $scope.isErrorScreen = true;
        }

        $scope.setFormScope = function (scope, formName) {
            $scope[formName] = scope;
            //$scope.formScope = scope;
        }

        $scope.confirmErrorScreenClose = function (attributeForm) {
            if ($scope.compositionForm!=undefined)
                $scope.compositionForm.compositionForm.$setPristine();
            if ($scope.attributeMapForm != undefined)
                $scope.attributeMapForm.attributeMapForm.$setPristine();
            angular.element('#addComposition').modal('hide');
            angular.element('#addAttributeMap').modal('hide');
            $scope.attributeFormDirty = false;
            $scope.attributeForm = "";
            $scope.isErrorScreen = false;
            $scope.clearCompositionFields();
            $scope.initializeMapReferenceAttributeValues();
            $scope.selectedMapFilters = [];
            $scope.resetErrorDirective($scope.compositionFormMessageModel);
        }

        //**************************************** Compositions Logical flow through - End *********************************************
        //**************************************** AttributeMap Attribute Logical flow through - Start *********************************

        $scope.defaultAttributes = function () {
            $scope.resetErrorDirective($scope.messageAMapModel);
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
           
            if (contentType.imageLibraryId) {
                libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                libraryid = contentType.contentTypeId
            }
            else {
                libraryid = contentType.documentLibraryId
            }
            textAttributeService.getAllAttributesInLibrary({ domainId: contentType.domainId, contentTypeId: libraryid, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (details) {

                $scope.targetAttributeList = details;

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageAMapModel, value.message, value.moreDetails);
                        $scope.messageAMapModel.isHide = false;
                        $scope.messageAMapModel.isError = true;
                    });
                }

            });
        }
        $scope.allContentTypes = [];
        $scope.allDomains = [];
        $scope.tmpContentDoamians = [];
        $scope.getAllDomains = function () {
            domainService.getAllDomains().$promise.then(function (result) {
                $scope.allDomains = result;
                angular.forEach(result, function (domain) {                    
                    angular.forEach(domain.contentTypes, function (contentType) {
                        $scope.allContentTypes.push(contentType);
                    });
                });
            }, function (error) {
                if (error.data != undefined && error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                    });
                }
            });
            $scope.allImageLIbraries = [];
            //get image libraries
                imageLibraryService.getAllImageLibraries().$promise.then(function (details) {
                    $scope.allImageLIbraries = details;   
                }, function (error) {

                });
           
            //get document libraries
            $scope.allDocumentLibraries = [];

            documentLibraryService.getAllDocumentLibraries().$promise.then(function (details) {
                $scope.allDocumentLibraries = details;
            },
               function (error) {
                   angular.forEach(error.data, function (value, key) {
                       {
                           if (value.errorMessage) {
                               angular.forEach(value.errorMessage, function (v, k) {
                                   //  alert(v.message);
                               });
                           }
                       }
                   });
               });
        }
        
        $scope.getAttributeTreeStructure = function (targetAttribute,isEdit) {
            if (targetAttribute) {
                $scope.tmpContentDoamians = [];
                $scope.clearAcceptedMapTypes();
                if (!isEdit)
                    $scope.attributeMap.selectedMapTypes = [];
                var targetAttributeType = "";
                if (typeof targetAttribute == 'string') {
                    targetAttributeType = JSON.parse(targetAttribute).attributeType;
                    $scope.attributeMap.targetAttribute = JSON.parse(targetAttribute);
                }
                else {
                    targetAttributeType = targetAttribute.attributeType;
                }
                var objData = [];

                //updated the list based on domain for libraries and content type
              
                var contentTypeVal = sharedScope.get('rightMenuController').contentTypeModel;

                if (contentTypeVal.contentTypeId) {
                    var contentTypes = $scope.allContentTypes;
                }
                   
                if (contentTypeVal.imageLibraryId) {
                    var contentTypes = $scope.allImageLIbraries;                   
                }
                   
                if (contentTypeVal.documentLibraryId) {
                    var contentTypes = $scope.allDocumentLibraries;
                }
                if (contentTypes && contentTypes.length > 0) {
                    var contentTypesCount = contentTypes.length;
                    for (var j = 0; j < contentTypesCount ; ++j) {
                        var contentType = contentTypes[j];
                        if (contentTypeVal.contentTypeId) {                           
                            $scope.insertContentData(contentType, objData, targetAttributeType);
                        }
                        if (contentTypeVal.imageLibraryId) {
                            $scope.insertImageData(contentType, objData, targetAttributeType);
                        }
                        if (contentTypeVal.documentLibraryId) {                            
                            $scope.insertDocumentData(contentType, objData, targetAttributeType);
                        }
                    }
                    $scope.compositionAttributeTreeStructure = objData;
                    $scope.allMapTypes = objData;
                    $scope.$broadcast("loadDualMultiSelectControl#acceptedMapTypes", $scope.allMapTypes, $scope.attributeMap.selectedMapTypes);
                }
            }
        }

        function isContainContentData(obj) {
            var z=0;
            for(var i=0;i<$scope.tmpContentDoamians.length;i++){
                if (angular.equals($scope.tmpContentDoamians[i].value, obj.value)) {
                    return true;
                }
            }
            return false;
        }

        $scope.insertContentData = function (contentType, objData, targetAttributeType, objType) {
            var obj = {
                value: contentType.contentTypeId,
                label: contentType.pluralName,
                attributeType: objType,
                children: []
            }
            
            if (!isContainContentData(obj)) {
                $scope.tmpContentDoamians.push(obj);
                if (contentType.defaultAttributes.length > 0) {
                    $scope.ObjectContainsAttribute(contentType, obj, false, targetAttributeType);
                    if (obj.children.length > 0) {
                        objData.push(obj);
                    }
                }
                if (contentType.subObjects.length > 0) {
                    for (var v = 0; v < contentType.subObjects.length; v++) {
                        if (contentType.subObjects[v].attributes.length > 0) {
                            var subObjData = {
                                value: contentType.subObjects[v].subObjectId,
                                label: contentType.subObjects[v].pluralName,
                                attributeType: objType,
                                children: []
                            };
                            $scope.ObjectContainsAttribute(contentType.subObjects[v], subObjData, true, targetAttributeType);
                            if (subObjData.children > 0)
                                objData.push(subObjData);
                        }
                    }
                }
                if (contentType.attributeSetList.length > 0) {
                    for (var v = 0; v < contentType.attributeSetList.length; v++) {
                        if (contentType.attributeSetList[v].attributes.length > 0) {
                            var attributeSetData = {
                                value: contentType.attributeSetList[v].attributeSetId,
                                label: contentType.attributeSetList[v].attributeSetName,
                                attributeType: objType,
                                children: []
                            };
                            $scope.ObjectContainsAttribute(contentType.attributeSetList[v], attributeSetData, true, targetAttributeType);
                            if (attributeSetData.children > 0)
                                objData.push(attributeSetData);
                        }
                    }
                }
            }
        }
        $scope.insertImageData = function (contentType, objData, targetAttributeType, objType) {            
            var obj = {
                value: contentType.imageLibraryId,
                label: contentType.pluralName,
                attributeType: objType,
                children: []
            }

            if (!isContainContentData(obj)) {
                $scope.tmpContentDoamians.push(obj);
                if (contentType.attributes.length > 0) {
                    $scope.ObjectContainsAttribute(contentType, obj, true, targetAttributeType);
                    if (obj.children.length > 0) {
                        objData.push(obj);
                    }
                }
                if (contentType.subObjects.length > 0) {
                    for (var v = 0; v < contentType.subObjects.length; v++) {
                        if (contentType.subObjects[v].attributes.length > 0) {
                            var subObjData = {
                                value: contentType.subObjects[v].subObjectId,
                                label: contentType.subObjects[v].pluralName,
                                attributeType: objType,
                                children: []
                            };
                            $scope.ObjectContainsAttribute(contentType.subObjects[v], subObjData, true, targetAttributeType);
                            if (subObjData.children > 0)
                                objData.push(subObjData);
                        }
                    }
                }
                if (contentType.attributeSetList.length > 0) {
                    for (var v = 0; v < contentType.attributeSetList.length; v++) {
                        if (contentType.attributeSetList[v].attributes.length > 0) {
                            var attributeSetData = {
                                value: contentType.attributeSetList[v].attributeSetId,
                                label: contentType.attributeSetList[v].attributeSetName,
                                attributeType: objType,
                                children: []
                            };
                            $scope.ObjectContainsAttribute(contentType.attributeSetList[v], attributeSetData, true, targetAttributeType);
                            if (attributeSetData.children > 0)
                                objData.push(attributeSetData);
                        }
                    }
                }
            }
        }
        $scope.insertDocumentData = function (contentType, objData, targetAttributeType, objType) {
            var obj = {
                value: contentType.imageLibraryId,
                label: contentType.pluralName,
                attributeType: objType,
                children: []
            }

            if (!isContainContentData(obj)) {
                $scope.tmpContentDoamians.push(obj);
                if (contentType.attributes.length > 0) {
                    $scope.ObjectContainsAttribute(contentType, obj, true, targetAttributeType);
                    if (obj.children.length > 0) {
                        objData.push(obj);
                    }
                }
                if (contentType.subObjects.length > 0) {
                    for (var v = 0; v < contentType.subObjects.length; v++) {
                        if (contentType.subObjects[v].attributes.length > 0) {
                            var subObjData = {
                                value: contentType.subObjects[v].subObjectId,
                                label: contentType.subObjects[v].pluralName,
                                attributeType: objType,
                                children: []
                            };
                            $scope.ObjectContainsAttribute(contentType.subObjects[v], subObjData, true, targetAttributeType);
                            if (subObjData.children > 0)
                                objData.push(subObjData);
                        }
                    }
                }
                if (contentType.attributeSetList.length > 0) {
                    for (var v = 0; v < contentType.attributeSetList.length; v++) {
                        if (contentType.attributeSetList[v].attributes.length > 0) {
                            var attributeSetData = {
                                value: contentType.attributeSetList[v].attributeSetId,
                                label: contentType.attributeSetList[v].attributeSetName,
                                attributeType: objType,
                                children: []
                            };
                            $scope.ObjectContainsAttribute(contentType.attributeSetList[v], attributeSetData, true, targetAttributeType);
                            if (attributeSetData.children > 0)
                                objData.push(attributeSetData);
                        }
                    }
                }
            }
        }
        $scope.getAllDomains();
        $scope.ObjectContainsAttribute = function (contentType, data, isSubObj, targetAttributeType,iscopy) {
            var attributes = [];
            if (isSubObj)
                attributes = contentType.attributes;
            else
                attributes = contentType.defaultAttributes;
            if (attributes.length > 0) {
                for (var i = 0; i < attributes.length ; ++i) {
                    if (attributes[i].attributeType != "ObjectReferenceAttribute") {
                        if (attributes[i].attributeType != "CopyAttribute") {
                            if (targetAttributeType == attributes[i].attributeType) {
                                var attrId = $scope.attributeMap.targetAttribute.attributeId;
                                if (contentType.contentTypeId != $routeParams.contentTypeId || attrId != attributes[i].attributeId) {
                                    data.children.push({
                                        value: attributes[i].attributeId,
                                        label: attributes[i].name,
                                        attributeType: attributes[i].attributeType
                                    });
                                }
                            }
                        }
                        else {
                            if (attributes[i].copyFieldDetails.length > 0) {
                                var copyData ={
                                    value: attributes[i].attributeId,
                                    label: attributes[i].name,
                                    children: []
                                };                                
                                for (var z = 0; z < attributes[i].copyFieldDetails.length ; ++z) {
                                    if (targetAttributeType == attributes[i].copyFieldDetails[z].attributeType || targetAttributeType == "CopyAttribute") {
                                        var attrId = $scope.attributeMap.targetAttribute.attributeId;
                                        if (attributes[i].copyFieldDetails[z].contentTypeId != $routeParams.contentTypeId || attrId != attributes[i].copyFieldDetails[z].attributeId) {
                                            copyData.children.push({
                                                value: attributes[i].copyFieldDetails[z].attributeId,
                                                label: attributes[i].copyFieldDetails[z].name,
                                                attributeType: attributes[i].copyFieldDetails[z].attributeType
                                            });
                                        }
                                    }
                                }
                                if (copyData.children.length > 0)
                                    data.children.push(copyData);
                            }
                        }
                    }
                    else {
                        var acceptedContentTypes = attributes[i].acceptedContentTypes;
                        if (acceptedContentTypes) {
                            var contype={
                                value: attributes[i].attributeId,
                                label: attributes[i].name,
                                children:[]
                            };
                            for (var x = 0; x < acceptedContentTypes.length; x++) {
                                angular.forEach($scope.allContentTypes, function (accContentType) {
                                    if (accContentType.contentTypeId == acceptedContentTypes[x].id) {
                                        $scope.insertContentData(accContentType, contype.children, targetAttributeType, attributes[i].attributeType);
                                    }
                                });
                            }
                            if (contype.children.length > 0) {
                                data.children.push(contype);
                            }
                        }
                    }
                }
            }
        }

        $scope.getSourceAttribute = function () {
            $scope.clearMapReferenceFields();
            $scope.resetErrorDirective($scope.messageAMapModel);
            var attributeType = $scope.attributeMap.targetAttribute == null ? '' : JSON.parse($scope.attributeMap.targetAttribute).attributeId;

            compositionService.getAllSourceAttributes({
                controller: 'composition', paramUri: 'details',
                contentTypeId: $routeParams.contentTypeId, attributeType: "text"
            }).$promise.then(function (details) {
                //$scope.allMapTypes = details;
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageAMapModel, value.message, value.moreDetails);
                        $scope.messageAMapModel.isHide = false;
                        $scope.messageAMapModel.isError = true;
                    });
                }
            });
        }

        $scope.findAttributeById = function (attributeId) {
            if ($scope.targetAttributeList) {
                var obj = $scope.targetAttributeList.filter(function (item) {
                    return item.attributeId === attributeId;
                });
                if (obj.length > 0) return obj[0].name;
            }
            return '';
        }

        $scope.getAttributeMaps = function () {
            $scope.resetErrorDirective($scope.messageAMapModel);
            var attrMapService = "";

            //update get based on all 3 libraries
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (contentType.imageLibraryId) {
                var libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                var libraryid = contentType.contentTypeId
            }
            else {
                var libraryid = contentType.documentLibraryId
            }


            if ($routeParams.subObjectId != "0") {
                
                //attrMapService = attributeMapService.getAllSubObjectAttributeMapByContentById({
                //    controller: 'attributemap',
                //    paramUri: 'allAttributeMapBySO',
                //    contentTypeId: $routeParams.contentTypeId,
                //    compositionId: $routeParams.compositionId,
                //    subObjectId:$routeParams.subObjectId
                //});
                attrMapService = attributeMapService.getAllSubObjectAttributeMapByContentByIdLibrary({
                    controller: 'attributemap',
                    paramUri: 'allAttributeMapBySO',domainId: contentType.domainId,
                    contentTypeId: libraryid,
                    compositionId: $routeParams.compositionId,
                    subObjectId: $routeParams.subObjectId
                });
            }
            else {
                
                attrMapService = attributeMapService.getAllAttributeMapByContentByIdLibrary({
                    controller: 'attributemap',
                    paramUri: 'allAttributeMap',domainId: contentType.domainId,
                    contentTypeId: libraryid,
                    compositionId: $routeParams.compositionId
                });
                //attrMapService = attributeMapService.getAllAttributeMapByContentById({
                //    controller: 'attributemap',
                //    paramUri: 'allAttributeMap',
                //    contentTypeId: $routeParams.contentTypeId,
                //    compositionId: $routeParams.compositionId
                //});
            }

            attrMapService.$promise.then(function (details) {
                $scope.attributes = details;
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageAMapModel, value.message, value.moreDetails);
                        $scope.messageAMapModel.isHide = false;
                        $scope.messageAMapModel.isError = true;
                    });
                }
            });
        }
        $scope.drillDownToLastDocumentReference = function (acceptedDocType, attributeArray) {
            angular.forEach(acceptedDocType, function (v, k) {
                angular.forEach(v.additionalLinkingProperties.linkedSources.selectedDocAttribute, function (attValue, attKey) {
                    var attrChild = { label: attValue.name, value: attValue.id, children: [] };
                    if ($scope.isReferenceAttribute(attValue.contentTypeId, attValue.id, 'DocumentReferenceAttribute')) {
                        $scope.drillDownToLastDocumentReference(attValue.acceptedDocumentType, attrChild.children);
                    }
                    attributeArray.children.push(attrChild);
                    $scope.addedContentTypes.push(attValue.contentTypeId);
                });
            });
        }

        $scope.isReferenceAttribute = function (contentTypeId, attributeId, attributeType) {
            var contentTypeCollection = sharedScope.get('rightMenuController').contentTypes;
            var isRef = false;
            for (var i = 0; i < contentTypeCollection.length; i++) {
                var value = contentTypeCollection[i];
                if (value.contentTypeId == contentTypeId) {
                    for (var j = 0; j < value.attributes.length; j++) {
                        if (value.attributes[j].attributeId == attributeId && value.attributes[j].attributeType == attributeType) {
                            isRef = true;
                            break;
                        }
                    }
                }
                if (isRef) break;
            }

            return isRef;
        }

        $scope.attributeMap = {
            attributeMapId: '', version: null,
            selectedMapTypes: [],
            targetAttribute: null,
            //A collection to hold all the inner values of an option. This dictionary key will be the optionId
            mapTypeInnerNodeValues: {}
        };

        $scope.initializeMapReferenceAttributeValues = function () {
            $scope.attributeMap = {
                attributeMapId: '', version: null,
                selectedMapTypes: [],
                targetAttribute: null,
                //A collection to hold all the inner values of an option. This dictionary key will be the optionId
                mapTypeInnerNodeValues: {}
            };
        }

        $scope.errorsMapRef = [];

        /* Data Section - End */

        /* General Functions Section - Start */

        $scope.clearAttributeMapFields = function () {
            $scope.action = "Add";
            //Initialize the values
            $scope.initializeMapReferenceAttributeValues();

            //Clear the previous error messages
            $scope.errorsMapRef = [];
        };

        $scope.clearMapReferenceFields = function () {
            //Intialize the attribute with default values
            $scope.initializeMapReferenceAttributeValues();

        };

        /* General Functions Section - End */

        /* Accepted Map Types Section - Start */

        $scope.mapTypeInnerValues = {};
        $scope.initializeItemInnerContentValues = function (itemValue) {
            $scope.mapTypeInnerValues[itemValue] = {
                selectedFilters: [],
                properties: {
                    itemFilter: '',
                    firstItems: '',
                    lastItems: '',
                    rangeFrom: '',
                    rangeTo: ''
                }
            };
        };

        $scope.showMapProperties = function (itemVal, isMultiple) {
            var itemValue = itemVal.value;
            event.preventDefault();

            //store this value for later purposes
            $scope.activeMapTypeId = itemValue;

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#mapPropertiesDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#mapPropertiesDropdown"));
            }

            //Populate the values corresponding to the Item
            var itemInnerValues = $scope.attributeMap.mapTypeInnerNodeValues[itemValue];
            if (!itemInnerValues) {
                $scope.initializeItemInnerContentValues(itemValue);
                itemInnerValues = $scope.mapTypeInnerValues[itemValue];
            }
            $scope.mapProperties = itemInnerValues.properties;
            $scope.mapProperties["isMultiple"] = isMultiple.value;           
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = (!isDropdownExists && $("#mapPropertiesDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleMapProperties");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();    
        };

        $scope.showMapFilters = function (itemVal,type) {
            var itemValue = itemVal.value;
            var itemType = type.value;
            var contentId = "";
            event.preventDefault();

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#mapFiltersDropdown")).length > 0;
            $scope.attributeRoles = [{ key: "100", value: "Any Role" }];
            angular.forEach($scope.targetAttributeList, function (attr) {
                if (attr.attributeId == itemValue && attr.attributeType == itemType) {
                    var roles = [];
                    contentId = attr.contentTypeId;
                    if (itemType == "DocumentReferenceAttribute")
                        roles = attr.documentRoles;
                    else if (itemType == "ImageReferenceAttribute")
                        roles = attr.imageRoles;
                    angular.forEach(roles, function (value, key) {
                        var obj = { key: value.roleId, value: value.roleName };
                        $scope.attributeRoles.push(obj);
                    });
                }
            });
            if (itemType == "DocumentReferenceAttribute" || itemType == "ImageReferenceAttribute")
                $scope.mapFilterOptions = $scope.attributeRoles;
            else {
                $scope.contentTypeClassifications = [{ key: "100", value: "Any Classification" }];
                angular.forEach($scope.allContentTypes, function (contentType) {                        
                        if (contentType.contentTypeId == itemValue) {
                            angular.forEach(contentType.classifications, function (value, key) {
                                var obj = { key: value.classificationId, value: value.classificationName };
                                $scope.contentTypeClassifications.push(obj);
                            });
                        }                                                
                });
                $scope.mapFilterOptions = $scope.contentTypeClassifications;
            }
            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#mapFiltersDropdown"));
            }

            //Populate the values corresponding to the Item
            var itemInnerValues = $scope.attributeMap.mapTypeInnerNodeValues[itemValue];
            if (!itemInnerValues) {
                $scope.initializeItemInnerContentValues(itemValue);
                itemInnerValues = $scope.mapTypeInnerValues[itemValue];
            }
            $scope.selectedMapFilters = itemInnerValues.selectedFilters;
            $scope.$apply();
            $("#toggleMapFilters").dropdown('toggle')
            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            //var skipToggleDropdown = (!isDropdownExists && $("#mapFiltersDropdown").hasClass('open'));
            //if (!skipToggleDropdown) {
            //    var toggleNode = $("#toggleMapFilters");
            //    $(toggleNode).dropdown('toggle');
            //}

            event.stopPropagation();
        };

        $scope.createMapTypeInnerContentNode = function (item) {
            var childNode = document.createDocumentFragment();

            //Create Button1 - Add Properties
            var buttonParentNode1 = $("<div class='inline-display reference-dropdown'></div>");
            var buttonNode1 = $("<i class='fa fa-ellipsis-h large-font gray-color inner-control' style='border: gray 1px solid;padding: 0px 2px;'></i>");
            buttonParentNode1.append(buttonNode1);
            var type=$(item)[0].attributes.attributeType.value;
            if (type == "DocumentReferenceAttribute" || type == "ObjectReferenceAttribute" || type == "ImageReferenceAttribute") {
                //Create Button2 - Filter Doc
                var buttonParentNode2 = $("<div class='dropdown inline-display reference-dropdown'></div>");
                var buttonNode2 = $("<i class='fa fa-filter large-font gray-color inner-control'></i>");
                buttonParentNode2.append(buttonNode2);

                //Add Buttons to the DOM
                childNode.appendChild(buttonParentNode2[0]);
                buttonNode2.click(function () { $scope.showMapFilters($(item)[0].attributes.value, $(item)[0].attributes.attributeType); });
            }
            childNode.appendChild(buttonParentNode1[0]);
            buttonNode1.click(function () { $scope.showMapProperties($(item)[0].attributes.value, $(item)[0].attributes.isMultiple); });

            return childNode;
        };

        /* Map properties Section - Start */

        $scope.mapProperties = {};

        $scope.linkMapOptions = [{
            key: '1', value: 'The current object only'
        }, {
            key: '2', value: 'The current object and an Owner object'
        }];


        

        $scope.getClassificationsByContentTypeId = function () {
            $scope.contentTypeClassifications = [{ key: "100", value: "Any Classification" }];
            classificationService.query({ id: $routeParams.contentTypeId }).$promise.then(function (details) {
                angular.forEach(details, function (value, key) {
                    var obj = { key: value.classificationId, value: value.classificationName };
                    $scope.contentTypeClassifications.push(obj);
                });
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageAMapModel, value.message, value.moreDetails);
                        $scope.messageAMapModel.isError = false;
                        $scope.messageAMapModel.isHide = true;
                    });
                }
            });
            //return $scope.contentTypeClassifications;
        }

        /* Map properties Section - End */

        /* Map Filter Section - Start */

        //$scope.mapFilterOptions = $scope.contentTypeClassifications;

        //This object will hold the selected Map Filters for a given type (at a given point)
        $scope.selectedMapFilters = [];

        $scope.isMapOptionSelected = function (optionValue) {
            var selectedFilters = $scope.selectedMapFilters;

            if (selectedFilters && selectedFilters.indexOf(optionValue) >= 0) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.isMultiple = function (item) {

        };

        $scope.checkFilterValues = function (mapProperties) {
            var firstItems = '', lastItems = '', rangeFrom = '', rangeTo = '';

            if (mapProperties.itemFilter == "First") firstItems = mapProperties.firstItems;
            if (mapProperties.itemFilter == "Last") lastItems = mapProperties.lastItems;
            if (mapProperties.itemFilter == "Range") { rangeFrom = mapProperties.rangeFrom, rangeTo = mapProperties.rangeTo }

            mapProperties.firstItems = firstItems;
            mapProperties.lastItems = lastItems;
            mapProperties.rangeFrom = rangeFrom;
            mapProperties.rangeTo = rangeTo;

        }

        $scope.changeMapFilters = function (optionValue) {
            var selectedFilters = $scope.selectedMapFilters;
            var optionIndex = selectedFilters.indexOf(optionValue);

            //If the item is already present, and the option is again changed, it is deselected
            if (optionIndex >= 0) {
                $scope.selectedMapFilters.splice(optionIndex, 1);
            }
            else {
                $scope.selectedMapFilters.push(optionValue);
            }
        };

        /* Map Filter Section - End */

        $scope.showAcceptedMapTypes = function () {
            $scope.$broadcast("loadDualMultiSelectControl#acceptedMapTypes", null, $scope.attributeMap.selectedMapTypes);
            //Handle the Modal Dialog close event - to preserve the inner dropdown content
            $("#addAttributeMap").unbind("hidden.bs.modal");
            $("#addAttributeMap").on("hidden.bs.modal", function () {
                $scope.clearAcceptedMapTypes();
            });
        };

        $scope.saveAcceptedMapTypes = function () {
            $scope.attributeMap.mapTypeInnerNodeValues = angular.copy($scope.mapTypeInnerValues);

            //Close the Dialog
            $("#addAttributeMap").modal('toggle');
        };

        $scope.clearAcceptedMapTypes = function () {
            //Push the Dropdown content into the parent control - for persisting the inner control dropdown content
            $("#mapMultiSelectInnerDroppdown_parent").append($("#mapPropertiesDropdown"));
            $("#mapMultiSelectInnerDroppdown_parent").append($("#mapFiltersDropdown"));

            $scope.mapTypeInnerValues = {};
        };

        /* Accepted Map Types Section - End */

        /* Document Linking Sources Section - Start */

        $scope.findParentNameForSelectedValue = function (option, selectedValue) {
            var returnValues = [];
            if (option && selectedValue) {
                if (option.value == selectedValue) {
                    returnValues.push(option.label);
                    $scope.selectedDocSearchOptionType = option.type;
                }
                else if (option.children && option.children.length > 0) {
                    var children = option.children;
                    var childrenCount = children.length;

                    for (var j = 0; j < childrenCount; ++j) {
                        var child = children[j];
                        var childReturnValues = $scope.findParentNameForSelectedValue(child, selectedValue);
                        if (childReturnValues && childReturnValues.length > 0) {
                            returnValues.push(option.label);
                            returnValues = returnValues.concat(childReturnValues);
                            break;
                        }
                    }
                }
            }
            return returnValues;
        };
        /* Document Linking Sources Section - End */

        $scope.errorAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };

        $scope.saveAttributeMap = function () {
            $scope.resetErrorDirective($scope.messageAMapModel);
            //$scope.attributeMap.mapTypeInnerNodeValues = angular.copy($scope.mapTypeInnerValues);

            var attributeMapDTO = {};
            var attributeMap = $scope.attributeMap;
            if (typeof attributeMap.targetAttribute == 'string')
                attributeMapDTO.targetAttributeId = JSON.parse(attributeMap.targetAttribute).attributeId;
            else
                attributeMapDTO.targetAttributeId = attributeMap.targetAttribute.attributeId;

            attributeMapDTO.ContentTypeId = $routeParams.contentTypeId;
            attributeMapDTO.subObjectId = $routeParams.subObjectId;
            attributeMapDTO.compositionId = $routeParams.compositionId;
            attributeMapDTO.acceptedMapTypes = [];
            attributeMapDTO.attributeMapId = attributeMap.attributeMapId;
            angular.forEach($scope.attributeMap.selectedMapTypes, function (value, key) {
                var acceptedMapType = {
                    id: value.value,
                    name: value.label,
                    selectedClassification: [],
                    selectedItemFilters: {}
                };
                var mapTypeInnerNodeValues = $scope.attributeMap.mapTypeInnerNodeValues[value.value];

                if (!angular.isUndefined(mapTypeInnerNodeValues)) {

                    //these are the selected classifications for each item
                    angular.forEach(mapTypeInnerNodeValues.selectedFilters, function (v, k) {
                        var selectedClassification = {
                            id: v,
                            name: $scope.findArrayValueById($scope.mapFilterOptions, v),
                            isAnyClassification: v === "1" ? true : false
                        };
                        acceptedMapType.selectedClassification.push(selectedClassification);
                    });

                    //these are the selected filter values for each item
                    acceptedMapType.selectedItemFilters = angular.copy(mapTypeInnerNodeValues.properties);
                }
                attributeMapDTO.acceptedMapTypes.push(acceptedMapType);
            });

            if (attributeMap.attributeMapId == '') {
                attributeMapDTO.createdBy = $rootScope.manageITUserName;
                // add attribute map based on library id
               
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;               
                attributeMapDTO.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                attributeMapDTO.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                attributeMapDTO.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : ''; 
                attributeMapService.create({
                    controller: 'AttributeMap', paramUri: 'addAttributeMap'
                }, attributeMapDTO).$promise.then(function (response) {
                    if (response.$resolved == true && response.attributeMapId != "") {                        
                        //Close the Dialog
                        $("#addAttributeMap").modal('toggle');
                        $scope.clearMapReferenceFields();
                        $scope.getAttributeMaps();
                        if (!$routeParams.subObjectId != "0") {
                            //call the dynamic left menu function.
                            sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                        }
                        $scope.showSuccessMessage($scope.messageAMapModel, "Attribute Maps saved successfully");
                        $scope.messageAMapModel.isSuccess = true;
                        $scope.messageAMapModel.isHide = false;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageAMapModel, value.message, value.moreDetails);
                            $scope.messageAMapModel.isError = true;
                            $scope.messageAMapModel.isHide = false;
                        });
                    }
                });
            }
            else {
                attributeMapDTO.attributeMapId = attributeMap.attributeMapId;
                attributeMapDTO.updatedBy = $rootScope.manageITUserName;

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                attributeMapDTO.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                attributeMapDTO.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                attributeMapDTO.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                attributeMapService.update({
                    controller: 'AttributeMap', paramUri: 'updateAttributeMap'
                }, attributeMapDTO).$promise.then(function (response) {

                //compositionService.update({ controller: 'composition', paramUri: 'updateComposition' }, attributeMapDTO).$promise.then(function (response) {

                    if (response.$resolved == true && response.attributeMapId != "") {
                       
                        //Close the Dialog
                        $("#addAttributeMap").modal('toggle');
                        $scope.clearMapReferenceFields();
                        $scope.getAttributeMaps();
                        if (!$routeParams.subObjectId != "0") {
                            //call the dynamic left menu function.
                            sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                        }
                        $scope.showSuccessMessage($scope.messageAMapModel, "Attribute Maps updated successfully");
                        $scope.messageAMapModel.isSuccess = true;
                        $scope.messageAMapModel.isHide = false;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageAMapModel, value.message, value.moreDetails);
                            $scope.messageAMapModel.isError = true;
                            $scope.messageAMapModel.isHide = false;
                        });
                    }
                });
            }
            //}
        };

        $scope.deleteAttributeMap = function (selectedAttr) {
            $scope.resetErrorDirective($scope.messageAMapModel);
            // delete attribute map based on library id
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

            attributeMapService.remove({ controller: 'AttributeMap', paramUri: 'removeAttributeMap' }, selectedAttr).$promise.then(function (response) {
                if (response.$resolved == true) {                   
                    $scope.getAttributeMaps();
                    //call the dynamic left menu function.
                    sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                    $scope.showSuccessMessage($scope.messageAMapModel, "Attribute Maps deleted successfully");
                    $scope.messageAMapModel.isSuccess = true;
                    $scope.messageAMapModel.isHide = false;
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageAMapModel, value.message, value.moreDetails);
                        $scope.messageAMapModel.isError = true;
                        $scope.messageAMapModel.isHide = false;
                    });
                }
            });
        }

        $scope.editAttributeMap = function (selectedAttributeMap) {
            $scope.action = "Edit";
            //$scope.errors = [];
            //$scope.errorsDocRef = [];
            $scope.attributeMap = {
                attributeMapId: '', version: null,
                selectedMapTypes: [],
                targetAttribute: null,
                //A collection to hold all the inner values of an option. This dictionary key will be the optionId
                mapTypeInnerNodeValues: {}
            };
            $scope.readonly = true;
            $scope.attributeMap.attributeMapId = selectedAttributeMap.attributeMapId;
            //Document Reference Attribute properties

            angular.forEach(selectedAttributeMap.acceptedMapTypes, function (value, key) {
                $scope.initializeItemInnerContentValues(value.id);
                $scope.attributeMap.selectedMapTypes.push({ "label": value.name, "value": value.id });
                var eachNode = $scope.mapTypeInnerValues[value.id];
                eachNode.label = value.name;
                eachNode.value = value.id;
                //$scope.fillKeyValuePair(value, $scope.attributeMap.selectedMapTypes);

                angular.forEach(value.selectedClassification, function (v, k) {
                    eachNode.selectedFilters.push(v.id);
                });

                eachNode.properties = angular.copy(value.selectedItemFilters);
            });

            //Store the values into the attribute
            $scope.attributeMap.mapTypeInnerNodeValues = angular.copy($scope.mapTypeInnerValues);
            angular.forEach($scope.targetAttributeList, function (attr) {
                if (attr.attributeId == selectedAttributeMap.targetAttributeId) {
                    $scope.attributeMap.targetAttribute=attr;
                    $scope.getAttributeTreeStructure(attr,true);
                }
            });
           // $scope.showAcceptedMapTypes();

        }

        $scope.findArrayValueById = function (arr, id) {
            var val = '';
            arr.filter(function (item) {
                if (item.key === id) {
                    val = item.value;
                }
            });

            return val;
        }
        $scope.fillKeyValuePair = function (source, dest) {
            var obj = { value: source.id, label: source.name };
            dest.push(obj);
        }
        //**************************************** AttributeMap Logical flow through - End ***********************************
    }]);