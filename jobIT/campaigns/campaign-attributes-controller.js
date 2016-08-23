(function () {
    "use strict";
    function CampaignAttributeController($scope, $routeParams, sharedScope, $uibModal, model) {
        var vm = $scope;
        vm.model = model;
        vm.init = function () {
            vm.model = model;
            model.getAttributePartialVisibility();
            model.loadSequences();
            model.getAttributeScreenName($routeParams);
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            model.get(contentType.campaignId, $routeParams.attributeSetId);
            return vm;
        };        

        vm.get = function () {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;            
            model.get(contentType.campaignId, $routeParams.attributeSetId);
        };

        vm.add = function (data) {
            
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.add(data);
            vm.closeModal();
        };
        vm.addInteger = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addInteger(data);
            vm.closeModal();
        };
        vm.addDecimal = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addDecimal(data);
            vm.closeModal();
        };
        vm.addSequence = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addSequence(data);
            vm.closeModal();
        };
        vm.addDate = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addDate(data);
            vm.closeModal();
        };
        vm.addTime = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addTime(data);
            vm.closeModal();
        };
        vm.addDateAndTime = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addDateAndTime(data);
            vm.closeModal();
        };
        vm.addYesNo = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addYesNo(data);
            vm.closeModal();
        };
        vm.addCopy = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addCopy(data);
            vm.closeModal();
        };
        vm.addList = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addList(data);
            vm.closeModal();
        };
        vm.addSubObject = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addSubObject(data);
            vm.closeModal();
        };
        vm.addObjectReference = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addObjectReference(data);
            vm.closeModal();
        };
        vm.addImageReference = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addImageReference(data);
            vm.closeModal();
        };
        vm.addDocumentReference = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.addDocumentReference(data);
            vm.closeModal();
        };

        vm.edit = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.edit(data);
            vm.closeModal();
        };

        vm.delete = function (cac) {
            model.delete(cac);
        };

        vm.editCampaignAttribute = function (textAttribute) {
            if (textAttribute !== undefined || textAttribute !== null) {
                model.editCampaignAttribute(textAttribute);
                var modalInstance = $uibModal.open({
                    templateUrl: '/jobIT/campaigns/partials/campaign-edit-attribute.html',
                    controller: 'ModalController',
                });
            }
        };

        vm.showAttributeTypeList = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaign-name-attributes.html',
                controller: 'ModalController'
            });
        };

        vm.showIntegerCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-integer-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showPriceDecimalCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-decimal-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showSequenceCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-sequence-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showDateCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-date-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showTimeCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-time-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showDateAndTimeCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-date-time-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showTextCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-text-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showYesNoCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-yes-no-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showListCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-list-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showSubObjectCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-sub-object-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showCopyCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-copy-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showObjectReferenceCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-object-reference-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showImageReferenceCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-image-reference-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.showDocumentReferenceCampaignAttribute = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/jobIT/campaigns/partials/campaigns-document-reference-attribute.html',
                controller: 'ModalController'
            });
        };

        vm.deriveIdentifier = function () {
            model.deriveIdentifier();
        };

        vm.cancel = function () {
            //model.reset();            
            model.isAddCampShow = false;
        };

        vm.formatDateChange = function (formatId) {
            model.formatDateChange();
        };

        vm.openDateCalendar = function (pickerId) {
            model.openDateCalendar(pickerId);
        };

        $scope.timeFormatChange = function (key) {
            model.timeFormatChange(key);
        };

        $scope.formatDateTimeChange = function (key) {
            model.formatDateTimeChange(key);
        };
        

        return vm.init();
    }
    angular.module('jobit.campaign').controller('CampaignAttributeController', ['$scope', '$routeParams', 'sharedScope',
                                                   '$uibModal', 'campaignAttributeModel', CampaignAttributeController]);
}());