
manageitModule.controller("subObjectController", ['$scope', '$rootScope', 'sharedScope', 'subObjectService', '$filter', 'contentTypeService',
    function ($scope, $rootScope, sharedScope, subObjectService, $filter, contentTypeService) {
    sharedScope.store('subObjectController', $scope);

    sharedScope.store('subObjectController', $scope);
    $scope.subObjects = [];

    $scope.errors = [];
    $scope.errorText = [];

    $scope.isSubObject = false;
    $scope.resetErrorDirective = function (attModel) {
        attModel.isError = false;
        attModel.isSuccess = false;
        attModel.isWarning = false;
        attModel.isInfo = false;
        attModel.messages = [];
        attModel.moreDetails = null;
        attModel.isHide = false;
    }
    
    $scope.errorAttribute = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.subObjectErrAttribute = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
    };
    $scope.subObject = {
        subObjectId: null, singularName: null, pluralName: null,
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
    };
    $scope.formScope = [];

    $scope.setFormScope = function (scope, formName) {
        $scope.formScope[formName] = scope;
        //$scope.formScope = scope;
    }

    $scope.clearFields = function () {
        $scope.errors = [];
        $scope.errorText = [];
        $scope.isSubObject = true;
        $scope.action = "Add";

        $scope.subObject = { subObjectId: null, singularName: null, pluralName: null };
    }


    $scope.clearFieldsAfterSave = function () {
        $scope.errorText = [];
        $scope.isSubObject = true;
        $scope.action = "Add";
        $scope.subObject = {
            subObjectId: '', singularName: null, pluralName: null,
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };
    }

    $scope.getSubObjects = function () {
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        //$scope.errors = [];
        $scope.errorText = [];
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
            console.log(details);
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
    }


    $scope.saveSubObject = function (subObject, subObjectForm) {
       
        $scope.errors = [];
        $scope.resetErrorDirective($scope.errorAttribute); 
        $scope.resetErrorDirective($scope.subObjectErrAttribute);
        $scope.errorText = [];
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;

        //update save subobject based on content type and libraries with domain id

        subObject.domainId = contentType.domainId;
        if (contentType.imageLibraryId) {
           
            subObject.imageLibraryId = contentType.imageLibraryId;
            subObject.contentTypeId = ''
            subObject.documentLibraryId =  '';
        }
        else if (contentType.contentTypeId)
        {
            subObject.contentTypeId = contentType.contentTypeId;
            subObject.imageLibraryId = '';
            subObject.documentLibraryId =  '';
        }
        else {            
            subObject.contentTypeId = '';
            subObject.documentLibraryId =  contentType.documentLibraryId;
            subObject.imageLibraryId = '';
        }

        if (subObject.subObjectId == null || subObject.subObjectId == '') {
            subObjectService.create(subObject).$promise.then(function (response) {
                if (response.$resolved == true) {
                    $scope.clearFieldsAfterSave();
                    $scope.subObjectErrAttribute.messages.push("Sub-Object saved successfully");
                    $scope.subObjectErrAttribute.isSuccess = true;
                    
                    $('#SubObject').hide();
                    $('.modal-backdrop').hide();
                   
                    $scope.getSubObjects();
                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                  
                    //call the dynamic left menu function.
                    if (contentType.imageLibraryId) {
                        sharedScope.get('rightMenuController').buildDynamicLeftMenuImage(contentType);
                    }else if(contentType.documentLibraryId){
                        sharedScope.get('rightMenuController').buildDynamicLeftMenuDocument(contentType);
                    }
                    else {
                        sharedScope.get('rightMenuController').buildDynamicLeftMenu(contentType);
                    }
                    
                    subObjectForm.$setPristine();
                    $scope.isSubObject = false;
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
                    $scope.errorAttribute.messages.push("Error occured while saving the Sub-Object. Please try after sometime.");
                    $scope.errorAttribute.isHide = true;
                }
            });
        }
        else {
           
            subObjectService.update(subObject).$promise.then(function (response) {
                if (response.$resolved == true && response.subObjectId != '') {
                    $('#SubObject').hide();
                    $('.modal-backdrop').hide();
                    $scope.clearFieldsAfterSave();
                    $scope.getSubObjects();
                    //call the dynamic left menu function.
                    sharedScope.get('rightMenuController').buildDynamicLeftMenu();
                    $scope.subObjectErrAttribute.messages.push("Sub Object updated successfully");
                    $scope.subObjectErrAttribute.isSuccess = true;
                    subObjectForm.$setPristine();
                    $scope.isSubObject = false;
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
                    $scope.errorAttribute.messages.push("Error occured while saving the Sub-Object. Please try after sometime.");
                    $scope.errorAttribute.isHide = true;
                }
            });
        }
    }

$scope.editSubObject = function (subObject) {
    $scope.errors = [];
    $scope.clearFieldsAfterSave();
    $scope.resetErrorDirective($scope.errorAttribute);
    $scope.resetErrorDirective($scope.subObjectErrAttribute);
    $scope.errorText = [];
    $scope.isSubObject = true;
    $scope.action = "Edit";
    //get subobject based on library and content type
    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
    subObject.domainId = contentType.domainId;   
    if (contentType.imageLibraryId) {      
        subObject.imageLibraryId = contentType.imageLibraryId;
        subObject.contentTypeId = ''
        subObject.documentLibraryId = '';
        var serviceval = subObjectService.get({ imageLibraryId: contentType.imageLibraryId, id: subObject.subObjectId });
    }
    else if (contentType.contentTypeId) {
        subObject.contentTypeId = contentType.contentTypeId;
        subObject.imageLibraryId = '';
        subObject.documentLibraryId = '';
        var serviceval = subObjectService.get({ contentTypeId: contentType.contentTypeId, id: subObject.subObjectId });      
    }
    else {       
        subObject.contentTypeId = '';
        subObject.documentLibraryId = contentType.documentLibraryId;
        subObject.imageLibraryId = '';
        var serviceval = subObjectService.get({ documentLibraryId: contentType.documentLibraryId, id: subObject.subObjectId });
    }    
    if (subObject.subObjectId != '') {       
        serviceval.$promise.then(function (response) {
            if (response.$resolved == true) {
                $scope.subObject.singularName = subObject.singularName;
                $scope.subObject.pluralName = subObject.pluralName;
                $scope.subObject.subObjectId = subObject.subObjectId;
               // $scope.subObjectErrAttribute.messages.push("Sub-Object  update successfully");
              //  $scope.subObjectErrAttribute.isSuccess = true;
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
                $scope.errorAttribute.messages.push("Error occured while fetching a Sub-Object. Please try after sometime.");
                $scope.errorAttribute.isError = true;
                $scope.errorAttribute.isHide = true;
            }
        });
    }
    $scope.resetErrorDirective($scope.errorAttribute);
    $scope.resetErrorDirective($scope.subObjectErrAttribute);
}

$scope.deleteSubObject = function (subObject) {
    $scope.errors = [];
    $scope.resetErrorDirective($scope.subObjectErrAttribute);
    $scope.errorText = [];
    if (subObject.subObjectId != '') {
        //if (confirm("Are you sure you want to delete Sub-Object ?" )) {
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        subObject.domainId = contentType.domainId;
        if (contentType.imageLibraryId) {

            subObject.imageLibraryId = contentType.imageLibraryId;
            subObject.contentTypeId = ''
            subObject.documentLibraryId = '';
        }
        else if (contentType.contentTypeId) {
            subObject.contentTypeId = contentType.contentTypeId;
            subObject.imageLibraryId = '';
            subObject.documentLibraryId = '';
        }
        else {
            subObject.contentTypeId = '';
            subObject.documentLibraryId = contentType.documentLibraryId;
            subObject.imageLibraryId = '';
        }
        subObjectService.remove(subObject).$promise.then(function (response) {
            if (response.$resolved == true) {
                $scope.subObjectErrAttribute.messages.push("Sub-Object deleted successfully");
                $scope.subObjectErrAttribute.isSuccess = true;
                $scope.getSubObjects();
              
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
                    $scope.subObjectErrAttribute.messages.push(value.message);
                    $scope.subObjectErrAttribute.moreDetails = value.moreDetails;
                    $scope.subObjectErrAttribute.isError = true;
                    $scope.subObjectErrAttribute.isHide = true;
                });
            }
            else {
                $scope.subObjectErrAttribute.messages.push("Error occured while deleting the Sub-Objects. Please try after sometime.");
                $scope.subObjectErrAttribute.isError = true;
                $scope.subObjectErrAttribute.isHide = true;
            }
        });
    //}
}
}
        //functions for handle cancel popup Start
$scope.openErrorScreen = function (formStatus, formName) {
    $scope.attributeFormDirty = formStatus;
    $scope.attributeForm = formName;
    $scope.isErrorScreen = true;
}
$scope.confirmErrorScreenClose = function (attributeForm) {

    angular.element('#' + attributeForm).modal('hide');
    $scope.attributeFormDirty = false;
    $scope.attributeForm = "";
    //$scope.userinterface = '';
    $scope.isErrorScreen = false;
    var formName = "add" + attributeForm.substring(0, 1).toLowerCase() + attributeForm.substring(1) + "Form";
    var attrFormScope = $scope.formScope[formName];
    var attrForm = attrFormScope[formName];
    attrForm.$setPristine();

}

}]);