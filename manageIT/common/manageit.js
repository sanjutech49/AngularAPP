manageitModule.controller("leftMenuController", ['$scope', '$rootScope', '$location', 'sharedScope', 'searchinterfaceService', '$filter', 'imageLibraryService', '$http', 'contentTypeService', 'contentObjectService', 'userinterfaceService', '$compile',
    function ($scope, $rootScope, $location, sharedScope, searchinterfaceService, $filter, imageLibraryService, $http, contentTypeService, contentObjectService, userinterfaceService, $compile) {
        sharedScope.store('leftMenuController', $scope);
        $scope.attributeScreenName = 'Default';
        $scope.access = true;
        $scope.loadSubMenuItems = function (ids) {
            searchinterfaceService.getAllSI({ controller: 'SearchInterface', domainId: $rootScope.domainIdUi, contentTypeId: $rootScope.contentTypeId, subObjectId: $rootScope.subObjectId }).$promise.then(function (details) {
                var searchtypeinterfaces = [];
                var listtypeinterfaces = [];
                var browsetypeinterfaces = [];
                angular.forEach(details, function (value, key) {

                    if (value.searchInterfaceType == 0) {
                        searchtypeinterfaces.push(value);
                    }
                    if (value.searchInterfaceType == 1) {
                        listtypeinterfaces.push(value);
                    }
                    if (value.searchInterfaceType == 2) {
                        browsetypeinterfaces.push(value);
                    }
                });
                $rootScope.searchtypeinterfacesval = searchtypeinterfaces;
                $rootScope.listtypeinterfacesval = listtypeinterfaces;
                $rootScope.browsetypeinterfacesval = browsetypeinterfaces;
            }, function (error) {

            });
            $scope.subMenuItems = [
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                       itemName: "Default Attributes",
                       url: "/ManageIT/Attributes/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: ids.classificationId },
                       itemName: "Classifications",
                       url: "/ManageIT/Classifications/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId,
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                       itemName: "Attribute Sets",
                       url: "/ManageIT/AttributeSets/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Compositions",
                       url: "/ManageIT/Compositions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Composition/0",
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
                       itemName: "Permissions",
                       url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1,
                       nestedMenu: [{
                           itemName: "Object",
                           url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1
                       },
                       {
                           itemName: "Attributes",
                           url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 2
                       }]
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Presentation", url: "/ManageIT/Presentation/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Search Interfaces", url: "/ManageIT/SearchInterfaces/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/SearchInterfaces/0", nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "User Interfaces",
                       url: "/ManageIT/UserInterfaces/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/UserInterfaces/0",
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Layouts", url: "/ManageIT/Layouts/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0", nestedMenu: []
                   }
                   //{
                   //    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                   //    itemName: "Content Object", url: "/ManageIT/ContentObject/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/ContentObject/0", nestedMenu: []
                   //}
            ];
        }

        //Add campaign left menu
        $scope.loadCampaignSubMenuItems = function (ids) {
            $scope.subMenuItems = [
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                       itemName: "Default Attributes",
                       url: "/ManageIT/Attributes/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: ids.classificationId },
                       itemName: "Classifications",
                       url: "/ManageIT/Classifications/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId,
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                       itemName: "Attribute Sets",
                       url: "/ManageIT/AttributeSets/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Compositions",
                       url: "/ManageIT/Compositions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Composition/0",
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
                       itemName: "Permissions",
                       url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1,
                       nestedMenu: [{
                           itemName: "Object",
                           url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1
                       },
                       {
                           itemName: "Attributes",
                           url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 2
                       }]
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Presentation", url: "/ManageIT/Presentation/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Search Interfaces", url: "/ManageIT/SearchInterfaces/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/SearchInterfaces/0", nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "User Interfaces",
                       url: "/ManageIT/UserInterfaces/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/UserInterfaces/0",
                       nestedMenu: []
                   },
                   {
                       itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                       itemName: "Layouts", url: "/ManageIT/Layouts/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0", nestedMenu: []
                   }
                   //{
                   //    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                   //    itemName: "Content Object", url: "/ManageIT/ContentObject/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/ContentObject/0", nestedMenu: []
                   //}
            ];
        }

        //image library left menu        
        $scope.loadSubMenuItemsImage = function (ids) {
            $scope.subMenuItems = [

                      {
                          itemIds: { imageLibraryId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                          itemName: "Default Attributes",
                          url: "/ManageIT/Attributes/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                          nestedMenu: []
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: ids.classificationId },
                          itemName: "Classifications",
                          url: "/ManageIT/Classifications/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId,
                          nestedMenu: []
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                          itemName: "Attribute Sets",
                          url: "/ManageIT/AttributeSets/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                          nestedMenu: []
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                          itemName: "Compositions",
                          url: "/ManageIT/Compositions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Composition/0",
                          nestedMenu: []
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
                          itemName: "Permissions",
                          url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1,
                          nestedMenu: [{
                              itemName: "Object",
                              url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1
                          },
                          {
                              itemName: "Attributes",
                              url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 2
                          }]
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                          itemName: "Presentation", url: "/ManageIT/Presentation/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                          itemName: "Search Interfaces", url: "/ManageIT/SearchInterfaces/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/SearchInterfaces/0", nestedMenu: []
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                          itemName: "User Interfaces",
                          url: "/ManageIT/UserInterfaces/Image/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/UserInterfaces/0",
                          nestedMenu: []
                      },
                      {
                          itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                          itemName: "Layouts", url: "/ManageIT/Layouts/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0", nestedMenu: []
                      }]
            var imagesettings = {
                itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                itemName: "Image Settings",
                url: "/ManageIT/libraries/Image/" + ids.contentTypeId,
                nestedMenu: [{
                    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                    itemName: "OwnerTypes", url: "/ManageIT/libraries/Image/" + ids.contentTypeId, nestedMenu: []
                }, {
                    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                    itemName: "Dimensions", url: "/ManageIT/libraries/Image/Dimensions/" + ids.contentTypeId, nestedMenu: []
                }, {
                    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                    itemName: "Paper Types", url: "/ManageIT/libraries/Image/PaperTypes/" + ids.contentTypeId, nestedMenu: []
                }, {
                    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                    itemName: "Finishes", url: "/ManageIT/libraries/Image/Finishes/" + ids.contentTypeId, nestedMenu: []
                }, {
                    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                    itemName: "FileTypes", url: "/ManageIT/libraries/Image/Filetypes/" + ids.contentTypeId, nestedMenu: []
                }]
            };
            $scope.subMenuItems.splice(0, 0, imagesettings);
        }

        //document left menu
        $scope.loadSubMenuItemsDocument = function (ids) {
            $scope.subMenuItems = [
             {
                 itemIds: { imageLibraryId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                 itemName: "Default Attributes",
                 url: "/ManageIT/Attributes/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                 nestedMenu: []
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: ids.classificationId },
                 itemName: "Classifications",
                 url: "/ManageIT/Classifications/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId,
                 nestedMenu: []
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                 itemName: "Attribute Sets",
                 url: "/ManageIT/AttributeSets/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/" + ids.attributeSetId,
                 nestedMenu: []
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                 itemName: "Compositions",
                 url: "/ManageIT/Compositions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Composition/0",
                 nestedMenu: []
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
                 itemName: "Permissions",
                 url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1,
                 nestedMenu: [{
                     itemName: "Object",
                     url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 1
                 },
                 {
                     itemName: "Attributes",
                     url: "/ManageIT/Permissions/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/" + 2
                 }]
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                 itemName: "Presentation", url: "/ManageIT/Presentation/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                 itemName: "Search Interfaces", url: "/ManageIT/SearchInterfaces/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/SearchInterfaces/0", nestedMenu: []
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                 itemName: "User Interfaces",
                 url: "/ManageIT/UserInterfaces/Document/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/UserInterfaces/0",
                 nestedMenu: []
             },
             {
                 itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                 itemName: "Layouts", url: "/ManageIT/Layouts/Default/" + ids.type + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0", nestedMenu: []
             }
            ];
            var documentsettings = {
                itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: ids.attributeSetId, classificationId: 0 },
                itemName: "Document Settings",
                url: "/ManageIT/libraries/Document/" + ids.contentTypeId,
                nestedMenu: [{
                    itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0 },
                    itemName: "File Types", url: "/ManageIT/libraries/Document/" + ids.contentTypeId, nestedMenu: []
                }]
            };
            $scope.subMenuItems.splice(0, 0, documentsettings);
        }

        $scope.properties = {
            itemIds: { contentTypeId: 0, subObjectId: 0, attributeSetId: 0, classificationId: 0 },
            itemName: "Properites", url: "/ManageIT/Properties/", nestedMenu: []
        };
        $scope.subObjects = {
            itemIds: { contentTypeId: 0, subObjectId: 0, attributeSetId: 0, classificationId: 0 },
            itemName: "Sub Objects", url: "/ManageIT/SubObjects", nestedMenu: []
        };

        $scope.viewcontent = function (id) {
            alert(id);
            $('.addTab').removeClass('active');
            $rootScope.viewTab = "active";
            $rootScope.editTab = "";
            $rootScope.addTab = "";
            $location.path("/ManageIT/ContentObject/Default/ContentType/" + $rootScope.contentTypeId + "/SubObject/" + $rootScope.subObjectId + "/ContentObject/" + id + "/view");
        }
        $scope.contentTypeName = '';
        $scope.leftMenuItems = [];
        $scope.leftactivemenu = '';
        $scope.contentTypeId = '';
        $scope.subobjid = '';
        if ($rootScope.isAdmin) {
            $scope.enableConfigTab = "active";
            $scope.addPermissionCO = true;
            $scope.searchPermissionCO = true;
        }
        $scope.enableLeftMenu = function () {
            if ($('.left-menu').hasClass('hide')) {
                $('.left-menu').removeClass('hide');
            }
            if (!$('.tablecol.main-area-wrap').hasClass('main-left-content-wrap')) {
                $('.tablecol.main-area-wrap').removeClass('main-left-content-wrap');
            }
        }
        $scope.enableTabAction = function (tab) {
            if ($('.configClassCheck').hasClass('active')) {
                $('.configClassCheck').removeClass('active');
            }
            else if ($('.browseClassCheck').hasClass('active') || $('#browse.tab-pane').hasClass('active')) {
                $('.browseClassCheck').removeClass('active');
                $('#browse.tab-pane').removeClass('active');
            }
            else if ($('.listClassCheck').hasClass('active') || $('#list.tab-pane').hasClass('active')) {
                $('.listClassCheck').removeClass('active');
                $('#list.tab-pane').removeClass('active');
            }
            else if ($('.searchClassCheck').hasClass('active') || $('#search.tab-pane').hasClass('active')) {
                $('.searchClassCheck').removeClass('active');
                $('#search.tab-pane').removeClass('active');
            }
            else if ($('.changelogClassCheck').hasClass('active') || $('#changelog.tab-pane').hasClass('active')) {
                $('.changelogClassCheck').removeClass('active');
                $('#changelog.tab-pane').removeClass('active');
            }
            else if ($('.usageClassCheck').hasClass('active') || $('#usage.tab-pane').hasClass('active')) {
                $('.usageClassCheck').removeClass('active');
                $('#usage.tab-pane').removeClass('active');
            }
            $('#configure.tab-pane').addClass('active');
            switch (tab) {
                case "addTab":
                    $('.addTab').addClass('active');
                    $('.viewTab').removeClass('active');
                    $('.editTab').removeClass('active');
                    $('.left-menu').addClass('hide');
                    if ($('.tablecol.main-area-wrap').hasClass('main-left-content-wrap')) {
                        $('.tablecol.main-area-wrap').removeClass('main-left-content-wrap');
                    }
                    break;
                case "editTab":
                    $('.addTab').removeClass('active');
                    $('.viewTab').removeClass('active');
                    $('.editTab').addClass('active');
                    $('.left-menu').addClass('hide');
                    if ($('.tablecol.main-area-wrap').hasClass('main-left-content-wrap')) {
                        $('.tablecol.main-area-wrap').removeClass('main-left-content-wrap');
                    }
                    break;
                case "viewTab":
                    $('.addTab').removeClass('active');
                    $('.viewTab').addClass('active');
                    $('.editTab').removeClass('active');
                    $('.left-menu').addClass('hide');
                    if ($('.tablecol.main-area-wrap').hasClass('main-left-content-wrap')) {
                        $('.tablecol.main-area-wrap').removeClass('main-left-content-wrap');
                    }
                    break;
            }
        }

        $scope.loadDetails = function (url, nestedmenu) {

            if (url == '' && nestedmenu.length > 0) {
                $location.url(nestedmenu[0]['url']);
                $scope.leftactivemenu = nestedmenu[0]['url'];
            }
            else {
                $location.url(url);
                $scope.leftactivemenu = url;

                if ($scope.leftactivemenu != $rootScope.leftactivemenu1) {
                    $rootScope.leftactivemenu1 = url;
                }
            }
        };

        $scope.addNewProduct = function (contentid, subid) {

            $location.path('/ManageIT/ContentObject/ContentObject/Document/' + contentid + '/SubObject/' + subid + '/ContentObject/0');
        }

        $scope.presentationresultdisplay = false;
        $scope.searchtypecontentobject = function (searchtypeinterfaces, searchinterfaceid, keyword) {
            $rootScope.searchresultsarray = [];
            // display using directive
            $rootScope.searchResult = true;
            $scope.searchinterfacetype = searchinterfaceid;
            $scope.searchtypeinterfaces = searchtypeinterfaces;
            $scope.searchkeyword = keyword;
            if (searchinterfaceid != '') {
                $scope.searchinterfacetype = searchinterfaceid;
                $scope.searchinterfacedata = $filter('filter')($scope.searchtypeinterfaces, { searchInterfaceId: searchinterfaceid })[0];
                $scope.numPerPage = $filter('filter')($scope.searchtypeinterfaces, { searchInterfaceId: searchinterfaceid })[0].resultsPerPage;
            } else {
                var lowest = Number.POSITIVE_INFINITY;
                var highest = Number.NEGATIVE_INFINITY;
                var tmp;
                for (var i = $scope.searchtypeinterfaces.length - 1; i >= 0; i--) {
                    tmp = $scope.searchtypeinterfaces[i].orderNo;
                    if (tmp < lowest) lowest = tmp;
                    if (tmp > highest) highest = tmp;
                }
                var highorderno = highest;
                $scope.searchinterfacetype = $filter('filter')($scope.searchtypeinterfaces, { orderNo: highorderno })[0].searchInterfaceId;
                $scope.numPerPage = $filter('filter')($scope.searchtypeinterfaces, { orderNo: highorderno })[0].resultsPerPage;
                $scope.searchinterfacedata = $filter('filter')($scope.searchtypeinterfaces, { orderNo: highorderno })[0];
            }

            // create search input arry for auto complete                       
            var searchkeywords = [];
            angular.forEach($scope.searchinterfacedata.searchInputTextAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            angular.forEach($scope.searchinterfacedata.searchInputDateAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            angular.forEach($scope.searchinterfacedata.searchInputDateTimeAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            angular.forEach($scope.searchinterfacedata.searchInputDecimalAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            angular.forEach($scope.searchinterfacedata.searchInputIntegerAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            angular.forEach($scope.searchinterfacedata.searchInputListAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            angular.forEach($scope.searchinterfacedata.searchInputTimeAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            angular.forEach($scope.searchinterfacedata.searchInputYesNoAttribute, function (value, key) {
                searchkeywords.push(value.name);
            });
            $scope.searchkeywords = searchkeywords;
            $rootScope.searchkeywords = searchkeywords;
            //get search results:            

            $scope.searchresults = [];
            var ids = [];
            var searchobject = { attributeIds: ids, contentType: $scope.searchinterfacedata.contentTypeId, searchConditions: $scope.searchinterfacedata.searchConditions, searchWord: $scope.searchkeyword };
            contentObjectService.getSearchResult(searchobject).$promise.then(function (contentObjectdetails) {
                $scope.searchresults = contentObjectdetails;
                $rootScope.searchresultsarray = contentObjectdetails;
                $scope.currentPage = 1;
                $scope.paginate = function (value) {
                    var begin, end, index;
                    begin = ($scope.currentPage - 1) * $scope.numPerPage;
                    end = begin + $scope.numPerPage;
                    index = $scope.searchresults.indexOf(value);
                    return (begin <= index && index < end);
                };
                // if no user interface present use presentation
                $scope.userinterfacedata = {};
                if ($scope.searchinterfacedata.listItemInterface[0].id) {
                    userinterfaceService.getLibrary({ controller: 'UserInterface', domainId: $rootScope.domainIdUi, contentTypeId: $rootScope.contentTypeId, id: $scope.searchinterfacedata.listItemInterface[0].id }).$promise.then(function (response) {
                        $scope.userinterfacedata = response;
                        $scope.standardview = false;

                        //get active template from userinterface 
                        angular.forEach($scope.userinterfacedata.uploadedTemplateDetails, function (value, key) {
                            if (value.isActive == true) {
                                $scope.filedata = value.fileDetails;
                                $(".defaultTarget").html($compile($scope.filedata)($scope));
                            }
                        });

                    }, function (error) {
                        console.log('error');
                    });
                }
                else {
                    $scope.standardview = true;
                }


            }, function (error) {
                //console.log('error');
            });

        }

        $scope.getlistsearchinterface = function (contentid, subid, type) {
            $scope.searchtypeinterfaces = [];
            $scope.listtypeinterfaces = [];
            $scope.browsetypeinterfaces = [];
            searchinterfaceService.query({ controller: 'SearchInterface', contentTypeId: contentid, subObjectId: subid }).$promise.then(function (details) {
                var searchtypeinterfaces = [];
                var listtypeinterfaces = [];
                var browsetypeinterfaces = [];
                angular.forEach(details, function (value, key) {
                    if (value.searchInterfaceType == 0) {
                        searchtypeinterfaces.push(value);
                    }
                    if (value.searchInterfaceType == 1) {
                        listtypeinterfaces.push(value);
                    }
                    if (value.searchInterfaceType == 2) {
                        browsetypeinterfaces.push(value);
                    }
                });
                if (type == 'search') {
                    $scope.searchtypeinterfaces = searchtypeinterfaces;
                    $scope.searchtypecontentobject(searchtypeinterfaces, '', '');
                }
                //search type               
                if (type == 'list') {
                    //listtype
                    $scope.listtypeinterfaces = listtypeinterfaces;
                    $scope.listsearchcontentobject(listtypeinterfaces, '');
                }
                //browse type
                if (type == 'browse') {
                    $scope.browsetypeinterfaces = browsetypeinterfaces;
                    $scope.browseSearchContentObject(browsetypeinterfaces, '');

                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        $scope.showExceptionMessage($scope.messageModel, value.message, value.moreDetails);
                    });
                }
            });
        }
        $scope.contentObjectRecords = {};

        $scope.listsearchcontentobject = function (listtypeinterfaces, searchinterfaceid) {
            $scope.listtypeinterfaces = listtypeinterfaces;
            if (searchinterfaceid != '') {
                $scope.listinterfacetype = searchinterfaceid;
                $scope.listinterfacedata = $filter('filter')($scope.listtypeinterfaces, { searchInterfaceId: searchinterfaceid })[0];
            } else {
                // for highest order result ie default search result based on search interface
                var lowestlist = Number.POSITIVE_INFINITY;
                var highestlist = Number.NEGATIVE_INFINITY;
                var tmp;
                for (var i = $scope.listtypeinterfaces.length - 1; i >= 0; i--) {
                    tmp = $scope.listtypeinterfaces[i].orderNo;
                    if (tmp < lowestlist) lowestlist = tmp;
                    if (tmp > highestlist) highestlist = tmp;
                }

                $scope.listinterfacetype = $filter('filter')($scope.listtypeinterfaces, { orderNo: listhighorderno })[0].searchInterfaceId;
                $scope.listPerPage = $filter('filter')($scope.listtypeinterfaces, { orderNo: listhighorderno })[0].resultsPerPage;
            }
            // get result from backend using the column attribute from content object collection 
            var listhighorderno = highestlist;
            //get columns to display header in list searh content object
            $scope.listinterfacedata = $filter('filter')($scope.listtypeinterfaces, { orderNo: listhighorderno })[0];
            // console.log(JSON.stringify($scope.listinterfacedata.columns));
            //  console.log(JSON.stringify($scope.listinterfacedata.searchConditions));  
            //build array with search result (content objects) based on matched value with column  
            //console.log($scope.listinterfacedata.columns);
            $scope.searchresults = [];
            var columnsname = [];
            var ids = [];
            //angular.forEach($scope.listinterfacedata.columns, function (value2, key2) {
            //    columnsname.push(value2.name);
            //    ids.push(value2.id);
            //});
            var searchobject = { attributeIds: ids, contentType: $scope.listinterfacedata.contentTypeId, searchConditions: $scope.listinterfacedata.searchConditions, searchWord: "" };
            $scope.contentObjectRecords = [];
            var listcontentObjects = [];
            contentObjectService.getSearchResult(searchobject).$promise.then(function (contentObjectdetails) {
                
                angular.forEach(contentObjectdetails, function (value, key) {
                    $scope.resultObj = {};
                    angular.forEach(value.attributeCollection, function (value1, key1) {
                        var kVal = value1.name;
                        var vVal = value1.value;
                        if (columnsname.indexOf(kVal) != -1) {
                            $scope.resultObj[kVal] = vVal[0];
                        }
                    });
                    $scope.searchresults.push($scope.resultObj);
                    
                });

                $scope.currentPage = 1;
                $scope.listpaginate = function (value) {
                    var begin, end, index;
                    begin = ($scope.currentPage - 1) * $scope.listPerPage;
                    end = begin + $scope.listPerPage;
                    index = $scope.searchresults.indexOf(value);
                    return (begin <= index && index < end);
                };
                //sorting

                $scope.predicate = 'name';
                $scope.reverse = true;
                $scope.order = function (predicate) {
                    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                    $scope.predicate = predicate;
                };

            }, function (error) {
                //console.log('error');
            });

            $scope.predicate = 'name';
            $scope.reverse = true;
            $scope.order = function (predicate) {
                
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

        }
        $scope.autocomplete = function () {
            $("#search_keyword").autocomplete({ source: $rootScope.searchkeywords });
        }
        $scope.contentObjectRecords = {};
        $scope.contentObjectRecords1 = {};
        $scope.displayImage = function (attId, contentId) {
            contentObjectService.getContentObject({ contentObjectId: contentId, controller: 'contentobject' }).$promise.then(function (contentObjectdetails) {
                if (contentObjectdetails != null) {
                    angular.forEach(contentObjectdetails.fileDetails, function (value, key) {
                        if (value.fileId == attId) {
                            $scope.defaultimageid = value.fileContent;
                        }
                    });
                }
            });
        }
        $scope.browseSearchContentObject = function (browsetypeinterfaces, searchinterfaceid) {
            $rootScope.searchresultsarray = [];
            // display using directive
            $rootScope.searchResult = true;
            $scope.browsetypeinterfaces = browsetypeinterfaces;
            if (searchinterfaceid != '') {
                $scope.browseinterfacetype = searchinterfaceid;
                $scope.browseinterfacedata = $filter('filter')($scope.browsetypeinterfaces, { searchInterfaceId: searchinterfaceid })[0];
            } else {

                var lowestbrowse = Number.POSITIVE_INFINITY;
                var highestbrowse = Number.NEGATIVE_INFINITY;
                var tmp;
                for (var i = $scope.browsetypeinterfaces.length - 1; i >= 0; i--) {
                    tmp = $scope.browsetypeinterfaces[i].orderNo;
                    if (tmp < lowestbrowse) lowestbrowse = tmp;
                    if (tmp > highestbrowse) highestbrowse = tmp;
                }
                var browsehighorderno = highestbrowse;

                $scope.browseinterfacetype = $filter('filter')($scope.browsetypeinterfaces, { orderNo: browsehighorderno })[0].searchInterfaceId;
                $scope.browsePerPage = $filter('filter')($scope.browsetypeinterfaces, { orderNo: browsehighorderno })[0].resultsPerPage;
                $scope.browseinterfacedata = $filter('filter')($scope.browsetypeinterfaces, { orderNo: browsehighorderno })[0];
            }
            // if no user interface present use presentation
            $scope.userinterfacedata = {};
            if ($scope.browseinterfacedata.listItemInterface[0].id) {
                userinterfaceService.getLibrary({ controller: 'UserInterface', domainId: $rootScope.domainIdUi, contentTypeId: $rootScope.contentTypeId, id: $scope.browseinterfacedata.listItemInterface[0].id }).$promise.then(function (response) {
                    $scope.userinterfacedata = response;
                    $scope.standardview = false;
                    //get active template from userinterface 
                    angular.forEach($scope.userinterfacedata.uploadedTemplateDetails, function (value, key) {
                        if (value.isActive == true) {
                            $scope.filedata = value.fileDetails;
                            $rootScope.filedata = value.fileDetails;                                                    
                        }
                    });

                }, function (error) {
                    console.log('error');
                });
            }
            else {
                $scope.standardview = true;
            }
            //get search results:           
            $scope.searchresults = [];
            var ids = [];
            var searchobject = { attributeIds: ids, contentType: $scope.browseinterfacedata.contentTypeId, searchConditions: $scope.browseinterfacedata.searchConditions, searchWord: "" };
           
            contentObjectService.getSearchResult(searchobject).$promise.then(function (contentObjectdetails) {
                $scope.searchresults = contentObjectdetails;
                $rootScope.searchresultsarray = contentObjectdetails;               
                $scope.currentPage = 1;
                $scope.browsepaginate = function (value) {
                    var begin, end, index;
                    begin = ($scope.currentPage - 1) * $scope.browsePerPage;
                    end = begin + $scope.browsePerPage;
                    index = $scope.searchresults.indexOf(value);
                    return (begin <= index && index < end);
                };

               


            }, function (error) {
                //console.log('error');
            });




        }
        $scope.getsearresult = function (searchinterfacetype, keyword, type) {
            $scope.searchinterfacetype = searchinterfacetype;
            if (searchinterfacetype != '') {
                searchinterfaceService.get({
                    controller: 'SearchInterface', contentTypeId: $scope.contentTypeId, subObjectId: $scope.subObjectId, id: searchinterfacetype
                }).$promise.then(function (response) {
                    if (type == 'search') {
                        $scope.numPerPage = response.resultsPerPage;
                        $scope.searchinterfacetype = searchinterfacetype;
                        $scope.searchtypecontentobject($scope.searchtypeinterfaces, searchinterfacetype, keyword);
                    }
                    if (type == 'browse') {
                        $scope.browsePerPage = response.resultsPerPage;
                        $scope.browseinterfacetype = searchinterfacetype;
                        $scope.browseSearchContentObject($scope.listtypeinterfaces, searchinterfacetype);
                    }
                    if (type == 'list') {
                        $scope.listPerPage = response.resultsPerPage;
                        $scope.listinterfacetype = searchinterfacetype;
                        $scope.listsearchcontentobject($scope.listtypeinterfaces, searchinterfacetype);
                    }
                }, function (error) {
                    if (error.data.errorMessage) {
                        angular.forEach(error.data.errorMessage, function (value, key) {
                            $scope.showExceptionMessage($scope.messageModel, value.message, value.moredetails);
                        });
                    }
                });
            }
        }
        $scope.permissionSet.searchPermission = '';

    }]);

manageitModule.controller("rightMenuController", ['$scope', '$rootScope', '$location', 'domainService', 'documentLibraryService', 'contentTypeService', 'contentTypeService2',
    'sharedScope', 'subObjectService', 'attributeSetService', 'permissionsService', '$q', 'compositionService', '$routeParams', 'imageLibraryService', 'searchinterfaceService', '$filter', 'campaignBaseTypeService', '$uibModal', 'instanceInfo',
function ($scope, $rootScope, $location, domainService, documentLibraryService, contentTypeService, contentTypeService2, sharedScope, subObjectService, attributeSetService, permissionsService, $q, compositionService, $routeParams, imageLibraryService, searchinterfaceService, $filter, campaignBaseTypeService, $uibModal, instanceInfoSvc) {

    sharedScope.store('rightMenuController', $scope);
    $scope.isShowContent = false;
    $scope.isDomainSelected = false;

    $scope.defPromise = null;
    $scope.defAttributeSetPromise = null;
    //image library
    $scope.selectedItem;
    $scope.showContentTypeList = true;
    $scope.showImageTypeList = false;
    $scope.showDocTypeList = false;
    $scope.dropboxitemselected = function (item) {
        $scope.selectedItem = item;
        $scope.showContentTypeList = true;
        $scope.showImageTypeList = false;
        $scope.showDocTypeList = false;
        $scope.loadContentTypes(item);
    }

    $scope.listimagelibrary = function (val, itemid) {
        $scope.showContentTypeList = false;
        $scope.showImageTypeList = true;
        $scope.showDocTypeList = false;
        $scope.selectedContentTypeDomain = '';
        imageLibraryService.getAllImageLibraries().$promise.then(function (details) {

            $scope.imageLibraries = details;
            $scope.firstlib = details[0];

            //  $rootScope.imageLibraries = details;
            if ($scope.imageLibraries.length > 0) {
                if (val == 'first') {
                    $scope.loadImageLibrary(val, $scope.firstlib);
                }
                else if (val == 'saved') {
                    var test = $scope.imageLibraries.length - 1;
                    $scope.loadImageLibrary(val, $scope.imageLibraries[test]);
                }
                else {
                    imageLibraryService.getImageLibrary({
                        controller: 'imageLibrary', id: val
                    }).$promise.then(function (response) {
                        $scope.loadImageLibrary(val, response);
                    }, function (error) {
                    });

                }
            }
        }, function (error) {

        });
    }

    $scope.listdocumentlibrary = function (val) {
        $scope.showContentTypeList = false;
        $scope.showImageTypeList = false;
        $scope.showDocTypeList = true;
        $scope.selectedContentTypeDomain = '';
        documentLibraryService.getAllDocumentLibraries().$promise.then(function (details) {
            $scope.docLibraries = details;
            if ($scope.docLibraries.length > 0) {
                if (val == 'first') {
                    $scope.loadDocumentLibrary(val, $scope.docLibraries[0]);
                }
                else if (val == 'saved') {
                    var test = $scope.docLibraries.length - 1;
                    $scope.loadDocumentLibrary(val, $scope.docLibraries[test]);
                } else {
                    var result = $filter('filter')(details, { documentLibraryId: val })[0];
                    $scope.loadDocumentLibrary(val, result);
                }
            }

        }, function (error) {

        });
    }
    $scope.loadDomains = function (type) {
        if (type == 'domain') {
            domainService.query().$promise.then(function (details) {
                $scope.domains = [];
                $scope.userdefineddomains = [];
                sharedScope.store('rightMenuController', $scope);
                angular.forEach(details, function (value, key) {
                    {
                        $scope.domains.push(value);
                        if (value.isUserDefinedDomain == true) {
                            $scope.userdefineddomains.push(value);
                        }
                    }
                });

                if ($scope.userdefineddomains.length > 0) {
                    $scope.selectedItem = $scope.userdefineddomains[0]['domainName'];
                    $scope.loadContentTypes($scope.userdefineddomains[0]);

                    //Add for campaigns
                    $scope.loadCampaigns($scope.userdefineddomains[0]);
                }
            },
            function (error) {
                angular.forEach(error.data, function (value, key) {
                    {
                        if (value.errorMessage) {
                            angular.forEach(value.errorMessage, function (v, k) {
                                //  alert(v.message);
                            });
                        }
                    }
                });
            });
        }
    }

    // Load capmaigns.
    $scope.loadCampaigns = function (domainId) {
        campaignBaseTypeService.getCampaigns().$promise.then(function (details) {
            $scope.campaigns = details
        }, function (error) {
        });
    }

    $scope.loadDocuments = function (type) {

        if (type == 'documents') {
            documentLibraryService.getAllDocumentLibraries().$promise.then(function (details) {
                $scope.documentLibraries = [];
                sharedScope.store('rightMenuController', $scope);
                angular.forEach(details, function (value, key) {
                    {
                        $scope.documentLibraries.push(value);
                    }
                });
                if ($scope.documentLibraries.length > 0) {
                    $scope.loadContentTypes('', $scope.documentLibraries[0], "Doc");
                }
            },
            function (error) {
                angular.forEach(error.data, function (value, key) {
                    {
                        if (value.errorMessage) {
                            angular.forEach(value.errorMessage, function (v, k) {
                                //  alert(v.message);
                            });
                        }
                    }
                });
            });
        }
    }
    $scope.clearContentTypeMessages = function () {
        var instance = $filter('filter')(instanceInfoSvc.instances, { Name: 'JobiT' })[0];
        if (instance) {
            var modalInstance = $uibModal.open({
                templateUrl: '/manageIT/contenttype/partials/select-base-type.html',
                controller: 'SelectBaseTypeControler as sbtc'
            });
        }
        else {
            var modalInstance = $uibModal.open({
                templateUrl: '/manageIT/contenttype/partials/select-content-type.html'

            });
        }
        var scope = sharedScope.get('contentTypeController');
        scope.contentType.contentTypeId = "";
        scope.contentType.singularName = "";
        scope.contentType.pluralName = "";
        scope.contentType.identifier = "";
        scope.contentType.isContext = "";
        $scope.errorContentTypedetails.messages = [];
        scope.contentTypeForm.$setPristine();
        scope.errors = [];
    }
    $scope.errorContentTypedetails = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
    };
    //image library stuffs
    $scope.resetErrorDirective = function (attModel) {
        attModel.isError = false;
        attModel.isSuccess = false;
        attModel.isWarning = false;
        attModel.isInfo = false;
        attModel.messages = [];
        attModel.moreDetails = null;
        attModel.isHide = false;
    }



    //load image library
    $scope.showImageLibrary = function (contentType) {
        
        $scope.initialConfig(contentType);
        var urltype = "/ManageIT/Properties/image/";
        var contentTypeScope = sharedScope.get('contentTypeController');
        $scope.contentTypeMenu = contentType.identifier;
        $rootScope.leftactivemenu1 = urltype + contentType.identifier;
        $rootScope.contentTypeId = contentType.imageLibraryId;
        $rootScope.subObjectId = contentType.subObjectId ? contentType.subObjectId : "0";
        $scope.leftactivemenu = urltype + contentType.identifier;
        $location.url(urltype + contentType.identifier);
        $rootScope.selectedType = 'Image';
        //alert(contentType.imageLibraryId);
        //this call to get subobjects is to create the dynamic left menu.
        if ($rootScope.addPermissionCO == true && contentType.permissions.length > 0) {
            $location.path('/ManageIT/ContentObject/Default/' + $rootScope.selectedType + '/' + contentType.contentTypeId + '/SubObject/0/ContentObject/0');
            $scope.tabActivations();
        }
        $scope.defPromise = $scope.buildDynamicLeftMenuImage(contentType);
        contentTypeScope.errors = [];
    }
    $scope.loadImageLibrary = function (domain, contentDetails) {
        if (domain != null || domain != '') {
            $scope.showContentTypeList = false;
            $scope.showImageTypeList = true;
            $scope.showDocTypeList = false;
            $scope.showImageLibrary(contentDetails);
            sharedScope.store('rightMenuController', $scope);
        }
    }
    $scope.buildDynamicLeftMenuImage = function (contentType) {
        // $scope.addSubObjectMenuItemImage('', contentType.imageLibraryId);
        var defObjSubObject = $q.defer();
        var libtype = subObjectService.query({ domainId: $scope.contentTypeModel.domainId, id: contentType.imageLibraryId });
        var isMenuStyleApplied = false;
        libtype.$promise.then(function (details) {
            if (details) {
                $scope.defAttributeSetPromise = $scope.addSubObjectMenuItemImage(details, contentType.imageLibraryId);
                defObjSubObject.resolve();
            }
        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.errors.push(value.message);
                    defObjSubObject.reject();
                });
            }
            else {
                $scope.errors.push("Error occured while fetching sub objects. Please try after sometime.");
            }
        });
        return defObjSubObject.promise;

    }
    $scope.addSubObjectMenuItemImage = function (subObjects, imageLibraryId) {
        //update the left menu.
        var leftMenuController = sharedScope.get('leftMenuController');
        leftMenuController.contentTypeId = $rootScope.contentTypeId;
        leftMenuController.subobjid = $rootScope.subObjectId;
        leftMenuController.leftMenuItems = [];
        var ids = {
            contentTypeId: imageLibraryId,
            subObjectId: 0,
            attributeSetId: 0,
            classificationId: 0,
            permissionTypeId: 0,
            type: 'Image/'
        };
        leftMenuController.loadSubMenuItemsImage(ids);

        var item = {
            itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
            itemName: $scope.contentTypeModel.pluralName,
            url: "", nestedMenu: leftMenuController.subMenuItems
        };
        //  get attribute set for image library and add with left menu

        var defObjAttributeSet = $q.defer();
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        var librariesId;
        if (contentType.imageLibraryId) {
            librariesId = contentType.imageLibraryId;
        }
        else if (contentType.contentTypeId) {
            librariesId = contentType.contentTypeId;
        }
        else {
            librariesId = contentType.documentLibraryId;
        }
        attributeSetService.allAttributeSetQuery({ domainId: contentType.domainId, id: librariesId }).$promise.then(function (details) {
            if (details) {
                //add attributeSets to the menu.   
                defObjAttributeSet.resolve();
                angular.forEach(details, function (value, key) {
                    var newAttributeSet = {
                        itemIds: {
                            contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: value.attributeSetId, classificationId: 0
                        },
                        itemName: value.attributeSetName,
                        url: "/ManageIT/Attributes/" + value.attributeSetName + "/Image/" + ids.contentTypeId + "/SubObject/0/AttributeSet/" + value.attributeSetId,
                        nestedMenu: []
                    };
                    item.nestedMenu[3].nestedMenu.push(newAttributeSet);
                });
            }
        });


        // get composition based on image library
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        if (contentType.imageLibraryId) {
            var libraryid = contentType.imageLibraryId;
        } else if (contentType.contentTypeId) {
            var libraryid = contentType.contentTypeId
        }
        else {
            var libraryid = contentType.documentLibraryId
        }
        var defObjCompositions = $q.defer();

        compositionService.query({ controller: 'Composition', paramUri: 'allCompDetails', domainId: contentType.domainId, contentTypeId: libraryid }).$promise.then(function (details) {
            if (details) {
                defObjCompositions.resolve();
                angular.forEach(details, function (value, key) {
                    //ids.compositionId = value.compositionId;
                    var newComposition = {
                        itemIds: {
                            contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: 0, classificationId: 0
                        },
                        itemName: value.compositionName,
                        url: "/ManageIT/AttributeMap/" + value.compositionName + "/Image/" + ids.contentTypeId + "/SubObject/" + value.subObjectId + "/Composition/" + value.compositionId,
                        nestedMenu: []
                    };
                    item.nestedMenu[4].nestedMenu.push(newComposition);
                });
            }

        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    //$scope.errors.push(value);
                });
            }
            else {
                //$scope.errors.push("Error occured while fetching an Compositions. Please try after sometime.");
            }

        });

        leftMenuController.contentTypeName = $scope.contentTypeModel.singularName;
        leftMenuController.properties.url = "/ManageIT/Properties/" + $scope.contentTypeModel.identifier;
        leftMenuController.leftMenuItems.push(leftMenuController.properties);
        leftMenuController.leftMenuItems.push(leftMenuController.subObjects);
        leftMenuController.leftMenuItems.push(item);
        //leftMenuController.leftMenuItems.push(leftMenuController.subObjects);
        //leftMenuController.leftMenuItems.push(item);
        angular.forEach(subObjects, function (value, key) {
            ids.subObjectId = value.subObjectId;
            leftMenuController.loadSubMenuItems(ids);
            var item2 = {
                itemIds: {
                    contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0
                },
                itemName: value.singularName,
                url: "", nestedMenu: leftMenuController.subMenuItems
            };

            if (value.singularName) {
                leftMenuController.attributeScreenName = value.singularName;
            } else {
                leftMenuController.attributeScreenName = value.pluralName;
            }
            item2.nestedMenu[0].itemName = "Attributes";
            item2.nestedMenu[0].url = "/ManageIT/Attributes/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/0";
            item2.nestedMenu[8].url = "/ManageIT/Layouts/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0";
            item2.nestedMenu.splice(2, 1);
            item2.nestedMenu[3].nestedMenu.splice(0, 1);
            item2.nestedMenu[3].url = "/ManageIT/Permissions/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/2";
            item2.nestedMenu.splice(4, 1);
            item2.nestedMenu.splice(4, 1);

            // item2.nestedMenu[2].nestedMenu = angular.copy($scope.compositionMenuItems);
            leftMenuController.leftMenuItems.push(item2);

        });
    }

    //document library

    $scope.showDocumentLibrary = function (contentType) {
        $scope.initialConfig(contentType);
        var urltype = "/ManageIT/Properties/Doc/";
        var contentTypeScope = sharedScope.get('contentTypeController');
        $scope.contentTypeMenu = contentType.identifier;
        $rootScope.leftactivemenu1 = urltype + contentType.identifier;
        $rootScope.contentTypeId = contentType.documentLibraryId;
        $rootScope.subObjectId = contentType.subObjectId ? contentType.subObjectId : "0";
        $scope.leftactivemenu = urltype + contentType.identifier;
        $location.url(urltype + contentType.identifier);
        //this call to get subobjects is to create the dynamic left menu.
        $rootScope.selectedType = 'Document';
        if ($rootScope.addPermissionCO == true && contentType.permissions.length > 0) {
            $location.path('/ManageIT/ContentObject/Default/' + $rootScope.selectedType + '/' + contentType.contentTypeId + '/SubObject/0/ContentObject/0');
            $scope.tabActivations();
        }
        $scope.defPromise = $scope.buildDynamicLeftMenuDocument(contentType);
        contentTypeScope.errors = [];
    }
    $scope.loadDocumentLibrary = function (domain, contentDetails) {
        if (domain != null || domain != '') {
            $scope.showContentTypeList = false;
            $scope.showImageTypeList = false;
            $scope.showDocTypeList = true;
            $scope.showDocumentLibrary(contentDetails);
            $scope.showContentTypeList = false;
            sharedScope.store('rightMenuController', $scope);
        }
    }
    $scope.buildDynamicLeftMenuDocument = function (contentType) {

        var defObjSubObject = $q.defer();
        var libtype = subObjectService.query({ domainId: $scope.contentTypeModel.domainId, id: contentType.documentLibraryId });
        var isMenuStyleApplied = false;
        libtype.$promise.then(function (details) {
            if (details) {
                $scope.defAttributeSetPromise = $scope.addSubObjectMenuItemDoc(details, contentType.documentLibraryId);
                defObjSubObject.resolve();
            }
        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.errors.push(value.message);
                    defObjSubObject.reject();
                });
            }
            else {
                $scope.errors.push("Error occured while fetching sub objects. Please try after sometime.");
            }
        });
        return defObjSubObject.promise;
    }
    $scope.addSubObjectMenuItemDoc = function (subObjects, documentLibraryId) {
        //update the left menu.

        var leftMenuController = sharedScope.get('leftMenuController');
        leftMenuController.contentTypeId = $rootScope.contentTypeId;
        leftMenuController.subobjid = $rootScope.subObjectId;
        leftMenuController.leftMenuItems = [];
        var ids = {
            contentTypeId: documentLibraryId,
            subObjectId: 0,
            attributeSetId: 0,
            classificationId: 0,
            permissionTypeId: 0,
            type: 'Document/'
        };
        leftMenuController.loadSubMenuItemsDocument(ids);

        var item = {
            itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
            itemName: $scope.contentTypeModel.pluralName,
            url: "", nestedMenu: leftMenuController.subMenuItems
        };
        var defObjAttributeSet = $q.defer();
        leftMenuController.contentTypeName = $scope.contentTypeModel.singularName;
        leftMenuController.properties.url = "/ManageIT/Properties/" + $scope.contentTypeModel.identifier;
        leftMenuController.leftMenuItems.push(leftMenuController.properties);
        leftMenuController.leftMenuItems.push(leftMenuController.subObjects);
        leftMenuController.leftMenuItems.push(item);
        angular.forEach(subObjects, function (value, key) {
            ids.subObjectId = value.subObjectId;
            leftMenuController.loadSubMenuItems(ids);
            var item2 = {
                itemIds: {
                    contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0
                },
                itemName: value.singularName,
                url: "", nestedMenu: leftMenuController.subMenuItems
            };

            if (value.singularName) {
                leftMenuController.attributeScreenName = value.singularName;
            } else {
                leftMenuController.attributeScreenName = value.pluralName;
            }
            item2.nestedMenu[0].itemName = "Attributes";
            item2.nestedMenu[0].url = "/ManageIT/Attributes/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/0";
            item2.nestedMenu[8].url = "/ManageIT/Layouts/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0";
            item2.nestedMenu.splice(2, 1);
            item2.nestedMenu[3].nestedMenu.splice(0, 1);
            item2.nestedMenu[3].url = "/ManageIT/Permissions/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/2";
            item2.nestedMenu.splice(4, 1);
            item2.nestedMenu.splice(4, 1);

            // get composition based on image library
            var contentType = sharedScope.get('rightMenuController').contentTypeModel;
            if (contentType.imageLibraryId) {
                var libraryid = contentType.imageLibraryId;
            } else if (contentType.contentTypeId) {
                var libraryid = contentType.contentTypeId
            }
            else {
                var libraryid = contentType.documentLibraryId
            }
            var defObjCompositions = $q.defer();

            compositionService.query({ controller: 'Composition', paramUri: 'allCompDetails', domainId: contentType.domainId, contentTypeId: libraryid }).$promise.then(function (details) {
                if (details) {
                    defObjCompositions.resolve();
                    angular.forEach(details, function (value, key) {
                        //ids.compositionId = value.compositionId;
                        var newComposition = {
                            itemIds: {
                                contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: 0, classificationId: 0
                            },
                            itemName: value.compositionName,
                            url: "/ManageIT/AttributeMap/" + value.compositionName + "/Document/" + ids.contentTypeId + "/SubObject/" + value.subObjectId + "/Composition/" + value.compositionId,
                            nestedMenu: []
                        };
                        item.nestedMenu[4].nestedMenu.push(newComposition);
                    });
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        //$scope.errors.push(value);
                    });
                }
                else {
                    //$scope.errors.push("Error occured while fetching an Compositions. Please try after sometime.");
                }

            });

            // item2.nestedMenu[2].nestedMenu = angular.copy($scope.compositionMenuItems);
            leftMenuController.leftMenuItems.push(item2);

        });

        var defObjAttributeSet = $q.defer();
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;
        var librariesId;
        if (contentType.imageLibraryId) {
            librariesId = contentType.imageLibraryId;
        }
        else if (contentType.contentTypeId) {
            librariesId = contentType.contentTypeId;
        }
        else {
            librariesId = contentType.documentLibraryId;
        }
        attributeSetService.allAttributeSetQuery({ domainId: contentType.domainId, id: librariesId }).$promise.then(function (details) {
            if (details) {
                //add attributeSets to the menu.   
                defObjAttributeSet.resolve();
                angular.forEach(details, function (value, key) {
                    var newAttributeSet = {
                        itemIds: {
                            contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: value.attributeSetId, classificationId: 0
                        },
                        itemName: value.attributeSetName,
                        url: "/ManageIT/Attributes/" + value.attributeSetName + "/Document/" + ids.contentTypeId + "/SubObject/0/AttributeSet/" + value.attributeSetId,
                        nestedMenu: []
                    };
                    item.nestedMenu[3].nestedMenu.push(newAttributeSet);
                });
            }
        });

    }



    $scope.loadContentTypes = function (domain, contentDetails) {
        if (domain != null || domain != '') {
            $scope.showContentTypeList = true;
            $scope.showImageTypeList = false;
            $scope.showDocTypeList = false;
            var contype = contentTypeService.query({ id: domain.domainId });

            contype.$promise.then(function (details) {
                $scope.contentTypes = details;
                $scope.isDomainSelected = true;
                $scope.selectedContentTypeDomain = domain;

                if (contentDetails == null || contentDetails == undefined) {
                    if ($scope.contentTypes != null && $scope.contentTypes != undefined && $scope.contentTypes.length > 0) {

                        $scope.showContentType($scope.contentTypes[0]);
                    }
                    else {
                        $scope.isShowContent = false;
                        $scope.contentTypeModel = null;
                    }
                }
                else
                    $scope.showContentType(contentDetails);
                sharedScope.store('rightMenuController', $scope);

            }, function (error) {
                //$scope.errors.push("error in getting contentTypes");
            });
            // }

        }
    };


    $scope.permissionSet = {
        viewPermission: false,
        addPermission: false,
        editPermission: false,
        deletePermission: false,
        modifyPermission: false,
        searchPermission: false,
        linkItem: false,
        unLinkItem: false,
        addItem: false,
        selectedClassification: null,
        selectedAttribute: null,
        selectedRoleOrClassification: {
            roleId: null,
            roleName: null,
            classificationId: null,
            classificationName: null
        },
        attributes: {
            selectedClassificationAttributeId: null,
            selectedAttributeId: null,
            selectedAttributeName: null
        }
    };

    $scope.getRolesByContentType = function (permissionDecision) {

        $scope.mainMenuRoles = [];
        $scope.mainMenuRolesWithPermissions = [];
        $scope.permissionTypeId = 1;
        if ($scope.permissionTypeId != 0) {
            if ($rootScope.subObjectId == 0) {
                var permissionServiceGetRols = permissionsService.get({ contentTypeId: $rootScope.contentTypeId });
            }
            else {
                var permissionServiceGetRols = permissionsService.getSub({ contentTypeId: $rootScope.contentTypeId, subObjectId: $rootScope.subObjectId });
            }
            permissionServiceGetRols.$promise.then(function (response) {
                $scope.contentTypePermissions = response;
                if (response.$resolved == true && response.length > 0) {
                    angular.forEach(response, function (item) {
                        if ($scope.permissionTypeId == 1) {
                            if (item.objects != null) {
                                if (item.objects.selectedRoles != null) {
                                    if (item.objects.selectedRoles[0].roleId != "" || item.objects.selectedRoles[0].roleName != "") {
                                        $scope.mainMenuRoles.push({ 'roleId': item.objects.selectedRoles[0].roleId, 'roleName': item.objects.selectedRoles[0].roleName });
                                        $scope.mainMenuRolesWithPermissions.push({
                                            'roleId': item.objects.selectedRoles[0].roleId,
                                            'permissionId': item.permissionId,
                                            'permissions': {
                                                search: item.objects.selectedRoles[0].permission.search
                                            }
                                        })
                                    }
                                }
                            }
                        }
                        if ($scope.permissionTypeId == 2) {
                            if (item.attributes != null) {
                                if (item.attributes.selectedRoles != null) {
                                    if (item.attributes.selectedRoles[0].selectedAttributes.length > 0) {
                                        angular.forEach(item.attributes.selectedRoles[0].selectedAttributes, function (outerItem) {
                                            if (outerItem.attributeId != "" || outerItem.attributeName != "") {
                                                $scope.mainMenuRoles.push({ 'roleId': item.attributes.selectedRoles[0].roleId, 'roleName': item.attributes.selectedRoles[0].roleName });
                                                $scope.mainMenuRolesWithAttributes.push({
                                                    'roleId': item.attributes.selectedRoles[0].roleId,
                                                    'attributeId': outerItem.attributeId,
                                                    'permissionId': item.permissionId,
                                                    'permissions': {
                                                        search: outerItem.permission.search
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    });

                    if ($scope.mainMenuRoles.length > 0) {
                        if ($scope.permissionSet.selectedRoleOrClassification.roleId == null) {
                            $scope.permissionSet.selectedRoleOrClassification.roleId = 0;
                            $scope.permissionSet.selectedRoleOrClassification.roleName = "All Users";
                        }
                        else {
                            $scope.permissionSet.selectedRoleOrClassification.roleId = $scope.mainMenuRoles[0].roleId;
                            $scope.permissionSet.selectedRoleOrClassification.roleName = $scope.mainMenuRoles[0].roleName;
                        }
                        $scope.permissionSet.selectedRoleOrClassification.classificationId = null;
                        $scope.permissionSet.selectedRoleOrClassification.classificationName = null;
                        $scope.getRolePermissions($scope.permissionSet.selectedRoleOrClassification.roleId, 1);
                    }
                    else {
                        $scope.getRolePermissions(0, 1);
                    }
                }
                else {
                    if (permissionDecision === 0) {
                        $scope.mainMenuRoles.push({ 'roleId': "0", 'roleName': "All Users" });
                    }
                    if ($scope.mainMenuRoles.length > 0) {
                        $scope.permissionSet.selectedRoleOrClassification.roleId = $scope.mainMenuRoles[0].roleId;
                        $scope.permissionSet.selectedRoleOrClassification.roleName = $scope.mainMenuRoles[0].roleName;
                    }
                }
            },
          function (error) {
              $scope.errorAttribute.isError = true;
              $scope.errorAttribute.messages.push("Error occured while fetching Roles on Content Type. Please try after sometime.");
              //$scope.errorAttribute = "Error occured while saving the Text Attribute. Please try after sometime.";
          });
        }
    }

    $scope.getRolePermissions = function (roleOrClassId, RoleType) {
        var roleMatch = 0;
        var classMatch = 0;
        $scope.contentAttributes = [];
        if ($scope.permissionTypeId != 0) {
            if (RoleType == 1 && $scope.permissionTypeId == 1) {
                if ($scope.mainMenuRolesWithPermissions.length > 0) {
                    angular.forEach($scope.mainMenuRolesWithPermissions, function (item) {
                        if (roleOrClassId == item.roleId) {
                            roleMatch = 1;
                            $scope.permissionSet.searchPermission = item.permissions.search;
                            $scope.permissionId = item.permissionId;
                        }
                    });
                }
            }
            if (RoleType == 1 && $scope.permissionTypeId == 2) {
                if ($scope.mainMenuRolesWithPermissions.length > 0) {
                    angular.forEach($scope.mainMenuRolesWithPermissions, function (item) {
                        if (roleOrClassId == item.roleId) {
                            roleMatch = 1;
                            $scope.permissionSet.searchPermission = item.permissions.search;
                            $scope.permissionId = item.permissionId;
                        }
                    });
                }
            }
            if (roleMatch == 0 && RoleType == 1) {
                $scope.permissionSet.searchPermission = false;
                $scope.permissionId = null;
            }

            var leftMenuController = sharedScope.get('leftMenuController');
            leftMenuController.permissionSet.searchPermission = $scope.permissionSet.searchPermission;
        }
    }

    // Access for User Type
    $scope.allowPermission = function (contentType) {

        $scope.access = true;
        if (contentType.permissions.length == 0) {
            //alert("No Permission applied for this type, please contact your content Admin");
            $scope.access = false;
        }
        $scope.enableSearchTab = "";
        $scope.enableListTab = "";
        $scope.enableBrowseTab = "";
        $rootScope.addPermissionCO = false;
        $rootScope.viewPermissionCO = false;
        $rootScope.editPermissionCO = false;
        $rootScope.deletePermissionCO = false;
        $rootScope.modifyPermissionCO = false;
        $rootScope.searchPermissionCO = false;


        if (contentType.permissions.length > 0 && $scope.access) {
            angular.forEach(contentType.permissions[0]['objects']['selectedRoles'], function (value, key) {
                angular.forEach($rootScope.userRoleTypes, function (role, k) {
                    //alert("role"+role);
                    //alert("value.roleName" + value.roleName);
                    if (role == value.roleName) {
                        if (!$rootScope.addPermissionCO)
                            $rootScope.addPermissionCO = value.permission['add'];
                        if (!$rootScope.viewPermissionCO)
                            $rootScope.viewPermissionCO = value.permission['view'];
                        if (!$rootScope.editPermissionCO)
                            $rootScope.editPermissionCO = value.permission['edit'];
                        if (!$rootScope.deletePermissionCO)
                            $rootScope.deletePermissionCO = value.permission['delete'];
                        if (!$rootScope.modifyPermissionCO)
                            $rootScope.modifyPermissionCO = value.permission['modify'];
                        if (!$rootScope.searchPermissionCO)
                            $rootScope.searchPermissionCO = value.permission['search'];

                        if ($rootScope.searchPermissionCO) {
                            $scope.enableSearchTab = "active";
                        }
                        if ($rootScope.viewPermissionCO || $rootScope.editPermissionCO) {
                            $rootScope.searchPermissionCO = true;
                            $scope.enableSearchTab = "active";
                        }
                    }

                });
            });
            //alert($scope.here);
        }
        if (!$rootScope.addPermissionCO && !$rootScope.viewPermissionCO && !$rootScope.editPermissionCO && !$rootScope.deletePermissionCO && !$rootScope.modifyPermissionCO && !$rootScope.searchPermissionCO) {
            $scope.access = false;
        }

        //console.log($rootScope.addPermissionCO);
        //console.log($rootScope.viewPermissionCO);
        //console.log($rootScope.editPermissionCO);
        //console.log($rootScope.deletePermissionCO);
        //console.log($rootScope.modifyPermissionCO);
        //console.log($rootScope.searchPermissionCO);
    }


    $scope.initialConfig = function (contentType) {
        $rootScope.saveFlag = false;
        $rootScope.checkinFlag = false;
        $rootScope.viewTab = "";
        $rootScope.editTab = "";
        if ($rootScope.isAdmin) {
            $('.configClassCheck').addClass('active');
            $('#configure.tab-pane').addClass('active');
            if ($('.addTab').hasClass('active')) {
                $('.addTab').removeClass('active');
            }
            else if ($('.browseClassCheck').hasClass('active') || $('#browse.tab-pane').hasClass('active')) {
                $('.browseClassCheck').removeClass('active');
                $('#browse.tab-pane').removeClass('active');
            }
            else if ($('.listClassCheck').hasClass('active') || $('#list.tab-pane').hasClass('active')) {
                $('.listClassCheck').removeClass('active');
                $('#list.tab-pane').removeClass('active');
            }
            else if ($('.searchClassCheck').hasClass('active') || $('#search.tab-pane').hasClass('active')) {
                $('.searchClassCheck').removeClass('active');
                $('#search.tab-pane').removeClass('active');
            }
            else if ($('.changelogClassCheck').hasClass('active') || $('#changelog.tab-pane').hasClass('active')) {
                $('.changelogClassCheck').removeClass('active');
                $('#changelog.tab-pane').removeClass('active');
            }
            else if ($('.usageClassCheck').hasClass('active') || $('#usage.tab-pane').hasClass('active')) {
                $('.usageClassCheck').removeClass('active');
                $('#usage.tab-pane').removeClass('active');
            }
        } else {
            if ($('.browseClassCheck').hasClass('active') || $('#browse.tab-pane').hasClass('active')) {
                $('.browseClassCheck').removeClass('active');
                $('#browse.tab-pane').removeClass('active');
            }
            else if ($('.listClassCheck').hasClass('active') || $('#list.tab-pane').hasClass('active')) {
                $('.listClassCheck').removeClass('active');
                $('#list.tab-pane').removeClass('active');
            }
            else if ($('.searchClassCheck').hasClass('active') || $('#search.tab-pane').hasClass('active')) {
                $('.searchClassCheck').removeClass('active');
                $('#search.tab-pane').removeClass('active');
            }
        }

        $rootScope.domainIdUi = "";
        $scope.isShowContent = true;
        $scope.contentTypeModel = contentType;
        $rootScope.domainIdUi = contentType.domainId;

        if (!$rootScope.isAdmin) {
            $scope.allowPermission(contentType);
            if (($scope.viewPermissionCO || $scope.editPermissionCO) && $scope.addPermissionCO) {
                $('.addTab').removeClass('active');
                $('#search.tab-pane').addClass('active');
                $('.searchClassCheck').addClass('active');
            } else if ($scope.addPermissionCO) {
                $('.addTab').addClass('active');
                $('#configure.tab-pane').addClass('active');
            }
        } else {
            $scope.viewPermissionCO = true;
            $scope.editPermissionCO = true;
            $scope.addPermissionCO = true;
            $scope.deletePermissionCO = true;
            if ($('.tablecol.left-menu').hasClass('hide'))
                $('.tablecol.left-menu').removeClass('hide')
        }
    }

    $scope.tabActivations = function () {
        if (!$rootScope.searchPermissionCO) {
            $('#configure.tab-pane').addClass('active');
        } else {
            $('#configure.tab-pane').removeClass('active');
        }
        //$('.addTab').addClass('active');
        $('.viewTab').removeClass('active');
        $('.editTab').removeClass('active');
        $('.left-menu').addClass('hide');
        if ($('.tablecol.main-area-wrap').hasClass('main-left-content-wrap')) {
            $('.tablecol.main-area-wrap').removeClass('main-left-content-wrap');
        }
    }


    $scope.showContentType = function (contentType) {
        $scope.initialConfig(contentType);
        var urltype = "/ManageIT/Properties/";
        var contentTypeScope = sharedScope.get('contentTypeController');
        contentTypeScope.contentType = {};
        contentTypeScope.contentType.contentTypeId = contentType.contentTypeId;
        contentTypeScope.contentType.singularName = contentType.singularName;
        contentTypeScope.contentType.pluralName = contentType.pluralName;
        contentTypeScope.contentType.identifier = contentType.identifier;
        contentTypeScope.contentType.isContext = contentType.isContext;
        contentTypeScope.contentType.version = contentType.version;
        $rootScope.leftactivemenu1 = urltype + contentType.identifier;
        $rootScope.contentTypeId = contentType.contentTypeId;
        $rootScope.subObjectId = contentType.subObjectId ? contentType.subObjectId : "0";
        $rootScope.contentTypeId = contentType.contentTypeId;
        $rootScope.selectedType = 'ContentType';
        $scope.leftactivemenu = urltype + contentType.identifier;
        $scope.contentTypeMenu = contentType.identifier;
        $location.url(urltype + contentType.identifier);
        if ($rootScope.addPermissionCO == true && contentType.permissions.length > 0) {
            $location.path('/ManageIT/ContentObject/Default/' + $rootScope.selectedType + '/' + contentType.contentTypeId + '/SubObject/0/ContentObject/0');
            $scope.tabActivations();
        }
        //this call to get subobjects is to create the dynamic left menu.
        $scope.defPromise = $scope.buildDynamicLeftMenu(contentType);
        contentTypeScope.errors = [];
    }

    // Change for Campaigns
    $scope.showCampaignsContentType = function (contentType) {
        $scope.isShowContent = true;
        $scope.contentTypeModel = contentType;
        var urltype = "/ManageIT/Properties/";
        var contentTypeScope = sharedScope.get('contentTypeController');
        contentTypeScope.contentType.contentTypeId = contentType.contentTypeId;
        contentTypeScope.contentType.singularName = contentType.singularName;
        contentTypeScope.contentType.pluralName = contentType.pluralName;
        contentTypeScope.contentType.identifier = contentType.identifier;
        contentTypeScope.contentType.isContext = contentType.isContext;
        contentTypeScope.contentType.version = contentType.version;
        $rootScope.leftactivemenu1 = urltype + contentType.identifier;
        $rootScope.contentTypeId = contentType.contentTypeId;
        $rootScope.subObjectId = contentType.subObjectId ? contentType.subObjectId : "0";
        $scope.leftactivemenu = urltype + contentType.identifier;
        $scope.contentTypeMenu = contentType.identifier;
        $location.url(urltype + contentType.identifier);
        //this call to get subobjects is to create the dynamic left menu.
        $scope.defPromise = $scope.buildDynamicLeftCampaignMenu();
        contentTypeScope.errors = [];
    }

    $scope.buildDynamicLeftMenu = function (contentType) {
        //$scope.addSubObjectMenuItem('');           
        var defObjSubObject = $q.defer();
        var libtype = subObjectService.query({ domainId: contentType.domainId, id: contentType.contentTypeId });
        var isMenuStyleApplied = false;
        libtype.$promise.then(function (details) {
            if (details) {
                $scope.defAttributeSetPromise = $scope.addSubObjectMenuItem(details);
                defObjSubObject.resolve();
            }
        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.errors.push(value.message);
                    defObjSubObject.reject();
                });
            }
            else {
                $scope.errors.push("Error occured while fetching sub objects. Please try after sometime.");
            }
        });
        return defObjSubObject.promise;
    }
    $scope.compositionMenuItems = [];
    $scope.addSubObjectMenuItem = function (subObjects) {
        //update the left menu.
        var leftMenuController = sharedScope.get('leftMenuController');
        leftMenuController.contentTypeId = $rootScope.contentTypeId;
        leftMenuController.subobjid = $rootScope.subObjectId;

        leftMenuController.leftMenuItems = [];
        var ids = {
            contentTypeId: $scope.contentTypeModel.contentTypeId,
            subObjectId: 0,
            attributeSetId: 0,
            classificationId: 0,
            permissionTypeId: 0,
            type: 'ContentType/'
        };
        leftMenuController.loadSubMenuItems(ids);

        var item = {
            itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
            itemName: $scope.contentTypeModel.pluralName,
            url: "", nestedMenu: leftMenuController.subMenuItems
        };
        var defObjAttributeSet = $q.defer();
        attributeSetService.query({ id: ids.contentTypeId }).$promise.then(function (details) {
            if (details) {
                //add attributeSets to the menu.   
                defObjAttributeSet.resolve();
                angular.forEach(details, function (value, key) {

                    var newAttributeSet = {
                        itemIds: {
                            contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: value.attributeSetId, classificationId: 0
                        },
                        itemName: value.attributeSetName,
                        url: "/ManageIT/Attributes/" + value.attributeSetName + "/ContentType/" + ids.contentTypeId + "/SubObject/0/AttributeSet/" + value.attributeSetId,
                        nestedMenu: []
                    };
                    //push each attributeset item into the menu.
                    item.nestedMenu[2].nestedMenu.push(newAttributeSet);
                });
            }
        });

        var defObjCompositions = $q.defer();
        var contentType = sharedScope.get('rightMenuController').contentTypeModel;

        compositionService.query({ controller: 'Composition', paramUri: 'allCompDetails', domainId: contentType.domainId, contentTypeId: ids.contentTypeId }).$promise.then(function (details) {
            if (details) {
                defObjCompositions.resolve();
                angular.forEach(details, function (value, key) {
                    //ids.compositionId = value.compositionId;
                    var newComposition = {
                        itemIds: {
                            contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: 0, classificationId: 0
                        },
                        itemName: value.compositionName,
                        url: "/ManageIT/AttributeMap/" + value.compositionName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + value.subObjectId + "/Composition/" + value.compositionId,
                        nestedMenu: []
                    };
                    //push each Composition item into the menu.
                    item.nestedMenu[3].nestedMenu.push(newComposition);
                });
            }

        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    //$scope.errors.push(value);
                });
            }
            else {
                //$scope.errors.push("Error occured while fetching an Compositions. Please try after sometime.");
            }

        });

        leftMenuController.contentTypeName = $scope.contentTypeModel.singularName;
        leftMenuController.properties.url = "/ManageIT/Properties/" + $scope.contentTypeModel.identifier;
        leftMenuController.leftMenuItems.push(leftMenuController.properties);
        leftMenuController.leftMenuItems.push(leftMenuController.subObjects);
        leftMenuController.leftMenuItems.push(item);
        angular.forEach(subObjects, function (value, key) {
            ids.subObjectId = value.subObjectId;
            leftMenuController.loadSubMenuItems(ids);
            var item2 = {
                itemIds: {
                    contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0
                },
                itemName: value.singularName,
                url: "", nestedMenu: leftMenuController.subMenuItems
            };

            if (value.singularName) {
                leftMenuController.attributeScreenName = value.singularName;
            } else {
                leftMenuController.attributeScreenName = value.pluralName;
            }
            item2.nestedMenu[0].itemName = "Attributes";
            item2.nestedMenu[0].url = "/ManageIT/Attributes/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/0";
            item2.nestedMenu[8].url = "/ManageIT/Layouts/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0";
            item2.nestedMenu.splice(2, 1);
            item2.nestedMenu[3].nestedMenu.splice(0, 1);
            item2.nestedMenu[3].url = "/ManageIT/Permissions/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/2";
            item2.nestedMenu.splice(4, 1);
            item2.nestedMenu.splice(4, 1);

            compositionService.getSourceObjectComposition({ controller: 'Composition', paramUri: 'allCompDetailsBySO', contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId }).$promise.then(function (details) {
                if (details) {
                    defObjCompositions.resolve();
                    angular.forEach(details, function (value, key) {
                        //ids.compositionId = value.compositionId;
                        var newComposition = {
                            itemIds: {
                                contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0
                            },
                            itemName: value.compositionName,
                            url: "/ManageIT/AttributeMap/" + value.compositionName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + value.subObjectId + "/Composition/" + value.compositionId,
                            nestedMenu: []
                        };
                        //push each Composition item into the menu.
                        item2.nestedMenu[2].nestedMenu.push(newComposition);
                    });
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        //$scope.errors.push(value);
                    });
                }
                else {
                    //$scope.errors.push("Error occured while fetching an Compositions. Please try after sometime.");
                }

            });


            // item2.nestedMenu[2].nestedMenu = angular.copy($scope.compositionMenuItems);
            leftMenuController.leftMenuItems.push(item2);

        });

        return defObjAttributeSet.promise;
    }

    $scope.buildDynamicLeftCampaignMenu = function () {
        //$scope.addSubObjectMenuItem('');
        var defObjSubObject = $q.defer();
        var libtype = subObjectService.query({ domainId: $scope.contentTypeModel.domainId, id: $scope.contentTypeModel.contentTypeId });
        var isMenuStyleApplied = false;
        libtype.$promise.then(function (details) {
            if (details) {
                $scope.defAttributeSetPromise = $scope.addSubObjectMenuItemCampaign(details);
                defObjSubObject.resolve();
            }
        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    $scope.errors.push(value.message);
                    defObjSubObject.reject();
                });
            }
            else {
                $scope.errors.push("Error occured while fetching sub objects. Please try after sometime.");
            }
        });
        return defObjSubObject.promise;
    }

    $scope.addSubObjectMenuItemCampaign = function (subObjects) {
        //update the left menu.
        var leftMenuController = sharedScope.get('leftMenuController');
        leftMenuController.contentTypeId = $rootScope.contentTypeId;
        leftMenuController.subobjid = $rootScope.subObjectId;

        leftMenuController.leftMenuItems = [];
        var ids = {
            contentTypeId: $scope.contentTypeModel.contentTypeId,
            subObjectId: 0,
            attributeSetId: 0,
            classificationId: 0,
            permissionTypeId: 0,
            type: 'Campaign/'
        };
        leftMenuController.loadCampaignSubMenuItems(ids);

        var item = {
            itemIds: { contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0 },
            itemName: $scope.contentTypeModel.pluralName,
            url: "", nestedMenu: leftMenuController.subMenuItems
        };
        var defObjAttributeSet = $q.defer();
        attributeSetService.query({ id: ids.contentTypeId }).$promise.then(function (details) {
            if (details) {
                //add attributeSets to the menu.   
                defObjAttributeSet.resolve();
                angular.forEach(details, function (value, key) {

                    var newAttributeSet = {
                        itemIds: {
                            contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: value.attributeSetId, classificationId: 0
                        },
                        itemName: value.attributeSetName,
                        url: "/ManageIT/Attributes/" + value.attributeSetName + "/Campaign/" + ids.contentTypeId + "/SubObject/0/AttributeSet/" + value.attributeSetId,
                        nestedMenu: []
                    };
                    //push each attributeset item into the menu.
                    item.nestedMenu[2].nestedMenu.push(newAttributeSet);
                });
            }
        });

        var defObjCompositions = $q.defer();
        compositionService.query({ controller: 'Composition', paramUri: 'allCompDetails', contentTypeId: ids.contentTypeId }).$promise.then(function (details) {
            if (details) {
                defObjCompositions.resolve();
                angular.forEach(details, function (value, key) {
                    //ids.compositionId = value.compositionId;
                    var newComposition = {
                        itemIds: {
                            contentTypeId: ids.contentTypeId, subObjectId: 0, attributeSetId: 0, classificationId: 0
                        },
                        itemName: value.compositionName,
                        url: "/ManageIT/AttributeMap/" + value.compositionName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + value.subObjectId + "/Composition/" + value.compositionId,
                        nestedMenu: []
                    };
                    //push each Composition item into the menu.
                    item.nestedMenu[3].nestedMenu.push(newComposition);
                });
            }

        }, function (error) {
            if (error.data.errorMessage) {
                angular.forEach(error.data.errorMessage, function (value, key) {
                    //$scope.errors.push(value);
                });
            }
            else {
                //$scope.errors.push("Error occured while fetching an Compositions. Please try after sometime.");
            }

        });

        leftMenuController.contentTypeName = $scope.contentTypeModel.singularName;
        leftMenuController.properties.url = "/ManageIT/Properties/" + $scope.contentTypeModel.identifier;
        leftMenuController.leftMenuItems.push(leftMenuController.properties);
        leftMenuController.leftMenuItems.push(leftMenuController.subObjects);
        leftMenuController.leftMenuItems.push(item);
        angular.forEach(subObjects, function (value, key) {
            ids.subObjectId = value.subObjectId;
            leftMenuController.loadSubMenuItems(ids);
            var item2 = {
                itemIds: {
                    contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0, permissionTypeId: 0
                },
                itemName: value.singularName,
                url: "", nestedMenu: leftMenuController.subMenuItems
            };

            if (value.singularName) {
                leftMenuController.attributeScreenName = value.singularName;
            } else {
                leftMenuController.attributeScreenName = value.pluralName;
            }
            item2.nestedMenu[0].itemName = "Attributes";
            item2.nestedMenu[0].url = "/ManageIT/Attributes/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/AttributeSet/0";
            item2.nestedMenu[8].url = "/ManageIT/Layouts/" + value.singularName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/Layout/0";
            item2.nestedMenu.splice(2, 1);
            item2.nestedMenu[3].nestedMenu.splice(0, 1);
            item2.nestedMenu[3].url = "/ManageIT/Permissions/ContentType/" + ids.contentTypeId + "/SubObject/" + ids.subObjectId + "/PermissionType/2";
            item2.nestedMenu.splice(4, 1);
            item2.nestedMenu.splice(4, 1);

            compositionService.getSourceObjectComposition({ controller: 'Composition', paramUri: 'allCompDetailsBySO', contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId }).$promise.then(function (details) {
                if (details) {
                    defObjCompositions.resolve();
                    angular.forEach(details, function (value, key) {
                        //ids.compositionId = value.compositionId;
                        var newComposition = {
                            itemIds: {
                                contentTypeId: ids.contentTypeId, subObjectId: ids.subObjectId, attributeSetId: 0, classificationId: 0
                            },
                            itemName: value.compositionName,
                            url: "/ManageIT/AttributeMap/" + value.compositionName + "/ContentType/" + ids.contentTypeId + "/SubObject/" + value.subObjectId + "/Composition/" + value.compositionId,
                            nestedMenu: []
                        };
                        //push each Composition item into the menu.
                        item2.nestedMenu[2].nestedMenu.push(newComposition);
                    });
                }

            }, function (error) {
                if (error.data.errorMessage) {
                    angular.forEach(error.data.errorMessage, function (value, key) {
                        //$scope.errors.push(value);
                    });
                }
                else {
                    //$scope.errors.push("Error occured while fetching an Compositions. Please try after sometime.");
                }

            });


            // item2.nestedMenu[2].nestedMenu = angular.copy($scope.compositionMenuItems);
            leftMenuController.leftMenuItems.push(item2);

        });

        return defObjAttributeSet.promise;
    }

}]);

