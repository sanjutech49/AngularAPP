manageitModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/',
        {
            templateUrl: false,
            controller: ''
        });
    $routeProvider.when('/ManageIT/Properties/:contentTypeName',
        {
            templateUrl: '/manageIT/contentType/partials/contentType-update.html',
            controller: 'contentTypeController'
        });
    $routeProvider.when('/ManageIT/Properties/image/:imageTypeName',
       {
           templateUrl: '/manageIT/libraries/partials/image-update.html',
           controller: 'librariesController'
       });
    $routeProvider.when('/ManageIT/Properties/Doc/:libraryTypeName',
       {
           templateUrl: '/manageIT/libraries/partials/document-update.html',
           controller: 'librariesController'
       });
    $routeProvider.when('/ManageIT/libraries/Image/:imageLibraryId',
        {
            templateUrl: '/manageIT/libraries/partials/libraries.html',
            controller: 'librariesController'
        });
    $routeProvider.when('/ManageIT/libraries/Image/Dimensions/:imageLibraryId',
        {
            templateUrl: '/manageIT/libraries/partials/dimensions.html',
            controller: 'librariesController'
        });
    $routeProvider.when('/ManageIT/libraries/Image/PaperTypes/:imageLibraryId',
        {
            templateUrl: '/manageIT/libraries/partials/papertype.html',
            controller: 'librariesController'
        });
    $routeProvider.when('/ManageIT/libraries/Image/Finishes/:imageLibraryId',
        {
            templateUrl: '/manageIT/libraries/partials/finishes.html',
            controller: 'librariesController'
        });
    $routeProvider.when('/ManageIT/libraries/Image/Filetypes/:imageLibraryId',
        {
            templateUrl: '/manageIT/libraries/partials/filetypes.html',
            controller: 'librariesController'
        });
    $routeProvider.when('/ManageIT/libraries/Document/:documentLibraryId',
       {
           templateUrl: '/manageIT/libraries/partials/document-filetypes.html',
           controller: 'librariesController'
       });
    $routeProvider.when('/ManageIT/Attributes/:attributeScreenName/ContentType/:contentTypeId/SubObject/:subObjectId/AttributeSet/:attributeSetId',
        {
            templateUrl: '/manageIT/attribute/partials/defaultAttribute.html',
            controller: 'attributeController',

        });
    $routeProvider.when('/ManageIT/Attributes/:attributeScreenName/Document/:contentTypeId/SubObject/:subObjectId/AttributeSet/:attributeSetId',
       {
           templateUrl: '/manageIT/attribute/partials/defaultAttribute.html',
           controller: 'attributeController',

       });
    $routeProvider.when('/ManageIT/Attributes/:attributeScreenName/Image/:contentTypeId/SubObject/:subObjectId/AttributeSet/:attributeSetId',
     {
         templateUrl: '/manageIT/attribute/partials/defaultAttribute.html',
         controller: 'attributeController',

     });

    //Routng for Campaigns
    $routeProvider.when('/ManageIT/Attributes/:attributeScreenName/Campaign/:contentTypeId/SubObject/:subObjectId/AttributeSet/:attributeSetId',
     {
         templateUrl: '/manageIT/attribute/partials/defaultAttribute.html',
         controller: 'attributeController',

     });

    $routeProvider.when('/ManageIT/Classifications/ContentType/:contentTypeId/SubObject/:subObjectId',
        {
            templateUrl: '/manageIT/classification/partials/classification.html',
            controller: 'classificationController'
        });
    $routeProvider.when('/ManageIT/Classifications/Document/:contentTypeId/SubObject/:subObjectId',
        {
            templateUrl: '/manageIT/classification/partials/classification.html',
            controller: 'classificationController'
        });
    $routeProvider.when('/ManageIT/Classifications/Image/:contentTypeId/SubObject/:subObjectId',
        {
            templateUrl: '/manageIT/classification/partials/classification.html',
            controller: 'classificationController'
        });
    $routeProvider.when('/ManageIT/AttributeSets/ContentType/:contentTypeId/SubObject/:subObjectId/AttributeSet/:attributeSetId',
        {
            templateUrl: '/manageIT/attributeSet/partials/attributeSet.html',
            controller: 'attributeSetController'
        });
    $routeProvider.when('/ManageIT/AttributeSets/Document/:contentTypeId/SubObject/:subObjectId/AttributeSet/:attributeSetId',
        {
            templateUrl: '/manageIT/attributeSet/partials/attributeSet.html',
            controller: 'attributeSetController'
        });
    $routeProvider.when('/ManageIT/AttributeSets/Image/:contentTypeId/SubObject/:subObjectId/AttributeSet/:attributeSetId',
        {
            templateUrl: '/manageIT/attributeSet/partials/attributeSet.html',
            controller: 'attributeSetController'
        });
    $routeProvider.when('/ManageIT/SubObjects',
       {
           templateUrl: '/manageIT/subObject/partials/subObject.html',
           controller: 'subObjectController'
       });
    $routeProvider.when('/ManageIT/Compositions/ContentType/:contentTypeId/SubObject/:subObjectId/Composition/:compositionId',
       {
           templateUrl: '/manageIT/compositions/partials/compositions.html',
           controller: 'compositionController'
       });
    $routeProvider.when('/ManageIT/Compositions/Document/:contentTypeId/SubObject/:subObjectId/Composition/:compositionId',
      {
          templateUrl: '/manageIT/compositions/partials/compositions.html',
          controller: 'compositionController'
      });
    $routeProvider.when('/ManageIT/Compositions/Image/:contentTypeId/SubObject/:subObjectId/Composition/:compositionId',
     {
         templateUrl: '/manageIT/compositions/partials/compositions.html',
         controller: 'compositionController'
     });
    $routeProvider.when('/ManageIT/Permissions/ContentType/:contentTypeId/SubObject/:subObjectId/PermissionType/:permissionTypeId',
       {
           templateUrl: '/manageIT/permissions/partials/permissions.html',
           controller: 'permissionController'
       });
    $routeProvider.when('/ManageIT/Permissions/Document/:contentTypeId/SubObject/:subObjectId/PermissionType/:permissionTypeId',
       {
           templateUrl: '/manageIT/permissions/partials/permissions.html',
           controller: 'permissionController'
       });
    $routeProvider.when('/ManageIT/Permissions/Image/:contentTypeId/SubObject/:subObjectId/PermissionType/:permissionTypeId',
      {
          templateUrl: '/manageIT/permissions/partials/permissions.html',
          controller: 'permissionController'
      });

    $routeProvider.when('/ManageIT/Presentation/ContentType/:contentTypeId/SubObject/:subObjectId',
    {
        templateUrl: '/manageIT/Presentation/partials/presentation.html',
        controller: 'presentationController'
    });
    $routeProvider.when('/ManageIT/Presentation/Document/:contentTypeId/SubObject/:subObjectId',
   {
       templateUrl: '/manageIT/Presentation/partials/presentation.html',
       controller: 'presentationController'
   });

    $routeProvider.when('/ManageIT/Presentation/Image/:contentTypeId/SubObject/:subObjectId',
  {
      templateUrl: '/manageIT/Presentation/partials/presentation.html',
      controller: 'presentationController'
  });
    $routeProvider.when('/ManageIT/SearchInterfaces/ContentType/:contentTypeId/SubObject/:subObjectId/SearchInterfaces/:searchinterfaceId',
      {
          templateUrl: '/manageIT/searchinterfaces/partials/searchInterface.html',
          controller: 'searchInterfaceController'
      });
    $routeProvider.when('/ManageIT/SearchInterfaces/Document/:contentTypeId/SubObject/:subObjectId/SearchInterfaces/:searchinterfaceId',
     {
         templateUrl: '/manageIT/searchinterfaces/partials/searchInterface.html',
         controller: 'searchInterfaceController'
     });
    $routeProvider.when('/ManageIT/SearchInterfaces/Image/:contentTypeId/SubObject/:subObjectId/SearchInterfaces/:searchinterfaceId',
    {
        templateUrl: '/manageIT/searchinterfaces/partials/searchInterface.html',
        controller: 'searchInterfaceController'
    });
    $routeProvider.when('/ManageIT/UserInterfaces/ContentType/:contentTypeId/SubObject/:subObjectId/UserInterfaces/:userinterfaceId',
       {
           templateUrl: '/manageIT/userinterfaces/partials/userInterface.html',
           controller: 'userInterfaceController'
       });
    $routeProvider.when('/ManageIT/UserInterfaces/Document/:contentTypeId/SubObject/:subObjectId/UserInterfaces/:userinterfaceId',
       {
           templateUrl: '/manageIT/userinterfaces/partials/userInterface.html',
           controller: 'userInterfaceController'
       });
    $routeProvider.when('/ManageIT/UserInterfaces/Image/:contentTypeId/SubObject/:subObjectId/UserInterfaces/:userinterfaceId',
       {
           templateUrl: '/manageIT/userinterfaces/partials/userInterface.html',
           controller: 'userInterfaceController'
       });
    $routeProvider.when('/ManageIT/Layouts/:attributeScreenName/ContentType/:contentTypeId/SubObject/:subObjectId/Layout/:layoutId',
       {
           templateUrl: '/manageIT/layouts/partials/layouts.html',
           controller: 'layoutsController'
       });
    $routeProvider.when('/ManageIT/Layouts/:attributeScreenName/Document/:contentTypeId/SubObject/:subObjectId/Layout/:layoutId',
       {
           templateUrl: '/manageIT/layouts/partials/layouts.html',
           controller: 'layoutsController'
       });
    $routeProvider.when('/ManageIT/Layouts/:attributeScreenName/Image/:contentTypeId/SubObject/:subObjectId/Layout/:layoutId',
      {
          templateUrl: '/manageIT/layouts/partials/layouts.html',
          controller: 'layoutsController'
      });
    $routeProvider.when('/ManageIT/ContentObject/:attributeScreenName/ContentType/:contentTypeId/SubObject/:subObjectId/ContentObject/:ContentObjectId',
      {
          templateUrl: '/manageIT/contentObject/partials/contentObject.html',
          controller: 'contentObjectController'
      });
    $routeProvider.when('/ManageIT/ContentObject/:attributeScreenName/ContentType/:contentTypeId/SubObject/:subObjectId/ContentObject/:ContentObjectId/view',
      {
          templateUrl: '/manageIT/contentObject/partials/viewContentObject.html',
          controller: 'contentObjectController'
      });
    $routeProvider.when('/ManageIT/ContentObject/:attributeScreenName/Document/:contentTypeId/SubObject/:subObjectId/ContentObject/:ContentObjectId',
      {
          templateUrl: '/manageIT/contentObject/partials/contentObject.html',
          controller: 'contentObjectController'
      });
    $routeProvider.when('/ManageIT/ContentObject/:attributeScreenName/Document/:contentTypeId/SubObject/:subObjectId/ContentObject/:ContentObjectId/view',
     {
         templateUrl: '/manageIT/contentObject/partials/viewContentObject.html',
         controller: 'contentObjectController'
     });
    $routeProvider.when('/ManageIT/ContentObject/:attributeScreenName/Image/:contentTypeId/SubObject/:subObjectId/ContentObject/:ContentObjectId',
     {
         templateUrl: '/manageIT/contentObject/partials/contentObject.html',
         controller: 'contentObjectController'
     });
    $routeProvider.when('/ManageIT/ContentObject/:attributeScreenName/Image/:contentTypeId/SubObject/:subObjectId/ContentObject/:ContentObjectId/view',
     {
         templateUrl: '/manageIT/contentObject/partials/viewContentObject.html',
         controller: 'contentObjectController'
     });
    $routeProvider.when('/ManageIT/AttributeMap/:compositionName/ContentType/:contentTypeId/SubObject/:subObjectId/Composition/:compositionId',
       {
           templateUrl: '/manageIT/compositions/partials/defaultAttributeMap.html',
           controller: 'compositionController'
       });
    $routeProvider.when('/ManageIT/AttributeMap/:compositionName/Image/:contentTypeId/SubObject/:subObjectId/Composition/:compositionId',
       {
           templateUrl: '/manageIT/compositions/partials/defaultAttributeMap.html',
           controller: 'compositionController'
       });
    $routeProvider.when('/ManageIT/AttributeMap/:compositionName/Document/:contentTypeId/SubObject/:subObjectId/Composition/:compositionId',
      {
          templateUrl: '/manageIT/compositions/partials/defaultAttributeMap.html',
          controller: 'compositionController'
      });
  
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]); 
