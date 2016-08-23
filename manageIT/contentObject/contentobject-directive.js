manageitModule.directive('datetimeControl', function () {
    var controller = ['$scope', function ($scope) {
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
        $scope.setDefaultValue = function (valueList, defaultvalue, isSubObject) {

            //if ($routeParams.ContentObjectId == null || $routeParams.ContentObjectId == 0 || $routeParams.ContentObjectId == undefined) {
            if (typeof (isSubObject) === 'undefined') isSubObject = false;
            if (valueList.attributeType == "SequenceAttribute") {
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
        $scope.addMultipleValues = function (minValue, maxValue, option) {
            if (minValue == null)
                minValue = 0;
            if (maxValue == null)
                maxValue = option.maximumValue;
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
        $scope.setDefaultDateTime = function (defaultDateId, defaultDateValue, elmodel) {
            var today = new Date();
            if (defaultDateId == 2) {

                var latestdate = elmodel.attributeType != "DateTimeAttribute"?today.setDate(today.getDate() + defaultDateValue.timeOffset):new Date();
                elmodel.selectedDate = new Date(today);
                if (elmodel.attributeType == "DateTimeAttribute" && defaultDateValue.timeOffsetType == 0)
                    elmodel.selectedTime = formatDate(elmodel.selectedDate, $scope.timeFormatDefaultValues[elmodel.timeFormat].placeHolder);
                else if (elmodel.attributeType == "DateTimeAttribute" && defaultDateValue.timeOffsetType == 1) {
                    var d2 = new Date(elmodel.selectedDate);
                    d2.setHours(d2.getHours() + defaultDateValue.timeOffset);
                    elmodel.selectedTime = formatDate(d2, $scope.timeFormatDefaultValues[elmodel.timeFormat].placeHolder);
                } else if (elmodel.attributeType == "DateTimeAttribute" && defaultDateValue.timeOffsetType == 2) {
                    var d2 = new Date(elmodel.selectedDate);
                    d2.setMinutes(d2.getMinutes() + defaultDateValue.timeOffset);
                    elmodel.selectedTime = formatDate(d2, $scope.timeFormatDefaultValues[elmodel.timeFormat].placeHolder);
                }
            } else if (defaultDateId == 0) {
                elmodel.selectedDate = new Date(defaultDateValue.date);
            }
            else
                elmodel.selectedDate = null;
            
            var defaultItem = { selectedDate: elmodel.selectedDate, dateOptions: elmodel.dateOptions, placeHolder: elmodel.placeHolder, datePickerControl1: elmodel.datePickerControl1, selectedTime: elmodel.selectedTime }
            $scope.setDefaultValue(elmodel, defaultItem)

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
        $scope.timeFormatDefaultValues = [
                    {
                        key: 0, value: "14:00", pattern: '^(0?[0-9]|1[0-9]|2[0-3])\:([0-5][0-9])$', placeHolder: 'hh:mm'
                    },
                    {
                        key: 1, value: "14:00:00", pattern: '^(0?[0-9]|1[0-9]|2[0-3])\:([0-5][0-9]):([0-5][0-9])$', placeHolder: 'hh:mm:ss'
                    },
                    {
                        key: 2, value: "2:00 pm", pattern: '^(0?[0-9]|1[0-2])\:([0-5][0-9]) [APap][mM]$', placeHolder: 'hh:mm TT'
                    },
                    {
                        key: 3, value: "2:00:00 pm", pattern: '^(0?[0-9]|1[0-2])\:([0-5][0-9]):([0-5][0-9]) [APap][mM]$', placeHolder: 'hh:mm:ss TT'
                    }
        ];
        function formatDate(date, format, utc) {
            var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            function ii(i, len) {
                var s = i + "";
                len = len || 2;
                while (s.length < len) s = "0" + s;
                return s;
            }

            var y = utc ? date.getUTCFullYear() : date.getFullYear();
            format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
            format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
            format = format.replace(/(^|[^\\])y/g, "$1" + y);

            var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
            format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
            format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
            format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
            format = format.replace(/(^|[^\\])M/g, "$1" + M);

            var d = utc ? date.getUTCDate() : date.getDate();
            format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
            format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
            format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
            format = format.replace(/(^|[^\\])d/g, "$1" + d);

            var H = utc ? date.getUTCHours() : date.getHours();
            format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
            format = format.replace(/(^|[^\\])H/g, "$1" + H);

            var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
            format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
            format = format.replace(/(^|[^\\])h/g, "$1" + h);

            var m = utc ? date.getUTCMinutes() : date.getMinutes();
            format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
            format = format.replace(/(^|[^\\])m/g, "$1" + m);

            var s = utc ? date.getUTCSeconds() : date.getSeconds();
            format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
            format = format.replace(/(^|[^\\])s/g, "$1" + s);

            var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
            format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
            f = Math.round(f / 10);
            format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
            f = Math.round(f / 10);
            format = format.replace(/(^|[^\\])f/g, "$1" + f);

            var T = H < 12 ? "AM" : "PM";
            format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
            format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

            var t = T.toLowerCase();
            format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
            format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

            var tz = -date.getTimezoneOffset();
            var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
            if (!utc) {
                tz = Math.abs(tz);
                var tzHrs = Math.floor(tz / 60);
                var tzMin = tz % 60;
                K += ii(tzHrs) + ":" + ii(tzMin);
            }
            format = format.replace(/(^|[^\\])K/g, "$1" + K);

            var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
            format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
            format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

            format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
            format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

            format = format.replace(/\\(.)/g, "$1");

            return format;
        };
    }];

    return {
        restrict: 'E',
        scope: {
            option: '=controlModel'
        },
        controller: controller,
        templateUrl: '/manageIT/contentObject/templates/datetime.html'
    };
});

manageitModule.directive('parentAttribute', function () {
    return {
        restrict: 'E',
        scope: { attributeList: '=mainModel', dataAttributes: '=addModel' },
        controller: function ($scope) {
            this.getAttributes = function () {
                return $scope.attributeList;
            }
            this.addAttribute = function (val) {
                $scope.dataAttributes.push(val);
            }
        }
    }
});

manageitModule.directive('searchResults', ['$compile', 'contentObjectService', '$routeParams', '$rootScope', '$filter', 'imageLibraryObjectService', 'documentLibraryObjectService', function ($compile, contentObjectService, $routeParams, $rootScope, $filter, imageLibraryObjectService, documentLibraryObjectService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {            
            angular.forEach($rootScope.searchresultsarray, function (value, key) {                
                $(".defaultBrowseTargets").append($compile('<span class="defaultBrowseTarget" id=' + value.contentObjectId + '>' + $rootScope.filedata + '</span>')(scope));
           }); 
        }
    }
}]);

manageitModule.directive('defaultAttribute', ['$compile', 'contentObjectService', '$routeParams', '$rootScope', '$filter', 'imageLibraryObjectService', 'documentLibraryObjectService', function ($compile, contentObjectService, $routeParams, $rootScope, $filter, imageLibraryObjectService, documentLibraryObjectService) {
    return {
        restrict: "A",
        scope: {

        },
        link: function (scope, element, attrs) {
            scope.currentResponse = "";            
            if (!$rootScope.searchResult) {
                if ($rootScope.selectedType == "ContentType") {
                    var getDirServiceCall = contentObjectService.getContentObject({ contentObjectId: $routeParams.ContentObjectId, controller: 'contentobject' });
                } else if ($rootScope.selectedType == "Image") {
                    var getDirServiceCall = imageLibraryObjectService.getImageLibraryObject({ imageObjectId: $routeParams.ContentObjectId, controller: 'imageLibraryObject' });
                } else if ($rootScope.selectedType == "Document") {
                    var getDirServiceCall = documentLibraryObjectService.getDocumentLibraryObject({ documentObjectId: $routeParams.ContentObjectId, controller: 'documentLibraryObject' });
                }
                getDirServiceCall.$promise.then(function (contentObjectdetails) {
                    if (contentObjectdetails != null) {
                        scope.contentObjectsDetails = contentObjectdetails.attributeCollection;
                        angular.forEach(scope.contentObjectsDetails, function (value, key) {
                            if (value.name == attrs.defaultAttribute) {
                                scope.currentResponse = value.value[0];
                                return false;
                            }
                        });
                    }
                });
            } else {
               
                var contentobjectid = $('.defaultTarget').attr('id');
                var contentobjectid = $('.defaultBrowseTarget').attr('id');
               
                var contentObjectdetails = $filter('filter')($rootScope.searchresultsarray, { contentObjectId: contentobjectid })[0];
               
                if (contentObjectdetails != null) {
                    
                    scope.contentObjectsDetails = contentObjectdetails.attributeCollection;
                    angular.forEach(scope.contentObjectsDetails, function (value, key) {
                        
                        if (value.name == attrs.defaultAttribute) {
                            scope.currentResponse = value.value[0];
                           
                            return false;
                        }
                    });
                }
            }
        },
        template: "{{currentResponse}}"
    };
}]);

manageitModule.directive('attribute', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
    var controller = ['$scope', function ($scope) {
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
                    if (option.defaultSelection != null) {
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
            if (typeof (isSubObject) === 'undefined') isSubObject = false;
            if (valueList.attributeType == "SequenceAttribute") {
                contentObjectService.getSequenceById({ id: valueList.sequenceGenerator }).$promise.then(function (sequencedetails) {
                    if (sequencedetails != null) {
                        valueList.sequenceMaster = sequencedetails;
    }
    else {
                        $scope.contentObjectRecords = null;
    }
    });
    }
            var defaultval = { id: "", value: defaultvalue };
            valueList.defaultValues.push(angular.copy(defaultval));
            if (valueList.multipleValues.allowMultipleValues == true)
                $scope.addMultipleValues(valueList.multipleValues.minimumValue, valueList.multipleValues.maximumValue, valueList);

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
            option.defaultValues = $scope.UpdateObjectforBusiness(subObjectDefaultAttributes);

    };
        var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9);
    };
        $scope.addMultipleValues = function (minValue, maxValue, option) {
            if (minValue == null)
                minValue = 0;
            if (maxValue == null)
                maxValue = option.maximumValue;
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
    }];
    return {
        restrict: 'A',
        require: '^parentAttribute',
        scope: {
            option: '@'//,
            // optionlist: '=mainModel'
        },
        link: function (scope, elem, attr, ctrl) {
            //read the passed value
            //alert(attr.attribute);


            if (attr.attribute != "" && attr.attribute != undefined) {

                //elem.bind('click', function () {
                // $timeout(function () {
                //scope.$apply(function () {
                //var filterList = jQuery.grep(scope.option, function (item) {
                //    return item.identifier == attr.attribute;
                //});
                //scope.option = filterList;
                //alert("hello");
                //  });
                // }, 100);

                //});

                // alert(scope.option);

                return $timeout(function () {

                    scope.optionlist = ctrl.getAttributes();
                    // scope.$watch(function () {
                    //     return scope.option;
                    // }, function (newVal) {

                    // if (!angular.isUndefined(scope.option)) {
                    var filterList = jQuery.grep(scope.optionlist, function (item) {
                        return item.identifier == attr.attribute;
                    });
                    if (filterList.length > 0) {
                        scope.option = angular.copy(filterList[0]);
                        ctrl.addAttribute(scope.option);
                        // scope.$apply();
                    }
                    //   }
                    //});

                });

            }
        },
        controller: controller,
        templateUrl: '/manageIT/contentObject/templates/attribute.html'
    };   
}]);
manageitModule.directive('cancel', function () {
    var controller = ['$scope', function ($scope) {

    }];

    return {
        restrict: 'A',
        scope: {
            // option: '=controlModel'
        },
        controller: controller,
        template: '<button class="btn btn-update pull-right">Cancel</button>'
    };
});
manageitModule.directive('checkin', function () {
    return {
        restrict: 'A',
        template: '<button class="btn btn-update pull-right marginRight5" ng-click="saveContentObject(listAttributes)">Check In</button>'
    };
});

