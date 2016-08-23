manageitModule.controller("attributeController", ['$scope', '$rootScope', 'attributeService', 'textAttributeService', 'sharedScope', 'sequenceAttributeService',
    'yesNoAttributeService', 'decimalAttributeService', 'listAttributeService', 'subObjectsAttributeService', '$filter',
    'dateTimeAttributeService', 'dateAttributeService', 'timeAttributeService', 'sequenceService', 'integerAttributeService', 'copyAttributeService',
    'subObjectService', 'domainService', '$routeParams', 'uniqueGroupService', 'imageReferenceAttributeService', 'classificationService', 'contentTypeService', 'objectReferenceAttributeService', 'viewuserinterfaceService', 'edituserinterfaceService',
    'imageLibraryService', 'documentLibraryService', 'searchinterfaceService', 'layoutsService', 'dialogModal', 'userinterfaceService',
    function ($scope, $rootScope, attributeService, textAttributeService, sharedScope, sequenceAttributeService, yesNoAttributeService,
        decimalAttributeService, listAttributeService, subObjectsAttributeService, $filter, dateTimeAttributeService, dateAttributeService, timeAttributeService,
        sequenceService, integerAttributeService, copyAttributeService, subObjectService, domainService, $routeParams, uniqueGroupService, imageReferenceAttributeService,
        classificationService, contentTypeService, objectReferenceAttributeService, viewuserinterfaceService, edituserinterfaceService, imageLibraryService, documentLibraryService, searchinterfaceService, layoutsService, dialogModal, userinterfaceService) {
        $scope.attributeScreenName = $routeParams.attributeScreenName ? $routeParams.attributeScreenName : 'Default';
        $scope.myDate = new Date();
        var date = new Date();
        var toUTCDate = function (date1) {
            var date = new Date();
            var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
            return _utc;
        };

        $scope.isSubObject = $routeParams.subObjectId == 0 ? false : true;

        $scope.textAttribute = [];
        $scope.errorAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        sharedScope.store('attributeController', $scope);

        $scope.errorRoleAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };

        $scope.numbersOnly = '/^[0-9]{1,7}$/';
        $scope.maxlength = '3';

        var millisToUTCDate = function (millis) {
            return toUTCDate(new Date(millis));
        };

        $scope.toUTCDate = toUTCDate;
        $scope.millisToUTCDate = millisToUTCDate;


        $scope.wordType = [
            {
                key: 0, value: "Characters"
            },
        {
            key: 1, value: "Words"
        }
        ];

        $scope.formScope = [];

        $scope.setFormScope = function (scope, formName) {
            $scope.formScope[formName] = scope;
            //$scope.formScope = scope;
        }

        $scope.lineFormat = [
            {
                key: 0, value: "Single Line"
            },
        {
            key: 1, value: "Multi Lines"
        }
        ];

        $scope.lineFormatCopy = [
            {
                key: 0, value: "Single Line"
            },
            {
                key: 1, value: "Multi Lines"
            }
        ];

        $scope.attributes = [];

        $scope.uniqueGroup = [];

        $scope.yesnoDefaultValues = [
            {
                key: 0, value: "Accept"
            },
        {
            key: 1, value: "Reject"
        }
        ];
        $scope.yesnoDisplayTypes = [
            {
                key: "0", value: "Checkbox"
            },
            {
                key: "1", value: "Radio Buttons"
            },
            {
                key: "2", value: "Drop Down"
            }
        ];

        //we need to keep in common place to use yes no values
        $scope.yesno = [
            {
                key: "1", value: "Yes"
            },
        {
            key: "0", value: "No"
        }
        ];
        $scope.getvaluelist = function (type, val) {
            // console.log(type);
            //console.log(val);
            if (type == 2) {
                //    console.log('success1');
            }
        }

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

        //modified to be used by all libraries types
        $scope.defaultviewUserinterfaces = function () {

            $scope.viewuserinterfaces = [];

            viewuserinterfaceService.soquery({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $scope.subObjectAttribute.subObjectType }).$promise.then(function (details) {
                var subObjectUserinterfaces = [];
                angular.forEach(details, function (value, key) {
                    subObjectUserinterfaces.push(value);
                });
                $scope.viewuserinterfaces = subObjectUserinterfaces;
            }, function (error) {
                if (error.data != undefined && error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                    });
                }
            });

        }
        $scope.defaulteditUserinterfaces = function () {
            $scope.edituserinterface = [];
            edituserinterfaceService.soquery({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $scope.subObjectAttribute.subObjectType }).$promise.then(function (details) {
                var subObjectUserinterfaces = [];
                angular.forEach(details, function (value, key) {
                    subObjectUserinterfaces.push(value);
                });
                $scope.edituserinterfaces = subObjectUserinterfaces;
            }, function (error) {
                if (error.data != undefined && error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                    });
                }
            });
        }
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
            key: "3", value: "Auto Complete"
        },
        {
            key: "4", value: "Pick List"
        }
        ];
        $scope.displayListInputAs = [
            {
                key: "5", value: "Drop Down"
            },
               {
                   key: "3", value: "Auto Complete"
               },
               {
                   key: "2", value: "Radio Buttons"
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
        $scope.findArrayValueById = function (arr, id) {
            var val = '';
            arr.filter(function (item) {
                if (item.key === id) {
                    val = item.value;
                }
            });
            return val;
        }
        $scope.uniqueGroupCheck = function (attribute, isCheckedChanged) {
            if (attribute.isSingularlyUnique == '1') attribute.uniqueGroup = '';

            if (isCheckedChanged) {
                attribute.isSingularlyUnique = attribute.isUnique ? '1' : '';
                attribute.uniqueGroup = '';
            }
        }

        $scope.multiplesValuesCheckedChanged = function (scope) {
            if (!scope.isAllowMultiValue) {
                scope.isValueUnique = false;
                scope.canValueRearranged = false;
                scope.minNumOfValues = '';
                scope.maxNumOfValues = '';
            }
        }

        $scope.defaultListselections = [
        ];

        //Data for the "Define Data Source" List Option
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

        //Data for the PickList
        $scope.avialablePickList = [{
            key: '1', value: 'Option1'
        }, {
            key: '2', value: 'Option2'
        }, {
            key: '3', value: 'Option3'
        }];
        $scope.selectedPickList = [{
            key: '4', value: 'Option4'
        }];

        $scope.loaded = false;

        $scope.defaultAttributes = function () {

            //get all attributes based on lib and contentType

            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            var allAttribute = {};
            var libraryid = "";
            allAttribute.domainId = contentType.domainId;
            if (contentType.imageLibraryId) {
                libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                libraryid = contentType.contentTypeId
            }
            else {
                libraryid = contentType.documentLibraryId
            }
            var attributeSetId = 0;

            //textAttributeService.getAllAttributesInLibrary({ domainId: contentType.domainId, id: libraryid, attributeSetId: 0, attributeType: 'attribute' }).$promise.then(function (details) {

            // textAttributeService.getAllAttributesInContentType({ id: $routeParams.contentTypeId, attributeType: 'textattribute' }).$promise.then(function (details) {

            textAttributeService.getAllAttributesInLibrary({ domainId: contentType.domainId, contentTypeId: libraryid, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (details) {

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
                $scope.loaded = true;
                if ($routeParams.subObjectId == "0") {
                    if ($routeParams.attributeSetId == "0") {
                        $scope.attributes = contentTypeDefaultAttributes;
                    }
                    else {
                        $scope.attributes = contentTypeAttributeSetAttributes;
                    }
                }
                else {
                    $scope.attributes = subObjectDefaultAttributes;
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
        }

        $scope.sortableOptionsA = {

            stop: function (e, ui) {
                $scope.errors = [];
                $scope.resetErrorDirective($scope.errorAttribute);
                var item = ui.item.scope().attr;
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
                ui.item.scope().$parent.attributes = $filter('orderBy')(ui.item.scope().$parent.attributes, 'orderNo');
                var currentAttributeId = ui.item.scope().$parent.attributes[fromIndex].attributeId;
                var previousAttributeId = ui.item.scope().$parent.attributes[toIndex].attributeId;
                var AttributeSetId = $routeParams.attributeSetId;
                var SubObjectId = $routeParams.subObjectId;
                var startOrderNo = ui.item.scope().$parent.attributes[fromIndex].orderNo;
                var endOrderNo = ui.item.scope().$parent.attributes[toIndex].orderNo;


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


                //var updateorderno = { ContentTypeId: conTypeId, CurrentAttributeId: currentAttributeId, PreviousAttributeId: previousAttributeId, AttributeSetId: AttributeSetId, SubObjectId: SubObjectId };

                var updateorderno = { ContentTypeId: conTypeId, startOrderNo: startOrderNo, endOrderNo: endOrderNo, AttributeSetId: AttributeSetId, SubObjectId: SubObjectId };

                textAttributeService.updateOrderNo({ attributeType: 'textattribute' }, updateorderno).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("Attribute order updated successfully");
                        $scope.defaultAttributes();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errorsText.push(value.message);
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.messages.push(value.message);
                            $scope.errorAttribute.moreDetails = value.moreDetails;
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


        $scope.contentTypeClassifications = [{ key: "100", value: "Any Classification" }];

        $scope.getClassificationsByContentTypeId = function () {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            var contentImageDocLibId = "";
            if (contentType.contentTypeid)
            { contentImageDocLibId = contentType.contentTypeId; }
            else if (contentType.imageLibraryId)
            { contentImageDocLibId = contentType.imageLibraryId; }
            else if (contentType.documentLibraryId)
            { contentImageDocLibId = contentType.documentLibraryId; }

            classificationService.queryAll({ domainId: contentType.domainId, id: contentImageDocLibId }).$promise.then(function (details) {
                angular.forEach(details, function (value, key) {
                    var obj = { key: value.classificationId, value: value.classificationName };
                    $scope.contentTypeClassifications.push(obj);
                });
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


        //**************************************** Default values for Date & Time Attribute screen Start ********************************************

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
        //**************************************** Date& Time Attribute Calendar related functions start *******************************
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
            var seconds = getTime[2] != undefined ? (parseInt(getTime[2]).toString().length > 1 ? parseInt(getTime[2]) : ('0' + parseInt(getTime[2]))) : "00";
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
                    $scope.datTimeGlobalFormat = (formattedHours.toString().length > 1 ? formattedHours : ('0' + formattedHours)) + ':' + (formatDate.getMinutes().toString().length > 1 ? formatDate.getMinutes() : ('0' + formatDate.getMinutes())) + ':' + formatDate.getSeconds();
                }
                else if (check_pm > -1) {
                    $scope.datTimeGlobalFormat = (formattedHours.toString().length > 1 ? formattedHours : ('0' + formattedHours)) + ':' + (formatDate.getMinutes().toString().length > 1 ? formatDate.getMinutes() : ('0' + formatDate.getMinutes())) + ':' + formatDate.getSeconds();
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
                $scope.datTimeGlobalFormat = (ampm_hours.toString().length > 1 ? ampm_hours : '0' + ampm_hours) + ':' + minutes + ':' + (seconds != null ? seconds : formatDate.getSeconds()) + ' ' + (check_am > -1 ? 'am' : (check_pm > -1 ? 'pm' : (ampm == 'am' ? 'am' : 'pm')));

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
            if (formName == 'dateTime') {
                //if (Key == 0) {
                //    $scope.dateTimeAttribute.minDateTimeValues.timeOffset = 1;
                //    $scope.dateTimeAttribute.minDateTimeValues.time = $scope.dateTimeAttribute.minDateTimeValues.time != undefined ? $scope.dateTimeAttribute.minDateTimeValues.time : defaultTime;
                //    $scope.dateTimeAttribute.minDateTimeValues.time = $scope.timeFormatter($scope.dateTimeAttribute.timeFormat, $scope.dateTimeAttribute.minDateTimeValues.time);
                //    $scope.dateTimeAttribute.minDateTimeValues.date = $scope.dateTimeAttribute.minDateTimeValues.date != undefined ? $scope.dateTimeAttribute.minDateTimeValues.date : new Date();
                //    $scope.dateTimeFormat = $scope.formats[$scope.dateTimeAttribute.dateFormat];
                //}
                //if (Key == 1) {
                //    $scope.dateTimeAttribute.maxDateTimeValues.timeOffset = 1;
                //    $scope.dateTimeAttribute.maxDateTimeValues.time = $scope.dateTimeAttribute.maxDateTimeValues.time != undefined ? $scope.dateTimeAttribute.maxDateTimeValues.time : defaultTime;
                //    $scope.dateTimeAttribute.maxDateTimeValues.time = $scope.timeFormatter($scope.dateTimeAttribute.timeFormat, $scope.dateTimeAttribute.maxDateTimeValues.time);
                //    $scope.dateTimeAttribute.maxDateTimeValues.date = $scope.dateTimeAttribute.maxDateTimeValues.date != undefined ? $scope.dateTimeAttribute.maxDateTimeValues.date : new Date();
                //    $scope.dateTimeFormat = $scope.formats[$scope.dateTimeAttribute.dateFormat];
                //}
                //if (Key == 2) {
                //    $scope.dateTimeAttribute.defaultDateTimeValues.timeOffset = 1;
                //    $scope.dateTimeAttribute.defaultDateTimeValues.time = $scope.dateTimeAttribute.defaultDateTimeValues.time != undefined ? $scope.dateTimeAttribute.defaultDateTimeValues.time : defaultTime;
                //    $scope.dateTimeAttribute.defaultDateTimeValues.time = $scope.timeFormatter($scope.dateTimeAttribute.timeFormat, $scope.dateTimeAttribute.defaultDateTimeValues.time);
                //    $scope.dateTimeAttribute.defaultDateTimeValues.date = $scope.dateTimeAttribute.defaultDateTimeValues.date != undefined ? $scope.dateTimeAttribute.defaultDateTimeValues.date : new Date();
                //    $scope.dateTimeFormat = $scope.formats[$scope.dateTimeAttribute.dateFormat];
                //}
            }
            else if (formName == 'date') {
                //if (Key == 0) {
                //    $scope.dateAttribute.minDateTimeValues.timeOffset = 1;
                //    $scope.dateAttribute.minDateTimeValues.date = $scope.dateAttribute.minDateTimeValues.date != undefined ? $scope.dateAttribute.minDateTimeValues.date : new Date();
                //    $scope.dateFormat = $scope.formats[$scope.dateAttribute.dateFormat];
                //}
                //if (Key == 1) {
                //    $scope.dateAttribute.maxDateTimeValues.timeOffset = 1;
                //    $scope.dateAttribute.maxDateTimeValues.date = $scope.dateAttribute.maxDateTimeValues.date != undefined ? $scope.dateAttribute.maxDateTimeValues.date : new Date();
                //    $scope.dateFormat = $scope.formats[$scope.dateAttribute.dateFormat];
                //}
                //if (Key == 2) {
                //    $scope.dateAttribute.defaultDateTimeValues.timeOffset = 1;
                //    $scope.dateTimeAttribute.defaultDateTimeValues.date = $scope.dateAttribute.defaultDateTimeValues.date != undefined ? $scope.dateAttribute.defaultDateTimeValues.date : new Date();
                //    $scope.dateFormat = $scope.formats[$scope.dateAttribute.dateFormat];
                //}
            }
            else if (formName == 'time') {
                //if (Key == 0) {
                //    $scope.timeAttribute.minDateTimeValues.timeOffset = 1;
                //    $scope.timeAttribute.minDateTimeValues.time = $scope.timeAttribute.minDateTimeValues.time != undefined ? $scope.timeAttribute.minDateTimeValues.time : defaultTime;
                //    $scope.timeAttribute.minDateTimeValues.time = $scope.timeFormatter($scope.timeAttribute.timeFormat, $scope.timeAttribute.minDateTimeValues.time);
                //}
                //if (Key == 1) {
                //    $scope.timeAttribute.maxDateTimeValues.timeOffset = 1;
                //    $scope.timeAttribute.maxDateTimeValues.time = $scope.timeAttribute.maxDateTimeValues.time != undefined ? $scope.timeAttribute.maxDateTimeValues.time : defaultTime;
                //    $scope.timeAttribute.maxDateTimeValues.time = $scope.timeFormatter($scope.timeAttribute.timeFormat, $scope.timeAttribute.maxDateTimeValues.time);
                //}
                //if (Key == 2) {
                //    $scope.timeAttribute.defaultDateTimeValues.timeOffset = 1;
                //    $scope.timeAttribute.defaultDateTimeValues.time = $scope.timeAttribute.defaultDateTimeValues.time != undefined ? $scope.timeAttribute.defaultDateTimeValues.time : defaultTime;
                //    $scope.timeAttribute.defaultDateTimeValues.time = $scope.timeFormatter($scope.timeAttribute.timeFormat, $scope.timeAttribute.defaultDateTimeValues.time);
                //}
            }
        }
        //**************************************** Date& Time Attribute Calendar related functions  *******************************
        //**************************************** Default values for Date & Time Attribute screen End ********************************************

        //**************************************** Common  Logical flow through start for all attributes********************************************

        $scope.isAddAttribute = false;
        $scope.isTextAttribute = false;
        $scope.isSequenceAttribute = false;
        $scope.isYesNoAttribute = false;
        $scope.isdecimalAttribute = false;
        $scope.isListAttribute = false;
        $scope.isSubObjectAttribute = false;
        $scope.isDefineListValues = false;
        $scope.isDatetimeAttribute = false;
        $scope.isDateAttribute = false;
        $scope.isTimeAttribute = false;
        $scope.isCopyAttribute = false;
        $scope.isCopyAttributeField = false;
        $scope.isImageReferenceAttribute = false;


        $scope.editAttribute = function (attribute) {

            $scope.resetErrorDirective($scope.errorAttribute);
            if ((attribute.contentTypeId != '' || attribute.imageLibraryId != '' || attribute.documentLibraryId != '') && attribute.attributeId != '') {
                switch (attribute.attributeType) {
                    case 'TextAttribute': $scope.editTextAttribute(attribute); break;
                    case 'SequenceAttribute': $scope.editSequenceAttribute(attribute); break;
                    case 'CopyAttribute': $scope.editCopyAttribute(attribute); break;
                    case 'YesNoAttribute': $scope.editYesNoAttribute(attribute); break;
                    case 'DecimalAttribute': $scope.formName = 'Decimal'; $scope.editDecimalAttribute(attribute); break;
                    case 'SubObjectAttribute': $scope.editSubObjectAttribute(attribute); break;
                    case 'ListAttribute': $scope.editListAttribute(attribute); break;
                    case 'DateTimeAttribute': $scope.editDateTimeAttribute(attribute); break;
                    case 'DateAttribute': $scope.editDateAttribute(attribute); break;
                    case 'TimeAttribute': $scope.editTimeAttribute(attribute); break;
                    case 'IntegerAttribute': $scope.formName = 'Integer'; $scope.editDecimalAttribute(attribute); break;
                    case 'ObjectReferenceAttribute': $scope.editObjectReferenceAttribute(attribute); break;
                    case 'ImageReferenceAttribute': $scope.editImageReferenceAttribute(attribute); break;
                    case 'DocumentReferenceAttribute': $scope.editDocumentReferenceAttribute(attribute); break;
                }
            }
        }
        $scope.deleteAttribute = function (attribute) {
            $scope.errors = [];
            $scope.errorsText = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            // delete text attribute based on contenttype and library
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            attribute.domainId = contentType.domainId
            attribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            attribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            attribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

            if ((attribute.contentTypeId != '' || attribute.imageLibraryId != '' || attribute.documentLibraryId != '') && attribute.attributeId != '') {

                // added condition to not allow to delete the default attribute created while creating image library.

                if (contentType.imageLibraryId) {

                    if (contentType.identifier === attribute.identifier) {
                        $scope.errorAttribute.messages.push("Its default attribute we could not delete this");
                        $scope.errorAttribute.isSuccess = true;
                        return false;
                    }
                    else {
                        //textAttributeService.remove({ attributeType: 'textattribute', id: attribute.attributeId }, attribute).$promise.then(function (response) {
                        textAttributeService.removeLib({ attributeType: 'textattribute', domainId: contentType.domainId }, attribute).$promise.then(function (response) {

                            if (response.$resolved == true) {
                                $scope.errorAttribute.messages.push("Attribute deleted successfully");
                                $scope.errorAttribute.isSuccess = true;
                                $scope.defaultAttributes();
                            }
                        }, function (error) {

                            if (error.data.errorMessage) {
                                angular.forEach(error.data.errorMessage, function (value, key) {

                                    $scope.errorAttribute.messages.push(value.message);
                                    $scope.errorAttribute.moreDetails = value.moreDetails;
                                    $scope.errorAttribute.isError = true;

                                });
                            }
                            else {
                                $scope.errorAttribute.messages.push("Error occured while deleting the Attribute. Please try after sometime.");
                                $scope.errorAttribute.isError = true;
                            }
                        });
                    }
                }
                if (!contentType.imageLibraryId) {
                    //textAttributeService.remove({ attributeType: 'textattribute', id: attribute.attributeId }, attribute).$promise.then(function (response) {
                    textAttributeService.removeLib({ attributeType: 'textattribute', domainId: contentType.domainId }, attribute).$promise.then(function (response) {

                        if (response.$resolved == true) {
                            $scope.errorAttribute.messages.push("Attribute deleted successfully");
                            $scope.errorAttribute.isSuccess = true;
                            $scope.defaultAttributes();
                        }
                    }, function (error) {

                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {

                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;

                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while deleting the Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        }
        $scope.deleteModalAttribute = function (attribute, status) {
            if (status == 'confirmed') {
                $scope.errors = [];
                $scope.errorsText = [];
                $scope.resetErrorDirective($scope.errorAttribute);
                if (attribute.contentTypeId != '' && attribute.attributeId != '') {
                    var attributeServiceInstance;
                    var attributeType;
                    if (attribute.attributeType == 'DateTimeAttribute') {
                        attributeServiceInstance = dateTimeAttributeService;
                        attributeType = 'datetimeattribute';
                    }
                    else if (attribute.attributeType == 'IntegerAttribute') {
                        attributeServiceInstance = integerAttributeService;
                        attributeType = 'integerattribute';
                    }
                    else if (attribute.attributeType == 'YesNoAttribute') {
                        attributeServiceInstance = yesNoAttributeService;
                        attributeType = 'datetimeattribute';
                    }
                    else if (attribute.attributeType == 'TextAttribute') {
                        attributeServiceInstance = textAttributeService;
                        attributeType = 'textattribute';
                    }
                    else if (attribute.attributeType == 'DecimalAttribute') {
                        attributeServiceInstance = decimalAttributeService;
                        attributeType = 'decimalattribute';
                    }
                    else if (attribute.attributeType == 'DateAttribute') {
                        attributeServiceInstance = dateAttributeService;
                        attributeType = 'dateattribute';
                    }
                    else if (attribute.attributeType == 'TimeAttribute') {
                        attributeServiceInstance = timeAttributeService;
                        attributeType = 'timeattribute';
                    }

                    attributeServiceInstance.remove({ attributeType: attributeType, id: attribute.attributeId }, attribute).$promise.then(function (response) {

                        if (response.$resolved == true) {
                            $scope.errorAttribute.messages.push("Attribute deleted successfully");
                            $scope.errorAttribute.isSuccess = true;
                            $scope.defaultAttributes();
                        }
                    }, function (error) {

                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {

                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;

                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while deleting the Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
                $scope.isDeleteErrorScreen = false;
            }
            else {
                $scope.deletingAttribute = attribute;
                $scope.isDeleteErrorScreen = true;
            }

        }
        $scope.deleteYesNoAttribute = function (attribute) {
            $scope.errors = [];
            $scope.errorsText = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if (attribute.contentTypeId != '' && attribute.attributeId != '') {

                // delete yes/no attribute based on contenttype and library

                //var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                //attribute.domainId = contentType.domainId
                //attribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                //attribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                //attribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                // yesNoAttributeService.remove(attribute).$promise.then(function (response) {



                yesNoAttributeService.remove({ attributeType: 'yesnoattribute', id: attribute.attributeId }, attribute).$promise.then(function (response) {

                    if (response.$resolved == true) {
                        $scope.errorAttribute.messages.push("Attribute deleted successfully");
                        $scope.errorAttribute.isSuccess = true;
                        $scope.defaultAttributes();
                    }
                }, function (error) {

                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {

                            $scope.errorAttribute.messages.push(value.message);
                            $scope.errorAttribute.moreDetails = value.moreDetails;
                            $scope.errorAttribute.isError = true;

                        });
                    }
                    else {
                        $scope.errorAttribute.messages.push("Error occured while deleting the Attribute. Please try after sometime.");
                        $scope.errorAttribute.isError = true;
                    }
                });
            }

            //if (confirm("Are you sure you want to delete " + attribute.attributeType.replace('Attribute', ' Attribute') + "?")) {



            //switch (attribute.attributeType) {
            //    case 'TextAttribute': $scope.deleteTextAttribute(attribute); break;
            //    case 'SequenceAttribute': $scope.deleteSequenceAttribute(attribute); break;
            //    case 'CopyAttribute': $scope.deleteCopyAttribute(attribute); break;
            //    case 'YesNoAttribute': $scope.deleteYesNoAttribute(attribute); break;
            //    case 'DecimalAttribute': $scope.formName = 'Decimal'; $scope.deleteDecimalAttribute(attribute); break;
            //    case 'SubObjectAttribute': $scope.deleteSubObjectAttribute(attribute); break;
            //    case 'ListAttribute': $scope.deleteListAttribute(attribute); break;
            //    case 'DateTimeAttribute': $scope.deleteDateTimeAttribute(attribute); break;
            //    case 'DateAttribute': $scope.deleteDateAttribute(attribute); break;
            //    case 'TimeAttribute': $scope.deleteTimeAttribute(attribute); break;
            //    case 'IntegerAttribute': $scope.formName = 'Integer'; $scope.deleteDecimalAttribute(attribute); break;
            //    case 'ImageReferenceAttribute': $scope.deleteImageReferenceAttribute(attribute); break;
            //    case 'DocumentReferenceAttribute': $scope.deleteDocumentReferenceAttribute(attribute); break;
            //}
            // }
        }



        $scope.deriveIdentifierFromId = function (currentScope) {
            var char1 = currentScope.identifier.substr(0, 1).toLowerCase();;
            var restvalue = currentScope.identifier.substr(1, currentScope.identifier.length);
            currentScope.identifier = char1 + restvalue;
        }

        $scope.showDefineUnigueGroup = function () {
            $scope.isDefineUniqueGroup = true;
        }

        $scope.clearUniqueGroupValues = function () {
            $scope.errorsUniqueGroup = [];
            $scope.formScope.defineUniqueGroupAttributeForm.uniqGroup = {};
        }

        $scope.closeAlert = function (index) {
            $scope.errorsUniqueGroup.splice(index, 1);
        };

        $scope.saveDefineUniqueGroup = function (uniqueObj) {
            $scope.errorsUniqueGroup = [];
            if (uniqueObj.name.trim().length > 0) {
                var uniqueGroup = { contentTypeId: $routeParams.contentTypeId, uniqueGroupName: uniqueObj.name };
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                uniqueGroupService.create(uniqueGroup, { domainId: contentType.domainId }).$promise.then(function (response) {
                    if (response.$resolved == true && response.uniqueGroupId != "") {
                        $scope.uniqueGroup.push(response);
                        $('#defineUniqueGroupAttribute').hide();
                        $scope.formScope.defineUniqueGroupAttributeForm.uniqGroup = {};
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errorsUniqueGroup.push(value.message);
                        });
                    }
                    else {
                        $scope.errorsUniqueGroup.push("Error occured while saving the unique group. Please try after sometime.");
                    }
                });
            }
            else { $scope.errorsUniqueGroup.push("Unique Group Name is required"); }
        }

        $scope.getDefineUniqueGroup = function () {
            uniqueGroupService.query({ id: $routeParams.contentTypeId }).$promise.then(function (response) {
                if (response.$resolved == true) {
                    angular.forEach(response, function (value, key) {
                        $scope.uniqueGroup.push(value);
                    });
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errorsText.push(value.message);
                    });
                }
                else {
                    $scope.errorsText.push("Error occured while fetching the unique group. Please try after sometime.");
                }
            });
        }

        $scope.deriveIdentifier = function (attribute) {
            if (attribute.attributeId == '') {
                attribute.identifier = $filter('camelize')(attribute.name);
            }
        }

        $scope.closeBackDrop = function (attributeType) {
            $(attributeType).hide();
            $('.modal-backdrop').hide();

            if ($('#addAttribute')) {
                $('#addAttribute').hide();
                $('.modal-backdrop').hide();
            }
        }

        $scope.validateAttribute = function (attributeModel, errorCntrl, attributeType) {
            errorCntrl = $scope.errorAttribute;
            var errorObj = errorCntrl.messages;
            if (attributeModel.name == null || attributeModel.name == '' || attributeModel.name == undefined) {
                errorObj.push("Name is required");
            }
            if (attributeModel.identifier == null || attributeModel.identifier == undefined || attributeModel.identifier == '') {
                errorObj.push("Identifier is required");
            }
            if (attributeModel.name != null && attributeModel.name.length > 64) {
                errorObj.push("Name must be between 1 and 64 characters");
            }
            if (attributeModel.identifier != null && attributeModel.identifier.length > 64) {
                errorObj.push("Identifier must be between 1 and 64 characters");
            }
            if (attributeModel.isSingularlyUnique == "0" && attributeModel.uniqueGroup == '') {
                errorObj.push("Unique Group is required");
            }
            var numMin = parseInt(attributeModel.minNumOfValues);
            var numMax = parseInt(attributeModel.maxNumOfValues);
            if (numMin < 0 || numMin > 999) {
                errorObj.push("Minimum # of values must be between 0 and 999");
            }
            else if (numMax <= 0 || numMax > 999) {
                errorObj.push("Maximum # of values must be between 1 and 999");
            } else if (numMin > numMax) {
                errorObj.push("Minimum # of values must be Less than Maximum # of values");
            }
            if (attributeType == "text") {
                $scope.validateTextAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == "datetime") {
                $scope.validateDateTimeAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == "list") {
                if (attributeModel.isAllowMultiValue == true) {
                    $scope.validateListAttribute(attributeModel, errorObj, attributeType);
                }
            }
            if (attributeType == "date") {
                $scope.validateDateTimeAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == "time") {
                $scope.validateDateTimeAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == "decimal") {
                $scope.validateDecimalAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == "yesno") {
                $scope.validateYesNoAttribute(attributeModel, errorObj, attributeType);

            }
            if (attributeType == "documentReference") {
                $scope.validatedocumentReferenceAttribute(attributeModel, errorObj, attributeType);
            }
            if (attributeType == "imageRef") {
                $scope.validateImageReferenceAttribute(attributeModel, errorObj, attributeType);
            }
            if (attributeType == "objectRef") {
                $scope.validateObjectReferenceAttribute(attributeModel, errorObj, attributeType);
            }
            if (attributeType == "copy") {
                $scope.validateCopyAttribute(attributeModel, errorObj, attributeType);
            }
            if (errorObj.length > 0) {
                errorCntrl.isError = true;
                errorCntrl.isHide = true;
                return false;
            }
            return true;
        }

        $scope.validateCopyAttribute = function (attributeModel, errorObj, attributeType) {
            //var isSelected = false;
            //if ($scope.SelectedContextIds) {
            //    angular.forEach($scope.SelectedContextIds, function (value, key) { if (value && !isSelected) { isSelected = true; } });
            //}
            //if (isSelected) {
            //    errorObj.push("Please select atleast one context type.");
            //}
        }

        $scope.validateTextAttribute = function (attributeModel, errorObj, attributeType) {
            var num = parseInt(attributeModel.fieldWidth);
            if (num < 10 || num > 2000) {
                errorObj.push("Field Width must be between 10 and 2000");
            }
            if (isNaN(num)) {
                errorObj.push("Field Width is required");
            }
            var minlength = parseInt(attributeModel.minimumLength);
            if (minlength < 10 || minlength > 2000) {
                errorObj.push("Minimum Length must be between 10 and 2000");
            }
            var maxlength = parseInt(attributeModel.maximumLength);
            if (maxlength < 10 || maxlength > 2000) {
                errorObj.push("Maximum Length must be between 10 and 2000");
            }
            if (minlength > maxlength && attributeModel.minWordType == attributeModel.maxWordType) {
                errorObj.push("Minimum Length must be less than Maximum Length");
            }
            if (isNaN(minlength) && attributeModel.minWordType != null && typeof attributeModel.minWordType != 'undefined' && attributeModel.minWordType >= 0) {
                errorObj.push("Minimum Length is required");
            }
            if (isNaN(maxlength) && attributeModel.maxWordType != null && typeof attributeModel.maxWordType != 'undefined' && attributeModel.maxWordType >= 0) {
                errorObj.push("Maximum Length is required");
            }
            if (minlength > 0 && (attributeModel.minWordType != 0 && attributeModel.minWordType != 1)) {
                errorObj.push("Minimum Length Type is required");
            }
            if (maxlength > 0 && (attributeModel.maxWordType != 0 && attributeModel.maxWordType != 1)) {
                errorObj.push("Maximum Length Type is required");
            }
        }
        $scope.validateDecimalAttribute = function (attributeModel, errorObj, attributeType) {
            var num = parseInt(attributeModel.fieldWidth);
            var minNum = attributeModel.minimumvalue;
            var maxNum = attributeModel.maximumvalue;
            var decimalPlaces = attributeModel.decimalplaces;
            var defaultvalue = attributeModel.defaultvalue;
            if (num < 10 || num > 2000) {
                errorObj.push("Field Width must be between 10 and 2000");
            }
            //if (minNum == null || minNum == undefined) {
            //    errorObj.push("Minimum Value is required");
            //}
            //if (maxNum == null || maxNum == undefined) {
            //    errorObj.push("Maximum Value is required");
            //}
            if ((minNum != null || minNum != undefined) && (maxNum != null || maxNum != undefined) && minNum > maxNum) {
                errorObj.push("Minimum Value must be less than Maximum Value");
            }
            if (minNum < -9999.999999999 && minNum > 9999.999999999) {
                errorObj.push("Minimum Value must be -9999.999999999 to 9999.999999999");
            }
            if (maxNum < -9999.999999999 && maxNum > 9999.999999999) {
                errorObj.push("Maximum Value must be -9999.999999999 to 9999.999999999");
            }
            if (defaultvalue < -9999.999999999 && defaultvalue > 9999.999999999) {
                errorObj.push("Default value must be -9999.999999999 to 9999.999999999");
            }
            if (decimalPlaces < -9999.999999999 || decimalPlaces > 9999.999999999) {
                errorObj.push("Decimal Places value must be -9999.999999999 to -9999.999999999");
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
            if (attributeModel.listType == "1") {
                if (attributeModel.minNumOfValues > $scope.selectedListValueOptions.length) {
                    errorObj.push("Default selected value must equal or gratter than minimum value ");
                }
                if (attributeModel.maxNumOfValues < $scope.selectedListValueOptions.length) {
                    errorObj.push("Default selected value must equal or less than maximum value ");
                }
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
                        errorObj.push("Minimum Date Required.Must be " + datePlaceHolder);
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
                        errorObj.push("Minimum Time Required.Must be " + timePlaceHolder);
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
        $scope.validatedocumentReferenceAttribute = function (attributeModel, errorObj, attributeType) {
            if (attributeModel.selectedDocTypes) {
                if (attributeModel.selectedDocTypes.length == 0 && attributeModel.docApplyType == "2") {
                    $scope.errorAttribute.messages.push("Accepted document types are required");
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.isHide = true;
                }
            }
        }

        $scope.validateImageReferenceAttribute = function (attributeModel, errorObj, attributeType) {
            if (attributeModel.selectedImageLibraryTypes) {
                if (attributeModel.selectedImageLibraryTypes.length == 0 && attributeModel.imageApplyType == "2") {
                    $scope.errorAttribute.messages.push("Accepted image types are required");
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.isHide = true;
                }
            }
        }
        $scope.validateObjectReferenceAttribute = function (attributeModel, errorObj, attributeType) {
            if (attributeModel.selectedObjectContentTypes) {
                if (attributeModel.selectedObjectContentTypes.length == 0 && attributeModel.referenceApplyType == "2") {
                    $scope.errorAttribute.messages.push("Accepted Content types are required");
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.isHide = true;
                }
            }
        }

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
        }
        $scope.showSuccessMessage = function (attModel, message) {
            attModel.messages.push(message);
            attModel.isSuccess = true;
        }
        //**************************************** Common  Logical flow through end for all attributes********************************************


        //**************************************** Text Attribute  Logical flow through start ********************************************

        $scope.textAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
            maxNumOfValues: null, format: null, fieldWidth: null, minimumLength: null, maximumLength: null, minWordType: null, maxWordType: null, defaultValue: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        $scope.clearTextAttributeFields = function () {
            $scope.errors = [];
            $scope.errorsText = [];
            $scope.isTextAttribute = true;
            $scope.action = "Add";
            $scope.readonly = false;
            $scope.textAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null, format: $scope.lineFormat[0].key, fieldWidth: null, minimumLength: null, maximumLength: null,
                minWordType: null, maxWordType: null, defaultValue: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }


        $scope.clearTextAttributeFieldsAfterSave = function () {
            $scope.errorsText = [];
            $scope.textAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null, format: null, fieldWidth: null, minimumLength: null, maximumLength: null, minWordType: null, maxWordType: null, defaultValue: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }

        $scope.saveTextAttribute = function (textAttribute) {

            $scope.errors = [];
            $scope.errorsText = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(textAttribute, $scope.errorAttribute, 'text')) {
                //create an instance of the factory
                var newAttribute = new textAttributeService();

                //add text attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newAttribute.domainId = contentType.domainId;
                newAttribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newAttribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newAttribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                // newAttribute.contentTypeId = $routeParams.contentTypeId;
                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.orderNo = textAttribute.orderNo;
                newAttribute.attributeSetName = $routeParams.attributeScreenName;

                if (textAttribute.attributeId == '') {
                    newAttribute.name = textAttribute.name;
                    newAttribute.identifier = textAttribute.identifier;
                    newAttribute.mandatory = textAttribute.isMandatory;
                    newAttribute.readOnly = textAttribute.isReadOnly;
                    newAttribute.uniqueValues = textAttribute.isUnique;
                    if (textAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = textAttribute.uniqueGroup;
                    }
                    newAttribute.description = textAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: textAttribute.isAllowMultiValue, isUnique: textAttribute.isValueUnique,
                        isReArranged: textAttribute.canValueRearranged, minimumValue: textAttribute.minNumOfValues, maximumValue: textAttribute.maxNumOfValues
                    };

                    newAttribute.format = textAttribute.format;
                    newAttribute.fieldWidth = textAttribute.fieldWidth;
                    newAttribute.minimumLength = textAttribute.minimumLength;
                    newAttribute.maximumLength = textAttribute.maximumLength;
                    newAttribute.minWordType = textAttribute.minWordType;
                    newAttribute.maxWordType = textAttribute.maxWordType;
                    newAttribute.defaultValue = textAttribute.defaultValue;

                    newAttribute.createdBy = $rootScope.manageITUserName;
                    // newAttribute.createdDate = new Date();
                    console.log(JSON.stringify(newAttribute));
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    textAttributeService.createLib({ attributeType: 'textattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearTextAttributeFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Text Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#TextAttribute');

                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Text Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    newAttribute.attributeId = textAttribute.attributeId;
                    newAttribute.name = textAttribute.name;
                    newAttribute.identifier = textAttribute.identifier;
                    newAttribute.mandatory = textAttribute.isMandatory;
                    newAttribute.readOnly = textAttribute.isReadOnly;
                    newAttribute.uniqueValues = textAttribute.isUnique;
                    if (textAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = textAttribute.uniqueGroup;
                    }
                    newAttribute.description = textAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: textAttribute.isAllowMultiValue, isUnique: textAttribute.isValueUnique,
                        isReArranged: textAttribute.canValueRearranged, minimumValue: textAttribute.minNumOfValues, maximumValue: textAttribute.maxNumOfValues
                    };

                    newAttribute.format = textAttribute.format;
                    newAttribute.fieldWidth = textAttribute.fieldWidth;
                    newAttribute.minimumLength = textAttribute.minimumLength;
                    newAttribute.maximumLength = textAttribute.maximumLength;
                    newAttribute.minWordType = textAttribute.minWordType;
                    newAttribute.maxWordType = textAttribute.maxWordType;
                    newAttribute.defaultValue = textAttribute.defaultValue;

                    newAttribute.updatedBy = $rootScope.manageITUserName;
                    //newAttribute.updatedDate = new Date();
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    textAttributeService.updateLib({ attributeType: 'textattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearTextAttributeFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Text Attribute updated successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#TextAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Text Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        }

        $scope.deleteTextAttribute = function (selectedAttr) {
            $scope.errors = [];
            $scope.errorsText = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            console.log('sdsd');
            if (selectedAttr.attributeId && selectedAttr.attributeId != '') {
                console.log('if');
                var attribute = selectedAttr;

                // delete text attribute based on contenttype and library
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                attribute.domainId = contentType.domainId
                attribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                attribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                attribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                textAttributeService.removeLib({ attributeType: 'textattribute', domainId: contentType.domainId }, attribute).$promise.then(function (response) {

                    // textAttributeService.remove({ attributeType: 'textattribute' }, attribute).$promise.then(function (response) {

                    if (response.$resolved == true) {
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("Text Attribute deleted successfully");
                        $scope.defaultAttributes();
                    }
                }, function (error) {

                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errorAttribute.messages.push(value.message);
                            $scope.errorAttribute.moreDetails = value.moreDetails;
                            $scope.errorAttribute.isError = true;
                        });
                    }
                    else {
                        $scope.errorAttribute.messages.push("Error occured while deleting the Text Attribute. Please try after sometime.");
                        $scope.errorAttribute.isError = true;
                    }
                });
            }
        }

        $scope.editTextAttribute = function (textAttribute) {
            //$("#TextAttribute").modal({ backdrop: true });
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.action = "Edit";
            $scope.readonly = true;
            $scope.errors = [];
            $scope.isTextAttribute = true;
            $scope.textAttribute.attributeId = textAttribute.attributeId;
            $scope.textAttribute.name = textAttribute.name;
            $scope.textAttribute.identifier = textAttribute.identifier;
            $scope.textAttribute.isMandatory = textAttribute.mandatory;
            $scope.textAttribute.isReadOnly = textAttribute.readOnly;
            $scope.textAttribute.isUnique = textAttribute.uniqueValues;
            $scope.textAttribute.uniqueGroup = textAttribute.uniqueGroup;
            $scope.textAttribute.description = textAttribute.description;
            $scope.textAttribute.isAllowMultiValue = textAttribute.multipleValues.allowMultipleValues;
            $scope.textAttribute.isValueUnique = textAttribute.multipleValues.isUnique;
            if (textAttribute.uniqueValues)
                $scope.textAttribute.isSingularlyUnique = textAttribute.isSingularityUnique == true ? 1 : 0;
            else $scope.textAttribute.isSingularlyUnique = '';
            $scope.textAttribute.canValueRearranged = textAttribute.multipleValues.isReArranged;
            $scope.textAttribute.minNumOfValues = textAttribute.multipleValues.minimumValue;
            $scope.textAttribute.maxNumOfValues = textAttribute.multipleValues.maximumValue;

            $scope.textAttribute.format = textAttribute.format;
            $scope.textAttribute.fieldWidth = textAttribute.fieldWidth;
            $scope.textAttribute.minimumLength = textAttribute.minimumLength;
            $scope.textAttribute.maximumLength = textAttribute.maximumLength;
            $scope.textAttribute.minWordType = textAttribute.minWordType;
            $scope.textAttribute.maxWordType = textAttribute.maxWordType;
            $scope.textAttribute.defaultValue = textAttribute.defaultValue;
            $scope.textAttribute.orderNo = textAttribute.orderNo;

        }



        //**************************************** Text Attribute  Logical flow through end ********************************************

        //**************************************** Sequence Attribute  Logical flow through start ********************************************
        $scope.sequenceAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null,
            isSingularlyUnique: null, //isCompositeUnique: false,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
            maxNumOfValues: null,
            sequenceGenerator: '',
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        $scope.sequenceGenerators = [];

        $scope.checkSeq = function (item, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (angular.equals(list[i].key, item.key)) {
                    return true;
                }
            }
            return false;
        }

        $scope.loadSequences = function () {
            sequenceService.query().$promise.then(function (details) {

                angular.forEach(details, function (value, key) {
                    {
                        var item = {
                            key: value.sequenceId, value: value.sequenceName
                        }
                        if ($scope.checkSeq(item, $scope.sequenceGenerators) == false)
                            $scope.sequenceGenerators.push(item);

                    }
                });
                var attributController = sharedScope.get('attributeController');
                attributController.sequenceGenerators = $scope.sequenceGenerators;

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errorsSeq.push(value.message);
                    });
                }
            });
        }

        // clrear sequence attribute fields
        $scope.clearSequenceAttributeFields = function () {
            $scope.errors = [];
            $scope.errorsSeq = [];
            $scope.isSequenceAttribute = true;
            $scope.action = "Add";
            $scope.readonly = false;

            $scope.sequenceAttribute = {
                attributeId: '', name: '', identifier: '', isMandatory: false, isReadOnly: false, isUnique: false, isSequence: true,
                isSingularlyUnique: null, //isCompositeUnique: null,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null,
                sequenceGenerator: '',
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }
        //save or update sequenceAttribute
        $scope.saveSequenceAttribute = function (sequenceAttribute) {
            ;
            $scope.errors = [];
            $scope.errorsSeq = [];
            //Commented the SequenceAttribute and added the errorAttribute to get all validation in Sequence Modal.
            //$scope.resetErrorDirective(sequenceAttribute);            
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(sequenceAttribute, $scope.errorAttribute, 'sequence')) {

                var SequenceAttributeDTO = {};

                //add Sequence attribute based on lib and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                SequenceAttributeDTO.domainId = contentType.domainId
                SequenceAttributeDTO.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                SequenceAttributeDTO.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                SequenceAttributeDTO.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                //comment this once uncomment above 
                // SequenceAttributeDTO.ContentTypeId = $routeParams.contentTypeId;

                SequenceAttributeDTO.subObjectId = $routeParams.subObjectId;
                SequenceAttributeDTO.attributeSetId = $routeParams.attributeSetId;
                SequenceAttributeDTO.attributeSetName = $routeParams.attributeScreenName;
                SequenceAttributeDTO.AttributeId = sequenceAttribute.attributeId;
                SequenceAttributeDTO.Name = sequenceAttribute.name;
                SequenceAttributeDTO.Identifier = sequenceAttribute.identifier;
                SequenceAttributeDTO.Mandatory = sequenceAttribute.isMandatory;
                SequenceAttributeDTO.ReadOnly = sequenceAttribute.isReadOnly;
                SequenceAttributeDTO.UniqueValues = sequenceAttribute.isUnique;
                SequenceAttributeDTO.orderNo = sequenceAttribute.orderNo;
                if (sequenceAttribute.isSingularlyUnique == "1") {
                    SequenceAttributeDTO.IsSingularityUnique = true;
                    SequenceAttributeDTO.uniqueGroup = "";
                }
                else {
                    SequenceAttributeDTO.IsSingularityUnique = false;
                    SequenceAttributeDTO.uniqueGroup = sequenceAttribute.uniqueGroup;
                }
                SequenceAttributeDTO.description = sequenceAttribute.description;
                SequenceAttributeDTO.multipleValues = {
                    allowMultipleValues: sequenceAttribute.isAllowMultiValue, isUnique: sequenceAttribute.isValueUnique,
                    isReArranged: sequenceAttribute.canValueRearranged, minimumValue: sequenceAttribute.minNumOfValues, maximumValue: sequenceAttribute.maxNumOfValues
                };


                // needs to pass multiple values array when click on + icon
                SequenceAttributeDTO.SequenceGenerator = sequenceAttribute.sequenceGenerator;
                SequenceAttributeDTO.CreatedBy = $rootScope.manageITUserName;

                //SequenceAttributeDTO.Version = "v1";
                if (sequenceAttribute.attributeId == '' || sequenceAttribute.attributeId == null) {
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    sequenceAttributeService.createLib({domainId:contentType.domainId},SequenceAttributeDTO).$promise.then(function (result) {
                        // alert("created successfully")
                        $scope.errorAttribute.messages.push("Sequence Attribute created successfully");
                        $scope.errorAttribute.isSuccess = true;
                        $scope.showSuccessMessage($scope.sequenceAttribute, "Sequence Attribute created successfully");
                        $scope.defaultAttributes();
                        $scope.closeBackDrop('#SequenceAttribute');
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Sequence Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    SequenceAttributeDTO.UpdatedBy = $rootScope.manageITUserName;
                    // SequenceAttributeDTO.UpdatedDate = new Date();
                    //SequenceAttributeDTO.Version = "v1";
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    sequenceAttributeService.updateLib({domainId:contentType.domainId},SequenceAttributeDTO).$promise.then(function () {
                        $scope.errorAttribute.messages.push("Sequence Attribute updated successfully");
                        $scope.errorAttribute.isSuccess = true;
                        $scope.showSuccessMessage($scope.sequenceAttribute, "Sequence Attribute updated successfully");
                        $scope.defaultAttributes();
                        $scope.closeBackDrop('#SequenceAttribute');
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Sequence Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
            }
        };

        //edit sequenceAttribute
        $scope.editSequenceAttribute = function (sequenceAttribute) {
            $scope.action = "Edit";
            $scope.readonly = true;
            $scope.errors = [];
            $scope.errorsSeq = [];
            $scope.errorAttribute.messages = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.isSequenceAttribute = true;
            $scope.sequenceAttribute.attributeId = sequenceAttribute.attributeId
            $scope.sequenceAttribute.name = sequenceAttribute.name;
            $scope.sequenceAttribute.identifier = sequenceAttribute.identifier;
            $scope.sequenceAttribute.isMandatory = sequenceAttribute.mandatory;
            $scope.sequenceAttribute.isReadOnly = sequenceAttribute.readOnly;
            $scope.sequenceAttribute.isUnique = sequenceAttribute.uniqueValues;
            // $scope.sequenceAttribute.isSingularlyUnique = sequenceAttribute.isSingularityUnique;
            //$scope.sequenceAttribute.isCompositeUnique = textAttribute.compositeUnique;
            $scope.sequenceAttribute.uniqueGroup = sequenceAttribute.uniqueGroup;
            $scope.sequenceAttribute.description = sequenceAttribute.description;
            $scope.sequenceAttribute.isAllowMultiValue = sequenceAttribute.multipleValues.allowMultipleValues;
            $scope.sequenceAttribute.isValueUnique = sequenceAttribute.multipleValues.isUnique;
            if (sequenceAttribute.uniqueValues)
                $scope.sequenceAttribute.isSingularlyUnique = sequenceAttribute.isSingularityUnique == true ? 1 : 0;
            else $scope.sequenceAttribute.isSingularlyUnique = '';
            $scope.sequenceAttribute.canValueRearranged = sequenceAttribute.multipleValues.isReArranged;
            $scope.sequenceAttribute.minNumOfValues = sequenceAttribute.multipleValues.minimumValue;
            $scope.sequenceAttribute.maxNumOfValues = sequenceAttribute.multipleValues.maximumValue;


            //needs to implents for arry values,As of now single selection is possible
            $scope.sequenceAttribute.sequenceGenerator = sequenceAttribute.sequenceGenerator;


        }

        //delete sequenceAttribute

        $scope.deleteSequenceAttribute = function (selectedAttr) {
            $scope.errors = [];
            $scope.errorsSeq = [];

            // delete sequence attribute based on contenttype and ;ibrary

            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            SequenceAttributeDTO.domainId = contentType.domainId
            SequenceAttributeDTO.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            SequenceAttributeDTO.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            SequenceAttributeDTO.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // sequenceAttributeService.remove(SequenceAttributeDTO).$promise.then(function (response) {

            sequenceAttributeService.remove({
                contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (result) {
                $scope.errors.push("Sequence Attribute deleted successfully");
                $scope.defaultAttributes();
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while deleting the Sequence Attribute. Please try after sometime.");
                }
            });
        }

        //navigate to sequence page
        $scope.showManageIT = function () {
            $scope.isManageIT = true;
            var domainController = sharedScope.get('domainController');
            var sequenceController = sharedScope.get('sequenceController');
            if (domainController) {
                domainController.clearDomainFields();
            }
            if (sequenceController) {
                sequenceController.clearSequenceFields();
            }
            $('#SequenceAttribute #manageit').modal('show');
            //$('.modal-backdrop').show();
        }
        //**************************************** Sequence Attribute  Logical flow through end ********************************************

        //**************************************** Copy Attribute  Logical flow through start ********************************************

        $scope.copyAttribute = {
            attributeId: '', name: '', identifier: '', isMandatory: false, isReadOnly: false, isUnique: false,
            isSingularlyUnique: null, //isCompositeUnique: null,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
            maxNumOfValues: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null,
            copyFieldDetails: [], contextId: [], copyFieldName: ''
        };
        $scope.textAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, isCopyField: true, //isCompositeUnique: false,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
            maxNumOfValues: null, format: null, fieldWidth: null, minimumLength: null, maximumLength: null, minWordType: null, maxWordType: null, defaultValue: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        $scope.CopyFieldNames = [];

        $scope.clearCopyAttribute = function () {
            $scope.errors = [];
            $scope.copyAttribute = {
                attributeId: '', name: '', identifier: '', isMandatory: false, isReadOnly: false, isUnique: false,
                isSingularlyUnique: null, //isCompositeUnique: null,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null,
                copyFieldDetails: [], contextId: [], copyFieldName: ''
            };
            $scope.textAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, isCopyField: true, //isCompositeUnique: false,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null, format: null, fieldWidth: null, minimumLength: null, maximumLength: null, minWordType: null, maxWordType: null, defaultValue: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
            $scope.isCopyAttribute = true;
            $scope.action = "Add";
            $scope.readonly = false;
            $scope.getContextTypes();
            $scope.SelectedContextIds = [];
        };

        $scope.AllContextTypes = [];
        $scope.SelectedContextIds = [];

        $scope.getContextTypes = function (contextId) {
            domainService.getAllDomains().$promise.then(function (result) {
                var data = [];

                //Map the domains into the Dual Multi Select format
                if (result && result.length > 0) {
                    var domainsCount = result.length;
                    for (var i = 0; i < domainsCount; ++i) {
                        var domain = result[i];

                        var contentTypes = domain.contentTypes;
                        if (contentTypes && contentTypes.length > 0) {
                            var contentTypesCount = contentTypes.length;
                            for (var j = 0; j < contentTypesCount ; ++j) {
                                var contentType = contentTypes[j];
                                if (contentType.isContext) {
                                    data.push({
                                        contentTypeId: contentType.contentTypeId,
                                        pluralName: contentType.pluralName,
                                        selected: false
                                    });
                                }

                            }
                        }
                    }
                }
                if (contextId) {
                    angular.forEach(contextId, function (value, key) {
                        for (var i = 0; i < data.length; i++) {
                            var contentType = data[i];
                            if (contentType.contentTypeId == value) {
                                contentType.selected = true;
                            }
                            data.splice(i, 1);
                            data.push(contentType);
                        }
                    });
                }
                $scope.AllContextTypes = data;
            });
        };

        $scope.editCopyAttributeField = function (textAttribute) {
            $scope.textAttribute.contentTypeId = $routeParams.contentTypeId;
            $scope.textAttribute.subObjectId = $routeParams.subObjectId;
            $scope.textAttribute.attributeSetId = $routeParams.attributeSetId;
            $scope.textAttribute.orderNo = textAttribute.orderNo;
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.textAttribute.name = textAttribute.name;
            $scope.textAttribute.identifier = textAttribute.identifier;
            $scope.textAttribute.isMandatory = textAttribute.mandatory;
            $scope.textAttribute.isReadOnly = textAttribute.readOnly;
            $scope.textAttribute.isUnique = textAttribute.uniqueValues;
            $scope.textAttribute.isCopyField = true;
            $scope.textAttribute.uniqueGroup = textAttribute.uniqueGroup;
            $scope.textAttribute.description = textAttribute.description;
            $scope.textAttribute.isAllowMultiValue = textAttribute.multipleValues.allowMultipleValues;
            $scope.textAttribute.isValueUnique = textAttribute.multipleValues.isUnique;

            $scope.textAttribute.canValueRearranged = textAttribute.multipleValues.isReArranged;
            $scope.textAttribute.minNumOfValues = textAttribute.multipleValues.minimumValue;
            $scope.textAttribute.maxNumOfValues = textAttribute.multipleValues.maximumValue;

            $scope.textAttribute.format = textAttribute.format;
            $scope.textAttribute.fieldWidth = textAttribute.fieldWidth;
            $scope.textAttribute.minimumLength = textAttribute.minimumLength;
            $scope.textAttribute.maximumLength = textAttribute.maximumLength;
            $scope.textAttribute.minWordType = textAttribute.minWordType;
            $scope.textAttribute.maxWordType = textAttribute.maxWordType;
            $scope.textAttribute.defaultValue = textAttribute.defaultValue;

            $scope.textAttribute.createdBy = $rootScope.manageITUserName;
            $scope.readonly = false;
        };

        $scope.editCopyAttribute = function (selectedrow) {
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.errors = [];
            $scope.action = "Edit";
            $scope.readonly = true;
            $scope.isCopyAttribute = true;
            $scope.copyAttribute.attributeId = selectedrow.attributeId;
            $scope.copyAttribute.name = selectedrow.name;
            $scope.copyAttribute.identifier = selectedrow.identifier;
            $scope.copyAttribute.isMandatory = selectedrow.mandatory;
            $scope.copyAttribute.isReadOnly = selectedrow.readOnly;
            $scope.copyAttribute.isUnique = selectedrow.uniqueValues;
            // $scope.copyAttribute.isSingularlyUnique = selectedrow.IsSingularityUnique ? "singular" : "composite";
            //$scope.copyAttribute.isCompositeUnique = textAttribute.compositeUnique;
            $scope.copyAttribute.uniqueGroup = selectedrow.uniqueGroup;
            $scope.copyAttribute.description = selectedrow.description;
            $scope.copyAttribute.isAllowMultiValue = selectedrow.multipleValues.allowMultipleValues;
            $scope.copyAttribute.isValueUnique = selectedrow.multipleValues.isUnique;
            if (selectedrow.uniqueValues)
                $scope.copyAttribute.isSingularlyUnique = selectedrow.isSingularityUnique == true ? 1 : 0;
            else $scope.copyAttribute.isSingularlyUnique = '';
            $scope.copyAttribute.canValueRearranged = selectedrow.multipleValues.isReArranged;
            $scope.copyAttribute.minNumOfValues = selectedrow.multipleValues.minimumValue;
            $scope.copyAttribute.maxNumOfValues = selectedrow.multipleValues.maximumValue;

            $scope.copyAttribute.copyFieldDetails = selectedrow.copyFieldDetails;
            $scope.copyAttribute.orderNo = selectedrow.orderNo;
            $scope.AllContextTypes = [];
            $scope.getContextTypes(selectedrow.contextId);

        };

        $scope.deleteCopyAttributeField = function (selectedField) {
            //Find out if there is any field with the same identifier
            var existingFields = $scope.copyAttribute.copyFieldDetails;
            var fieldIndex = -1;
            if (existingFields && existingFields.length > 0) {
                var fieldsCount = existingFields.length;
                for (var i = 0; i < existingFields.length; ++i) {
                    var field = existingFields[i];
                    if (field.identifier === selectedField.identifier) {
                        fieldIndex = i;
                    }
                }
            }
            //If there is an existing field, delete the field
            if (fieldIndex >= 0) {
                $scope.copyAttribute.copyFieldDetails.splice(fieldIndex, 1);
            }
        };

        $scope.deleteCopyAttribute = function () {
            $scope.errors = [];

            // delete copy attribute based on contenttype and ;ibrary

            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // copyAttributeService.remove(selectedAttr).$promise.then(function (response) {

            copyAttributeService.remove({ contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId }).$promise.then(function (result) {
                $scope.errorAttribute.isSuccess = true;
                $scope.errorAttribute.messages.push("Copy Attribute deleted successfully");
                $scope.defaultAttributes();
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errorAttribute.messages.push(value.message);
                        $scope.errorAttribute.moreDetails = value.moreDetails;
                        $scope.errorAttribute.isError = true;
                    });
                }
                else {
                    $scope.errorAttribute.messages.push("Error occured while deleting the Copy Attribute. Please try after sometime.");
                    $scope.errorAttribute.isError = true;
                }
            });
        };

        $scope.saveCopyAttribute = function (copyAttribute) {
            $scope.errors = [];
            $scope.errorsCopy = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(copyAttribute, $scope.copyAttribute, 'copy')) {
                var newAttribute = new copyAttributeService();

                //add copy attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newAttribute.domainId = contentType.domainId;
                newAttribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newAttribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newAttribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                // newAttribute.ContentTypeId = $routeParams.contentTypeId;

                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.orderNo = copyAttribute.orderNo;

                if (copyAttribute.attributeId == '') {
                    newAttribute.name = copyAttribute.name;
                    newAttribute.identifier = copyAttribute.identifier;
                    newAttribute.mandatory = copyAttribute.isMandatory;
                    newAttribute.readOnly = copyAttribute.isReadOnly;
                    newAttribute.uniqueValues = copyAttribute.isUnique;
                    newAttribute.attributeSetName = $routeParams.attributeScreenName;
                    if (copyAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = copyAttribute.uniqueGroup;
                    }
                    newAttribute.description = copyAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: copyAttribute.isAllowMultiValue, isUnique: copyAttribute.isValueUnique,
                        isReArranged: copyAttribute.canValueRearranged, minimumValue: copyAttribute.minNumOfValues, maximumValue: copyAttribute.maxNumOfValues
                    };
                    newAttribute.contextId = [];
                    if ($scope.AllContextTypes) {
                        for (var i = 0; i < $scope.AllContextTypes.length; i++) {
                            var contentType = $scope.AllContextTypes[i]
                            if (contentType.selected) {
                                newAttribute.contextId.push(contentType.contentTypeId);
                            }
                        }
                    }
                    newAttribute.copyFieldDetails = copyAttribute.copyFieldDetails;
                    newAttribute.copyFieldNames = $scope.CopyFieldNames;
                    newAttribute.CreatedBy = $rootScope.manageITUserName;
                    copyAttributeService.create({ attributeType: 'copyAttribute' }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearCopyAttribute();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Copy Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#CopyAttribute');
                            $scope.CopyFieldNames = [];
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Copy Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    newAttribute.attributeId = copyAttribute.attributeId;
                    newAttribute.name = copyAttribute.name;
                    newAttribute.identifier = copyAttribute.identifier;
                    newAttribute.mandatory = copyAttribute.isMandatory;
                    newAttribute.readOnly = copyAttribute.isReadOnly;
                    newAttribute.uniqueValues = copyAttribute.isUnique;
                    if (copyAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = copyAttribute.uniqueGroup;
                    }
                    newAttribute.description = copyAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: copyAttribute.isAllowMultiValue, isUnique: copyAttribute.isValueUnique,
                        isReArranged: copyAttribute.canValueRearranged, minimumValue: copyAttribute.minNumOfValues, maximumValue: copyAttribute.maxNumOfValues
                    };
                    newAttribute.contextId = [];
                    if ($scope.AllContextTypes) {
                        for (var i = 0; i < $scope.AllContextTypes.length; i++) {
                            var contentType = $scope.AllContextTypes[i]
                            if (contentType.selected) {
                                newAttribute.contextId.push(contentType.contentTypeId);
                            }
                        }
                    }
                    newAttribute.copyFieldDetails = copyAttribute.copyFieldDetails;

                    newAttribute.UpdatedBy = $rootScope.manageITUserName;

                    copyAttributeService.update({ attributeType: 'copyAttribute' }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearCopyAttribute();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Copy Attribute updated successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#CopyAttribute');
                            $scope.CopyFieldNames = [];
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Copy Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        };

        $scope.clearCopyAttributeFieldValues = function () {
            $scope.errors = [];
            $scope.textAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, isCopyField: true, //isCompositeUnique: false,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null, format: null, fieldWidth: null, minimumLength: null, maximumLength: null, minWordType: null, maxWordType: null, defaultValue: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
            $scope.CopyFieldNames.push($scope.copyAttribute.copyFieldName);

            $scope.textAttribute.ContentTypeId = $routeParams.contentTypeId;
            $scope.textAttribute.subObjectId = $routeParams.subObjectId;
            $scope.textAttribute.attributeSetId = $routeParams.attributeSetId;
            $scope.textAttribute.name = $scope.copyAttribute.copyFieldName;
            //$scope.textAttribute.isReadOnly = true;
            $scope.deriveIdentifier($scope.textAttribute);
            $scope.deriveIdentifierFromId($scope.textAttribute);
            $scope.textAttribute.format = $scope.lineFormatCopy[0].key;
            $scope.copyAttribute.copyFieldName = '';
        };

        $scope.saveCopyTextAttribute = function (textAttribute) {
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(textAttribute, $scope.errorAttribute, 'text')) {
                //create an instance of the factory
                var newAttribute = new textAttributeService();

                newAttribute.contentTypeId = $routeParams.contentTypeId;
                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.attributeSetName = $routeParams.attributeScreenName;
                newAttribute.orderNo = textAttribute.orderNo;

                if (textAttribute.attributeId == '') {
                    newAttribute.name = textAttribute.name;
                    newAttribute.identifier = textAttribute.identifier;
                    newAttribute.mandatory = textAttribute.isMandatory;
                    newAttribute.readOnly = textAttribute.isReadOnly;
                    newAttribute.uniqueValues = textAttribute.isUnique;
                    if (textAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = textAttribute.uniqueGroup;
                    }
                    newAttribute.description = textAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: textAttribute.isAllowMultiValue, isUnique: textAttribute.isValueUnique,
                        isReArranged: textAttribute.canValueRearranged, minimumValue: textAttribute.minNumOfValues, maximumValue: textAttribute.maxNumOfValues
                    };

                    newAttribute.format = textAttribute.format;
                    newAttribute.fieldWidth = textAttribute.fieldWidth;
                    newAttribute.minimumLength = textAttribute.minimumLength;
                    newAttribute.maximumLength = textAttribute.maximumLength;
                    newAttribute.minWordType = textAttribute.minWordType;
                    newAttribute.maxWordType = textAttribute.maxWordType;
                    newAttribute.defaultValue = textAttribute.defaultValue;
                    newAttribute.attributeId = textAttribute.attributeId;
                    newAttribute.createdBy = $rootScope.manageITUserName;

                    $scope.deleteCopyAttributeField(newAttribute);
                    $scope.copyAttribute.copyFieldDetails.push(newAttribute);

                    $("#copyTextAttribute").modal('toggle');
                }

            }
        };

        //**************************************** Copy Attribute  Logical flow through end ********************************************


        //**************************************** YesNo Attribute  Logical flow through start ********************************************

        $scope.yesNoAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, yesValue: 'Yes',
            noValue: 'No', defaultValue: 0, displayType: null, description: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };
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
        $scope.clearYesNoAttributeFieldsAfterSave = function () {
            $scope.errorsYesNo = [];
            $scope.yesNoAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, yesValue: 'Yes',
                noValue: 'No', defaultValue: "0", displayType: null, description: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }

        //save or update sequenceAttribute
        $scope.saveYesNoAttribute = function (yesNoAttribute) {
            $scope.errors = [];
            $scope.errorsYesNo = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(yesNoAttribute, $scope.yesNoAttribute, 'yesno')) {
                var newAttribute = new yesNoAttributeService();

                // add yes no attribute based on lib and content type
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newAttribute.domainId = contentType.domainId
                newAttribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newAttribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newAttribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                //  newAttribute.ContentTypeId = $routeParams.contentTypeId;

                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.attributeSetName = $routeParams.attributeScreenName;
                newAttribute.orderNo = yesNoAttribute.orderNo;

                if (yesNoAttribute.attributeId == '') {
                    newAttribute.name = yesNoAttribute.name;
                    newAttribute.identifier = yesNoAttribute.identifier;
                    newAttribute.mandatory = yesNoAttribute.isMandatory;
                    newAttribute.readOnly = yesNoAttribute.isReadOnly;
                    newAttribute.uniqueValues = yesNoAttribute.isUnique;
                    if (yesNoAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = yesNoAttribute.uniqueGroup;
                    }
                    newAttribute.description = yesNoAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: yesNoAttribute.isAllowMultiValue, isUnique: yesNoAttribute.isValueUnique,
                        isReArranged: yesNoAttribute.canValueRearranged, minimumValue: yesNoAttribute.minNumOfValues, maximumValue: yesNoAttribute.maxNumOfValues
                    };
                    newAttribute.YesValue = yesNoAttribute.yesValue;
                    newAttribute.NoValue = yesNoAttribute.noValue;
                    newAttribute.DefaultValue = yesNoAttribute.defaultValue;
                    newAttribute.DisplayType = yesNoAttribute.displayType;
                    newAttribute.CreatedBy = $rootScope.manageITUserName;
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    yesNoAttributeService.createLib({ attributeType: 'yesnoattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {


                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearYesNoAttributeFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("YesNo Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#YesNoAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the yesNo Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    newAttribute.attributeId = yesNoAttribute.attributeId;
                    newAttribute.name = yesNoAttribute.name;
                    newAttribute.identifier = yesNoAttribute.identifier;
                    newAttribute.mandatory = yesNoAttribute.isMandatory;
                    newAttribute.readOnly = yesNoAttribute.isReadOnly;
                    newAttribute.uniqueValues = yesNoAttribute.isUnique;
                    if (yesNoAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = yesNoAttribute.uniqueGroup;
                    }
                    newAttribute.description = yesNoAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: yesNoAttribute.isAllowMultiValue, isUnique: yesNoAttribute.isValueUnique,
                        isReArranged: yesNoAttribute.canValueRearranged, minimumValue: yesNoAttribute.minNumOfValues, maximumValue: yesNoAttribute.maxNumOfValues
                    };
                    newAttribute.YesValue = yesNoAttribute.yesValue;
                    newAttribute.NoValue = yesNoAttribute.noValue;
                    newAttribute.DefaultValue = yesNoAttribute.defaultValue;
                    newAttribute.DisplayType = yesNoAttribute.displayType;
                    newAttribute.UpdatedBy = $rootScope.manageITUserName;
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    yesNoAttributeService.updateLib({ attributeType: 'yesnoattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearYesNoAttributeFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("YesNo Attribute updated successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#YesNoAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the YesNo Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        }

        //edit sequenceAttribute
        $scope.editYesNoAttribute = function (selectedrow) {
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.errors = [];
            $scope.action = "Edit";
            $scope.readonly = true;
            $scope.isYesNoAttribute = true;
            $scope.yesNoAttribute.attributeId = selectedrow.attributeId;
            $scope.yesNoAttribute.name = selectedrow.name;
            $scope.yesNoAttribute.identifier = selectedrow.identifier;
            $scope.yesNoAttribute.isMandatory = selectedrow.mandatory;
            $scope.yesNoAttribute.isReadOnly = selectedrow.readOnly;
            $scope.yesNoAttribute.isUnique = selectedrow.uniqueValues;
            // $scope.yesNoAttribute.isSingularlyUnique = selectedrow.IsSingularityUnique ? "singular" : "composite";
            //$scope.yesNoAttribute.isCompositeUnique = textAttribute.compositeUnique;
            $scope.yesNoAttribute.uniqueGroup = selectedrow.uniqueGroup;
            $scope.yesNoAttribute.description = selectedrow.description;
            $scope.yesNoAttribute.isAllowMultiValue = selectedrow.multipleValues.allowMultipleValues;
            $scope.yesNoAttribute.isValueUnique = selectedrow.multipleValues.isUnique;
            if (selectedrow.uniqueValues)
                $scope.yesNoAttribute.isSingularlyUnique = selectedrow.isSingularityUnique == true ? 1 : 0;
            else $scope.yesNoAttribute.isSingularlyUnique = '';
            $scope.yesNoAttribute.canValueRearranged = selectedrow.multipleValues.isReArranged;
            $scope.yesNoAttribute.minNumOfValues = selectedrow.multipleValues.minimumValue;
            $scope.yesNoAttribute.maxNumOfValues = selectedrow.multipleValues.maximumValue;

            $scope.yesNoAttribute.yesValue = selectedrow.yesValue;
            $scope.yesNoAttribute.noValue = selectedrow.noValue;
            $scope.yesNoAttribute.defaultValue = selectedrow.defaultValue.toString();
            $scope.yesNoAttribute.displayType = selectedrow.displayType;
            $scope.yesNoAttribute.orderNo = selectedrow.orderNo;
        }

        //delete sequenceAttribute
        $scope.deleteYesNoAttribute = function (selectedAttr) {

            $scope.errors = [];
            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;

            // delete yes/no attribute based on contenttype and ;ibrary

            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // yesNoAttributeService.remove(selectedAttr).$promise.then(function (response) {


            yesNoAttributeService.remove({ contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId }).$promise.then(function (result) {
                $scope.errorAttribute.isSuccess = true;
                $scope.errorAttribute.messages.push("YesNo Attribute deleted successfully");
                $scope.defaultAttributes();
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errorAttribute.messages.push(value.message);
                        $scope.errorAttribute.moreDetails = value.moreDetails;
                        $scope.errorAttribute.isError = true;
                    });
                }
                else {
                    $scope.errorAttribute.messages.push("Error occured while deleting the Yes/No Attribute. Please try after sometime.");
                    $scope.errorAttribute.isError = true;
                }
            });
        }

        //**************************************** YesNo Attribute  Logical flow through end ********************************************

        //**************************************** Decimal Attribute Logical flow through starts********************************************
        $scope.decimalAttribute = {
            attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
            maxNumOfValues: null,
            minimumvalue: null, defaultvalue: null, maximumvalue: null, decimalplaces: null, currencytype: null, valuetype: null, inheritfromcontext: null,
            displayaspriceorpercentage: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        $scope.clearDecimalAttributeFields = function (formName) {
            $scope.action = "Add";
            $scope.error = [];
            $scope.errorsDecimal = [];
            $scope.readonly = false;
            $scope.isdecimalAttribute = true;
            $scope.formName = formName;
            $scope.decimalAttribute = {
                attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null,
                minimumvalue: null, defaultvalue: null, maximumvalue: null, decimalplaces: null, currencytype: null, valuetype: null, inheritfromcontext: null,
                displayaspriceorpercentage: $scope.decimalDisplayAsPrice[0].key,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
            $scope.decimalPropertyChanged = false;
            $scope.displayaspriceorpercentageDisabled = false;
        };

        $scope.clearDecimalAttributeFieldsAfterSave = function () {
            $scope.errorsDecimal = [];
            $scope.decimalAttribute = {
                attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null,
                maxNumOfValues: null,
                minimumvalue: null, defaultvalue: null, maximumvalue: null, decimalplaces: null, currencytype: null, valuetype: null, inheritfromcontext: null,
                displayaspriceorpercentage: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        };
        $scope.saveDecimalAttribute = function (decimalAttribute) {

            $scope.errors = [];
            $scope.errorsDecimal = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(decimalAttribute, $scope.decimalAttribute, 'decimal')) {

                //create an instance of the factory
                if ($scope.formName == 'Decimal') {
                    var newAttribute = new decimalAttributeService();
                    var newAttributeService = decimalAttributeService;
                }
                else {
                    var newAttribute = new integerAttributeService();
                    var newAttributeService = integerAttributeService;
                }

                //add Decimal attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newAttribute.domainId = contentType.domainId;
                newAttribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newAttribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newAttribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                //    newAttribute.contentTypeId = $routeParams.contentTypeId;
                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.attributeSetName = $routeParams.attributeScreenName;
                newAttribute.attributeId = decimalAttribute.attributeId;
                newAttribute.orderNo = decimalAttribute.orderNo;
                if (decimalAttribute.attributeId == '') {
                    newAttribute.name = decimalAttribute.name;
                    newAttribute.identifier = decimalAttribute.identifier;
                    newAttribute.mandatory = decimalAttribute.isMandatory;
                    newAttribute.readOnly = decimalAttribute.isReadOnly;
                    newAttribute.uniqueValues = decimalAttribute.isUnique;
                    if (decimalAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = decimalAttribute.uniqueGroup;
                    }
                    newAttribute.description = decimalAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: decimalAttribute.isAllowMultiValue, isUnique: decimalAttribute.isValueUnique,
                        isReArranged: decimalAttribute.canValueRearranged, minimumValue: decimalAttribute.minNumOfValues, maximumValue: decimalAttribute.maxNumOfValues
                    };

                    newAttribute.MinimumValue = decimalAttribute.minimumvalue;
                    newAttribute.DefaultValue = decimalAttribute.defaultvalue;
                    newAttribute.MaximumValue = decimalAttribute.maximumvalue;
                    newAttribute.DecimalPlaces = decimalAttribute.decimalplaces;
                    newAttribute.ValueType = decimalAttribute.displayaspriceorpercentage;
                    newAttribute.CurrencyType = decimalAttribute.currencytype;
                    newAttribute.InheritFromContext = decimalAttribute.inheritfromcontext;

                    newAttribute.CreatedBy = $rootScope.manageITUserName;

                    //newAttributeService.create({ attributeType: $scope.formName ? 'integerattribute' : 'decimalattribute' }, newAttribute).$promise.then(function (response) {
                    // newAttribute.CreatedBy = "IPP";
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    newAttributeService.createLib({ attributeType: $scope.formName ? 'integerattribute' : 'decimalattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true) {
                            $scope.clearDecimalAttributeFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push($scope.formName + " Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#DecimalAttribute');

                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the " + $scope.formName + " Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {

                    newAttribute.attributeId = decimalAttribute.attributeId;
                    newAttribute.name = decimalAttribute.name;
                    newAttribute.identifier = decimalAttribute.identifier;
                    newAttribute.mandatory = decimalAttribute.isMandatory;
                    newAttribute.readOnly = decimalAttribute.isReadOnly;
                    newAttribute.uniqueValues = decimalAttribute.isUnique;
                    if (decimalAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = decimalAttribute.uniqueGroup;
                    }
                    newAttribute.description = decimalAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: decimalAttribute.isAllowMultiValue, isUnique: decimalAttribute.isValueUnique,
                        isReArranged: decimalAttribute.canValueRearranged, minimumValue: decimalAttribute.minNumOfValues, maximumValue: decimalAttribute.maxNumOfValues
                    };

                    newAttribute.MinimumValue = decimalAttribute.minimumvalue;
                    newAttribute.DefaultValue = decimalAttribute.defaultvalue;
                    newAttribute.MaximumValue = decimalAttribute.maximumvalue;
                    newAttribute.DecimalPlaces = decimalAttribute.decimalplaces;
                    newAttribute.ValueType = decimalAttribute.displayaspriceorpercentage;
                    newAttribute.CurrencyType = decimalAttribute.currencytype;
                    newAttribute.InheritFromContext = decimalAttribute.inheritfromcontext;

                    newAttribute.updatedBy = $rootScope.manageITUserName;
                    //newAttribute.updatedDate = new Date();
                    console.log(newAttribute);
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    newAttributeService.updateLib({ attributeType: $scope.formName ? 'integerattribute' : 'decimalattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearDecimalAttributeFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push($scope.formName + " Attribute updated successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#DecimalAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the " + $scope.formName + " Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        }

        $scope.editDecimalAttribute = function (selectedrow) {
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.errors = [];
            $scope.errorsDecimal = [];
            $scope.action = "Edit";
            $scope.readonly = true;
            $scope.isdecimalAttribute = true;
            $scope.decimalAttribute.attributeId = selectedrow.attributeId;
            $scope.decimalAttribute.version = selectedrow.version;
            $scope.decimalAttribute.name = selectedrow.name;
            $scope.decimalAttribute.identifier = selectedrow.identifier;
            $scope.decimalAttribute.isMandatory = selectedrow.mandatory;
            $scope.decimalAttribute.isReadOnly = selectedrow.readOnly;
            $scope.decimalAttribute.isUnique = selectedrow.uniqueValues;
            // $scope.decimalAttribute.isSingularlyUnique = selectedrow.IsSingularityUnique ? "singular" : "composite";
            //$scope.decimalAttribute.isCompositeUnique = textAttribute.compositeUnique;
            $scope.decimalAttribute.uniqueGroup = selectedrow.uniqueGroup;
            $scope.decimalAttribute.description = selectedrow.description;
            $scope.decimalAttribute.isAllowMultiValue = selectedrow.multipleValues.allowMultipleValues;
            $scope.decimalAttribute.isValueUnique = selectedrow.multipleValues.isUnique;
            if (selectedrow.uniqueValues)
                $scope.decimalAttribute.isSingularlyUnique = selectedrow.isSingularityUnique == true ? 1 : 0;
            else $scope.decimalAttribute.isSingularlyUnique = '';
            $scope.decimalAttribute.canValueRearranged = selectedrow.multipleValues.isReArranged;
            $scope.decimalAttribute.minNumOfValues = selectedrow.multipleValues.minimumValue;
            $scope.decimalAttribute.maxNumOfValues = selectedrow.multipleValues.maximumValue;

            $scope.decimalAttribute.minimumvalue = selectedrow.minimumValue;
            $scope.decimalAttribute.defaultvalue = selectedrow.defaultValue;
            $scope.decimalAttribute.maximumvalue = selectedrow.maximumValue;
            $scope.decimalAttribute.decimalplaces = selectedrow.decimalPlaces;
            $scope.decimalAttribute.currencytype = selectedrow.currencyType;
            $scope.decimalAttribute.displayaspriceorpercentage = selectedrow.valueType;
            $scope.decimalAttribute.inheritfromcontext = selectedrow.inheritFromContext;
            $scope.decimalAttribute.orderNo = selectedrow.orderNo;
            if ($scope.decimalAttribute.displayaspriceorpercentage == 1 || $scope.decimalAttribute.displayaspriceorpercentage == 2) {
                $scope.displayaspriceorpercentageDisabled = true;
            }
            $scope.resetErrorDirective($scope.errorAttribute);
        }

        //delete sequenceAttribute
        $scope.deleteDecimalAttribute = function (selectedAttr) {

            $scope.errors = [];
            $scope.errorsDecimal = [];
            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;

            var decOrIntAttService = $scope.formName == 'Decimal' ? decimalAttributeService : integerAttributeService;

            // delete decimal attribute based on contenttype and library
            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // decOrIntAttService.remove(selectedAttr).$promise.then(function (response) {


            decOrIntAttService.remove({
                contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (result) {


                $scope.errorAttribute.isError = true;
                $scope.errorAttribute.isSuccess = true;
                $scope.errorAttribute.messages.push($scope.formName + " Attribute deleted successfully");

                $scope.defaultAttributes();
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errorAttribute.messages.push(value.message);
                        $scope.errorAttribute.moreDetails = value.moreDetails;
                        $scope.errorAttribute.isError = true;
                        $scope.errorAttribute.isHide = true;
                    });
                }
                else {
                    $scope.errorAttribute.messages.push("Error occured while deleting the " + $scope.formName + " Attribute. Please try after sometime.");
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.isHide = true;
                }
            });
        }


        //**************************************** Decimal Attribute Logical flow through ends********************************************

        //**************************************** List Attribute Logical flow through starts********************************************
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
            $scope.listValues = [];
            $scope.previousAvialableListValues = [];
            $scope.listValueOptions = [];
        }

        $scope.saveListAttribute = function (listAttribute) {
            $scope.errors = [];
            $scope.errorsList = [];

            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(listAttribute, $scope.listAttribute, 'list')) {
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                var listAttributeDTO = {
                };

                //add list attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                listAttributeDTO.domainId = contentType.domainId;
                listAttributeDTO.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                listAttributeDTO.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                listAttributeDTO.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                // listAttributeDTO.contentTypeId = $routeParams.contentTypeId;

                listAttributeDTO.subObjectId = $routeParams.subObjectId;
                listAttributeDTO.attributeSetId = $routeParams.attributeSetId;
                listAttributeDTO.attributeSetName = $routeParams.attributeScreenName;
                listAttributeDTO.attributeId = listAttribute.attributeId;
                listAttributeDTO.name = listAttribute.name;
                listAttributeDTO.identifier = listAttribute.identifier;
                listAttributeDTO.mandatory = listAttribute.isMandatory;
                listAttributeDTO.readOnly = listAttribute.isReadOnly;
                listAttributeDTO.uniqueValues = listAttribute.isUnique;
                listAttributeDTO.description = listAttribute.description;
                listAttributeDTO.orderNo = listAttribute.orderNo;
                if (listAttribute.isSingularlyUnique == "1") {
                    listAttributeDTO.IsSingularityUnique = true;
                    listAttributeDTO.uniqueGroup = "";
                }
                else {
                    listAttributeDTO.IsSingularityUnique = false;
                    listAttributeDTO.uniqueGroup = listAttribute.uniqueGroup;
                }

                listAttributeDTO.multipleValues = {
                    allowMultipleValues: listAttribute.isAllowMultiValue, isUnique: listAttribute.isValueUnique,
                    isReArranged: listAttribute.canValueRearranged, minimumValue: listAttribute.minNumOfValues, maximumValue: listAttribute.maxNumOfValues
                };

                //needs to implents for arry values,As of now single selection is possible
                listAttributeDTO.listOption = listAttribute.listOption;
                listAttributeDTO.listType = listAttribute.listType;
                listAttributeDTO.listValues = [];
                //If Predefined values is selected, push the list values
                if (listAttribute.listOption === "0") {
                    angular.forEach($scope.previousListValues, function (value, index) {
                        listAttributeDTO.listValues.push({ "Id": value.key, "Name": value.key,"SearchId":"", "ContentTypeId": listAttributeDTO.contentTypeId, "DomainId": contentType.domainId });
                    });
                }
                    //Otherwise, push the list source
                else {
                    angular.forEach($scope.selectedListAttrContentTypes, function (value, index) {
                        var selectedintefaceObj = $scope.getAttribute(value.value);
                        if (selectedintefaceObj != {}) {
                            listAttributeDTO.listValues.push({ "Id": selectedintefaceObj.value, "Name": selectedintefaceObj.label, "SearchId": selectedintefaceObj.searchid, "ContentTypeId": selectedintefaceObj.contenttypeid, "DomainId": selectedintefaceObj.domainid });
                        }
                    });
                }
                listAttributeDTO.defaultSelection = [];
                //If single value select is selected, then push the default selection
                if (listAttribute.listType === "0") {
                    listAttributeDTO.defaultSelection.push(listAttribute.defaultSelection);
                }
                    //Otherwise, fetch the selected values from the dual multi select
                else {
                    angular.forEach($scope.selectedListValueOptions, function (value, index) {
                        listAttributeDTO.defaultSelection.push(value.key);
                    });
                }
                listAttributeDTO.displayInputType = listAttribute.displayInputType;
                if (listAttribute.attributeId == null || listAttribute.attributeId == '') {

                    listAttributeDTO.createdBy = $rootScope.manageITUserName;
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    listAttributeService.createLib({ domainId: contentType.domainId }, listAttributeDTO).$promise.then(function (result) {


                        //alert("created successfully")
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("List Attribute saved successfully");
                        $scope.defaultAttributes();
                        $scope.closeBackDrop('#ListAttribute');
                    }, function (error) {

                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the List Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    listAttributeDTO.UpdatedBy = $rootScope.manageITUserName;
                    listAttributeService.updateLib({ domainId: contentType.domainId }, listAttributeDTO).$promise.then(function () {
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("List Attribute updated successfully");
                        $scope.defaultAttributes();
                        $scope.closeBackDrop('#ListAttribute');
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while updating the List Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
            }
        }

        $scope.editListAttribute = function (selectedrow) {
            //console.log(JSON.stringify(selectedrow));
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.action = "Edit";
            $scope.errors = [];
            $scope.readonly = true;
            $scope.isListAttribute = true;
            $scope.listAttribute.maxNumOfValues = selectedrow.multipleValues.maximumValue;
            $scope.listAttribute.minNumOfValues = selectedrow.multipleValues.minimumValue;
            $scope.listAttribute.isAllowMultiValue = selectedrow.multipleValues.allowMultipleValues;
            $scope.listAttribute.attributeId = selectedrow.attributeId;
            $scope.listAttribute.version = selectedrow.version;
            $scope.listAttribute.name = selectedrow.name;
            $scope.listAttribute.identifier = selectedrow.identifier;
            $scope.listAttribute.isMandatory = selectedrow.mandatory;
            $scope.listAttribute.isReadOnly = selectedrow.readOnly;
            $scope.listAttribute.isUnique = selectedrow.uniqueValues;
            $scope.listAttribute.description = selectedrow.description;
            $scope.listAttribute.uniqueGroup = selectedrow.uniqueGroup;
            $scope.listAttribute.orderNo = selectedrow.orderNo;
            if (selectedrow.multipleValues.isUnique)
                $scope.listAttribute.isSingularlyUnique = selectedrow.isSingularityUnique == true ? 1 : 0;
            else $scope.listAttribute.isSingularlyUnique = '';

            $scope.listAttribute.listOption = selectedrow.listOption;
            $scope.listAttribute.listType = selectedrow.listType + ""; //converting the int to string
            $scope.listValues = [];
            if (selectedrow.listOption === "0") {
                angular.forEach(selectedrow.listValues, function (v, k) {
                    var obj = { key: v.id, value: v.name };
                    $scope.listValues.push(obj);
                });
                $scope.previousListValues = $.extend(true, [], $scope.listValues);
                $scope.listValueOptions = $.extend(true, [], $scope.listValues);
            }
            else {
                var allOptions = $scope.ListSourceOptions;
                $scope.previousAvialableListValues = [];

                var optionsCount = allOptions.length;
                angular.forEach(selectedrow.listValues, function (opt) {
                    var objListAttribute = $scope.getAttribute(opt.id);
                    $scope.selectedListAttrContentTypes.push(objListAttribute);
                });
                for (var i = 0; i < optionsCount; ++i) {
                    var option = allOptions[i];
                    if (selectedrow.listValues.indexOf(option.key) >= 0) {
                        option.selected = true;

                        //Also push this item into the available list
                        var availableOption = { key: option.key, value: option.label };
                        $scope.previousAvialableListValues.push(availableOption);
                    }
                    else {
                        option.selected = false;
                    }
                }
                $scope.listValueOptions = $.extend(true, [], $scope.previousAvialableListValues);
            }
            if (selectedrow.listType == "0") {
                //If it is single value select, then there will be only one value
                $scope.listAttribute.defaultSelection = selectedrow.defaultSelection[0];
            }
            else {
                //If it is multiple value select, then we need to set the available and selected options
                $scope.availableListValueOptions = [];
                $scope.selectedListValueOptions = [];
                var allOptions = $scope.listValueOptions;
                if (allOptions && allOptions.length > 0) {
                    var optionsCount = allOptions.length;
                    for (var i = 0; i < optionsCount; ++i) {
                        var option = allOptions[i];
                        if (selectedrow.defaultSelection.indexOf(option.key) >= 0) {
                            $scope.selectedListValueOptions.push(option);
                        }
                        else {
                            $scope.availableListValueOptions.push(option);
                        }
                    }
                }
            }
            $scope.listAttribute.displayInputType = selectedrow.displayInputType;
        }
        $scope.getAttribute = function (id) {
            var obj = {
            };
            angular.forEach($scope.domainsSearchTreeStructure, function (domain) {
                angular.forEach(domain.children, function (content) {
                    angular.forEach(content.children, function (interfac) {
                        angular.forEach(interfac.children, function (attr) {
                            if (attr.value == id)
                                obj = attr;
                        });
                    });
                });
            });
            return obj;
        }
        $scope.deleteListAttribute = function (selectedAttr) {
            $scope.errors = [];
            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;

            // delete list attribute based on contenttype and library

            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // listAttributeService.remove(selectedAttr).$promise.then(function (response) {

            listAttributeService.remove({
                contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (result) {
                $scope.errors.push("List Attribute deleted successfully");
                $scope.defaultAttributes();
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while deleting the List Attribute. Please try after sometime.");
                }
            });
        }

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

        $scope.FetchSelectedItemsFromTreeControl = function () {
            return ($("#listSourceTree").val());
        };

        //When we change the List Options, the default selection list values must change
        $scope.UpdateListValueOptions = function () {
            if ($scope.listAttribute.listOption === '0') {
                $scope.listValueOptions = $.extend(true, [], $scope.previousListValues);
                $scope.availableListValueOptions = $.extend(true, [], $scope.previousListValues);
                $scope.listAttribute.defaultSelection = '';
            }
            else {
                $scope.listValueOptions = $.extend(true, [], $scope.previousAvialableListValues);
                $scope.availableListValueOptions = $.extend(true, [], $scope.previousAvialableListValues);
                $scope.selectedListValueOptions = [];
            }
        };

        //Map the domain data into the Tree format
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
        $scope.selectedListAttrContentTypes = [];

        $scope.showDefineDataSource = function () {
            $scope.isDefineListSource = true;

            //Fetch all the domains from the server
            //domainService.getAllDomains().$promise.then(function (result) {
            //    //Map the domains into the Tree format
            //    $scope.MapDataForListSourceTree(result);

            //    //Fetch the selected items in the tree and then update the list
            //    var selectedOptions = $scope.previousAvialableListValues;
            //    var selectedKeys = [];
            //    var selectedOptionCount = selectedOptions.length;
            //    for (var i = 0; i < selectedOptionCount; ++i) {
            //        selectedKeys.push(selectedOptions[i].key);
            //    }

            //    var allOptions = $scope.ListSourceOptions;
            //    var optionsCount = allOptions.length;
            //    for (var i = 0; i < optionsCount; ++i) {
            //        var option = allOptions[i];
            //        if (selectedKeys.indexOf(option.key) >= 0) {
            //            option.selected = true;
            //        }
            //        else {
            //            option.selected = false;
            //        }
            //    }

            //    //Create the Tree control with the updated date
            //    $scope.CreateMultiSelectTreeControl($scope.ListSourceOptions);
            //}, function (error) {
            //    if (error.data.errorMessage) {
            //        angular.forEach(error.data.errorMessage, function (value, key) {
            //            $scope.errors.push(value.message);
            //        });
            //    }
            //});
            var allObjextContTypes = [];

            var tmpContnetDomains = angular.copy($scope.domainsSearchTreeStructure);

            for (var i = 0; i < tmpContnetDomains.length; i++) {
                var node = angular.copy(tmpContnetDomains[i]);
                if (node.children.length > 0) {
                    for (var j = 0; j < node.children.length; j++) {
                        if (node.children[j].children.length == 0) {
                            node.children[j] = undefined;
                        }
                    }
                }
                else
                    node = undefined;
                allObjextContTypes.push(node);
            }
            $scope.$broadcast("loadDualMultiSelectControl#listContentTypes", allObjextContTypes, $scope.selectedListAttrContentTypes);

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

        /* List functions */
        $scope.RemoveOptionFromList = function (list, option) {
            if (list && list.length > 0) {
                var optionIndex = list.indexOf(option);

                if (optionIndex >= 0) {
                    list.splice(optionIndex, 1);
                }
            }
        };

        $scope.FetchOptionFromList = function (list, optionKey) {
            var item = null;

            if (list && list.length > 0) {
                var itemCount = list.length;
                for (var i = 0; i < itemCount; ++i) {
                    if (list[i].key === optionKey) {
                        item = list[i];
                        break;
                    }
                }
            }

            return item;
        };

        $scope.FetchSelectedKeysFromList = function (list) {
            var selectedKeys = [];

            if (list && list.length > 0) {
                var itemsCount = list.length;
                for (var i = 0; i < itemsCount; ++i) {
                    selectedKeys.push(items[i].key);
                }
            }

            return selectedKeys;
        };

        /* PickList MultiSelect Control functions */
        $scope.SelectPickListOption = function () {
            var selectedOptions = $("#picklist_available").val();
            if (selectedOptions && selectedOptions.length > 0) {
                var selectedCount = selectedOptions.length;
                for (var i = 0; i < selectedCount; ++i) {
                    var selectedOptionKey = selectedOptions[i];
                    var selectedOption = $scope.FetchOptionFromList($scope.avialablePickList, selectedOptionKey);
                    $scope.selectedPickList.push(selectedOption);
                    $scope.RemoveOptionFromList($scope.avialablePickList, selectedOption);
                }
            }
            return false;
        };
        $scope.DeSelectPickListOption = function () {
            var selectedOptions = $("#picklist_selected").val();
            if (selectedOptions && selectedOptions.length > 0) {
                var selectedCount = selectedOptions.length;
                for (var i = 0; i < selectedCount; ++i) {
                    var selectedOptionKey = selectedOptions[i];
                    var selectedOption = $scope.FetchOptionFromList($scope.selectedPickList, selectedOptionKey);
                    $scope.avialablePickList.push(selectedOption);
                    $scope.RemoveOptionFromList($scope.selectedPickList, selectedOption);
                }
            }
            return false;
        };

        /* MultiSelect - Default Selections */
        $scope.SelectDefaultListValue = function () {
            var selectedOptions = $("#listType_multiple_available").val();
            if (selectedOptions && selectedOptions.length > 0) {
                var selectedCount = selectedOptions.length;
                for (var i = 0; i < selectedCount; ++i) {
                    var selectedOptionKey = selectedOptions[i];
                    var selectedOption = $scope.FetchOptionFromList($scope.availableListValueOptions, selectedOptionKey);
                    $scope.selectedListValueOptions.push(selectedOption);
                    $scope.RemoveOptionFromList($scope.availableListValueOptions, selectedOption);
                }
            }
            return false;
        };
        $scope.DeSelectDefaultListValue = function () {
            var selectedOptions = $("#listType_multiple_selected").val();
            if (selectedOptions && selectedOptions.length > 0) {
                var selectedCount = selectedOptions.length;
                for (var i = 0; i < selectedCount; ++i) {
                    var selectedOptionKey = selectedOptions[i];
                    var selectedOption = $scope.FetchOptionFromList($scope.selectedListValueOptions, selectedOptionKey);
                    $scope.availableListValueOptions.push(selectedOption);
                    $scope.RemoveOptionFromList($scope.selectedListValueOptions, selectedOption);
                }
            }
            return false;
        };

        //**************************************** List Attribute Logical flow through ends********************************************

        //**************************************** Sub-Ojects Attribute  Logical flow through start ********************************************
        $scope.subObjectAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
            uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, subObjectType: null, customViewInterface: null,
            viewSubObjectTypeUsing: null, editSubObjectTypeUsing: null, customEditInterface: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

        $scope.findSubObjectById = function (subObjectId) {
            var obj = $scope.subObjects.filter(function (item) {
                return item.subObjectId === subObjectId;
            });
            if (obj.length > 0) return obj[0].singularName;
            return '';
        }

        $scope.clearsubObjectAttributeFields = function () {
            $scope.action = "Add";
            $scope.readonly = false;
            $scope.errors = [];
            $scope.errorsSubObject = [];
            $scope.isSubObjectAttribute = true;
            $scope.defaultviewUserinterfaces();
            $scope.defaulteditUserinterfaces();
            $scope.getSubObjects();
            $scope.subObjectAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, //isCompositeUnique: false,
                uniqueGroup: null, description: null, isAllowMultiValue: null, isValueUnique: null, customViewInterface: $scope.customInterfaces[0].key,
                viewSubObjectTypeUsing: null, editSubObjectTypeUsing: null, customEditInterface: $scope.customInterfaces[0].key,
                subObjectType: null,
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }

        $scope.getSubObjects = function () {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            $scope.errors = [];
            $scope.subObjects = [];

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
            subObjectService.query({ domainId: contentType.domainId, id: librariesId }).$promise.then(function (details) {

                // subObjectService.query({ id: contentType.contentTypeId }).$promise.then(function (details) {
                if (details) {
                    $scope.subObjects = details;
                    if ($scope.subObjectAttribute.subObjectType == null || $scope.subObjectAttribute.subObjectType == undefined) {
                        $scope.subObjectAttribute.subObjectType
                    }
                    $scope.subObjectAttribute.subObjectType = $scope.subObjects[0] && ($scope.subObjectAttribute.subObjectType == null || $scope.subObjectAttribute.subObjectType == '') ? $scope.subObjects[0].subObjectId : $scope.subObjectAttribute.subObjectType;
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while fetching sub objects. Please try after sometime.");
                }

            });
        }

        $scope.saveSubObject = function (subObjectAttribute) {
            $scope.errors = [];
            $scope.errorsSubObject = [];

            $scope.resetErrorDirective($scope.errorAttribute);
            var subObjectAttributeDTO = {
            };
            if ($scope.validateAttribute(subObjectAttribute, $scope.subObjectAttribute, 'subobject')) {
                //var contentType = sharedScope.get('rightMenuController').contentTypeModel;


                //add subobject attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                subObjectAttributeDTO.domainId = contentType.domainId;
                subObjectAttributeDTO.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                subObjectAttributeDTO.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                subObjectAttributeDTO.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                //subObjectAttributeDTO.contentTypeId = $routeParams.contentTypeId;
                subObjectAttributeDTO.subObjectId = $routeParams.subObjectId;
                subObjectAttributeDTO.attributeSetId = $routeParams.attributeSetId;
                subObjectAttributeDTO.attributeSetName = $routeParams.attributeScreenName;
                subObjectAttributeDTO.name = subObjectAttribute.name;
                subObjectAttributeDTO.identifier = subObjectAttribute.identifier;
                subObjectAttributeDTO.mandatory = subObjectAttribute.isMandatory;
                subObjectAttributeDTO.readOnly = subObjectAttribute.isReadOnly;
                subObjectAttributeDTO.uniqueValues = subObjectAttribute.isUnique;
                subObjectAttributeDTO.orderNo = subObjectAttribute.orderNo;
                if (subObjectAttribute.isSingularlyUnique == "1") {
                    subObjectAttributeDTO.IsSingularityUnique = true;
                    subObjectAttributeDTO.uniqueGroup = "";
                }
                else {
                    subObjectAttributeDTO.IsSingularityUnique = false;
                    subObjectAttributeDTO.uniqueGroup = subObjectAttribute.uniqueGroup;
                }
                subObjectAttributeDTO.description = subObjectAttribute.description;
                subObjectAttributeDTO.multipleValues = {
                    allowMultipleValues: subObjectAttribute.isAllowMultiValue, isUnique: subObjectAttribute.isValueUnique,
                    isReArranged: subObjectAttribute.canValueRearranged, minimumValue: subObjectAttribute.minNumOfValues, maximumValue: subObjectAttribute.maxNumOfValues
                };
                subObjectAttributeDTO.SubObjectType = subObjectAttribute.subObjectType;
                subObjectAttributeDTO.CustomViewInterface = subObjectAttribute.customViewInterface;
                subObjectAttributeDTO.CustomEditInterface = subObjectAttribute.customEditInterface;
                subObjectAttributeDTO.EditSubObjectTypeUsing = subObjectAttribute.editSubObjectTypeUsing;
                subObjectAttributeDTO.ViewSubObjectTypeUsing = subObjectAttribute.viewSubObjectTypeUsing;
                subObjectAttributeDTO.createdBy = $rootScope.manageITUserName;
                if (subObjectAttribute.attributeId == '') {
                    // newAttribute.createdDate = new Date();
                    subObjectsAttributeService.create(subObjectAttributeDTO).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Sub-Object Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#SubObjectAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Sub-Object Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    subObjectAttributeDTO.updatedBy = $rootScope.manageITUserName;
                    //newAttribute.updatedDate = new Date();
                    subObjectAttributeDTO.attributeId = subObjectAttribute.attributeId;
                    subObjectsAttributeService.update(subObjectAttributeDTO).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Sub-Object Attribute updated successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#SubObjectAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while updating the Sub-Object Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
            }
        }
        $scope.deleteSubObjectAttribute = function (selectedAttr) {

            $scope.errors = [];
            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //var newAttribute = new attributeDeleteService({ contentTypeId: contentType.contentTypeId, id: selectedAttr.attributeId });

            // delete subobject attribute based on contenttype and ;ibrary

            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // subObjectsAttributeService.remove(selectedAttr).$promise.then(function (response) {



            subObjectsAttributeService.remove({
                contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (response) {
                if (response.$resolved == true) {
                    $scope.errors.push("Sub-Object Attribute deleted successfully");
                    $scope.defaultAttributes();
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while deleting the Sub-Object Attribute. Please try after sometime.");
                }
            });
        }
        $scope.editSubObjectAttribute = function (subObjectAttribute) {
            //$scope.clearsubObjectAttributeFields();
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.isSubObjectAttribute = true;
            $scope.errors = [];
            $scope.action = "Edit";
            $scope.readonly = true;
            $scope.subObjectAttribute = subObjectAttribute;
            $scope.subObjectAttribute.attributeId = subObjectAttribute.attributeId;
            $scope.subObjectAttribute.name = subObjectAttribute.name;
            $scope.subObjectAttribute.identifier = subObjectAttribute.identifier;
            $scope.subObjectAttribute.mandatory = subObjectAttribute.isMandatory;
            $scope.subObjectAttribute.readOnly = subObjectAttribute.isReadOnly;
            $scope.subObjectAttribute.uniqueValues = subObjectAttribute.isUnique;
            $scope.subObjectAttribute.orderNo = subObjectAttribute.orderNo;
            //if (subObjectAttribute.isSingularlyUnique == "1") {
            //    $scope.subObjectAttribute.IsSingularityUnique = true;
            //    $scope.subObjectAttribute.uniqueGroup = "";
            //}
            //else {
            //    $scope.subObjectAttribute.IsSingularityUnique = false;
            //    $scope.subObjectAttribute.uniqueGroup = subObjectAttribute.uniqueGroup;
            //}


            if (subObjectAttribute.isUnique)
                $scope.subObjectAttribute.isSingularlyUnique = subObjectAttribute.isSingularityUnique == true ? 1 : 0;
            else $scope.subObjectAttribute.isSingularlyUnique = '';


            $scope.subObjectAttribute.description = subObjectAttribute.description;
            $scope.subObjectAttribute.multipleValues = {
                allowMultipleValues: subObjectAttribute.isAllowMultiValue, isUnique: subObjectAttribute.isValueUnique,
                isReArranged: subObjectAttribute.canValueRearranged, minimumValue: subObjectAttribute.minNumOfValues, maximumValue: subObjectAttribute.maxNumOfValues
            };
            $scope.subObjectAttribute.customViewInterface = subObjectAttribute.customViewInterface;
            $scope.subObjectAttribute.customEditInterface = subObjectAttribute.customEditInterface;
            $scope.subObjectAttribute.editSubObjectTypeUsing = subObjectAttribute.editSubObjectTypeUsing;
            $scope.subObjectAttribute.viewSubObjectTypeUsing = subObjectAttribute.viewSubObjectTypeUsing;
            $scope.subObjectAttribute.subObjectType = subObjectAttribute.subObjectType;

        }
        //**************************************** Sub-Objects Attribute Logical flow through ends********************************************

        //**************************************** DateTime Attribute  Logical flow through start ********************************************
        var defaultMinutes = new Date().getMinutes().toString().length > 1 ? new Date().getMinutes() : ('0' + new Date().getMinutes());
        var hours = new Date().getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        var ampmhours = hours % 12;
        var ampm_hours = ampmhours ? ampmhours : 12;
        var defaultHours = ampm_hours.toString().length > 1 ? ampm_hours : ('0' + ampm_hours);
        var defaultTime = defaultHours + ':' + defaultMinutes + ' ' + ampm;
        $scope.timeCalculator = function (date, formatKey) {
            var defaultMinutes = new Date(date).getMinutes().toString().length > 1 ? new Date().getMinutes() : ('0' + new Date().getMinutes());
            var hours = new Date(date).getHours();
            var seconds = new Date(date).getSeconds();
            var ampm = hours >= 12 ? 'pm' : 'am';
            var ampmhours = hours % 12;
            var ampm_hours = ampmhours ? ampmhours : 12;
            var defaultHours = ampm_hours.toString().length > 1 ? ampm_hours : ('0' + ampm_hours);
            var defaultTime = defaultHours + ':' + defaultMinutes + ' ' + ampm;
            if (formatKey == 0) {
                defaultTime = hours + ':' + defaultMinutes;
            }
            if (formatKey == 1) {
                defaultTime = hours + ':' + defaultMinutes + ':' + seconds;
            }
            if (formatKey == 3) {
                defaultTime = defaultHours + ':' + defaultMinutes + ':' + seconds + ' ' + ampm;
            }
            else {
                defaultTime = defaultTime;
            }
            return defaultTime;
        }
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

        $scope.clearDateTimeFieldsAfterSave = function () {
            $scope.errorsDateTime = [];
            $scope.dateTimeAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                dateFormat: $scope.dateFormatDefaultValues[0].key, timeFormat: $scope.timeFormatDefaultValues[2].key, minimumDateTime: $scope.minMaxDateTimeDefaultValues[0].key,
                maximumDateTime: $scope.minMaxDateTimeDefaultValues[1].key, defaultDateTime: $scope.minMaxDateTimeDefaultValues[2].key,
                minDateTimeValues: {
                    date: null, time: null, timeOffset: 1, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                maxDateTimeValues: {
                    date: null, time: null, timeOffset: 1, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                defaultDateTimeValues: {
                    date: null, time: null, timeOffset: 1, timeOffsetType: $scope.timeOffSetDefaultValues[0].key
                },
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }

        $scope.saveDateTimeAttribute = function (dateTimeAttribute) {
            $scope.errors = [];
            $scope.errorsDateTime = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(dateTimeAttribute, $scope.errorAttribute, 'datetime')) {
                //create an instance of the factory
                var newAttribute = new dateTimeAttributeService();

                //add datetime attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newAttribute.domainId = contentType.domainId;
                newAttribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newAttribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newAttribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                //  newAttribute.contentTypeId = $routeParams.contentTypeId;


                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.attributeSetName = $routeParams.attributeScreenName;
                newAttribute.orderNo = dateTimeAttribute.orderNo;
                if (dateTimeAttribute.attributeId == '') {
                    newAttribute.name = dateTimeAttribute.name;
                    newAttribute.identifier = dateTimeAttribute.identifier;
                    newAttribute.mandatory = dateTimeAttribute.isMandatory;
                    newAttribute.readOnly = dateTimeAttribute.isReadOnly;
                    newAttribute.uniqueValues = dateTimeAttribute.isUnique;
                    if (dateTimeAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = dateTimeAttribute.uniqueGroup;
                    }
                    newAttribute.description = dateTimeAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: dateTimeAttribute.isAllowMultiValue,
                        isUnique: dateTimeAttribute.isValueUnique,
                        isReArranged: dateTimeAttribute.canValueRearranged,
                        minimumValue: dateTimeAttribute.minNumOfValues,
                        maximumValue: dateTimeAttribute.maxNumOfValues
                    };
                    //DateTime Attribute properties
                    newAttribute.dateFormat = dateTimeAttribute.dateFormat;
                    newAttribute.timeFormat = dateTimeAttribute.timeFormat;
                    newAttribute.minimumDateTime = dateTimeAttribute.minimumDateTime;
                    newAttribute.maximumDateTime = dateTimeAttribute.maximumDateTime;
                    newAttribute.defaultDateTime = dateTimeAttribute.defaultDateTime;

                    newAttribute.minDateTimeValues = dateTimeAttribute.minDateTimeValues;
                    newAttribute.minDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultValues[dateTimeAttribute.minDateTimeValues.timeOffsetType].key;
                    newAttribute.maxDateTimeValues = dateTimeAttribute.maxDateTimeValues;
                    newAttribute.maxDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultValues[dateTimeAttribute.maxDateTimeValues.timeOffsetType].key;
                    newAttribute.defaultDateTimeValues = dateTimeAttribute.defaultDateTimeValues;
                    newAttribute.defaultDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultValues[dateTimeAttribute.defaultDateTimeValues.timeOffsetType].key;

                    newAttribute.createdBy = $rootScope.manageITUserName;
                    // newAttribute.createdDate = new Date();
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    dateTimeAttributeService.create({ attributeType: 'datetimeattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            //$scope.clearTextAttributeFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("DateTime Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#DateTimeAttribute');

                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the DateTime Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    newAttribute.attributeId = dateTimeAttribute.attributeId;
                    newAttribute.updatedBy = $rootScope.manageITUserName;
                    newAttribute.name = dateTimeAttribute.name;
                    newAttribute.identifier = dateTimeAttribute.identifier;
                    newAttribute.mandatory = dateTimeAttribute.isMandatory;
                    newAttribute.readOnly = dateTimeAttribute.isReadOnly;
                    newAttribute.uniqueValues = dateTimeAttribute.isUnique;
                    if (dateTimeAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = dateTimeAttribute.uniqueGroup;
                    }
                    newAttribute.description = dateTimeAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: dateTimeAttribute.isAllowMultiValue, isUnique: dateTimeAttribute.isValueUnique,
                        isReArranged: dateTimeAttribute.canValueRearranged, minimumValue: dateTimeAttribute.minNumOfValues, maximumValue: dateTimeAttribute.maxNumOfValues
                    };
                    //DateTime Attribute properties
                    newAttribute.dateFormat = dateTimeAttribute.dateFormat;
                    newAttribute.timeFormat = dateTimeAttribute.timeFormat;
                    newAttribute.minimumDateTime = dateTimeAttribute.minimumDateTime;
                    newAttribute.maximumDateTime = dateTimeAttribute.maximumDateTime;
                    newAttribute.defaultDateTime = dateTimeAttribute.defaultDateTime;
                    newAttribute.minDateTimeValues = dateTimeAttribute.minDateTimeValues;
                    newAttribute.maxDateTimeValues = dateTimeAttribute.maxDateTimeValues;
                    newAttribute.defaultDateTimeValues = dateTimeAttribute.defaultDateTimeValues;
                    //if (dateTimeAttribute.timeFormat == 0 || dateTimeAttribute.timeFormat == 1) {
                    //    if (newAttribute.minDateTimeValues.time != null && newAttribute.minDateTimeValues.time != undefined) {
                    //        var minTime = newAttribute.minDateTimeValues.time.split(':')[0] + ":" + newAttribute.minDateTimeValues.time.split(':')[1];
                    //        newAttribute.minDateTimeValues.time = minTime;
                    //    }
                    //    if (newAttribute.maxDateTimeValues.time != null && newAttribute.maxDateTimeValues.time != undefined) {
                    //        var maxTime = newAttribute.maxDateTimeValues.time.split(':')[0] + ":" + newAttribute.minDateTimeValues.time.split(':')[1];
                    //        newAttribute.maxDateTimeValues.time=maxTime
                    //    }
                    //}
                    var formatDateMin = new Date().toLocaleDateString() + ' ' + newAttribute.minDateTimeValues.time;
                    var formatDateMax = new Date().toLocaleDateString() + ' ' + newAttribute.maxDateTimeValues.time;

                    var formatDateDefault = new Date().toLocaleDateString() + ' ' + newAttribute.defaultDateTimeValues.time;

                    newAttribute.minDateTimeValues.time = new Date(formatDateMin);
                    newAttribute.maxDateTimeValues.time = new Date(formatDateMax);
                    newAttribute.defaultDateTimeValues.time = new Date(formatDateDefault);
                    dateTimeAttributeService.update({ attributeType: 'datetimeattribute' }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.errorAttribute.messages.push("DateTime Attribute updated successfully");
                            $scope.errorAttribute.isSuccess = true;
                            $scope.closeBackDrop('#DateTimeAttribute');
                            $scope.defaultAttributes();
                            $scope.clearDateTimeFieldsAfterSave();

                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                            });
                        }
                        else {

                            $scope.errorAttribute.messages.push("Error occured while saving the DateTime Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        }
        $scope.confirmClose = function (formName) {
            $scope.closeBackDrop('#' + formName);
        }
        $scope.deleteDateTimeAttribute = function (selectedAttr) {
            $scope.errors = [];
            $scope.errorsDateTime = [];
            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //var newAttribute = new attributeDeleteService({ contentTypeId: contentType.contentTypeId, id: selectedAttr.attributeId });

            // delete datetime attribute based on contenttype and ;ibrary

            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // dateTimeAttributeService.remove(selectedAttr).$promise.then(function (response) {



            dateTimeAttributeService.remove({
                contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (response) {
                if (response.$resolved == true) {
                    $scope.errors.push("DateTime Attribute deleted successfully");
                    $scope.defaultAttributes();
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while deleting the DateTime Attribute. Please try after sometime.");
                }
            });
        }

        $scope.editDateTimeAttribute = function (dateTimeAttribute) {
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.action = "Edit";
            $scope.errors = [];
            $scope.isDatetimeAttribute = true;
            $scope.readonly = true;
            $scope.dateTimeAttribute.attributeId = dateTimeAttribute.attributeId;
            $scope.dateTimeAttribute.name = dateTimeAttribute.name;
            $scope.dateTimeAttribute.identifier = dateTimeAttribute.identifier;
            $scope.dateTimeAttribute.isMandatory = dateTimeAttribute.mandatory;
            $scope.dateTimeAttribute.isReadOnly = dateTimeAttribute.readOnly;
            $scope.dateTimeAttribute.isUnique = dateTimeAttribute.uniqueValues;
            $scope.dateTimeAttribute.uniqueGroup = dateTimeAttribute.uniqueGroup;
            $scope.dateTimeAttribute.description = dateTimeAttribute.description;
            $scope.dateTimeAttribute.isAllowMultiValue = dateTimeAttribute.multipleValues.allowMultipleValues;
            $scope.dateTimeAttribute.isValueUnique = dateTimeAttribute.multipleValues.isUnique;
            $scope.dateTimeAttribute.orderNo = dateTimeAttribute.orderNo;
            if (dateTimeAttribute.uniqueValues)
                $scope.dateTimeAttribute.isSingularlyUnique = dateTimeAttribute.isSingularityUnique == true ? 1 : 0;
            else $scope.dateTimeAttribute.isSingularlyUnique = '';
            $scope.dateTimeAttribute.canValueRearranged = dateTimeAttribute.multipleValues.isReArranged;
            $scope.dateTimeAttribute.minNumOfValues = dateTimeAttribute.multipleValues.minimumValue;
            $scope.dateTimeAttribute.maxNumOfValues = dateTimeAttribute.multipleValues.maximumValue;

            //DateTime Attribute properties
            $scope.dateTimeAttribute.dateFormat = dateTimeAttribute.dateFormat;
            $scope.dateTimeAttribute.timeFormat = dateTimeAttribute.timeFormat;
            $scope.dateTimeAttribute.minimumDateTime = dateTimeAttribute.minimumDateTime;
            $scope.dateTimeAttribute.maximumDateTime = dateTimeAttribute.maximumDateTime;
            $scope.dateTimeAttribute.defaultDateTime = dateTimeAttribute.defaultDateTime;

            $scope.dateTimeAttribute.minDateTimeValues = {
                date: new Date(dateTimeAttribute.minDateTimeValues.date),
                time: new Date(dateTimeAttribute.minDateTimeValues.time).toLocaleTimeString(),
                timeOffset: dateTimeAttribute.minDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultValues[dateTimeAttribute.minDateTimeValues.timeOffsetType].key
            };
            //$scope.dateTimeAttribute.minDateTimeValues.time = $scope.timeCalculator(dateTimeAttribute.minDateTimeValues.time, dateTimeAttribute.timeFormat);
            $scope.dateTimeAttribute.maxDateTimeValues = {
                date: new Date(dateTimeAttribute.maxDateTimeValues.date),
                time: new Date(dateTimeAttribute.maxDateTimeValues.time).toLocaleTimeString(),
                timeOffset: dateTimeAttribute.maxDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultValues[dateTimeAttribute.maxDateTimeValues.timeOffsetType].key
            };
            $scope.dateTimeAttribute.defaultDateTimeValues = {
                date: new Date(dateTimeAttribute.defaultDateTimeValues.date),
                time: new Date(dateTimeAttribute.defaultDateTimeValues.time).toLocaleTimeString(),
                timeOffset: dateTimeAttribute.defaultDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultValues[dateTimeAttribute.defaultDateTimeValues.timeOffsetType].key
            };
            $scope.dateTimeAttribute.minDateTimeValues.time = $scope.timeFormatter($scope.dateTimeAttribute.timeFormat, $scope.dateTimeAttribute.minDateTimeValues.time);
            $scope.dateTimeAttribute.maxDateTimeValues.time = $scope.timeFormatter($scope.dateTimeAttribute.timeFormat, $scope.dateTimeAttribute.maxDateTimeValues.time);
            $scope.dateTimeAttribute.defaultDateTimeValues.time = $scope.timeFormatter($scope.dateTimeAttribute.timeFormat, $scope.dateTimeAttribute.defaultDateTimeValues.time);

        }
        //**************************************** DateTime Attribute Logical flow through ends********************************************

        //**************************************** Date Attribute  Logical flow through start ********************************************
        $scope.dateAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
            description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
            dateFormat: $scope.dateFormatDefaultValues[0].key, minimumDateTime: $scope.minMaxDateTimeDefaultValues[0].key,
            maximumDateTime: $scope.minMaxDateTimeDefaultValues[1].key, defaultDateTime: $scope.minMaxDateTimeDefaultValues[2].key,
            minDateTimeValues: {
                date: new Date(), timeOffset: null, timeOffsetType: null
            },
            maxDateTimeValues: {
                date: new Date(), timeOffset: null, timeOffsetType: null
            },
            defaultDateTimeValues: {
                date: new Date(), timeOffset: null, timeOffsetType: null
            },
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
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

        $scope.clearDateFieldsAfterSave = function () {
            $scope.errorsDate = [];
            $scope.dateAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                dateFormat: $scope.dateFormatDefaultValues[0].key, minimumDateTime: $scope.minMaxDateDefaultValues[0].key,
                maximumDateTime: $scope.minMaxDateDefaultValues[1].key, defaultDateTime: $scope.minMaxDateDefaultValues[2].key,
                minDateTimeValues: {
                    date: null, timeOffset: null, timeOffsetType: null
                },
                maxDateTimeValues: {
                    date: null, timeOffset: null, timeOffsetType: null
                },
                defaultDateTimeValues: {
                    date: null, timeOffset: null, timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
                },
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }
        //functions for handle cancel popup Start
        $scope.openErrorScreen = function (formStatus, formName, isSubForm, parentForm) {
            $scope.attributeFormDirty = formStatus;
            $scope.attributeForm = formName;
            $scope.isSubAttributeForm = isSubForm;
            if (isSubForm)
                $scope.parentAttributedForm = parentForm;
            $scope.isErrorScreen = true;
            if (parentForm == "imageReferenceAttributeForm" || formName == "imageReferenceAttributeForm") {
                if ($scope.selectedImageSearchOptions.length > 0 || $scope.selectedImageLibraries.length > 0 || $scope.selectedImageContentTypes.length > 0) {
                    formStatus = true;
                }
                else {
                    if ($scope.selectedImageLibraryTypes.length > 0 && formName != "imageReferenceConfiguration")
                        formStatus = true;
                }
            }
            if (parentForm == "documentReferenceAttributeForm" || formName == "documentReferenceAttributeForm") {
                if ($scope.documentReferenceAttribute.selectedDocSourceOptions.length > 0 || $scope.documentReferenceAttribute.selectedDocLibraries.length > 0 || $scope.documentReferenceAttribute.selectedDocContentTypes.length > 0) {
                    formStatus = true;
                }
                else {
                    if ($scope.documentReferenceAttribute.selectedDocTypes.length > 0 && formName != "linkedDocumentSources")
                        formStatus = true;
                }
            }
            var message = "";
            if (formStatus) {
                message = "There are unsaved changes, Are you sure you want to discard the changes?";

                dialogModal(message, "Confirm", "Ok", "Cancel", $('#' + formName + 'Attribute')).result.then(function (x) {
                    if (x == true) {
                        $scope.confirmErrorScreenClose(formName, isSubForm, parentForm);
                    }
                });
            }
            else {
                angular.element('#' + formName + 'Attribute').modal('hide');
                $("#" + formName).modal('toggle');
                $scope.attributeFormDirty = false;
                $scope.attributeForm = "";
            }
        }
        $scope.confirmErrorScreenClose = function (attributeForm, isSubForm, parentForm) {
            angular.element('#' + attributeForm + 'Attribute').modal('hide');
            $("#" + attributeForm).modal('toggle');
            $scope.attributeFormDirty = false;
            $scope.attributeForm = "";
            var formName = attributeForm.substring(0, 1).toLowerCase() + attributeForm.substring(1) + "AttributeForm";
            if (isSubForm) {
                var attrFormScope = $scope.formScope[parentForm];
                var attrForm = attrFormScope[formName];
                attrForm.$setPristine();
            }
            else {
                var attrFormScope = $scope.formScope[formName];
                var attrForm = attrFormScope[formName];
                attrForm.$setPristine();
            }
            $scope.isErrorScreen = false;
            if (attributeForm == 'DateTime') {
                $scope.clearDateTimeAttributeFields();
            }
            else if (attributeForm == 'Date') {
                $scope.clearDateAttributeFields();
            }
            else if (attributeForm == 'Time') {
                $scope.clearTimeAttributeFields();
            }
            else if (attributeForm == 'YesNo') {
                $scope.clearYesNoAttributeFields();
            }
            else if (attributeForm == 'Decimal') {
                $scope.clearDecimalAttributeFields();
            }
            else if (attributeForm == 'Sequence') {
                $scope.clearSequenceAttributeFields();
            }
            else if (attributeForm == 'Copy') {
                $scope.clearCopyAttribute();
            }
            else if (attributeForm == 'imageTypesConfiguration') {
                //$scope.clearImageReferenceFields();
                $scope.clearAcceptedImageTypes();
                $scope.changeImageApplyType('1');
                $scope.isFormchange = false;
            }
            else if (attributeForm == "referenceTypesConfigurationAttribute") {
                $scope.changeReferenceApplyType('1');
                $scope.isFormchange = false;
                //$scope.clearObjectReferenceAttributeValues();
                $scope.clearAcceptedObjectTypes();
            }
            else if (attributeForm == "acceptedDocumentTypes") {
                $scope.changeDocApplyType('1');
                $scope.isFormchange = false;
                //$scope.clearDocReferenceAttributeFields();
                $scope.clearAcceptedDocTypes();
            }
        }
        //functions for handle cancel popup End
        $scope.saveDateAttribute = function (dateAttribute) {
            $scope.errors = [];
            $scope.errorsDate = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(dateAttribute, $scope.errorAttribute, 'date')) {
                //create an instance of the factory
                var newAttribute = new dateAttributeService();

                //add date attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newAttribute.domainId = contentType.domainId;
                newAttribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newAttribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newAttribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                //                newAttribute.contentTypeId = $routeParams.contentTypeId;

                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.attributeSetName = $routeParams.attributeScreenName;
                newAttribute.orderNo = dateAttribute.orderNo;
                if (dateAttribute.attributeId == '') {
                    newAttribute.name = dateAttribute.name;
                    newAttribute.identifier = dateAttribute.identifier;
                    newAttribute.mandatory = dateAttribute.isMandatory;
                    newAttribute.readOnly = dateAttribute.isReadOnly;
                    newAttribute.uniqueValues = dateAttribute.isUnique;
                    if (dateAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = dateAttribute.uniqueGroup;
                    }
                    if (dateAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    newAttribute.multipleValues = {
                        allowMultipleValues: dateAttribute.isAllowMultiValue, isUnique: dateAttribute.isValueUnique,
                        isReArranged: dateAttribute.canValueRearranged, minimumValue: dateAttribute.minNumOfValues, maximumValue: dateAttribute.maxNumOfValues
                    };
                    newAttribute.description = dateAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: dateAttribute.isAllowMultiValue, isUnique: dateAttribute.isValueUnique,
                        isReArranged: dateAttribute.canValueRearranged, minimumValue: dateAttribute.minNumOfValues, maximumValue: dateAttribute.maxNumOfValues
                    };
                    //Date Attribute properties
                    newAttribute.dateFormat = dateAttribute.dateFormat;
                    newAttribute.minimumDateTime = dateAttribute.minimumDateTime;
                    newAttribute.maximumDateTime = dateAttribute.maximumDateTime;
                    newAttribute.defaultDateTime = dateAttribute.defaultDateTime;

                    newAttribute.minDateTimeValues = dateAttribute.minDateTimeValues;
                    newAttribute.minDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultDateValues[0].key;
                    newAttribute.maxDateTimeValues = dateAttribute.maxDateTimeValues;
                    newAttribute.maxDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultDateValues[0].key;
                    newAttribute.defaultDateTimeValues = dateAttribute.defaultDateTimeValues;
                    newAttribute.defaultDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultDateValues[0].key;
                    newAttribute.createdBy = $rootScope.manageITUserName;
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    dateAttributeService.createLib({ attributeType: 'dateattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearDateFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Date Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#DateAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Text Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    newAttribute.attributeId = dateAttribute.attributeId;
                    newAttribute.name = dateAttribute.name;
                    newAttribute.identifier = dateAttribute.identifier;
                    newAttribute.mandatory = dateAttribute.isMandatory;
                    newAttribute.readOnly = dateAttribute.isReadOnly;
                    newAttribute.uniqueValues = dateAttribute.isUnique;
                    if (dateAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = dateAttribute.uniqueGroup;
                    }
                    newAttribute.description = dateAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: dateAttribute.isAllowMultiValue, isUnique: dateAttribute.isValueUnique,
                        isReArranged: dateAttribute.canValueRearranged, minimumValue: dateAttribute.minNumOfValues, maximumValue: dateAttribute.maxNumOfValues
                    };
                    newAttribute.updatedBy = $rootScope.manageITUserName;
                    //Date Attribute properties
                    newAttribute.dateFormat = dateAttribute.dateFormat;
                    newAttribute.minimumDateTime = dateAttribute.minimumDateTime;
                    newAttribute.maximumDateTime = dateAttribute.maximumDateTime;
                    newAttribute.defaultDateTime = dateAttribute.defaultDateTime;

                    newAttribute.minDateTimeValues = dateAttribute.minDateTimeValues;
                    newAttribute.minDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultDateValues[0].key;
                    newAttribute.maxDateTimeValues = dateAttribute.maxDateTimeValues;
                    newAttribute.maxDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultDateValues[0].key;
                    newAttribute.defaultDateTimeValues = dateAttribute.defaultDateTimeValues;
                    newAttribute.defaultDateTimeValues.timeOffsetType = $scope.timeOffSetDefaultDateValues[0].key;
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    dateAttributeService.updateLib({ attributeType: 'dateattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearDateFieldsAfterSave();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Date Attribute updated successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#DateAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Date Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        }

        $scope.deleteDateAttribute = function (selectedAttr) {
            $scope.errors = [];
            $scope.errorsDate = [];

            // delete date attribute based on contenttype and ;ibrary

            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // dateAttributeService.remove(selectedAttr).$promise.then(function (response) {


            dateAttributeService.remove({
                contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (response) {
                if (response.$resolved == true) {
                    $scope.errors.push("Date Attribute deleted successfully");
                    $scope.defaultAttributes();
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while deleting the Date Attribute. Please try after sometime.");
                }
            });
        }

        $scope.editDateAttribute = function (dateAttribute) {
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.action = "Edit";
            $scope.errors = [];
            $scope.isDateAttribute = true;
            $scope.readonly = true;
            $scope.dateAttribute.attributeId = dateAttribute.attributeId;
            $scope.dateAttribute.name = dateAttribute.name;
            $scope.dateAttribute.identifier = dateAttribute.identifier;
            $scope.dateAttribute.isMandatory = dateAttribute.mandatory;
            $scope.dateAttribute.isReadOnly = dateAttribute.readOnly;
            $scope.dateAttribute.isUnique = dateAttribute.uniqueValues;
            $scope.dateAttribute.uniqueGroup = dateAttribute.uniqueGroup;
            $scope.dateAttribute.description = dateAttribute.description;
            $scope.dateAttribute.orderNo = dateAttribute.orderNo;
            $scope.dateAttribute.isAllowMultiValue = dateAttribute.multipleValues.allowMultipleValues;
            $scope.dateAttribute.isValueUnique = dateAttribute.multipleValues.isUnique;
            if (dateAttribute.uniqueValues)
                $scope.dateAttribute.isSingularlyUnique = dateAttribute.isSingularityUnique == true ? 1 : 0;
            else $scope.dateAttribute.isSingularlyUnique = '';
            $scope.dateAttribute.canValueRearranged = dateAttribute.multipleValues.isReArranged;
            $scope.dateAttribute.minNumOfValues = dateAttribute.multipleValues.minimumValue;
            $scope.dateAttribute.maxNumOfValues = dateAttribute.multipleValues.maximumValue;

            //Date Attribute properties
            $scope.dateAttribute.dateFormat = dateAttribute.dateFormat;
            $scope.dateAttribute.minimumDateTime = dateAttribute.minimumDateTime;
            $scope.dateAttribute.maximumDateTime = dateAttribute.maximumDateTime;
            $scope.dateAttribute.defaultDateTime = dateAttribute.defaultDateTime;

            $scope.dateAttribute.minDateTimeValues = {
                date: new Date(dateAttribute.minDateTimeValues.date),
                timeOffset: dateAttribute.minDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
            };
            $scope.dateAttribute.maxDateTimeValues = {
                date: new Date(dateAttribute.maxDateTimeValues.date),
                timeOffset: dateAttribute.maxDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
            };
            $scope.dateAttribute.defaultDateTimeValues = {
                date: new Date(dateAttribute.defaultDateTimeValues.date),
                timeOffset: dateAttribute.defaultDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultDateValues[0].key
            };
        }
        //**************************************** Date Attribute Logical flow through ends********************************************

        //**************************************** Time Attribute  Logical flow through start ********************************************
        $scope.timeAttribute = {
            attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
            description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
            timeFormat: $scope.timeFormatDefaultValues[2].key, minimumDateTime: $scope.minMaxTimeDefaultValues[0].key,
            maximumDateTime: $scope.minMaxTimeDefaultValues[1].key, defaultDateTime: $scope.minMaxTimeDefaultValues[2].key,
            minDateTimeValues: {
                time: null, timeOffset: null, timeOffsetType: null
            },
            maxDateTimeValues: {
                time: null, timeOffset: null, timeOffsetType: null
            },
            defaultDateTimeValues: {
                time: null, timeOffset: null, timeOffsetType: null
            },
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };

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
            //$scope.timeTormat = "hh:mm am";
        }

        $scope.clearTimeFieldsAfterSave = function () {
            $scope.errorsTime = [];
            $scope.timeAttribute = {
                attributeId: '', name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                timeFormat: $scope.timeFormatDefaultValues[2].key, minimumDateTime: $scope.minMaxTimeDefaultValues[0].key,
                maximumDateTime: $scope.minMaxTimeDefaultValues[1].key, defaultDateTime: $scope.minMaxTimeDefaultValues[2].key,
                minDateTimeValues: {
                    time: defaultTime, timeOffset: null, timeOffsetType: null
                },
                maxDateTimeValues: {
                    time: defaultTime, timeOffset: null, timeOffsetType: null
                },
                defaultDateTimeValues: {
                    time: defaultTime, timeOffset: null, timeOffsetType: null
                },
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        }

        $scope.saveTimeAttribute = function (timeAttribute) {
            $scope.errors = [];
            $scope.errorsTime = [];
            $scope.resetErrorDirective($scope.errorAttribute);

            if ($scope.validateAttribute(timeAttribute, $scope.errorAttribute, 'time')) {
                var newAttribute = new timeAttributeService();

                //add time attribute based on lib and contentType

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newAttribute.domainId = contentType.domainId;
                newAttribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newAttribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newAttribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                //   newAttribute.contentTypeId = $routeParams.contentTypeId;

                newAttribute.subObjectId = $routeParams.subObjectId;
                newAttribute.attributeSetId = $routeParams.attributeSetId;
                newAttribute.attributeSetName = $routeParams.attributeScreenName;
                newAttribute.orderNo = timeAttribute.orderNo;
                if (timeAttribute.attributeId == '') {

                    newAttribute.name = timeAttribute.name;
                    newAttribute.identifier = timeAttribute.identifier;
                    newAttribute.mandatory = timeAttribute.isMandatory;
                    newAttribute.readOnly = timeAttribute.isReadOnly;
                    newAttribute.uniqueValues = timeAttribute.isUnique;
                    if (timeAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = timeAttribute.uniqueGroup;
                    }
                    newAttribute.description = timeAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: timeAttribute.isAllowMultiValue, isUnique: timeAttribute.isValueUnique,
                        isReArranged: timeAttribute.canValueRearranged, minimumValue: timeAttribute.minNumOfValues, maximumValue: timeAttribute.maxNumOfValues
                    };
                    //Time Attribute properties
                    newAttribute.timeFormat = timeAttribute.timeFormat;
                    newAttribute.minimumDateTime = timeAttribute.minimumDateTime;
                    newAttribute.maximumDateTime = timeAttribute.maximumDateTime;
                    newAttribute.defaultDateTime = timeAttribute.defaultDateTime;

                    newAttribute.minDateTimeValues = timeAttribute.minDateTimeValues;
                    newAttribute.maxDateTimeValues = timeAttribute.maxDateTimeValues;
                    newAttribute.defaultDateTimeValues = timeAttribute.defaultDateTimeValues;
                    newAttribute.createdBy = $rootScope.manageITUserName;
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    timeAttributeService.createLib({ attributeType: 'timeattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearTimeAttributeFields();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Time Attribute saved successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#TimeAttribute');

                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Time Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    newAttribute.attributeId = timeAttribute.attributeId;
                    newAttribute.name = timeAttribute.name;
                    newAttribute.identifier = timeAttribute.identifier;
                    newAttribute.mandatory = timeAttribute.isMandatory;
                    newAttribute.readOnly = timeAttribute.isReadOnly;
                    newAttribute.uniqueValues = timeAttribute.isUnique;
                    if (newAttribute.isSingularlyUnique == "1") {
                        newAttribute.IsSingularityUnique = true;
                        newAttribute.uniqueGroup = "";
                    }
                    else {
                        newAttribute.IsSingularityUnique = false;
                        newAttribute.uniqueGroup = timeAttribute.uniqueGroup;
                    }
                    newAttribute.description = timeAttribute.description;
                    newAttribute.multipleValues = {
                        allowMultipleValues: timeAttribute.isAllowMultiValue, isUnique: timeAttribute.isValueUnique,
                        isReArranged: timeAttribute.canValueRearranged, minimumValue: timeAttribute.minNumOfValues, maximumValue: timeAttribute.maxNumOfValues
                    };
                    //Time Attribute properties
                    newAttribute.timeFormat = timeAttribute.timeFormat;
                    newAttribute.minimumDateTime = timeAttribute.minimumDateTime;
                    newAttribute.maximumDateTime = timeAttribute.maximumDateTime;
                    newAttribute.defaultDateTime = timeAttribute.defaultDateTime;

                    newAttribute.minDateTimeValues = timeAttribute.minDateTimeValues;
                    newAttribute.maxDateTimeValues = timeAttribute.maxDateTimeValues;
                    newAttribute.defaultDateTimeValues = timeAttribute.defaultDateTimeValues;
                    newAttribute.updatedBy = $rootScope.manageITUserName;
                    //newAttribute.updatedDate = new Date();
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    timeAttributeService.updateLib({ attributeType: 'timeattribute', domainId: contentType.domainId }, newAttribute).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.clearTimeAttributeFields();
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Time Attribute updated successfully");
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#TimeAttribute');
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Time Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                        }
                    });
                }
            }
        }

        $scope.deleteTimeAttribute = function (selectedAttr) {
            $scope.errors = [];
            $scope.errorsTime = [];

            // delete time attribute based on contenttype and ;ibrary

            //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //selectedAttr.domainId = contentType.domainId
            //selectedAttr.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
            //selectedAttr.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
            //selectedAttr.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
            // timeAttributeService.remove(selectedAttr).$promise.then(function (response) {

            timeAttributeService.remove({
                contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (response) {
                if (response.$resolved == true) {
                    $scope.errors.push("Time Attribute deleted successfully");
                    $scope.defaultAttributes();
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errors.push("Error occured while deleting the Time Attribute. Please try after sometime.");
                }
            });
        }

        $scope.editTimeAttribute = function (timeAttribute) {
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.action = "Edit";
            $scope.errors = [];
            $scope.istimeAttribute = true;
            $scope.readonly = true;
            $scope.timeAttribute.attributeId = timeAttribute.attributeId;
            $scope.timeAttribute.name = timeAttribute.name;
            $scope.timeAttribute.identifier = timeAttribute.identifier;
            $scope.timeAttribute.isMandatory = timeAttribute.mandatory;
            $scope.timeAttribute.isReadOnly = timeAttribute.readOnly;
            $scope.timeAttribute.isUnique = timeAttribute.uniqueValues;
            $scope.timeAttribute.uniqueGroup = timeAttribute.uniqueGroup;
            $scope.timeAttribute.description = timeAttribute.description;
            $scope.timeAttribute.orderNo = timeAttribute.orderNo;
            $scope.timeAttribute.isAllowMultiValue = timeAttribute.multipleValues.allowMultipleValues;
            $scope.timeAttribute.isValueUnique = timeAttribute.multipleValues.isUnique;
            if (timeAttribute.uniqueValues)
                $scope.timeAttribute.isSingularlyUnique = timeAttribute.isSingularityUnique == true ? 1 : 0;
            else $scope.timeAttribute.isSingularlyUnique = '';
            $scope.timeAttribute.canValueRearranged = timeAttribute.multipleValues.isReArranged;
            $scope.timeAttribute.minNumOfValues = timeAttribute.multipleValues.minimumValue;
            $scope.timeAttribute.maxNumOfValues = timeAttribute.multipleValues.maximumValue;

            //Time Attribute properties
            $scope.timeAttribute.timeFormat = timeAttribute.timeFormat;
            $scope.timeAttribute.minimumDateTime = timeAttribute.minimumDateTime;
            $scope.timeAttribute.maximumDateTime = timeAttribute.maximumDateTime;
            $scope.timeAttribute.defaultDateTime = timeAttribute.defaultDateTime;

            $scope.timeAttribute.minDateTimeValues = {
                time: new Date(timeAttribute.minDateTimeValues.time).toLocaleTimeString(),
                timeOffset: timeAttribute.minDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultValues[timeAttribute.minDateTimeValues.timeOffsetType].key

            };
            $scope.timeAttribute.maxDateTimeValues = {
                time: new Date(timeAttribute.maxDateTimeValues.time).toLocaleTimeString(),
                timeOffset: timeAttribute.maxDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultValues[timeAttribute.maxDateTimeValues.timeOffsetType].key
            };
            $scope.timeAttribute.defaultDateTimeValues = {
                time: new Date(timeAttribute.defaultDateTimeValues.time).toLocaleTimeString(),
                timeOffset: timeAttribute.defaultDateTimeValues.timeOffset,
                timeOffsetType: $scope.timeOffSetDefaultValues[timeAttribute.defaultDateTimeValues.timeOffsetType].key
            };
            if (timeAttribute.minDateTimeValues.time != null) {
                $scope.timeAttribute.minDateTimeValues.time = $scope.timeFormatter($scope.timeAttribute.timeFormat, $scope.timeAttribute.minDateTimeValues.time);
            }
            else {
                $scope.timeAttribute.minDateTimeValues.time = null;
            }
            if (timeAttribute.maxDateTimeValues.time != null) {
                $scope.timeAttribute.maxDateTimeValues.time = $scope.timeFormatter($scope.timeAttribute.timeFormat, $scope.timeAttribute.maxDateTimeValues.time);
            }
            else {
                $scope.timeAttribute.maxDateTimeValues.time = null;
            }
            if (timeAttribute.defaultDateTimeValues.time != null) {
                $scope.timeAttribute.defaultDateTimeValues.time = $scope.timeFormatter($scope.timeAttribute.timeFormat, $scope.timeAttribute.defaultDateTimeValues.time);
            }
            else {
                $scope.timeAttribute.defaultDateTimeValues.time = null;
            }
        }
        //**************************************** Time Attribute Logical flow through ends********************************************

        //**************************************** Content Object Reference Attribute Logical flow through - Start *********************************

        $scope.clearObjectReferenceAttributeValues = function () {
            $scope.isObjectReferenceAttribute = true;
            $scope.action = 'Add';

            $scope.objectReferenceAttribute = {
                attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                isEditProduct: false, isViewProduct: false,
                referenceSelectionMethod: "1", referenceApplyType: "1", displayAs: "1",
                objectInnerNodeValues: {}, selectedObjectContentTypes: [], selectedObjectSearchOptions: [],
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };

            $scope.fetchDomainsDataForObjectAttribute();
        };

        $scope.fetchDomainsDataForObjectAttribute = function (successCallBack) {
            domainService.getAllDomains().$promise.then(function (result) {
                var domains = result;
                var gridRowData = [];

                var domainCount = domains.length;
                for (var i = 0; i < domainCount; ++i) {
                    var domain = domains[i];
                    if (domain) {
                        gridRowData.push({
                            id: domain.domainId,
                            contentType: domain.domainName,
                            isHeader: true,
                            cells: []
                        });
                        var contentTypes = domain.contentTypes;
                        var contentTypesCount = contentTypes ? contentTypes.length : 0;
                        for (var j = 0; j < contentTypesCount; ++j) {
                            var contentType = contentTypes[j];
                            if (contentType) {
                                var attributes = contentType.defaultAttributes;
                                var attributesCount = attributes ? attributes.length : 0;
                                var attributeOptions = [];
                                for (var k = 0; k < attributesCount; ++k) {
                                    var attribute = attributes[k];
                                    attributeOptions.push({
                                        label: attribute.name,
                                        value: attribute.attributeId
                                    });
                                }
                                gridRowData.push({
                                    id: contentType.contentTypeId,
                                    contentType: contentType.pluralName,
                                    isHeader: false,
                                    cells: [],
                                    attributes: attributeOptions
                                });
                            }
                        }
                    }
                }

                $scope.objectDetailsGridColumns = [{
                    title: "Content Types",
                    editable: false
                }];
                $scope.objectDetailsGridRows = angular.copy(gridRowData);
                $scope.objectLookupGridColumns = [{
                    title: "Content Types",
                    editable: false,
                    options: []
                }];
                $scope.objectLookupGridRows = angular.copy(gridRowData);

                if (successCallBack) {
                    successCallBack(result, $scope.objectDetailsGridRows, $scope.objectLookupGridRows);
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
            });
        };

        $scope.objectDetailsGridColumns = [];
        $scope.objectDetailsGridRows = [];
        $scope.objectLookupGridColumns = [];
        $scope.objectLookupGridRows = [];

        $scope.clearObjectReferenceAttributeValues();

        /* General Object Reference Functions - START */

        $scope.saveObjectReferenceAttribute = function () {
            //Save the data into the database and then close the dialog
            var attributeData = $scope.objectReferenceAttribute;

            $scope.errors = [];
            $scope.errorsText = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(attributeData, $scope.errorAttribute, 'objectRef')) {
                if (attributeData.attributeId == '') {
                    attributeData.attributeSetName = $routeParams.attributeScreenName;
                    //create the data object by mapping the properties
                    var objectReferenceData = $scope.MapObjectScopeDataToService(attributeData);

                    //add text attribute based on lib and contentType

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    objectReferenceData.domainId = contentType.domainId;
                    objectReferenceData.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                    objectReferenceData.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                    objectReferenceData.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';


                    objectReferenceAttributeService.createLib({ attributeType: 'ObjectReferenceAttribute', domainId: contentType.domainId }, objectReferenceData).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#ObjectReferenceAttribute');
                            $scope.clearImageReferenceAttributeFields();
                            $scope.errorAttribute.isError = false;
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Content Object Reference Attribute saved successfully");
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Content Object Reference Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    var objectReferenceData = $scope.MapObjectScopeDataToService(attributeData);
                   
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    objectReferenceData.domainId = contentType.domainId;
                    objectReferenceData.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                    objectReferenceData.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                    objectReferenceData.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                    objectReferenceAttributeService.updateLib({ attributeType: 'ObjectReferenceAttribute',domainId:contentType.domainId }, objectReferenceData).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#ObjectReferenceAttribute');
                            $scope.clearImageReferenceAttributeFields();
                            $scope.errorAttribute.isError = false;
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Content Object Reference Attribute updated successfully");
                            $scope.closeBackDrop('#ObjectReferenceAttribute');
                            //Reload the attributes section
                            $scope.defaultAttributes();
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Content Object Reference Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }

            }
        };

        $scope.editObjectReferenceAttribute = function (attribute) {
            var scopeData = $scope.MapServiceDataToObjectScope(attribute);
            $scope.objectReferenceAttribute = scopeData;

            //Show the modal dialog
            $scope.isObjectReferenceAttribute = true;
            $scope.action = "Edit";
        };

        $scope.deleteObjectReferenceAttribute = function (attribute) {
            $scope.errors = [];
            $scope.errorsText = [];
            if (attribute.attributeId) {

                // delete sequence attribute based on contenttype and ;ibrary

                //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                //attribute.domainId = contentType.domainId
                //attribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                //attribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                //attribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                // objectReferenceAttributeService.remove(attribute).$promise.then(function (response) {


                objectReferenceAttributeService.remove({
                    contentTypeId: $routeParams.contentTypeId,
                    id: attribute.attributeId,
                    attributeType: 'ObjectReferenceAttribute'
                }).$promise.then(function (response) {

                    if (response.$resolved == true) {
                        $scope.defaultAttributes();
                        $scope.errorAttribute.isError = false;
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("Content Object Reference Attribute deleted successfully");
                    }
                }, function (error) {

                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errors.push(value.message);
                        });
                    }
                    else {
                        $scope.errors.push("Error occured while deleting the Content Object Reference Attribute. Please try after sometime.");
                    }
                });
            }
        };

        $scope.MapObjectScopeDataToService = function (scopeData) {
            var serviceData = {};

            //Add the routing parameters also
            serviceData.contentTypeId = $routeParams.contentTypeId;
            serviceData.subObjectId = $routeParams.subObjectId;
            serviceData.attributeSetId = $routeParams.attributeSetId;

            //Common Properties
            serviceData.attributeId = scopeData.attributeId;
            serviceData.name = scopeData.name;
            serviceData.identifier = scopeData.identifier;
            serviceData.mandatory = scopeData.isMandatory;
            serviceData.readOnly = scopeData.isReadOnly;
            serviceData.uniqueValues = scopeData.isUnique;
            if (scopeData.isSingularlyUnique == "1") {
                serviceData.isSingularityUnique = true;
                serviceData.uniqueGroup = "";
            }
            else {
                serviceData.isSingularityUnique = false;
                serviceData.uniqueGroup = scopeData.uniqueGroup;
            }
            serviceData.description = scopeData.description;
            serviceData.multipleValues = {
                allowMultipleValues: scopeData.isAllowMultiValue,
                isUnique: scopeData.isValueUnique,
                isReArranged: scopeData.canValueRearranged,
                minimumValue: scopeData.minNumOfValues,
                maximumValue: scopeData.maxNumOfValues
            };

            //Map specific properties
            serviceData.editContentTypeBehaviour = scopeData.isEditProduct;
            serviceData.viewContentTypeBehaviour = scopeData.isViewProduct;

            serviceData.refselectionMethod = scopeData.referenceSelectionMethod;

            if (serviceData.refselectionMethod == "1") {
                serviceData.searchDisplay = scopeData.displayAs;
            }
            else if (serviceData.refselectionMethod == "2") {
                serviceData.selectDisplay = scopeData.displayAs;
            }
            else if (serviceData.RefselectionMethod == "3") {
                serviceData.lookupDisplay = scopeData.displayAs;
            }

            serviceData.isAnyContentType = false;
            if (scopeData.referenceApplyType == "1") {
                serviceData.isAnyContentType = true;
            }

            if (!serviceData.isAnyContentType) {
                var acceptedContentTypes = [];
                var selectedContentTypes = scopeData.selectedObjectContentTypes;
                var typesCount = selectedContentTypes ? selectedContentTypes.length : 0;
                for (var i = 0; i < typesCount; ++i) {
                    var selectedType = selectedContentTypes[i];
                    var acceptedType = {
                        id: selectedType.value,
                        name: selectedType.label
                    }

                    var innerNodeValues = scopeData.objectInnerNodeValues[selectedType.value];


                    if (innerNodeValues) {
                        var isAnyClassification = false;

                        //Selected Classifications
                        var selectedClassifications = [];
                        var classifications = innerNodeValues.selectedObjectClassifications;

                        isAnyClassification = (classifications.indexOf('100') >= 0);
                        acceptedType.isAnyClassification = isAnyClassification;

                        if (!isAnyClassification) {
                            var classificationsCount = classifications ? classifications.length : 0;
                            for (var j = 0; j < classificationsCount; ++j) {
                                selectedClassifications.push(classifications[j]);
                            }
                        }
                        acceptedType.selectedClassifications = selectedClassifications;

                        //Selected User Interfaces
                        var selectedUserInterfaces = [];
                        var interfaces = innerNodeValues.selectedObjectInterfaces;
                        var interfacesCount = interfaces ? interfaces.length : 0;
                        for (var j = 0; j < interfacesCount; ++j) {
                            selectedUserInterfaces.push({
                                userInterfaceId: interfaces[j],
                                isDefault: (interfaces[j] == innerNodeValues.defaultInterfaceId)
                            });
                        }

                        acceptedType.selectedUserInterfaces = selectedUserInterfaces;

                        //Selected User Layouts
                        var selectedLayouts = [];
                        var layouts = innerNodeValues.selectedObjectLayouts;
                        var layoutsCount = layouts ? layouts.length : 0;
                        for (var j = 0; j < layoutsCount; ++j) {
                            selectedLayouts.push({
                                layoutId: layouts[j],
                                isDefault: (layouts[j] == innerNodeValues.defaultLayoutId)
                            });
                        }

                        acceptedType.selectedLayouts = selectedLayouts;
                    }

                    acceptedContentTypes.push(acceptedType);
                }
                serviceData.acceptedContentTypes = acceptedContentTypes;
            }

            //Only populate the custom columns if necessary
            if (scopeData.referenceSelectionMethod != "3" && scopeData.displayAs == "3") {
                var columns = [];
                var rows = [];

                var selectedColumns = $scope.objectDetailsGridColumns;
                var columnsCount = selectedColumns ? selectedColumns.length : 0;
                for (var i = 0; i < columnsCount; ++i) {
                    columns.push(selectedColumns[i].title);
                }

                var selectedRows = $scope.objectDetailsGridRows;
                var rowsCount = selectedRows ? selectedRows.length : 0;
                for (var i = 0; i < rowsCount; ++i) {
                    var selectedRow = selectedRows[i];
                    var row = { contentTypeId: selectedRow.id };

                    var cells = [{
                        columnName: selectedColumns[0].title,
                        attributeId: ""
                    }];
                    var selectedCells = selectedRow.cells;
                    //Iterate based on the number of columns
                    for (var j = 1; j < columnsCount; ++j) {
                        var cell = {
                            columnName: selectedColumns[j].title,
                            attributeId: selectedCells[j - 1] ? selectedCells[j - 1] : ""
                        };

                        cells.push(cell);
                    }

                    row.cells = cells;
                    rows.push(row);
                }

                serviceData.detailsColumns = {
                    columns: columns,
                    rows: rows
                };
            }
            else if (scopeData.referenceSelectionMethod == "3" && scopeData.displayAs == "1") {
                var columns = [];
                var rows = [];

                var selectedColumns = $scope.objectLookupGridColumns;
                var columnsCount = selectedColumns ? selectedColumns.length : 0;
                for (var i = 0; i < columnsCount; ++i) {
                    columns.push(selectedColumns[i].title);
                }

                var selectedRows = $scope.objectLookupGridRows;
                var rowsCount = selectedRows ? selectedRows.length : 0;
                for (var i = 0; i < rowsCount; ++i) {
                    var selectedRow = selectedRows[i];
                    var row = { contentTypeId: selectedRow.id };

                    var cells = [{
                        columnName: selectedColumns[0].title,
                        attributeId: ""
                    }];
                    var selectedCells = selectedRow.cells;
                    //Iterate based on the number of columns
                    for (var j = 1; j < columnsCount; ++j) {
                        var cell = {
                            columnName: selectedColumns[j].title,
                            attributeId: selectedCells[j - 1] ? selectedCells[j - 1] : ""
                        };

                        cells.push(cell);
                    }

                    row.cells = cells;
                    rows.push(row);
                }

                serviceData.lookupColumns = {
                    columns: columns,
                    rows: rows
                };
            }

            //Map the search options
            serviceData.selectedSearch = $scope.MapSelectedItems(scopeData.selectedObjectSearchOptions);

            return serviceData;
        };

        $scope.MapServiceDataToObjectScope = function (serviceData) {
            var scopeData = {};

            //Common Properties
            scopeData.attributeId = serviceData.attributeId;
            scopeData.name = serviceData.name;
            scopeData.identifier = serviceData.identifier;
            scopeData.isMandatory = serviceData.mandatory;
            scopeData.isReadOnly = serviceData.readOnly;
            scopeData.isUnique = serviceData.uniqueValues;
            if (serviceData.isSingularityUnique) {
                scopeData.isSingularlyUnique = "1";
            }
            else {
                scopeData.isSingularlyUnique = "2";
                scopeData.uniqueGroup = serviceData.uniqueGroup;
            }

            scopeData.description = serviceData.description;

            if (serviceData.multipleValues) {
                scopeData.isAllowMultiValue = serviceData.multipleValues.allowMultipleValues;
                scopeData.isValueUnique = serviceData.multipleValues.isUnique;
                scopeData.canValueRearranged = serviceData.multipleValues.isReArranged;
                scopeData.minNumOfValues = serviceData.multipleValues.minimumValue;
                scopeData.maxNumOfValues = serviceData.multipleValues.maximumValue;
            }

            //Specific Properties
            scopeData.isViewProduct = serviceData.viewContentTypeBehaviour;
            scopeData.isEditProduct = serviceData.editContentTypeBehaviour;

            scopeData.referenceSelectionMethod = serviceData.refselectionMethod.toString();

            if (serviceData.refselectionMethod == "1") {
                scopeData.displayAs = serviceData.searchDisplay;
            }
            else if (serviceData.refselectionMethod == "2") {
                scopeData.displayAs = serviceData.selectDisplay;
            }
            else if (serviceData.refselectionMethod == "3") {
                scopeData.displayAs = serviceData.lookupDisplay;
            }

            if (serviceData.isAnyContentType) {
                scopeData.referenceApplyType = "1";
            }
            else {
                scopeData.referenceApplyType = "2";
                //Map the selected Content types
                scopeData.objectInnerNodeValues = {};
                scopeData.selectedObjectContentTypes = [];

                var acceptedContentTypes = serviceData.acceptedContentTypes;
                if (acceptedContentTypes && acceptedContentTypes.length > 0) {
                    var typesCount = acceptedContentTypes.length;
                    var selectedContentTypes = [];
                    for (var i = 0; i < typesCount; ++i) {
                        var acceptedType = acceptedContentTypes[i];
                        selectedContentTypes.push({
                            value: acceptedType.id,
                            label: acceptedType.name
                        });

                        var innerNodeValues = {};
                        //Selected Classifications
                        if (acceptedType.isAnyClassification) {
                            innerNodeValues.selectedObjectClassifications = ['100'];
                        }
                        else {
                            var selectedClassifications = acceptedType.selectedClassifications;
                            var count = selectedClassifications ? selectedClassifications.length : 0;
                            innerNodeValues.selectedObjectClassifications = [];
                            for (var j = 0; j < count; ++j) {
                                innerNodeValues.selectedObjectClassifications.push(selectedClassifications[j]);
                            }
                        }

                        //Selected Object Interfaces
                        var selectedInterfaces = acceptedType.selectedUserInterfaces;
                        var interfacesCount = selectedInterfaces ? selectedInterfaces.length : 0;
                        innerNodeValues.selectedObjectInterfaces = [];
                        for (var j = 0; j < interfacesCount; ++j) {
                            innerNodeValues.selectedObjectInterfaces.push(selectedInterfaces[j].userInterfaceId);
                            if (selectedInterfaces[j].isDefault) {
                                innerNodeValues.defaultInterfaceId = selectedInterfaces[j].userInterfaceId;
                            }
                        }

                        //Selected Object Layouts
                        var selectedLayouts = acceptedType.selectedLayouts;
                        var layoutsCount = selectedLayouts ? selectedLayouts.length : 0;
                        innerNodeValues.selectedObjectLayouts = [];
                        for (var j = 0; j < layoutsCount; ++j) {
                            innerNodeValues.selectedObjectLayouts.push(selectedLayouts[j].layoutId);
                            if (selectedLayouts[j].isDefault) {
                                innerNodeValues.defaultLayoutId = selectedLayouts[j].layoutId;
                            }
                        }

                        scopeData.objectInnerNodeValues[acceptedType.id] = innerNodeValues;
                        scopeData.selectedObjectContentTypes = selectedContentTypes;
                    }
                }
            }

            scopeData.selectedObjectSearchOptions = $scope.MapCollectionItems(serviceData.selectedSearch);

            //Map the custom grid columns

            var detailsColumns = serviceData.detailsColumns;
            if (detailsColumns && detailsColumns.columns && detailsColumns.rows) {
                var detailsColumnsCount = detailsColumns.columns.length;
                var columns = [];
                for (var i = 0; i < detailsColumnsCount; ++i) {
                    columns.push({
                        title: detailsColumns.columns[i],
                        editable: false
                    })
                }

                scopeData.objectDetailsGridColumns = columns;
                $scope.objectDetailsGridColumns = columns;

                var existingRows = $scope.objectDetailsGridRows;
                if (existingRows && existingRows.length == 0) {
                    $scope.fetchDomainsDataForObjectAttribute(function (result, detailsGridRows, lookupGridRows) {
                        existingRows = detailsGridRows;

                        var existingRowCount = existingRows.length;
                        var serverRows = detailsColumns.rows;
                        var serverRowsCount = serverRows ? serverRows.length : 0;
                        for (i = 0; i < serverRowsCount ; ++i) {
                            var serverRow = serverRows[i];
                            for (var j = 0; j < existingRowCount; ++j) {
                                var existingRow = existingRows[j];
                                if (existingRow.id == serverRow.contentTypeId) {
                                    var cellValues = [existingRow.cells[0]];
                                    var cellCount = serverRow.cells ? serverRow.cells.length : 0;
                                    for (var k = 1; k < cellCount; ++k) {
                                        cellValues.push(serverRow.cells[k].attributeId);
                                    }
                                    //update the existing cells in the row
                                    existingRow.cells = cellValues;
                                }
                            }
                        }
                    });
                }
                else {
                    var existingRowCount = existingRows.length;
                    var serverRows = detailsColumns.rows;
                    var serverRowsCount = serverRows ? serverRows.length : 0;
                    for (i = 0; i < serverRowsCount ; ++i) {
                        var serverRow = serverRows[i];
                        for (var j = 0; j < existingRowCount; ++j) {
                            var existingRow = existingRows[j];
                            if (existingRow.id == serverRow.contentTypeId) {
                                //var cellValues = [existingRow.cells[0]];
                                var cellValues = [];
                                var cellCount = serverRow.cells ? serverRow.cells.length : 0;
                                for (var k = 1; k < cellCount; ++k) {
                                    cellValues.push(serverRow.cells[k].attributeId);
                                }
                                //update the existing cells in the row
                                existingRow.cells = cellValues;
                            }
                        }
                    }
                }
            }

            var lookupColumns = serviceData.lookupColumns;
            if (lookupColumns && lookupColumns.columns && lookupColumns.rows) {
                var lookupColumnsCount = lookupColumns.columns.length;
                var columns = [];
                for (var i = 0; i < lookupColumnsCount; ++i) {
                    columns.push({
                        title: lookupColumns.columns[i],
                        editable: false
                    })
                }

                scopeData.objectLookupGridColumns = columns;

                var existingRows = $scope.objectLookupGridRows;
                if (existingRows && existingRows.length == 0) {
                    $scope.fetchDomainsDataForObjectAttribute(function (result, detailsGridRows, lookupGridRows) {
                        existingRows = lookupGridRows;

                        var existingRowCount = existingRows.length;
                        var serverRows = lookupColumns.rows;
                        var serverRowsCount = serverRows ? serverRows.length : 0;
                        for (i = 0; i < serverRowsCount ; ++i) {
                            var serverRow = serverRows[i];
                            for (var j = 0; j < existingRowCount; ++j) {
                                var existingRow = existingRows[j];
                                if (existingRow.id == serverRow.contentTypeId) {
                                    var cellValues = [existingRow.cells[0]];
                                    var cellCount = serverRow.cells ? serverRow.cells.length : 0;
                                    for (var k = 0; k < cellCount; ++k) {
                                        cellValues.push(serverRow.cells[k].attributeId);
                                    }
                                    //update the existing cells in the row
                                    existingRow.cells = cellValues;
                                }
                            }
                        }
                    });
                }
                else {
                    var existingRowCount = existingRows.length;
                    var serverRows = lookupColumns.rows;
                    var serverRowsCount = serverRows ? serverRows.length : 0;
                    for (i = 0; i < serverRowsCount ; ++i) {
                        var serverRow = serverRows[i];
                        for (var j = 0; j < existingRowCount; ++j) {
                            var existingRow = existingRows[j];
                            if (existingRow.id == serverRow.contentTypeId) {
                                //var cellValues = [existingRow.cells[0]];
                                var cellValues = [];
                                var cellCount = serverRow.cells ? serverRow.cells.length : 0;
                                for (var k = 1; k < cellCount; ++k) {
                                    cellValues.push(serverRow.cells[k].attributeId);
                                }
                                //update the existing cells in the row
                                existingRow.cells = cellValues;
                            }
                        }
                    }
                }
            }

            return scopeData;
        };

        /* General Object Reference Functions - END */

        $scope.saveAcceptedContentTypes = function () {
            $scope.objectReferenceAttribute.imageTypeInnerNodeValues = angular.copy($scope.objectInnerNodeValues);
            $scope.objectReferenceAttribute.selectedObjectContentTypes = angular.copy($scope.selectedObjectContentTypes);
            $scope.objectReferenceAttribute.selectedObjectSearchOptions = angular.copy($scope.selectedObjectSearchOptions);

            //Close the Dialog
            $("#referenceTypesConfigurationAttribute").modal('toggle');
        };

        $scope.changeDefaultObjectInterface = function (defaultValue) {
            $scope.defaultObjectInterfaceId = defaultValue;
            $scope.SelectedObjectReferenceInnerData.defaultInterfaceId = defaultValue;
        };

        $scope.changeDefaultObjectLayout = function (defaultValue) {
            $scope.defaultObjectLayoutId = defaultValue;
            $scope.SelectedObjectReferenceInnerData.defaultLayoutId = defaultValue;
        };

        $scope.referenceSelectionOptions = [{
            key: '1', value: 'Search'
        }, {
            key: '2', value: 'Select'
        }, {
            key: '3', value: 'Lookup'
        }];

        $scope.$on('updatesearch', function (evt, value) {

            if (value.length == 0) {
                $scope.selectedObjectSearchOptions = [];
                $scope.selectedImageSearchOptions = [];
                var tmpContnetDomains = $scope.getSearchOptionsOfAttributes($scope.selectedImageContentTypes);
                $scope.$broadcast("loadDualMultiSelectControl#imageSearchOptions", tmpContnetDomains, $scope.selectedImageSearchOptions, "Image");
                $scope.selectedDocSourceOptions = [];
                var tmpContnetDomains = $scope.getSearchOptionsOfAttributes($scope.selectedDocContentTypes);
                $scope.$broadcast("loadDualMultiSelectControl#docSourceOptions", tmpContnetDomains, $scope.selectedDocSourceOptions, "Document");

            }
        });

        $scope.$on('updateform', function (evt, value) {
            $scope.isFormchange = value;
        });

        $scope.showSearchOptions = function () {
            var allObjectSearches = [];
            $scope.$broadcast("loadDualMultiSelectControl#objectSearchOptions", allObjectSearches, $scope.selectedObjectSearchOptions, "Object");
            var tmpContnetDomains = $scope.getSearchOptionsOfAttributes($scope.selectedObjectContentTypes);
            $scope.$broadcast("loadDualMultiSelectControl#objectSearchOptions", tmpContnetDomains, $scope.selectedObjectSearchOptions, "Object");
        }

        $scope.getSearchOptionsOfAttributes = function (selectedTypes) {
            var tmpContnetDomains = angular.copy($scope.searchInterfaces);
            var tmpContenDomainsLength = tmpContnetDomains.length;
            for (var i = 0; i < tmpContenDomainsLength; i++) {
                var sx = true;
                var tmpContenDomainsChildernLength = tmpContnetDomains[i].children.length;
                if (tmpContnetDomains[i].children.length > 0) {
                    for (var j = 0; j < tmpContenDomainsChildernLength; j++) {
                        if (tmpContnetDomains[i].children[j].children.length > 0) {
                            if (!($scope.checkObject(tmpContnetDomains[i].children[j].value, selectedTypes))) {
                                sx = false;
                                tmpContnetDomains[i].children[j] = undefined;
                            }
                            else {
                                if ($scope.objectReferenceAttribute.referenceSelectionMethod != "1" && tmpContnetDomains[i].children[j].children != undefined) {
                                    for (var k = 0; k < tmpContnetDomains[i].children[j].children.length; k++) {
                                        if (tmpContnetDomains[i].children[j].children[k].type != "Browse") {
                                            tmpContnetDomains[i].children[j].children[k] = undefined;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            sx = false;
                            tmpContnetDomains[i].children[j] = undefined;
                        }
                    }
                    if (tmpContnetDomains[i].children.length == 0)
                        tmpContnetDomains[i] = undefined;
                    var z = 0;
                    for (var x = 0; x < tmpContenDomainsChildernLength; x++) {
                        if (tmpContnetDomains[i].children[x] == undefined)
                            z++;
                    }
                    if (z == tmpContenDomainsChildernLength) {
                        tmpContnetDomains[i] = undefined;
                    }
                }
                else
                    tmpContnetDomains[i] = undefined;
            }
            $scope.allObjectSearchOptions = tmpContnetDomains;
            $scope.allImageSearchOptions = tmpContnetDomains;
            $scope.allDocSourceOptions = tmpContnetDomains;
            return tmpContnetDomains;
        }

        $scope.checkObject = function (id, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (angular.equals(list[i].value, id)) {
                    return true;
                }
            }
            return false;
        }

        $scope.showAcceptedReferenceTypes = function () {
            $scope.selectedObjectContentTypes = angular.copy($scope.objectReferenceAttribute.selectedObjectContentTypes);
            $scope.selectedObjectSearchOptions = angular.copy($scope.objectReferenceAttribute.selectedObjectSearchOptions);
            //$scope.getDomainsForTreeControls();
            var allObjextContTypes = [];

            var tmpContnetDomains = angular.copy($scope.domiansObjTreeStructure);

            for (var i = 0; i < tmpContnetDomains.length; i++) {
                var node = angular.copy(tmpContnetDomains[i]);
                if (node.children.length > 0) {
                    for (var j = 0; j < node.children.length; j++) {
                        if (node.children[j].children) {
                            node.children[j].children = undefined;
                        }
                    }
                }
                else
                    node = undefined;
                allObjextContTypes.push(node);
            }
            $scope.allObjectContentTypes = allObjextContTypes;
            $scope.$broadcast("loadDualMultiSelectControl#objectContentTypes", $scope.allObjectContentTypes, $scope.selectedObjectContentTypes);
            //var s = $scope.selectedValues;
            //$scope.allObjectSearchOptions = $scope.domainsTreeStructure;
            //$scope.$broadcast("loadDualMultiSelectControl#objectSearchOptions", $scope.allObjectSearchOptions, $scope.selectedObjectSearchOptions);

            //Show the first tab always
            $scope.selectTab("objectContentTypeSection");

            //Handle the Modal Dialog close event - to preserve the inner dropdown content
            $("#referenceTypesConfigurationAttribute").unbind("hidden.bs.modal");
            $("#referenceTypesConfigurationAttribute").on("hidden.bs.modal", function () {
                $scope.clearAcceptedObjectTypes();
            });
        };

        $scope.changeReferenceApplyType = function (newValue) {
            $scope.objectReferenceAttribute.referenceApplyType = newValue;
            if (newValue == '1') {
                $scope.selectedObjectContentTypes = [];
                $scope.selectedObjectSearchOptions = [];
                $scope.$broadcast("loadDualMultiSelectControl#objectContentTypes", $scope.allObjectContentTypes, $scope.selectedObjectContentTypes);
            }
        };

        $scope.allObjectContentTypes = [];
        $scope.selectedObjectContentTypes = [];

        /* Inner Node Values section - START */

        $scope.initializeObjectItemInnerValues = function (itemValue) {
            $scope.objectReferenceAttribute.objectInnerNodeValues[itemValue] = {
                selectedObjectClassifications: [],
                selectedObjectInterfaces: [],
                selectedObjectLayouts: [],
                defaultInterfaceId: "",
                defaultLayoutId: ""
            };
        };

        /* Inner Node Values section - END */

        $scope.clearAcceptedObjectTypes = function () {
            //Push the Dropdown content into the parent control - for persisting the inner control dropdown content
            $("#objectContentType_parent").append($("#objectClassificationsDropdown"));
            $("#objectContentType_parent").append($("#objectLayoutsDropdown"));
            $("#objectContentType_parent").append($("#objectInterfacesDropdown"));
        };

        $scope.createObjectContentTypeInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            var buttonParentNode1 = $("<div class='inline-display reference-dropdown'></div>");
            var buttonNode1 = $("<i class='fa fa-filter large-font gray-color inner-control'></i>");
            buttonParentNode1.append(buttonNode1);

            var buttonParentNode2 = $("<div class='inline-display reference-dropdown'></div>");
            var buttonNode2 = $("<i class='fa fa-list-alt large-font gray-color inner-control'></i>");
            buttonParentNode2.append(buttonNode2);

            var buttonParentNode3 = $("<div class='inline-display reference-dropdown'></div>");
            var buttonNode3 = $("<i class='fa fa-th-large large-font gray-color inner-control'></i>");
            buttonParentNode3.append(buttonNode3);

            var buttonParentNode4 = $("<div class='inline-display reference-dropdown'></div>");
            var buttonNode4 = $("<i class='fa fa-search large-font gray-color inner-control'></i>");
            buttonParentNode4.append(buttonNode4);

            childNode.appendChild(buttonParentNode1[0]);
            buttonNode1.click(function () { $scope.showObjectClassifications($(item).attr('value')); });
            childNode.appendChild(buttonParentNode2[0]);
            buttonNode2.click(function () { $scope.showObjectInterfaces($(item).attr('value')); });
            childNode.appendChild(buttonParentNode3[0]);
            buttonNode3.click(function () { $scope.showObjectLayouts($(item).attr('value')); });
            childNode.appendChild(buttonParentNode4[0]);
            buttonNode4.click(function () { $scope.showSearchOptions(); $scope.selectObjectSearchOptionTab($(item).attr('value')); });

            return childNode;
        };

        /* Custom Grid Columns section - START */

        $scope.isDetailsGrid = false;
        $scope.isLookupGrid = false;

        $scope.showObjectLookupGrid = function () {
            $scope.isDetailsGrid = false;
            $scope.isLookupGrid = true;
            $scope.customObjectGridColumns = angular.copy($scope.objectLookupGridColumns);
            $scope.customObjectGridRows = angular.copy($scope.objectLookupGridRows);
        };

        $scope.showObjectDetailsGrid = function () {
            $scope.isDetailsGrid = true;
            $scope.isLookupGrid = false;
            $scope.customObjectGridColumns = angular.copy($scope.objectDetailsGridColumns);
            $scope.customObjectGridRows = angular.copy($scope.objectDetailsGridRows);
        };

        $scope.customObjectGridColumns = [];
        $scope.customObjectGridRows = [];
        $scope.objectGridEditColumn = {};

        $scope.addNewObjectGridColumn = function () {
            $scope.objectGridColumnMode = "Add";
            $("#objectGridColumnName").val("");
            $("#objectGridColumnError").html("");
        };

        $scope.editObjectGridColumnName = function (column) {
            $scope.objectGridColumnMode = "Edit";
            $("#objectGridColumnName").val(column.title);
            $scope.objectGridEditColumn = column;
            $("#objectGridColumnError").html("");
        };

        $scope.openModalScreen = function (formValue, formName) {
            var message = "";
            if (formValue)
                message = "There are unsaved changes, Are you sure you want to discard the changes?";
            else
                message = "Are you sure you want to close the screen?";

            dialogModal(message, "Confirm", "Ok", "Cancel", $('#' + formName)).result.then(function (x) {
                if (x == true) {
                    $('#' + formName).modal('hide');
                    var Name = formName.substring(0, 1).toLowerCase() + formName.substring(1) + "AttributeForm";
                    var attrFormScope = $scope.formScope[Name];
                    var attrForm = attrFormScope[Name];
                    attrForm.$setPristine();
                    if (formName == "referenceTypesConfigurationAttribute")
                        $scope.changeReferenceApplyType('1');
                }
            });
        }

        $scope.saveObjectColumnName = function () {

            //Clear previous error messages
            $("#objectGridColumnError").html("");

            var newColumnName = $("#objectGridColumnName").val();
            //If a new name is given
            if (newColumnName) {

                var isChanged = true;
                if ($scope.objectGridEditColumn.title == newColumnName) {
                    isChanged = false;
                }

                //If there is a change in the name, save it
                if (isChanged) {
                    var isDuplicateName = false;
                    var existingColumns = $scope.customObjectGridColumns;
                    var columnsCount = existingColumns.length;
                    for (var i = 0; i < columnsCount; ++i) {
                        if (existingColumns[i].title.toLowerCase() == newColumnName.toLowerCase()) {
                            isDuplicateName = true;
                            break;
                        }
                    }

                    //If the name is not a duplicate
                    if (!isDuplicateName) {
                        if ($scope.objectGridColumnMode == "Add") {
                            $scope.customObjectGridColumns.push({
                                title: newColumnName,
                                editable: true
                            });
                            var rows = $scope.customObjectGridRows;
                            if (rows && rows.length > 0) {
                                var rowCount = rows.length;
                                for (var i = 0; i < rowCount; ++i) {
                                    var row = rows[i];
                                    if (row) {
                                        row.cells.push("");
                                    }
                                }
                            }
                        }
                        else {
                            $scope.objectGridEditColumn.title = newColumnName;
                        }
                        $("#objectGridColumnModalDialogAttribute").modal('toggle');
                    }
                    else {
                        $("#objectGridColumnError").html("Column name must be unique");
                    }
                }
                else {
                    $("#objectGridColumnModalDialogAttribute").modal('toggle');
                }
            }
            else {
                $("#objectGridColumnError").html("Please enter a column name");
            }
        };

        $scope.deleteObjectGridColumn = function (colIndex) {
            if (colIndex >= 0) {
                dialogModal("Are you sure you want to delete the column?", "Confirm", "Ok", "Cancel", $("#objectColumnLayoutModalDialogAttribute")).result.then(function (x) {
                    if (x == true) {
                        $scope.customObjectGridColumns.splice(colIndex, 1);
                        var rows = $scope.customObjectGridRows;
                        if (rows && rows.length > 0) {
                            var rowCount = rows.length;
                            for (var i = 0; i < rowCount; ++i) {
                                var row = rows[i];
                                if (row && row.cells && row.cells.length >= colIndex) {
                                    row.cells.splice(colIndex - 1, 1);
                                }
                            }
                        }
                    }
                });
            }
        };

        $scope.discardObjectColumnLayout = function (formStatus) {
            var msg = "";
            if ($scope.customObjectGridColumns.length > 1) {
                msg = "There are unsaved changes, Are you sure you want to discard the changes?";
                dialogModal(msg, "Confirm", "Ok", "Cancel", $("#objectColumnLayoutModalDialogAttribute")).result.then(function (x) {
                    if (x == true) {
                        $scope.customObjectGridColumns = [];
                        $scope.customObjectGridRows = [];
                        $scope.isDetailsGrid = false;
                        $scope.isLookupGrid = false;
                        $scope.objectGridColumnMode = "";
                        $('#objectColumnLayoutModalDialogAttribute').hide();
                        $('.modal-backdrop').hide();
                    }
                });
            }
            else {
                $scope.customObjectGridColumns = [];
                $scope.customObjectGridRows = [];
                $scope.isDetailsGrid = false;
                $scope.isLookupGrid = false;
                $scope.objectGridColumnMode = "";
                $('#objectColumnLayoutModalDialogAttribute').hide();
                $('.modal-backdrop').hide();
            }
        };

        $scope.saveObjectColumnLayout = function () {

            //Get the latest values from the grid
            var gridRows = $("#columnGrid tr");
            var rowsCount = gridRows.length;
            //Ignore the first row, as it is header
            for (var i = 1; i < rowsCount; ++i) {
                //values can be changed only for non-header rows
                var existingRow = $scope.customObjectGridRows[i - 1];
                if (!existingRow.isHeader) {
                    var row = gridRows[i];
                    var cellSelectNodes = $(row).find("select");
                    var count = cellSelectNodes.length;
                    for (var j = 0; j < count; ++j) {
                        existingRow.cells[j] = $(cellSelectNodes[j]).val();
                    }
                }
            }

            if ($scope.isDetailsGrid) {
                $scope.objectDetailsGridColumns = angular.copy($scope.customObjectGridColumns);
                $scope.objectDetailsGridRows = angular.copy($scope.customObjectGridRows);
            }
            else if ($scope.isLookupGrid) {
                $scope.objectLookupGridColumns = angular.copy($scope.customObjectGridColumns);
                $scope.objectLookupGridRows = angular.copy($scope.customObjectGridRows);
            }

            $scope.isDetailsGrid = false;
            $scope.isLookupGrid = false;
            $scope.objectGridColumnMode = "";

            $("#objectColumnLayoutModalDialogAttribute").modal('toggle');
        };

        /* Custom Grid Columns section - END */

        $scope.SelectedObjectReferenceInnerData = {};

        /* Classification Start */
        //$scope.allObjectClassifications = [{
        //    key: '100', value: 'Any Classifcation'
        //}];
        //$scope.allObjectClassifications = $scope.allObjectClassifications.concat([{
        //    key: '2', value: 'Childrensware'
        //}, {
        //    key: '3', value: 'Womensware'
        //}, {
        //    key: '4', value: 'Hard Goods'
        //}, {
        //    key: '5', value: 'In-Stock'
        //}, {
        //    key: '6', value: 'Out of Stock'
        //}]);

        $scope.allObjectClassifications = $scope.contentTypeClassifications;

        //This object will hold the selected Object Classifications for a given type (at a given point)
        $scope.selectedObjectClassifications = [];

        $scope.isObjectClassificationSelected = function (optionValue) {
            var selectedFilters = $scope.selectedObjectClassifications;

            if (selectedFilters && selectedFilters.indexOf(optionValue) >= 0) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.isObjectClassificationDisabled = function (optionValue) {
            var isDisabled = false;
            //Any Classification can never be disabled
            if (optionValue != "100") {
                var selectedFilters = $scope.selectedObjectClassifications;
                var optionIndex = selectedFilters.indexOf("100");
                //If 100 (Any Classification) is selected, then disable the other items
                isDisabled = (optionIndex >= 0) ? true : false;
            }

            return isDisabled;
        }

        $scope.changeObjectClassifications = function (optionValue) {
            var selectedFilters = $scope.selectedObjectClassifications;
            var optionIndex = selectedFilters.indexOf(optionValue);

            //If the item is already present, and the option is again changed, it is deselected
            if (optionIndex >= 0) {
                $scope.selectedObjectClassifications.splice(optionIndex, 1);
            }
            else {
                //If the item wasn't selected earlier and if the item is "100" (Any Classification), clear the other selections
                if (optionValue == "100") {
                    $scope.selectedObjectClassifications.splice(0);
                }
                $scope.selectedObjectClassifications.push(optionValue);
            }
        };

        $scope.showObjectClassifications = function (selectedOptionValue) {
            event.preventDefault();

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#objectClassificationsDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#objectClassificationsDropdown"));
            }

            $scope.contentTypeClassifications = [{ key: "100", value: "Any Classification" }];


            classificationService.query({ id: selectedOptionValue }).$promise.then(function (details) {
                angular.forEach(details, function (value, key) {
                    var obj = { key: value.classificationId, value: value.classificationName };
                    $scope.contentTypeClassifications.push(obj);
                });

                $scope.allObjectClassifications = $scope.contentTypeClassifications;
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


            //Populate the values corresponding to the Item
            var innerNodeValues = $scope.objectReferenceAttribute.objectInnerNodeValues[selectedOptionValue];
            if (!innerNodeValues) {
                $scope.initializeObjectItemInnerValues(selectedOptionValue);
                innerNodeValues = $scope.objectReferenceAttribute.objectInnerNodeValues[selectedOptionValue];
            }
            $scope.SelectedObjectReferenceInnerData = innerNodeValues;
            $scope.selectedObjectClassifications = innerNodeValues.selectedObjectClassifications;
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = (!isDropdownExists && $("#objectClassificationsDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleObjectClassifications");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
        };

        //This object will hold the selected Object Interfaces for a given type (at a given point)
        $scope.selectedObjectInterfaces = [];

        $scope.isObjectInterfaceSelected = function (optionValue) {
            var selectedFilters = $scope.selectedObjectInterfaces;

            if (selectedFilters && selectedFilters.indexOf(optionValue) >= 0) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.isObjectInterfaceDisabled = function (optionValue) {
            var isDisabled = false;
            //Auto Detect can never be disabled
            if (optionValue != "100") {
                var selectedFilters = $scope.selectedObjectInterfaces;
                var optionIndex = selectedFilters.indexOf("100");
                //If 100 (Auto Detect) is selected, then disable the other items
                isDisabled = (optionIndex >= 0) ? true : false;
            }

            return isDisabled;
        }

        $scope.changeObjectInterfaces = function (optionValue) {
            var selectedFilters = $scope.selectedObjectInterfaces;
            var optionIndex = selectedFilters.indexOf(optionValue);

            //If the item is already present, and the option is again changed, it is deselected
            if (optionIndex >= 0) {
                $scope.selectedObjectInterfaces.splice(optionIndex, 1);
            }
            else {
                //If the item wasn't selected earlier and if the item is "100" (Auto Detect), clear the other selections
                if (optionValue == "100") {
                    $scope.selectedObjectInterfaces.splice(0);
                }
                $scope.selectedObjectInterfaces.push(optionValue);
            }
        };

        $scope.showObjectInterfaces = function (selectedOptionValue) {
            event.preventDefault();

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#objectInterfacesDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#objectInterfacesDropdown"));
            }

            userinterfaceService.queryAll({ controller: 'UserInterface', contentTypeId: selectedOptionValue }).$promise.then(function (details) {
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

            //Populate the values corresponding to the Item
            var innerNodeValues = $scope.objectReferenceAttribute.objectInnerNodeValues[selectedOptionValue];
            if (!innerNodeValues) {
                $scope.initializeObjectItemInnerValues(selectedOptionValue);
                innerNodeValues = $scope.objectReferenceAttribute.objectInnerNodeValues[selectedOptionValue];
            }
            $scope.SelectedObjectReferenceInnerData = innerNodeValues;
            $scope.selectedObjectInterfaces = innerNodeValues.selectedObjectInterfaces;
            $scope.defaultObjectInterfaceId = innerNodeValues.defaultInterfaceId;
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = (!isDropdownExists && $("#objectInterfacesDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleObjectInterfaces");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
        };

        /* Interfaces End */

        /* Layouts Start */

        //$scope.allObjectLayouts = [{
        //    key: '100', value: 'Auto Detect'
        //}];
        //$scope.allObjectLayouts = $scope.allObjectLayouts.concat([{
        //    key: '2', value: 'Layout 1'
        //}, {
        //    key: '3', value: 'Layout 2'
        //}]);

        $scope.getLayouts = function () {
            $scope.layouts = [];
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            var contentImageDocId = "";
            if (contentType.contentTypeId) {
                contentImageDocId = contentType.contentTypeId;
            }
            else if (contentType.imageLibraryId) {
                contentImageDocId = contentType.imageLibraryId;
            }
            else if (contentType.documentLibraryId)
            { contentImageDocId = contentType.documentLibraryId; }
            layoutsService.queryLib({ controller: 'layouts', domainId: contentType.domainId, contentTypeId: contentImageDocId, subObjectId: $routeParams.subObjectId, isAllLayouts: true }).$promise.then(function (details) {
                var contentTypeUserLayouts = [];
                contentTypeUserLayouts.push({ key: '100', value: 'Auto Detect' });
                if (details) {
                    angular.forEach(details, function (value, key) {
                        var obj = { key: value.layoutId, value: value.layoutName };
                        contentTypeUserLayouts.push(obj);
                    });
                    $scope.allObjectLayouts = contentTypeUserLayouts;
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.errorLayouts, value.message, value.moreDetails);
                    });
                }

            });
        }
        $scope.getLayouts();

        $scope.defaultObjectLayoutId = "";

        //This object will hold the selected Object Layouts for a given type (at a given point)
        $scope.selectedObjectLayouts = [];

        $scope.isObjectLayoutSelected = function (optionValue) {
            var selectedFilters = $scope.selectedObjectLayouts;

            if (selectedFilters && selectedFilters.indexOf(optionValue) >= 0) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.isObjectLayoutDisabled = function (optionValue) {
            var isDisabled = false;
            //Auto Detect can never be disabled
            if (optionValue != "100") {
                var selectedFilters = $scope.selectedObjectLayouts;
                var optionIndex = selectedFilters.indexOf("100");
                //If 100 (Auto Detect) is selected, then disable the other items
                isDisabled = (optionIndex >= 0) ? true : false;
            }

            return isDisabled;
        }

        $scope.changeObjectLayouts = function (optionValue) {
            var selectedFilters = $scope.selectedObjectLayouts;
            var optionIndex = selectedFilters.indexOf(optionValue);

            //If the item is already present, and the option is again changed, it is deselected
            if (optionIndex >= 0) {
                $scope.selectedObjectLayouts.splice(optionIndex, 1);
            }
            else {
                //If the item wasn't selected earlier and if the item is "100" (Auto Detect)", clear the other selections
                if (optionValue == "100") {
                    $scope.selectedObjectLayouts.splice(0);
                }
                $scope.selectedObjectLayouts.push(optionValue);
            }
        };

        $scope.showObjectLayouts = function (selectedOptionValue) {
            event.preventDefault();

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#objectLayoutsDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#objectLayoutsDropdown"));
            }
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            layoutsService.queryAll({ controller: 'layouts', domainId: contentType.domainId, contentTypeId: selectedOptionValue, isAllLayouts: true }).$promise.then(function (details) {
                var contentTypeUserLayouts = [];
                contentTypeUserLayouts.push({ key: '100', value: 'Auto Detect' });
                if (details) {
                    angular.forEach(details, function (value, key) {
                        var obj = { key: value.layoutId, value: value.layoutName };
                        contentTypeUserLayouts.push(obj);
                    });
                    $scope.allObjectLayouts = contentTypeUserLayouts;
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.errorLayouts, value.message, value.moreDetails);
                    });
                }

            });

            //Populate the values corresponding to the Item
            var innerNodeValues = $scope.objectReferenceAttribute.objectInnerNodeValues[selectedOptionValue];
            if (!innerNodeValues) {
                $scope.initializeObjectItemInnerValues(selectedOptionValue);
                innerNodeValues = $scope.objectReferenceAttribute.objectInnerNodeValues[selectedOptionValue];
            }
            $scope.SelectedObjectReferenceInnerData = innerNodeValues;
            $scope.selectedObjectLayouts = innerNodeValues.selectedObjectLayouts;
            $scope.defaultObjectLayoutId = innerNodeValues.defaultLayoutId;
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = (!isDropdownExists && $("#objectLayoutsDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleObjectLayouts");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
        };

        /* Layouts End */

        $scope.selectObjectSearchOptionTab = function (selectedOptionValue) {
            $scope.selectTab('objectSearchSection');
        };

        $scope.allObjectSearchOptions = [];
        $scope.selectedObjectSearchOptions = [];
        $scope.selectedObjectSearchOption = {};
        $scope.selectedObjectSearchOptionType = '';

        $scope.createObjectSearchOptionInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            //var buttonParentNode1 = $("<div class='inline-display'></div>");
            //var buttonNode1 = $("<i class='fa fa-pencil large-font gray-color inner-control' data-toggle='modal' data-target='#editObjectSearchOptionSection'></i>");
            //buttonParentNode1.append(buttonNode1);

            var buttonParentNode2 = $("<div class='inline-display'></div>");
            var buttonNode2 = $("<i class='fa fa-times large-font gray-color inner-control'></i>");
            buttonParentNode2.append(buttonNode2);

            //childNode.appendChild(buttonParentNode1[0]);
            //buttonNode1.click(function () { $scope.editObjectSearchOption($(item)); });
            //childNode.appendChild(buttonParentNode2[0]);
            //buttonNode2.click(function () { $scope.deleteObjectSearchOption($(item)); });

            return childNode;
        };

        $scope.editObjectSearchOption = function (selectedSearchOption) {
            var selectedName = $('#' + selectedSearchOption[0].id).text();
            //var selectedName = selectedSearchOption.text();
            //if (selectedSearchOption.children().length > 0) {
            //    //To Ignore the type value
            //    selectedName = $(selectedSearchOption.children()[0]).text()
            //}

            var selectedValue = selectedSearchOption.attr("value");

            $scope.selectedObjectSearchOption = selectedSearchOption;
            $("#objectSearchOptionName").val(selectedName);

            //Get the complete level of the selected option
            var allSearchOptions = $scope.allObjectSearchOptions;
            var optionsCount = (allSearchOptions) ? allSearchOptions.length : 0;
            var parentNames = [];
            for (var i = 0; i < optionsCount; ++i) {
                var option = allSearchOptions[i];
                parentNames = [];
                var returnvalues = $scope.findParentNameForSelectedObjectValue(option, selectedValue);
                if (returnvalues && returnvalues.length > 0) {
                    parentNames = parentNames.concat(returnvalues);
                    break;
                }
            }

            if (parentNames.length > 0) {
                var searchOptionNode = document.createDocumentFragment();
                var parentCount = parentNames.length;
                var previousNode = null;
                var optionType = $scope.selectedObjectSearchOptionType;
                for (var i = 0; i < parentCount; ++i) {
                    var parentName = parentNames[i];

                    var node = null;

                    //If this is the last item and if type exists, we need to show that too
                    if (i == parentCount - 1 && optionType) {
                        node = $("<div class='margin-left20'></div>");
                        node.append($("<div class='option-text'>" + parentName + "</div>"));
                        node.append($("<div class='type-content'>" + optionType + "</div>"));
                    }
                    else {
                        node = $("<div class='margin-left20'>" + parentName + "</div>");
                    }

                    if (previousNode) {
                        previousNode.append(node);
                    }
                    else {
                        searchOptionNode.appendChild(node[0]);
                    }

                    previousNode = node;
                }
            }

            $("#editObjectSearchOption").empty();
            $("#editObjectSearchOption").append(searchOptionNode);

        };

        $scope.findParentNameForSelectedObjectValue = function (option, selectedValue) {
            var returnValues = [];
            if (option && selectedValue) {
                if (option.value == selectedValue) {
                    returnValues.push(option.label);
                    $scope.selectedObjectSearchOptionType = option.type;
                }
                else if (option.children && option.children.length > 0) {
                    var children = option.children;
                    var childrenCount = children.length;

                    for (var j = 0; j < childrenCount; ++j) {
                        var child = children[j];
                        var childReturnValues = $scope.findParentNameForSelectedObjectValue(child, selectedValue);
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

        $scope.deleteObjectSearchOption = function (selectedSearchOption) {
            var selectedDOMNode = selectedSearchOption[0];
            $scope.$broadcast("changeSelectedItemText#objectSearchOptions", selectedSearchOption.attr("value"), selectedSearchOption.text());
            $scope.$broadcast("deselectItem#objectSearchOptions", selectedDOMNode);
            event.stopPropagation();
        };

        $scope.saveObjectSearchOption = function () {
            var selectedOption = $scope.selectedObjectSearchOption;
            var oldName = selectedOption.text();
            var newName = $("#objectSearchOptionName").val();

            //If there is a change in the Name, update it in the DOM
            if (oldName.toLowerCase() != newName.toLowerCase()) {
                $scope.$broadcast("changeSelectedItemText#objectSearchOptions", selectedOption.attr("value"), newName);
            }

            //Clear the fields and close the dialog
            $("#objectSearchOptionName").val('');
            $("#editObjectSearchOption").empty();

            $("#editObjectSearchOptionSection").modal('toggle');
        };

        $scope.discardObjectSearchOption = function (formStatus, formName) {
            if (formStatus) {
                dialogModal("There are unsaved changes, Are you sure you want to discard the changes?", "Confirm", "Ok", "Cancel", $("#editObjectSearchOptionSection")).result.then(function (x) {
                    if (x == true) {
                        //Clear the fields
                        $("#objectSearchOptionName").val('');
                        $("#editObjectSearchOption").empty();
                        $('#editObjectSearchOptionSection').hide();
                        $('.modal-backdrop').hide();
                    }
                });
            }
            else {
                $("#objectSearchOptionName").val('');
                $("#editObjectSearchOption").empty();
                $('#editObjectSearchOptionSection').hide();
                $('.modal-backdrop').hide();
            }
        };

        //**************************************** Content Object Reference Attribute Logical flow through - Start *********************************

        //**************************************** Image Reference Attribute Logical flow through - Start *********************************

        /* Data Section - Start */
        $scope.domainsTreeStructure = [];
        $scope.domainsDocTreeStructure = [];
        $scope.domiansObjTreeStructure = [];
        $scope.domainsSearchTreeStructure = [];
        $scope.classifications = [];
        $scope.searchInterfaces = [];
        $scope.getDomainsForTreeControls = function () {
            domainService.getAllDomains().$promise.then(function (result) {
                var data = [];
                var docData = [];
                var objData = [];
                var searchData = [];
                //Map the domains into the Dual Multi Select format
                if (result && result.length > 0) {
                    var domainsCount = result.length;
                    for (var i = 0; i < domainsCount; ++i) {
                        var domain = result[i];
                        var domainData = {};
                        var docDomainData = {};
                        var objDomainData = {};
                        var searchDomainData = {};

                        domainData.value = domain.domainId;
                        domainData.label = domain.domainName;
                        domainData.children = [];

                        docDomainData.value = domain.domainId;
                        docDomainData.label = domain.domainName;
                        docDomainData.children = [];

                        objDomainData.value = domain.domainId;
                        objDomainData.label = domain.domainName;
                        objDomainData.children = [];

                        searchDomainData.value = domain.domainId;
                        searchDomainData.label = domain.domainName;
                        searchDomainData.children = [];

                        var contentTypes = domain.contentTypes;
                        if (contentTypes && contentTypes.length > 0) {
                            var contentTypesCount = contentTypes.length;
                            for (var j = 0; j < contentTypesCount ; ++j) {
                                var contentType = contentTypes[j];
                                if ($scope.isContentTypeContainsImgAttribute(contentType)) {
                                    domainData.children.push({
                                        value: contentType.contentTypeId,
                                        label: contentType.pluralName,
                                        children: []
                                    });
                                    $scope.ContentTypeContainsImgAttribute(contentType, domainData.children[domainData.children.length - 1]);
                                }
                                if ($scope.isContentTypeContainsDocAttribute(contentType)) {
                                    docDomainData.children.push({
                                        value: contentType.contentTypeId,
                                        label: contentType.pluralName,
                                        children: []
                                    });
                                    $scope.ContentTypeContainsDocAttribute(contentType, docDomainData.children[docDomainData.children.length - 1]);
                                }
                                //if ($scope.isContentTypeContainsObjAttribute(contentType)) {
                                objDomainData.children.push({
                                    value: contentType.contentTypeId,
                                    label: contentType.pluralName,
                                    children: []
                                });
                                $scope.ContentTypeContainsObjAttribute(contentType, objDomainData.children[objDomainData.children.length - 1]);
                                //}

                                searchDomainData.children.push({
                                    value: contentType.contentTypeId,
                                    label: contentType.pluralName,
                                    children: []
                                });

                                for (var k = 0; k < contentType.searchInterfaces.length; ++k) {
                                    var serachInterface = contentType.searchInterfaces[k];
                                    if (serachInterface.sortingResults.length > 0) {
                                        var searchType;
                                        if (serachInterface.searchInterfaceType == 0) {
                                            searchType = 'Search';
                                        }
                                        else if (serachInterface.searchInterfaceType == 1) {
                                            searchType = 'List';
                                        }
                                        else {
                                            searchType = 'Browse';
                                        }
                                        if (searchType != "List") {
                                            searchDomainData.children[searchDomainData.children.length - 1].children.push({
                                                value: serachInterface.searchInterfaceId,
                                                label: serachInterface.name,
                                                type: searchType,
                                                children: []
                                            });
                                            $scope.ContentTypeContainsSearchInterfaces(serachInterface, searchDomainData.children[searchDomainData.children.length - 1].children[searchDomainData.children[searchDomainData.children.length - 1].children.length - 1]);
                                        }
                                    }
                                }
                            }
                            if (domainData.children.length > 0)
                                data.push(domainData);
                            if (docDomainData.children.length > 0)
                                docData.push(docDomainData);
                            //if (objDomainData.children.length > 0)
                            objData.push(objDomainData);
                            searchData.push(searchDomainData);
                        }
                    }
                }

                    $scope.domainsTreeStructure = data;
                    $scope.domainsDocTreeStructure = docData;
                    $scope.domiansObjTreeStructure = objData;
                    $scope.domainsSearchTreeStructure = searchData;
                });
                $scope.populateImageLibraryTypes();
                $scope.populateDocumentLibraryTypes();
                $scope.getSearchInterfaces();
            }
            
        $scope.ContentTypeContainsSearchInterfaces = function (serachInterface, data) {
            for (var x = 0; x < serachInterface.sortingResults.length; x++) {
                data.children.push({
                    value: serachInterface.sortingResults[x].id,
                    label: serachInterface.sortingResults[x].name,
                    searchid:serachInterface.searchInterfaceId,
                    contenttypeid: serachInterface.contentTypeId,
                    domainid: ""
                });
            }
        }

        $scope.getSearchInterfaces = function() {
            domainService.getAllDomains().$promise.then(function (result) {
                var data = [];

                //Map the domains into the Dual Multi Select format
                if (result && result.length > 0) {
                    var domainsCount = result.length;
                    for (var y = 0; y < domainsCount; ++y) {
                        var domain = result[y];
                        var domainData = {
                        };
                        domainData.value = domain.domainId;
                        domainData.label = domain.domainName;
                        domainData.children = [];
                        var docAtts = [];
                        var imgAtts = [];

                        var contentTypes = domain.contentTypes;
                        if (contentTypes && contentTypes.length > 0) {
                            var contentTypesCount = contentTypes.length;
                            for (var j = 0; j < contentTypesCount ; ++j) {
                                var contentType = contentTypes[j];
                                if (contentType.searchInterfaces && contentType.searchInterfaces.length > 0) {
                                    domainData.children.push({
                                        value: contentType.contentTypeId,
                                        label: contentType.pluralName,
                                        children: []
                                    });
                                    for (var i = 0; i < contentType.searchInterfaces.length; i++) {
                                        var searchType;
                                        if (contentType.searchInterfaces[i].searchInterfaceType == 0) {
                                            searchType = 'Search';
                                        }
                                        else if (contentType.searchInterfaces[i].searchInterfaceType == 1) {
                                            searchType = 'List';
                                        }
                                        else {
                                            searchType = 'Browse';
                                        }
                                        domainData.children[0].children.push({
                                            value: contentType.searchInterfaces[i].searchInterfaceId,
                                            label: contentType.searchInterfaces[i].name,
                                            type: searchType
                                        });
                                    }
                                }

                            }
                        }
                        //if (domainData.children.length > 0)
                        data.push(domainData);
                    }
                }

                $scope.searchInterfaces = data;
            });

        }

        $scope.isContentTypeContainsDocAttribute = function (contentType) {
            var retValue = false;
            for (var i = 0; i < contentType.defaultAttributes.length; i++) {
                if (contentType.defaultAttributes[i].attributeType == 'DocumentReferenceAttribute') {
                    retValue = true;
                }
            }
            return retValue;
        }

        $scope.isContentTypeContainsObjAttribute = function (contentType) {
            var retValue = false;
            for (var i = 0; i < contentType.defaultAttributes.length; i++) {
                if (contentType.defaultAttributes[i].attributeType == 'ObjectReferenceAttribute') {
                    retValue = true;
                }
            }
            return retValue;
        }

        $scope.isContentTypeContainsImgAttribute = function (contentType) {
            var retValue = false;
            for (var i = 0; i < contentType.defaultAttributes.length; ++i) {
                if (contentType.defaultAttributes[i].attributeType == 'ImageReferenceAttribute') {
                    retValue = true;
                    break;
                }
            }
            return retValue;
        }

        $scope.ContentTypeContainsImgAttribute = function (contentType, data) {
            var retValue = false;
            for (var i = 0; i < contentType.defaultAttributes.length; ++i) {
                if (contentType.defaultAttributes[i].attributeType == 'ImageReferenceAttribute') {
                    data.children.push({
                        value: contentType.defaultAttributes[i].attributeId,
                        label: contentType.defaultAttributes[i].name
                    });
                }
            }
            //return retValue;
        }

        $scope.ContentTypeContainsDocAttribute = function (contentType, data) {
            var retValue = false;
            for (var i = 0; i < contentType.defaultAttributes.length; ++i) {
                if (contentType.defaultAttributes[i].attributeType == 'DocumentReferenceAttribute') {
                    data.children.push({
                        value: contentType.defaultAttributes[i].attributeId,
                        label: contentType.defaultAttributes[i].name
                    });
                }
            }
            //return retValue;
        }

        $scope.ContentTypeContainsObjAttribute = function (contentType, data) {
            var retValue = false;
            for (var i = 0; i < contentType.defaultAttributes.length; ++i) {
                //if (contentType.defaultAttributes[i].attributeType == 'ObjectReferenceAttribute') {
                data.children.push({
                    value: contentType.defaultAttributes[i].attributeId,
                    label: contentType.defaultAttributes[i].name
                });
                //}
            }
            //return retValue;
        }

        $scope.initializeImageReferenceAttributeValues = function () {
            $scope.imageReferenceAttribute = {
                attributeId: '', version: null, name: null, identifier: null, isMandatory: null, isReadOnly: null, isUnique: null, isSingularlyUnique: null, uniqueGroup: null,
                description: null, isAllowMultiValue: null, isValueUnique: null, canValueRearranged: null, minNumOfValues: null, maxNumOfValues: null,
                isEditProduct: false, isViewProduct: false,
                imageSelectionMethod: '1', defaultImageRole: '1', newImageRoleName: '', editImageRole: {
                },
                imageApplyType: '1', selectedImageLibraryTypes: [],
                imageRoles: [],
                //A collection to hold all the inner values of an option. This dictionary key will be the optionId
                imageTypeInnerNodeValues: {},
                isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
            };
        };

        $scope.imageSelectionOptions = [{
            key: '1', value: 'Search & Link'
        }, {
            key: '2', value: 'Selection'
        }];

        /* Data Section - End */

        /* General Functions Section - Start */

        $scope.clearImageReferenceAttributeFields = function () {
            $scope.isImageReferenceAttribute = true;
            $scope.action = "Add";

            //Initialize the values
            $scope.initializeImageReferenceAttributeValues();

            //Clear the previous error messages
            $scope.clearImageRoleErrors("newImageRoleError");
            $scope.clearImageRoleErrors("editImageRoleError");
        };

        $scope.saveImageReferenceAttribute = function () {
            //Save the data into the database and then close the dialog
            var attributeData = $scope.imageReferenceAttribute;


            $scope.errors = [];
            $scope.errorsText = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if ($scope.validateAttribute(attributeData, $scope.errorAttribute, 'imageRef')) {
                if (attributeData.attributeId == '') {
                    attributeData.attributeSetName = $routeParams.attributeScreenName;
                    //create the data object by mapping the properties
                    var imageReferenceData = $scope.MapImageScopeDataToService(attributeData);

                    //add text attribute based on lib and contentType

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    imageReferenceData.domainId = contentType.domainId;
                    imageReferenceData.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                    imageReferenceData.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                    imageReferenceData.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                    imageReferenceAttributeService.createLib({ attributeType: 'imageReferenceAttribute',domainId:contentType.domainId }, imageReferenceData).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            //$scope.errors.push("Image Reference Attribute saved successfully");
                            //$scope.showSuccessMessage($scope.imageReferenceAttribute, "Image Reference Attribute saved successfully");

                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#ImageReferenceAttribute');
                            $scope.clearImageReferenceAttributeFields();
                            $scope.clearTextAttributeFieldsAfterSave();
                            $scope.errorAttribute.isError = false;
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Image Reference Attribute saved successfully");
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Image Reference Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    var imageReferenceData = $scope.MapImageScopeDataToService(attributeData);
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    imageReferenceAttributeService.updateLib({ attributeType: 'imageReferenceAttribute',domainId:contentType.domainId }, imageReferenceData).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.defaultAttributes();
                            $scope.closeBackDrop('#ImageReferenceAttribute');
                            $scope.clearImageReferenceAttributeFields();
                            $scope.errorAttribute.isError = false;
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Image Reference Attribute updated successfully");
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Image Reference Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                //$scope.closeBackDrop('#ImageReferenceAttribute');
                ////Reload the attributes section
                //$scope.defaultAttributes();
            }
            else {
                $scope.errorAttribute.isSuccess = false;
                $scope.errorAttribute.isError = true;
                $scope.errorAttribute.isHide = true;
            }


        };

        $scope.editImageReferenceAttribute = function (attribute) {
            $scope.resetErrorDirective($scope.errorAttribute);
            var scopeData = $scope.MapServiceDataToImageScope(attribute);
            $scope.imageReferenceAttribute = scopeData;

            //Show the modal dialog
            $scope.isImageReferenceAttribute = true;
            $scope.action = "Edit";
        };

        $scope.deleteImageReferenceAttribute = function (attribute) {
            $scope.errors = [];
            $scope.errorsText = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            if (attribute.attributeId) {

                // delete image reference attribute based on contenttype and ;ibrary

                //var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                //attribute.domainId = contentType.domainId
                //attribute.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                //attribute.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                //attribute.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                // imageReferenceAttributeService.remove(attribute).$promise.then(function (response) {

                imageReferenceAttributeService.remove({
                    contentTypeId: $routeParams.contentTypeId,
                    id: attribute.attributeId,
                    attributeType: 'ImageReferenceAttribute'
                }).$promise.then(function (response) {

                    if (response.$resolved == true) {
                        $scope.errorAttribute.isError = false;
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("Image Reference Attribute deleted successfully");
                        $scope.defaultAttributes();
                    }
                }, function (error) {

                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errorAttribute.messages.push(value.message);
                            $scope.errorAttribute.moreDetails = value.moreDetails;
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        });
                    }
                    else {
                        $scope.errorAttribute.messages.push("Error occured while deleting the Image Reference Attribute. Please try after sometime.");
                        $scope.errorAttribute.isError = true;
                        $scope.errorAttribute.isHide = true;
                    }
                });
            }
        };

        $scope.clearImageReferenceFields = function () {
            //Intialize the attribute with default values
            $scope.initializeImageReferenceAttributeValues();
        };

        $scope.selectTab = function (tabId) {
            $("a[data-target='#" + tabId + "']").tab('show');
        };

        $scope.MapImageScopeDataToService = function (scopeData) {
            var serviceData = {
            };

            //Add the routing parameters also
            serviceData.contentTypeId = $routeParams.contentTypeId;
            serviceData.subObjectId = $routeParams.subObjectId;
            serviceData.attributeSetId = $routeParams.attributeSetId;

            //Common Properties
            serviceData.attributeId = scopeData.attributeId;
            serviceData.name = scopeData.name;
            serviceData.identifier = scopeData.identifier;
            serviceData.mandatory = scopeData.isMandatory;
            serviceData.readOnly = scopeData.isReadOnly;
            serviceData.uniqueValues = scopeData.isUnique;
            if (scopeData.isSingularlyUnique == "1") {
                serviceData.isSingularityUnique = true;
                serviceData.uniqueGroup = "";
            }
            else {
                serviceData.isSingularityUnique = false;
                serviceData.uniqueGroup = scopeData.uniqueGroup;
            }
            serviceData.description = scopeData.description;
            serviceData.multipleValues = {
                allowMultipleValues: scopeData.isAllowMultiValue,
                isUnique: scopeData.isValueUnique,
                isReArranged: scopeData.canValueRearranged,
                minimumValue: scopeData.minNumOfValues,
                maximumValue: scopeData.maxNumOfValues
            };

            //Specific Properties
            serviceData.viewImageBehaviour = scopeData.isViewProduct;
            serviceData.editImageBehaviour = scopeData.isEditProduct;

            //Format the Roles
            var roles = [];
            var scopeRoles = scopeData.imageRoles;
            var rolesCount = (scopeRoles) ? scopeRoles.length : 0;

            for (var i = 0; i < rolesCount; ++i) {
                var scopeRole = scopeRoles[i];
                if (scopeRole) {
                    roles.push({
                        roleName: scopeRole.name,
                        roleId: scopeRole.id,
                        isDefault: (scopeData.defaultImageRole == scopeRole.id)
                    });
                }
            }

            serviceData.imageRoles = roles;
            serviceData.imgselectionMethod = scopeData.imageSelectionMethod;

            serviceData.isAnyImageType = (scopeData.imageApplyType == '1');

            //If is Any Image type is not selected
            if (scopeData.imageApplyType != '1') {
                //Map the image type values
                var acceptedImageTypes = [];
                var selectedImageTypes = scopeData.selectedImageLibraryTypes;
                var typesCount = selectedImageTypes ? selectedImageTypes.length : 0;
                for (var i = 0; i < typesCount; ++i) {
                    var selectedType = selectedImageTypes[i];
                    var acceptedType = {
                        id: selectedType.value,
                        name: selectedType.label
                    }
                    //Get the inner node values for the selected option
                    var innerNodeValues = scopeData.imageTypeInnerNodeValues[selectedType.value];

                    if (innerNodeValues) {
                        var isAnyClassification = false;

                        //Selected Filters
                        var selectedClassifications = [];
                        var selectedFilters = innerNodeValues.selectedFilters;

                        isAnyClassification = (selectedFilters.indexOf('100') >= 0);
                        acceptedType.isAnyClassification = isAnyClassification;

                        if (!isAnyClassification) {
                            var filtersCount = selectedFilters ? selectedFilters.length : 0;
                            for (var j = 0; j < filtersCount; ++j) {
                                selectedClassifications.push(selectedFilters[j]);
                            }
                        }
                        acceptedType.selectedClassifications = selectedClassifications;

                        //Map the additional properties
                        acceptedType.additionalLinkingProperties = {
                        };
                        acceptedType.additionalLinkingProperties.canUserCreateNewImages = innerNodeValues.properties.canAddNewImages;
                        acceptedType.additionalLinkingProperties.canUserLinkToExistingImages = innerNodeValues.properties.canLinkImages;
                        if (innerNodeValues.properties.canAddNewImages) {
                            acceptedType.additionalLinkingProperties.isCurrentObject = innerNodeValues.properties.linkNewImageOption;
                        }

                        if (innerNodeValues.properties.canLinkImages) {
                            acceptedType.additionalLinkingProperties.linkedSources = {
                            };
                            acceptedType.additionalLinkingProperties.linkedSources.selectedImgAttribute = $scope.MapSelectedItems(innerNodeValues.selectedContentTypes);
                            acceptedType.additionalLinkingProperties.linkedSources.selectedImgLibrary = $scope.MapSelectedItems(innerNodeValues.selectedLibraries);
                            acceptedType.additionalLinkingProperties.linkedSources.searchOption = $scope.MapSelectedItems(innerNodeValues.selectedSearchOptions);
                        }
                    }

                    //push it to the acceptedTypes
                    acceptedImageTypes.push(acceptedType);
                }

                serviceData.acceptedImageTypes = acceptedImageTypes;
            }

            return serviceData;
        };

        $scope.MapServiceDataToImageScope = function (serviceData) {
            var scopeData = {
            };

            //Common Properties
            scopeData.attributeId = serviceData.attributeId;
            scopeData.name = serviceData.name;
            scopeData.identifier = serviceData.identifier;
            scopeData.isMandatory = serviceData.mandatory;
            scopeData.isReadOnly = serviceData.readOnly;
            scopeData.isUnique = serviceData.uniqueValues;
            if (serviceData.isSingularityUnique) {
                scopeData.isSingularlyUnique = "1";
            }
            else {
                scopeData.isSingularlyUnique = "2";
                scopeData.uniqueGroup = serviceData.uniqueGroup;
            }

            scopeData.description = serviceData.description;

            if (serviceData.multipleValues) {
                scopeData.isAllowMultiValue = serviceData.multipleValues.allowMultipleValues;
                scopeData.isValueUnique = serviceData.multipleValues.isUnique;
                scopeData.canValueRearranged = serviceData.multipleValues.isReArranged;
                scopeData.minNumOfValues = serviceData.multipleValues.minimumValue;
                scopeData.maxNumOfValues = serviceData.multipleValues.maximumValue;
            }

            //Specific Properties
            scopeData.isViewProduct = serviceData.viewImageBehaviour;
            scopeData.isEditProduct = serviceData.editImageBehaviour;

            //Format the Roles
            var roles = [];
            var serviceRoles = serviceData.imageRoles;//var scopeRoles = scopeData.imageRoles;
            var rolesCount = (serviceRoles) ? serviceRoles.length : 0;

            for (var i = 0; i < rolesCount; ++i) {
                var serviceRole = serviceRoles[i];
                if (serviceRole) {
                    roles.push({
                        name: serviceRole.roleName,
                        id: serviceRole.roleId
                    });
                    if (serviceRole.isDefault) {
                        scopeData.defaultImageRole = serviceRole.roleId
                    }
                }
            }

            scopeData.imageRoles = roles;
            scopeData.imageSelectionMethod = serviceData.imgselectionMethod.toString();

            if (serviceData.isAnyImageType) {
                scopeData.imageApplyType = '1';
            }
            else {
                scopeData.imageApplyType = '2';

                scopeData.imageTypeInnerNodeValues = {};

                var acceptedImageTypes = serviceData.acceptedImageTypes;
                if (acceptedImageTypes && acceptedImageTypes.length > 0) {
                    var typesCount = acceptedImageTypes.length;
                    var selectedImageTypes = [];
                    for (var i = 0; i < typesCount; ++i) {
                        var acceptedType = acceptedImageTypes[i];
                        selectedImageTypes.push({
                            value: acceptedType.id,
                            label: acceptedType.name
                        });

                        var innerNodeValues = {};
                        if (acceptedType.isAnyClassification) {
                            innerNodeValues.selectedFilters = ['100'];
                        }
                        else {
                            var selectedClassifications = acceptedType.selectedClassifications;
                            var count = selectedClassifications ? selectedClassifications.length : 0;
                            innerNodeValues.selectedFilters = [];
                            for (var j = 0; j < count; ++j) {
                                innerNodeValues.selectedFilters.push(selectedClassifications[j]);
                            }
                        }

                        //Map the additional properties
                        innerNodeValues.properties = {};
                        innerNodeValues.properties.canAddNewImages = acceptedType.additionalLinkingProperties.canUserCreateNewImages;
                        innerNodeValues.properties.canLinkImages = acceptedType.additionalLinkingProperties.canUserLinkToExistingImages;

                        if (innerNodeValues.properties.canAddNewImages) {
                            innerNodeValues.properties.linkNewImageOption = acceptedType.additionalLinkingProperties.isCurrentObject;
                        }

                        if (innerNodeValues.properties.canLinkImages) {
                            innerNodeValues.selectedContentTypes = $scope.MapCollectionItems(acceptedType.additionalLinkingProperties.linkedSources.selectedImgAttribute);
                            innerNodeValues.selectedLibraries = $scope.MapCollectionItems(acceptedType.additionalLinkingProperties.linkedSources.selectedImgLibrary);
                            innerNodeValues.selectedSearchOptions = $scope.MapCollectionItems(acceptedType.additionalLinkingProperties.linkedSources.searchOption);
                        }

                        scopeData.imageTypeInnerNodeValues[acceptedType.id] = innerNodeValues;
                    }

                    scopeData.selectedImageLibraryTypes = selectedImageTypes;
                }
            }

            return scopeData;
        };

        $scope.MapSelectedItems = function (selectedItems) {
            var mappedItems = [];
            if (selectedItems && selectedItems.length > 0) {
                var itemsCount = selectedItems.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var item = selectedItems[i];
                    mappedItems.push({
                        id: item.value,
                        name: item.label
                    });
                }
            }
            return mappedItems;
        };

        $scope.MapCollectionItems = function (selectedItems) {
            var mappedItems = [];
            if (selectedItems && selectedItems.length > 0) {
                var itemsCount = selectedItems.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var item = selectedItems[i];
                    mappedItems.push({
                        value: item.id,
                        label: item.name
                    });
                }
            }
            return mappedItems;
        };

        /* General Functions Section - End */

        /* Accepted Image Types Section - Start */
        $scope.selectedImageLibraryTypes = [];

        $scope.changeImageApplyType = function (newValue) {
            $scope.imageReferenceAttribute.imageApplyType = newValue;
        };

        $scope.imageTypeInnerValues = {
        };

        $scope.initializeImageItemInnerContentValues = function (itemValue) {
            $scope.imageTypeInnerValues[itemValue] = {
                selectedFilters: [],
                properties: {
                    canAddNewImages: false,
                    canLinkImages: false,
                    linkNewImageOption: ''
                },
                selectedContentTypes: [],
                selectedLibraries: [],
                selectedSearchOptions: []
            };
        };

        $scope.showImageProperties = function (itemValue) {
            event.preventDefault();

            //store this value for later purposes
            $scope.activeImageTypeId = itemValue;

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#imagePropertiesDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#imagePropertiesDropdown"));
            }

            //Populate the values corresponding to the Item
            var itemInnerValues = $scope.imageTypeInnerValues[itemValue];
            if (!itemInnerValues) {
                $scope.initializeImageItemInnerContentValues(itemValue);
                itemInnerValues = $scope.imageTypeInnerValues[itemValue];
            }
            $scope.imageProperties = itemInnerValues.properties;
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = (!isDropdownExists && $("#imagePropertiesDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleImageProperties");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
        };

        $scope.showImageFilters = function (itemValue) {
            event.preventDefault();

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#imageFiltersDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#imageFiltersDropdown"));
            }

            //Populate the values corresponding to the Item
            var itemInnerValues = $scope.imageTypeInnerValues[itemValue];
            if (!itemInnerValues) {
                $scope.initializeImageItemInnerContentValues(itemValue);
                itemInnerValues = $scope.imageTypeInnerValues[itemValue];
            }
            $scope.selectedImageFilters = itemInnerValues.selectedFilters;
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = (!isDropdownExists && $("#imageFiltersDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleImageFilters");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
        };

        $scope.createImageTypeInnerContentNode = function (item) {
            var childNode = document.createDocumentFragment();

            //Create Button1 - Add Properties
            var buttonParentNode1 = $("<div class='inline-display reference-dropdown'></div>");
            var buttonNode1 = $("<i class='fa fa-plus large-font green-color inner-control'></i>");
            buttonParentNode1.append(buttonNode1);

            //Create Button2 - Filter Image
            var buttonParentNode2 = $("<div class='dropdown inline-display reference-dropdown'></div>");
            var buttonNode2 = $("<i class='fa fa-filter large-font gray-color inner-control'></i>");
            buttonParentNode2.append(buttonNode2);

            //Add Buttons to the DOM
            childNode.appendChild(buttonParentNode1[0]);
            buttonNode1.click(function () { $scope.showImageProperties($(item).attr('value')); });
            childNode.appendChild(buttonParentNode2[0]);
            buttonNode2.click(function () { $scope.showImageFilters($(item).attr('value')); });

            return childNode;
        };

        /* Image properties Section - Start */

        $scope.imageProperties = {
        };

        $scope.linkImageOptions = [{
            key: '1', value: 'The current object only'
        }, {
            key: '2', value: 'The current object and an Owner object'
        }];

        /* Image properties Section - End */

        /* Image Filter Section - Start */

        //$scope.imageFilterOptions = $scope.contentTypeClassifications;

        $scope.imageFilterOptions = [];

        //$scope.imageFilterOptions = $scope.imageFilterOptions.concat([{
        //    key: '2', value: 'Active'
        //}, {
        //    key: '3', value: 'Approved'
        //}, {
        //    key: '4', value: 'Archived'
        //}]);
        $scope.classifications = [];
        $scope.getClassifications = function () {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            $scope.classifications = [];
            var resource = {};
            if ($routeParams.subObjectId == "0") {
                resource = classificationService.query({ id: contentType.contentTypeId });
            }
            else {
                resource = classificationSubObjectService.query({ id: contentType.contentTypeId, subObjectId: $routeParams.subObjectId });
            }
            resource.$promise.then(function (details) {
                if (details) {
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
                    $scope.imageFilterOptions = [];
                    $scope.imageFilterOptions.push({
                        key: '100', value: 'Any Classifcation'
                    });

                    for (var i = 0; i < $scope.classifications.length; i++) {
                        var data = $scope.classifications[i];
                        $scope.imageFilterOptions.push({
                            key: data.classificationId,
                            value: data.classificationName
                        });
                    }
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value);
                    });
                }
                else {
                    $scope.errors.push("Error occured while fetching classifications. Please try after sometime.");
                }

            });
            //$scope.imageFilterOptions = [{
            //    key: '100', value: 'Any Classifcation'
            //}];



        }

        //This object will hold the selected Image Filters for a given type (at a given point)
        $scope.selectedImageFilters = [];

        $scope.isImageOptionSelected = function (optionValue) {
            var selectedFilters = $scope.selectedImageFilters;

            if (selectedFilters && selectedFilters.indexOf(optionValue) >= 0) {
                return true;
            }
            else {
                return false;
            }
        };

        $scope.isImageOptionDisabled = function (optionValue) {
            var isDisabled = false;
            //Any Classification can never be disabled
            if (optionValue != "100") {
                var selectedFilters = $scope.selectedImageFilters;
                var optionIndex = selectedFilters.indexOf("100");
                //If 100 (Any Classification) is selected, then disable the other items
                isDisabled = (optionIndex >= 0) ? true : false;
            }

            return isDisabled;
        }

        $scope.changeImageFilters = function (optionValue) {
            var selectedFilters = $scope.selectedImageFilters;
            var optionIndex = selectedFilters.indexOf(optionValue);

            //If the item is already present, and the option is again changed, it is deselected
            if (optionIndex >= 0) {
                $scope.selectedImageFilters.splice(optionIndex, 1);
            }
            else {
                //If the item wasn't selected earlier and if the item is "100" (Any Classification", clear the other selections
                if (optionValue == "100") {
                    $scope.selectedImageFilters.splice(0);
                }
                $scope.selectedImageFilters.push(optionValue);
            }
        };

        /* Image Filter Section - End */
        $scope.allImageLibraryTypes = [];
        $scope.populateImageLibraryTypes = function () {
            imageLibraryService.getAllImageLibraries().$promise.then(function (result) {
                var data = [];

                //Map the domains into the Dual Multi Select format
                if (result && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        var library = result[i];
                        data.push({
                            value: library.imageLibraryId,
                            label: library.singularName
                        });
                    }
                }
                $scope.allImageLibraryTypes = data;
            });
            //if (callbackFunction) {
            //    callbackFunction();
            //}
            //}
        }

        $scope.showAcceptedImageTypes = function () {
            //Get the data from the services and assign it to the scope variables and then raise the event

            //Get the selected values from the attribute
            $scope.imageTypeInnerValues = angular.copy($scope.imageReferenceAttribute.imageTypeInnerNodeValues);
            $scope.selectedImageLibraryTypes = angular.copy($scope.imageReferenceAttribute.selectedImageLibraryTypes);
            //$scope.populateImageLibraryTypes();

            $scope.$broadcast("loadDualMultiSelectControl#acceptedImageTypes", $scope.allImageLibraryTypes, $scope.selectedImageLibraryTypes, "Image");
            $scope.getClassifications();
            ////If there is data, directly broadcast the event
            //if ($scope.allImageLibraryTypes.length > 0) {
            //    $scope.$broadcast("loadDualMultiSelectControl#acceptedImageTypes", $scope.allImageLibraryTypes, $scope.selectedImageLibraryTypes);
            //}
            //    //If there is no data, fetch the data and then broadcast the event
            //else {
            //    $scope.populateImageLibraryTypes(function () {
            //        $scope.$broadcast("loadDualMultiSelectControl#acceptedImageTypes", $scope.allImageLibraryTypes, $scope.selectedImageLibraryTypes);
            //    });

            //}

            //Handle the Modal Dialog close event - to preserve the inner dropdown content
            $("#imageTypesConfigurationAttribute").unbind("hidden.bs.modal");
            $("#imageTypesConfigurationAttribute").on("hidden.bs.modal", function () {
                $scope.clearAcceptedImageTypes();
            });
            $scope.documentReferenceAttribute.docApplyType = 1;
        };

        $scope.saveAcceptedImageTypes = function () {
            $scope.imageReferenceAttribute.imageTypeInnerNodeValues = angular.copy($scope.imageTypeInnerValues);
            $scope.imageReferenceAttribute.selectedImageLibraryTypes = angular.copy($scope.selectedImageLibraryTypes);

            //Close the Dialog
            $("#imageTypesConfigurationAttribute").modal('toggle');
        };

        $scope.clearAcceptedImageTypes = function () {
            //Push the Dropdown content into the parent control - for persisting the inner control dropdown content
            $("#imageMultiSelectInnerDroppdown_parent").append($("#imagePropertiesDropdown"));
            $("#imageMultiSelectInnerDroppdown_parent").append($("#imageFiltersDropdown"));

            //$scope.imageTypeInnerValues = {
            //};
            //$scope.selectedImageLibraryTypes = [];
        };

        /* Accepted Image Types Section - End */

        /* Roles Related Section - Start */

        $scope.addNewImageRole = function () {
            //Clear the previous errors
            $scope.clearImageRoleErrors("newImageRoleError");
            $scope.errorRoleAttribute.isError = false;
            $scope.errorRoleAttribute.messages = [];


            var newRoleName = $scope.imageReferenceAttribute.newImageRoleName;
            if (newRoleName) {
                if (!$scope.isDuplicateImageRoleName(newRoleName)) {
                    //Add the Image Role
                    var roleId = $scope.getNewImageRoleId();

                    var existingRoles = $scope.imageReferenceAttribute.imageRoles;
                    //If there are no items
                    if (!existingRoles || existingRoles.length == 0) {
                        existingRoles = [];
                        $scope.imageReferenceAttribute.defaultImageRole = roleId;
                    }

                    $scope.imageReferenceAttribute.imageRoles.push({ id: roleId, name: newRoleName });
                    $scope.imageReferenceAttribute.newImageRoleName = "";
                }
                else {
                    //$("#newImageRoleError").html("Role with same name already exists");
                    //$("#newImageRoleError").show();
                    $scope.errorRoleAttribute.isError = true;
                    $scope.errorRoleAttribute.isSuccess = false;
                    $scope.errorRoleAttribute.messages.push("Role with same name already exists");

                }
            }
            else {
                //$("#newImageRoleError").html("Role name cannot be empty");
                //$("#newImageRoleError").show();
                $scope.errorRoleAttribute.isError = true;
                $scope.errorRoleAttribute.isSuccess = false;
                $scope.errorRoleAttribute.messages.push("Role name cannot be empty");

            }
        };

        $scope.getNewImageRoleId = function () {
            var newRoleId = -1;

            var existingRoles = $scope.imageReferenceAttribute.imageRoles;
            if (existingRoles && existingRoles.length > 0) {
                var rolesCount = existingRoles.length;
                for (var i = 0 ; i < rolesCount; ++i) {
                    //Check the negative Ids - not saved in DB
                    var role = existingRoles[i];
                    if (role.id < 0) {
                        newRoleId = role.id - 1; //increment the negative index for the new item
                    }
                }
            }

            return newRoleId;
        };

        $scope.isDuplicateImageRoleName = function (roleName, roleId) {
            var isMatch = false;

            var existingRoles = $scope.imageReferenceAttribute.imageRoles;
            if (existingRoles && existingRoles.length > 0) {
                var rolesCount = existingRoles.length;
                for (var i = 0 ; i < rolesCount; ++i) {
                    var role = existingRoles[i];
                    if (role.name.toLowerCase() === roleName.toLowerCase() && role.id != roleId) {
                        isMatch = true;
                        break;
                    }
                }
            }

            return isMatch;
        };

        $scope.changeDefaultImageRole = function (defaultRoleId) {
            $scope.imageReferenceAttribute.defaultImageRole = defaultRoleId;
        }

        $scope.editImageRole = function (selectedRole) {
            //Clear the previous errors         
            $scope.clearImageRoleErrors("editImageRoleError");
            $scope.errorRoleAttribute.isError = false;
            $scope.errorRoleAttribute.messages = [];
            $scope.imageReferenceAttribute.editImageRole = angular.copy(selectedRole);
        };

        $scope.discardImageRoleName = function () {
            $scope.imageReferenceAttribute.editImageRole = {
            };
        };

        $scope.saveImageRoleName = function () {
            //Clear the previous errors
            $scope.clearImageRoleErrors("editImageRoleError");
            $scope.errorRoleAttribute.isError = false;
            $scope.errorRoleAttribute.messages = [];
            $scope.errorRoleAttribute.isHide = true;

            var newRole = $scope.imageReferenceAttribute.editImageRole;

            if (newRole.name) {
                if (!$scope.isDuplicateImageRoleName(newRole.name, newRole.id)) {

                    var existingRoles = $scope.imageReferenceAttribute.imageRoles;
                    var itemIndex = -1;
                    if (existingRoles && existingRoles.length > 0) {
                        var rolesCount = existingRoles.length;
                        for (var i = 0; i < rolesCount; ++i) {
                            if (existingRoles[i].id === newRole.id) {
                                itemIndex = i;
                                break;
                            }
                        }
                        //Replace the item with the new data
                        $scope.imageReferenceAttribute.imageRoles[itemIndex] = newRole;
                    }

                    $("#editImageRoleSectionAttribute").modal('toggle');
                }
                else {
                    //$("#editImageRoleError").html("Role with same name already exists");
                    //$("#editImageRoleError").show();
                    $scope.errorRoleAttribute.isError = true;
                    $scope.errorRoleAttribute.isSuccess = false;
                    $scope.errorRoleAttribute.messages.push("Role with same name already exists");
                    $scope.errorRoleAttribute.isHide = true;

                }
            }
            else {
                //$("#editImageRoleError").html("Role name cannot be empty");
                //$("#editImageRoleError").show();
                $scope.errorRoleAttribute.isError = true;
                $scope.errorRoleAttribute.isSuccess = false;
                $scope.errorRoleAttribute.messages.push("Role name cannot be empty");
                $scope.errorRoleAttribute.isHide = true;

            }
        };

        $scope.deleteImageRole = function (selectedRole) {
            //if (confirm("Are you sure you want to delete the role?")) {
            var roles = $scope.imageReferenceAttribute.imageRoles;
            var defaultRoleId = $scope.imageReferenceAttribute.defaultImageRole;

            if (roles && roles.length > 0) {
                var rolesCount = roles.length;
                for (var i = rolesCount - 1 ; i >= 0; --i) {
                    var role = roles[i];
                    if (role.id === selectedRole.id) {
                        //Remove the mage Role
                        $scope.imageReferenceAttribute.imageRoles.splice(i, 1);
                    }
                }
            }

            //If we deleted the default role, the first one in the list will be default
            if (defaultRoleId === selectedRole.id) {
                //check, if there are any roles left after the delete operation
                if (roles && roles.length > 0) {
                    defaultRoleId = roles[0].id;
                }
                else {
                    defaultRoleId = '';
                }
            }
            $scope.imageReferenceAttribute.defaultImageRole = defaultRoleId;
            //}
        };

        $scope.clearImageRoleErrors = function (errorMessageNodeId) {
            //Clear the ErrorMessages
            $("#" + errorMessageNodeId).html("");
            $("#" + errorMessageNodeId).hide();
        };

        /* Roles Related Section - End */

        /* Image Linking Sources Section - Start */

        $scope.selectedImageContentTypes = [];
        $scope.selectedImageLibraries = [];
        $scope.selectedImageSearchOptions = [];

        $scope.showImageLinkSources = function () {
            //Fetch the selected values
            var itemId = $scope.activeImageTypeId;
            var itemInnerValues = $scope.imageTypeInnerValues[itemId];
            if (!itemInnerValues) {
                $scope.initializeImageItemInnerContentValues();
                itemInnerValues = $scope.imageTypeInnerValues[itemId];
            }

            //Store the values into the attribute
            $scope.selectedImageContentTypes = angular.copy(itemInnerValues.selectedContentTypes);
            $scope.selectedImageLibraries = angular.copy(itemInnerValues.selectedLibraries);
            $scope.selectedImageSearchOptions = angular.copy(itemInnerValues.selectedSearchOptions);

            //Select the first tab always
            $scope.selectTab('imageSourceSection');

            $scope.getDomainsForTreeControls();
            //$scope.getSearchInterfaces();

            //$scope.allImageContentTypes = $scope.domainsTreeStructure;
            var allObjextContTypes = [];

            var tmpContnetDomains = angular.copy($scope.domiansObjTreeStructure);

            for (var i = 0; i < tmpContnetDomains.length; i++) {
                var node = angular.copy(tmpContnetDomains[i]);
                if (node.children.length > 0) {
                    for (var j = 0; j < node.children.length; j++) {
                        if (node.children[j].children) {
                            node.children[j].children = undefined;
                        }
                    }
                }
                else
                    node = undefined;
                allObjextContTypes.push(node);
            }
            $scope.allImageContentTypes = allObjextContTypes;
            $scope.$broadcast("loadDualMultiSelectControl#imageContentTypes", $scope.allImageContentTypes, $scope.selectedImageContentTypes);

            //$scope.allImageSearchOptions = $scope.searchInterfaces;
            //$scope.$broadcast("loadDualMultiSelectControl#imageSearchOptions", $scope.allImageSearchOptions, $scope.selectedImageSearchOptions);

            //Image Library types data should already be available
            $scope.$broadcast("loadDualMultiSelectControl#imageLibraries", null, $scope.selectedImageLibraries);
        };

        $scope.imageOptionSearchClick = function (selectedOptionValue) {
            $scope.selectTab('imageSearchSection');
            var allImageSearches = [];
            $scope.$broadcast("loadDualMultiSelectControl#imageSearchOptions", allImageSearches, $scope.selectedImageSearchOptions, "Image");
            //var allObjectSearches = [];
            //$scope.$broadcast("loadDualMultiSelectControl#imageSearchOptions", allObjectSearches, $scope.selectedImageSearchOptions, "Image");
            var tmpContnetDomains = $scope.getSearchOptionsOfAttributes($scope.selectedImageContentTypes);
            $scope.$broadcast("loadDualMultiSelectControl#imageSearchOptions", tmpContnetDomains, $scope.selectedImageSearchOptions, "Image");
        };

        //$scope.getSearchOptionsOfImageAttributes = function (selectedTypes) {
        //    var tmpContnetDomains = angular.copy($scope.searchInterfaces);
        //    var tmpContenDomainsLength = tmpContnetDomains.length;
        //    for (var i = 0; i < tmpContenDomainsLength; i++) {
        //        var sx = true;
        //        var tmpContenDomainsChildernLength = tmpContnetDomains[i].children.length;
        //        if (tmpContnetDomains[i].children.length > 0) {
        //            for (var j = 0; j < tmpContenDomainsChildernLength; j++) {
        //                if (tmpContnetDomains[i].children[j].children.length > 0) {
        //                    var subChildLength = tmpContnetDomains[i].children[j].children.length;
        //                    if (subChildLength > 0) {
        //                        for (var l = 0; l < subChildLength; l++) {
        //                            if (!($scope.checkObject(tmpContnetDomains[i].children[j].children[l].value, selectedTypes))) {
        //                                sx = false;
        //                                tmpContnetDomains[i].children[j].children[l] = undefined;
        //                            }
        //                        }
        //                    }
        //                    else {
        //                        sx = false;
        //                        tmpContnetDomains[i].children[j].children[l] = undefined;
        //                    }
        //                }
        //                else {
        //                    if (tmpContnetDomains[i].children[j].children.length == 0)
        //                        tmpContnetDomains[i].children[j] = undefined;
        //                }
        //            }
        //            if (tmpContnetDomains[i].children.length == 0)
        //                tmpContnetDomains[i] = undefined;
        //            var z = 0;
        //            for (var x = 0; x < tmpContenDomainsChildernLength; x++) {
        //                if (tmpContnetDomains[i].children[x] == undefined)
        //                    z++;
        //            }
        //            if (z == tmpContenDomainsChildernLength) {
        //                tmpContnetDomains[i] = undefined;
        //            }
        //        }
        //        else
        //            tmpContnetDomains[i] = undefined;
        //    }
        //    $scope.allObjectSearchOptions = tmpContnetDomains;
        //    return tmpContnetDomains;
        //}

        $scope.selectedImageSearchOption = {};
        $scope.selectedImageSearchOptionType = '';

        $scope.editImageSearchOption = function (selectedSearchOption) {
            var selectedName = $('#' + selectedSearchOption[0].id).text();
            //if (selectedSearchOption.children().length > 0) {
            //    //To Ignore the type value
            //    selectedName = $(selectedSearchOption.children()[0]).text()
            //}

            var selectedValue = selectedSearchOption.attr("value");

            $scope.selectedImageSearchOption = selectedSearchOption;
            $("#imageSearchOptionName").val(selectedName);

            //Get the complete level of the selected option
            var allSearchOptions = $scope.allImageSearchOptions;
            var optionsCount = (allSearchOptions) ? allSearchOptions.length : 0;
            var parentNames = [];
            for (var i = 0; i < optionsCount; ++i) {
                var option = allSearchOptions[i];
                parentNames = [];
                var returnvalues = $scope.findParentNameForSelectedImageValue(option, selectedValue);
                if (returnvalues && returnvalues.length > 0) {
                    parentNames = parentNames.concat(returnvalues);
                    break;
                }
            }

            if (parentNames.length > 0) {
                var searchOptionNode = document.createDocumentFragment();
                var parentCount = parentNames.length;
                var previousNode = null;
                var optionType = $scope.selectedImageSearchOptionType;
                for (var i = 0; i < parentCount; ++i) {
                    var parentName = parentNames[i];

                    var node = null;

                    //If this is the last item and if type exists, we need to show that too
                    if (i == parentCount - 1 && optionType) {
                        node = $("<div class='margin-left20'></div>");
                        node.append($("<div class='option-text'>" + parentName + "</div>"));
                        node.append($("<div class='type-content'>" + optionType + "</div>"));
                    }
                    else {
                        node = $("<div class='margin-left20'>" + parentName + "</div>");
                    }

                    if (previousNode) {
                        previousNode.append(node);
                    }
                    else {
                        searchOptionNode.appendChild(node[0]);
                    }

                    previousNode = node;
                }
            }

            $("#editImageSearchOption").empty();
            $("#editImageSearchOption").append(searchOptionNode);

        };

        $scope.findParentNameForSelectedImageValue = function (option, selectedValue) {
            var returnValues = [];
            if (option && selectedValue) {
                if (option.value == selectedValue) {
                    returnValues.push(option.label);
                    $scope.selectedImageSearchOptionType = option.type;
                }
                else if (option.children && option.children.length > 0) {
                    var children = option.children;
                    var childrenCount = children.length;

                    for (var j = 0; j < childrenCount; ++j) {
                        var child = children[j];
                        var childReturnValues = $scope.findParentNameForSelectedImageValue(child, selectedValue);
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

        $scope.deleteImageSearchOption = function (selectedSearchOption) {
            var selectedDOMNode = selectedSearchOption[0];
            $scope.$broadcast("deselectItem#imageSearchOptions", selectedDOMNode);
            event.stopPropagation();
        };

        $scope.createImageContentTypeInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            var buttonNode = $("<i class='fa fa-search large-font gray-color inner-control'></i>");

            childNode.appendChild(buttonNode[0]);
            buttonNode.click(function () { $scope.imageOptionSearchClick($(item).val()); });

            return childNode;
        };

        $scope.createImageLibraryInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            var buttonNode = $("<i class='fa fa-search large-font gray-color inner-control'></i>");

            childNode.appendChild(buttonNode[0]);
            buttonNode.click(function () { $scope.imageOptionSearchClick($(item).val()); });

            return childNode;
        };

        $scope.createImageSearchOptionInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            var buttonParentNode1 = $("<div class='inline-display'></div>");
            var buttonNode1 = $("<i class='fa fa-pencil large-font gray-color inner-control' data-toggle='modal' data-target='#editImageSearchOptionSectionAttribute'></i>");
            buttonParentNode1.append(buttonNode1);

            var buttonParentNode2 = $("<div class='inline-display'></div>");
            var buttonNode2 = $("<i class='fa fa-times large-font gray-color inner-control'></i>");
            buttonParentNode2.append(buttonNode2);

            childNode.appendChild(buttonParentNode1[0]);
            buttonNode1.click(function () { $scope.editImageSearchOption($(item)); });
            childNode.appendChild(buttonParentNode2[0]);
            buttonNode2.click(function () { $scope.deleteImageSearchOption($(item)); });

            return childNode;
        };

        $scope.saveImageSearchOption = function () {
            var selectedOption = $scope.selectedImageSearchOption;
            var oldName = selectedOption.text();
            var newName = $("#imageSearchOptionName").val();

            //If there is a change in the Name, update it in the DOM
            if (oldName.toLowerCase() != newName.toLowerCase()) {
                $scope.$broadcast("changeSelectedItemText#imageSearchOptions", selectedOption.attr("value"), newName);
            }

            //Clear the fields and close the dialog
            $("#imageSearchOptionName").val('');
            $("#editImageSearchOption").empty();

            $("#editImageSearchOptionSectionAttribute").modal('toggle');
        };

        $scope.discardImageSearchOption = function () {
            //Clear the fields
            $("#imageSearchOptionName").val('');
            $("#editImageSearchOption").empty();
        };

        $scope.saveImageReferenceConfiguration = function () {
            //We need to save the values inside the Image Referencce Attribute values
            // $scope.clearImageReferenceFields();
            var itemId = $scope.activeImageTypeId;

            var itemInnerValues = $scope.imageTypeInnerValues[itemId];
            if (!itemInnerValues) {
                $scope.initializeImageItemInnerContentValues();
                itemInnerValues = $scope.imageTypeInnerValues[itemId];
            }

            //Store the values into the attribute
            itemInnerValues.selectedContentTypes = angular.copy($scope.selectedImageContentTypes);
            itemInnerValues.selectedLibraries = angular.copy($scope.selectedImageLibraries);
            itemInnerValues.selectedSearchOptions = angular.copy($scope.selectedImageSearchOptions);

            $("#imageReferenceConfigurationAttribute").modal('toggle');
        };

        $scope.clearImageReferenceConfiguration = function () {
            $scope.selectedImageContentTypes = [];
            $scope.selectedImageLibraries = [];
            $scope.selectedImageSearchOptions = [];
        };

        /* Image Linking Sources Section - End */

        //**************************************** Image Reference Attribute Logical flow through - End ***********************************

        //**************************************** Document Reference Attribute Logical flow through - Start *********************************
        $scope.isDocumentReferenceAttribute = false;
        $scope.selectedDocContentTypes = [];
        $scope.selectedDocLibraries = [];
        $scope.selectedDocSourceOptions = [];

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

        $scope.initializeDocReferenceAttributeValues = function () {
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
        }

        $scope.errorsDocRef = [];
        $scope.errorsDocRole = [];
        $scope.addNewDocumentRole = function () {
            $scope.errorAttribute = [];
            var role = {
                roleName: $scope.documentReferenceAttribute.addRole
            };

            if ($scope.documentReferenceAttribute.addRole.length > 0) {
                if (!$scope.isDuplicateDocRoleName($scope.documentReferenceAttribute.addRole, $scope.documentReferenceAttribute.documentRoles)) {
                    $scope.documentReferenceAttribute.documentRoles.push(role);
                    $scope.documentReferenceAttribute.addRole = '';
                }
                else {
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.push($scope.documentReferenceAttribute.addRole + " has already been defined, please specify a different name");
                }
            }
            else {
                $scope.errorAttribute.isError = true;
                $scope.errorAttribute.push("Role Name is required");
            }
        }

        $scope.isDuplicateDocRoleName = function (roleName, existingRoles) {
            var isMatch = false;
            if (existingRoles && existingRoles.length > 0) {
                var rolesCount = existingRoles.length;
                for (var i = 0 ; i < rolesCount; ++i) {
                    var role = existingRoles[i];
                    if (role.roleName.toLowerCase() === roleName.toLowerCase()) {
                        isMatch = true;
                        break;
                    }
                }
            }
            return isMatch;
        };
        $scope.discardDocRoleName = function (formValue, formName) {
            var message = "";
            if (formValue)
                message = "There are unsaved changes, Are you sure you want to discard the changes?";
            else
                message = "Are you sure you want to close the screen?";

            dialogModal(message, "Confirm", "Ok", "Cancel", $('#' + formName)).result.then(function (x) {
                if (x == true) {
                    $scope.documentReferenceAttribute.docRole.roleName = '';
                    $scope.formScope.documentReferenceAttributeForm.editDocRoleSectionAttributeForm.$setPristine();
                    $('#' + formName).hide();
                    $('.modal-backdrop').hide();
                }
            });
        }

        $scope.editDocumentRole = function (role, index) {
            $scope.errorsDocRef = [];
            $scope.errorsDocRole = [];
            $scope.documentReferenceAttribute.docRole.roleName = role.roleName;
            $scope.documentReferenceAttribute.docRole.index = index;
        }
        $scope.deleteDocumentRole = function (index) {
            if (confirm("Are you sure you want to delete the role?")) {
                $scope.documentReferenceAttribute.documentRoles.splice(index, 1);
            }
        }
        $scope.saveDocRoleName = function () {
            $scope.errorsDocRole = [];
            var role = {
                roleName: $scope.documentReferenceAttribute.docRole.roleName
            };

            if ($scope.documentReferenceAttribute.docRole.roleName.length > 0) {
                if (!$scope.isDuplicateDocRoleName($scope.documentReferenceAttribute.docRole.roleName, $scope.documentReferenceAttribute.documentRoles)) {
                    $scope.documentReferenceAttribute.documentRoles[$scope.documentReferenceAttribute.docRole.index] = role;
                    $("#editDocRoleSection").modal('toggle');
                }
                else {
                    $scope.errorsDocRole.push($scope.documentReferenceAttribute.docRole.roleName + " has already been defined, please specify a different name");
                }
            }
            else {
                $scope.errorsDocRole.push("Role Name is required");
            }
        }

        $scope.docSelectionOptions = [{
            key: '1', value: 'Search & Link'
        }, {
            key: '2', value: 'Selection'
        }];

        /* Data Section - End */

        /* General Functions Section - Start */

        $scope.clearDocReferenceAttributeFields = function () {
            $scope.isDocReferenceAttribute = true;
            $scope.action = "Add";
            //Initialize the values
            $scope.initializeDocReferenceAttributeValues();

            //Clear the previous error messages
            $scope.errorsDocRef = [];
            $scope.errorsDocRole = [];
        };

        $scope.saveDocReferenceAttribute = function () {
            //Save the data into the database and then close the dialog

            //$scope.closeBackDrop('#ImageReferenceAttribute');
            //Reload the attributes section
            //$scope.defaultAttributes();
        };

        $scope.clearDocReferenceFields = function () {
            //Intialize the attribute with default values
            $scope.initializeDocReferenceAttributeValues();

        };

        /* General Functions Section - End */

        /* Accepted Doc Types Section - Start */

        //$scope.docApplyType = "1";

        $scope.changeDocApplyType = function (newValue) {
            $scope.documentReferenceAttribute.docApplyType = newValue;
        }
        $scope.docTypeInnerValues = {
        };
        $scope.initializeItemInnerContentValues = function (itemValue) {
            $scope.docTypeInnerValues[itemValue] = {
                selectedFilters: [],
                properties: {
                    canAddNewDocs: false,
                    canLinkDocs: false,
                    linkNewDocOption: ''
                },
                selectedContentTypes: [],
                selectedLibraries: [],
                selectedSourceOptions: []
            };
        };

        $scope.allDocTypes = [];

        $scope.populateDocumentLibraryTypes = function () {
            documentLibraryService.getAllDocumentLibraries().$promise.then(function (result) {
                var data = [];

                //Map the domains into the Dual Multi Select format
                if (result && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        var library = result[i];
                        data.push({
                            value: library.documentLibraryId,
                            label: library.name
                        });
                    }
                }
                $scope.allDocTypes = data;
            });
            //if (callbackFunction) {
            //    callbackFunction();
            //}
            //}
        }


        $scope.showDocProperties = function (itemValue) {
            event.preventDefault();

            //store this value for later purposes
            $scope.activeDocTypeId = itemValue;

            var buttonNode = event.target;
            var buttonParentNode = $(buttonNode).parent();
            var isDropdownExists = (buttonParentNode.find("#docPropertiesDropdown")).length > 0;

            //If the dropdown node doesn't exist, create it
            if (!isDropdownExists) {
                buttonParentNode.append($("#docPropertiesDropdown"));
            }

            //Populate the values corresponding to the Item
            var itemInnerValues = $scope.docTypeInnerValues[itemValue];
            if (!itemInnerValues) {
                $scope.initializeItemInnerContentValues(itemValue);
                itemInnerValues = $scope.docTypeInnerValues[itemValue];
            }
            $scope.docProperties = itemInnerValues.properties;
            $scope.$apply();

            //If dropdown didn't exists and if the dropdown was open, we dhould not toggle the dropdown
            var skipToggleDropdown = (!isDropdownExists && $("#docPropertiesDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleDocProperties");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
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
            var skipToggleDropdown = (!isDropdownExists && $("#docFiltersDropdown").hasClass('open'));
            if (!skipToggleDropdown) {
                var toggleNode = $("#toggleDocFilters");
                $(toggleNode).dropdown('toggle');
            }

            event.stopPropagation();
        };

        $scope.createDocTypeInnerContentNode = function (item) {
            var childNode = document.createDocumentFragment();

            //Create Button1 - Add Properties
            var buttonParentNodeRadio = $("<div class='inline-display radio'></div>");
            var buttonNodeRadio = $("<label><input type='radio' name='isAcceptedDocTypeDefault' ng-model='documentReferenceAttribute.isAcceptedDocTypeDefault' ng-value='$parent'></label>");
            buttonParentNodeRadio.append(buttonNodeRadio);

            //Create Button1 - Add Properties
            var buttonParentNode1 = $("<div class='inline-display reference-dropdown'></div>");
            var buttonNode1 = $("<i class='fa fa-plus large-font green-color inner-control'></i>");
            buttonParentNode1.append(buttonNode1);

            //Create Button2 - Filter Doc
            var buttonParentNode2 = $("<div class='dropdown inline-display reference-dropdown'></div>");
            var buttonNode2 = $("<i class='fa fa-filter large-font gray-color inner-control'></i>");
            buttonParentNode2.append(buttonNode2);

            //Add Buttons to the DOM
            childNode.appendChild(buttonParentNodeRadio[0]);
            childNode.appendChild(buttonParentNode1[0]);
            buttonNode1.click(function () { $scope.showDocProperties($(item).attr('value')); });
            childNode.appendChild(buttonParentNode2[0]);
            buttonNode2.click(function () { $scope.showDocFilters($(item).attr('value')); });

            return childNode;
        };

        /* Doc properties Section - Start */

        $scope.docProperties = {
        };

        $scope.linkDocOptions = [{
            key: '1', value: 'The current object only'
        }, {
            key: '2', value: 'The current object and an Owner object'
        }];

        /* Doc properties Section - End */

        /* Doc Filter Section - Start */

        $scope.docFilterOptions = $scope.contentTypeClassifications;

        //    [{
        //    key: '1', value: 'Any Classifcation'
        //}, {
        //    key: '2', value: 'Active'
        //}, {
        //    key: '3', value: 'Approved'
        //}, {
        //    key: '4', value: 'Archived'
        //}];

        //This object will hold the selected Doc Filters for a given type (at a given point)
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

        // $scope.populateDocumentLibraryTypes();

        /* Doc Filter Section - End */
        $scope.showAcceptedDocTypes = function () {
            $scope.docTypeInnerValues = angular.copy($scope.documentReferenceAttribute.docTypeInnerNodeValues);
            $scope.selectedDocTypes = angular.copy($scope.documentReferenceAttribute.selectedDocTypes);
            $scope.retainSelectedDocTypes = angular.copy($scope.documentReferenceAttribute.selectedDocTypes);
            //$scope.populateDocumentLibraryTypes();
            $scope.$broadcast("loadDualMultiSelectControl#acceptedDocTypes", $scope.allDocTypes, $scope.documentReferenceAttribute.selectedDocTypes, "Document");

            //Handle the Modal Dialog close event - to preserve the inner dropdown content
            $("#acceptedDocumentTypesAttribute").unbind("hidden.bs.modal");
            $("#acceptedDocumentTypesAttribute").on("hidden.bs.modal", function () {
                $scope.clearAcceptedDocTypes();
            });
        };

        $scope.saveAcceptedDocTypes = function () {
            $scope.documentReferenceAttribute.docTypeInnerNodeValues = angular.copy($scope.docTypeInnerValues);
            var s = $scope.documentReferenceAttribute.isAcceptedDocTypeDefault;
            //Close the Dialog
            $("#acceptedDocumentTypesAttribute").modal('toggle');
        };

        $scope.clearAcceptedDocTypes = function () {
            //Push the Dropdown content into the parent control - for persisting the inner control dropdown content
            $("#docMultiSelectInnerDroppdown_parent").append($("#docPropertiesDropdown"));
            $("#docMultiSelectInnerDroppdown_parent").append($("#docFiltersDropdown"));
            $scope.docTypeInnerValues = {
            };
        };
        $scope.discardAcceptedDocTypes = function () {
            $scope.documentReferenceAttribute.selectedDocTypes = angular.copy($scope.retainSelectedDocTypes);
        }

        /* Accepted Doc Types Section - End */

        /* Document Linking Sources Section - Start */

        $scope.initializeDocItemInnerContentValues = function (itemValue) {
            $scope.docTypeInnerValues[itemValue] = {
                selectedFilters: [],
                properties: {
                    canAddNewDocuments: false,
                    canLinkDocuments: false,
                    linkNewImageOption: ''
                },
                selectedContentTypes: [],
                selectedLibraries: [],
                selectedSearchOptions: []
            };
        };

        $scope.showDocLinkSources = function () {

            //Select the first tab always
            $scope.selectTab('sourceContentObject');;

            //Get the data from the services and assign it to the scope variables and then raise the event
            var itemId = $scope.activeDocTypeId;
            var itemInnerValues = $scope.docTypeInnerValues[itemId];
            if (!itemInnerValues) {
                $scope.initializeDocItemInnerContentValues();
                itemInnerValues = $scope.docTypeInnerValues[itemId];
            }

            //Store the values into the attribute
            $scope.selectedDocContentTypes = angular.copy(itemInnerValues.selectedContentTypes);
            $scope.selectedDocLibraries = angular.copy(itemInnerValues.selectedLibraries);
            $scope.selectedDocSourceOptions = angular.copy(itemInnerValues.selectedSourceOptions);

            var allObjextContTypes = [];

            var tmpContnetDomains = angular.copy($scope.domiansObjTreeStructure);

            for (var i = 0; i < tmpContnetDomains.length; i++) {
                var node = angular.copy(tmpContnetDomains[i]);
                if (node.children.length > 0) {
                    for (var j = 0; j < node.children.length; j++) {
                        if (node.children[j].children) {
                            node.children[j].children = undefined;
                        }
                    }
                }
                else
                    node = undefined;
                allObjextContTypes.push(node);
            }
            $scope.allDocContentTypes = allObjextContTypes;
            //Get the data from the services and assign it to the scope variables and then raise the event
            //$scope.allDocContentTypes = $scope.domainsDocTreeStructure;
            $scope.$broadcast("loadDualMultiSelectControl#docContentTypes", $scope.allDocContentTypes, $scope.selectedDocContentTypes);
            $scope.$broadcast("loadDualMultiSelectControl#docSourceLibrary", $scope.allDocTypes, $scope.selectedDocLibraries);
            //$scope.$broadcast("loadDualMultiSelectControl#docSourceOptions", $scope.searchInterfaces, $scope.selectedDocSourceOptions);
        };

        $scope.docOptionSearchClick = function (selectedOptionValue) {
            var allDocSearches = [];
            $scope.$broadcast("loadDualMultiSelectControl#docSourceOptions", allDocSearches, $scope.selectedDocSourceOptions, "Document");
            $scope.selectTab('searchOptions');
            var tmpContnetDomains = $scope.getSearchOptionsOfAttributes($scope.selectedDocContentTypes);
            $scope.$broadcast("loadDualMultiSelectControl#docSourceOptions", tmpContnetDomains, $scope.selectedDocSourceOptions, "Document");
        };

        $scope.deleteDocSourceOption = function (selectedSourceOption) {
            var selectedDOMNode = selectedSourceOption[0];
            $scope.$broadcast("deselectItem#docSourceOptions", selectedDOMNode);
            event.stopPropagation();
        };

        $scope.createDocContentTypeInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            var buttonNode = $("<i class='fa fa-search large-font gray-color inner-control'></i>");

            childNode.appendChild(buttonNode[0]);
            buttonNode.click(function () { $scope.docOptionSearchClick($(item).attr('value')); });

            return childNode;
        };

        $scope.createDocLibraryInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            var buttonNode = $("<i class='fa fa-search large-font gray-color inner-control'></i>");

            childNode.appendChild(buttonNode[0]);
            buttonNode.click(function () { $scope.docOptionSearchClick($(item).attr('value')); });

            return childNode;
        };

        $scope.createDocSourceInnerNode = function (item) {
            var childNode = document.createDocumentFragment();

            //var buttonParentNode1 = $("<div class='inline-display'></div>");
            //var buttonNode1 = $("<i class='fa fa-pencil large-font gray-color inner-control' data-toggle='modal' data-target='#editDocSourceOptionSectionAttribute'></i>");
            //buttonParentNode1.append(buttonNode1);

            var buttonParentNode2 = $("<div class='inline-display'></div>");
            var buttonNode2 = $("<i class='fa fa-times large-font gray-color inner-control'></i>");
            buttonParentNode2.append(buttonNode2);

            //childNode.appendChild(buttonParentNode1[0]);
            //buttonNode1.click(function () { $scope.editDocSearchOption($(item).attr('value')); });
            //childNode.appendChild(buttonParentNode2[0]);
            //buttonNode2.click(function () { $scope.deleteDocSourceOption($(item).attr('value')); });

            return childNode;
        };

        $scope.clearLinkedDocumentSources = function () {
            $scope.selectedDocContentTypes = [];
            $scope.selectedDocLibraries = [];
            $scope.selectedDocSourceOptions = [];
        };

        $scope.saveLinkedDocumentSources = function () {
            //We need to save the values inside the Document Referencce Attribute values
            var itemId = $scope.activeDocTypeId;

            var itemInnerValues = $scope.docTypeInnerValues[itemId];
            if (!itemInnerValues) {
                $scope.initializeDocItemInnerContentValues();
                itemInnerValues = $scope.docTypeInnerValues[itemId];
            }

            //Store the values into the attribute
            itemInnerValues.selectedContentTypes = angular.copy($scope.selectedDocContentTypes);
            itemInnerValues.selectedLibraries = angular.copy($scope.selectedDocLibraries);
            itemInnerValues.selectedSourceOptions = angular.copy($scope.selectedDocSourceOptions);

            $("#linkedDocumentSources").modal('toggle');
        };


        $scope.selectedDocSearchOptionName = '';
        $scope.selectedDocSearchOptionType = '';

        $scope.selectedDocSearchOption = {
        };

        $scope.editDocSearchOption = function (selectedSearchOption) {
            var selectedName = selectedSearchOption.text();
            if (selectedSearchOption.children().length > 0) {
                //To Ignore the type value
                selectedName = $(selectedSearchOption.children()[0]).text()
            }
            var selectedValue = selectedSearchOption.attr("value");

            $scope.selectedDocSearchOption = selectedSearchOption;
            $scope.selectedDocSearchOptionName = selectedName;
            $("#docSearchOptionName").val(selectedName);

            //Get the complete level of the selected option
            var allSearchOptions = $scope.allDocSourceOptions;
            var optionsCount = (allSearchOptions) ? allSearchOptions.length : 0;
            var parentNames = [];
            for (var i = 0; i < optionsCount; ++i) {
                var option = allSearchOptions[i];
                parentNames = [];
                var returnvalues = $scope.findParentNameForSelectedDocValue(option, selectedValue);
                if (returnvalues && returnvalues.length > 0) {
                    parentNames = parentNames.concat(returnvalues);
                    break;
                }
            }

            if (parentNames.length > 0) {
                var searchOptionNode = document.createDocumentFragment();
                var parentCount = parentNames.length;
                var previousNode = null;
                var optionType = $scope.selectedDocSearchOptionType;
                for (var i = 0; i < parentCount; ++i) {
                    var parentName = parentNames[i];

                    var node = null;

                    //If this is the last item and if type exists, we need to show that too
                    if (i == parentCount - 1 && optionType) {
                        node = $("<div class='margin-left20'></div>");
                        node.append($("<div class='option-text'>" + parentName + "</div>"));
                        node.append($("<div class='type-content'>" + optionType + "</div>"));
                    }
                    else {
                        node = $("<div class='margin-left20'>" + parentName + "</div>");
                    }

                    if (previousNode) {
                        previousNode.append(node);
                    }
                    else {
                        searchOptionNode.appendChild(node[0]);
                    }

                    previousNode = node;
                }
            }

            $("#editDocSearchOption").empty();
            $("#editDocSearchOption").append(searchOptionNode);

        };

        $scope.findParentNameForSelectedDocValue = function (option, selectedValue) {
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
                        var childReturnValues = $scope.findParentNameForSelectedDocValue(child, selectedValue);
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

        $scope.saveDocSearchOption = function () {
            var selectedOption = $scope.selectedDocSearchOption;
            var oldName = selectedOption.text();
            var newName = $("#docSearchOptionName").val();

            //If there is a change in the Name, update it in the DOM
            if (oldName.toLowerCase() != newName.toLowerCase()) {
                $scope.$broadcast("changeSelectedItemText#docSourceOptions", selectedOption.attr("value"), newName);
            }

            //Clear the fields and close the dialog
            $("#docSearchOptionName").val('');
            $("#editDocSearchOption").empty();

            $("#editDocSourceOptionSectionAttribute").modal('toggle');
        };

        $scope.discardDocSearchOption = function () {
            //Clear the fields
            $("#docSearchOptionName").val('');
            $("#editDocSearchOption").empty();
        };

        /* Document Linking Sources Section - End */

        $scope.saveDocumentReferenceAttribute = function (documentReferenceAttribute) {

            $scope.errors = [];
            $scope.errorsDocRef = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            var docRefAttributeDTO = {
            };
            if ($scope.validateAttribute(documentReferenceAttribute, $scope.errorAttribute, 'documentReference')) {
                docRefAttributeDTO.contentTypeId = $routeParams.contentTypeId;
                docRefAttributeDTO.subObjectId = $routeParams.subObjectId;
                docRefAttributeDTO.attributeSetId = $routeParams.attributeSetId;
                docRefAttributeDTO.attributeSetName = $routeParams.attributeScreenName;

                docRefAttributeDTO.name = documentReferenceAttribute.name;
                docRefAttributeDTO.identifier = documentReferenceAttribute.identifier;
                docRefAttributeDTO.mandatory = documentReferenceAttribute.isMandatory;
                docRefAttributeDTO.readOnly = documentReferenceAttribute.isReadOnly;
                docRefAttributeDTO.uniqueValues = documentReferenceAttribute.isUnique;
                if (documentReferenceAttribute.isSingularlyUnique == "1") {
                    docRefAttributeDTO.IsSingularityUnique = true;
                    docRefAttributeDTO.uniqueGroup = "";
                }
                else {
                    docRefAttributeDTO.IsSingularityUnique = false;
                    docRefAttributeDTO.uniqueGroup = documentReferenceAttribute.uniqueGroup;
                }
                docRefAttributeDTO.description = documentReferenceAttribute.description;
                docRefAttributeDTO.multipleValues = {
                    allowMultipleValues: documentReferenceAttribute.isAllowMultiValue, isUnique: documentReferenceAttribute.isValueUnique,
                    isReArranged: documentReferenceAttribute.canValueRearranged, minimumValue: documentReferenceAttribute.minNumOfValues,
                    maximumValue: documentReferenceAttribute.maxNumOfValues
                };
                //Document Reference Attribute properties
                docRefAttributeDTO.editDocumentBehaviour = documentReferenceAttribute.isEditProduct;
                docRefAttributeDTO.viewDocumentBehaviour = documentReferenceAttribute.isViewProduct;
                docRefAttributeDTO.canUserCreateDocumentFolder = documentReferenceAttribute.canCreateDocFolders;
                docRefAttributeDTO.documentRoles = documentReferenceAttribute.documentRoles;
                docRefAttributeDTO.orderNo = documentReferenceAttribute.orderNo;

                docRefAttributeDTO.acceptedDocumentType = [];

                angular.forEach($scope.documentReferenceAttribute.selectedDocTypes, function (value, key) {
                    var acceptedDocumentType = {
                        id: value.value,
                        name: value.label,
                        selectedClassifications: [],
                        additionalLinkingProperties: {
                            canUserUploadNewDocuments: false,
                            canUserLinkToExistingDocuments: false,
                            isCurrentObject: false, linkedSources: {}
                        }
                    };
                    var docTypeInnerNodeValues = $scope.documentReferenceAttribute.docTypeInnerNodeValues[value.value];

                    if (!angular.isUndefined(docTypeInnerNodeValues)) {
                        //these are the selected values for each item
                        acceptedDocumentType.additionalLinkingProperties.canUserUploadNewDocuments = docTypeInnerNodeValues.properties.canAddNewDocs;
                        acceptedDocumentType.additionalLinkingProperties.canUserLinkToExistingDocuments = docTypeInnerNodeValues.properties.canLinkDocs;


                        //these are the selected classifications for each item
                        angular.forEach(docTypeInnerNodeValues.selectedFilters, function (v, k) {
                            var selectedClassifications = {
                                id: v,
                                name: $scope.findArrayValueById($scope.docFilterOptions, v),
                                isAnyClassification: v === "1" ? true : false
                            };
                            acceptedDocumentType.selectedClassifications.push(selectedClassifications);
                        });

                        var linkedSources = {
                            selectedDocAttribute: [], selectedDocLibrary: [], searchOption: []
                        };
                        //these are the selected docContentTypes in the 2nd popup for each item.
                        angular.forEach(docTypeInnerNodeValues.selectedContentTypes, function (itemValue, itemKey) {
                            var selectedDocAttribute = {
                                id: itemValue.value,
                                name: itemValue.label
                            }
                            linkedSources.selectedDocAttribute.push(selectedDocAttribute);
                        });
                        //these are the selected docTypeInnerNodeValues in the 2nd popup for each item.
                        angular.forEach(docTypeInnerNodeValues.selectedLibraries, function (itemValue, itemKey) {
                            var selectedDocLibrary = {
                                id: itemValue.value,
                                name: itemValue.label
                            };
                            linkedSources.selectedDocLibrary.push(selectedDocLibrary);
                        });
                        //these are the selected docContentTypes in the 2nd popup for each item.
                        angular.forEach(docTypeInnerNodeValues.selectedSourceOptions, function (itemValue, itemKey) {
                            var selectedDocAttribute = {
                                id: itemValue.value,
                                name: itemValue.label,
                                searchOrder: 0
                            }
                            linkedSources.searchOption.push(selectedDocAttribute);
                        });

                        acceptedDocumentType.additionalLinkingProperties.linkedSources = linkedSources;
                    }
                    docRefAttributeDTO.acceptedDocumentType.push(acceptedDocumentType);

                });

                if (documentReferenceAttribute.attributeId == '') {
                    docRefAttributeDTO.createdBy = $rootScope.manageITUserName;
                    attributeService.create({
                        attributeType: 'DocumentAttribute'
                    }, docRefAttributeDTO).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Document Reference Attribute saved successfully");

                            $scope.defaultAttributes();
                            //Close the Dialog
                            $scope.closeBackDrop('#DocumentReferenceAttribute');
                            $scope.clearDocReferenceFields();
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while saving the Time Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
                else {
                    docRefAttributeDTO.attributeId = documentReferenceAttribute.attributeId;
                    docRefAttributeDTO.updatedBy = $rootScope.manageITUserName;
                    attributeService.update({
                        attributeType: 'DocumentAttribute'
                    }, docRefAttributeDTO).$promise.then(function (response) {
                        if (response.$resolved == true && response.attributeId != "") {
                            $scope.errorAttribute.isSuccess = true;
                            $scope.errorAttribute.messages.push("Document Reference Attribute updated successfully");
                            $scope.defaultAttributes();
                            //Close the Dialog
                            $scope.closeBackDrop('#DocumentReferenceAttribute');
                            $scope.clearDocReferenceFields();
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errorAttribute.messages.push(value.message);
                                $scope.errorAttribute.moreDetails = value.moreDetails;
                                $scope.errorAttribute.isError = true;
                                $scope.errorAttribute.isHide = true;
                            });
                        }
                        else {
                            $scope.errorAttribute.messages.push("Error occured while updating the Time Attribute. Please try after sometime.");
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.isHide = true;
                        }
                    });
                }
            }
        };

        $scope.deleteDocumentReferenceAttribute = function (selectedAttr) {
            $scope.errors = [];
            $scope.resetErrorDirective($scope.errorAttribute);
            attributeService.remove({
                attributeType: 'DocumentAttribute', contentTypeId: $routeParams.contentTypeId, id: selectedAttr.attributeId
            }).$promise.then(function (response) {
                if (response.$resolved == true) {
                    $scope.showSuccessMessage($scope.errorAttribute, "Document Reference Attribute deleted successfully");
                    $scope.defaultAttributes();
                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.errorAttribute, value.message, value.moreDetails);
                    });
                }
                else {
                    $scope.showExceptionMessage($scope.errorAttribute, "Error occured while deleting the Document Reference Attribute. Please try after sometime.", null);
                }
            });
        }

        $scope.editDocumentReferenceAttribute = function (documentReferenceAttribute) {
            $scope.resetErrorDirective($scope.errorAttribute);
            $scope.action = "Edit";
            $scope.errors = [];
            $scope.errorsDocRef = [];
            $scope.readonly = true;
            $scope.documentReferenceAttribute.attributeId = documentReferenceAttribute.attributeId;
            $scope.documentReferenceAttribute.name = documentReferenceAttribute.name;
            $scope.documentReferenceAttribute.identifier = documentReferenceAttribute.identifier;
            $scope.documentReferenceAttribute.isMandatory = documentReferenceAttribute.mandatory;
            $scope.documentReferenceAttribute.isReadOnly = documentReferenceAttribute.readOnly;
            $scope.documentReferenceAttribute.isUnique = documentReferenceAttribute.uniqueValues;
            $scope.documentReferenceAttribute.uniqueGroup = documentReferenceAttribute.uniqueGroup;
            $scope.documentReferenceAttribute.orderNo = documentReferenceAttribute.orderNo;
            $scope.documentReferenceAttribute.description = documentReferenceAttribute.description;
            $scope.documentReferenceAttribute.isAllowMultiValue = documentReferenceAttribute.multipleValues.allowMultipleValues;
            $scope.documentReferenceAttribute.isValueUnique = documentReferenceAttribute.multipleValues.isUnique;
            if (documentReferenceAttribute.uniqueValues)
                $scope.documentReferenceAttribute.isSingularlyUnique = documentReferenceAttribute.isSingularityUnique == true ? 1 : 0;
            else $scope.documentReferenceAttribute.isSingularlyUnique = '';
            $scope.documentReferenceAttribute.canValueRearranged = documentReferenceAttribute.multipleValues.isReArranged;
            $scope.documentReferenceAttribute.minNumOfValues = documentReferenceAttribute.multipleValues.minimumValue;
            $scope.documentReferenceAttribute.maxNumOfValues = documentReferenceAttribute.multipleValues.maximumValue;

            //Document Reference Attribute properties
            $scope.documentReferenceAttribute.isEditProduct = documentReferenceAttribute.editDocumentBehaviour;
            $scope.documentReferenceAttribute.isViewProduct = documentReferenceAttribute.viewDocumentBehaviour;
            $scope.documentReferenceAttribute.canCreateDocFolders = documentReferenceAttribute.canUserCreateDocumentFolder;
            $scope.documentReferenceAttribute.documentRoles.length = 0;
            angular.forEach(documentReferenceAttribute.documentRoles, function (value, key) {
                $scope.documentReferenceAttribute.documentRoles.push({ roleName: value.roleName });
            });

            angular.forEach(documentReferenceAttribute.acceptedDocumentType, function (value, key) {
                $scope.initializeItemInnerContentValues(value.id);
                var eachNode = $scope.docTypeInnerValues[value.id];
                eachNode.label = value.name;
                eachNode.value = value.id;
                $scope.fillKeyValuePair(value, $scope.documentReferenceAttribute.selectedDocTypes);

                angular.forEach(value.selectedClassifications, function (v, k) {
                    eachNode.selectedFilters.push(v.id);
                });

                eachNode.properties.canAddNewDocs = value.additionalLinkingProperties.canUserUploadNewDocuments;
                eachNode.properties.canLinkDocs = value.additionalLinkingProperties.canUserLinkToExistingDocuments;
                var linkedSources = value.additionalLinkingProperties.linkedSources;


                angular.forEach(linkedSources.selectedDocAttribute, function (v, k) {
                    $scope.fillKeyValuePair(v, eachNode.selectedContentTypes);
                    $scope.fillKeyValuePair(v, $scope.selectedDocContentTypes);
                });
                angular.forEach(linkedSources.selectedDocLibrary, function (v, k) {
                    $scope.fillKeyValuePair(v, eachNode.selectedLibraries);
                    $scope.fillKeyValuePair(v, $scope.selectedDocLibraries);
                });
                angular.forEach(linkedSources.searchOption, function (v, k) {
                    $scope.fillKeyValuePair(v, eachNode.selectedSourceOptions);
                    $scope.fillKeyValuePair(v, $scope.selectedDocSourceOptions);
                });
            });

            //Store the values into the attribute
            $scope.documentReferenceAttribute.docTypeInnerNodeValues = angular.copy($scope.docTypeInnerValues);

        }

        $scope.fillKeyValuePair = function (source, dest) {
            var obj = {
                value: source.id, label: source.name
            };
            dest.push(obj);
        }
        //**************************************** Document Reference Attribute Logical flow through - End ***********************************

    }]);


