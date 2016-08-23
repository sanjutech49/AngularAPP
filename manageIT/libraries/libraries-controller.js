manageitModule.controller("librariesController", [
"$scope", "$route", "$rootScope", "imageLibraryService", "documentLibraryService", "$location", '$filter', 'sharedScope', "$uibModal", "dialogModal", "$routeParams", 'domainService', 'searchinterfaceService', '$window', 'textAttributeService',
	function ($scope, $route, $rootScope, imageLibraryService, documentLibraryService, $location, $filter, sharedScope, $uibModal, dialogModal, $routeParams, domainService, searchinterfaceService, $window, textAttributeService) {
	    $scope.docLibrary = { contentTypeId: '', singularName: '', pluralName: '', identifier: '', isContext: '' };
	    $scope.errorContentType = {
	        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
	    };
	    $scope.addError = function (val) {
	        $scope.errorContentType.messages.push(val);
	        $scope.errorContentType.isError = true;
	        $scope.errorContentType.isSuccess = false;
	        return $scope.errorContentType.isError;
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
	    $scope.clearContentTypeMessages = function () {	              
	        $scope.errorContentTypedetails.messages = [];
	        scope.errors = [];
	    }
	    $scope.array = [];
	    $scope.messageModel = {
	        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
	    };
	    $scope.errormessageModel = {
	        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
	    };
	    $scope.rooterrormessageModel = {
	        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
	    };
	    $scope.showExceptionMessage = function (attModel, message, moredetails) {
	        attModel.messages.push(message);
	        attModel.moreDetails = moredetails;
	        attModel.isError = true;
	    }
	    $scope.showSuccessMessage = function (attModel, message) {
	        attModel.messages.push(message);
	        attModel.isSuccess = true;	       
	    }
	    $scope.getAllLib = function () {	        
	        imageLibraryService.getAllImageLibraries({
	            controller: 'imageLibrary'}).$promise.then(function (response) {
	                $rootScope.allImageLibrary = response;	            
	        }, function (error) {
	        });
	    }
	    sharedScope.store('contentTypeController', $scope);
	    $scope.openErrorScreen = function (formStatus, formName) {
	        $scope.attributeFormDirty = formStatus;
	        $scope.attributeForm = formName;
	        $scope.isErrorScreen = true;

	    }
	    $scope.clearMessage = function (type) {
	        if ($scope.errorAttribute) {
	            $scope.resetErrorDirective($scope.errorAttribute);
	        }	       
	        $scope.paperType = '';
	        $scope.finishes = '';
	        
	    }
	    $scope.getDoclibrary = function () {
	        documentLibraryService.getAllDocumentLibraries({
	            controller: 'documentLibrary', id: $routeParams.documentLibraryId
	        }).$promise.then(function (response) {
	            $rootScope.docLibrary = response;
	        }, function (error) {
	        });
	    }
	    $scope.displayunits = function (unit) {
	        $scope.dimensions.dimensionUnit = unit;	      
	    }
	    $scope.imagelibraries = [];
	    $scope.getlibrary = function (type) {
	        imageLibraryService.getImageLibrary({
	            controller: 'imageLibrary', id: $routeParams.imageLibraryId
	        }).$promise.then(function (response) {
	            $scope.imagelibraries = response;
	            $rootScope.imageLibrary = response;	          

	        }, function (error) {
	        });	       
	        if (type == 'dimension') {
	            $scope.listdimensions();
	            $scope.dimensions = [];
	            $scope.dimensions.DimensionUnit = 'Millimeters';
	        } else if (type == 'Owner') {
	            $scope.listowner($rootScope.imageLibrary);
	        }
	        else if (type == 'PaperType') {
	            $scope.listPaperType();
	        }
	        else if (type == 'File') {
	            if ($rootScope.imageLibrary != '' && $rootScope.imageLibrary != undefined) {
	                $scope.imageLibraryFiletype = $rootScope.imageLibrary.imageFileTypes;
	            }	            	            
	        }
	        else if (type == 'Finishes') {
	            $scope.listFinishes();
	        }
	        else {
	            $scope.listowner($rootScope.imageLibrary);
	        }     
	        
	    }

	    $scope.confirmErrorScreenClose = function (attributeForm) {	       
	        angular.element('#' + attributeForm).modal('hide');
	        $scope.resetErrorDirective($scope.errormessageModel);
	        $scope.attributeFormDirty = false;	        
	        $scope.attributeForm = "";
	        $scope.isErrorScreen = false;
	        $scope.errors = [];	        
	        $scope.paperType = '';
	        $scope.finishes = '';
	        $scope.imageLibraryValue = '';
	        $scope.docLibrary = '';
	        //cancel papertype update with image lib
	        if (attributeForm == 'updatePaperTypeForm') {	           
	            var imgpapertype = [];
	            angular.forEach($scope.imagePaperType, function (value, key) {
	                value.selected = false;
	                imgpapertype.push(value);
	            });
	            $scope.imagePaperType = imgpapertype;	            
	        }
            //cancel finishes update with image lib
	        if (attributeForm == 'updateFinishesForm') {	            
	            var imgFinishes = [];
	            angular.forEach($scope.imageFinishes, function (value, key) {
	                value.selected = false;
	                imgFinishes.push(value);
	            });
	            $scope.imageFinishes = imgFinishes;
	        }
	    }
	    //image lib
	    $scope.err = true;
	    $scope.saveImageLibrary = function (imageLibrary) {
	        $scope.resetErrorDirective($scope.errorContentType);
	        $scope.errors = [];
	        $scope.resetErrorDirective($scope.messageModel);	          
	        imageLibrary.ImageLibraryId = null;
	        imageLibrary.createdBy = $rootScope.manageITUserName;
	        imageLibrary.createdDate = new Date();	       
	        imageLibrary.domainId = $rootScope.domainIdUi;
	        imageLibraryService.create(imageLibrary).$promise.then(function (result) {
	            console.log(result);
	            $scope.imageLibraryValue = '';
	            $scope.errorContentType.messages.push("Image library created successfully");
	            $scope.errorContentType.isSuccess = true;
	            $scope.errorContentType.isHide = true;
	            $scope.errorContentType.isError = false;
	            var rightMenuController = sharedScope.get('rightMenuController');
	            rightMenuController.listimagelibrary('saved');
	            rightMenuController.loadContentTypes('', result);              
	            rightMenuController.errorContentTypedetails.isError = $scope.errorContentType.isError;
	            rightMenuController.errorContentTypedetails.isSuccess = $scope.errorContentType.isSuccess;
	            rightMenuController.errorContentTypedetails.messages = $scope.errorContentType.messages;
	            //as per james updated requirement adding text addibute dynamicaaly

	            ////imageLibrary
	            var newAttribute = {};
	            newAttribute.name = result.singularName;
	            newAttribute.identifier = result.identifier;
	            newAttribute.mandatory = true;
	           newAttribute.readOnly = false;
	           newAttribute.uniqueValues = null;
	            newAttribute.imageLibraryId = result.imageLibraryId;
	            newAttribute.domainId = result.domainId;
	            newAttribute.documentLibraryId = '';
	            newAttribute.contentTypeId = '';
	            newAttribute.IsSingularityUnique = true;
	            newAttribute.uniqueGroup = "";
	            newAttribute.subObjectId = '0';
	            newAttribute.attributeSetId = '0';
	            newAttribute.attributeSetName = "Default";
	            //if (textAttribute.isSingularlyUnique == "1") {
	            //    newAttribute.IsSingularityUnique = true;
	            //    newAttribute.uniqueGroup = "";
	            //}
	            //else {
	            //    newAttribute.IsSingularityUnique = false;
	            //    newAttribute.uniqueGroup = textAttribute.uniqueGroup;
	            //}
	           
	            newAttribute.description = result.singularName;
	            newAttribute.multipleValues = { "allowMultipleValues": null, "isUnique": null, "isReArranged": null, "minimumValue": null, "maximumValue": null };
	            newAttribute.format = 0;
	            newAttribute.fieldWidth = "200";
	            newAttribute.minimumLength = "10";
	            newAttribute.maximumLength = "25";
	            newAttribute.minWordType = 0;
	            newAttribute.maxWordType = 0;
	            newAttribute.defaultValue = null;
	            newAttribute.createdBy = $rootScope.manageITUserName;
	            // newAttribute.createdDate = new Date();
	            //"domainId":"57a17d514727d43f5cab7c96","imageLibraryId":"","contentTypeId":"57a17e694727d45b7c3577e2","documentLibraryId":"","subObjectId":"0","attributeSetId":"0","attributeSetName":"Default","name":"zxzx","identifier":"zxzx","mandatory":true,"readOnly":false,"uniqueValues":null,"IsSingularityUnique":false,"uniqueGroup":null,"description":null,"multipleValues":{"allowMultipleValues":null,"isUnique":null,"isReArranged":null,"minimumValue":null,"maximumValue":null},"format":0,"fieldWidth":"200","minimumLength":"10","maximumLength":"25","minWordType":0,"maxWordType":0,"defaultValue":null,"createdBy":"IPP"}
	            console.log(JSON.stringify(newAttribute));
	            textAttributeService.create({ attributeType: 'textattribute' }, newAttribute).$promise.then(function (response) {
	                console.log(response                    );
	            },function (error) {
	                if (error.data.errorMessage) {
	                    console.log('error');
	                }
	                else {
	                    $scope.errorAttribute.messages.push("Error occured while saving the Text Attribute. Please try after sometime.");
	                    $scope.errorAttribute.isError = true;
	                    $scope.errorAttribute.isHide = true;
	                }
	            });


	            $('#imageLibrary').hide();
	            $('.modal-backdrop').hide();
	        }, function (error) {	         
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {	                              
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	        });
	    }	 
	    $scope.showConfirm = function (formstatus) {
	        
	        $scope.formstatus = formstatus;
	        if (formstatus) {	           
	            $scope.message = "There are unsaved changes, Are you sure you want to discard the changes?";
	            angular.element('#closeModel').modal('show');
	        } 
	    }
	    $scope.confirmdiscard = function (type) {
	        if (type == 'FileType') {
	            $scope.imageLibraryFiletype = '';
	            $scope.imageLibraryFiletype = $rootScope.imageLibrary.imageFileTypes;
	        }
	        if (type == 'Finishes') {
	            $scope.imageFinishes = '';
	            $scope.listFinishes();
	            $scope.imageFinishes = $scope.imageFinishes;
	        }
	        if (type == 'PaperType') {
	            $scope.imagePaperType = '';
	            $scope.listPaperType();
	            $scope.imagePaperType = $scope.imagePaperType;
	        }
	        if (type == 'dimension') {
	            $scope.imageDimensions = '';
	            $scope.listdimensions();	           
	            $scope.imageDimensions = $scope.imageDimensions;
	        }
	        if (type == 'OwnerType') {
	            $scope.listattributesSearchval = '';
	            $scope.searchinterfaces = '';	         
	        }	        
	    }
	    $scope.saveImageFiletype = function (filedetails) {
	        $scope.resetErrorDirective($scope.errormessageModel);
	        $scope.resetErrorDirective($scope.messageModel);	            
	        if (filedetails == null || filedetails == undefined) {
	            $scope.showExceptionMessage($scope.errormessageModel, "Please add allow file types or check allow all file Types");
	            return false;
	        }
	        else (filedetails.allowedFileTypes != null); {
	             var res = filedetails.allowedFileTypes.split(",");
	             for (i = 0 ;i < res.length ; i++ ) {	                 
	                 var test = res[i].startsWith("*.");	                
	                 if (test == false) {
	                     $scope.showExceptionMessage($scope.errormessageModel, "Enter the Valid File Types / Extensions");
	                     return false;
	                 }
	             }
	         }
	        
	             var newimageinterface = new imageLibraryService();
	             newimageinterface.imageLibraryId = $rootScope.imageLibrary.imageLibraryId;
	             newimageinterface.identifier = $rootScope.imageLibrary.identifier;
	             newimageinterface.singularName = $rootScope.imageLibrary.singularName;
	             newimageinterface.Name = $rootScope.imageLibrary.singularName;
	             newimageinterface.pluralName = $rootScope.imageLibrary.pluralName;
	             newimageinterface.updateBy = "IPP";
	             var filetypes = { AllowedFileTypes: filedetails.allowedFileTypes, DenyFileTypes: filedetails.denyFileTypes, IsAllowedAllTypes: filedetails.isAllowedAllTypes };
	             newimageinterface.selectedFinishes = $rootScope.imageLibrary.selectedFinishes;
	             newimageinterface.selectedOwnerTypes = $rootScope.imageLibrary.selectedOwnerTypes;
	             newimageinterface.selectedPaperTypes = $rootScope.imageLibrary.selectedPaperTypes;
	             newimageinterface.selectedDimensions = $rootScope.imageLibrary.selectedDimensions;

	             newimageinterface.ImageFileTypes = filetypes;

	             imageLibraryService.update({ controller: 'imageLibrary' }, newimageinterface).$promise.then(function (response) {
	                 $scope.showSuccessMessage($scope.messageModel, "Filetypes updated successfully");

	             }, function (error) {
	                 if (error.data.errorMessage) {
	                     angular.forEach(error.data.errorMessage, function (value, key) {
	                         $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                     });
	                 }
	             });
	    }
	    $scope.savedimensions = function (dimension) {
	        $scope.resetErrorDirective($scope.errormessageModel);
	        $scope.resetErrorDirective($scope.messageModel);
	        var dimensions = {};
	        dimensions.Height = dimension.Height;
	        dimensions.Width = dimension.Height;
	        dimensions.DimensionUnit = dimension.DimensionUnit;
	        dimensions.dpi = dimension.Dpi;
	        dimensions.Id = null;	        
	        imageLibraryService.createDimension(dimensions).$promise.then(function (result) {
	            $('#addImageDimension').hide();
	            $('.modal-backdrop').hide();
	            $scope.addImageDimensionForm.$setPristine();
	            $scope.showSuccessMessage($scope.messageModel, "Dimension added successfully");
	            $scope.dimensions = '';
	            $scope.listdimensions();
	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	        });	        
	    }
	    $scope.listdimensions = function () {
	        $scope.imageDimensions = [];
	        var dimensionslist = [{ dimensionUnit: 'Allow Images of any Size', selected: false }];
	        imageLibraryService.getAllDimensions().$promise.then(function (details) {
	       
	           
	          //  var dimensionslist = [];
	           
	            for (var j = 0; j < details.length ; ++j) {	                
	                var contentType = details[j];	               
	                contentType.selected = false;
	                dimensionslist.push(contentType);
	            }
	           
	            if ($rootScope.imageLibrary.selectedDimensions) {	               
	                angular.forEach($rootScope.imageLibrary.selectedDimensions, function (value, key) {
	                    for (var i = 0; i < dimensionslist.length; i++) {
	                        var contentType = dimensionslist[i];
	                        if (contentType.id == value) {
	                            contentType.selected = true;	                           
	                        }
	                        dimensionslist.splice(i, 1);
	                        dimensionslist.push(contentType);
	                    }
	                });
	            }
	            $scope.imageDimensions = dimensionslist;
	         
	          
	        }, function (error) {
	            var dimensionslist = [{ dimensionUnit: 'Allow Images of any Size', selected: false }];
	            $scope.imageDimensions = dimensionslist;

	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    console.log(value.message);
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message);
	                });
	            }

	        });
	    }
	    //save papertype
	    $scope.savePapertype = function (papertypes) {	       
	        $scope.resetErrorDirective($scope.errormessageModel);
	        $scope.resetErrorDirective($scope.messageModel);
	        papertypes.Id = null;
	        papertypes.createdBy = $rootScope.manageITUserName;
	        papertypes.createdDate = new Date();
	        $scope.checkval = false;	     
	        angular.forEach($scope.imagePaperType,function(value,key) {
	            if (papertypes.Name == value.name || papertypes.Name == '') {
	                $scope.checkval = true;
	            }
	        });
	        if(!$scope.checkval){	            
	            imageLibraryService.createPaperType(papertypes).$promise.then(function (result) {
	                $('#addPaperType').hide();
	                $('.modal-backdrop').hide();
	                $scope.addPaperTypeForm.$setPristine();
	                $scope.paperType = '';
	                $scope.showSuccessMessage($scope.messageModel, "Papertype added successfully");
	                $scope.listPaperType();
	            }, function (error) {
	                if (error.data.errorMessage) {
	                    angular.forEach(error.data.errorMessage, function (value, key) {
	                        $scope.showExceptionMessage($scope.errormessageModel, value.message);
	                    });
	                }
	            });
	        }
	        else {
	            if (papertypes.Name != '') {
                    $scope.showExceptionMessage($scope.errormessageModel, "Papertype name already Exist");
	            }
	            else {
                    $scope.showExceptionMessage($scope.errormessageModel, "Papertype Not be an Empty ");
                }	            
            }	        
	    }
	    $scope.listPaperType = function () {	        
	        var PaperTypelist = [{ id: "1" ,name: 'Allow Images of any Paper Type', selected: false }];
	        imageLibraryService.getAllPaperTypes().$promise.then(function (details) {
	            $scope.imagePaperType = [];	   
	            for (var j = 0; j < details.length ; ++j) {	                
	                var contentType = details[j];
	                contentType.selected = false;
	                PaperTypelist.push(contentType);
	            }	           
	            var newpapertypeList = [];
	            if ($rootScope.imageLibrary.selectedPaperTypes) {
	                angular.forEach(PaperTypelist, function (value, key) {
	                    if ($rootScope.imageLibrary.selectedPaperTypes.indexOf(value.id) != -1) {
	                        value.selected = true;
	                        newpapertypeList.push(value);
	                    }
	                    else {
	                        value.selected = false;
	                        newpapertypeList.push(value);
	                    }	                    
	                });
	            }
	            $scope.imagePaperType = newpapertypeList;	            

	        }, function (error) {
	            $scope.imagePaperType = PaperTypelist;
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	           
	        });
	    }
	    //save finishes
	    $scope.saveFinishes = function (finishes) {
	        $scope.resetErrorDirective($scope.errormessageModel);
	        $scope.resetErrorDirective($scope.messageModel);
	        finishes.Id = null;
	        finishes.createdBy = $rootScope.manageITUserName;
	        finishes.createdDate = new Date();
	        imageLibraryService.createFinishes(finishes).$promise.then(function (result) {
	            $('#addFinishes').hide();
	            $('.modal-backdrop').hide();
	            $scope.addFinishesForm.$setPristine();
	            $scope.finishes = '';
	            $scope.showSuccessMessage($scope.messageModel, "Finishes added successfully");
	            $scope.listFinishes();
	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	        });
	    }

	    $scope.listFinishes = function () {       
	    
	        var defaultval = { id: "1", name: 'Allow Images of any Finishes', selected: false };
	        var dimensionslist = [];
	        dimensionslist.push(defaultval);
	        imageLibraryService.getAllFinishes().$promise.then(function (details) {
	            $scope.imageFinishes = [];	           
	            for (var j = 0; j < details.length ; ++j) {	               
	                var contentType = details[j];	                
	                contentType.selected = false;	                
	                dimensionslist.push(contentType);
	            }	         	          
	            var newDimensionsList = [];	           
	            if ($rootScope.imageLibrary.selectedFinishes) {
	                angular.forEach(dimensionslist, function (value, key) {
	                    if ($rootScope.imageLibrary.selectedFinishes.indexOf(value.id) != -1) {
	                        value.selected = true;
	                        newDimensionsList.push(value);
	                    }
	                    else {
	                        value.selected = false;
	                        newDimensionsList.push(value);
	                    }
	                });
	            }
	            if (newDimensionsList)
	                $scope.imageFinishes = newDimensionsList;
	            else
	                $scope.imageFinishes = dimensionslist;
	        }, function (error) {
	            console.log('else');
	            $scope.imageFinishes = dimensionslist;
	        });
	    }	    
	    $scope.updateImageFinishes = function () {
	        $scope.resetErrorDirective($scope.messageModel);
	        var newimageinterface = new imageLibraryService();
	        newimageinterface = $rootScope.imageLibrary;
	        newimageinterface.updateBy = "IPP";
	        
	        if ($scope.imageFinishes) {
	            newimageinterface.selectedFinishes = [];
	            for (var i = 0; i < $scope.imageFinishes.length; i++) {
	                var contentType = $scope.imageFinishes[i];
	                if (contentType.selected) {
	                    newimageinterface.selectedFinishes.push(contentType.id);
	                }
	            }
	        }	       
	        imageLibraryService.update({ controller: 'imageLibrary' }, newimageinterface).$promise.then(function (response) {
	            $scope.getlibrary('Finishes');
	            $scope.showSuccessMessage($scope.messageModel, "Imagefinishes updated successfully");	            
	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    console.log(value.message);
	                    $scope.showExceptionMessage($scope.rooterrormessageModel, value.message, value.moredetails);
	                });
	            }
	        });
	    }

	    //update paper types	      
	   
	    $scope.updatePaperType = function () {	        
	        $scope.resetErrorDirective($scope.messageModel);
	        var newimageinterface = new imageLibraryService();
	        newimageinterface  = $rootScope.imageLibrary;	       
	        newimageinterface.updateBy = "IPP";	              
	        if ($scope.imagePaperType) {
	            newimageinterface.selectedPaperTypes = [];
	            for (var i = 0; i < $scope.imagePaperType.length; i++) {
	                var contentType = $scope.imagePaperType[i];	               
	                if (contentType.selected) {	                    
	                    newimageinterface.selectedPaperTypes.push(contentType.id);
	                }
	            }
	        }	       
	        imageLibraryService.update({ controller: 'imageLibrary' }, newimageinterface).$promise.then(function (response) {
	            $scope.getlibrary('PaperType');
	            console.log($rootScope.imageLibrary);
	            $scope.showSuccessMessage($scope.messageModel, "Image papertype updated successfully");
	            
	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	        });
	        
	    }
	    // update dimensions	  
	    $scope.updateimageDimensions = function () {
	        $scope.resetErrorDirective($scope.messageModel);
	        var newimageinterface = new imageLibraryService();
	        newimageinterface = $rootScope.imageLibrary;	       
	        newimageinterface.updateBy = "IPP";
	        if ($scope.imageDimensions) {
	            newimageinterface.selecteddimensions = [];
	            for (var i = 0; i < $scope.imageDimensions.length; i++) {
	                var contentType = $scope.imageDimensions[i];
	                if (contentType.selected) {
	                    newimageinterface.selecteddimensions.push(contentType.id);
	                }
	            }
	        }
	        imageLibraryService.update({ controller: 'imageLibrary' }, newimageinterface).$promise.then(function (response) {
	            $scope.showSuccessMessage($scope.messageModel, "Image dimensions updated successfully");
	           // $scope.getlibrary('dimension');
	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	        });
	    }
	    //owner type
	    $scope.listowner = function () {
	       // $scope.getlibrary();
	        domainService.getAllDomains().$promise.then(function (result) {
	            var listattributes = [];
	            angular.forEach(result, function (value, key) {
	                if (value.isUserDefinedDomain == true) {
                          listattributes.push(value);
	                }	              
	            });
	            $scope.listattributesval = listattributes;
	            $rootScope.listattributesval = listattributes;
	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.errors.push(value.message);
	                });
	            }
	        });
	        //edit owner from database 

	        $scope.idSelected = $rootScope.imageLibrary.selectedOwnerTypes.selectedImages[0].attributeId;
	        $scope.selectedAttributes = $rootScope.imageLibrary.selectedOwnerTypes.selectedImages[0].attributeId;
	        $scope.saveowenerslist();
	        $scope.searchlistoptions = $rootScope.imageLibrary.selectedOwnerTypes.selectedImages[0].searchOption;	
	        var searchOptionArry = [];
	        angular.forEach($scope.searchlistoptions, function (value, key) {
	            searchOptionArry.push(value.searchId);
	        });
	        $scope.imageowner = [];
	        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
	        $scope.imageowner.DomainId = contentType.domainId;
	        $scope.imageowner.ContentTypeId = contentType.ContentTypeId;
	        $scope.imageowner.DomainName = contentType.domainName ? contentType.domainName : '';
	        $scope.imageowner.ContentTypeName = contentType.name;

	        var sav = 0;
	        searchinterfaceService.query({ controller: 'SearchInterface', contentTypeId: $rootScope.imageLibrary.selectedOwnerTypes.selectedImages[0].contentTypeId, subObjectId: sav }).$promise.then(function (details) {
	            var contentTypeUserinterfaces = [];
	            var subObjectUserinterfaces = [];
	            angular.forEach(details, function (value, key) {
	                contentTypeUserinterfaces.push(value);	               
	            });	          
	            var searchlist = [];
	            angular.forEach(contentTypeUserinterfaces, function (value, key) {	                
	                if (searchOptionArry.indexOf(value.searchInterfaceId) != -1) {	                   
	                    value.selected = true;
	                }
	                else {	                    
	                    value.selected = false;
	                }	                
	                searchlist.push(value);
	            });
	            $scope.searchinterfaces = searchlist;
	        }, function (error) {

	        });

	    }
	    $scope.idSelectedVote = null;
	    $scope.selectedAttributes = '';
	    $scope.addownersearch = function (attid, conid, attname) {
	        $scope.selectedAttributes = attid;
	        $scope.selectedAttributename = attname;
	        $scope.idSelectedVote = attid;
	    }
	    $scope.saveowenerslist = function () {	        
	        angular.element('#addOwner').modal('hide');
	        $scope.listattributesSearchval = [];
	        var newval = [];	      
	        angular.forEach($rootScope.listattributesval, function (value, key) {
	            angular.forEach(value.contentTypes, function (value1, key1) {
	                angular.forEach(value1.defaultAttributes, function (v, k) {
	                    if (v.attributeId == $scope.selectedAttributes) {
	                        newval.push(value);
	                    }
	                });
	            });
	        });
	        $scope.listattributesSearchval = newval;	       
	    }
	    $scope.editsearch = function (editsearch) {
	        $scope.editsearch = editsearch;
	        $scope.editsearch.oldName = editsearch.name;
	    }
        $scope.updateSearOptionOwnerType = function (data) {
            console.log(data);
        }
	    $scope.updateOwnerType = function () {
	        $scope.SearchOption = [];
	        var searchOption = [];
	        for (var i = 0; i < $scope.searchoption.length; i++) {	           
	            var selecteddim = { DomainId: $scope.imageowner.DomainId, ContentTypeId: $scope.imageowner.ContentTypeId, SearchId: $scope.searchoption[i].id, DomainName: $scope.imageowner.DomainName, ContentTypeName: $scope.imageowner.ContentTypeName, SearchName: $scope.searchoption[i].name };
	            searchOption.push(selecteddim);
	        }
	        $scope.SearchOption = searchOption;
	        var ownertype = { DomainId: $scope.imageowner.DomainId, ContentTypeId: $scope.imageowner.ContentTypeId, AttributeId: $scope.selectedAttributes, DomainName: $scope.imageowner.DomainName, ContentTypeName: $scope.imageowner.ContentTypeName, AttributeName: $scope.selectedAttributename, SearchOption: $scope.SearchOption };
	        $scope.SelectedImages = [];
	        $scope.SelectedImages.push(ownertype);

	        var newimageinterface = new imageLibraryService();
	        newimageinterface = $rootScope.imageLibrary;	        
	        newimageinterface.updateBy = "IPP";
	        newimageinterface.selectedOwnerTypes = { SelectedImages: $scope.SelectedImages };	       
	        imageLibraryService.update({ controller: 'imageLibrary' }, newimageinterface).$promise.then(function (response) {
	            $scope.showSuccessMessage($scope.messageModel, "Image ownership updated successfully");
	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	        });
	    }
	    $scope.searchoption = [];
	    $scope.updatesearchlist = function (val, name) {
	        var val1 = { id: val, name: name };
	        $scope.searchoption.push(val1);
	    }
	    $scope.libSearch = [];
	    $scope.savesearchval = function (updateval) {	      
	        var searchinterfaceupdate = [];
	        angular.forEach($scope.searchinterfaces, function (value, key) {
	            if (value.searchInterfaceId == updateval.searchInterfaceId) {	                
	                value.name = updateval.name
	                searchinterfaceupdate.push(value);
	            }
	            else {
	                searchinterfaceupdate.push(value);
	            }
	        });
	        $scope.searchinterfaces = searchinterfaceupdate;
	        $("#renamesearchinterface").modal('hide');
	    }
	    $scope.loadSearchList = function (attId, contentId, domainId, domainName, contentname) {
	        $scope.idSelected = attId;
	        $scope.searchinterfaces = '';
	        var sav = 0;
	        $scope.imageowner = [];
	        $scope.imageowner.DomainId = domainId;
	        $scope.imageowner.ContentTypeId = contentId;
	        $scope.imageowner.DomainName = domainName;
	        $scope.imageowner.ContentTypeName = contentname;

	        searchinterfaceService.query({ controller: 'SearchInterface', contentTypeId: contentId, subObjectId: sav }).$promise.then(function (details) {	           
	            var contentTypeUserinterfaces = [];
	            var subObjectUserinterfaces = [];
	            angular.forEach(details, function (value, key) {
	                contentTypeUserinterfaces.push(value);
	            });
	            $rootScope.searchinterfaces = contentTypeUserinterfaces;
	            $scope.searchinterfaces = contentTypeUserinterfaces;	           
	        }, function (error) {
	            
	        });
	    }
	    $scope.saveDocLibrary = function (docLibrary) {
	        docLibrary.documentLibraryId = null;
	        docLibrary.domainId = $rootScope.domainIdUi;
	        docLibrary.createdBy = $rootScope.manageITUserName;
	        docLibrary.createdDate = new Date();
	        documentLibraryService.create(docLibrary).$promise.then(function (result) {
	            $('#docLibrary').hide();
	            $('.modal-backdrop').hide();
	            $scope.docLibraryForm.$setPristine();
	            $scope.docLibrary = '';
	            $scope.errorContentType.messages.push("Document library created successfully");
	            $scope.errorContentType.isSuccess = true;
	            $scope.errorContentType.isError = false;
	            var rightMenuController = sharedScope.get('rightMenuController');
	            rightMenuController.listdocumentlibrary('saved');
	            rightMenuController.loadContentTypes('', result, 'Doc');
	            rightMenuController.errorContentTypedetails.isError = $scope.errorContentType.isError;
	            rightMenuController.errorContentTypedetails.isSuccess = $scope.errorContentType.isSuccess;
	            rightMenuController.errorContentTypedetails.messages = $scope.errorContentType.messages;

	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.errorContentType.messages.push(value.message);
	                    $scope.errorContentType.moreDetails = value.moreDetails;
	                    $scope.errorContentType.isError = true;
	                    $scope.errorContentType.isHide = false;
	                });
	            }
	        });
	    }
	    $scope.saveDocFileType = function (filedetails) {	       
	        var newdocinterface = new documentLibraryService();
	        newdocinterface.documentLibraryId = $scope.docLibrary.documentLibraryId;
	        newdocinterface.identifier = $scope.docLibrary.identifier;
	        newdocinterface.singularName = $scope.docLibrary.singularName;
	        newdocinterface.Name = $scope.docLibrary.singularName;
	        newdocinterface.pluralName = $scope.docLibrary.pluralName;
	        newdocinterface.updateBy = "IPP";
	        var filetypes = { AllowedFileTypes: filedetails.AllowedFileTypes, DenyFileTypes: filedetails.DenyFileTypes, IsAllowedAllTypes: filedetails.IsAllowedAllTypes };
	        newdocinterface.DocumentFileTypes = filetypes;	      
	        documentLibraryService.update({ controller: 'documentLibrary' }, newdocinterface).$promise.then(function (response) {	          
	            $scope.showSuccessMessage($scope.messageModel, "Filetypes updated successfully");
	        }, function (error) {	           
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                    $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
	                });
	            }
	        });
	    }
	    $scope.updateImageLibrary = function (imageLibrary) {
	        $scope.resetErrorDirective($scope.errorContentType);
	        $scope.errContentType = [];	     
	        if (imageLibrary.imageLibraryId != null && imageLibrary.imageLibraryId != "") {	                       
	            imageLibrary.updatedBy = $rootScope.manageITUserName;
	            var manageITController = sharedScope.get('rightMenuController');
	            var newimageinterface = new imageLibraryService();
	            newimageinterface.imageLibraryId = imageLibrary.imageLibraryId;
	            newimageinterface.identifier = imageLibrary.identifier;
	            newimageinterface.singularName = imageLibrary.singularName;
	            newimageinterface.Name = imageLibrary.singularName;
	            newimageinterface.pluralName =imageLibrary.pluralName;
	            newimageinterface.updateBy = "IPP";
	            newimageinterface.version = imageLibrary.version;
	            newimageinterface.ImageFileTypes = $scope.imageLibrary.imageFileTypes;
	            newimageinterface.selectedOwnerTypes = $scope.imageLibrary.selectedOwnerTypes;
	            newimageinterface.selectedPaperTypes = $scope.imageLibrary.selectedPaperTypes;
	            newimageinterface.selectedDimensions = $scope.imageLibrary.selectedDimensions;
	            newimageinterface.selectedFinishes = $scope.imageLibrary.selectedFinishes;
	            imageLibraryService.update({ controller: 'imageLibrary' }, newimageinterface).$promise.then(function (response) {  
	                    $scope.errorContentType.messages.push("Image library updated successfully");
	                    $scope.errorContentType.isSuccess = true;
	                    $scope.errorContentType.isError = false;
	                    manageITController.errorContentTypedetails.isError = $scope.errorContentType.isError;
	                    manageITController.errorContentTypedetails.isSuccess = $scope.errorContentType.isSuccess;
	                    manageITController.errorContentTypedetails.messages = $scope.errorContentType.messages;
	                    $scope.listimagelibrary();
	                    manageITController.showContentType($scope.imageLibrary, "Image");
	            }, function (error) {	                
	                if (error.data.errorMessage) {
	                    angular.forEach(error.data.errorMessage, function (value, key) {	                       
	                        $scope.errorContentType.messages.push(value.message);	                       
	                    });	                   
	                    manageITController.errorContentTypedetails.isError = true;
	                    manageITController.errorContentTypedetails.isSuccess = false;
	                    manageITController.errorContentTypedetails.messages = $scope.errorContentType.messages;
	                }
	            });
	        }
	    };
	    $scope.updateDocumentLibrary = function (docLibrary) {
	        
	        if (docLibrary.documentLibraryId != null && docLibrary.documentLibraryId != "") {
	            var rightMenuController = sharedScope.get('rightMenuController');	
	            var manageITController = sharedScope.get('rightMenuController');
	            var newimageinterface = new documentLibraryService();
	            newimageinterface.documentLibraryId = docLibrary.documentLibraryId;
	            newimageinterface.identifier = docLibrary.identifier;
	            newimageinterface.singularName = docLibrary.singularName;
	            newimageinterface.Name = docLibrary.singularName;
	            newimageinterface.pluralName = docLibrary.pluralName;
	            newimageinterface.UpdateBy = "IPP";
	            documentLibraryService.update(newimageinterface).$promise.then(function (result) {
	                $scope.documentLibraryUpdateForm.$setPristine();
	                $scope.errorContentType.messages.push("Document library updated successfully");
	                $scope.errorContentType.isSuccess = true;
	                rightMenuController.listdocumentlibrary('saved');
	                rightMenuController.showContentType(result, 'Doc');	               
	                $scope.errorContentType.isError = false;
	                manageITController.errorContentTypedetails.isError = $scope.errorContentType.isError;
	                manageITController.errorContentTypedetails.isSuccess = $scope.errorContentType.isSuccess;
	                manageITController.errorContentTypedetails.messages = $scope.errorContentType.messages;
	            }, function (error) {
	                if (error.data.errorMessage) {
	                    angular.forEach(error.data.errorMessage, function (value, key) {
	                        $scope.errorContentType.messages.push(value.message);
	                    });
	                    manageITController.errorContentTypedetails.isError = true;
	                    manageITController.errorContentTypedetails.isSuccess = false;
	                    manageITController.errorContentTypedetails.messages = $scope.errorContentType.messages;
	                }
	            });
	        }
	    };
	    $scope.loadImageLibraries = function () {
	        $scope.imageLibrary = [];
	        var imageLibrary = sharedScope.get('rightMenuController').contentTypeModel;
	        $scope.imageLibrary.imageLibraryId = imageLibrary.imageLibraryId;
	        $scope.imageLibrary.singularName = imageLibrary.singularName;
	        $scope.imageLibrary.pluralName = imageLibrary.pluralName;
	        $scope.imageLibrary.identifier = imageLibrary.identifier;
	        $scope.imageLibrary.version = imageLibrary.version;
	        $scope.errors = [];
	    }
	    $scope.loadDocumentLibraries = function () {
	        $scope.docLibrary = [];
	        var docLibrary = sharedScope.get('rightMenuController').contentTypeModel;
	        $scope.docLibrary.documentLibraryId = docLibrary.documentLibraryId;
	        $scope.docLibrary.singularName = docLibrary.singularName;
	        $scope.docLibrary.pluralName = docLibrary.pluralName;
	        $scope.docLibrary.identifier = docLibrary.identifier;
	        $scope.errors = [];
	    }
	    $scope.deriveDocIdentifier = function () {
	        $scope.docLibrary.identifier = $filter('camelize')($scope.docLibrary.pluralName);
	    }
	    $scope.deriveIdentifier = function () {
	        $scope.imageLibraryValue.identifier = $filter('camelize')($scope.imageLibraryValue.pluralName);
	    }
	}]);