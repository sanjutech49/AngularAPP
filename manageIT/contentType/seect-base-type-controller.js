(function () {
    "use strict";
    function SelectBaseTypeControler($scope, model, $uibModal, $uibModalInstance) {
        var vm = $scope;
        vm.model = model;
        vm.init = function () {
            vm.model = model;

            return vm;
        };

        vm.manageItContentClick = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/manageIT/contenttype/partials/select-content-type.html',
                controller: 'contentTypeController'
            });
            $uibModalInstance.dismiss('cancel');

        };
        vm.jobContentClick = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../../../jobIT/jobs/partials/job-base-type.html',
                controller: 'JobBaseTypeController as jbtc'
            });
            $uibModalInstance.dismiss('cancel');
        };
        vm.campaignContentClick = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../../../jobIT/campaigns/partials/campaigns-base-type.html',
                controller: 'ModalController'
            });
            $uibModalInstance.dismiss('cancel');
        };
        vm.flatPlanContentClick = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../../../jobIT/flat-plans/partials/flat-plan-base-type.html',
                controller: 'ModalController'
            });
            $('#addContentType').modal('hide');
        };
        vm.pageContentClick = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../../../jobIT/pages/partials/page-base-type.html',
                controller: 'PageBaseTypesController as pbtc'
            });
            $uibModalInstance.dismiss('cancel');
        };

        return vm.init();
    }
    manageitModule.controller('SelectBaseTypeControler', ['$scope', 'selectBaseTypeModel', '$uibModal', '$uibModalInstance', SelectBaseTypeControler]);
}());