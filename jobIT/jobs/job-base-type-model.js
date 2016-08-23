
(function () {
    "use strict";
    function jobBaseTypeModel(svc, domainSvc) {
        var model = {},
            text = {},
            sName = "",
            pName = "",
            identifier = "",
            mEntered = true,
            aEntered = false,
            jobNumber = [],
            isManual = true,
            isAuto = false,
            domains = {},
            isAddSucess = false,
            isAddError = false,
            addErrorMessage = "",
            jobFiles = [];


        model.init = function () {
            model.text = text;
            model.sName = sName;
            model.pName = pName;
            model.identifier = identifier;
            model.mEntered = mEntered;
            model.aEntered = aEntered;
            model.jobNumber = jobNumber;
            model.jobFiles = jobFiles;
            model.domains = domains;
            model.isManual = isManual;
            model.isAuto = isAuto;
            model.isAddSucess = isAddSucess;
            model.isAddError = isAddError;
            model.addErrorMessage = addErrorMessage;
            return model;
        };

        model.reset = function () {
            model.text = {},
             model.sName = "",
             model.pName = "",
             model.identifier = "",
             model.mEntered = true,
             model.aEntered = false,
             model.jobNumber = [],
             model.isManual = true,
             model.isAuto = false,
             model.selectedDomain = "",
             model.jobFiles = [],
            model.isAddSucess = false,
            model.isAddError = false,
            model.addErrorMessage = "";
        };

        model.showSequence = function (value) {
            if (value === "N") {
                model.mEntered = false;
                model.isManual = false;
                model.isAuto = true;

            }
            else {
                model.aEntered = false;
                model.isAuto = false;
                model.isManual = true;
            }

        };

        model.loadDomains = function () {
            domainSvc.query().$promise.then(function (details) {
                model.domains = details;
            });
        };


        model.cancel = function () {

        };

        model.activate = function () {
            if (!(model.sName && model.sName !== "" && model.pName && model.pName !== "" && model.identifier &&
                   model.identifier !== "" && model.selectedDomain && model.selectedDomain !== "" && model.jobNumber && model.jobNumber !== "")) {
                return true;
            }
            else {
                return false;
            }
        };

        model.add = function () {
            var addInput = {
                'SingularName': model.sName,
                'PluralName': model.pName,
                'Identifier': model.identifier,
                'DomainId': model.selectedDomain,
                'JobNumber': model.jobNumber,
                'IsJobNumAuto': model.isAuto,
                'JobFile': model.jobFiles

            };
            svc.addJob(addInput).$promise.then(function (result) {
                if (result.errorMessage === null) {
                    model.isAddSucess = true;
                    model.isAddError = false;
                } else {
                    model.isAddSucess = false;
                    model.isAddError = true;
                    model.addErrorMessage = result.errorMessage;
                }
                model.addResult = result;
            });
        };


        model.newJobFiles = function () {

        };

        model.newJobNumber = function () {

        };


        return model.init();
    }
    angular.module('jobit.jobs').factory('jobBaseTypeModel', ['jobBaseTypeService', 'domainService', jobBaseTypeModel]);
}());