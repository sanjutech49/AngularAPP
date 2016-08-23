(function () {
    "use strict";
    function AddFlatPlanController($scope, sharedScope, $routeParams, model) {
        var vm = $scope;
        vm.model = model;
        vm.init = function () {
            vm.model = model;
            model.getAdvertisements();
            model.setSetupFields();
            return vm;
        };

        vm.addDetails = function (afpc) {
            model.addDetails(afpc);
        };

        vm.clear = function () {
            model.clear();
        };

        vm.change = function (value) {
            model.change(value);
            $('#changeAdertisment').modal('hide');
        };

        vm.editDetails = function (afpc) {
            model.editDetails(afpc);
        };

        vm.getEditMode = function () {
            model.getEditMode();
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.discard = function () {
            model.discard();
        };

        vm.validateForm = function () {
            model.validateForm();
        };

        vm.saveSetup = function (data) {
            model.saveSetup(data);
        };

        // View flat plans.
        vm.getFlatPlan = function (id) {
            model.getFlatPlan(id);
            model.getPagesAndSpreads(model.flatPlan.settings);
        }

        vm.loadPreset = function () {
            model.loadPreset();
        }

        vm.savePreset = function () {
            model.savePreset();
        }

        vm.indesignTemplate = function () {
            model.indesignTemplate();
        }

        vm.isUniquePresetName = function (result) {
            model.isUniquePresetName(result);
        }
        vm.saveSettings = function (data) {
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            data.domainId = contentType.domainId;
            data.contentTypeId = contentType.contentTypeId;
            data.attributeSetId = $routeParams.attributeSetId;
            model.saveSettings(data);
        }


        return vm.init();
    }
    angular.module('jobit.flatplan').controller('AddFlatPlanController', ['$scope', 'sharedScope', '$routeParams', 'addFlatPlanModel', AddFlatPlanController]);
}());