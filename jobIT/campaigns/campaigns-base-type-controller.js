(function () {
    "use strict";
    function CampaignBaseTypeController($scope, sharedScope, model, $uibModal) {
        var vm = $scope;
        vm.model = model;       
        vm.init = function () {
            vm.model = model;
            model.loadDomains();
            model.loadSequences();
            return vm;
        };

        vm.manageItContentClick = function () {
            $('#addContentType').modal('hide');
        };
      
        vm.showManageIT = function () {
            $('#manageit').modal('show');
            $('#campaignContentType').modal('hide');
        }

        vm.showSequence = function (value) {
            model.showSequence(value);
        }

        vm.add = function (cbtc) {
            model.add(cbtc.model);
            model.getCampaignsByDomain(cbtc.model);
        };

        vm.cancel = function () {
            $('#campaignContentType').modal('hide');
        };

        vm.deriveIdentifier = function () {
            model.deriveIdentifier();
        };

        return vm.init();
    }
    angular.module('jobit.campaign').controller('CampaignBaseTypeController', ['$scope', 'sharedScope', 'campaignBaseTypeModel', '$uibModal', CampaignBaseTypeController]);
}());