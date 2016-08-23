(function () {
    "use strict";
    function FlatPlanBehaviourSettingsController($scope, sharedScope, model, $uibModal) {
        var vm = $scope;
        var checkboxes = $("input[type='checkbox']"),
        submitButt = $("input[type='submit']");
        vm.model = model;
        vm.init = function () {
            vm.model = model;
            model.setFormFields();
            return vm;
        };


        // Remained Task: Need Request Parameters, API URL and Response Data structure of settings Flat plan API.
        vm.add = function (fpbsc) {
            model.add(fpbsc);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.showAllowLoosePages = function (value) {
            model.showAllowLoosePages(value);
        };

        vm.validateSettings = function () {
            model.validateForm()
        }

        return vm.init();
    }
    angular.module('jobit.flatplan').controller('FlatPlanBehaviourSettingsController', ['$scope', 'sharedScope', 'flatPlanBehaviourSettingsModel', '$uibModal', FlatPlanBehaviourSettingsController]);
}());