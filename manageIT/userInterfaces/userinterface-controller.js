manageitModule.controller("userInterfaceController", ['$scope', '$rootScope', 'sharedScope', '$filter', 'classificationService', '$routeParams',
    'textAttributeService', 'userinterfaceService', 'newSharedScope', 'attributeMapService', 'viewuserinterfaceService', 'edituserinterfaceService',
    function ($scope, $rootScope, sharedScope, $filter, classificationService, $routeParams, textAttributeService, userinterfaceService, newSharedScope, attributeMapService, viewuserinterfaceService, edituserinterfaceService) {
        sharedScope.store('userInterfaceController', $scope);
        //write your functions from here
        $scope.userinterfaces = [];
        $scope.errors = [];
        $scope.errorText = [];
        
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
        $scope.viewMessageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.editMessageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.errormessageModel = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.errorAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.userinterfaceErrAttribute = {
            isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
        };
        $scope.classificationCondition = [
           { key: "0", value: "Any Classification" },
           { key: "1", value: "Conditional Classification" }
        ];      
        $scope.userinterface = {
            userinterfaceId: null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, viewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
        };       
        $scope.htmlreorderchange = false;
        // defaultly load list userinterfaces  

        $scope.defaultUserinterfaces = function () {
            $scope.userinterfaces = '';
           
            // for content type
            if ($routeParams.subObjectId == 0) {
                // get user list interfaces based on content type and library also based subobject

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var  libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId
                }
                else {
                    var libraryid = contentType.documentLibraryId
                } 
              
                userinterfaceService.queryLibrary({ controller: 'UserInterface', domainId: contentType.domainId, contentTypeId: libraryid }).$promise.then(function (details) {

             //   userinterfaceService.query({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });
                    if ($routeParams.subObjectId == "0") {
                        $scope.userinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.userinterfaces = subObjectUserinterfaces;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });

            } else {


                // get  list userinterfaces for subobjects based on content type and library also based subobject

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var  libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId;
                }
                else {
                    var libraryid = contentType.documentLibraryId;
                } 
              
                userinterfaceService.soqueryLibrary({ controller: 'UserInterface', domainId: contentType.domainId, contentTypeId: libraryid, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {

             //   userinterfaceService.soquery({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });
                    if ($routeParams.subObjectId == "0") {
                        $scope.userinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.userinterfaces = subObjectUserinterfaces;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });

            }
        }
        $scope.ViewuserinterfaceType = 'Add';
        $scope.defaultViewUserinterfaces = function () {          
            $scope.viewuserinterfaces = '';
            $scope.resetErrorDirective($scope.messageModel);
            // for content type
            if ($routeParams.subObjectId == 0) {

                // get view user interfaces based on content type and library also based subobject

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId
                }
                else {
                    var libraryid = contentType.documentLibraryId
                }
                viewuserinterfaceService.queryLibrary({ controller: 'UserInterface', domainId: contentType.domainId, contentTypeId: libraryid }).$promise.then(function (details) {
              //  viewuserinterfaceService.query({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });
                    if ($routeParams.subObjectId == "0") {
                        $scope.viewuserinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.viewuserinterfaces = subObjectUserinterfaces;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });
            }
            else {
                // get  list userinterfaces for subobjects based on content type and library also based subobject

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId;
                }
                else {
                    var libraryid = contentType.documentLibraryId;
                }
                viewuserinterfaceService.soquery({ controller: 'UserInterface', contentTypeId: libraryid, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {

                //viewuserinterfaceService.soquery({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });
                    if ($routeParams.subObjectId == "0") {
                        $scope.viewuserinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.viewuserinterfaces = subObjectUserinterfaces;
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });
            }
        }
        // listing  edit userinterfaces
        $scope.defaultEditUserinterfaces = function () {
            $scope.edituserinterface = '';
            $scope.resetErrorDirective($scope.messageModel);
            // for content type
            if ($routeParams.subObjectId == 0) {
                // get view user interfaces based on content type and library also based subobject

                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                if (contentType.imageLibraryId) {
                    var libraryid = contentType.imageLibraryId;
                } else if (contentType.contentTypeId) {
                    var libraryid = contentType.contentTypeId;
                }
                else {
                    var libraryid = contentType.documentLibraryId;
                }
                edituserinterfaceService.queryLibrary({ controller: 'UserInterface', domainId: contentType.domainId, contentTypeId: libraryid }).$promise.then(function (details) {

              //  edituserinterfaceService.query({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });

                    if ($routeParams.subObjectId == "0") {
                        $scope.edituserinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.edituserinterfaces = subObjectUserinterfaces;
                    }

                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });
            }
            else {
               edituserinterfaceService.soquery({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId }).$promise.then(function (details) {
                    var contentTypeUserinterfaces = [];
                    var subObjectUserinterfaces = [];
                    angular.forEach(details, function (value, key) {
                        if (value.subObjectId == null || value.subObjectId == "0") {
                            contentTypeUserinterfaces.push(value);
                        }
                        else {
                            if (value.subObjectId == $routeParams.subObjectId)
                                subObjectUserinterfaces.push(value);
                        }
                    });

                    if ($routeParams.subObjectId == "0") {
                        $scope.edituserinterfaces = contentTypeUserinterfaces;
                    }
                    else {
                        $scope.edituserinterfaces = subObjectUserinterfaces;
                    }

                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                        });
                    }

                });
            }
        }
        $scope.defaultUserinterfaces();
        $scope.defaultViewUserinterfaces();
        $scope.defaultEditUserinterfaces();     
        $scope.validatehtml = function(type)
        {
            if ($scope.userinterface.htmlfilename !== undefined) {
                var allowedFiles = [".html"];              
                var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
                if (!regex.test($scope.userinterface.htmlfilename.toLowerCase())) {
                    $scope.showExceptionMessage($scope.errormessageModel, "Upload a Valid file with html file format");
                    return false;
                }                
            }
            if (type == "List") {
                $scope.saveUserInterface();
            }
            if (type == "View") {
                $scope.saveViewUserInterface();
            }
            if (type == "Edit") {
                $scope.saveEditUserInterface();
            }

        }

        function clearScopeMessages()
        {
            //cleared the earlier messages
            if ($scope.errormessageModel.messages != undefined && $scope.errormessageModel.messages.length > 0) {
                $scope.errormessageModel.messages.length = 0;
            }

        }
        $scope.messageClear = function () {
            $scope.resetErrorDirective($scope.messageModel);
            $scope.resetErrorDirective($scope.viewMessageModel);
            $scope.resetErrorDirective($scope.editMessageModel);
        }
        $scope.saveUserInterface = function () {
            
            var interfaceinfo = $scope.userinterface;          
            if (interfaceinfo.isAnyViewClassification == undefined) {
                interfaceinfo.isAnyViewClassification = '0';              
            }                   
            $scope.messageClear();
            var classificationExpressionBuilderController2 = newSharedScope.get('classificationExpressionBuilderController2');
            //create an instance of the factory       
            var newclassification = new userinterfaceService();
            newclassification.contentTypeId = $routeParams.contentTypeId;
            newclassification.subObjectId = $routeParams.subObjectId;
            newclassification.name = interfaceinfo.userinterfaceName;
            newclassification.isEnabled = interfaceinfo.isEnabled;
            newclassification.viewNegationOperator = interfaceinfo.viewNegationOperator;
            //alert(newclassification.viewNegationOperator);
            newclassification.isAnyClassification = interfaceinfo.isAnyViewClassification == "0" ? true : false;          
            newclassification.listInterfaceId = interfaceinfo.listInterfaceId;
            if (!newclassification.isAnyClassification) {
                newclassification.ViewEditClassifications = classificationExpressionBuilderController2.conditionsDisplay;
                angular.forEach(newclassification.ViewEditClassifications, function (v, k) {
                    v.expressionNegationOperator = classificationExpressionBuilderController2.storeExpressions[k];
                });
            }
            else {
                newclassification.ViewEditClassifications = [];
            }           
            if (newclassification.listInterfaceId == '' || newclassification.listInterfaceId == null) {              
                //handle html file data
                // activate template defaultly and make it as version one 
                var interfaceTempDetails = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: "1", isActive: true };            
                $scope.InterfaceTemplateDetails = [];
                $scope.InterfaceTemplateDetails.push(interfaceTempDetails);
                newclassification.UploadedTemplateDetails = [];
                newclassification.UploadedTemplateDetails = $scope.InterfaceTemplateDetails;
                // end html file data handling  
                newclassification.createdby = $rootScope.manageITUserName;
              
                //create userinterface based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newclassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newclassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newclassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                userinterfaceService.createLibrary({ controller: 'UserInterface', domainId: contentType.domainId }, newclassification).$promise.then(function (response) {
              //  userinterfaceService.create({ controller: 'UserInterface' }, newclassification).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "List Userinterface Added successfully");   
                        $('#Listuserinterfacetemplate').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $scope.defaultUserinterfaces();
                        $scope.userinterface = {
                            userinterfaceId: null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, viewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
                        };
                        classificationExpressionBuilderController2.conditionsDisplay = [];
                        $scope.conditionsDisplay = '';
                    }
                }, function (error) {
                    clearScopeMessages();
                    if (error.data.errorMessage) {
                      
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });                       
                    }
                });
            }
            else {
                $scope.userinterface.UploadtemplateDetailsNew = [];
                newclassification.updatedby = $rootScope.manageITUserName;
                newclassification.name = interfaceinfo.userinterfaceName;
                newclassification.listInterfaceId = interfaceinfo.listInterfaceId;
                newclassification.contentTypeId = $routeParams.contentTypeId;
                newclassification.subObjectId = $routeParams.subObjectId;
                //newclassification.viewNegationOperator = interfaceinfo.viewNegationOperator;
                //handle html file data
                newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetails;                
                if (interfaceinfo.htmlfile == undefined || interfaceinfo.htmlfile == null) {
                    newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetails;
                }
                else {
                    var version = ($scope.userinterface.UploadtemplateDetails.length + 1);                   
                    if ($scope.htmlreorderchange) {                       
                        var interfaceTempDetailsnew = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: version, isActive: null };                       
                        newclassification.UploadedTemplateDetails.push(interfaceTempDetailsnew);                       
                    }
                    else {                      
                        angular.forEach($scope.userinterface.UploadtemplateDetails, function (value, key) {
                            var interfaceTempDetails1 = { TemplateId: value.TemplateId, filename: value.filename, fileDetails: value.fileDetails, fileVersion: value.fileVersion, isActive: false, updatedDate: value.updatedDate, updatedDateTime: value.updatedDateTime, uploadDateTime: value.uploadDateTime, version: value.version, viewDateTime: value.viewDateTime };
                            $scope.userinterface.UploadtemplateDetailsNew.push(interfaceTempDetails1);
                        });
                    
                        var interfaceTempDetailsnew = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: version, isActive: true };
                        $scope.userinterface.UploadtemplateDetailsNew.push(interfaceTempDetailsnew);
                        newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetailsNew;  
                    }                                 
                }               
                //update userinterface based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newclassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newclassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newclassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                userinterfaceService.updateLibrary({ controller: 'UserInterface', domainId: contentType.domainId }, newclassification).$promise.then(function (response) {
               // userinterfaceService.update({ controller: 'UserInterface' }, newclassification).$promise.then(function (response) {
                    if (response.$resolved == true && response.userinterfaceid != "") {
                        $scope.showSuccessMessage($scope.messageModel, "List Userinterface updated successfully");
                        $('#Listuserinterfacetemplate').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $scope.defaultUserinterfaces();
                        $scope.userinterface = {
                            userinterfaceId: null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, viewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
                        };
                        classificationExpressionBuilderController2.conditionsDisplay = [];
                        $scope.conditionsDisplay = '';
                    }
                }, function (error) {
                    clearScopeMessages();
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });                       
                    }
                });
            }          
        }
        $scope.ListuserinterfaceType = 'Add';
       // $scope.checkBut = false;
        $scope.editUserinterface = function (userinterface, type) {
            $scope.ListuserinterfaceType = 'Edit';
            $scope.resetErrorDirective($scope.messageModel);
            $scope.resetErrorDirective($scope.errormessageModel);
            if ($routeParams.subObjectId == 0) {
                // we can get the interface type with this type value for get the id dynamically like ListInterfaceId, ViewInterfaceId 
                if (userinterface.listInterfaceId != '') {

                    // get particular user interfaces based on  id in content type and library also based subobject

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    if (contentType.imageLibraryId) {
                        var  libraryid = contentType.imageLibraryId;
                    } else if (contentType.contentTypeId) {
                        var libraryid = contentType.contentTypeId;
                    }
                    else {
                        var libraryid = contentType.documentLibraryId;
                    }                
                    userinterfaceService.getLibrary({ controller: 'UserInterface', domainId: contentType.domainId, contentTypeId: libraryid, id: userinterface.listInterfaceId }).$promise.then(function (response) {

                  //  userinterfaceService.get({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, id: userinterface.listInterfaceId }).$promise.then(function (response) {
                        $scope.userinterface = [];
                        angular.element('#Listuserinterfacetemplate').modal('show');
                        if (response.$resolved == true) {
                            var classificationExpressionBuilderController2 = newSharedScope.get('classificationExpressionBuilderController2');
                            var userinterfacetype = userinterface.listInterfaceId;
                            //alert("response");
                            console.log(response);
                            $scope.userinterface.userinterfaceName = response.name;
                            $scope.userinterface.listInterfaceId = response.listInterfaceId;
                            $scope.userinterface.isEnabled = response.isEnabled;                         
                            classificationExpressionBuilderController2.userinterface.isAnyViewClassification = response.isAnyClassification ? "0" : "1";
                            $scope.userinterface.viewNegationOperator = response.viewNegationOperator;
                           // $scope.checkBut = response.viewNegationOperator;
                            classificationExpressionBuilderController2.conditionsDisplay = response.viewEditClassifications;
                           
                            classificationExpressionBuilderController2.isFirst = false;
                            $scope.userinterface.UploadtemplateDetails = response.uploadedTemplateDetails;
                        }
                    }, function (error) {
                        clearScopeMessages();
                        if (error.data.errorMessage) {
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                            });
                            $('#Listuserinterfacetemplate').modal('hide');
                            $('.modal-backdrop').modal('hide');
                            $scope.defaultUserinterfaces();
                        }
                    });
                }

            } else {

                // we can get the interface type with this type value for get the id dynamically like ListInterfaceId, ViewInterfaceId 
                if (userinterface.listInterfaceId != '') {
                    // get particular user interfaces based on  id in content type and library also based subobject

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    if (contentType.imageLibraryId) {
                        var libraryid = contentType.imageLibraryId;
                    } else if (contentType.contentTypeId) {
                        var libraryid = contentType.contentTypeId;
                    }
                    else {
                        var libraryid = contentType.documentLibraryId;
                    }
                    userinterfaceService.getsoLibrary({ controller: 'UserInterface', contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, id: userinterface.listInterfaceId }).$promise.then(function (response) {

                   // userinterfaceService.getso({controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, id: userinterface.listInterfaceId }).$promise.then(function (response) {                       
                        $scope.userinterface = [];
                        angular.element('#Listuserinterfacetemplate').modal('show');
                        if (response.$resolved == true) {
                            var classificationExpressionBuilderController2 = newSharedScope.get('classificationExpressionBuilderController2');
                            var userinterfacetype = userinterface.listInterfaceId;
                            $scope.userinterface.userinterfaceName = response.name;
                            $scope.userinterface.listInterfaceId = response.listInterfaceId;
                            $scope.userinterface.isEnabled = response.isEnabled;
                            classificationExpressionBuilderController2.userinterface.isAnyViewClassification = response.isAnyClassification ? "0" : "1";
                            $scope.userinterface.viewNegationOperator = response.viewNegationOperator;
                            classificationExpressionBuilderController2.conditionsDisplay = response.viewEditClassifications;
                            classificationExpressionBuilderController2.isFirst = true;
                            $scope.userinterface.UploadtemplateDetails = response.uploadedTemplateDetails;
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            clearScopeMessages();
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                            });
                            $('#Listuserinterfacetemplate').modal('hide');
                            $('.modal-backdrop').modal('hide');
                            $scope.defaultUserinterfaces();
                        }
                    });
                }
            }

        }
        $scope.closehistory = function (type) {
            angular.element('#' + type).modal('hide');
        }
        $scope.showviewhistory = function (data, name, type) {
            $scope.filedata = data;
            $scope.filename = name;
            angular.element('#' + type).modal('show');
        }
        $scope.deleteUserinterface = function (userinterface) {
            $scope.resetErrorDirective($scope.messageModel);
            if (userinterface.listInterfaceId != '') {

                //delete based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                userinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                userinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                userinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                userinterfaceService.remove({ controller: 'UserInterface' }, userinterface).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "UserInterface deleted successfully");
                        $scope.defaultUserinterfaces();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                        $('#Listuserinterfacetemplate').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.defaultUserinterfaces();
                    }
                });
            }
        }

        $scope.downloadtemplate = function (filedata, filename) {
            var data = filedata;
            var filename = filename;
            var blob = new Blob([data], { type: 'text/html' }),
              e = document.createEvent('MouseEvents'),
              a = document.createElement('a');
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/html', a.download, a.href].join(':');
            e.initEvent('click', true, false, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }

        //Liost userinterface logic end

        // View User Interface logic start 
        //View userinterface service used to manage datawith backend

        $scope.saveViewUserInterface = function () {
            var interfaceinfo = $scope.userinterface;
            if (interfaceinfo.isAnyViewClassification == undefined) {
                interfaceinfo.isAnyViewClassification = '0';
            }
            $scope.messageClear();
            var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
            //create an instance of the factory       
            var newclassification = new viewuserinterfaceService();
            newclassification.contentTypeId = $routeParams.contentTypeId;
            newclassification.subObjectId = $routeParams.subObjectId;
            newclassification.Name = interfaceinfo.userinterfaceName;
            newclassification.isEnabled = interfaceinfo.isEnabled;
            newclassification.viewNegationOperator = interfaceinfo.viewNegationOperator;           
         
            if (interfaceinfo.isAnyViewClassification == undefined) {
                interfaceinfo.isAnyViewClassification = '0';
            }
            newclassification.isAnyClassification = interfaceinfo.isAnyViewClassification == "0" ? true : false;

            newclassification.ViewInterfaceId = interfaceinfo.ViewInterfaceId;
            if (!newclassification.isAnyClassification) {               
                newclassification.ViewEditClassifications = classificationExpressionBuilderController.conditionsDisplay;
                angular.forEach(newclassification.ViewEditClassifications, function (v, k) {
                    v.expressionNegationOperator = classificationExpressionBuilderController.storeExpressions[k];
                });
            }
            else {              
                newclassification.ViewEditClassifications = [];
            }          
            if (newclassification.ViewInterfaceId == '' || newclassification.ViewInterfaceId == null) {              
                //handle html file data
                // activate template defaultly and make it as version one 
                var interfaceTempDetails = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: "1", isActive: true };               
                $scope.InterfaceTemplateDetails = [];
                $scope.InterfaceTemplateDetails.push(interfaceTempDetails);
                newclassification.UploadedTemplateDetails = [];
                newclassification.UploadedTemplateDetails = $scope.InterfaceTemplateDetails;
                // end html file data handling   
                newclassification.createdby = $rootScope.manageITUserName;
                //create userinterface based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newclassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newclassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newclassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                viewuserinterfaceService.createLibrary({ controller: 'UserInterface', domainId: contentType.domainId }, newclassification).$promise.then(function (response) {
               // viewuserinterfaceService.create({ controller: 'UserInterface' }, newclassification).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.viewMessageModel, "View Userinterface Added successfully");
                        $('#Viewuserinterfacetemplate').modal('hide');
                        $('.modal-backdrop').modal('hide');
                        $scope.defaultViewUserinterfaces();
                        $scope.userinterface.isAnyViewClassification = 0;
                        $scope.userinterface = {
                            userinterfaceId: null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, viewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
                        };
                        classificationExpressionBuilderController.conditionsDisplay = [];
                        $scope.conditionsDisplay = '';
                    }
                }, function (error) {
                   
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });                       
                    }
                });
            }
            else {
                newclassification.updatedby = $rootScope.manageITUserName;
                newclassification.name = interfaceinfo.userinterfaceName;
                newclassification.listinterfaceId = interfaceinfo.listInterfaceId;
                newclassification.contentTypeId = $routeParams.contentTypeId;
                newclassification.subObjectId = $routeParams.subObjectId;
                //handle html file data
                newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetails;
                if (interfaceinfo.htmlfile == undefined || interfaceinfo.htmlfile == null) {
                    newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetails;
                }
                else {
                    
                    var version = ($scope.userinterface.UploadtemplateDetails.length + 1);
                    if ($scope.htmlreorderchange) {
                        var interfaceTempDetailsnew = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: version, isActive: null };
                        newclassification.UploadedTemplateDetails.push(interfaceTempDetailsnew);
                        
                    }
                    else {
                        angular.forEach($scope.userinterface.UploadtemplateDetails, function (value, key) {
                            var interfaceTempDetails1 = { TemplateId: value.TemplateId, filename: value.filename, fileDetails: value.fileDetails, fileVersion: value.fileVersion, isActive: false, updatedDate: value.updatedDate, updatedDateTime: value.updatedDateTime, uploadDateTime: value.uploadDateTime, version: value.version, viewDateTime: value.viewDateTime };
                            $scope.userinterface.UploadtemplateDetailsNew.push(interfaceTempDetails1);
                        });

                        var interfaceTempDetailsnew = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: version, isActive: true };
                        $scope.userinterface.UploadtemplateDetailsNew.push(interfaceTempDetailsnew);
                        newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetailsNew;
                    }
                }
                // end html file data handling     
                //update userinterface based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newclassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newclassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newclassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                viewuserinterfaceService.updateLibrary({ controller: 'UserInterface', domainId: contentType.domainId }, newclassification).$promise.then(function (response) {

             //   viewuserinterfaceService.update({ controller: 'UserInterface' }, newclassification).$promise.then(function (response) {
                    if (response.$resolved == true && response.userinterfaceid != "") {
                        $scope.showSuccessMessage($scope.viewMessageModel, "View Userinterface updated successfully");
                        $('#Viewuserinterfacetemplate').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.defaultViewUserinterfaces();
                        $scope.userinterface.isAnyViewClassification = 0;
                        $scope.userinterface = {
                            userinterfaceId: null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, viewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
                        };
                        classificationexpressionbuildercontroller.conditionsDisplay = [];
                        $scope.conditionsDisplay = '';
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
          
        }
        $scope.ViewuserinterfaceType = 'Add';
        $scope.editViewUserinterface = function (userinterface, form) {
            $scope.ViewuserinterfaceType = 'Edit';
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            if ($routeParams.subObjectId == 0) {
                // we can get the interface type with this type value for get the id dynamically like ListInterfaceId, ViewInterfaceId               
                if (userinterface.viewInterfaceId != '') {
                    // get particular user interfaces based on  id in content type and library also based subobject

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    if (contentType.imageLibraryId) {
                        var libraryid = contentType.imageLibraryId;
                    } else if (contentType.contentTypeId) {
                        var libraryid = contentType.contentTypeId;
                    }
                    else {
                        var libraryid = contentType.documentLibraryId;
                    }
                  //  viewuserinterfaceService.get({ controller: 'UserInterface', contentTypeId: libraryid, id: userinterface.viewInterfaceId }).$promise.then(function (response) {

                    viewuserinterfaceService.getLibrary({ controller: 'UserInterface', domainId: contentType.domainId, contentTypeId: libraryid, id: userinterface.viewInterfaceId }).$promise.then(function (response) {
                        $scope.userinterface = [];
                        angular.element('#' + form).modal('show');
                        if (response.$resolved == true) {
                            var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
                            var userinterfacetype = userinterface.ViewInterfaceId;
                            $scope.userinterface.userinterfaceName = response.name;
                            $scope.userinterface.ViewInterfaceId = response.viewInterfaceId;
                            $scope.userinterface.isEnabled = response.isEnabled;
                            classificationExpressionBuilderController.userinterface.isAnyViewClassification = response.isAnyClassification ? "0" : "1";
                            $scope.userinterface.viewNegationOperator = response.viewNegationOperator;
                            classificationExpressionBuilderController.conditionsDisplay = response.viewEditClassifications;
                            classificationExpressionBuilderController.isFirst = false;
                            $scope.userinterface.UploadtemplateDetails = response.uploadedTemplateDetails;
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            clearScopeMessages();
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                            });
                            $('#Viewuserinterfacetemplate').modal('hide');;
                            $('.modal-backdrop').modal('hide');;
                            $scope.defaultViewUserinterfaces();
                        }
                    });
                }
            } else {
                // we can get the interface type with this type value for get the id dynamically like ListInterfaceId, ViewInterfaceId               
                if (userinterface.viewInterfaceId != '') {
                    // get particular user interfaces based on  id in content type and library also based subobject

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    if (contentType.imageLibraryId) {
                        var libraryid = contentType.imageLibraryId;
                    } else if (contentType.contentTypeId) {
                        var libraryid = contentType.contentTypeId;
                    }
                    else {
                        var libraryid = contentType.documentLibraryId;
                    }
                    viewuserinterfaceService.getsoLibrary({ controller: 'UserInterface', contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, id: userinterface.viewInterfaceId }).$promise.then(function (response) {
                   // viewuserinterfaceService.getso({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, id: userinterface.viewInterfaceId }).$promise.then(function (response) {
                        $scope.userinterface = [];
                        angular.element('#' + form).modal('show');                    
                        if (response.$resolved == true) {                           
                            var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
                            var userinterfacetype = userinterface.ViewInterfaceId;
                            $scope.userinterface.userinterfaceName = response.name;
                            $scope.userinterface.ViewInterfaceId = response.viewInterfaceId;
                            $scope.userinterface.isEnabled = response.isEnabled;
                            classificationExpressionBuilderController.userinterface.isAnyViewClassification = response.isAnyClassification ? "0" : "1";
                            $scope.userinterface.viewNegationOperator = response.viewNegationOperator;
                            classificationExpressionBuilderController.conditionsDisplay = response.viewEditClassifications;
                            classificationExpressionBuilderController.isFirst = false;
                            $scope.userinterface.UploadtemplateDetails = response.uploadedTemplateDetails;
                        }

                    }, function (error) {
                        if (error.data.errorMessage) {
                            clearScopeMessages();
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                            });
                            $('#Viewuserinterfacetemplate').modal('hide');;
                            $('.modal-backdrop').modal('hide');;
                            $scope.defaultViewUserinterfaces();
                        }
                    });
                }
            }
        }
        $scope.deleteViewUserinterface = function (userinterface) {
            $scope.resetErrorDirective($scope.messageModel);
            if (userinterface.listInterfaceId != '') {

                //delete based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                userinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                userinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                userinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';


                viewuserinterfaceService.remove({ controller: 'UserInterface' }, userinterface).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "View UserInterface deleted successfully");
                        $scope.defaultViewUserinterfaces();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                        $('#Viewuserinterfacetemplate').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.defaultViewUserinterfaces();
                    }
                });
            }
        }
        // view interface end
        // edit interface start

        $scope.saveEditUserInterface = function () {
       //     $scope.userinterface.isAnyViewClassification = '';
            var interfaceinfo = $scope.userinterface;
            $scope.messageClear();
            var classificationExpressionBuilderEdituserController = newSharedScope.get('classificationExpressionBuilderEdituserController');
            //create an instance of the factory       
            var newclassification = new edituserinterfaceService();
            newclassification.contentTypeId = $routeParams.contentTypeId;
            newclassification.subObjectId = $routeParams.subObjectId;
            newclassification.name = interfaceinfo.userinterfaceName;
            newclassification.isEnabled = interfaceinfo.isEnabled;
            newclassification.viewNegationOperator = interfaceinfo.viewNegationOperator;
            newclassification.EditInterfaceId = interfaceinfo.editInterfaceId;
            // if any calssification 
            if (interfaceinfo.isAnyViewClassification == undefined) {
                interfaceinfo.isAnyViewClassification = '0';
            }          
            newclassification.isAnyClassification = interfaceinfo.isAnyViewClassification == "0" ? true : false;           
            if (!newclassification.isAnyClassification) {
                newclassification.ViewEditClassifications = classificationExpressionBuilderEdituserController.conditionsDisplay;
                angular.forEach(newclassification.ViewEditClassifications, function (v, k) {
                    v.expressionNegationOperator = classificationExpressionBuilderEdituserController.storeExpressions[k];
                });               
            }
            else {
                newclassification.ViewEditClassifications = [];
            }
            if (newclassification.EditInterfaceId == '' || newclassification.EditInterfaceId == null) {
                //handle html file data               
                var interfaceTempDetails = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: null, isActive: false };
                $scope.InterfaceTemplateDetails = [];
                $scope.InterfaceTemplateDetails.push(interfaceTempDetails);
                newclassification.UploadedTemplateDetails = [];
                newclassification.UploadedTemplateDetails = $scope.InterfaceTemplateDetails;
                // end html file data handling                 
                newclassification.createdby = $rootScope.manageITUserName;

                //create edit userinterface based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newclassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newclassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newclassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                edituserinterfaceService.createLibrary({ controller: 'UserInterface', domainId: contentType.domainId }, newclassification).$promise.then(function (response) {

              //  edituserinterfaceService.create({ controller: 'UserInterface' }, newclassification).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.userinterfaces = [];
                        $scope.showSuccessMessage($scope.editMessageModel, "Edit Userinterface saved successfully");
                        $('#Edituserinterfacetemplate').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.defaultEditUserinterfaces();
                        $scope.userinterface = {
                            userinterfaceId: null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, viewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
                        };
                        classificationExpressionBuilderEdituserController.conditionsDisplay = [];
                        $scope.conditionsDisplay = '';
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
            else {            
                newclassification.updatedby = $rootScope.manageITUserName;
                newclassification.name = interfaceinfo.userinterfaceName;
                newclassification.listinterfaceId = interfaceinfo.listInterfaceId;
                newclassification.contentTypeId = $routeParams.contentTypeId;
                newclassification.subObjectId = $routeParams.subObjectId;               
                //handle html file data
                newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetails;
                if (interfaceinfo.htmlfile == undefined || interfaceinfo.htmlfile == null) {
                    newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetails;
                }
                else {
                    var version = ($scope.userinterface.UploadtemplateDetails.length + 1);                    
                    if ($scope.htmlreorderchange) {                       
                        var interfaceTempDetailsnew = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: version, isActive: null };
                        newclassification.UploadedTemplateDetails.push(interfaceTempDetailsnew);
                    }
                    else {                       
                        $scope.userinterface.UploadtemplateDetailsNew = [];
                        angular.forEach($scope.userinterface.UploadtemplateDetails, function (value, key) {
                            var interfaceTempDetails1 = { TemplateId: value.TemplateId, filename: value.filename, fileDetails: value.fileDetails, fileVersion: value.fileVersion, isActive: false, updatedDate: value.updatedDate, updatedDateTime: value.updatedDateTime, uploadDateTime: value.uploadDateTime, version: value.version, viewDateTime: value.viewDateTime };
                            $scope.userinterface.UploadtemplateDetailsNew.push(interfaceTempDetails1);
                        });

                        var interfaceTempDetailsnew = { TemplateId: null, filename: interfaceinfo.htmlfilename, fileDetails: interfaceinfo.htmlfile, fileVersion: version, isActive: true };
                        $scope.userinterface.UploadtemplateDetailsNew.push(interfaceTempDetailsnew);
                        newclassification.UploadedTemplateDetails = $scope.userinterface.UploadtemplateDetailsNew;
                    }
                }
                // end html file data handling    

                //update based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                newclassification.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                newclassification.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                newclassification.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';
                edituserinterfaceService.updateLibrary({ controller: 'UserInterface', domainId: contentType.domainId }, newclassification).$promise.then(function (response) {

              //  edituserinterfaceService.update({ controller: 'UserInterface' }, newclassification).$promise.then(function (response) {
                    if (response.$resolved == true && response.userinterfaceid != "") {
                        $scope.userinterfaces = [];
                        $scope.showSuccessMessage($scope.editMessageModel, "Edit Userinterface updated successfully");
                        $('#Edituserinterfacetemplate').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.defaultEditUserinterfaces();
                        $scope.userinterface = {
                            userinterfaceId: null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, viewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
                        };
                        classificationExpressionBuilderEdituserController.conditionsDisplay = [];
                        $scope.conditionsDisplay = '';
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.errormessageModel, value.message, value.moredetails);
                        });                       
                    }
                });
            }          
        }
        $scope.disableerror = function () {          
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            $scope.resetErrorDirective($scope.viewMessageModel);
            $scope.resetErrorDirective($scope.editMessageModel);
            $scope.userinterface = [];
            $scope.conditionsDisplay = [];
            var classificationExpressionBuilderController = newSharedScope.get('classificationExpressionBuilderController');
            classificationExpressionBuilderController.conditionsDisplay = [];
            var classificationExpressionBuilderController2 = newSharedScope.get('classificationExpressionBuilderController2');
            classificationExpressionBuilderController2.conditionsDisplay = [];
            var classificationExpressionBuilderEdituserController = newSharedScope.get('classificationExpressionBuilderEdituserController');
            classificationExpressionBuilderEdituserController.conditionsDisplay = [];
            
        }
        $scope.EdituserinterfaceType = 'Add';
        $scope.editEditUserinterface = function (userinterface, form) {
           
            $scope.EdituserinterfaceType = 'Edit';
            $scope.resetErrorDirective($scope.errormessageModel);
            $scope.resetErrorDirective($scope.messageModel);
            if ($routeParams.subObjectId == 0) {
                // we can get the interface type with this type value for get the id dynamically like ListInterfaceId, ViewInterfaceId               
                if (userinterface.editInterfaceId != '') {
                    // get particular user interfaces based on  id in content type and library also based subobject

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    if (contentType.imageLibraryId) {
                        var libraryid = contentType.imageLibraryId;
                    } else if (contentType.contentTypeId) {
                        var libraryid = contentType.contentTypeId;
                    }
                    else {
                        var libraryid = contentType.documentLibraryId;
                    }
                    edituserinterfaceService.getLibrary({ controller: 'UserInterface',domainId: contentType.domainId, contentTypeId: libraryid, id: userinterface.editInterfaceId }).$promise.then(function (response) {

                  //  edituserinterfaceService.get({controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, id: userinterface.editInterfaceId}).$promise.then(function (response) {
                        $scope.userinterface = [];
                        angular.element('#' + form).modal('show');
                        if (response.$resolved == true) {
                            var classificationExpressionBuilderEdituserController = newSharedScope.get('classificationExpressionBuilderEdituserController');
                            var userinterfacetype = userinterface.editInterfaceId;
                            $scope.userinterface.userinterfaceName = response.name;
                            $scope.userinterface.editInterfaceId = response.editInterfaceId;
                            $scope.userinterface.isEnabled = response.isEnabled;
                            classificationExpressionBuilderEdituserController.userinterface.isAnyViewClassification = response.isAnyClassification ? "0" : "1";
                            $scope.userinterface.viewNegationOperator = response.viewNegationOperator;
                            classificationExpressionBuilderEdituserController.conditionsDisplay = response.viewEditClassifications;
                           
                            classificationExpressionBuilderEdituserController.isFirst = false;
                            $scope.userinterface.UploadtemplateDetails = response.uploadedTemplateDetails;
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            clearScopeMessages();
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                            });
                            $('#Edituserinterfacetemplate').modal('hide');;
                            $('.modal-backdrop').modal('hide');;
                            $scope.defaultEditUserinterfaces();
                        }
                    });
                }
            } else {
                // we can get the interface type with this type value for get the id dynamically like ListInterfaceId, ViewInterfaceId               
                if (userinterface.editInterfaceId != '') {
                    // get particular user interfaces based on  id in content type and library also based subobject

                    var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                    if (contentType.imageLibraryId) {
                        var libraryid = contentType.imageLibraryId;
                    } else if (contentType.contentTypeId) {
                        var libraryid = contentType.contentTypeId;
                    }
                    else {
                        var libraryid = contentType.documentLibraryId;
                    }
                    edituserinterfaceService.getsoLibrary({ controller: 'UserInterface', contentTypeId: libraryid, subObjectId: $routeParams.subObjectId, id: userinterface.editInterfaceId }).$promise.then(function (response) {

                 //   edituserinterfaceService.getso({ controller: 'UserInterface', contentTypeId: $routeParams.contentTypeId, subObjectId: $routeParams.subObjectId, id: userinterface.editInterfaceId }).$promise.then(function (response) {
                       
                        $scope.userinterface = [];
                        angular.element('#' + form).modal('show');
                        if (response.$resolved == true) {
                            var classificationExpressionBuilderEdituserController = newSharedScope.get('classificationExpressionBuilderEdituserController');
                            var userinterfacetype = userinterface.editInterfaceId;
                            $scope.userinterface.userinterfaceName = response.name;
                            $scope.userinterface.editInterfaceId = response.editInterfaceId;
                            $scope.userinterface.isEnabled = response.isEnabled;
                            classificationExpressionBuilderEdituserController.userinterface.isAnyViewClassification = response.isAnyClassification ? "0" : "1";
                            $scope.userinterface.viewNegationOperator = response.viewNegationOperator;
                            classificationExpressionBuilderEdituserController.conditionsDisplay = response.viewEditClassifications;
                            classificationExpressionBuilderEdituserController.isFirst = false;
                            $scope.userinterface.UploadtemplateDetails = response.uploadedTemplateDetails;
                        }
                    }, function (error) {
                        if (error.data.errorMessage) {
                            clearScopeMessages();
                            angular.forEach(error.data.errorMessage, function (value, key) {
                                $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                            });
                            $('#Edituserinterfacetemplate').modal('hide');;
                            $('.modal-backdrop').modal('hide');;
                            $scope.defaultEditUserinterfaces();
                        }
                    });
                }
            }
        }

        $scope.deleteEditUserinterface = function (userinterface) {
            $scope.resetErrorDirective($scope.messageModel);
            if (userinterface.editInterfaceId != '') {

                //delete based on content type and libraries
                var contentType = sharedScope.get('rightMenuController').contentTypeModel;
                userinterface.imageLibraryId = contentType.imageLibraryId ? contentType.imageLibraryId : '';
                userinterface.contentTypeId = contentType.contentTypeId ? contentType.contentTypeId : '';
                userinterface.documentLibraryId = contentType.documentLibraryId ? contentType.documentLibraryId : '';

                edituserinterfaceService.remove({ controller: 'UserInterface' }, userinterface).$promise.then(function (response) {
                    if (response.$resolved == true) {
                        $scope.showSuccessMessage($scope.messageModel, "Edit UserInterface deleted successfully");
                        $scope.defaultEditUserinterfaces();
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        clearScopeMessages();
                         angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                        $('#Edituserinterfacetemplate').modal('hide');;
                        $('.modal-backdrop').modal('hide');;
                        $scope.defaultEditUserinterfaces();
                    }
                });
            }
        }

        $scope.showExceptionMessage = function (attModel, message, moredetails) {
            //if (attModel.messages != undefined && attModel.messages.length > 0) {
            //    attModel.messages.length = 0;
            //}
            attModel.messages.push(message);
            attModel.moreDetails = moredetails;
            attModel.isError = true;
        }
        $scope.showSuccessMessage = function (attModel, message) { 
           
            attModel.messages.push(message);
            attModel.isSuccess = true;
            attModel.isHide = false;
            console.log(attModel);
        }
        // discard form data
        $scope.clearUserInterface = function () {
            $scope.userinterface = '';
        }
        $scope.showContent = function ($fileContent) {
            $scope.content = $fileContent;
        };
        $scope.validateUserinterface = function (userinterface, errorCntrl, attributeType) {
            errorCntrl = $scope.errorAttribute;
            var errorObj = errorCntrl.messages;
            if (userinterface.userinterfaceName == null || userinterface.userinterfaceName == '' || userinterface.userinterfaceName == undefined) {
                errorObj.push("userinterfaceName is required");
            }
        } //functions for handle cancel popup Start

        $scope.changeclassification = function (value) {           
            $scope.userinterface.isAnyViewClassification = value;
            $scope.conditionsDisplay = '';
        }
        $scope.openErrorScreen = function (formStatus, formName) {
            $scope.attributeFormDirty = formStatus;
            $scope.attributeForm = formName;
            $scope.isErrorScreen = true;
        }
        $scope.confirmErrorScreenClose = function (attributeForm) {         
            var form1 = attributeForm + "AttributeForm";
            var form = $scope[form1];
            form.$setUntouched();
            form.$setPristine();
            angular.element('#' + attributeForm).modal('hide');
            $scope.attributeFormDirty = false;
            $scope.attributeForm = "";
            $scope.userinterface = '';
            $scope.isErrorScreen = false;
             $scope.userinterface = {
            userinterfaceId : null, action: null, userinterfaceName: null, htmlfile: null, userinterfaceType: null, isEnabled: null, isAnyViewClassification: 0, userinterfaceViewNegationOperator: null, isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
             };
             
        }
        $scope.restoretemplate = function (id, data) {
            $scope.userinterface.UploadtemplateDetails = [];
            $scope.htmlreorderchange = true;
            angular.forEach(data, function (value, key) {
                if (value.templateId === id) {                   
                    var interfaceTempDetails1 = { templateId: value.templateId, filename: value.filename, fileDetails: value.fileDetails, fileVersion: value.fileVersion, isActive: true, updatedDate: value.updatedDate, updatedDateTime: value.updatedDateTime, uploadDateTime: value.uploadDateTime, version: value.version, viewDateTime: value.viewDateTime };                    
                    $scope.userinterface.UploadtemplateDetails.push(interfaceTempDetails1);
                }
                else {                   
                    var interfaceTempDetails1 = { templateId: value.templateId, filename: value.filename, fileDetails: value.fileDetails, fileVersion: value.fileVersion, isActive: false, updatedDate: value.updatedDate, updatedDateTime: value.updatedDateTime, uploadDateTime: value.uploadDateTime, version: value.version, viewDateTime: value.viewDateTime };                   
                    $scope.userinterface.UploadtemplateDetails.push(interfaceTempDetails1);
                }
            });
        }
    }]);