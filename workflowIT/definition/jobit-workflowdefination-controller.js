(function () {
    "use strict"
    function jobitWorkflowDefinationController($scope, model, $uibModalInstance, $uibModal) {
        var vm = $scope;
        // Shashank Rai :10/08/2016 : Open the Popup function
        vm.init = function () {
            vm.model = model;
            return vm;
        }
        // Shashank Rai :10/08/2016 : close the Popup
        vm.cancel = function () {
   
            $uibModalInstance.dismiss('cancel');
        };

        // Shashank Rai :10/08/2016 : Open the Popup
        vm.newAddWorkflowPreset = function () {

            var newPagePreset = $uibModal.open({
                templateUrl: '/workflowIT/definition/partials/job-add-workflow.html',
                controller: 'jobitAddWorkflowController as jbawf'
                
            });
        }
        
        return vm.init();    
    }
    // Shashank Rai :10/08/2016 : Define the Controller
    jobitDefinationModule.controller('jobitWorkflowDefinationController', ['$scope', 'jobitWorkflowDefinationModel', '$uibModalInstance', '$uibModal', jobitWorkflowDefinationController])
}());



