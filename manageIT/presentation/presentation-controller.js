manageitModule.controller("presentationController", ['$scope', 'sharedScope', '$filter', '$routeParams', 'newSharedScope', 'contentTypeService', 'searchinterfaceService', 'presentationService', 'textAttributeService', '$rootScope', 'attributeSetService', 'subObjectService', 'imageLibraryService','documentLibraryService',
    function ($scope, sharedScope, $filter, $routeParams, newSharedScope, contentTypeService, searchinterfaceService, presentationService, textAttributeService, $rootScope, attributeSetService, subObjectService, imageLibraryService, documentLibraryService) {
        sharedScope.store('presentationController', $scope);
        //fileupload
        $scope.image = null;
        $scope.imageFileName = '';
        $scope.uploadme = {};
        $scope.uploadme.src = '';
        $scope.resetErrorDirective = function (attModel) {
            attModel.isError = false;
            attModel.isSuccess = false;
            attModel.isWarning = false;
            attModel.isInfo = false;
            attModel.messages = [];
            attModel.moreDetails = null;
            attModel.isHide = false;
        }
        $scope.allImageLibraryTypes = [{
            label: 'Brand Logos',
            value: '1'
        }, {
            label: 'Corporate Images',
            value: '2'
        }, {
            label: 'Lifestyle Images',
            value: '3'
        }, {
            label: 'Product Images',
            value: '4'
        }, {
            label: 'Product Logos',
            value: '5'
        }];
        $scope.formDirty = false;
        $scope.messageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };

        $scope.errormessageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };

        $scope.errorAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
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
                    $rootScope.subObjects = details;
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
        $scope.getSubObjects();

        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        var allAttribute = {};
        allAttribute.domainId = contentType.domainId;
        if (contentType.imageLibraryId) {
            var libraryid = contentType.imageLibraryId;
        } else if (contentType.contentTypeId) {
            var libraryid = contentType.contentTypeId
        }
        else {
            var libraryid = contentType.documentLibraryId
        }
        var attributeSetId = 0;
        textAttributeService.getAllAttributesInLibrary({ domainId: contentType.domainId, contentTypeId: libraryid, isAllAttributes: true, attributeType: 'attribute' }).$promise.then(function (details) {
            var contentTypeDefaultAttributes = [];
            var attributeset = [];
            var subobject = [];          
            angular.forEach(details, function (value, key) {             
                if (value.attributeSetId == 0 && value.subObjectId == 0 && value.attributeType != 'SubObjectAttribute') {
                    contentTypeDefaultAttributes.push(value);
                }
                //attribute set
                if (value.attributeSetId != 0 && value.attributeSetName != null && value.subObjectId == 0 && value.attributeType != 'SubObjectAttribute') {
                    attributeset.push(value);
                }               
                if (value.attributeType == 'SubObjectAttribute') {  
                                  
                    var subobjectattributes = [];

                    angular.forEach(details, function (value1, key1) {
                        if (value1.subObjectId == value.subObjectType) {
                            value1.attributename = value.name;
                            value1.attset = value.attributeSetId;                            
                            subobjectattributes.push(value1);
                        }
                    });
                    var val = { name: value.name, id: value.attributeId, attributes: subobjectattributes, attributeSetName: value.attributeSetName };
                    subobject.push(val);
                }
            });
            $rootScope.allattributes = details;          
            $rootScope.attributes = contentTypeDefaultAttributes;           
            //attribute set
            $rootScope.attributeset = attributeset;
            //sub object attribute
            $rootScope.subobject = subobject;           
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
        if (contentType.contentTypeId) {
            contentTypeService.get({ id: contentType.contentTypeId }).$promise.then(function (details) {
                $rootScope.contentypedata = details;
                console.log($rootScope.contentypedata);
                if ($rootScope.contentypedata) {
                    console.log('if');
                    $scope.presentation.nameexpression = $rootScope.contentypedata.contentTypePresentations.namingExpression;
                    $scope.nameexpression = $rootScope.contentypedata.contentTypePresentations.namingExpression;
                    if ($rootScope.contentypedata.contentTypePresentations.defaultImage) {
                        $scope.selectedimagedata = $rootScope.contentypedata.contentTypePresentations.defaultImage;
                        $scope.presentation.defaultSearchType = $rootScope.contentypedata.contentTypePresentations.defaultSearchType;
                        $scope.presentation.selectimage = $rootScope.contentypedata.contentTypePresentations.defaultImage.name;
                        $scope.selectedimagedata = $rootScope.contentypedata.contentTypePresentations.defaultImage;
                    }
                    $scope.imagedata = $rootScope.contentypedata.contentTypePresentations.defaultImage;
                    $scope.uploadme = $rootScope.contentypedata.contentTypePresentations.defaultIcon.fileData;
                    $scope.DefaultIcon = $rootScope.contentypedata.contentTypePresentations.defaultIcon;
                }
            }, function (error) {
            });
        }
        if (contentType.imageLibraryId) {

            imageLibraryService.getImageLibrary({
                controller: 'imageLibrary', id: contentType.imageLibraryId
            }).$promise.then(function (response) {

                $rootScope.contentypedata = response;
                if ($rootScope.contentypedata) {
                    $scope.presentation.nameexpression = $rootScope.contentypedata.contentTypePresentations.namingExpression;
                    $scope.nameexpression = $rootScope.contentypedata.contentTypePresentations.namingExpression;
                    if ($rootScope.contentypedata.contentTypePresentations.defaultImage) {
                        $scope.selectedimagedata = $rootScope.contentypedata.contentTypePresentations.defaultImage;
                        $scope.presentation.defaultSearchType = $rootScope.contentypedata.contentTypePresentations.defaultSearchType;
                        $scope.presentation.selectimage = $rootScope.contentypedata.contentTypePresentations.defaultImage.name;
                    }
                    $scope.imagedata = $rootScope.contentypedata.contentTypePresentations.defaultImage;
                    $scope.uploadme = $rootScope.contentypedata.contentTypePresentations.defaultIcon.fileData;
                    $scope.DefaultIcon = $rootScope.contentypedata.contentTypePresentations.defaultIcon;
                }
            }, function (error) {
            });
        }
        if (contentType.documentLibraryId) { 
            documentLibraryService.getAllDocumentLibraries({ controller: 'documentLibrary', id: contentType.documentLibraryId }).$promise.then(function (response) {
                console.log(response);
                $rootScope.contentypedata = $filter('filter')(response, { documentLibraryId: contentType.documentLibraryId })[0];
                console.log($rootScope.contentypedata);
                if ($rootScope.contentypedata) {
                    $scope.presentation.nameexpression = $rootScope.contentypedata.contentTypePresentations.namingExpression;
                    $scope.nameexpression = $rootScope.contentypedata.contentTypePresentations.namingExpression;
                    if ($rootScope.contentypedata.contentTypePresentations.defaultImage) {
                        $scope.selectedimagedata = $rootScope.contentypedata.contentTypePresentations.defaultImage;
                        $scope.presentation.defaultSearchType = $rootScope.contentypedata.contentTypePresentations.defaultSearchType;
                        $scope.presentation.selectimage = $rootScope.contentypedata.contentTypePresentations.defaultImage.name;
                    }
                    $scope.imagedata = $rootScope.contentypedata.contentTypePresentations.defaultImage;
                    $scope.uploadme = $rootScope.contentypedata.contentTypePresentations.defaultIcon.fileData;
                    $scope.DefaultIcon = $rootScope.contentypedata.contentTypePresentations.defaultIcon;
                }
            }, function (error) {
            });
        }

        //list attributeset in naming expression
        //attribute set group

        var indexedAttrs = [];
        $scope.detailsToFilter = function () {
            indexedAttrs = [];
            return $rootScope.attributeset;
        }
        $scope.filterDetails = function (detail) {
            var detailIsNew = indexedAttrs.indexOf(detail.attributeSetName) == -1;
            if (detailIsNew) {
                indexedAttrs.push(detail.attributeSetName);
            }
            return detailIsNew;
        }
        //subobject group title
        var indexedSubAttrs = [];
        $scope.detailsToSubFilter = function () {
            indexedSubAttrs = [];
            return $rootScope.subobject;
        }
        $scope.filterSubDetails = function (detail) {
            var detailIsSubNew = indexedSubAttrs.indexOf(detail.attributename) == -1;
            if (detailIsSubNew) {
                indexedSubAttrs.push(detail.attributename);
            }
            return detailIsSubNew;
        }
        $scope.insertselectedattribute = function () {           
            var result = $filter('filter')($rootScope.allattributes, { attributeId: $scope.idSelectedVote })[0];
            $scope.addtoNameExpression(result);
        }
        $scope.addtoNameExpression = function (data) {
            $scope.formDirty = true;
            var m = data.multipleValues.maximumValue;
            var deciamlsymbol = '';
            if (data.valueType == 1) {
                var deciamlsymbol = '$';
            }
            if (data.valueType == 2) {
                var deciamlsymbol = '%';
            }            
            if ($scope.nameexpression == undefined || $scope.nameexpression == '') {
                if (data.subObjectId == 0) {
                    $scope.nameexpression = deciamlsymbol + '<'+ data.identifier + '[1] >';
                }
                else {             
                    var newname = deciamlsymbol + '<' + $scope.subobjname + '[' + m + '].' + data.identifier + '[1]>';
                    $scope.nameexpression = newname;
                }
            }
            else {
                if (data.subObjectId == 0) {
                    $scope.nameexpression =  $scope.nameexpression + deciamlsymbol+ '<' + data.identifier + '[1] >';
                }
                else {                  
                    var newname = deciamlsymbol + '<' + $scope.subobjname + '[' + m + '].' + data.identifier + '[1]>';
                    $scope.nameexpression = $scope.nameexpression + newname;
                }               
            }
        }        
        $scope.presentation = { nameexpression : null}
        $scope.listimagedetails = function (attrid) {           
            var result = $filter('filter')($rootScope.attributes, { attributeId: attrid })[0];
            $scope.imagedatalist = result;           
        }
        $scope.displaynameexpression = function (value) {

            
            $scope.nameexpression = value;
            $scope.presentation.nameexpression = value;
            $('#editnamingExpression').modal('hide');           
        }
        $scope.idSelectedVote = null;
        $scope.setSelected = function (idSelectedVote) {            
            $scope.idSelectedVote = idSelectedVote;            
        }
        $scope.setSubSelected = function (idSelectedVote) {
            var array = idSelectedVote.split("/");          
            for (i = 0; i < array.length; i++) {              
                $scope.idSelectedVote = array[0];
            }            
            $scope.subobjname = array[2];           
            $scope.idSubSelectedVote = idSelectedVote;           
        }
        $scope.removeicon = function () {
            $scope.DefaultIcon = '';
            $scope.uploadme = '';
        }
        $scope.saveimagedata = function () {
            var imagerole = [];
            angular.forEach($scope.imagedatalist.imageRoles, function (value, key) {
                if ($scope.array.indexOf(value.roleId) == -1) {                   
                    imagerole.push({ id: value.roleId, name: value.roleName });
                }
            })
            //selected inage type           
            var selectedImageType = [];
            angular.forEach($scope.allImageLibraryTypes, function (value, key) {
                if ($scope.array1.indexOf(value.value) == -1) {
                    selectedImageType.push({ id: value.value, name: value.label });
                }
            })
            $('#selectDefaultimage').modal('hide');           
            if (imagerole.length > 0) {
                var IsAnyRole = false;
            }
            else {      
                var IsAnyRole = true;
            }
            var imagedata = { Id: $scope.selectedimagedata.selectimage, Name: $scope.imagedatalist.name, IsAnyRole: true, ImageRoles: imagerole, IsAnyImageType: false, ImageTypes: selectedImageType, ImageIndex: $scope.selectedimagedata.imageindex, IndexPosition: $scope.selectedimagedata.imageIndexPosition }
            $scope.imagedata = imagedata;
            console.log($scope.imagedata);
            $scope.presentation.selectimage = $scope.imagedatalist.name;
        }
        $scope.ContentTypePresentations = {};   
        //the image
        $scope.uploadme = '';
        $scope.uploadImage = function (uploadimagename) {
            $scope.resetErrorDirective($scope.messageModel);
            $scope.resetErrorDirective($scope.errormessageModel);
            var imgBlob = dataURItoBlob($scope.uploadme);          
            if (imgBlob.size >= 523200) {
                 $scope.showExceptionMessage($scope.errormessageModel, 'Maximum file uploadsize is 24 bit');
            }
            else if (imgBlob.type != 'image/png') {
                $scope.showExceptionMessage($scope.errormessageModel, 'Please upload a PNG format image only');
            }
            else {
                $('#uploadDefaulticon').modal('hide');               
                $scope.DefaultIcon = { FileName:uploadimagename, FilePath: null, FileSize: imgBlob.size, FileData: $scope.uploadme, UpdateBy: null };
            }   
        }
        $scope.array = [];
        $scope.array1 = [];
        $scope.showExceptionMessage = function (attModel, message, moredetails) {
            attModel.messages.push(message);
            attModel.moreDetails = moredetails;
            attModel.isError = true;
        }
        $scope.showSuccessMessage = function (attModel, message) {
            attModel.messages.push(message);
            attModel.isSuccess = true;
        }
        //you need this function to convert the dataURI
        function dataURItoBlob(dataURI) {          
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
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
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
        }

        $scope.savepresentation = function (presentation) {           
            var contentType1 = [];
           
           // var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            var namingext = { Id: null, Name: presentation.nameexpression, Index: 0, DisplayOrder: null };
            $scope.NamingExpression = [];
            $scope.NamingExpression.push(namingext);

            // search interface type
            var searchtype = { Id: null, Name: presentation.defaultsearchtype };
            $scope.DefaultSearchType = [];
            $scope.DefaultSearchType.push(searchtype);            
            $scope.DefaultImage = $scope.imagedata;
            var contetntypedata = { NamingExpression: presentation.nameexpression, DefaultSearchType: presentation.defaultsearchtype, DefaultImage: $scope.DefaultImage, DefaultIcon: $scope.DefaultIcon };
           
           
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (contentType.contentTypeId != null && contentType.contentTypeId != "") {

                var contentType= new contentTypeService();

                contentType.singularName = $rootScope.contentypedata.singularName;
                contentType.pluralName = $rootScope.contentypedata.pluralName;
                contentType.identifier = $rootScope.contentypedata.identifier;
                contentType.isContext = $rootScope.contentypedata.isContext;
                contentType.contentTypeId = $routeParams.contentTypeId;

                var rightMenuController = sharedScope.get('rightMenuController');
                contentType.domainId = sharedScope.get('rightMenuController').selectedContentTypeDomain.domainId;
                contentType.updatedBy = $rootScope.manageITUserName;
                contentType.ContentTypePresentations = contetntypedata;
                contentTypeService.update(contentType).$promise.then(function (result) {
                    $scope.showSuccessMessage($scope.messageModel, "Presentation updated Successfully");
                    }, function (error) {                       
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                    });                
            }
            contentType.updatedBy = $rootScope.manageITUserName;
            var contentTypeData = new contentTypeService();
            if (contentType.imageLibraryId != null && contentType.imageLibraryId != '') {
                //try to assign whole object with get 
                // contentTypeData = $rootScope.contentypedata;
                //try to assign value individual
                contentTypeData.singularName = $rootScope.contentypedata.singularName;
                contentTypeData.pluralName = $rootScope.contentypedata.pluralName;
                contentTypeData.identifier = $rootScope.contentypedata.identifier;
                contentTypeData.isContext = $rootScope.contentypedata.isContext;
                contentTypeData.imageLibraryId = contentType.imageLibraryId;
                contentTypeData.version = $rootScope.contentypedata.version;
                contentTypeData.updatedBy = $rootScope.manageITUserName;
                contentTypeData.contentTypePresentations = contetntypedata;
                imageLibraryService.update({ controller: 'imageLibrary' }, contentTypeData).$promise.then(function (response) {
                    $scope.showSuccessMessage($scope.messageModel, "Presentation updated Successfully");
                    // $scope.getlibrary('dimension');
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
            if (contentType.documentLibraryId != null && contentType.documentLibraryId != '') {
                contentTypeData.singularName = $rootScope.contentypedata.singularName;
                contentTypeData.pluralName = $rootScope.contentypedata.pluralName;
                contentTypeData.identifier = $rootScope.contentypedata.identifier;
                contentTypeData.isContext = $rootScope.contentypedata.isContext;
                contentTypeData.documentLibraryId = contentType.documentLibraryId;
                contentTypeData.version = $rootScope.contentypedata.version;
                contentTypeData.updatedBy = $rootScope.manageITUserName;
                contentTypeData.contentTypePresentations = contetntypedata;
                documentLibraryService.update({ controller: 'documentLibrary' }, contentTypeData).$promise.then(function (response) {
                    $scope.showSuccessMessage($scope.messageModel, "Presentation updated Successfully");
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
        }
    }]);
//your directive
manageitModule.directive("fileread", [
  function () {
      return {
          scope: {
              fileread: "="
          },
          link: function (scope, element, attributes) {
              element.bind("change", function (changeEvent) {
                  var files = changeEvent.target.files;                
                  $('#uploadimagename').val(files[0].name);
                  var reader = new FileReader();
                  reader.onload = function (loadEvent) {
                      scope.$apply(function () {
                          scope.fileread = loadEvent.target.result;
                      });
                  }
                  reader.readAsDataURL(changeEvent.target.files[0]);
              });
          }
      }
  }
]);

manageitModule.directive("checkboxGroup", function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            // Determine initial checked boxes
            if (scope.array.indexOf(scope.dataimg.roleId) !== -1) {
                elem[0].checked = true;
            }
            // Update array on click
            elem.bind('click', function() {
                var index = scope.array.indexOf(scope.dataimg.roleId);
                // Add if checked
                if (elem[0].checked) {
                    if (index === -1) scope.array.push(scope.dataimg.roleId);
                }
                    // Remove if unchecked
                else {
                    if (index !== -1) scope.array.splice(index, 1);
                }
                // Sort and update DOM display
                scope.$apply(scope.array.sort(function(a, b) {
                    return a - b
                }));
            });
        }
    }
});
manageitModule.directive("checkboxselectedGroup", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // Determine initial checked boxes
            if (scope.array1.indexOf(scope.dataimagetype.value) !== -1) {
                elem[0].checked = true;
            }
            // Update array on click
            elem.bind('click', function () {
                var index = scope.array1.indexOf(scope.dataimagetype.value);
                // Add if checked
                if (elem[0].checked) {
                    if (index === -1) scope.array1.push(scope.dataimagetype.value);
                }
                    // Remove if unchecked
                else {
                    if (index !== -1) scope.array1.splice(index, 1);
                }
                // Sort and update DOM display
                scope.$apply(scope.array1.sort(function (a, b) {
                    return a - b
                }));
            });
        }
    }
});