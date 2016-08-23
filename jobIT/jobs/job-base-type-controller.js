(function () {
    "use strict";
    function JobBaseTypeController($scope, model, $uibModalInstance, $uibModal) {
        var vm = $scope;
        vm.model = model;

        vm.init = function () {
            vm.model = model;
            model.loadDomains();
            return vm;
        };

        vm.cancel = function () {
            model.reset();
            $uibModalInstance.dismiss('cancel');
        };

        vm.add = function () {
            model.add();
        };

        vm.selectDomain = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/manageIT/common/partials/manageit-settings.html',
            });
            
        };

        vm.newJobFiles = function () {
            model.newJobFiles();
        };

        vm.newJobNumber = function () {
            model.newJobNumber();
        };

        vm.showSequence = function (vaue) {
            model.showSequence(vaue);
        };

        vm.activate = function () {
            return model.activate();
        };

        
        
        return vm.init();
    }
    angular.module('jobit.jobs').controller('JobBaseTypeController', ['$scope', 'jobBaseTypeModel','$uibModalInstance','$uibModal', JobBaseTypeController]);
}());