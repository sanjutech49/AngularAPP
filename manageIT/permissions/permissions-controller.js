manageitModule.controller("permissionController", ['$scope', '$rootScope', 'sharedScope', '$filter', 'permissionsService', '$routeParams', 'textAttributeService', 'classificationService', 'administratorService',
    function ($scope, $rootScope, sharedScope, $filter, permissionsService, $routeParams, textAttributeService, classificationService, administratorService) {

        sharedScope.store('permissionController', $scope);
        $scope.errorAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.errors = [];
        
        $scope.permissionTypeId = $routeParams.permissionTypeId;
        $scope.subObjectDecicer = $routeParams.subObjectId;

        $scope.contentAttributes = [];
        $scope.changedPermission = {
            "add": false,
            "addItem": false,
            "delete": false,
            "edit": false,
            "linkItem": false,
            "modify": false,
            "search": false,
            "unLinkItem": false,
            "view": false
        }
        $scope.selectedContentTypeAttributes = [];
       
       /* filter for array comparisions, removing duplicates from array*/
        $scope.containsObject = function (obj, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (angular.equals(list[i].attributeId, obj.attributeId)) {
                    return true;
                }
            }
            return false;
        }
        $scope.checkObject = function (id, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (angular.equals(list[i].attributeId, id)) {
                    return true;
                }
            }
            return false;
        }
        /*filter for check roles, with same id or name which returns unique roles*/
        $scope.containsObjectRoles = function (obj, list) {
            var i;
            if (list != undefined) {
                for (i = 0; i < list.length; i++) {
                    if (angular.equals(list[i].roleId, obj.id)) {
                        return i;
                    }
                }
            }
            return null;
        }

        $scope.containsObjectFormRoles = function (obj, list) {
            var i;
            if (list != undefined) {
                for (i = 0; i < list.length; i++) {
                    if (angular.equals(list[i].id, obj.Id)) {
                        return i;
                    }
                }
            }
            return null;
        }
        /*filter for check classifications, with same id or name, which returns unique classifications*/
        $scope.containsObjectClassifications = function (obj, list) {
            var i;
            if (list != undefined) {
                for (i = 0; i < list.length; i++) {
                    if (angular.equals(list[i].classificationId, obj.id)) {
                        return i;
                    }
                }
            }
            return null;
        }

        $scope.containsObjectFormClassifications = function (obj, list) {
            var i;
            if (list != undefined) {
                for (i = 0; i < list.length; i++) {
                    if (angular.equals(list[i].id, obj.classificationId)) {
                        return i;
                    }
                }
            }
            return null;
        }
       
        /* Which gives all attributes by content type id, those are used to identify the permissions*/
        $scope.getAttributesByContentType = function () {
            if ($routeParams.permissionTypeId == 2) {
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                var  contImgDocLibId = "";
                if(contentType.contentTypeId)
                {
                    contImgDocLibId = contentType.contentTypeId;
                }
                else if(contentType.imageLibraryId)
                {
                    contImgDocLibId =  contentType.imageLibraryId;
                }
            else if(contentType.documentLibraryId)
            {
                contImgDocLibId = contentType.documentLibraryId;
            }
                
                //textAttributeService.Libsquery({ domainId: contentType.domainId, id: contImgDocLibId, attributeType: 'textattribute' })
                textAttributeService.getAllAttributesInLibrary({ domainId: contentType.domainId, contentTypeId: contImgDocLibId, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (details) {
                    $scope.allcontentAttributes = details;
                    $scope.contentAttributesStatus = true;
                    var contentTypeDefaultAttributes = [];
                    var subObjectDefaultAttributes = [];

                    angular.forEach(details, function (value, key) {

                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeDefaultAttributes.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectDefaultAttributes.push(value);
                        }

                    });

                    if ($routeParams.subObjectId == "0") {
                        $scope.contentAttributes = [];
                        $scope.contentAttributes = contentTypeDefaultAttributes;
                    }
                    else {
                        $scope.contentAttributes = subObjectDefaultAttributes;
                    }
                    //if ($scope.contentAttributes.length > 0) {
                    //    $scope.permissionSet.attributes.selectedAttributeId = $scope.contentAttributes[0].attributeId;
                    //    $scope.permissionSet.attributes.selectedAttributeName = $scope.contentAttributes[0].name;
                    //    if ($scope.permissionSet.selectedRoleOrClassification.roleId!=null)
                    //        $scope.getRelatedPermissionsByAttribute($scope.contentAttributes[0].attributeType, $scope.contentAttributes[0].attributeId, $scope.permissionSet.selectedRoleOrClassification.roleId, 1);
                    //    else
                    //        $scope.getRelatedPermissionsByAttribute($scope.contentAttributes[0].attributeType, $scope.contentAttributes[0].attributeId, $scope.permissionSet.selectedRoleOrClassification.classificationId, 1);
                    //}

                }, function (error) {
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.messages.push("Error occured while fetching default attributes. Please try after sometime.");
                });
            }
        };
        $scope.getAttributesByContentType();
        
        $scope.getClassifications = function () {
                $scope.classifications = [];
                var contentTypeClassifications = [];
                var subObjectClassifications = [];
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
                    if (value.subObjectId == null || value.subObjectId == "0") {
                                            contentTypeClassifications.push(value);
                                        }
                                        else {
                                            if (value.subObjectId == $routeParams.subObjectId)
                                                subObjectClassifications.push(value);
                                        }
                  
                   // $scope.contentTypeClassifications.push(obj);
                });
                if ($routeParams.subObjectId == "0") {
                                    $scope.classifications = contentTypeClassifications;
                                }
                                else {
                                    $scope.classifications = subObjectClassifications;
                                }

                    angular.forEach($scope.classifications, function (value, key) {
                        $scope.fillAttributeValue(value.conditions);
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
        /* gives all classifications on content type ID*/
       // $scope.getClassifications = function () {
            //commented here 
         //  if ($routeParams.permissionTypeId != 0) {
                //$scope.classifications = [];
                //if ($scope.allClassifications) {
                //    var contentTypeClassifications = [];
                //    var subObjectClassifications = [];
                //    angular.forEach($scope.allClassifications, function (value, key) {
                //                if (value.subObjectId == null || value.subObjectId == "0") {
                //                    contentTypeClassifications.push(value);
                //                }
                //                else {
                //                    if (value.subObjectId == $routeParams.subObjectId)
                //                        subObjectClassifications.push(value);
                //                }
                //            });

                //            if ($routeParams.subObjectId == "0") {
                //                $scope.classifications = contentTypeClassifications;
                //            }
                //            else {
                //                $scope.classifications = subObjectClassifications;
                //            }

                            //angular.forEach($scope.classifications, function (value, key) {
                            //    $scope.fillAttributeValue(value.conditions);
                            //});
                    //}
             
            //}
       // }
        $scope.getClassifications();
               
        $scope.selectedRoleOrClassification = "";
        /*main function*/
        $scope.getRolesByContentType = function (permissionDecision) {
            //$scope.mainMenuRoles = [];
            $scope.mainMenuRolesWithPermissions = [];
            $scope.mainMenuRolesWithAttributes = [];
            //$scope.mainMenuClassifications = [];
            $scope.mainMenuClassificationsWithPermissions = [];
            $scope.mainMenuClassificationsWithAttributes = [];
            if ($routeParams.permissionTypeId != 0) {
                //if (permissionDecision == 1) {
                //    angular.forEach($scope.mainMenuRoles, function (roleItem) {
                //        if (roleItem.roleId != "0" && roleItem.roleName != "All Users") {

                //        }
                //    })
                //}

                // get roles for all the 3 types with libraries based on id's

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;

                if ($routeParams.subObjectId == 0) {
                    var permissionServiceGetRols = permissionsService.getLibrary({ domainId: contentType.domainId, contentTypeId: $routeParams.contentTypeId });
                }
                else {
                    var permissionServiceGetRols = permissionsService.getSubLibrary({ domainId: contentType.domainId, contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId });
                }
                permissionServiceGetRols.$promise.then(function (response) {
                    $scope.contentTypePermissions = response;
                    $scope.contentPermissions = [];                    
                    //$scope.contentPermissionObjects = [];
                    
                    
                    if (response.$resolved == true && response.length > 0) {
                        angular.forEach(response, function (item) {
                            if ($routeParams.permissionTypeId == 1) {
                                if (item.objects != null) {
                                    if (item.objects.selectedRoles != null) {
                                        //if (item.objects.selectedRoles[0].roleId != "" || item.objects.selectedRoles[0].roleName != "") {
                                        //    $scope.mainMenuRoles.push({ 'roleId': item.objects.selectedRoles[0].roleId, 'roleName': item.objects.selectedRoles[0].roleName });
                                        //    $scope.mainMenuRolesWithPermissions.push({
                                        //        'roleId': item.objects.selectedRoles[0].roleId,
                                        //        'permissionId': item.permissionId,
                                        //        'permissions': {
                                        //            add: item.objects.selectedRoles[0].permission.add,
                                        //            delete: item.objects.selectedRoles[0].permission.delete,
                                        //            edit: item.objects.selectedRoles[0].permission.edit,
                                        //            modify: item.objects.selectedRoles[0].permission.modify,
                                        //            view: item.objects.selectedRoles[0].permission.view,
                                        //            search: item.objects.selectedRoles[0].permission.search
                                        //        }
                                        //    })                                        
                                            angular.forEach(item.objects.selectedRoles, function (role) {
                                                $scope.contentPermissions.push({
                                                    'id': role.roleId,
                                                    'name':role.roleName,
                                                    'permissionId': role.permissionId,
                                                    'contentTypeId': role.contentTypeId,
                                                    'selectedAttributes': role.selectedAttributes,
                                                    'permission': role.permission,
                                                    'type':'role',
                                                    'attrType':false
                                                });
                                            });
                                        //}
                                    }
                                    if (item.objects.selectedClassifications != null) {
                                        //if (item.objects.selectedClassifications[0].classificationId != "" || item.objects.selectedClassifications[0].classificationName != "") {
                                        //    $scope.mainMenuClassifications.push({ 'classificationId': item.objects.selectedClassifications[0].classificationId, 'classificationName': item.objects.selectedClassifications[0].classificationName });
                                        //    $scope.mainMenuClassificationsWithPermissions.push({
                                        //        'classificationId': item.objects.selectedClassifications[0].classificationId,
                                        //        'permissionId': item.permissionId,
                                        //        'permissions': {
                                        //            add: item.objects.selectedClassifications[0].permission.add,
                                        //            delete: item.objects.selectedClassifications[0].permission.delete,
                                        //            edit: item.objects.selectedClassifications[0].permission.edit,
                                        //            modify: item.objects.selectedClassifications[0].permission.modify,
                                        //            view: item.objects.selectedClassifications[0].permission.view,
                                        //            search: item.objects.selectedClassifications[0].permission.search
                                        //        }
                                        //    })
                                        angular.forEach(item.objects.selectedClassifications, function (cls) {
                                                $scope.contentPermissions.push({
                                                    'id': cls.classificationId,
                                                    'name':cls.classificationName,
                                                    'contentTypeId': cls.contentTypeId,
                                                    'selectedAttributes': cls.selectedAttributes,
                                                    'permission': cls.permission,
                                                    'type': 'classification',
                                                    'attrType':false
                                                });
                                            });
                                        //}

                                    }
                                }

                            }
                            if ($routeParams.permissionTypeId == 2) {
                                if (item.attributes != null) {
                                    if (item.attributes.selectedRoles != null) {
                                        //if (item.attributes.selectedRoles[0].selectedAttributes.length > 0) {
                                        //    angular.forEach(item.attributes.selectedRoles[0].selectedAttributes, function (outerItem) {
                                        //        if (outerItem.attributeId != "" || outerItem.attributeName != "") {
                                        //            $scope.mainMenuRoles.push({ 'roleId': item.attributes.selectedRoles[0].roleId, 'roleName': item.attributes.selectedRoles[0].roleName });
                                        //            $scope.mainMenuRolesWithAttributes.push({
                                        //                'roleId': item.attributes.selectedRoles[0].roleId,
                                        //                'attributeId': outerItem.attributeId,
                                        //                'permissionId': item.permissionId,
                                        //                'permissions': {
                                        //                    add: outerItem.permission.add,
                                        //                    delete: outerItem.permission.delete,
                                        //                    edit: outerItem.permission.edit,
                                        //                    modify: outerItem.permission.modify,
                                        //                    view: outerItem.permission.view,
                                        //                    search: outerItem.permission.search,
                                        //                    addItem: outerItem.permission.addItem,
                                        //                    unLinkItem: outerItem.permission.unLinkItem,
                                        //                    linkItem: outerItem.permission.linkItem
                                        //                }
                                        //            })
                                        //        }
                                        //    })
                                        //}                                        
                                        angular.forEach(item.attributes.selectedRoles, function (role) {
                                            if ($scope.containsObjectFormRoles(role, $scope.contentPermissions) == null) {
                                                $scope.contentPermissions.push({
                                                    'id': role.roleId,
                                                    'name': role.roleName,
                                                    'permissionId': role.permissionId,
                                                    'contentTypeId': role.contentTypeId,
                                                    'selectedAttributes': role.selectedAttributes,
                                                    'permission': role.permission,
                                                    'type': 'role',
                                                    'attrType': true
                                                });
                                            }
                                        });
                                    }
                                    if (item.attributes.selectedClassifications != null) {
                                        //if (item.attributes.selectedClassifications[0].classificationId != "" || item.attributes.selectedClassifications[0].classificationName != "") {
                                        //    if (item.attributes.selectedClassifications[0].selectedAttributes.length > 0) {
                                        //        angular.forEach(item.attributes.selectedClassifications[0].selectedAttributes, function (attributeItem) {
                                        //            $scope.mainMenuClassifications.push({ 'classificationId': item.attributes.selectedClassifications[0].classificationId, 'classificationName': item.attributes.selectedClassifications[0].classificationName });
                                        //            $scope.mainMenuClassificationsWithAttributes.push({
                                        //                'classificationId': item.attributes.selectedClassifications[0].classificationId,
                                        //                'attributeId': attributeItem.attributeId,
                                        //                'permissionId': item.permissionId,
                                        //                'permissions': {
                                        //                    add: attributeItem.permission.add,
                                        //                    delete: attributeItem.permission.delete,
                                        //                    edit: attributeItem.permission.edit,
                                        //                    modify: attributeItem.permission.modify,
                                        //                    view: attributeItem.permission.view,
                                        //                    search: attributeItem.permission.search,
                                        //                    addItem: attributeItem.permission.addItem,
                                        //                    unLinkItem: attributeItem.permission.unLinkItem,
                                        //                    linkItem: attributeItem.permission.linkItem
                                        //                }
                                        //            })
                                        //        })
                                        //    }
                                        //}
                                        angular.forEach(item.attributes.selectedClassifications, function (cls) {
                                            if ($scope.containsObjectFormClassifications(cls, $scope.contentPermissions) == null) {
                                                $scope.contentPermissions.push({
                                                    'id': cls.classificationId,
                                                    'name': cls.classificationName,
                                                    'contentTypeId': cls.contentTypeId,
                                                    'selectedAttributes': cls.selectedAttributes,
                                                    'permission': cls.permission,
                                                    'type': 'classification',
                                                    'attrType': true
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                            $scope.intermediateClassificationsAttributes = $scope.mainMenuClassificationsWithAttributes;
                        });
                       
                    }
                    else {
                        $scope.contentTypePermissions = [];
                        $scope.contentTypePermissions.push({
                            attributes: {
                                selectedRoles: [],
                                selectedClassifications:[]
                            },
                            contentTypeId: $routeParams.contentTypeId,
                            createdBy: $rootScope.manageITUserName,
                            errorMessage: null,
                            isValid: false,
                            objects: {
                                selectedRoles: [],
                                selectedClassifications: []
                            },
                            permissionId: null,
                            subObjectId: $routeParams.subObjectId,
                            updatedBy: null
                        });
                        $scope.contentPermissions.push({
                            'id': "0",
                            'name': "All Users",
                            'type': 'role',
                            'contentTypeId': $routeParams.contentTypeId,
                            'selectedAttributes': [],
                            'permission': $scope.changedPermission,
                            'type': 'role',
                            'attrType': false
                        });
                        if (permissionDecision != 1) 
                            $scope.contentPermissions[0].attrType = true;                       
                    }
                    
                },
              function (error) {
                  $scope.errorAttribute.isError = true;
                  $scope.errorAttribute.messages.push("Error occured while fetching Roles on Content Type. Please try after sometime.");
                  //$scope.errorAttribute = "Error occured while saving the Text Attribute. Please try after sometime.";
              });
            }

            classificationService.query({ id: $routeParams.contentTypeId }).$promise.then(function (details) {
                if (details) {
                    $scope.allClassifications = details;
                }
                else
                    $scope.allClassifications = [];
            },function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.errors.push(value.message);
                        });
                    }
                    else {
                        $scope.errorAttribute.isError = true;
                        $scope.errorAttribute.messages.push("Error occured while fetching classifications. Please try after sometime.");
                        //$scope.errors.push("Error occured while fetching classifications. Please try after sometime.");
                    }
            });
        }
        $scope.loadMainMenuRoles = function () {
            if ($routeParams.permissionTypeId == 1) {
                var permissionServiceGetRols = permissionsService.get({ contentTypeId: $routeParams.contentTypeId });
            }
            else if ($routeParams.permissionTypeId == 2) {

            }
        }

        //get permissions for Role
        $scope.getPermissionsToObject = function (obj)
        {
            if ($routeParams.permissionTypeId == 2) {
                if (obj != undefined && obj != null) {
                    for (var j = 0; j < $scope.contentPermissions.length; j++) {
                        if ($scope.contentPermissions[j].id == $scope.selectedRoleOrClassification.id && $scope.contentPermissions[j].id != obj.id) {
                            for (var i = 0; i < $scope.selectedContentTypeAttributes.length; i++) {
                                if ($scope.selectedAttributeId == $scope.selectedContentTypeAttributes[i].attributeId) {
                                    $scope.selectedContentTypeAttributes[i].permission = $scope.changedPermission;
                                    $scope.contentPermissions[j].selectedAttributes = $scope.selectedContentTypeAttributes;
                                    $scope.changedPermission = $scope.selectedAttribute.permission;
                                    $scope.selectedAttributeId = $scope.selectedAttribute.attributeId;
                                    $scope.selectedAttribute = $scope.selectedAttribute;
                                }
                            }
                        }
                    }
                }
                $scope.selectedAttribute = undefined;
                $scope.selectedContentTypeAttributes = [];
                $scope.selectedRoleOrClassification = obj;
                if ($scope.selectedRoleOrClassification.attrType == false) {
                    if ($scope.selectedRoleOrClassification.permission != null && $scope.selectedRoleOrClassification.permission != undefined)
                        $scope.changedPermission = $scope.selectedRoleOrClassification.permission;
                }
                else {
                    if ($scope.selectedRoleOrClassification.type != 'role') {
                        $scope.getPermissionTypesBasedonClass($scope.selectedRoleOrClassification.id);
                    }
                    else {
                        for (var i = 0; i < $scope.contentAttributes.length; i++) {
                            if ($scope.selectedRoleOrClassification.selectedAttributes.length == 0) {
                                if (!$scope.checkObject($scope.contentAttributes[i].attributeId, $scope.selectedContentTypeAttributes)) {
                                    $scope.selectedContentTypeAttributes.push({
                                        "contentTypeId": $scope.contentAttributes[i].contentTypeId, "attributeType": $scope.contentAttributes[i].attributeType, "attributeId": $scope.contentAttributes[i].attributeId, "attributeName": $scope.contentAttributes[i].name, "permission": {
                                            "add": false,
                                            "addItem": false,
                                            "delete": false,
                                            "edit": false,
                                            "linkItem": false,
                                            "modify": false,
                                            "search": false,
                                            "unLinkItem": false,
                                            "view": false
                                        }
                                    });
                                }
                            }
                            else {
                                for (var j = 0; j < $scope.selectedRoleOrClassification.selectedAttributes.length; j++) {
                                    //if (!$scope.containsObject($scope.selectedRoleOrClassification.selectedAttributes[j], $scope.contentAttributes)) {
                                    if (!$scope.containsObject($scope.selectedRoleOrClassification.selectedAttributes[j], $scope.selectedRoleOrClassification.selectedAttributes)) {
                                        $scope.selectedContentTypeAttributes.push({
                                            "contentTypeId": $scope.contentAttributes[i].contentTypeId, "attributeType": $scope.contentAttributes[i].attributeType, "attributeId": $scope.contentAttributes[i].attributeId, "attributeName": $scope.contentAttributes[i].name, "permission": {
                                                "add": false,
                                                "addItem": false,
                                                "delete": false,
                                                "edit": false,
                                                "linkItem": false,
                                                "modify": false,
                                                "search": false,
                                                "unLinkItem": false,
                                                "view": false
                                            }
                                        });
                                    }
                                        //    }
                                        //}
                                        //else {
                                        //    if (!$scope.containsObject($scope.selectedRoleOrClassification.selectedAttributes[j], $scope.selectedRoleOrClassification.selectedAttributes)) {
                                        //        $scope.selectedContentTypeAttributes.push({
                                        //            "contentTypeId": $scope.contentAttributes[i].contentTypeId, "attributeType": $scope.contentAttributes[i].attributeType, "attributeId": $scope.contentAttributes[i].attributeId, "attributeName": $scope.contentAttributes[i].name, "permission": {
                                        //                "add": false,
                                        //                "addItem": false,
                                        //                "delete": false,
                                        //                "edit": false,
                                        //                "linkItem": false,
                                        //                "modify": false,
                                        //                "search": false,
                                        //                "unLinkItem": false,
                                        //                "view": false
                                        //            }
                                        //        });
                                        //    }
                                    else {
                                        //if ($scope.selectedRoleOrClassification.selectedAttributes[j].attributeType==undefined)
                                        //$scope.selectedRoleOrClassification.selectedAttributes[j].attributeType = $scope.contentAttributes[i].attributeType;
                                        if (!$scope.containsObject($scope.selectedRoleOrClassification.selectedAttributes[j], $scope.selectedContentTypeAttributes)) {                                            
                                            $scope.selectedContentTypeAttributes.push($scope.selectedRoleOrClassification.selectedAttributes[j]);                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var tmpContnetAttributes = [],
                keys = [];

                angular.forEach($scope.selectedContentTypeAttributes, function (item) {
                    var key = item.attributeId;
                    if (keys.indexOf(key) === -1) {
                        keys.push(key);
                        tmpContnetAttributes.push(item);
                    }
                });
                $scope.selectedContentTypeAttributes = tmpContnetAttributes;

                angular.forEach($scope.selectedContentTypeAttributes, function (contentAttr) {
                    angular.forEach($scope.selectedRoleOrClassification.selectedAttributes, function (attr) {
                        if (attr.attributeId == contentAttr.attributeId)
                            contentAttr.permission = attr.permission;
                    });

                });
                if ($scope.selectedContentTypeAttributes.length > 0) {
                    $scope.selectedAttributeId = $scope.selectedContentTypeAttributes[0].attributeId;
                    $scope.selectedAttribute = $scope.selectedContentTypeAttributes[0];
                    $scope.changedPermission = $scope.selectedAttribute.permission;
                    angular.forEach($scope.allcontentAttributes, function (attr) {
                        if (attr.attributeId == $scope.selectedAttribute.attributeId) {
                            $scope.selectedAttribute["attributeType"] = attr.attributeType;
                        }
                    });
                    if ($scope.selectedAttribute.attributeType.toUpperCase().indexOf("REFERENCE") > -1) {
                        $scope.isReferenceAttribute = true;
                    }
                    else {
                        $scope.isReferenceAttribute = false;
                    }
                    if ($scope.selectedAttribute.attributeType.toUpperCase().indexOf("SUBOBJECTATTRIBUTE") > -1) {
                        $scope.subObjectDecicer = true;
                    }
                    else {
                        $scope.subObjectDecicer = false;
                    }
                }
                else
                    $scope.changedPermission = {
                        "add": false,
                        "addItem": false,
                        "delete": false,
                        "edit": false,
                        "linkItem": false,
                        "modify": false,
                        "search": false,
                        "unLinkItem": false,
                        "view": false
                    };
            }
            if ($routeParams.permissionTypeId == 1)
            {
                if (obj != undefined && obj != null) {
                    for (var j = 0; j < $scope.contentPermissions.length; j++) {
                        if ($scope.contentPermissions[j].id == $scope.selectedRoleOrClassification.id && $scope.contentPermissions[j].id != obj.id) {
                            $scope.contentPermissions[j].permission = $scope.changedPermission;
                        }
                    }
                }
                $scope.selectedAttribute = undefined;
                $scope.selectedContentTypeAttributes = [];
                $scope.selectedRoleOrClassification = obj;
                if (obj.permission!=null && Object.keys(obj.permission).length!=0)
                    $scope.changedPermission = $scope.selectedRoleOrClassification.permission;
                else
                    $scope.changedPermission = {
                        "add": false,
                        "addItem": false,
                        "delete": false,
                        "edit": false,
                        "linkItem": false,
                        "modify": false,
                        "search": false,
                        "unLinkItem": false,
                        "view": false
                    }
            }
        }
        //update Attribute data
        $scope.updateAttributeData = function (attribute) {
            if (attribute != undefined) {
                //$scope.selectedAttribute = attribute;
                angular.forEach($scope.allcontentAttributes, function (attr) {
                    if (attr.attributeId == attribute.attributeId) {
                        attribute["attributeType"] = attr.attributeType;
                    }
                });

                if (attribute.attributeType.toUpperCase().indexOf("REFERENCE") > -1) {
                    $scope.isReferenceAttribute = true;
                }
                else {
                    $scope.isReferenceAttribute = false;
                }
                if (attribute.attributeType.toUpperCase().indexOf("SUBOBJECTATTRIBUTE") > -1) {
                    $scope.subObjectDecicer = true;
                }
                else {
                    $scope.subObjectDecicer = false;
                }
                if ($scope.selectedRoleOrClassification != undefined && $scope.selectedRoleOrClassification != null) {
                    for (var j = 0; j < $scope.contentPermissions.length; j++) {
                        if ($scope.contentPermissions[j].id == $scope.selectedRoleOrClassification.id) {
                            for (var i = 0; i < $scope.selectedContentTypeAttributes.length; i++) {
                                if ($scope.selectedAttributeId == $scope.selectedContentTypeAttributes[i].attributeId) {
                                    $scope.selectedContentTypeAttributes[i].permission = $scope.changedPermission;
                                    $scope.contentPermissions[j].selectedAttributes = $scope.selectedContentTypeAttributes;
                                    $scope.changedPermission = attribute.permission;
                                    $scope.selectedAttributeId = attribute.attributeId;
                                    $scope.selectedAttribute = attribute;
                                }
                            }
                        }
                    }
                }
            }
        }
               
        $scope.isVisibleAttributes = $routeParams.permissionTypeId;
        //$scope.permissionRolesOrClassifications = [{ itemName: "All Users", value: "1" }, { itemName: "Coordinators", value: "2" }];
        
        $scope.fillAttributeValue = function (conditionsArray) {
            angular.forEach(conditionsArray, function (value, key) {
                //var attType = { attributeId: value.attributeId, attributeType: value.attributeType, name: value.name, identifier: value.attributeType };
                angular.forEach($scope.allcontentAttributes, function (v, k) {
                    if (v.attributeId == value.attributeType) {
                            $scope.selectedContentTypeAttributes.push({
                                "contentTypeId": v.contentTypeId, "attributeType": v.attributeType, "attributeId": v.attributeId, "attributeName": v.name, "permission": {
                                    "add": false,
                                    "addItem": false,
                                    "delete": false,
                                    "edit": false,
                                    "linkItem": false,
                                    "modify": false,
                                    "search": false,
                                    "unLinkItem": false,
                                    "view": false
                                }
                            });
                        }
                    
                });
                $scope.fillAttributeValue(value.subConditions);
            });
        }

        /*get related permissions by cassification Id */
        $scope.getPermissionTypesBasedonClass = function (classId) {
            if ($routeParams.permissionTypeId == 2) {
                angular.forEach($scope.allClassifications, function (classification) {
                    if (classification.classificationId == classId) {
                        var contentTypeClassifications = [];
                        var subObjectClassifications = [];
                        $scope.contentAttributesStatus = false;
                        if (classification.subObjectId == null || classification.subObjectId == "0") {
                            contentTypeClassifications.push(classification);
                        }
                        else {
                            if (classification.subObjectId == $routeParams.subObjectId)
                                subObjectClassifications.push(classification);
                        }
                        if ($routeParams.subObjectId == "0") {
                            $scope.contentClassificationAttributes = contentTypeClassifications;
                        }
                        else {
                            $scope.contentClassificationAttributes = subObjectClassifications;
                        }

                        angular.forEach($scope.contentClassificationAttributes, function (value, key) {
                            $scope.fillAttributeValue(value.conditions);
                        });
                    }

                });
            }
        }
       
        /*gives all Manage IT Roles */
        $scope.GetAllManageITRoles = function () {
            $scope.selectionRoles = [];
            if ($routeParams.permissionTypeId != 0) {
                administratorService.getRoles().$promise.then(function (details) {
                    $scope.formRoles = details;
                },
            function (error) {
                if (error.data.errorMessage) {
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.messages.push("Error occured while fetching default attributes. Please try after sometime.");
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.errors.push(value.message);
                    });
                }
                else {
                    $scope.errorAttribute.isError = true;
                    $scope.errorAttribute.messages.push("Error occured while fetching default attributes. Please try after sometime.");
                    //$scope.errors.push("Error occured while fetching default attributes. Please try after sometime.");
                }
            });
                //$scope.errorAttribute = "";
            }
        }
        //get all roles from db..Invoking
        $scope.GetAllManageITRoles();

        var tmpcontentPermissions = [];
        var tmpFormRoles = [];
        var tmpFormClassifications = [];

        /*popup Permissions and check box selections if already exists */
        $scope.reloadRoleswithRoleModels = function () {
            tmpcontentPermissions = [];
            tmpFormRoles = [];
            tmpFormClassifications = [];
            angular.forEach($scope.formRoles, function (role) {
                if ($scope.containsObjectFormRoles(role, $scope.contentPermissions) != null)
                    role["selected"] = true;
                else
                    role["selected"] = false;
                tmpFormRoles.push(role);
                console.log(tmpFormRoles);
            });
            angular.forEach($scope.classifications, function (clas) {
                if($scope.containsObjectFormClassifications(clas, $scope.contentPermissions)!=null)
                    clas["selected"] = true;
                else
                    clas["selected"] = false;
                tmpFormClassifications.push(clas);
            });
            angular.forEach($scope.contentPermissions, function (permission) {
                tmpcontentPermissions.push(permission);
            });
            //tmpcontentPermissions = $scope.contentPermissions;            
        }

        $scope.resetDataRoleOrClassifications = function () {
            $scope.formRoles = [];
            $scope.classifications = [];
            $scope.GetAllManageITRoles();
            //$scope.getClassifications();
        }
        
        /*unused method now.we can remove later*/
        $scope.selectionRole = [];
        $scope.selectedRoleToggle = function (roleId) {
            var pos = $scope.selectionRole.indexOf(roleId);
            if (pos == -1) {
                $scope.selectionRole.push(roleId);
            } else {
                $scope.selectionRole.splice(pos, 1);
            }
            console.log($scope.selectionRole);
        }
        $scope.selectionClassification = [];
        /*unused method now.we can remove later End*/
        $scope.selectedClassificationToggle = function (ClassificationId) {
            var pos = $scope.selectionClassification.indexOf(ClassificationId);
            if (pos == -1) {
                $scope.selectionClassification.push(ClassificationId);
            } else {
                $scope.selectionClassification.splice(pos, 1);
            }
            console.log($scope.selectionClassification);
        }

        /*functions for handle cancel popup Start*/
        $scope.openErrorScreen = function (formStatus, formName) {
            $scope.attributeFormDirty = formStatus;
            $scope.attributeForm = formName;
            $scope.isErrorScreen = true;
            $scope.AddRole.$setPristine();
            $scope.AddClassification.$setPristine();

        }
        $scope.confirmErrorScreenClose = function (attributeForm) {
            angular.element('#addrole').modal('hide');
            $scope.selectionRoles = [];
            angular.element('#addclassification').modal('hide');
            $scope.selectionClassifications = [];
            $scope.isErrorScreen = false;
            tmpcontentPermissions = [];
            tmpFormClassifications = [];
            tmpFormRoles = [];
            $scope.roleModel = [];
            $scope.classModel = [];
            //$scope.reloadRoleswithRoleModels();
        }
        /*functions for handle cancel popup End*/
        /*functions to handle for pop the item from rolesmenu*/
        $scope.removeObject = function (roleId, list) {
            for (i = 0; i < list.length; i++) {
                if (angular.equals(list[i].id, roleId)) {
                    tmpcontentPermissions.splice(i, 1);
                }
            }
            //if ($routeParams.permissionTypeId == 1) {
            //    for (var i = 0; i < $scope.contentTypePermissions[0].objects.selectedRoles.length; i++) {
            //        if (angular.equals($scope.contentTypePermissions[0].attributes.selectedRoles[i].roleId, roleId)) {
            //            $scope.contentTypePermissions[0].objects.selectedRoles.splice(i, 1);
            //        }
            //    }
            //}
            //if ($routeParams.permissionTypeId == 2) {
            //    for (var i = 0; i < $scope.contentTypePermissions[0].attributes.selectedRoles.length; i++) {
            //        if (angular.equals($scope.contentTypePermissions[0].attributes.selectedRoles[i].roleId, roleId)) {
            //            $scope.contentTypePermissions[0].attributes.selectedRoles.splice(i, 1);
            //        }
            //    }
            //}
        }
        /*functions to handle for pop the item from classifications menu*/
        $scope.removeClassObject = function (classId, classList) {
            for (i = 0; i < classList.length; i++) {
                if (angular.equals(classList[i].id, classId)) {
                    tmpcontentPermissions.splice(i, 1);
                }
            }
            //if ($routeParams.permissionTypeId == 1) {
            //    for (var i = 0; i < $scope.contentTypePermissions[0].objects.selectedClassifications.length; i++) {
            //        if (angular.equals($scope.contentTypePermissions[0].objects.selectedClassifications[i].classificationId, classId)) {
            //            $scope.contentTypePermissions[0].objects.selectedClassifications.splice(i, 1);
            //        }
            //    }
            //}
            //if ($routeParams.permissionTypeId == 2) {
            //    for (var i = 0; i < $scope.contentTypePermissions[0].attributes.selectedClassifications.length; i++) {
            //        if (angular.equals($scope.contentTypePermissions[0].objects.selectedClassifications[i].classificationId, classId)) {
            //            $scope.contentTypePermissions[0].attributes.selectedClassifications.splice(i, 1);
            //        }
            //    }
            //}
        }
        /*toggle selection for a given role by name and Id*/
        $scope.toggleRoleSelection = function toggleSelection(role, status, index) {            
            var id = $scope.containsObjectRoles(role, tmpcontentPermissions);
            if (status != true) {
                $scope.removeObject(role.Id, tmpcontentPermissions);
            }
            else {
                tmpcontentPermissions.push({
                    'id': role.Id,
                    'name': role.Name,
                    'contentTypeId': $routeParams.contentTypeId,
                    'selectedAttributes': [],
                    'permission': {},
                    'type': 'role',
                    'attrType': true
                });
            }
        };
        $scope.getRolesByContentType(0);
        /*this will add items to main menu roles.*/
        $scope.addRolesOrClasstoMainMenu = function () {
            $scope.contentPermissions=[];
            angular.forEach(tmpcontentPermissions, function (permission) {
                $scope.contentPermissions.push(permission);
            });
            $scope.resetDataRoleOrClassifications();
        }
        $scope.selectionClassifications = [];
        /*toggle selection for a given role by name*/
        $scope.toggleClassificationSelection = function toggleSelection(clas, status, index) {
            var id = $scope.containsObjectFormClassifications(clas, tmpcontentPermissions);
            if (status != true)
                $scope.removeClassObject(clas.classificationId, tmpcontentPermissions);
            else {
                tmpcontentPermissions.push({
                    'id': clas.classificationId,
                    'name': clas.classificationName,
                    'contentTypeId': $routeParams.contentTypeId,
                    'selectedAttributes': [],
                    'permission': {},
                    'type': 'classification',
                    'attrType': true
                });
            }
        };
        
        //Add or update Permission
        $scope.updatePermission = function () {
            if ($routeParams.permissionTypeId == 2) {
                    for (var j = 0; j < $scope.contentPermissions.length; j++) {
                        if ($scope.contentPermissions[j].id == $scope.selectedRoleOrClassification.id ) {
                            for (var i = 0; i < $scope.selectedContentTypeAttributes.length; i++) {
                                if ($scope.selectedAttributeId == $scope.selectedContentTypeAttributes[i].attributeId) {
                                    $scope.selectedContentTypeAttributes[i].permission = $scope.changedPermission;
                                    $scope.contentPermissions[j].selectedAttributes = $scope.selectedContentTypeAttributes;
                                    $scope.changedPermission = $scope.selectedAttribute.permission;
                                    $scope.selectedAttributeId = $scope.selectedAttribute.attributeId;
                                    $scope.selectedAttribute = $scope.selectedAttribute;
                                }
                            }
                        }
                    }
                $scope.selectedAttribute = undefined;
                $scope.selectedContentTypeAttributes = [];
                
                for (var i = $scope.contentTypePermissions[0].attributes.selectedRoles.length-1; i >= 0 ; i--) {
                    if ($scope.containsObjectFormRoles($scope.contentTypePermissions[0].attributes.selectedRoles[i], $scope.contentPermissions) == null) {
                        $scope.contentTypePermissions[0].attributes.selectedRoles.splice(i, 1);
                    }
                }

                for (var i = $scope.contentTypePermissions[0].attributes.selectedClassifications.length-1; i >= 0; i--) {
                    if ($scope.containsObjectClassifications($scope.contentTypePermissions[0].attributes.selectedClassifications[i], $scope.contentPermissions) == null) {
                        $scope.contentTypePermissions[0].attributes.selectedClassifications.splice(i, 1);
                    }
                }
            }
            if ($routeParams.permissionTypeId == 1) {
                    for (var j = 0; j < $scope.contentPermissions.length; j++) {
                        if ($scope.contentPermissions[j].id == $scope.selectedRoleOrClassification.id) {
                            $scope.contentPermissions[j].permission = $scope.changedPermission;
                        }
                    }

                    for (var i = $scope.contentTypePermissions[0].objects.selectedRoles.length - 1; i >= 0 ; i--) {
                        if ($scope.containsObjectFormRoles($scope.contentTypePermissions[0].objects.selectedRoles[i], $scope.contentPermissions) == null) {
                            $scope.contentTypePermissions[0].objects.selectedRoles.splice(i, 1);
                        }
                    }

                    for (var i = $scope.contentTypePermissions[0].objects.selectedClassifications.length - 1; i >= 0 ; i--) {
                        if ($scope.containsObjectClassifications($scope.contentTypePermissions[0].objects.selectedClassifications[i], $scope.contentPermissions) == null) {
                            $scope.contentTypePermissions[0].objects.selectedClassifications.splice(i, 1);
                        }
                    }
            }
            if ($scope.contentPermissions != null && $scope.contentPermissions != undefined && $scope.contentPermissions.length>0)
            {
                $scope.finalPermissionCollection = [];

                angular.forEach($scope.contentPermissions, function (permission) {
                    if ($routeParams.permissionTypeId == 1) {
                        if (permission.type == 'role') {
                            permission["roleId"] = permission.id;
                            permission["roleName"] = permission.name;
                            var roleIndex = $scope.containsObjectRoles(permission, $scope.contentTypePermissions[0].objects.selectedRoles);
                            if (roleIndex == null)
                                $scope.contentTypePermissions[0].objects.selectedRoles.push(permission);
                            else {
                                $scope.contentTypePermissions[0].objects.selectedRoles[roleIndex] = permission;
                            }
                        }
                        else {
                            permission["classificationId"] = permission.id;
                            permission["classificationName"] = permission.name;
                            var clasIndex=$scope.containsObjectClassifications(permission, $scope.contentTypePermissions[0].objects.selectedClassifications);
                            if (clasIndex==null)
                                $scope.contentTypePermissions[0].objects.selectedClassifications.push(permission);
                            else {
                                $scope.contentTypePermissions[0].objects.selectedClassifications[clasIndex] = permission;
                            }                            
                        }
                    }
                    if ($routeParams.permissionTypeId == 2) {
                        if (permission.type == 'role') {
                            permission["roleId"] = permission.id;
                            permission["roleName"] = permission.name;
                            var roleIndex = $scope.containsObjectRoles(permission, $scope.contentTypePermissions[0].attributes.selectedRoles)
                            if (roleIndex == null)
                                $scope.contentTypePermissions[0].attributes.selectedRoles.push(permission);
                            else {
                                $scope.contentTypePermissions[0].attributes.selectedRoles[roleIndex] = permission;
                            }
                        }
                        else {
                            permission["classificationId"] = permission.id;
                            permission["classificationName"] = permission.name;
                            var clasIndex = $scope.containsObjectClassifications(permission, $scope.contentTypePermissions[0].attributes.selectedClassifications);
                            if (clasIndex == null)
                                $scope.contentTypePermissions[0].attributes.selectedClassifications.push(permission);
                            else {
                                $scope.contentTypePermissions[0].attributes.selectedClassifications[clasIndex] = permission;
                            }
                        }
                    }
                });
                if ($scope.contentTypePermissions[0].permissionId == null) {

                    var permissions = $scope.contentTypePermissions[0];
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    permissions.domainId = contentType.domainId;
                    permissions.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                    permissions.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                    permissions.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                    permissionsService.create(permissions).$promise.then(function (details) {
                        $scope.contentTypePermissions[0] = details;
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("Permissions are updated successfully");
                    }, function (error) {
                        if (error.data.errorMessage) {                           
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.messages.push("Error occured while fetching default attributes. Please try after sometime.");
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errors.push(value.message);
                            });
                        }
                        else {                           
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.messages.push("Error occured while fetching default attributes. Please try after sometime.");
                            //$scope.errors.push("Error occured while fetching default attributes. Please try after sometime.");
                        }
                    });
                }
                else {
                    var permissions = $scope.contentTypePermissions[0];
                    //update permissions based on libraries
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    permissions.domainId = contentType.domainId;
                    permissions.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                    permissions.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                    permissions.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                    permissionsService.update($scope.contentTypePermissions[0]).$promise.then(function (details) {
                        $scope.contentTypePermissions[0] = details;
                        $scope.errorAttribute.isSuccess = true;
                        $scope.errorAttribute.messages.push("Permissions are updated successfully");
                    }, function (error) {
                        if (error.data.errorMessage) {
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.messages.push("Error occured while fetching default attributes. Please try after sometime.");
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.errors.push(value.message);
                            });
                        }
                        else {
                            $scope.errorAttribute.isError = true;
                            $scope.errorAttribute.messages.push("Error occured while fetching default attributes. Please try after sometime.");
                            //$scope.errors.push("Error occured while fetching default attributes. Please try after sometime.");
                        }
                    });
                }
            }
        }
        /* clear's the form roles and classifications, after save permission*/
        $scope.clearRoleandAttribute = function () {
            $scope.permissionSet.selectedRoleOrClassification.roleId = null;
            $scope.permissionSet.selectedRoleOrClassification.classificationId = null;
            $scope.permissionSet.attributes.selectedAttributeId = null;
            $scope.permissionSet.attributes.selectedAttributeName = null;
            $scope.permissionSet.selectedRoleOrClassification.classificationName = null;
            $scope.permissionSet.selectedRoleOrClassification.roleName = null;
            //$scope.clearPermissionsObject();
        }
        /* which disables the update button for invalid update attempts*/
        $scope.disableUpdateButton = function () {
            if ($routeParams.permissionTypeId == 2) {
                if (($scope.permissionSet.viewPermission === null &&
                           $scope.permissionSet.editPermission === null &&
                           $scope.permissionSet.linkItem === null &&
                           $scope.permissionSet.unLinkItem === null &&
                           $scope.permissionSet.addItem === null) ||
                           ($scope.permissionSet.selectedRoleOrClassification.roleId === null &&
                           $scope.permissionSet.selectedRoleOrClassification.classificationId === null) ||
                           $scope.permissionSet.attributes.selectedAttributeId === null) {
                    return true;
                }
                return false;
            }
            else {
                if (($scope.permissionSet.viewPermission === null &&
                     $scope.permissionSet.editPermission === null &&
                     $scope.permissionSet.linkItem === null &&
                     $scope.permissionSet.unLinkItem === null &&
                     $scope.permissionSet.addItem === null) ||
                     ($scope.permissionSet.selectedRoleOrClassification.roleId === null &&
                     $scope.permissionSet.selectedRoleOrClassification.classificationId === null)) {
                    return true;
                }
                return false;
            }

        }
        $scope.resetErrorDirective = function () {
            $scope.errorAttribute.isError = false;
            $scope.errorAttribute.isSuccess = false;
            $scope.errorAttribute.isWarning = false;
            $scope.errorAttribute.isInfo = false;
            $scope.errorAttribute.messages = [];
            $scope.errorAttribute.moreDetails = null;
            $scope.errorAttribute.isHide = false;
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
    }]);
manageitModule.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});
manageitModule.directive('indeterminate', [function () {
    return {
        require: '?ngModel',
        link: function (scope, el, attrs, ctrl) {
            ctrl.$formatters = [];
            ctrl.$parsers = [];
            ctrl.$render = function () {
                var d = ctrl.$viewValue;
                el.data('checked', d);
                switch (d) {
                    case true:
                        el.prop('indeterminate', false);
                        el.prop('checked', true);
                        break;
                    case false:
                        el.prop('indeterminate', false);
                        el.prop('checked', false);
                        break;
                    default:
                        el.prop('indeterminate', true);
                }
            };
            el.bind('click', function () {
                var d;
                switch (el.data('checked')) {
                    case false:
                        d = true;
                        break;
                    case true:
                        d = null;
                        break;
                    default:
                        d = false;
                }
                ctrl.$setViewValue(d);
                scope.$apply(ctrl.$render);
            });
        }
    };
}]);