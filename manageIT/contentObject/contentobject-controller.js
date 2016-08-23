
manageitModule.controller("contentObjectController", ['$scope', 'sharedScope', '$filter', 'contentObjectService', 'newSharedScope', '$routeParams', '$q', '$compile', 'sharedScope', 'attributeSetService', '$location', '$rootScope', '$timeout', 'textAttributeService', 'imageLibraryObjectService', 'documentLibraryObjectService',
function ($scope, sharedScope, $filter, contentObjectService, newSharedScope, $routeParams, $q, $compile, sharedScope, attributeSetService, $location, $rootScope, $timeout, textAttributeService, imageLibraryObjectService, documentLibraryObjectService) {
    $scope.navTitle = ($routeParams.subObjectId == null || $routeParams.subObjectId == 0) ? 'Content Object' : $routeParams.attributeScreenName + ' > Content Object';

    if ($rootScope.selectedType == 'ContentType') {
        $scope.contentObjectModelObjectReference = { contentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], contentTypeId: null, subObjectId: null };
    } else if ($rootScope.selectedType == 'Image') {
        $scope.contentObjectModelObjectReference = { imageObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], imageLibraryId: null, subObjectId: null };
    } else {
        $scope.contentObjectModelObjectReference = { documentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], documentLibraryId: null, subObjectId: null };
    }
    //$scope.contentObjectModelObjectReference = { contentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], contentTypeId: null, subObjectId: null };

    $scope.contentObjectReferenceCollection = [$scope.contentObjectModelObjectReference];
    if ($rootScope.selectedType == 'ContentType') {
        $scope.contentObjectModel = { contentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], copyAttributeCollection: [], contentTypeId: null, subObjectId: null, objectReferenceCollection: [$scope.contentObjectModelObjectReference] };
    } else if ($rootScope.selectedType == 'Image') {
        $scope.contentObjectModel = { imageObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], copyAttributeCollection: [], imageLibraryId: null, subObjectId: null, objectReferenceCollection: [$scope.contentObjectModelObjectReference] };
    } else {
        $scope.contentObjectModel = { documentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], copyAttributeCollection: [], documentLibraryId: null, subObjectId: null, objectReferenceCollection: [$scope.contentObjectModelObjectReference] };
    }
    //$scope.contentObjectModel = { contentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], copyAttributeCollection: [], contentTypeId: null, subObjectId: null, objectReferenceCollection: [$scope.contentObjectModelObjectReference] };
    $scope.attibuteValues = { id: null, name: null, identifier: null, type: null, value: [] };
    $scope.contentObjectFileDetails = { fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null };

    $scope.errorContentObjectdetails = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.errorImageLibraryObjectdetails = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.errorDocumentLibraryObjectdetails = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    //alert("attModel.isHide" + attModel.isHide);
    $scope.resetErrorDirective = function (attModel) {
        attModel.isError = false;
        attModel.isSuccess = false;
        attModel.isWarning = false;
        attModel.isInfo = false;
        attModel.messages = [];
        attModel.moreDetails = null;
        attModel.isHide = false;
    }
    $scope.messageModel = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.errormessageModel = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.errorAttribute = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.allAttributes = null;
    $scope.attributes = null;
    $scope.query = null;
    $scope.listAttributes = [];
    $scope.showDefault = true;

    $scope.contentObjectIdSave = null;

    // $scope.contentObjectAction = "add";

    if ($routeParams.ContentObjectId != 0 && $rootScope.saveFlag == true && $rootScope.selectedType) {
        //alert("yes");
        $scope.sublen = "";

        if ($rootScope.selectedType == "ContentType") {
            var getServiceCall = contentObjectService.getContentObject({ contentObjectId: $routeParams.ContentObjectId, controller: 'contentobject' });
            } else if ($rootScope.selectedType == "Image") {
                var getServiceCall = imageLibraryObjectService.getImageLibraryObject({ imageObjectId: $routeParams.ContentObjectId, controller: 'imageLibraryObject' });
            } else if ($rootScope.selectedType == "Document") {
                var getServiceCall = documentLibraryObjectService.getDocumentLibraryObject({ documentObjectId: $routeParams.ContentObjectId, controller: 'documentLibraryObject' });
            }

            getServiceCall.$promise.then(function (contentObjectdetails) {
                if (contentObjectdetails != null) {
                    //console.log(contentObjectdetails);
                    $scope.contentObjectRecords = contentObjectdetails;
                    if (contentObjectdetails.subObjAttrCollection.length) {
                        $scope.sublen = contentObjectdetails.subObjAttrCollection.length;
                    }
                    if (contentObjectdetails.attributeSetCollection.length) {
                        $scope.attrsetlen = contentObjectdetails.attributeSetCollection.length;
                    }
                }
                else {
                    $scope.contentObjectRecords = null;
                }
            });

        $scope.contentObjectAction = "view";

    }
    if ($routeParams.ContentObjectId != 0 && $scope.contentObjectAction == "edit") {
        $scope.contentObjectAction = "edit";
        $scope.editContentObject($routeParams.ContentObjectId);
    }
    $scope.contentObjectRecord = null;

    $scope.allObjectAttributes = null;
    $scope.objectattributes = null;
    $scope.objectlistAttributes = [];

    $scope.getAttributeSets = function () {
        //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        //alert($routeParams.contentTypeId);
        $scope.attributeSets = [];
        attributeSetService.allAttributeSetQuery({ domainId: $rootScope.domainIdUi, id: $routeParams.contentTypeId }).$promise.then(function (details) {
            if (details) {
                $scope.attributeSets = details;
            }
            //console.log("hi amm");
            //console.log($scope.attributeSets);
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
    $scope.getAttributeSets();
    $scope.searchTemplate = function () {
        if ($scope.query != null && $scope.query != "")
            contentObjectService.getTemplate({
                controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, name: $scope.query
            }).$promise.then(function (response) {
                if (response.$resolved == true) {
                    if (response.uploadedTemplateDetails != undefined && response.uploadedTemplateDetails != null) {
                        var htmlstr = $.grep(response.uploadedTemplateDetails, function (item, index) {
                            return (item.isActive == true);
                        });
                        if (htmlstr.length > 0) {
                            $scope.showDefault = false;
                            setTimeout(function () {
                                angular.element(document.getElementById('loadpage')).html($compile('<parent-attribute main-model="attributes" add-model="listAttributes">' + htmlstr[0].fileDetails + '</parent-attribute>')($scope));
                            }, 100);

                        }
                        else {
                            $scope.defaultAttributes();
                            $scope.showDefault = true;
                        }

                    }
                }
                else
                    $scope.showDefault = true;
            }, function (error) {
                if (error.data.errorMessage) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errors.push(value.message);
                        });
                    }
                    else {
                        $scope.errors.push("Error occured while fetching template. Please try after sometime.");
                    }
                }
            });

    };
    $scope.isCount = 0;
    $scope.defaultAttributes = function () {
        $scope.isCount += 1;


        //contentObjectService.getAllAttributesInContentType({ id: $routeParams.contentTypeId, controller: 'textattribute' }).$promise.then(function (details) {
        textAttributeService.getAllAttributesInLibrary({ domainId: $rootScope.domainIdUi, contentTypeId: $routeParams.contentTypeId, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (details) {
            //$scope.getDefineUniqueGroup();                
            //$scope.attributes = details;
            var contentTypeDefaultAttributes = [];
            var contentTypeAttributeSetAttributes = [];
            var subObjectDefaultAttributes = [];

            angular.forEach(details, function (value, key) {

                if (value.subObjectId == null || value.subObjectId == "0") {
                    if (value.attributeSetId == null || value.attributeSetId == "0") {
                        contentTypeDefaultAttributes.push(value);
                    }
                    else if (value.attributeSetId == $routeParams.attributeSetId) {
                        contentTypeAttributeSetAttributes.push(value);
                    }
                }
                else {
                    if (value.subObjectId == $routeParams.subObjectId)
                        subObjectDefaultAttributes.push(value);
                }

            });

            if ($routeParams.subObjectId == "0") {
                // if ($routeParams.attributeSetId == "0") {

                $scope.attributes = $scope.UpdateObjectforBusiness(contentTypeDefaultAttributes);
                $scope.attributes["attributeSets"] = [{ "attributes": [] }];
                setTimeout(function () {
                    if ($scope.attributeSets != undefined && $scope.attributeSets.length > 0)
                        $scope.attributes.attributeSets[0].attributes = $scope.UpdateObjectforBusiness($scope.attributeSets[0].attributes);
                }, 10);
            }
            else {
                $scope.attributes = subObjectDefaultAttributes;
            }
            if (details.length > 0)
                $scope.allAttributes = angular.copy($scope.attributes);
            //bind contentObject
            if ($routeParams.ContentObjectId != 0) {
                //$scope.defaultAttributes();
                $scope.contentObjectIdSave = $routeParams.ContentObjectId;
                $timeout(function () { $scope.getContentObject($routeParams.ContentObjectId); }, 100);
            }

        }, function (error) {
            if (error.data != null && error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.errors.push(value.message);
                });
            }
            else {
                $scope.errors.push("Error occured while fetching default attributes. Please try after sometime.");
            }

        });
    }



    $scope.UpdateObjectforBusiness = function (contentObject) {
        $.each(contentObject, function (index, attr) {
            if (attr.attributeType == "DateAttribute" || attr.attributeType == "DateTimeAttribute") {
                attr["selectedDate"] = null;
                //if(attr.MinDateTimeValues[0].Date)
                // attr["selectedDate"] = attr.minDateTimeValues.date;
                attr["placeHolder"] = $scope.getDateformat(parseInt(attr.dateFormat));
                attr["dateOptions"] = {
                    // dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: $scope.getDefaultDateTime(attr.maximumDateTime, attr.maxDateTimeValues),
                    minDate: $scope.getDefaultDateTime(attr.minimumDateTime, attr.minDateTimeValues),
                    startingDay: 1
                };
                attr["defaultValues"] = [];
                attr["datePickerControl1"] = $scope.datePickerControl1;
                attr["selectedTime"] = null;

            } else if (attr.attributeType == "TimeAttribute") {
                attr["selectedTime"] = null;
            }
            else if (attr.attributeType == "ImageReferenceAttribute") {
                var isDefaultAny = $.grep(attr.imageRoles, function (item, index) {
                    return item.isDefault == true;
                });
                if (isDefaultAny.length > 0)
                    attr["imageRoles"].unshift({ isDefault: false, roleId: 0, roleName: 'All Images' });
                else
                    attr["imageRoles"].unshift({ isDefault: true, roleId: 0, roleName: 'All Images' });
                attr["addedImages"] = [];
            }
            else if (attr.attributeType == "DocumentReferenceAttribute") {
                var isDefaultAny = $.grep(attr.documentRoles, function (item, index) {
                    return item.isDefault == true;
                });
                if (isDefaultAny.length > 0)
                    attr["documentRoles"].unshift({ isDefault: false, roleId: 0, roleName: 'All Documents' });
                else
                    attr["documentRoles"].unshift({ isDefault: true, roleId: 0, roleName: 'All Documents' });
                attr["addedDocuments"] = [];
            }
                //else if (attr.attributeType == "SubObjectAttribute")
                //    attr["addedSubObjects"] = [];
            else if (attr.attributeType == "ListAttribute") {
                attr["listItem"] = [];
                attr["selectedItem"] = [];
                attr["selectedlistItem"] = [];
                attr["listsettings"] = $scope.listsettings;
                attr["defaultValues"] = [];
            }
            else if (attr.attributeType == "YesNoAttribute") {
                attr["defaultValues"] = [];
                attr["listsettings"] = $scope.listsettings;
            }

            else if (attr.attributeType == "ObjectReferenceAttribute") {
                angular.forEach(attr.acceptedContentTypes, function (v, k) {
                    $scope.getObjectReferences(v.id, attr);
                });

            }
            else if (attr.attributeType == "SequenceAttribute") {
                attr["defaultValues"] = [];
                attr["sequenceMaster"] = null;
            }
            else {
                //var value = $scope.populateContentObject(attr.attributeId);
                //if (value != null)
                //    attr["defaultValues"] = [{ value: value }];
                //else
                attr["defaultValues"] = [];
            }


        });
        return contentObject;
    };


    $scope.getObjectReferences = function (contentTypeId, attr) {

        if ($rootScope.selectedType == "ContentType") {
            var getRefServiceCall = contentObjectService.GetContentObjectReference({ contentTypeId: contentTypeId, controller: 'contentobject' });
        } else if ($rootScope.selectedType == "Image") {
            var getRefServiceCall = imageLibraryObjectService.getImageObjectReference({ imageObjectId: contentTypeId, controller: 'imageLibraryObject' });
        } else if ($rootScope.selectedType == "Document") {
            var getRefServiceCall = documentLibraryObjectService.getDocumentObjectReference({ documentObjectId: contentTypeId, controller: 'documentLibraryObject' });

        }

        getRefServiceCall.$promise.then(function (contentORefdetails) {
            if (contentORefdetails != null) {
                $scope.contentObjectReferenceCollection = contentORefdetails;
                //$scope.contentObjectIdSave = $routeParams.ContentObjectId;
                angular.forEach($scope.contentObjectReferenceCollection, function (k, v) {
                    k["isSelected"] = false;
                }
                );

                attr["objectReferenceCollection"] = $scope.contentObjectReferenceCollection;
            }
        });

    }


    $scope.getContentObjectByContentTypeId = function () {
        $scope.contentObjectCollection = null;
        //contentObjectService.GetContentObjectReference({ domainId: $rootScope.domainIdUi , contentTypeId: contentTypeId, controller: 'contentobject' }).$promise.then(function (contentORefdetails) {
        contentObjectService.GetContentObjectReference({ contentTypeId: $routeParams.contentTypeId, controller: 'contentobject' }).$promise.then(function (contentObjdetails) {
            if (contentObjdetails != null) {
                $scope.contentObjectCollection = contentObjdetails;
            }
        });
    }
    $scope.defaultObjectAttributes = function (contentTypeId) {
        //contentObjectService.getAllAttributesInContentType({ id: $routeParams.contentTypeId, controller: 'textattribute' }).$promise.then(function (details) {
        textAttributeService.getAllAttributesInLibrary({ domainId: $rootScope.domainIdUi, contentTypeId: $routeParams.contentTypeId, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (details) {
        
            //$scope.getDefineUniqueGroup();                
            //$scope.attributes = details;
            var contentTypeDefaultAttributes = [];
            var contentTypeAttributeSetAttributes = [];
            var subObjectDefaultAttributes = [];
            if (details.length > 0)
                $scope.allObjectAttributes = details;
            angular.forEach(details, function (value, key) {

                if (value.subObjectId == null || value.subObjectId == "0") {
                    if (value.attributeSetId == null || value.attributeSetId == "0") {
                        contentTypeDefaultAttributes.push(value);
                    }
                    else if (value.attributeSetId == $routeParams.attributeSetId) {
                        contentTypeAttributeSetAttributes.push(value);
                    }
                }
                else {
                    if (value.subObjectId == $routeParams.subObjectId)
                        subObjectDefaultAttributes.push(value);
                }

            });

            if ($routeParams.subObjectId == "0") {
                // if ($routeParams.attributeSetId == "0") {

                $scope.objectattributes = $scope.UpdateObjectforBusiness(contentTypeDefaultAttributes);
                $scope.objectattributes["attributeSets"] = [{ "attributes": [] }];
                setTimeout(function () {
                    $scope.objectattributes.attributeSets[0].attributes = $scope.UpdateObjectforBusiness($scope.objectattributes.attributeSets.attributes);
                }, 10);
            }
            else {
                $scope.objectattributes = subObjectDefaultAttributes;
            }
            $scope.attributes["objectattributes"] = $scope.objectattributes;

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


    $scope.datePickerControl1 = {
        minOpened: false,
        maxOpened: false,
        defaultOpened: false
    };
    $scope.datePickerControl2 = {
        minOpened: false,
        maxOpened: false,
        defaultOpened: false
    };
    $scope.openDateCalendar1 = function (scope, pickerId) {
        if (pickerId == 1) {
            scope.datePickerControl1.maxOpened = true;
        }
        else if (pickerId == 2) {
            scope.datePickerControl1.defaultOpened = true;
        }
        else {
            scope.datePickerControl1.minOpened = true;
        }
    }
    $scope.openDateCalendar2 = function (pickerId) {
        if (pickerId == 1) {
            $scope.datePickerControl2.maxOpened = true;
        }
        else if (pickerId == 2) {
            $scope.datePickerControl2.defaultOpened = true;
        }
        else {
            $scope.datePickerControl2.minOpened = true;
        }
    }

    //Text------------------
    $scope.jsonListfromObject = function (option, scopeName) {
        var strl = '[';
        var IDVal = ID();
        switch (option.attributeType) {
            case "ListAttribute":
                $.each(option.listValues, function (key, value) {
                    IDVal += '_' + key;
                    strl += '{"label":"' + value + '", "id":"' + value + '"},';
                });
                strl = strl.replace(/(^,)|(,$)/g, "");
                strl += ']';
                option.listItem = JSON.parse(strl);
                option.selectedItem = [];
                if (option.defaultSelection != null && option.defaultSelection != "") {
                    var selectItem = $.grep(option.listItem, function (item, index) {
                        return item.id == option.defaultSelection[0];
                    });
                    if (selectItem.length > 0) {
                        if (option.displayInputType == 3)
                            option.selectedItem.push(angular.copy(selectItem[0]));
                        else
                            option.selectedItem.push(angular.copy(selectItem[0]));
                    }

                }
                var defaultItem = { listItem: option.listItem, selectedItem: option.selectedItem, listsettings: option.listsettings, displayInputType: option.displayInputType, listType: option.listType }
                $scope.setDefaultValue(option, defaultItem)
                break;
            case "YesNoAttribute":
                //for(var i=0;i<2;i++)
                /// {
                strl += '{"label":"' + option.yesValue + '", "id":"' + option.yesValue + '"},';
                strl += '{"label":"' + option.noValue + '", "id":"' + option.noValue + '"},';
                // }
                strl = strl.replace(/(^,)|(,$)/g, "");
                strl += ']';
                option.listItem = JSON.parse(strl);
                option.selectedItem = [];
                //var selItem = [];
                if (option.defaultValue == 1)
                    //selItem.push(option.yesValue)
                    option.selectedItem.push(angular.copy(option.listItem[0]));
                else if (option.defaultValue == 2)
                    //selItem.push(option.noValue)
                    option.selectedItem.push(angular.copy(option.listItem[1]));
                //else
                //    selItem = [];
                //option.selectedItem = selItem;
                var defaultItem = { listItem: option.listItem, selectedItem: option.selectedItem, listsettings: option.listsettings, displayInputType: option.displayInputType, listType: option.listType }
                $scope.setDefaultValue(option, defaultItem)
                break;

        }
        $scope.moveItem = function (item, from, to) {
            var idx = from.indexOf(item);
            if (idx != -1) {
                from.splice(idx, 1);
                to.push(item);
            }
        };
        /*
        displayInputType=1 Checkbox
        displayInputType=2 Radiobutton
        displayInputType=3 AutoComplete
        */
        if (option.listType == 0 || option.attributeType == "YesNoAttribute") {
            option.listsettings.selectionLimit = 1;
        }
        else
            option.listsettings.selectionLimit = 0;
        option.listsettings.readOnly = option.readOnly;
    };
    $scope.setDefaultValue = function (valueList, defaultvalue, isSubObject) {

        //if ($routeParams.ContentObjectId == null || $routeParams.ContentObjectId == 0 || $routeParams.ContentObjectId == undefined) {
        if (typeof (isSubObject) === 'undefined') isSubObject = false;
        if (valueList.attributeType == "SequenceAttribute") {
            //contentObjectService.getSequenceById({ domainId: $rootScope.domainIdUi, id: valueList.sequenceGenerator }).$promise.then(function (sequencedetails) {
            contentObjectService.getSequenceById({ id: valueList.sequenceGenerator }).$promise.then(function (sequencedetails) {
                if (sequencedetails != null) {
                    valueList.sequenceMaster = sequencedetails;
                }
                else {
                    $scope.contentObjectRecords = null;
                }
            });
        }
        var timeout = 0;
        if (isSubObject == true)
            timeout = 100;

        setTimeout(function () {
            var defaultval = { id: "", value: defaultvalue };
            valueList.defaultValues.push(defaultval);
            if (valueList.multipleValues.allowMultipleValues == true)
                $scope.addMultipleValues(valueList.multipleValues.minimumValue, valueList.multipleValues.maximumValue, valueList);
        }, timeout);

        //}
    };
    $scope.getSubObjects = function (option) {
        var contentTypeDefaultAttributes = [];
        var contentTypeAttributeSetAttributes = [];
        var subObjectDefaultAttributes = [];
        var details = [];
        if ($scope.allAttributes != null && $scope.allAttributes.length > 0) {
            details = $scope.allAttributes;
            angular.forEach(details, function (value, key) {
                if (value.subObjectId == option.subObjectType)
                    subObjectDefaultAttributes.push(value);

            });
        }
        option.defaultValues = $scope.UpdateObjectforBusiness(angular.copy(subObjectDefaultAttributes));

    };
    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    $scope.addMultipleValues = function (minValue, maxValue, option) {
        if (minValue == null || minValue == 0)
            minValue = 1;
        if (maxValue == null)
            maxValue = option.maximumValue;
        if (maxValue == null || maxValue == 0)
            maxValue = 999;
        var minCount = minValue;

        if (option.initDefaultValue == undefined) {
            var defaultVal = option.defaultValues;
            var defaultVal = jQuery.extend(true, {}, option.defaultValues);
            if (option.attributeType == 'SubObjectAttribute') {
                var subdefaultVal = [];
                $.each(defaultVal, function (index, ele) {
                    subdefaultVal.push(angular.copy(ele))
                });
                option["initDefaultValue"] = subdefaultVal;
            }
            else
                option["initDefaultValue"] = defaultVal;
            option["itemCount"] = 1;
            for (var i = 0; i < minValue - 1; i++) {
                $.each(option.initDefaultValue, function (index, ele) {
                    option.defaultValues.push(angular.copy(ele))
                });
            }
        }
        else {
            var totalel = option.itemCount + minCount + 1;
            // var totalel = option.defaultValues.length;
            if (totalel <= (maxValue + 1)) {
                $.each(option.initDefaultValue, function (index, ele) {
                    option.defaultValues.push(angular.copy(ele))
                });
                option.itemCount += 1;
            }
            else
                return;
        }
    };
    $scope.setSelectedItem = function (roles, selectedrole) {
        _.each(roles, function (item) { item.isDefault = false; });
        selectedrole.isDefault = true;
    };
    //Text=------

    $scope.example2settings = {
        displayProp: 'id'
    };
    $scope.listType = [];

    $scope.UpdateValue = function (model) {

    };
    $scope.setDefaultDateTime = function (defaultDateId, defaultDateValue, elmodel) {
        var today = new Date();
        if (defaultDateId == 2) {
            var latestdate = today.setDate(today.getDate() + defaultDateValue.timeOffset);
            elmodel.selectedDate = new Date(today);
        } else if (defaultDateId == 0) {
            elmodel.selectedDate = new Date(defaultDateValue.date);
        }
        else
            elmodel.selectedDate = null;
        var defaultItem = { selectedDate: elmodel.selectedDate, dateOptions: elmodel.dateOptions, placeHolder: elmodel.placeHolder, datePickerControl1: elmodel.datePickerControl1 }
        $scope.setDefaultValue(elmodel, defaultItem)

    };
    $scope.getDefaultDateTime = function (defaultDateId, defaultDateValue) {
        var today = new Date();
        if (defaultDateId == 2) {
            var latestdate = today.setDate(today.getDate() + defaultDateValue.timeOffset);
            return new Date(today);
        } else if (defaultDateId == 0) {
            return new Date(defaultDateValue.date);
        }
        else
            return null;

    };
    $scope.createDynamicmodel = function (variableName, defaultValue, isArray) {
        if (isArray)
            $scope[variableName] = [];
        else
            $scope[variableName] = "";
    };

    $scope.getdynamicModel = function (value) {
        $scope['listItem_' + $scope.IDVal] = value;
        return 'listItem_' + $scope.IDVal;
    };

    $scope.listsettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: false,
        selectionLimit: 1,
        showCheckAll: false,
        showUncheckAll: false
        , smartButtonMaxItems: 2
        , readOnly: false
    }

    $scope.addMediaAttr = function (option, type) {
        if (type == 'ImageReferenceAttribute') {
            var selectedImage = { imageRoles: [], selectedRole: null, fileContent: null };
            option.addedImages.push(selectedImage);
        }
        else if (type == 'DocumentReferenceAttribute') {
            var selectedDoc = { documentRoles: [], selectedDocument: null, fileContent: null, docIcon: "../../../images/icon-word.png", fileName: null, folderPath: null };
            option.addedDocuments.push(selectedDoc);
        }
    };
    $scope.fileType = function (file) {
        var validExts = new Array(".doc", ".docx", ".pdf");
        var fileExt = file.value;
        var fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        if (validExts.indexOf(fileExt) < 0) {
            alert("Invalid fileType selected,  valid files are of " +
               validExts.toString() + " types.");
            return false;
        }
        else {
            if (fileExt == ".doc" || fileExt == ".docx")
                $scope.docIconTypeName = "icon-word.png";
            else if (fileExt == ".pdf")
                $scope.docIconTypeName = "icon-pdf.png";
            return true;
        }
    };
    $scope.moveUp = function (index, option) {
        if (index <= 0 || index >= option.defaultValues.length)
            return;
        var temp = option.defaultValues[index];
        option.defaultValues[index] = option.defaultValues[index - 1];
        option.defaultValues[index - 1] = temp;
    };
    $scope.moveDown = function (index, option) {
        if (index < 0 || index >= (option.defaultValues.length - 1))
            return;
        var temp = option.defaultValues[index];
        option.defaultValues[index] = option.defaultValues[index + 1];
        option.defaultValues[index + 1] = temp;
    };
    $scope.removeItem = function (index, option) {
        if (index = 0) return;
        switch (option.attributeType) {
            case "ImageReferenceAttribute":
                option.addedImages.splice(index, 1);
                break;
            case "DocumentReferenceAttribute":
                option.addedDocuments.splice(index, 1);
                break;
            default:
                option.defaultValues.splice(index, 1);
                option.itemCount -= 1;
                break;
        };

    };
    $scope.downloadItem = function (item) {
        var url = item.fileContent.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        window.open(url);
    };
    $scope.decimalDisplaySymbol = function (val) {
        if (val == 1)
            return "$";
        else if (val == 2)
            return "%"
        else
            return "";
    };
    $scope.getDateformat = function (defaultDateTime) {
        if (defaultDateTime == 0)
            return 'dd/MM/yyyy';
        else if (defaultDateTime == 1)
            return 'MM/dd/yyyy';
        else
            return 'yyyy-MM-dd'
    };
    $scope.dateFormatDefaultValues = [
                {
                    key: 0, value: "dd/mm/yyyy", pattern: '^((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]{1}))\\/(0?[1-9]|1[0-2])\\/([0-9]{4})$' //dd/mm/yyyy /^([0-2]|0[0-9]|1[0-9]|2[0-3])/?[0-5][0-9]/?[0-5][0-9][0-5][0-9]$/
                },
                {
                    key: 1, value: "mm/dd/yyyy", pattern: '^(0?[1-9]|1[0-2])\\/((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]{1}))\\/([0-9]{4})$' //mm/dd/yyyy
                },
                {
                    key: 2, value: "yyyy-mm-dd", pattern: '^(\\d{4})(-)(0?[1-9]|1[0-2])(-)((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]))$' //yyyy-mm-dd (([1]{1}[9]{1}[9]{1}\\d{1})|([1-9]{1}\\d{3}))
                }
    ];
    $scope.timeFormatDefaultValues = [
        {
            key: 0, value: "14:00", pattern: '^(0?[0-9]|1[0-9]|2[0-3])\:([0-5][0-9])$', placeHolder: 'hh:mm'
        },
        {
            key: 1, value: "14:00:00", pattern: '^(0?[0-9]|1[0-9]|2[0-3])\:([0-5][0-9]):([0-5][0-9])$', placeHolder: 'hh:mm:ss'
        },
        {
            key: 2, value: "2:00 pm", pattern: '^(0?[0-9]|1[0-2])\:([0-5][0-9]) [APap][mM]$', placeHolder: 'hh:mm am'
        },
        {
            key: 3, value: "2:00:00 pm", pattern: '^(0?[0-9]|1[0-2])\:([0-5][0-9]):([0-5][0-9]) [APap][mM]$', placeHolder: 'hh:mm:ss am'
        }
    ];


    $scope.getContentObject = function (contentObjectId) {
        if (contentObjectId != null) {
            if ($rootScope.selectedType == "ContentType") {
                var getObjServiceCall = contentObjectService.getContentObject({ contentObjectId: contentObjectId, controller: 'contentobject' });
            } else if ($rootScope.selectedType == "Image") {
                var getObjServiceCall = imageLibraryObjectService.getImageLibraryObject({ imageObjectId: contentObjectId, controller: 'imageLibraryObject' });
            } else if ($rootScope.selectedType == "Document") {
                var getObjServiceCall = documentLibraryObjectService.getDocumentLibraryObject({ documentObjectId: contentObjectId, controller: 'documentLibraryObject' });
            }
            getObjServiceCall.$promise.then(function (contentObjectdetails) {
                if (contentObjectdetails != null) {
                    $scope.contentObjectRecord = contentObjectdetails;
                    var attributeCollection = contentObjectdetails.attributeCollection;
                    var subObjAttrCollection = contentObjectdetails.subObjAttrCollection;
                    var attributeSetCollection = contentObjectdetails.attributeSetCollection;
                    $scope.contentObjectFileDetails = contentObjectdetails.fileDetails;
                    var copyAttributeCollection = contentObjectdetails.copyAttributeCollection;

                    var attributeModel = $scope.attributes;
                    //$scope.populateContentObject(attributeCollection, attributeModel);
                    console.log("getContentObject");
                    console.log(attributeModel);
                    var defaultattrModel = $.grep(attributeModel, function (item, index) {
                        return item.attributeType != 'SubObjectAttribute';
                    });

                    $scope.populateContentObject(attributeCollection, defaultattrModel);

                    angular.forEach(attributeModel, function (attrmodel, index) {
                        if (attrmodel.attributeType == 'SubObjectAttribute')
                            $scope.populateSubObjectContentObject(subObjAttrCollection, attrmodel);
                    });


                    $scope.populateContentObject(attributeSetCollection, attributeModel.attributeSets[0].attributes);

                    angular.forEach(attributeModel, function (attrmodel, index) {
                        if (attrmodel.attributeType == 'CopyAttribute')
                            $scope.populateCopyContentObject(copyAttributeCollection, attrmodel);
                    });
                    //var subobjectModel = $.grep(attributeModel, function (item, index) {
                    //    return item.attributeType == 'SubObjectAttribute';                    });

                    //$.each(attributeCollection,function(index, item){
                    //    $scope.bindFormfromModel(subobjectModel,item,item.type)
                    //});
                }
                else
                    $scope.contentObjectRecord = null;
            });
        }
    }

    $scope.populateCopyContentObject = function (attributeCollection, attributeModel) {
        console.log("pop");
        console.log(attributeCollection);
        console.log(attributeModel);
        $.each(attributeCollection, function (index, attritem) {
            var item = $.grep(attributeModel, function (atrrModel, indx) {
                return atrrModel.attributeId == attritem.id;
            });
            
            item = item[0];
           // alert("item");
            console.log("item");
            console.log(item);
            //  $.each(attributeModel,function(innerIdx,attr){
            if (item != null && item != undefined) {
                if (attritem.type == item.attributeType && attritem.type == 'CopyAttribute') {
                    alert("in cattr");
                    console.log(attritem);
                    for (var i = 0; i < attritem.value.length; i++) {
                        var selectItem = { defaultValue: attritem.value[i] };
                        item.copyFieldDetails.push(selectItem);
                    }
                }
               
            }

            // });


        });
    }

    $scope.populateContentObject = function (attributeCollection, attributeModel) {
        $.each(attributeCollection, function (index, attritem) {
            var item = $.grep(attributeModel, function (atrrModel, indx) {
                return atrrModel.attributeId == attritem.id;
            });
            item = item[0];
            //  $.each(attributeModel,function(innerIdx,attr){
            if (item != null && item != undefined) {
                if (attritem.type == item.attributeType && (attritem.type == 'ListAttribute' || attritem.type == 'YesNoAttribute')) {
                    if (attritem.value.length == 1) {
                        //listItem
                        var selectItem = $.grep(item.listItem, function (item2, index) {
                            return item2.id == attritem.value;
                        });
                        if (selectItem.length > 0) {
                            if (item.displayInputType == 3)
                                item.selectedItem.push(angular.copy(selectItem[0]));
                            else
                                item.selectedItem.push(angular.copy(selectItem[0]));
                        }
                        // item.selectedItem["id"] = attritem.value;

                    } else {
                        item.selectedItem = [];
                        for (var i = 0; i < attritem.value.length; i++) {
                            var selectItem = { id: attritem.value[i] };
                            item.selectedattritem.push(selectItem);
                        }
                    }
                }
                else if (attritem.type == item.attributeType && (attritem.type == 'DateAttribute' || attritem.type == 'DateTimeAttribute')) {
                    item.selectedDate = attritem.value[0];
                }
                else if (attritem.type == item.attributeType && attritem.type == 'TimeAttribute') {
                    //attributeValues.value.push(item.selectedTime)
                    item.selectedTime = attritem.value[0];
                }
                else if (attritem.type == item.attributeType && attritem.type == 'CopyAttribute') {
                    for (var i = 0; i < attritem.value.length; i++) {
                        var selectItem = { defaultValue: attritem.value[i] };
                        item.copyFieldDetails.push(selectItem);
                    }
                }
                else if (attritem.type == item.attributeType && attritem.type == 'ImageReferenceAttribute') {
                    // var contentObjectFileDetails = { fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null, gfsId: null };
                    //contentObjectFileDetails.fileId = item.attributeId;
                    //if (attritem.value.length == 1)
                    //    item.addedImages.fileContent = attritem.fileDetails[0];
                    //else {
                    item.addedImages = [];
                    for (var i = 0; i < $scope.contentObjectFileDetails.length; i++) {
                        if ($scope.contentObjectFileDetails[i].fileId == item.attributeId)
                            item.addedImages.push($scope.contentObjectFileDetails[i]);
                    }
                    // }

                }
                else {
                    item.defaultValues = [];
                    for (var i = 0; i < attritem.value.length; i++) {
                        var selectItem = { id: null, value: attritem.value[i] };
                        item.defaultValues.push(selectItem);
                    }
                    //if (attritem.value.length == 1)
                    //    item.defaultValue = attritem.value;
                    //else {
                    //    item.defaultValues = [];
                    //    for (var i = 0; i < attritem.value.length; i++) {
                    //        var selectItem = { id: null, value: attritem.value[i] };
                    //        item.defaultValues.push(selectItem);
                    //    }
                    //}
                }
            }

            // });


        });

    }



    $scope.populateSubObjectContentObject = function (attributeCollection, attributeModel) {

        $.each(attributeCollection, function (index, attritem) {
            var item = $.grep(attributeModel.defaultValues, function (atrrModel, indx) {
                return atrrModel.attributeId == attritem.id && attributeModel.attributeId == attritem.subObjectId;
            });
            item = item[0];
            //  $.each(attributeModel,function(innerIdx,attr){
            if (item != null && item != undefined) {
                if (attritem.type == item.attributeType && (attritem.type == 'ListAttribute' || attritem.type == 'YesNoAttribute')) {
                    //if (attritem.value.length == 1)
                    //    item.selectedItem["id"] = attritem.value;
                    //else {
                    //    item.selectedItem = [];
                    //    for (var i = 0; i < attritem.value.length; i++) {
                    //        var selectItem = { id: attritem.value[i] };
                    //        item.selectedattritem.push(selectItem);
                    //    }
                    //}

                    //
                    if (attritem.value.length == 1) {
                        //listItem
                        var selectItem = $.grep(item.listItem, function (item2, index) {
                            return item2.id == attritem.value;
                        });
                        if (selectItem.length > 0) {
                            if (item.displayInputType == 3)
                                item.selectedItem.push(angular.copy(selectItem[0]));
                            else
                                item.selectedItem.push(angular.copy(selectItem[0]));
                        }
                        // item.selectedItem["id"] = attritem.value;

                    } else {
                        item.selectedItem = [];
                        for (var i = 0; i < attritem.value.length; i++) {
                            var selectItem = { id: attritem.value[i] };
                            item.selectedattritem.push(selectItem);
                        }
                    }
                }
                else if (attritem.type == item.attributeType && (attritem.type == 'DateAttribute' || attritem.type == 'DateTimeAttribute')) {
                    item.selectedDate = attritem.value[0];
                }
                else if (attritem.type == item.attributeType && attritem.type == 'TimeAttribute') {
                    //attributeValues.value.push(item.selectedTime)
                    item.selectedTime = attritem.value[0];
                }
                else if (attritem.type == item.attributeType && attritem.type == 'CopyAttribute') {
                    for (var i = 0; i < attritem.value.length; i++) {
                        var selectItem = { defaultValue: attritem.value[i] };
                        item.copyFieldDetails.push(selectItem);
                    }
                }
                else if (attritem.type == item.attributeType && attritem.type == 'ImageReferenceAttribute') {
                    var contentObjectFileDetails = { fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null, gfsId: null };
                    contentObjectFileDetails.fileId = item.attributeId;
                    if (attritem.value.length == 1)
                        item.addedImages.fileContent = attritem.fileDetails[0];
                    else {
                        item.item.addedImages = [];
                        for (var i = 0; i < attritem.fileDetails.length; i++) {
                            item.addedImages.push(fileDetails[i]);
                        }
                    }

                }
                else {
                    item.defaultValues = [];
                    for (var i = 0; i < attritem.value.length; i++) {
                        var selectItem = { id: null, value: attritem.value[i] };
                        item.defaultValues.push(selectItem);
                    }
                    //if (attritem.value.length == 1)
                    //    item.defaultValue = attritem.value;
                    //else {
                    //    item.defaultValues = [];
                    //    for (var i = 0; i < attritem.value.length; i++) {
                    //        var selectItem = { id: null, value: attritem.value[i] };
                    //        item.defaultValues.push(selectItem);
                    //    }
                    //}
                }
            }

            // });


        });

    }

    $scope.saveContentObject = function (attributeModel, isCheckedIn) {
        isCheckedIn = isCheckedIn == undefined ? 0 : isCheckedIn;

        if ($rootScope.selectedType == "ContentType") {
            var getobjServiceCall = contentObjectService.GetContentObjectReference({contentTypeId: $routeParams.contentTypeId, controller: 'contentobject' })
        } else if ($rootScope.selectedType == "Image") {
            var getobjServiceCall = imageLibraryObjectService.getImageObjectReference({ imageLibraryId: $routeParams.contentTypeId, controller: 'imageLibraryObject' });
        } else if ($rootScope.selectedType == "Document") {
            var getobjServiceCall = documentLibraryObjectService.getDocumentObjectReference({ documentLibraryId: $routeParams.contentTypeId, controller: 'documentLibraryObject' });
        }
        getobjServiceCall.$promise.then(function (contentObjdetails) {
            if (contentObjdetails != null) {
                $scope.contentObjectCollection = contentObjdetails;

                if ($scope.validateContentObject(attributeModel, $scope.errorContentObjectdetails)) {
                    $scope.contentObjectModel.attributeCollection = [];

                    var defaultattrModel = $.grep(attributeModel, function (item, index) {
                        return item.attributeType != 'SubObjectAttribute' && item.attributeType != 'CopyAttribute';
                    });
                    $scope.bindModelfromForm(defaultattrModel);

                    var copyattrModel = $.grep(attributeModel, function (item, index) {
                        return item.attributeType == 'CopyAttribute';
                    });
                    $scope.bindModelfromForm(copyattrModel, 4);

                    var subobjectModel = $.grep(attributeModel, function (item, index) {
                        return item.attributeType == 'SubObjectAttribute' && item.attributeType != 'CopyAttribute';
                    });
                    if (subobjectModel != null && subobjectModel != undefined) {
                        $.each(subobjectModel, function (index, item) {
                            $scope.bindModelfromForm(item, 2);
                        });
                    }

                    

                    var attrSetModel = $.grep(attributeModel.attributeSets[0].attributes, function (item, index) {
                        return item.attributeType == 'AttributeSet' && item.attributeType != 'CopyAttribute';
                    });
                    $scope.bindModelfromForm(attrSetModel.attributes, 3);

                    var copyattrSetModel = $.grep(attributeModel.attributeSets[0].attributes, function (item, index) {
                        return item.attributeType == 'CopyAttribute';
                    });
                    if (attributeModel.attributeSets[0].attributes.length > 0) {
                    $scope.bindModelfromForm(copyattrSetModel, 4, attributeModel.attributeSets[0].attributes[0].attributeSetId);
                }
                    var newContentObject = new contentObjectService();
                    //$scope.contentObjectModel = { contentObjectId: null, name: null, attributeCollection: [], fileDetails: [], contentTypeId: null, subObjectId: null };
                    //newContentObject.contentTypeId = $routeParams.contentTypeId;
                    if ($rootScope.selectedType == "ContentType") {
                        newContentObject.contentTypeId = $routeParams.contentTypeId;
                        var serviceCall = contentObjectService.create({ controller: 'contentObject' }, newContentObject);
                    } else if ($rootScope.selectedType == "Image") {
                        newContentObject.imageLibraryId = $routeParams.contentTypeId;
                        var serviceCall = imageLibraryObjectService.create({ controller: 'imageLibraryObject' }, newContentObject);
                    } else if ($rootScope.selectedType == "Document") {
                        newContentObject.documentLibraryId = $routeParams.contentTypeId;
                        var serviceCall = documentLibraryObjectService.create({ controller: 'documentLibraryObject' }, newContentObject);
                    }
                    newContentObject.subObjectId = $routeParams.subObjectId;
                    newContentObject.attributeCollection = $scope.contentObjectModel.attributeCollection;
                    newContentObject.subObjAttrCollection = $scope.contentObjectModel.subObjAttrCollection;
                    newContentObject.attributeSetCollection = $scope.contentObjectModel.attributeSetCollection;
                    newContentObject.fileDetails = $scope.contentObjectModel.fileDetails;
                    newContentObject.copyAttributeCollection = $scope.contentObjectModel.copyAttributeCollection;
                    //newContentObject.name = 'xyz';
                    newContentObject.isCheckedIn = isCheckedIn;

                    
                    serviceCall.$promise.then(function (response) {
                    //contentObjectService.create({ controller: 'contentObject' }, newContentObject).$promise.then(function (response) {
                        if (response.$resolved == true) {
                            if ($rootScope.selectedType == "ContentType") {
                            $scope.errorContentObjectdetails.isError = false;
                            $scope.errorContentObjectdetails.messages.push("Content Object saved successfully");
                            $scope.errorContentObjectdetails.isSuccess = true;
                            $scope.errorContentObjectdetails.isHide = false;
                            $scope.contentObjectModel = { contentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], contentTypeId: null, subObjectId: null };
                            } else if ($rootScope.selectedType == "Image") {
                                $scope.errorContentObjectdetails.isError = false;
                                $scope.errorContentObjectdetails.messages.push("Image Library Object saved successfully");
                                $scope.errorContentObjectdetails.isSuccess = true;
                                $scope.errorContentObjectdetails.isHide = false;
                                $scope.contentObjectModel = { imageObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], imageLibraryId: null, subObjectId: null };
                            } else if ($rootScope.selectedType == "Document") {
                                $scope.errorContentObjectdetails.isError = false;
                                $scope.errorContentObjectdetails.messages.push("Document Library Object saved successfully");
                                $scope.errorContentObjectdetails.isSuccess = true;
                                $scope.errorContentObjectdetails.isHide = false;
                                $scope.contentObjectModel = { documentObjectId: null, name: null, attributeCollection: [], fileDetails: [], subObjAttrCollection: [], attributeSetCollection: [], documentLibraryId: null, subObjectId: null };
                            }
                            $scope.defaultAttributes();
                            //get last inserted id and save it under rootscope
                            if ($rootScope.viewPermissionCO || $rootScope.isAdmin) {
                                if ($rootScope.selectedType == "ContentType") {
                                    $rootScope.singleContentObjectId = response.contentObjectId;
                                } else if ($rootScope.selectedType == "Image") {
                                    $rootScope.singleContentObjectId = response.imageObjectId;
                                } else if ($rootScope.selectedType == "Document") {
                                    $rootScope.singleContentObjectId = response.documentObjectId;
                                }
                                //$rootScope.singleContentObjectId = response.contentObjectId; //"579754f9d4b7890f2037a9ac";
                                if ($rootScope.singleContentObjectId) {
                                    $rootScope.saveFlag = true;
                                    $rootScope.serviceFlag = 'view';
                                    $rootScope.checkinFlag = false;
                                    if ($('.configClassCheck').hasClass('active')) {
                                        $('.configClassCheck').removeClass('active');
                                        //} else if ($('.searchClassCheck').hasClass('active')) {
                                        //    $('.searchClassCheck').removeClass('active');
                                        //} else if ($('.listClassCheck').hasClass('active')) {
                                        //    $('.listClassCheck').removeClass('active');
                                        //} else if ($('.browseClassCheck').hasClass('active')) {
                                        //    $('.browseClassCheck').removeClass('active');
                                    }
                                    $timeout(function () {
                                        $('.addTab').removeClass('active');
                                        $rootScope.viewTab = "active";
                                        $rootScope.editTab = "";
                                        $rootScope.addTab = "";
                                        $location.path("/ManageIT/ContentObject/" + $routeParams.attributeScreenName + "/" + $rootScope.selectedType + "/" + $routeParams.contentTypeId + "/SubObject/" + $routeParams.subObjectId + "/ContentObject/" + $rootScope.singleContentObjectId + "/view");
                                    }, 1000);
                                    return false;
                                }
                            }
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {

                                $scope.errorContentObjectdetails.messages.push(value.message);
                                $scope.errorContentObjectdetails.messages.moreDetails = value.moreDetails;
                                $scope.errorContentObjectdetails.isSuccess = false;
                                $scope.errorContentObjectdetails.isError = true;
                                $scope.errorContentObjectdetails.isHide = true;

                            });
                        }
                    });

                }
            }
        });



    };

    $scope.ClickMe = function () {
        $scope.getContentObject($rootScope.singleContentObjectId);
        $scope.contentObjectIdSave = $rootScope.singleContentObjectId;
    }
    $scope.editContentObject = function () {
        if ($('.configClassCheck').hasClass('active')) {
            $('.configClassCheck').removeClass('active');
        }
        $rootScope.viewTab = "";
        $rootScope.editTab = "active";
        $rootScope.addTab = "";
        $rootScope.saveFlag = false;
        $rootScope.checkinFlag = true;
        $location.path("/ManageIT/ContentObject/" + $routeParams.attributeScreenName + "/" + $rootScope.selectedType + "/" + $routeParams.contentTypeId + "/SubObject/" + $routeParams.subObjectId + "/ContentObject/" + $rootScope.singleContentObjectId);
        //$scope.defaultAttributes();
        //$timeout(function () { $scope.getContentObject($rootScope.singleContentObjectId);  }, 0);
    }

    // we can use this function until checkin works dynamically.
    $scope.checkinContentObject = function () {
        $rootScope.checkinFlag = true;
        $rootScope.saveFlag = false;
        $location.path("/ManageIT/ContentObject/" + $routeParams.attributeScreenName + "/" + $rootScope.selectedType + "/" + $routeParams.contentTypeId + "/SubObject/" + $routeParams.subObjectId + "/ContentObject/" + $rootScope.singleContentObjectId);
        //if ($routeParams.ContentObjectId != 0) {
        //    $scope.defaultAttributes();
        //    $timeout(function () { $scope.getContentObject($rootScope.singleContentObjectId); }, 100);
        //}
    }

    $scope.deleteContentObject = function () {
        // console.log($scope.messageModel);
        $scope.resetErrorDirective($scope.errorContentObjectdetails);
        $scope.showSuccessMessage($scope.errorContentObjectdetails, "ContentObject deleted successfully");
        $timeout(function () {
            $rootScope.saveFlag = false;
            $rootScope.checkinFlag = false;
            $rootScope.viewTab = "";
            $rootScope.editTab = "";
            $rootScope.addTab = "active";
            $location.path("/ManageIT/ContentObject/" + $routeParams.attributeScreenName + "/" + $rootScope.selectedType + "/" + $routeParams.contentTypeId + "/SubObject/" + $routeParams.subObjectId + "/ContentObject/0");
        }, 1000);
    }
    $scope.showSuccessMessage = function (attModel, message) {
        attModel.messages.push(message);
        attModel.isSuccess = true;
    }

    //#model binding
    //collectionType: 1# default, 2# subobject, 3# attributeset
    $scope.bindModelfromForm = function (itemCollection, collectionType, parentId) {
        collectionType = collectionType || 1;
        parentId = parentId || null;
        var attrCollection;
        if (collectionType == 2)
            attrCollection = itemCollection.defaultValues;
        else
            attrCollection = itemCollection;

        $.each(attrCollection, function (index, attr) {
            var attributeValues = { id: null, name: null, parentId:null, identifier: null, type: null, value: [] };
            attributeValues.id = attr.attributeId;
            attributeValues.name = attr.name;
            attributeValues.parentId = parentId;
            attributeValues.identifier = attr.identifier;
            attributeValues.type = attr.attributeType;
            if (collectionType == 2)
                attributeValues["subObjectId"] = itemCollection.attributeId;
            if (attr.attributeType == 'ListAttribute' || attr.attributeType == 'YesNoAttribute') {
                if (attr.selectedItem.length == 0)
                    attributeValues.value.push(attr.selectedItem.id)
                else {
                    for (var i = 0; i < attr.selectedItem.length; i++) {
                        if (attr.selectedItem.id == undefined)
                            attributeValues.value.push(attr.selectedItem[i].id);
                        else
                            attributeValues.value.push(attr.selectedItem.id);
                    }
                }
            }
            else if (attr.attributeType == 'DateAttribute' || attr.attributeType == 'DateTimeAttribute') {
                attributeValues.value.push(attr.selectedDate)
            }
            else if (attr.attributeType == 'TimeAttribute') {
                attributeValues.value.push(attr.selectedTime)
            }
            else if (attr.attributeType == 'CopyAttribute') {
                for (var i = 0; i < attr.copyFieldDetails.length; i++) {
                    var obj = {};
                    obj['name'] = attr.copyFieldDetails[i].name;
                    obj['value'] = attr.copyFieldDetails[i].defaultValue;
                    attributeValues.value.push(obj);
                }
            }
            else if (attr.attributeType == 'ImageReferenceAttribute') {
                var contentObjectFileDetails = {
                    fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null, gfsId: null
                };
                contentObjectFileDetails.fileId = attr.attributeId;

                if (attr.addedImages.length == 0)
                    contentObjectFileDetails.fileContent = attr.addedImages.fileContent;
                else {
                    for (var i = 0; i < attr.addedImages.length; i++) {
                        contentObjectFileDetails.fileContent = attr.addedImages[i].fileContent;
                        contentObjectFileDetails.fileName = attr.addedImages[i].fileName;
                    }
                }
                $scope.contentObjectModel.fileDetails.push(contentObjectFileDetails);
            }
            else if (attr.attributeType == 'DocumentReferenceAttribute') {
                var contentObjectFileDetails = {
                    fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null, gfsId: null
                };
                contentObjectFileDetails.fileId = attr.attributeId;

                if (attr.addedDocuments.length == 0)
                    contentObjectFileDetails.fileContent = attr.addedDocuments.fileContent;
                else {
                    for (var i = 0; i < attr.addedDocuments.length; i++) {
                        contentObjectFileDetails.fileContent = attr.addedDocuments[i].fileContent;
                        contentObjectFileDetails.fileName = attr.addedDocuments[i].fileName;
                    }
                }
                $scope.contentObjectModel.fileDetails.push(contentObjectFileDetails);
            }

            else {
                if (attr.defaultValues != undefined) {
                    for (var i = 0; i < attr.defaultValues.length; i++) {
                        attributeValues.value.push(attr.defaultValues[i].value);
                    }
                }
                else {
                    attributeValues.value.push(attr.defaultValue);
                }
            }
            if (collectionType == 2)
                $scope.contentObjectModel.subObjAttrCollection.push(attributeValues);
            else if (collectionType == 3)
                $scope.contentObjectModel.attributeSetCollection.push(attributeValues);
            else if (collectionType == 4)
                $scope.contentObjectModel.copyAttributeCollection.push(attributeValues);
            else
                $scope.contentObjectModel.attributeCollection.push(attributeValues);

        });
    }

    $scope.bindFormfromModel = function (itemCollection, attribute, collectionType) {
        collectionType = collectionType || 1;
        var attrCollection;
        if (collectionType == 2)
            attrCollection = itemCollection.defaultValues;
        else
            attrCollection = itemCollection;

        $.each(attrCollection, function (index, attr) {
            if (collectionType == 2)
                attributeValues["subObjectId"] = itemCollection.subObjectType;
            if (attr.attributeType == 'ListAttribute' || attr.attributeType == 'YesNoAttribute') {
                //if (attr.selectedItem.length == 0)
                //    attributeValues.value.push(attr.selectedItem.id)
                //else {
                //    for (var i = 0; i < attr.selectedItem.length; i++) {
                //        attributeValues.value.push(attr.selectedItem[i].id);
                //    }
                //}

                //attr.selectedItem=
            }
            else if (attr.attributeType == 'DateAttribute' || attr.attributeType == 'DateTimeAttribute') {
                attributeValues.value.push(attr.selectedDate)
            }
            else if (attr.attributeType == 'TimeAttribute') {
                attributeValues.value.push(attr.selectedTime)
            }
            else if (attr.attributeType == 'CopyAttribute') {
                for (var i = 0; i < attr.copyFieldDetails.length; i++) {
                    attributeValues.value.push(attr.copyFieldDetails[i].defaultValue);
                }
            }
            else if (attr.attributeType == 'ImageReferenceAttribute') {
                var contentObjectFileDetails = {
                        fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null, gfsId: null
                        };
               contentObjectFileDetails.fileId = attr.attributeId;

               if (attr.addedImages.length == 0)
                   contentObjectFileDetails.fileContent = attr.addedImages.fileContent;
                   else {
                   for (var i = 0; i < attr.addedImages.length; i++) {
                       contentObjectFileDetails.fileContent = attr.addedImages[i].fileContent;
                        contentObjectFileDetails.fileName = attr.addedImages[i].fileName;
                    }
                    }
                $scope.contentObjectModel.fileDetails.push(contentObjectFileDetails);
            }
            else if (attr.attributeType == 'DocumentReferenceAttribute') {
                    var contentObjectFileDetails = {
                        fileId: null, fileName: null, filePath : null, fileSize: null, fileType: null, fileContent: [], updateBy : null, uploadedDate: null, version: null, gfsId: null
                        };
                    contentObjectFileDetails.fileId = attr.attributeId;

                    if (attr.addedDocuments.length == 0)
                        contentObjectFileDetails.fileContent = attr.addedDocuments.fileContent;
                    else {
                    for (var i = 0; i < attr.addedDocuments.length; i++) {
                        contentObjectFileDetails.fileContent = attr.addedDocuments[i].fileContent;
                        contentObjectFileDetails.fileName = attr.addedDocuments[i].fileName;
                        }
                        }
                $scope.contentObjectModel.fileDetails.push(contentObjectFileDetails);
                }
            else {
                if (attr.defaultValues != undefined) {
                    for (var i = 0; i < attr.defaultValues.length; i++) {
                        attributeValues.value.push(attr.defaultValues[i].value);
                    }
                }
                else {
                    attributeValues.value.push(attr.defaultValue);
                }
            }
            if (collectionType == 2)
                $scope.contentObjectModel.subObjAttrCollection.push(attributeValues);
            else if (collectionType == 3)
                $scope.contentObjectModel.attributeSetCollection.push(attributeValues);
            else
                $scope.contentObjectModel.attributeCollection.push(attributeValues);

        });
    }
    var compositeGroup = [];
    $scope.uniqueColl = [];
    var defaultAttributes = [];
    var defaultattributeSet = [];
    var defaultsubObject = [];
    var isResolved = false;
    $scope.validateContentObject = function (attributes, errorCntrl) {
        $scope.resetErrorDirective(errorCntrl);
        //$scope.getContentObjectByContentTypeId();
        var defaultattrModel = $.grep(attributes, function (item, index) {
            return item.attributeType != 'SubObjectAttribute';
        });
        var subobjectModel = $.grep(attributes, function (item, index) {
            return item.attributeType == 'SubObjectAttribute';
        });
        $scope.validateMandatory(defaultattrModel);
        if (subobjectModel != null && subobjectModel != undefined) {
            $.each(subobjectModel, function (index, item) {
                $scope.validateMandatory(item.defaultValues);
            });
        }
        $scope.validateMandatory(attributes.attributeSets[0].attributes);
        if ($scope.errorContentObjectdetails.messages.length > 0) {
            $scope.errorContentObjectdetails.isError = true;
            $scope.errorContentObjectdetails.isSuccess = false;
            $scope.errorContentObjectdetails.isHide = false;
            return false;
        }
        //Business Rules
        defaultAttributes = [];
        defaultattributeSet = [];
        defaultsubObject = [];
        isResolved = false;
        angular.forEach($scope.allAttributes, function (value, key) {

            if (value.subObjectId == null || value.subObjectId == "0") {
                if (value.attributeSetId == null || value.attributeSetId == "0") {
                    defaultAttributes.push(value);
                }
                else if (value.attributeSetId == $routeParams.attributeSetId) {
                    defaultattributeSet.push(value);
                }
            }
            else {
                if (value.subObjectId == $routeParams.subObjectId)
                    defaultsubObject.push(value);
            }

        });
        compositeGroup = [];        
        $scope.validateBusinessRules(defaultattrModel, 1, false);
        var finalModel = defaultattrModel;
        if (subobjectModel != null && subobjectModel != undefined) {
            $.each(subobjectModel, function (index, item) {
                $scope.validateBusinessRules(item.defaultValues, 2, false);
                finalModel = finalModel.concat(item.defaultValues);
            });
        }
        $scope.validateBusinessRules(attributes.attributeSets[0].attributes, 3, false);


        finalModel = finalModel.concat(attributes.attributeSets[0].attributes);
        var uniqueCompositeGroup = [];
        var compositeGroupColl = $.grep(finalModel, function (groupItem, Index) {
            return (groupItem.uniqueValues == true && groupItem.uniqueGroup != "" && groupItem.uniqueGroup != null)
        });

        $.each(compositeGroupColl, function (index, item) {
            if ($.inArray(item.uniqueGroup, uniqueCompositeGroup) === -1) {
                uniqueCompositeGroup.push(item.uniqueGroup);
            }
        })

        for (var i = 0; i < uniqueCompositeGroup.length; i++) {
            var coll = $.grep(compositeGroupColl, function (colItem, colIndex) {
                return (colItem.uniqueGroup == uniqueCompositeGroup[i]);
            });
            var attrCollection = [];
            $scope.validateBusinessRules(coll, 4, true);


        }
        //$scope.validateBusinessRules(finalModel, 1);


        if ($scope.errorContentObjectdetails.messages.length > 0) {
            $scope.errorContentObjectdetails.isError = true;
            $scope.errorContentObjectdetails.isSuccess = false;
            $scope.errorContentObjectdetails.isHide = false;
            return false;
        }
        else
            return true;


       // var result = $scope.checkMessageStatus();
       // return result == undefined ? true : result;


    }
    var callfun = null;
    //$scope.checkMessageStatus = function () {

    //    if (isResolved == true) {
    //        //setTimeout(function () {
    //        //    checkMessageStatus();
    //        //}, 0);
    //        clearInterval(callfun);
    //        console.log("isResolved true ==>" + callfun)
    //        if ($scope.errorContentObjectdetails.messages.length > 0) {
    //            $scope.errorContentObjectdetails.isError = true;
    //            $scope.errorContentObjectdetails.isSuccess = false;
    //            $scope.errorContentObjectdetails.isHide = false;
    //            $(':input:visible:first').focus();
    //            clearInterval(callfun);
    //            return true;
    //        }
    //        else
    //            return true;
    //    }
    //    if (isResolved == false) {
    //        console.log("isResolved ==>" + isResolved)
    //        callfun = setTimeout(function () {
    //            console.log("isResolved11 ==>" + isResolved)
    //            $scope.checkMessageStatus();

    //        }, 100);

    //    }

    //};

    $scope.validateMandatory = function (attributes) {
        var mandatoryColl = $.grep(attributes, function (item, index) {
            return item.mandatory == true
        });
        $.each(mandatoryColl, function (index, attr) {
            if (attr.attributeType == 'ListAttribute' || attr.attributeType == 'YesNoAttribute') {
                if (attr.selectedItem.length == 0)
                    if (!$scope.isValid(attr.selectedItem.id))
                        $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                    else {
                        for (var i = 0; i < attr.selectedItem.length; i++) {
                            //attributeValues.value.push(attr.selectedItem[i].id);
                            if (!$scope.isValid(attr.selectedItem[i].id)) {
                                $scope.errorContentObjectdetails.messages.push(attr.name + " all values are mandatory!");
                                break;
                            }
                        }
                    }
            }
            else if (attr.attributeType == 'DateAttribute' || attr.attributeType == 'DateTimeAttribute') {
                if (!$scope.isValid(attr.selectedDate))
                    $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                // attributeValues.value.push(attr.selectedDate)
            }
            else if (attr.attributeType == 'TimeAttribute') {
                if (!$scope.isValid(attr.selectedTime))
                    $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                //attributeValues.value.push(attr.selectedTime)
            }
            else if (attr.attributeType == 'CopyAttribute' && attr.copyFieldDetails != undefined) {
                for (var i = 0; i < attr.copyFieldDetails.length; i++) {
                    if (!$scope.isValid(attr.copyFieldDetails[i].defaultValue)) {
                        $scope.errorContentObjectdetails.messages.push(attr.name + " all values are mandatory!");
                        break;
                    }
                    //attributeValues.value.push(attr.copyFieldDetails[i].defaultValue);
                }
            }
            else if (attr.attributeType == 'ImageReferenceAttribute') {
                //var contentObjectFileDetails = { fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null };
                //contentObjectFileDetails.fileId = attr.attributeId;

                //if (attr.addedImages.length == 0)
                //    contentObjectFileDetails.fileContent = attr.addedImages.fileContent;
                //else {
                //    for (var i = 0; i < attr.addedImages.length; i++) {
                //        contentObjectFileDetails.fileContent = attr.addedImages[i].fileContent;
                //    }
                //}
                //$scope.contentObjectModel.fileDetails.push(contentObjectFileDetails);
            }
            else if (attr.attributeType == 'SubObjectAttribute') {

            }
            else {
                if (attr.defaultValues != undefined) {
                    for (var i = 0; i < attr.defaultValues.length; i++) {
                        //attributeValues.value.push(attr.defaultValues[i].value);
                        if (!$scope.isValid(attr.defaultValues[i].value)) {
                            $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                            break;
                        }
                    }
                }
                else {
                    //attributeValues.value.push(attr.defaultValue);
                    if (!$scope.isValid(attr.defaultValue)) {
                        $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                    }
                }
            }
        });
    };
    $scope.validateBusinessRules = function (attributes, objtype, isCompositeUnique) {
        isCompositeUnique == isCompositeUnique || false;
        var compostitColl = [];
        $.each(attributes, function (index, attr) {
            if (attr.multipleValues.allowMultipleValues == null) attr.multipleValues.allowMultipleValues = false;
            if (attr.attributeType == 'ListAttribute' || attr.attributeType == 'YesNoAttribute') {
                var attributeColl = attributes;
                //    $.grep(attributes, function (item, index) {
                //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                //});
                //if (attr.selectedItem.length == 0) {
                //    //if (!$scope.isValid(attr.selectedItem.id))
                //    //  $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                //    if (attr.uniqueValues == true && attr.selectedItem.id != null) {
                //        // $scope.validateandAddUniqueValue(attr.selectedItem.id);
                //        if (attr.uniqueGroup != "")
                //            $scope.validateUnique(attributeColl, attr.selectedItem.id, attr.uniqueGroup, objtype);
                //        else
                //            if (attr.uniqueGroup == "")
                //                $scope.validateUnique(attributeColl, attr.selectedItem.id, attr.uniqueGroup, objtype);
                //    }
                //}
                //else
                //    for (var i = 0; i < attr.selectedItem.length; i++) {
                //        //attributeValues.value.push(attr.selectedItem[i].id);
                //        if (attr.uniqueValues == true && attr.selectedItem[i].id != null) {
                //            $scope.validateUnique(attributeColl, attr.selectedItem[i].id, attr.uniqueGroup, objtype)
                //            break;
                //        }
                //    }
                if (attr.multipleValues.allowMultipleValues == true && attr.multipleValues.isUnique == true && isCompositeUnique == false) {
                    var uniqueItems = [];
                    $.each(attr.defaultValues, function (index, item) {
                        if (item.value.selectedItem.length == 0) {
                            if (item.value.selectedItem.id != null) {
                                if ($.inArray(item.value.selectedItem.id, uniqueItems) === -1) {
                                    uniqueItems.push(item.value.selectedItem.id);
                                } else {
                                    $scope.errorContentObjectdetails.messages.push(attr.name + " must be have unique values.");
                                    return false;
                                }
                            }
                        }

                    })
                }
                if (attr.uniqueValues == true && attr.multipleValues.allowMultipleValues == false) {
                    var isFound = false;
                    var isAttrColl = null;
                    $.each($scope.contentObjectCollection, function (indx, item2) {

                        if (isFound == true) return false
                        if (objtype == 1) {
                            isAttrColl = null;
                            isAttrColl = $.grep(item2.attributeCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    var dd = $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value.selectedItem.id);
                                    });
                                }
                                if (dd != undefined && dd.length > 0) {
                                    isFound = true;
                                    return item3;
                                }

                            });
                        } else if (objtype == 2) {
                            isAttrColl = $.grep(item2.subObjAttrCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    return $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value.selectedItem.id);
                                    });
                                }
                            });
                        }
                        else {
                            isAttrColl = $.grep(item2.attributeSetCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    return $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value.selectedItem.id);
                                    });
                                }
                            });
                        }
                        if (isAttrColl.length > 0) {
                            if (attr.uniqueGroup != "" && attr.uniqueGroup != null)
                                compostitColl.push(isAttrColl);
                            else
                                $scope.errorContentObjectdetails.messages.push(attr.name + " value already exist in current Content Type.");
                            return false;
                        }
                    });
                }

            }
            else if (attr.attributeType == 'DateAttribute' || attr.attributeType == 'DateTimeAttribute') {
                //if (!$scope.isValid(attr.selectedDate))
                //    $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                // attributeValues.value.push(attr.selectedDate)
                var attributeColl = attributes;
                //    $.grep(attributes, function (item, index) {
                //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                //});
                //if (attr.uniqueValues == true && attr.selectedDate != null) {
                //    //$scope.validateandAddUniqueValue(attr.selectedDate);
                //    $scope.validateUnique(attributeColl, attr.selectedDate, attr.uniqueGroup, objtype)
                //}
                if (attr.multipleValues.allowMultipleValues == true && attr.multipleValues.isUnique == true && isCompositeUnique == false) {
                    var uniqueItems = [];
                    $.each(attr.defaultValues, function (index, item) {
                        if (item.value.selectedDate != null) {
                            if ($.inArray(item.value.selectedDate, uniqueItems) === -1) {
                                uniqueItems.push(item.value.selectedDate);
                            } else {
                                $scope.errorContentObjectdetails.messages.push(attr.name + " must be have unique values.");
                                return false;
                            }
                        }


                    })
                }
                if (attr.uniqueValues == true && attr.multipleValues.allowMultipleValues == false) {
                    var isFound = false;
                    var isAttrColl = null;
                    $.each($scope.contentObjectCollection, function (indx, item2) {

                        if (isFound == true) return false
                        if (objtype == 1) {
                            isAttrColl = null;
                            isAttrColl = $.grep(item2.attributeCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    var dd = $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value.selectedDate);
                                    });
                                }
                                if (dd != undefined && dd.length > 0) {
                                    isFound = true;
                                    return item3;
                                }

                            });
                        } else if (objtype == 2) {
                            isAttrColl = $.grep(item2.subObjAttrCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    return $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value.selectedDate);
                                    });
                                }
                            });
                        }
                        else {
                            isAttrColl = $.grep(item2.attributeSetCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    return $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value.selectedDate);
                                    });
                                }
                            });
                        }
                        if (isAttrColl.length > 0) {
                            if (attr.uniqueGroup != "" && attr.uniqueGroup != null)
                                compostitColl.push(isAttrColl);
                            else
                                $scope.errorContentObjectdetails.messages.push(attr.name + " value already exist in current Content Type.");
                            return false;
                        }
                    });
                }
            }
            else if (attr.attributeType == 'TimeAttribute') {
                //if (!$scope.isValid(attr.selectedTime))
                //    $scope.errorContentObjectdetails.messages.push(attr.name + " is mandatory!");
                //attributeValues.value.push(attr.selectedTime)
                var attributeColl = attributes;
                //    $.grep(attributes, function (item, index) {
                //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                //});
                if (attr.multipleValues.allowMultipleValues == true && attr.multipleValues.isUnique == true && isCompositeUnique == false) {
                    var uniqueItems = [];
                    $.each(attr.defaultValues, function (index, item) {
                        if (item.value != null) {
                            if ($.inArray(item.value, uniqueItems) === -1) {
                                uniqueItems.push(item.value);
                            } else {
                                $scope.errorContentObjectdetails.messages.push(attr.name + " must be have unique values.");
                                return false;
                            }
                        }


                    })
                }
                if (attr.uniqueValues == true && attr.multipleValues.allowMultipleValues == false) {
                    var isFound = false;
                    var isAttrColl = null;
                    $.each($scope.contentObjectCollection, function (indx, item2) {

                        if (isFound == true) return false
                        if (objtype == 1) {
                            isAttrColl = null;
                            isAttrColl = $.grep(item2.attributeCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    var dd = $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value);
                                    });
                                }
                                if (dd != undefined && dd.length > 0) {
                                    isFound = true;
                                    return item3;
                                }

                            });
                        } else if (objtype == 2) {
                            isAttrColl = $.grep(item2.subObjAttrCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    return $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value);
                                    });
                                }
                            });
                        }
                        else {
                            isAttrColl = $.grep(item2.attributeSetCollection, function (item3, ndx3) {
                                if (item3.id == attr.attributeId) {
                                    return $.grep(item3.value, function (item4, ndx4) {
                                        return (item4 == attr.defaultValues[0].value);
                                    });
                                }
                            });
                        }
                        if (isAttrColl.length > 0) {
                            if (attr.uniqueGroup != "" && attr.uniqueGroup != null)
                                compostitColl.push(isAttrColl);
                            else
                                $scope.errorContentObjectdetails.messages.push(attr.name + " value already exist in current Content Type.");
                            return false;
                        }
                    });
                }

                //if (attr.uniqueValues == true && attr.selectedTime != null) {
                //    // $scope.validateandAddUniqueValue(attr.selectedTime);
                //    $scope.validateUnique(attributeColl, attr.selectedTime, attr.uniqueGroup, objtype)
                //}
            }
            else if (attr.attributeType == 'CopyAttribute') {
                //for (var i = 0; i < attr.copyFieldDetails.length; i++) {
                //    if (!$scope.isValid(attr.copyFieldDetails[i].defaultValue)) {
                //        $scope.errorContentObjectdetails.messages.push(attr.name + " all values are mandatory!");
                //        break;
                //    }
                //    //attributeValues.value.push(attr.copyFieldDetails[i].defaultValue);
                //}
                var attributeColl = attributes;
                //    $.grep(attributes, function (item, index) {
                //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                //});
                for (var i = 0; i < attr.copyFieldDetails.length; i++) {
                    if (attr.uniqueValues == true && attr.copyFieldDetails[i].defaultValue != null) {
                        // $scope.validateandAddUniqueValue(attr.copyFieldDetails[i].defaultValue);
                        //$scope.validateUnique(attributeColl, attr.copyFieldDetails[i].defaultValue, attr.uniqueGroup, objtype)
                        break;
                    }
                }
            }
            else if (attr.attributeType == 'ImageReferenceAttribute') {
                //var contentObjectFileDetails = { fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null };
                //contentObjectFileDetails.fileId = attr.attributeId;

                //if (attr.addedImages.length == 0)
                //    contentObjectFileDetails.fileContent = attr.addedImages.fileContent;
                //else {
                //    for (var i = 0; i < attr.addedImages.length; i++) {
                //        contentObjectFileDetails.fileContent = attr.addedImages[i].fileContent;
                //    }
                //}
                //$scope.contentObjectModel.fileDetails.push(contentObjectFileDetails);
            }
            else if (attr.attributeType == 'DecimalAttribute') {
                if (attr.defaultValues != undefined) {
                    for (var i = 0; i < attr.defaultValues.length; i++) {
                        //attributeValues.value.push(attr.defaultValues[i].value);
                        if (attr.minimumValue != null && attr.defaultValues[i].value < attr.minimumValue) {
                            $scope.errorContentObjectdetails.messages.push(attr.name + " should be minimum " + attr.minimumValue + " value!");
                            break;
                        }
                        if (attr.maximumValue != null && attr.defaultValues[i].value > attr.maximumValue) {
                            $scope.errorContentObjectdetails.messages.push(attr.name + " should be under maximum " + attr.maximumValue + " value!");
                            break;
                        }
                        if (isNumeric(attr.defaultValues[i].value) && attr.defaultValues[i].value.toString().indexOf(".") != -1) {
                            var dValue = attr.defaultValues[i].value;
                            var precision = dValue.split(".")[1].length;
                            //if (precision > attr.decimalPlaces) {
                            //    $scope.errorContentObjectdetails.messages.push(attr.name + " precision limit is " + attr.decimalPlaces + "!");
                            //    break;
                            //}
                        }
                        var attributeColl = attributes;
                        //    $.grep(attributes, function (item, index) {
                        //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                        //});

                        if (attr.multipleValues.allowMultipleValues == true && attr.multipleValues.isUnique == true) {
                            var uniqueItems = [];
                            $.each(attr.defaultValues, function (index, item) {

                                // if (item.value.selectedItem.length == 0) {
                                if (item.value != null) {
                                    if ($.inArray(item.value, uniqueItems) === -1) {
                                        uniqueItems.push(item.value);
                                    } else {
                                        $scope.errorContentObjectdetails.messages.push(attr.name + " must be have unique values.");
                                        return false;
                                    }
                                }
                                //}

                            })
                        }
                        if (attr.uniqueValues == true && attr.multipleValues.allowMultipleValues == false) {
                            $.each($scope.contentObjectCollection, function (indx, item2) {
                                var isAttrColl = null;
                                if (objtype == 1) {
                                    isAttrColl = $.grep(item2.attributeCollection, function (item3, ndx3) {
                                        if (item3.id == attr.attributeId) {
                                            return $.grep(item3.value, function (item4, ndx4) {
                                                return (item4 == attr.defaultValues[0].value);
                                            });
                                        }
                                    });
                                } else if (objtype == 2) {
                                    isAttrColl = $.grep(item2.subObjAttrCollection, function (item3, ndx3) {
                                        if (item3.id == attr.attributeId) {
                                            return $.grep(item3.value, function (item4, ndx4) {
                                                return (item4 == attr.defaultValues[0].value);
                                            });
                                        }
                                    });
                                }
                                else {
                                    isAttrColl = $.grep(item2.attributeSetCollection, function (item3, ndx3) {
                                        if (item3.id == attr.attributeId) {
                                            return $.grep(item3.value, function (item4, ndx4) {
                                                return (item4 == attr.defaultValues[0].value);
                                            });
                                        }
                                    });
                                }
                                if (isAttrColl.length > 0) {
                                    $scope.errorContentObjectdetails.messages.push(attr.name + " value already exist in current Content Type.");
                                    return false;
                                }
                            });
                        }
                        //if (attr.uniqueValues == true && attr.defaultValues[i].value != null) {
                        //    // $scope.validateandAddUniqueValue(attr.defaultValues[i].value);
                        //    $scope.validateUnique(attributeColl, attr.defaultValues[i].value, attr.uniqueGroup, objtype);
                        //    break;
                        //}

                    }
                }
                else {
                    //attributeValues.value.push(attr.defaultValue);
                    if (attr.minimumValue != null && attr.defaultValue < attr.minimumValue) {
                        $scope.errorContentObjectdetails.messages.push(attr.name + " should be minimum " + attr.minimumValue + " value!");
                    }
                    if (attr.maximumValue != null && attr.defaultValue > attr.maximumValue) {
                        $scope.errorContentObjectdetails.messages.push(attr.name + " should be under maximum " + attr.maximumValue + " value!");

                    }
                    //if (isNumeric(attr.defaultValue) && attr.defaultValue.toString().indexOf(".") != -1) {
                    //    var dValue = attr.defaultValue;
                    //    var precision = dValue.split(".")[1].length;
                    //    if (precision > attr.decimalPlaces) {
                    //        $scope.errorContentObjectdetails.messages.push(attr.name + " precision limit is " + attr.decimalPlaces + "!");
                    //    }
                    //}
                    var attributeColl = attributes;
                    //    $.grep(attributes, function (item, index) {
                    //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                    //});
                    if (attr.multipleValues.allowMultipleValues == true && attr.multipleValues.isUnique == true && isCompositeUnique == false) {
                        var uniqueItems = [];
                        $.each(attr.defaultValues, function (index, item) {
                            if (item.value != null) {
                                if ($.inArray(item.value, uniqueItems) === -1) {
                                    uniqueItems.push(item.value);
                                } else {
                                    $scope.errorContentObjectdetails.messages.push(attr.name + " must be have unique values.");
                                    return false;
                                }
                            }


                        })
                    }
                    if (attr.uniqueValues == true && attr.multipleValues.allowMultipleValues == false) {
                        var isFound = false;
                        var isAttrColl = null;
                        $.each($scope.contentObjectCollection, function (indx, item2) {

                            if (isFound == true) return false
                            if (objtype == 1) {
                                isAttrColl = null;
                                isAttrColl = $.grep(item2.attributeCollection, function (item3, ndx3) {
                                    if (item3.id == attr.attributeId) {
                                        var dd = $.grep(item3.value, function (item4, ndx4) {
                                            return (item4 == attr.defaultValues[0].value);
                                        });
                                    }
                                    if (dd != undefined && dd.length > 0) {
                                        isFound = true;
                                        return item3;
                                    }

                                });
                            } else if (objtype == 2) {
                                isAttrColl = $.grep(item2.subObjAttrCollection, function (item3, ndx3) {
                                    if (item3.id == attr.attributeId) {
                                        return $.grep(item3.value, function (item4, ndx4) {
                                            return (item4 == attr.defaultValues[0].value);
                                        });
                                    }
                                });
                            }
                            else {
                                isAttrColl = $.grep(item2.attributeSetCollection, function (item3, ndx3) {
                                    if (item3.id == attr.attributeId) {
                                        return $.grep(item3.value, function (item4, ndx4) {
                                            return (item4 == attr.defaultValues[0].value);
                                        });
                                    }
                                });
                            }
                            if (isAttrColl.length > 0) {
                                if (attr.uniqueGroup != "" && attr.uniqueGroup != null)
                                    compostitColl.push(isAttrColl);
                                else
                                    $scope.errorContentObjectdetails.messages.push(attr.name + " value already exist in current Content Type.");
                                return false;
                            }
                        });
                    }

                    //if (attr.uniqueValues == true && attr.defaultValue != null) {
                    //    //$scope.validateandAddUniqueValue(attr.defaultValue);
                    //    $scope.validateUnique(attributeColl, attr.defaultValue, attr.uniqueGroup, objtype);
                    //}
                }
            }
            else {
                if (attr.defaultValues != undefined) {
                    for (var i = 0; i < attr.defaultValues.length; i++) {
                        if (attr.minWordType == 0) {
                            var charlist = $.trim(attr.defaultValues[i].value).split("");
                            if (charlist.length < attr.minimumLength) {
                                $scope.errorContentObjectdetails.messages.push(attr.name + " characters length should be greater than " + attr.minimumLength + " !");
                                break;
                            }
                        } else if (attr.minWordType == 1) {
                            var wordlist = $.trim(attr.defaultValues[i].value).split(" ");
                            if (wordlist.length < attr.minimumLength) {
                                $scope.errorContentObjectdetails.messages.push(attr.name + " word length should be greater than " + attr.minimumLength + " !");
                                break;
                            }
                        }
                        if (attr.maxWordType == 0) {
                            var charlist = $.trim(attr.defaultValues[i].value).split("");
                            if (charlist.length > attr.maximumLength) {
                                $scope.errorContentObjectdetails.messages.push(attr.name + " characters length should be less than " + attr.maximumLength + " !");
                                break;
                            }
                        } else if (attr.maxWordType == 1) {
                            var wordlist = $.trim(attr.defaultValues[i].value).split(" ");
                            if (wordlist.length > attr.maximumLength) {
                                $scope.errorContentObjectdetails.messages.push(attr.name + " word length should be less than " + attr.maximumLength + " !");
                                break;
                            }
                        }
                        var attributeColl = attributes;
                        //    $.grep(attributes, function (item, index) {
                        //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                        //});
                        if (attr.multipleValues.allowMultipleValues == true && attr.multipleValues.isUnique == true && isCompositeUnique == false) {
                            var uniqueItems = [];
                            $.each(attr.defaultValues, function (index, item) {

                                // if (item.value.selectedItem.length == 0) {
                                if (item.value != null) {
                                    if ($.inArray(item.value, uniqueItems) === -1) {
                                        uniqueItems.push(item.value);
                                    } else {
                                        $scope.errorContentObjectdetails.messages.push(attr.name + " must be have unique values.");
                                        return false;
                                    }
                                }
                                //}

                            })
                        }
                        if (attr.uniqueValues == true && attr.multipleValues.allowMultipleValues == false) {
                            var isFound = false;
                            var isAttrColl = null;
                            $.each($scope.contentObjectCollection, function (indx, item2) {

                                if (isFound == true) return false
                                if (objtype == 1) {
                                    isAttrColl = null;
                                    isAttrColl = $.grep(item2.attributeCollection, function (item3, ndx3) {
                                        if (item3.id == attr.attributeId) {
                                            var dd = $.grep(item3.value, function (item4, ndx4) {
                                                return (item4 == attr.defaultValues[0].value);
                                            });
                                        }
                                        if (dd != undefined && dd.length > 0) {
                                            isFound = true;
                                            return item3;
                                        }

                                    });
                                } else if (objtype == 2) {
                                    isAttrColl = $.grep(item2.subObjAttrCollection, function (item3, ndx3) {
                                        if (item3.id == attr.attributeId) {
                                            return $.grep(item3.value, function (item4, ndx4) {
                                                return (item4 == attr.defaultValues[0].value);
                                            });
                                        }
                                    });
                                }
                                else {
                                    isAttrColl = $.grep(item2.attributeSetCollection, function (item3, ndx3) {
                                        if (item3.id == attr.attributeId) {
                                            return $.grep(item3.value, function (item4, ndx4) {
                                                return (item4 == attr.defaultValues[0].value);
                                            });
                                        }
                                    });
                                }
                                if (isAttrColl.length > 0) {
                                    if (attr.uniqueGroup != "" && attr.uniqueGroup != null)
                                        compostitColl.push(isAttrColl);
                                    else
                                        $scope.errorContentObjectdetails.messages.push(attr.name + " value already exist in current Content Type.");
                                    return false;
                                }
                            });
                        }
                        //if (attr.uniqueValues == true && attr.defaultValues[i].value != null) {
                        //    //$scope.validateandAddUniqueValue(attr.defaultValues[i].value);
                        //    $scope.validateUnique(attributeColl, attr.defaultValues[i].value, attr.uniqueGroup, objtype);
                        //    break;
                        //}
                    }
                }
                else {
                    //attributeValues.value.push(attr.defaultValue);
                    if (attr.minWordType == 0) {
                        var charlist = $.trim(attr.defaultValue).split("");
                        if (charlist.length < attr.minimumLength) {
                            $scope.errorContentObjectdetails.messages.push(attr.name + " characters length should be greater than " + attr.minimumLength + " !");
                        }
                    } else if (attr.minWordType == 1) {
                        var wordlist = $.trim(attr.defaultValue).split(" ");
                        if (wordlist.length < attr.minimumLength) {
                            $scope.errorContentObjectdetails.messages.push(attr.name + " word length should be greater than " + attr.minimumLength + " !");
                        }
                    }
                    if (attr.maxWordType == 0) {
                        var charlist = $.trim(attr.defaultValue).split("");
                        if (charlist.length > attr.maximumLength) {
                            $scope.errorContentObjectdetails.messages.push(attr.name + " characters length should be less than " + attr.maximumLength + " !");
                        }
                    } else if (attr.maxWordType == 1) {
                        var wordlist = $.trim(attr.defaultValue).split(" ");
                        if (wordlist.length > attr.maximumLength) {
                            $scope.errorContentObjectdetails.messages.push(attr.name + " word length should be greater than " + attr.maximumLength + " !");
                        }
                    }
                    // var attributeColl = attributes;
                    //    $.grep(attributes, function (item, index) {
                    //    return (item.attributeType != attr.attributeType && item.attributeId != attr.attributeId);
                    //});


                    //if (attr.uniqueValues == true && attr.defaultValue != null) {
                    //    // $scope.validateandAddUniqueValue(attr.defaultValue);
                    //    $scope.validateUnique(attributeColl, attr.defaultValue, attr.uniqueGroup, objtype);
                    //}
                }
            }
        });
        if (attributes.length == compostitColl.length && compostitColl.length > 0) {
            $scope.errorContentObjectdetails.messages.push("Composite attributes must be unique across all content objects within the content type.");
            return false;
        }
        if (objtype == 4 || objtype == 3)
            isResolved = true;
    };
    $scope.validateUnique = function (attributesColl, uniqueValue, uniqueGroup, objtype) {
        if (uniqueGroup == "" || uniqueGroup == undefined) uniqueGroup = null;
        $.each(attributesColl, function (index, attr) {
            if (attr.attributeType == 'ListAttribute' || attr.attributeType == 'YesNoAttribute') {
                if (attr.selectedItem.length == 0) {
                    if (uniqueGroup == null) {
                        var uniqueItem = {
                            uniqueValue: uniqueValue
                        };
                        //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                        //    return (uniqueItem.uniqueValue == attr.selectedItem.id);
                        //});
                        if (attr.selectedItem.id == uniqueValue)
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);

                        //if (filter1.length == 0)
                        //    $scope.uniqueColl.push(uniqueItem);

                    } else {
                        var groupItem = {
                            groupId: uniqueGroup, ItemValue: uniqueValue
                        };
                        var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                            return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                        });
                        if (filter.length > 0 && attr.selectedItem.id == uniqueValue && attr.uniqueGroup == uniqueGroup)
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                        else {
                            var dd = $.grep(compositeGroup, function (itm, ind2) {
                                return itm.groupId == uniqueGroup
                            });
                            if (dd.length == 0) {
                                compositeGroup.push(groupItem);
                            }
                        }

                    }
                }
                else
                    for (var i = 0; i < attr.selectedItem.length; i++) {
                        if (uniqueGroup == null) {
                            var uniqueItem = {
                                uniqueValue: uniqueValue
                            };
                            //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                            //    return (uniqueItem.uniqueValue == attr.selectedItem[i].id);
                            //});
                            if (attr.selectedItem[i].id == uniqueValue) {
                                $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                                break;
                            }
                            //if (filter1.length == 0)
                            //    $scope.uniqueColl.push(uniqueItem);

                        } else {
                            var groupItem = {
                                groupId: uniqueGroup, ItemValue: uniqueValue
                            };
                            var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                                return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                            });
                            if (filter.length > 0 && attr.selectedItem[i].id == uniqueValue && attr.uniqueGroup == uniqueGroup)
                                $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                            else {
                                var dd = $.grep(compositeGroup, function (itm, ind2) {
                                    return itm.groupId == uniqueGroup
                                });
                                if (dd.length == 0) {
                                    compositeGroup.push(groupItem);
                                }
                            }

                        }
                    }
            }

            else if (attr.attributeType == 'DateAttribute' || attr.attributeType == 'DateTimeAttribute') {
                if (uniqueGroup == null) {
                    var uniqueItem = {
                        uniqueValue: uniqueValue
                    };
                    //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                    //    return (uniqueItem.uniqueValue == attr.selectedDate);
                    //});
                    if (attr.selectedDate == uniqueValue)
                        $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                    //if (filter1.length == 0)
                    //    $scope.uniqueColl.push(uniqueItem);
                }
                else {
                    var groupItem = {
                        groupId: uniqueGroup, ItemValue: uniqueValue
                    };
                    var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                        return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                    });
                    if (filter.length > 0 && attr.selectedDate == uniqueValue && attr.uniqueGroup == uniqueGroup)
                        $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                    else {
                        var dd = $.grep(compositeGroup, function (itm, ind2) {
                            return itm.groupId == uniqueGroup
                        });
                        if (dd.length == 0) {
                            compositeGroup.push(groupItem);
                        }
                    }
                }
            }
            else if (attr.attributeType == 'TimeAttribute') {
                if (uniqueGroup == null) {
                    var uniqueItem = {
                        uniqueValue: uniqueValue
                    };
                    //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                    //    return (uniqueItem.uniqueValue == attr.selectedTime);
                    //});
                    if (attr.selectedTime == uniqueValue)
                        $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                    //if (filter1.length == 0)
                    //    $scope.uniqueColl.push(uniqueItem);
                }
                else {
                    var groupItem = {
                        groupId: uniqueGroup, ItemValue: uniqueValue
                    };
                    var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                        return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                    });
                    if (filter.length > 0 && attr.selectedTime == uniqueValue && attr.uniqueGroup == uniqueGroup)
                        $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                    else {
                        var dd = $.grep(compositeGroup, function (itm, ind2) {
                            return itm.groupId == uniqueGroup
                        });
                        if (dd.length == 0) {
                            compositeGroup.push(groupItem);
                        }
                    }
                }
            }
            else if (attr.attributeType == 'CopyAttribute') {
                for (var i = 0; i < attr.copyFieldDetails.length; i++) {
                    if (uniqueGroup == null) {
                        var uniqueItem = {
                            uniqueValue: uniqueValue
                        };
                        //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                        //    return (uniqueItem.uniqueValue == attr.defaultValue);
                        //});
                        if (attr.defaultValue == uniqueValue) {
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                            break;
                        }
                        //if (filter1.length == 0)
                        //    $scope.uniqueColl.push(uniqueItem);
                    }
                    else {
                        var groupItem = {
                            groupId: uniqueGroup, ItemValue: uniqueValue
                        };
                        var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                            return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                        });
                        if (filter.length > 0 && attr.defaultValue == uniqueValue && attr.uniqueGroup == uniqueGroup)
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                        else {
                            var dd = $.grep(compositeGroup, function (itm, ind2) {
                                return itm.groupId == uniqueGroup
                            });
                            if (dd.length == 0) {
                                compositeGroup.push(groupItem);
                            }
                        }
                        break;
                    }
                }

            }
            else if (attr.attributeType == 'ImageReferenceAttribute') {
                //var contentObjectFileDetails = { fileId: null, fileName: null, filePath: null, fileSize: null, fileType: null, fileContent: [], updateBy: null, uploadedDate: null, version: null };
                //contentObjectFileDetails.fileId = attr.attributeId;

                //if (attr.addedImages.length == 0)
                //    contentObjectFileDetails.fileContent = attr.addedImages.fileContent;
                //else {
                //    for (var i = 0; i < attr.addedImages.length; i++) {
                //        contentObjectFileDetails.fileContent = attr.addedImages[i].fileContent;
                //    }
                //}
                //$scope.contentObjectModel.fileDetails.push(contentObjectFileDetails);
                var x = 1;
            }
            else if (attr.attributeType == 'DecimalAttribute') {
                if (attr.defaultValues != undefined) {
                    for (var i = 0; i < attr.defaultValues.length; i++) {
                        if (uniqueGroup == null) {
                            var uniqueItem = {
                                uniqueValue: uniqueValue
                            };
                            //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                            //    return (uniqueItem.uniqueValue == attr.defaultValues[i].value);
                            //});
                            if (attr.defaultValues[i].value == uniqueValue) {
                                $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                                break;
                            }
                            //if (filter1.length == 0)
                            //    $scope.uniqueColl.push(uniqueItem);

                        } else {
                            var groupItem = {
                                groupId: uniqueGroup, ItemValue: uniqueValue
                            };
                            var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                                return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                            });
                            if (filter.length > 0 && attr.defaultValues[i].value == uniqueValue && attr.uniqueGroup == uniqueGroup) {
                                $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                                break;
                            }
                            else {
                                var dd = $.grep(compositeGroup, function (itm, ind2) {
                                    return itm.groupId == uniqueGroup
                                });
                                if (dd.length == 0) {
                                    compositeGroup.push(groupItem);
                                }
                            }
                            break;

                        }

                    }
                }
                else {
                    //attributeValues.value.push(attr.defaultValue);
                    if (uniqueGroup == null) {
                        var uniqueItem = {
                            uniqueValue: uniqueValue
                        };
                        //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                        //    return (uniqueItem.uniqueValue == attr.defaultValue);
                        //});
                        if (attr.defaultValue == uniqueValue)
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                        //if (filter1.length == 0)
                        //    $scope.uniqueColl.push(uniqueItem);
                    } else {
                        var groupItem = {
                            groupId: uniqueGroup, ItemValue: uniqueValue
                        };
                        var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                            return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                        });
                        if (filter.length > 0 && attr.defaultValue == uniqueValue && attr.uniqueGroup == uniqueGroup)
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                        else {
                            var dd = $.grep(compositeGroup, function (itm, ind2) {
                                return itm.groupId == uniqueGroup
                            });
                            if (dd.length == 0) {
                                compositeGroup.push(groupItem);
                            }
                        }
                    }
                }
            }
            else {
                if (attr.defaultValues != undefined) {
                    for (var i = 0; i < attr.defaultValues.length; i++) {
                        if (uniqueGroup == null) {
                            var uniqueItem = {
                                uniqueValue: uniqueValue
                            };
                            //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                            //    return (uniqueItem.uniqueValue == attr.defaultValues[i].value);
                            //});
                            //if (attr.allowMultipleValues!= undefined && attr.allowMultipleValues.isUnique != null)
                            //{                          
                            if (attr.defaultValues[i].value == uniqueValue) {
                                $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                                break;
                            }
                            // }
                            //if (filter1.length == 0)
                            //    $scope.uniqueColl.push(uniqueItem);

                        } else {
                            var groupItem = {
                                groupId: uniqueGroup, ItemValue: uniqueValue
                            };
                            var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                                return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                            });
                            if (filter.length > 0 && attr.defaultValues[i].value == uniqueValue && attr.uniqueGroup == uniqueGroup)
                                $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                            else {
                                var dd = $.grep(compositeGroup, function (itm, ind2) {
                                    return itm.groupId == uniqueGroup
                                });
                                if (dd.length == 0) {
                                    compositeGroup.push(groupItem);
                                }
                            }
                            break;

                        }
                    }
                }
                else {
                    if (uniqueGroup == null) {
                        var uniqueItem = {
                            uniqueValue: uniqueValue
                        };
                        //var filter1 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
                        //    return (uniqueItem.uniqueValue == attr.defaultValue);
                        //});
                        if (attr.defaultValue == uniqueValue)
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in current Content Object. Duplicate value found in " + attr.name);
                        //if (filter1.length == 0)
                        //    $scope.uniqueColl.push(uniqueItem);
                    } else {
                        var groupItem = {
                            groupId: uniqueGroup, ItemValue: uniqueValue
                        };
                        var filter = $.grep(compositeGroup, function (compItem, compIndex) {
                            return (compItem.groupId == uniqueGroup && compItem.ItemValue == uniqueValue);
                        });
                        if (filter.length > 0 && attr.defaultValue == uniqueValue && attr.uniqueGroup == uniqueGroup)
                            $scope.errorContentObjectdetails.messages.push(uniqueValue + " must be unique in group of current Content Object. Duplicate value found in " + attr.name);
                        else {
                            var dd = $.grep(compositeGroup, function (itm, ind2) {
                                return itm.groupId == uniqueGroup
                            });
                            if (dd.length == 0) {
                                compositeGroup.push(groupItem);
                            }
                        }
                    }
                }
            }
        });

    }


    /* Attribute Set functionality */
    $scope.isValid = function (value) {
        if (value)
            return true;
        return false
    }
    $scope.attributeSets = [];
    $scope.attributeTypeIsString = true;
    $scope.getAllContext = function (option) {
        // alert("option");
        // console.log("option");
        // console.log(option);
        option["contextValues"] = [];
        $.each(option.contextId, function (key, item) {
            var contextItem = {
                contextId: item, Values: []
            };
            textAttributeService.getAllAttributesInLibrary({ domainId: $rootScope.domainIdUi, contentTypeId: item, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (details) {
            //contentObjectService.getAllAttributesInContentType({ id: item, controller: 'textattribute' }).$promise.then(function (details) {
                if (details.length > 0) {

                    $.each(details, function (v, k) {
                        var item = {
                            id: null, name: null, value: null
                        };
                        item.id = k.attributeId;
                        item.name = k.name;
                        contextItem.Values.push(item);
                    });

                }

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
            option.contextValues.push(contextItem);

        });

    }



    $scope.GetCopyAttributePresentation = function (option) {
        // alert("option");
        // console.log("option");
        // console.log(option);
        option["contextValues"] = [];
        $.each(option.contextId, function (key, item) {
            var contextItem = {
                contextId: item, Values: []
            };
            //contentObjectService.GetCopyAttributePresentation({ domainId: $rootScope.domainIdUi, contentTypeId: item, controller: 'contentobject' }).$promise.then(function (details) {
            contentObjectService.GetCopyAttributePresentation({ contentTypeId: item, controller: 'contentobject' }).$promise.then(function (details) {
                if (details.length > 0) {

                    $.each(details, function (v, k) {
                        var item = {
                            id: null, name: null, value: null
                        };
                        item.id = k; //k.attributeId;
                        item.name = k;//k.name;

                        contextItem.Values.push(angular.copy(item));

                    });
                    option.contextValues.push(angular.copy(contextItem));
                }

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


        });

    }

    //$scope.validateandAddUniqueValue = function (uniVal) {
    //    var filter2 = $.grep($scope.uniqueColl, function (uniqueItem, uniqueIndex) {
    //        return (uniqueItem.uniqueValue == uniVal);
    //    });

    //    if (filter2.length == 0)
    //    {
    //        var uniqueItem = { uniqueValue: uniVal };
    //        $scope.uniqueColl.push(uniqueItem);
    //    }

    //};
}]);
function isNumeric(obj) {
    var pattern = /^[0-9.,]+$/;
    return pattern.test(obj);
}
//var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

