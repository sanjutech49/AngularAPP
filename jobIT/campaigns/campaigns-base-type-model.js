
(function () {
    "use strict";
    function campaignBaseTypeModel(svc, campAttService, domainSvc, sequenceSvc, $filter) {
        var model = {},
            text = {},
            domains = {},
            SingularName = "",
            PluralName = "",
            Identifier = "",
            DomainId = "",
            CampaignName = "",
            sequences = {},
            mEntered = false,
            isVisible = false,
            campaigns = {},
            CampaignNumber = "",
            selectedSequence = "",
            addResult = "",
            addInput = {},
            isAddSucess = false,
            addErrorMessage = 'error',
            isAddError = false,
            addInputParam = {};

        model.init = function () {
            model.text = text;
            model.domains = domains;
            model.SingularName = SingularName;
            model.PluralName = PluralName;
            model.Identifier = Identifier;
            model.CampaignNumber = CampaignNumber;
            model.DomainId = DomainId;
            model.CampaignName = CampaignName;
            model.sequences = sequences;
            model.mEntered = mEntered;
            model.isVisible = isVisible;
            model.campaigns = campaigns;
            model.selectedSequence = selectedSequence;
            model.addResult = addResult;
            model.isAddSucess = isAddSucess;
            model.addErrorMessage = addErrorMessage;
            model.isAddError = isAddError;
            model.addInputParam = addInputParam;
            return model;
        };

        model.loadDomains = function () {
            domainSvc.query().$promise.then(function (details) {
                model.domains = details;
            });
        };

        model.loadSequences = function () {
            sequenceSvc.query().$promise.then(function (details) {
                model.sequences = details;
            });
        };

        model.deriveIdentifier = function () {
            model.Identifier = $filter('camelize')(model.PluralName);
        }

        model.showSequence = function (value) {
            model.isVisible = value == "Y";
            if (value == 'Y') {
                model.CampaignName = null;
                model.mEntered = true;
            } else {
                model.CampaignNumber = null;
                model.mEntered = false;
            }
        }

        model.add = function (data) {

            // Get required input parameters for add campaign API.           
            addInput = {
                'SingularName': data.SingularName,
                'PluralName': data.PluralName,
                'Identifier': data.Identifier,
                'DomainId': data.DomainId,
                'CampaignNumber': data.CampaignNumber
            };
                       
            svc.create(addInput).$promise.then(function (result) {
               
                if (result.addErrorMessage === null) {
                    model.isAddSucess = true;
                    model.isAddError = false;
                } else {
                    model.isAddSucess = false;
                    model.isAddError = true;
                    model.addErrorMessage = result.addErrorMessage;
                }
                model.addResult = result;
                return result;
            }).then(function (result) {     
                addInputParam.DomainId = result.domainId;
                addInputParam.Identifier = 'campaignName';
                addInputParam.Name = 'Campaign Name';
                addInputParam.Format = 123; // will change, API is accepting integer only.
                addInputParam.Mandatory = true;
                addInputParam.ContentTypeId = result.campaignId;
                addInputParam.FieldWidth = 12;
                campAttService.create({}, addInputParam).$promise.then(function (detail) {
                    return result;
                }).then(function (result) {
                    console.log('yes');
                    console.log(result);
                    addInputParam.DomainId = result.domainId;
                    addInputParam.Identifier = 'campaignNumber';
                    addInputParam.Name = 'Campaign Number';
                    addInputParam.ContentTypeId = result.campaignId;
                    addInputParam.Mandatory = false;
                    addInputParam.FieldWidth = 13;
                    addInputParam.Format = 124; // will change, API is accepting integer only.
                    campAttService.create({}, addInputParam).$promise.then(function (result) {
                    });
                });
            });

           
        }

        model.getCampaignsByDomain = function (domainId) {
            svc.getCampaignsByDomain(domainId).$promise.then(function (result) {
                model.campaigns = result;
            });
        }
        return model.init();
    }
    angular.module('jobit.campaign').factory('campaignBaseTypeModel', ['campaignBaseTypeService', 'campaignAttributeService', 'domainService', 'sequenceService', '$filter', campaignBaseTypeModel]);
}());