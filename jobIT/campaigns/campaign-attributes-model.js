
(function () {
    "use strict";
    function campaignAttributeModel(svc, sequenceSvc, $filter, $routeParams) {
        var model = {},
            text = {},
            attributes = {},
            addResult = {},
            editResult = {},
            deleteResult = {},
            attributeScreenName = "",
            isAddAttribute = false,
            isTextAttribute = false,
            isSequenceAttribute = false,
            isYesNoAttribute = false,
            isdecimalAttribute = false,
            isListAttribute = false,
            isSubObjectAttribute = false,
            isDefineListValues = false,
            isDatetimeAttribute = false,
            isDateAttribute = false,
            isTimeAttribute = false,
            isCopyAttribute = false,
            isCopyAttributeField = false,
            isImageReferenceAttribute = false,
            action = "",
            readonly = true,
            errors = {},
            isTextAttribute = true,
            textAttribute = {},
            addInput = {},
            isSingularlyUniques = [],
            lineFormat = [],
            inputEdit = {},
            isEditSuccess = false,
            isEditError = "",           
            isAddError = "",
            isAddCampShow = "",
           decimalDisplayAsPrice = [
            {
                key: 0, value: "Display as Number"
            },
        {
            key: 1, value: "Display as Price"
        },
        {
            key: 2, value: "Display as Percentage"
        }
           ],

    dateFormatDefaultValues = [
        {
            //dd/mm/yyyy /^([0-2]|0[0-9]|1[0-9]|2[0-3])/?[0-5][0-9]/?[0-5][0-9][0-5][0-9]$/
            key: 0, value: "25/12/2015", pattern: '^((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]{1}))\\/(0?[1-9]|1[0-2])\\/([0-9]{4})$' 
        },
        {
            //mm/dd/yyyy
            key: 1, value: "12/25/2015", pattern: '^(0?[1-9]|1[0-2])\\/((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]{1}))\\/([0-9]{4})$' 
        },
        {
            //yyyy-mm-dd (([1]{1}[9]{1}[9]{1}\\d{1})|([1-9]{1}\\d{3}))
            key: 2, value: "2015-12-25", pattern: '^(\\d{4})(-)(0?[1-9]|1[0-2])(-)((0?[1-9])|(1?[0-9])|(2?[0-9])|([3][0,1]))$' 
        }
    ],

        timeFormatDefaultValues = [
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
        ],

        minMaxDateTimeDefaultValues = [
            {
                key: 0, value: "Specific Date"
            },
        {
            key: 1, value: "Not Specified"
        },
        {
            key: 2, value: "Current Time + Offset"
        }
        ],

        minMaxTimeDefaultValues = [
            {
                key: 0, value: "Specific Time"
            },
        {
            key: 1, value: "Not Specified"
        },
        {
            key: 2, value: "Current Time + Offset"
        }
        ],

        minMaxDateDefaultValues = [
            {
                key: 0, value: "Specific Date"
            },
        {
            key: 1, value: "Not Specified"
        },
        {
            key: 2, value: "Current Date + Offset"
        }
        ],

        timeOffSetDefaultValues = [
             {
                 key: "0", value: "Days"
             },
         {
             key: "1", value: "Hours"
         },
         {
             key: "2", value: "Minutes"
         }
        ],
        timeOffSetDefaultDateValues = [
                    {
                        key: "0", value: "Days"
                    }
        ],
        yesnoDefaultValues = [
            {
                key: 0, value: "Accept"
            },
        {
            key: 1, value: "Reject"
        }
        ],
            yesnoDisplayTypes = [
            {
                key: "0", value: "Checkbox"
            },
            {
                key: "1", value: "Radio Buttons"
            },
            {
                key: "2", value: "Drop Down"
            }
            ],

               yesno = [
            {
                key: "1", value: "Yes"
            },
        {
            key: "0", value: "No"
        }
               ],
               yesNoAttribute = [{
                   yesValue: "Yes"
               },
               {
        noValue: "No"
               }, {
                   defaultValue: ""
               }
               ],
        sequenceGenerators = {},
        formatId = "",
         dateFormat = "",
        datePattern = "",
        datePickerControl = {
            minOpened: false,
            maxOpened: false,
            defaultOpened: false
        },
        minDateTimeValues = [],
        maxDateTimeValues = [],
        defaultDateTimeValues = [];

        model.init = function () {
            model.text = text;
            model.attributes = attributes;
            model.addResult = addResult;
            model.editResult = editResult;
            model.deleteResult = deleteResult;
            model.attributeScreenName = attributeScreenName;
            model.isAddAttribute = isAddAttribute;
            model.isTextAttribute = isTextAttribute;
            model.isSequenceAttribute = isSequenceAttribute;
            model.isYesNoAttribute = isYesNoAttribute;
            model.isdecimalAttribute = isdecimalAttribute;
            model.isListAttribute = isListAttribute;
            model.isSubObjectAttribute = isSubObjectAttribute;
            model.isDefineListValues = isDefineListValues;
            model.isDatetimeAttribute = isDatetimeAttribute;
            model.isDateAttribute = isDateAttribute;
            model.isTimeAttribute = isTimeAttribute;
            model.isCopyAttribute = isCopyAttribute;
            model.isCopyAttributeField = isCopyAttributeField;
            model.isImageReferenceAttribute = isImageReferenceAttribute;
            model.action = action;
            model.readonly = readonly;
            model.errors = errors;
            model.textAttribute = textAttribute;
            model.addInput = addInput;
            model.isSingularlyUniques = isSingularlyUniques;
            model.lineFormat = lineFormat;
            model.inputEdit = inputEdit;
            model.isEditSuccess = isEditSuccess;
            model.isAddCampShow = isAddCampShow;
            model.decimalDisplayAsPrice = decimalDisplayAsPrice;
            model.dateFormatDefaultValues = dateFormatDefaultValues;
            model.timeFormatDefaultValues = timeFormatDefaultValues;
            model.minMaxDateTimeDefaultValues = minMaxDateTimeDefaultValues;
            model.minMaxTimeDefaultValues = minMaxTimeDefaultValues;
            model.minMaxDateDefaultValues = minMaxDateDefaultValues;
            model.timeOffSetDefaultValues = timeOffSetDefaultValues;
            model.timeOffSetDefaultDateValues = timeOffSetDefaultDateValues;
            model.yesnoDefaultValues = yesnoDefaultValues;
            model.yesnoDisplayTypes = yesnoDisplayTypes;
            model.yesno = yesno;
            model.yesNoAttribute = yesNoAttribute;
            model.sequenceGenerators = sequenceGenerators;
            model.formatId = formatId;
            model.dateFormat = dateFormat;
            model.datePattern = datePattern;
            model.datePickerControl = datePickerControl;
            model.minDateTimeValues = minDateTimeValues;
            model.maxDateTimeValues = maxDateTimeValues;
            model.defaultDateTimeValues = defaultDateTimeValues;
            return model;
        };

        model.get = function (campaignId, attributeSetId) {
            svc.getDefaultAttributes({ campaignId: campaignId, attributeSetId: false }).$promise.then(function (details) {
                model.defaultAttributes = details;
            });
        };

        model.add = function (data) {
            addInput.DomainId = data.domainId;
            addInput.Identifier = data.identifier;
            addInput.Name = data.name;
            addInput.ContentTypeId = data.contentTypeId;
            addInput.FieldWidth = data.fieldWidth;
            svc.create({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };

        model.addInteger = function (data) {
            svc.createInteger({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addDecimal = function (data) {
            svc.createDecimal({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addSequence = function (data) {
            svc.createSequence({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addDate = function (data) {
            svc.createDate({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addTime = function (data) {
            svc.createTime({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addDateAndTime = function (data) {
            svc.createDateAndTime({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addYesNo = function (data) {
            svc.createYesNo({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addCopy = function (data) {
            svc.createCopy({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addList = function (data) {
            svc.createList({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addSubObject = function (data) {
            svc.createSubObject({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addObjectReference = function (data) {
            svc.createObjectReference({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addImageReference = function (data) {
            svc.createImageReference({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };
        model.addDocumentReference = function (data) {
            svc.createDocumentReference({}, data).$promise.then(function (result) {
                model.addResult = result;
                model.isAddSuccess = true;
                model.isAddError = true;
                model.get(result.contentTypeId, false);
            });
        };




        model.edit = function (data) {
            console.log(data);
            inputEdit.ContentTypeId = data.contentTypeId;
            inputEdit.Name = data.name;
            inputEdit.attributeSetId = data.attributeSetId;
            inputEdit.Identifier = data.identifier;
            inputEdit.FieldWidth = data.fieldWidth;
            inputEdit.AttributeId = data.attributeId;
            svc.update(data).$promise.then(function (result) {
                model.editResult = result;
                if (result) {
                    model.isEditSuccess = true;
                    model.isEditError = true;
                    model.get(result.contentTypeId, false);
                }
            });
        };

        model.delete = function () {
            svc.delete().$promise.then(function (result) {
                model.deleteResult = result;
            });
        };

        model.getAttributeScreenName = function (params) {
            model.attributeScreenName = params.attributeScreenName ? params.attributeScreenName : 'Default';
        };

        model.getAttributePartialVisibility = function () {
            model.isAddAttribute = false;
            model.isTextAttribute = false;
            model.isSequenceAttribute = false;
            model.isYesNoAttribute = false;
            model.isdecimalAttribute = false;
            model.isListAttribute = false;
            model.isSubObjectAttribute = false;
            model.isDefineListValues = false;
            model.isDatetimeAttribute = false;
            model.isDateAttribute = false;
            model.isTimeAttribute = false;
            model.isCopyAttribute = false;
            model.isCopyAttributeField = false;
            model.isImageReferenceAttribute = false;
            model.isAddCampShow = true;
            isSingularlyUniques = [
     {
         key: "1", value: "Singularly Unique"
     },
 {
     key: "0", value: "Composite Unique"
 }
            ],

lineFormat = [
{
    key: 0, value: "Single Line"
},
{
    key: 1, value: "Multi Lines"
}
]
        };



        model.editCampaignAttribute = function (textAttribute) {
            model.readonly = true;
            model.errors = [];
            model.isTextAttribute = true;
            if (textAttribute.attributeId)
                model.attributeId = textAttribute.attributeId;
            if (textAttribute.name)
                model.name = textAttribute.name;
            if (textAttribute.identifier)
                model.identifier = textAttribute.identifier;
            if (textAttribute.mandatory)
                model.isMandatory = textAttribute.mandatory;
            if (textAttribute.readOnly)
                model.isReadOnly = textAttribute.readOnly;
            if (textAttribute.uniqueValues)
                model.isUnique = textAttribute.uniqueValues;
            if (textAttribute.uniqueGroup)
                model.uniqueGroup = textAttribute.uniqueGroup;
            if (textAttribute.description)
                model.description = textAttribute.description;
            if (textAttribute.multipleValues.allowMultipleValues)
                model.isAllowMultiValue = textAttribute.multipleValues.allowMultipleValues;
            if (textAttribute.multipleValues.isUnique)
                model.isValueUnique = textAttribute.multipleValues.isUnique;
            if (textAttribute.uniqueValues)
                model.isSingularlyUnique = textAttribute.isSingularityUnique == true ? 1 : 0;
            else model.isSingularlyUnique = '';
            if (textAttribute.multipleValues.minimumValue)
                model.canValueRearranged = textAttribute.multipleValues.minimumValue;
            if (textAttribute.multipleValues.minimumValue)
                model.minNumOfValues = textAttribute.multipleValues.minimumValue;
            if (textAttribute.multipleValues.maximumValue)
                model.maxNumOfValues = textAttribute.multipleValues.maximumValue;
            if (textAttribute.format)
                model.format = textAttribute.format;
            if (textAttribute.fieldWidth)
                model.fieldWidth = textAttribute.fieldWidth;
            if (textAttribute.minimumLength)
                model.minimumLength = textAttribute.minimumLength;
            if (textAttribute.maximumLength)
                model.maximumLength = textAttribute.maximumLength;
            if (textAttribute.minWordType)
                model.minWordType = textAttribute.minWordType;
            if (textAttribute.maxWordType)
                model.maxWordType = textAttribute.maxWordType;
            if (textAttribute.defaultValue)
                model.defaultValue = textAttribute.defaultValue;
            if (textAttribute.orderNo)
                model.textAttribute.orderNo = textAttribute.orderNo;
        }

        model.deriveIdentifier = function () {
            model.identifier = $filter('camelize')(model.name);
        }
        model.loadSequences = function () {
            sequenceSvc.query().$promise.then(function (details) {
                model.sequenceGenerators = details;
            });
        }
        model.formatDateChange = function () {
            if (model.formatId == 1) {
                model.dateFormat = model.formats[1];
                model.datePattern = model.dateFormatDefaultValues[1].pattern;
            }
            else if (model.formatId == 2) {
                model.dateFormat = model.formats[2];
                model.datePattern = model.dateFormatDefaultValues[2].pattern;
            }
            else {
                model.dateFormat = model.formats[0];
                model.datePattern = model.dateFormatDefaultValues[0].pattern;
            }
        }

        model.openDateCalendar = function (pickerId) {
            if (pickerId == 1) {
                model.datePickerControl.maxOpened = true;
            }
            else if (pickerId == 2) {
                model.datePickerControl.defaultOpened = true;
            }
            else {
                model.datePickerControl.minOpened = true;
            }
        }

        model.timeFormatChange = function (key) {
            if (model.minDateTimeValues.time != "" && model.minDateTimeValues.time != undefined) {
                model.minDateTimeValues.time = model.timeFormatter(key, model.minDateTimeValues.time);
            }
            if (model.maxDateTimeValues.time != "" && model.maxDateTimeValues.time != undefined) {
                model.maxDateTimeValues.time = model.timeFormatter(key, model.maxDateTimeValues.time);
            }
            if (model.defaultDateTimeValues.time != "" && model.defaultDateTimeValues.time != undefined) {
                model.defaultDateTimeValues.time = model.timeFormatter(key, model.defaultDateTimeValues.time);
            }
            //Time Attribute Controls
            if (model.minDateTimeValues.time != "" && model.minDateTimeValues.time != undefined) {
                model.minDateTimeValues.time = model.timeFormatter(key, model.minDateTimeValues.time);
            }
            if (model.maxDateTimeValues.time != "" && model.maxDateTimeValues.time != undefined) {
                model.maxDateTimeValues.time = model.timeFormatter(key, model.maxDateTimeValues.time);
            }
            if (model.defaultDateTimeValues.time != "" && model.defaultDateTimeValues.time != undefined) {
                model.defaultDateTimeValues.time = model.timeFormatter(key, model.defaultDateTimeValues.time);
            }
            model.timePattern = model.timeFormatDefaultValues[key].pattern;
        }


        //model.formatDateTimeChange = function (key) {
        //    if (formatId == 1) {
        //        model.dateTimeFormat = model.formats[1];
        //    }
        //    else if (formatId == 2) {
        //        model.dateTimeFormat = model.formats[2];
        //    }
        //    else {
        //        model.dateTimeFormat = model.formats[0];
        //    }
        //}

        return model.init();
    }
    angular.module('jobit.campaign').factory('campaignAttributeModel', ['campaignAttributeService', 'sequenceService', '$filter', '$routeParams', campaignAttributeModel]);
}());