(function () {
    "use strict"
    function jobitAddWorkflowController($scope, model, $uibModalInstance, $uibModal) {
        var vm = $scope;
        // Shashank Rai :10/08/2016 : Open the Popup
        vm.init = function () {
            vm.model = model;
            return vm;
        }
        // Shashank Rai :10/08/2016 : Close the Popup
        vm.cancel = function () {          
            $uibModalInstance.dismiss('cancel');
        };       

        return vm.init();
    
    }
    // Shashank Rai :10/08/2016 : Define the Controller
    jobitDefinationModule.controller('jobitAddWorkflowController', ['$scope', 'jobitWorkflowDefinationModel', '$uibModalInstance', '$uibModal', jobitAddWorkflowController])
}());



