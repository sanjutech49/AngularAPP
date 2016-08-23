(function () {
    "use strict";
    function workflowitConfigurationController($scope, $uibModalInstance, $uibModal) {
        var vm = $scope;
        vm.init = function () {
           
            return vm;
        };

    }
    workflowitConfigurationModule.controller('workflowitConfigurationController', ['$scope', '$uibModalInstance', '$uibModal', workflowitConfigurationController]);
}());