manageitModule.controller("manageITController", ['$scope', '$rootScope', 'domainService', 'sequenceService', 'administratorService', 'sharedScope', '$location', 'dialogModal', '$uibModalInstance', function ($scope, $rootScope, domainService, sequenceService, administratorService, sharedScope, $location, dialogModal, $uibModalInstance) {
    sharedScope.store('manageITController', $scope);
    $scope.isManageIT = true;
    $scope.checkUrl = function () {
        if (window.location.hash) {
            var uri = window.location.hash.split('#')
            $location.url("/" + uri[1]);
        }
        else
            $location.url("/");
    }

    $scope.checkForChanges = function (event, index, isClose) {
        var domainController = sharedScope.get('domainController');
        var sequenceController = sharedScope.get('sequenceController');
        var message = '';
        if (domainController.form.domainForm && domainController.form.domainForm.$dirty) {
            event.preventDefault();
            $scope.activeTab = index;
            dialogModal("You haven't saved your changes in Domain form. Do you want to close the dialogue?", "Confirm", "Ok", "Cancel", $("#manageItConfirmModal")).result.then(function (x) {
                if (x == true) {
                    if (isClose != true) {
                        domainController.form.domainForm.$setPristine();
                        domainController.clearDomainFields();
                        if (event.currentTarget.innerText == "Sequences")
                            $scope.activeTab = 2;
                        else
                            $scope.activeTab = 0;
                    }
                    else {
                        $uibModalInstance.dismiss('cancel');
                        //$('.modal-backdrop').modal('hide');
                        $('#SequenceAttribute').modal('hide');
                    }
                }
            });
            $('div').eq(0).css('z-index', '1070');
            //$document.find('body').eq(0).css('z-index', '1085 !important');

        }

        else if (sequenceController.form.sequenceForm && sequenceController.form.sequenceForm.$dirty) {
            event.preventDefault();
            $scope.activeTab = index;
            dialogModal("You haven't saved your changes in Sequence form. Do you want to close the dialogue?", "Confirm", "Ok", "Cancel", $("#manageItConfirmModal")).result.then(function (x) {
                if (x == true) {
                    if (isClose != true) {
                        sequenceController.form.sequenceForm.$setPristine();
                        sequenceController.clearSequenceFields();
                        if (event.currentTarget.innerText == "Domains")
                            $scope.activeTab = 1;
                        else
                            $scope.activeTab = 0;
                    }
                    else {
                        $uibModalInstance.dismiss('cancel');
                        //$('.modal-backdrop').modal('hide');
                        $('#SequenceAttribute').modal('hide');
                    }
                }
            });
            $('div').eq(0).css('z-index', '1070');
        }
        else if (isClose) {
            $uibModalInstance.dismiss('cancel');
            //$('.modal-backdrop').modal('hide');
            $('#SequenceAttribute #manageit').modal('hide');
        }
    }


    $scope.getDetails = [{ admins: [], domains: [], sequences: [], errordetails: [] }];

    $scope.getDetails.errordetails = {
        isError: false, isSuccess: false, isWarning: false, isInfo: false, messages: [], moreDetails: null
    };


    $scope.getTypes = function (type, isStartUp) {


        if (type == 'admin') {

            administratorService.getRoles().$promise.then(function (details) {
                // console.log("getroles");
                $scope.administratorDetails = [];
                //alert("d");
                //console.log(details);
                angular.forEach(details, function (value, key) {
                    // console.log(value);
                    $scope.administratorDetails.push(value);
                });
                // console.log($scope.administratorDetails);
                $scope.getDetails.admin = $scope.administratorDetails;
                sharedScope.store('manageITController', $scope);
            });

            administratorService.getContentAdminRoles().$promise.then(function (adminDetail) {
                $scope.contentAdministratorDetails = [];
                //alert("d");
                //console.log(adminDetail);
                angular.forEach(adminDetail, function (value, key) {
                    // console.log(value);
                    $scope.contentAdministratorDetails.push(value);
                });
                //console.log($scope.administratorDetails);
                $scope.getDetails.contentAdmin = $scope.contentAdministratorDetails;
                sharedScope.store('manageITController', $scope);
            });
        }

        if (type == 'domain') {


            domainService.query().$promise.then(function (details) {
                $scope.domainDetails = [];

                angular.forEach(details, function (value, key) {
                    {
                        $scope.domainDetails.push(value);
                    }
                });
                console.log($scope.domainDetails);
                $scope.getDetails.domains = $scope.domainDetails;
                sharedScope.store('manageITController', $scope);

                var rightController = sharedScope.get('rightMenuController');
                if (rightController != null)
                    rightController.domains = $scope.domainDetails;

                //$scope.checkUrl();
            }, function (error) {
                angular.forEach(error.data, function (value, key) {
                    {
                        if (value.errorMessage) {
                            angular.forEach(value.errorMessage, function (v, k) {
                                //alert(v.message);
                            });
                        }
                    }
                });
                //error occured while retrieving domain object
                //$scope.checkUrl();
            });

            //if (isStartUp == 'true')
            //    sharedScope.get('domainController').clearDomainFields();
            var manageITController = sharedScope.get('manageITController');
            manageITController.getDetails.errordetails.isSuccess = false;
            manageITController.getDetails.errordetails.isError = false;
            manageITController.getDetails.errordetails.isWarning = false;
            manageITController.getDetails.errordetails.isInfo = false;
        }
        if (type == 'sequence') {

            sequenceService.query().$promise.then(function (details) {
                $scope.sequenceDetails = [];
                angular.forEach(details, function (value, key) {
                    {
                        $scope.sequenceDetails.push(value);
                    }
                });

                $scope.getDetails.sequences = $scope.sequenceDetails;
                sharedScope.store('manageITController', $scope);


                //var rightController = sharedScope.get('rightMenuController');
                var seqController = sharedScope.get('sequenceController');
                if (seqController != null) {
                    seqController.getDetails.sequences = $scope.sequenceDetails;
                }
                //if (rightController != null)
                //    rightController.domains = $scope.domainDetails;

                //$scope.checkUrl();
            }, function (error) {
                angular.forEach(error.data, function (value, key) {
                    {
                        if (value.errorMessage) {
                            angular.forEach(value.errorMessage, function (v, k) {
                            });
                        }
                    }
                });
                //error occured while retrieving sequence object
                //$scope.checkUrl();
            });

            //if (isStartUp == 'true')
            //    sharedScope.get('sequenceController').clearSequenceFields();
            //var manageITController = sharedScope.get('manageITController');
            //manageITController.getDetails.errordetails.isSuccess = false;
            //manageITController.getDetails.errordetails.isError = false;
            //manageITController.getDetails.errordetails.isWarning = false;
            //manageITController.getDetails.errordetails.isInfo = false;

        }
    }
}]);
