
angular.module('jobit')
.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    $stateProvider
        .state('home', {
            url: '/jobit',
            templateUrl: 'jobIT/campaigns/partials/campaign-attributes.html',
            controller: 'CampaignAttributeController'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
