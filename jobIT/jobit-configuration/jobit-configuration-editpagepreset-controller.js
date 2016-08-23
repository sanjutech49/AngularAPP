(function () {
    "use strict";
    function jobitEditPagePresetController($scope, model,svc,pagePresetData, $uibModalInstance, $uibModal) {
        var vm = $scope;
        vm.init = function () {
            vm.model = model;
            return vm;
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.pagePreset = pagePresetData.pagePreset;

        vm.addUpdatePagePreset = function (pagePreset) {
            if (pagePreset.pagePresetId) {
                svc.updatePagePreset(pagePreset).$promise.then(function (response) {
                    $scope.pagePreset = null;
                    $uibModalInstance.dismiss('success');
                });
            } else {
                svc.addPagePreset($scope.pagePreset).$promise.then(function (response) {
                    $scope.pagePreset = null;
                    $uibModalInstance.dismiss('success');
                });
            }
        };

        return vm.init();
    }
    angular.module('jobit.configuration').controller('jobitEditPagePresetController', ['$scope', 'jobitConfigurationModel',
         'jobitConfigurationService', 'pagePresetData', '$uibModalInstance', '$uibModal', jobitEditPagePresetController]);
}());