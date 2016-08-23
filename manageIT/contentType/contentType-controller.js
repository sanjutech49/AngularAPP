
manageitModule.controller("contentTypeController", [
"$scope", "$route", "$rootScope", "contentTypeService", "$location", '$filter', 'sharedScope', "$uibModal","dialogModal",
function ($scope, $route, $rootScope, contentTypeService, $location, $filter, sharedScope, $uibModal,dialogModal) {
	    $scope.contentType = { contentTypeId: '', singularName: '', pluralName: '', identifier: '', isContext: '' };



	    $scope.errorContentType = {
	        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null, isHide: false
	    };


	    $scope.addError = function(val)
	    {
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

	    sharedScope.store('contentTypeController', $scope);	    
	    //save contentType
	    $scope.save = function (contentType) {
	        $scope.resetErrorDirective($scope.errorContentType);
	        $scope.errors = [];
	        var rightMenuController = sharedScope.get('rightMenuController');
	        contentType.domainId = rightMenuController.selectedContentTypeDomain.domainId;
	        contentType.contentTypeId = null;
	        contentType.createdBy = $rootScope.manageITUserName;
	        contentType.createdDate = new Date();
	        var manageITController = sharedScope.get('rightMenuController');
	        contentTypeService.create(contentType).$promise.then(function (result) {
	           // $scope.errors.push("Content Type created successfully");
	           
	           // $('#ContentType').hide();
	            // $('.modal-backdrop').hide();
	            $scope.$dismiss('cancel');
	           // $uibModalInstance.dismiss('cancel');
	            $scope.contentTypeForm.$setPristine();
	            $scope.errorContentType.messages.push("Content Type created successfully");
	            $scope.errorContentType.isSuccess = true;
	            rightMenuController.loadContentTypes(rightMenuController.selectedContentTypeDomain, result);
	            //rightMenuController.showContentType(result);
	            $scope.errorContentType.isHide = true;
	           
	            $scope.errorContentType.isError = false;
	            manageITController.errorContentTypedetails.isError = $scope.errorContentType.isError;
	            manageITController.errorContentTypedetails.isSuccess = $scope.errorContentType.isSuccess;
	            manageITController.errorContentTypedetails.messages = $scope.errorContentType.messages;
	                     

	        }, function (error) {
	            if (error.data.errorMessage) {
	                angular.forEach(error.data.errorMessage, function (value, key) {
	                 
	                    $scope.errorContentType.messages.push(value.message);
	                    $scope.errorContentType.moreDetails = value.moreDetails;
	                    $scope.errorContentType.isError = true;
	                    $scope.errorContentType.isHide = false;

	                });
	            }
	            else {
	               
	                $scope.errorContentType.messages.push("Error occured while saving the Content Type. Please try after sometime.");
	                $scope.errorContentType.isError = true;
	                $scope.errorContentType.isHide = false;
	            }

	        });
	    };
	    $scope.deriveIdentifier = function () {
	        if ($scope.contentType.contentTypeId == '') {
	            $scope.contentType.identifier = $filter('camelize')($scope.contentType.pluralName);
	        }
	    }
	    //load contenttype for update page
	    $scope.loadContentTypes = function () {
	        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
	        $scope.contentType.contentTypeId = contentType.contentTypeId;
	        $scope.contentType.singularName = contentType.singularName;
	        $scope.contentType.pluralName = contentType.pluralName;
	        $scope.contentType.identifier = contentType.identifier;
	        $scope.contentType.isContext = contentType.isContext;
	        $scope.errors = [];
	    }
	    //update contentype
	    $scope.updateInfo = function (contentType) {
	        $scope.resetErrorDirective($scope.errorContentType);
	        $scope.errContentType = [];
	        contentType.version = $scope.contentType.version;
	        if (contentType.contentTypeId != null && contentType.contentTypeId != "") {
	            var rightMenuController = sharedScope.get('rightMenuController');
	            contentType.domainId = sharedScope.get('rightMenuController').selectedContentTypeDomain.domainId;
	            contentType.updatedBy = $rootScope.manageITUserName;
	            var manageITController = sharedScope.get('rightMenuController');
	            contentTypeService.update(contentType).$promise.then(function (result) {	                	              
	               
	                $scope.contentTypeUpdateForm.$setPristine();
	                 $scope.errorContentType.messages.push("Content Type updated successfully");
	                 $scope.errorContentType.isSuccess = true;
	                rightMenuController.loadContentTypes(rightMenuController.selectedContentTypeDomain);
	                rightMenuController.showContentType(result);
	               

	                $scope.errorContentType.isError = false;
	                manageITController.errorContentTypedetails.isError = $scope.errorContentType.isError;
	                manageITController.errorContentTypedetails.isSuccess = $scope.errorContentType.isSuccess;
	                manageITController.errorContentTypedetails.messages = $scope.errorContentType.messages;

	            }, function (error) {
	                
	                if (error.data.errorMessage) {
	                    angular.forEach(error.data.errorMessage, function (value, key) {
	                        $scope.errorContentType.messages.push(value.message);
	                        $scope.errorContentType.moreDetails = value.moreDetails;
	                        $scope.errorContentType.isError = true;
	                    });
	                }
	                else {	                   
	                    $scope.errorContentType.messages.push("Error occured while updating the Content Type. Please try after sometime.");
	                    $scope.errorContentType.isError = true;
	                }

	            });
	        }
	    };
	    //functions for handle cancel popup Start
	    $scope.openErrorScreen = function (formStatus, formName) {
	        $scope.attributeFormDirty = formStatus;
	        $scope.attributeForm = formName;
	        $scope.isErrorScreen = true;
	    }
	    $scope.confirmErrorScreenClose = function (attributeForm) {

	        //angular.element('#' + attributeForm).modal('hide');
	        $scope.attributeFormDirty = false;
	        $scope.attributeForm = "";
	        $scope.isErrorScreen = false;	        
	        //$uibModalInstance.dismiss('cancel');
	        $scope.$dismiss('cancel');

	    }

	    $scope.$on('$locationChangeStart', function (event, next,current) {
	        var path = window.location.pathname;
	        checkPath = '/' + current.split('/')[3] + '/' + current.split('/')[4];
	        if (checkPath == "/ManageIT/Properties") {	            
	            if ($scope.contentTypeUpdateForm != undefined && $scope.contentTypeUpdateForm.$dirty) {
	                var leftMenuController = sharedScope.get('leftMenuController');
	                $rootScope.leftactivemenu1 = path;
	                event.preventDefault();
	                dialogModal("Changes are made. Are you sure you want to leave this page?", "Confirm", "Ok", "Cancel").result.then(function (x) {
	                    if (x == true) {
	                        $rootScope.leftactivemenu1 = "/ManageIT" + next.split('/ManageIT')[1];
	                        $location.path("/ManageIT" + next.split('/ManageIT')[1]);
	                        $scope.contentTypeUpdateForm.$setPristine();
	                    }
	                });
	                //var answer = confirm("Changes are made. Are you sure you want to leave this page?")
	                
	            }
	        }
	    });
	}
]);