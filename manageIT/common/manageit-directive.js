'use strict';
manageitModule.directive('onlyNumber0999', [function () {
    // alert('onlyNumber0999')
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var pattern = /[^0-9-]/g;
            function fromUser(text) {
                if (!text)
                    return text;
                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);
manageitModule.directive('expandcollapse', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attributes) {
            scope.divid = scope.$id;
            var getElement = function (id) {
                var element = angular.element(document.getElementById(id));
                return element;
            }
            scope.expandcollapse = function (id, url, nestedMenu) {
                var elementId = id;
                var myEl = angular.element(document.querySelector('#' + elementId));
                var prevel = angular.element(myEl.prev());
                if (myEl[0].className == 'collapse') {
                    prevel.addClass('seperator');
                }
                else {
                    prevel.removeClass('seperator');
                }
                scope.loadDetails(url, nestedMenu);
            }
        }
    }
});

manageitModule.directive('onlyNumber1999', [function () {
    //alert('onlyNumber1999')
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var pattern = /[^1-9-]/g;
            function fromUser(text) {
                if (!text)
                    return text;
                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);

manageitModule.directive('allowPattern', [allowPatternDirective]);
function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function (tElement, tAttrs) {
            return function (scope, element, attrs) {
                element.bind("keypress", function (event) {
                    var keyCode = event.which || event.keyCode;
                    var keyCodeChar = String.fromCharCode(keyCode);

                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                        event.preventDefault();
                        return false;
                    }
                });
            };
        }
    };
}

