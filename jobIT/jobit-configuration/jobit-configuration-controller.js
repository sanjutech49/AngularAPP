(function () {
    "use strict";
    function jobitConfigurationController($scope, model, svc, $uibModalInstance, $uibModal) {
        var vm = $scope;

        vm.init = function () {
            vm.model = model;
            vm.model.getUserRoles(); 
            console.log(vm);
            return vm;
        };

        vm.getPagePresets = function () {
            svc.getPagePresets().$promise.then(function (response) {
                vm.pagePresets = response;
            });
        };

        vm.getPagePreset = function (id) {
            svc.getPagePreset({ id: id }).$promise.then(function (response) {
                vm.pagePreset = response;
            });
        };

        vm.editPagePreset = function (pagePreset) {
            var editPagePresetModal = $uibModal.open({
                templateUrl: '/jobIT/jobit-configuration/partials/jobit-configuration-editpagepreset.html',
                controller: 'jobitEditPagePresetController as jbcepp',
                resolve: {
                    pagePresetData: {
                        pagePreset
                    }
                }
            });
            editPagePresetModal.result.then(function (result) { },
                function (dismissMessage) {
                    if (dismissMessage === "success") {
                        vm.getPagePresets();
                    }
                });
        };

        vm.newPagePreset = function () {
            var newPagePresetModal = $uibModal.open({
                templateUrl: '/jobIT/jobit-configuration/partials/jobit-configuration-editpagepreset.html',
                controller: 'jobitEditPagePresetController as jbcepp',

                resolve: {
                    pagePresetData: {
                        pagePreset: null
                    }
                }
            });
            vm.pagePreset = null;

            newPagePresetModal.result.then(function (result) { },
                function (dismissMessage) {
                    if (dismissMessage === "success") {
                        vm.getPagePresets();
                    }
                });
        };
        vm.newWorkflowPreset = function () {
            var newPagePreset = $uibModal.open({
                templateUrl: '/workflowIT/definition/partials/job-workflow.html',
                controller: 'jobitWorkflowDefinationController as jbwfd',
                windowClass: 'jobit-modal-width900'
            });
            $scope.pagePreset = null;
        };

        vm.openProductionHierchyModal = function () {
            var openProductionHierchyModal = $uibModal.open({
                templateUrl: '/jobIT/jobit-configuration/partials/jobit-configuration-addproductionhierarchy.html',
                controller: 'jobitAddproductionhierarchyController as jbph'
            });
        };
      

        vm.remove = function (id) {
            svc.removePagePreset({ id: id }, $scope.pagePreset).$promise.then(function (response) {
                vm.getPagePresets();
            });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        return vm.init();
    }
    angular.module('jobit.configuration').controller('jobitConfigurationController', ['$scope', 'jobitConfigurationModel',
        'jobitConfigurationService', '$uibModalInstance', '$uibModal', jobitConfigurationController]);
}());