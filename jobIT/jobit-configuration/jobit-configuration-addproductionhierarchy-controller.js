(function () {
    "use strict";
    function jobitAddproductionhierarchyController($scope, model, svc, $uibModalInstance, $uibModal) {
        var vm = $scope;
        vm.init = function () {
            vm.model = model;
            return vm;
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        

        return vm.init();
    }
    angular.module('jobit.configuration').controller('jobitAddproductionhierarchyController', ['$scope', 'jobitConfigurationModel',
        'jobitConfigurationService', '$uibModalInstance', '$uibModal', jobitAddproductionhierarchyController]);
}());