//data-name
manageitModule.directive('displayName', function () {
    return {
        restrict: 'A',
        scope: {
            defaultname: '=labelName',
            ismandatory: '=mandatory'
        },
        template: '<label class="control-label text-left" for="">{{defaultname}}<span class="mandatory" ng-if="ismandatory==true">*</span></label>'
    };
});
//data-image
//data-icon
//data-checkout
//data-delete
manageitModule.directive('delete', function () {
    return {
        restrict: 'A',
        template: '<button class="btn btn-light-red btn-xs">Remove</button>'
    };
});

//data-attribute="attributeIdentifier"
//data-control="control"
//data-range="1,3-5,7-"
//data-conditional-attribute="attributeIdentifier"
//data-conditional-classification="Mensware" 
//data-container="containerID"
//data-target="action:containerID"

manageitModule.directive('conditionalClassification', function () {
    //var controller = ['$scope', function ($scope) {

    //}];
    return {
        restrict: 'A',
        require: '^contentFilter,^ngModel',
        scope: {
            optionClassification: '@'
        },
        link: function (scope, elem, attr, ctrl) {
            // elem.hide();
            //  alert(attr.conditionalClassification);
            if (attr.conditionalClassification == ctrl[0].getAttributeValue()) {

                elem.show();
            }
            else {
                elem.hide();
            }


        }
    };

});

manageitModule.directive('decimalOnly', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            scope.currentValue = '';
            var pre = parseInt(attr.precision)
            if (isNaN(pre) || typeof (pre) != "undefined")
                pre = 0;
            element.bind('keyup', function (e) {
                if (e.which != 8 && e.which != 0 && e.which != 46 && e.which != 190 && (e.which < 48 || e.which > 57)) {
                    element.val(scope.currentValue);
                }
                if (e.which != 8 && e.which != 0) {
                    var valToCheck = element.val();

                    var r = /^(\d*)\.{0,1}(\d*)$/
                    if (!r.test(valToCheck)) {
                        element.val(scope.currentValue);
                    } else {
                        var decival = element.val();
                        decival = parseFloat(decival).toFixed(pre)
                        scope.currentValue = decival;
                    }

                }
            });
        }
    };
}]);

manageitModule.directive('contentFilter', ['contentObjectService', '$routeParams', '$compile', function (contentObjectService, $routeParams, $compile) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            // alert("hi");

            this.getAttributeValue = function () {
                if (!ngModel || !element.val()) return;
                else
                    return element.val();
            }

            element.bind('blur', function (e) {
                if (!ngModel || !element.val()) return;
                var query = element.val();
                contentObjectService.getTemplate({
                    controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, name: query
                }).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        if (response.uploadedTemplateDetails != undefined && response.uploadedTemplateDetails != null) {
                            var htmlstr = $.grep(response.uploadedTemplateDetails, function (item, index) {
                                return (item.isActive == true);
                            });
                            if (htmlstr.length > 0) {
                                $("#loadpage").show();
                                $("#defaultattribute").hide();
                                // $scope.$apply();
                                setTimeout(function () {
                                    $("#loadpage").html($compile('<parent-attribute main-model="attributes" add-model="listAttributes">' + htmlstr[0].fileDetails + '</parent-attribute>')(scope));
                                    //angular.element('#loadpage').html($compile('<parent-attribute main-model="attributes" add-model="listAttributes">' + htmlstr[0].fileDetails + '</parent-attribute>')(scope));
                                }, 100);

                            }
                            else {
                                //scope.defaultAttributes();
                                scope.showDefault = true;
                                $("#loadpage").hide();
                                $("#defaultattribute").show();
                            }

                        }
                    }
                    else
                        scope.showDefault = true;
                }, function (error) {
                    if (error.data.errorMessage) {
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                scope.errors.push(value.message);
                            });
                        }
                        else {
                            scope.errors.push("Error occured while fetching template. Please try after sometime.");
                        }
                    }
                });
            });
        }

    };
}]);

