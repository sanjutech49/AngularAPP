
(function () {
    "use strict";
    function flatPlanBaseTypeModel(svc, domainSvc, $filter) {
        var model = {},
            text = {},
            domains = {},
            sName = "",
            pName = "",
            identifier = "",
            flatPlans = {},
            addResult = "",
            addSuccess = false;

        model.init = function () {
            model.text = text;
            model.domains = domains;
            model.sName = sName;
            model.pName = pName;
            model.identifier = identifier;
            model.flatPlans = flatPlans;
            model.addResult = addResult;
            model.addSuccess = addSuccess;
            return model;
        };
        model.reset = function () {
            model.text = {},
            model.SingularName = "",
            model.PluralName = "",
            model.Identifier = "",
            model.DomainId = "",
            model.isAddSucess = false;
            model.isAddError = false;
        };

        model.loadDomains = function () {
            domainSvc.query().$promise.then(function (details) {
                model.domains = details;
            });
        };

        model.deriveIdentifier = function () {
            model.identifier = $filter('camelize')(model.pName);
        }

        model.add = function (data) {
            svc.create(data).$promise.then(function (result) {
                model.addResult = result;
                model.addSuccess = true;
            });
        }

        model.getFlatPlanByDomain = function (domainId) {
            flatPlanBaseTypeService.getFlatPlanByDomain(domainId).$promise.then(function (result) {
                model.flatPlans = result;
            });
        }
        return model.init();
    }
    angular.module('jobit.flatplan').factory('flatPlanBaseTypeModel', ['flatPlanBaseTypeService', 'domainService', '$filter', flatPlanBaseTypeModel]);
}());