manageitModule.directive('attrName', [function () {
    //alert('attrName')
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var pattern = /^[A-Za-z0-9]{^1,64}/g;
            function fromUser(text) {
                if (!text)
                    return text;
                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);

manageitModule.directive('numbersCharacters', function () {
    return {
        require: "ngModel",
        link: function (scope, elm, attrs, ctrl) {
            var regex = /^[A-Za-z0-9]{1,32}$/;
            var validator = function (value) {
                ctrl.$setValidity('numbersCharacters', regex.test(value));
                return value;
            };

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.unshift(validator);
        }
    };
});

manageitModule.directive('attrIdentifier', [function () {
    //alert('attrIdentifier')
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var pattern = / /g;
            function fromUser(text) {
                if (!text)
                    return text;
                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);

manageitModule.directive('attrDescription', [function () {
    // alert('attrDescription')
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var pattern = / /g;
            function fromUser(text) {
                if (!text)
                    return text;
                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);

manageitModule.directive('decimalDisplayPrice', [function () {
    // alert('decimalDisplayPrice')
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var pattern = / /g;
            function fromUser(text) {
                if (!text)
                    return text;
                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);

manageitModule.directive('ltRtTrim', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var pattern = /^\s+|\s+$/gm;
            function fromUser(text) {
                if (!text)
                    return text;
                var transformedInput = text.replace(pattern, '');
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
}]);

manageitModule.directive('basicProperties', function() {
    return {
        restrict: 'E',
        scope: {
            currentScope: '=attributeScope',
            deriveIdentifier: '=',
            isSingularlyUniques: '=',
            uniqueGroup: '=',
            uniqueGroupCheck: '=',
            multiplesValuesCheckedChanged: '=',
            deriveIdentifierFromId: '=',
            clearUniqueGroupValues: '='
        },
        templateUrl: '/manageIT/attribute/partials/basicProperties.html'
    };
});

manageitModule.directive('treeMultiSelect', function () {

    var controller = ['$scope', function ($scope) {

        $scope.toggleChildren = function() {
            var thisNode = $(event.target);

            var isExpanded = thisNode.hasClass("fa-chevron-down");
            if (isExpanded) {
                thisNode.removeClass("fa-chevron-down");
                thisNode.addClass("fa-chevron-right");
            }
            else {
                thisNode.removeClass("fa-chevron-right");
                thisNode.addClass("fa-chevron-down");
            }

            var parentNode = thisNode.parent().parent();
            if (parentNode) {
                if (!thisNode.attr("active") || thisNode.attr("active") == "true") {
                    parentNode.children('ul').css("display", "none");
                    thisNode.attr("active", "false");
                }
                else {
                    parentNode.children('ul').css("display", "");
                    thisNode.attr("active", "true");
                }
            }
        };

        $scope.getClonedId = function(id, getOriginal) {
            var newId = id;

            if (id.indexOf('_') >= 0) {
                var idsArray = id.split('_');
                var count = idsArray.length;
                for (var i = 0; i < count; ++i) {
                    if (i == 0) {
                        newId = getOriginal ? "l" : "r";
                    }
                    else {
                        newId = newId + "_" + idsArray[i];
                    }
                }
            }

            return newId;
        }

        $scope.cloneItems = function() {
            var leftOptions = $("#" + $scope.leftSelectId).children("ul");
            var rightOptions = leftOptions.clone();

            //Attach the toggle event handlers to the cloned nodes
            var parentNodes = rightOptions.find(".toggle-child");
            parentNodes.unbind('click');
            parentNodes.click($scope.toggleChildren);

            //Find all Nodes and update the Ids
            var allNodes = rightOptions.find("*[id]");
            var nodesCount = allNodes.length;
            for (var i = 0; i < nodesCount; ++i) {
                var node = allNodes[i];

                node.id = $scope.getClonedId(node.id);
                $(node).attr("ParentControlId", $scope.rightSelectId);
                $(node).css("display", "none");

                var isChildItem = $(node).hasClass("select-option");
                //If we have to modify the selected option Node
                if (isChildItem && $scope.createInnerContent) {
                    var parentNode = $(node).parent();

                    var newNode = document.createDocumentFragment();
                    var liNode = $("<li id='" + node.id + "' class='select-option' ParentControlId='" + $(node).attr('ParentControlId')
                        + "' Value='" + $(node).attr('value') + "' isMultiple='" + $(node).attr('isMultiple') + "' attributeType='" + $(node).attr('attributeType') + "'></li>");

                    //Hide the newNode
                    liNode.css("display", "none");

                    //If the node has children, consider the text of the first child only
                    var itemText = $(node).text();
                    var nodeChildren = $(node).children();
                    if (nodeChildren && nodeChildren.length > 0) {
                        var firstChild = nodeChildren[0];
                        itemText = $(firstChild).text();
                    }

                    var optionNode = $("<div class='option-text'>" + itemText + "</div>");
                    var contentNode = $("<div class='inner-content'></div>");

                    liNode.append(optionNode);
                    liNode.append(contentNode);

                    newNode.appendChild(liNode[0]);

                    var childNode = $scope.createInnerContent(node);
                    contentNode.append(childNode);

                    $(node).after(newNode);
                    $(node).remove();
                }
                if (node.attributes.attributeType.value == "ObjectReferenceAttribute" && node.id.split('_')[1] == "acceptedMapTypes") {
                    node.firstChild.className = "option-text"
                    var contentNode = $("<div class='inner-content'></div>");
                    var childNode = $scope.createInnerContent(node);
                    contentNode.append(childNode);
                    $(node.firstChild).after(contentNode);
                }
            }

            $("#" + $scope.rightSelectId).append(rightOptions);
        };

        $scope.selectDefaultItems = function (selectedValues) {           
            //We have to hide the values from left and show them on the right side
            if (selectedValues && selectedValues.length > 0) {
                var optionsCount = selectedValues.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = selectedValues[i];
                    var optionValue = option.value;
                    var leftItem = $("#" + $scope.leftSelectId).find(".select-option[value='" + optionValue + "']")[0];
                    if (leftItem) {
                        $scope.selectItem(leftItem);
                    }
                    if ($scope.isTextChanged(optionValue, option.label)) {
                        $scope.changeSelectedItemText(optionValue, option.label);
                    }
                }
            }
        };

        $scope.isItemVisible = function(item) {
            //If diplay value is not 'none', then it means the child item is visible
            return ($(item).css("display") != 'none');
        }

        $scope.checkIfChildrenItemExists = function(parentId) {
            var hasChildItems = false;
            var childOptiions = $("#" + parentId).find(".select-option");
            if (childOptiions && childOptiions.length > 0) {
                var itemsCount = childOptiions.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var item = childOptiions[i];
                    //If diplay value is not 'none', then it means the child item is visible
                    if ($scope.isItemVisible(item)) {
                        hasChildItems = true;
                    }
                }
            }
            return hasChildItems;
        }

        $scope.getParentId = function(childId) {
            return childId.substr(0, childId.lastIndexOf("_"));
        }

        $scope.selectItems = function () {
            $scope.$emit('updateform', true);
            var selectedItems = $("#" + $scope.leftSelectId).find(".select-option." + $scope.selectedClass);
            if (selectedItems && selectedItems.length > 0) {
                var itemsCount = selectedItems.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var existingNode = selectedItems[i];
                    $scope.selectItem(existingNode);

                    var itemValue = $(existingNode).attr("value");
                    var isMultiple = $(existingNode).attr("isMultiple");
                    var attributeType = $(existingNode).attr("attributeType");
                    if (!$scope.selectedValues) {
                        $scope.selectedValues = [];
                    }

                    var itemChildren = $(existingNode).children();
                    var itemText = $(existingNode).text();
                    if (itemChildren && itemChildren.length > 0) {
                        itemText = $(itemChildren[0]).text();
                    }

                    var itemIndex = -1;
                    var optionsCount = $scope.selectedValues.length;
                    for (var j = 0; j < optionsCount; ++j) {
                        var option = $scope.selectedValues[j];
                        if (option.value === itemValue) {
                            itemIndex = j;
                            break;
                        }
                    }

                    //If item doesn't exist, then push the selected option into the selectedValues
                    if (itemIndex < 0) {                        
                        if ($scope.controlId == "acceptedMapTypes" && $(existingNode.parentElement.parentElement).attr('attributeType') == "ObjectReferenceAttribute") {
                            var parentIndex = -1;
                            for (var p = 0; p < $scope.selectedValues.length; p++) {
                                if ($scope.selectedValues[p].value == $(existingNode.parentElement.parentElement).attr('value')) {
                                    parentIndex = p;
                                    break;
                                }
                            }
                            if (parentIndex < 0) {
                                $scope.selectedValues.push({
                                    value: $(existingNode.parentElement.parentElement).attr('value'),
                                    label: $(existingNode.parentElement.parentElement.children[0]).text(),
                                    isMultiple: $(existingNode.parentElement.parentElement).attr('isMultiple'),
                                    attributeType: $(existingNode.parentElement.parentElement).attr('attributeType')
                                });
                            }
                        }
                        $scope.selectedValues.push({
                            value: itemValue,
                            label: itemText,
                            isMultiple: isMultiple,
                            attributeType: attributeType
                        });
                    }

                    
                }
            }
        };

        $scope.selectItem = function(item) {
            var newId = $scope.getClonedId(item.id);
            var leftParentId = $scope.getParentId(item.id);
            var rightParentId = $scope.getParentId(newId);

            //Hide the item & its parent on the left side
            $("#" + item.id).removeClass($scope.selectedClass).css("display", "none");
            //If there are no items in the left side for the parent, hide the parent
            $scope.showItemWithParent(item.id, true, false);

            //Show the item & its parent on the right side
            $("#" + newId).css("display", "");
            $scope.showItemWithParent(newId, false, true);
        }

        $scope.deSelectItems = function () {
            $scope.$emit('updateform', true);
            var selectedItems = $("#" + $scope.rightSelectId).find(".select-option." + $scope.selectedClass);
            if (selectedItems && selectedItems.length > 0) {
                var itemsCount = selectedItems.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var existingNode = selectedItems[i];
                    $scope.deSelectItem(existingNode);

                    var itemValue = $(existingNode).attr("value");
                    if (!$scope.selectedValues) {
                        $scope.selectedValues = [];
                    }

                    var itemIndex = -1;
                    var optionsCount = $scope.selectedValues.length;
                    for (var j = 0; j < optionsCount; ++j) {
                        var option = $scope.selectedValues[j];
                        if (option.value === itemValue) {
                            itemIndex = j;
                            break;
                        }
                    }

                    if (itemIndex >= 0) {
                        $scope.selectedValues.splice(itemIndex, 1);
                        if ($scope.controlId == "acceptedMapTypes" && $(existingNode.parentElement.parentElement.children[1]).children.length==1 && $(existingNode.parentElement.parentElement).attr('attributeType') == "ObjectReferenceAttribute") {
                            var parentIndex = -1;
                            for (var p = 0; p < $scope.selectedValues.length; p++) {
                                if ($scope.selectedValues[p].value == $(existingNode.parentElement.parentElement).attr('value')) {
                                    parentIndex = p;
                                    break;
                                }
                            }
                            if (parentIndex >= 0) {
                                $scope.selectedValues.splice(parentIndex, p);
                            }
                        }
                    }
                }
                if ($scope.selectedValues.length == 0 && ($scope.controlId == "objectContentTypes"||$scope.controlId=="imageContentTypes"||$scope.controlId=="docContentTypes")) {
                    $scope.$emit('updatesearch', $scope.selectedValues);
                }
            }
        };

        $scope.deSelectItem = function(item) {
            var newId = $scope.getClonedId(item.id, true);
            var rightParentId = $scope.getParentId(item.id);
            var leftParentId = $scope.getParentId(newId);
            if ($scope.controlId == "objectSearchOptions" || $scope.controlId == "imageSearchOptions")
                $('#' + item.id + ' .option-text').html($("#" + newId + " .option-text").text());
            else
                $('#' + item.id + ' .option-text').html($("#" + newId ).text());

            //Hide the item & its parent on the right side
            $("#" + item.id).removeClass($scope.selectedClass).css("display", "none");
            //If there are no items in the right side for the parent, hide the parent
            $scope.showItemWithParent(item.id, false, false);

            //Show the item & its parent on the left side
            $("#" + newId).css("display", "");
            $scope.showItemWithParent(newId, true, true);
        }

        $scope.showItemWithParent = function (itemId, isLeft, isShow) {
            var cssDisplayValue = isShow ? "" : "none";
            var baseId = isLeft ? "l_" : "r_";
            var baseItemId = baseId + $scope.controlId;

            var parentId = $scope.getParentId(itemId);
            if (parentId === baseItemId || parentId === itemId) {
                return;
            }
            else {
                if ($scope.checkIfChildrenItemExists(parentId) === isShow) {
                    $("#" + parentId).css("display", cssDisplayValue);
                }
                $scope.showItemWithParent(parentId, isLeft, isShow);
            }
        };

        $scope.getSelectedValues = function() {
            var selectedValues = [];

            var selectedItems = $("#" + $scope.rightSelectId).find(".select-option");
            if (selectedItems && selectedItems.length > 0) {
                var optionsCount = selectedItems.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var item = selectedItems[i];
                    //If item is visible, then push the value
                    if ($scope.isItemVisible(item)) {
                        selectedValues.push(item.attr("value"));
                    }
                }
            }

            return selectedValues;
        }

        $scope.selectedClass = "selected";
        $scope.leftSelectId = $scope.controlId + "_left";
        $scope.rightSelectId = $scope.controlId + "_right";

        $scope.loadControl = function (data, selectedValues,attrType) {
            //Save the values
            if (data) {
                $scope.completeOptionsList = data;
            }
            if (selectedValues) {
                $scope.selectedValues = selectedValues;
            }

            //Create the Tree Control
            $scope.createTreeControl(data,attrType);

            //Clone the Tree Control and create the right section
            $scope.cloneItems();

            //Set the default selected items
            var selectedOptions = (selectedValues) ? selectedValues : $scope.selectedValues;
            $scope.selectDefaultItems(selectedOptions);

            //Attach the event handlers for the items
            $scope.attachOnItemClick();
        }

        $scope.createTreeControl = function (data,attrType) {
            var options = (data && data.length > 0) ? data : $scope.completeOptionsList;
            if (options && options.length > 0) {
                var documentFragement = document.createDocumentFragment();

                var ulNode = $("<ul></ul>");

                var optionsCount = options.length;
                for (var i = 0 ; i < optionsCount; ++i) {
                    var option = options[i];
                    var itemId = "l_" + $scope.controlId + "_" + (i + 1);

                    if (option) {
                        $scope.parentNode = true;
                        $scope.loadOption(option, itemId, ulNode,attrType);
                    }
                }

                documentFragement.appendChild(ulNode[0]);

                //clear the elements and then append the document fragement
                $("#" + $scope.leftSelectId).empty();
                $("#" + $scope.rightSelectId).empty();

                $("#" + $scope.leftSelectId).append(documentFragement);

                //Attach the toggle event handlers
                var parentNodes = $("#" + $scope.leftSelectId).find(".toggle-child");
                parentNodes.unbind('click');
                parentNodes.click($scope.toggleChildren);
            }
        };

        $scope.loadOption = function (option, itemId, parentNode,attrType) {
            var children = [];
            if(option.children)
            children = option.children;

            var itemText = option.label;
            var itemValue = option.value;
            var itemType = option.type;
            var isAllowMultiple = option.isAllowMultiple;
          
            var headingNode = "";

            if ($scope.parentNode) {
                //Create the Heading Node
                headingNode = $("<div class='text-only' attributeType='" + option.attributeType + "'><i class='fa fa-chevron-down toggle-child'></i>" + itemText + "</div>");
            }

            if ((children && children.length > 0)) {

                if (attrType != "Object" && !$scope.parentNode) {
                    //Create the parent Node
                    var immediateParentNode = $("<li id='" + itemId + "' value='" + itemValue + "' isMultiple='" + isAllowMultiple + "' attributeType='" + option.attributeType + "'></li>");

                    //Create the Heading Node
                    headingNode = $("<div class='text-only' attributeType='" + option.attributeType + "'><i class='fa fa-chevron-down toggle-child'></i>" + itemText + "</div>");

                    immediateParentNode.append(headingNode);
                    var nestedNode = $("<ul class='inner-level'></ul>");

                    var childrenCount = children.length;
                    for (var j = 0 ; j < childrenCount; ++j) {
                        var child = children[j];
                        var childItemId = itemId + "_" + (j + 1);

                        //Call this recursively to check for children
                        if (child)
                            $scope.loadOption(child, childItemId, nestedNode, attrType);
                    }
                }
                else {
                    //Create the parent Node
                    var immediateParentNode = $("<li id='" + itemId + "' value='" + itemValue + "' isMultiple='" + isAllowMultiple + "' attributeType='" + option.attributeType + "'></li>");

                    if (!$scope.parentNode) {
                        //Create the Heading Node
                        headingNode = $("<div class='text-only' attributeType='" + option.attributeType + "'><i class='fa fa-chevron-down toggle-child'></i>" + itemText + "</div>");
                    }
                    immediateParentNode.append(headingNode);
                    var nestedNode = $("<ul class='inner-level'></ul>");

                    var childrenCount = children.length;
                    for (var j = 0 ; j < childrenCount; ++j) {
                        var child = children[j];
                        var childItemId = itemId + "_" + (j + 1);
                        $scope.parentNode = false;
                        //Call this recursively to check for children
                        if (child) {
                            $scope.loadOption(child, childItemId, nestedNode, attrType);
                        }
                    }
                }

                immediateParentNode.append(nestedNode);

                //Append Parent to the UL
                parentNode.append(immediateParentNode);
            }
            else {
                //Create the Leaf Node
                var leafNode = null;
                if (itemType) {
                    leafNode = $("<li id='" + itemId + "' class='select-option' ParentControlId='" + $scope.leftSelectId
                        + "' Value='" + itemValue + "' isMultiple='" + isAllowMultiple + "' attributeType='" + option.attributeType + "'></li>");

                    var optionNode = $("<div class='option-text'>" + itemText + "</div>");
                    var typeNode = $("<div class='type-content'>" + itemType + "</div>");

                    leafNode.append(optionNode);
                    leafNode.append(typeNode);
                }
                else {
                    leafNode = $("<li id='" + itemId + "' class='select-option text-only' value='" + itemValue
                                        + "' ParentControlId='" + $scope.leftSelectId + "' isMultiple='" + isAllowMultiple + "' attributeType='" + option.attributeType + "'>" + itemText + "</li>");
                }

                //Append to the ParentNode
                parentNode.append(leafNode);
            }
        };

        $scope.attachOnItemClick = function () {
            var options = $("#" + $scope.controlId + " .select-option");
            if (!options || options.length == 0) {
                options = $(".select-option");
            }
            options.unbind('click');
            options.click(function (eventObj) {

                //If the Ctrl key is not pressed, then clear the previous selections
                if (!eventObj.ctrlKey) {
                    //Remove the selected class from the entire control list
                    var selectListId = $(this).attr('ParentControlId');
                    if (selectListId) {
                        $("#" + selectListId).find(".select-option").removeClass($scope.selectedClass);
                    }
                }

                //Toggle the selection on the clicked node
                var isAlreadySelected = $(this).hasClass($scope.selectedClass);
                if (isAlreadySelected) {
                    $(this).removeClass($scope.selectedClass);
                }
                else {
                    $(this).addClass($scope.selectedClass);
                }
            });
        };

        $scope.isTextChanged = function (value, newText) {
            var allOptions = $scope.completeOptionsList;

            if (allOptions && allOptions.length > 0) {
                var optionsCount = allOptions.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = allOptions[i];
                    if ($scope.checkIfTextHasChanged(option, value, newText)) {
                        return true;
                    }
                }
            }

            return false;
        };

        $scope.checkIfTextHasChanged = function (option, value, newText) {
            var isTextChanged = false;
            if (option) {
                var children = option.children;
                if (children && children.length > 0) {
                    var childrenCount = children.length;
                    for (var i = 0; i < childrenCount; ++i) {
                        isTextChanged = $scope.checkIfTextHasChanged(children[i], value, newText);
                        if (isTextChanged) {
                            break;
                        }
                    }
                }
                else if (option.value == value && option.label != newText) {
                    isTextChanged = true;
                }
            }
            return isTextChanged;
        }

        $scope.changeSelectedItemText = function (value, newText) {
            var selectedDOMNode = $("#" + $scope.rightSelectId).find("*[value='" + value + "']");
            if (selectedDOMNode && selectedDOMNode.length > 0) {
                var textNode = selectedDOMNode;

                var children = selectedDOMNode.children();
                if (children && children.length > 0) {
                    textNode = $(children[0]);
                }

                if (textNode) {
                    textNode.html(newText);
                }

                //update the text in the selected items
                var selectedOptions = $scope.selectedValues;
                var optionsCount = selectedOptions ? selectedOptions.length : 0;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = selectedOptions[i];
                    if (option.value == value) {
                        $scope.selectedValues[i].label = newText;
                    }
                }
            }
        };

        $scope.$on("loadDualMultiSelectControl#" + $scope.controlId, function (event, data, selectedValues,attrType) {
            $scope.loadControl(data, selectedValues,attrType);
        });
        $scope.$on("deselectItem#" + $scope.controlId, function (event, item) {
            $scope.deSelectItem(item);
        });
        $scope.$on("changeSelectedItemText#" + $scope.controlId, function (event, value, newText) {
            $scope.changeSelectedItemText(value, newText);
        });

    }];

    return {
        restrict: 'E',
        scope: {
            controlId: '@',
            completeOptionsList: '=optionsList',
            selectedValues: '=selectedValues',
            createInnerContent: '=createContentNode'
        },
        replace: true,
        controller: controller,
        templateUrl: '/manageIT/common/partials/treeMultiSelect.html'
    };
});
manageitModule.directive('treeMultiSelectDrag', function () {

    var controller = ['$scope', function ($scope) {

        $scope.toggleChildren = function () {
            var thisNode = $(event.target);

            var isExpanded = thisNode.hasClass("fa-chevron-down");
            if (isExpanded) {
                thisNode.removeClass("fa-chevron-down");
                thisNode.addClass("fa-chevron-right");
            }
            else {
                thisNode.removeClass("fa-chevron-right");
                thisNode.addClass("fa-chevron-down");
            }

            var parentNode = thisNode.parent().parent();
            if (parentNode) {
                if (!thisNode.attr("active") || thisNode.attr("active") == "true") {
                    parentNode.children('ul').css("display", "none");
                    thisNode.attr("active", "false");
                }
                else {
                    parentNode.children('ul').css("display", "");
                    thisNode.attr("active", "true");
                }
            }
        };

        $scope.getClonedId = function (id, getOriginal) {
            var newId = id;

            if (id.indexOf('_') >= 0) {
                var idsArray = id.split('_');
                var count = idsArray.length;
                for (var i = 0; i < count; ++i) {
                    if (i == 0) {
                        newId = getOriginal ? "l" : "r";
                    }
                    else {
                        newId = newId + "_" + idsArray[i];
                    }
                }
            }

            return newId;
        }
        var j = 0;
        $scope.classcusright = "";
        $scope.cloneItems = function () {
            //alert("tre");
            var leftOptions = $("#" + $scope.leftSelectId).children("ul");
            var rightOptions = leftOptions.clone();

            //Attach the toggle event handlers to the cloned nodes
            var parentNodes = rightOptions.find(".toggle-child");
            parentNodes.unbind('click');
            parentNodes.click($scope.toggleChildren);

            //Find all Nodes and update the Ids
            var allNodes = rightOptions.find("*[id]");
            var nodesCount = allNodes.length;
            for (var i = 0; i < nodesCount; ++i) {
                var node = allNodes[i];

                node.id = $scope.getClonedId(node.id);
                $(node).attr("ParentControlId", $scope.rightSelectId);
                $(node).css("display", "none");

                var isChildItem = $(node).hasClass("select-option");
                //If we have to modify the selected option Node
                if (isChildItem && $scope.createInnerContent) {
                    var parentNode = $(node).parent();
                    var newNode = document.createDocumentFragment();                  
                    var value1 = $(node).attr('value');
                    
                    if (value1 == 'null') {
                        j = j + 1;
                        $scope.classcusright = "ownright_" + j;
                        var liNode = $("<li id='" + node.id + "' class='select-option header-li " + $scope.classcusright + "'  style='cursor:not-allowed' ParentControlId='" + $(node).attr('ParentControlId')
                       + "' Value='" + $(node).attr('value') + "'></li>");
                    } else {
                        var liNode = $("<li id='" + node.id + "' class='select-option subr " + $scope.classcusright + "' ParentControlId='" + $(node).attr('ParentControlId')
                       + "' Value='" + $(node).attr('value') + "'></li>");
                       
                    }
                    liNode.css("display", "none");

                    //Hide the newNode
                    

                    

                    //If the node has children, consider the text of the first child only
                    var itemText = $(node).text();
                    var nodeChildren = $(node).children();
                    if (nodeChildren && nodeChildren.length > 0) {
                        var firstChild = nodeChildren[0];
                        itemText = $(firstChild).text();
                    }

                    var optionNode = $("<div class='option-text'>" + itemText + "</div>");
                    var contentNode = $("<div class='inner-content'></div>");

                    liNode.append(optionNode);
                    liNode.append(contentNode);

                    newNode.appendChild(liNode[0]);

                    var childNode = $scope.createInnerContent(node);
                    contentNode.append(childNode);

                    $(node).after(newNode);
                    $(node).remove();
                }
            }

            $("#" + $scope.rightSelectId).append(rightOptions);
        };

        $scope.selectDefaultItems = function (selectedValues) {
            //We have to hide the values from left and show them on the right side
            if (selectedValues && selectedValues.length > 0) {
                var optionsCount = selectedValues.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = selectedValues[i];
                    var optionValue = option.value;
                    var leftItem = $("#" + $scope.leftSelectId).find(".select-option[value='" + optionValue + "']")[0];
                    if (leftItem) {
                        $scope.selectItem(leftItem);
                    }
                    if ($scope.isTextChanged(optionValue, option.label)) {
                        $scope.changeSelectedItemText(optionValue, option.label);
                    }
                }
            }
        };

        $scope.isItemVisible = function (item) {
            //If diplay value is not 'none', then it means the child item is visible
            return ($(item).css("display") != 'none');
        }

        $scope.checkIfChildrenItemExists = function (parentId) {
            var hasChildItems = false;
            var childOptiions = $("#" + parentId).find(".select-option");
            if (childOptiions && childOptiions.length > 0) {
                var itemsCount = childOptiions.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var item = childOptiions[i];
                    //If diplay value is not 'none', then it means the child item is visible
                    if ($scope.isItemVisible(item)) {
                        hasChildItems = true;
                    }
                }
            }
            return hasChildItems;
        }

        $scope.getParentId = function (childId) {
            return childId.substr(0, childId.lastIndexOf("_"));
        }

        $scope.selectItems = function () {
            var selectedItems = $("#" + $scope.leftSelectId).find(".select-option." + $scope.selectedClass);
            if (selectedItems && selectedItems.length > 0) {
                var itemsCount = selectedItems.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var existingNode = selectedItems[i];
                    $scope.selectItem(existingNode);

                    var itemValue = $(existingNode).attr("value");
                    if (!$scope.selectedValues) {
                        $scope.selectedValues = [];
                    }

                    var itemChildren = $(existingNode).children();
                    var itemText = $(existingNode).text();
                    if (itemChildren && itemChildren.length > 0) {
                        itemText = $(itemChildren[0]).text();
                    }

                    var itemIndex = -1;
                    var optionsCount = $scope.selectedValues.length;
                    for (var j = 0; j < optionsCount; ++j) {
                        var option = $scope.selectedValues[j];
                        if (option.value === itemValue) {
                            itemIndex = j;
                            break;
                        }
                    }

                    //If item doesn't exist, then push the selected option into the selectedValues
                    if (itemIndex < 0) {
                        $scope.selectedValues.push({
                            value: itemValue,
                            label: itemText
                        });
                    }
                }
            }
        };

        $scope.selectItem = function (item) {
            var newId = $scope.getClonedId(item.id);
            var leftParentId = $scope.getParentId(item.id);
            var rightParentId = $scope.getParentId(newId);
            //alert($scope.attachclass);
            //alert($('.'+$scope.attachclass).length);
            //Hide the item & its parent on the left side
            if ($("#" + item.id).hasClass('header-li') && $('.' + $scope.attachclass+':visible').length != 2 ) {
                $("#" + item.id).removeClass($scope.selectedClass).css("display", "block");
            }
            else {
                $("#" + item.id).removeClass($scope.selectedClass).css("display", "none");
            }
            //If there are no items in the left side for the parent, hide the parent
            $scope.showItemWithParent(item.id, true, false);

            //Show the item & its parent on the right side
            $("#" + newId).css("display", "");
            $scope.showItemWithParent(newId, false, true);
        }

        $scope.deSelectItems = function () {
            var selectedItems = $("#" + $scope.rightSelectId).find(".select-option." + $scope.selectedClass);
            if (selectedItems && selectedItems.length > 0) {
                var itemsCount = selectedItems.length;
                for (var i = 0; i < itemsCount; ++i) {
                    var existingNode = selectedItems[i];
                    $scope.deSelectItem(existingNode);

                    var itemValue = $(existingNode).attr("value");
                    if (!$scope.selectedValues) {
                        $scope.selectedValues = [];
                    }

                    var itemIndex = -1;
                    var optionsCount = $scope.selectedValues.length;
                    for (var j = 0; j < optionsCount; ++j) {
                        var option = $scope.selectedValues[j];
                        if (option.value === itemValue) {
                            itemIndex = j;
                            break;
                        }
                    }

                    if (itemIndex >= 0) {
                        $scope.selectedValues.splice(itemIndex, 1);
                    }
                }
            }
        };

        $scope.deSelectItem = function (item) {
            var newId = $scope.getClonedId(item.id, true);
            var rightParentId = $scope.getParentId(item.id);
            var leftParentId = $scope.getParentId(newId);

            $('#' + item.id + ' .option-text').html($("#" + newId).text());

            //Hide the item & its parent on the right side
            //$("#" + item.id).removeClass($scope.selectedClass).css("display", "none");

            if ($("#" + item.id).hasClass('header-li') && $('.' + $scope.attachclassright + ':visible').length != 2) {
                $("#" + item.id).removeClass($scope.selectedClass).css("display", "block");
            }
            else {
                $("#" + item.id).removeClass($scope.selectedClass).css("display", "none");
            }

            //If there are no items in the right side for the parent, hide the parent
            $scope.showItemWithParent(item.id, false, false);

            //Show the item & its parent on the left side
            $("#" + newId).css("display", "");
            $scope.showItemWithParent(newId, true, true);
        }

        $scope.showItemWithParent = function (itemId, isLeft, isShow) {
            var cssDisplayValue = isShow ? "" : "none";
            var baseId = isLeft ? "l_" : "r_";
            var baseItemId = baseId + $scope.controlId;

            var parentId = $scope.getParentId(itemId);
            if (parentId === baseItemId || parentId === itemId) {
                return;
            }
            else {
                if ($scope.checkIfChildrenItemExists(parentId) === isShow) {
                    $("#" + parentId).css("display", cssDisplayValue);
                }
                $scope.showItemWithParent(parentId, isLeft, isShow);
            }
        };

        $scope.getSelectedValues = function () {
            var selectedValues = [];

            var selectedItems = $("#" + $scope.rightSelectId).find(".select-option");
            if (selectedItems && selectedItems.length > 0) {
                var optionsCount = selectedItems.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var item = selectedItems[i];
                    //If item is visible, then push the value
                    if ($scope.isItemVisible(item)) {
                        selectedValues.push(item.attr("value"));
                    }
                }
            }

            return selectedValues;
        }

        $scope.selectedClass = "selected";
        $scope.leftSelectId = $scope.controlId + "_left";
        $scope.rightSelectId = $scope.controlId + "_right";

        $scope.loadControl = function (data, selectedValues) {
            //Save the values
            if (data) {
                $scope.completeOptionsList = data;
            }
            if (selectedValues) {
                $scope.selectedValues = selectedValues;
            }

            //Create the Tree Control
            $scope.createTreeControl(data);

            //Clone the Tree Control and create the right section
            $scope.cloneItems();

            //Set the default selected items
            var selectedOptions = (selectedValues) ? selectedValues : $scope.selectedValues;
            $scope.selectDefaultItems(selectedOptions);

            //Attach the event handlers for the items
            $scope.attachOnItemClick();
        }

        $scope.createTreeControl = function (data) {
            var options = (data && data.length > 0) ? data : $scope.completeOptionsList;
            if (options && options.length > 0) {
                var documentFragement = document.createDocumentFragment();

                var ulNode = $("<ul></ul>");

                var optionsCount = options.length;
                for (var i = 0 ; i < optionsCount; ++i) {
                    var option = options[i];
                    var itemId = "l_" + $scope.controlId + "_" + (i + 1);

                    if (option) {
                        $scope.parentNode = true;
                        $scope.loadOption(option, itemId, ulNode);
                    }
                }

                documentFragement.appendChild(ulNode[0]);

                //clear the elements and then append the document fragement
                $("#" + $scope.leftSelectId).empty();
                $("#" + $scope.rightSelectId).empty();

                $("#" + $scope.leftSelectId).append(documentFragement);

                //Attach the toggle event handlers
                var parentNodes = $("#" + $scope.leftSelectId).find(".toggle-child");
                parentNodes.unbind('click');
                parentNodes.click($scope.toggleChildren);
            }
        };
        var i = 0;
        $scope.classcus = "";
        $scope.loadOption = function (option, itemId, parentNode) {
            console.log("option");
            console.log(option);

            var children = option.children;

            var itemText = option.label;
            var itemValue = option.value;
            var itemType = option.type;
            var headingNode = "";

            if ($scope.parentNode) {
                //Create the Heading Node
                headingNode = $("<div class='text-only'><i class='fa fa-chevron-down toggle-child'></i>" + itemText + "</div>");
            }
            if (children && children.length > 0) {
                //Create the parent Node
                var immediateParentNode = $("<li id='" + itemId + "' value='" + itemValue + "'></li>");

                if ($scope.parentNode) {
                    //Create the Heading Node
                    headingNode = $("<div class='text-only'><i class='fa fa-chevron-down toggle-child'></i>" + itemText + "</div>");
                }

                immediateParentNode.append(headingNode);
                var nestedNode = $("<ul class='inner-level'></ul>");

                var childrenCount = children.length;
                for (var j = 0 ; j < childrenCount; ++j) {
                    var child = children[j];
                    var childItemId = itemId + "_" + (j + 1);

                    $scope.parentNode = false;
                    //Call this recursively to check for children
                    $scope.loadOption(child, childItemId, nestedNode);
                }

                immediateParentNode.append(nestedNode);

                //Append Parent to the UL
                parentNode.append(immediateParentNode);
            }
            else {
                //Create the Leaf Node
                var leafNode = null;
                if (itemType) {
                    leafNode = $("<li id='" + itemId + "' class='select-option' ParentControlId='" + $scope.leftSelectId
                        + "' Value='" + itemValue + "'></li>");
                    var optionNode = $("<div class='option-text'>" + itemText + "</div>");
                    var typeNode = $("<div class='type-content'>" + itemType + "</div>");
                    leafNode.append(optionNode);
                    leafNode.append(typeNode);
                }
                else {

                    if (itemValue == null) {
                        i = i + 1;
                        $scope.classcus = "own_" + i;
                        leafNode = $("<li id='" + itemId + "' class='header-li select-option text-only " + $scope.classcus + "' style='cursor:not-allowed' value='" + itemValue
                                        + "' ParentControlId='" + $scope.leftSelectId + "'>" + itemText + "</li>");
                    }
                    else {
                        leafNode = $("<li id='" + itemId + "' class='select-option text-only " + $scope.classcus + "' value='" + itemValue
                                       + "' ParentControlId='" + $scope.leftSelectId + "'>" + itemText + "</li>");
                    }
                   
                }

                //Append to the ParentNode
                parentNode.append(leafNode);
            }
        };
        $scope.attachclass = "";
        $scope.attachclassright = "";
        $scope.attachOnItemClick = function () {
           
            var options = $("#" + $scope.controlId + " .select-option");
            if (!options || options.length == 0) {
                options = $(".select-option");
            }
            options.unbind('click');
            options.click(function (eventObj) {

                //If the Ctrl key is not pressed, then clear the previous selections
                if (!eventObj.ctrlKey) {
                    //Remove the selected class from the entire control list
                    var selectListId = $(this).attr('ParentControlId');
                    if (selectListId) {
                        $("#" + selectListId).find(".select-option").removeClass($scope.selectedClass);
                    }
                }

                //Toggle the selection on the clicked node
                var isAlreadySelected = $(this).hasClass($scope.selectedClass);
                if (isAlreadySelected) {
                    $(this).removeClass($scope.selectedClass);
                }
                else {
                    
                    var str = $(this).attr('class').split(" ");
                    var spl = str[str.length - 1].split("_");
                    if (spl[0]=="own") {
                        $scope.attachclass = str[str.length - 1];
                    } else if (spl[0] == "ownright") {
                    $scope.attachclassright = str[str.length - 1];
                }
                    //alert(str[str.length-1]);
                    if (!$(this).hasClass('header-li')) {
                        $(this).addClass($scope.selectedClass);
                       
                    }
                    $(this).prevAll("li.header-li:first").addClass($scope.selectedClass);
                  
                    
                }
            });
        };

        $scope.isTextChanged = function (value, newText) {
            var allOptions = $scope.completeOptionsList;

            if (allOptions && allOptions.length > 0) {
                var optionsCount = allOptions.length;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = allOptions[i];
                    if ($scope.checkIfTextHasChanged(option, value, newText)) {
                        return true;
                    }
                }
            }

            return false;
        };

        $scope.checkIfTextHasChanged = function (option, value, newText) {
            var isTextChanged = false;
            if (option) {
                var children = option.children;
                if (children && children.length > 0) {
                    var childrenCount = children.length;
                    for (var i = 0; i < childrenCount; ++i) {
                        isTextChanged = $scope.checkIfTextHasChanged(children[i], value, newText);
                        if (isTextChanged) {
                            break;
                        }
                    }
                }
                else if (option.value == value && option.label != newText) {
                    isTextChanged = true;
                }
            }
            return isTextChanged;
        }

        $scope.changeSelectedItemText = function (value, newText) {
            var selectedDOMNode = $("#" + $scope.rightSelectId).find("*[value='" + value + "']");
            if (selectedDOMNode && selectedDOMNode.length > 0) {
                var textNode = selectedDOMNode;

                var children = selectedDOMNode.children();
                if (children && children.length > 0) {
                    textNode = $(children[0]);
                }

                if (textNode) {
                    textNode.html(newText);
                }

                //update the text in the selected items
                var selectedOptions = $scope.selectedValues;
                var optionsCount = selectedOptions ? selectedOptions.length : 0;
                for (var i = 0; i < optionsCount; ++i) {
                    var option = selectedOptions[i];
                    if (option.value == value) {
                        $scope.selectedValues[i].label = newText;
                    }
                }
            }
        };

        $scope.$on("loadDualMultiSelectControl#" + $scope.controlId, function (event, data, selectedValues) {
            $scope.loadControl(data, selectedValues);
        });
        $scope.$on("deselectItem#" + $scope.controlId, function (event, item) {
            $scope.deSelectItem(item);
        });
        $scope.$on("changeSelectedItemText#" + $scope.controlId, function (event, value, newText) {
            $scope.changeSelectedItemText(value, newText);
        });

    }];

    return {
        restrict: 'E',
        scope: {
            controlId: '@',
            completeOptionsList: '=optionsList',
            selectedValues: '=selectedValues',
            createInnerContent: '=createContentNode'
        },
        replace: true,
        controller: controller,
        templateUrl: '/manageIT/common/partials/treeMultiSelectDrag.html'
    };
});
manageitModule.directive('focus', function($timeout, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          scope.$watch(attrs.focus, function(newValue, oldValue) {
              if (newValue) { element[0].focus(); }
          });
          element.bind("blur", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=false"); 
              }, 0);
          });
          element.bind("focus", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=true");
              }, 0);
          })
      }
    }
});
manageitModule.directive('focusMe', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.focusMe, function (value) {
                if (value === true) {
                    console.log('value=', value);
                    //$timeout(function() {
                    element[0].focus();
                    scope[attrs.focusMe] = false;
                    //});
                }
            });
        }
    };
});


