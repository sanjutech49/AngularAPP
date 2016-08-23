manageitModule.controller("layoutsController", ['$scope', '$rootScope', 'sharedScope', '$filter', 'layoutsService', 'newSharedScope', '$routeParams', '$q', '$compile', 'textAttributeService',
function ($scope, $rootScope, sharedScope, $filter, layoutsService, newSharedScope, $routeParams, $q, $compile, textAttributeService) {
    $scope.navTitle = ($routeParams.subObjectId==null || $routeParams.subObjectId == 0) ? 'Layouts' : $routeParams.attributeScreenName + ' > Layouts'
    $scope.errorLayouts = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.classificationCondition = [
      { key: "0", value: "Any Classification" },
      { key: "1", value: "Conditional Classification" }
    ];
    $scope.editOrAdd = "Add";
    $scope.layouts = [];
    $scope.styleAttr = { name: null, oldvalue: null };
    $scope.styles = [];
    $scope.layout = { layoutId: '', layoutName: null, isEnabled: null, isUnique: false, isAnyViewClassification: '0', layoutViewNegationOperator: null, layoutsdesign: '' };

    $scope.errorLayoutdetails = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };

    $scope.layoutHtmlId = "layoutwrapper";
    $scope.layoutStages = [];
    $scope.layoutStagesRedo = [];
    $scope.multiselect = false;
    $scope.layoutsdesign = { width: '', height: '', regions: [] };
    $scope.region = { regionId: '', sequenceId: '', height: '', width: '', top: '', left: '', attributes: [] };

    $scope.regionAttr = { attributeId: '', regionId: null, rangeType: null, rangevalue: null, nFromValue: null, nToValue: null, selectedroles: [], isAnyImageType: null, filters: [] };



    $scope.attribute = { attributeId: '', sequenceId: '', attributeType: null, attrname: '', attrvalue: '', attrType: null, ismultivalues: false, subattr: [] };
    $scope.subattributeImage = { attributeId: '', attrNvalue: null, rangevalue: null, isAll: null, selectedroles: [], selectedTypes: [], filters: [] };



    $scope.tabs = [{
        id: 'tab_0',
        title: 'Properties',
        contentid: 'properties'
    }, {
        id: 'tab_1',
        title: 'Design',
        contentid: 'design'
    }, {
        id: 'tab_2',
        title: 'Attribute Assignment',
        contentid: 'attributeAssignment'
    }];
    $scope.currentTab = 'tab_0';
    $scope.isLayoutChange = false;
    $scope.onClickTab = function (tab) {
       // if (!$scope.checkOverlap()) {
            $scope.currentTab = tab.id;
            $(".tab-content div").find("[role=tabpanel]").removeClass("active");
            $('#' + tab.contentid).addClass("active");

            if ($scope.currentTab == 'tab_2') {

                if ($scope.layoutsdesign.regions.length == 0)
                    $scope.htmltoJSON();
                $scope.updateDesign();
            }
        //}
      //  else {
           
        //    $scope.currentTab == 'tab_1'
            return false;
         //   setTimeout(function () { document.getElementById("tab_1").click(); }, 10);
      //  }
    }

    $scope.sortableOptionsA = {

        stop: function (e, ui) { }
    }

    $scope.updatelimit = function () {

        switch ($scope.attrProperties.rangeType) {
            case 'all':
                $scope.attrProperties.nfirstValue = null;
                $scope.attrProperties.nlastValue = null;
                $scope.attrProperties.nFromValue = null;
                $scope.attrProperties.nToValue = null;

                break;
            case 'first':
                $scope.attrProperties.nlastValue = null;
                $scope.attrProperties.nFromValue = null;
                $scope.attrProperties.nToValue = null;
                break;
            case 'last':
                $scope.attrProperties.nfirstValue = null;
                $scope.attrProperties.nFromValue = null;
                $scope.attrProperties.nToValue = null;
                break;
            default:
                $scope.attrProperties.nfirstValue = null;
                $scope.attrProperties.nlastValue = null;
        }
    };
    $scope.allProperties = [];
    $scope.updateDesign = function () {
        $("#finalLayout").html($("#" + $scope.layoutHtmlId).html());
        $("#finalLayout").find('[id^=region_]').draggable();
        $("#finalLayout").find('[id^=region_]').draggable("destroy");
        $("#finalLayout").find('[id^=region_]').resizable();
        $("#finalLayout").find('[id^=region_]').resizable("destroy");

        //$("#finalLayout").find('[id^=region_]').sortable({ connectWith: ".genbox_bg" });
        $("#finalLayout").find('[id^=region_]').droppable({
            accept: ".dragItem",
            drop: function (event, ui) {
                var attrObj = $(ui.draggable).find("a").attr("value");
                var currentPos = ui.helper.position()
                var attrProperty = { attributeId: '', regionId: null, attrTemplate: null, classType: null, rangeType: 'all', nfirstValue: null, nlastValue: null, nFromValue: null, nToValue: null, roles: [], isAnyImageType: null, filters: [] };
                if (attrObj == undefined || attrObj == null) {
                    var htmlstr = '<div class="attribute-lablewrap dragItem" style="position:relative"><a href="#" >' + $(ui.draggable).text() + '</a></div>';
                    attrProperty.regionId = event.target.id;
                    attrProperty.attrTemplate = htmlstr;
                    $(this).append(htmlstr);
                }
                else {
                    var objAtrr = JSON.parse(attrObj);
                    attrProperty.attributeId = JSON.parse(attrObj).attributeId;
                    attrProperty.roles = JSON.parse(attrObj).imageRoles == undefined ? [] : JSON.parse(attrObj).imageRoles;
                    attrProperty.isAnyImageType = JSON.parse(attrObj).isAnyImageType;
                    attrProperty.regionId = event.target.id;
                    var str = "";
                    var htmlstr = "";
                    var func = "";
                    if (objAtrr.attributeType == 'ImageReferenceAttribute') {
                        str = "showCallout($event,'" + attrProperty.attributeId + "',true)";
                        func = 'ng-click=' + str;
                        $scope.isChildAttrShow = true;
                    } else
                       // if (objAtrr.attributeType == 'TextAttribute')
                        {
                        str = "showCallout($event,'" + attrProperty.attributeId + "',false)";
                        func = 'ng-click=' + str;
                        $scope.isChildAttrShow = false;
                    }
                    htmlstr = '<div class="attribute-lablewrap dragItem" style="position:relative"><a href="#" ' + func + ' >' + $(ui.draggable).text() + '</a></div>';
                    attrProperty.attrTemplate = htmlstr;
                    $(this).append($compile(htmlstr)($scope));
                }
                $scope.allProperties.push(attrProperty);
                //$(this).sortable();
                //$(this).disableSelection();
                //$.each($scope.layoutsdesign.regions, function (indx, value) {
                //    if (value.regionId == event.target.id)
                //        value.attributes.push(attrProperty);
                //});

            }
        });
        // $("#finalLayout").find('[id^=region_]').sortable({ containment: "parent" });

        $(".dragItem").draggable({
            // zIndex: 2050
            //connectToSortable: '.genbox_bg',
            helper: 'clone',
            appendTo: '#finalLayout',
            revert: 'invalid',
            cursor: 'move'
        });

        $scope.jsontoHTMLAttr($scope.layoutsdesign);

    }
    $scope.showCallout = function (event, attrid,isShowChild) {
        //return true;
        $("#regionAttrcallout").css({ display: 'absolute', top: event.clientY - event.offsetY - 100, left: event.offsetX });
        $("#regionAttrcallout").show();
        $.each($scope.allProperties, function (index, value) {
            if (value.attributeId == attrid) {
                $scope.attrProperties = value;

            }
        });
        $scope.isChildAttrShow = isShowChild;
    };

    $scope.removeattr = function () {
        $("#regionAttrcallout").hide();
    };
    $scope.isActiveTab = function (tabid) {
        return tabid == $scope.currentTab;
    }
    $scope.htmltoJSON = function () {
        htmlayout = $("#" + $scope.layoutHtmlId);
        $scope.layoutsdesign.width = $scope.layoutWidth;
        $scope.layoutsdesign.height = $scope.layoutHeight;
        var regionlist = htmlayout.find('[id^=region_]');

        if (regionlist.length > 0)
            $scope.layoutsdesign.regions = [];
        $(regionlist).each(function (indx) {
            var item = $(regionlist[indx]);
            $scope.region = {
                regionId: '', sequenceId: '', height: '', width: '', top: '', left: '', attributes: []
            };
            $scope.region.regionId = item.attr("id");
            $scope.region.sequenceId = indx;
            $scope.region.height = item.height();
            $scope.region.width = item.width();
            $scope.region.top = item.css("top");
            $scope.region.left = item.css("left");
            var returnedData = $.grep($scope.allProperties, function (element, index) {
                return element.regionId == item.attr("id");
            })
            if (returnedData.length > 0) {
                $(returnedData).each(function (inx) {
                    //attrProperty = { attributeId: '',regionId:null, rangeType: 'all', nfirstValue: null, nlastValue: null, nFromValue: null, nToValue: null, roles: [], isAnyImageType: null, filters: [] };
                    $scope.regionAttr = { attributeId: '', regionId: null, attrTemplate: null, classType: null, rangeType: null, rangevalue: null, selectedroles: [], isAnyImageType: null, filters: [] };
                    $scope.regionAttr.attributeId = returnedData[inx].attributeId;
                    $scope.regionAttr.regionId = returnedData[inx].regionId;
                    $scope.regionAttr.rangeType = returnedData[inx].rangeType;
                    var rangeVal = null;
                    if (returnedData[inx].rangeType == "first")
                        rangeVal = returnedData[inx].nfirstValue;
                    else if (returnedData[inx].rangeType == "last")
                        rangeVal = returnedData[inx].nlastValue;
                    else if (returnedData[inx].rangeType == "range")
                        rangeVal = returnedData[inx].nFromValue + "-" + returnedData[inx].nToValue;

                    $scope.regionAttr.rangevalue = rangeVal;
                    $scope.regionAttr.selectedroles = $.grep(returnedData[inx].roles, function (element, index) { return element.isDefault == true; });
                    $scope.regionAttr.isAnyImageType = returnedData[inx].isAnyImageType;
                    $scope.regionAttr.filters = returnedData[inx].filters;
                    $scope.regionAttr.attrTemplate = returnedData[inx].attrTemplate;
                    $scope.regionAttr.classType = returnedData[inx].classType;
                    $scope.region.attributes.push($scope.regionAttr);
                });
            }

            $scope.layoutsdesign.regions.push($scope.region);
        });
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
    $scope.getLayouts = function () {
        $scope.layouts = [];
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        // get based on libraries 
        if (contentType.imageLibraryId) {
            var libraryid = contentType.imageLibraryId;
        } else if (contentType.contentTypeId) {
            var libraryid = contentType.contentTypeId;
        }
        else {
            var libraryid = contentType.documentLibraryId;
        }
                

        if ($routeParams.subObjectId == 0) {
            var serviceval = layoutsService.queryLib({ controller: 'layouts', domainId: contentType.domainId, contentTypeId: libraryid, isAllLayouts: true });
        }
        else {
            var serviceval = layoutsService.querySubobejctLib({ controller: 'layouts', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, isAllLayouts: true });
        }

        serviceval.$promise.then(function (details) {
       // layoutsService.queryLib({ controller: 'layouts',domainId:contentType.domainId, contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, isAllLayouts: true }).$promise.then(function (details) {
            if (details) {
                $scope.layouts = details;
            }

        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.showExceptionMessage($scope.errorLayouts, value.message, value.moreDetails);
                });
            }

        });
    }
    $scope.showSuccessMessage = function (attModel, message) {
        attModel.messages.push(message);
        attModel.isSuccess = true;
        //attModel.isHide = true;
    }
    $scope.showValidationMessage = function (message) {
        $scope.errorLayoutdetails.messages.push(message);
        $scope.errorLayoutdetails.isSuccess = false;
        $scope.errorLayoutdetails.isError = true;
        $scope.errorLayoutdetails.isHide = true;
    };

    $scope.showExceptionMessage = function (attModel, message, moredetails) {
        attModel.messages.push(message);
        attModel.moreDetails = moredetails;
        attModel.isError = true;
        //attModel.isHide = true;
    }

    $scope.validateLayout = function (layoutModel, errorCntrl) {
        var errorObj = errorCntrl.messages;

        if (layoutModel.layoutName == null || layoutModel.layoutName == '' || layoutModel.layoutName == undefined) {
            errorObj.push("Layout Name is required");
        }
        if ($scope.checkOverlap())
            return false;

        if (errorObj.length > 0) {
            errorCntrl.isError = true;
            errorCntrl.isHide = true;
            return false;
        }
        return true;

    }

    $scope.addLayout = function (layout) {
        var objlayout = layout;
        $scope.resetErrorDirective($scope.errorLayoutdetails);
        var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');

        if ($scope.validateLayout(layout, $scope.errorLayoutdetails)) {

            var newLayout = new layoutsService();
            newLayout.contentTypeId = $routeParams.contentTypeId;
            newLayout.subObjectId = $routeParams.subObjectId;
            newLayout.layoutName = objlayout.layoutName;
            newLayout.isEnabled = objlayout.isEnabled;
            newLayout.layoutViewNegationOperator = objlayout.layoutViewNegationOperator;
            newLayout.isAnyClassification = objlayout.isAnyViewClassification == "1" ? true : false;
            newLayout.layoutId = objlayout.layoutId;
            $scope.htmltoJSON();
            newLayout.layoutsdesign = JSON.stringify($scope.layoutsdesign);
            if (newLayout.isAnyClassification) {
                newLayout.viewClassifications = classificationExpressionBuilderController.conditionsDisplay;

                //update the parent negation operator.
                angular.forEach(newLayout.viewClassifications, function (v, k) {
                    v.expressionNegationOperator = classificationExpressionBuilderController.storeExpressions[k];
                });
            }
            else newLayout.viewClassifications = [];

            if (objlayout.layoutId == '' || objlayout.layoutId == null) {
                newLayout.createdBy = $rootScope.manageITUserName;
                //create layout based on libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newLayout.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newLayout.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newLayout.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                
                layoutsService.createLib({ controller: 'layouts', domainId: contentType.domainId }, newLayout).$promise.then(function (response) {
               // layoutsService.create({ controller: 'layouts' }, newLayout).$promise.then(function (response) {

                    if (response.$resolved == true && response.layoutId != "") {

                        $('#addlayout').hide();
                        $('.modal-backdrop').hide();
                        $scope.getLayouts();
                        $scope.errorLayoutdetails.messages.push("Layout saved successfully");
                        $scope.errorLayoutdetails.isSuccess = true;
                        $scope.errorLayoutdetails.isHide = false;

                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {

                            $scope.errorLayoutdetails.messages.push(value.message);
                            $scope.errorLayoutdetails.messages.moreDetails = value.moreDetails;
                            $scope.errorLayoutdetails.isSuccess = false;
                            $scope.errorLayoutdetails.isError = true;
                            $scope.errorLayoutdetails.isHide = true;

                        });
                    }
                });
            }
            else {
                newLayout.updatedBy = $rootScope.manageITUserName;
                newLayout.layoutName = objlayout.layoutName;
                newLayout.layoutId = objlayout.layoutId;
                newLayout.isEnabled = objlayout.isEnabled;
                newLayout.layoutViewNegationOperator = objlayout.layoutViewNegationOperator;
                newLayout.isAnyClassification = objlayout.isAnyViewClassification == "1" ? true : false;

                //update layout based on libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newLayout.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newLayout.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newLayout.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                layoutsService.updateLib({ controller: 'layouts', domainId: contentType.domainId }, newLayout).$promise.then(function (response) {
               // layoutsService.update({ controller: 'layouts' }, newLayout).$promise.then(function (response) {

                    if (response.$resolved == true && response.layoutId != "") {

                        $('#addlayout').hide();
                        $('.modal-backdrop').hide();
                        $scope.defaultlayout();

                        $scope.errorLayoutdetails.messages.push("Layout updated successfully");
                        $scope.errorLayoutdetails.isSuccess = true;
                        $scope.errorLayoutdetails.isHide = false;

                        //call the dynamic left menu function.
                        //  sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errorLayoutdetails.messages.push(value.message);
                            $scope.errorLayoutdetails.messages.moreDetails = value.moreDetails;
                            $scope.errorLayoutdetails.isSuccess = false;
                            $scope.errorLayoutdetails.isError = true;
                            $scope.errorLayoutdetails.isHide = true;
                        });
                    }
                });
            }
        }
        else {
            $scope.errorLayoutdetails.isError = true;
            $scope.errorLayoutdetails.isHide = true;
        }

    };

    $scope.editlayout = function (layout) {

        $scope.resetErrorDirective($scope.errorLayoutdetails);
        var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
        $scope.editOrAdd = "Edit";
        $scope.layout.layoutName = layout.layoutName;
        $scope.layout.isEnabled = layout.isEnabled;
        $scope.layout.layoutViewNegationOperator = layout.ViewClassification;
        $scope.layout.isAnyClassification = layout.isAnyViewClassification == "1" ? true : false;
        $scope.layout.layoutId = layout.layoutId;

        classificationExpressionBuilderController.layout.isAnyViewClassification = layout.isAnyClassification ? "1" : "0";
        classificationExpressionBuilderController.conditionsDisplay = layout.viewClassifications;
        classificationExpressionBuilderController.isFirst = false;
        $scope.jsontoHTML(layout.layoutsDesign);
        $scope.currentTab = 'tab_0';
        setTimeout(function () { document.getElementById("tab_0").click(); }, 100);

    };
    $scope.jsontoHTMLAttr = function (jsonObject) {
        var layoutObj = jsonObject;
        $(layoutObj.regions).each(function (idx) {
            //attributes
            $(layoutObj.regions[idx].attributes).each(function (i) {
                $($compile(layoutObj.regions[idx].attributes[i].attrTemplate)($scope)).appendTo($("#finalLayout").find("#" + layoutObj.regions[idx].attributes[i].regionId));
            });

        });
    };

    $scope.jsontoHTML = function (jsonObject) {
        $scope.layoutsdesign = jQuery.parseJSON(jsonObject);
        var layoutObj = jQuery.parseJSON(jsonObject);
        $scope.layoutWidth = layoutObj.width;
        $scope.layoutHeight = layoutObj.height;
        $scope.ConvertMMToPixelLayout(layoutObj.height, layoutObj.width);
        $("#" + $scope.layoutHtmlId).html('');
        $(layoutObj.regions).each(function (idx) {
            $("#" + $scope.layoutHtmlId).append($compile("<div class='gen_box_" + idx + " genbox_bg' id='region_" + idx + "'  ng-click=SelectLayout($event)></div>")($scope));
            gen_box = $('.gen_box_' + idx);

            //add css to generated div and make it resizable & draggable
            $(gen_box).css({
                'background': 'blue',
                'width': layoutObj.regions[idx].width,
                'height': layoutObj.regions[idx].height,
                'position': 'absolute',
                'left': layoutObj.regions[idx].left,
                'top': layoutObj.regions[idx].top
            })
            .draggable({ grid: [10, 10], containment: "parent" })
            .resizable();
        });
    };
    $scope.deleteLayout = function (layout) {
        $scope.resetErrorDirective($scope.errorLayoutdetails);
        var defLayout = $q.defer();
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        layout.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
        layout.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
        layout.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
        
        if ( layout.layoutId != '') {

            layoutsService.removeLib({ controller: 'layouts', domainId: contentType.domainId }, layout).$promise.then(function (response) {
                if (response.$resolved == true) {

                    $scope.errorLayoutdetails.messages.push("Attribute deleted successfully");
                    $scope.errorLayoutdetails.isSuccess = true;
                    $scope.getLayouts();
                    defLayout.resolve();

                }
            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {

                        $scope.errorLayoutdetails.messages.push(value.message);
                        $scope.errorLayoutdetails.moreDetails = value.moreDetails;
                        $scope.errorLayoutdetails.isError = true;
                        $scope.errorLayoutdetails.isHide = true;
                        defLayout.reject();

                    });
                }
                else {
                    $scope.errorLayoutdetails.messages.push("Error occured while deleting the Attribute. Please try after sometime.");
                    $scope.errorLayoutdetails.isError = true;
                    $scope.errorLayoutdetails.isHide = true;
                }
            });
        } return defLayout.promise;
    };


    $scope.clearLayoutFields = function (layout) {
        $scope.editOrAdd = "Add";
        $scope.currentTab = 'properties';
        var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
        $scope.isClassification = true;
        $scope.layout = {
            layoutId: '', layoutName: null, isEnabled: null, isUnique: false, isAnyViewClassification: '0', layoutViewNegationOperator: null
        };
        classificationExpressionBuilderController.clearForm();
        classificationExpressionBuilderController.isFirst = true;
        $("#" + $scope.layoutHtmlId).html('');
        $scope.layoutStages = [];
        $scope.layoutStagesRedo = [];
        $scope.currentTab = 'tab_0';
        setTimeout(function () { document.getElementById("tab_0").click(); }, 100);

    };

    $scope.defaultlayout = function () {
        $scope.layouts = [];
        $scope.resetErrorDirective($scope.errorLayouts);
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;

        // get based on libraries 
        if (contentType.imageLibraryId) {
            var libraryid = contentType.imageLibraryId;
        } else if (contentType.contentTypeId) {
            var libraryid = contentType.contentTypeId;
        }
        else {
            var libraryid = contentType.documentLibraryId;
        }
                
        if ($routeParams.subObjectId == 0) {
            var serviceval = layoutsService.queryLib({ controller: 'layouts', domainId: contentType.domainId, contentTypeId: libraryid, isAllLayouts: true });
        }
        else {
            var serviceval = layoutsService.querySubobejctLib({ controller: 'layouts', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, isAllLayouts: true });
        }

        serviceval.$promise.then(function (details) {

        //layoutsService.queryLib({ controller: 'layouts',domainId:contentType.domainId, contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, isAllLayouts: true }).$promise.then(function (details) {
            angular.forEach(details, function (value, key) {
                $scope.layouts.push(value);
            });

        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.showExceptionMessage($scope.errorLayouts, value.message, value.moreDetails);
                });
            }

        });
    }

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
    }


    $scope.changeClassification = function (newValue) {
        $scope.layout.isAnyClassification = newValue;
    }

    $scope.subObjectAllAttributes = function () {

        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
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


       // layoutsService.getAllSubObjectAttrInContentType({ id: $routeParams.contentTypeId }).$promise.then(function (details) {
            if (details) {
                $scope.subObjects = details;
            }

        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.subObjectErrAttribute.messages.push(value.message);
                });
            }
            else {
                $scope.subObjectErrAttribute.messages.push("Error occured while fetching sub objects. Please try after sometime.");
            }

        });

    };
    $scope.defaultAttributes = function () {
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
            
            var contentTypeDefaultAttributes = [];
            //var contentTypeAttributeSetAttributes = [];
            var subObjectDefaultAttributes = [];

            angular.forEach(details, function (value, key) {

                if (value.subObjectId == null || value.subObjectId == "0") {
                    if (value.attributeSetId == null || value.attributeSetId == "0") {
                        contentTypeDefaultAttributes.push(value);
                    }
                    //else {
                    //    contentTypeAttributeSetAttributes.push(value);
                    //}
                }
                else {
                    if (value.subObjectId == $routeParams.subObjectId)
                        subObjectDefaultAttributes.push(value);
                }

            });

            if ($routeParams.subObjectId == "0") {
                $scope.attributes = contentTypeDefaultAttributes;
            }
            else {
                $scope.attributes = subObjectDefaultAttributes;
            }
            // $scope.attributesets = contentTypeAttributeSetAttributes;
            //setTimeout(function () {
            //    $(".dragItem").draggable().sortable();
            //}, 1000);


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
    $scope.getAttributeSets = function () {
        $scope.attributeSets = [];
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
    //write your functions from here

    /*------------- Design Layout Code Client-side--------------------------------- */

    $scope.defaultLayoutDimension = {
        width: "500",
        height: "300"
    };
    $scope.defaultRegionDimension = {
        width: "50",
        height: "150"
    };

    $scope.DesignLayout = function () {
        $scope.multiselect == false;
        var main_content = $('#' + $scope.layoutHtmlId),
        gen_box = null,
        i = 1;

        $(".design-whitebg").selectable();

        // main_content.mousemove(function (event) {
        main_content.selectable({
            start: function (e) {

                //get the mouse position on start
                x_begin = e.offsetX,
                y_begin = e.offsetY;

            },
            stop: function (e) {

                //get the mouse position on stop
                x_end = e.offsetX,
                y_end = e.offsetY;

                /***  if dragging mouse to the right direction, calcuate width/height  ***/

                if (x_end - x_begin >= 1) {
                    width = x_end - x_begin,
                    height = y_end - y_begin;

                    /***  if dragging mouse to the left direction, calcuate width/height (only change is x) ***/

                } else {

                    width = x_begin - x_end,
                    height = y_end - y_begin;
                    var drag_left = true;
                }

                if ($scope.defaultRegionDimension.width > width || $scope.defaultRegionDimension.height > height) {
                    return false;
                }
                //append a new div and increment the class and turn it into jquery selector                
                $(this).append($compile(
                  "<div class='gen_box_" + i + " genbox_bg' id='region_" + i + "'  ng-click=SelectLayout($event)></div>")($scope));


                gen_box = $('.gen_box_' + i);

                //add css to generated div and make it resizable & draggable
                $(gen_box).css({
                    'background': 'blue',
                    'width': width,
                    'height': height,
                    'position': 'absolute',
                    'left': x_begin,
                    'top': y_begin
                })
                .draggable({ grid: [10, 10], containment: "parent" })
                .resizable();

                //if the mouse was dragged left, offset the gen_box position 
                drag_left ? $(gen_box).offset({ left: x_end, top: y_begin }) : false;
                console.log('width: ' + width + 'px');
                console.log('height: ' + height + 'px');

                var stepHtml = $("#layoutwrapper").html();
                $scope.layoutStages.push(stepHtml);
                $scope.multiselect == false;
                //add thr styles of generated div into .inner_col_one
                i++;

            }
        });
        //});

    };

    $scope.LayoutPartitionH = function () {
        var control = $("#layoutwrapper").find(".addFocus");
        if (!control.length)
            $scope.showValidationMessage("No Item selected");
        else {
            if (control.length > 1) {
                $scope.showValidationMessage("Pease select one item at a time for partition.");
                return false;
            }
            $scope.multiselect == false
            var innerControls = $(control).html();
            var MasterId = $(control).attr("id");
            var MasterHeight = $(control).css("Height");
            var MasterLeftPos = $(control).css("left");
            var MasterTopPos = $(control).css("top");
            var Child1Id = MasterId + "_1";
            var Child2Id = MasterId + "_2";
            var Child1 = $(control);
            var Child2 = $(control).clone();
            var NewChildHeight = Math.ceil(eval(MasterHeight.replace("px", "") / 2));
            var NewChildTop = Math.ceil(eval(MasterTopPos.replace("px", ""))) + NewChildHeight + 2;
            Child1 = $(Child1).attr("id", Child1Id);
            Child2 = $(Child2).attr("id", Child2Id);

            $(Child1).appendTo("#layoutwrapper");
            //$($compile(Child1)($scope)).appendTo("#layoutwrapper");
            $($compile(Child2)($scope)).appendTo("#layoutwrapper");
            $("#layoutwrapper").find(".addFocus").removeClass("addFocus");
            $("#" + Child1Id).animate({ "height": NewChildHeight + "px" }, 100, function () {
                $scope.resetSelection(Child2Id)
            });
            $("#" + Child2Id).animate({ "height": NewChildHeight + "px", "top": eval(NewChildTop) + "px" }, 100, function () {
                $scope.resetSelection(Child2Id)
            });
            $("#" + Child1Id).draggable({ grid: [10, 10], containment: "parent" }).resizable();
            $("#" + Child2Id).draggable({ grid: [10, 10], containment: "parent" }).resizable();

            $("#" + MasterId).remove();
            var main_content = $('.col_two')
            main_content.selectable("destroy");

        }
    };
    $scope.LayoutPartitionV = function () {
        var control = $("#layoutwrapper").find(".addFocus");
        if (!control.length)
            $scope.showValidationMessage("No Item selected");
        else {
            if (control.length > 1) {
                $scope.showValidationMessage("Pease select one item at a time for partition.");
                return false;
            }
            $scope.multiselect == false
            var innerControls = $(control).html();
            var MasterId = $(control).attr("id");
            var MasterWidth = $(control).css("width");
            var MasterLeftPos = $(control).css("left");
            var MasterTopPos = $(control).css("top");
            var Child1Id = MasterId + "_1";
            var Child2Id = MasterId + "_2";
            var Child1 = control;
            var Child2 = $(control).clone();
            var NewChildWidth = Math.ceil(eval(MasterWidth.replace("px", "") / 2));
            var NewChildLeft = Math.ceil(eval(MasterLeftPos.replace("px", ""))) + NewChildWidth + 2;
            Child1 = $(Child1).attr("id", Child1Id);
            Child2 = $(Child2).attr("id", Child2Id);
            $(Child1).appendTo("#layoutwrapper");
            //$($compile(Child1)($scope)).appendTo("#layoutwrapper");
            $($compile(Child2)($scope)).appendTo("#layoutwrapper");
            $("#" + Child1Id).animate({ "width": NewChildWidth + "px" }, 100, function () {
                $scope.resetSelection(Child1Id)
            });
            $("#" + Child2Id).animate({ "width": NewChildWidth + "px", "left": eval(NewChildLeft) + "px" }, 100, function () {
                $scope.resetSelection(Child2Id)
            });
            $("#" + Child1Id).draggable({ grid: [10, 10], containment: "parent" }).resizable();
            $("#" + Child2Id).draggable({ grid: [10, 10], containment: "parent" }).resizable();
            $(".dropItem").draggable();
            $("#" + MasterId).remove();
        }
    };

    $scope.mergeRegion = function () {
        var control = $("#layoutwrapper").find(".addFocus");
        var cntrllength = control.length;
        if (!cntrllength)
            $scope.showValidationMessage("No Item selected for remove.");
        else if (cntrllength < 2) {
            $scope.showValidationMessage("Please select region properly for merge.");
        }
        else {
            var list = sortArray(control, "left");
            var sortedlist = sortArray(list, "top");
            var toppos = $(sortedlist[0]).css("top").replace("px", "");
            var leftpos = $(sortedlist[0]).css("left").replace("px", "");
            var mergeddiv = $(sortedlist[0]).clone();
            var mergeddivId = $(sortedlist[0]).attr("id") + "_m";
            mergeddiv = $(mergeddiv).attr("id", mergeddivId);
            $($compile(mergeddiv)($scope)).appendTo("#layoutwrapper");
            var totalwidth = 0;
            var totalheight = $(sortArray(control, "height")[cntrllength - 1]).height();
            $(sortedlist).each(function (index) {
                totalwidth += $(sortedlist[eval(index)]).width();
                $(sortedlist[eval(index)]).remove();
            });
            $(mergeddiv).animate({
                "width": totalwidth + "px", "height": totalheight + "px", "left": leftpos + "px", "top": toppos + "px"
            },
                100).draggable({ grid: [10, 10], containment: "parent" })
                    .resizable();

        }
    };

    function sortArray(selector, attrName) {
        return $($(selector).sort(function (a, b) {
            var aVal = parseInt($(a).css(attrName).replace("px", "")),
                bVal = parseInt($(b).css(attrName).replace("px", ""));
            return aVal - bVal;
        }));
    }

    $scope.resetSelection = function (Child2Id) {
        $("#" + Child2Id).removeClass("addFocus");
        var stepHtml = $("#layoutwrapper").html();
        $scope.layoutStages.push(stepHtml);
    };
    $scope.removeLayout = function () {
        var control = $("#layoutwrapper").find(".addFocus");
        if (!control.length)
            $scope.showValidationMessage("No Item selected for remove.");
        else {
            $(control).each(function (index) {
                $(control[index]).remove();
            });
            var stepHtml = $("#layoutwrapper").html();
            $scope.layoutStages.push(stepHtml);
            $scope.regionHeight = ""
            $scope.regionWidth = "";
            $scope.regionTop = "";
            $scope.regionLeft = "";
        }
    };
    $scope.UndoChages = function () {
        var len = $scope.layoutStages.length;
        if (len == 0)
            $scope.showValidationMessage("Nothing for undo");
        else {
            var index = eval(len - 1);
            var stage = $scope.layoutStages[index - 1];
            $scope.layoutStagesRedo.push($scope.layoutStages[index])
            $("#layoutwrapper").html($compile(stage)($scope));
            $scope.layoutStages.pop();
        }

    }

    $scope.RedoChages = function () {
        var len2 = $scope.layoutStagesRedo.length;
        if (len2 == 0)
            $scope.showValidationMessage("Nothing for redo");
        else {
            var index2 = eval(len2 - 1);
            var stage2 = $scope.layoutStagesRedo[index2];
            $scope.layoutStages.push($scope.layoutStagesRedo[index2]);
            $("#layoutwrapper").html($compile(stage2)($scope));
            $scope.layoutStagesRedo.pop();
        }

    }

    $scope.pointerSelect = function () {
        $scope.multiselect = true;
    }
    $scope.openStyleModal = function () {
        $scope.isstyleAttrModal = true;
    }
    /*------------- Design Layout Code Client-side End--------------------------------- */

    /*Define Styles ---START----*/

    // $scope.selectedStyle = "";
    $scope.errorLayoutStyles = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.addStyle = function () {
        $scope.resetErrorDirective($scope.errorLayoutStyles);
        if ($scope.styleAttr.name == null) {
            $scope.errorLayoutStyles.isError = true;
            $scope.errorLayoutStyles.messages.push('Style Name is empty');
            return;
        }
        var value = $scope.styleAttr.name;
        var oldVal = $scope.styleAttr.oldvalue;
        var findstyle = $.grep($scope.styles, function (item, index) {
            return item != oldVal;
        });
        findstyle.push(value);
        $scope.styles = findstyle;
        layoutsService.createStyle().$promise.then(function (details) {
            if (details) {
                $scope.attributeSets = details;
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
        createStyle
        //setTimeout(function () { findstyle.push(value); $scope.styles = findstyle; }, 10);

        $scope.styleAttr.name = null;

    };
    $scope.editStyle = function (str) {
        $scope.styleAttr.name = str;
        $scope.styleAttr.oldvalue = str;

    };

    $scope.saveStyle = function (styles) {
        $scope.styles = styles;

        $('#defineStyles').modal('hide');
        //$scope.$apply();
    }

    /*Define Styles ---END----*/
    /*Static Text------Start------*/
    $scope.staticText = { name: null };
    $scope.staticColl = [];
    $scope.addStaticText = function () {
        $scope.resetErrorDirective($scope.errorLayoutdetails);
        if ($scope.staticText.name == null || !$scope.staticText.name.trim()) {
            $scope.showValidationMessage("Static text is empty");
            return;
        }
        var str = '<div class="attribute-lablewrap dragItem"><a href="#"><i class="fa fa-arrows" aria-hidden="true"></i>' + $scope.staticText.name + '</a></div>';
        $(str).appendTo('#staticlist');
        $("#staticlist .dragItem").draggable({
            // zIndex: 2050
            //connectToSortable: '.genbox_bg',
            helper: 'clone',
            appendTo: '#finalLayout',
            revert: 'invalid',
            cursor: 'move'
        });
    };

    $scope.checkOverlap = function () {
        var cond = false;
        var divlist = $('#' + $scope.layoutHtmlId).find('[id^=region_]');
        var box = divlist[0];
        var isOverlap = $(divlist).not(box).map(function (i) {
            return overlaps(box, this);
        }).get().join('');
        if (isOverlap === 'true') {
            $scope.showValidationMessage("Regions are overlapping!");
        }
        cond = (isOverlap === 'true');
        return cond;

    };
    /*Static Text------END------*/

    $scope.SelectLayout = function (event) {
        var divOB = event.target;
        var cntrl = $("#" + divOB.id);
        $(cntrl).toggleClass("addFocus");
        $scope.regionHeight = Math.ceil(parseFloat($(cntrl).height()) / parseFloat(3.779528));
        $scope.regionWidth = Math.ceil(parseFloat($(cntrl).width()) / parseFloat(3.779528));
        $scope.regionTop = Math.ceil(parseFloat($(cntrl).position().top) / parseFloat(3.779528));
        $scope.regionLeft = Math.ceil(parseFloat($(cntrl).position().left) / parseFloat(3.779528));
    }

    $scope.layoutHeight = 79;
    $scope.layoutWidth = 132;
    $scope.regionHeight = ""
    $scope.regionWidth = "";
    $scope.regionTop = "";
    $scope.regionLeft = "";

    $scope.ConvertMMToPixelLayout = function (valHeight, valWidth) {
        var height = Math.ceil(parseFloat(valHeight) * parseFloat(3.779528));
        var width = Math.ceil(parseFloat(valWidth) * parseFloat(3.779528));
        $('.design-whitebg').css('height', height);
        $('.design-whitebg').css('width', width);
    }
    $scope.ConvertMMToPixelRegion = function (valHeight, valWidth) {
        var control = $("#layoutwrapper").find(".addFocus");
        if (!control.length)

            $scope.showValidationMessage("Please select a region!");
        else {
            if (control.length > 1)
                $scope.showValidationMessage("Please select a region one at a time.");
            else {
                var height = Math.ceil(parseFloat(valHeight) * parseFloat(3.779528));
                var width = Math.ceil(parseFloat(valWidth) * parseFloat(3.779528));
                $(control).css('height', height);
                $(control).css('width', width);
            }
        }
    }
    $scope.ConvertMMToPixelRegionPos = function (valLeft, valTop) {
        var control = $("#layoutwrapper").find(".addFocus");
        if (!control.length)
            $scope.showValidationMessage("Please select a region!");
        else {
            if (control.length > 1)
                $scope.showValidationMessage("Please select a region one at a time.");
            else {
                var leftPos = Math.ceil(parseFloat(valLeft) * parseFloat(3.779528));
                var topPos = Math.ceil(parseFloat(valTop) * parseFloat(3.779528));
                $(control).css('top', topPos);
                $(control).css('left', leftPos);
            }
        }

    }

    var overlaps = (function () {
        function getPositions(elem) {
            var pos = { left: null, top: null };
            var width, height;
            pos.left = parseInt($('#' + $scope.layoutHtmlId).find("#" + $(elem).attr("id")).css("left").replace("px", ""));
            pos.top = parseInt($('#' + $scope.layoutHtmlId).find("#" + $(elem).attr("id")).css("top").replace("px", ""));
            width = $('#' + $scope.layoutHtmlId).find("#" + $(elem).attr("id")).width();
            height = $('#' + $scope.layoutHtmlId).find("#" + $(elem).attr("id")).height();
            return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
        }

        function comparePositions(p1, p2) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }

        return function (a, b) {
            //$("#design").show();
            var pos1 = getPositions(a),
                pos2 = getPositions(b);
            //$("#design").hide();
            return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
        };
    })();
}]);