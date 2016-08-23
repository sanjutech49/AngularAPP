app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/',
        {
            templateUrl: false,
            controller: ''
        });
    $routeProvider.when('/editprofile',
{
    templateUrl: '/user-management/users-profile/partials/editprofile.html',
    controller: 'UserProfileController'
});
    $routeProvider.when('/changepassword',
    {
        templateUrl: '/user-management/change-password/partials/change-password.html',
        controller: 'ChangePasswordController'
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]); 
