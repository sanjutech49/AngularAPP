(function () {
    "use strict";
    function addFlatPlanModel(svc, $filter, settingsModel) {
        var model = {},
             text = {},
             addResult = {},
             advertisement = "",
             jobNumber = "",
             jobName = "",
             deadline = "",
             editResult = {},
             advertisements = [],
             setupLayout = {},
             layoutValues = [],
             setupDefaultView = {},
             setupBinding = {},
             defaultViewValues = [],
             bindingValues = [],
             setupPages = "",
             isLoosePageWarning = false,
             isAllowedPagesForDuplex = true,
             allowedSpread = true,
             allowedPages = true,
             isSpreadDisable = false,
             flatPlan = {},
             totalPages = "",
             flatLayout = "",
             topMargin = "",
             bottomMargin = "",
             leftMargin = "",
             rightMargin = "",
             innerMargin = "",
             outerMargin = "",
             topBleed = "",
             bottomBleed = "",
             leftBleed = "",
             rightBleed = "",
             innerBleed = "",
             outerBleed = "",
             trimWidth = "",
             trimHeight = "",
             preset = [],
             savedPreset = [],
             isSimplexFlatPlan = true,
             isIndesignTemplate = false,
             uniquePresetName = "",
             isCheckboxRequired = false;

        model.init = function () {
            model.text = text;
            model.addResult = addResult;
            model.advertisement = advertisement;
            model.jobNumber = jobNumber;
            model.jobName = jobName;
            model.deadline = deadline;
            model.editResult = editResult;
            model.advertisements = advertisements;
            model.setupLayout = setupLayout;
            model.layoutValues = layoutValues;
            model.setupDefaultView = setupDefaultView;
            model.setupBinding = setupBinding;
            model.defaultViewValues = defaultViewValues;
            model.bindingValues = bindingValues;
            model.setupPages = setupPages;
            model.isLoosePageWarning = isLoosePageWarning;
            model.isAllowedPagesForDuplex = isAllowedPagesForDuplex;
            model.allowedSpread = allowedSpread;
            model.allowedPages = allowedPages;
            model.isSpreadDisable = isSpreadDisable;
            model.flatPlan = flatPlan;
            model.totalPages = totalPages;
            model.flatLayout = flatLayout;
            model.topMargin = topMargin;
            model.bottomMargin = bottomMargin;
            model.leftMargin = leftMargin;
            model.rightMargin = rightMargin;
            model.innerMargin = innerMargin;
            model.outerMargin = outerMargin;
            model.topBleed = topBleed;
            model.bottomBleed = bottomBleed;
            model.leftBleed = leftBleed;
            model.rightBleed = rightBleed;
            model.innerBleed = innerBleed;
            model.outerBleed = outerBleed;
            model.trimWidth = trimWidth;
            model.trimHeight = trimHeight;
            model.preset = preset;
            model.savedPreset = savedPreset;
            model.isSimplexFlatPlan = isSimplexFlatPlan;
            model.isIndesignTemplate = isIndesignTemplate;
            model.uniquePresetName = uniquePresetName;
            model.isCheckboxRequired = isCheckboxRequired;

            return model;


           
        };

        model.addDetails = function (data) {
            svc.createDetails(data).$promise.then(function (result) {
                model.addResult = result;
            });
        };

        model.clear = function () {
            model.advertisement = null;
        };

        model.change = function (value) {
            model.advertisement = value;
        };

        model.editDetails = function (data) {
            $("#details").show();
            $("#editDetailsPage").hide();
            svc.editDetails(data).$promise.then(function (result) {
                model.editResult = result;
            });
        };

        model.getEditMode = function () {

        };

        model.discard = function () {
            model.jobNumber = null;
            model.jobName = null;
            model.advertisement = null;
            model.deadline = null;
        };
        model.getAdvertisements = function () {
            svc.getAdvertisements().$promise.then(function (result) {
                model.advertisements = result;
            });

            //Setup section start.
            model.setSetupFields = function () {
                model.layoutValues = [{
                    id: 1, name: "Simplex"
                },
                    {
                        id: 2, name: "Duplex"
                    }];
                model.defaultViewValues = [{
                    id: 1, name: "Flat Plan"
                },
                    {
                        id: 2, name: "Page List"
                    }];
                model.bindingValues = [{
                    id: 1, name: "Folded Sheet Binding"
                },
                    {
                        id: 2, name: "Loose Leaf Binding"
                    }];
                model.setupLayout = model.layoutValues[1];
                model.setupDefaultView = model.defaultViewValues[1];
                model.setupBinding = model.bindingValues[0];
            }

            //Display a warning message informing the user that there will be loose pages
           
            model.validateForm = function () {
                if (model.setupBinding.id == 1 && model.setupPages > 2 && model.setupPages % 4 != 0 && settingsModel.allowLoosePages) {
                    model.isLoosePageWarning = true;
                }
                else if (model.setupBinding.id == 1 && settingsModel.allowLoosePages == false && model.setupPages > 2 && model.setupPages % 4 != 0) {
                    model.isLoosePageWarning = true;
                }
                else if (model.setupBinding.id == 1 && settingsModel.allowLoosePages == true && model.setupPages > 2 && model.setupPages % 4 != 0) {
                    model.isLoosePageWarning = true;
                }
                else if (model.setupLayout.id == 2 && model.setupPages > 1 && model.setupPages % 2 != 0) {
                    model.isLoosePageWarning = true;
                }
                else {
                    model.isLoosePageWarning = false;
                }
                if (model.allowedPages || model.allowedSpread) {
                    model.isCheckboxRequired = false;
                }
                else {
                    model.isCheckboxRequired = true;
                }
                if (model.setupLayout.id == 1) {
                    model.isSpreadDisable = true;
                    model.allowedSpread = false;
                    model.isSimplexFlatPlan = false;
                    model.saveSetup();
                }
                else {
                    model.isSpreadDisable = false;
                    model.isSimplexFlatPlan = true;
                }



            }
            model.checkSpreadVisibility = function () {
                if (model.setupLayout.id == 1) {
                    model.isSpreadDisable = true;
                    model.isSimplexFlatPlan = false;
                    model.saveSetup();
                }
                else {
                    model.isSpreadDisable = false;
                    model.isSimplexFlatPlan = true;
                }
            }

            //View flat plans.
            model.getFlatPlan = function (id) {
                svc.getFlatPlanById(id).$promise.then(function (detail) {
                    model.flatPlan = detail;
                });
            }

            model.getPagesAndSpreads = function (settings) {
                var pageCount = settings.pages;
                if (settings.layout === 'duplex') {
                    var singlePages = 2;
                    var spreads = Math.ceil((settings.pages - 2) / 2);
                    model.totalPages = spreads + singlePages;
                } else {
                    model.totalPages = settings.pages;
                }
                model.flatLayout = settings.layout;

            }


            model.saveSetup = function (data) {
                if (model.setupLayout.id == 1) {
                    if (model.innerMargin == "" || model.innerMargin == undefined) {
                        model.innerMargin = model.leftMargin;
                    }
                    if (model.outerMargin == "" || model.outerMargin == undefined) {
                        model.outerMargin = model.rightMargin;
                    }
                    if (model.innerBleed == "" || model.innerBleed == undefined) {
                        model.innerBleed = model.leftBleed;
                    }
                    if (model.outerBleed == "" || model.outerBleed == undefined) {
                        model.outerBleed = model.rightBleed;
                    }
                }
                else {
                    if (model.leftMargin == "" || model.leftMargin == undefined) {
                        model.leftMargin = model.innerMargin;
                    }
                    if (model.rightMargin == "" || model.rightMargin == undefined) {
                        model.rightMargin = model.outerMargin;
                    }
                    if (model.leftBleed == "" || model.leftBleed == undefined) {
                        model.leftBleed = model.innerBleed;
                    }
                    if (model.rightBleed == "" || model.rightBleed == undefined) {
                        model.rightBleed = model.outerBleed;
                    }
                }
            };

            model.indesignTemplate = function () {
                if (((model.topMargin) && (model.bottomMargin) && (model.leftMargin) && (model.rightMargin) && (model.innerMargin) && (model.outerMargin) && (model.topBleed) && (model.bottomBleed) && (model.leftBleed) && (model.rightBleed) && (model.innerBleed) && (model.outerBleed) && (model.trimWidth) && (model.trimHeight)) > 0) {
                    model.isIndesignTemplate = true;
                }
                else {
                    model.isIndesignTemplate = false;
                }
            }
            model.loadPreset = function () {
                svc.loadPreset().$promise.then(function (result) {
                    model.preset = result;
                });
            }

            model.savePreset = function (data) {
                svc.savePreset().$promise.then(function (result) {
                    model.savedPreset = result;
                });
            }

            model.saveSettings = function (data) {
                svc.create(data).$promise.then(function (result) {
                    model.savedSettings = result;
                });
            }

        }

        return model.init();
    }
    angular.module('jobit.flatplan').factory('addFlatPlanModel', ['addFlatPlanService', '$filter', 'flatPlanBehaviourSettingsModel', addFlatPlanModel]);
}());