manageitModule.directive('range', function () {
    //var controller = ['$scope', function ($scope) {

    //}];
    return {
        restrict: 'A',
        scope: {
            optionClassification: '@'
        },
        link: function (scope, elem, attr) {
            // elem.hide();
            //  alert(attr.conditionalClassification);
            if (attr.conditionalAttribute == scope.$parent.query) {

                elem.show();
            }
            else {
                elem.hide();
            }


        }
    };
});
manageitModule.directive('image', function () {
    //var controller = ['$scope', function ($scope) {

    //}];
    return {
        restrict: 'A',
        scope: {
            optionClassification: '@'
        },
        link: function (scope, elem, attr) {
            // elem.hide();
            //  alert(attr.conditionalClassification);
            if (attr.conditionalAttribute == scope.$parent.query) {

                elem.show();
            }
            else {
                elem.hide();
            }


        }
    };
});
manageitModule.directive('icon', function () {
    //var controller = ['$scope', function ($scope) {

    //}];
    return {
        restrict: 'A',
        scope: {
            //optionClassification: '@'
        },
        template: ''
    };
});
/*Directives for content object START */
manageitModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',

function ($filter, $document, $compile, $parse) {

    return {
        restrict: 'AE',
        scope: {
            selectedModel: '=',
            options: '=',
            extraSettings: '=',
            events: '=',
            searchFilter: '=?',
            translationTexts: '=',
            groupBy: '@'
        },
        template: function (element, attrs) {
            var checkboxes = attrs.checkboxes ? true : false;
            var radiobuttons = attrs.radiobuttons ? true : false;
            var groups = attrs.groupBy ? true : false;
            var isreadonly = attrs.readonly;

            var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
            template += '<button type="button" ng-disabled="settings.readOnly" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="settings.readOnly || toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
            template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
            //template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
            // template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
            template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
            template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
            template += '<li ng-show="settings.enableSearch" class="divider"></li>';

            if (groups) {
                template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                template += '<li ng-repeat-end role="presentation">';
            } else {
                template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
            }

            template += '<a role="menuitem" tabindex="-1" ng-class="{ disabled: settings.readOnly}" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

            if (checkboxes) {
                template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
            }
            else if (radiobuttons) {
                template += '<div><label class="btn btndefault"><input class="checkboxInput"  type="radio" name="group" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
            }
            else {
                template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
            }

            template += '</li>';

            // template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
            // template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

            template += '</ul>';
            template += '</div>';

            element.html(template);
        },
        link: function ($scope, $element, $attrs) {
            var $dropdownTrigger = $element.children()[0];

            $scope.toggleDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.checkboxClick = function ($event, id) {
                $scope.setSelectedItem(id);
                $event.stopImmediatePropagation();
            };

            $scope.radiobuttonClick = function ($event, id) {
                $scope.setSelectedItem(id);
                $event.stopImmediatePropagation();
            };
            $scope.externalEvents = {
                onItemSelect: angular.noop,
                onItemDeselect: angular.noop,
                onSelectAll: angular.noop,
                onDeselectAll: angular.noop,
                onInitDone: angular.noop,
                onMaxSelectionReached: angular.noop
            };

            $scope.settings = {
                dynamicTitle: true,
                scrollable: false,
                scrollableHeight: '300px',
                closeOnBlur: true,
                displayProp: 'label',
                idProp: 'id',
                externalIdProp: 'id',
                enableSearch: false,
                selectionLimit: 0,
                showCheckAll: true,
                showUncheckAll: true,
                closeOnSelect: false,
                buttonClasses: 'btn btn-default',
                closeOnDeselect: false,
                groupBy: $attrs.groupBy || undefined,
                groupByTextProvider: null,
                smartButtonMaxItems: 0,
                smartButtonTextConverter: angular.noop,
                isCheckboxes: true,
                isRadiobtn: false
            };

            $scope.texts = {
                checkAll: 'Check All',
                uncheckAll: 'Uncheck All',
                selectionCount: 'checked',
                selectionOf: '/',
                searchPlaceholder: 'Search...',
                buttonDefaultText: 'Select',
                dynamicButtonTextSuffix: 'selected'
            };

            $scope.searchFilter = $scope.searchFilter || '';

            if (angular.isDefined($scope.settings.groupBy)) {
                $scope.$watch('options', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                    }
                });
            }

            angular.extend($scope.settings, $scope.extraSettings || []);
            angular.extend($scope.externalEvents, $scope.events || []);
            angular.extend($scope.texts, $scope.translationTexts);

            $scope.singleSelection = $scope.settings.selectionLimit === 1;

            function getFindObj(id) {
                var findObj = {};

                if ($scope.settings.externalIdProp === '') {
                    findObj[$scope.settings.idProp] = id;
                } else {
                    findObj[$scope.settings.externalIdProp] = id;
                }

                return findObj;
            }

            function clearObject(object) {
                for (var prop in object) {
                    delete object[prop];
                }
            }

            if ($scope.singleSelection) {
                if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                    clearObject($scope.selectedModel);
                }
            }

            if ($scope.settings.closeOnBlur) {
                $document.on('click', function (e) {
                    var target = e.target.parentElement;
                    var parentFound = false;

                    while (angular.isDefined(target) && target !== null && !parentFound) {
                        if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                            if (target === $dropdownTrigger) {
                                parentFound = true;
                            }
                        }
                        target = target.parentElement;
                    }

                    if (!parentFound) {
                        $scope.$apply(function () {
                            $scope.open = false;
                        });
                    }
                });
            }

            $scope.getGroupTitle = function (groupValue) {
                if ($scope.settings.groupByTextProvider !== null) {
                    return $scope.settings.groupByTextProvider(groupValue);
                }

                return groupValue;
            };

            $scope.getButtonText = function () {
                if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                    if ($scope.settings.smartButtonMaxItems > 0) {
                        var itemsText = [];

                        angular.forEach($scope.options, function (optionItem) {
                            if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                itemsText.push(converterResponse ? converterResponse : displayText);
                            }
                        });

                        if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                            itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                            itemsText.push('...');
                        }

                        return itemsText.join(', ');
                    } else {
                        var totalSelected;

                        if ($scope.singleSelection) {
                            totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                        } else {
                            totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                        }

                        if (totalSelected === 0) {
                            return $scope.texts.buttonDefaultText;
                        } else {
                            return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                        }
                    }
                } else {
                    return $scope.texts.buttonDefaultText;
                }
            };

            $scope.getPropertyForObject = function (object, property) {
                if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                    return object[property];
                }

                return '';
            };

            $scope.selectAll = function () {
                $scope.deselectAll(false);
                $scope.externalEvents.onSelectAll();

                angular.forEach($scope.options, function (value) {
                    $scope.setSelectedItem(value[$scope.settings.idProp], true);
                });
            };

            $scope.deselectAll = function (sendEvent) {
                sendEvent = sendEvent || true;

                if (sendEvent) {
                    $scope.externalEvents.onDeselectAll();
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                } else {
                    $scope.selectedModel.splice(0, $scope.selectedModel.length);
                }
            };

            $scope.setSelectedItem = function (id, dontRemove) {
                var findObj = getFindObj(id);
                var finalObj = null;

                if ($scope.settings.externalIdProp === '') {
                    finalObj = _.find($scope.options, findObj);
                } else {
                    finalObj = findObj;
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                    angular.extend($scope.selectedModel, finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                    if ($scope.settings.closeOnSelect) $scope.open = false;

                    return;
                }

                dontRemove = dontRemove || false;

                var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                if (!dontRemove && exists) {
                    $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                    $scope.externalEvents.onItemDeselect(findObj);
                } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                    $scope.selectedModel.push(finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                }
                if ($scope.settings.closeOnSelect) $scope.open = false;
            };

            $scope.isChecked = function (id) {
                if ($scope.singleSelection) {
                    if ($scope.selectedModel !== null) {
                        var modelItem = null;
                        if ($scope.selectedModel[0] == null)
                            modelItem = $scope.selectedModel;
                        else
                            modelItem = $scope.selectedModel[0];
                        if (modelItem != undefined && modelItem != null) {
                            return angular.isDefined(modelItem[$scope.settings.idProp]) && modelItem[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                        }
                    }
                    return false;
                }

                return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
            };

            $scope.externalEvents.onInitDone();
        }
    };
}]);
manageitModule.directive('mediaPreview', function ($log, $document) {

    var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: _link
    }

    return directive;

    function _link(scope, elem, attrs, ngModel) {

        // check if valid input element
        if (elem[0].nodeName.toLowerCase() !== 'input') {
            $log.warn('mediaPreview:', 'The directive will work only for input element, actual element is a', elem[0].nodeName.toLowerCase());
            return;
        }

        // check if valid input type file
        if (attrs.type != 'file') {
            $log.warn('mediaPreview:', 'Expected input type file, received instead:', attrs.type, 'on element:', elem);
            return;
        }

        // set all media type if nothing is specified
        if (!elem.attr('accept')) {
            //elem.attr('accept', 'image/*,video/*,audio/*');
            elem.attr('accept', 'image/*');
        }

        // the preview container
        var container;

        var fallbackImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA00lEQVR4Ae2XwQqDQAxEveinFD9e2MUfq6Cep7GnrPAg1JVCu5OTvEwe9FLtWlpqR6OyVn2aXbNGdX6KB4OLrmbRyIKsGsksWKsINhbUShM0wVcEk43CnAVY722mMEfBhPWD9mGOAlvBepSDwK1gPc5LASp8fbCJ81KACl9PNkOYo8CfKOtHUpijwJ841y1xToJy5VxXnLPgvUL1OAeBW4F6kKPAnYB6jKPAnYA68PZ/8EOCJtjvfvmdqwjSvR8gTz1YcCiytgs/TvLnvaDi/J2gCV63ZgZdEb12DwAAAABJRU5ErkJggg==";

        // get custom class or set default
        var previewClass = attrs.previewClass || 'media-preview';

        // get custom class or set default
        var containerClass = attrs.containerClass || 'media-container';

        // as default if nothing is specified or
        // the element specified is not a valid html
        // element: create the default media container
        // and append before input element
        if (!attrs.previewcontainer || (!document.getElementById(attrs.previewcontainer) && !angular.isElement(attrs.previewcontainer))) {

            // create container
            container = angular.element(document.createElement('div'));

            // append before elem
            elem.parent()[0].insertBefore(container[0], elem[0]);

        } else {

            // get the container
            container = angular.isElement(attrs.previewcontainer) ? attrs.previewcontainer : angular.element(document.getElementById(attrs.previewcontainer));
        }

        // add default class
        //if (!$(container).hasClass(''+containerClass+''))
        container.addClass(containerClass);

        // add element to the container
        function addToContainer(element) {
            element.addClass(previewClass);
            return container.append(element);
        }

        // the change function
        function onChange(e) {




            // get files
            var files = elem[0].files;
            var result;
            if (files && files.length) {




                //alert(attrs.doctype);
                angular.forEach(files, function (data, index) {
                    if (attrs.doctype == 'DocumentReferenceAttribute') {
                        var docIconTypeName = "../../../images/icon-word.png";
                        var validExts = new Array(".doc", ".docx", ".pdf");
                        var fileExt = data.name;
                        var fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
                        fileExt = fileExt.toLowerCase();
                        if (validExts.indexOf(fileExt) < 0) {
                            alert("Invalid fileType selected,  valid files are of " +
                               validExts.toString() + " types.");
                            return false;
                        }
                        else {
                            if (fileExt == ".doc" || fileExt == ".docx")
                                docIconTypeName = "../../../images/icon-word.png";
                            else if (fileExt == ".pdf")
                                docIconTypeName = "../../../images/icon-pdf.png";
                            scope.addMediaAttr(ngModel.$modelValue, attrs.doctype);

                        }
                    }
                    else if (attrs.doctype == 'ImageReferenceAttribute') {
                        var validExts = new Array(".png", ".jpg", ".jpeg", ".gif");
                        var fileExt = data.name;
                        var fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
                        fileExt = fileExt.toLowerCase();
                        if (validExts.indexOf(fileExt) < 0) {
                            alert("Invalid fileType selected,  valid files are of " +
                               validExts.toString() + " types.");
                            return false;
                        }
                        else {
                            scope.addMediaAttr(ngModel.$modelValue, attrs.doctype);
                        }
                    }

                    // init variables
                    var $reader = new FileReader(), $mediaElement;
                    // read file
                    $reader.readAsDataURL(data);

                    // set resulting image
                    $reader.onload = function (e) {
                        if (e.target.result != undefined) {
                            result = e.target.result;
                            // update model value
                            if (attrs.doctype == 'DocumentReferenceAttribute') {
                                if (ngModel.$modelValue.addedDocuments.length > 0) {
                                    ngModel.$modelValue.addedDocuments[ngModel.$modelValue.addedDocuments.length - 1].fileContent = result;
                                    ngModel.$modelValue.addedDocuments[ngModel.$modelValue.addedDocuments.length - 1].fileName = data.name;
                                    ngModel.$modelValue.addedDocuments[ngModel.$modelValue.addedDocuments.length - 1].docIcon = docIconTypeName;

                                }
                            }
                            else if (attrs.doctype == 'ImageReferenceAttribute') {
                                if (ngModel.$modelValue.addedImages.length > 0) {
                                    ngModel.$modelValue.addedImages[ngModel.$modelValue.addedImages.length - 1].fileContent = result;
                                }
                            }
                        }
                    }




                });

            }


            // attrs.multiple ? ngModel.$setViewValue(files) : ngModel.$setViewValue(files[0]);

            // reset container
            container.empty();




        }

        // bind change event
        elem.on('change', onChange)

        // unbind event listener to prevent memory leaks
        scope.$on('$destroy', function () {
            elem.off('change', onChange);
        })

    }

});
manageitModule.directive('multipleAutocomplete', [
        '$filter',
        '$http',
        function ($filter, $http) {
            return {
                restrict: 'EA',
                scope: {
                    suggestionsArr: '=',
                    modelArr: '=ngModel',
                    apiUrl: '@'
                },
                templateUrl: '/manageIT/contentObject/templates/multiple-autocomplete-tpl.html',
                link: function (scope, element, attr) {
                    scope.objectProperty = attr.objectProperty;
                    scope.selectedItemIndex = 0;
                    scope.name = attr.name;
                    scope.isRequired = attr.required;
                    scope.errMsgRequired = attr.errMsgRequired;
                    scope.isHover = false;
                    scope.isFocused = false;
                    var getSuggestionsList = function () {
                        var url = scope.apiUrl;
                        $http({
                            method: 'GET',
                            url: url
                        }).then(function (response) {
                            scope.suggestionsArr = response.data;
                        }, function (response) {
                            console.log("*****Angular-multiple-select **** ----- Unable to fetch list");
                        });
                    };

                    if (scope.suggestionsArr == null || scope.suggestionsArr == "") {
                        if (scope.apiUrl != null && scope.apiUrl != "")
                            getSuggestionsList();
                        else {
                            console.log("*****Angular-multiple-select **** ----- Please provide suggestion array list or url");
                        }
                    }

                    if (scope.modelArr == null || scope.modelArr == "") {
                        scope.modelArr = [];
                    }
                    scope.onFocus = function () {
                        scope.isFocused = true
                    };

                    scope.onMouseEnter = function () {
                        scope.isHover = true
                    };

                    scope.onMouseLeave = function () {
                        scope.isHover = false;
                    };

                    scope.onBlur = function () {
                        scope.isFocused = false;
                    };

                    scope.onChange = function () {
                        scope.selectedItemIndex = 0;
                    };

                    scope.keyParser = function ($event) {
                        var keys = {
                            38: 'up',
                            40: 'down',
                            8: 'backspace',
                            13: 'enter',
                            9: 'tab',
                            27: 'esc'
                        };
                        var key = keys[$event.keyCode];
                        if (key == 'backspace' && scope.inputValue == "") {
                            if (scope.modelArr.length != 0)
                                scope.modelArr.pop();
                        }
                        else if (key == 'down') {
                            var filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            filteredSuggestionArr = $filter('filter')(filteredSuggestionArr, scope.alreadyAddedValues);
                            if (scope.selectedItemIndex < filteredSuggestionArr.length - 1)
                                scope.selectedItemIndex++;
                        }
                        else if (key == 'up' && scope.selectedItemIndex > 0) {
                            scope.selectedItemIndex--;
                        }
                        else if (key == 'esc') {
                            scope.isHover = false;
                            scope.isFocused = false;
                        }
                        else if (key == 'enter') {
                            var filteredSuggestionArr = $filter('filter')(scope.suggestionsArr, scope.inputValue);
                            filteredSuggestionArr = $filter('filter')(filteredSuggestionArr, scope.alreadyAddedValues);
                            if (scope.selectedItemIndex < filteredSuggestionArr.length)
                                scope.onSuggestedItemsClick(filteredSuggestionArr[scope.selectedItemIndex]);
                        }
                    };

                    scope.onSuggestedItemsClick = function (selectedValue) {
                        scope.modelArr.push(selectedValue);
                        scope.inputValue = "";
                    };

                    var isDuplicate = function (arr, item) {
                        var duplicate = false;
                        if (arr == null || arr == "")
                            return duplicate;

                        for (var i = 0; i < arr.length; i++) {
                            duplicate = angular.equals(arr[i], item);
                            if (duplicate)
                                break;
                        }
                        return duplicate;
                    };

                    scope.alreadyAddedValues = function (item) {
                        var isAdded = true;
                        isAdded = !isDuplicate(scope.modelArr, item);
                        //if(scope.modelArr != null && scope.modelArr != ""){
                        //    isAdded = scope.modelArr.indexOf(item) == -1;
                        //    console.log("****************************");
                        //    console.log(item);
                        //    console.log(scope.modelArr);
                        //    console.log(isAdded);
                        //}
                        return isAdded;
                    };

                    scope.removeAddedValues = function (item) {
                        if (scope.modelArr != null && scope.modelArr != "") {
                            var itemIndex = scope.modelArr.indexOf(item);
                            if (itemIndex != -1)
                                scope.modelArr.splice(itemIndex, 1);
                        }
                    };

                    scope.mouseEnterOnItem = function (index) {
                        scope.selectedItemIndex = index;
                    };
                }
            };
        }
]);



