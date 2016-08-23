angular.module('jobit.campaign').controller('ModalController', function ($scope, $uibModalInstance) {
    var vm = $scope;
    vm.closeModal = function() {
        $uibModalInstance.close();
    };
});