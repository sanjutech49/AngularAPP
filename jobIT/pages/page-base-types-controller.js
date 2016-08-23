(function () {
    "use strict";
    function PageBaseTypesController($scope, model, $uibModal, $uibModalInstance) {
        var vm = $scope;
        vm.model = model;
        vm.pageSpreadbasetype = true;

        vm.init = function () {
            vm.model = model;
            vm.pageSpreadbasetype = true;
            model.loadDomains();
            model.loadDocuments();
            return vm;
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.addDomain = function () {
            vm.pagespreadbasetype = false;
            var modalInstance = $uibModal.open({
                templateUrl: '/manageit/common/partials/manageit-settings.html'
            });

            modalInstance.result.then(function () {
                console.log('result');
                vm.pageSpreadbasetype = false;
            }, function () {
                console.log('Modal dismissed');
                vm.pageSpreadbasetype = false;
            });
        };

        vm.addDocument = function () {
            vm.pageSpreadbasetype = false;
            var modalInstance = $uibModal.open({
                templateUrl: '/manageIT/libraries/partials/doc-library.html',
                controller: 'librariesController'
            });

            modalInstance.result.then(function () {
                console.log('result');
                vm.pageSpreadbasetype = false;
            }, function () {
                console.log('Modal dismissed');
                vm.pageSpreadbasetype = true;
            });
        };

        vm.add = function () {
            model.add();
        };

        return vm.init();
    }
    angular.module('jobit.pages').controller('PageBaseTypesController', ['$scope', 'pageBaseTypesModel', '$uibModal', '$uibModalInstance', PageBaseTypesController]);
}());