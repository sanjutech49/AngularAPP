(function () {
    "use strict";
    function pageBaseTypesModel(svc, domainSvc, documentLibrarySvc) {
        var model = {},
            sName = "",
            pName = "",
            identifier = "",
            domains = {},
            docLibraries = [],
            isAddSucess = false,
            isAddError = false,
            addErrorMessage = "";

        model.init = function () {
            model.sName = sName;
            model.pName = pName;
            model.identifier = identifier;
            model.domains = domains;
            model.docLibraries = docLibraries;
            model.isAddSucess = isAddSucess;
            model.isAddError = isAddError;
            model.addErrorMessage = addErrorMessage;

            return model;
        };

        model.loadDomains = function () {
            domainSvc.query().$promise.then(function (details) {
                model.domains = details;
            });
        };

        model.loadDocuments = function () {
            documentLibrarySvc.query().$promise.then(function (details) {
                model.docLibraries = details;
            });
        };

        model.add = function () {
            var addInput = {
                'SingularName': model.sName,
                'PluralName': model.pName,
                'Identifier': model.identifier,
                'DomainId': model.selectedDomain,
                'DocLibrary': model.selectedDocLibrary
            };
            svc.addPage(addInput).$promise.then(function (result) {
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

        return model.init();
    }
    angular.module('jobit.pages').factory('pageBaseTypesModel', ['pageBaseTypeService', 'domainService', 'documentLibraryService', pageBaseTypesModel]);
}());