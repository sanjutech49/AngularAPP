
(function () {
    "use strict";
    function flatPlanBehaviourSettingsModel(svc, $filter) {
        var model = {},
            text = {},
            flatPlans = {},
            addResult = {},
            isVisible = true,
            allowLoosePages = true,
            planTypeSimplex = true,
            planTypeDuplex = true,
            bindingOption1 = true,
            bindingOption2 = true,
            allowedLayoutsOption1 = true,
            allowedLayoutsOption2 = true,
            isButtonDisabled = false,
            appearanceValues = [],
            defaultAppearance = {};


        model.init = function () {
            model.text = text;
            model.flatPlans = flatPlans;
            model.addResult = addResult;
            model.isVisible = isVisible;
            model.allowLoosePages = allowLoosePages,
            model.planTypeSimplex = planTypeSimplex,
            model.planTypeDuplex = planTypeDuplex,
            model.bindingOption1 = bindingOption1,
            model.bindingOption2 = bindingOption2,
            model.allowedLayoutsOption1 = allowedLayoutsOption1,
            model.allowedLayoutsOption2 = allowedLayoutsOption2,
            model.isButtonDisabled = isButtonDisabled,
            model.appearanceValues = appearanceValues,
            model.defaultAppearance = defaultAppearance;
            return model;
        };


        model.showAllowLoosePages = function (value) {
            model.isVisible = value !== true;
            if (value === true) {
                model.allowLoosePages = true;
            } else {
            }
            model.validateForm();
        }


        model.add = function (data) {
            svc.create(data).$promise.then(function (result) {
                model.addResult = result;
            });
        }

        model.setFormFields = function () {
            model.planTypeSimplex = true;
            model.planTypeDuplex = true;
            model.bindingOption1 = true;
            model.bindingOption2 = true;
            model.allowedLayoutsOption1 = true;
            model.allowedLayoutsOption2 = true;
            model.appearanceValues = [{
                id: 1, name: "Flat Plan"
            },
                {
                    id: 2, name: "Page List"
                }];
            model.defaultAppearance = model.appearanceValues[0];
        }

        model.validateForm = function () {
            if ((model.planTypeSimplex || model.planTypeDuplex) && (model.bindingOption1 || model.bindingOption2) && (model.allowedLayoutsOption1 || model.allowedLayoutsOption2)) {
                model.isButtonDisabled = false;
            } else {
                model.isButtonDisabled = true;
            }
        }

        return model.init();
    }
    angular.module('jobit.flatplan').factory('flatPlanBehaviourSettingsModel', ['flatPlanBehaviourSettingsService', '$filter', flatPlanBehaviourSettingsModel]);
}());