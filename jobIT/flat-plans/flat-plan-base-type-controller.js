(function () {
    "use strict";
    function FlatPlanBaseTypeController($scope, sharedScope, model, $uibModal) {
        var vm = $scope;
        vm.model = model;
        vm.init = function () {
            vm.model = model;
            model.loadDomains();
            return vm;
        };
       
        vm.showManageIT = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/manageit/common/partials/manageit-settings.html',
                controller: 'manageITController'
            });
            $('#addFlatPlancontenttype').modal('hide');
        }


        // Add Flat plan
        vm.add = function (data) {
            model.add(data);
        };

        vm.cancel = function () {
            model.reset();
        };

        vm.deriveIdentifier = function () {
            model.deriveIdentifier();
        };

        return vm.init();
    }
    angular.module('jobit.flatplan').controller('FlatPlanBaseTypeController', ['$scope', 'sharedScope', 'flatPlanBaseTypeModel', '$uibModal', FlatPlanBaseTypeController]);
}());