manageitModule.controller("manageitContentController", ['$scope', '$rootScope', '$location', 'sharedScope',
    function ($scope, $rootScope, $location, sharedScope) {
        sharedScope.store('leftMenuController', $scope);
       
    }]);