manageitModule.directive('defaultImage', function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<img src="{{name}}.png" />'
        //   compile: function (element, attributes) {
        //  attributes.$set("src", "lll.png");
        // linkFunction = function ($scope, element, attributes) {
        //  console.log("mama" + $scope.name);
        //   element.html("Student: <b>" + $scope.name + "</b> , Roll No: <b>" + $scope.name + "</b><br/>");
        //   element.css("background-color", "#ff00ff");
        //}
        // }
    }
});

manageitModule.directive('defaultIcon', function () {
    return {
        restrict: 'A',
        scope: true,
        template: '<img src="{{name}}.png" />'
    }
});

manageitModule.directive('defaultTarget', ['$compile', 'viewuserinterfaceService', '$routeParams', '$rootScope', function ($compile, viewuserinterfaceService, $routeParams, $rootScope) {
   // alert("jjj");
    return {
        restrict: 'A',
        template: '<anc id="customSelector" ng-click="viewProducts(defaultTarget,defaultAction)">{{defaultAction}}</anc>',
        scope: {
            defaultTarget: '@',
            defaultAction: '@'
        },
        link: function ($scope, $ele, $attr) {
            if ($attr.showView == "true") {
                setTimeout(function () {
                    $("#customSelector").trigger('click');
                }, 10);
            }
            if ($rootScope.serviceFlag == "view") {
                $scope.productsResponse = "";
                $scope.viewProducts = function (defaultTarget, defaultAction) {
                    if (defaultAction == "view") {
                        $("." + defaultTarget).empty();
                        var uiName = "";
                        //var uiName = "my view not";
                        if (uiName != "") {
                            viewuserinterfaceService.getInterface({ controller: 'UserInterface', domainId: $rootScope.domainIdUi, contentTypeId: $routeParams.contentTypeId, name: uiName }).$promise.then(function (response) {
                                if (response.$resolved == true) {
                                    if (response[0].uploadedTemplateDetails != undefined && response[0].uploadedTemplateDetails != null) {
                                        var htmldata = $.grep(response[0].uploadedTemplateDetails, function (item, index) {
                                        return (item.isActive == true);
                                    });
                                    if (htmldata.length > 0) {
                                        $scope.productsResponse = response[0].uploadedTemplateDetails[0]['fileDetails'];
                                        //$("." + defaultTarget).append($scope.productsResponse);
                                        $("." + defaultTarget).html($compile(response[0].uploadedTemplateDetails[0]['fileDetails'])($scope));
                                        $("#viewUserInterfaceId").addClass('hide');
                                    }
                                    else {
                                        if ($("#viewUserInterfaceId").hasClass('hide')) {
                                            $("#viewUserInterfaceId").removeClass('hide').addClass('show');
                                        }
                                    }

                                }
                            }
                            else {
                                if ($("#viewUserInterfaceId").hasClass('hide')) {
                                    $("#viewUserInterfaceId").removeClass('hide').addClass('show');
                                }
                            }
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
                    }

                    } else {
                        alert("No more interface for edit and it will use default");
                        $("." + defaultTarget).empty();
                    }

                }
            } else {
                alert("please set scope value for serviceFlag");
            }

        }
    }
}]);

manageitModule.directive('container', function () {
    return {
        restrict: 'A',
        link: function (scope, ele, attr) {
            ele.addClass(attr.container);
        }
    }
});

manageitModule.factory('myData', function () {
    return {
    "name": "myNameIsAbi",
        "imgjson": [{
            "_id": "577ccbe5d4b78936640616a8",
            "Role": "Hero",
            "imgname": "http://thenextweb.com/wp-content/blogs.dir/1/files/2010/08/equity_capital_for_small_business.jpg.jpeg",
            "Classification": "Active",
            "ContentType": "ProductImages"
        }, {
            "_id": "577ccc5dd4b789366406174c",
            "Role": "Heroine",
            "imgname": "http://img.splicd.com/nimg/b0/98/f15dc524036c434f434cb3732fc7-200x200-1/small_size_single_rose_sleeves_triangle_bag_single_rose_tubes_for_fresh_flowers_packaging.jpg",
            "Classification": "Inactive",
            "ContentType": "RebelImages"
        }, {
            "_id": "577ccc9ad4b789366406176c",
            "Role": "Hero",
            "imgname": "http://img.splicd.com/nimg/b0/98/f15dc524036c434f434cb3732fc7-200x200-1/small_size_single_rose_sleeves_triangle_bag_single_rose_tubes_for_fresh_flowers_packaging.jpg",
            "Classification": "Active",
            "ContentType": "NikeImages"
        }, {
            "_id": "577cd1ccd4b78936600618b3",
            "Role": "Hero",
            "imgname": "http://freevector.co/wp-content/uploads/2010/04/33759-circle-outline-of-small-size-200x200.png",
            "Classification": "Active",
            "ContentType": "ProductImages"
        }, {
            "_id": "57849486d4b78999c46ff48b",
            "Role": "Heroine",
            "imgname": "http://ep.yimg.com/ay/islamicbookstore-com/tajweed-ul-quran-zipper-case-small-palm-size-2-5-x-3-75-7-x-10cm-mushaf-al-tajweed-uthmani-arabic-script-arabic-only-17.gif",
            "Classification": "Inctive",
            "ContentType": "ProductImages"
        }, {
            "_id": "57849486d4b7882bc46ff48b",
            "Role": "Hero",
            "imgname": "http://www.dhresource.com/200x200s/f2-albu-g3-M00-FC-B5-rBVaHVbYDwyACnbaAAJMIKsk8UY080.jpg/100pcs-small-size-13-4-5-3-5cm-funny-japanese.jpg",
            "Classification": "Active",
            "ContentType": "NikeImages"
        }, {
            "_id": "57849486d777892bc46ff48b",
            "Role": "Hero",
            "imgname": "http://siciliankingfood.com/web/image/cache/Cialde%20Cannoli/ec_cialda-200x200.jpg",
            "Classification": "Active",
            "ContentType": "NikeImages"
        }, {
            "_id": "57849486d4b7908bc46ff48b",
            "Role": "Hero",
            "imgname": "http://www.harryfay.co.uk/img/cms/determine-ring-size-using-paper-6.png",
            "Classification": "Active",
            "ContentType": "RebelImages"
        }, {
            "_id": "57849486d4b7892b886ff48b",
            "Role": "Heroine",
            "imgname": "http://siciliankingfood.com/web/image/cache/Cialde%20Cannoli/ec_cialda-200x200.jpg",
            "Classification": "Active",
            "ContentType": "RebelImages"
        }, {
            "_id": "57849486d4b7892bc467748b",
            "Role": "Heroine",
            "imgname": "http://freevector.co/wp-content/uploads/2010/04/33759-circle-outline-of-small-size-200x200.png",
            "Classification": "Active",
            "ContentType": "RebelImages"
        }, {
            "_id": "57849486d4b7892bc46f648b",
            "Role": "Hero",
            "imgname": "http://www.dhresource.com/200x200s/f2-albu-g3-M00-FC-B5-rBVaHVbYDwyACnbaAAJMIKsk8UY080.jpg/100pcs-small-size-13-4-5-3-5cm-funny-japanese.jpg",
            "Classification": "Inactive",
            "ContentType": "RebelImages"
        }],
        }
});
manageitModule.directive('filter', ['$compile', 'myData', function ($compile, myData) {
    return {
        restrict: 'A',
        template: '<img ng-repeat="img in filterimgjson track by $index" src="{{img.imgname}}" />',
        scope: {

        },
        link: function ($scope, $element, $attrs) {
            $scope.name = myData.name;
            $scope.imgjson = myData.imgjson;
            $scope.filterimgjson = [];
            $scope.filimg = [];

            if ($attrs.filter == "all" || $attrs.filter == "all.all:all[all]") {
                $scope.filterimgjson = $scope.imgjson;
            } else {
                var filters = $attrs.filter.split(",");
                for (var j = 0; j < filters.length; j++) {
                    $scope.filterimgrange = [];
                    $scope.filterimgclass = [];
                    $scope.filterimgrole = [];
                    $scope.filimg[j] = [];
                    var imgcontent = "";
                    var imgclass = "";
                    var imgrole = "";
                    var imgranges = "";

                    if (filters[j].indexOf('.') > -1 && filters[j].indexOf(':') > -1 && filters[j].indexOf('[') > -1) {
                        var switchval = 1;
                    } else if (filters[j].indexOf('.') > -1 && filters[j].indexOf(':') > -1 && !(filters[j].indexOf('[') > -1)) {
                        var switchval = 2;
                    } else if (filters[j].indexOf('.') > -1 && !(filters[j].indexOf(':') > -1) && filters[j].indexOf('[') > -1) {
                        var switchval = 3;
                    } else if (!(filters[j].indexOf('.') > -1) && filters[j].indexOf(':') > -1 && filters[j].indexOf('[') > -1) {
                        var switchval = 4;
                    } else if (filters[j].indexOf('.') > -1 && !(filters[j].indexOf(':') > -1) && !(filters[j].indexOf('[') > -1)) {
                        var switchval = 5;
                    } else if (!(filters[j].indexOf('.') > -1) && !(filters[j].indexOf(':') > -1) && filters[j].indexOf('[') > -1) {
                        var switchval = 6;
                    } else if (!(filters[j].indexOf('.') > -1) && filters[j].indexOf(':') > -1 && !(filters[j].indexOf('[') > -1)) {
                        var switchval = 7;
                    } else if (!(filters[j].indexOf('.') > -1) && !(filters[j].indexOf(':') > -1) && !(filters[j].indexOf('[') > -1)) {
                        var switchval = 8;
                    }

                    switch (switchval) {
                        case 1:
                            imgcontent = filters[j].split(".")[0];
                            imgclass = filters[j].split(".")[1].split(":")[0];
                            imgrole = filters[j].split(".")[1].split(":")[1].split('[')[0];
                            imgranges = filters[j].split(".")[1].split(":")[1].split('[')[1].split(']')[0];
                            break;
                        case 2:
                            imgcontent = filters[j].split(".")[0];
                            imgclass = filters[j].split(".")[1].split(":")[0];
                            imgrole = filters[j].split(".")[1].split(":")[1];
                            break;
                        case 3:
                            imgcontent = filters[j].split(".")[0];
                            imgclass = filters[j].split(".")[1].split('[')[0];
                            imgranges = filters[j].split(".")[1].split('[')[1].split(']')[0];
                            break;
                        case 4:
                            imgcontent = filters[j].split(":")[0];
                            imgrole = filters[j].split(":")[1].split('[')[0];
                            imgranges = filters[j].split(":")[1].split('[')[1].split(']')[0];
                            break;
                        case 5:
                            imgcontent = filters[j].split(".")[0];
                            imgclass = filters[j].split(".")[1];
                            break;
                        case 6:
                            imgcontent = filters[j].split("[")[0];
                            imgranges = filters[j].split("[")[1].split("]")[0];
                            break;
                        case 7:
                            imgcontent = filters[j].split(":")[0];
                            imgrole = filters[j].split(":")[1];
                            break;
                        case 8:
                            imgcontent = filters[j];
                            break;
                    }
                    //Content Type Filter
                    angular.forEach($scope.imgjson, function (value, key) {
                        if (imgcontent && imgcontent != 'all') {
                            if (value.ContentType == imgcontent) {
                                $scope.filimg[j].push(value);
                            }
                        } else {
                            $scope.filimg[j] = $scope.imgjson;
                        }

                    });
                    //Classification Filter
                    if (imgclass != "all") {
                        if (imgclass && imgclass.indexOf('!') > -1) {
                            var negimgclass = imgclass.substr(1);
                            if (!isArrayEmpty($scope.filimg[j])) {
                                angular.forEach($scope.filimg[j], function (v, k) {
                                    if (v.Classification != negimgclass) {
                                        $scope.filterimgclass.push(v);
                                    }
                                });
                            } else {
                                angular.forEach($scope.imgjson, function (v, k) {
                                    if (v.Classification != negimgclass) {
                                        $scope.filterimgclass.push(v);
                                    }
                                });
                            }
                            $scope.filimg[j] = $scope.filterimgclass;
                        } else if (imgclass) {
                            if (!isArrayEmpty($scope.filimg[j])) {
                                angular.forEach($scope.filimg[j], function (v, k) {
                                    if (v.Classification == imgclass) {
                                        $scope.filterimgclass.push(v);
                                    }
                                });
                            } else {
                                angular.forEach($scope.imgjson, function (v, k) {
                                    if (v.Classification == imgclass) {
                                        $scope.filterimgclass.push(v);
                                    }
                                });
                            }
                            $scope.filimg[j] = $scope.filterimgclass;
                        }
                    }
                    //Role Filter
                    if (imgrole != "all") {
                        if (imgrole && imgrole.indexOf('!') > -1) {
                            var negimg = imgrole.substr(1);
                            if (!isArrayEmpty($scope.filimg[j])) {
                                angular.forEach($scope.filimg[j], function (val, ke) {
                                    if (val.Role != negimg) {
                                        $scope.filterimgrole.push(val);
                                    }
                                });
                            } else {
                                angular.forEach($scope.imgjson, function (val, ke) {
                                    if (val.Role != negimg) {
                                        $scope.filterimgrole.push(val);
                                    }
                                });
                            }
                            $scope.filimg[j] = $scope.filterimgrole;
                        } else if (imgrole) {
                            if (!isArrayEmpty($scope.filimg[j])) {
                                angular.forEach($scope.filimg[j], function (val, ke) {
                                    if (val.Role == imgrole) {
                                        $scope.filterimgrole.push(val);
                                    }
                                });
                            } else {
                                angular.forEach($scope.imgjson, function (val, ke) {
                                    if (val.Role == imgrole) {
                                        $scope.filterimgrole.push(val);
                                    }
                                });
                            }
                            $scope.filimg[j] = $scope.filterimgrole;
                        }
                    }
                    //Range Filter
                    if (imgranges && imgrange != "all") {
                        var iranges = imgranges.split("/");
                        for (var ran = 0; ran <= iranges.length - 1; ran++) {
                            var imgrange = iranges[ran];
                            if (imgrange) {
                                if (!isNaN(imgrange)) {
                                    if (!isArrayEmpty($scope.filimg[j])) {
                                        $scope.filterimgrange.push($scope.filimg[j][imgrange - 1]);
                                    } else {
                                        $scope.filterimgrange.push($scope.imgjson[imgrange - 1]);
                                    }
                                } else {
                                    var rangeval = imgrange.split("_");
                                    if (rangeval[0] && rangeval[1]) {
                                        if (!isArrayEmpty($scope.filimg[j])) {
                                            for (var i = rangeval[0] - 1; i <= rangeval[1] - 1; i++) {
                                                $scope.filterimgrange.push($scope.filimg[j][i]);
                                            }
                                        } else {
                                            for (var i = rangeval[0] - 1; i <= rangeval[1] - 1; i++) {
                                                $scope.filterimgrange.push($scope.imgjson[i]);
                                            }
                                        }
                                    } else if (rangeval[0] && !rangeval[1]) {

                                        if (!isArrayEmpty($scope.filimg[j])) {
                                            for (var i = rangeval[0] - 1; i <= $scope.filimg[j].length - 1; i++) {
                                                $scope.filterimgrange.push($scope.filimg[j][i]);
                                            }
                                        } else {
                                            for (var i = rangeval[0] - 1; i <= $scope.imgjson.length - 1; i++) {
                                                $scope.filterimgrange.push($scope.imgjson[i]);
                                            }
                                        }
                                    } else if (!rangeval[0] && rangeval[1]) {
                                        if (!isArrayEmpty($scope.filimg[j])) {
                                            for (var i = 0; i <= rangeval[1] - 1; i++) {
                                                $scope.filterimgrange.push($scope.filimg[j][i]);
                                            }
                                        } else {
                                            for (var i = 0; i <= rangeval[1] - 1; i++) {
                                                $scope.filterimgrange.push($scope.imgjson[i]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        $scope.filimg[j] = $scope.filterimgrange;
                    }
                    // Check array exist for filtering
                    function isArrayEmpty(array) {
                        return array.filter(function (el) {
                            return !jQuery.isEmptyObject(el);
                        }).length === 0;
                    }
                }
                var emptyarr = [];
                if ($scope.filimg.length > 1) {
                    emptyarr = $scope.filimg[0].concat($scope.filimg[1]);
                } else {
                    emptyarr = $scope.filimg[0];
                }
                $scope.filterimgjson = emptyarr;
            }
        }

    };

}]);





manageitModule.directive("viewparent", ['$compile', 'contentObjectService', '$routeParams', 'imageLibraryObjectService', 'documentLibraryObjectService', '$rootScope', function ($compile, contentObjectService, $routeParams, imageLibraryObjectService, documentLibraryObjectService, $rootScope) {
    return {
        restrict: "E",
        controller: function ($scope, $element, $attrs) {
            var objectDetails = [];

            $scope.content = '';
            $scope.image = '';
            $scope.icon = '';
            this.defaultNameFun = function () {
                if ($rootScope.selectedType == "ContentType") {
                    var getViewServiceCall = contentObjectService.getContentObject({ contentObjectId: $routeParams.ContentObjectId, controller: 'contentobject' });
                } else if ($rootScope.selectedType == "Image") {
                    var getViewServiceCall = imageLibraryObjectService.getImageLibraryObject({ imageObjectId: $routeParams.ContentObjectId, controller: 'imageLibraryObject' });
                } else if ($rootScope.selectedType == "Document") {
                    var getViewServiceCall = documentLibraryObjectService.getDocumentLibraryObject({ documentObjectId: $routeParams.ContentObjectId, controller: 'documentLibraryObject' });
                }

                getViewServiceCall.$promise.then(function (contentObjectdetails) {
                    objectDetails = contentObjectdetails;
                    if (objectDetails.presentation != null && objectDetails.presentation.namingExpression != null) {
                        $scope.content = objectDetails.presentation.namingExpression;
                        $scope.image = objectDetails.presentation.defaultIamge;
                        $scope.icon = objectDetails.presentation.defaultIcon;
                    } else {
                        $scope.content = "No Default Name";
                        $scope.image = "";
                        $scope.icon = "";
                    }
                    $scope.$broadcast("DEF_NAME", $scope.content);
                    $scope.$broadcast("DEF_IMAGE", $scope.image);
                    $scope.$broadcast("DEF_ICON", $scope.icon);
                });

            };

        }
    };
}]);

manageitModule.directive("defaultName", function () {
    return {
        restrict: 'A',
        require: "^viewparent",
        scope: {},
        link: function (scope, element, attrs, viewparentCtrl) {
            scope.contentValue = viewparentCtrl.defaultNameFun();
            scope.$on("DEF_NAME", function (event, data) {
            scope.defName = data;
            });
        },
        template: "{{defName}}"
    };
});

manageitModule.directive("defaultImage", function () {
    return {
        restrict: 'A',
        require: "^viewparent",
        scope: {},
        link: function (scope, element, attrs, viewparentCtrl) {
            scope.contentValue = viewparentCtrl.defaultNameFun();
            scope.$on("DEF_IMAGE", function (event, data) {
                scope.defImage = data;
            });
        },
        template: "{{defImage}}"
    };
});

manageitModule.directive("defaultIcon", function () {
    return {
        restrict: 'A',
        require: "^viewparent",
        scope: {},
        link: function (scope, element, attrs, viewparentCtrl) {
            scope.contentValue = viewparentCtrl.defaultNameFun();
            scope.$on("DEF_ICON", function (event, data) {
                scope.defIcon = data;
            });
        },
        template: "{{defIcon}}"
    };
});


manageitModule.directive('conditionalAttribute', ['$compile', 'contentObjectService', '$routeParams', '$rootScope', 'sharedScope', '$filter', 'imageLibraryObjectService', 'documentLibraryObjectService', function ($compile, contentObjectService, $routeParams, $rootScope, sharedScope, $filter, imageLibraryObjectService, documentLibraryObjectService) {

    //var controller = ['$scope', function ($scope) {

    //}];
    return {
        restrict: 'A',
        scope: {
        },
        link: function (scope, elem, attr, ctrl) {          
           
            elem.hide();
            // elem.hide();
            //  alert(attr.conditionalClassification);
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            //console.log("ct");
            //console.log(contentType);
            //console.log($rootScope.saveFlag);
            //console.log($rootScope.editTab);
            if (!$rootScope.isAdmin && contentType.permissions.length > 0) {
                angular.forEach(contentType.permissions[0]['attributes']['selectedRoles'], function (value, key) {
                    angular.forEach($rootScope.userRoleTypes, function (role, k) {   
                        if (role == value.roleName) {
                            angular.forEach(value['selectedAttributes'], function (v, k) {
                                if (v.attributeName == attr.conditionalAttribute && $rootScope.saveFlag) {
                                    //console.log(v.attributeName);
                                    //console.log(v['permission']['view']);
                                    scope.attrViewPermission = v['permission']['view'];  
                                } else if (v.attributeName == attr.conditionalAttribute && $rootScope.checkinFlag) {
                                    //  console.log(v.attributeName);
                                    //console.log(v['permission']['modify']);
                                    scope.attrModifyPermission = v['permission']['modify'];
                                }
                            });
                        }
                    });
                });
            }
            
            //alert(attr.conditionalAttribute + " " + scope.attrViewPermission);
            if (!$rootScope.searchResult) {
                if ($rootScope.selectedType == "ContentType") {
                    var getMyServiceCall = contentObjectService.getContentObject({ contentObjectId: $routeParams.ContentObjectId, controller: 'contentobject' });
                } else if ($rootScope.selectedType == "Image") {
                    var getMyServiceCall = imageLibraryObjectService.getImageLibraryObject({ imageObjectId: $routeParams.ContentObjectId, controller: 'imageLibraryObject' });
                } else if ($rootScope.selectedType == "Document") {
                    var getMyServiceCall = documentLibraryObjectService.getDocumentLibraryObject({ documentObjectId: $routeParams.ContentObjectId, controller: 'documentLibraryObject' });
                }
                getMyServiceCall.$promise.then(function (contentObjectdetails) {
                   
                scope.contentObjectsDetails = contentObjectdetails.attributeCollection;
                scope.contentObjectsAttrSetDetails = contentObjectdetails.attributeSetCollection;
                scope.contentObjectsCopyAttrDetails = contentObjectdetails.copyAttributeCollection;
                //console.log('scope.contentObjectsDetails');
                //console.log(scope.contentObjectsDetails);
                angular.forEach(scope.contentObjectsDetails, function (value, key) {
                    if ($rootScope.isAdmin) {
                        if (value.name == attr.conditionalAttribute && value.value[0] != null && value.type !="CopyAttribute") {
                //alert(value.value[0]);
                            elem.show();
                            return false;
            }
            } else {
                        if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrViewPermission && $rootScope.viewPermissionCO) {
                //alert(value.value[0]);
                            elem.show();
                            return false;
            } else if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrModifyPermission && $rootScope.editPermissionCO) {
                //alert(value.value[0]);
                            elem.show();
                            return false;
            }
            }

            });
                angular.forEach(scope.contentObjectsAttrSetDetails, function (value, key) {
                //alert(value.name + "," + attr.conditionalAttribute)
                    if ($rootScope.isAdmin) {
                        if (value.name == attr.conditionalAttribute && value.value[0] != null) {
                //alert(value.value[0]);
                            elem.show();
                            return false;
            }
            } else {
                        if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrViewPermission && $rootScope.viewPermissionCO) {
                //alert(value.value[0]);
                            elem.show();
                            return false;
            } else if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrModifyPermission && $rootScope.editPermissionCO) {
                //alert(value.value[0]);
                            elem.show();
                            return false;
            }
            }

                });
                angular.forEach(scope.contentObjectsCopyAttrDetails, function (value, key) {
                    //alert(value.name + "," + attr.conditionalAttribute)
                    if ($rootScope.isAdmin) {
                        if (value.name == attr.conditionalAttribute && value.value[0]['value'] != null) {
                            //alert(value.value[0]);
                            elem.show();
                            return false;
                        }
                    } else {
                        if (value.name == attr.conditionalAttribute && value.value[0]['value'] != null && scope.attrViewPermission && $rootScope.viewPermissionCO) {
                            //alert(value.value[0]);
                            elem.show();
                            return false;
                        } else if (value.name == attr.conditionalAttribute && value.value[0]['value'] != null && scope.attrModifyPermission && $rootScope.editPermissionCO) {
                            //alert(value.value[0]);
                            elem.show();
                            return false;
                        }
                    }

                });
            });
            }
            else {


                var contentobjectid = $('.defaultTarget').attr('id');
                if (contentobjectid) {
                    var contentObjectdetails = $filter('filter')($rootScope.searchresultsarray, { contentObjectId: contentobjectid })[0];
                    //  contentObjectService.getContentObject({ contentObjectId: contentobjectid, controller: 'contentobject' }).$promise.then(function (contentObjectdetails) {
                    scope.contentObjectsDetails = contentObjectdetails.attributeCollection;
                    scope.contentObjectsAttrSetDetails = contentObjectdetails.attributeSetCollection;
                    //console.log('scope.contentObjectsDetails');
                    //console.log(scope.contentObjectsDetails);
                    angular.forEach(scope.contentObjectsDetails, function (value, key) {
                        //alert(value.name + "," + attr.conditionalAttribute)
                        if ($rootScope.isAdmin) {
                            if (value.name == attr.conditionalAttribute && value.value[0] != null) {
                                //alert(value.value[0]);
                                elem.show();
                                return false;
                            }
                        } else {
                            if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrViewPermission && $rootScope.viewPermissionCO) {
                                //alert(value.value[0]);
                                elem.show();
                                return false;
                            } else if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrModifyPermission && $rootScope.editPermissionCO) {
                                //alert(value.value[0]);
                                elem.show();
                                return false;
                            }
                        }

                    });
                angular.forEach(scope.contentObjectsAttrSetDetails, function (value, key) {
                    //alert(value.name + "," + attr.conditionalAttribute)
                    if ($rootScope.isAdmin) {
                        if (value.name == attr.conditionalAttribute && value.value[0] != null) {
                            //alert(value.value[0]);
                            elem.show();
                            return false;
                        }
                    } else {
                        if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrViewPermission && $rootScope.viewPermissionCO) {
                            //alert(value.value[0]);
                            elem.show();
                            return false;
                        } else if (value.name == attr.conditionalAttribute && value.value[0] != null && scope.attrModifyPermission && $rootScope.editPermissionCO) {
                            //alert(value.value[0]);
                            elem.show();
                            return false;
                        }
                    }

                });
            }
            }
        }
    };

}]);




/*Directives for content object END */