manageitModule.directive('errorControl', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            currentScope: '=attributeScope'            
        },
        link: function(scope, el, attrs) {
            el.on('click', function(){
                scope.$apply(function () {

                    scope.currentScope.isSuccess = false;
                    scope.currentScope.isError = false;
                    scope.currentScope.isInfo = false;
                    scope.currentScope.isWarning = false;
                    
                });
                console.log(scope);
            });
            $timeout(function () {
               
            }, 5000);
        },       
        templateUrl: '/manageIT/common/partials/errors.html'
    };
});

manageitModule.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
            element.on('change', function (onChangeEvent) {
                var files = onChangeEvent.target.files;              
                var reader = new FileReader();                
                reader.onload = function (onLoadEvent) {                    
                    scope.$apply(function () {
                        fn(scope, { $fileContent: onLoadEvent.target.result });
                        scope.content = onLoadEvent.target.result;                      
                        scope.userinterface.htmlfile = onLoadEvent.target.result;
                        scope.userinterface.htmlfilename = files[0].name;                     
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});
manageitModule.directive('dynamicinterfacetype', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attributes) {          
            scope.enableButton = function (ele) {               
                scope.enablebuttonvalue = ele;
            }
            scope.showTemplate = function (text, type) {
                scope.headertitle = text;
                scope.defaultchecked = true;
                scope.ListuserinterfaceType = type;
                scope.ViewuserinterfaceType = type;
                scope.EdituserinterfaceType = type;
                scope.userinterface.isAnyViewClassification = 0;
            }
        }
    }
});

manageitModule.directive('dynamicsearchinterfacebutton', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attributes) {           
            scope.enablebutton = function (ele) {              
                scope.enablebuttonvalue = ele;
                scope.type = 'Add';
            }
            scope.enablesearchtab = function (eletab) {
                scope.tabvalue = eletab;                
            }
            scope.typeChange = function (type) {
                scope.action = type;
            }
            scope.enableaddsort = function (sorttype) {
                scope.displayaddsort = sorttype;
            }
        }
    }
});

manageitModule.directive('searchlistiteamresult', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attributes) {
            scope.predicate = 'name';
            scope.reverse = true;
            scope.currentPage = 1;
           // scope.numPerPage = 5;
            scope.order = function (predicate) {
                scope.reverse = (scope.predicate === predicate) ? !scope.reverse : false;
                scope.predicate = predicate;
            }
        }
    }
});
